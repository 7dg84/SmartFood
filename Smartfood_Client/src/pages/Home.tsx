import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { StatsSection } from '../components/StatsSection';
import { QuickLinks } from '../components/QuickLinks';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      {/* <StatsSection /> */}
      <QuickLinks />
      <Footer />
    </>
  );
}