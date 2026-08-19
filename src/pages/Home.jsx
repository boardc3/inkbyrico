import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import Disciplines from '../components/Disciplines.jsx'
import Gallery from '../components/Gallery.jsx'
import BeforeAfter from '../components/BeforeAfter.jsx'
import Motion from '../components/Motion.jsx'
import About from '../components/About.jsx'
import Press from '../components/Press.jsx'
import Voices from '../components/Voices.jsx'
import Process from '../components/Process.jsx'
import Booking from '../components/Booking.jsx'
import Location from '../components/Location.jsx'
import Faq from '../components/Faq.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Disciplines />
      <Gallery />
      <BeforeAfter />
      <Motion />
      <About />
      <Press />
      <Voices />
      <Process />
      <Location />
      <Faq />
      <Booking />
    </>
  )
}
