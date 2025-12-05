import Image from "next/image";
import OriantaraLanding from "./components/header";
import AboutUs from "./components/about";
import FeaturedProduct from "./components/featuredProducts";



export default function Home() {
  return (
    <section id="home">
      <OriantaraLanding />
      <AboutUs />
      <FeaturedProduct />
    </section>

  );
}
