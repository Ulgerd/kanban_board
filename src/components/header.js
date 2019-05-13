import React from 'react';
import { NavLink } from 'react-router-dom';
import Icons from '../assets/icons/icons.svg';

export default function Header() {
  return (
    <div className='header'>
      <div className='XButton'>
        <NavLink to={`/`}>
          <svg fill='rgb(34, 48, 137)' width='6em' height="3em">
            <use xlinkHref={`${Icons}#home`}/>
          </svg>
        </NavLink>
      </div>
    </div>
  )
}
