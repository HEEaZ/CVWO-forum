import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token")
    navigate("/")
  }, [])

  return (<div></div>)
}

export default Logout