import React, {useState, useEffect} from 'react'
import axios from 'axios';

function Form() {
    const [message1, setmessage1] = useState('');
    const [array, setArray] = useState([]);
    const [msgObj, setMsgObj] = useState({});
    const [nameOk, setNameOk] = useState(<></>);
    const [ip, setIp] = useState('');
    const [map, setMap] = useState({})


    let query = new URLSearchParams(window.location.search)
	const key = query.get('id')
   

    //AXIOS PRACTICE
    const ip_address = '168.227.97.171'

    useEffect(() => {
        axios
        .get('https://api.ipify.org?format=json')
        .then(res => {
            setIp(res.data.ip)
            console.log(res.data)
        })
    }, []);

    useEffect(() => {
        axios
        .get(`https://api.ipfind.com/?ip=${ip}`)
        //.get(`https://ipinfo.io/168.227.97.171/geo`)
        .then(res => {
            console.log(res.data)
        })

    }, [ip]);
    //'168.227.97.171'
        
    // axios
    //     .get(`https://ipinfo.io/${ip}/geo`)
    //     .then(res => {
    //         console.log(res.data)
    //     })

    const handleSubmit = (e) => {
        e.preventDefault()

        if(message1.toLowerCase() !== 'lucas' || !e.currentTarget.message2.value ){
            console.log(e.currentTarget.message2.value)
 
            alert('invalid input')
        } else{
            console.log(e.currentTarget.message2.value)
            setMsgObj({
                message: message1,
                array: 'array',
                msg: e.currentTarget.message2.value
            })
            alert('perfect')
        }
        
    }
    const validateName = (e) => {
        setmessage1(e.target.value)
        e.target.value.toLowerCase() === 'lucas' ? setNameOk(<h5 className='text-success'>Finally ok !!</h5>) : setNameOk(<h3 className='text-danger'>Not ok so far</h3>)
    }



  return (
    <div>
        <p>Show input State: {message1}</p>
        <p>Show on Submit:{msgObj.msg}</p>
        <p>Show on Submit:{msgObj.message}</p>
        <p>Show on Submit:{key}</p>
        <div>
            <form onSubmit={handleSubmit} className='d-flex flex-column' action="submit">
                <label className='d-flex'>
                    <input onChange={(e) => validateName(e)} value={message1}  title="Solo pueden ingresarse letras" pattern="[a-zA-Z'-'\s]*" minLength="4" name='message' type="text" />
                    {nameOk}
                </label>
                <label>
                    <input name='array' type="text" />
                </label>
                <label>
                    <input name='message2' type="text" />
                </label>
                <button disabled={false} className='btn btn-success' type='submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Form