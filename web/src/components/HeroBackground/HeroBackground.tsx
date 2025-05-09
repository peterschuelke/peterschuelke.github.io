import LightSource from 'src/components/LightSource/LightSource'

const HeroBackground = () => {
  return (
    <div className="hero__background">
      <img className="hero__background--truss" src="/assets/Truss.png" alt="Truss" />
      <img className="hero__background--truss truss--2" src="/assets/Truss.png" alt="Truss" />
      <img className="hero__background--light-base" src="/assets/Light_Base.png" alt="Light Base" />
      <LightSource className="hero__background--light-source" />
      <img className="hero__background--light-base base--2" src="/assets/Light_Base.png" alt="Light Base" />
      <LightSource className="hero__background--light-source source--2" />
      <img className="hero__background--light-base base--3" src="/assets/Light_Base.png" alt="Light Base" />
      <LightSource className="hero__background--light-source source--3" />
      <img className="hero__background--light-base base--4" src="/assets/Light_Base.png" alt="Light Base" />
      <LightSource className="hero__background--light-source source--4" />
    </div>
  )
}

export default HeroBackground