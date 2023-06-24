import { useCallback, useState, useEffect } from "react"
import getPlayers, { TPlayer } from "../utils/getPlayers"

function usePlayers() {
  const [data, setData] = useState<TPlayer[] | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string|undefined>(undefined)

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true)
      const players = await getPlayers()
      setTimeout(() => {
        setData(players)
        setLoading(false)
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        console.log('Unexpected error', error);
      }
    }
  }, [getPlayers])

  useEffect(() => {
    fetchUsers()
  }, [])
  
  return { players:data, loading, error, fetchUsers }
}

export default usePlayers