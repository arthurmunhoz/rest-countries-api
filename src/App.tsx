import './App.css';
import NightsStayOutlined from '@material-ui/icons/NightsStayOutlined';
import { getAllCountries, getCountriesByRegion } from './api/APIManager';
import React, { useEffect, useState } from 'react';
import Country from './model/Country';
import { Row, Col } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import CountryListItem from './components/CountryListItem/CountryListItem';

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
      <header className="header">
        <h3>Where in the world?</h3>
        <div className="theme-switcher">
          <NightsStayOutlined style={{ width: "16px", height: "16px", marginRight: "8px" }} />
          <div>Night mode</div>
        </div>
      </header>
      <body>
        <Grid>
          <Row>
            {
              list.map((country, index) => {
                return <Col xs={12} md={3} lg={3}>
                  <CountryListItem
                    key={country.numericCode}
                    capital={country.capital}
                    region={country.region}
                    population={country.population}
                    flagUrl={country.flag}
                  />
                </Col>
              })
            }
          </Row>
        </Grid>
      </body>
    </div>
  );
}

export default App;