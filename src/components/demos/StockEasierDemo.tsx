import type { CSSProperties } from "react";
import type { Locale } from "@/lib/seo.config";
import DemoWindow, { Warn } from "./DemoWindow";

// Quantidades e nomes fictícios. Escala do stock: 0 a 200 pares; nível de reposição: 30.
const T = {
  pt: {
    window: "StockEasier",
    item: "Luvas de proteção",
    meta: "EPI · Armazém · par",
    stock: "Em stock",
    min: "mínimo 30",
    moves: "Movimentos",
    inMove: "Entrada · fornecedor",
    outMove: "Entrega · Carla P.",
    reorder: "Repor luvas de proteção",
    reorderText: "28 pares, abaixo do mínimo de 30",
    history: "Consumo por mês",
    months: ["abr", "mai", "jun", "jul", "ago", "set"],
    give: "Registar entrega",
    tabs: ["Movimentos", "Consumo"],
  },
  en: {
    window: "StockEasier",
    item: "Protective gloves",
    meta: "PPE · Warehouse · pair",
    stock: "In stock",
    min: "minimum 30",
    moves: "Movements",
    inMove: "In · supplier",
    outMove: "Issued · Carla P.",
    reorder: "Reorder protective gloves",
    reorderText: "28 pairs, below the minimum of 30",
    history: "Use per month",
    months: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    give: "Record hand-out",
    tabs: ["Movements", "Use"],
  },
};

const USE = [62, 71, 58, 80, 66, 74];

export default function StockEasierDemo({ locale }: { locale: Locale }) {
  const t = T[locale];
  const bar = {
    "--w0": "70%",
    "--w1": "69.5%",
    "--w2": "14%",
    "--w3": "14%",
  } as CSSProperties;

  return (
    <DemoWindow locale={locale} title={t.window}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold">{t.item}</p>
          <p className="t-data text-grafite">{t.meta}</p>
        </div>
        <div className="text-right">
          <p className="t-data text-grafite">{t.stock}</p>
          <p className="demo-stack justify-items-end font-mono text-h3 font-medium">
            <span data-on="0">140</span>
            <span data-on="1">139</span>
            <span data-on="2 3" className="text-estado-aviso">
              28
            </span>
          </p>
        </div>
      </div>

      <div className="relative mt-4 h-3 rounded-sm bg-linha/60" style={bar}>
        <div data-w className="h-full rounded-sm bg-[var(--accent,#1B54B8)]" />
        <div
          data-on="2 3"
          className="absolute inset-y-0 left-0 w-[14%] rounded-sm bg-estado-sinal"
        />
        <div className="absolute -bottom-1.5 -top-1.5 left-[15%] w-px bg-tinta" />
      </div>
      <p className="t-data mt-2 pl-[15%] text-grafite">{t.min}</p>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-2 border-b border-linha text-small">
        <span className="flex gap-1">
          <span
            data-active="0 1 2"
            data-click="3"
            className="rounded-t px-2.5 py-1.5 font-semibold"
          >
            {t.tabs[0]}
          </span>
          <span
            data-active="3"
            data-click="2"
            className="rounded-t px-2.5 py-1.5 font-semibold"
          >
            {t.tabs[1]}
          </span>
        </span>
        <span
          data-click="0"
          className="mb-1.5 rounded-ctl bg-[var(--accent,#1B54B8)] px-2.5 py-1 font-semibold text-white"
        >
          + {t.give}
        </span>
      </div>
      <div className="demo-stack mt-4">
        <div data-on="0 1 2" data-screen>
          <ul className="mt-2 border-t border-linha">
            <li
              data-hi="0"
              className="flex justify-between gap-3 rounded border-b border-linha px-2 py-2.5"
            >
              <span>{t.inMove}</span>
              <span className="t-data text-estado-valido">+100</span>
            </li>
            <li
              data-on="1 2"
              data-hi="1"
              className="flex justify-between gap-3 rounded border-b border-linha px-2 py-2.5"
            >
              <span>{t.outMove}</span>
              <span className="t-data">−1</span>
            </li>
          </ul>
          <div
            data-on="2"
            data-pop
            className="mt-3 flex items-start gap-2 rounded-ctl border border-estado-aviso bg-white px-3 py-2.5"
          >
            <Warn className="mt-0.5 text-estado-aviso" />
            <span>
              <span className="block font-semibold">{t.reorder}</span>
              <span className="block text-grafite">{t.reorderText}</span>
            </span>
          </div>
        </div>

        <div data-on="3" data-screen>
          <p className="font-semibold">{t.history}</p>
          <div className="mt-3 grid h-28 grid-cols-6 items-end gap-3 border-b border-tinta">
            {USE.map((v, i) => (
              <div
                key={t.months[i]}
                data-row
                className="flex h-full flex-col justify-end"
              >
                <span className="t-data text-center">{v}</span>
                <span
                  className="mt-1 block rounded-t-sm bg-[var(--accent,#1B54B8)]"
                  style={{ height: `${v}%` }}
                />
              </div>
            ))}
          </div>
          <div className="t-data mt-1 grid grid-cols-6 gap-3 text-center text-grafite">
            {t.months.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </DemoWindow>
  );
}
