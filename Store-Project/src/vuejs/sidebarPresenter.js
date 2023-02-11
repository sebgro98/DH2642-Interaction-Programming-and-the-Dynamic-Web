import SidebarView from "../views/sidebarView.js";
import render from "../../tw/teacherRender";


export default

function Summary(props){
    function updateGuestNumberABC(numberOfGuests){
        props.model.setNumberOfGuests(numberOfGuests);
    }

    function removeADishABC(dish){
        props.model.removeFromMenu(dish);
    }

    function setCurrentDishABC(dish){
        props.model.setCurrentDish(dish.id);
    }

    return <SidebarView number={props.model.numberOfGuests} dishes={props.model.dishes} onNumberChange = {updateGuestNumberABC} removeADish = {removeADishABC} onChangeCurrentDish={setCurrentDishABC}/>;
}

