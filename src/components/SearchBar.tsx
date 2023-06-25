import { EActions, IState, TAction } from "../utils/types"
import Container from "./Container"

function SearchBar({ filters, setFilter }: { filters: IState, setFilter: React.Dispatch<TAction> }) {
  return (
    <header className="h-12 sticky left-0 top-14 shadow-[0px_2px_4px_rgba(0,0,0,0.06)] z-20">
      <Container className="flex h-full">
        <input
          type="text"
          placeholder="Search by name and type"
          className="w-full h-full text-base font-normal text-gray-800 placeholder:text-gray-600 placeholder:font-light focus:outline-none"
          value={filters.search}
          onChange={(ev) => setFilter({ type: EActions.setStore, payload: Object.assign(filters, { search: ev.target.value })})}
        />
      </Container>
    </header>
  )
}

export default SearchBar