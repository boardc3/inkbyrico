import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { artist } from '../data/site.js'

const LINKS = [
  { label: 'Work', to: '/#work' },
  { label: 'The Artist', to: '/#artist' },
  { label: 'Motion', to: '/#motion' },
  { label: 'Aftercare', to: '/aftercare' },
  { label: 'Booking', to: '/#booking' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Hash links have to work from /aftercare too, so route first then scroll.
  const go = (to) => (e) => {
    setOpen(false)
    if (!to.startsWith('/#')) return
    e.preventDefault()
    const id = to.slice(2)
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    if (pathname !== '/') {
      navigate('/')
      setTimeout(scroll, 120)
    } else {
      scroll()
    }
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled ? 'bg-ink/85 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className={`shell flex items-center justify-between transition-all duration-700 ${scrolled ? 'py-4' : 'py-7'}`}>
          <Link to="/" onClick={() => setOpen(false)} className="group flex items-baseline gap-3">
            <span className="font-display text-2xl leading-none tracking-[-0.01em]">Rico</span>
            <span className="hidden font-sans text-[9px] uppercase tracking-mega text-bone-mute sm:inline">
              Single Needle
            </span>
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={go(l.to)}
                className="link-wipe font-sans text-[11px] uppercase tracking-wide2 text-bone-dim transition-colors duration-300 hover:text-bone"
              >
                {l.label}
              </Link>
            ))}
            <a href={`mailto:${artist.email}`} target="_blank" rel="noopener noreferrer" className="btn !px-6 !py-3">
              Book
            </a>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-bone md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} strokeWidth={1.2} /> : <Menu size={22} strokeWidth={1.2} />}
          </button>
        </div>
        <div className={`shell transition-opacity duration-700 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
          <div className="hairline" />
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-40 bg-ink transition-all duration-500 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="shell flex h-full flex-col justify-center gap-2">
          {LINKS.map((l, i) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={go(l.to)}
              style={{ transitionDelay: `${open ? i * 60 + 120 : 0}ms` }}
              className={`font-display text-[13vw] leading-[1.06] transition-all duration-700 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={`mailto:${artist.email}`} target="_blank" rel="noopener noreferrer"
            className="mt-10 font-sans text-[11px] uppercase tracking-wide2 text-bone-mute"
          >
            {artist.email}
          </a>
        </div>
      </div>
    </>
  )
}
