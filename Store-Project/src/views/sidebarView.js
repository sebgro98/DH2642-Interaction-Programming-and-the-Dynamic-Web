import {dishType} from "../utilities";
import {sortDishes} from "../utilities";
import {menuPrice} from "../utilities";

function SidebarView(props) {
    return(
        <div class="debug">
            <button onClick={myMinusBtnEventPrinterACB}
                    disabled={ props.number === 1/* some boolean expression involving props.number */} >-</button>
            {props.number}
            <button onClick={myPlusBtnEventPrinterACB}>+</button>

            {//To use javaScript code
                RenderDishes(props, props.dishes, props.number)
            }
        </div>
    );

    //asynchronous callbacks
    function myPlusBtnEventPrinterACB(anEvent) {
        const changedNumberPlus = props.number +1;
        props.onNumberChange(props.number +1);
    } // they will need to access arguments (props) at the next step

    function myMinusBtnEventPrinterACB(anEvent) {
        const changedNumberMinus = props.number - 1;
        props.onNumberChange(props.number - 1);
    }

}

function RenderDishes(props, dishesArray, numberOfGuests){
    function dishesTableRowCB(dish){
        return <tr key={ /* TODO what's a key? */dish.id}>
            <td><button onClick={removeDishButtonEventABC} >x</button></td>
            <td><a href="#details" onClick={setAnewCurrentDishABC}> {dish.title} </a> </td>
            <td> {dishType(dish)} </td>
            <td class="alignTextForQuantity" >{ (dish.pricePerServing * numberOfGuests).toFixed(2) }</td>

        </tr>;

        function removeDishButtonEventABC(){
            props.removeADish(dish);

        }

        function setAnewCurrentDishABC(){
            props.onChangeCurrentDish(dish);

        }

    }


    return <table>
        <thead>
        </thead>
        <tbody>

        {  //  <---- we are in JSX, with this curly brace, we go back to JavaScript
            sortDishes([...dishesArray]).map(dishesTableRowCB)
        }
        <tr>
            <td></td>
            <td>TotalPrice </td>
            <td> </td>
            <td class="alignTextForQuantity">{(menuPrice(dishesArray)*numberOfGuests).toFixed(2)} </td>
        </tr>
        </tbody>
    </table>;
}

export default SidebarView;
export {RenderDishes};   // we export so that tests can analyze the source code