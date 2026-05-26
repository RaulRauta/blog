"use client";

import { PatchEvent, set, type StringInputProps } from "sanity";
import type { CSSProperties } from "react";

type TemplatePreview = {
  value: string;
  title: string;
  subtitle: string;
  bestFor: string;
  articleType: string;
  flow: string;
  emphasis: string;
  imageGuidance: string;
  cover: string;
  accent: string;
  sections: string[];
  mockTitle: string;
  mockLead: string;
  pattern: "split" | "centered" | "full" | "list" | "gallery" | "minimal";
};

const templates: TemplatePreview[] = [
  {
    value: "layout1",
    title: "Template 1 - Cinematic Storytelling",
    subtitle: "Hero stanga, text amplu si imagine secundara intima.",
    bestFor: "Povesti botanice, profiluri de flori si articole cu atmosfera.",
    articleType:
      "Ideal pentru articole care introduc o floare prin emotie, sezon si context de gradina.",
    flow: "Deschide cu o imagine puternica, apoi coboara in text editorial si detalii vizuale mai mici.",
    emphasis: "Atmosfera, ritm narativ, tranzitie naturala intre imagine si lectura.",
    imageGuidance:
      "Foloseste o imagine principala cu mult aer si o imagine secundara cu detaliu floral sau textura.",
    cover: "/images/articles/hortensia-demo/hero.png",
    accent: "#d7a49d",
    sections: ["Hero cinematic", "Introducere editoriala", "Imagine detaliu"],
    mockTitle: "Hortensia in gradina de vara",
    mockLead:
      "Un articol calm despre culoare, volum si felul in care florile schimba lumina unei alei.",
    pattern: "split",
  },
  {
    value: "layout2",
    title: "Template 2 - Educational Guide",
    subtitle: "Text centrat, imagine clara si quote de retinut.",
    bestFor: "Ghiduri de ingrijire, explicatii simple si articole educative.",
    articleType:
      "Potrivit pentru subiecte cu pasi clari: sol, lumina, udare, plantare sau taiere.",
    flow: "Cititorul incepe cu ideea principala, vede imaginea, apoi primeste un citat memorabil.",
    emphasis: "Claritate, invatare usoara, informatie asezata elegant.",
    imageGuidance:
      "Alege imagini curate, frontale, unde planta se intelege rapid si nu concureaza cu textul.",
    cover: "/images/articles/hortensia-demo/care-detail.png",
    accent: "#6d7d45",
    sections: ["Text central", "Imagine ghid", "Quote"],
    mockTitle: "Cum uzi corect florile vara",
    mockLead:
      "Un ghid practic cu ritm bland, pentru plante care raman viguroase si in zilele calde.",
    pattern: "centered",
  },
  {
    value: "layout3",
    title: "Template 3 - Full Image Essay",
    subtitle: "Imagine full width, lectura simpla si callout discret.",
    bestFor: "Eseuri vizuale, articole scurte si materiale cu o imagine dominanta.",
    articleType:
      "Bun pentru texte elegante care au nevoie de impact vizual fara multe module.",
    flow: "O imagine mare seteaza scena, iar textul ramane concentrat, aerisit si usor de parcurs.",
    emphasis: "Imaginea principala, linistea lecturii, mesajul final.",
    imageGuidance:
      "Foloseste fotografii late, cu lumina naturala si spatiu negativ pentru senzatie cinematica.",
    cover: "/images/articles/hortensia-demo/garden-border.png",
    accent: "#dfe6d0",
    sections: ["Imagine panorama", "Text simplu", "Callout"],
    mockTitle: "O bordura verde care respira",
    mockLead:
      "Despre plantari in straturi, repetitie discreta si frunzis care tine compozitia impreuna.",
    pattern: "full",
  },
  {
    value: "layout4",
    title: "Template 4 - Icon Care List",
    subtitle: "Imagine mare, lista vizuala si carduri informative.",
    bestFor: "Checklist-uri, ingrijire pe pasi si articole foarte scanabile.",
    articleType:
      "Ideal pentru cititori care vor raspunsuri rapide, dar intr-o prezentare premium.",
    flow: "Imaginea inspira, lista structureaza, iar cardurile extind fiecare idee importanta.",
    emphasis: "Pasi practici, structura, informatie clara.",
    imageGuidance:
      "Alege o imagine principala luminoasa si detalii mici pentru carduri: frunze, unelte, sol.",
    cover: "/images/articles/hortensia-demo/care-detail.png",
    accent: "#23351f",
    sections: ["Imagine mare", "Checklist", "Info cards"],
    mockTitle: "Ritualul saptamanal de ingrijire",
    mockLead:
      "Apa, lumina, sol si observatie, explicate intr-un format usor de urmarit.",
    pattern: "list",
  },
  {
    value: "layout5",
    title: "Template 5 - Seasonal Showcase",
    subtitle: "Imagine verticala dreapta si mini galerie de atmosfera.",
    bestFor: "Inspiratie sezoniera, terase, ghivece si aranjamente florale.",
    articleType:
      "Potrivit pentru articole cu multe imagini si o floare prezentata ca piesa de decor viu.",
    flow: "Textul conduce lectura, imaginea verticala da eleganta, galeria adauga varietate.",
    emphasis: "Sezon, inspiratie vizuala, compozitie florala.",
    imageGuidance:
      "Foloseste o imagine verticala premium si 3-5 imagini mici cu unghiuri complementare.",
    cover: "/images/articles/hortensia-demo/vertical.png",
    accent: "#d7a49d",
    sections: ["Text editorial", "Imagine verticala", "Mini galerie"],
    mockTitle: "Flori pentru terasa umbrita",
    mockLead:
      "Un showcase cald pentru ghivece mari, lumina filtrata si colturi de relaxare.",
    pattern: "gallery",
  },
  {
    value: "layout6",
    title: "Template 6 - Quote-Led Feature",
    subtitle: "Storytelling cu imagine secundara si citat central.",
    bestFor: "Articole emotionale, portrete de plante si texte de revista.",
    articleType:
      "Alege-l cand articolul are o idee poetica puternica sau o observatie memorabila.",
    flow: "Textul construieste atmosfera, citatul marcheaza pauza, imaginea secundara aduce textura.",
    emphasis: "Voce editoriala, citat, ritm de lectura.",
    imageGuidance:
      "Imaginea secundara trebuie sa sustina starea articolului, nu doar sa il ilustreze.",
    cover: "/images/trandafir.jpg",
    accent: "#d7a49d",
    sections: ["Storytelling", "Quote", "Imagine secundara"],
    mockTitle: "Trandafirul si memoria gradinii",
    mockLead:
      "O lectura despre parfum, repetitie si eleganta discreta a florilor clasice.",
    pattern: "split",
  },
  {
    value: "layout7",
    title: "Template 7 - Timeline Garden Journal",
    subtitle: "Timeline, galerie cinematica si text de sezon.",
    bestFor: "Calendare de ingrijire, evolutii sezoniere si proiecte de gradina.",
    articleType:
      "Perfect pentru articole care explica ce se intampla in timp: luna cu luna sau etapa cu etapa.",
    flow: "Galeria creeaza context, timeline-ul ordoneaza actiunile, textul leaga totul natural.",
    emphasis: "Timp, progres, sezonalitate, organizare.",
    imageGuidance:
      "Foloseste imagini care arata schimbare: muguri, floare, frunzis matur, detalii de intretinere.",
    cover: "/images/articles/hortensia-demo/garden-border.png",
    accent: "#6d7d45",
    sections: ["Galerie", "Timeline", "Text sezonier"],
    mockTitle: "Calendarul hortensiei",
    mockLead:
      "De la pornirea in vegetatie la florile pline de vara si taierea blanda de final.",
    pattern: "gallery",
  },
  {
    value: "layout8",
    title: "Template 8 - Landscape Presentation",
    subtitle: "Prezentare de gradina cu cards si lista vizuala.",
    bestFor: "Amenajari, combinatii de plante si idei de landscaping.",
    articleType:
      "Bun pentru articole care vand o compozitie: borduri, alei, terase, straturi mixte.",
    flow: "Imaginea prezinta scena, cardurile explica straturile, lista fixeaza principiile.",
    emphasis: "Design de gradina, compozitie, materiale botanice.",
    imageGuidance:
      "Alege fotografii late cu structura clara: fundal, volum floral si prim-plan de frunzis.",
    cover: "/images/articles/hortensia-demo/garden-border.png",
    accent: "#23351f",
    sections: ["Landscape hero", "Principii", "Cards"],
    mockTitle: "Cum compui o bordura premium",
    mockLead:
      "Straturi, repetitie si texturi verzi care fac plantarea sa para matura.",
    pattern: "list",
  },
  {
    value: "layout9",
    title: "Template 9 - Minimal Luxury Reading",
    subtitle: "Lectura minimalista cu quote si callout elegant.",
    bestFor: "Eseuri, articole scurte, texte rafinate si teme contemplative.",
    articleType:
      "Alege-l cand textul este foarte bun si vrei sa respire fara decor excesiv.",
    flow: "Titlul si textul primesc spatiu, citatul creeaza pauza, callout-ul incheie memorabil.",
    emphasis: "Tipografie, whitespace, ton premium.",
    imageGuidance:
      "Foloseste putine imagini, dar foarte bune. Lumina moale si fundalurile simple functioneaza cel mai bine.",
    cover: "/images/lalea.jpg",
    accent: "#d7a49d",
    sections: ["Text amplu", "Quote", "Callout"],
    mockTitle: "Lalelele si eleganta inceputului de primavara",
    mockLead:
      "Un text aerisit despre culoare, forma si bucuria discreta a florilor simple.",
    pattern: "minimal",
  },
  {
    value: "layout10",
    title: "Template 10 - Magazine Feature",
    subtitle: "Feature complet cu galerie, cards, autor si articole conexe.",
    bestFor: "Ghiduri complete, articole flagship si pagini showcase.",
    articleType:
      "Cel mai bun pentru articole importante, lungi, cu multe imagini si informatie bogata.",
    flow: "Hero-ul deschide puternic, textul alterneaza cu imagini, galeria si related articles extind lectura.",
    emphasis: "Experienta completa, profunzime, continut premium.",
    imageGuidance:
      "Pregateste un set coerent de imagini: hero, verticala, detaliu, galerie si autor.",
    cover: "/images/articles/hortensia-demo/hero.png",
    accent: "#6d7d45",
    sections: ["Hero feature", "Galerie", "Author box", "Related"],
    mockTitle: "Hortensia - ghid complet de ingrijire",
    mockLead:
      "Un articol complet, pregatit ca exemplu final pentru Enciclopedia Florilor.",
    pattern: "full",
  },
];

