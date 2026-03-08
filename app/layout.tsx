import type { Metadata } from 'next';
import { Comfortaa, Nunito } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { EasterEggs } from '@/components/EasterEggs';

const comfortaa = Comfortaa({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-comfortaa',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Секретная миссия: Операция 8 Марта 🌸',
  description:
    'Интерактивный квест ко Дню 8 Марта. Пройди 7 заданий, собери кодовое слово и получи подарок!',
  keywords: ['8 марта', 'квест', 'поздравление', 'весна'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${comfortaa.variable} ${nunito.variable}`}>
      <body className="font-nunito antialiased">
        <TooltipProvider>
          <EasterEggs />
          {children}
          <Toaster
            position="top-center"
            richColors
            toastOptions={{
              style: { fontFamily: 'var(--font-nunito)' },
            }}
          />
        </TooltipProvider>
      </body>
    </html>
  );
}
