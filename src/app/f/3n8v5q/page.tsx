import type { Metadata } from 'next';
import QrInteractiveForm from '@/components/qr/QrInteractiveForm';

export const metadata: Metadata = {
  title: 'Quick Contact | GetEasier',
  description: 'GetEasier quick contact form.',
  robots: { index: false, follow: false },
};

export default function QrFormEnPage() {
  return <QrInteractiveForm initialLanguage="en" />;
}
