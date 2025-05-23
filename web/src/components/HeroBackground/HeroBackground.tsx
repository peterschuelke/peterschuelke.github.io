import MultiLightSource from 'src/components/LightSource/MultiLightSource'
import './HeroBackground.pcss'

interface HeroBackgroundProps {
  onAnimationComplete?: () => void
  onLensClick?: (lensNumber: number) => void
}

const HeroBackground = ({ onAnimationComplete, onLensClick }: HeroBackgroundProps) => {
  const lightPositions: Array<[number, number, number]> = [
    [-0.73, 0.45, 0],  // Far Left light
    [-0.425, 0.45, 0],  // Left light
    [-0.14, 0.45, 0],  // Left-center light
    [0.14, 0.45, 0],   // Right-center light
    [0.425, 0.45, 0],   // Right light
    [0.73, 0.45, 0]    // Far Right light
  ]

  return (
    <div className="hero__background">
      {/* <img className="hero__background--truss" src="/assets/Truss.png" alt="Truss" />
      <img className="hero__background--truss truss--2" src="/assets/Truss.png" alt="Truss" /> */}
      <div className="hero__content" aria-hidden="true">
        <h1>Peter Schuelke</h1>
        <p>Building thoughtful, flexible systems for the web.</p>
      </div>
      <MultiLightSource
        className="hero__background--light-source"
        lightPositions={lightPositions}
        onAnimationComplete={onAnimationComplete}
        onLensClick={onLensClick}
      />
    </div>
  )
}

export default HeroBackground