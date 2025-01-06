import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createClient();

  // Check if the user is authenticated
  const { data: user, error } = await supabase.auth.getUser();

  // Get the URL parameters
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  // If the user is logged in, redirect to `/` (home page)
  if (user) {
    return NextResponse.redirect(`${origin}/`);
  }

  // If the user is not logged in and the route is `sign-in` or `sign-up`, redirect to `/sign-in`
  if (
    !user &&
    (requestUrl.pathname === "/sign-in" || requestUrl.pathname === "/sign-up")
  ) {
    return NextResponse.next(); // Let the user access the sign-in or sign-up page
  }

  // If we have a code, exchange it for a session
  if (code) {
    try {
      // Try to exchange the code for a session
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      // Handle errors (e.g., expired code, invalid code, etc.)
      const errorDescription =
        (error as { message: string }).message ||
        "Unknown error during activation";
      return NextResponse.redirect(
        `${origin}/auth/callback?error=true&error_description=${encodeURIComponent(
          errorDescription
        )}`
      );
    }
  }

  // If there's a `redirect_to` parameter, redirect to that page
  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // If there's no `redirect_to`, just redirect to the home page
  return NextResponse.redirect(`${origin}/`);
}
