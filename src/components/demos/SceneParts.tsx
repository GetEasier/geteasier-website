import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Peças das cenas das demos (coordenadas de desenho em px; a cena inteira é escalada).

// Janela da webapp, com o layout real (capturas do staging, 29/09): header branco de 56px,
// menu lateral com grupos, fundo #f5f7fa e painéis brancos com raio de 8px e borda #e5e7eb.
export function Browser({
  product,
  group,
  nav,
  active,
  className,
  children,
}: {
  product: string;
  group: string;
  nav: string[];
  active: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute flex flex-col overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_24px_60px_-30px_rgba(6,8,60,.5)]",
        className,
      )}
      style={{
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div className="flex items-center gap-1.5 border-b border-[#e5e7eb] bg-[#f5f7fa] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 rounded bg-white px-3 py-0.5 text-[12px] text-[#64748b]">
          app.geteasier.pt
        </span>
      </div>
      <div className="flex h-14 shrink-0 items-center border-b border-[#e5e7eb] bg-white px-4">
        <span className="flex w-[174px] items-center gap-2 font-semibold text-[#1e293b]">
          <span
            className="grid h-7 w-7 place-items-center rounded-md text-[13px] font-bold text-white"
            style={{ backgroundColor: "var(--app)" }}
          >
            {product.slice(0, 1)}
          </span>
          {product}
        </span>
        <span className="ml-auto h-8 w-48 rounded-md border border-[#e5e7eb] bg-[#f5f7fa]" />
        <span className="ml-3 grid h-8 w-8 place-items-center rounded-full bg-[#e2e8f0] text-[12px] font-semibold text-[#475569]">
          A
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        <nav className="w-[190px] shrink-0 border-r border-[#e5e7eb] bg-white px-2 py-3 text-[14px]">
          <p className="mb-1 flex items-center justify-between px-3 text-[11px] font-semibold uppercase tracking-wide text-[#94a3b8]">
            {group}
            <span>▾</span>
          </p>
          {nav.map((n, i) => (
            <span
              key={n}
              className={cn(
                "mb-0.5 block rounded-md px-3 py-2",
                i === active ? "font-semibold" : "text-[#475569]",
              )}
              style={
                i === active
                  ? {
                      color: "var(--app)",
                      backgroundColor:
                        "color-mix(in srgb, var(--app) 10%, white)",
                    }
                  : undefined
              }
            >
              {n}
            </span>
          ))}
        </nav>
        <div className="relative min-w-0 flex-1 bg-[#f5f7fa] p-4 text-[14px] text-[#1e293b]">
          {children}
        </div>
      </div>
    </div>
  );
}

// Barra de ações por cima das listas: botão principal na cor do produto, navegador de data e filtros.
export function ActionBar({
  primary,
  date,
  filters,
  click,
}: {
  primary: string;
  date: string;
  filters: string;
  click?: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-2 text-[13px]">
      <span
        data-click={click}
        className="rounded-md px-3 py-1.5 font-semibold text-white"
        style={{ backgroundColor: "var(--app)" }}
      >
        {primary}
      </span>
      <span className="flex items-center gap-2 rounded-md border border-[#e5e7eb] bg-white px-2.5 py-1.5 text-[#1e293b]">
        <span className="text-[#94a3b8]">‹</span>
        {date}
        <span className="text-[#94a3b8]">›</span>
      </span>
      <span className="ml-auto rounded-md border border-[#e5e7eb] bg-white px-3 py-1.5 text-[#475569]">
        {filters}
      </span>
    </div>
  );
}

// Tablet de picagem: fundo índigo em gradiente, como na app real.
export function Tablet({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute rounded-[28px] bg-[#111827] p-3 shadow-[0_30px_60px_-30px_rgba(6,8,60,.8)]",
        className,
      )}
    >
      <div
        className="relative h-full overflow-hidden rounded-[18px] text-white"
        style={{
          background: "linear-gradient(180deg, #3e4f8e, #2d3d78)",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function Phone({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      }}
      className={cn(
        "absolute rounded-[34px] border-[7px] border-tinta bg-white shadow-[0_30px_60px_-30px_rgba(6,8,60,.8)]",
        className,
      )}
    >
      <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-tinta" />
      <div className="relative h-full overflow-hidden rounded-[26px] px-4 pb-4 pt-9 text-[14px]">
        {children}
      </div>
    </div>
  );
}

export function Card({
  title,
  className,
  children,
  focus,
}: {
  title?: string;
  className?: string;
  children: ReactNode;
  focus?: string;
}) {
  return (
    <div
      data-focus={focus}
      className={cn(
        "rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,.1),0_1px_2px_-1px_rgba(0,0,0,.1)]",
        className,
      )}
    >
      {title && <p className="mb-3 font-semibold text-[#1e293b]">{title}</p>}
      {children}
    </div>
  );
}

export function Tick({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("h-4 w-4 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  );
}

export function SampleTag({ text }: { text: string }) {
  return (
    <span className="t-data absolute bottom-3 left-4 rounded bg-white/90 px-2 py-0.5 text-[12px] text-grafite">
      {text}
    </span>
  );
}
