import axios from 'axios';
import { React, useState, useEffect } from 'react';
import './Form.css';
import Games from '../Games/Games';

export default function Form() {
  const [research, setResearch] = useState();
  const [gamesData, setGamesData] = useState();

  const dataBinding = (event) => {
    if (event.target.classList.contains('search-input')) {
      setResearch(event.target.value);
    }
    if (!event.target.value && window.location.href.includes('home')) {
      setGamesData();
    }
  };

  useEffect(() => {
    if (window.location.href.includes('collection')) {
      setGamesData(getLocalStorage());
    }
  }, []);

  useEffect(() => {
    if (window.location.href.includes('home')) {
      async function fetchData() {
        await axios
          .get(
            `https://api.boardgameatlas.com/api/search?name=${research}&client_id=EG3knn8hUY`
          )
          .then((response) => {
            setGamesData(response.data.games);
          })
          .catch((error) => console.log(error));

        if (!research) {
          setGamesData();
        }
      }
      fetchData();
    }
  }, [research]);

  const getLocalStorage = () => {
    if (localStorage.getItem('dboardgameStorage')) {
      return JSON.parse(localStorage.getItem('dboardgameStorage'));
    } else {
      return [];
    }
  };

  const removeFromStorage = (id) => {
    let dataToStore = getLocalStorage();
    let index = dataToStore.findIndex((game) => game.id === id);
    dataToStore.splice(index, 1);
    saveLocalStorage(dataToStore);
    // setInStore(false);
  };

  const saveLocalStorage = (dataToStore) => {
    localStorage.setItem('dboardgameStorage', JSON.stringify(dataToStore));
  };

  return (
    <section className='form'>
      <div className='form__input'>
        <form action=''>
          <input
            type='text'
            className='search-input'
            placeholder="Entrez le nom d'un jeu"
            onInput={dataBinding}
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = "Entrez le nom d'un jeu")}
          />
        </form>
      </div>
      <div className='games'>
        {window.location.href.includes('home')
          ? research &&
            gamesData &&
            gamesData.map((game) => (
              <Games
                key={game.id}
                game={game}
                getLocalStorage={getLocalStorage}
                saveLocalStorage={saveLocalStorage}
                removeFromStorage={removeFromStorage}
              />
            ))
          : gamesData &&
            gamesData.map((game) => (
              <Games
                key={game.id}
                game={game}
                getLocalStorage={getLocalStorage}
                saveLocalStorage={saveLocalStorage}
                removeFromStorage={removeFromStorage}
              />
            ))}
      </div>
    </section>
  );
}
