import React from 'react';
import { Metadata } from 'next';
import { AdminPageClient } from './AdminPageClient';

export const metadata: Metadata = {
  title: 'Admin Dashboard | SKIN einfach schön',
  robots: 'noindex, nofollow',
};

export default function AdminPage() {
  return <AdminPageClient />;
}
