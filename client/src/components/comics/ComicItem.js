import React, { Fragment } from 'react';

const ComicItem = ({ comic }) => {
  return (
    <Fragment>
      <div className='col-6 col-sm-4 col-md-3' style={{ textAlign: 'center' }}>
        <a href={`/comic/${comic.slug}`}>
          <img
            src={comic.img}
            width='150px'
            height='230px'
            alt=''
            style={{ display: 'inline-block', marginTop: '2rem' }}
          />
        </a>
        <a
          href={`/comic/${comic.slug}`}
          role='button'
          className='btn btn-outline-dark'
          style={{
            display: 'block',
            marginTop: '2rem',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
        >
          {comic.name}
        </a>
      </div>
    </Fragment>
  );
};

export default ComicItem;
