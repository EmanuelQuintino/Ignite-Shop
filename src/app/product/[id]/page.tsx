"use client";

import { stripe } from "@/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/app/product";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import Stripe from "stripe";

type Props = {
  params: { id: string };
};

type Product = {
  id: string;
  name: string;
  imageURL: string;
  price: string;
  description: string | null;
  defaultPriceID: string;
};

export default function Product({ params }: Props) {
  const [product, setProduct] = useState<Product>();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  const productID = params.id;

  const fetchProduct = async () => {
    const response = await stripe.products.retrieve(productID, {
      expand: ["default_price"],
    });

    const price = response.default_price as Stripe.Price;

    const product = {
      id: response.id,
      name: response.name,
      imageURL: response.images[0],
      price: ((price.unit_amount || 0) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      description: response.description,
      defaultPriceID: price.id,
    };

    setProduct(product);
  };

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        priceID: product?.defaultPriceID,
      });

      const { checkoutURL } = response.data;

      window.location.href = checkoutURL;
    } catch (error) {
      console.log(error);
      alert("Falha ao redirecionar o checkout!");
    } finally {
      setIsCreatingCheckoutSession(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <ProductContainer>
        {product && (
          <ImageContainer>
            <Image src={product?.imageURL} width={420} height={320} alt="" />
          </ImageContainer>
        )}

        <ProductDetails>
          <h1>{product?.name}</h1>
          <span>{product?.price}</span>
          <p>{product?.description}</p>

          <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession}>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}
