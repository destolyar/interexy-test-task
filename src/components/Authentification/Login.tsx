import { useForm } from 'react-hook-form'
import type { SubmitHandler, FieldValues } from 'react-hook-form'
import '../../styles/components/Authentification.scss'
import { Link } from 'react-router-dom'

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data: FieldValues) => {
    console.log(data)
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
          type="text"
          placeholder={"Input your password"}
          {...register("password", { required: true, 
            minLength: {
              value: 6,
              message: "Password must be longer than 6 characters"
            }, 
            maxLength: {
              value: 32,
              message: "Password must be shorter than 32 characters"
            }, })} />
           {errors.password && 
            <span className='authentification__login__error'>{errors.password.message?.toString()}</span>}
        <input className='authentification__login__submit' type="submit" />
      </form>
      <p className='authentification__login__link'>Don't have an account yet? <Link to="/register">Register here</Link></p>
    </main>
  )
}