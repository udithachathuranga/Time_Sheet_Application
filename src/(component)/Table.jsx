import React from 'react'

function Table({ name, data, setShowDescription, showDescription }) {
  return (
    <div class=" mb-3 rounded-lg bg-gray-200 dark:bg-gray-800 p-5">
      <div class="bg-gray-300 dark:bg-gray-700 rounded-full w-40">
        <h1 class="text-2xl mb-3 ml-4 px-1 py-1">Open</h1>
      </div>

      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Task
              </th>
              <th scope="col" class="px-6 py-3">
                Assigns
              </th>
              <th scope="col" class="px-6 py-3">
                Due date
              </th>
              <th scope="col" class="px-6 py-3">
                Priority
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Time Estimation
              </th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => setShowDescription(!showDescription)} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 cursor-pointer hover:bg-gray-300">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">
                Silver
              </td>
              <td class="px-6 py-4">
                Laptop
              </td>
              <td class="px-6 py-4">
                $2999
              </td>
              <td class="px-6 py-4">
                Silver
              </td>
              <td class="px-6 py-4">
                Silver
              </td>
            </tr>
            <tr onClick="" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 cursor-pointer hover:bg-gray-300">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">
                Silver
              </td>
              <td class="px-6 py-4">
                Laptop
              </td>
              <td class="px-6 py-4">
                $2999
              </td>
              <td class="px-6 py-4">
                Silver
              </td>
              <td class="px-6 py-4">
                Silver
              </td>
            </tr>
            <tr onClick="" class="bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-300">
              <th scope="row" class="flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                </svg>
                <span class="ms-3">Add a New Project</span>
              </th>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Table