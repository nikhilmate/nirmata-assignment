import { TPlayer } from "./getPlayers";
import { ESortKeys, ESortOrder, IState } from "./types";

export function getAge(timestamp: number):number {
  var today = new Date();
  var birthDate = new Date(timestamp);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function getLocalStorage(key: string) {
  const store = localStorage.getItem(key)
  const storeJson: IState | undefined = store ? JSON.parse(store) : undefined
  return storeJson
}

/* enum _MAP {
  Name = 'name',
  Type = 'type',
  Age = 'dob',
  Rank = 'rank',
  Points = 'points',
} */

// TODO: improve the type inference and logic (fix the map issue)
export function sortPlayers(players: any, filters: IState): TPlayer[] {
  if (!players) return []
  let { search, column: { key, order } } = filters
  
  let __order = key !== ESortKeys.Age ? order : order === ESortOrder.ASC ? ESortOrder.DESC : ESortOrder.ASC // *Note: reversing the order for age  
  let __sortedArr = players.sort((aPlayer: any, bPlayer: any) => {
    
    const mappedKey = key.toLowerCase()
    // & const playerKey = mappedKey as keyof TPlayer
    const aValue = aPlayer[mappedKey] ?? ""
    const bValue = bPlayer[mappedKey] ?? ""
    
    let output = 0
    if (['name', 'type'].includes(mappedKey)) {
      
      if (__order === ESortOrder.ASC) {
        output = aValue?.toLowerCase() > bValue?.toLowerCase() ? 1 : -1
      } else {
        output = aValue?.toLowerCase() < bValue?.toLowerCase() ? 1 : -1
      }

    } else {
      output = __order === ESortOrder.ASC ? aValue - bValue : bValue - aValue
    }

    return output
  })

  // console.log(__sortedArr, filters)

  let __search = search.trim().toLowerCase()
  if (__search) {
    __sortedArr = __sortedArr.filter((player: any) => player?.name?.toLowerCase().indexOf(__search) > -1 || player?.type?.toLowerCase()?.indexOf(__search) > -1)
  }

  return __sortedArr
}