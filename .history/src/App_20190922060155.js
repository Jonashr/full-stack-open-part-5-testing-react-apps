import React, {useState, useEffect} from 'react'
import loginService from './services/login'
import blogsService from './services/blogs'


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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
     
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

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
    </form>
    <button type='submit'>login</button>
 </div>)
  
  if(user === null) {
    return
  } else 
  
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => 
      <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App;
