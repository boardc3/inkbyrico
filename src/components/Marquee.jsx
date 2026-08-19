import data from '../data/gallery.json'

const PICKS = ['w03', 'w39', 'w62', 'w15', 'w43', 'w51', 'w21', 'w12', 'w52', 'w66', 'w36', 'w71']

/** Endless horizontal ribbon of work that sits between the hero and the gallery. */
export default function Marquee() {
  const items = PICKS.map((id) => data.work.find((w) => w.id === id)).filter(Boolean)
  const loop = [...items, ...items]

  return (
    <section className="hairline overflow-hidden py-14" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-4 will-change-transform hover:[animation-play-state:paused]">
        {loop.map((item, i) => (
          <figure key={`${item.id}-${i}`} className="h-[clamp(150px,20vw,250px)] shrink-0">
            <img
              src={item.thumb}
              alt=""
              loading="lazy"
              className="h-full w-auto object-cover opacity-60 grayscale transition-all duration-700 hover:opacity-100 hover:grayscale-0"
            />
          </figure>
        ))}
      </div>
    </section>
  )
}
