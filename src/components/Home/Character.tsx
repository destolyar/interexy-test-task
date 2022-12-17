import { Link } from "react-router-dom"
import { CharacterInterface } from "./types"

export const Character = ({ characterInfo }: { characterInfo: CharacterInterface }) => {

  return (
    <Link to={"/character/" + characterInfo.id} className="character col-12 col-sm-6 col-md-4 col-xl-3">
      <img className="character__image" src={characterInfo.image} alt={characterInfo.name} />
      <section className="character__info">
        <h2 className="character__info__title">{characterInfo.name}</h2>
        <p className="character__info__item">Status: {characterInfo.status}</p>
        <p className="character__info__item">Species: {characterInfo.species}</p>
        <p className="character__info__item">Gender: {characterInfo.gender}</p>
        <p className="character__info__item">Last location: {characterInfo.location.name}</p>
      </section>
    </Link>
  )
}