import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../Navbar";
import { ThreeDots } from "react-loader-spinner";
import "./index.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    duedate: "",
    status: "Pending",
    priority: "Low",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [showErrMsg, setErrMsgStatus] = useState(false);
  const [showLoader, setLoaderStatus] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };
  
  const openModal = (task) => {
    if (task) {
      setNewTask({ ...task }); // Include task details for editing
      setIsEditing(true);
    } else {
      setNewTask({
        name: "",
        description: "",
        duedate: "",
        status: "Pending",
        priority: "Low",
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const addTask = async () => {
  
    const jwtToken = Cookies.get("jwt_token");
  
    const add_task_API = "https://task-tracker-jv34.onrender.com/tasks";
    const options = {
      method: "POST",
      headers: {
        "authorization": `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask), // Sending newTask without taskId
    };
    
    if(newTask.name !== "" && newTask.description !== "" && newTask.duedate !== ""){
      const response = await fetch(add_task_API, options);
      const data = await response.json();

      if (response.ok) {
        setIsModalOpen(false);
        getTasks();
      } else {
        alert(data.message);
      }
    }
    else{
      alert("Please, provide all the details")
    }
  };
  

  const updateTask = async () => {
    const jwtToken = Cookies.get("jwt_token");
    console.log(newTask);
    const update_task_API = `https://task-tracker-jv34.onrender.com/tasks/${newTask.taskId}`;
    const options = {
      method: "PUT",
      headers: {
        authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask), // Sending newTask with taskId
    };
  
    try {
      const response = await fetch(update_task_API, options);
      const data = await response.json();
  
      if (response.ok) {
        const updatedTasks = tasks.map((task) =>
          task.taskId === newTask.taskId ? { ...task, ...newTask } : task
        );
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
        setIsModalOpen(false);
        getTasks()
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again later.");
    }
  };
  
  
  const deleteTask = async () => {
    const jwtToken = Cookies.get("jwt_token");

    // API endpoint to delete the task
    const delete_task_API = `https://task-tracker-jv34.onrender.com/tasks/${taskToDelete.taskId}`;
    const options = {
      method: "DELETE", // Use DELETE method
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(delete_task_API, options);

      if (response.ok) {
        // Update the local state after successful deletion
        const updatedTasks = tasks.filter((task) => task.taskId !== taskToDelete.taskId);
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
        setIsDeleteConfirmOpen(false); // Close the delete confirmation modal
        setTaskToDelete(null); // Reset the task to delete
        getTasks()
      } else {
        const data = await response.json();
        alert(data.message); // Show an error message if the deletion fails
      }
      } catch (error) {
        alert("Something went wrong. Please try again later.");
      }
    };

  const openDeleteConfirm = (task) => {
    setTaskToDelete(task);
    setIsDeleteConfirmOpen(true);
  };

  const getTasks = async () => {
    setErrMsgStatus(false);
    setErrMsg("");
    setLoaderStatus(true);

    const jwtToken = Cookies.get("jwt_token");
    const API_URL = "https://task-tracker-jv34.onrender.com/tasks";
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(API_URL, options);
      const data = await response.json();

      if (response.ok) {
        setTasks(data);
        setFilteredTasks(data);
      } else {
        setErrMsg(data.message);
        setErrMsgStatus(true);
      }
    } catch (error) {
      setErrMsg("Something went wrong, please try again later.");
      setErrMsgStatus(true);
    } finally {
      setLoaderStatus(false);
    }
  };

  const handleFilterChange = (e) => {
    const status = e.target.value;
    setFilterStatus(status);

    if (status === "All") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === status));
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="main">
      <Navbar />
      <div className="home-container">
        <div className="new-task-filter-option-container">
          <button className="new-task-btn" onClick={() => openModal()}>
            New Task
          </button>

          <select value={filterStatus} className="filter-options" onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {showLoader ? (
          <div className="loader-container">
            <span className="loader">
              <ThreeDots />
            </span>
          </div>
        ) : showErrMsg ? (
          <div className="err-msg-container">
            <p className="err-msg" >{errMsg}</p>
          </div>

          
        ) : (
          <div className="task-card-container">
            {filteredTasks.map((task) => (
              <div key={task.taskId} className="task-card">
                <h3>{task.name}</h3>
                <p>{task.description}</p>
                <p
                  className={`due-date ${
                    new Date(task.dueDate) < new Date() ? "overdue" : ""
                  }`}
                >
                  Due Date: {task.dueDate}
                </p>
                <div className="task-controls">
                  <div>
                    <p>
                    <span className="span-el">Status:</span>
                      {task.status}
                    </p>
                  </div>
                  <div>
                    
                    <p> <span className="span-el">Priority:</span> {task.priority} </p>
                  </div>
                </div>
                <button className={`edit-btn ${task.status === "Completed" ? "disabled" : ""}`} 
                        onClick={() => openModal(task)} disabled={task.status === "Completed"}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => openDeleteConfirm(task)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2 className="add-edit-heading">{isEditing ? "Edit Task" : "Add New Task"}</h2>
              <input
                type="text"
                name="name"
                placeholder="Task Name"
                value={newTask.name}
                onChange={handleInputChange}
              />
              <textarea
                name="description"
                placeholder="Task Description"
                value={newTask.description}
                onChange={handleInputChange}
              ></textarea>
              <input
                type="date"
                name="duedate"
                value={newTask.duedate}
                placeholder="dd-mm-yyyy"
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]} // Disable past dates
              />
              <select
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <select
                name="priority"
                value={newTask.priority}
                onChange={handleInputChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <button
                onClick={isEditing ? updateTask : addTask} className="add-update-btn"
              >
                {isEditing ? "Update Task" : "Add Task"}
              </button>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        )}

        {isDeleteConfirmOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2 className="delete-confirmation-msg">Are you sure you want to delete this task?</h2>
              <div className="delete-confirmation-btn-container">
                <button className="delete-yes-btn" onClick={deleteTask}>Yes</button>
                <button className="delete-no-btn" onClick={() => setIsDeleteConfirmOpen(false)}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;  