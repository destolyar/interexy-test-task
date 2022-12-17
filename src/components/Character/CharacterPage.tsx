import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CharacterPage = () => {
  const { id } = useParams()
  const [character, setCharacter] = useState()
  
  useEffect(() => {

  })
  
  return(
    <>
      id was {id}
    </>
  )
}