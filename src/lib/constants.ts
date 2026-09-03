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
   * ⚠️ Drafted from general knowledge of Lagos geography (Ikola is in
   * Alimosho LGA, off the Lagos–Abeokuta Expressway near Ipaja/Ile-Epo).
   * NOT verified turn-by-turn — please review and correct before this goes
   * live so guests aren't sent the wrong way.
   */
  directions: [
    {
      from: "Lekki / Victoria Island",
      route:
        "Take the Lekki–Ikoyi Link Bridge or Ozumba Mbadiwe to the Third Mainland Bridge, continue to Oworonshoki, then the Apapa–Oshodi Expressway to Oshodi. From Oshodi, join the Lagos–Abeokuta Expressway heading toward Iyana-Ipaja, then Ile-Epo, and Ikola. Budget 1.5–2 hours depending on traffic.",
    },
    {
      from: "Ikeja / Airport (MMIA)",
      route:
        "From Ikeja, head to Iyana-Ipaja and join the Lagos–Abeokuta Expressway heading toward Abule-Egba. Continue past Ile-Epo to Ikola. About 30–45 minutes.",
    },
    {
      from: "Mainland (Yaba / Surulere)",
      route:
        "Take Funsho Williams Avenue or Western Avenue to Oshodi, then the Lagos–Abeokuta Expressway toward Iyana-Ipaja and Ile-Epo, continuing to Ikola. About 45–60 minutes.",
    },
    {
      from: "Ajah / Sangotedo (Lekki-Epe axis)",
      route:
        "Follow the Lekki-Epe Expressway toward Ajah, then continue via the Lekki-Ikoyi Link Bridge/Ozumba Mbadiwe to the Third Mainland Bridge, then follow the same route as from Lekki above. This is a longer drive — allow 2+ hours.",
    },
    {
      from: "Alimosho / Ipaja / Egbeda (local)",
      route:
        "You're closest to the venue — head to the Lagos–Abeokuta Expressway toward Ile-Epo, then Ikola. Under 20 minutes from most of Alimosho.",
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
