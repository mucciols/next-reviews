'use client'

import { useEffect } from "react";

export default function HomePage() {

  useEffect(()=>{
    window.alert("ciao");
  },[])

  console.log('[HomePag] rendering');
  return(
    <>
      <h1>indie gamer</h1>
      <p>
        only the best indie games, reviewed for you
      </p>
    </>
  )
}