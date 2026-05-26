import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export async function POST(request: Request) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Mesajul trimis nu este valid." },
        { status: 400 },
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Mesajul trimis nu este valid." },
        { status: 400 },
      );
    }

    const { name, email, message } = body as Record<string, unknown>;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { error: "Completeaza numele, emailul si mesajul." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { error: "Adauga o adresa de email valida." },
        { status: 400 },
      );
    }

    if (!process.env.SANITY_API_WRITE_TOKEN) {
      console.error("Missing contact write token");
      return NextResponse.json(
        { error: "Mesajul nu a putut fi trimis momentan." },
        { status: 500 },
      );
    }

    const created = await writeClient.create({
      _type: "contactMessage",
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, id: created._id });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Mesajul nu a putut fi trimis momentan." },
      { status: 500 },
    );
  }
}
