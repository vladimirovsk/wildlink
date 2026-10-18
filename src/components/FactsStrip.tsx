const facts = [
  { value: "5 km", label: "Range in dense forest, field-validated" },
  { value: "72 h", label: "Battery life on a single charge" },
  { value: "< 3 sec", label: "Mesh message propagation latency" },
  { value: "$0 / mo", label: "No subscription, no recurring cost" },
];

export default function FactsStrip() {
  return (
    <section
      aria-label="Key specifications"
      className="bg-mist text-forest"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={`px-2 sm:px-6 ${
                i % 2 === 1 ? "border-l border-forest/15" : ""
              } ${i > 0 ? "lg:border-l lg:border-forest/15" : ""}`}
            >
              <dd className="font-display text-5xl font-semibold leading-none tracking-tight sm:text-6xl">
                {f.value}
              </dd>
              <dt className="mt-3 max-w-[16rem] text-base leading-snug text-forest/70">
                {f.label}
              </dt>
            </div>
          ))}
        </dl>
        <p className="mt-10 border-t border-forest/15 pt-5 text-sm text-forest/65">
          Built on Meshtastic, the open LoRa mesh standard. No cloud, no towers,
          no per-seat satellite fees.
        </p>
      </div>
    </section>
  );
}
