import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DeviceUX from "@/components/DeviceUX";
import MeshAnimation from "@/components/MeshAnimation";
import MeshExplainer from "@/components/MeshExplainer";
import UsageScenarios from "@/components/UsageScenarios";
import ComparisonTable from "@/components/ComparisonTable";
import RangeScience from "@/components/RangeScience";
import FounderStory from "@/components/FounderStory";
import AppPromo from "@/components/AppPromo";
import PartnershipSection from "@/components/PartnershipSection";
import WaitlistForm from "@/components/WaitlistForm";
import SupportSection from "@/components/SupportSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <DeviceUX />
      <MeshAnimation />
      <MeshExplainer />
      <UsageScenarios />
      <ComparisonTable />
      <RangeScience />
      <FounderStory />
      <AppPromo />
      <PartnershipSection />
      <WaitlistForm />
      <SupportSection />
      <Footer />
    </>
  );
}
