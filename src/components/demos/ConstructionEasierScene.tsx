import { Fragment, type CSSProperties } from "react";
import type { Locale } from "@/lib/seo.config";
import { Bell, Cross, FaceMesh, Warn } from "./DemoWindow";
import { Browser, Card, Phone, SampleTag, Tablet, Tick } from "./SceneParts";

// Cena única do ConstructionEasier: gestão da obra no browser, tablet no estaleiro e telemóvel do diretor de obra.
// Layout, menu e textos como na webapp (staging, 29/09). Obras, pessoas e empresas fictícias. Os estados dos documentos têm ícone e texto, não só cor.
const T = {
  pt: {
    group: "Obras",
    nav: ["Dashboard", "Obras", "Subempreiteiros", "Documentos"],
    site: "Obra Rua das Flores",
    present: "A Trabalhar Agora",
    own: "Própria",
    subA: "Subempreiteiro A",
    subB: "Subempreiteiro B",
    companies: "Empresas na obra",
    workers: (n: number) => `${n} trabalhadores`,
    trades: ["Estrutura", "Cofragens", "Eletricidade"],
    docs: "Documentos",
    check: "Verificar",
    valid: "Válido",
    expiring: "A expirar",
    missing: "Em falta",
    gate: "Estaleiro",
    alert: "entrou na obra",
    sample: "dados de exemplo",
  },
  en: {
    group: "Sites",
    nav: ["Dashboard", "Sites", "Subcontractors", "Documents"],
    site: "Rua das Flores site",
    present: "Working Now",
    own: "Own staff",
    subA: "Subcontractor A",
    subB: "Subcontractor B",
    companies: "Companies on site",
    workers: (n: number) => `${n} workers`,
    trades: ["Structure", "Formwork", "Electrical"],
    docs: "Documents",
    check: "Check",
    valid: "Valid",
    expiring: "Expiring",
    missing: "Missing",
    gate: "Site",
    alert: "entered the site",
    sample: "sample data",
  },
};

// Códigos de documentos que aparecem como colunas na webapp.
const DOC_CODES = ["AS", "RM", "CP", "AD"];
const STATE = {
  ok: {
    cls: "bg-estado-valido/10 text-estado-valido",
    text: "text-estado-valido",
    Icon: Tick,
  },
  soon: {
    cls: "bg-estado-aviso/10 text-estado-aviso",
    text: "text-estado-aviso",
    Icon: Warn,
  },
  no: {
    cls: "bg-estado-erro/10 text-estado-erro",
    text: "text-estado-erro",
    Icon: Cross,
  },
};

const later = (s: number) => ({ "--later": `${s}s` }) as CSSProperties;

