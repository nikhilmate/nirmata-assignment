import Container from "./components/Container"
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import usePlayers from "./hooks/usePlayers"
import { getAge, getLocalStorage, sortPlayers } from "./utils/helpers"
import { EActions, ESortKeys, ESortOrder, EType } from "./utils/types"
import useFilters from "./hooks/useFilters"
import Arrow from "./components/Arrow"

function App() {
  const { players, loading, error } = usePlayers()

  const { filters, setFilter } = useFilters({ localStore: getLocalStorage('filters') })
  
  const columnClickHandler = (columnKey: keyof typeof ESortKeys) => {
    let { key, order } = filters.column
    if (key === columnKey) {
      order = order === ESortOrder.ASC ? ESortOrder.DESC : ESortOrder.ASC
    } else {
      order = ESortOrder.ASC
    }
    setFilter({ type: EActions.setStore, payload: Object.assign(filters, { column: { key: columnKey, order } })})
  }

  const sortedPlayers = sortPlayers(players, filters)

  console.log('sortedPlayers', sortedPlayers, filters)

  return (
    <main className="w-full min-h-screen">
      <header className="bg-blue h-14">
        <Container className="h-full place-items-center flex">
          <h1 className="text-white font-medium text-xl tracking-wide">Cricketers</h1>
        </Container>
      </header>

      {error ? <div className="w-full pt-20 pb-10 flex justify-center"><p className="text-lg font-medium text-black">{ error || 'Something went wrong. Please try again.' }</p></div> : null}
      
      {loading ? <div className="w-full pt-20 pb-10 flex justify-center"><p className="text-lg font-medium text-black">Loading...</p></div> : null}
      
      {players ? 
        <>
          <header className="h-12 sticky left-0 top-14 shadow-[0px_2px_4px_rgba(0,0,0,0.06)] z-20">
            <Container className="flex h-full">
              <input
                type="text"
                placeholder="Search by name"
                className="w-full h-full text-gray-800 text-base font-normal placeholder:text-gray-600 placeholder:font-light focus:outline-none"
                value={filters.search}
                onChange={(ev) => setFilter({ type: EActions.setStore, payload: Object.assign(filters, { search: ev.target.value })})}
              />
            </Container>
          </header>

          <section className="flex-table" role="table" aria-label="Cricketers">
            
            {/* table head */}
            <div className="w-full bg-[#fafafa] h-10 shrink-0 sticky left-0 top-26">
              <Container className="h-full f-table-row">
                <div className="f-table-cell f-table-head min-w-[20rem] cursor-pointer" onClick={() => columnClickHandler(ESortKeys.Name)}>
                  <span>{ESortKeys.Name}</span>
                  <Arrow filters={filters} keyToMatch={ESortKeys.Name} />
                </div>
                <div className="f-table-cell f-table-head cursor-pointer" onClick={() => columnClickHandler(ESortKeys.Type)}>
                  <span>{ESortKeys.Type}</span>
                  <Arrow filters={filters} keyToMatch={ESortKeys.Type} />
                </div>
                <div className="f-table-cell f-table-head cursor-pointer" onClick={() => columnClickHandler(ESortKeys.Points)}>
                  <span>{ESortKeys.Points}</span>
                  <Arrow filters={filters} keyToMatch={ESortKeys.Points} />
                </div>
                <div className="f-table-cell f-table-head cursor-pointer" onClick={() => columnClickHandler(ESortKeys.Rank)}>
                  <span>{ESortKeys.Rank}</span>
                  <Arrow filters={filters} keyToMatch={ESortKeys.Rank} />
                </div>
                <div className="f-table-cell f-table-head cursor-pointer" onClick={() => columnClickHandler(ESortKeys.Age)}>
                  <span>{ESortKeys.Age}</span>
                  <Arrow filters={filters} keyToMatch={ESortKeys.Age} />
                </div>
              </Container>
            </div>
            
            {/* table body */}
            <SimpleBar className="flex-1 w-full h-[calc(100vh-12rem)] outline-none">
              <div className="w-full">

                {sortedPlayers.map((player, index) => (
                  <div key={index+1} className="h-14 shadow-sm">
                    <Container className="h-full f-table-row">
                      <div className="f-table-cell min-w-[20rem]">
                        <button className="text-blue text-base font-medium">{player?.name ?? "—"}</button>
                      </div>
                      <div className="f-table-cell">{player?.type ? EType[player.type] : "—"}</div>
                      <div className="f-table-cell">{player?.points ?? "—"}</div>
                      <div className="f-table-cell">{player?.rank ?? "—"}</div>
                      <div className="f-table-cell">{player?.dob ? getAge(player?.dob) : "—"}</div>
                    </Container>
                  </div>
                ))}
                
              </div>
            </SimpleBar>
          </section>

          <footer className="h-12">
            <Container className="h-full place-items-center flex">

            </Container>
          </footer>
        </>
      : null}
    </main>
  )
}

export default App
