import React from "react"
import { Draggable } from "react-beautiful-dnd"
import { Todo } from "../utils/models"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { MdDone } from "react-icons/md"
import "./styles.css"
import { doneTodo, editTodo, removeTodo, useAppContext } from "../utils/reducer"

interface Props {
  todo: Todo
  index: number
}

const SingleTodo: React.FC<Props> = ({ todo, index }) => {
  const [edit, setEdit] = React.useState<boolean>(false)
  const [editTodoString, setEditTodoString] = React.useState<string>(todo.todo)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { dispatch } = useAppContext()

  function handleEdit(e: React.FormEvent, id: number) {
    e.preventDefault()
    setEdit(!edit)
    edit && dispatch(editTodo(id, editTodoString))
  }

  function handleDelete(id: number) {
    dispatch(removeTodo(id))
  }

  function handleDone(id: number) {
    dispatch(doneTodo(id))
  }

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  return (
    <>
      <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided, snapshot) => (
          <form
            className={`todos__single ${snapshot.isDragging && "drag"}`}
            onSubmit={(e) => handleEdit(e, todo.id)}
            onDoubleClick={() => handleDone(todo.id)}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {edit ? (
              <input
                ref={inputRef}
                className="todos__single__text"
                type="input"
                value={editTodoString}
                onChange={(e) => setEditTodoString(e.target.value)}
              />
            ) : (
              <span
                className="todos__single__text"
                style={{
                  textDecoration: todo.isDone ? "line-through" : "none",
                }}
              >
                {todo.todo}
              </span>
            )}
            <div className="todos__single__icons">
              {!todo.isDone && (
                <span
                  className="todos__single__icon"
                  role="button"
                  onClick={(e) => handleEdit(e, todo.id)}
                >
                  <AiFillEdit />
                </span>
              )}
              <span
                className="todos__single__icon"
                role="button"
                onClick={() => handleDelete(todo.id)}
              >
                <AiFillDelete />
              </span>
              <span
                className="todos__single__icon"
                role="button"
                onClick={() => handleDone(todo.id)}
              >
                <MdDone />
              </span>
            </div>
          </form>
        )}
      </Draggable>
    </>
  )
}

export default SingleTodo
