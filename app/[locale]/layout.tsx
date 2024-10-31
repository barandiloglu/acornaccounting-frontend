import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const inter = Inter ({ subsets: ["latin"] });

export const metadata = {
  title: "Acorn Accounting", // Website name shown in the tab
  description: "Professional Accounting Services for Small and Medium Businesses.", // Website description
  icons: {
    icon: "/favicon.ico", // Reference to your favicon file
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: "en" | "tr" }>; // Awaitable params
}) {
  const { locale } = await params; // Await the params before destructuring

  if (!["en", "tr"].includes(locale)) {
    notFound();
  }

  // Pass the locale as an object to getMessages
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

