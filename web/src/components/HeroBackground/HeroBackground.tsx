import MultiLightSource from 'src/components/LightSource/MultiLightSource'

const HeroBackground = () => {
  const lightPositions: Array<[number, number, number]> = [
    [-0.55, 0.45, 0],  // Left light
    [-0.275, 0.45, 0],  // Left-center light
    [0.275, 0.45, 0],   // Right-center light
    [0.55, 0.45, 0]    // Right light
  ]

  return (
    <div className="hero__background">
      {/* <img className="hero__background--truss" src="/assets/Truss.png" alt="Truss" />
      <img className="hero__background--truss truss--2" src="/assets/Truss.png" alt="Truss" /> */}
      <MultiLightSource className="hero__background--light-source" lightPositions={lightPositions} />
    </div>
  )
}

export default HeroBackground