const styles = {
  shell: {
    border: "1px solid rgba(35, 53, 31, 0.14)",
    borderRadius: 24,
    background:
      "linear-gradient(135deg, rgba(255,253,247,0.96), rgba(243,222,216,0.26))",
    padding: 18,
  },
  intro: {
    color: "#52604b",
    fontSize: 14,
    lineHeight: 1.6,
    margin: "0 0 16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 14,
  },
} satisfies Record<string, CSSProperties>;

function TemplateMockup({ template }: { template: TemplatePreview }) {
  return (
    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.78)",
        background: "#fffdf7",
        boxShadow: "0 18px 48px rgba(35,53,31,0.1)",
      }}
    >
      <div
        style={{
          minHeight: 170,
          backgroundImage: `linear-gradient(180deg, rgba(35,53,31,0.04), rgba(35,53,31,0.44)), url("${template.cover}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 14,
            right: 14,
            bottom: 14,
            color: "#fffdf7",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              borderRadius: 999,
              background: "rgba(255,255,255,0.22)",
              padding: "5px 10px",
              fontSize: 11,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Preview articol
          </div>
          <div
            style={{
              fontFamily: "Georgia, Times New Roman, serif",
              fontSize: 25,
              lineHeight: 1.05,
            }}
          >
            {template.mockTitle}
          </div>
        </div>
      </div>

      <div style={{ padding: 14 }}>
        <p
          style={{
            margin: "0 0 12px",
            color: "#52604b",
            fontSize: 13,
            lineHeight: 1.55,
          }}
        >
          {template.mockLead}
        </p>
        <VisualPattern template={template} />
      </div>
    </div>
  );
}

function VisualPattern({ template }: { template: TemplatePreview }) {
  const line = (width: string, color = "rgba(35,53,31,0.16)") => (
    <span
      style={{
        display: "block",
        width,
        height: 7,
        borderRadius: 99,
        background: color,
      }}
    />
  );

  if (template.pattern === "centered") {
    return (
      <div style={{ display: "grid", gap: 8, placeItems: "center" }}>
        {line("74%", "rgba(215,164,157,0.4)")}
        {line("90%")}
        {line("58%")}
        <span
          style={{
            width: "70%",
            height: 34,
            borderRadius: 14,
            background: "rgba(109,125,69,0.13)",
          }}
        />
      </div>
    );
  }

  if (template.pattern === "gallery") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7 }}>
        {[0, 1, 2].map((item) => (
          <span
            key={item}
            style={{
              height: item === 1 ? 56 : 42,
              borderRadius: 12,
              background:
                item === 1 ? "rgba(215,164,157,0.34)" : "rgba(109,125,69,0.16)",
            }}
          />
        ))}
      </div>
    );
  }

  if (template.pattern === "list") {
    return (
      <div style={{ display: "grid", gap: 8 }}>
        {[0, 1, 2].map((item) => (
          <span
            key={item}
            style={{
              display: "grid",
              gridTemplateColumns: "20px 1fr",
              gap: 8,
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: template.accent,
                opacity: 0.7,
              }}
            />
            {line(item === 2 ? "62%" : "86%")}
          </span>
        ))}
      </div>
    );
  }

  if (template.pattern === "minimal") {
    return (
      <div style={{ display: "grid", gap: 10, padding: "8px 18px" }}>
        {line("92%")}
        {line("78%")}
        {line("84%")}
        {line("45%", "rgba(215,164,157,0.42)")}
      </div>
    );
  }

  if (template.pattern === "full") {
    return (
      <div style={{ display: "grid", gap: 8 }}>
        <span
          style={{
            height: 30,
            borderRadius: 14,
            background: "rgba(215,164,157,0.26)",
          }}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
          {line("100%")}
          {line("82%")}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "0.72fr 1fr", gap: 8 }}>
      <span
        style={{
          height: 62,
          borderRadius: 14,
          background: "rgba(109,125,69,0.16)",
        }}
      />
      <span style={{ display: "grid", gap: 7, alignContent: "center" }}>
        {line("88%")}
        {line("72%")}
        {line("54%", "rgba(215,164,157,0.34)")}
      </span>
    </div>
  );
}

function TemplateDocumentation({ template }: { template: TemplatePreview }) {
  const rows = [
    ["Cel mai potrivit pentru", template.bestFor],
    ["Tip de articol", template.articleType],
    ["Cum curge vizual", template.flow],
    ["Ce pune in evidenta", template.emphasis],
    ["Recomandari pentru imagini", template.imageGuidance],
  ];

  return (
    <div
      style={{
        borderRadius: 20,
        border: "1px solid rgba(35,53,31,0.12)",
        background: "rgba(255,253,247,0.74)",
        padding: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 14,
        }}
      >
        {template.sections.map((section) => (
          <span
            key={section}
            style={{
              borderRadius: 999,
              background: "rgba(215,164,157,0.2)",
              color: "#23351f",
              padding: "6px 10px",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {section}
          </span>
        ))}
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {rows.map(([label, text]) => (
          <div key={label}>
            <div
              style={{
                color: template.accent,
                fontSize: 12,
                fontWeight: 800,
                marginBottom: 3,
              }}
            >
              {label}
            </div>
            <div style={{ color: "#4d5746", fontSize: 13, lineHeight: 1.55 }}>
              {text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArticleLayoutInput(props: StringInputProps) {
  const selectedValue = String(props.value || "layout1");
  const selectedTemplate =
    templates.find((template) => template.value === selectedValue) || templates[0];

  function selectTemplate(value: string) {
    props.onChange(PatchEvent.from(set(value)));
  }

  return (
    <div style={styles.shell}>
      <p style={styles.intro}>
        Alege un template editorial. Fiecare optiune de mai jos arata ca o
        previzualizare de articol real, cu ritm vizual, imagini si recomandari
        de folosire.
      </p>

      <div style={styles.grid}>
        {templates.map((template) => {
          const isSelected = template.value === selectedValue;

          return (
            <button
              key={template.value}
              type="button"
              onClick={() => selectTemplate(template.value)}
              style={{
                border: isSelected
                  ? "2px solid #d7a49d"
                  : "1px solid rgba(35,53,31,0.12)",
                borderRadius: 24,
                padding: 10,
                background: isSelected
                  ? "linear-gradient(135deg, rgba(255,253,247,1), rgba(243,222,216,0.48))"
                  : "rgba(255,253,247,0.68)",
                textAlign: "left",
                cursor: "pointer",
                boxShadow: isSelected
                  ? "0 24px 70px rgba(92,66,52,0.12)"
                  : "0 12px 38px rgba(35,53,31,0.06)",
              }}
            >
              <TemplateMockup template={template} />
              <div style={{ padding: "12px 4px 4px" }}>
                <div
                  style={{
                    color: "#23351f",
                    fontFamily: "Georgia, Times New Roman, serif",
                    fontSize: 22,
                    lineHeight: 1.1,
                  }}
                >
                  {template.title}
                </div>
                <div
                  style={{
                    color: "#52604b",
                    fontSize: 13,
                    lineHeight: 1.55,
                    marginTop: 7,
                  }}
                >
                  {template.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 18 }}>
        <TemplateDocumentation template={selectedTemplate} />
      </div>
    </div>
  );
}
