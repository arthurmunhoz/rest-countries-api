import Country from '../../model/Country';
import './CountryListItem.css';

interface CountryListItemProps {
    key: string | number,
    country: Country,
    clickCallback: Function,
    darkTheme: boolean
}

export const formatPopulationNumber = (population: number) => {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const CountriesListItem = (props: CountryListItemProps) => {
    return (
        <div className={`item-frame ${props.darkTheme ? " dark-item-frame" : ""}`} onClick={() => {props.clickCallback(props.country.capital)}}>
            <img src={props.country.flag} alt="flag" />
            <div>
                <div className="name">{props.country.name}</div>

                <div className="country-item">
                    <div className="small-label">Population:</div>
                    <div className="value">{formatPopulationNumber(props.country.population)}</div>
                </div>
                
                <div className="country-item">
                    <div className="small-label">Region:</div>
                    <div className="value">{props.country.region}</div>
                </div>

                <div className="country-item">
                    <div className="small-label">Capital:</div>
                    <div className="value">{props.country.capital}</div>
                </div>

            </div>
        </div>
    );
}

export default CountriesListItem;