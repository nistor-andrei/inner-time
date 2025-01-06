import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export const updateSession = async (request: NextRequest) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
        },
      },
    }
  );

  // Check if user is authenticated
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // If user is logged in, redirect away from sign-in/signup pages
  const requestedUrl = request.nextUrl.pathname;

  if (user) {
    if (requestedUrl === "/sign-in" || requestedUrl === "/sign-up") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // If the user is not logged in, redirect them to the sign-in page
    if (
      requestedUrl !== "/sign-in" &&
      requestedUrl !== "/sign-up" &&
      requestedUrl !== "/forgot-password" &&
      requestedUrl !== "/reset-password"
    ) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
};

// Define which routes the middleware will apply to
export const config = {
  matcher: ["/", "/sign-in", "/sign-up", "/forgot-password"], // List of routes you want to protect
};
