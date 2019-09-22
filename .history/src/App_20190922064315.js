import React, {useState, useEffect} from 'react'
import loginService from './services/login'
import blogsService from './services/blogs'
import Blog from './components/Blog'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

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

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Hello')
    try {
      blogsService.setToken(user.token)
      const user = await loginService.login({username, password})

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(exception) {
      console.log(exception)
      setErrorMessage('Wrong credentials')
      console.log('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  console.log('User', user)

  const loginForm = () => (
    <div>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input 
          type='text'
          value={username}
          name='Username'
          onChange={({target}) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({target}) => setPassword(target.value)} />
      </div>
      <button type='submit'>login</button>
    </form>
 </div>)
  
  if(user === null) {
    return(
      <div>
        <h1>Log in to application</h1>
        {loginForm()}
      </div>)
  } else 
    return (
      <div>
        <h2>Blogs</h2>
        <h3>{user.name} is currently logged in </h3>
        {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} />)}
      </div>
  )
}

export default App;
