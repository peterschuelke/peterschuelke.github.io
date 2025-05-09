import { useEffect, useState, useRef } from 'react'

interface LightSourceProps {
  className?: string
}

const LightSource = ({ className = '' }: LightSourceProps) => {
  const [rotation, setRotation] = useState(0)
  const lightRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!lightRef.current) return

      // Get the component's position
      const rect = lightRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate the angle between the mouse position and the component's center
      const angle = Math.atan2(
        event.clientY - centerY,
        event.clientX - centerX
      ) * (180 / Math.PI)

      // Set the rotation (add 90 degrees to align with the light source's default orientation)
      setRotation(angle - 90)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <img
      ref={lightRef}
      className={`light-source ${className}`}
      src="/assets/Light_Source.png"
      alt="Light"
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  )
}

export default LightSource