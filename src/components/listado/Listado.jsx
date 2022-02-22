import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

import { Navigate} from 'react-router-dom'

import '../listado/listado.css'

function Listado({addOrRemoveFavs}) {
    
    const apiKey = 'fbac937c4976194174dc4b5393fcc02e'
    const imgBase = 'https://image.tmdb.org/t/p/w500'
    const [movieList, setMovieList] = useState([])


    useEffect(()=> {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&sort_by=popularity.desc`
        axios
            .get(url)
            .then((res) => {
                const apiData = res.data.results
                setMovieList(apiData)
            }).catch((error)=> {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error en la pagina, por favor intenta luego'
                  })
                console.log(error)
            })

    },[])

    let token = sessionStorage.getItem('token')
    
  return (<>
    { !token && <Navigate replace to='/'/> }
    <div className="row container mx-auto">
    {
        movieList.map((movie, id)=>{
          
            return(
                
                <div key={id} className="col-8 mx-auto col-sm-3 my-3 rounded shadow-lg">
                    <div className="card border-0">
                        <img className="card-img-top" style={{ maxHeight: '400px', objectFit: 'contain'}} src={`${imgBase}${movie.poster_path}`} alt="Card cap"/>
                        <button 
                            onClick={ addOrRemoveFavs } 
                            className='favourite-btn text-muted'
                            data-movie-id={movie.id}
                            ><i class="fa-solid fa-heart"></i>
                        </button>
                        <div className="card-body">
                          <h5 className="card-title">{movie.title.substring(0,7)}</h5>
                          <p className="card-text" style={{height: '100px', overflow: 'hidden'}}>{movie.overview.substring(0,150)}...</p>
                          <Link to={`/detalle/${movie.id}`} className="btn btn-primary">Detalle</Link>
                        </div>
                    </div>
                </div>
            )
        })
    }
    </div>
    </>
  )
}
//🖤
export default Listado