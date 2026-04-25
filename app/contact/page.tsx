"use client";

import { useState } from "react";

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
        setErrorMessage(data.error || "A apărut o eroare.");
        return;
      }

      setSuccessMessage("Mesajul a fost trimis cu succes.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setErrorMessage("A apărut o eroare. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-transparent px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
            Contact
          </p>

          <h1 className="mb-4 max-w-3xl text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
            Hai să vorbim despre flori
          </h1>

          <p className="max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Ai o întrebare, o sugestie sau vrei să iei legătura cu noi? Trimite
            un mesaj folosind formularul de mai jos.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-[2rem] border border-white/70 bg-white p-6 shadow-xl sm:p-8">
            <div className="mb-8 rounded-[1.5rem] bg-gradient-to-br from-[var(--primary-soft)] via-white to-[var(--secondary-soft)] p-6">
              <p className="mb-4 text-5xl">🌸</p>
              <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-950">
                Ne bucurăm să te auzim
              </h2>
              <p className="text-sm leading-7 text-gray-600">
                Fiecare mesaj ne ajută să construim un spațiu floral mai util,
                mai frumos și mai aproape de oamenii care iubesc florile.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Email
                </p>
                <p className="font-semibold text-gray-950">contact@flori.ro</p>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Telefon
                </p>
                <p className="font-semibold text-gray-950">07xx xxx xxx</p>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Răspuns
                </p>
                <p className="text-sm leading-7 text-gray-600">
                  Încercăm să răspundem cât mai curând posibil.
                </p>
              </div>
            </div>
          </aside>

          <div className="rounded-[2rem] border border-white/70 bg-white p-6 shadow-xl sm:p-8 lg:p-10">
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-950">
              Trimite un mesaj
            </h2>

            <p className="mb-8 text-sm leading-7 text-gray-600">
              Completează formularul, iar mesajul tău va ajunge la noi.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Numele tău
                </label>
                <input
                  type="text"
                  placeholder="Ex: Maria Popescu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-transparent px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[var(--primary)] focus:bg-white focus:ring-4 focus:ring-pink-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="exemplu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-transparent px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[var(--primary)] focus:bg-white focus:ring-4 focus:ring-pink-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Mesaj
                </label>
                <textarea
                  placeholder="Scrie mesajul tău aici..."
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-none rounded-2xl border border-gray-200 bg-transparent px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[var(--primary)] focus:bg-white focus:ring-4 focus:ring-pink-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {loading ? "Se trimite..." : "Trimite mesajul"}
              </button>

              {successMessage && (
                <div className="rounded-2xl bg-[var(--secondary-soft)] px-4 py-3 text-sm font-semibold text-[var(--secondary)]">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
