import { useState } from "react"
import { Link } from "react-router-dom"
import { UserIconSVG } from "./UserIconSVG"

export const Header = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  return (
    <header className="header">
      <nav className="header__links">
        <Link to="/" className="header__links__link">Home</Link>
      </nav>
      {isAuthorized ? <nav>
        <Link to="/register"></Link>
        <Link to="/login"></Link>
      </nav> :
        <div className="header__links">
          <Link to="/user" className="header__links__link">Username</Link>
          <Link to="/user">
            <UserIconSVG />
          </Link>
        </div>}
    </header>
  )
}