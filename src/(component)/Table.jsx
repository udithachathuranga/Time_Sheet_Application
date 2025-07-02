'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';

function Table({ name, tasks, setShowDescription, showDescription, isEnableAddTask, currentProjectId, userId, setCurrentTask }) {
  const [newRow, setNewRow] = useState();
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState();
  const [assigns, setAssigns] = useState([]);
  const [dueDate, setDueDate] = useState();
  const [priority, setPriority] = useState();
  const [taskStatusId, setTaskStatusId] = useState();
  const [timeEstimate, setTimeEstimate] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [usersInProject, setUsersInProject] = useState();
  const [isJobDropdownOpen, setIsJobDropdownOpen] = React.useState(false);

  const router = useRouter();
  const rowRef = useRef();

  useEffect(() => {
    console.log("Opened Project: ", currentProjectId);
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/users_in_project?project_id=${currentProjectId}`);
        if (!res.ok) throw new Error("Failed to fetch users");
        const users = await res.json();
        setUsersInProject(users);
      } catch (err) {
        console.error("Error fetching users:", err);
        return [];
      }
    }
    fetchUsers();
    console.log("taskList: ", tasks)
  }, [currentProjectId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rowRef.current && !rowRef.current.contains(event.target)) {
        setNewRow(false);
      }
    };
    if (newRow) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [newRow, setNewRow]);

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      //create task
      const res = await fetch('/api/newtask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          t_title: taskTitle,
          t_description: "",
          due_date: new Date(dueDate),
          time_estimate: parseInt(timeEstimate, 10),
          priority: parseInt(priority, 10),
          task_status_id: taskStatusId,
          p_id: currentProjectId,
          added_by_id: userId,
          assigns
        }),
      })
      if (res.ok) {
        alert("task created successfully");
      } else {
        const errorData = await res.json();
        console.error("Error creating task:", errorData);
        alert("Failed to create task");
      }
    }
  };

  // Helper to handle checkbox changes for user selection
  const handleUserSelect = (user, checked) => {
    setSelectedUsers(prev =>
      checked
        ? [...(prev || []), user]
        : (prev || []).filter(u => u !== user)
    );
  };

  return (
    <div className=" mb-3 rounded-lg bg-gray-200 dark:bg-gray-800 p-5">
      <div className="bg-gray-300 dark:bg-gray-700 rounded-full w-40">
        <h1 className="text-2xl mb-3 ml-4 px-1 py-1">{name}</h1>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Task
              </th>
              <th scope="col" className="px-6 py-3">
                Assigns
              </th>
              <th scope="col" className="px-6 py-3">
                Due date
              </th>
              <th scope="col" className="px-6 py-3">
                Priority
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Time Estimation
              </th>
            </tr>
          </thead>
          <tbody>

            {tasks?.map((task, index) => (
              <tr
                onClick={() => { setShowDescription(!showDescription); setCurrentTask(task); }}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 cursor-pointer hover:bg-gray-300">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {task.t_title}
                </th>
                <td className="px-6 py-4">
                  {task.assigns?.join(', ')}
                </td>

                <td className="px-6 py-4">
                  {new Date(task.due_date).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  {task.priority}
                </td>
                <td className="px-6 py-4">
                  {{
                    '1': 'Open',
                    '2': 'On-Going',
                    '3': 'Done'
                  }[task.task_status_id] || 'Unknown'}
                </td>

                <td className="px-6 py-4">
                  {task.time_estimate}
                </td>
              </tr>
            ))}

            {newRow &&
              <tr
                onKeyPress={handleKeyPress}
                ref={rowRef}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 cursor-pointer hover:bg-gray-300">
                {/* Task Name */}
                <td className="px-4 py-2">
                  <input
                    type="text"
                    id="taskTitle"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                  />
                </td>

                {/* Assign Dropdown */}
                <td className="px-4 py-2 relative">
                  <button
                    type="button"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 text-left"
                    onClick={() => setIsJobDropdownOpen(!isJobDropdownOpen)}
                  >
                    {assigns.length > 0 ? `${assigns.length} selected` : "Add User"}
                    <span className="ml-1 float-right">▼</span>
                  </button>

                  {isJobDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                      <div className="p-2">
                        {usersInProject.map((user, index) => (
                          <div key={index} className="px-3 py-1.5 hover:bg-gray-100 rounded text-gray-800">
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="mr-2 h-4 w-4 accent-blue-600"
                                value={user.u_id}
                                checked={assigns.includes(user.u_id)}
                                onChange={(e) => {
                                  const userId = user.u_id;
                                  const updatedList = e.target.checked
                                    ? [...assigns, userId]
                                    : assigns.filter(id => id !== userId);
                                  setAssigns(updatedList);
                                }}
                              />
                              <span className="text-gray-800">{user.u_name}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </td>

                {/* Due Date */}
                <td className="px-4 py-2">
                  <input
                    type="date"
                    id="dueDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </td>

                {/* Priority */}
                <td className="px-4 py-2">
                  <input
                    type="number"
                    id="priority"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                </td>

                {/* Task Status */}
                <td className="px-4 py-2">
                  <select
                    id="taskStatusId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    value={taskStatusId}
                    onChange={(e) => setTaskStatusId(e.target.value)}
                    required
                  >
                    <option value="">Select status</option>
                    <option value="1">Open</option>
                    <option value="2">On-Going</option>
                    <option value="3">Done</option>
                  </select>
                </td>

                {/* Time Estimate */}
                <td className="px-4 py-2">
                  <input
                    type="number"
                    id="timeEstimate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    value={timeEstimate}
                    onChange={(e) => setTimeEstimate(e.target.value)}
                  />
                </td>
              </tr>
            }

            {isEnableAddTask && !newRow &&
              <tr onClick={() => { setNewRow(true); }} className=" dark:bg-gray-800 cursor-pointer hover:bg-gray-300">
                <th scope="row" className="flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                  </svg>
                  <span className="ms-3">Add a New Task</span>
                </th>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table