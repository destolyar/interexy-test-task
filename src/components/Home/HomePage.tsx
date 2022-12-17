import { Pagination } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Character } from "./Character";
import '../../styles/components/HomePage.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CharacterInterface, CharactersObject } from "../../types/Characters";

export const HomePage = () => {
  const [page, setPage] = useState<number>(1);
  const [countOfPages, setCountOfPages] = useState<number>(1)
  const [characters, setCharacters] = useState<CharacterInterface[]>([])

  const getCharacters = async (currentPage: number) => {
    const response: CharactersObject = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`).then(data => data.json())
    setCountOfPages(response.info.pages)
    setCharacters(response.results)
  }

  const updateURL = (newPage: number) => {
    const url = window.location.pathname
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set("page", newPage.toString())

    window.history.replaceState({}, '', url + '?' + urlParams);
  }

  const handlePageChange = async (
    _event: ChangeEvent<unknown>,
    newPage: number) => {
    updateURL(newPage)
    setPage(newPage)
    getCharacters(newPage)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlParamPage = urlParams.get("page")

    if (urlParamPage) {
      setPage(+urlParamPage)
      getCharacters(+urlParamPage)
    } else {
      getCharacters(page)
    }

    
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
