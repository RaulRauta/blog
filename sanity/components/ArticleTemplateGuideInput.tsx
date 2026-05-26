"use client";

import type { CSSProperties } from "react";
import { useFormValue, type StringInputProps } from "sanity";

type Guide = {
  title: string;
  purpose: string;
  bestFor: string;
  flow: string[];
  fieldMap: { label: string; appears: string; tip: string }[];
  contentTips: string[];
};

const guides: Record<string, Guide> = {
  layout1: {
    title: "Template 1 - Cinematic storytelling",
    purpose:
      "Construieste un articol cu atmosfera: imagine mare, titlu puternic si o lectura care curge natural spre detalii.",
    bestFor:
      "Profiluri de flori, povesti de gradina, articole de inspiratie si texte cu ton cald.",
    flow: [
      "Imaginea principala deschide articolul in zona hero.",
      "Textul introductiv apare imediat sub titlu si stabileste atmosfera.",
      "Imaginea secundara apare mai jos ca detaliu vizual sau pauza editoriala.",
    ],
    fieldMap: [
      {
        label: "Imagine principala Hero",
        appears: "Controleaza imaginea mare de inceput si cardurile din listing.",
        tip: "Alege o fotografie lata, luminoasa, cu spatiu pentru text.",
      },
      {
        label: "Text introductiv sub titlu",
        appears: "Apare in prima sectiune de lectura, langa sau sub hero.",
        tip: "Scrie 2-4 paragrafe care introduc floarea si atmosfera.",
      },
      {
        label: "Imagine secundara din articol",
        appears: "Apare ca imagine de sustinere dupa introducere.",
        tip: "Foloseste un detaliu: frunza, floare, textura sau colt de gradina.",
      },
    ],
    contentTips: [
      "Pastreaza titlul poetic, dar clar.",
      "Nu incarca introducerea cu instructiuni tehnice.",
      "Foloseste imaginea secundara pentru apropiere si textura.",
    ],
  },
  layout2: {
    title: "Template 2 - Educational guide",
    purpose:
      "Prezinta informatia clar, cu text centrat, imagine explicativa si citat memorabil.",
    bestFor: "Ghiduri de udare, lumina, sol, plantare, taiere si ingrijire.",
    flow: [
      "Titlul si introducerea sunt in centru.",
      "Imaginea principala clarifica subiectul.",
      "Citatul apare ca pauza vizuala si idee-cheie.",
    ],
    fieldMap: [
      {
        label: "Text introductiv sub titlu",
        appears: "Apare in deschiderea ghidului, inaintea imaginii.",
        tip: "Scrie raspunsul principal in primele randuri.",
      },
      {
        label: "Imagine principala Hero",
        appears: "Apare dupa textul de deschidere ca imagine explicativa.",
        tip: "Alege o imagine clara, usor de inteles.",
      },
      {
        label: "Citat evidentiat in mijlocul articolului",
        appears: "Apare intre sectiunile de lectura.",
        tip: "Foloseste o fraza scurta, memorabila, de maximum 1-2 randuri.",
      },
      {
        label: "Text secundar",
        appears: "Apare dupa imagine/citat pentru explicatii suplimentare.",
        tip: "Adauga pasi, detalii si recomandari practice.",
      },
    ],
    contentTips: [
      "Fiecare paragraf ar trebui sa raspunda la o intrebare reala.",
      "Evita citatele lungi.",
      "Imaginea trebuie sa sustina invatarea, nu doar decorul.",
    ],
  },
  layout3: {
    title: "Template 3 - Full image essay",
    purpose:
      "Pune o imagine panoramica in prim-plan si pastreaza lectura simpla, eleganta.",
    bestFor: "Eseuri vizuale, articole scurte, prezentari de gradini si borduri.",
    flow: [
      "Imaginea principala ocupa o zona lata si seteaza scena.",
      "Textul introductiv vine dupa imagine ca lectura calma.",
      "Callout-ul final strange ideea principala.",
    ],
    fieldMap: [
      {
        label: "Imagine principala Hero",
        appears: "Apare full width, cu impact vizual mare.",
        tip: "Foloseste fotografii landscape, ideal 1600x1000 sau mai mari.",
      },
      {
        label: "Text introductiv sub titlu",
        appears: "Apare imediat dupa imagine, ca eseu principal.",
        tip: "Tine textul aerisit: 3-5 paragrafe sunt suficiente.",
      },
      {
        label: "Caseta de recomandare",
        appears: "Apare spre final ca nota editoriala sau CTA.",
        tip: "Scrie o concluzie scurta ori trimite spre un ghid relevant.",
      },
    ],
    contentTips: [
      "Functioneaza cel mai bine cu o singura imagine foarte buna.",
      "Nu transforma template-ul intr-un ghid lung.",
      "Callout-ul trebuie sa fie util, nu promotional agresiv.",
    ],
  },
  layout4: {
    title: "Template 4 - Icon care list",
    purpose:
      "Transforma un ghid practic intr-o pagina scanabila, cu pasi de ingrijire si carduri utile.",
    bestFor: "Checklist-uri, ingrijire rapida, reguli de baza si articole practice.",
    flow: [
      "Imaginea principala creeaza context.",
      "Lista de pasi apare ca zona centrala de actiune.",
      "Cardurile rapide explica detalii importante.",
    ],
    fieldMap: [
      {
        label: "Imagine principala Hero",
        appears: "Apare sus, ca imagine de context pentru ghid.",
        tip: "Alege o fotografie clara cu planta sau ritualul de ingrijire.",
      },
      {
        label: "Pasi de ingrijire",
        appears: "Apare ca lista vizuala cu icon-uri/check-uri.",
        tip: "Adauga 3-6 pasi. Fiecare pas trebuie sa aiba titlu scurt.",
      },
      {
        label: "Sfaturi rapide",
        appears: "Apar ca mici carduri informative.",
        tip: "Bune pentru lumina, apa, sol, fertilizare, taiere.",
      },
    ],
    contentTips: [
      "Pune informatia esentiala in checklist.",
      "Cardurile trebuie sa fie complementare, nu duplicate.",
      "Textele scurte sunt mai bune decat paragrafele lungi.",
    ],
  },
  layout5: {
    title: "Template 5 - Seasonal showcase",
    purpose:
      "Prezinta o floare sau o idee de sezon cu imagine verticala si galerie de inspiratie.",
    bestFor: "Terase, ghivece, aranjamente, inspiratie de primavara/vara/toamna.",
    flow: [
      "Textul introduce tema si sezonul.",
      "Imaginea verticala apare ca piesa vizuala eleganta.",
      "Galeria adauga cadre complementare.",
    ],
    fieldMap: [
      {
        label: "Imagine verticala din dreapta",
        appears: "Apare ca imagine principala verticala in compozitie.",
        tip: "Ideal portret, cu subiect clar si fundal calm.",
      },
      {
        label: "Text introductiv sub titlu",
        appears: "Apare langa imaginea verticala sau inaintea galeriei.",
        tip: "Scrie despre sezon, atmosfera si folosire in gradina.",
      },
      {
        label: "Galerie de inspiratie",
        appears: "Apare ca serie de imagini mici/medii in flow-ul articolului.",
        tip: "Adauga 3-6 imagini cu unghiuri diferite.",
      },
    ],
    contentTips: [
      "Pastreaza galeria coerenta cromatic.",
      "Imaginea verticala trebuie sa fie cea mai eleganta.",
      "Foloseste caption-uri utile, nu generice.",
    ],
  },
  layout6: {
    title: "Template 6 - Quote-led feature",
    purpose:
      "Construieste o lectura de revista in jurul unei idei puternice si a unui citat memorabil.",
    bestFor: "Portrete de plante, eseuri florale, articole cu voce editoriala.",
    flow: [
      "Textul introductiv stabileste povestea.",
      "Citatul apare ca moment central.",
      "Imaginea secundara sustine atmosfera.",
      "Textul secundar continua lectura dupa citat.",
    ],
    fieldMap: [
      {
        label: "Citat evidentiat in mijlocul articolului",
        appears: "Apare ca bloc mare, vizibil, intre sectiuni.",
        tip: "Alege o fraza cu emotie si claritate.",
      },
      {
        label: "Imagine secundara din articol",
        appears: "Apare langa sau dupa citat, ca textura vizuala.",
        tip: "Foloseste o imagine intima: petale, lumina, detaliu.",
      },
      {
        label: "Text secundar",
        appears: "Apare dupa citat pentru dezvoltarea ideii.",
        tip: "Continua natural, fara sa repeti introducerea.",
      },
    ],
    contentTips: [
      "Citatul este piesa de rezistenta.",
      "Alege un ritm narativ, nu o lista de instructiuni.",
      "Imaginea secundara trebuie sa para aleasa, nu doar disponibila.",
    ],
  },
  layout7: {
    title: "Template 7 - Timeline garden journal",
    purpose:
      "Organizeaza un articol pe etape, luni sau momente din evolutia unei plante.",
    bestFor: "Calendare de ingrijire, evolutii sezoniere, proiecte de gradina.",
    flow: [
      "Galeria creeaza context vizual.",
      "Timeline-ul ordoneaza etapele.",
      "Textul secundar explica detaliile dintre momente.",
    ],
    fieldMap: [
      {
        label: "Galerie de inspiratie",
        appears: "Apare ca zona vizuala ampla in articol.",
        tip: "Adauga imagini care arata schimbarea in timp.",
      },
      {
        label: "Timeline / calendar",
        appears: "Apare ca succesiune clara de etape.",
        tip: "Foloseste etichete precum Martie, Aprilie, Vara, Dupa inflorire.",
      },
      {
        label: "Text secundar",
        appears: "Apare dupa timeline pentru explicatii suplimentare.",
        tip: "Explica de ce conteaza fiecare etapa.",
      },
    ],
    contentTips: [
      "Timeline-ul trebuie sa fie cronologic.",
      "Nu pune prea multe etape: 4-7 sunt ideale.",
      "Fiecare imagine ar trebui sa arate alt moment sau alt detaliu.",
    ],
  },
  layout8: {
    title: "Template 8 - Landscape presentation",
    purpose:
      "Prezinta o compozitie de gradina ca o propunere premium de design floral.",
    bestFor: "Borduri, alei, combinatii de plante, gradini amenajate.",
    flow: [
      "Imaginea principala arata scena intreaga.",
      "Lista fixeaza principiile de design.",
      "Cardurile explica plantele, texturile si rolurile lor.",
    ],
    fieldMap: [
      {
        label: "Imagine principala Hero",
        appears: "Apare ca scena mare de landscaping.",
        tip: "Alege o fotografie cu structura clara: fundal, volum, prim-plan.",
      },
      {
        label: "Pasi / principii de compozitie",
        appears: "Apar ca lista vizuala.",
        tip: "Scrie reguli scurte: repeta textura, pastreaza paleta, creeaza volum.",
      },
      {
        label: "Carduri de compozitie",
        appears: "Apar ca blocuri editoriale cu titlu, text si imagine.",
        tip: "Fiecare card poate explica o planta sau un strat din gradina.",
      },
      {
        label: "Imagine secundara din articol",
        appears: "Apare ca detaliu sau cadru alternativ.",
        tip: "Buna pentru prim-plan de frunzis sau textura.",
      },
    ],
    contentTips: [
      "Gandeste articolul ca o prezentare de proiect.",
      "Cardurile trebuie sa arate roluri clare in compozitie.",
      "Evita prea multe culori sau plante intr-un singur articol.",
    ],
  },
  layout9: {
    title: "Template 9 - Minimal luxury reading",
    purpose:
      "Ofera o lectura foarte aerisita, cu accent pe text, tipografie si o concluzie eleganta.",
    bestFor: "Eseuri scurte, texte contemplative, articole poetice.",
    flow: [
      "Titlul si textul primesc mult spatiu.",
      "Citatul creeaza o pauza editoriala.",
      "Callout-ul incheie cu o nota practica sau inspirationala.",
    ],
    fieldMap: [
      {
        label: "Text introductiv sub titlu",
        appears: "Apare ca lectura principala, cu mult whitespace.",
        tip: "Scrie clar si frumos. 4-7 paragrafe sunt ideale.",
      },
      {
        label: "Citat evidentiat",
        appears: "Apare intre blocurile de text.",
        tip: "Foloseste o propozitie scurta, cu valoare emotionala.",
      },
      {
        label: "Caseta de recomandare",
        appears: "Apare spre final.",
        tip: "Poate contine o concluzie, un sfat sau un link discret.",
      },
    ],
    contentTips: [
      "Mai putin este mai bine in acest template.",
      "Nu adauga liste sau imagini inutile.",
      "Titlul trebuie sa fie elegant si memorabil.",
    ],
  },
  layout10: {
    title: "Template 10 - Magazine feature",
    purpose:
      "Creeaza un articol complet, bogat, cu hero, galerie, cards, autor si recomandari.",
    bestFor: "Ghiduri flagship, articole lungi, showcase-uri premium.",
    flow: [
      "Hero-ul deschide articolul puternic.",
      "Introducerea explica subiectul.",
      "Textul secundar dezvolta ghidul.",
      "Galeria si cardurile adauga profunzime.",
      "Autorul si articolele recomandate inchid experienta.",
    ],
    fieldMap: [
      {
        label: "Imagine principala Hero",
        appears: "Apare in deschiderea articolului si in listing.",
        tip: "Alege cea mai buna imagine. Este coperta articolului.",
      },
      {
        label: "Imagine verticala",
        appears: "Apare ca moment editorial premium in interior.",
        tip: "Ideala pentru ghivece, portrete florale sau detalii sculpturale.",
      },
      {
        label: "Galerie de inspiratie",
        appears: "Apare ca bloc vizual amplu.",
        tip: "Adauga imagini coerente, cu caption-uri utile.",
      },
      {
        label: "Sfaturi rapide",
        appears: "Apar ca info cards in articol.",
        tip: "Bune pentru lumina, apa, sol, amplasare.",
      },
      {
        label: "Articole recomandate",
        appears: "Apar la final, pentru continuarea lecturii.",
        tip: "Alege articole relevante, nu doar cele mai recente.",
      },
    ],
    contentTips: [
      "Foloseste acest template pentru cele mai importante articole.",
      "Pregateste toate imaginile inainte de editare.",
      "Pastreaza fiecare sectiune cu rol clar.",
    ],
  },
};

