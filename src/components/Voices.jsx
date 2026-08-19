import Reveal, { SectionHead } from './Reveal.jsx'
import { voices } from '../data/site.js'

export default function Voices() {
  return (
    <section className="border-y border-bone/10 bg-ink-900 py-24 sm:py-32">
      <div className="shell">
        <SectionHead eyebrow={voices.eyebrow} title={voices.heading} italic={voices.headingItalic} />

        <div className="mt-16 grid grid-cols-1 gap-px bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
          {voices.quotes.map((q, i) => (
            <Reveal key={q.by} delay={i * 0.06} className="bg-ink-900">
              <figure className="flex h-full flex-col justify-between p-8 lg:p-10">
                <blockquote className="font-display text-[1.55rem] leading-[1.28] text-bone">
                  “{q.text}”
                </blockquote>
                <figcaption className="mt-8 font-sans text-[10px] uppercase tracking-wide2 text-bone-mute">
                  {q.by}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 font-sans text-[10px] uppercase tracking-wide2 text-bone-mute">{voices.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
