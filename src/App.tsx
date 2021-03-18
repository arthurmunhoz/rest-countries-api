import './App.css';
import NightsStayOutlined from '@material-ui/icons/NightsStayOutlined';
import { getAllCountries } from './api/APIManager';
import React, { useEffect, useState } from 'react';
import Country from './model/Country';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom'
import CountriesList from './components/ListScreen/CountriesList';
import CountryDetails from './components/CountryDetails/CountryDetails';

export const useQuery = ()=> {
  return new URLSearchParams(useLocation().search);
}

const App = () => {

  const [list, setList] = useState<Country[]>([]);

  useEffect(() => {
    getAllCountries().then(res => {
      setList(res);
    })
  }, []);

  useEffect(() => {
    console.log("list", list);
  }, [list]);

  return (

    <div className="frame">
      <div className="header">
        <h3>Where in the world?</h3>
        <div className="theme-switcher">
          <NightsStayOutlined style={{ width: "16px", height: "16px", marginRight: "8px" }} />
          <div>Night mode</div>
        </div>
      </div>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact={true}
            render={(props) => <CountriesList {...props} list={list}/>}
          />
          <Route path="/details" exact={true} component={() => <CountryDetails/>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;