import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import routes from './routers/routes';
import store from './stores/store';

store.subscribe(() => {
    console.log(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('app')
);

/*
render(
    (<Router routes={routes} history={browserHistory}/>),
    document.getElementById('app')
);
*/
