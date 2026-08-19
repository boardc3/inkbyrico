import Reveal, { SectionHead } from './Reveal.jsx'
import { press } from '../data/site.js'

export default function Press() {
  return (
    <section id="press" className="shell scroll-mt-24 py-24 sm:py-32">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow={press.eyebrow} title="The work" italic="travels." />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[40ch] text-[15px] leading-[1.8] text-bone-dim">{press.intro}</p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul className="divide-y divide-bone/10 border-y border-bone/10">
            {press.clients.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.07}>
                <li className="group flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <span className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-none transition-colors duration-500 group-hover:text-sand">
                    {c.name}
                  </span>
                  <span className="font-sans text-[11px] uppercase tracking-wide2 text-bone-mute">
                    {c.note}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <p className="mt-7 max-w-[62ch] text-[11px] leading-[1.7] text-bone-mute">
              {press.citation}{' '}
              <a
                href={press.citationUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="link-wipe text-bone-dim"
              >
                Read it
              </a>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
