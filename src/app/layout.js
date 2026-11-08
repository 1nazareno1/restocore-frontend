import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BrandingProvider } from "@/components/providers/BrandingProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rose Resto Bar | Panel",
  description: "Gestión de menú y configuración del restaurante",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          {children}
      </body>
    </html>
  );
}
