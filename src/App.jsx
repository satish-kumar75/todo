import { useState } from "react";
import { MdEdit, MdDeleteForever } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import { addTask, removeTask, updateTask } from "./store/slice/todoSlice";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const { todo } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      dispatch(addTask(inputValue));
      setInputValue("");
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleRemove = (id) => {
    dispatch(removeTask(id));
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditedText(text);
  };

  const handleUpdate = () => {
    dispatch(updateTask({ id: editId, text: editedText }));
    setEditId(null);
    setEditedText("");
  };
  const handleUpdateKey = (e) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-800">
      <div>
        <h1 className="font-semibold text-4xl mb-4 text-center text-white">
          Todo App
        </h1>
        <div className="flex gap-3">
          <input
            className="outline-none border border-purple-700 rounded-lg p-3"
            type="text"
            placeholder="Enter task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <button
            className="outline-none border-none bg-purple-700 hover:bg-purple-800 text-white transition duration-300 cursor-pointer px-4 py-2 rounded-lg"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>

        {todo.length <= 0 && (
          <p className="bg-purple-100 p-2 mt-3 text-center rounded-lg font-bold">
            You have no task.
          </p>
        )}

        {todo.length > 0 && (
          <ul className="bg-purple-100 p-2 mt-3 rounded-lg flex flex-col gap-2">
            {todo.map((item) => (
              <li
                key={item.id}
                className="bg-purple-300 p-2 rounded-lg flex justify-between items-center"
              >
                {editId === item.id ? (
                  <>
                    <input
                      className="outline-none border border-purple-700 rounded-lg p-1 text-black"
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      onKeyUp={handleUpdateKey}
                    />
                    <button
                      className="outline-none border-none bg-green-500 hover:bg-green-600 text-white transition duration-300 cursor-pointer px-2 py-1 rounded-lg"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                  </>
                ) : (
                  <>
                    {item.text}{" "}
                    <div className="flex items-center gap-3">
                      <MdEdit
                        className="inline-block bg-blue-500 h-7 w-7 rounded-full text-center text-white hover:bg-blue-600 transition duration-300 cursor-pointer"
                        onClick={() => handleEdit(item.id, item.text)}
                      />

                      <MdDeleteForever
                        className="inline-block bg-red-500 h-7 w-7 rounded-full text-center text-red-100 hover:bg-red-600 transition duration-300 cursor-pointer"
                        onClick={() => handleRemove(item.id)}
                      />
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
