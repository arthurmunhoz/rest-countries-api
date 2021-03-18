import axios from "axios"
import Country from "../model/Country";

/**
 * GET COUNTRIES BY REGION
 * @description Makes a request to get a list of countries, given a region.
 * @param region Specifies which region to look for
 */
export const getCountriesByRegion = async (region: string) => {

    try {
        await axios.get(`https://restcountries.eu/rest/v2/region/${region}`).then(response => {
            console.log("[BY REGION] res: ", response);
            return response.data as Country[];
        });
    } catch (error) {
        console.log(error);
    }

    return [];
}

/**
 * GET COUNTRY BY CAPITAL
 * @description Searches a country using it's capital as search parameter
 * @param capital Capital name
 */
export const getCountryByCapital = async (capital: string) : Promise<Country|undefined> => {

    try {
        await axios.get(`https://restcountries.eu/rest/v2/capital/${capital}`).then(response => {
            console.log("[BY CAPITAL] res: ", response.data);
            return response.data as Country[];
        });
    } catch (error) {
        console.log(error);
    }

    return undefined;
}

/**
 * GET ALL COUNTRIES
 * @description Makes a request to get a list of all countries.
 */
export const getAllCountries = async (): Promise<Country[]> => {
    return new Promise<Country[]>(async (resolve) => {

        try {
            await axios.get("https://restcountries.eu/rest/v2/all").then(res => {
                if (res.data !== undefined && res.data !== null) {
                    console.log("[ALL COUNTRIES] res: ", res.data);
                    resolve(res.data as Country[]);
                }
            });
        } catch (error) {
            console.log(error);
        }

        resolve([]);
    });

}