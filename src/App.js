import './App.css';
import Navbar from  './Components/Navbar';
import Home from './Components/Home';
import AllComments from './Components/AllComments';
import EditUser from './Components/EditComment';
import NotFound from './Components/NotFound';

import DetailPage from './Components/DetailPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddComment from './Components/AddComment';

function App() {
  return (
    <Router>
      <div className='container'>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/all" component={AllComments} exact />
        <Route path="/detailpage/:landmark_id" component={DetailPage} exact />
        <Route path="/add/:landmark_id" component={AddComment} exact />
        <Route path="/edit/:id" component={EditUser} exact />
        <Route component={NotFound} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
