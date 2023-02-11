/* This is an example of a JavaScript class.
   The Model keeps only abstract data and has no notions of graohics or interaction
*/
import {searchDishes, getDishDetails} from "./dishSource";
import resolvePromise from "./resolvePromise";


class DinnerModel {
    constructor(nrGuests = 2, dishArray = [], currentDish) {
        this.observers =[];
        this.setNumberOfGuests(nrGuests);
        this.dishes = dishArray;
        this.searchParams = {};
        this.searchResultsPromiseState = {};
        this.currentDishPromiseState = {};

    }

    /*
     * // if() and throw exercise
        // TODO throw an error if the argument is smaller than 1 or not an integer
        // the error message must be exactly "number of guests not a positive integer"
        // to check for integer: test at the console Number.isInteger(3.14)
     * // TODO if the argument is a valid number of guests, store it in this.numberOfGuests
        // when this is done the TW1.1 DinnerModel "can set the number of guests" should pass
        // also "number of guests is a positive integer"
     */
    setNumberOfGuests(nr) {
        if (Number.isInteger(nr) === false || nr < 1)
            throw("number of guests not a positive integer");

        if (nr !== this.numberOfGuests){
            this.numberOfGuests = nr;
            this.notifyObservers({changedNumOfGuests: nr});
        }

    }

    /*
    * array spread syntax example. Make sure you understand the code below.
    * It sets this.dishes to a new array [   ] where we spread (...) the previous value
    ***/

    addToMenu(dishToAdd) {
        if(this.dishes.find(isDishInMenuCB)){
            return;
        }
        this.dishes= [...this.dishes, dishToAdd];
        this.notifyObservers({addedDish: dishToAdd})

        function isDishInMenuCB(dish){
            return dish.id === dishToAdd.id;
        }
    }

    removeFromMenu(dishToRemove) {
        if(!this.dishes.find(isDishInMenuCB)){
            return;
        }

        this.dishes = this.dishes.filter(hasSameIdCB);
        this.notifyObservers({removedDish: dishToRemove});

        function isDishInMenuCB(dish){
            return dish.id === dishToRemove.id;
        }

        // callback exercise! Also return keyword exercise
        function hasSameIdCB(dish) {
            // TODO return true if the id property of dish is _different_ from the dishToRemove's id property
            if (dish.id !== dishToRemove.id)
                return true

            // This will keep the dish when we filter below.
            // That is, we will not keep the dish that has the same id as dishToRemove (if any)
        }
        // the test "can remove dishes" should pass
    }

    /*
       ID of dish currently checked by the user.
       A strict MVC/MVP Model would not keep such data, 
       but we take a more relaxed, "Application state" approach. 
       So we store also abstract data that will influence the application status.
     */

    setCurrentDish(id) {
        if (this.currentDish === id || id == undefined) {
            return;}

        this.currentDish = id;
        this.notifyObservers({currDishIsSet: id})
        resolvePromise(getDishDetails(id), this.currentDishPromiseState, this.notifyObservers.bind(this));
    }

    setSearchQuery(q) {
        this.searchParams.query = q
    }

    setSearchType(t) {

        this.searchParams.type = t
    }

    doSearch(queryAndType) {
        resolvePromise(searchDishes(queryAndType), this.searchResultsPromiseState, this.notifyObservers.bind(this));

    }

    addObserver(callback){
        console.log(callback)
        console.log(callback)
        console.log(callback)
        this.observers = [...this.observers, callback];
    }

    removeObserver(callback){
        this.observers = this.observers.filter(sameCB);

        function sameCB(arg){
            return arg !== callback;
        }
    }


    notifyObservers(payload){
        console.log(payload)

      //
        try{  this.observers.forEach(invokeObserverCB) }catch(err){console.error(err); }
        function invokeObserverCB(obs)
        { obs(payload); }
    }

}


export default DinnerModel;
