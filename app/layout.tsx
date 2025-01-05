import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
        <div className="">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
