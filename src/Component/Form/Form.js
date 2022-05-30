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
    if (!event.target.value) {
      console.log('ici');
      setGamesData();
    }
  };

  useEffect(() => {
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
  }, [research]);

  console.log(gamesData);

  return (
    <div className='form'>
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
        {gamesData &&
          gamesData.map((game) => <Games key={game.id} game={game} />)}
      </div>
    </div>
  );
}
