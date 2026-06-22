import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drink Vye | Organic Coconut Water",
  description:
    "Organic coconut water made to refresh, replenish, and keep things naturally simple.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico?v=20260622", sizes: "any" },
      {
        url: "/favicon-16x16.png?v=20260622",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png?v=20260622",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=20260622", sizes: "180x180" },
    ],
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png?v=20260622",
        sizes: "192x192",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png?v=20260622",
        sizes: "512x512",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer variant="rounded" />
      </body>
    </html>
  );
}
