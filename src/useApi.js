import { useEffect, useState } from 'react'
import axios from 'axios'
import config from './config' 

const useApi = (path, mapResults = (result) => result) => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    setIsLoading(true)

    axios
      .get(`${config.apiBaseUrl}${path}`) 
      .then(response => setData(mapResults(response.data)))
      .catch(setError)
      .finally(() => setIsLoading(false))
  }, [path])

  return { data, isLoading, error }
}

export { useApi }
