"use client";

import { stripe } from "@/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/app/product";
import Image from "next/image";
import { useState } from "react";
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
};

export default function Product({ params }: Props) {
  const [product, setProduct] = useState<Product>();

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
    };

    setProduct(product);
  };

  fetchProduct();

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
          <button>Comprar agora</button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}
