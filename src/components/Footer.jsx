import { Link } from 'react-router-dom'
import { Instagram, Mail } from 'lucide-react'
import { artist, footer } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-ink pt-20">
      <div className="shell">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="font-display text-[clamp(3.4rem,11vw,8rem)] leading-[0.85] tracking-[-0.035em]">
              Ink by <span className="italic text-bone-dim">Rico</span>
            </p>
            <p className="mt-7 max-w-[34ch] text-[14px] leading-[1.75] text-bone-dim">
              {artist.tagline} {artist.studio}. By appointment only.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-14 gap-y-10 sm:grid-cols-3">
            <div>
              <p className="eyebrow">Site</p>
              <ul className="mt-5 space-y-3 text-[13px] text-bone-dim">
                <li><a href="/#work" className="link-wipe">Work</a></li>
                <li><a href="/#artist" className="link-wipe">The Artist</a></li>
                <li><a href="/#motion" className="link-wipe">Motion</a></li>
                <li><Link to="/aftercare" className="link-wipe">Aftercare</Link></li>
                <li><a href="/#faq" className="link-wipe">FAQ</a></li>
              </ul>
            </div>

            <div>
              <p className="eyebrow">Contact</p>
              <ul className="mt-5 space-y-3 text-[13px] text-bone-dim">
                <li>
                  <a href={`mailto:${artist.email}`} target="_blank" rel="noopener noreferrer" className="link-wipe inline-flex items-center gap-2">
                    <Mail size={13} strokeWidth={1.3} /> Email
                  </a>
                </li>
                <li>
                  <a href={artist.instagram} target="_blank" rel="noreferrer noopener" className="link-wipe inline-flex items-center gap-2">
                    <Instagram size={13} strokeWidth={1.3} /> Instagram
                  </a>
                </li>
                <li>
                  <a href={artist.tiktok} target="_blank" rel="noreferrer noopener" className="link-wipe">TikTok</a>
                </li>
              </ul>
            </div>

            <div>
              <p className="eyebrow">Studio</p>
              <p className="mt-5 text-[13px] leading-[1.8] text-bone-dim">
                {artist.city}
                <br />
                {artist.county}
              </p>
            </div>
          </div>
        </div>

        <div className="hairline mt-20 flex flex-col gap-3 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[10px] uppercase tracking-wide2 text-bone-mute">
            © {new Date().getFullYear()} {artist.name}. {footer.credit}
          </p>
          <p className="font-sans text-[10px] uppercase tracking-wide2 text-bone-mute">{footer.built}</p>
        </div>
      </div>
    </footer>
  )
}
