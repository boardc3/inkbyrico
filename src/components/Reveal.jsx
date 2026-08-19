import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/** Fades + lifts its children in the first time they scroll into view. */
export default function Reveal({ children, delay = 0, y = 28, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Section heading block: tracked-out eyebrow + large serif line. */
export function SectionHead({ eyebrow, title, italic, className = '', align = 'left' }) {
  return (
    <div className={`${className} ${align === 'center' ? 'text-center' : ''}`}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-6 max-w-[22ch] font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[0.98] tracking-[-0.02em]">
          {title}
          {italic && <span className="italic text-bone-dim"> {italic}</span>}
        </h2>
      </Reveal>
    </div>
  )
}
