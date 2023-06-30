import { useCallback, useState, useMemo } from "react"

type TOutput<DataType> = { items: DataType[], offset: number, setNext: () => void, setPrevious: () => void, noOfPages: number, jumpToOffset: (N: number) => void }
function usePagination<DataType>({ data, limit = 10 }: { data: DataType[], limit?: number }): TOutput<DataType> {
  const [offset, setOffset] = useState<number>(0)

  const noOfPages = useMemo(() => {
    return Math.ceil(data.length / limit)
  }, [data, limit])

  const setNext = useCallback(() => {
    setOffset(prevOffset => prevOffset === noOfPages - 1 ? prevOffset : prevOffset + 1)
  }, [noOfPages])

  const setPrevious = useCallback(() => {
    setOffset(prevOffset => prevOffset === 0 ? prevOffset : prevOffset - 1)
  }, [noOfPages])

  const jumpToOffset = useCallback((jumpOffset: number) => {
    if (jumpOffset >= 0 && jumpOffset < noOfPages)
      setOffset(jumpOffset)
  }, [noOfPages])

  const items = (function() {
    const firstIndex = offset * limit
    return data.slice(firstIndex, firstIndex + limit)
  })()
  
  return { offset, setNext, jumpToOffset, setPrevious, noOfPages, items }
}

export default usePagination