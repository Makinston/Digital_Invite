export const WEDDING = {
  bride: "Feyisayo",
  groom: "Olawale",
  brideFull: "Feyisayo Olasoju",
  coupleDisplay: "Feyisayo & Olawale",
  date: "26 September 2026",
  dateISO: "2026-09-26T08:00:00",
  hashtag: "#FromDmToForever",
  rsvpDeadline: "September 5, 2026",
  venue: {
    name: "Erly Moon Event Place",
    area: "Ikola, Lagos",
    mapUrl: "https://maps.google.com/?q=Ikola+Lagos",
  },
  dayProgram: [
    { time: "8:00 AM", event: "Church Service" },
    { time: "10:00 AM", event: "Guest Arrival" },
    { time: "11:00 AM", event: "Engagement" },
    { time: "12:00 PM", event: "Reception" },
  ],
  howWeMet: {
    heading: "How We Met",
    paragraphs: [
      "We met on WhatsApp through a mutual group that we both later left. Although we had never spoken, we somehow ended up saving each other's numbers.",
      "Our first conversation began on October 11, 2022, when I saw her WhatsApp status that read, \"Happy Birthday to me.\" I simply wished her a happy birthday and that was it.",
      "Exactly one month later, I came across another of her statuses — this time, she had posted a photo of herself for the very first time. Curious, I asked, \"Is this you?\" She replied, \"Yes.\" That simple conversation became the beginning of our beautiful journey together.",
    ],
  },
  toasts: [
    {
      from: "Olawale",
      to: "Feyisayo",
      text: "I'm forever grateful that our paths crossed and that God made you my better half, my companion, my wife, and the future mother of our beautiful children. You are adorable, kind, selfless, patient, and, above all, my biggest fan.\n\nAs we begin this journey of forever together, I want you to know that I will always have your best interests at heart. I promise to love, cherish, support, and stand by you through every season of life.",
      closing: "I love you always, Feyisayo, my Queen. ❤️",
    },
    {
      from: "Feyisayo",
      to: "Olawale",
      text: "Today, I stand here filled with gratitude. Thank you for choosing me, for loving me so intentionally, and for being the man I prayed for, even before I knew your name. As we begin this new chapter together, I promise to love you, support you, pray with you, and choose you every single day.",
      closing: "Here's to the unexpected message that started it all, to the love we've built together, and to a lifetime of beautiful memories still waiting to be written. I love you so much. Cheers to us! 🥂❤️",
    },
  ],
  /**
   * Researched from Ikola's confirmed road network (Ikola Road connects to
   * the Lagos–Abeokuta Expressway via Meiran/Kollington Bus Stop, Iyana-Ipaja,
   * or Egbeda Roundabout — Ikola sits in Alimosho LGA on the Ipaja/Ayobo axis).
   * Traffic-dependent estimates — the "Live Directions" button on each card
   * gives guests real-time Google Maps routing on top of this.
   */
  directions: [
    {
      from: "Egbeda, Ikotun, Idimu & Alimosho",
      note: "Local — you're closest to the venue",
      duration: "10–20 min",
      mapQuery: "Egbeda, Lagos",
      steps: [
        "Head for Egbeda Roundabout, or straight into the Ipaja/Ayobo axis.",
        "Join Ikola Road (via Egbeda–Idimu Road or Iyana-Ipaja).",
        "Follow Ikola Road straight to the venue.",
      ],
    },
    {
      from: "Agege & Abule-Egba",
      note: "",
      duration: "20–30 min",
      mapQuery: "Agege, Lagos",
      steps: [
        "Join the Lagos–Abeokuta Expressway at Pen Cinema, heading toward Abule-Egba.",
        "Continue to Meiran / Kollington Bus Stop.",
        "Branch onto Ikola Road and follow it to the venue.",
      ],
    },
    {
      from: "Ikeja, GRA & the Airport (MMIA)",
      note: "",
      duration: "25–40 min",
      mapQuery: "Ikeja, Lagos",
      steps: [
        "From Ikeja/the airport, head to Agege Motor Road toward Iyana-Ipaja.",
        "Join the Lagos–Abeokuta Expressway toward Abule-Egba.",
        "Continue past Iyana-Ipaja to Meiran / Kollington Bus Stop.",
        "Branch onto Ikola Road and follow it to the venue.",
      ],
    },
    {
      from: "Yaba, Ebute-Metta & the Mainland",
      note: "",
      duration: "40–55 min",
      mapQuery: "Yaba, Lagos",
      steps: [
        "From Sabo/Yaba, join Herbert Macaulay Way or Ikorodu Road toward Costain.",
        "Continue via the Apapa–Oshodi Expressway (or Agege Motor Road through Mushin) to Oshodi.",
        "At Oshodi, take the Oshodi–Abule-Egba Expressway heading north.",
        "Continue to Meiran / Iyana-Ipaja, then branch onto Ikola Road.",
      ],
    },
    {
      from: "Surulere",
      note: "",
      duration: "45–60 min",
      mapQuery: "Surulere, Lagos",
      steps: [
        "Join Funsho Williams Avenue (or Western Avenue) toward Costain/Ijora.",
        "Take the Apapa–Oshodi Expressway toward Oshodi.",
        "At Oshodi, join the Oshodi–Abule-Egba Expressway heading north.",
        "Continue to Meiran / Iyana-Ipaja, then branch onto Ikola Road.",
      ],
    },
    {
      from: "Gbagada, Ketu & Mile 12",
      note: "",
      duration: "50–70 min",
      mapQuery: "Gbagada, Lagos",
      steps: [
        "Join Ikorodu Road toward Anthony, then Oworonshoki.",
        "Take the Apapa–Oworonshoki Expressway toward Oshodi.",
        "At Oshodi, join the Oshodi–Abule-Egba Expressway heading north.",
        "Continue to Meiran / Iyana-Ipaja, then branch onto Ikola Road.",
      ],
    },
    {
      from: "Festac, Amuwo-Odofin & Apapa",
      note: "",
      duration: "50–70 min",
      mapQuery: "Festac Town, Lagos",
      steps: [
        "From Festac/Amuwo-Odofin, join the Apapa–Oshodi Expressway via Mile 2 (from Apapa, first head to Mile 2).",
        "Continue on the expressway to Oshodi.",
        "At Oshodi, join the Oshodi–Abule-Egba Expressway heading north.",
        "Continue past Abule-Egba to Meiran / Iyana-Ipaja, then branch onto Ikola Road.",
      ],
    },
    {
      from: "Ikorodu",
      note: "",
      duration: "1–1.5 hrs",
      mapQuery: "Ikorodu, Lagos",
      steps: [
        "Join Ikorodu Road toward Ketu/Ojota, then continue to Anthony and Oworonshoki.",
        "Take the Apapa–Oworonshoki Expressway toward Oshodi.",
        "At Oshodi, join the Oshodi–Abule-Egba Expressway heading north.",
        "Continue to Meiran / Iyana-Ipaja, then branch onto Ikola Road.",
      ],
    },
    {
      from: "Victoria Island, Ikoyi & Lekki Phase 1",
      note: "",
      duration: "1.5–2 hrs",
      mapQuery: "Victoria Island, Lagos",
      steps: [
        "Head to Ozumba Mbadiwe or the Lekki–Ikoyi Link Bridge, then join the Third Mainland Bridge.",
        "At Oworonshoki, continue on the Apapa–Oshodi Expressway toward Oshodi.",
        "At Oshodi, join the Oshodi–Abule-Egba Expressway heading north.",
        "Continue past Abule-Egba to Meiran / Iyana-Ipaja, then branch onto Ikola Road.",
      ],
    },
    {
      from: "Ajah, Sangotedo & the Lekki-Epe Axis",
      note: "",
      duration: "2–2.5 hrs",
      mapQuery: "Ajah, Lagos",
      steps: [
        "Join the Lekki-Epe Expressway toward Lekki Phase 1.",
        "Continue via Ozumba Mbadiwe or the Lekki–Ikoyi Link Bridge to the Third Mainland Bridge.",
        "From there, follow the same route as from Victoria Island (Oworonshoki → Oshodi → Oshodi–Abule-Egba Expressway → Meiran/Iyana-Ipaja → Ikola Road).",
      ],
    },
    {
      from: "Okokomaiko & Badagry",
      note: "",
      duration: "1.5–2 hrs",
      mapQuery: "Okokomaiko, Lagos",
      steps: [
        "Join the Lagos–Badagry Expressway heading toward Festac/Mile 2.",
        "Continue on the Apapa–Oshodi Expressway toward Oshodi.",
        "At Oshodi, join the Oshodi–Abule-Egba Expressway heading north to Meiran / Iyana-Ipaja.",
        "Branch onto Ikola Road and follow it to the venue.",
      ],
    },
  ],

  dressCode: "Contact a member of the family for your Asoebi",
  gifts: {
    message:
      "Your presence is all we could ask for. If you wish to send a token of love, it is greatly appreciated.",
    account: {
      name: "FEYISAYO OLASOJU",
      bank: "Palmpay",
      number: "7066139178",
    },
  },
} as const;
