import React from 'react';
import Icons from '../assets/icons/icons.svg';

export default function Icon(props) {
  return (
      <div
        className={props.name || 'XButton'}
        onClick={props.onClick ? (e) => props.onClick(e) : null}
      >
        <svg
          fill= {props.fill || 'white'}
          width={props.width || '25'}
          height={props.height || '25'}
        >
          <use xlinkHref={`${Icons}#${props.xlink}`}/>
        </svg>
      </div>
  )
}
