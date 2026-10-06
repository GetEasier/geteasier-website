import type { ReactNode } from "react";
import type { Locale } from "@/lib/seo.config";
import { cn } from "@/lib/utils";

// Moldura das demos: uma janela simples com o nome do ecrã e o aviso de que os dados são de exemplo.
export default function DemoWindow({
  locale,
  title,
  children,
  className,
}: {
  locale: Locale;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-frame border border-tinta/80 bg-papel shadow-[0_1px_0_#C9D1DE]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-tinta/80 bg-white px-4 py-2.5">
        <span className="truncate text-small font-semibold">{title}</span>
        <span className="t-data shrink-0 text-grafite">
          {locale === "pt" ? "dados de exemplo" : "sample data"}
        </span>
      </div>
      <div className="p-4 text-small sm:p-5">{children}</div>
    </div>
  );
}

export function Check({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("h-4 w-4 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  );
}

export function Warn({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("h-4 w-4 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    >
      <path d="M8 1.8L15 14H1z" />
      <path d="M8 6.2v3.6M8 11.4v.8" strokeLinecap="round" />
    </svg>
  );
}

export function Cross({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("h-4 w-4 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

export function Bell({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("h-4 w-4 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    >
      <path d="M4 11V7a4 4 0 018 0v4l1.2 1.5H2.8z" />
      <path d="M6.5 14a1.6 1.6 0 003 0" strokeLinecap="round" />
    </svg>
  );
}

export function Pin({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("h-3.5 w-3.5 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M8 15s5-4.6 5-8.5a5 5 0 00-10 0C3 10.4 8 15 8 15z" />
      <circle cx="8" cy="6.5" r="1.7" />
    </svg>
  );
}

// Malha abstrata de um rosto: pontos, nunca uma fotografia.
const MESH = [
  [50, 18],
  [40, 22],
  [60, 22],
  [32, 30],
  [68, 30],
  [29, 41],
  [71, 41],
  [31, 52],
  [69, 52],
  [38, 62],
  [62, 62],
  [50, 67],
  [42, 38],
  [58, 38],
  [50, 46],
  [44, 55],
  [56, 55],
  [36, 45],
  [64, 45],
];

export function FaceMesh({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 84" className={className} fill="currentColor">
      <g stroke="currentColor" strokeWidth="0.5" opacity="0.35" fill="none">
        <path d="M50 18L40 22 32 30 29 41 31 52 38 62 50 67 62 62 69 52 71 41 68 30 60 22z" />
        <path d="M42 38L50 46 58 38M44 55L50 58 56 55M36 45L42 38M64 45L58 38" />
      </g>
      {MESH.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" />
      ))}
    </svg>
  );
}