export default function ConstructionEasierScene({
  locale,
}: {
  locale: Locale;
}) {
  const t = T[locale];
  const people = [
    { name: "Rui M.", co: t.own, time: "07:58", on: undefined },
    { name: "Nuno R.", co: t.subA, time: "08:02", on: undefined },
    { name: "Sara L.", co: t.subB, time: "08:11", on: undefined },
    { name: "Tiago F.", co: t.own, time: "08:14", on: "3" },
  ];
  const companies = [
    { name: t.own, trade: t.trades[0], n: 6 },
    { name: t.subA, trade: t.trades[1], n: 4 },
    { name: t.subB, trade: t.trades[2], n: 2 },
  ];
  const docs: { name: string; co: string; cells: ("ok" | "soon" | "no")[] }[] =
    [
      { name: "Nuno R.", co: t.subA, cells: ["ok", "ok", "ok", "ok"] },
      { name: "Hugo T.", co: t.subA, cells: ["ok", "ok", "soon", "ok"] },
      { name: "Sara L.", co: t.subB, cells: ["ok", "no", "ok", "no"] },
    ];

  return (
    <>
      <Browser
        product="ConstructionEasier"
        group={t.group}
        nav={t.nav}
        active={1}
        className="left-0 top-5 h-[720px] w-[860px]"
      >
        <p className="mb-4 text-[20px] font-bold text-tinta">{t.site}</p>
        <Card focus="0" className="shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[17px] font-semibold text-tinta">{t.present}</p>
            <span
              data-click="0"
              className="ml-auto mr-3 rounded-lg border border-linha bg-white px-3 py-1 text-[13px] font-semibold text-tinta"
            >
              Rua das Flores ▾
            </span>
            <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-[13px] font-semibold text-white">
              <span className="demo-stack">
                <span data-on="0 1 2">3</span>
                <span data-on="3" data-pop>
                  4
                </span>
              </span>
            </span>
          </div>
          {people.map((p) => (
            <div
              key={p.name}
              data-on={p.on}
              data-pop
              data-hi={p.on}
              className="flex items-center gap-3 rounded-lg border-t border-linha px-2 py-2.5"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-papel text-[13px] font-semibold text-tinta">
                {p.name.slice(0, 1)}
              </span>
              <span className="flex-1 font-semibold text-tinta">{p.name}</span>
              <span className="w-44 text-grafite">{p.co}</span>
              <span className="tabular-nums w-14 text-tinta">{p.time}</span>
            </div>
          ))}
        </Card>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <Card focus="1" title={t.companies} className="shadow-sm">
            {companies.map((c, i) => (
              <div
                key={c.name}
                data-hi={i === 1 ? "1" : undefined}
                data-click={i === 1 ? "1" : undefined}
                className="flex items-center justify-between gap-2 rounded-lg border-t border-linha px-2 py-2.5"
              >
                <span>
                  <span className="block font-semibold text-tinta">
                    {c.name}
                  </span>
                  <span className="block text-[13px] text-grafite">
                    {c.trade}
                  </span>
                </span>
                <span className="tabular-nums text-[13px] text-grafite">
                  {t.workers(c.n)}
                </span>
              </div>
            ))}
          </Card>

          <Card focus="2" className="shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold text-tinta">{t.docs}</p>
              <span
                data-click="2"
                className="rounded-lg border border-tinta/70 bg-white px-3 py-1 text-[13px] font-semibold text-tinta"
              >
                {t.check}
              </span>
            </div>
            {/* Matriz de documentos por trabalhador, como na webapp (colunas com o código de cada documento). */}
            <div className="grid grid-cols-[1fr_repeat(4,2.2rem)] items-center gap-y-1 text-[13px]">
              <span />
              {DOC_CODES.map((c) => (
                <span
                  key={c}
                  className="text-center text-[11px] font-semibold text-[#64748b]"
                >
                  {c}
                </span>
              ))}
              {docs.map((d, r) => (
                <Fragment key={d.name}>
                  <span className="border-t border-linha py-2">
                    <span className="block font-semibold text-tinta">
                      {d.name}
                    </span>
                    <span className="block text-[12px] text-grafite">
                      {d.co}
                    </span>
                  </span>
                  {d.cells.map((c, i) => (
                    <span
                      key={i}
                      className="demo-stack h-full place-items-center border-t border-linha"
                    >
                      <span
                        data-on="0 1"
                        className="h-2 w-2 rounded-full bg-[#e2e8f0]"
                      />
                      <span
                        data-on="2 3"
                        data-pop
                        style={{
                          animationDelay: `${0.2 + (r * 4 + i) * 0.07}s`,
                        }}
                        className={`grid h-6 w-6 place-items-center rounded-full ${STATE[c].cls}`}
                      >
                        {(() => {
                          const Icon = STATE[c].Icon;
                          return <Icon className="h-3.5 w-3.5" />;
                        })()}
                      </span>
                    </span>
                  ))}
                </Fragment>
              ))}
            </div>
            <p className="mt-3 flex gap-3 text-[12px] text-grafite">
              {(["ok", "soon", "no"] as const).map((k) => (
                <span
                  key={k}
                  className={`flex items-center gap-1 ${STATE[k].text}`}
                >
                  {(() => {
                    const Icon = STATE[k].Icon;
                    return <Icon className="h-3 w-3" />;
                  })()}
                  {k === "ok" ? t.valid : k === "soon" ? t.expiring : t.missing}
                </span>
              ))}
            </p>
          </Card>
        </div>
      </Browser>

      {/* Tablet à entrada do estaleiro */}
      <Tablet className="left-[890px] top-5 h-[400px] w-[300px]">
        <div data-focus="3" className="absolute inset-0 p-5">
          <div lang="pt-PT" className="demo-stack h-full">
            <div
              data-on="0 1 2"
              className="flex flex-col items-center justify-center text-center"
            >
              <p className="text-[56px] font-light leading-none tracking-tight">
                08:14
              </p>
              <p className="mt-1 text-[13px] text-white/70">{t.gate}</p>
              <div
                data-click="3"
                className="mt-5 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-5"
              >
                <FaceMesh className="mx-auto w-12 text-white/90" />
                <p className="mt-2 text-[19px] font-bold">Toca para registar</p>
                <p className="mt-1 text-[12px] text-white/70">
                  Reconhecimento facial em segundos
                </p>
              </div>
            </div>
            <div
              data-on="3"
              data-fade-out
              style={later(1.3)}
              className="flex flex-col items-center justify-center text-center"
            >
              <span className="relative h-36 w-32 overflow-hidden rounded-2xl border border-ciano/50">
                <FaceMesh className="absolute inset-3 text-ciano" />
              </span>
              <p className="mt-5 text-[17px] font-semibold">
                A reconhecer rosto
              </p>
              <p className="text-[13px] text-white/70">Mantém-te quieto.</p>
            </div>
            <div
              data-on="3"
              data-pop
              data-later
              style={later(1.5)}
              className="flex flex-col items-center justify-center"
            >
              <div className="w-full rounded-2xl bg-white px-4 py-6 text-center text-tinta">
                <p className="text-[24px] font-bold">Olá, Tiago!</p>
                <p className="mt-2 flex items-center justify-center gap-1.5 text-[15px] font-semibold text-estado-valido">
                  <Tick />
                  Presença registada
                </p>
                <span className="tabular-nums mt-3 inline-block rounded-full bg-papel px-3 py-1 text-[14px]">
                  08:14
                </span>
              </div>
            </div>
          </div>
        </div>
      </Tablet>

      {/* Telemóvel do diretor de obra: alerta de entrada */}
      <Phone className="left-[925px] top-[445px] h-[305px] w-[230px]">
        <p className="text-center text-[34px] font-light text-tinta">08:14</p>
        <div
          data-on="3"
          data-pop
          data-later
          style={later(2)}
          className="mt-3 rounded-2xl bg-papel p-3 shadow-sm"
        >
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-grafite">
            <Bell className="h-3.5 w-3.5 text-[var(--accent)]" />
            ConstructionEasier
          </p>
          <p className="mt-1 font-semibold text-tinta">Tiago F. {t.alert}</p>
          <p className="text-[13px] text-grafite">Rua das Flores · 08:14</p>
        </div>
      </Phone>

      <SampleTag text={t.sample} />
    </>
  );
}
