import { useEffect, useRef } from 'react'
import HeroBackground from 'src/components/HeroBackground/HeroBackground'

const Hero = () => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!contentRef.current) return

      const rect = contentRef.current.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100

      contentRef.current.style.setProperty('--mouse-x', `${x}%`)
      contentRef.current.style.setProperty('--mouse-y', `${y}%`)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section className="hero">
      <HeroBackground />
      <div ref={contentRef} className="hero__content container--normal">
        {/* <h1 className="hero__title" data-text="Peter Schuelke">Peter Schuelke</h1>
        <p className="hero__subtitle" data-text="Full Stack Developer">Full Stack Developer</p> */}
      </div>
    </section>
  )
}

export default Hero