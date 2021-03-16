import './CountryListItem.css';

interface CountryListItemProps {
    key: string | number,
    flagUrl: string,
    population: number,
    region: string,
    capital: string
}

const CountryListItem = (props: CountryListItemProps) => {

    return (
        <div className="item-frame">
            <img src={props.flagUrl} alt="flag" />
            <div>
                <div className="name"></div>

                <div className="country-item">
                    <div className="small-label">Population:</div>
                    <div className="value">{props.population}</div>
                </div>
                
                <div className="country-item">
                    <div className="small-label">Region:</div>
                    <div className="value">{props.region}</div>
                </div>

                <div className="country-item">
                    <div className="small-label">Capital:</div>
                    <div className="value">{props.capital}</div>
                </div>

            </div>
        </div>
    );
}

export default CountryListItem;