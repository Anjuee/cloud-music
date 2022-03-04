import React from 'react';
import { Provider } from 'react-redux';
import { GlobalStyle } from './style';
import { HashRouter, useRoutes } from 'react-router-dom';
import store from './store/index';
import routes from './routes/index';

const Pages = () => {
  let element = useRoutes(routes);
  return element;
}

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle />
        {<Pages />}
      </HashRouter>
    </Provider>
  )
}

export default App;
