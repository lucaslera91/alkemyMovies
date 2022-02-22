import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate, Navigate} from 'react-router-dom'

function Login() {

    const navigate = useNavigate()
    
    const submitHandler = (e) => {
        
        e.preventDefault()

        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const email = e.target.email.value
        const password = e.target.password.value
        if(email === '' || password === ''){
            //console.log('El formulario esta incompleto')
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El formulario esta incompleto!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
            return
        }
        if (email !== '' && !regexEmail.test(email)){
            //console.log('Ingrese direccion de correo valido')
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Direccion de correo invalida!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
            return
        }
        if (email !== 'challenge@alkemy.org' || password !== 'react'){
           // console.log(email)
            //console.log(password)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Los datos no son correctos!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
            return
        }

        const token = '54543541364614';
                
        sessionStorage.setItem('token', token)
        Swal.fire(
            'Good job!', 
            `Formulario enviado`,
            'success'
          );
        navigate('/listado')

        //console.log('Formulario enviado')
        //axios
        //    .post('http://challenge-react.alkemy.org', {email, password})
        //    .then(res => {
        //        const token = res.data.token;
        //        
        //        sessionStorage.setItem('token', token)
        //        Swal.fire(
        //            'Good job!', 
        //            `Formulario enviado`,
        //            'success'
        //          );
        //          //alert(token)
        //          //<Navigate replace to='/listado'/>
//
        //    }).then(()=> {
        //        navigate('/listado')
        //    })
    }

    let token = sessionStorage.getItem('token')
  return (
    <>
    {token && <Navigate replace to='/listado'/>}
    <div className='row'>
        <div className="col-6 offset-3">
        <h2>Formulario</h2>
        <form onSubmit={submitHandler} action="sumbit">
            <label className='form-label d-block mt-2' htmlFor="email1">
                <span>E-mail:</span> <br/>
                <input className='form-control' name='email' id='email1' type="email" />
            </label>
            <br/>
            <label className='form-label d-block mt-2' htmlFor="password1">
                <span>Password:</span> <br/>
                <input className='form-control' name='password' id='password1' type="password" />
            </label>
            <br/>
            <button className='btn btn-success' type='submit'>Ingresar</button>
        </form>
        </div>
    
    </div>
        
    </>
  )
}

export default Login