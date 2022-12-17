import { Table, TableBody, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import './Home.scss';

export const Home = () => {
  const [page, setPage] = useState(0);
  const [countOfCharacters, setCountOfCharacters] = useState(1)
  const [characters, setCharacters] = useState<Character[]>([] as Character[])

  const getCharacters = async (currentPage: number) => {
    const response: CharactersObject = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage + 1}`).then(data => data.json())
    setCountOfCharacters(response.info.count)
    setCharacters(response.results)
  }

  const handlePageChange = async (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number) => {
    setPage(newPage)
    getCharacters(newPage)
  }

  useEffect(() => {
    getCharacters(page)
  }, [])

  const tableTheme = createTheme({
    components: {
      MuiTable: {
        styleOverrides: {
          root: {
            flex: 1,
            display: "flex",
            flexDirection: "column"
          }
        }
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            display: "block"
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            display: "block",
            border: 0,
            padding: "5px 0px"
          }
        }
      }
    }
  })

  return (
    <ThemeProvider theme={tableTheme}>
      <Table className="home__table">
        <TableBody className="home__table__body">
          {characters.map((character, index) =>
            <TableRow key={index}>
              <TableCell>{character.name}</TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter className="home__table__footer">
          <TableRow>
            <TablePagination
              count={countOfCharacters}
              page={page}
              onPageChange={handlePageChange}
              rowsPerPage={20}
              rowsPerPageOptions={[]}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </ThemeProvider>
  )
}

interface CharactersObject {
  info: CharactersInfo,
  results: Character[]
}

interface CharactersInfo {
  count: number,
  next: string | null,
  pages: number,
  orev: string | null
}

interface Character {
  created: string,
  episode: string[],
  gender: string,
  id: number,
  image: string,
  location: {
    name: string,
    url: string
  },
  name: string,
  origin: {
    name: string,
    url: string
  },
  species: string,
  status: string,
  type: string,
  url: string
}
