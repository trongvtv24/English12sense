import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Vương Quốc 12 Thì | English Tenses App",
  description: "Ứng dụng học tiếng Anh cho bé 9 tuổi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${nunito.variable} font-sans antialiased bg-[#f0fdf4] text-slate-800 overflow-x-hidden`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
