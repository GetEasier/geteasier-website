import type { Metadata } from 'next';
import QrInteractiveForm from '@/components/qr/QrInteractiveForm';

export const metadata: Metadata = {
  title: 'Contact Rapide | GetEasier',
  description: 'Formulaire de contact rapide GetEasier.',
  robots: { index: false, follow: false },
};

export default function QrFormFrPage() {
  return <QrInteractiveForm initialLanguage="fr" />;
}
