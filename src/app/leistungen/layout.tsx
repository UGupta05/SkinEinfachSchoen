import React from 'react';
import { LeistungenShell } from '../../components/LeistungenShell';
import { TREATMENT_LIST, treatmentPath } from '../../content';

const NAV_ITEMS = TREATMENT_LIST.map((t) => ({ href: treatmentPath(t.slug), name: t.name }));

export default function LeistungenLayout({ children }: { readonly children: React.ReactNode }) {
  return <LeistungenShell items={NAV_ITEMS}>{children}</LeistungenShell>;
}
