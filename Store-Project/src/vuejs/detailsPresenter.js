import DetailsView from "../views/detailsView.js";
import promiseNoData from "../views/promiseNoData";




function Details(props){

    function addToTheMenuABC(){
        props.model.addToMenu(props.model.currentDishPromiseState.data);
    }

    function findDishInMenuCB(dish){

        if(dish.id=== props.model.currentDish) {
            return true;
        }
        return false;
    }

    return promiseNoData(props.model.currentDishPromiseState) || <DetailsView dishData = {props.model.currentDishPromiseState.data}  isDishInMenu= {props.model.dishes.find(findDishInMenuCB)}   guests = {props.model.numberOfGuests}  onAddToMenu={addToTheMenuABC}     />;

}

export default Details;
