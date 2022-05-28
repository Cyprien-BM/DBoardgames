import axios from 'axios';
import { React, useState, useEffect } from 'react';
import './Form.css';

export default function Form() {
  const [research, setResearch] = useState('');

  const dataBinding = (event) => {
    if (event.target.classList.contains('search-input')) {
      setResearch(event.target.value);
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://api.boardgameatlas.com/api/search?name=${research}&client_id=EG3knn8hUY`
      )
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error))
  }, [research])

  return (
    <div className='form'>
      <div className='form__input'>
        <form action=''>
          <input
            type='text'
            value={research}
            placeholder="Entrez le nom d'un jeu"
            onInput={dataBinding}
            className='search-input'
          />
        </form>
      </div>
    </div>
  );
}
