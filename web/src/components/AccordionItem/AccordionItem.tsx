import { useState } from 'react'
import './AccordionItem.pcss'

interface AccordionItemProps {
  header: string
  children: React.ReactNode
}

const AccordionItem = ({ header, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="accordion-item">
      <div
        className="accordion-item__border gradient-animated"
        style={{
          background: `linear-gradient(90deg, hsla(0, 100%, 50%, 0.4) 0%, hsla(0, 100%, 50%, 0.1) 50%, hsla(0, 100%, 50%, 0.2) 100%), var(--color-bg-hue-default)`
        }}
      />
      <button
        className="accordion-item__header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{header}</span>
        <span className="accordion-item__icon">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div
        className={`accordion-item__body ${isOpen ? 'accordion-item__body--open' : ''}`}
        aria-hidden={!isOpen}
      >
        {children}
      </div>
      <div
        className="accordion-item__border gradient-animated"
        style={{
          background: `linear-gradient(90deg, hsla(0, 100%, 50%, 0.4) 0%, hsla(0, 100%, 50%, 0.1) 50%, hsla(0, 100%, 50%, 0.2) 100%), var(--color-bg-hue-default)`
        }}
      />
    </div>
  )
}

export default AccordionItem