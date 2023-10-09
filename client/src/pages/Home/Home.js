import React from 'react'
import {useSelector } from "react-redux";


function Home() {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <div>
      <h1> home </h1>
    </div>
  )
}

export default Home
