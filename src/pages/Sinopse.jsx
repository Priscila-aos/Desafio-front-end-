import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Sinopse = () => {
  const { filmeId } = useParams()
  const [genres, setGenres] = useState([])
  const [filme, setFilme] = useState({})

  console.log(filmeId)
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${filmeId}?api_key=733579df3282a4fce2a7adbb959d62ac#`
    ).then(async response => {
      const data = await response.json()

      const { genres } = data

      console.log(data)
      setGenres(genres)
      setFilme(data)
    })
  }, [])
  const poster = 'https://image.tmdb.org/t/p/w500' //URL base
  return (
    <>
    <div className="titulo">
        <h3>TMDB</h3></div>

    <div className="body">
     
     <div className='tituloFilme'> <h1>{filme.original_title}</h1>
      <br /></div>
     
      <h4>Data de Lançamento: {filme.release_date}<br/>
        Tempo estimado: {filme.runtime} minutos.</h4><br />

      <h3>Avaliação do usuário: {filme.vote_average}</h3><br />

      {genres.map((genre, key) => (
        <h4 key={key}>{genre.name}</h4>
      ))}<br />
      <p className='background-sinopse'> <b>Resume: </b> {filme.overview}</p> 
      <br />
      <div >
      <img src={poster + filme.poster_path} alt=""></img>
       
       </div>
       </div>      
    </>
  )
}
export default Sinopse
