import { useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'
import Reveal, { SectionHead } from './Reveal.jsx'

const CLIPS = [
  {
    src: '/motion/lion.mp4',
    poster: '/motion/lion.webp',
    title: 'Lion',
    note: 'Fine line portrait, forearm',
  },
  {
    src: '/motion/horse.mp4',
    poster: '/motion/horse.webp',
    title: 'Racehorse',
    note: 'Single needle, inner forearm',
  },
  {
    src: '/motion/snake.mp4',
    poster: '/motion/snake.webp',
    title: 'Serpent',
    note: 'Hand decor, black and grey',
  },
  {
    src: '/motion/wolf.mp4',
    poster: '/motion/wolf.webp',
    title: 'Wolf',
    note: 'Portrait and compass, thigh',
  },
]

function Clip({ clip, delay }) {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(true)

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) } else { v.pause(); setPlaying(false) }
  }

  return (
    <Reveal delay={delay}>
      <figure className="group relative">
        <button
          onClick={toggle}
          className="relative block w-full overflow-hidden bg-ink-800"
          aria-label={playing ? `Pause ${clip.title}` : `Play ${clip.title}`}
        >
          <video
            ref={ref}
            src={clip.src}
            poster={clip.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="aspect-[3/4] w-full object-cover"
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <span className="pointer-events-none absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-bone/25 bg-ink/50 text-bone opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
            {playing ? <Pause size={13} strokeWidth={1.4} /> : <Play size={13} strokeWidth={1.4} />}
          </span>
        </button>
        <figcaption className="mt-4 flex items-baseline justify-between gap-4">
          <span className="font-display text-xl">{clip.title}</span>
          <span className="font-sans text-[10px] uppercase tracking-wide2 text-bone-mute">{clip.note}</span>
        </figcaption>
      </figure>
    </Reveal>
  )
}

export default function Motion() {
  return (
    <section id="motion" className="scroll-mt-24 border-y border-bone/10 bg-ink-900 py-24 sm:py-32">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead eyebrow="In Motion" title="What the ink" italic="would do." />
          <Reveal delay={0.1} className="max-w-[42ch]">
            <p className="text-[14px] leading-[1.8] text-bone-dim">
              An experiment, not a service. Rico's real tattoos, brought to life with AI motion —
              the same lines you would get on skin, given five seconds to move.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {CLIPS.map((c, i) => (
            <Clip key={c.title} clip={c} delay={i * 0.08} />
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 font-sans text-[10px] uppercase tracking-wide2 text-bone-mute">
            Source photography by Rick Coury · Motion generated with Higgsfield
          </p>
        </Reveal>
      </div>
    </section>
  )
}
