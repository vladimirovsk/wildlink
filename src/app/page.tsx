import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DeviceUX from "@/components/DeviceUX";
import MeshAnimation from "@/components/MeshAnimation";
import UsageScenarios from "@/components/UsageScenarios";
import ComparisonTable from "@/components/ComparisonTable";
import FounderStory from "@/components/FounderStory";
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
      <UsageScenarios />
      <ComparisonTable />
      <FounderStory />
      <WaitlistForm />
      <SupportSection />
      <Footer />
    </>
  );
}
