import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import ServiceSelector from "@/components/ServiceSelector";
import BodyworkSection from "@/components/BodyworkSection";
import MechanicsSection from "@/components/MechanicsSection";
import Gallery from "@/components/Gallery";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ProcessTimeline from "@/components/ProcessTimeline";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import QuoteForm from "@/components/QuoteForm";
import Location from "@/components/Location";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" className="pb-16 lg:pb-0">
        <Hero />
        <TrustBar />
        <Services />
        <ServiceSelector />
        <BodyworkSection />
        <MechanicsSection />
        <Gallery />
        <BeforeAfterSlider />
        <ProcessTimeline />
        <Testimonials />
        <About />
        <QuoteForm />
        <Location />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
