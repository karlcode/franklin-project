import { DragEvent } from 'react'
import './Card.css'

export type CardProps = {
  title: string
  subtitle: string
  visible: boolean
  show: (item: string) => void
  remove: (item: string) => void
  hoverIn: any
  hoverOut: any
}

export const Card = ({
  title,
  subtitle,
  visible,
  show,
  remove,
  hoverIn,
  hoverOut,
}: CardProps) => {
  const startDrag = (e: DragEvent) => {
    e.dataTransfer.setData('item', title)
    ;(e.target as HTMLDivElement).style.opacity = '0.5'
  }

  const endDrag = (e: DragEvent) => {
    ;(e.target as HTMLDivElement).style.opacity = ''
  }

  return (
    <div
      className={`Card ${!visible ? 'hidden' : ''}`}
      draggable
      onDragStart={startDrag}
      onDragEnd={endDrag}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
      id={title}
    >
      <div className="button" onClick={() => show(title)}>
        {visible ? <img src={'eye.svg'} /> : <img src={'hidden.svg'} />}
      </div>

      <div className="Card__content">
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
      <div className="button" onClick={() => remove(title)}>
        <img src={'cross.svg'} />
      </div>
    </div>
  )
}
