import Container from "../components/Container"
import Header from "../components/Header"
import Status from "../components/Status"
import usePlayers from "../hooks/usePlayers"
import { useRoute, Link } from 'wouter'
import BackArrow from '../assets/icons/left-arrow.svg' 
import Badge from '../assets/icons/badge.svg' 
import { arabicToRoman, beautifyDate, getAge, getPlayerSuggestions } from "../utils/helpers"
import { EType } from "../utils/types"

function Player() {
  const [_, params] = useRoute('/:playerId')
  const { playerId } = params || { playerId: '' }
  
  const { players, loading, error } = usePlayers()

  const player = Array.isArray(players) && players.length
    ? players.find(player => player.id === playerId)
    : undefined
  
  const suggestions = players && player ? getPlayerSuggestions(players, player) : null
  
  return (
    <>
      <Header />
      
      {error ? <Status status={error || 'Something went wrong. Please try again.'} /> : null}
      
      {loading ? <Status status={'Loading...'} /> : null}

      {!playerId || (players && !loading && !player ? <Status status="Player not found." /> : null)}

      {player ? (
        <section>
          <Container>
            <div className="mt-8">
              <Link href={`/`} className="flex text-lg font-medium text-blue place-items-center gap-x-4">
                <span>
                  <img className="w-5 h-auto" src={BackArrow} alt="" />
                </span>
                <span>Back to cricketers</span>
              </Link>
            </div>

            <div className="mt-8">
              <div className="flex flex-col pb-10 border-b border-gray-300 md:flex-row gap-x-8">
                <div className="flex flex-col items-center h-auto p-4 pt-6 bg-yellow-300 border rounded-lg shadow-md shrink-0">
                  <p className="text-[6rem] leading-[0.8] text-yellow font-medium font-[fantasy]">{ player?.rank ? arabicToRoman(player.rank) : 'NA' }</p>
                  <div className="w-full mt-2">
                    <img className="w-full h-auto mx-auto min-w-[7.5rem] max-w-[7.5rem]" src={Badge} alt="" />
                  </div>
                </div>
                <div>
                  <h1 className="text-[3rem] font-medium text-gray-600">{player.name ? player.name : '—'}</h1>
                  <p className="text-xl">
                    <span className="text-gray-500">DOB:</span>&nbsp;
                    {
                      player.dob ?
                        <>
                          <span>{beautifyDate(player.dob)}</span>&nbsp;
                          <span className="text-blue">({ getAge(player?.dob)} Y)</span>
                        </>
                      : "—"}
                  </p>
                  <p className="mt-3 text-xl">
                    <span className="text-gray-500">Type:</span>&nbsp;
                    <span>{player.type ? EType[player.type] : '—'}</span>
                  </p>
                  <p className="mt-3 text-xl">
                    <span className="text-gray-500">Points:</span>&nbsp;
                    <span>{player.points ? player.points : '—'}</span>
                  </p>
                </div>
              </div>

              {player.description ? 
                <div className="pb-6 mt-6 border-b border-gray-300">
                  <p className="text-xl text-gray-800">{ player.description }</p>
                </div>
              : null}
            </div>

            {suggestions && suggestions.length ?
              <div className="mt-8">
                <p className="text-xl text-gray-600 text-medium">More {player && player.type ? EType[player.type] : 'player'}s...</p>
                <div className="grid grid-rows-1 pb-10 mt-6 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
                  {suggestions.map(sPlayer => (
                    <Link href={`/${sPlayer.id}`} key={sPlayer.id} className="flex p-4 pt-6 border border-gray-300 rounded-lg shadow-md cursor-pointer shrink-0 gap-x-4">
                      <div className="flex flex-col items-center h-auto shrink-0">
                        <p className="text-[2.5rem] leading-[0.8] text-yellow font-medium font-[fantasy]">{ sPlayer?.rank ? arabicToRoman(sPlayer.rank) : 'NA' }</p>
                        <div className="w-full mt-1">
                          <img className="w-full h-auto mx-auto min-w-[4rem] max-w-[4rem]" src={Badge} alt="" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-[1.5rem] font-medium text-gray-600">{sPlayer.name ? sPlayer.name : '—'}</h3>
                        <p>
                          <span className="text-gray-500">Points:</span>&nbsp;
                          <span>{sPlayer.points ? sPlayer.points : '—'}</span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              : null}
          </Container>
        </section>
      ) : null}
    </>
  )
}

export default Player