const shell: CSSProperties = {
  border: "1px solid rgba(35, 53, 31, 0.14)",
  borderRadius: 22,
  background:
    "linear-gradient(135deg, rgba(255,253,247,0.96), rgba(223,230,208,0.44), rgba(243,222,216,0.24))",
  padding: 18,
  boxShadow: "0 18px 54px rgba(35,53,31,0.07)",
};

function MiniMap({ guide }: { guide: Guide }) {
  return (
    <div
      style={{
        display: "grid",
        gap: 8,
        borderRadius: 18,
        background: "rgba(255,255,255,0.58)",
        padding: 12,
      }}
    >
      {guide.flow.map((step, index) => (
        <div
          key={step}
          style={{
            display: "grid",
            gridTemplateColumns: "34px 1fr",
            gap: 10,
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              width: 28,
              height: 28,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
              background: index === 0 ? "#d7a49d" : "rgba(109,125,69,0.16)",
              color: index === 0 ? "#fffdf7" : "#23351f",
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            {index + 1}
          </span>
          <span style={{ color: "#4d5746", fontSize: 13, lineHeight: 1.5 }}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ArticleTemplateGuideInput(_props: StringInputProps) {
  void _props;
  const layout = String(useFormValue(["layout"]) || "layout1");
  const guide = guides[layout] || guides.layout1;

  return (
    <div style={shell}>
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        <div>
          <div
            style={{
              color: "#6d7d45",
              fontSize: 12,
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            Ghid pentru template-ul selectat
          </div>
          <h3
            style={{
              color: "#23351f",
              fontFamily: "Georgia, Times New Roman, serif",
              fontSize: 28,
              lineHeight: 1.08,
              margin: "0 0 10px",
              fontWeight: 400,
            }}
          >
            {guide.title}
          </h3>
          <p style={{ color: "#4d5746", lineHeight: 1.65, margin: 0 }}>
            {guide.purpose}
          </p>
          <p
            style={{
              color: "#4d5746",
              lineHeight: 1.65,
              margin: "12px 0 0",
            }}
          >
            <strong>Se potriveste pentru:</strong> {guide.bestFor}
          </p>
        </div>

        <MiniMap guide={guide} />
      </div>

      <div
        style={{
          display: "grid",
          gap: 12,
          marginTop: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        {guide.fieldMap.map((item) => (
          <div
            key={item.label}
            style={{
              border: "1px solid rgba(35,53,31,0.1)",
              borderRadius: 18,
              background: "rgba(255,253,247,0.72)",
              padding: 14,
            }}
          >
            <div
              style={{
                color: "#23351f",
                fontSize: 14,
                fontWeight: 800,
                marginBottom: 6,
              }}
            >
              {item.label}
            </div>
            <div style={{ color: "#52604b", fontSize: 13, lineHeight: 1.55 }}>
              {item.appears}
            </div>
            <div
              style={{
                color: "#8d6a62",
                fontSize: 13,
                lineHeight: 1.55,
                marginTop: 8,
              }}
            >
              {item.tip}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 16,
          borderRadius: 18,
          background: "rgba(215,164,157,0.16)",
          padding: 14,
        }}
      >
        <div style={{ color: "#23351f", fontSize: 14, fontWeight: 800 }}>
          Recomandari rapide
        </div>
        <ul
          style={{
            margin: "8px 0 0",
            paddingLeft: 18,
            color: "#52604b",
            fontSize: 13,
            lineHeight: 1.65,
          }}
        >
          {guide.contentTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
