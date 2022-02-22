import { Route, Routes } from 'react-router-dom'
import React, { useEffect , useState} from 'react'
import Listado from "./components/listado/Listado";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer"
import Login from "./components/Login";
import Detalle from "./components/Detalle";
import Error from "./components/Error";
import Resultados from './components/Resultados';

import './css/app.css'
import Favoritos from './components/Favoritos';


function App() {



    const [favoritos, setFavoritos] = useState([]);


    useEffect(() => {
        const favInLocal = localStorage.getItem('favs')
        console.log(favInLocal)
        if(favInLocal != null){
            const favArray = JSON.parse(favInLocal)
            setFavoritos(favArray)
        }
    }, []);

    const addOrRemoveFavs = (e) => {
   
    const favMovies = localStorage.getItem('favs')
    let tempMoviesFav;

    if(favMovies === null ){
      tempMoviesFav = []
    }else{
      tempMoviesFav = JSON.parse(favMovies)
    }

      const btn = e.currentTarget
      const parent = btn.parentElement
      const imgURL = parent.querySelector('img').getAttribute('src')
      const title = parent.querySelector('h5').innerText
      const overview = parent.querySelector('p').innerText
      const movieInfo = {
        imgURL, title, overview, id: btn.dataset.movieId
      }
      let isFav = tempMoviesFav.find(movie => {
        return movie.id === movieInfo.id
      })
     
      if(!isFav){
        tempMoviesFav.push(movieInfo); 
        localStorage.setItem('favs', JSON.stringify(tempMoviesFav));
        setFavoritos(tempMoviesFav)
      } else {
        let removedFav = tempMoviesFav.filter(movie => {
          return movie.id !== movieInfo.id
        });
        localStorage.setItem('favs', JSON.stringify(removedFav))
        console.log('Deleted')
        setFavoritos(removedFav)

      }
      }

  return (
    <div className="App">
      <Header favoritos={favoritos}/>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/listado' element={ <Listado addOrRemoveFavs={addOrRemoveFavs} /> } />
            <Route path='/detalle/:itemId' element={<Detalle  />} />
            <Route path='/resultados' element={<Resultados/>} />
            <Route path='/favoritos' element={ <Favoritos addOrRemoveFavs={addOrRemoveFavs} favoritos={favoritos} /> } />
            <Route path='/*' element={<Error/>} />
          </Routes>
      <Footer/>
    </div>
  );
}
//<Route path='/listado' element={<Listado/>} />

export default App;
