import axios from "axios";
import { useEffect, useState } from "react"
import { MdOutlineDone } from "react-icons/md"
import { IoClose } from "react-icons/io5"
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa6"
// import { IoClipboardOutline } from "react-icons/io5"; 
// import { set } from "mongoose"; 

function App() {
  const [newTodo, setnewTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editingTodo, seteditingTodo] = useState(null) 
  const [editedtext, seteditedText] = useState("")

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return
    try {
      const response = await axios.post("/api/todos", { text: newTodo })
      setTodos([...todos, response.data])
      setnewTodo("")
    } catch (error) {
      console.log("error adding todo:  ", error)
    }
  }

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos")
      console.log(response.data)
      setTodos(response.data)
    } catch (error) {
      console.log("error fetching todos: ", error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const startEditing = (todo) => {
    seteditingTodo(todo._id)
    seteditedText(todo.text)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">task manager</h1>

        <form
          onSubmit={addTodo}
          className="flex items-center gap-2 shadow-sm border border-gray-200 p-2 rounded-lg"
        >
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setnewTodo(e.target.value)}
            placeholder="add new Task"
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-300 text-white px-5 rounded-md font-medium"
          >
            +
          </button>
        </form>

        <div className="mt-6">
          {todos.length === 0 ? (
            <div></div>
          ) : (
            <div className="space-y-3">
              {todos.map((todo) => (
              
                <div key={todo._id}>
                  {editingTodo === todo._id ? (
                    <div className="flex items-center gap-x-3">
                      <input
                        className="flex-1 p-3 border rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                        type="text"
                        value={editedtext}
                        onChange={(e) => seteditedText(e.target.value)}
                      />
                      <div className="flex gap-x-2">
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-500 cursor-pointer">
                          <MdOutlineDone />
                        </button>
                        <button
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                          onClick={() => seteditingTodo(null)}
                        >
                          <IoClose />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-4">
                        <button
                          className={`h-6 w-6 border rounded-full flex items-center justify-center ${
                            todo.completed
                              ? "bg-green-500 border-green-500"
                              : "border-gray-300 hover:border-blue-400"
                          }`}
                        >
                          {todo.completed && <MdOutlineDone />}
                        </button>
                        <span>{todo.text}</span>
                      </div>

                      <div className="flex gap-x-2">
                        <button
                          className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50"
                          onClick={() => startEditing(todo)}
                        >
                          <MdModeEditOutline />
                        </button>
                        <button className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
