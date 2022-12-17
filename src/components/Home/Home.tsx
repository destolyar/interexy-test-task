import { Pagination } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { CharacterInterface, CharactersObject } from "./types";
import './Home.scss';
import { Character } from "./Character";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Home = () => {
  const [page, setPage] = useState<number>(1);
  const [countOfPages, setCountOfPages] = useState<number>(1)
  const [characters, setCharacters] = useState<CharacterInterface[]>([])

  const getCharacters = async (currentPage: number) => {
    const response: CharactersObject = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`).then(data => data.json())
    setCountOfPages(response.info.pages)
    setCharacters(response.results)
  }

  const handlePageChange = async (
    _event: ChangeEvent<unknown>,
    newPage: number) => {
    setPage(newPage)
    getCharacters(newPage)
  }

  useEffect(() => {
    getCharacters(page)
  }, [])

  return (
    <section className="home">
      <h1 className="home__title">Characters</h1>
      <div className="container-fluid d-flex justify-content-between p-0">
        <div className="row g-0 g-sm-5">
          {characters.map((character, index) =>
            <Character characterInfo={character} key={index} />
          )}
        </div>
      </div>
      <Pagination
        size="medium"
        className="home__pagination"
        count={countOfPages}
        page={page}
        onChange={handlePageChange}
      />
    </section>
  )
}

