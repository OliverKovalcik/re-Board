import * as React from 'react'

export const useFetch = (fn1, id) => {
  const [error, setError] = React.useState()
  const [isLoading, setIsLoading] = React.useState(false)
  const [data, setData] = React.useState([])
  const [reload, setReload] = React.useState(false)
  const reloadPage = () => setReload(!reload)
  React.useEffect(() => {
    try {
      setIsLoading(true)
      const fetchData = async () => {
        const dataFetch = await fn1(id)
        setData(dataFetch)
      }
      fetchData()
    } catch (e) {
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }, [fn1, id, reload])
  return {
    data,
    error,
    isLoading,
    reloadPage,
  }
}
