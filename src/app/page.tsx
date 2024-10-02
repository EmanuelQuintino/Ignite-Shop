"use client";

import { HomeContainer, Product } from "@/styles/app/page";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { stripe } from "../lib/stripe";
import { useEffect, useState } from "react";
import Stripe from "stripe";

type Products = {
  id: string;
  name: string;
  imageURL: string;
  price: number;
}[];

export default function Home() {
  const [products, setProducts] = useState<Products>();

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await stripe.products.list({
        expand: ["data.default_price"],
      });

      const products = response.data.map((product) => {
        const price = product.default_price as Stripe.Price;

        return {
          id: product.id,
          name: product.name,
          imageURL: product.images[0],
          price: (price.unit_amount || 0) / 100,
        };
      });

      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products?.map((product) => {
        return (
          <Product className="keen-slider__slide" key={product?.id}>
            <Image src={product.imageURL} alt="shirt1" width={420} height={320} />

            <footer>
              <strong>{product.name}</strong>
              <span>
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </footer>
          </Product>
        );
      })}
    </HomeContainer>
  );
}
