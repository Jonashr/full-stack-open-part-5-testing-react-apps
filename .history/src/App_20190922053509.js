import React from 'react';


const App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  
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
   </div>
  );
}

export default App;
