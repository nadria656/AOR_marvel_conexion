import React, { useEffect, useState } from 'react';
import md5 from 'md5';
import ComicList from './components/ComicList';
import ComicDetails from './components/ComicDetails';
import Favorites from './components/Favorites';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  // Estado para almacenar los comics, el comic seleccionado, los favoritos y el termino de búsqueda
  const [comics, setComics] = useState([]);
  const [selectedComic, setSelectedComic] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Claves públicas y privadas 
  const publicKey = '74eaf94c57553c9012ba43454cfbd337';
  const privateKey = '57f39471d37afd6dbc46aaa30125bcedc2a22610';
  const baseUrl = 'https://gateway.marvel.com/v1/public/comics';

  // useEffect para cargar los comics al cargar el componente
  useEffect(() => {
    const fetchComics = async () => {
      const ts = Date.now(); 
      const hash = md5(ts + privateKey + publicKey); // Generación del hash 
      // Peticion a la API de Marvel para obtener los comics ordenados por fecha de modificacion
      const response = await fetch(`${baseUrl}?apikey=${publicKey}&ts=${ts}&hash=${hash}&orderBy=-modified`);
      const data = await response.json();
      setComics(data.data.results); // Guarda los comics obtenidos en el estado.
    };
    fetchComics(); 
  }, []); 

  // Maneja la seleccion de un comic para ver sus detalles
  const handleComicSelect = async (comicId) => {
    const ts = Date.now();
    const hash = md5(ts + privateKey + publicKey);
    // Peticion para obtener los detalles de un comic en particular
    const response = await fetch(`${baseUrl}/${comicId}?apikey=${publicKey}&ts=${ts}&hash=${hash}`);
    const data = await response.json();
    setSelectedComic(data.data.results[0]); 
  };

  // Funcion para agregar o quitar comics de los favoritos
  const toggleFavorite = (comic) => {
    const updatedFavorites = favorites.some(fav => fav.id === comic.id)
      ? favorites.filter(fav => fav.id !== comic.id) 
      : [...favorites, comic]; 
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Guarda los favoritos en LocalStorage
  };

  // Filtra los comics basados en el termino de busqueda
  const filteredComics = comics.filter(comic =>
    comic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Últimos Cómics de Marvel</h1>
      {/* Componente de busqueda para filtrar los comics */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* Si hay un comic seleccionado, muestra sus detalles, de lo contrario, muestra la lista de comics */}
      {selectedComic ? (
        <ComicDetails comic={selectedComic} onBack={() => setSelectedComic(null)} />
      ) : (
        <ComicList
          comics={filteredComics} 
          onComicSelect={handleComicSelect} 
          toggleFavorite={toggleFavorite} 
          favorites={favorites} 
        />
      )}
      <Favorites favorites={favorites} />
    </div>
  );
}

export default App;
