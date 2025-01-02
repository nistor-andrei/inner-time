import { Open_Sans } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Inner time",
  description: "Your help in organizing appointments",
};

const openSans = Open_Sans({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                  <div className="flex items-center gap-2"></div>
                </div>
              </div>
            </nav>
            <div className="flex flex-col gap-20 max-w-5xl p-5">{children}</div>
            <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16"></footer>
          </div>
        </main>
      </body>
    </html>
  );
}
