import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogsService from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useField } from './hooks'

const App = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState( { message: null, type: null })
  const [counter, setCounter] = useState(0)
  const username = useField('text')
  const password = useField('password')



  useEffect(() => {
      blogsService
      .getAll()
      .then(response => {
        setBlogs(response.sort((a, b) => a.likes - b.likes).reverse())
      })
    }
  , [counter])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  // This method is pretty much copy pasted from the exercise solution.

  const Notification = ({ notification }) => {
    if(notification.message === null) {
      return null
    }

    const notificationStyling = {
      color: notification.type === 'error' ? 'red' : 'green',
      fontStyle: 'italic',
      fontSize: 25,
      borderStyle: 'solid',
      borderRadius: 5
    }

    return(
      <div style={notificationStyling}>
        {notification.message}
      </div>
    )
  }

  const notify = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null, type: null }), 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogsService.setToken(user.token)

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      setUser(user)
      username.value = ''
      password.value = ''
    }
    catch(exception) {
      console.log('Exception caught in handle login: ', exception)
      notify('Wrong password or username', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    password.reset()
    console.log('Handle logout, password has the values', password)
    console.log('Handle logout, username', username)
    setUser(null)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url,
      id: blogs.length + 1
    }

    try {
      const createdBlog = await blogsService.create(blog)
      setBlogs(blogs.concat(createdBlog))
    } catch(exception) {
      console.log('Exception in handle new blog', exception)
      notify(exception.toString(), 'error')
    }

  }

  const handleLikeButton = async (event) => {
    event.preventDefault()
    const blogId = event.target.value
    const searchedBlog = blogs.find(b => b.id === blogId)

    const newUpdatedBlog = {
       user: searchedBlog.user.id,
       likes: searchedBlog.likes + 1,
       title: searchedBlog.title,
       author: searchedBlog.author,
       url: searchedBlog.url
    }

    console.log(newUpdatedBlog)

    await blogsService.update(blogId, newUpdatedBlog)

    setBlogs(blogs.map(blog => blog.id !== blogId ? blog : newUpdatedBlog))

    setCounter(counter + 1)

  }

  const handleDeleteButton = async (event) => {
    event.preventDefault()
    if(window.confirm('Delete this blog ? ')) {
      const blogId = event.target.value
      const newBlogList = [...blogs]
      const searchedBlog = blogs.find(b => b.id === blogId)
      const indexOfDeletedBlog = blogs.findIndex(b => b.id === blogId)
      console.log(indexOfDeletedBlog)
      console.log(newBlogList.splice(indexOfDeletedBlog, 1))

      notify('Blog was removed from the notebook')
       
      // await blogsService.deleteBlog(blogId)
      
      // setBlogs(newBlogList)
    }


  }

  if(user === null) {
    return(
      <div>
        <Notification notification={notification} />
        <Togglable buttonLabel='Login'>
          <LoginForm 
            handleLogin={handleLogin}
            username={username}
            password={password} />
        </Togglable>
      </div>)
  } else
    return (
      <div>
        <h2>Blogs</h2>
        <Notification notification={notification} />
        <h3>
          {user.data.name} is currently logged in
          <button onClick={() => handleLogout()}>logout</button>
        </h3>
        <h2>Create a new blog</h2>
        <Togglable buttonLabel='New form'>
          <BlogForm
            handleSubmit={handleNewBlog}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value) }
            title={title}
            author={author}
            url={url} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLikeButton={handleLikeButton} />)}
      </div>
    )
}

export default App
