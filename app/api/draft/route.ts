import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { searchParams } = url;
  const secret = searchParams.get("secret");
  const expectedSecret = process.env.SANITY_PREVIEW_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return new Response("Invalid preview secret", { status: 401 });
  }

  const redirectTo = getSafeRedirectPath(
    searchParams.get("redirect") || searchParams.get("slug"),
    url,
  );

  const draft = await draftMode();
  draft.enable();

  redirect(redirectTo);
}

function getSafeRedirectPath(value: string | null, requestUrl: URL) {
  if (!value) return "/";

  const path = value.startsWith("/") ? value : `/blog/${value}`;
  const redirectUrl = new URL(path, requestUrl.origin);

  if (redirectUrl.origin !== requestUrl.origin) return "/";

  return `${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}`;
}
