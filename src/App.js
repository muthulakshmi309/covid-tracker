import './App.css';
import { useEffect, useState, setState } from 'react';
import GlobalInfo from './global-info';
import CountryInfo from './country-info';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const [covidData, setCovidData] = useState([]);

  useEffect(() => {
    fetch('https://covid-api.mmediagroup.fr/v1/cases')
      .then(response => response.json()).then((dt) => {
        setCovidData(dt);
      });
  }, []);

  return (
    <div className="covid-info">
      <Router>
        <Switch>
          <Route exact path="/"><GlobalInfo covidData={covidData} /></Route>
          <Route path="/global"><GlobalInfo covidData={covidData} /></Route>
          <Route path="/country/:name"><CountryInfo /></Route>
          <Route path="*"><GlobalInfo covidData={covidData} /></Route>
          
          {/* <Route render={() => <Redirect to="/" />} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
