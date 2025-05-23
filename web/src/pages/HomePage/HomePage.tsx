// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useState } from 'react'
import ProjectsList from 'src/components/Project/ProjectsList'
import Hero from 'src/components/Hero/Hero'
import Feature from 'src/components/Feature/Feature'
import TwoColumnText from 'src/components/TwoColumnText/TwoColumnText'
import AccordionList from 'src/components/AccordionList/AccordionList'
import AccordionItem from 'src/components/AccordionItem/AccordionItem'
import GradientWrapper from 'src/components/GradientWrapper/GradientWrapper'

import './HomePage.pcss'

const HomePage = () => {
  const [isContentVisible, setIsContentVisible] = useState(false)

  return (
    <GradientWrapper>
      <div className="home-page">
        <Metadata title="Home" description="Home page" />
        <Hero onAnimationComplete={() => setIsContentVisible(true)} />
        <div className={`container--normal content ${isContentVisible ? 'content--visible' : ''}`}>
          <Feature
            background="lights"
            eyebrow="About"
            title="A balance of systems thinking & creative problem solving."
          >
            <TwoColumnText
              paragraphs={[
                "I've built digital products for brands like the NBA, CrossFit, and Children's Hospital of Philadelphia. Over the last decade, I've led front-end architecture on multimillion-dollar platforms, developed design systems from scratch, and collaborated with designers, strategists, and stakeholders to ship experiences that scale.",
                "What keeps me inspired is the blend of creativity and structure. I love taking vague requirements and transforming them into purposeful, extensible interfaces that just feel right. Whether I'm refining performance, integrating AI, or mentoring devs on scalable systems, I aim to bring clarity, craft, and momentum to every project."
              ]}
            />
          </Feature>

          <Feature
            background="black"
            eyebrow="Experience"
            title="How I can help you"
          >
            <AccordionList>
              <AccordionItem header="Empathy first">
                <p>Before writing code or architecting a system, I start by listening. Whether I'm talking to a product owner, a designer, or another developer, I want to understand their goals, their pain points, and how they define success. I've found that the best solutions come from asking the right questions early, not jumping to answers. Empathy builds trust—and trust makes better products.</p>
              </AccordionItem>
              <AccordionItem header="Systems over shortcuts">
                <p>I love solving problems, but I'm especially drawn to solutions that last. That often means taking a bit more time up front to create clean abstractions, reusable components, or a pattern library that evolves with the product. I've seen firsthand how thoughtful systems can accelerate teams—reducing bugs, onboarding time, and duplicate effort. Good systems let people focus on the fun parts of building.</p>
              </AccordionItem>
              <AccordionItem header="Design-aware engineering">
                <p>I don't believe in pixel-pushing handoffs. I see design and engineering as a conversation—and I enjoy that back-and-forth. Whether I'm working inside Figma or giving real-time feedback in a pairing session, I care deeply about translating design intent into code that's accessible, performant, and flexible. Some of my favorite work has come from collaborating closely with designers to refine flows or prototype tricky edge cases together.</p>
              </AccordionItem>
              <AccordionItem header="Curiosity never stops">
                <p>I'm always exploring new tools, patterns, and ideas. Whether it's integrating LLMs with LangChain, experimenting with design token pipelines, or diving into visual regression testing, I treat each project as a chance to learn and level up. I also love sharing what I've learned—through mentoring, reviewing pull requests, or just talking shop with teammates. Growth is a shared experience.</p>
              </AccordionItem>
            </AccordionList>
          </Feature>

          <h2>My Work</h2>
          <ProjectsList />
        </div>
      </div>
    </GradientWrapper>
  )
}

export default HomePage
