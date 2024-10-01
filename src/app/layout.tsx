import { Roboto } from "next/font/google";

const baseFont = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={baseFont.className}>
      <body>{children}</body>
    </html>
  );
}
