"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Props = {
  steps: string[];
  labels: { pause: string; play: string; step: string; list: string };
  accent: string;
  /** Tamanho da cena em px de desenho; a cena é reduzida para caber na largura disponível. */
  width: number;
  height: number;
  children: ReactNode;
};

// Uma só cena com a aplicação inteira. Em cada passo a câmara aproxima-se da parte da cena
// marcada com data-focus="passo", o cursor clica no elemento com data-click="passo", a cena muda
// (data-step) e a câmara volta a afastar-se para mostrar tudo. Depois passa à parte seguinte.
//
// Sem JavaScript, ou com "reduzir movimento", fica a vista geral no último passo, que mostra tudo.
// O texto dos passos está numa lista para leitores de ecrã; a cena é aria-hidden.

const T = {
  focus: 900,
  cursor: 2100,
  click: 2900,
  change: 3000,
  wide: 4900,
  next: 5900,
};
const MAX_ZOOM = 2.2;

type Cam = { x: number; y: number; s: number };
const WIDE: Cam = { x: 0, y: 0, s: 1 };

export default function CameraDemo({
  steps,
  labels,
  accent,
  width,
  height,
  children,
}: Props) {
  const last = steps.length - 1;
  const [k, setK] = useState(0);
  const [step, setStep] = useState(last);
  const [cam, setCam] = useState<Cam>(WIDE);
  const [base, setBase] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const [motionOk, setMotionOk] = useState(false);
  const [cursor, setCursor] = useState({
    x: width * 0.55,
    y: height * 0.6,
    on: false,
    down: false,
  });
  const [ripple, setRipple] = useState<{
    x: number;
    y: number;
    n: number;
  } | null>(null);
  const outer = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);

  // Escala da cena para a largura do contentor.
  useLayoutEffect(() => {
    const el = outer.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setBase(e.contentRect.width / width),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const onChange = () => setMotionOk(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.35,
    });
    if (outer.current) io.observe(outer.current);
    return () => {
      mq.removeEventListener("change", onChange);
      io.disconnect();
    };
  }, []);

  // Posição de um elemento em coordenadas da cena (offset* ignora as transformações).
  const box = useCallback((el: HTMLElement) => {
    let x = 0;
    let y = 0;
    let n: HTMLElement | null = el;
    while (n && n !== scene.current) {
      x += n.offsetLeft;
      y += n.offsetTop;
      n = n.offsetParent as HTMLElement | null;
    }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight };
  }, []);

  const focusOn = useCallback(
    (i: number): Cam => {
      const el = scene.current?.querySelector<HTMLElement>(
        `[data-focus~="${i}"]`,
      );
      if (!el) return WIDE;
      const r = box(el);
      const s = Math.max(
        1.15,
        Math.min(MAX_ZOOM, (width / r.w) * 0.85, (height / r.h) * 0.85),
      );
      const cx = r.x + r.w / 2;
      const cy = r.y + r.h / 2;
      // Centra a parte, sem deixar ver para lá das margens da cena.
      const x = Math.min(0, Math.max(width - width * s, width / 2 - cx * s));
      const y = Math.min(0, Math.max(height - height * s, height / 2 - cy * s));
      return { x, y, s };
    },
    [box, width, height],
  );

  const running = playing && visible && motionOk;

  useEffect(() => {
    if (!running) return;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) =>
      timers.push(window.setTimeout(fn, ms));
    const target = scene.current?.querySelector<HTMLElement>(
      `[data-click~="${k}"]`,
    );
    const point = () => {
      const r = box(target!);
      return { x: r.x + Math.min(r.w * 0.6, 50), y: r.y + r.h * 0.55 };
    };

    at(0, () => setCam(WIDE));
    at(T.focus, () => setCam(focusOn(k)));
    if (target) {
      at(T.cursor, () => setCursor({ ...point(), on: true, down: false }));
      at(T.click, () => {
        const p = point();
        setCursor({ ...p, on: true, down: true });
        setRipple((r) => ({ ...p, n: (r?.n ?? 0) + 1 }));
        target.classList.add("is-pressed");
      });
      at(T.click + 250, () => {
        setCursor((c) => ({ ...c, down: false }));
        target.classList.remove("is-pressed");
      });
    }
    at(target ? T.change : T.cursor, () => setStep(k));
    at(T.wide, () => {
      setCam(WIDE);
      setCursor((c) => ({ ...c, on: false }));
    });
    at(T.next, () => setK((i) => (i + 1) % steps.length));
    return () => {
      timers.forEach(window.clearTimeout);
      target?.classList.remove("is-pressed");
    };
  }, [running, k, steps.length, box, focusOn]);

  const go = (i: number) => {
    setPlaying(false);
    setCursor((c) => ({ ...c, on: false }));
    setK(i);
    setStep(i);
    setCam(focusOn(i));
  };

  const current = running ? k : step;
  // O cursor fica do mesmo tamanho no ecrã, com a câmara perto ou longe.
  const inv = 1 / cam.s;

  return (
    <div className="min-w-0">
      <ol className="sr-only" aria-label={labels.list}>
        {steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <div
        ref={outer}
        aria-hidden="true"
        suppressHydrationWarning
        className="relative overflow-hidden rounded-frame border border-tinta/15 bg-white shadow-[0_40px_80px_-40px_rgba(6,8,60,.55)]"
        style={
          (base
            ? { aspectRatio: `${width} / ${height}`, "--base": base }
            : { aspectRatio: `${width} / ${height}` }) as CSSProperties
        }
      >
        {/* Acerta a escala logo no HTML, antes do React, para a cena não aparecer grande e cortada. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(e){e.style.setProperty('--base',e.clientWidth/${width})})(document.currentScript.parentElement)`,
          }}
        />
        <div
          style={{
            width,
            height,
            transform: "scale(var(--base))",
            transformOrigin: "0 0",
          }}
        >
          <div
            className="camera"
            style={{
              width,
              height,
              transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.s})`,
              transformOrigin: "0 0",
            }}
          >
            <div
              ref={scene}
              className="demo relative"
              data-step={step}
              style={
                {
                  width,
                  height,
                  "--accent": accent,
                  "--app": accent,
                } as CSSProperties
              }
            >
              {children}
              {ripple && (
                <span
                  key={ripple.n}
                  className="demo-ripple"
                  style={{ left: ripple.x, top: ripple.y, scale: String(inv) }}
                />
              )}
              <svg
                viewBox="0 0 24 24"
                className={cn(
                  "demo-cursor",
                  cursor.on && "is-on",
                  cursor.down && "is-down",
                )}
                style={{
                  transform: `translate(${cursor.x}px, ${cursor.y}px) scale(${inv * 1.3})`,
                  transformOrigin: "0 0",
                }}
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
          </div>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="mt-4 min-h-[3.2em] max-w-prose font-medium text-tinta"
      >
        {steps[current]}
      </p>
      <div className="mt-3 flex items-center gap-2">
        {steps.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => go(i)}
            aria-label={`${labels.step} ${i + 1}`}
            aria-current={i === current ? "step" : undefined}
            className="grid h-8 w-8 place-items-center rounded-full"
          >
            <span
              className={cn(
                "relative block h-2.5 overflow-hidden rounded-full bg-linha transition-all duration-300",
                i === current ? "w-8" : "w-2.5",
              )}
            >
              {i === current && (
                <span
                  key={`${k}-${running}`}
                  className="absolute inset-0 origin-left rounded-full"
                  style={{
                    backgroundColor: accent,
                    animation: running
                      ? `demo-progress ${T.next}ms linear both`
                      : undefined,
                  }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
