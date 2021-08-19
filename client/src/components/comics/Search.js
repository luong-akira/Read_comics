import React, { useEffect, useState, Fragment } from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import ComicItem from './ComicItem';
import axios from 'axios';
import './Comics.css';

const Search = () => {
  const [comics, setComics] = useState([]);
  const location = useLocation();
  let search = queryString.parse(location.search).search;

  useEffect(() => {
    axios.get(`/comic/search?search=${search}`).then((res) => {
      setComics(res.data);
      document.title = `All results for ${search}`;
    });
  }, [search]);

  return (
    <Fragment>
      <div className='container'>
        <div className='row'>
          {comics &&
            comics.docs &&
            comics.docs.map((comic) => <ComicItem comic={comic} />)}
        </div>
      </div>
      {comics && comics.paginator && (
        <div style={{ textAlign: 'center', marginTop: '7rem' }}>
          {comics.paginator.hasPrevPage && (
            <a href={`?page=${comics.paginator.prevPage}`}>
              <button type='button' class='btn btn-outline-success'>
                Prev
              </button>
            </a>
          )}

          {Array.from(
            { length: comics.paginator.totalPages },
            (_, i) => i + 1
          ).map((page, index) => {
            return (
              <a href={`?page=${page}`}>
                {page === comics.paginator.currentPage ? (
                  <button id={index + 1} type='button' class='btn btn-success'>
                    {page}
                  </button>
                ) : (
                  <button
                    id={index + 1}
                    type='button'
                    class='btn btn-outline-success'
                  >
                    {page}
                  </button>
                )}
              </a>
            );
          })}
          {comics.paginator.hasNextPage && (
            <a href={`?page=${comics.paginator.nextPage}`}>
              <button type='button' class='btn btn-outline-success'>
                Next
              </button>
            </a>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Search;
