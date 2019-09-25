import React, {useState, useEffect} from 'react'
import loginService from './services/login'
import blogsService from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState( { message: null, type: null})

  useEffect(() => {
    blogsService
      .getAll()
      .then(response => {
        setBlogs(response)
      })
  }, [])

  useEffect(() => { 
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  // This method is pretty much copy pasted from the exercise solution.

  const Notification = ({notification}) => {
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
    console.log('Notify me', message, type)
    setNotification({message, type})
    setTimeout(() => setNotification({message: null, type: null}), 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Hello')
    try {
      const user = await loginService.login({username, password})
      console.log('User', user)
      blogsService.setToken(user.token)

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(exception) {
      notify('Wrong password or username', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
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
      console.log('Create blog',exception)
      notify(exception.toString(), 'error')
  }
  
  }

  if(user === null) {
    return(
      <div>
        <h1>Log in to application</h1>
        <Notification notification={notification} />
        <Togglable buttonLabel='Login'>
        <LoginForm 
          handleLogin={handleLogin}
          handleUsernameChange={({ target}) => setUsername(target.value)}
          handlePasswordChange={({ target}) => setPassword(target.value)}
          username={username}
          password={password} />
        </Togglable>
      </div>)
  } else 
    return (
      <div>
        <h2>Blogs</h2>
        <Notification notification={notification} />
        <h3>{console.log('User:' , user)}
        {user.data.name} is currently logged in 
        <button onClick={() => handleLogout()}>logout</button>
        </h3>
        <h2>Create a new blog</h2>
        <Togglable buttonLabel='New form'>
          <BlogForm
            handleSubmit={handleNewBlog}
            handleTitleChange={({ target}) => setTitle(target.value)}
            handleAuthorChange={({target}) => setAuthor(target.value)}
            handleUrlChange={({ target}) => setUrl(target.value) }
            title={title}
            author={author}
            url={url} />
        </Togglable>
        {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} />)}
      </div>
  )
}

export default App;
