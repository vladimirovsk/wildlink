import Image from "next/image";

const SCENARIOS = [
  {
    tag: "Family mode",
    title: "Green dots, not panic.",
    highlight: "Imagine your kids exploring a creek 400 meters away.",
    body: "You can't see them, but on WildLink, they are a steady green dot on your map. If they press SOS, your phone transforms into a rescue beacon.",
    detail:
      "Parents get instant audio and haptic alerts the moment a child wanders beyond 500m. No app required on the child's side, just the device clipped to their pack.",
    stat: { value: "500 m", label: "Guardian Alert threshold" },
    image: "/images/kananaskis-hike.jpg",
    alt: "Hikers on a Kananaskis trail, Alberta",
  },
  {
    tag: "Group mode",
    title: "Heavy fog? Stay together.",
    highlight: "Visibility drops to 5 meters on the Highwood Pass.",
    body: "Your GPS trail and group positions stay pinned on your offline map. No signal. No guessing. Everyone knows where everyone is.",
    detail:
      "The mesh relay means the hiker at the back can ping the leader at the front, even if there's a ridgeline between them and two people acting as relays.",
    stat: { value: "$0", label: "Monthly fees, ever" },
    image: "/images/kananaskis-panorama.jpg",
    alt: "Kananaskis mountain panorama, Alberta",
  },
  {
    tag: "Guardian Alert",
    title: "Hear it before you need to worry.",
    highlight: "The moment someone leaves the 500m radius, every group device fires.",
    body: "Audio chirp. Haptic buzz. A red alert on the map. Not a silent notification, a real alert, because the backcountry doesn't wait for you to check your phone.",
    detail:
      "Guardian Alert is configurable: 200m for kids in campsites, 800m for experienced groups on open terrain. No cell signal needed, it runs on the mesh.",
    stat: { value: "72 h", label: "Battery per device" },
    image: "/images/kananaskis-trail.jpg",
    alt: "Kananaskis hiking trail, Alberta",
  },
];

export default function UsageScenarios() {
  return (
    <section id="scenarios" className="bg-[#0a1810] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <h2 className="font-display text-5xl font-semibold leading-[0.98] tracking-tight text-alpine sm:text-6xl lg:text-7xl">
            Built for every way you use the wild.
          </h2>
          <p className="max-w-lg text-lg leading-relaxed text-alpine/70">
            From families at the lake to summit parties in the fog, WildLink keeps
            everyone on the same map.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {SCENARIOS.map((s) => (
            <article
              key={s.tag}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/12 bg-forest"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/10 to-transparent" />
                <span className="absolute bottom-3 left-4 rounded-full bg-forest/85 px-3 py-1 text-sm font-semibold text-alpine backdrop-blur">
                  {s.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight text-alpine">
                  {s.title}
                </h3>
                <p className="border-l-2 border-orange pl-4 font-medium leading-relaxed text-alpine/90">
                  {s.highlight}
                </p>
                <p className="leading-relaxed text-alpine/70">{s.body}</p>
                <p className="text-sm leading-relaxed text-alpine/60">{s.detail}</p>

                <div className="mt-auto flex items-end justify-between border-t border-white/12 pt-5">
                  <div>
                    <div className="font-display text-3xl font-semibold leading-none text-alpine">
                      {s.stat.value}
                    </div>
                    <div className="mt-1 text-sm text-alpine/60">{s.stat.label}</div>
                  </div>
                  <a
                    href="#waitlist"
                    className="text-sm font-semibold text-orange underline-offset-4 hover:underline"
                  >
                    Join the beta
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-14 max-w-2xl text-lg leading-relaxed text-alpine/65">
          WildLink works in{" "}
          <span className="font-semibold text-alpine">
            Banff, Jasper, Kananaskis, and anywhere else
          </span>{" "}
          the Canadian Rockies take you, including where your Garmin satellite
          subscription doesn&apos;t matter because you can&apos;t afford it.
        </p>
      </div>
    </section>
  );
}
