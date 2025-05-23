import { useEffect, useState } from 'react'

interface GradientWrapperProps {
  children: React.ReactNode
}

const GradientWrapper = ({ children }: GradientWrapperProps) => {
  const [hue, setHue] = useState(0)

  useEffect(() => {
    let animationFrame: number
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp
        console.log('Animation started')
      }
      const progress = timestamp - startTime
      const newHue = (progress / 18000) * 360 // 18 seconds for full rotation

      // Reset startTime when we complete a full rotation
      if (newHue >= 360) {
        startTime = timestamp
      }

      setHue(newHue % 360)
      document.documentElement.style.setProperty('--hue-rotation', `${newHue % 360}deg`)
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      console.log('GradientWrapper unmounted')
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="gradient-wrapper">
      {children}
    </div>
  )
}

export default GradientWrapper