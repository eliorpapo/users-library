import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import './assets/scss/global.scss';
import { AppHeader } from './cmps/AppHeader';
import { UserApp } from './pages/UserApp';
import { UserDetails } from './pages/UserDetails';

export function App() {
  return (
    <Router>
      <div className='App'>
        <AppHeader />
        <main className='container'>
          <Switch>
            <Route component={UserDetails} path='/user/:id' />
            <Route component={UserApp} path='/' />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
