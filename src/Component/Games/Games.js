import { React, useEffect, useState } from 'react';
import './Games.css';
import { BsCheckCircle as Checkbox } from 'react-icons/bs';
import { IconContext } from 'react-icons';

export default function Games(props) {
  const title =
    props.game.handle.charAt(0).toUpperCase() +
    props.game.handle.slice(1).split('-').join(' ');

  const [inStore, setInStore] = useState(false);

  //------------------------------------------------ Check if game is in storage
  useEffect(() => {
    if (checkIfGameStored(props.game.id)) {
      setInStore(true);
    }
  }, []);

  //------------------------------------------------ Check if game is already in storage when click on checkbox and act in consequences
  const handleClickOnCheckbox = () => {
    if (inStore) {
      props.removeFromStorage(props.game.id);
      setInStore(false);
    } else {
      addToStorage();
    }
  };

  const checkIfGameStored = (id) => {
    let userStorage = props.getLocalStorage();
    return userStorage.find((game) => game.id === id);
  };

  const addToStorage = () => {
    let dataToStore = props.getLocalStorage();
    let gameToStore = createGameObject();
    dataToStore.push(gameToStore);
    props.saveLocalStorage(dataToStore);
    setInStore(true);
  };

  const createGameObject = () => {
    return {
      id: props.game.id,
      year_published: props.game.year_published,
      handle: title,
      min_players: props.game.min_players,
      max_players: props.game.max_players,
      min_playtime: props.game.min_playtime,
      max_playtime: props.game.max_playtime,
      images: { medium: props.game.images.medium },
    };
  };

  return (
    <div className={'game-card' + (inStore ? ' stored' : '')}>
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
        <span className={'checkbox' + (inStore ? ' full' : '')}>
          <Checkbox onClick={() => handleClickOnCheckbox()} />
        </span>
      </IconContext.Provider>
    </div>
  );
}
