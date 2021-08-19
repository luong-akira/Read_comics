import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import { capitalize, lowerCase } from 'lodash';
import axios from 'axios';
import Comments from './Comments';
import Rating from './Rating';

const ReadItem = () => {
  let { id } = useParams();
  const [comic, setComic] = useState({});
  useEffect(() => {
    axios.get(`/comic/${id}`).then((res) => {
      setComic(res.data);
      document.title = res.data.name;
    });
  }, [id]);

  if (!comic) {
    return 'Not Found';
  }
  return (
    <Fragment>
      <div style={{ margin: '1rem 3rem 5rem 3rem' }}>
        <img
          src={comic.img}
          width='180px'
          height='276px'
          alt=''
          style={{ display: 'inline' }}
        />
        <section style={{ display: 'inline-block', color: 'green' }}>
          <p>
            <b>Name:</b> {comic.name}
          </p>
          <p>
            <b>Author:</b> {comic.author}
          </p>
          <p>
            <b>Genre:</b>
            {comic.genres &&
              comic.genres.map((genre) => (
                <a href={`/genre/${genre}`} style={{ textDecoration: 'none' }}>
                  {' '}
                  {capitalize(lowerCase(genre))}{' '}
                </a>
              ))}
          </p>
          <p>
            <b>Views: {comic.totalCount}</b>
          </p>
          <Rating id={id} />
          <p>
            <b>Average Rating:</b> {comic.averageRating}
          </p>
          <p>
            <b>Status:</b> {comic.isCompleted ? 'Completed' : 'OnGoing'}
          </p>
          <p>
            <b>Description:</b>
            {comic && comic.description}
          </p>
        </section>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Chapter name</th>
              <th scope='col'>View</th>
              <th scope='col'>Uploaded time</th>
            </tr>
          </thead>
          <tbody>
            {comic.chapters &&
              comic.chapters.map((chapter) => {
                return (
                  <tr>
                    <td>
                      <a
                        style={{
                          textDecoration: 'none',
                          color: '#3e3e3e',
                        }}
                        href={`/comic/${id}/${chapter.slug}`}
                      >
                        {chapter.name}
                      </a>
                    </td>
                    <td>{chapter.counter}</td>
                    <td>
                      <Moment format='DD//MM/YYYY'>{chapter.date}</Moment>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Comments id={id} />
    </Fragment>
  );
};

export default ReadItem;
