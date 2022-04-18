import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const URL_IMAGEM = 'https://image.tmdb.org/t/p/w500' //URL base do filme

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

export default function Home() {
  const [generos, setGeneros] = useState([]) //botões - traz os generos
  const [filmes, setFilmes] = useState([]) // TODOS filmes

  const [filmesEscolhidos, setFilmesEscolhidos] = useState([])
  const [generosSelecionados, setGenerosSelecionados] = useState([]) // traz os generos (clicados)filtrados

  useEffect(() => {
    async function pegandoGenerosDaAPI() {
      const resposta = await api.get(
        '/genre/movie/list?api_key=733579df3282a4fce2a7adbb959d62ac'
      )

      setGeneros(resposta.data.genres)
    }

    async function pegandoFilmesDaAPI() {
      const resposta = await api.get(
        'movie/popular?api_key=733579df3282a4fce2a7adbb959d62ac'
      )
      setFilmes(resposta.data.results)
      setFilmesEscolhidos(resposta.data.results)
    }

    pegandoGenerosDaAPI()
    pegandoFilmesDaAPI()
  }, [])

  useEffect(() => {
    console.log(generosSelecionados)
    if (generosSelecionados.length === 0 && filmes.length) {
      //retorna vazio

      setFilmesEscolhidos(filmes)
      return // para a função
    }
    const filmesFiltrados = filmes.filter(filme => {
      for (const generoID of generosSelecionados) {
        if (filme.genre_ids.includes(generoID)) {
          return true
        }
        /*
        // se quiser que tenha todos os generos selecionados
        else {
          return false;
        } */
      }
      return false
    })
    setFilmesEscolhidos(filmesFiltrados)
  }, [generosSelecionados])

  /*
  // busca por 1 gênero só
  const selecionaFilmesPorGenero = genero => {
    const generoID = genero.id;

    const filmesFiltrados = filmes.filter(filme => {
      return filme.genre_ids.includes(generoID);
    });
  }
  */
  const selecionaFilmesPorGenero = genero => {
    // [...generosSelecionados]
    const generoID = genero.id

    // const novosGeneros = Array.from(generosSelecionados)
    const novosGeneros = [...generosSelecionados]
    console.log(novosGeneros)
    if (novosGeneros.includes(generoID)) {
      // já tem
      // retira do array - desmarca o botão
      const index = novosGeneros.indexOf(generoID)
      novosGeneros.splice(index, 1)
    } else {
      novosGeneros.push(generoID) // marca
    }

    setGenerosSelecionados(novosGeneros)
  }

  return (
    <>
      <div className="titulo">
        <h3>TMDB</h3>
      </div>
      <div className="body">
        <p>
          Milhões de filmes, séries e pessoas para descobrir. <br /> Explore já.{' '}
          <br />
        </p>
        <div>
          <p className="filtre"> Filtre por:</p>
        </div>

        <div>
          {generos.map(genero => (
            <button
              className="button"
              key={genero.id}
              onClick={() => selecionaFilmesPorGenero(genero)}
            >
              {genero.name}
            </button>
          ))}
        </div>
      </div>
      <div className="gridContainer">
        {/* {filmesEscolhidos.map(filme => (
          <Filme filme={filme} />
        ))} */}

        {filmesEscolhidos.map(filme => (
          <Link to={'/filme/' + filme.id} className="gridItem" key={filme.id}>
            {/* `/filme/${filme.id}` interpolação de strings */}
            <h3>{filme.title}</h3>
            <p>Data de lançamento: {filme.release_date}</p>
            <img
              src={URL_IMAGEM + filme.backdrop_path}
              alt="Imagem do filme"
            ></img>
          </Link>
        ))}
      </div>
    </>
  )
}
