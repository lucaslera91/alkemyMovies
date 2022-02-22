import React from 'react'
import { Link, Navigate } from 'react-router-dom'

function Favoritos({favoritos, addOrRemoveFavs}) {

    const imgBase = 'https://image.tmdb.org/t/p/w500'

    const token = sessionStorage.getItem('token')

  

  return (
      
      <div className="container" style={{minHeight: '85vh'}}>
          {favoritos.length === 0 && (<div className='col-12 d-flex'>
            <h3 className='my-5 mx-auto'>Agrega tu primer item a favorito!</h3>
          </div>)}
          {!token && <Navigate replace to='/'></Navigate>}
        <div className='row'>{
            favoritos.map((favorito) => {
                return(
                    <div key={favorito.id} className="col-4 my-2 rounded">
                    <div className="card">
                         <img className="card-img-top" src={`${imgBase}${favorito.imgURL}`} alt="Card cap"/>
                         <button 
                            onClick={ addOrRemoveFavs } 
                            className='favourite-btn'
                            data-movie-id={favorito.id}
                            ><i class="fa-solid fa-heart"></i>
                        </button>
                        <div className="card-body">
                          <h5 className="card-title">{favorito.title.substring(0,7)}</h5>
                          <p className="card-text">{favorito.overview.substring(0,20)}...</p>
                          <Link to={`/detalle/${favorito.id}`} className="btn btn-primary">Ver Detalle</Link>
                        </div>
                    </div>
                </div> 
                )
            })
        }</div>
    </div>
  )
}

export default Favoritos