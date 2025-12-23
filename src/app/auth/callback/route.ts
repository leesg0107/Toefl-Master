import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  console.log("[Auth Callback] Starting callback handler");
  console.log("[Auth Callback] Code present:", !!code);
  console.log("[Auth Callback] Origin:", origin);

  // Create response that we'll add cookies to
  let response = NextResponse.redirect(`${origin}/`);

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log("[Auth Callback] Supabase URL configured:", !!supabaseUrl);
    console.log("[Auth Callback] Supabase Anon Key configured:", !!supabaseAnonKey);

    if (supabaseUrl && supabaseAnonKey) {
      // Log existing cookies from request
      const existingCookies = request.cookies.getAll();
      console.log("[Auth Callback] Existing cookies:", existingCookies.map(c => c.name));

      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            const all = request.cookies.getAll();
            console.log("[Auth Callback] getAll called, returning:", all.map(c => c.name));
            return all;
          },
          setAll(cookiesToSet) {
            console.log("[Auth Callback] setAll called with cookies:", cookiesToSet.map(c => ({ name: c.name, hasValue: !!c.value })));
            cookiesToSet.forEach(({ name, value, options }) => {
              console.log("[Auth Callback] Setting cookie:", name, "options:", JSON.stringify(options));
              // Set cookies on the response object
              response.cookies.set(name, value, options);
            });
          },
        },
      });

      console.log("[Auth Callback] Calling exchangeCodeForSession...");
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      console.log("[Auth Callback] Exchange result - data:", !!data, "session:", !!data?.session, "user:", !!data?.user);

      if (error) {
        console.error("[Auth Callback] Error exchanging code for session:", error.message, error.status);
        // Redirect to auth page with error
        return NextResponse.redirect(`${origin}/auth?error=${encodeURIComponent(error.message)}`);
      }

      if (data?.session) {
        console.log("[Auth Callback] Session obtained successfully, user email:", data.user?.email);
      }
    }
  } else {
    console.log("[Auth Callback] No code provided in URL");
  }

  console.log("[Auth Callback] Redirecting to home page with cookies");
  return response;
}
