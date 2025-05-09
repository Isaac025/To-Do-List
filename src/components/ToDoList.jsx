import React from "react";
import { SlNote } from "react-icons/sl";
import { FiSmile } from "react-icons/fi";
import { useState } from "react";
import { MdOutlineDangerous } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";

const ToDoList = () => {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = (e) => {
    e.preventDefault();
    console.log(task);

    if (!task.trim()) {
      //display error message
      setError("please fill all fields");
      return;
    }

    setTasks([...tasks, { task, completed: false }]);
    setTask("");
    setError("");
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(tasks[index].task);
  };

  const saveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].task = editText;
    setTasks(updatedTasks);
    setEditingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return task.completed;
    } else if (filter === "active") {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="max-w-[420px] w-full mt-[40px] mx-auto py-[1.5rem] px-[2rem] bg-white rounded-[12px] shadow-lg shadow-[ #ddd2e30a]">
      <div className="flex items-center gap-3 text-[2rem] font-[800] mb-[1.7rem] text-center tracking-[-0.04em] text-accent">
        <SlNote size={35} />
        <h1>To-Do-List</h1>
      </div>
      <form
        className="flex gap-[0.5rem] mb-[1.5rem]"
        onSubmit={addTask}
        autoComplete="off"
      >
        <input
          type="text"
          placeholder="Add a new task..."
          maxLength="150"
          value={task}
          required
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 px-[0.9rem] py-[0.5rem] border border-[#e2e8f0] rounded-[8px] text-[1rem] transition-border duration-200"
        />
        <p className="text-sm text-red-500">{error}</p>
        <button type="submit" title="Add Task">
          +
        </button>
      </form>
      <div>
        <button
          className={`btn  ${filter === "all" ? "btn-neutral" : "btn-active"}`}
          data-filter="all"
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`btn ${
            filter === "active" ? "btn-neutral" : "btn-active"
          } mx-3`}
          data-filter="active"
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`btn ${
            filter === "completed" ? "btn-neutral" : "btn-active"
          }`}
          data-filter="completed"
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <ul></ul>
      {tasks.length === 0 && (
        <div className="flex items-center mt-4">
          <p>No tasks here</p>
          <FiSmile size={25} />
        </div>
      )}
      {filteredTasks.length > 0 ? (
        <div className="myform mt-4">
          {filteredTasks.map((ts, index) => {
            const originalIndex = tasks.findIndex(
              (t) => t.task === ts.task && t.completed === ts.completed
            );
            return (
              <div
                key={originalIndex}
                className="flex items-center justify-between mb-3"
              >
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleComplete(originalIndex)}>
                    {ts.completed ? (
                      <FaCheckCircle color="#008000" />
                    ) : (
                      <FaRegCircle />
                    )}
                  </button>
                  {editingIndex === originalIndex ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="border border-[#e2e8f0] rounded-[8px] transition-border duration-200 px-2 py-1"
                      autofocus
                    />
                  ) : (
                    <p
                      key={index}
                      className={
                        ts.completed ? "line-through text-gray-400" : ""
                      }
                    >
                      {ts.task}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {editingIndex === originalIndex ? (
                    <div>
                      <button
                        onClick={() => saveEdit(originalIndex)}
                        className="text-green-500 mr-3"
                      >
                        Save
                      </button>

                      <button onClick={cancelEdit} className="text-red-500">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => startEditing(originalIndex)}
                        className="mr-3"
                      >
                        <FaPencil color="#008000" size={20} />
                      </button>
                      <button onClick={() => deleteTask(originalIndex)}>
                        <MdOutlineDangerous size={20} color="#ff0000" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        tasks.length > 0 && (
          <div className="flex items-center mt-4">
            <p>No tasks match this filter</p>
            <FiSmile size={25} />
          </div>
        )
      )}
    </div>
  );
};

export default ToDoList;
