import React, { use, useEffect } from 'react'
import { useState } from 'react';

function Table({ name, tasks, setShowDescription, showDescription }) {
  const [newRow, setNewRow] = useState();
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [task, setTask] = useState();
  const [assigns, setAssigns] = useState();
  const [dueDate, setDueDate] = useState();
  const [priority, setPriority] = useState();
  const [status, setStatus] = useState();
  const [timeEstimate, setTimeEstimate] = useState(0);

  useEffect(() => {
    //
  }, []);

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      //create task
      alert("hello");
      const res = await fetch('/api/newtask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          t_description: task,
          due_date: new Date(dueDate),
          time_estimate: parseInt(timeEstimate, 10),
          priority: parseInt(priority, 10),
          task_status_id: "1",
          p_id: "1",
          added_by_id: "2",
          //assigns users in user-task table
        }),
      })
      if (res.ok) {
        alert("task created successfully");
      }
    }
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




            <tr onClick={() => setShowDescription(!showDescription)} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 cursor-pointer hover:bg-gray-300">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple MacBook Pro 17"
              </th>
              <td claclassNamess="px-6 py-4">
                Silver
              </td>
              <td className="px-6 py-4">
                Laptop
              </td>
              <td className="px-6 py-4">
                $2999
              </td>
              <td className="px-6 py-4">
                Silver
              </td>
              <td className="px-6 py-4">
                Silver
              </td>
            </tr>

            {tasks?.map((task, index) => (
              <tr onClick={() => setShowDescription(!showDescription)} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 cursor-pointer hover:bg-gray-300">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {task.t_description}
              </th>
              <td claclassNamess="px-6 py-4">
                assigns
              </td>
              <td className="px-6 py-4">
                {task.due_date}
              </td>
              <td className="px-6 py-4">
                {task.priority}
              </td>
              <td className="px-6 py-4">
                {task.status}
              </td>
              <td className="px-6 py-4">
                {task.timeEstimate}
              </td>
            </tr>
            ))}


            {newRow &&
              <tr onKeyPress={handleKeyPress} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 cursor-pointer hover:bg-gray-300">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <input
                    type="text"
                    id="task"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                  />
                </th>
                <td className="px-6 py-4 z-10">
                  <div className="pt-10">
                    <button
                      onClick={() => setIsAssignOpen(!isAssignOpen)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="button"
                    >
                      Users
                    </button>

                    {isAssignOpen && (
                      <div className="absolute z-index mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                          <li>
                            <label className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                              <input
                                type="checkbox"
                                name="default-radio"
                                className="h-4 w-4 text-blue-600"
                                defaultChecked
                              />
                              <span className="ms-2">User 1</span>
                            </label>
                          </li>
                          <li>
                            <label className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                              <input
                                type="checkbox"
                                name="default-radio"
                                className="h-4 w-4 text-blue-600"
                              />
                              <span className="ms-2">User 2</span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    )}

                  </div>
                </td>

                <td className="px-6 py-4">
                  <input
                    type="date"
                    id="dueDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  //required
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    id="priority"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  //required
                  />
                </td>

                <td className="px-6 py-4 z-10">
                  <div className="pt-10">
                    <button
                      onClick={() => setIsStatusOpen(!isStatusOpen)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="button"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      Status
                    </button>

                    {isStatusOpen && (
                      <div className="absolute z-index mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                          <li>
                            <label className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                              <input
                                type="radio"
                                name="default-radio"
                                className="h-4 w-4 text-blue-600"
                              />
                              <span className="ms-2">open</span>
                            </label>
                          </li>
                          <li>
                            <label className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                              <input
                                type="radio"
                                name="default-radio"
                                className="h-4 w-4 text-blue-600"
                                defaultChecked
                              />
                              <span className="ms-2">in progress</span>
                            </label>
                          </li>
                          <li>
                            <label className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                              <input
                                type="radio"
                                name="default-radio"
                                className="h-4 w-4 text-blue-600"
                              />
                              <span className="ms-2">done</span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    )}

                  </div>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    id="timeEstimate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={timeEstimate}
                    onChange={(e) => setTimeEstimate(e.target.value)}
                  //required
                  />
                </td>
              </tr>}
            <tr onClick={() => { setNewRow(true); }} className=" dark:bg-gray-800 cursor-pointer hover:bg-gray-300">
              <th scope="row" className="flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                </svg>
                <span className="ms-3">Add a New Task</span>
              </th>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Table