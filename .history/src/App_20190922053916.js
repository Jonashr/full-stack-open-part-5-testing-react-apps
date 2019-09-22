import React, {useState, useEffect} from 'react'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('Lets check that something happens when this button is pushed.')
  }
  
  
  return (
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
   </div>
  );
}

export default App;
