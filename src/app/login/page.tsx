import { Suspense } from "react";
import type { Metadata } from "next";
import LoginClient from "./login-client";

export const metadata: Metadata = {
  title: "Authenticate",
  description: "Verify your identity to access The Witness Protocol Gate.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground/40 font-serif tracking-widest text-sm uppercase">
          Loading...
        </p>
      </main>
    }>
      <LoginClient />
    </Suspense>
  );
}
