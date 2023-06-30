import { EActions, IState, TAction } from "../utils/types"
import Container from "./Container"
import SearchIcon from '../assets/icons/search-icon.svg'
import CloseIcon from '../assets/icons/close-icon.svg'
import React from "react"

function SearchBar({ filters, setFilter }: { filters: IState, setFilter: React.Dispatch<TAction> }) {
  
  const changeInput = (value: string) => setFilter({ type: EActions.setStore, payload: Object.assign(filters, { search: value })})
  
  return (
    <header className="h-12 sticky left-0 top-14 shadow-[0px_2px_4px_rgba(0,0,0,0.06)] z-20">
      <Container className="flex items-stretch h-full gap-x-2">
        <span
          className={`inline-flex items-center ${!filters.search ? 'pointer-events-none' : 'cursor-pointer'}`}
          onMouseDown={() => changeInput('')}
        >
          <img className="w-4 h-4" src={filters.search ? CloseIcon : SearchIcon} alt="" />
        </span>
        <span>
          <input
            type="text"
            placeholder="Search by name and type"
            className="w-full h-full text-base font-normal text-gray-800 placeholder:text-gray-600 placeholder:font-light focus:outline-none"
            value={filters.search}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => changeInput(ev.target.value)}
          />
        </span>
      </Container>
    </header>
  )
}

export default SearchBar