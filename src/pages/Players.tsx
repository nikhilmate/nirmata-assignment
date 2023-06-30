import { useMemo } from 'react'
import Container from "../components/Container"
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { getAge, getLocalStorage, sortPlayers } from "../utils/helpers"
import { EActions, ESortKeys, ESortOrder, EType } from "../utils/types"
import useFilters from "../hooks/useFilters"
import Arrow from "../components/Arrow"
import Status from "../components/Status"
import SearchBar from "../components/SearchBar"
import usePlayers from "../hooks/usePlayers"
import Header from "../components/Header"
import { Link } from 'wouter'
import usePagination from "../hooks/usePagination"
import { TPlayer } from "../utils/getPlayers"
import Pagination from "../components/Pagination"

function Players() {
  const { players, loading, error } = usePlayers()

  const { filters, setFilter } = useFilters({ localStore: getLocalStorage('filters') })

  const sortedPlayers = useMemo(() => {
    return sortPlayers(players, filters)
  }, [players, filters])
  
  const { offset, setNext, jumpToOffset, setPrevious, noOfPages, items } = usePagination<TPlayer>({ data: sortedPlayers })

  const columnClickHandler = (columnKey: keyof typeof ESortKeys) => {
    let { key, order } = filters.column
    if (key === columnKey) {
      order = order === ESortOrder.ASC ? ESortOrder.DESC : ESortOrder.ASC
    } else {
      order = ESortOrder.ASC
    }
    setFilter({ type: EActions.setStore, payload: Object.assign(filters, { column: { key: columnKey, order } })})
  }

  // console.log('sortedPlayers', sortedPlayers, filters)
  // console.log(offset, noOfPages, items)

  return (
    <>
      <Header />      

      {error ? <Status status={ error || 'Something went wrong. Please try again.' } /> : null}
      
      {loading ? <Status status={'Loading...'} /> : null}

      {players ? 
        <>
          <SearchBar filters={filters} setFilter={setFilter} />

          <section className="flex-table" role="table" aria-label="Cricketers">
            
            {/* table head */}
            <div className="w-full bg-[#fafafa] h-10 shrink-0 sticky left-0 top-26">
              <Container className="h-full f-table-row">
                <div className="f-table-cell f-table-head min-w-[10rem] md:min-w-[15rem] lg:min-w-[20rem] cursor-pointer" onClick={() => columnClickHandler(ESortKeys.Name)}>
                  <span>{ESortKeys.Name}</span>
                  <Arrow filters={filters} keyToMatch={ESortKeys.Name} />
                </div>
                <div className="cursor-pointer f-table-cell f-table-head" onClick={() => columnClickHandler(ESortKeys.Type)}>
                  <span>{ESortKeys.Type}</span>
                  <Arrow filters={filters} keyToMatch={ESortKeys.Type} />
                </div>
                <div className="cursor-pointer f-table-cell f-table-head" onClick={() => columnClickHandler(ESortKeys.Points)}>
                  <span>{ESortKeys.Points}</span>
                  <Arrow filters={filters} keyToMatch={ESortKeys.Points} />
                </div>
                <div className="cursor-pointer f-table-cell f-table-head" onClick={() => columnClickHandler(ESortKeys.Rank)}>
                  <span>{ESortKeys.Rank}</span>
                  <Arrow filters={filters} keyToMatch={ESortKeys.Rank} />
                </div>
                <div className="cursor-pointer f-table-cell f-table-head" onClick={() => columnClickHandler(ESortKeys.Age)}>
                  <span>{ESortKeys.Age}</span>
                  <Arrow filters={filters} keyToMatch={ESortKeys.Age} />
                </div>
              </Container>
            </div>
            
            {/* table body */}
            <SimpleBar className="flex-1 w-full h-[calc(100vh-12rem)] outline-none">
              <div className="w-full">

                {!sortedPlayers.length && players.length
                  ? <Status status={'No matching data found.'} />
                  : null}

                {items.map((player, index) => (
                  <div key={player?.name ? player.name : index+1} className="shadow-row h-14">
                    <Container className="h-full f-table-row">
                      <div className="f-table-cell min-w-[10rem] md:min-w-[15rem] lg:min-w-[20rem]">
                        {player?.name ?  
                          player.id ?
                            <Link href={`/${player.id}`} className="text-base font-medium text-blue">
                              {player.name}
                            </Link>
                            : player.name
                        : "—"}
                      </div>
                      <div className="f-table-cell">{player?.type ? EType[player.type] : "—"}</div>
                      <div className="f-table-cell">{player?.points ? player.points : "—"}</div>
                      <div className="f-table-cell">{player?.rank ? player.rank : "—"}</div>
                      <div className="f-table-cell">{player?.dob ? getAge(player?.dob) : "—"}</div>
                    </Container>
                  </div>
                ))}
              </div>
            </SimpleBar>
          </section>

          <footer className="h-12">
            <Container className="flex h-full place-items-center gap-x-2">
              <Pagination
                offset={offset}
                setNext={setNext}
                jumpToOffset={jumpToOffset}
                setPrevious={setPrevious}
                noOfPages={noOfPages}
              />
            </Container>
          </footer>
        </>
      : null}
    </>
  )
}

export default Players
