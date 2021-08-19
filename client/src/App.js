import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Alert from './components/layout/Alert';
import Comics from './components/comics/Comics';
import CompletedComics from './components/comics/CompletedComics';
import HotComics from './components/comics/HotComics';
import ReadItem from './components/comics/ReadItem';
import ChapterItem from './components/comics/ChapterItem';
import ComicGenres from './components/comics/ComicGenres';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { useEffect } from 'react';
import Footer from './components/layout/Footer';
import Search from './components/comics/Search';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <NavBar />
      <Alert />
      <Router>
        <Switch>
          <Route path='/' exact component={Comics} />
          <Route path='/search' exact component={Search} />
          <Route path='/completed-comics' exact component={CompletedComics} />
          <Route path='/genre/:genreName' exact component={ComicGenres} />
          <Route path='/hot-comics' exact component={HotComics} />
          <Route path='/comic/:id' exact component={ReadItem} />
          <Route path='/comic/:comicSlug/:id' exact component={ChapterItem} />
          <Route path='/register' exact component={Register} />
          <Route path='/login' exact component={Login} />
        </Switch>
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;
