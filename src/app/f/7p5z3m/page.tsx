import type { Metadata } from 'next';
import QrInteractiveForm from '@/components/qr/QrInteractiveForm';

export const metadata: Metadata = {
  title: 'Contacto Rápido | GetEasier',
  description: 'Formulario rápido de contacto GetEasier.',
  robots: { index: false, follow: false },
};

export default function QrFormEsPage() {
  return <QrInteractiveForm initialLanguage="es" />;
}
