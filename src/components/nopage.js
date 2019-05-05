import React, {Component} from 'react';
import Header from './header.js';
import '../css/nopage.css';


export default class NoPage extends Component {

  render() {
    return (
      <div >
        <Header />
        <div className='no_page'>
          <div>Sorry, this page doesn't exist</div>
          <div>Click the house button icon to return to the front page</div>
        </div>
      </div>
    )
  }
}
