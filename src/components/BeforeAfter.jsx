import { useCallback, useEffect, useRef, useState } from 'react'
import Reveal, { SectionHead } from './Reveal.jsx'
import data from '../data/gallery.json'

function Slider({ pair }) {
  const box = useRef(null)
  const [pos, setPos] = useState(52)
  const dragging = useRef(false)

  const set = useCallback((clientX) => {
    const r = box.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }, [])

  useEffect(() => {
    const move = (e) => {
      if (!dragging.current) return
      set(e.touches ? e.touches[0].clientX : e.clientX)
    }
    const up = () => { dragging.current = false }
    window.addEventListener('mousemove', move)
    window.addEventListener('touchmove', move, { passive: true })
    window.addEventListener('mouseup', up)
    window.addEventListener('touchend', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('touchmove', move)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('touchend', up)
    }
  }, [set])

  const start = (e) => {
    dragging.current = true
    set(e.touches ? e.touches[0].clientX : e.clientX)
  }

  return (
    <figure>
      <div
        ref={box}
        onMouseDown={start}
        onTouchStart={start}
        className="relative aspect-[4/5] w-full cursor-ew-resize select-none overflow-hidden bg-ink-800"
      >
        <img src={pair.after} alt={pair.afterLabel} className="absolute inset-0 h-full w-full object-cover" draggable="false" />
        {/* Clipping the full-size image keeps both halves perfectly registered. */}
        <img
          src={pair.before}
          alt={pair.beforeLabel}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable="false"
        />

        {/* handle */}
        <div className="pointer-events-none absolute inset-y-0 w-px bg-bone/80" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/60 bg-ink/60 backdrop-blur-sm">
            <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-bone">↔</span>
          </span>
        </div>

        <span className="pointer-events-none absolute bottom-4 left-4 font-sans text-[9px] uppercase tracking-wide2 text-bone/80 mix-blend-difference">
          Reference
        </span>
        <span className="pointer-events-none absolute bottom-4 right-4 font-sans text-[9px] uppercase tracking-wide2 text-bone/80 mix-blend-difference">
          Tattoo
        </span>
      </div>

      <figcaption className="mt-4 flex flex-col gap-1">
        <span className="text-[13px] text-bone-dim">{pair.beforeLabel}</span>
        <span className="text-[13px] text-bone-mute">→ {pair.afterLabel}</span>
      </figcaption>
    </figure>
  )
}

export default function BeforeAfter() {
  if (!data.pairs?.length) return null

  return (
    <section id="reference" className="shell scroll-mt-24 py-24 sm:py-32">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHead eyebrow="Reference → Tattoo" title="What you bring in," italic="what you leave with." />
        <Reveal delay={0.1} className="max-w-[42ch]">
          <p className="text-[14px] leading-[1.8] text-bone-dim">
            Drag each frame. On the left, the photograph the client walked in with. On the right,
            the same subject rebuilt in hairline black and grey — referenced constantly, never traced.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {data.pairs.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1}>
            <Slider pair={p} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
