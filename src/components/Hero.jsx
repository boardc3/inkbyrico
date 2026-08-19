import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { hero, artist } from '../data/site.js'
import data from '../data/gallery.json'

const EASE = [0.16, 1, 0.3, 1]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32">
      <div className="shell grid min-h-[calc(100svh-8rem)] grid-cols-1 items-end gap-12 pb-14 lg:grid-cols-12 lg:gap-10">
        {/* Type block */}
        <motion.div style={{ opacity: fade }} className="order-2 lg:order-1 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="eyebrow"
          >
            {hero.eyebrow}
          </motion.p>

          <h1 className="mt-7 font-display text-[clamp(4rem,15vw,13rem)] leading-[0.82] tracking-[-0.035em]">
            {hero.lines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className={`block ${line === hero.italicWord ? 'italic text-bone-dim' : ''}`}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.4, delay: 0.15 + i * 0.12, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: EASE }}
            className="mt-10 max-w-[46ch] text-[15px] leading-[1.75] text-bone-dim"
          >
            {hero.lede}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.85, ease: EASE }}
            className="mt-11 flex flex-wrap items-center gap-4"
          >
            <a href="#booking" className="btn-solid">Request a session</a>
            <a href="#work" className="btn">See the work</a>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <div className="order-1 lg:order-2 lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, delay: 0.1, ease: EASE }}
            className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-[3/4]"
          >
            <motion.img
              style={{ y: imgY }}
              src={data.studio['rico-working']}
              alt="Rick Coury tattooing in his Laguna Beach studio"
              className="absolute inset-0 h-[118%] w-full object-cover grayscale"
              fetchpriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Meta rail */}
      <motion.div style={{ opacity: fade }} className="shell absolute inset-x-0 bottom-0 pb-6">
        <div className="hairline flex flex-wrap items-center justify-between gap-x-10 gap-y-4 pt-5">
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {hero.meta.map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-2.5">
                <span className="font-sans text-[9px] uppercase tracking-mega text-bone-mute">{k}</span>
                <span className="font-sans text-[11px] uppercase tracking-wide2 text-bone-dim">{v}</span>
              </div>
            ))}
          </div>
          <a
            href="#work"
            className="flex items-center gap-3 font-sans text-[9px] uppercase tracking-mega text-bone-mute transition-colors hover:text-bone"
          >
            Scroll
            <ArrowDown size={13} strokeWidth={1.2} className="animate-bounce" />
          </a>
        </div>
      </motion.div>
      <span className="sr-only">{artist.name} — {artist.tagline}</span>
    </section>
  )
}
