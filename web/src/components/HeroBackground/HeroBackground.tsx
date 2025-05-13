import LightSource from 'src/components/LightSource/LightSource'

const HeroBackground = () => {
  return (
    <div className="hero__background">
      <img className="hero__background--truss" src="/assets/Truss.png" alt="Truss" />
      <img className="hero__background--truss truss--2" src="/assets/Truss.png" alt="Truss" />
      <LightSource className="hero__background--light-source" />
      <LightSource className="hero__background--light-source source--2" />
      <LightSource className="hero__background--light-source source--3" />
      <LightSource className="hero__background--light-source source--4" />
    </div>
  )
}

export default HeroBackground