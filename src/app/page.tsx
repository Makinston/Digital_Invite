import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import LoveStory from "@/components/LoveStory";
import EventDetails from "@/components/EventDetails";
import Countdown from "@/components/Countdown";
import RSVP from "@/components/RSVP";
import GuestWall from "@/components/GuestWall";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
        <LoveStory />
        <EventDetails />
        <Countdown />
        <RSVP />
        <GuestWall />
        <Footer />
      </main>
    </>
  );
}
