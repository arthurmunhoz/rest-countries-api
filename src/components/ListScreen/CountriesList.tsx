import { TextField, ListItemText, Grid, Menu, MenuItem, MenuProps, withStyles, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Country from "../../model/Country";
import CountriesListItem from "../CountryListItem/CountriesListItem";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from "react-router-dom";

export interface CountriesListProps {
  list: Country[]
}

export enum Regions {
  all = 'all',
  africa = 'africa',
  americas = 'americas',
  asia = 'asia',
  europe = 'europe',
  oceania = 'oceania'
};

const CountriesList = (props: CountriesListProps) => {

  const history = useHistory();
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);
  const [region, setRegion] = useState<string>("");
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
      setFilteredList(props.list.filter(country => country.name.toLocaleLowerCase() === filterText.toLocaleLowerCase()));
    }
  }, [filterText]);

  useEffect(() => {
    if (region === Regions.all || region === "") {
      setFilteredList(props.list);
    } else {
      setFilteredList(props.list.filter(country => country.region.toLocaleLowerCase() === region.toLocaleLowerCase()));
    }
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

    const name = filteredList.filter(country => {
      return country.capital === capital;
    })[0].name;

    console.log("Selected: ", name);

    history.push(`/details?country=${name}`);
    // getCountryByCapital(capital).then(res => {
    //   res && setSelectedCountry(res as Country);
    // });
  };

  return (

    <div className="body">
      {
        console.log("LIST >>", props.list)
      }
      <div className="toolbar">
        <div className="search-bar">
          <SearchIcon fontSize={'default'} color={'action'} />
          <TextField
            className="textfield"
            placeholder="Search for a country..."
            onChange={(e) => setFilterText(e.target.value)}
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