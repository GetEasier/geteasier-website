// Ícones de traço da página de software à medida (24×24, cor do texto).

const svg = { viewBox: '0 0 24 24', className: 'h-5 w-5', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }

export const BUILD_ICONS = [
  <svg key="web" {...svg}>
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="M3 8h18M8 21h8" />
  </svg>,
  <svg key="app" {...svg}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="M11 18.5h2" />
  </svg>,
  <svg key="int" {...svg}>
    <path d="M8 7h9l-3-3M16 17H7l3 3" />
  </svg>,
  <svg key="multi" {...svg}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>,
  <svg key="support" {...svg}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="3" y="14" width="4" height="6" rx="1.5" />
    <rect x="17" y="14" width="4" height="6" rx="1.5" />
  </svg>,
]

export const PROCESS_ICONS = [
  <svg key="discover" {...svg}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </svg>,
  <svg key="plan" {...svg}>
    <path d="M4 20V8l5-4 6 4 5-4v12l-5 4-6-4z" />
    <path d="M9 4v12M15 8v12" />
  </svg>,
  <svg key="sprint" {...svg}>
    <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4" />
  </svg>,
  <svg key="ship" {...svg}>
    <path d="M12 3c3 2 5 5.5 5 10l-2.5 3h-5L7 13c0-4.5 2-8 5-10z" />
    <circle cx="12" cy="10" r="1.6" />
    <path d="M9.5 19.5L12 22l2.5-2.5" />
  </svg>,
  <svg key="evolve" {...svg}>
    <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
  </svg>,
]

const DATABASE = (
  <svg {...svg}>
    <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
    <path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" />
  </svg>
)
const LOCK = (
  <svg {...svg}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </svg>
)
const PULSE = (
  <svg {...svg}>
    <path d="M3 12h4l2.5-6 5 12L17 12h4" />
  </svg>
)

export const ARCH_ICONS: Record<string, React.ReactNode> = {
  channels: BUILD_ICONS[0],
  access: LOCK,
  services: BUILD_ICONS[3],
  data: DATABASE,
  integrations: BUILD_ICONS[2],
  ops: PULSE,
}

export const ARROW = (
  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
)
