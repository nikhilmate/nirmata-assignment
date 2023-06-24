export enum ESortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ESortKeys {
  Name = 'Name',
  Type = 'Type',
  Points = 'Points',
  Rank = 'Rank',
  Age = 'Age',
}

export enum EType {
  allRounder = 'All Rounder',
  bowler = 'Bowler',
  batsman = 'Batsman',
  wicketKeeper = 'Wicket Keeper',
  captain = 'Captain',
  coach = 'Coach',
  manager = 'Manager',
  substitute = 'Substitute',
}

export enum EActions {
  setStore = 'setStore',
  resetStore = 'resetStore'
}

export interface IFilter {
  key: keyof typeof ESortKeys;
  order: keyof typeof ESortOrder;
}

export interface IState {
  search: string;
  column: IFilter;
}

export type TAction = {
  type: keyof typeof EActions;
  payload: IState; // TODO: Need to fix the issue on partial type -> IState
}

// !WARNING: ONLY USE FOR TEMPERARY 
export type Dictionary = {
  [key: string]: any
}