export interface Todo {
  id: number
  todo: string
  isDone: boolean
}

export const initialState: Todo[] = []

export enum ActionType {
  Add,
  Remove,
  Done,
  Update,
  ChangeIndex,
}

export interface Add {
  type: ActionType.Add
  payload: string
}

export interface Remove {
  type: ActionType.Remove
  payload: number
}

export interface Done {
  type: ActionType.Done
  payload: number
}

export interface Update {
  type: ActionType.Update
  payload: { id: number; todo: string }
}

// export interface ChangeIndex {
//   type: ActionType.ChangeIndex
//   payload: number
// }

export type Actions = Add | Remove | Done | Update 
