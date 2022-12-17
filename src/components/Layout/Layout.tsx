import { ReactNode } from "react"
import { Footer } from "./Footer"
import { Header } from "./Header"
import '../../styles/components/Layout.scss'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />      
        {children}
      <Footer />
    </>
  )
}