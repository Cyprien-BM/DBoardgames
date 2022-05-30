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
  };

  useEffect(() => {
    if (research) {
      axios
        .get(
          `https://api.boardgameatlas.com/api/search?name=${research}&client_id=EG3knn8hUY`
        )
        .then((response) => {
          setGamesData(response.data.games);
        })
        .catch((error) => console.log(error));
    } else {
      setGamesData();
    }
  }, [research]);

  console.log(gamesData);

  return (
    <div className='form'>
      <div className='form__input'>
        <form action=''>
          <input
            type='text'
            placeholder="Entrez le nom d'un jeu"
            onInput={dataBinding}
            className='search-input'
          />
        </form>
      </div>
      <div className='games'>
        {gamesData && gamesData.map((game) =>
          <Games key={game.id} game={game} />)}
      </div>
    </div>
  );
}
