import { NextResponse } from 'next/server';

/**
 * Pedido de contacto do formulário rápido (/f/...) → lead no Portal de Parceiros (parceiros.geteasier.pt).
 *
 * O browser fala só com este endpoint; o segredo partilhado com o portal (PARTNERS_INBOUND_KEY) fica no
 * servidor (variável da Vercel, sem NEXT_PUBLIC_) e nunca chega ao visitante. O email do Web3Forms continua a
 * ser enviado pelo formulário em paralelo, por isso uma falha aqui não perde o pedido.
 */

const PORTAL_URL = process.env.PARTNERS_LEADS_URL ?? 'https://parceiros.geteasier.pt/api/inbound/website-leads';
const PORTAL_KEY = process.env.PARTNERS_INBOUND_KEY;

const str = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: Request) {
  // Só aceita pedidos vindos das páginas deste site (o browser põe sempre o Origin num POST com fetch).
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }
  if (!PORTAL_KEY) {
    return NextResponse.json({ ok: false, reason: 'not-configured' }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  // Campo-armadilha preenchido = robô: responde como se tivesse corrido bem e não grava nada.
  if (body.botcheck) {
    return NextResponse.json({ ok: true });
  }

  const payload = {
    name: str(body.name, 150),
    email: str(body.email, 254),
    phone: str(body.phone, 30) || null,
    company: str(body.company, 150),
    employees: str(body.employees, 30) || null,
    country: str(body.country, 2),
    products: Array.isArray(body.products) ? body.products.slice(0, 10).map((p) => str(p, 40)).filter(Boolean) : [],
    message: str(body.message, 1500) || null,
    language: str(body.language, 5) || null,
  };
  if (!payload.name || !payload.email || !payload.company || payload.country.length !== 2) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const res = await fetch(PORTAL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Inbound-Key': PORTAL_KEY },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('Portal de parceiros recusou o lead', res.status);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('Portal de parceiros indisponível', error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
