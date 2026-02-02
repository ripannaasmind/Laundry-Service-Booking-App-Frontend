import {
  Hero,
  Services,
  About,
  CleaningJourney,
  Features,
  Satisfaction,
  Testimonials,
  ServiceNetwork,
  AppDownload,
  FAQ,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <CleaningJourney />
      <Features />
      <Satisfaction />
      <Testimonials />
      <ServiceNetwork />
      <AppDownload />
      <FAQ />
    </>
  );
}
