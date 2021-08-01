import React, {Component, lazy, Suspense} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './Components/Navigation';
import './styles.css'

const MainView = lazy(() => import('./Pages/Main' /* webpackChunkName: "home-page" */));
const MovieInfoView = lazy(() => import('./Pages/MovieInfo' /* webpackChunkName: "movie-page" */));
const SearchView = lazy(() => import('./Pages/SearchMovie' /* webpackChunkName: "search-page" */));

class App extends Component {
  render() {
    return (
      <>
        <Navigation />

        <Suspense fallback="Loading...">
          <Switch>
            <Route path="/" exact component={MainView} />
            <Route path="/movies/:movieId" component={MovieInfoView} />
            <Route path="/movies" component={SearchView} />
            <Redirect to="/" />
          </Switch> 
        </Suspense>
        
        
      </>
    );
  }
}

export default App;
