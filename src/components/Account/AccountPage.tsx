import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store"
import { useEffect, useState } from "react"
import { updateUser } from "../../slices/authSlice"
import { FieldValues, useForm } from "react-hook-form"
import '../../styles/components/AccountPage.scss'

export const AccountPage = () => {
  const [message, setMessage] = useState<string>("")
  const { register, handleSubmit, formState: { errors } } = useForm()

  const user = useSelector((state: RootState) => state.auth.authorizedUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user])

  const onSubmitHandler = async (data: FieldValues) => {
    const res = await fetch("https://vladislav-metik-interexy.herokuapp.com/api/user/change", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, userId: user?._id })
    }).then(data => data.json())

    setMessage(res.message)

    if (res.success) {
      dispatch(updateUser(res.newUserInfo))
    }
  }

  return (
    <main className="account">
      <h1 className="account__title">Page of {user?.email}</h1>
      <section className="account__info">
        <h2 className="account__info__title">Below you can change information about your account</h2>
        <form className="account__info__form" onSubmit={handleSubmit(onSubmitHandler)}>
          <label
            htmlFor="email" className='account__info__form__title'>Email</label>
          <input
            className='account__info__form__input'
            id="email"
            type="email"
            defaultValue={user?.email}
            placeholder={"Input your email"}
            {...register("email", { required: true })} />
          <label
            htmlFor="password" className='account__info__form__title'>Password</label>
          <input
            className='account__info__form__input'
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
          {errors.password && <span className='account__info__form__error'>{errors.password.message?.toString()}</span>}
          <label
            htmlFor="bio" className='account__info__form__title'>Bio</label>
          <textarea
            className='account__info__form__input'
            id="bio"
            defaultValue={user?.bio ? user.bio : ""}
            placeholder={"Input your bio"}
            {...register("bio", {
              required: true,
              minLength: {
                value: 6,
                message: "Bio must be longer than 6 characters"
              },
            })} />
          {errors.bio && <span className='account__info__form__error'>{errors.bio.message?.toString()}</span>}
          {message && <span className='account__info__form__error'>{message}</span>}
          <input type="submit" className="account__info__form__submit" />
        </form>
      </section>
    </main>
  )
}
