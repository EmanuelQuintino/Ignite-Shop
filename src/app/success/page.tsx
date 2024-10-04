import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer } from "@/styles/app/success";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";

type Props = {
  searchParams: {
    session_id?: string;
  };
};

export default async function Success({ searchParams }: Props) {
  const sessionID = searchParams.session_id;

  if (!sessionID) {
    redirect("/");
  }

  const session = await stripe.checkout.sessions.retrieve(sessionID, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  return (
    <SuccessContainer>
      <h1>Compra realizada com sucesso!</h1>

      <ImageContainer>
        <Image src={product.images[0]} alt="product" width={160} height={160} />
      </ImageContainer>

      <p>
        Uhuul, <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já
        está a caminho da sua casa!
      </p>

      <Link href={"/"}>Voltar ao catálogo</Link>
    </SuccessContainer>
  );
}
