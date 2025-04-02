import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  const response = NextResponse.next();
  const requestedUrl = request.nextUrl.pathname;

  // Skip middleware for API routes and static files
  if (requestedUrl.startsWith('/api') || requestedUrl.startsWith('/_next')) {
    return response;
  }

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

  const { data: { user } } = await supabase.auth.getUser();

  // Handle auth callback
  if (requestedUrl === "/auth/callback") {
    return user ? NextResponse.redirect(new URL("/", request.url)) : response;
  }

  // Handle authenticated routes
  if (user) {
    return requestedUrl === "/sign-in" 
      ? NextResponse.redirect(new URL("/", request.url))
      : response;
  }

  // Handle unauthenticated routes
  return requestedUrl === "/sign-in" || requestedUrl === "/auth/callback"
    ? response
    : NextResponse.redirect(new URL("/sign-in", request.url));
};

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
