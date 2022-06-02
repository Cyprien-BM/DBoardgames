import axios from 'axios';
import { React, useState, useEffect } from 'react';
import './Form.css';
import Games from '../Games/Games';

export default function Form() {
  const [research, setResearch] = useState();
  const [gamesData, setGamesData] = useState();
  const [sorting, setSorting] = useState();

  const dataBinding = (event) => {
    if (event.target.classList.contains('search-input')) {
      setResearch(event.target.value);
    }
    if (!event.target.value && window.location.href.includes('home')) {
      setGamesData();
    }
    if (event.target.classList.contains('form__select')) {
      setSorting(event.target.value);
    }
  };

  console.log(research);

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

  useEffect(() => {
    if (gamesData) {
      const newGameArr = [...gamesData];
      switch (sorting) {
        case 'date':
          newGameArr.sort((a, b) => b.year_published - a.year_published);
          setGamesData(newGameArr);
          break;
        case 'players':
          newGameArr.sort((a, b) => b.max_players - a.max_players);
          setGamesData(newGameArr);
          break;
        case 'time':
          newGameArr.sort((a, b) => b.max_playtime - a.max_playtime);
          setGamesData(newGameArr);
          break;
      }
    }
  }, [sorting]);

  console.log(gamesData);

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
      <div className='form__container'>
        <form action='' className='form__fields'>
          <input
            type='text'
            className='search-input'
            placeholder="Entrez le nom d'un jeu"
            onInput={dataBinding}
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = "Entrez le nom d'un jeu")}
          />
          <div className='select__container'>
            <label className='select__label' htmlFor='sorting'>
              {' '}
              Filtrer par :{' '}
            </label>
            <select
              name=''
              id='sorting'
              className='form__select'
              onInput={dataBinding}
            >
              <option value=' '>-</option>
              <option value='date'>Date de sortie</option>
              <option value='players'>Nombre max de joueurs</option>
              <option value='time'>Durée max d'une partie</option>
            </select>
          </div>
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
