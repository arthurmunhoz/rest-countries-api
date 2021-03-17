import './App.css';
import NightsStayOutlined from '@material-ui/icons/NightsStayOutlined';
import { getAllCountries, getCountriesByRegion } from './api/APIManager';
import React, { useEffect, useState } from 'react';
import Country from './model/Country';
import CountryListItem from './components/CountryListItem/CountryListItem';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { ListItemIcon, ListItemText, Menu, MenuItem, MenuProps, TextField, withStyles } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const App = () => {

  const [list, setList] = useState<Country[]>([]);
  const [region, setRegion] = useState<string>("");
  const [filterText, setFilterText] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  enum Regions {
    all = 'all',
    africa = 'africa',
    america = 'america',
    asia = 'asia',
    europe = 'europe',
    oceania = 'oceania'
  };

  useEffect(() => {
    getAllCountries().then(res => {
      setList(res);
    })
  }, []);

  useEffect(() => {
    console.log("list", list);
  }, [list]);

  const StyledMenu = withStyles({ paper: { border: '1px solid #d3d4d5' } })((props: MenuProps) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },

  }))(MenuItem);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectRegion = (region: Regions) => {
    console.log("Setting region filter: ", region);
    setRegion(region);
    handleClose();
  }

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
        <div className="toolbar">
          <div className="search-bar">
            <SearchIcon fontSize={'default'} color={'action'} />
            <TextField
              className="textfield"
              placeholder="Search for a country..."
            />
          </div>
          <div className="filter"
            onClick={handleClick}
            aria-controls="customized-menu"
          >
            <p>Filter by region</p>
            <ArrowDropDownIcon fontSize={'default'} />
          </div>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            defaultChecked={false}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem
              style={{ width: "200px" }}
              onClick={() => { handleSelectRegion(Regions.all) }}>
              <ListItemText primary="All" />
            </StyledMenuItem>

            <StyledMenuItem
              onClick={() => { handleSelectRegion(Regions.africa) }}>
              <ListItemText primary="Africa" />
            </StyledMenuItem>

            <StyledMenuItem
              onClick={() => { handleSelectRegion(Regions.america) }}>
              <ListItemText primary="America" />
            </StyledMenuItem>

            <StyledMenuItem
              onClick={() => { handleSelectRegion(Regions.asia) }}>
              <ListItemText primary="Asia" />
            </StyledMenuItem>

            <StyledMenuItem
              onClick={() => { handleSelectRegion(Regions.europe) }}>
              <ListItemText primary="Europe" />
            </StyledMenuItem>

            <StyledMenuItem
              onClick={() => { handleSelectRegion(Regions.oceania) }}>
              <ListItemText primary="Oceania" />
            </StyledMenuItem>
          </StyledMenu>
        </div>

        <div className="grid">
          <Grid container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            {
              list.map((country, index) => {
                return <Grid item
                >
                  <CountryListItem
                    key={country.numericCode}
                    country={country}
                  />
                </Grid>
              })
            }
          </Grid>
        </div>

      </body>
    </div>
  );
}

export default App;