import { useState } from 'react'
import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
import { SIGNUP_USER } from '../api/graphql/users.js'
import { useNavigate, Link } from 'react-router-dom'
//import { useMutation } from '@tanstack/react-query'
//import { signup } from '../api/users.js'
export function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [signupUser, { loading }] = useGraphQLMutation(SIGNUP_USER, {
    variables: { username, password },
    onCompleted: () => navigate('/login'),
    onError: () => alert('failed to sign up!'),
  })
  /* const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }),
    onSuccess: () => navigate('/login'),
    onError: () => alert('failed to sign up!'),
  }) */
  const handleSubmit = (e) => {
    e.preventDefault()
    signupUser()
    //signupMutation.mutate()
  }
  return (
    <form onSubmit={handleSubmit}>
      <Link to='/'>Back to main page</Link>
      <hr />
      <div>
        <label htmlFor='create-username'>Username: </label>
        <input
          type='text'
          name='create-username'
          id='create-username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-password'>Password: </label>
        <input
          type='password'
          name='create-password'
          id='create-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <input
        type='submit'
        value={loading ? 'Signing up...' : 'Sign Up'}
        disabled={!username || !password || loading}
      />
    </form>
  )
}
