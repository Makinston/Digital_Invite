import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { WEDDING } from "@/lib/constants";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import LoveStory from "@/components/LoveStory";
import EventDetails from "@/components/EventDetails";
import Countdown from "@/components/Countdown";
import RSVP from "@/components/RSVP";
import GuestWall from "@/components/GuestWall";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ token: string }>;
}

async function getGuest(token: string) {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data } = await supabase
    .from("guests")
    .select("name, token")
    .eq("token", token)
    .single();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const guest = await getGuest(token);
  if (!guest) {
    return {
      title: `${WEDDING.coupleDisplay} — ${WEDDING.date}`,
    };
  }
  return {
    title: `${guest.name}, you're invited! — ${WEDDING.coupleDisplay}`,
    description: `${guest.name}, Feyisayo & Olawale invite you to celebrate their wedding on ${WEDDING.date}.`,
  };
}

export default async function InvitePage({ params }: Props) {
  const { token } = await params;
  const guest = await getGuest(token);

  // If Supabase is configured but token not found, show 404
  if (isSupabaseConfigured && !guest) {
    notFound();
  }

  const guestName = guest?.name;

  return (
    <>
      <Preloader />
      <main>
        <Hero guestName={guestName} />
        <LoveStory />
        <EventDetails />
        <Countdown />
        <RSVP guestName={guestName} guestToken={token} />
        <GuestWall />
        <Footer />
      </main>
    </>
  );
}
