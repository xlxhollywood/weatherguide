import './App.css';
import Navbar from  './Components/Navbar';
import Home from './Components/Home';
import AllComments from './Components/AllComments';
import AddUser from './Components/AddComment';
import EditUser from './Components/EditComment';
import NotFound from './Components/NotFound';

import DetailPage from './Components/DetailPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/all" component={AllComments} exact />

        {/*디테일 이동은 이런식으로 구현하면 될것 같습니다.*/}
        <Route path="/detailpage/:landmark_id" component={DetailPage} exact />

        <Route path="/add" component={AddUser} exact />
        <Route path="/edit/:id" component={EditUser} exact />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
