import SearchIcon from './search.svg'
import {useEffect} from 'react';
import { useState } from 'react';
import './App.css';
import MovieCard from './MovieCard';

const API_URL='http://www.omdbapi.com?apikey=f8f0adbf';

//APIKey : f8f0adbf
const App=()=>{
  const [titles,setTitles]=useState([]);
  const [searchTerm,setSearch]=useState('')

  const searchMovie=async (title)=>{
    const response=await fetch(`${API_URL}&s=${title}`);
    const data=await response.json();
    setTitles((data.Search));
    console.log('Searched')
  }

  useEffect(()=>{searchMovie()},[])

  return (
    <div className='app'>
      <h1>IMDB Catalouge</h1>
      <div className="search">
        <input 
        placeholder='title' 
        value={searchTerm}
        onChange={(e)=>{setSearch(e.target.value)}}
        />
        <img 
          src={SearchIcon}
          alt="search"
          onClick={()=>{searchMovie(searchTerm)}}
        />
      </div>

      {
        titles.length > 0
        ?(
          <div className='container'>
            {titles.map((title)=>(<MovieCard movie={title} />))}   
          </div>
        ):(
          <div className='empty'> no movies found </div>
        )
      }   
    </div>
  );
}

export default App;
