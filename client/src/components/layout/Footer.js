import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        textAlign: 'center',
        backgroundColor: '#85dcb1',
        padding: '1rem 0 0',
        marginTop: '15rem',
      }}
    >
      <p
        class='copyright-text'
        style={{ fontFamily: 'cursive', color: 'blue' }}
      >
        Copyright &copy; 2021 All Rights Reserved by Pham Luong.
      </p>
      <div style={{ marginTop: '1rem', paddingBottom: '1rem' }}>
        <a
          href='https://www.facebook.com/Akashiiiiiiiiiiiiiiii/'
          target='_blank'
          rel='noreferrer'
          alt='facebook'
          style={{ margin: '1rem 0 1rem 1rem' }}
        >
          <i class='fab fa-facebook fa-2x'></i>
        </a>
        <a
          href='https://www.instagram.com/luong8099/'
          target='_blank'
          rel='noreferrer'
          alt='instagram'
          style={{ margin: '1rem 0 1rem 1rem' }}
        >
          <i class='fab fa-instagram fa-2x'></i>
        </a>
        <a
          href='https://www.youtube.com'
          target='_blank'
          rel='noreferrer'
          alt='youtube'
          style={{ margin: '1rem 0 1rem 1rem' }}
        >
          <i class='fab fa-youtube fa-2x'></i>
        </a>
        <a
          href='https://www.twitter.com'
          target='_blank'
          rel='noreferrer'
          alt='twitter'
          style={{ margin: '1rem 0 1rem 1rem' }}
        >
          <i class='fab fa-twitter fa-2x'></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
