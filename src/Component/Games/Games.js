import React from 'react';
import './Games.css';
import { BsCheckCircle as Checkbox } from 'react-icons/bs';
import { IconContext } from 'react-icons';

export default function Games(props) {
  const title =
    props.game.handle.charAt(0).toUpperCase() +
    props.game.handle.slice(1).split('-').join(' ');

  const checkIfGameStored = (id) => {
    let userStorage = getLocalStorage();
    return userStorage.find(game => game.id === id)
  } 

  const getLocalStorage = () => {
    if (localStorage.getItem('dboardgameStorage')) {
      return JSON.parse(localStorage.getItem('dboardgameStorage'));
    } else {
      return [];
    }
  };

  const addToStorage = () => {
    let dataToStore = getLocalStorage();
    let gameToStore = createGameObject()
    dataToStore.push(gameToStore);
    saveLocalStorage(dataToStore);
  };

  const createGameObject = () => {
    return {
      id: props.game.id,
      date: props.game.year_published,
      name: title,
      min_players: props.game.min_players,
      max_players: props.game.max_players,
      min_playtime: props.game.min_playtime,
      max_playtime: props.game.max_playtime,
      picture: props.game.images.medium,
      GamePlayedNumber: 0,
    };
  };

  const removeFromStorage = (id) => {
    let dataToStore = getLocalStorage();
    let index = dataToStore.findIndex((game) => (game.id = id));
    dataToStore.splice(index, 1);
    saveLocalStorage(dataToStore);
  };

  const saveLocalStorage = (dataToStore) => {
    localStorage.setItem('dboardgameStorage', JSON.stringify(dataToStore));
  };

  return (
    <div className={'game-card' + checkIfGameStored && 'stored'}>
      <img
        src={props.game.images.medium}
        alt='Photo du jeu'
        className='game-card__img'
      />
      <h2 className='game-card__title'>{title}</h2>
      <div className='game-card__data'>
        <p>{props.game.year_published}</p>
        <span>-</span>
        <p>
          {props.game.min_players ? props.game.min_players : '?'}&nbsp; à &nbsp;
          {props.game.max_players ? props.game.max_players : '?'} &nbsp;joueurs
        </p>
        <span>-</span>
        <p>
          {props.game.min_playtime ? props.game.min_playtime : '?'}&nbsp; à
          &nbsp;{props.game.max_playtime ? props.game.max_playtime : '?'}{' '}
          &nbsp;min
        </p>
      </div>
      <IconContext.Provider value={{ size: '24px' }}>
        <span className='checkbox'>
          <Checkbox onClick={() => addToStorage()} />
        </span>
      </IconContext.Provider>
    </div>
  );
}
