import React from 'react'
import { getBoards } from '../utils/api'

export const useFetch = () => {
  const [status, setStatus] = React.useState('loading')
  const [boards, setBoards] = React.useState([])
  const [error, setError] = React.useState()
  const [isLoading, setIsLoading] = React.useState(false)

  const [initialPage, setInitialPage] = React.useState(false)

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getBoards()
        setBoards(data)
        if (data.length === 0) {
          setInitialPage(true)
        } else {
          setInitialPage(false)
        }
      }

      fetchData()
    } catch (e) {
      // do nothing
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    boards,
    error,
    isLoading,
    initialPage,
    setIsLoading,
    setInitialPage,
  }
}
