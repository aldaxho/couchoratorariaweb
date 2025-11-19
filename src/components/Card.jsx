import React from 'react';
import './Card.css';

const Card = ({ children, title, className = '', ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {title && <div className="card-title">{title}</div>}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
