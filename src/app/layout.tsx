import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import "./globals.css";
import SessionWrapper from "../lib/sessionWrapper";
import { Suspense } from "react";
import Loading from "@/src/components/load/loading";

// ! Ceci gere les informations pour le referencement (SEO)
export const metadata: Metadata = {
  title: "Carya App",
  description: "Mon application Carya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <SessionWrapper>
          {/*AppRouterCacheProvider permet a material ui de bien fonctionner avec le rendu cote server de next*/}
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              {/* CssBaseline reinitialise les marges par defaut du navigateur */}
              <CssBaseline />
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
