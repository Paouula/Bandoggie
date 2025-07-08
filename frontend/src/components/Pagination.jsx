import React from 'react';

const Pagination = () => {
  return (
    <div className="pagination">
      <div className="pagination-controls">
        <button className="pagination-button">Anterior</button>
        <span className="pagination-separator">|</span>
        <button className="pagination-button">Siguiente</button>
      </div>
    </div>
  );
};

export default Pagination;