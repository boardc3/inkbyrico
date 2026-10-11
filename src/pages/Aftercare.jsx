import { Link } from 'react-router-dom'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import Reveal, { SectionHead } from '../components/Reveal.jsx'
import { aftercare, artist } from '../data/site.js'
import data from '../data/gallery.json'

export default function Aftercare() {
  return (
    <>
      {/* Header */}
      <section className="shell pb-16 pt-40 sm:pt-48">
        <Reveal>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-mega text-bone-mute transition-colors hover:text-bone"
          >
            <ArrowLeft size={13} strokeWidth={1.3} /> Back
          </Link>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Aftercare</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-6 font-display text-[clamp(2.9rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.03em]">
                Fourteen days
                <span className="block italic text-bone-dim">that decide the rest.</span>
              </h1>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal delay={0.12}>
              <p className="max-w-[44ch] text-[15px] leading-[1.85] text-bone-dim">{aftercare.intro}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <Reveal>
        <img
          src={data.studio['rico-working']}
          alt="Rico wrapping a freshly finished tattoo"
          className="h-[42vh] w-full object-cover grayscale sm:h-[56vh]"
        />
      </Reveal>

      {/* Timeline */}
      <section className="shell py-24 sm:py-32">
        <SectionHead eyebrow="The Routine" title="Day by" italic="day." />

        <ol className="mt-16 divide-y divide-bone/10 border-y border-bone/10">
          {aftercare.timeline.map((step, i) => (
            <Reveal key={step.when} delay={i * 0.05}>
              <li className="grid grid-cols-1 gap-4 py-10 md:grid-cols-12 md:gap-8">
                <span className="font-sans text-[10px] uppercase tracking-wide2 text-sand md:col-span-2">
                  {step.when}
                </span>
                <h3 className="font-display text-[1.8rem] leading-tight md:col-span-4">{step.title}</h3>
                <p className="max-w-[54ch] text-[14px] leading-[1.85] text-bone-dim md:col-span-6">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Never / Before */}
      <section className="border-y border-bone/10 bg-ink-900 py-24 sm:py-32">
        <div className="shell grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead eyebrow="Do Not" title="Six ways to" italic="ruin it." />
            <ul className="mt-12 space-y-px">
              {aftercare.never.map((n, i) => (
                <Reveal key={n} delay={i * 0.05}>
                  <li className="flex items-baseline gap-5 border-b border-bone/10 py-5">
                    <span className="font-sans text-[10px] tracking-mega text-bone-mute">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[15px] text-bone-dim">{n}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <SectionHead eyebrow="Before Your Session" title="Show up" italic="ready." />
            <ul className="mt-12 space-y-6">
              {aftercare.before.map((b, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <li className="flex gap-5">
                    <span className="mt-2.5 h-px w-6 shrink-0 bg-sand/60" />
                    <span className="text-[14px] leading-[1.8] text-bone-dim">{b}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Callout + CTA */}
      <section className="shell py-24 sm:py-28">
        <Reveal>
          <div className="flex max-w-[70ch] items-start gap-5 border border-bone/15 p-8">
            <AlertCircle size={20} strokeWidth={1.2} className="mt-0.5 shrink-0 text-sand" />
            <p className="text-[14px] leading-[1.8] text-bone-dim">{aftercare.callout}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-wrap items-center gap-5">
            <a href={`mailto:${artist.email}`} target="_blank" rel="noopener noreferrer" className="btn-solid">Message Rico</a>
            <Link to="/" className="btn">Back to the work</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
