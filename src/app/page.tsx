"use client";

import { HomeContainer, Product } from "@/styles/app/home";
import Image from "next/image";

import shirt1 from "../assets/shirt1.png";
import shirt2 from "../assets/shirt2.png";
// import shirt3 from "../assets/shirt3.png";

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={shirt1} alt="shirt1" width={520} height={480} />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product>
        <Image src={shirt2} alt="shirt2" width={520} height={480} />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      {/* <Product>
        <Image src={shirt3} alt="shirt3" width={520} height={480} />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product> */}
    </HomeContainer>
  );
}
