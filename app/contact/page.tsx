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
        body: JSON.stringify({
          name,
          email,
          message,
        }),
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
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-4xl font-bold">Contact</h1>

        <p className="mb-6 text-gray-700">
          Dacă ai întrebări, sugestii sau vrei să colaborăm, ne poți contacta
          folosind formularul de mai jos.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Numele tău"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <textarea
            placeholder="Mesajul tău"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg bg-primary px-4 py-2 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Se trimite..." : "Trimite mesaj"}
          </button>

          {successMessage && (
            <p className="text-sm font-medium text-secondary">
              {successMessage}
            </p>
          )}

          {errorMessage && (
            <p className="text-sm font-medium text-red-600">{errorMessage}</p>
          )}
        </form>
      </div>
    </main>
  );
}
