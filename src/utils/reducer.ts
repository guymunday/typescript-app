import React from "react"
import {
  Actions,
  ActionType,
  Add,
  Done,
  initialState,
  Remove,
  Todo,
  Update,
} from "./models"

export function reducer(state: Todo[], action: Actions) {
  switch (action.type) {
    case ActionType.Add:
      return [
        ...state,
        {
          id: Date.now(),
          todo: action.payload,
          isDone: false,
        },
      ]
    case ActionType.Remove:
      return state.filter((todo) => todo.id !== action.payload)
    case ActionType.Done:
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      )
    case ActionType.Update:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, todo: action.payload.todo }
          : todo
      )
    // case ActionType.ChangeIndex:
    //   return state.map((todo) => ({ ...todo, index: action.payload }))
    default:
      return state
  }
}

export const addTodo = (todo: string): Add => ({
  type: ActionType.Add,
  payload: todo,
})

export const removeTodo = (id: number): Remove => ({
  type: ActionType.Remove,
  payload: id,
})

export const doneTodo = (id: number): Done => ({
  type: ActionType.Done,
  payload: id,
})

export const editTodo = (id: number, todo: string): Update => ({
  type: ActionType.Update,
  payload: { id, todo },
})

// export const changeIndexTodo = (index: number): ChangeIndex => ({
//   type: ActionType.ChangeIndex,
//   payload: index,
// })

export const Context = React.createContext<{
  state: Todo[]
  dispatch: React.Dispatch<Actions>
}>({
  state: initialState,
  dispatch: () => undefined,
})

export const useAppContext = () => React.useContext(Context)
