import { Inter, Roboto } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/src/providers/Providers";

export const metadata: Metadata = {
  title: "App Mensagens",
  description: "App troca de mensagens em tempo real",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${roboto.variable}`}>
      <body
        className={`${inter.className} h-screen w-screen bg-radial from-sky-400 to-indigo-900`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
