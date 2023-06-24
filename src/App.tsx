import Container from "./components/Container"
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import DownArrow from './assets/triangle-down.svg' 
import UpArrow from './assets/triangle-up.svg'
import usePlayers from "./hooks/usePlayers"
import { getAge } from "./utils/helpers"

function App() {
  const { players, loading, error } = usePlayers()

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
              <input type="text" placeholder="Search by name" className="w-full h-full text-gray-800 text-base font-normal placeholder:text-gray-600 placeholder:font-light focus:outline-none" />
            </Container>
          </header>

          <section className="flex-table" role="table" aria-label="Cricketers">
            
            {/* table head */}
            <div className="w-full bg-[#fafafa] h-10 shrink-0 sticky left-0 top-26">
              <Container className="h-full f-table-row">
                <div className="f-table-cell f-table-head min-w-[20rem]">
                  <span>Name</span>
                  <span className="ml-1">
                    <img className="w-2 h-auto" src={DownArrow} alt="" />
                  </span>
                </div>
                <div className="f-table-cell f-table-head">
                  <span>Type</span>
                  <span className="ml-1">
                    <img className="w-2 h-auto" src={UpArrow} alt="" />
                  </span>
                </div>
                <div className="f-table-cell f-table-head">Points</div>
                <div className="f-table-cell f-table-head">Rank</div>
                <div className="f-table-cell f-table-head">Age</div>
              </Container>
            </div>
            
            {/* table body */}
            <SimpleBar className="flex-1 w-full h-[calc(100vh-12rem)] outline-none">
              <div className="w-full">

                {players.map((player, index) => (
                  <div key={index+1} className="h-14 shadow-sm">
                    <Container className="h-full f-table-row">
                      <div className="f-table-cell min-w-[20rem]">
                        <button className="text-blue text-base font-medium">{player?.name ?? "—"}</button>
                      </div>
                      <div className="f-table-cell">{player?.type ?? "—"}</div>
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
