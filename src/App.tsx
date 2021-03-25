import './App.css';
import NightsStayOutlined from '@material-ui/icons/NightsStayOutlined';
import { getAllCountries } from './api/APIManager';
import React, { useEffect, useState } from 'react';
import Country from './model/Country';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom'
import CountriesList from './components/CountriesList/CountriesList';
import CountryDetails from './components/CountryDetails/CountryDetails';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import worldwide from './res/images/worldwide.svg'

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const App = () => {

  const [list, setList] = useState<Country[]>([]);
  const [darkTheme, setDarkTheme] = useState(false);
  
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      button: {
        background: "#FFF",
        margin: theme.spacing(1),
      },
    }),
  );
  
  const classes = useStyles();

  useEffect(() => {
    getAllCountries().then(res => {
      setList(res);
    })
  }, []);

  useEffect(() => {
    console.log("list", list);
  }, [list]);

  const handleThemeChange = () => {
    setDarkTheme(!darkTheme);
  }

  return (

    <div className={`frame ${darkTheme ? "dark-frame" : ""}`}>
      <div className={`header ${darkTheme ? "dark-header" : ""}`}>
        <div className="app-title-frame">
          <img src={worldwide} width="24px" style={{ marginRight:"12px" }} alt="app icon"/>
          <h3>Where in the world?</h3>
        </div>
        <Button
          variant="contained"
          color="inherit"
          className={classes.button.concat(" button-custom").concat(`${darkTheme ? " dark-button-custom" : ""}`)}
          startIcon={<NightsStayOutlined />}
          onClick={handleThemeChange}
        >
          Dark Mode
      </Button>
        {/* <div className="theme-switcher">
          <NightsStayOutlined style={{ width: "16px", height: "16px", marginRight: "8px" }} />
          <div>Night mode</div>
        </div> */}
      </div>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact={true}
            render={(props) => <CountriesList {...props} list={list} darkTheme={darkTheme} />}
          />
          <Route
            path="/details"
            exact={true}
            render={(props) => <CountryDetails {...props} list={list} darkTheme={darkTheme} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;