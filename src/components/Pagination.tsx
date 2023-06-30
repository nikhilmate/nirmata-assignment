import LeftArrow from '../assets/icons/left.svg'
import RightArrow from '../assets/icons/right.svg'
import { range } from "../utils/helpers"

function Pagination({ offset, setNext, jumpToOffset, setPrevious, noOfPages }: { offset: number, setNext: () => void, setPrevious: () => void, noOfPages: number, jumpToOffset: (N: number) => void }) {
  return (
    <>
      {noOfPages > 1 ? 
        <button tabIndex={offset <= 0 ? -1 : 0} onClick={setPrevious} className={`btn-icon ${offset <= 0 ? 'opacity-50 pointer-events-none' : ''}`}>
          <img src={LeftArrow} alt="" />
        </button>
        : null}
      {noOfPages > 0 ? 
        <>
          {[...range(0, noOfPages - 1)].map(page => 
            <button
              key={page}
              onClick={() => jumpToOffset(page)}
              className={`btn-icon ${page === offset ? 'text-black bg-[var(--light-blue)]' : ''}`}
            >
              {page + 1}
            </button>
          )}
        </>
      : null}
      {noOfPages > 1 ? 
        <button tabIndex={offset >= noOfPages - 1 ? -1 : 0} onClick={setNext} className={`btn-icon ${offset >= noOfPages - 1 ? 'opacity-50 pointer-events-none' : ''}`}>
          <img src={RightArrow} alt="" />
        </button>
      : null}
    </>
  )
}

export default Pagination