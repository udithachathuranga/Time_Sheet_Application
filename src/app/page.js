'use client';
import Image from "next/image";
import Descriptionbar from "../(component)/Descriptionbar";
import React, { useState } from "react";
import Sidebar from "../(component)/Sidebar";
import Table from "../(component)/Table";

export default function Home() {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <div>

      <Sidebar/>

      <div class="p-3 sm:ml-64">

        <div>

          <div class="relative bg-gray-300 dark:bg-gray-700 rounded-lg text-gray-900  dark:text-white mb-3">
            <h1 class="text-3xl font-bold text-white text-center py-4 rounded-md text-center">
              Project Name
            </h1>
          </div>

          <Table name="Open" data="sdfsd" showDescription={showDescription} setShowDescription={setShowDescription}/>
          <Table name="Open" data="sdfsd" showDescription={showDescription} setShowDescription={setShowDescription}/>

        </div>

        <div class="bottom-0 right-0 w-full bg-gray-200 dark:bg-gray-800 p-4 border-l border-black dark:border-white">
          {showDescription && <Descriptionbar />}
        </div>

      </div>
    </div>
  );
}
