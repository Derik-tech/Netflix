import React, { useEffect, useState } from 'react';
import Tmdb from './tmdb';
import MovieRow from './components/movieRow.js';
import './App.css';
import FeaturedMovie from './components/featuredMovie.js';
import Header from './components/Header.js'

function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      let originals = list.filter((i) => i.slug === 'Originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 15) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return() => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      
      <section className="lists">
        {
          movieList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items}/>
          ))
        }
      </section>

      <footer>
        Feito com <span>&#x2764;</span> por Derik Müller <br />
        Direitos de imagem Netflix<br />
        Dados pegos no site Themoviedb.org
      </footer>
    </div>
  )
}

export default App;
