import emailjs from '@emailjs/browser';

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
  interest: string;
}

export async function sendContactEmail(data: ContactRequest, product?: string) {
  const service = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const template = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const key = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  const interests: Record<string, string> = {
    custom: 'Desenvolvimento à medida', demo: 'Demonstração de produto', other: 'Outro',
  };
  const message = `Interesse: ${interests[data.interest] || interests.other}${product ? ` — ${product}` : ''}\n\n${data.message.trim()}`;
  if (service && template && key) {
    await emailjs.send(service, template, {
      from_name: data.name.trim(), from_email: data.email.trim(),
      reply_to: data.email.trim(), message,
    }, { publicKey: key });
  } else if (web3formsKey) {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: web3formsKey, name: data.name.trim(), email: data.email.trim(),
        message, subject: 'GetEasier — Pedido de contacto', botcheck: false,
      }),
      signal: AbortSignal.timeout(15000),
    });
    const result = await response.json();
    if (!response.ok || result.success !== true) throw new Error('Email delivery failed');
  } else {
    throw new Error('Email service unavailable');
  }
}
