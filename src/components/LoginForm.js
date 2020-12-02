import React from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import { useField } from '../hooks'


const LoginForm = ({ notify, setUser}) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username: username.value, password: password.value })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogsService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    }
    catch(exception) {
      notify('Wrong password or username', 'error')
    }
  }
  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleLogin} >
        <div>
          username
          <input {...username} />
        </div>
        <div>
            password
          <input {...password} />        
        </div>
        <button type='submit'>login</button>
      </form>
    </section>
  )
}

LoginForm.propTypes = {
  handleLogin:PropTypes.func.isRequired,
}

export default LoginForm