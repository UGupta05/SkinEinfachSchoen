import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import {
  Calendar,
  Clock,
  User,
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
  Edit
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

  // Edit Modal states
  const [selectedAppointmentForEdit, setSelectedAppointmentForEdit] = useState<Appointment | null>(null);
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editStatus, setEditStatus] = useState<'pending' | 'confirmed' | 'cancelled'>('pending');
  const [editReason, setEditReason] = useState('');

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

  // Helper to format "14:30" to "14:30 Uhr"
  const formatTimeToGermanString = (isoTimeStr: string): string => {
    return `${isoTimeStr} Uhr`;
  };

  const openEditModal = (app: Appointment) => {
    setSelectedAppointmentForEdit(app);
    setEditDate(parseGermanDateStringToIso(app.date, app.created_at));
    setEditTime(parseGermanTimeStringToIso(app.time));
    setEditStatus(app.status);
    setEditReason(app.status_reason || '');
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
    } = {
      status: editStatus,
      status_reason: editReason.trim() || null
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
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/20">
      {/* Header */}
      <header className="bg-pure-white border-b border-outline-variant/10 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="font-display text-primary tracking-tighter text-2xl font-bold">SKIN</span>
            <span className="h-4 w-px bg-outline-variant/30"></span>
            <span className="font-display text-[10px] uppercase font-bold tracking-widest text-tertiary">Admin-Portal</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-primary">{user.email}</span>
              <span className="text-[10px] text-outline font-display font-medium uppercase tracking-wider">Praxis-Team</span>
            </div>
            <button
              onClick={handleSignOut}
              className="p-2.5 rounded-lg border border-outline-variant/15 text-tertiary hover:text-error hover:bg-error/5 hover:border-error/20 active:scale-95 transition-all"
              title="Abmelden"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-10 space-y-10">
        
        {/* KPI Row */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-pure-white border border-outline-variant/10 p-6 rounded-2xl shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-display font-bold uppercase tracking-wider text-outline">Anfragen Gesamt</span>
              <div className="p-2 bg-primary/5 rounded-lg text-primary">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-bold font-display text-primary">{totalCount}</p>
          </div>

          <div className="bg-pure-white border border-outline-variant/10 p-6 rounded-2xl shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-display font-bold uppercase tracking-wider text-outline">Ausstehend</span>
              <div className="p-2 bg-amber-500/5 rounded-lg text-amber-500">
                <RefreshCw className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-bold font-display text-amber-500">{pendingCount}</p>
          </div>

          <div className="bg-pure-white border border-outline-variant/10 p-6 rounded-2xl shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-display font-bold uppercase tracking-wider text-outline">Bestätigt</span>
              <div className="p-2 bg-emerald-500/5 rounded-lg text-emerald-500">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-bold font-display text-emerald-500">{confirmedCount}</p>
          </div>

          <div className="bg-pure-white border border-outline-variant/10 p-6 rounded-2xl shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-display font-bold uppercase tracking-wider text-outline">Storniert</span>
              <div className="p-2 bg-rose-500/5 rounded-lg text-rose-500">
                <XCircle className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-bold font-display text-rose-500">{cancelledCount}</p>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="bg-pure-white border border-outline-variant/10 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          
          {/* Tabs */}
          <div className="flex p-1 bg-soft-shell rounded-xl self-start">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-2 rounded-lg font-display text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'calendar'
                  ? 'bg-pure-white text-primary shadow-sm'
                  : 'text-tertiary hover:text-primary'
              }`}
            >
              Tagesplaner
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-2 rounded-lg font-display text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'list'
                  ? 'bg-pure-white text-primary shadow-sm'
                  : 'text-tertiary hover:text-primary'
              }`}
            >
              Listenansicht
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    statusFilter === filter.value
                      ? 'bg-primary border-primary text-pure-white shadow-sm'
                      : 'bg-pure-white border-outline-variant/10 text-tertiary hover:border-primary/20 hover:text-primary'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Data Loading States */}
        {loadingData && appointments.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto" />
            <p className="text-sm text-tertiary">Termindaten werden geladen...</p>
          </div>
        )}

        {dataError && (
          <div className="bg-error/5 border border-error/20 p-6 rounded-2xl text-error text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold">Ladefehler</h4>
              <p>{dataError}</p>
              <button 
                onClick={fetchAppointments}
                className="mt-3 px-4 py-1.5 border border-error/20 bg-error/10 hover:bg-error/20 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
              >
                Erneut versuchen
              </button>
            </div>
          </div>
        )}

        {/* Empty States */}
        {!loadingData && filteredAppointments.length === 0 && (
          <div className="bg-pure-white border border-outline-variant/10 py-20 rounded-2xl shadow-sm text-center max-w-xl mx-auto space-y-4">
            <Inbox className="w-12 h-12 text-outline/30 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-display text-base font-bold text-primary">Keine Termine gefunden</h3>
              <p className="text-sm text-tertiary max-w-md mx-auto px-6">
                Es liegen aktuell keine Terminanfragen vor, die dem ausgewählten Filter entsprechen.
              </p>
            </div>
          </div>
        )}

        {/* --- VIEW: CALENDAR / DAY PLANNER --- */}
        {activeTab === 'calendar' && filteredAppointments.length > 0 && (
          <section className="space-y-8">
            {Object.keys(grouped)
              .sort((a, b) => {
                // Try simple sorting (dates will be displayed in chronological order since bookings come with distinct date values)
                return a.localeCompare(b);
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                              className="px-2.5 py-1.5 border border-outline-variant/15 hover:bg-soft-shell text-primary rounded-lg text-xs font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-1"
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
                                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-pure-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all hover:shadow-sm active:scale-95 flex items-center gap-1"
                                >
                                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                  <span>Bestätigen</span>
                                </button>
                                <button
                                  onClick={() => updateAppointmentStatus(app.id, 'cancelled')}
                                  disabled={actionLoadingId === app.id}
                                  className="px-3 py-1.5 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-1"
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
                                className="px-3 py-1.5 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-1"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Stornieren</span>
                              </button>
                            )}

                            {app.status === 'cancelled' && (
                              <button
                                onClick={() => updateAppointmentStatus(app.id, 'confirmed')}
                                disabled={actionLoadingId === app.id}
                                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-pure-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all hover:shadow-sm active:scale-95 flex items-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span>Reaktivieren</span>
                              </button>
                            )}

                            <button
                              onClick={() => deleteAppointment(app.id)}
                              disabled={actionLoadingId === app.id}
                              className="p-1.5 text-outline hover:text-error hover:bg-error/5 border border-transparent hover:border-error/10 rounded-lg transition-all active:scale-90"
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

        {/* --- VIEW: LIST VIEW --- */}
        {activeTab === 'list' && filteredAppointments.length > 0 && (
          <section className="bg-pure-white border border-outline-variant/10 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-soft-shell/40 border-b border-outline-variant/10">
                    <th className="p-4 md:p-6 text-[10px] font-display font-bold uppercase tracking-wider text-primary">Kunde</th>
                    <th className="p-4 md:p-6 text-[10px] font-display font-bold uppercase tracking-wider text-primary">Behandlung</th>
                    <th className="p-4 md:p-6 text-[10px] font-display font-bold uppercase tracking-wider text-primary">Datum / Zeit</th>
                    <th className="p-4 md:p-6 text-[10px] font-display font-bold uppercase tracking-wider text-primary">Status</th>
                    <th className="p-4 md:p-6 text-[10px] font-display font-bold uppercase tracking-wider text-primary text-right">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5 text-sm text-tertiary">
                  {filteredAppointments.map((app) => (
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
                            className="p-2 bg-primary/10 text-primary hover:bg-primary hover:text-pure-white rounded-lg transition-all"
                            title="Bearbeiten / Verschieben"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {app.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateAppointmentStatus(app.id, 'confirmed')}
                                disabled={actionLoadingId === app.id}
                                className="p-2 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-pure-white rounded-lg transition-all"
                                title="Bestätigen"
                              >
                                <Check className="w-4 h-4 stroke-[2.5]" />
                              </button>
                              <button
                                onClick={() => updateAppointmentStatus(app.id, 'cancelled')}
                                disabled={actionLoadingId === app.id}
                                className="p-2 bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-pure-white rounded-lg transition-all"
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
                              className="p-2 bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-pure-white rounded-lg transition-all"
                              title="Stornieren"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                          {app.status === 'cancelled' && (
                            <button
                              onClick={() => updateAppointmentStatus(app.id, 'confirmed')}
                              disabled={actionLoadingId === app.id}
                              className="p-2 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-pure-white rounded-lg transition-all"
                              title="Bestätigen"
                            >
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteAppointment(app.id)}
                            disabled={actionLoadingId === app.id}
                            className="p-2 text-outline hover:text-error hover:bg-error/5 rounded-lg transition-all"
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

      </main>

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
                className="text-outline hover:text-primary p-1.5 hover:bg-soft-shell rounded-lg transition-colors"
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
                      className="w-full bg-pure-white border border-outline-variant/10 p-3 rounded-xl text-sm text-onyx-text focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-primary mb-1.5">
                      Uhrzeit
                    </label>
                    <input
                      type="time"
                      value={editTime}
                      onChange={(e) => setEditTime(e.target.value)}
                      required
                      className="w-full bg-pure-white border border-outline-variant/10 p-3 rounded-xl text-sm text-onyx-text focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                    />
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
                  <option value="confirmed">Bestätigt (Gebucht)</option>
                  <option value="cancelled">Storniert</option>
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
                className="px-4 py-2 border border-outline-variant/15 hover:bg-soft-shell/50 text-tertiary rounded-xl text-xs font-bold uppercase tracking-wider transition-colors active:scale-95"
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={actionLoadingId === selectedAppointmentForEdit.id}
                className="px-5 py-2.5 bg-primary hover:opacity-90 text-pure-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95 disabled:bg-slate-muted/20 disabled:text-outline"
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
