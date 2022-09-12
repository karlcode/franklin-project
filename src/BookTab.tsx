import React, { DragEvent, useMemo, useRef, useState } from 'react'
import { Book } from './App'
import './Booktab.css'
import { Card } from './components/Card'

type BookTabProps = {
  items: Book[]
  favoriteItems: string[]
  setFavoriteItems: React.Dispatch<React.SetStateAction<string[]>>
}

export const BookTab = ({
  items,
  favoriteItems,
  setFavoriteItems,
}: BookTabProps) => {
  const [selected, setSelected] = useState<string>()
  const resetCache = useRef(favoriteItems).current // Store value of favorite items from first render
  const popoutRef = useRef<HTMLDivElement>(null)

  const isChangedList =
    JSON.stringify(resetCache) !== JSON.stringify(favoriteItems)

  const show = (item: string) =>
    setFavoriteItems((prev: string[]) => [...prev, item])

  const remove = (item: string) =>
    setFavoriteItems((prev: string[]) => prev.filter((x) => x !== item))

  const addCheck = (e: DragEvent) => {
    e.preventDefault()
    const item = e.dataTransfer.getData('item')
    show(item)
  }

  const removeCheck = (e: DragEvent) => {
    e.preventDefault()
    const item = e.dataTransfer.getData('item')
    remove(item)
  }

  const dragover = (e: DragEvent) => {
    // Must overwrite dragover behaviour to enable ondrop
    e.preventDefault()
  }

  const hoverIn = (e: DragEvent) => {
    setSelected((prev) => (e.target as HTMLDivElement).id || prev)
    popoutRef!.current!.style.opacity = '1'
  }

  const hoverOut = () => {
    popoutRef!.current!.style.opacity = ''
  }

  const filteredItem = (items: Book[]) =>
    items.filter((item) => item.title === selected)

  const favoriteBooks = useMemo(
    () => items.filter((item) => favoriteItems.includes(item.title)),
    [items, favoriteItems],
  )

  const hiddenBooks = useMemo(
    () => items.filter((item) => !favoriteItems.includes(item.title)),
    [items, favoriteItems],
  )

  return (
    <div className="container">
      <div className="BookTab">
        <div>
          <strong>Shopping</strong>
          <div className="BookTab__header">
            <h1>Wish list</h1>
            <div className="pill">Books</div>
          </div>
        </div>
        <div>
          <ul className="BookTab__list" onDrop={addCheck} onDragOver={dragover}>
            {favoriteBooks.map((book, i) => (
              <li key={i}>
                <Card
                  visible
                  title={book.title}
                  subtitle={book.author}
                  show={show}
                  remove={remove}
                  hoverIn={hoverIn}
                  hoverOut={hoverOut}
                />
              </li>
            ))}
          </ul>
          <strong className="separator">Hidden list</strong>
          <ul
            className="BookTab__list"
            onDrop={removeCheck}
            onDragOver={dragover}
          >
            {hiddenBooks.map((book, i) => (
              <li key={i}>
                <Card
                  visible={false}
                  title={book.title}
                  subtitle={book.author}
                  show={show}
                  remove={remove}
                  hoverIn={hoverIn}
                  hoverOut={hoverOut}
                />
              </li>
            ))}
          </ul>
        </div>

        {isChangedList && (
          <div
            onClick={() => {
              setFavoriteItems(resetCache)
            }}
            className="Reset"
          >
            <div className="Reset__icon">
              <img src="reset.svg" />
            </div>
            <strong>Reset</strong>
          </div>
        )}
      </div>

      <div className="Popout" ref={popoutRef}>
        {filteredItem(items).map((item) => (
          <>
            <div
              style={{ backgroundImage: `url(${item.imageUrl})` }}
              className="Popout__hero"
            >
              <div className="Popout__hero--title">
                <h1 className="title--hero">{item.title}</h1>
                <strong>{item.author}</strong>
              </div>
            </div>
            <div className="Popout__content">
              <strong>Publisher summary</strong>
              <p>{item.publisherSummary}</p>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
