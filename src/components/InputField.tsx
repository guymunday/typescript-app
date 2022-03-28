import React from "react"
import "./styles.css"

interface Props {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
  handleAdd: (e: React.FormEvent) => void
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent) {
    handleAdd(e)
    inputRef.current?.blur()
  }

  return (
    <>
      <form className="input" onSubmit={(e) => handleSubmit(e)}>
        <input
          ref={inputRef}
          type="input"
          placeholder="Enter a task"
          className="input__box"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit" className="input__submit">
          Go
        </button>
      </form>
    </>
  )
}

export default InputField
