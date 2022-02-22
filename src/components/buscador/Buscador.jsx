import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../buscador/buscador.css'

function Buscador() {

    let navigate = useNavigate()
    //const history = useHistory()

    const submitHandler = (e) => {

        e.preventDefault()
        const keyWord = e.currentTarget.keyword.value.trim()
        //console.log(keyWord)

        if(keyWord.length < 3 ){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Se deben escribir al menos 3 letras'
              })
        }else{
            e.currentTarget.keyword.value = ''
           navigate(`/resultados?keyword=${keyWord}`)
           
        }
    }

  return (
    <form className='firstForm' onSubmit={submitHandler} action="sumbit">
        <label className='form-label my-auto col-10'>
            <input className='form-control' name='keyword' type="search" placeholder='Busqueda'/>
        </label>
        <button className='btn btn-success mx-1' type='submit'>
          <i class="fas fa-search"></i>
        </button>
    
    </form>
  )
}



export default Buscador