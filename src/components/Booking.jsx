import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Reveal, { SectionHead } from './Reveal.jsx'
import { artist } from '../data/site.js'
import data from '../data/gallery.json'

const PLACEMENTS = ['Forearm', 'Upper arm', 'Hand / fingers', 'Ribs', 'Leg', 'Back', 'Neck', 'Somewhere else']
const SIZES = ['Under 1 in', '1–2 in', '2–4 in', '4 in +', 'Not sure yet']

// Web3Forms access key (public by design). Set VITE_WEB3FORMS_KEY in
// Vercel → Settings → Environment Variables. Web3Forms emails each submission to
// the address the key was created for (inkbyrico@gmail.com).
// If unset, the form falls back to the visitor's mail client (mailto).
const ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const FORM_ID = ACCESS_KEY

export default function Booking() {
  // idle | sending | sent | mailto | error
  const [status, setStatus] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)

    if (FORM_ID) {
      // Honeypot: bots fill the hidden field, humans don't.
      if (f.get('botcheck')) return
      f.set('access_key', ACCESS_KEY)
      f.set('from_name', 'inkbyrico.com')
      f.set('replyto', f.get('email'))
      setStatus('sending')
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: f,
        })
        const out = await res.json().catch(() => ({}))
        if (!res.ok || out.success === false) throw new Error(out.message || String(res.status))
        form.reset()
        setStatus('sent')
      } catch {
        setStatus('error')
      }
      return
    }

    const body = [
      `Name: ${f.get('name')}`,
      `Email: ${f.get('email')}`,
      `Instagram: ${f.get('ig') || '—'}`,
      '',
      `Placement: ${f.get('placement')}`,
      `Approx. size: ${f.get('size')}`,
      `Preferred timing: ${f.get('timing') || '—'}`,
      '',
      'The idea:',
      f.get('idea'),
      '',
      '— Sent from inkbyrico.com',
    ].join('\n')

    window.location.href =
      `mailto:${artist.email}` +
      `?subject=${encodeURIComponent(`Tattoo enquiry — ${f.get('name')}`)}` +
      `&body=${encodeURIComponent(body)}`
    setStatus('mailto')
  }

  return (
    <section id="booking" className="scroll-mt-24 border-t border-bone/10 bg-ink-900">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image side */}
        <div className="relative hidden lg:block">
          <img
            src={data.studio['rico-session']}
            alt="Rico working on a fine line piece"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/40 via-ink-900/20 to-ink-900" />
        </div>

        {/* Form side */}
        <div className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
          <div className="mx-auto max-w-xl">
            <SectionHead eyebrow="Booking" title="Tell him what" italic="you have in mind." />

            <Reveal delay={0.1}>
              <p className="mt-7 text-[14px] leading-[1.8] text-bone-dim">
                By appointment only. Send the idea, the placement and a rough size — Rico will come
                back with a quote and available dates. Prefer Instagram? DM{' '}
                <a href={artist.instagram} target="_blank" rel="noreferrer noopener" className="link-wipe text-bone">
                  {artist.instagramHandle}
                </a>.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <form
                method="POST"
                action={FORM_ID ? ENDPOINT : undefined}
                onSubmit={onSubmit}
                className="mt-12 space-y-8"
              >
                <input type="hidden" name="subject" value="New tattoo enquiry — inkbyrico.com" />
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow">Name</span>
                    <input required name="name" type="text" placeholder="Your name" className="field mt-2" />
                  </label>
                  <label className="block">
                    <span className="eyebrow">Email</span>
                    <input required name="email" type="email" placeholder="you@email.com" className="field mt-2" />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow">Placement</span>
                    <select name="placement" className="field mt-2 appearance-none">
                      {PLACEMENTS.map((p) => (
                        <option key={p} value={p} className="bg-ink text-bone">{p}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="eyebrow">Approx. size</span>
                    <select name="size" className="field mt-2 appearance-none">
                      {SIZES.map((s) => (
                        <option key={s} value={s} className="bg-ink text-bone">{s}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow">Instagram</span>
                    <input name="ig" type="text" placeholder="@optional" className="field mt-2" />
                  </label>
                  <label className="block">
                    <span className="eyebrow">Preferred timing</span>
                    <input name="timing" type="text" placeholder="e.g. next month" className="field mt-2" />
                  </label>
                </div>

                <label className="block">
                  <span className="eyebrow">The idea</span>
                  <textarea
                    required
                    name="idea"
                    rows={4}
                    placeholder="What you want tattooed, and anything that matters about it."
                    className="field mt-2 resize-none"
                  />
                </label>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <button type="submit" disabled={status === 'sending'} className="btn-solid disabled:opacity-60">
                    {status === 'sending' ? 'Sending…' : 'Send enquiry'} <ArrowUpRight size={14} strokeWidth={1.5} />
                  </button>
                  <a href={`mailto:${artist.email}`} className="link-wipe text-[13px] text-bone-dim">
                    or email {artist.email}
                  </a>
                </div>

                <div role="status" aria-live="polite">
                  {status === 'sent' && (
                    <p className="text-[13px] text-sand">
                      Thank you — your enquiry is with Rico. Expect a reply by email within a few days.
                    </p>
                  )}
                  {status === 'mailto' && (
                    <p className="text-[13px] text-sand">
                      Your mail app should be opening with the message ready. If nothing happened,
                      email {artist.email} directly.
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="text-[13px] text-sand">
                      Something went wrong sending that. Please try again, or email {artist.email} directly.
                    </p>
                  )}
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
