import Reveal, { SectionHead } from './Reveal.jsx'
import { location, artist } from '../data/site.js'
import data from '../data/gallery.json'

export default function Location() {
  return (
    <section id="location" className="scroll-mt-24 py-24 sm:py-32">
      <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow={location.eyebrow} title="Laguna" italic="Beach." />

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[42ch] text-[15px] leading-[1.8] text-bone-dim">{location.body}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-12 space-y-6">
              <div>
                <dt className="eyebrow">Studio</dt>
                <dd className="mt-2 font-display text-2xl">{artist.studio}</dd>
              </div>
              <div>
                <dt className="eyebrow">Booking</dt>
                <dd className="mt-2 text-[15px] text-bone-dim">
                  <a href={`mailto:${artist.email}`} target="_blank" rel="noopener noreferrer" className="link-wipe">{artist.email}</a>
                  <span className="mx-3 text-bone-mute">/</span>
                  <a href={artist.instagram} target="_blank" rel="noreferrer noopener" className="link-wipe">
                    {artist.instagramHandle}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-10 max-w-[46ch] border-l border-bone/15 pl-5 text-[12px] leading-[1.7] text-bone-mute">
              {location.note}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <img
              src={data.studio['rico-beach']}
              alt="Laguna Beach coastline"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover grayscale"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10">
              <p className="eyebrow">Clients travel from</p>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                {location.serves.map((s) => (
                  <li key={s} className="font-display text-[1.45rem] text-bone-dim">{s}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
