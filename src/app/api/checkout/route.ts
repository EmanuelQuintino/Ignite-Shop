import { stripe } from "@/lib/stripe";

export async function GET() {
  const priceID = "price_1Q5T3FD3IF6zbuNPv9lcVXwk";
  const successURL = `${process.env.APP_URL}/success`;
  const cancelURL = `${process.env.APP_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: successURL,
    cancel_url: cancelURL,
    line_items: [
      {
        price: priceID,
        quantity: 1,
      },
    ],
  });

  return new Response(
    JSON.stringify({
      message: "Compra realizada com sucesso!",
      status: 201,
      checkoutURL: checkoutSession.url,
    }),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
