import React from 'react';
import { NavLink } from 'react-router-dom';
import Icons from '../.././assets/icons/icons.svg';

export default function Header() {
  return (
    <div>
      <div className='header XButton'>
        <NavLink to={`/`} className='no_select'>
          <svg
            fill='rgb(34, 48, 137)'
            width='3.8em'
            height="3em"
          >
            <use xlinkHref={`${Icons}#home`}/>
          </svg>
        </NavLink>
      </div>
    </div>
  )
}
