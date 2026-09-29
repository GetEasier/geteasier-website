"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const INTERVAL = 3800;
// Momentos dentro de cada passo: o cursor vai até ao alvo, clica, e o passo seguinte entra.
const MOVE_AT = 700;
const CLICK_AT = 2100;
const RELEASE_AT = 2350;

type Props = {
  steps: string[];
  labels: { pause: string; play: string; step: string; list: string };
  accent: string;
  children: ReactNode;
};

// Demo que avança sozinha, passo a passo, enquanto está visível no ecrã.
// Tem pausa (movimento com mais de 5 s) e botões para cada passo. Com "reduzir movimento",
// ou sem JavaScript, fica parada no último passo, que mostra toda a informação.
// O texto de todos os passos está numa lista para leitores de ecrã; a parte visual é aria-hidden.
export default function AutoDemo({ steps, labels, accent, children }: Props) {
  const last = steps.length - 1;
  const [step, setStep] = useState(last);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const [motionOk, setMotionOk] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const onChange = () => setMotionOk(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.3,
    });
    if (ref.current) io.observe(ref.current);
    return () => {
      mq.removeEventListener("change", onChange);
      io.disconnect();
    };
  }, []);

  const running = playing && visible && motionOk;
  const [cursor, setCursor] = useState({ x: 0, y: 0, on: false, down: false });
  const [ripple, setRipple] = useState<{
    x: number;
    y: number;
    n: number;
  } | null>(null);

  // Cada passo, como num GIF de produto: o cursor vai ao elemento com data-click="passo",
  // clica, e a demo avança. Um passo sem alvo avança sozinho, com o cursor fora de vista.
  useEffect(() => {
    const timers: number[] = [];
    const later = (ms: number, fn: () => void) =>
      timers.push(window.setTimeout(fn, ms));
    if (!running) {
      later(0, () => setCursor((c) => ({ ...c, on: false, down: false })));
      return () => timers.forEach(window.clearTimeout);
    }
    const box = ref.current?.querySelector<HTMLElement>(".demo");
    const target = box?.querySelector<HTMLElement>(`[data-click~="${step}"]`);
    const at = () => {
      const b = box!.getBoundingClientRect();
      const r = target!.getBoundingClientRect();
      return {
        x: r.left - b.left + Math.min(r.width * 0.6, 60),
        y: r.top - b.top + r.height * 0.55,
      };
    };
    if (box && target) {
      later(MOVE_AT, () => setCursor({ ...at(), on: true, down: false }));
      later(CLICK_AT, () => {
        const p = at();
        setCursor({ ...p, on: true, down: true });
        setRipple((r) => ({ ...p, n: (r?.n ?? 0) + 1 }));
        target.classList.add("is-pressed");
      });
      later(RELEASE_AT, () => {
        setCursor((c) => ({ ...c, down: false }));
        target.classList.remove("is-pressed");
      });
    } else {
      later(200, () => setCursor((c) => ({ ...c, on: false })));
    }
    later(INTERVAL, () => setStep((s) => (s + 1) % steps.length));
    return () => {
      timers.forEach(window.clearTimeout);
      target?.classList.remove("is-pressed");
    };
  }, [running, step, steps.length]);

  return (
    <div ref={ref}>
      <ol className="sr-only" aria-label={labels.list}>
        {steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <div
        className="demo relative"
        data-step={step}
        aria-hidden="true"
        style={{ "--accent": accent } as React.CSSProperties}
      >
        {children}
        {ripple && (
          <span
            key={ripple.n}
            className="demo-ripple"
            style={{ left: ripple.x, top: ripple.y }}
          />
        )}
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "demo-cursor",
            cursor.on && "is-on",
            cursor.down && "is-down",
          )}
          style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
        >
          <path
            d="M4 2l15 9.5-6.6 1.3L16 20l-3 1.4-3.6-7.3L4 18.5z"
            fill="#06083C"
            stroke="#fff"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p
        aria-hidden="true"
        className="mt-4 min-h-[3.2em] max-w-prose text-small text-grafite"
      >
        <span className="t-data mr-2" style={{ color: accent }}>
          {String(step + 1).padStart(2, "0")}
        </span>
        {steps[step]}
      </p>
      <div className="mt-3 flex items-center gap-2">
        {steps.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setStep(i);
              setPlaying(false);
            }}
            aria-label={`${labels.step} ${i + 1}`}
            aria-current={i === step ? "step" : undefined}
            className="grid h-8 w-8 place-items-center rounded-full"
          >
            <span
              className={cn(
                "relative block h-2.5 overflow-hidden rounded-full bg-linha transition-all duration-300",
                i === step ? "w-8" : "w-2.5",
              )}
            >
              {i === step && (
                // Enche-se até ao próximo ecrã enquanto a demo corre; parada, fica cheia.
                <span
                  key={`${step}-${running}`}
                  className="absolute inset-0 origin-left rounded-full"
                  style={{
                    backgroundColor: accent,
                    animation: running
                      ? `demo-progress ${INTERVAL}ms linear both`
                      : undefined,
                  }}
                />
              )}
            </span>
          </button>
        ))}
        {motionOk && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={!playing}
            className="ml-auto flex min-h-[32px] items-center gap-2 rounded-full px-3 text-small font-medium text-grafite ring-1 ring-linha hover:bg-white"
          >
            <svg
              viewBox="0 0 12 12"
              className="h-3 w-3"
              fill="currentColor"
              aria-hidden="true"
            >
              {playing ? (
                <path d="M2 1h3v10H2zM7 1h3v10H7z" />
              ) : (
                <path d="M2 1l9 5-9 5z" />
              )}
            </svg>
            {playing ? labels.pause : labels.play}
          </button>
        )}
      </div>
    </div>
  );
}
