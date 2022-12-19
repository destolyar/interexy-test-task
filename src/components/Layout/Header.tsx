import { Link, useNavigate } from "react-router-dom"
import { UserIconSVG } from "./UserIconSVG"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { logOut } from "../../slices/authSlice"

export const Header = () => {
  const user = useSelector((state: RootState) => state.auth.authorizedUser)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut())
    navigate("/")
  }

  return (
    <header className="header">
      <nav className="header__links">
        <Link to="/" className="header__links__link">Home</Link>
      </nav>
      {user ?
        <div className="header__links">
          <Link to="/account" className="header__links__link">{user.email}</Link>
          <Link to="/account">
            <UserIconSVG />
          </Link>
          <button onClick={handleLogOut} className="header__links__logout">LogOut</button>
        </div> :
        <nav className="header__links">
          <Link to="/login" className="header__actions__login">Login</Link>
          <Link to="/register" className="header__actions__register">Register</Link>
        </nav>}
    </header>
  )
}