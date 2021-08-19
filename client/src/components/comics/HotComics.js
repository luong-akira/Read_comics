import React, { useEffect, useState } from 'react';
import axios from 'axios';
const HotComics = () => {
  const [comics, setComics] = useState([]);
  useEffect(() => {
    axios.get('/comic/hotcomics').then((res) => setComics(res.data));
    document.title = 'Hot comic';
  }, []);
  return (
    <div>
      <table
        class='table'
        style={{ width: '40%', margin: '2rem auto 2rem', textAlign: 'center' }}
      >
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>Order</th>
            <th scope='col'>Name</th>
            <th scope='col'>Views</th>
          </tr>
        </thead>
        <tbody>
          {comics &&
            comics.map((comic, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <a
                    href={`/comic/${comic.slug}`}
                    style={{ textDecoration: 'none', color: 'cyan' }}
                  >
                    <td>{comic.name}</td>
                  </a>
                  <td>{comic.totalCount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default HotComics;
