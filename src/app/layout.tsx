import type { Metadata } from "next";
import { inter } from '../utils/fonts';
import ThemeClientProvider from "@/theme";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/authContext";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export const metadata: Metadata = {
  title: "GreenHub ADMIN",
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
            <ToastContainer />
            <SessionProvider>
              <AuthProvider>
                {children}
              </AuthProvider>
            </SessionProvider>
          </ThemeClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
