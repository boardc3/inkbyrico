import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Reveal, { SectionHead } from './Reveal.jsx'
import { faqs } from '../data/site.js'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="scroll-mt-24 border-t border-bone/10 bg-ink-900 py-24 sm:py-32">
      <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHead eyebrow="Questions" title="Before you" italic="book." />
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-bone/10">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <Reveal key={f.q} delay={i * 0.04}>
                  <li className="border-b border-bone/10">
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-start justify-between gap-8 py-7 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="max-w-[38ch] font-display text-[1.5rem] leading-snug">{f.q}</span>
                      <Plus
                        size={19}
                        strokeWidth={1.2}
                        className={`mt-1 shrink-0 text-bone-mute transition-transform duration-500 ${
                          isOpen ? 'rotate-45 text-bone' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[68ch] pb-8 pr-10 text-[14px] leading-[1.85] text-bone-dim">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
