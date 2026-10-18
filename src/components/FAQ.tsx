import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How do I connect the device to my phone?",
    a: "Turn on the device, open wildlink.ca on your phone, tap Connect. WildLink is a PWA, so it works on any phone with no app store and no login.",
  },
  {
    q: "Do I need cell service?",
    a: "No. WildLink runs on a LoRa mesh network between the devices, so tracking, Guardian Alert and SOS work with no cell service at all.",
  },
  {
    q: "What does it cost?",
    a: "There is no subscription: $0 per month. The one-time device price will be announced at launch. Joining the beta needs no credit card, and beta members get 30% off at launch.",
  },
  {
    q: "Does my child need an app?",
    a: "No. There is no app on the child's side, just the device clipped to their pack. Parents get audio and haptic alerts the moment a child wanders beyond the Guardian Alert radius.",
  },
  {
    q: "Can I change the Guardian Alert distance?",
    a: "Yes. It defaults to 500 m and is configurable: 200 m for kids in campsites, 800 m for experienced groups on open terrain.",
  },
  {
    q: "What is Meshtastic?",
    a: "An open-source protocol that lets small, low-power radio devices form a self-organising network, without any cell towers, Wi-Fi, or satellites. Thousands of engineers worldwide contribute to it every day, making it more reliable with every update.",
  },
  {
    q: "Does every device become a relay?",
    a: "Yes. Every WildLink device in your group automatically acts as a relay for others. The more devices on the trail, the wider and stronger the coverage. You do not configure anything, the mesh self-organises.",
  },
  {
    q: "What happens if one device goes offline?",
    a: "The mesh detects the gap within seconds and routes around it. Unlike a cell tower, which causes a total blackout if it fails, losing one WildLink node simply changes the path, not the outcome.",
  },
  {
    q: "Is WildLink compatible with other Meshtastic devices?",
    a: "Yes. WildLink is built on the Meshtastic standard and can communicate with any compatible device on the same channel configuration. You are not locked into our hardware ecosystem.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-mist py-20 text-forest lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <div>
          <h2 className="font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl">
            Questions, answered.
          </h2>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-forest/75">
            Pairing, range, price and how the mesh works.
          </p>
          <a
            href="#waitlist"
            className="mt-6 inline-flex rounded-full bg-orange px-7 py-3.5 font-bold text-white transition-colors hover:bg-[#e05200]"
          >
            Join the beta
          </a>
        </div>

        <div className="divide-y divide-forest/15 border-y border-forest/15">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                {q}
                <Plus
                  size={20}
                  className="shrink-0 text-forest/60 transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-forest/75">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
