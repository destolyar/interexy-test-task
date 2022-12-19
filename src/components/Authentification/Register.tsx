import { useState } from 'react'
import '../../styles/components/Authentification.scss'
import { Link, useNavigate } from 'react-router-dom'
import { FieldValues } from 'react-hook-form/dist/types'
import { useForm } from 'react-hook-form'
import { UserInterface } from '../../types/User'
import { useDispatch } from 'react-redux'
import { logIn, rememberUserLogIn } from '../../slices/authSlice'

export const Register = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm()
  const [message, setMessage] = useState<string>("")
  const [rememberCheckbox, setRememberCheckbox] = useState<boolean>(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmitHandler = async (data: FieldValues) => {
    const res = await fetch("https://vladislav-metik-interexy.herokuapp.com/api/user/create", {
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
      <h1 className='authentification__title'>Registration</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)} className='authentification__register'>
        <label
          htmlFor="email" className='authentification__register__title'>Email</label>
        <input
          className='authentification__register__input'
          id="email"
          type="email"
          placeholder={"Input your email"}
          {...register("email", { required: true })} />
        <label
          htmlFor="email" className='authentification__register__title'>Password</label>
        <input
          className='authentification__register__input'
          id="password"
          type="text"
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
        <label
          htmlFor="passwordRepeat" className='authentification__register__title'>Repeat password</label>
        <input
          className='authentification__register__input'
          id="passwordRepeat"
          type="password"
          placeholder={"Input your password"}
          {...register("passwordRepeat", {
            required: true,
            minLength: {
              value: 6,
              message: "Password must be longer than 6 characters"
            },
            maxLength: {
              value: 32,
              message: "Password must be shorter than 32 characters"
            },
            validate: (value) => {
              const { password } = getValues()
              return password === value || "Passwords should match!"
            }
          })} />
        <div className='authentification__register__remember-me'>
          <h6 className='authentification__register__remember-me__title'>Remember me</h6>
          <input
            checked={rememberCheckbox}
            onChange={() => setRememberCheckbox(state => !state)} type="checkbox" />
        </div>
        {errors.passwordRepeat && <span className='authentification__register__error'>{errors.passwordRepeat.message?.toString()}</span>}
        {message && <span className='authentification__register__error'>{message}</span>}
        <input className='authentification__register__submit' type="submit" />
      </form>
      <p className='authentification__link'>Already have Account? <Link to="/login">Login here</Link></p>
    </main>
  )
}
