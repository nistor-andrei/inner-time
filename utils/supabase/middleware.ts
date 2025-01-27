import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  const response = NextResponse.next(); // Create a mutable response object

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Check if the user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const requestedUrl = request.nextUrl.pathname;

  // Handle reset password token and type
  if (requestedUrl.startsWith("/reset-password")) {
    const token = request.nextUrl.searchParams.get("token_hash");
    const type = request.nextUrl.searchParams.get("type");

    if (!token || !type) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (user) {
    if (requestedUrl === "/sign-in" || requestedUrl === "/sign-up") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (
      requestedUrl !== "/sign-in" &&
      requestedUrl !== "/sign-up" &&
      requestedUrl !== "/forgot-password" &&
      requestedUrl !== "/reset-password"
    ) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return response; // Return the modified response
};

// Define which routes the middleware will apply to
export const config = {
  matcher: ["/", "/sign-in", "/sign-up", "/forgot-password", "/reset-password"], // List of routes to protect
};
