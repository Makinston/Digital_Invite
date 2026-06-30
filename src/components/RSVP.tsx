"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { KenteDivider } from "./AfricanPattern";
import { WEDDING } from "@/lib/constants";

type Step =
  | "attending"
  | "name"
  | "whatsapp"
  | "plusOne"
  | "message"
  | "submitting"
  | "confirmed"
  | "declined";

interface RSVPState {
  attending?: boolean;
  name?: string;
  whatsapp?: string;
  plusOne?: boolean;
  message?: string;
}

function ChatBubble({
  text,
  fromCouple,
}: {
  text: string;
  fromCouple?: boolean;
}) {
  return (
    <motion.div
      className={`flex ${fromCouple ? "justify-start" : "justify-end"} mb-4`}
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
    >
      {fromCouple && (
        <div className="w-7 h-7 rounded-full border border-gold/30 flex items-center justify-center font-display text-gold/60 text-xs mr-2 shrink-0 mt-1">
          F&O
        </div>
      )}
      <div
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm font-body leading-relaxed ${
          fromCouple
            ? "bg-charcoal/60 text-offwhite/80 rounded-tl-sm"
            : "bg-gold/90 text-deep rounded-tr-sm font-medium"
        }`}
      >
        {text}
      </div>
    </motion.div>
  );
}

function Btn({
  label,
  onClick,
  delay = 0,
  full = false,
}: {
  label: string;
  onClick: () => void;
  delay?: number;
  full?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`border border-gold/40 text-gold/80 hover:border-gold hover:text-gold hover:bg-gold/5 font-body text-sm px-5 py-2.5 transition-all duration-200 rounded-sm ${full ? "w-full" : ""}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
    </motion.button>
  );
}

