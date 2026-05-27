"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const contactReasons = [
  {
    title: "Ai nevoie de o recomandare florala",
    text: "Spune-ne ce spatiu ai, ce lumina primeste si ce atmosfera vrei sa creezi.",
  },
  {
    title: "Pregatesti o gradina sau o terasa",
    text: "Ne poti scrie despre culori, ghivece, borduri, plante favorite si ritmul sezonului.",
  },
  {
    title: "Vrei sa propui o poveste botanica",
    text: "Primim cu drag sugestii de flori, ghiduri si subiecte care merita explorate.",
  },
];

const expectations = [
  "Raspundem cu grija, de obicei in 1-2 zile lucratoare.",
  "Citirea mesajului tau este facuta de oameni, nu de un raspuns automat rece.",
  "Cu cat oferi mai mult context, cu atat recomandarea poate fi mai potrivita.",
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Mesajul nu a putut fi trimis.");
        return;
      }

      setSuccessMessage(
        "Mesajul a ajuns la noi. Iti raspundem cu grija cat de curand.",
      );
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setErrorMessage("Mesajul nu a putut fi trimis. Incearca din nou.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-transparent px-4 py-7 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <section className="article-reveal mb-11 grid gap-7 sm:mb-16 sm:gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Link
              href="/"
              className="mb-6 inline-flex text-sm font-semibold text-gray-600 transition hover:text-primary sm:mb-8"
            >
              Inapoi acasa
            </Link>
            <p className="editorial-kicker mb-3 sm:mb-4">Contact</p>
            <h1 className="max-w-3xl font-serif text-[2.7rem] font-normal leading-[1.03] tracking-normal text-secondary sm:text-6xl lg:text-7xl">
              Scrie-ne ca intr-o scrisoare catre o gradina draga.
            </h1>
            <p className="mt-5 max-w-2xl text-[0.98rem] leading-7 text-gray-700 sm:mt-6 sm:text-lg sm:leading-8">
              Fie ca ai o intrebare despre o floare, o idee pentru o terasa sau
              o poveste botanica pe care vrei sa o propui, aici incepe
              conversatia.
            </p>

            <div className="mt-7 grid max-w-2xl grid-cols-3 gap-2 sm:mt-8 sm:gap-3">
              {["calm", "botanic", "personal"].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.1rem] border border-white/70 bg-white/48 px-2 py-3 text-center shadow-[0_14px_38px_rgba(31,50,28,0.07)] backdrop-blur-xl sm:rounded-2xl sm:px-4 sm:py-4"
                >
                  <p className="text-sm font-semibold text-secondary">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[22rem] overflow-hidden rounded-[1.7rem] border border-white/70 shadow-[0_26px_76px_rgba(31,50,28,0.16)] sm:min-h-[32rem] sm:rounded-[2.75rem]">
            <Image
              src="/images/articles/hortensia-demo/care-detail.png"
              alt="Masa botanica eleganta cu unelte de ingrijire si flori"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 620px"
              className="premium-image object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/64 via-secondary/8 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
              <p className="max-w-md font-serif text-[1.85rem] leading-tight tracking-normal sm:text-4xl">
                Un mesaj bun incepe cu lumina, locul si floarea pe care o ai in
                minte.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-11 grid gap-5 sm:mb-20 sm:gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <aside className="grid gap-5">
            <div className="premium-blush-surface article-reveal rounded-[1.55rem] p-5 sm:rounded-[2.25rem] sm:p-8">
              <p className="editorial-kicker mb-4">Ne poti scrie pentru</p>
              <div className="space-y-5">
                {contactReasons.map((reason) => (
                  <div
                    key={reason.title}
                    className="border-b border-secondary/10 pb-5 last:border-b-0 last:pb-0"
                  >
                    <h2 className="font-serif text-[1.45rem] font-normal leading-tight tracking-normal text-secondary sm:text-2xl">
                      {reason.title}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-gray-700">
                      {reason.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-surface article-reveal rounded-[1.55rem] p-5 sm:rounded-[2.25rem] sm:p-8">
              <p className="editorial-kicker mb-4">Date de contact</p>
              <div className="space-y-5 text-sm leading-7 text-gray-700">
                <div>
                  <p className="font-semibold text-secondary">Email</p>
                  <a
                    href="mailto:contact@flori.ro"
                    className="transition hover:text-primary"
                  >
                    contact@flori.ro
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-secondary">Program de raspuns</p>
                  <p>Luni - Vineri, in ritmul firesc al unei redactii calme.</p>
                </div>
                <div>
                  <p className="font-semibold text-secondary">Subiecte potrivite</p>
                  <p>Flori, gradini, inspiratie botanica, propuneri editoriale.</p>
                </div>
              </div>
            </div>
          </aside>

          <section className="article-reveal overflow-hidden rounded-[1.7rem] border border-white/70 bg-[#fffaf1]/82 shadow-[0_24px_70px_rgba(31,50,28,0.12)] backdrop-blur-xl sm:rounded-[2.5rem]">
            <div className="border-b border-secondary/10 bg-gradient-to-r from-blush-soft via-white/40 to-primary-soft p-5 sm:p-8">
              <p className="editorial-kicker mb-3">Trimite mesajul</p>
              <h2 className="font-serif text-[2.05rem] font-normal leading-tight tracking-normal text-secondary sm:text-5xl">
                Spune-ne ce vrei sa crestem impreuna.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-700 sm:text-base">
                Formularul este gandit ca un mic ritual: numele tau, locul unde
                iti raspundem si cateva randuri despre ce ai nevoie.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-5 sm:space-y-5 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="group block">
                  <span className="mb-2 block text-sm font-semibold text-secondary">
                    Numele tau
                  </span>
                  <input
                    type="text"
                    placeholder="Ex: Maria Popescu"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-[1.1rem] border border-secondary/12 bg-white/58 px-4 py-3.5 text-sm text-secondary outline-none transition placeholder:text-gray-400 focus:border-blush/70 focus:bg-[#fffdf7] focus:ring-4 focus:ring-blush-soft sm:rounded-2xl"
                  />
                </label>

                <label className="group block">
                  <span className="mb-2 block text-sm font-semibold text-secondary">
                    Email pentru raspuns
                  </span>
                  <input
                    type="email"
                    placeholder="exemplu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-[1.1rem] border border-secondary/12 bg-white/58 px-4 py-3.5 text-sm text-secondary outline-none transition placeholder:text-gray-400 focus:border-blush/70 focus:bg-[#fffdf7] focus:ring-4 focus:ring-blush-soft sm:rounded-2xl"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-secondary">
                  Mesajul tau
                </span>
                <textarea
                  placeholder="Ex: Am o terasa cu lumina de dimineata si as vrea flori elegante, usor de ingrijit..."
                  rows={7}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-none rounded-[1.15rem] border border-secondary/12 bg-white/58 px-4 py-4 text-sm leading-7 text-secondary outline-none transition placeholder:text-gray-400 focus:border-blush/70 focus:bg-[#fffdf7] focus:ring-4 focus:ring-blush-soft sm:rounded-[1.35rem]"
                />
              </label>

              <div className="flex flex-col gap-4 border-t border-secondary/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-xs leading-6 text-gray-600">
                  Include, daca poti, lumina, spatiul, sezonul si floarea care
                  te intereseaza. Ajuta mult.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="botanical-button w-full px-7 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {loading ? "Se trimite..." : "Trimite mesajul"}
                </button>
              </div>

              {successMessage && (
                <div className="rounded-2xl border border-primary/20 bg-primary-soft px-4 py-3 text-sm font-semibold text-secondary">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="rounded-2xl border border-blush/30 bg-blush-soft px-4 py-3 text-sm font-semibold text-secondary">
                  {errorMessage}
                </div>
              )}
            </form>
          </section>
        </section>

        <section className="mb-11 grid gap-4 sm:mb-20 sm:gap-5 md:grid-cols-3">
          {expectations.map((item, index) => (
            <div
              key={item}
              className="premium-surface article-reveal rounded-[1.45rem] p-5 sm:rounded-[2rem] sm:p-6"
            >
              <span className="font-serif text-4xl text-blush">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-5 text-sm leading-7 text-gray-700">{item}</p>
            </div>
          ))}
        </section>

        <section className="article-reveal overflow-hidden rounded-[1.7rem] border border-white/70 bg-secondary text-white shadow-[0_26px_76px_rgba(31,50,28,0.2)] sm:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[15rem] sm:min-h-[20rem] lg:min-h-full">
              <Image
                src="/images/articles/hortensia-demo/garden-border.png"
                alt="Bordura botanica eleganta cu hortensii si frunzis"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/58 to-transparent" />
            </div>
            <div className="p-5 sm:p-10 lg:p-12">
              <p className="mb-4 text-sm font-semibold text-blush">
                O ultima nota
              </p>
              <blockquote className="max-w-2xl font-serif text-[2.05rem] font-normal leading-tight tracking-normal sm:text-5xl">
                Florile bune nu grabesc raspunsurile. Ele ne invata sa observam
                mai atent.
              </blockquote>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/72">
                Daca mesajul tau porneste din curiozitate, dintr-o gradina in
                lucru sau dintr-o floare pe care vrei sa o intelegi mai bine,
                esti in locul potrivit.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
