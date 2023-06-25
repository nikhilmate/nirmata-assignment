import { ESortKeys, ESortOrder, IState } from "../utils/types";
import DownArrow from '../assets/icons/triangle-down.svg' 
import UpArrow from '../assets/icons/triangle-up.svg'

function Arrow({ filters, keyToMatch }: { filters: IState; keyToMatch: keyof typeof ESortKeys; }) {
  const { column: { key, order }} = filters
  if (keyToMatch === key) {
    return (
      <span className="ml-1">
        <img className="w-2 h-auto" src={order === ESortOrder.ASC ? UpArrow : DownArrow} alt="" />
      </span>
    )
  }
  return null
}

export default Arrow