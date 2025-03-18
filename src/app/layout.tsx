import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WeatherFinder",
  description: "Um app que exibe a previsão do tempo em tempo real com base na sua localização.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt suppressHydrationWarning">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-all`}
      >
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
