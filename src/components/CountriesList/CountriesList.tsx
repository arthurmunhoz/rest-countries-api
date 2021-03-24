/* eslint-disable react-hooks/exhaustive-deps */
import { TextField, ListItemText, Grid, Menu, MenuItem, MenuProps, withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Country from "../../model/Country";
import CountriesListItem from "../CountryListItem/CountriesListItem";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from "react-router-dom";

export interface CountriesListProps {
  list: Country[],
  darkTheme: boolean
}

export enum Regions {
  all = 'All',
  africa = 'Africa',
  americas = 'Americas',
  asia = 'Asia',
  europe = 'Europe',
  oceania = 'Oceania'
};

const CountriesList = (props: CountriesListProps) => {

  const history = useHistory();
  const [region, setRegion] = useState<string>(Regions.all);
  const [filterText, setFilterText] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filteredList, setFilteredList] = useState<Country[]>([]);

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

  useEffect(() => {
    setFilteredList(props.list);
  }, []);

  useEffect(() => {
    setFilteredList(props.list);
    if (filterText === "") {
      setFilteredList(props.list);
    } else {
      setFilteredList(props.list.filter(country => country.name.toLowerCase().includes(filterText.toLowerCase())));
    }
  }, [filterText]);

  useEffect(() => {
    
    setFilterText("")
    
    if (region === Regions.all || region === "") {
      setFilteredList(props.list);
    } else {
      setFilteredList(props.list.filter(country => country.region.toLocaleLowerCase() === region.toLocaleLowerCase()));
    }

    if (document.getElementById("search-textfield")) { 
      document.getElementById("search-textfield")!.title = "" 
  };
  }, [props.list, region]);

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
  };

  const handleCountrySelection = async (capital: string) => {

    const auxCountry = filteredList.filter(country => {
      return country.capital === capital;
    })[0];

    console.log("Selected: ", auxCountry.alpha3Code)

    history.push(`/details?countryCode=${auxCountry.alpha3Code}`);
  };

  return (

    <div className="body">
      <div className="toolbar">
        <div className={`search-bar ${props.darkTheme ? "dark-search-bar" : ""}`}>
          <SearchIcon fontSize={'default'} color={'action'} />
          <TextField
            id="search-textfield"
            className="textfield"
            placeholder="Search for a country..."
            value={filterText === "" ? null : filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <div className={`filter ${props.darkTheme ? "dark-filter" : ""}`}
          onClick={handleClick}
          aria-controls="customized-menu"
        >
          <p>{(region !== Regions.all) ? region : "Filter by region"}</p>
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
            onClick={() => { handleSelectRegion(Regions.all) }}
            selected={region === Regions.all}>
            <ListItemText primary="All" />
          </StyledMenuItem>

          <StyledMenuItem
            onClick={() => { handleSelectRegion(Regions.africa) }}
            selected={region === Regions.africa}>
            <ListItemText primary="Africa" />
          </StyledMenuItem>

          <StyledMenuItem
            onClick={() => { handleSelectRegion(Regions.americas) }}
            selected={region === Regions.americas}>
            <ListItemText primary="Americas" />
          </StyledMenuItem>

          <StyledMenuItem
            onClick={() => { handleSelectRegion(Regions.asia) }}
            selected={region === Regions.asia}>
            <ListItemText primary="Asia" />
          </StyledMenuItem>

          <StyledMenuItem
            onClick={() => { handleSelectRegion(Regions.europe) }}
            selected={region === Regions.europe}>
            <ListItemText primary="Europe" />
          </StyledMenuItem>

          <StyledMenuItem
            onClick={() => { handleSelectRegion(Regions.oceania) }}
            selected={region === Regions.oceania}>
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
            (filteredList && filteredList.length > 0) ?
              filteredList.map((country, index) => {
                return <Grid item
                >
                  <CountriesListItem
                    key={country.numericCode}
                    country={country}
                    clickCallback={handleCountrySelection}
                    darkTheme={props.darkTheme}
                  />
                </Grid>
              })
              :
              <div style={{
                width: "100%",
                height: "calc(100vh - 120px)",
                display: "flex",
                alignItems: "center"
              }}>
                {/* <CircularProgress style={{ marginLeft: "auto", marginRight: "auto" }} /> */}
                <p style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  opacity: "0.5"
                }}>
                  No countries found...
                </p>
              </div>
          }
        </Grid>
      </div>
    </div>
  );
}

export default CountriesList;