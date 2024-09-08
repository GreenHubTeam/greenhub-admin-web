import type { Metadata } from "next";
import { inter } from '../utils/fonts';
import ThemeClientProvider from "@/theme";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export const metadata: Metadata = {
  title: "GreenHub",
  description: "GreenHub plataforma de gerenciamento de projetos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeClientProvider>
            {children}
          </ThemeClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
