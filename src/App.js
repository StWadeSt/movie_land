import './App.css';
import SearchIcon from './search.svg'
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

const API_Url = "http://www.omdbapi.com/?i=tt3896198&apikey=f25fbe56";

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_Url}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('Superman');
  }, [])
  

  return (
    <div className="App">
      <h1>Movie Land</h1>

      <div className='search'>
          <input
            placeholder='Search for movies'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <img 
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
          />
      </div>

      {
        movies?.length > 0 ? (

          <div className='container'>
          
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}

          </div>

        ) : (

          <div className='empty'>
            <h2>No movies found</h2>
          </div>

        )
      }

    </div>
  );
}

export default App;
