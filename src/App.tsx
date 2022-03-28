import React from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import "./App.css"
import InputField from "./components/InputField"
import TodoList from "./components/TodoList"
import { initialState } from "./utils/models"
import { addTodo, Context, doneTodo, reducer } from "./utils/reducer"

const App: React.FC = () => {
  const [todo, setTodo] = React.useState<string>("")
  const [state, dispatch] = React.useReducer(reducer, initialState)

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()

    if (todo) {
      dispatch(addTodo(todo))
      setTodo("")
    }
  }

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result

    if (!destination) return
    if (destination.droppableId === source.droppableId) return

    dispatch(doneTodo(parseInt(result.draggableId, 10)))
  }

  return (
    <>
      <Context.Provider value={{ state, dispatch }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="App">
            <span className="heading">Taskify</span>
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
            <TodoList />
          </div>
        </DragDropContext>
      </Context.Provider>
    </>
  )
}

export default App
