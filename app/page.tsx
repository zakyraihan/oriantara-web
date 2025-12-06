
import OriantaraLanding from "./components/header";
import AboutUs from "./components/about";
import FeaturedProduct from "./components/featuredProducts";
import OurServices from "./components/ourServices";



export default function Home() {
  return (
    <section id="home">
      <OriantaraLanding />
      <AboutUs />
      <FeaturedProduct />
      <OurServices />
    </section>

  );
}
