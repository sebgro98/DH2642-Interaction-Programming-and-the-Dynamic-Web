function SearchResultsView(props) {
    return (<div>

        {props.searchResults.map(getImageAndNameCB)}
    </div>)

    function getImageAndNameCB (dish) {
        return (
            <span onClick = {onPictureSectionClickABC}  class="searchResult">

              <img onClick = {onPictureSectionClickABC} src = {"https://spoonacular.com/recipeImages/" + dish.image } height="100"/>
                <div onClick = {onPictureSectionClickABC}>
                {dish.title}
                </div>
            </span>

        );

        function onPictureSectionClickABC(){
            props.onPicAndTextClick(dish);
            window.location.hash = "#details"
        }


    }

}
export default SearchResultsView;
