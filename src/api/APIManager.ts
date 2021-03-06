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
 * @param code Capital name
 */
export const getCountryByCode = async (code: string): Promise<Country> => {

    return new Promise<Country>(async (resolve) => {
        try {
            await axios.get(`https://restcountries.eu/rest/v2/alpha/${code}`).then(res => {
                if (res.data !== undefined && res.data !== null) {
                    console.log("[BY CODE] res: ", res.data);
                    resolve(res.data as Country);
                }
            });
        } catch (error) {
            console.log(error);
        }
    });
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