"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { KenteDivider } from "./AfricanPattern";
import { WEDDING } from "@/lib/constants";

type Step =
  | "greeting"
  | "attending"
  | "plusOne"
  | "dietary"
  | "message"
  | "name"
  | "submitting"
  | "confirmed"
  | "declined";

interface RSVPState {
  attending?: boolean;
  plusOne?: boolean;
  dietary?: string;
  message?: string;
  name?: string;
}

function ChatBubble({
  text,
  fromCouple,
  delay = 0,
}: {
  text: string;
  fromCouple?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      className={`flex ${fromCouple ? "justify-start" : "justify-end"} mb-4`}
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      {fromCouple && (
        <div className="w-7 h-7 rounded-full border border-gold/30 flex items-center justify-center font-display text-gold/60 text-xs mr-2 flex-shrink-0 mt-1">
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

function OptionButton({
  label,
  onClick,
  delay = 0,
}: {
  label: string;
  onClick: () => void;
  delay?: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="border border-gold/40 text-gold/80 hover:border-gold hover:text-gold hover:bg-gold/5 font-body text-sm px-6 py-3 transition-all duration-200 rounded-sm"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
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

  const [step, setStep] = useState<Step>("greeting");
  const [rsvp, setRsvp] = useState<RSVPState>({
    name: guestName,
  });
  const [nameInput, setNameInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<
    { text: string; fromCouple: boolean }[]
  >([
    {
      text: guestName
        ? `Hi ${guestName}! 🎉 Feyisayo & Olawale would love to have you at their celebration on ${WEDDING.date}. Will you be joining us?`
        : `Hello there! 🎉 Feyisayo & Olawale would love to have you at their celebration on ${WEDDING.date}. Will you be joining us?`,
      fromCouple: true,
    },
  ]);

  const addCouple = (text: string) =>
    setMessages((m) => [...m, { text, fromCouple: true }]);
  const addGuest = (text: string) =>
    setMessages((m) => [...m, { text, fromCouple: false }]);

  const scrollToBottom = () => {
    setTimeout(
      () => scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" }),
      100
    );
  };

  const handleYes = () => {
    addGuest("Yes, I'll be there! 🙌");
    setRsvp((r) => ({ ...r, attending: true }));
    setTimeout(() => {
      addCouple("Amazing! We're so excited. Will you be bringing a plus-one?");
      setStep("plusOne");
      scrollToBottom();
    }, 600);
  };

  const handleNo = () => {
    addGuest("I'll be there in spirit, wishing you both the best! 💛");
    setRsvp((r) => ({ ...r, attending: false }));
    setTimeout(() => {
      addCouple(
        "We'll miss you, but we understand. Thank you for your love and well wishes. 🙏"
      );
      if (!guestName) {
        setTimeout(() => {
          addCouple("May we have your name so we can send our gratitude?");
          setStep("name");
          scrollToBottom();
        }, 800);
      } else {
        setStep("submitting");
        submitRSVP({ ...rsvp, attending: false });
      }
      scrollToBottom();
    }, 600);
  };

  const handlePlusOne = (has: boolean) => {
    addGuest(has ? "Yes, bringing my +1!" : "Just me!");
    setRsvp((r) => ({ ...r, plusOne: has }));
    setTimeout(() => {
      addCouple("Perfect! Any dietary preferences we should know about?");
      setStep("dietary");
      scrollToBottom();
    }, 600);
  };

  const handleDietary = (pref: string) => {
    addGuest(pref === "None" ? "No restrictions, I eat everything! 😄" : pref);
    setRsvp((r) => ({ ...r, dietary: pref }));
    setTimeout(() => {
      addCouple(
        "Wonderful! Would you like to leave a little message for the couple? (Optional)"
      );
      setStep("message");
      scrollToBottom();
    }, 600);
  };

  const handleMessage = (skip: boolean) => {
    if (!skip && messageInput.trim()) {
      addGuest(messageInput.trim());
      setRsvp((r) => ({ ...r, message: messageInput.trim() }));
    } else {
      addGuest("No message, but sending all my love! 💛");
    }
    if (!guestName) {
      setTimeout(() => {
        addCouple("One last thing — may we have your name?");
        setStep("name");
        scrollToBottom();
      }, 600);
    } else {
      setTimeout(() => {
        setStep("submitting");
        submitRSVP({ ...rsvp, message: skip ? undefined : messageInput.trim() });
        scrollToBottom();
      }, 600);
    }
  };

  const handleName = () => {
    const name = nameInput.trim();
    if (!name) return;
    addGuest(name);
    setRsvp((r) => ({ ...r, name }));
    setTimeout(() => {
      setStep("submitting");
      submitRSVP({ ...rsvp, name });
      scrollToBottom();
    }, 600);
  };

  const submitRSVP = async (finalRsvp: RSVPState) => {
    try {
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...finalRsvp, guestToken }),
      });
    } catch {
      // Silent — we still show success
    }
    setTimeout(() => {
      if (finalRsvp.attending) {
        addCouple(
          `Your spot is saved, ${finalRsvp.name ?? guestName ?? "dear friend"}! We can't wait to celebrate with you on ${WEDDING.date}. See you there! 🎊`
        );
        setStep("confirmed");
      } else {
        addCouple(
          `Thank you, ${finalRsvp.name ?? guestName ?? "dear friend"}. We'll be thinking of you. 💛`
        );
        setStep("declined");
      }
      scrollToBottom();
    }, 1000);
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
            Let us know
          </p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] text-charcoal font-light">
            Will You Be There?
          </h2>
          <div className="mt-6 max-w-xs mx-auto">
            <KenteDivider />
          </div>
        </motion.div>

        {/* Chat window */}
        <motion.div
          className="border border-gold/20 bg-deep/[0.03] rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Chat header */}
          <div className="border-b border-gold/10 px-5 py-4 flex items-center gap-3 bg-charcoal/5">
            <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center font-display text-gold/70 text-sm">
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
          <div
            ref={scrollRef}
            className="p-5 h-72 overflow-y-auto flex flex-col"
          >
            {messages.map((m, i) => (
              <ChatBubble
                key={i}
                text={m.text}
                fromCouple={m.fromCouple}
                delay={0}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="border-t border-gold/10 p-5 bg-charcoal/[0.02]">
            <AnimatePresence mode="wait">
              {step === "greeting" && (
                <motion.div
                  key="greeting"
                  className="flex gap-3 flex-wrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <OptionButton label="Yes, I'll be there! 🙌" onClick={handleYes} delay={0.1} />
                  <OptionButton label="I'll be there in spirit" onClick={handleNo} delay={0.2} />
                </motion.div>
              )}

              {step === "plusOne" && (
                <motion.div
                  key="plusOne"
                  className="flex gap-3 flex-wrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <OptionButton label="Just me!" onClick={() => handlePlusOne(false)} delay={0.1} />
                  <OptionButton label="Coming with a +1 ❤️" onClick={() => handlePlusOne(true)} delay={0.2} />
                </motion.div>
              )}

              {step === "dietary" && (
                <motion.div
                  key="dietary"
                  className="flex gap-3 flex-wrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {["None", "Vegetarian", "Halal", "Other"].map((d, i) => (
                    <OptionButton key={d} label={d} onClick={() => handleDietary(d)} delay={i * 0.08} />
                  ))}
                </motion.div>
              )}

              {step === "message" && (
                <motion.div
                  key="message"
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Write them a little something... 💛"
                    className="w-full bg-transparent border border-gold/20 rounded p-3 text-sm font-body text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold/50 resize-none h-20"
                  />
                  <div className="flex gap-3">
                    <OptionButton label="Send message" onClick={() => handleMessage(false)} />
                    <OptionButton label="Skip" onClick={() => handleMessage(true)} />
                  </div>
                </motion.div>
              )}

              {step === "name" && (
                <motion.div
                  key="name"
                  className="flex gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleName()}
                    placeholder="Your full name"
                    className="flex-1 bg-transparent border border-gold/20 rounded px-3 py-2 text-sm font-body text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold/50"
                    autoFocus
                  />
                  <button
                    onClick={handleName}
                    className="border border-gold/40 text-gold/80 hover:border-gold hover:text-gold px-5 py-2 font-body text-sm transition-all duration-200 rounded-sm"
                  >
                    Send
                  </button>
                </motion.div>
              )}

              {step === "submitting" && (
                <motion.div
                  key="submitting"
                  className="flex items-center gap-2 text-gold/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.span
                    className="font-body text-xs tracking-[0.3em]"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    Sending your response...
                  </motion.span>
                </motion.div>
              )}

              {(step === "confirmed" || step === "declined") && (
                <motion.div
                  key="done"
                  className="text-center py-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="font-body text-xs text-muted tracking-[0.2em] uppercase">
                    {step === "confirmed"
                      ? "🎊 You're on the list!"
                      : "💛 Response received"}
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
