import React from 'react';
import Header from './presentational/header.js';
import '../assets/css/nopage.css';

export default function NoPage() {
  return (
    <div >
      <Header />
      <div className='no_page'>
        <h1>Sorry, this page doesn't exist</h1>
        <p>Click the house button icon to return to the front page</p>
      </div>
    </div>
  )
}
