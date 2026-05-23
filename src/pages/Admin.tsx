import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { OPENING_HOURS } from '../config/openingHours';
import {
  Calendar,
  Clock,
  User,
  Users,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  XCircle,
  Trash2,
  LogOut,
  Lock,
  RefreshCw,
  AlertCircle,
  Filter,
  Inbox,
  Check,
  ChevronRight,
  Edit,
  Menu,
  X
} from 'lucide-react';

interface Appointment {
  id: string;
  created_at: string;
  service_id: string;
  service_name: string;
  category: string;
  price: string;
  duration: string;
  date: string;
  time: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  status_reason?: string | null;
  expert?: string;
}

export const Admin: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Dashboard states
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'calendar' | 'list'>('calendar');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Edit Modal states
  const [selectedAppointmentForEdit, setSelectedAppointmentForEdit] = useState<Appointment | null>(null);
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editStatus, setEditStatus] = useState<'pending' | 'confirmed' | 'cancelled'>('pending');
  const [editReason, setEditReason] = useState('');
  const [editExpert, setEditExpert] = useState('Sofia');

  // Helper to parse "Sa, 23. Mai" to ISO date "2026-05-23"
  const parseGermanDateStringToIso = (dateStr: string, createdAtStr?: string): string => {
    try {
      const parts = dateStr.split(', ');
      if (parts.length < 2) return '';
      const dayMonth = parts[1].split('. ');
      if (dayMonth.length < 2) return '';
      const day = parseInt(dayMonth[0], 10);
      const monthName = dayMonth[1].trim();
      
      const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
      const monthIndex = months.indexOf(monthName);
      if (monthIndex === -1) return '';
      
      let year = new Date().getFullYear();
      if (createdAtStr) {
        year = new Date(createdAtStr).getFullYear();
      }
      
      const pad = (num: number) => num.toString().padStart(2, '0');
      return `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
    } catch (e) {
      console.error('Error parsing German date:', e);
      return '';
    }
  };

  // Helper to format ISO date "2026-05-23" to German "Sa, 23. Mai"
  const formatDateToGermanString = (isoDateStr: string): string => {
    try {
      const parts = isoDateStr.split('-');
      if (parts.length !== 3) return '';
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      
      const d = new Date(year, month, day);
      if (isNaN(d.getTime())) return '';
      
      const daysOfWeek = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
      const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
      return `${daysOfWeek[d.getDay()]}, ${d.getDate()}. ${months[d.getMonth()]}`;
    } catch (e) {
      console.error('Error formatting date to German:', e);
      return '';
    }
  };

  // Helper to parse "14:30 Uhr" to "14:30"
  const parseGermanTimeStringToIso = (timeStr: string): string => {
    return timeStr.replace(' Uhr', '').trim();
  };

  // Helper to format "14:30" to "14:30" (no longer adds " Uhr")
  const formatTimeToGermanString = (isoTimeStr: string): string => {
    return isoTimeStr;
  };

  // Helper to sort appointments chronologically (by date and time)
  const sortAppointmentsChronologically = (list: Appointment[]): Appointment[] => {
    return [...list].sort((a, b) => {
      const dateA = parseGermanDateStringToIso(a.date, a.created_at);
      const dateB = parseGermanDateStringToIso(b.date, b.created_at);
      if (dateA !== dateB) {
        return dateA.localeCompare(dateB);
      }
      const timeA = parseGermanTimeStringToIso(a.time);
      const timeB = parseGermanTimeStringToIso(b.time);
      return timeA.localeCompare(timeB);
    });
  };

  // Helper to generate dynamic slots for the admin edit modal based on opening hours config
  const getAdminTimeSlots = (isoDateStr: string): string[] => {
    try {
      if (!isoDateStr) return [];
      const d = new Date(isoDateStr);
      if (isNaN(d.getTime())) return [];
      const dayOfWeekNum = d.getDay();
      const config = OPENING_HOURS[dayOfWeekNum];
      
      // Fallback if day is configured as closed (e.g. Sat/Sun) so admin can still pick standard hours if needed physically
      if (!config || config.isClosed) {
        const defaultSlots = [];
        for (let mins = 9 * 60; mins <= 18.5 * 60; mins += 30) {
          const hours = Math.floor(mins / 60);
          const minutes = mins % 60;
          defaultSlots.push(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
        }
        return defaultSlots;
      }
      
      const [startH, startM] = config.start.split(':').map(Number);
      const [endH, endM] = config.end.split(':').map(Number);
      
      const startMinutes = startH * 60 + startM;
      const endMinutes = endH * 60 + endM;
      
      const slots: string[] = [];
      for (let mins = startMinutes; mins <= endMinutes; mins += 30) {
        const hours = Math.floor(mins / 60);
        const minutes = mins % 60;
        slots.push(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
      }
      return slots;
    } catch (e) {
      console.error('Error generating admin time slots:', e);
      return [];
    }
  };

  const openEditModal = (app: Appointment) => {
    setSelectedAppointmentForEdit(app);
    setEditDate(parseGermanDateStringToIso(app.date, app.created_at));
    setEditTime(parseGermanTimeStringToIso(app.time));
    setEditStatus(app.status);
    setEditReason(app.status_reason || '');
    setEditExpert(app.expert || 'Keine Präferenz');
  };

  // Check current session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (err) {
        console.error('Error getting session:', err);
      } finally {
        setLoadingUser(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch appointments once user is logged in
  useEffect(() => {
    if (!user) return;

    fetchAppointments();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments'
        },
        (payload) => {
          console.log('Realtime update received:', payload);
          if (payload.eventType === 'INSERT') {
            const newApp = payload.new as Appointment;
            setAppointments((prev) => [newApp, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedApp = payload.new as Appointment;
            setAppointments((prev) =>
              prev.map((app) => (app.id === updatedApp.id ? updatedApp : app))
            );
          } else if (payload.eventType === 'DELETE') {
            const oldApp = payload.old as { id: string };
            setAppointments((prev) => prev.filter((app) => app.id !== oldApp.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Automatically switch status to 'pending' if date/time changes from original
  useEffect(() => {
    if (!selectedAppointmentForEdit) return;
    const originalDateIso = parseGermanDateStringToIso(selectedAppointmentForEdit.date, selectedAppointmentForEdit.created_at);
    const originalTimeIso = parseGermanTimeStringToIso(selectedAppointmentForEdit.time);
    
    const hasChanged = editDate !== originalDateIso || editTime !== originalTimeIso;
    if (hasChanged && editStatus === 'confirmed') {
      setEditStatus('pending');
    }
  }, [editDate, editTime, selectedAppointmentForEdit, editStatus]);

  const fetchAppointments = async () => {
    setLoadingData(true);
    setDataError(null);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
    } catch (err: any) {
      console.error('Error fetching appointments:', err);
      setDataError(err.message || 'Fehler beim Laden der Termine.');
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) throw error;
    } catch (err: any) {
      console.error('Login error:', err);
      setAuthError(err.message === 'Invalid login credentials' 
        ? 'Ungültige E-Mail-Adresse oder Passwort.' 
        : err.message || 'Ein Fehler ist aufgetreten.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const updateAppointment = async (
    id: string,
    updates: {
      date?: string;
      time?: string;
      status?: 'pending' | 'confirmed' | 'cancelled';
      status_reason?: string | null;
      expert?: string;
    }
  ) => {
    setActionLoadingId(id);
    try {
      const { error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      // Update local state in case realtime event hasn't fired yet
      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, ...updates } : app))
      );
    } catch (err: any) {
      console.error('Error updating appointment:', err);
      alert('Fehler beim Aktualisieren des Termins: ' + err.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  const updateAppointmentStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    await updateAppointment(id, { status });
  };

  const handleSaveEdit = async () => {
    if (!selectedAppointmentForEdit) return;
    
    const updates: {
      date?: string;
      time?: string;
      status?: 'pending' | 'confirmed' | 'cancelled';
      status_reason?: string | null;
      expert?: string;
    } = {
      status: editStatus,
      status_reason: editReason.trim() || null,
      expert: editExpert
    };
    
    if (editStatus !== 'cancelled') {
      const formattedDate = formatDateToGermanString(editDate);
      const formattedTime = formatTimeToGermanString(editTime);
      
      if (!formattedDate || !formattedTime) {
        alert('Bitte geben Sie ein gültiges Datum und eine Uhrzeit an.');
        return;
      }
      updates.date = formattedDate;
      updates.time = formattedTime;
    }
    
    await updateAppointment(selectedAppointmentForEdit.id, updates);
    
    setSelectedAppointmentForEdit(null);
  };

  const deleteAppointment = async (id: string) => {
    if (!window.confirm('Möchten Sie diesen Termin wirklich unwiderruflich löschen?')) return;
    setActionLoadingId(id);
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update local state in case realtime event hasn't fired yet
      setAppointments((prev) => prev.filter((app) => app.id !== id));
    } catch (err: any) {
      console.error('Error deleting appointment:', err);
      alert('Fehler beim Löschen des Termins: ' + err.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Helper to filter appointments
  const filteredAppointments = appointments.filter((app) => {
    if (statusFilter === 'all') return true;
    return app.status === statusFilter;
  });

  // Group appointments by date for the calendar/day planner view
  // We want to sort the days chronologically.
  // Let's gather all unique dates present in appointments, plus generate the next 12 days to show in the dashboard view.
  const getGroupedAppointments = () => {
    const grouped: Record<string, Appointment[]> = {};
    
    // First group appointments by date string
    filteredAppointments.forEach((app) => {
      if (!grouped[app.date]) {
        grouped[app.date] = [];
      }
      grouped[app.date].push(app);
    });

    // Sort time slots within each day
    Object.keys(grouped).forEach((d) => {
      grouped[d].sort((a, b) => a.time.localeCompare(b.time));
    });

    return grouped;
  };

  const grouped = getGroupedAppointments();

  const originalDateIso = selectedAppointmentForEdit ? parseGermanDateStringToIso(selectedAppointmentForEdit.date, selectedAppointmentForEdit.created_at) : '';
  const originalTimeIso = selectedAppointmentForEdit ? parseGermanTimeStringToIso(selectedAppointmentForEdit.time) : '';
  const isRescheduled = !!selectedAppointmentForEdit && (editDate !== originalDateIso || editTime !== originalTimeIso);

  // Metrics
  const totalCount = appointments.length;
  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  const cancelledCount = appointments.filter(a => a.status === 'cancelled').length;

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-soft-shell flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto" />
          <p className="text-sm font-display font-bold uppercase tracking-wider text-primary">Sitzung wird überprüft...</p>
        </div>
      </div>
    );
  }

  // --- LOGIN INTERFACE ---
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-soft-shell via-pure-white to-soft-shell flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-pure-white border border-outline-variant/15 p-8 md:p-10 rounded-2xl shadow-xl medical-glow space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-sky-accent to-primary"></div>
          
          <div className="text-center space-y-2">
            <span className="font-display text-primary tracking-widest text-3xl font-extrabold block">SKIN</span>
            <span className="text-[10px] font-display font-bold uppercase tracking-widest text-outline">Einfach Schön • Admin Portal</span>
          </div>

          {authError && (
            <div className="bg-error/5 border border-error/20 p-4 rounded-xl text-error text-xs flex items-start gap-2 leading-relaxed">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="login-email" className="block text-[11px] font-display font-bold uppercase tracking-wider text-primary mb-2">
                E-Mail-Adresse
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="ihre-adresse@skin.de"
                className="w-full bg-pure-white border border-outline-variant/10 p-4 rounded-xl text-sm text-onyx-text placeholder:text-outline/30 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-[11px] font-display font-bold uppercase tracking-wider text-primary mb-2">
                Passwort
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-pure-white border border-outline-variant/10 p-4 pr-12 rounded-xl text-sm text-onyx-text placeholder:text-outline/30 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                />
                <Lock className="w-4 h-4 text-outline/40 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-primary text-pure-white font-display text-xs font-bold uppercase tracking-widest py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:bg-slate-muted/20 disabled:text-outline disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Anmelden</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-[10px] text-center text-outline uppercase tracking-wider">
            Exklusiver Zugang für autorisiertes Praxispersonal
          </p>
        </div>
      </div>
    );
  }

  // --- DASHBOARD INTERFACE ---
  return (
    <div className="min-h-screen bg-background flex font-sans selection:bg-primary/20">
      
      {/* Left Sidebar (Desktop: visible, Mobile: slide-in drawer) */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-pure-white border-r border-outline-variant/15 flex flex-col py-6 transition-transform duration-300 z-50 shrink-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Sidebar Header */}
        <div className="px-6 mb-8 flex justify-between items-center">
          <div>
            <h1 className="font-display text-lg font-bold text-primary leading-tight">SKiN</h1>
            <p className="text-[10px] uppercase font-bold tracking-widest text-tertiary">Admin-Portal</p>
          </div>
          {/* Mobile close button */}
          <button className="md:hidden p-1.5 hover:bg-soft-shell rounded-lg text-outline" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 space-y-1">
          <button
            onClick={() => { setActiveTab('calendar'); setSidebarOpen(false); }}
            className={`w-full flex items-center px-6 py-3 transition-colors ${
              activeTab === 'calendar'
                ? 'text-primary font-bold border-r-2 border-primary bg-soft-shell'
                : 'text-tertiary hover:bg-soft-shell/50'
            }`}
          >
            <Calendar className="w-4 h-4 mr-3" />
            <span className="text-xs font-display font-bold uppercase tracking-wider">Tagesplaner</span>
          </button>
          <button
            onClick={() => { setActiveTab('list'); setSidebarOpen(false); }}
            className={`w-full flex items-center px-6 py-3 transition-colors ${
              activeTab === 'list'
                ? 'text-primary font-bold border-r-2 border-primary bg-soft-shell'
                : 'text-tertiary hover:bg-soft-shell/50'
            }`}
          >
            <Clock className="w-4 h-4 mr-3" />
            <span className="text-xs font-display font-bold uppercase tracking-wider">Listenansicht</span>
          </button>
        </nav>

        {/* Sync Button */}
        <div className="px-6 mb-6">
          <button
            onClick={() => {
              fetchAppointments();
            }}
            disabled={loadingData}
            className="w-full py-3 bg-primary text-pure-white font-display text-[10px] uppercase font-bold tracking-wider rounded-lg medical-glow hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
            <span>Aktualisieren</span>
          </button>
        </div>

        {/* Logout */}
        <footer className="border-t border-outline-variant/10 pt-4">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center px-6 py-3 text-tertiary hover:text-error hover:bg-error/5 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            <span className="text-xs font-display font-bold uppercase tracking-wider">Abmelden</span>
          </button>
        </footer>
      </aside>

      {/* Backdrop overlay for mobile drawer */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-onyx-text/45 backdrop-blur-sm z-40 md:hidden animate-in fade-in"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Right Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-surface-bright/80 backdrop-blur-md border-b border-outline-variant/15 flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-4">
            {/* Mobile Sidebar Hamburger Toggle */}
            <button className="md:hidden p-2 hover:bg-soft-shell rounded-lg text-outline" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-display text-sm font-bold text-onyx-text uppercase tracking-wider">
              {activeTab === 'calendar' ? 'Tagesplaner' : 'Listenansicht'}
            </span>
          </div>

          {/* User Badge */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-primary">{user.email}</p>
              <p className="text-[9px] text-outline font-display font-medium uppercase tracking-wider">Praxis-Team</p>
            </div>
            <span className="h-8 w-px bg-outline-variant/30 hidden sm:block"></span>
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-sm select-none">
              {user.email?.[0].toUpperCase()}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* KPI Dashboard Summary */}
          <section className="space-y-4">
            <h2 className="font-display text-xs font-bold text-onyx-text uppercase tracking-wider">Heute im Überblick</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Stat 1: Total */}
              <div className="bg-pure-white p-6 rounded-xl medical-glow border border-outline-variant/10 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <span className="p-2 bg-primary/5 text-primary rounded-lg">
                    <Calendar className="w-5 h-5" />
                  </span>
                  <span className="text-primary font-display text-[9px] font-bold uppercase tracking-wider bg-primary/5 px-2 py-0.5 rounded">Gesamt</span>
                </div>
                <p className="text-[10px] font-display font-bold uppercase tracking-wider text-outline mb-1">Anfragen Gesamt</p>
                <h3 className="font-display text-2xl font-bold text-onyx-text">{totalCount}</h3>
              </div>

              {/* Stat 2: Pending */}
              <div className="bg-pure-white p-6 rounded-xl medical-glow border border-outline-variant/10 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <span className="p-2 bg-amber-500/5 text-amber-500 rounded-lg">
                    <RefreshCw className="w-5 h-5" />
                  </span>
                  <span className="text-amber-500 font-display text-[9px] font-bold uppercase tracking-wider bg-amber-500/5 px-2 py-0.5 rounded">Prüfung</span>
                </div>
                <p className="text-[10px] font-display font-bold uppercase tracking-wider text-outline mb-1">Ausstehend</p>
                <h3 className="font-display text-2xl font-bold text-onyx-text">{pendingCount}</h3>
              </div>

              {/* Stat 3: Confirmed */}
              <div className="bg-pure-white p-6 rounded-xl medical-glow border border-outline-variant/10 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <span className="p-2 bg-emerald-500/5 text-emerald-500 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                  </span>
                  <span className="text-emerald-500 font-display text-[9px] font-bold uppercase tracking-wider bg-emerald-500/5 px-2 py-0.5 rounded">Gebucht</span>
                </div>
                <p className="text-[10px] font-display font-bold uppercase tracking-wider text-outline mb-1">Bestätigt</p>
                <h3 className="font-display text-2xl font-bold text-onyx-text">{confirmedCount}</h3>
              </div>

              {/* Stat 4: Cancelled */}
              <div className="bg-pure-white p-6 rounded-xl medical-glow border border-outline-variant/10 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <span className="p-2 bg-rose-500/5 text-rose-500 rounded-lg">
                    <XCircle className="w-5 h-5" />
                  </span>
                  <span className="text-rose-500 font-display text-[9px] font-bold uppercase tracking-wider bg-rose-500/5 px-2 py-0.5 rounded">Storniert</span>
                </div>
                <p className="text-[10px] font-display font-bold uppercase tracking-wider text-outline mb-1">Storniert</p>
                <h3 className="font-display text-2xl font-bold text-onyx-text">{cancelledCount}</h3>
              </div>

            </div>
          </section>

          {/* Bento Layout Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Main Dashboard Column (Day Planner / List Table) - Col Span 2 */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Filter block */}
              <div className="bg-pure-white border border-outline-variant/10 p-4 rounded-xl shadow-sm flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2 text-xs text-tertiary">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Status filtern:</span>
                </div>
                <div className="flex gap-2">
                  {[
                    { label: 'Alle', value: 'all' },
                    { label: 'Ausstehend', value: 'pending' },
                    { label: 'Bestätigt', value: 'confirmed' },
                    { label: 'Storniert', value: 'cancelled' }
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setStatusFilter(filter.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        statusFilter === filter.value
                          ? 'bg-primary border-primary text-pure-white shadow-sm font-bold'
                          : 'bg-pure-white border-outline-variant/10 text-tertiary hover:border-primary/20 hover:text-primary'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Loading State */}
              {loadingData && appointments.length === 0 && (
                <div className="bg-pure-white border border-outline-variant/10 py-16 rounded-xl shadow-sm text-center space-y-4">
                  <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto" />
                  <p className="text-sm text-tertiary">Termindaten werden geladen...</p>
                </div>
              )}

              {/* Error State */}
              {dataError && (
                <div className="bg-error/5 border border-error/20 p-6 rounded-xl text-error text-sm flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="font-semibold">{dataError}</span>
                  </div>
                  <button
                    onClick={fetchAppointments}
                    className="px-4 py-2 border border-error/25 bg-error/5 hover:bg-error/10 text-xs font-bold uppercase rounded-lg transition-all"
                  >
                    Erneut versuchen
                  </button>
                </div>
              )}

              {/* Empty State */}
              {!loadingData && filteredAppointments.length === 0 && (
                <div className="bg-pure-white border border-outline-variant/10 py-16 rounded-xl shadow-sm text-center space-y-4">
                  <Inbox className="w-12 h-12 text-outline/30 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-bold text-primary">Keine Termine gefunden</h3>
                    <p className="text-sm text-outline max-w-sm mx-auto px-4">
                      Es liegen aktuell keine Terminanfragen vor, die dem ausgewählten Filter entsprechen.
                    </p>
                  </div>
                </div>
              )}

              {/* VIEW: CALENDAR / DAY PLANNER */}
              {activeTab === 'calendar' && filteredAppointments.length > 0 && (
                <section className="space-y-8">
                  {Object.keys(grouped)
                    .sort((a, b) => {
                      const dateA = parseGermanDateStringToIso(a);
                      const dateB = parseGermanDateStringToIso(b);
                      return dateA.localeCompare(dateB);
                    })
                    .map((dateStr) => {
                      const dayApps = grouped[dateStr];
                      return (
                        <div key={dateStr} className="space-y-4">
                          {/* Day Header */}
                          <div className="flex items-center gap-3">
                            <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-primary/75" />
                              <span>{dateStr}</span>
                            </h3>
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/5 text-primary font-bold">
                              {dayApps.length} {dayApps.length === 1 ? 'Termin' : 'Termine'}
                            </span>
                          </div>

                          {/* Bookings for the day */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {dayApps.map((app) => (
                              <div
                                key={app.id}
                                className={`bg-pure-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden transition-all hover:shadow-md ${
                                  app.status === 'confirmed'
                                    ? 'border-emerald-500/20 shadow-emerald-500/5'
                                    : app.status === 'cancelled'
                                    ? 'border-rose-500/20 shadow-rose-500/5'
                                    : 'border-outline-variant/10'
                                }`}
                              >
                                {/* Accent status indicator bar */}
                                <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                                  app.status === 'confirmed'
                                    ? 'bg-emerald-500'
                                    : app.status === 'cancelled'
                                    ? 'bg-rose-500'
                                    : 'bg-amber-500'
                                }`} />

                                {/* Time & Service Info */}
                                <div className="space-y-3 pl-2">
                                  <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-1.5 text-sm font-bold font-display text-primary">
                                      <Clock className="w-4 h-4 text-primary/75" />
                                      {app.time}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      {app.expert && (
                                        <span className="text-[9px] font-display font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                                          {app.expert}
                                        </span>
                                      )}
                                      <span className={`text-[10px] font-display font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                        app.status === 'confirmed'
                                          ? 'bg-emerald-500/10 text-emerald-600'
                                          : app.status === 'cancelled'
                                          ? 'bg-rose-500/10 text-rose-600'
                                          : 'bg-amber-500/10 text-amber-600'
                                      }`}>
                                        {app.status === 'confirmed' && 'Bestätigt'}
                                        {app.status === 'cancelled' && 'Storniert'}
                                        {app.status === 'pending' && 'Ausstehend'}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-display text-sm font-bold text-onyx-text leading-snug">{app.service_name}</h4>
                                    <p className="text-[10px] text-outline mt-0.5">{app.category} • {app.duration} • {app.price}</p>
                                  </div>
                                </div>

                                {/* Customer Details */}
                                <div className="bg-soft-shell/50 border border-outline-variant/5 rounded-xl p-4 space-y-2.5 text-xs text-tertiary pl-6">
                                  <div className="flex items-center gap-2">
                                    <User className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                                    <span className="font-semibold text-onyx-text">{app.customer_name}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Users className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                                    <span>Expertin: <strong className="text-primary">{app.expert || 'Keine Angabe'}</strong></span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Mail className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                                    <a href={`mailto:${app.customer_email}`} className="hover:text-primary underline hover:decoration-sky-accent break-all">{app.customer_email}</a>
                                  </div>
                                  {app.customer_phone && (
                                    <div className="flex items-center gap-2">
                                      <Phone className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                                      <a href={`tel:${app.customer_phone}`} className="hover:text-primary underline">{app.customer_phone}</a>
                                    </div>
                                  )}
                                  {app.notes && (
                                    <div className="pt-2 border-t border-outline-variant/10 flex gap-2 items-start mt-2">
                                      <FileText className="w-3.5 h-3.5 text-primary/60 shrink-0 mt-0.5" />
                                      <p className="italic text-outline leading-normal">{app.notes}</p>
                                    </div>
                                  )}
                                  {app.status_reason && (
                                    <div className="pt-2 border-t border-outline-variant/10 flex gap-2 items-start mt-2">
                                      <AlertCircle className="w-3.5 h-3.5 text-tertiary/60 shrink-0 mt-0.5" />
                                      <p className="text-[11px] text-tertiary font-medium leading-normal">
                                        <span className="font-bold text-primary">Grund/Hinweis:</span> {app.status_reason}
                                      </p>
                                    </div>
                                  )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-2 pl-2 border-t border-outline-variant/5 pt-4 flex-wrap">
                                  <button
                                    onClick={() => openEditModal(app)}
                                    disabled={actionLoadingId === app.id}
                                    className="px-2.5 py-1.5 border border-outline-variant/15 hover:bg-soft-shell text-primary rounded-lg text-xs font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                                    title="Bearbeiten / Verschieben"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                    <span>Bearbeiten</span>
                                  </button>

                                  {app.status === 'pending' && (
                                    <>
                                      <button
                                        onClick={() => updateAppointmentStatus(app.id, 'confirmed')}
                                        disabled={actionLoadingId === app.id}
                                        className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-pure-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all hover:shadow-sm active:scale-95 flex items-center gap-1 cursor-pointer"
                                      >
                                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                        <span>Bestätigen</span>
                                      </button>
                                      <button
                                        onClick={() => updateAppointmentStatus(app.id, 'cancelled')}
                                        disabled={actionLoadingId === app.id}
                                        className="px-2.5 py-1.5 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                                      >
                                        <XCircle className="w-3.5 h-3.5" />
                                        <span>Stornieren</span>
                                      </button>
                                    </>
                                  )}

                                  {app.status === 'confirmed' && (
                                    <button
                                      onClick={() => updateAppointmentStatus(app.id, 'cancelled')}
                                      disabled={actionLoadingId === app.id}
                                      className="px-3 py-1.5 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                                    >
                                      <XCircle className="w-3.5 h-3.5" />
                                      <span>Stornieren</span>
                                    </button>
                                  )}

                                  {app.status === 'cancelled' && (
                                    <button
                                      onClick={() => updateAppointmentStatus(app.id, 'confirmed')}
                                      disabled={actionLoadingId === app.id}
                                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-pure-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all hover:shadow-sm active:scale-95 flex items-center gap-1 cursor-pointer"
                                    >
                                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                      <span>Reaktivieren</span>
                                    </button>
                                  )}

                                  <button
                                    onClick={() => deleteAppointment(app.id)}
                                    disabled={actionLoadingId === app.id}
                                    className="p-1.5 text-outline hover:text-error hover:bg-error/5 border border-transparent hover:border-error/10 rounded-lg transition-all active:scale-90 cursor-pointer"
                                    title="Löschen"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                </section>
              )}

              {/* VIEW: LIST VIEW */}
              {activeTab === 'list' && filteredAppointments.length > 0 && (
                <section className="bg-pure-white border border-outline-variant/10 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-soft-shell/40 border-b border-outline-variant/10">
                          <th className="p-4 md:p-6 text-[10px] font-display font-bold uppercase tracking-wider text-primary">Kunde</th>
                          <th className="p-4 md:p-6 text-[10px] font-display font-bold uppercase tracking-wider text-primary">Behandlung</th>
                          <th className="p-4 md:p-6 text-[10px] font-display font-bold uppercase tracking-wider text-primary">Datum / Zeit</th>
                          <th className="p-4 md:p-6 text-[10px] font-display font-bold uppercase tracking-wider text-primary">Expertin</th>
                          <th className="p-4 md:p-6 text-[10px] font-display font-bold uppercase tracking-wider text-primary">Status</th>
                          <th className="p-4 md:p-6 text-[10px] font-display font-bold uppercase tracking-wider text-primary text-right">Aktionen</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/5 text-sm text-tertiary">
                        {sortAppointmentsChronologically(filteredAppointments).map((app) => (
                          <tr key={app.id} className="hover:bg-soft-shell/10 transition-colors">
                            <td className="p-4 md:p-6 space-y-1">
                              <p className="font-semibold text-onyx-text">{app.customer_name}</p>
                              <p className="text-xs text-outline font-sans break-all">{app.customer_email}</p>
                              {app.customer_phone && <p className="text-xs text-outline font-sans">{app.customer_phone}</p>}
                              {app.notes && <p className="text-xs text-outline font-sans italic">Notiz: {app.notes}</p>}
                              {app.status_reason && (
                                <p className="text-xs text-primary font-sans font-medium">
                                  Grund/Hinweis: {app.status_reason}
                                </p>
                              )}
                            </td>
                            <td className="p-4 md:p-6 space-y-1">
                              <p className="font-semibold text-onyx-text leading-tight">{app.service_name}</p>
                              <p className="text-[10px] text-outline uppercase tracking-wider">{app.category}</p>
                            </td>
                            <td className="p-4 md:p-6 space-y-1">
                              <p className="font-semibold text-onyx-text">{app.date}</p>
                              <p className="text-xs text-primary font-bold font-display">{app.time}</p>
                            </td>
                            <td className="p-4 md:p-6">
                              {app.expert ? (
                                <span className="text-[11px] font-semibold text-onyx-text bg-sky-accent/15 px-2 py-1 rounded border border-sky-accent/25">
                                  {app.expert}
                                </span>
                              ) : (
                                <span className="text-xs text-outline italic">Keine Angabe</span>
                              )}
                            </td>
                            <td className="p-4 md:p-6">
                              <span className={`text-[10px] font-display font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                app.status === 'confirmed'
                                  ? 'bg-emerald-500/10 text-emerald-600'
                                  : app.status === 'cancelled'
                                  ? 'bg-rose-500/10 text-rose-600'
                                  : 'bg-amber-500/10 text-amber-600'
                              }`}>
                                {app.status === 'confirmed' && 'Bestätigt'}
                                {app.status === 'cancelled' && 'Storniert'}
                                {app.status === 'pending' && 'Ausstehend'}
                              </span>
                            </td>
                            <td className="p-4 md:p-6 text-right">
                              <div className="flex justify-end items-center gap-2">
                                <button
                                  onClick={() => openEditModal(app)}
                                  disabled={actionLoadingId === app.id}
                                  className="p-2 bg-primary/10 text-primary hover:bg-primary hover:text-pure-white rounded-lg transition-all cursor-pointer"
                                  title="Bearbeiten / Verschieben"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                {app.status === 'pending' && (
                                  <>
                                    <button
                                      onClick={() => updateAppointmentStatus(app.id, 'confirmed')}
                                      disabled={actionLoadingId === app.id}
                                      className="p-2 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-pure-white rounded-lg transition-all cursor-pointer"
                                      title="Bestätigen"
                                    >
                                      <Check className="w-4 h-4 stroke-[2.5]" />
                                    </button>
                                    <button
                                      onClick={() => updateAppointmentStatus(app.id, 'cancelled')}
                                      disabled={actionLoadingId === app.id}
                                      className="p-2 bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-pure-white rounded-lg transition-all cursor-pointer"
                                      title="Stornieren"
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                                {app.status === 'confirmed' && (
                                  <button
                                    onClick={() => updateAppointmentStatus(app.id, 'cancelled')}
                                    disabled={actionLoadingId === app.id}
                                    className="p-2 bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-pure-white rounded-lg transition-all cursor-pointer"
                                    title="Stornieren"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                )}
                                {app.status === 'cancelled' && (
                                  <button
                                    onClick={() => updateAppointmentStatus(app.id, 'confirmed')}
                                    disabled={actionLoadingId === app.id}
                                    className="p-2 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-pure-white rounded-lg transition-all cursor-pointer"
                                    title="Reaktivieren"
                                  >
                                    <Check className="w-4 h-4 stroke-[2.5]" />
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteAppointment(app.id)}
                                  disabled={actionLoadingId === app.id}
                                  className="p-2 text-outline hover:text-error hover:bg-error/5 rounded-lg transition-all cursor-pointer"
                                  title="Löschen"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

            </div>

            {/* Right Bento Side Panel Column - Col Span 1 */}
            <div className="space-y-6">
              
              {/* Studio Status Card */}
              <div className="relative h-44 rounded-xl overflow-hidden medical-glow border border-outline-variant/10 group">
                <img
                  src="/images/home/clinic_lobby.png"
                  alt="Praxis Studio"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-4 text-left">
                  <div>
                    <p className="text-pure-white font-display text-[9px] font-bold uppercase tracking-widest">Studio-Status: Optimal</p>
                    <p className="text-white/85 text-[10px] font-sans">Alle Systeme laufen einwandfrei</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <section className="bg-pure-white p-6 rounded-xl medical-glow border border-outline-variant/10 text-left space-y-4">
                <h3 className="font-display text-xs font-bold text-onyx-text uppercase tracking-wider">Schnellzugriff</h3>
                <div className="space-y-3">
                  <a
                    href="/terminbuchung"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center p-3 rounded-lg bg-soft-shell hover:bg-primary/5 border border-outline-variant/5 transition-all group"
                  >
                    <Calendar className="w-4 h-4 text-primary mr-3" />
                    <span className="text-xs font-semibold text-tertiary group-hover:text-primary">Neuer Termin (Kunde)</span>
                    <ChevronRight className="w-4 h-4 ml-auto text-outline-variant group-hover:text-primary transition-transform group-hover:translate-x-1" />
                  </a>
                  
                  <button
                    onClick={fetchAppointments}
                    className="w-full flex items-center p-3 rounded-lg bg-soft-shell hover:bg-primary/5 border border-outline-variant/5 transition-all group cursor-pointer"
                  >
                    <RefreshCw className={`w-4 h-4 text-primary mr-3 ${loadingData ? 'animate-spin' : ''}`} />
                    <span className="text-xs font-semibold text-tertiary group-hover:text-primary">Daten synchronisieren</span>
                    <ChevronRight className="w-4 h-4 ml-auto text-outline-variant group-hover:text-primary transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </section>

              {/* Recent Activity */}
              <section className="bg-pure-white p-6 rounded-xl medical-glow border border-outline-variant/10 text-left space-y-4">
                <h3 className="font-display text-xs font-bold text-onyx-text uppercase tracking-wider">Letzte Aktivitäten</h3>
                <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin">
                  {appointments.slice(0, 5).map((app) => (
                    <div key={app.id} className="flex items-start text-xs border-b border-outline-variant/5 pb-3 last:border-0 last:pb-0">
                      <div className={`w-2 h-2 rounded-full mt-1.5 mr-3 shrink-0 ${
                        app.status === 'confirmed'
                          ? 'bg-emerald-500'
                          : app.status === 'cancelled'
                          ? 'bg-rose-500'
                          : 'bg-amber-500'
                      }`} />
                      <div className="space-y-0.5">
                        <p className="text-onyx-text font-medium leading-normal">
                          <strong>{app.customer_name}</strong> - {app.service_name}
                        </p>
                        <p className="text-[10px] text-outline">
                          {app.date} um {app.time} ({app.expert || 'Keine Auswahl'})
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>

          </div>

          {/* AI Skin Diagnostics Beta Teaser */}
          <section className="bg-onyx-text rounded-xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-outline-variant/10 text-left gap-6">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary to-transparent"></div>
            <div className="relative z-10 text-pure-white md:w-1/2 space-y-4">
              <span className="inline-block bg-primary/25 border border-primary/40 px-3 py-1 rounded-full font-display text-[9px] font-bold uppercase tracking-wider">AI DIAGNOSTICS PREVIEW</span>
              <h2 className="font-display text-xl font-bold mb-2">Predictive Skin Analysis Beta</h2>
              <p className="text-xs text-outline-variant leading-relaxed opacity-85">
                Unser neues KI-Hautanalysetool integriert Patientenhistorie und 3D-Gesichtsscans für maximale Behandlungspräzision. Verfügbar für Isabel & Sofia ab nächster Woche.
              </p>
              <button className="border border-pure-white/20 hover:border-pure-white hover:bg-pure-white hover:text-onyx-text px-5 py-2 rounded-lg font-display text-[10px] font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer">
                Modul aktivieren
              </button>
            </div>
            <div className="relative z-10 md:w-1/3 mt-6 md:mt-0 max-h-36 overflow-hidden rounded-lg">
              <img
                src="/images/treatments/visia.png"
                alt="Diagnostics Interface"
                className="w-full h-full object-cover opacity-50 border border-outline-variant/10 grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </section>

        </main>

        {/* Global Footer */}
        <footer className="py-6 border-t border-outline-variant/10 text-center">
          <p className="font-display text-[9px] text-outline uppercase tracking-widest">
            SKiN Einfach Schön Management System v2.4.1 © 2026
          </p>
        </footer>

      </div>

      {/* Edit Appointment Modal */}
      {selectedAppointmentForEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-onyx-text/45 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedAppointmentForEdit(null)}
          ></div>
          
          <div className="relative w-full max-w-lg bg-pure-white border border-outline-variant/15 rounded-2xl shadow-2xl overflow-hidden medical-glow flex flex-col max-h-[90vh] text-left animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-sky-accent to-primary"></div>
            
            <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-soft-shell/25">
              <div>
                <h3 className="font-display text-base font-bold text-primary">Termin bearbeiten & verschieben</h3>
                <p className="text-[10px] text-outline uppercase tracking-wider font-bold mt-0.5">
                  Kunde: {selectedAppointmentForEdit.customer_name}
                </p>
              </div>
              <button 
                onClick={() => setSelectedAppointmentForEdit(null)}
                className="text-outline hover:text-primary p-1.5 hover:bg-soft-shell rounded-lg transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 overflow-y-auto">
              <div className="bg-soft-shell/40 border border-outline-variant/5 rounded-xl p-4 text-xs space-y-1">
                <p className="font-bold text-primary uppercase tracking-wider text-[9px]">Behandlung</p>
                <p className="font-bold text-onyx-text text-sm">{selectedAppointmentForEdit.service_name}</p>
                <p className="text-outline">{selectedAppointmentForEdit.category} • {selectedAppointmentForEdit.duration} • {selectedAppointmentForEdit.price}</p>
              </div>
              
              {editStatus !== 'cancelled' && (
                <div className="space-y-4 border-b border-outline-variant/5 pb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-primary mb-1.5">
                        Datum
                      </label>
                      <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        required
                        className="w-full bg-pure-white border border-outline-variant/10 p-3 rounded-xl text-sm text-onyx-text focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-primary mb-1.5">
                        Uhrzeit (Freie Eingabe)
                      </label>
                      <input
                        type="time"
                        value={editTime}
                        onChange={(e) => setEditTime(e.target.value)}
                        required
                        className="w-full bg-pure-white border border-outline-variant/10 p-3 rounded-xl text-sm text-onyx-text focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-primary mb-2 flex justify-between">
                      <span>Schnellauswahl Uhrzeit</span>
                      <span className="text-[9px] text-outline italic font-normal">Klicken zum Auswählen</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto pr-1 pb-1 scrollbar-thin scrollbar-thumb-outline-variant/20 scrollbar-track-transparent">
                      {getAdminTimeSlots(editDate).map((time) => {
                        const isSelected = editTime === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setEditTime(time)}
                            className={`py-2 px-1 text-center transition-all font-sans text-xs font-semibold rounded-lg border active:scale-95 cursor-pointer ${
                              isSelected
                                ? 'bg-primary text-pure-white border-primary font-bold shadow-sm'
                                : 'bg-pure-white text-tertiary border-outline-variant/10 hover:border-primary/30 hover:bg-soft-shell'
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-primary mb-1.5">
                  Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e: any) => setEditStatus(e.target.value)}
                  className="w-full bg-pure-white border border-outline-variant/10 p-3 rounded-xl text-sm text-onyx-text focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="pending">Ausstehend (Prüfung)</option>
                  <option value="confirmed" disabled={isRescheduled}>
                    Bestätigt (Gebucht) {isRescheduled ? ' (nur nach Zustimmung des Kunden)' : ''}
                  </option>
                  <option value="cancelled">Storniert</option>
                </select>
                {isRescheduled && (
                  <p className="text-[11px] text-primary/85 mt-2 font-sans leading-relaxed bg-primary/5 p-3 rounded-xl border border-primary/10">
                    ℹ️ Bei einer Terminverschiebung muss der Kunde dem neuen Termin erst zustimmen. Der Termin wird daher automatisch auf <strong>"Ausstehend"</strong> gesetzt und der Kunde erhält E-Mail-Buttons zur Bestätigung.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-primary mb-1.5">
                  Behandelnde Expertin
                </label>
                <select
                  value={editExpert}
                  onChange={(e: any) => setEditExpert(e.target.value)}
                  className="w-full bg-pure-white border border-outline-variant/10 p-3 rounded-xl text-sm text-onyx-text focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="Keine Präferenz">Keine Präferenz</option>
                  <option value="Sofia">Sofia Khaliq-Natawan</option>
                  <option value="Isabel">Isabel Duwendag</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-primary mb-1.5 flex justify-between">
                  <span>Nachricht / Grund für den Kunden</span>
                  <span className="text-[9px] text-outline lowercase font-normal italic">Wird in die E-Mail eingefügt</span>
                </label>
                <textarea
                  value={editReason}
                  onChange={(e) => setEditReason(e.target.value)}
                  placeholder="z.B. 'Leider müssen wir den Termin aus organisatorischen Gründen um eine Stunde verschieben.' oder 'Stornierung auf Kundenwunsch.'"
                  rows={3}
                  className="w-full bg-pure-white border border-outline-variant/10 p-3.5 rounded-xl text-sm text-onyx-text placeholder:text-outline/35 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all resize-none"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-outline-variant/10 bg-soft-shell/15 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedAppointmentForEdit(null)}
                className="px-4 py-2 border border-outline-variant/15 hover:bg-soft-shell/50 text-tertiary rounded-xl text-xs font-bold uppercase tracking-wider transition-colors active:scale-95 cursor-pointer"
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={actionLoadingId === selectedAppointmentForEdit.id}
                className="px-5 py-2.5 bg-primary hover:opacity-90 text-pure-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95 disabled:bg-slate-muted/20 disabled:text-outline cursor-pointer"
              >
                {actionLoadingId === selectedAppointmentForEdit.id ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin mx-auto" />
                ) : (
                  'Speichern'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
