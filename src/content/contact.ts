import type { Locale } from '@/lib/seo.config'

export const SUBJECT_IDS = [
  'projeto',
  'demo-time-easier',
  'demo-construction-easier',
  'demo-stock-easier',
  'demo-wood-easier',
  'planos',
  'outro',
] as const
export type SubjectId = (typeof SUBJECT_IDS)[number]

const pt = {
  h1: 'Fale connosco',
  lead: 'Escreva-nos sobre um projeto de software à medida, peça uma demonstração de um produto ou uma proposta de plano. Respondemos por email.',
  form: {
    title: 'Enviar mensagem',
    name: 'Nome',
    email: 'Email',
    company: 'Empresa (opcional)',
    subject: 'Assunto',
    message: 'Mensagem',
    messageHint: 'O que a sua equipa faz hoje e o que gostaria de mudar.',
    submit: 'Enviar mensagem',
    sending: 'A enviar…',
    success: 'Mensagem enviada. Respondemos para o email que indicou.',
    error: 'Não foi possível enviar a mensagem. Tente de novo ou escreva-nos no WhatsApp.',
    required: 'Campo obrigatório',
    invalidEmail: 'Indique um email válido, por exemplo nome@empresa.pt',
    privacy: 'Usamos estes dados só para responder à sua mensagem, como explica a',
    privacyLink: 'Política de Privacidade',
  },
  subjects: {
    projeto: 'Projeto de software à medida',
    'demo-time-easier': 'Demonstração do TimeEasier',
    'demo-construction-easier': 'Demonstração do ConstructionEasier',
    'demo-stock-easier': 'Demonstração do StockEasier',
    'demo-wood-easier': 'Demonstração do WoodEasier',
    planos: 'Proposta de plano',
    outro: 'Outro assunto',
  } satisfies Record<SubjectId, string>,
  otherTitle: 'Outras formas de contacto',
  whatsapp: 'WhatsApp',
  social: 'Redes sociais',
  address: 'Sede',
}

export type ContactDict = typeof pt

const en: ContactDict = {
  h1: 'Get in touch',
  lead: 'Write to us about a custom software project, ask for a product demo or for a plan quote. We reply by email.',
  form: {
    title: 'Send a message',
    name: 'Name',
    email: 'Email',
    company: 'Company (optional)',
    subject: 'Subject',
    message: 'Message',
    messageHint: 'What your team does today and what you would like to change.',
    submit: 'Send message',
    sending: 'Sending…',
    success: 'Message sent. We will reply to the email you gave us.',
    error: 'We could not send your message. Please try again or message us on WhatsApp.',
    required: 'Required field',
    invalidEmail: 'Enter a valid email, for example name@company.com',
    privacy: 'We only use this data to reply to your message, as explained in the',
    privacyLink: 'Privacy Policy (in Portuguese)',
  },
  subjects: {
    projeto: 'Custom software project',
    'demo-time-easier': 'TimeEasier demo',
    'demo-construction-easier': 'ConstructionEasier demo',
    'demo-stock-easier': 'StockEasier demo',
    'demo-wood-easier': 'WoodEasier demo',
    planos: 'Plan quote',
    outro: 'Something else',
  },
  otherTitle: 'Other ways to reach us',
  whatsapp: 'WhatsApp',
  social: 'Social media',
  address: 'Registered office',
}

export const contact: Record<Locale, ContactDict> = { pt, en }
