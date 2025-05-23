import { ReactElement } from 'react'
import './AccordionList.pcss'
import AccordionItem from '../AccordionItem/AccordionItem'

interface AccordionItemProps {
  header: string
  children: React.ReactNode
  hue?: number
}

interface AccordionListProps {
  children: ReactElement<AccordionItemProps>[]
  hue?: number
}

const AccordionList = ({ children, hue = 0 }: AccordionListProps) => {
  const childrenWithHue = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { hue })
    }
    return child
  })

  return (
    <div className="accordion-list">
      {childrenWithHue}
    </div>
  )
}

export default AccordionList