import { TPlayer } from "./getPlayers";
import { Dictionary, ESortKeys, ESortOrder, IState } from "./types";

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
  
  let __sortedArr = players,
    __search = search.trim().toLowerCase()
  
  if (__search) {
    __sortedArr = players.filter((player: any) => player?.name?.toLowerCase().indexOf(__search) > -1 || player?.type?.toLowerCase()?.indexOf(__search) > -1)
  }
  
  // *Note: reversing the order for age
  let __order = key !== ESortKeys.Age
    ? order
    : order === ESortOrder.ASC
      ? ESortOrder.DESC
      : ESortOrder.ASC
  
  let mappedKey = key === ESortKeys.Age ? 'dob' : key.toLowerCase()
      
  __sortedArr = __sortedArr.sort((aPlayer: any, bPlayer: any) => {
    
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

  return __sortedArr
}

export function arabicToRoman(number: number):string {
  let roman = "";
  const romanNumList: Dictionary = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XV: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  let a;
  if (number < 1 || number > 3999)
    return "Enter a number between 1 and 3999";
  else {
    for (let key in romanNumList) {
      a = Math.floor(number / romanNumList[key]);
      if (a >= 0) {
        for (let i = 0; i < a; i++) {
          roman += key;
        }
      }
      number = number % romanNumList[key];
    }
  }

  return roman;
}

export function beautifyDate(timestamp: number): string {
  const date = new Date(timestamp)
  const __inFormat = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
  return __inFormat
}

export function getPlayerSuggestions(players: TPlayer[], player: TPlayer) {
  const { type, id } = player
  return players.filter(oPlayer => oPlayer.type === type && oPlayer.id !== id)
}

export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => i)
}