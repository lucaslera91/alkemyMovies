import React , {useEffect , useState} from 'react'
import { Link, useSearchParams, Navigate} from 'react-router-dom'
import Swal from 'sweetalert2'

import axios from 'axios';

function Resultados() {

    const search = useSearchParams()
    const keyword = search[0].get('keyword') 
    const apiKey = 'fbac937c4976194174dc4b5393fcc02e'
    const searchUrlBase = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${keyword}&page=1`
    const [finds, setfinds] = useState([]);
    const [errorHandler, seterrorHandler] = useState(<h3>Buscando...</h3>);
    

    useEffect(() => {
      axios
        .get(`${searchUrlBase}${apiKey}&query=${keyword}&page=1`)
        .then((res) => {
            setfinds(res.data.results)
            return res.data.results
        }).then((data)=> {
           if(data.length === 0){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Busqueda sin resultados',
                    footer: '<a href="">Why do I have this issue?</a>'
                  })
                  seterrorHandler(<h3>No se encontraron resultados</h3>)
           } else { 
               seterrorHandler(<></>)
            }
        })
        .catch((error) => {
            console.log(error)
            seterrorHandler(<h3>No se encontraron resultados</h3>)
            alert('error en la busqueda')
        })
    }, [keyword]);

    const token = sessionStorage.getItem('token')

  return (
<>
{!token && <Navigate replace to='/'></Navigate>}

<h4 className='p-2'>Search: <em>{keyword}</em></h4>

{errorHandler}

{finds === [] && errorHandler}

<ul>
  <li className='col-11 d-flex p-2 border-secondary border-bottom'>
    <h5 className='my-auto px-2 col-6' >Title</h5>
    <h5 className='my-auto px-2 col-3' >Rating</h5>
  </li>
{finds.map((find, id) => {
   return (
       <li key={id} className='col-11 d-flex p-2 border-bottom'>
            <p className='my-auto px-2 col-6' >{find.title}</p>
            <p className='my-auto px-2 col-3' >{find.vote_average}</p>
            <Link to={`/detalle/${find.id}`}><button className='btn btn-success p2'>Go</button></Link>
       </li>
   )
})}
</ul>
</>
  )
}

export default Resultados