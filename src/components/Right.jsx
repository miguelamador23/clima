import React from "react";
import Cards from "./Cards";
import Hightlights from "./Hightlights";

export default function Right() {
    return(
        <>
      <div className="w-[80%] bg-slate-900 h-screen ml-[20%] mt-[-47.6%]">
        <Cards />
        <h1 className="ml-[20%] text-white mt-[5%] text-3xl">Today’s Hightlights </h1>
        <Hightlights />
      </div>
    </>
    )
}