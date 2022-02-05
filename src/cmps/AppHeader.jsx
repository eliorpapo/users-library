import { NavLink, withRouter } from 'react-router-dom';

function _AppHeader(props) {
  return (
    <header className='app-header'>
      <section className='container'>
        <h1 className='logo'>Users Library</h1>
        <section className='back-container'>
          <button className='back-btn' onClick={props.history.goBack}>
            Back
          </button>
        </section>
        <nav>
          <NavLink activeClassName='my-active' exact to='/'>
            Home
          </NavLink>
        </nav>
      </section>
    </header>
  );
}

export const AppHeader = withRouter(_AppHeader);
