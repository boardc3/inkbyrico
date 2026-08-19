import Reveal, { SectionHead } from './Reveal.jsx'
import { process } from '../data/site.js'

export default function Process() {
  return (
    <section id="process" className="shell scroll-mt-24 py-24 sm:py-32">
      <SectionHead eyebrow="How It Works" title="From an idea" italic="to healed ink." />

      <ol className="mt-16 divide-y divide-bone/10 border-y border-bone/10">
        {process.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.07}>
            <li className="grid grid-cols-1 gap-4 py-10 md:grid-cols-12 md:gap-8">
              <span className="font-sans text-[10px] tracking-mega text-bone-mute md:col-span-1">{s.n}</span>
              <h3 className="font-display text-[1.9rem] leading-tight md:col-span-4">{s.title}</h3>
              <p className="max-w-[52ch] text-[14px] leading-[1.8] text-bone-dim md:col-span-7">{s.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
