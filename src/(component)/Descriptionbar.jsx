import React from 'react'
import img from '../../public/loginPageImg.jpg'
import Image from 'next/image'

function Descriptionbar() {
  return (
    <aside id="separator-sidebar" class="fixed top-0 right-0 z-40 w-96 h-screen transition-transform -translate-x-full sm:translate-x-0 border-l border-black dark:border-white" aria-label="Sidebar">
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-200 dark:bg-gray-800">

        <div class="bg-gray-300 dark:bg-gray-700 rounded-lg text-gray-900  dark:text-white">
          <h1 class="text-3xl font-bold text-white text-center py-4 rounded-md text-center">
            Task Name
          </h1>
        </div>

        {/* all projects */}
        <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
          <li>

            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae aliquam iste, temporibus provident beatae, vitae nam eaque odio, illo ab earum natus dolor suscipit expedita unde minus in fugiat necessitatibus?</p>

          </li>
        </ul>

        {/* Assigns */}
        <div className="flex pt-4 mt-4 space-x-2 font-medium border-t border-gray-200 dark:border-gray-700">
          <Image src={img} alt="Rounded avatar" width={50} height={50} className="rounded-full" />
          <Image src={img} alt="Rounded avatar" width={50} height={50} className="rounded-full" />
          <Image src={img} alt="Rounded avatar" width={50} height={50} className="rounded-full" />
          <svg class="w-3.5 h-3.5 ml-4 mt-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
          </svg>
        </div>


        <div className="flex pt-4 mt-4 space-x-2 font-medium border-t border-gray-200 dark:border-gray-700">
          status
        </div>
        <div className="flex pt-4 mt-4 space-x-2 font-medium border-t border-gray-200 dark:border-gray-700">
          Dates
        </div>
        <div className="flex pt-4 mt-4 space-x-2 font-medium border-t border-gray-200 dark:border-gray-700">
          Time Estimate
        </div>
        <div className="flex pt-4 mt-4 space-x-2 font-medium border-t border-gray-200 dark:border-gray-700">
          Priority
        </div>

      </div>
    </aside>
  )
}

export default Descriptionbar