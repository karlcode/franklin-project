import React, { useEffect, useState } from 'react'
import './App.css'
import './common.css'

import { BookTab } from './BookTab'

export type Book = {
  author: string
  title: string
  publisherSummary: string
  imageUrl: string
}

const defaultBooks = [
  'Sapiens',
  'The Cancer Code',
  'The Metabolic Approach to Cancer',
]

function App() {
  const [books, setBooks] = useState<Book[]>()

  const [favoriteItems, setFavoriteItems] = useState(() => {
    const value = window.localStorage.getItem('favorites')

    return value !== null ? JSON.parse(value) : defaultBooks
  })

  useEffect(() => {
    fetch('books.json')
      .then((res) => res.json())
      .then((result) => {
        setBooks(result)
      })

    // Initial state
    if (!window.localStorage.getItem('favorites')) {
      window.localStorage.setItem('favorites', JSON.stringify(defaultBooks))
    }
  }, [])

  useEffect(() => {
    window.localStorage.getItem('favorites') &&
      window.localStorage.setItem('favorites', JSON.stringify(favoriteItems))
  }, [favoriteItems])

  return (
    <div className="App">
      {books ? (
        <BookTab
          items={books}
          favoriteItems={favoriteItems}
          setFavoriteItems={setFavoriteItems}
        />
      ) : (
        <div>Loading</div>
      )}
    </div>
  )
}

export default App
