import { getMovies } from '../mod/datasource'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Movie.css'

export const Movie = () => {
  const [ listMovies, setMovies ] = useState([])
  const [ loadMore, setLoadMore ] = useState(false)
  const [ showPoster, setShowPoster ] = useState(false)
  const [ poster, setPoster ] = useState('')
  const page = useSelector(state => state.page)
  const dispatch = useDispatch()
  
  const keyword = 'batman'

  // effect when load more
  useEffect(() => {
    if (loadMore) {
      getMovies({s: keyword, page}).then((response) => {
        setMovies(listMovies.concat(response.Search))
      })
      setLoadMore(false);
    }
    console.log(page)
  }, [loadMore, page, listMovies]);

  useEffect(() => {
    getMovies({s: keyword}).then((response) => {
      setMovies(response.Search)
    })
  }, [])


  useEffect(() => {
    const list = document.getElementById('movie-list')
    window.addEventListener('scroll', () => {
      if (list)
        if (window.scrollY + window.innerHeight === list.clientHeight + list.offsetTop) {
          dispatch({type: 'INCREMENT'})
          setLoadMore(true);
        }
    });
  }, [dispatch])

  const openPopup = (poster) => {
    setShowPoster(!showPoster)
    const posterEl = () => (
      <div className="popup" onClick={() => setShowPoster(false)}>
        <img src={poster} alt="poster detail" />
      </div> 
    )

    setPoster(posterEl())
  }


  return (
    <div className="card"  id="movie-list">
      { showPoster ?  poster : '' }
      {/* <div className="popup"></div> */}
      { listMovies.map((item, i) => (
        <div key={i} className="card-list" onClick={() => openPopup(item.Poster)}>
          <div className="card-list-img">
            <img src={item.Poster} width="100%" alt={item.Title }/>
          </div>
          <div className="card-list-content">
            <span className="card-list-content--title">{ item.Title }</span> <br />
            <div className="card-list-conteint--info">
              year: {item.Year}<br />
              type: {item.Type}
            </div>
          </div>
        </div>
      ))
      }
    </div>
  )
}