import { Pagination } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { CharacterCard } from "./CharacterCard";
import '../../styles/components/HomePage.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CharacterInterface, CharactersObject } from "../../types/Characters";
import env from "react-dotenv";

export const HomePage = () => {
  const [page, setPage] = useState<number>(1);
  const [countOfPages, setCountOfPages] = useState<number>(1)
  const [characters, setCharacters] = useState<CharacterInterface[]>([])

  const getCharacters = async (currentPage: number) => {
    const response: CharactersObject = await fetch(env["CHARACTERS_API"] + `character?page=${currentPage}`).then(data => data.json())
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
    sessionStorage.setItem("lastChartersPage", newPage.toString())
    setPage(newPage)
    getCharacters(newPage)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlParamPage = urlParams.get("page")
    const sessionStoragePage = sessionStorage.getItem("lastChartersPage")

    if (urlParamPage || sessionStoragePage) {
      const savedPage = urlParamPage ? +urlParamPage : sessionStoragePage ? +sessionStoragePage : 0
      setPage(savedPage)
      updateURL(savedPage)
      getCharacters(savedPage)
    } else {
      getCharacters(page)
    }


  }, [])

  return (
    <main className="home">
      <h1 className="home__title">Characters</h1>
      <div className="container-fluid d-flex justify-content-between p-0">
        <div className="row g-0 g-sm-5">
          {characters.map((character, index) =>
            <CharacterCard characterInfo={character} key={index} />
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
    </main>
  )
}
