import { useForm } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import '../../styles/components/Authentification.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserInterface } from '../../types/User'
import { useDispatch } from 'react-redux'
import { logIn, rememberUserLogIn } from '../../slices/authSlice'
import env from 'react-dotenv'

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [message, setMessage] = useState<string>("")
  const [rememberCheckbox, setRememberCheckbox] = useState<boolean>(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: FieldValues) => {
    const res = await fetch(env["API_URL"] + "user/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(data => data.json())

    setMessage(res.message)

    if (res.success) {
      const user: UserInterface = res.user
      rememberCheckbox ? dispatch(rememberUserLogIn(user)) : dispatch(logIn(user))
      setTimeout(() => {
        navigate("/account")
      }, 1000)
    }
  }

  return (
    <main className="authentification">
      <h1 className='authentification__title'>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='authentification__login'>
        <label
          htmlFor="email" className='authentification__login__title'>Email</label>
        <input
          className='authentification__login__input'
          id="email"
          type="email"
          placeholder={"Input your email"}
          {...register("email", { required: true })} />
        <label
          htmlFor="email" className='authentification__login__title'>Password</label>
        <input
          className='authentification__login__input'
          id="password"
          type="password"
          placeholder={"Input your password"}
          {...register("password", {
            required: true,
            minLength: {
              value: 6,
              message: "Password must be longer than 6 characters"
            },
            maxLength: {
              value: 32,
              message: "Password must be shorter than 32 characters"
            },
          })} />
        <div className='authentification__login__remember-me'>
          <h6 className='authentification__login__remember-me__title'>Remember me</h6>
          <input
            checked={rememberCheckbox}
            onChange={() => setRememberCheckbox(state => !state)} type="checkbox" />
        </div>

        {errors.password && <span className='authentification__login__error'>{errors.password.message?.toString()}</span>}
        {message && <span className='authentification__register__error'>{message}</span>}

        <input className='authentification__login__submit' type="submit" />
      </form>
      <p className='authentification__link'>Don't have an account yet? <Link to="/register">Register here</Link></p>
    </main>
  )
}
