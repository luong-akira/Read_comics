import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
const ChapterItem = () => {
  const [comic, setComic] = useState();
  const [chapter, setChapter] = useState({});
  let { comicSlug, id } = useParams();
  const [error, setError] = useState('');
  const firstPart = id.substring(0, 8);
  const secondPart = parseInt(id.substring(8));
  useEffect(() => {
    axios
      .get(`/comic/${comicSlug}/${id}`)
      .then((res) => {
        setChapter(res.data);
        document.title = res.data.name;
      })
      .catch((error) => setError(error.response.data.msg));
  }, [comicSlug, id]);
  useEffect(() => {
    axios.get(`/comic/${comicSlug}`).then((res) => {
      setComic(res.data);
    });
  }, [comicSlug, setComic]);
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Fragment>
      <div style={{ textAlign: 'center' }}>
        {comic && chapter && (
          <div>
            <select
              className='custom-select'
              id='inputGroupSelect01'
              name='comic'
              style={{ width: '50%', margin: '2rem auto 2rem' }}
              onChange={(e) => {
                window.location = e.target.value;
              }}
              value={id}
            >
              {comic.chapters.map((chap, index) => (
                <option id={index + 1} value={chap.slug}>
                  {chap.name}
                </option>
              ))}
            </select>
            <div>
              {comic.chapters.findIndex(
                (chap) => chap.name === chapter.name
              ) === 0 ? (
                ''
              ) : (
                <button
                  type='button'
                  onClick={() => {
                    window.location = firstPart + (secondPart - 1).toString();
                  }}
                  className='btn btn-outline-dark mr-5'
                >
                  Prev
                </button>
              )}

              {comic.chapters.length - 1 ===
              comic.chapters.findIndex((chap) => chap.name === chapter.name) ? (
                ''
              ) : (
                <button
                  type='button'
                  onClick={() => {
                    window.location = firstPart + (secondPart + 1).toString();
                  }}
                  className='btn btn-outline-dark ml-5'
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}

        <h1>{chapter.name}</h1>
        {chapter.embededLink &&
          chapter.embededLink.map((src) => {
            return (
              <img
                style={{
                  display: 'block',
                  margin: '2rem auto 2rem',
                  width: '400px',
                }}
                src={src}
                alt=''
              />
            );
          })}
      </div>
      <Comments id={comicSlug} />
    </Fragment>
  );
};

export default ChapterItem;
