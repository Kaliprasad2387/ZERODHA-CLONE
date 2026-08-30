import Hero from "./landing_page/home/Hero";
import Awards from "./landing_page/home/Awards";
import Stats from "./landing_page/home/Stats";
import Pricing from "./landing_page/home/Pricing";
import Education from "./landing_page/home/Education";
import OpenAccount from "./landing_page/OpenAccount";

function Homepage() {
  return (
    <>
      <Hero />
      <Awards />
      <Stats />
      <Pricing />
      <Education />
      <OpenAccount />
    </>
  );
}

export default Homepage;