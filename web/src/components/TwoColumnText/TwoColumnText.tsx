import './TwoColumnText.pcss'

interface TwoColumnTextProps {
  paragraphs: string[]
}

const TwoColumnText = ({ paragraphs }: TwoColumnTextProps) => {
  return (
    <div className="two-column-text">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}

export default TwoColumnText