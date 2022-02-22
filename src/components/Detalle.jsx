import axios from 'axios'
import Swal from 'sweetalert2'
import React, {useEffect, useState} from 'react'
import { Navigate, useParams } from 'react-router-dom'


function Detalle() {

    const token = sessionStorage.getItem('token')
    
    const {itemId} = useParams()

    const apiKey = 'fbac937c4976194174dc4b5393fcc02e'
    const imgBase = 'https://image.tmdb.org/t/p/w500'

    const detailBase = `https://api.themoviedb.org/3/movie/${itemId}?api_key=${apiKey}&language=en-US`

    
    const [movieDetail, setMovieDetail] = useState(null)
    const [loading, setloading] = useState(<h2>Cargando...</h2>);


    useEffect(() => {
        axios
        .get(detailBase)
        .then((res) => {
            console.log(res.data)
            setMovieDetail(res.data)
            
        })
        .catch((error) => {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error en la pagina, el id no se encontro'
              })
              setloading(<h2>Error en el id, por favor buscar otra pelicula</h2>)

        })

    }, [])
  
  return (

    <>
        { !token && <Navigate replace to='/'/> }
        { !movieDetail && loading }
        {movieDetail && <>
        <div className='d-flex align-items-center'>
            <h2 className='my-auto px-3'>{movieDetail.title}</h2>-<h5 className='px-3 my-auto text-muted'>{movieDetail.tagline}</h5>
        </div>
        <div className="row">
            <div className='d-flex'>
                <div className="col-4 p-2">
                    <img className='img-fluid rounded' src={`${imgBase}${movieDetail.poster_path}`} alt="posterImg"/>
                </div>
                <div className='p-2'>
                    <ul className='list-unstyled'>
                        <li><b>Runtime: </b> {movieDetail.runtime} mins</li>
                        <li><b>Rating: </b> {movieDetail.vote_average}</li>
                    </ul>
                    <div>
                    <p className='text-secondary'>
                        {movieDetail.overview}
                    </p>
                    <div>
                        <b>Genres: </b>
                        <ul className='d-flex w-100 px-2 list-unstyled justify-content-between'>
                        {movieDetail.genres.map((element, id) => {
                                return <li key={id}>{element.name}</li>
                            })}
                        </ul>

                    </div>
                    
                  
                </div>
                </div>
                    
                </div>
            
        </div>
       
        </>}
    </>
  )
}

export default Detalle