export default function RSVP({
  guestName,
  guestToken,
}: {
  guestName?: string;
  guestToken?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });
  const scrollRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<Step>("attending");
  const [rsvp, setRsvp] = useState<RSVPState>({ name: guestName });
  const [nameInput, setNameInput] = useState(guestName ?? "");
  const [whatsappInput, setWhatsappInput] = useState("");
  const [msgInput, setMsgInput] = useState("");

  const [messages, setMessages] = useState<{ text: string; fromCouple: boolean }[]>([
    {
      text: guestName
        ? `Hi ${guestName}! 🎉 Feyisayo & Olawale would love to have you celebrate with them on ${WEDDING.date}. Will you be attending?`
        : `Hello! 🎉 Feyisayo & Olawale would love to have you celebrate with them on ${WEDDING.date}. Will you be attending?`,
      fromCouple: true,
    },
  ]);

  const push = (text: string, fromCouple: boolean) =>
    setMessages((m) => [...m, { text, fromCouple }]);

  const scrollBottom = () =>
    setTimeout(
      () => scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" }),
      120
    );

  const next = (coupleMsg: string, nextStep: Step) => {
    setTimeout(() => {
      push(coupleMsg, true);
      setStep(nextStep);
      scrollBottom();
    }, 650);
  };

  /* ── Handlers ── */
  const handleAttending = (yes: boolean) => {
    push(yes ? "Yes, I'll be there! 🙌" : "I'll be there in spirit 💛", false);
    setRsvp((r) => ({ ...r, attending: yes }));
    next("Wonderful! What's your full name?", "name");
  };

  const handleName = () => {
    const name = nameInput.trim();
    if (!name) return;
    push(name, false);
    setRsvp((r) => ({ ...r, name }));
    next("And your WhatsApp number? (so we can reach you)", "whatsapp");
  };

  const handleWhatsapp = () => {
    const wa = whatsappInput.trim();
    if (!wa) return;
    push(wa, false);
    setRsvp((r) => ({ ...r, whatsapp: wa }));
    if (rsvp.attending) {
      next("Great! Will you be bringing a plus-one?", "plusOne");
    } else {
      next("Would you like to leave a message for the couple? (Optional)", "message");
    }
  };

  const handlePlusOne = (yes: boolean) => {
    push(yes ? "Yes, bringing a +1! ❤️" : "Just me!", false);
    setRsvp((r) => ({ ...r, plusOne: yes }));
    next("Would you like to leave a message for the couple? (Optional)", "message");
  };

  const handleMessage = (skip: boolean) => {
    const msg = msgInput.trim();
    if (!skip && msg) {
      push(msg, false);
      setRsvp((r) => ({ ...r, message: msg }));
    } else if (skip) {
      push("No message, but sending love! 💛", false);
    }
    setStep("submitting");
    const final = { ...rsvp, message: skip ? undefined : msg };
    submitRSVP(final);
    scrollBottom();
  };

  const submitRSVP = async (final: RSVPState) => {
    try {
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...final, guestToken }),
      });
    } catch {
      /* silent */
    }
    setTimeout(() => {
      if (final.attending) {
        push(
          `You're on the list, ${final.name ?? "friend"}! 🎊 We can't wait to see you on ${WEDDING.date}. See you there!`,
          true
        );
        setStep("confirmed");
      } else {
        push(
          `Thank you, ${final.name ?? "friend"}. We'll miss you, but we appreciate your love and well wishes. 💛`,
          true
        );
        setStep("declined");
      }
      scrollBottom();
    }, 1100);
  };

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="bg-offwhite py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[0.65rem] tracking-[0.45em] uppercase text-muted mb-4">
            RSVP before {WEDDING.rsvpDeadline}
          </p>
          <h2 className="font-script text-[clamp(2.5rem,6vw,4rem)] text-charcoal">
            Will You Be There?
          </h2>
          <div className="mt-6 max-w-xs mx-auto">
            <KenteDivider />
          </div>
        </motion.div>

        {/* Chat window */}
        <motion.div
          className="border border-gold/20 bg-deep/3 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Header bar */}
          <div className="border-b border-gold/10 px-5 py-4 flex items-center gap-3 bg-charcoal/5">
            <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center font-display text-gold/70 text-sm shrink-0">
              F&O
            </div>
            <div>
              <p className="font-body text-xs text-charcoal font-medium">
                Feyisayo &amp; Olawale
              </p>
              <p className="font-body text-[0.6rem] text-muted">
                Your wedding hosts
              </p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="p-5 h-64 sm:h-72 overflow-y-auto flex flex-col">
            {messages.map((m, i) => (
              <ChatBubble key={i} text={m.text} fromCouple={m.fromCouple} />
            ))}
          </div>

          {/* Input area */}
          <div className="border-t border-gold/10 p-4 sm:p-5 bg-charcoal/2">
            <AnimatePresence mode="wait">
              {step === "attending" && (
                <motion.div key="attending" className="flex gap-3 flex-wrap"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Btn label="Yes, I'll be there! 🙌" onClick={() => handleAttending(true)} delay={0.1} />
                  <Btn label="I'll be there in spirit" onClick={() => handleAttending(false)} delay={0.2} />
                </motion.div>
              )}

              {step === "name" && (
                <motion.div key="name" className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleName()}
                    placeholder="Your full name"
                    className="flex-1 bg-transparent border border-gold/20 rounded px-3 py-2.5 text-sm font-body text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold/50"
                    autoFocus
                  />
                  <button onClick={handleName}
                    className="border border-gold/40 text-gold/80 hover:border-gold hover:text-gold px-5 py-2.5 font-body text-sm transition-all rounded-sm sm:w-auto w-full">
                    Send
                  </button>
                </motion.div>
              )}

              {step === "whatsapp" && (
                <motion.div key="whatsapp" className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <input
                    type="tel"
                    value={whatsappInput}
                    onChange={(e) => setWhatsappInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleWhatsapp()}
                    placeholder="e.g. 08012345678"
                    className="flex-1 bg-transparent border border-gold/20 rounded px-3 py-2.5 text-sm font-body text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold/50"
                    autoFocus
                  />
                  <button onClick={handleWhatsapp}
                    className="border border-gold/40 text-gold/80 hover:border-gold hover:text-gold px-5 py-2.5 font-body text-sm transition-all rounded-sm sm:w-auto w-full">
                    Send
                  </button>
                </motion.div>
              )}

              {step === "plusOne" && (
                <motion.div key="plusOne" className="flex gap-3 flex-wrap"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Btn label="Yes, bringing a +1 ❤️" onClick={() => handlePlusOne(true)} delay={0.1} />
                  <Btn label="Just me!" onClick={() => handlePlusOne(false)} delay={0.2} />
                </motion.div>
              )}

              {step === "message" && (
                <motion.div key="message" className="space-y-3"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <textarea
                    value={msgInput}
                    onChange={(e) => setMsgInput(e.target.value)}
                    placeholder="Write them a little something... 💛"
                    className="w-full bg-transparent border border-gold/20 rounded p-3 text-sm font-body text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold/50 resize-none h-20"
                  />
                  <div className="flex gap-3">
                    <Btn label="Send message" onClick={() => handleMessage(false)} />
                    <Btn label="Skip" onClick={() => handleMessage(true)} />
                  </div>
                </motion.div>
              )}

              {step === "submitting" && (
                <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <motion.span className="font-body text-xs tracking-[0.3em] text-gold/50"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.2, repeat: Infinity }}>
                    Sending your response...
                  </motion.span>
                </motion.div>
              )}

              {(step === "confirmed" || step === "declined") && (
                <motion.div key="done" className="text-center py-2"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="font-body text-xs text-muted tracking-[0.2em] uppercase">
                    {step === "confirmed" ? "🎊 You're on the list!" : "💛 Response received"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
