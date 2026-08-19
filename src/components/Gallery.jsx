import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Reveal, { SectionHead } from './Reveal.jsx'
import data from '../data/gallery.json'

const FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'fineline', label: 'Fine Line' },
  { id: 'portraits', label: 'Portraits' },
  { id: 'nature', label: 'Nature' },
  { id: 'western', label: 'Western' },
  { id: 'ocean', label: 'Ocean' },
]

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [index, setIndex] = useState(null)

  const items = useMemo(
    () => (filter === 'all' ? data.work : data.work.filter((w) => w.tags.includes(filter))),
    [filter],
  )

  const close = useCallback(() => setIndex(null), [])
  const step = useCallback(
    (d) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  )

  useEffect(() => {
    if (index === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, close, step])

  const active = index === null ? null : items[index]

  return (
    <section id="work" className="shell scroll-mt-24 py-24 sm:py-32">
      <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
        <SectionHead eyebrow="Selected Work" title="Sixty-three" italic="pieces." />

        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-x-7 gap-y-3 lg:justify-end">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => { setFilter(f.id); setIndex(null) }}
                className={`font-sans text-[11px] uppercase tracking-wide2 transition-colors duration-300 ${
                  filter === f.id ? 'text-bone' : 'text-bone-mute hover:text-bone-dim'
                }`}
              >
                {f.label}
                <span
                  className={`mt-1.5 block h-px origin-left bg-sand transition-transform duration-500 ${
                    filter === f.id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Masonry via CSS columns keeps the native aspect ratios intact. */}
      <motion.div layout className="mt-16 columns-2 gap-3 sm:gap-4 md:columns-3 xl:columns-4">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIndex(i)}
              className="group mb-3 block w-full break-inside-avoid overflow-hidden bg-ink-800 sm:mb-4"
              aria-label={`Open: ${item.alt}`}
            >
              <img
                src={item.thumb}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                style={{ aspectRatio: item.ratio }}
                className="w-full object-cover grayscale transition-all duration-[1.2s] ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
              />
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <Reveal className="mt-16 text-center">
        <a
          href="https://www.instagram.com/inkbyrico/"
          target="_blank"
          rel="noreferrer noopener"
          className="btn"
        >
          339 more on Instagram
        </a>
      </Reveal>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[70] flex flex-col bg-ink/97 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-6 py-5 sm:px-10">
              <span className="font-sans text-[10px] uppercase tracking-mega text-bone-mute">
                {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <button onClick={close} className="p-2 text-bone-dim transition-colors hover:text-bone" aria-label="Close">
                <X size={22} strokeWidth={1.1} />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16">
              <button
                onClick={() => step(-1)}
                className="absolute left-1 z-10 p-3 text-bone-mute transition-colors hover:text-bone sm:left-4"
                aria-label="Previous"
              >
                <ChevronLeft size={30} strokeWidth={1} />
              </button>

              <motion.img
                key={active.id}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                src={active.full}
                alt={active.alt}
                className="max-h-full max-w-full object-contain"
              />

              <button
                onClick={() => step(1)}
                className="absolute right-1 z-10 p-3 text-bone-mute transition-colors hover:text-bone sm:right-4"
                aria-label="Next"
              >
                <ChevronRight size={30} strokeWidth={1} />
              </button>
            </div>

            <p className="px-6 pb-8 text-center text-[13px] text-bone-dim sm:px-10">{active.alt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
