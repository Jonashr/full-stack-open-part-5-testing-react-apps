import React from 'react'

const Header = ({ user,  setUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  return (
    <header>
      <h2>Blogs</h2>
        <h3>
          {user.username} is currently logged in
          <button onClick={() => handleLogout()}>logout</button>
        </h3>
    </header>
  )
}

export default Header
