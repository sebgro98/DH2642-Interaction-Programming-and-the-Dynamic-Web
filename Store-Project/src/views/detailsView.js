function DetailsView(props){

    return(
        <div class="detailsView">
            <p><strong>{props.dishData.title}</strong></p>
            <div>
                <img src = {props.dishData.image} height="200"/>
            </div>
            <div>
                <strong> Price {(props.dishData.pricePerServing).toFixed(2)} KR</strong>
                <p><strong> Price for {props.guests} guests: {(props.guests * props.dishData.pricePerServing).toFixed(2)}</strong> </p>
            </div>

            <div class = "styleTable">
                {props.dishData.extendedIngredients.map(ingredientsTable)}
            </div>
            <div>
                <p>{props.dishData.instructions}</p>
            </div>
            <p><a href={props.dishData.sourceUrl}>More information</a></p>
            <button onClick={addDishToMenuABC} disabled={props.isDishInMenu}>Add to menu</button>
            <button onClick = {CancelButtonABC}>Cancel</button>

        </div>


    );
    function addDishToMenuABC(){
        props.onAddToMenu(props.dishData)
        window.location.hash = "#search"

    }
    function CancelButtonABC () {
        window.location.hash="#search"
    }






    function ingredientsTable(dish){
        return(
            <table>
                <tr>
                    <th>{dish.name}</th>
                    <th>{dish.amount} {dish.unit}</th>

                </tr>
            </table>);
    }
}

export default DetailsView;