import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";
import "react-toastify/dist/ReactToastify.css";
import "../i18n";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

import ClientProviders from "@/ClientProviders";
import ProtectedPageManager from "@/components/layout/ProtectedPageManager";
import SessionProviderWrapper from "@/components/layout/SessionProviderWrapper";

declare global {
  interface Window {
    $zoho?: any;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Test</title>
        <meta name="description" content="test-case" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <SessionProviderWrapper>
          <ClientProviders>
            <ProtectedPageManager>{children}</ProtectedPageManager>
          </ClientProviders>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
