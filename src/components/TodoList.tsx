import React from "react"
import { Droppable } from "react-beautiful-dnd"
import SingleTodo from "./SingleTodo"
import "./styles.css"
import { useAppContext } from "../utils/reducer"

const TodoList: React.FC = () => {
  const { state } = useAppContext()
  return (
    <>
      <div className="container">
        <Droppable droppableId="active">
          {(provided, snapshot) => (
            <div
              className={`todos ${snapshot.isDraggingOver && "dragactive"}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Active Tasks</span>
              {state.map(
                (todo, index) =>
                  !todo.isDone && (
                    <SingleTodo key={todo.id} todo={todo} index={index} />
                  )
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="completed">
          {(provided, snapshot) => (
            <div
              className={`todos remove ${
                snapshot.isDraggingOver && "dragcomplete"
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Completed Tasks</span>
              {state.map(
                (todo, index) =>
                  todo.isDone && (
                    <SingleTodo key={todo.id} todo={todo} index={index} />
                  )
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  )
}

export default TodoList
