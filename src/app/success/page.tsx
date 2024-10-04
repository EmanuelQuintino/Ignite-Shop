import { ImageContainer, SuccessContainer } from "@/styles/app/success";
import Link from "next/link";

export default function Success() {
  return (
    <SuccessContainer>
      <h1>Compra realizada com sucesso!</h1>

      <ImageContainer></ImageContainer>

      <p>
        Uhuul, <strong>XXXXX</strong>, sua <strong>XXXXXX</strong> já está a caminho da
        sua casa!
      </p>

      <Link href={"/"}>Voltar ao catálogo</Link>
    </SuccessContainer>
  );
}
