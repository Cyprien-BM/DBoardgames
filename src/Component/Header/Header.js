import React from 'react';
import './Header.css';
import Button from '../Button/Button';

export default function Header() {
  return (
    <header>
      <div>
        <h1 className='title'><span className='title-db'>DB</span>oardgames</h1>
      </div>
      <div className='header-button'>
        <Button txt={'Acceuil'} destination={'/'} />
        <Button txt={'Ma collection'} destination={'/collection'} />
      </div>
    </header> 
  )
}
