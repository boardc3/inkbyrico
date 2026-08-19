import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Reveal, { SectionHead } from './Reveal.jsx'
import { about } from '../data/site.js'
import data from '../data/gallery.json'

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['-4%', '8%'])

  return (
    <section id="artist" ref={ref} className="scroll-mt-24 border-y border-bone/10 bg-ink-900 py-24 sm:py-32">
      <div className="shell">
        <SectionHead eyebrow={about.eyebrow} title="A Laguna kid who" italic="never stopped drawing." />

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-6 lg:pr-8">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="mb-6 text-[15px] leading-[1.85] text-bone-dim">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.15}>
              <blockquote className="mt-12 border-l border-sand/50 pl-7">
                <p className="font-display text-[clamp(1.8rem,3.6vw,2.9rem)] italic leading-[1.15] text-bone">
                  “{about.pullQuote}”
                </p>
                <cite className="mt-5 block font-sans text-[10px] uppercase not-italic tracking-mega text-bone-mute">
                  Rick Coury
                </cite>
              </blockquote>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-14 grid grid-cols-1 gap-px bg-bone/10 sm:grid-cols-2">
                {about.facts.map(([k, v]) => (
                  <div key={k} className="bg-ink-900 py-5 pr-5">
                    <dt className="font-sans text-[9px] uppercase tracking-mega text-bone-mute">{k}</dt>
                    <dd className="mt-2 text-[14px] text-bone-dim">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Image collage */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-6 lg:gap-5">
            <motion.div style={{ y: y1 }} className="space-y-4 lg:space-y-5">
              <img src={data.studio['rico-portrait']} alt="Rick Coury outside the studio" loading="lazy"
                   className="w-full object-cover grayscale" />
              <img src={data.studio['rico-skim']} alt="Rico skimboarding at sunset in Laguna Beach" loading="lazy"
                   className="aspect-[3/4] w-full object-cover grayscale" />
            </motion.div>
            <motion.div style={{ y: y2 }} className="space-y-4 pt-10 lg:space-y-5 lg:pt-16">
              <img src={data.studio['rico-session']} alt="Rico mid-session" loading="lazy"
                   className="aspect-[4/5] w-full object-cover grayscale" />
              <img src={data.studio['rico-hat']} alt="Rick Coury" loading="lazy"
                   className="aspect-[3/4] w-full object-cover grayscale" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
