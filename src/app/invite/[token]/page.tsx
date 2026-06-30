import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { WEDDING } from "@/lib/constants";
import Preloader from "@/components/Preloader";
import AudioPlayer from "@/components/AudioPlayer";
import Hero from "@/components/Hero";
import InviteSection from "@/components/InviteSection";
import LoveStory from "@/components/LoveStory";
import Toasts from "@/components/Toasts";
import Countdown from "@/components/Countdown";
import DayProgram from "@/components/DayProgram";
import DressCode from "@/components/DressCode";
import Gifts from "@/components/Gifts";
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
  if (!guest) return { title: `${WEDDING.coupleDisplay} — ${WEDDING.date}` };
  return {
    title: `${guest.name}, you're invited! — ${WEDDING.coupleDisplay}`,
    description: `${guest.name}, join Feyisayo & Olawale on ${WEDDING.date}.`,
  };
}

export default async function InvitePage({ params }: Props) {
  const { token } = await params;
  const guest = await getGuest(token);
  if (isSupabaseConfigured && !guest) notFound();

  return (
    <>
      <Preloader />
      <AudioPlayer />
      <main>
        <Hero guestName={guest?.name} />
        <InviteSection />
        <LoveStory />
        <Toasts />
        <Countdown />
        <DayProgram />
        <DressCode />
        <Gifts />
        <RSVP guestName={guest?.name} guestToken={token} />
        <GuestWall />
        <Footer />
      </main>
    </>
  );
}
