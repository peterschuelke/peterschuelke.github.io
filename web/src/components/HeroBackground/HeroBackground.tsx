import MultiLightSource from 'src/components/LightSource/MultiLightSource'

interface HeroBackgroundProps {
  onAnimationComplete?: () => void
}

const HeroBackground = ({ onAnimationComplete }: HeroBackgroundProps) => {
  const lightPositions: Array<[number, number, number]> = [
    [-0.505, 0.45, 0],  // Far Left light
    [-0.28, 0.45, 0],  // Left light
    [-0.09, 0.45, 0],  // Left-center light
    [0.11, 0.45, 0],   // Right-center light
    [0.28, 0.45, 0],   // Right light
    [0.475, 0.45, 0]    // Far Right light
  ]

  return (
    <div className="hero__background">
      {/* <img className="hero__background--truss" src="/assets/Truss.png" alt="Truss" />
      <img className="hero__background--truss truss--2" src="/assets/Truss.png" alt="Truss" /> */}
      <MultiLightSource className="hero__background--light-source" lightPositions={lightPositions} onAnimationComplete={onAnimationComplete} />
    </div>
  )
}

export default HeroBackground