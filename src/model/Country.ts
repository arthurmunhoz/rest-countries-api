export default class Country {
    name: string = "";
    nativeName: string = "";
    flag: string = "";
    population: number = 0;
    region: string = "";
    subregion: string = "";
    numericCode: string = "-1";
    capital: string = "";
    borders: string[] = [];
    languages: {iso639_1: string, iso639_2: string, name: string, nativeNameiso639_1: string}[] = [];
    topLevelDomain: string = "";
    alpha3Code: string = "";
    currencies: { code: string, name: string, symbol: string }[] = [];
}