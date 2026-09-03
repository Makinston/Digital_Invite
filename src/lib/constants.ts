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
   * Researched from Ikola's confirmed road/transit network:
   * - Driving: Ikola Road connects to the Lagos–Abeokuta Expressway via
   *   Meiran/Kollington Bus Stop, Iyana-Ipaja, or Egbeda Roundabout (Ikola
   *   sits in Alimosho LGA on the Ipaja/Ayobo axis). Traffic-dependent
   *   estimates — the "Get Live Directions" button gives real-time Google
   *   Maps routing on top of this.
   * - Transit: almost every part of Lagos funnels through Oshodi or
   *   Iyana-Ipaja/Ipaja/Command Bus Stop, then a keke napep/local bus the
   *   rest of the way to Ikola — sourced from public transport guides for
   *   the area (fares are commercial-bus estimates and fluctuate with
   *   traffic/fuel prices; confirm with the conductor before boarding).
   */
  directions: [
    {
      from: "Egbeda, Ikotun, Idimu & Alimosho",
      note: "Local — you're closest to the venue",
      driving: {
        duration: "10–20 min",
        mapQuery: "Egbeda, Lagos",
        summary: "Via Egbeda Roundabout or the Ipaja/Ayobo axis, straight onto Ikola Road.",
      },
      transit: {
        duration: "20–35 min",
        fare: "₦200 – ₦400",
        steps: [
          "From Egbeda Roundabout (or wherever you are locally), get a shared taxi or keke napep toward Ipaja/Ayobo.",
          "Ask to be dropped at Ipaja or Command Bus Stop.",
          "From there, take a keke napep or small bus calling \"Ikola!\" straight to the venue.",
        ],
      },
    },
    {
      from: "Agege & Abule-Egba",
      note: "",
      driving: {
        duration: "20–30 min",
        mapQuery: "Agege, Lagos",
        summary: "Lagos–Abeokuta Expressway at Pen Cinema toward Abule-Egba, then Meiran/Kollington onto Ikola Road.",
      },
      transit: {
        duration: "30–45 min",
        fare: "₦350 – ₦600",
        steps: [
          "Board a bus at Agege or Pen Cinema heading to \"Iyana-Ipaja\" or \"Abule-Egba.\"",
          "Get down at Iyana-Ipaja, Ipaja, or Command Bus Stop.",
          "Take a keke napep or small bus calling \"Ikola!\" the rest of the way.",
        ],
      },
    },
    {
      from: "Ikeja, GRA & the Airport (MMIA)",
      note: "",
      driving: {
        duration: "25–40 min",
        mapQuery: "Ikeja, Lagos",
        summary: "Agege Motor Road to the Lagos–Abeokuta Expressway, past Iyana-Ipaja to Meiran, then onto Ikola Road.",
      },
      transit: {
        duration: "1–1.5 hrs",
        fare: "₦650 – ₦1,100",
        steps: [
          "From Ikeja Under Bridge/Computer Village, board a bus marked \"Agege\" or \"Pen Cinema\" (~₦300–400).",
          "At Agege Market/Capitol Bus Stop, transfer to a bus heading to \"Iyana-Ipaja\" (~₦250–350).",
          "At Iyana-Ipaja, take a keke napep or small bus calling \"Ikola!\" to the venue (~₦150–300).",
        ],
      },
    },
    {
      from: "Yaba, Ebute-Metta & the Mainland",
      note: "",
      driving: {
        duration: "40–55 min",
        mapQuery: "Yaba, Lagos",
        summary: "Herbert Macaulay Way/Ikorodu Road to Oshodi, then the Oshodi–Abule-Egba Expressway to Meiran/Iyana-Ipaja and onto Ikola Road.",
      },
      transit: {
        duration: "1–1.25 hrs",
        fare: "₦600 – ₦1,000",
        steps: [
          "From Sabo/Yaba, board a bus to \"Oshodi.\"",
          "At Oshodi, transfer to a bus heading to \"Ipaja\" or \"Command\" (~₦400–600).",
          "From Ipaja/Command Bus Stop, take a keke napep calling \"Ikola!\" to the venue (~₦150–300).",
        ],
      },
    },
    {
      from: "Surulere",
      note: "",
      driving: {
        duration: "45–60 min",
        mapQuery: "Surulere, Lagos",
        summary: "Funsho Williams Avenue to Costain/Oshodi, then the Oshodi–Abule-Egba Expressway to Meiran/Iyana-Ipaja and onto Ikola Road.",
      },
      transit: {
        duration: "1–1.25 hrs",
        fare: "₦600 – ₦1,000",
        steps: [
          "From Surulere, board a bus toward \"Costain,\" then transfer toward \"Oshodi.\"",
          "At Oshodi, transfer to a bus heading to \"Ipaja\" or \"Command\" (~₦400–600).",
          "From Ipaja/Command Bus Stop, take a keke napep calling \"Ikola!\" to the venue (~₦150–300).",
        ],
      },
    },
    {
      from: "Gbagada, Ketu & Mile 12",
      note: "",
      driving: {
        duration: "50–70 min",
        mapQuery: "Gbagada, Lagos",
        summary: "Ikorodu Road to Oworonshoki, then the Apapa–Oshodi Expressway to Oshodi and on to Meiran/Iyana-Ipaja.",
      },
      transit: {
        duration: "1–1.5 hrs",
        fare: "₦700 – ₦1,100",
        steps: [
          "From Ketu/Ojota/Mile 12, board a BRT or bus toward \"Oshodi\" (~₦300–500).",
          "At Oshodi, transfer to a bus heading to \"Ipaja\" or \"Command\" (~₦400–600).",
          "From Ipaja/Command Bus Stop, take a keke napep calling \"Ikola!\" to the venue (~₦150–300).",
        ],
      },
    },
    {
      from: "Festac, Amuwo-Odofin & Apapa",
      note: "",
      driving: {
        duration: "50–70 min",
        mapQuery: "Festac Town, Lagos",
        summary: "Apapa–Oshodi Expressway via Mile 2 to Oshodi, then to Meiran/Iyana-Ipaja and onto Ikola Road.",
      },
      transit: {
        duration: "1–1.5 hrs",
        fare: "₦600 – ₦1,000",
        steps: [
          "From Festac/Amuwo-Odofin (or via Mile 2 first if coming from Apapa), board a bus to \"Oshodi.\"",
          "At Oshodi, transfer to a bus heading to \"Ipaja\" or \"Command\" (~₦400–600).",
          "From Ipaja/Command Bus Stop, take a keke napep calling \"Ikola!\" to the venue (~₦150–300).",
        ],
      },
    },
    {
      from: "Ikorodu",
      note: "",
      driving: {
        duration: "1–1.5 hrs",
        mapQuery: "Ikorodu, Lagos",
        summary: "Ikorodu Road through Ketu/Oworonshoki to Oshodi, then to Meiran/Iyana-Ipaja and onto Ikola Road.",
      },
      transit: {
        duration: "1.5–2 hrs",
        fare: "₦900 – ₦1,300",
        steps: [
          "Board the BRT at Ikorodu Garage heading to \"Oshodi\" (~₦680).",
          "At Oshodi, transfer to a bus heading to \"Ipaja\" or \"Command\" (~₦400–600).",
          "From Ipaja/Command Bus Stop, take a keke napep calling \"Ikola!\" to the venue (~₦150–300).",
        ],
      },
    },
    {
      from: "Victoria Island, Ikoyi & Lekki Phase 1",
      note: "",
      driving: {
        duration: "1.5–2 hrs",
        mapQuery: "Victoria Island, Lagos",
        summary: "Third Mainland Bridge to Oworonshoki, then the Apapa–Oshodi Expressway to Oshodi and on to Meiran/Iyana-Ipaja.",
      },
      transit: {
        duration: "1.5–2 hrs",
        fare: "₦1,250 – ₦1,800",
        steps: [
          "Go to CMS or Obalende Park and board a bus to \"Oshodi\" (~₦600–800).",
          "At Oshodi, transfer to a bus heading to \"Iyana-Ipaja\" or \"Abule-Egba\" (~₦500–700).",
          "From Iyana-Ipaja, take a keke napep calling \"Ikola!\" to the venue (~₦150–300).",
        ],
      },
    },
    {
      from: "Ajah, Sangotedo & the Lekki-Epe Axis",
      note: "The direct regulated bus makes this easier than it looks",
      driving: {
        duration: "2–2.5 hrs",
        mapQuery: "Ajah, Lagos",
        summary: "Lekki-Epe Expressway to the Third Mainland Bridge, then via Oworonshoki/Oshodi to Meiran/Iyana-Ipaja.",
      },
      transit: {
        duration: "1.25–1.75 hrs",
        fare: "~₦900 – ₦1,300",
        steps: [
          "At Ajah Terminal, board the regulated blue-and-white LAMATA bus signed \"Iyana-Ipaja\" — a direct route, no transfer at Oshodi needed (fare shown on board).",
          "Alight at Iyana-Ipaja Bus Stop.",
          "Take a keke napep or small bus calling \"Ikola!\" the rest of the way (~₦150–300).",
        ],
      },
    },
    {
      from: "Okokomaiko & Badagry",
      note: "",
      driving: {
        duration: "1.5–2 hrs",
        mapQuery: "Okokomaiko, Lagos",
        summary: "Lagos–Badagry Expressway toward Festac/Mile 2, then Oshodi and on to Meiran/Iyana-Ipaja.",
      },
      transit: {
        duration: "1.5–2 hrs",
        fare: "₦900 – ₦1,300",
        steps: [
          "Board the BRT or a bus toward \"Mile 2\" along the Lagos–Badagry Expressway (~₦510 by BRT from Okokomaiko).",
          "At Mile 2/Oshodi, transfer to a bus heading to \"Ipaja\" or \"Command\" (~₦400–600).",
          "From Ipaja/Command Bus Stop, take a keke napep calling \"Ikola!\" to the venue (~₦150–300).",
        ],
      },
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
