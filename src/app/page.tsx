import Preloader from "@/components/Preloader";
import AudioPlayer from "@/components/AudioPlayer";
import Hero from "@/components/Hero";
import InviteSection from "@/components/InviteSection";
import Gallery from "@/components/Gallery";
import LoveStory from "@/components/LoveStory";
import Toasts from "@/components/Toasts";
import Countdown from "@/components/Countdown";
import DayProgram from "@/components/DayProgram";
import Directions from "@/components/Directions";
import DressCode from "@/components/DressCode";
import Gifts from "@/components/Gifts";
import RSVP from "@/components/RSVP";
import SeatLookup from "@/components/SeatLookup";
import GuestWall from "@/components/GuestWall";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <AudioPlayer />
      <main>
        <Hero />
        <InviteSection />
        <Gallery />
        <LoveStory />
        <Toasts />
        <Countdown />
        <DayProgram />
        <Directions />
        <DressCode />
        <Gifts />
        <RSVP />
        <GuestWall />
        <SeatLookup />
        <Footer />
      </main>
    </>
  );
}
