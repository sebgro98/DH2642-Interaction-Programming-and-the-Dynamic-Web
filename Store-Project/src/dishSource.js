import {BASE_URL, API_KEY} from "./apiConfig";

function treatHTTPResponseACB(response) {
    if (response.status !== 200) throw new Error("API problem " + response.status);  // or response.status!==200
    return response.json();
}

function getDishDetails(params) {
    return myAPICall("recipes/" + params + "/information");
}

function myAPICall(apiParams) {
    return fetch(BASE_URL + apiParams, {  // object literal
            "method": "GET",              // HTTP method
            "headers": {                  // HTTP headers, also object literal
                'X-Mashape-Key': API_KEY,
                'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            } // end of headers object
        }/* end of second fetch parameter, object */
    ).then(treatHTTPResponseACB);
}


function searchDishes(params) {
    return myAPICall("recipes/search?" + new URLSearchParams(params))
        .then(transformSearchResultACB)


}
function transformSearchResultACB(results) {
    return results.results;
}


export {getDishDetails, searchDishes}
