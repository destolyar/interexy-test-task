import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CharacterInterface } from "../../types/Characters"
import '../../styles/components/CharacterPage.scss'
import env from "react-dotenv"

export const CharacterPage = () => {
  const { id } = useParams()
  const [character, setCharacter] = useState<CharacterInterface>({} as CharacterInterface)

  const getCharacter = async () => {
    const character = await fetch(env["CHARACTERS_API"] + `character/${id}`).then(data => data.json())
    setCharacter(character)
  }

  useEffect(() => {
    getCharacter()
  }, [])

  return (
    <main className="character-page">
      {character.name ? <>
        <img className="character-page__image" src={character.image} alt={character.name} />
        <section className="character-page__info">
          <h1 className="character-page__info__title">{character.name}</h1>
          <p className="character-page__info__item">Gender: {character.gender}</p>
          <p className="character-page__info__item">Last location: {character.location.name}</p>
          <p className="character-page__info__item">First seen in: {character.origin.name}</p>
          <p className="character-page__info__item">Species: {character.species}</p>
          <p className="character-page__info__item">Status: {character.status}</p>
          {character.type && <p className="character-page__info__item">Type: {character.type}</p>}

          <h2 className="character-page__episodes-title">Episodes:</h2>
          <section className="character-page__episodes">
            {character.episode.map((episode, index) =>
              <div
                key={index}
                className="character-page__episodes__episode">Episode {episode.split("/").slice(-1)}</div>)}
          </section>
        </section>
      </> : null}
    </main>
  )
}
