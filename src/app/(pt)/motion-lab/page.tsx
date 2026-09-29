import type { Metadata } from 'next'
import SiteShell from '@/components/site/SiteShell'
import FaceCheck from '@/components/checkin/FaceCheck'
import Kiosk from '@/components/checkin/Kiosk'
import KioskLoop from '@/components/checkin/KioskLoop'
import Badge from '@/components/checkin/Badge'
import CheckInHero from '@/components/checkin/CheckInHero'
import Stats from '@/components/home/Stats'
import DocRead from '@/components/ce/DocRead'
import GateFeed from '@/components/ce/GateFeed'
import ModuleTabs from '@/components/ce/ModuleTabs'
import Profiles from '@/components/ce/Profiles'
import Faq from '@/components/ui/Faq'
import { home } from '@/content/home'
import { construction } from '@/content/construction'
import { DUR, EASE, LOOP_PAUSE, STAGGER, TAB_ADVANCE } from '@/motion/tokens'

// Laboratório de motion: todas as primitivas isoladas, para rever timing e estados.
// Fora do sitemap, sem ligações no site e com noindex.
export const metadata: Metadata = {
  title: 'Motion lab | GetEasier',
  robots: { index: false, follow: false },
}

function Block({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-caixa py-12">
      <h2 className="t-h3">{title}</h2>
      {note && <p className="mt-2 max-w-prose text-grafite">{note}</p>}
      <div className="mt-6">{children}</div>
    </section>
  )
}

export default function MotionLab() {
  const h = home.pt
  const c = construction.pt
  const tokens: [string, string][] = [
    ['--dur-micro', `${DUR.micro * 1000} ms`],
    ['--dur-ui', `${DUR.ui * 1000} ms`],
    ['--dur-reveal', `${DUR.reveal * 1000} ms`],
    ['--dur-narrativa', `${DUR.narrativa * 1000} ms`],
    ['--stagger', `${STAGGER * 1000} ms`],
    ['--loop-pausa', `${LOOP_PAUSE} ms`],
    ['avanço dos separadores', `${TAB_ADVANCE} ms`],
    ['--ease-entrada', `cubic-bezier(0.16, 1, 0.3, 1) = ${EASE.entrada}`],
    ['--ease-estado', `cubic-bezier(0.65, 0, 0.35, 1) = ${EASE.estado}`],
    ['--ease-confirma', EASE.confirma],
  ]
  return (
    <SiteShell pageId={null} locale="pt">
      <div className="wrap py-12">
        <h1 className="t-h1">Motion lab</h1>
        <p className="mt-3 max-w-prose text-lead text-grafite">
          As primitivas de animação do site, isoladas. Experimente com &quot;reduzir movimento&quot; ligado no sistema: tudo fica no estado final.
        </p>

        <Block title="Motion tokens">
          <dl className="grid max-w-2xl gap-2">
            {tokens.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[14rem_1fr] border-b border-caixa pb-2">
                <dt className="font-semibold">{k}</dt>
                <dd className="t-data">{v}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block title="Reconhecimento facial: os quatro estados" note="Espera, a reconhecer, reconhecido (o único salto do site) e erro.">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {(['wait', 'scan', 'ok', 'error'] as const).map((s) => (
              <div key={s} aria-hidden="true">
                <Kiosk label={s}>
                  <FaceCheck state={s} />
                </Kiosk>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Quiosque em loop">
          <KioskLoop labels={{ pause: 'Pausar', play: 'Retomar', summary: 'Tablet em loop.' }} />
        </Block>

        <Block title="Crachá">
          <div className="grid max-w-3xl gap-4 sm:grid-cols-3">
            <Badge name="Rui Marques" company="Cofragens Tejo" time="07:42" status="ok" statusText="Documentos em dia" />
            <Badge name="Hugo Tavares" company="Cofragens Tejo" status="soon" statusText="Seguro expira em 12 dias" />
            <Badge name="Ana Figueiredo" company="Eletro Douro" status="missing" statusText="Seguro caducado" />
          </div>
        </Block>

        <Block title="Hero do check-in">
          <CheckInHero t={h.hero} />
        </Block>

        <Block title="Contadores" note="Sobem uma vez ao entrar no ecrã. Os do início ficam [CONFIRMAR] até haver números reais.">
          <Stats
            items={[
              { value: 38, suffix: '', label: 'Exemplo: entradas verificadas' },
              { value: 12, suffix: '', label: 'Exemplo: documentos validados' },
              { value: 1250, suffix: '', label: 'Exemplo: registos' },
            ]}
          />
        </Block>

        <Block title="Leitura de documento [CONFIRMAR]">
          <DocRead t={c.modes.doc} run={1} />
        </Block>

        <Block title="Portaria e feed com Flip">
          <GateFeed t={c.gateFeed} />
        </Block>

        <Block title="Separadores com avanço automático">
          <ModuleTabs t={c.modules} ctaHref="/contactos" />
        </Block>

        <Block title="Perfis">
          <Profiles t={c.profiles} />
        </Block>

        <Block title="Acordeão">
          <div className="max-w-3xl">
            <Faq items={h.faq} />
          </div>
        </Block>
      </div>
    </SiteShell>
  )
}
