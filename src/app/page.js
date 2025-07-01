import Header from "./components/Header";
// import HeroSlider from "./components/HeroSlider";
import HeroSection from "./components/Hero";
// import CategoryMenu from "./components/CategoryMenu";
import Newsletter from "./components/Newsletter";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import ProductCarousel from "./components/ProductCarousel";
import CountdownTimer from "./components/CountdownTimer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      {/* <HeroSlider /> */}
      {/* <CategoryMenu /> */}
      <ProductGrid />
      <CountdownTimer />
      <ProductCarousel />
      <Newsletter />
      <Footer />
    </>
  );
}
