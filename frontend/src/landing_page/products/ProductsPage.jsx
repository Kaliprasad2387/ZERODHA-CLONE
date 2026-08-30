import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

function ProductsPage() {
  return (
    <>
      <Hero />

      <LeftSection
        image="kite.png"
        title="Kite"
        description="Our ultra-fast flagship trading platform with streaming market data, advanced charts, and an elegant UI."
      />

      <RightSection
        image="console.png"
        title="Console"
        description="The central dashboard for your Zerodha account with detailed reports and portfolio insights."
      />

      <LeftSection
        image="coin.png"
        title="Coin"
        description="Invest in direct mutual funds online with zero commission."
      />

      <RightSection
        image="kiteconnect.png"
        title="Kite Connect API"
        description="Build your own trading applications using powerful APIs."
      />

      <LeftSection
        image="varsity.png"
        title="Varsity"
        description="Free and open stock market education for everyone."
      />

      <Universe />
    </>
  );
}

export default ProductsPage;