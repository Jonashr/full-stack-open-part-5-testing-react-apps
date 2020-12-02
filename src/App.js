import React, { useState, useEffect } from 'react'
import blogsService from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Header from './components/Header'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState( { message: null, type: null })

  useEffect(() => {
    (async() => {
      const fetchedBlogs = await blogsService.getAll()
      if(fetchedBlogs) {
        setBlogs(fetchedBlogs.sort((a, b) => a.likes - b.likes).reverse())
      }
     })()
    }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const notify = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null, type: null }), 3000)
  }

  return (
    <div>
        { user === null && 
          <div>
            <Notification notification={notification} />
            <Togglable buttonLabel='Login'>
              <LoginForm
                blogs={blogs}
                notify={notify}
                setUser={setUser}
              />
            </Togglable>
          </div>
        }

        { user && 
          <>
            <Header 
              user={user}
              setUser={setUser}
            />
            <Notification notification={notification} />
            <h2>Create a new blog</h2>
            <Togglable buttonLabel='New form'>
              <BlogForm
                blogs={blogs}
                setBlogs={setBlogs}
                notify={notify}
              />
            </Togglable>
            {blogs.map(blog =>
              <Blog 
                key={blog.id}
                blog={blog}
                user={user}
                blogs={blogs}
                setBlogs={setBlogs}
                notify={notify}
              />)}
          </>
        }
    </div>
  )
}

export default App
