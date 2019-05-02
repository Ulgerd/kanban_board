import React, {Component} from 'react';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import Icons from '../icons/icons.svg';

export default class Header extends Component {

  render() {
    return (<div className='header'>
      <div className='XButton'>
        <NavLink to={`/`}>
          <svg fill='blue' width='32' height="25">
            <use xlinkHref={`${Icons}#home`}/>
          </svg>
        </NavLink>
      </div>
    </div>)
  }

}
