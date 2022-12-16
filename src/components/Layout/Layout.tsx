import { ReactNode } from "react"
import { Footer } from "./Footer"
import { Header } from "./Header"
import './Layout.scss'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="main">
        {children}
      </main>
      <Footer />
    </>
  )
}