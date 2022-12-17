import { ChangeEvent, useState } from 'react'
import '../../styles/components/Authentification.scss'
import { Link } from 'react-router-dom'
import { FieldValues } from 'react-hook-form/dist/types'
import { useForm } from 'react-hook-form'

export const Register = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm()

  const onSubmit = (data: FieldValues) => {
    console.log(data)
  }

  return (
    <main className="authentification">
      <h1 className='authentification__title'>Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='authentification__register'>
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
        {errors.password && <span className='authentification__register__error'>{errors.password.message?.toString()}</span>}
        <label
          htmlFor="passwordRepeat" className='authentification__register__title'>Repeat password</label>
        <input
          className='authentification__register__input'
          id="passwordRepeat"
          type="text"
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
        {errors.passwordRepeat && <span className='authentification__register__error'>{errors.passwordRepeat.message?.toString()}</span>}
        <input className='authentification__register__submit' type="submit" />
      </form>
      <p>Already have Account? <Link to="/login">Login here</Link></p>
    </main>
  )
}