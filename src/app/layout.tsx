import { getCssText } from "@/styles";
import { globalStyles } from "@/styles/global";
import { Roboto } from "next/font/google";
import logoImg from "../assets/logo.svg";
import Image from "next/image";
import { Container, Header } from "@/styles/app/layout";
import Link from "next/link";

const baseFont = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  style: "normal",
});

globalStyles();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={baseFont.className}>
      <head>
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </head>
      <body>
        <Container>
          <Header>
            <Link href={"/"}>
              <Image src={logoImg.src} alt="logo ignite" width={130} height={52} />
            </Link>
          </Header>

          {children}
        </Container>
      </body>
    </html>
  );
}
