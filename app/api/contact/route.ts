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
    const body = await request.json();
    console.log("CONTACT BODY:", body);

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Toate câmpurile sunt obligatorii." },
        { status: 400 },
      );
    }

    if (!process.env.SANITY_API_WRITE_TOKEN) {
      console.error("Lipsește SANITY_API_WRITE_TOKEN");
      return NextResponse.json(
        { error: "Lipsește tokenul de scriere pentru Sanity." },
        { status: 500 },
      );
    }

    const created = await writeClient.create({
      _type: "contactMessage",
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    });

    console.log("CONTACT SALVAT:", created._id);

    return NextResponse.json({ success: true, id: created._id });
  } catch (error) {
    console.error("EROARE CONTACT:", error);

    return NextResponse.json(
      { error: "A apărut o eroare la trimiterea mesajului." },
      { status: 500 },
    );
  }
}
