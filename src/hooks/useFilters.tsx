import { useReducer, useEffect } from 'react'
import { EActions, ESortKeys, ESortOrder, IState, TAction } from "../utils/types"

const InitialState: IState = {
  search: '',
  column: {
    key: ESortKeys.Rank,
    order: ESortOrder.DESC
  }
}

function Reducer(state = InitialState, action: TAction) {
  switch (action.type) {
    case EActions.setStore:
      return {
        search: action?.payload?.search ?? state.search,
        column: action?.payload?.column ?? state.column,
      }
    case EActions.resetStore:
      return InitialState
    default:
      return state
  }
}

function useFilters({ localStore }: { localStore: IState | undefined }) {
  const [state, dispatch] = useReducer(Reducer, localStore ?? InitialState)
  
  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(state))
  }, [state])

  return { filters: state, setFilter: dispatch }
}

export default useFilters