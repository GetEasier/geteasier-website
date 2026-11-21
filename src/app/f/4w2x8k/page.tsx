import type { Metadata } from 'next';
import QrInteractiveForm from '@/components/qr/QrInteractiveForm';

export const metadata: Metadata = {
  title: 'Snel Contact | GetEasier',
  description: 'GetEasier snel contactformulier.',
  robots: { index: false, follow: false },
};

export default function QrFormNlPage() {
  return <QrInteractiveForm initialLanguage="nl" />;
}
