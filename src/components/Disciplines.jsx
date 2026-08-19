import Reveal, { SectionHead } from './Reveal.jsx'
import { disciplines } from '../data/site.js'

export default function Disciplines() {
  return (
    <section id="craft" className="shell py-24 sm:py-32">
      <SectionHead eyebrow="The Craft" title="Four things" italic="done well." />

      <div className="mt-16 grid grid-cols-1 gap-px bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
        {disciplines.map((d, i) => (
          <Reveal key={d.n} delay={i * 0.08} className="bg-ink">
            <article className="group h-full p-8 transition-colors duration-700 hover:bg-ink-800 lg:p-10">
              <span className="font-sans text-[10px] tracking-mega text-bone-mute">{d.n}</span>
              <h3 className="mt-8 font-display text-[1.9rem] leading-tight tracking-[-0.01em]">
                {d.title}
              </h3>
              <p className="mt-5 text-[14px] leading-[1.8] text-bone-dim">{d.body}</p>
              <span className="mt-8 block h-px w-10 bg-bone/25 transition-all duration-700 group-hover:w-full group-hover:bg-sand/60" />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
