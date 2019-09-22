import React, {useState, useEffect} from 'react'
import login from './services/login'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    try {
      const user = await 
    }
  }
  
  
  return (
    <div>
      <h1>Log in to application</h1>
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
   </div>
  );
}

export default App;
