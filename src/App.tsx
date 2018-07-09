import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import TrainEstimateList from '@components/TrainEstimateList';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/" component={ TrainEstimateList }/>
      </Switch>
    </div>
  </Router>
);

export default App;