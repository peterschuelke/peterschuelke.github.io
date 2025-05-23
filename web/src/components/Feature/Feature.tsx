import { useState, useEffect, ReactElement } from 'react'
import './Feature.pcss'
import AccordionList from '../AccordionList/AccordionList'

interface FeatureProps {
  background: 'lights' | 'black'
  eyebrow: string
  title: string
  children: ReactElement<{ hue?: number }>
}

const Feature = ({ background, eyebrow, title, children }: FeatureProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setMousePosition({ x, y })
    }

    const element = document.querySelector('.feature--lights')
    if (element) {
      element.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <section className={`feature feature--${background}`}>
      <div className="feature__content">
        <div className="feature__header">
          <span className="feature__eyebrow">{eyebrow}</span>
          <h2 className="feature__title">{title}</h2>
        </div>
        <div className="feature__body">
          {children}
        </div>
      </div>
      {background === 'lights' && (
        <div
          className="feature__gradient gradient-animated"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsla(0, 100%, 50%, 0.15) 0%, hsla(0, 100%, 50%, 0.05) 30%, transparent 70%), var(--color-bg-hue-bolder)`
          }}
        />
      )}
    </section>
  )
}

export default Feature