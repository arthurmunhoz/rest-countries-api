import { useHistory } from "react-router-dom";
import { useQuery } from "../../App";
import Country from "../../model/Country";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import './CountryDetails.css'
import { getCountryByCode } from "../../api/APIManager";
import { useEffect, useState } from "react";
interface CountryDetailsProps {
  list: Country[],
  darkTheme: boolean
}

const CountryDetails = (props: CountryDetailsProps) => {

  const query = useQuery();
  const history = useHistory();

  const [country, setCountry] = useState<Country>();

  useEffect(() => {
    getCountryByCode(query.get("countryCode")!.toLocaleLowerCase()).then(res => {
      setCountry(res as Country);
    });
  }, []);

  useEffect(() => {
    console.log("country: ", country);
  }, [country]);

  return (
    country ? <div className="body">

      <div className="toolbar">
        <div className="button" onClick={() => { history.goBack() }}>
          <KeyboardBackspaceIcon fontSize="small" />
          <p>Back</p>
        </div>
      </div>

      <div className="country-info-frame">
        <img src={country.flag} alt="flag" />
        <div className="text-info-frame">
          <div className="name name-cd">{country.name}</div>
          <div className="info-grid">
            <div className="grid-left">

              <div className="country-item-cd">
                <div className="small-label-cd">Native Name:</div>
                <div className="value-cd">{country.nativeName}</div>
              </div>

              <div className="country-item-cd">
                <div className="small-label-cd">Population:</div>
                <div className="value-cd">{country.population}</div>
              </div>

              <div className="country-item-cd">
                <div className="small-label-cd">Region:</div>
                <div className="value-cd">{country.region}</div>
              </div>

              <div className="country-item-cd">
                <div className="small-label-cd">Sub Region:</div>
                <div className="value-cd">{country.subregion}</div>
              </div>

              <div className="country-item-cd">
                <div className="small-label-cd">Capital:</div>
                <div className="value-cd">{country.capital}</div>
              </div>
            </div>
            <div className="grid-right">
              <div className="country-item-cd">
                <div className="small-label-cd">Top Level Domain:</div>
                <div className="value-cd">{country.topLevelDomain}</div>
              </div>

              <div className="country-item-cd">
                <div className="small-label-cd">Currencies:</div>
                <div className="value-cd">{country.currencies.map(curr => curr.name.concat(" "))}</div>
              </div>

              <div className="country-item-cd">
                <div className="small-label-cd">Languages:</div>
                <div className="value-cd">{country.languages.map(lang => lang.name.concat(" "))}</div>
              </div>
            </div>
          </div>

          <div className="country-item-cd border-countries-frame">
              <div className="small-label-cd">Border countries:</div>
              {
                country.borders.map(ctryAlpha3Code => {
                  return <div className="chip">{props.list.find(c => c.alpha3Code === ctryAlpha3Code)?.name}</div>
                })
              }
            </div>

        </div>
      </div>
    </div> : <></>
  );
}

export default CountryDetails;