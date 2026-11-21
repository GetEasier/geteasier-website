'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { COUNTRIES } from '@/data/countries';
import { COMPANY } from '@/lib/site';
import CountrySelect, { getLocalizedCountryName, type QrLanguage } from './CountrySelect';

interface QrFormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  employees: string;
  country: string;
  products: string[];
  message: string;
  botcheck: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  employees?: string;
  country?: string;
  products?: string;
}

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const FLAG_META: { code: QrLanguage; name: string }[] = [
  { code: 'pt', name: 'Português' },
  { code: 'en', name: 'English' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
];

function FlagIcon({ code }: { code: QrLanguage }) {
  switch (code) {
    case 'pt':
      return (
        <svg viewBox="0 0 24 16" className="h-3.5 w-5 shrink-0 rounded-[2px] shadow-sm ring-1 ring-black/10" aria-hidden="true">
          <rect width="9.6" height="16" fill="#006600" />
          <rect x="9.6" width="14.4" height="16" fill="#FF0000" />
          <circle cx="9.6" cy="8" r="3.4" fill="#FFCC00" />
          <circle cx="9.6" cy="8" r="2.2" fill="#FFFFFF" stroke="#003399" strokeWidth="0.6" />
        </svg>
      );
    case 'en':
      return (
        <svg viewBox="0 0 24 16" className="h-3.5 w-5 shrink-0 rounded-[2px] shadow-sm ring-1 ring-black/10" aria-hidden="true">
          <rect width="24" height="16" fill="#012169" />
          <path d="M0 0L24 16M24 0L0 16" stroke="#FFFFFF" strokeWidth="2.8" />
          <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.4" />
          <path d="M12 0V16M0 8H24" stroke="#FFFFFF" strokeWidth="4.4" />
          <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="2.6" />
        </svg>
      );
    case 'nl':
      return (
        <svg viewBox="0 0 24 16" className="h-3.5 w-5 shrink-0 rounded-[2px] shadow-sm ring-1 ring-black/10" aria-hidden="true">
          <rect width="24" height="5.33" fill="#AE1C28" />
          <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
          <rect y="10.67" width="24" height="5.33" fill="#21468B" />
        </svg>
      );
    case 'es':
      return (
        <svg viewBox="0 0 24 16" className="h-3.5 w-5 shrink-0 rounded-[2px] shadow-sm ring-1 ring-black/10" aria-hidden="true">
          <rect width="24" height="4" fill="#AA151B" />
          <rect y="4" width="24" height="8" fill="#F1BF00" />
          <rect y="12" width="24" height="4" fill="#AA151B" />
        </svg>
      );
    case 'fr':
      return (
        <svg viewBox="0 0 24 16" className="h-3.5 w-5 shrink-0 rounded-[2px] shadow-sm ring-1 ring-black/10" aria-hidden="true">
          <rect width="8" height="16" fill="#002395" />
          <rect x="8" width="8" height="16" fill="#FFFFFF" />
          <rect x="16" width="8" height="16" fill="#ED2939" />
        </svg>
      );
  }
}

const QR_COPY: Record<
  QrLanguage,
  {
    heroTitle: string;
    heroSubtitle: string;
    steps: [string, string, string];
    step1Title: string;
    step1Subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    step2Title: string;
    step2Subtitle: string;
    companyLabel: string;
    companyPlaceholder: string;
    employeesLabel: string;
    employeesWord: string;
    countryLabel: string;
    step3Title: string;
    step3Subtitle: string;
    notesLabel: string;
    notesPlaceholder: string;
    privacyText: string;
    privacyLink: string;
    requiredNote: string;
    back: string;
    continue: string;
    sending: string;
    send: string;
    errorSend: string;
    thankYou: (firstName: string) => string;
    successBody: string;
    exploreSite: string;
    siteHref: string;
    errName: string;
    errEmailMissing: string;
    errEmailInvalid: string;
    errCompany: string;
    errEmployees: string;
    errCountry: string;
    errProducts: string;
    empLabels: Record<'Até 50' | '50-200' | '+200', string>;
    products: Record<string, { title?: string; desc: string }>;
  }
> = {
  pt: {
    heroTitle: 'Vamos simplificar o seu dia a dia.',
    heroSubtitle:
      'Responda a 3 passos rápidos e a nossa equipa entra em contacto com a solução certa para a sua empresa.',
    steps: ['Contacto', 'Empresa', 'Soluções'],
    step1Title: 'Os seus dados de contacto',
    step1Subtitle: 'Para sabermos com quem falar.',
    nameLabel: 'Nome *',
    namePlaceholder: 'Ex: João Silva',
    emailPlaceholder: 'joao@empresa.pt',
    phoneLabel: 'Telemóvel (opcional)',
    phonePlaceholder: '+351 912 345 678',
    step2Title: 'Sobre a sua empresa',
    step2Subtitle: 'Ajuda-nos a preparar uma proposta à sua escala.',
    companyLabel: 'Empresa *',
    companyPlaceholder: 'Nome da sua empresa',
    employeesLabel: 'Número de colaboradores *',
    employeesWord: 'colaboradores',
    countryLabel: 'País da empresa *',
    step3Title: 'Em que soluções tem interesse?',
    step3Subtitle: 'Pode selecionar uma ou várias opções.',
    notesLabel: 'Notas adicionais (opcional)',
    notesPlaceholder: 'Conte-nos brevemente o seu desafio ou o que gostaria de automatizar…',
    privacyText: 'Os seus dados serão usados apenas para responder ao seu pedido. ',
    privacyLink: 'Política de privacidade',
    requiredNote: '* Campos obrigatórios',
    back: 'Anterior',
    continue: 'Continuar',
    sending: 'A enviar…',
    send: 'Enviar pedido',
    errorSend:
      'Não foi possível enviar neste momento. Os seus dados foram mantidos: tente novamente ou contacte-nos pelo WhatsApp (+351 914 223 323).',
    thankYou: (name) => `Obrigado, ${name}!`,
    successBody:
      'Recebemos o seu pedido. A nossa equipa vai analisar o perfil da sua empresa e responder muito em breve.',
    exploreSite: 'Explorar website GetEasier',
    siteHref: '/',
    errName: 'Indique o seu nome.',
    errEmailMissing: 'Indique o seu email.',
    errEmailInvalid: 'Introduza um email válido.',
    errCompany: 'Indique o nome da empresa.',
    errEmployees: 'Selecione a dimensão da equipa.',
    errCountry: 'Selecione o país da empresa.',
    errProducts: 'Selecione pelo menos uma opção.',
    empLabels: { 'Até 50': 'Até 50', '50-200': '50 – 200', '+200': '+200' },
    products: {
      TimeEasier: { desc: 'Registo de ponto e horários simplificado' },
      ConstructionEasier: { desc: 'Gestão completa de obras e equipas' },
      StockEasier: { desc: 'Controlo inteligente de inventário e EPIs' },
      WoodEasier: { desc: 'Passaportes de madeira e rastreabilidade' },
      Custom: {
        title: 'Desenvolvimento à Medida',
        desc: 'Software web, mobile ou integrações próprias',
      },
    },
  },
  en: {
    heroTitle: "Let's simplify your daily work.",
    heroSubtitle:
      'Complete 3 quick steps and our team will reach out with the right solution for your company.',
    steps: ['Contact', 'Company', 'Solutions'],
    step1Title: 'Your contact details',
    step1Subtitle: 'So we know who to reach out to.',
    nameLabel: 'Name *',
    namePlaceholder: 'e.g. John Smith',
    emailPlaceholder: 'john@company.com',
    phoneLabel: 'Mobile phone (optional)',
    phonePlaceholder: '+32 470 12 34 56',
    step2Title: 'About your company',
    step2Subtitle: 'Helps us tailor the solution to your scale.',
    companyLabel: 'Company *',
    companyPlaceholder: 'Your company name',
    employeesLabel: 'Number of employees *',
    employeesWord: 'employees',
    countryLabel: 'Company country *',
    step3Title: 'Which solutions are you interested in?',
    step3Subtitle: 'You can select one or multiple options.',
    notesLabel: 'Additional notes (optional)',
    notesPlaceholder: 'Briefly tell us about your challenge or what you would like to automate…',
    privacyText: 'Your details will only be used to respond to your request. ',
    privacyLink: 'Privacy policy',
    requiredNote: '* Required fields',
    back: 'Back',
    continue: 'Continue',
    sending: 'Sending…',
    send: 'Send request',
    errorSend:
      'We could not send your request right now. Your entries were kept: please try again or reach us on WhatsApp (+351 914 223 323).',
    thankYou: (name) => `Thank you, ${name}!`,
    successBody:
      'We have received your request. Our team will review your company profile and get back to you shortly.',
    exploreSite: 'Explore GetEasier website',
    siteHref: '/en',
    errName: 'Please enter your name.',
    errEmailMissing: 'Please enter your email.',
    errEmailInvalid: 'Please enter a valid email address.',
    errCompany: 'Please enter your company name.',
    errEmployees: 'Please select team size.',
    errCountry: 'Please select the company country.',
    errProducts: 'Please select at least one option.',
    empLabels: { 'Até 50': 'Up to 50', '50-200': '50 – 200', '+200': '200+' },
    products: {
      TimeEasier: { desc: 'Simplified time tracking & schedules' },
      ConstructionEasier: { desc: 'Complete construction & team management' },
      StockEasier: { desc: 'Smart inventory & PPE tracking' },
      WoodEasier: { desc: 'Wood passports & traceability' },
      Custom: {
        title: 'Custom Development',
        desc: 'Tailored web, mobile apps or integrations',
      },
    },
  },
  nl: {
    heroTitle: 'Laten we uw dagelijks werk vereenvoudigen.',
    heroSubtitle:
      'Doorloop 3 snelle stappen en ons team neemt contact op met de juiste oplossing voor uw bedrijf.',
    steps: ['Contact', 'Bedrijf', 'Oplossingen'],
    step1Title: 'Uw contactgegevens',
    step1Subtitle: 'Zodat we weten met wie we contact mogen opnemen.',
    nameLabel: 'Naam *',
    namePlaceholder: 'Bijv. Jan Peeters',
    emailPlaceholder: 'jan@bedrijf.be',
    phoneLabel: 'Gsm-nummer (optioneel)',
    phonePlaceholder: '+32 470 12 34 56',
    step2Title: 'Over uw bedrijf',
    step2Subtitle: 'Helpt ons een voorstel op maat van uw organisatie te maken.',
    companyLabel: 'Bedrijf *',
    companyPlaceholder: 'Naam van uw bedrijf',
    employeesLabel: 'Aantal medewerkers *',
    employeesWord: 'medewerkers',
    countryLabel: 'Land van het bedrijf *',
    step3Title: 'In welke oplossingen bent u geïnteresseerd?',
    step3Subtitle: 'U kunt één of meerdere opties selecteren.',
    notesLabel: 'Extra opmerkingen (optioneel)',
    notesPlaceholder: 'Vertel ons kort over uw uitdaging of wat u wilt automatiseren…',
    privacyText: 'Uw gegevens worden uitsluitend gebruikt om uw aanvraag te beantwoorden. ',
    privacyLink: 'Privacybeleid',
    requiredNote: '* Verplichte velden',
    back: 'Vorige',
    continue: 'Volgende',
    sending: 'Verzenden…',
    send: 'Aanvraag verzenden',
    errorSend:
      'Verzenden is momenteel niet gelukt. Uw gegevens zijn bewaard: probeer opnieuw of contacteer ons via WhatsApp (+351 914 223 323).',
    thankYou: (name) => `Bedankt, ${name}!`,
    successBody:
      'We hebben uw aanvraag ontvangen. Ons team bekijkt uw bedrijfsprofiel en neemt zeer binnenkort contact op.',
    exploreSite: 'Ontdek de GetEasier-website',
    siteHref: '/en',
    errName: 'Vul uw naam in.',
    errEmailMissing: 'Vul uw e-mailadres in.',
    errEmailInvalid: 'Vul een geldig e-mailadres in.',
    errCompany: 'Vul de naam van uw bedrijf in.',
    errEmployees: 'Selecteer het aantal medewerkers.',
    errCountry: 'Selecteer het land van het bedrijf.',
    errProducts: 'Selecteer minstens één optie.',
    empLabels: { 'Até 50': 'Tot 50', '50-200': '50 – 200', '+200': '200+' },
    products: {
      TimeEasier: { desc: 'Eenvoudige tijdsregistratie en uurroosters' },
      ConstructionEasier: { desc: 'Compleet werf- en teambeheer' },
      StockEasier: { desc: 'Slim voorraad- en PBM-beheer' },
      WoodEasier: { desc: 'Houtpaspoorten en traceerbaarheid' },
      Custom: {
        title: 'Maatwerkontwikkeling',
        desc: 'Web-, mobiele apps of integraties op maat',
      },
    },
  },
  es: {
    heroTitle: 'Simplifiquemos tu día a día.',
    heroSubtitle:
      'Completa 3 pasos rápidos y nuestro equipo se pondrá en contacto con la solución adecuada para tu empresa.',
    steps: ['Contacto', 'Empresa', 'Soluciones'],
    step1Title: 'Tus datos de contacto',
    step1Subtitle: 'Para saber con quién hablar.',
    nameLabel: 'Nombre *',
    namePlaceholder: 'Ej.: Carlos García',
    emailPlaceholder: 'carlos@empresa.es',
    phoneLabel: 'Teléfono móvil (opcional)',
    phonePlaceholder: '+34 612 345 678',
    step2Title: 'Sobre tu empresa',
    step2Subtitle: 'Nos ayuda a preparar una propuesta a tu medida.',
    companyLabel: 'Empresa *',
    companyPlaceholder: 'Nombre de tu empresa',
    employeesLabel: 'Número de empleados *',
    employeesWord: 'empleados',
    countryLabel: 'País de la empresa *',
    step3Title: '¿Qué soluciones te interesan?',
    step3Subtitle: 'Puedes seleccionar una o varias opciones.',
    notesLabel: 'Notas adicionales (opcional)',
    notesPlaceholder: 'Cuéntanos brevemente tu reto o qué te gustaría automatizar…',
    privacyText: 'Tus datos se utilizarán únicamente para responder a tu solicitud. ',
    privacyLink: 'Política de privacidad',
    requiredNote: '* Campos obligatorios',
    back: 'Anterior',
    continue: 'Continuar',
    sending: 'Enviando…',
    send: 'Enviar solicitud',
    errorSend:
      'No se pudo enviar en este momento. Tus datos se han conservado: inténtalo de nuevo o contáctanos por WhatsApp (+351 914 223 323).',
    thankYou: (name) => `¡Gracias, ${name}!`,
    successBody:
      'Hemos recibido tu solicitud. Nuestro equipo analizará el perfil de tu empresa y te responderá muy pronto.',
    exploreSite: 'Explorar web de GetEasier',
    siteHref: '/en',
    errName: 'Indica tu nombre.',
    errEmailMissing: 'Indica tu email.',
    errEmailInvalid: 'Introduce un email válido.',
    errCompany: 'Indica el nombre de la empresa.',
    errEmployees: 'Selecciona el tamaño del equipo.',
    errCountry: 'Selecciona el país de la empresa.',
    errProducts: 'Selecciona al menos una opción.',
    empLabels: { 'Até 50': 'Hasta 50', '50-200': '50 – 200', '+200': '+200' },
    products: {
      TimeEasier: { desc: 'Control horario y turnos simplificados' },
      ConstructionEasier: { desc: 'Gestión integral de obras y equipos' },
      StockEasier: { desc: 'Control inteligente de inventario y EPI' },
      WoodEasier: { desc: 'Pasaportes de madera y trazabilidad' },
      Custom: {
        title: 'Desarrollo a Medida',
        desc: 'Software web, móvil o integraciones propias',
      },
    },
  },
  fr: {
    heroTitle: 'Simplifions votre quotidien.',
    heroSubtitle:
      'Répondez à 3 étapes rapides et notre équipe vous contactera avec la solution adaptée à votre entreprise.',
    steps: ['Contact', 'Entreprise', 'Solutions'],
    step1Title: 'Vos coordonnées',
    step1Subtitle: 'Pour savoir à qui nous adresser.',
    nameLabel: 'Nom *',
    namePlaceholder: 'Ex. : Thomas Martin',
    emailPlaceholder: 'thomas@entreprise.be',
    phoneLabel: 'Téléphone mobile (optionnel)',
    phonePlaceholder: '+32 470 12 34 56',
    step2Title: 'À propos de votre entreprise',
    step2Subtitle: 'Cela nous aide à adapter la solution à votre échelle.',
    companyLabel: 'Entreprise *',
    companyPlaceholder: 'Nom de votre entreprise',
    employeesLabel: 'Nombre de collaborateurs *',
    employeesWord: 'collaborateurs',
    countryLabel: "Pays de l'entreprise *",
    step3Title: 'Quelles solutions vous intéressent ?',
    step3Subtitle: 'Vous pouvez sélectionner une ou plusieurs options.',
    notesLabel: 'Notes complémentaires (optionnel)',
    notesPlaceholder: 'Décrivez brièvement votre besoin ou ce que vous souhaitez automatiser…',
    privacyText: 'Vos données seront uniquement utilisées pour répondre à votre demande. ',
    privacyLink: 'Politique de confidentialité',
    requiredNote: '* Champs obligatoires',
    back: 'Précédent',
    continue: 'Continuer',
    sending: 'Envoi en cours…',
    send: 'Envoyer la demande',
    errorSend:
      "Impossible d'envoyer pour le moment. Vos données ont été conservées : réessayez ou contactez-nous sur WhatsApp (+351 914 223 323).",
    thankYou: (name) => `Merci, ${name} !`,
    successBody:
      'Nous avons bien reçu votre demande. Notre équipe va analyser le profil de votre entreprise et vous répondra très bientôt.',
    exploreSite: 'Découvrir le site GetEasier',
    siteHref: '/en',
    errName: 'Veuillez indiquer votre nom.',
    errEmailMissing: 'Veuillez indiquer votre e-mail.',
    errEmailInvalid: 'Veuillez saisir un e-mail valide.',
    errCompany: "Veuillez indiquer le nom de l'entreprise.",
    errEmployees: 'Veuillez sélectionner la taille de l’équipe.',
    errCountry: "Veuillez sélectionner le pays de l'entreprise.",
    errProducts: 'Veuillez sélectionner au moins une option.',
    empLabels: { 'Até 50': "Jusqu'à 50", '50-200': '50 – 200', '+200': '200+' },
    products: {
      TimeEasier: { desc: 'Pointage et gestion des horaires simplifiés' },
      ConstructionEasier: { desc: 'Gestion complète des chantiers et équipes' },
      StockEasier: { desc: 'Suivi intelligent des stocks et EPI' },
      WoodEasier: { desc: 'Passeports bois et traçabilité' },
      Custom: {
        title: 'Développement Sur Mesure',
        desc: 'Applications web, mobiles ou intégrations dédiées',
      },
    },
  },
};

const EMPLOYEE_VALUES: ('Até 50' | '50-200' | '+200')[] = ['Até 50', '50-200', '+200'];

const PRODUCT_META = [
  { id: 'TimeEasier', name: 'TimeEasier', logo: '/images/products/icons/time-easier.png', color: '#4285F4' },
  {
    id: 'ConstructionEasier',
    name: 'ConstructionEasier',
    logo: '/images/products/icons/construction-easier.png',
    color: '#34A853',
  },
  { id: 'StockEasier', name: 'StockEasier', logo: '/images/products/icons/stock-easier.png', color: '#EA4335' },
  { id: 'WoodEasier', name: 'WoodEasier', logo: '/images/products/icons/wood-easier.png', color: '#D4A574' },
  { id: 'Custom', color: '#1b54b8' },
];

export default function QrInteractiveForm({ initialLanguage }: { initialLanguage: QrLanguage }) {
  const [lang, setLang] = useState<QrLanguage>(initialLanguage);
  const [flagMenuOpen, setFlagMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const flagRef = useRef<HTMLDivElement>(null);
  const inFlight = useRef(false);

  const [form, setForm] = useState<QrFormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    employees: '',
    country: '',
    products: [],
    message: '',
    botcheck: false,
  });

  useEffect(() => {
    const closeOutside = (e: MouseEvent) => {
      if (flagRef.current && !flagRef.current.contains(e.target as Node)) {
        setFlagMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', closeOutside);
    return () => document.removeEventListener('mousedown', closeOutside);
  }, []);

  const copy = QR_COPY[lang];

  const validateStep = (currentStep: number): boolean => {
    const nextErrors: FormErrors = {};

    if (currentStep === 1) {
      if (!form.name.trim()) nextErrors.name = copy.errName;
      if (!form.email.trim()) {
        nextErrors.email = copy.errEmailMissing;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
        nextErrors.email = copy.errEmailInvalid;
      }
    }

    if (currentStep === 2) {
      if (!form.company.trim()) nextErrors.company = copy.errCompany;
      if (!form.employees) nextErrors.employees = copy.errEmployees;
      if (!form.country) nextErrors.country = copy.errCountry;
    }

    if (currentStep === 3 && form.products.length === 0) {
      nextErrors.products = copy.errProducts;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
    setStep((prev) => Math.min(3, prev + 1));
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => Math.max(1, prev - 1));
  };

  const toggleProduct = (id: string) => {
    setForm((prev) => {
      const exists = prev.products.includes(id);
      const products = exists ? prev.products.filter((p) => p !== id) : [...prev.products, id];
      return { ...prev, products };
    });
    if (errors.products) setErrors((prev) => ({ ...prev, products: undefined }));
  };

  const getProductTitle = (id: string) => {
    const meta = PRODUCT_META.find((p) => p.id === id);
    return meta?.name ?? copy.products[id]?.title ?? id;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      handleNext();
      return;
    }
    if (inFlight.current || form.botcheck) return;
    if (!validateStep(3)) return;

    inFlight.current = true;
    setStatus('submitting');

    try {
      if (!WEB3FORMS_KEY) throw new Error('Missing NEXT_PUBLIC_WEB3FORMS_KEY');

      const selectedProductNames = form.products.map(getProductTitle);
      const countryObj = COUNTRIES.find((c) => c.code === form.country);
      const countryName = countryObj ? getLocalizedCountryName(countryObj, lang) : form.country;

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `GetEasier — Novo contacto QR (${form.company.trim()})`,
          from_name: `${form.name.trim()} via QR GetEasier`,
          replyto: form.email.trim(),
          Origem: `Formulário QR (${lang.toUpperCase()})`,
          Nome: form.name.trim(),
          Email: form.email.trim(),
          Telemóvel: form.phone.trim() || 'Não indicado',
          Empresa: form.company.trim(),
          Colaboradores: form.employees,
          País: countryName,
          Soluções: selectedProductNames.join(', '),
          ...(form.message.trim() ? { Notas: form.message.trim() } : {}),
          botcheck: '',
        }),
        signal: AbortSignal.timeout(15000),
      });

      const out = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (!res.ok || !out?.success) throw new Error('Web3Forms failed');
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      inFlight.current = false;
    }
  };

  const progressPercent = (step / 3) * 100;
  const inputCls =
    'block h-12 w-full rounded-2xl border border-linha bg-papel/60 pl-10 pr-4 text-body text-tinta placeholder:text-grafite/70 focus:border-azul focus:outline-none focus:ring-2 focus:ring-azul/25';

  return (
    <div className="min-h-[100dvh] bg-papel text-tinta flex flex-col">
      {/* Minimal mobile-first top bar */}
      <header className="sticky top-0 z-40 border-b border-linha/70 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4 sm:px-6">
          <Link href={copy.siteHref} aria-label="GetEasier" className="text-tinta">
            <Logo idPrefix="logo-qr" className="h-7 w-auto" />
          </Link>

          <div ref={flagRef} className="relative">
            <button
              type="button"
              onClick={() => setFlagMenuOpen((prev) => !prev)}
              aria-label={FLAG_META.find((f) => f.code === lang)?.name}
              aria-expanded={flagMenuOpen}
              className="flex items-center gap-1.5 rounded-xl px-2.5 py-2 hover:bg-papel transition-colors"
            >
              <FlagIcon code={lang} />
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className={`h-3.5 w-3.5 text-grafite transition-transform duration-200 ${
                  flagMenuOpen ? 'rotate-180' : ''
                }`}
              >
                <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {flagMenuOpen && (
              <div className="absolute right-0 mt-2 flex flex-col gap-1 rounded-xl border border-linha bg-white p-1.5 shadow-xl z-50">
                {FLAG_META.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    title={item.name}
                    aria-label={item.name}
                    onClick={() => {
                      setLang(item.code);
                      setErrors({});
                      setFlagMenuOpen(false);
                    }}
                    className={`flex items-center justify-center rounded-lg p-2 transition-colors ${
                      lang === item.code ? 'bg-azul/10 ring-1 ring-azul/40' : 'hover:bg-papel'
                    }`}
                  >
                    <FlagIcon code={item.code} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main interactive form */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
        <div className="w-full max-w-2xl">
          <div className="mb-7 text-center">
            <h1 className="t-h1 text-tinta">{copy.heroTitle}</h1>
            <p className="mx-auto mt-3 max-w-lg text-body text-grafite">{copy.heroSubtitle}</p>
          </div>

          <div className="rounded-3xl border border-linha bg-white shadow-lg shadow-tinta/5 overflow-visible">
            {status === 'success' ? (
              <div className="p-8 text-center sm:p-12 space-y-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-estado-valido/15 text-estado-valido">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-9 w-9">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h2 className="t-h2 text-tinta">{copy.thankYou(form.name.trim().split(' ')[0])}</h2>
                  <p className="mx-auto max-w-md text-body text-grafite">{copy.successBody}</p>
                </div>

                <div className="mx-auto max-w-md rounded-2xl border border-linha/80 bg-papel p-4 text-left text-small space-y-2">
                  <p className="font-semibold text-tinta">
                    {form.company} · {copy.empLabels[form.employees as 'Até 50' | '50-200' | '+200'] ?? form.employees}{' '}
                    {copy.employeesWord}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {form.products.map((id) => (
                      <span
                        key={id}
                        className="inline-flex items-center rounded-full border border-azul/25 bg-azul/10 px-2.5 py-1 text-xs font-medium text-azul"
                      >
                        {getProductTitle(id)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
                  <Link href={copy.siteHref} className="btn-primary w-full justify-center sm:w-auto">
                    {copy.exploreSite}
                  </Link>
                  <a
                    href={COMPANY.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-linha bg-white px-5 font-semibold text-tinta hover:bg-papel sm:w-auto"
                  >
                    WhatsApp · {COMPANY.whatsapp.display}
                  </a>
                </div>
              </div>
            ) : (
              <>
                {/* Progress header */}
                <div className="border-b border-linha/60 px-6 pb-4 pt-6 sm:px-8">
                  <div className="mb-4 flex items-center gap-2 sm:gap-3">
                    {copy.steps.map((label, idx) => {
                      const num = idx + 1;
                      const isActive = step === num;
                      const isDone = step > num;
                      return (
                        <div key={label} className="flex items-center gap-1.5 sm:gap-2">
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors duration-300 ${
                              isDone
                                ? 'bg-estado-valido text-white'
                                : isActive
                                ? 'bg-azul text-white'
                                : 'bg-papel text-grafite'
                            }`}
                          >
                            {isDone ? '✓' : num}
                          </span>
                          <span
                            className={`text-xs sm:text-small font-semibold transition-colors ${
                              isActive ? 'text-tinta' : 'hidden text-grafite/60 sm:inline'
                            }`}
                          >
                            {label}
                          </span>
                          {idx < copy.steps.length - 1 && (
                            <span className="mx-0.5 h-px w-3 bg-linha sm:w-5" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-papel">
                    <div
                      className="h-full rounded-full bg-azul transition-all duration-300 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Form body */}
                <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8">
                  {step === 1 && (
                    <div className="space-y-5">
                      <div>
                        <h2 className="t-h3 text-tinta">{copy.step1Title}</h2>
                        <p className="mt-1 text-small text-grafite">{copy.step1Subtitle}</p>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="qr-name" className="block font-semibold text-tinta">
                          {copy.nameLabel}
                        </label>
                        <div className="relative">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grafite"
                          >
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20a8 8 0 0 1 16 0" strokeLinecap="round" />
                          </svg>
                          <input
                            id="qr-name"
                            autoComplete="name"
                            placeholder={copy.namePlaceholder}
                            value={form.name}
                            onChange={(e) => {
                              setForm((prev) => ({ ...prev, name: e.target.value }));
                              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                            }}
                            aria-invalid={!!errors.name}
                            className={inputCls}
                          />
                        </div>
                        {errors.name && (
                          <p role="alert" className="text-small text-estado-erro">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="qr-email" className="block font-semibold text-tinta">
                          Email *
                        </label>
                        <div className="relative">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grafite"
                          >
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="m3 7 9 6 9-6" />
                          </svg>
                          <input
                            id="qr-email"
                            type="email"
                            autoComplete="email"
                            inputMode="email"
                            placeholder={copy.emailPlaceholder}
                            value={form.email}
                            onChange={(e) => {
                              setForm((prev) => ({ ...prev, email: e.target.value }));
                              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                            }}
                            aria-invalid={!!errors.email}
                            className={inputCls}
                          />
                        </div>
                        {errors.email && (
                          <p role="alert" className="text-small text-estado-erro">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="qr-phone" className="block font-semibold text-tinta">
                          {copy.phoneLabel}
                        </label>
                        <div className="relative">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grafite"
                          >
                            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                          </svg>
                          <input
                            id="qr-phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder={copy.phonePlaceholder}
                            value={form.phone}
                            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                            className={inputCls}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-5">
                      <div>
                        <h2 className="t-h3 text-tinta">{copy.step2Title}</h2>
                        <p className="mt-1 text-small text-grafite">{copy.step2Subtitle}</p>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="qr-company" className="block font-semibold text-tinta">
                          {copy.companyLabel}
                        </label>
                        <div className="relative">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grafite"
                          >
                            <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 11h4a1 1 0 0 1 1 1v9M2 21h20M8 7h4M8 11h4M8 15h4" strokeLinecap="round" />
                          </svg>
                          <input
                            id="qr-company"
                            autoComplete="organization"
                            placeholder={copy.companyPlaceholder}
                            value={form.company}
                            onChange={(e) => {
                              setForm((prev) => ({ ...prev, company: e.target.value }));
                              if (errors.company)
                                setErrors((prev) => ({ ...prev, company: undefined }));
                            }}
                            aria-invalid={!!errors.company}
                            className={inputCls}
                          />
                        </div>
                        {errors.company && (
                          <p role="alert" className="text-small text-estado-erro">
                            {errors.company}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <span className="block font-semibold text-tinta">{copy.employeesLabel}</span>
                        <div className="grid grid-cols-3 gap-2.5 sm:gap-3" role="radiogroup">
                          {EMPLOYEE_VALUES.map((val) => {
                            const selected = form.employees === val;
                            return (
                              <button
                                key={val}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                onClick={() => {
                                  setForm((prev) => ({ ...prev, employees: val }));
                                  if (errors.employees)
                                    setErrors((prev) => ({ ...prev, employees: undefined }));
                                }}
                                className={`flex items-center justify-between gap-1 rounded-2xl border p-3.5 text-left transition-all active:scale-[0.98] sm:p-4 ${
                                  selected
                                    ? 'border-azul bg-azul/10 ring-2 ring-azul/20'
                                    : 'border-linha bg-white hover:border-grafite/60 hover:bg-papel/60'
                                }`}
                              >
                                <span className={`text-sm font-bold sm:text-body ${selected ? 'text-azul' : 'text-tinta'}`}>
                                  {copy.empLabels[val]}
                                </span>
                                {selected && (
                                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-azul text-[10px] font-bold text-white">
                                    ✓
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                        {errors.employees && (
                          <p role="alert" className="text-small text-estado-erro">
                            {errors.employees}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="qr-country" className="block font-semibold text-tinta">
                          {copy.countryLabel}
                        </label>
                        <CountrySelect
                          id="qr-country"
                          value={form.country}
                          lang={lang}
                          hasError={!!errors.country}
                          onChange={(code) => {
                            setForm((prev) => ({ ...prev, country: code }));
                            if (errors.country) setErrors((prev) => ({ ...prev, country: undefined }));
                          }}
                        />
                        {errors.country && (
                          <p role="alert" className="text-small text-estado-erro">
                            {errors.country}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-5">
                      <div>
                        <h2 className="t-h3 text-tinta">{copy.step3Title}</h2>
                        <p className="mt-1 text-small text-grafite">{copy.step3Subtitle}</p>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {PRODUCT_META.map((prod) => {
                          const selected = form.products.includes(prod.id);
                          const isCustom = prod.id === 'Custom';
                          const title = prod.name ?? copy.products[prod.id].title!;
                          const desc = copy.products[prod.id].desc;
                          return (
                            <button
                              key={prod.id}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => toggleProduct(prod.id)}
                              className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all active:scale-[0.98] ${
                                isCustom ? 'sm:col-span-2' : ''
                              } ${
                                selected
                                  ? 'border-azul bg-azul/10 ring-2 ring-azul/20'
                                  : 'border-linha bg-white hover:border-grafite/60 hover:bg-papel/60'
                              }`}
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-linha/70 bg-white shadow-sm">
                                {prod.logo ? (
                                  <Image
                                    src={prod.logo}
                                    alt={title}
                                    width={28}
                                    height={28}
                                    className="h-7 w-7 object-contain"
                                  />
                                ) : (
                                  <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke={prod.color}
                                    strokeWidth="2"
                                    className="h-5 w-5"
                                  >
                                    <path d="m8 17-5-5 5-5M16 7l5 5-5 5M13.5 4l-3 16" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="truncate text-small font-semibold text-tinta">{title}</div>
                                <div className="truncate text-xs text-grafite">{desc}</div>
                              </div>

                              <span
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                                  selected
                                    ? 'border-azul bg-azul text-white'
                                    : 'border-linha bg-white'
                                }`}
                              >
                                {selected ? '✓' : ''}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {errors.products && (
                        <p role="alert" className="text-small text-estado-erro">
                          {errors.products}
                        </p>
                      )}

                      <div className="space-y-1.5">
                        <label htmlFor="qr-message" className="block font-semibold text-tinta">
                          {copy.notesLabel}
                        </label>
                        <textarea
                          id="qr-message"
                          rows={4}
                          placeholder={copy.notesPlaceholder}
                          value={form.message}
                          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                          className="block w-full resize-y rounded-2xl border border-linha bg-papel/60 p-3.5 text-body text-tinta placeholder:text-grafite/70 focus:border-azul focus:outline-none focus:ring-2 focus:ring-azul/25"
                        />
                      </div>

                      <input
                        type="checkbox"
                        name="botcheck"
                        tabIndex={-1}
                        aria-hidden="true"
                        checked={form.botcheck}
                        onChange={(e) => setForm((prev) => ({ ...prev, botcheck: e.target.checked }))}
                        className="hidden"
                      />

                      <p className="text-xs text-grafite">
                        {copy.privacyText}
                        <Link href="/privacy-policy" className="underline underline-offset-2">
                          {copy.privacyLink}
                        </Link>
                        .
                      </p>
                    </div>
                  )}

                  {status === 'error' && (
                    <p
                      role="alert"
                      className="mt-4 rounded-2xl border border-estado-erro/30 bg-estado-erro/10 p-3.5 text-small text-estado-erro"
                    >
                      {copy.errorSend}
                    </p>
                  )}

                  <div className="mt-7 flex items-center justify-between gap-3 border-t border-linha/60 pt-5">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={status === 'submitting'}
                        className="inline-flex h-12 items-center gap-2 rounded-2xl border border-linha bg-white px-4 text-small font-semibold text-tinta hover:bg-papel"
                      >
                        ← {copy.back}
                      </button>
                    ) : (
                      <span className="text-xs font-medium text-grafite">{copy.requiredNote}</span>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="btn-primary ml-auto disabled:opacity-60"
                    >
                      {step < 3
                        ? `${copy.continue} →`
                        : status === 'submitting'
                        ? copy.sending
                        : `${copy.send} →`}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
