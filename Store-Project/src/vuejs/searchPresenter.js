import SearchResultsView from "../views/searchResultsView.js";
import SearchFormView from "../views/searchFormView";
import promiseNoData from "../views/promiseNoData";
import resolvePromise from "../resolvePromise";
import {searchDishes} from "../dishSource";

const Search={   // ordinary JS object literal, can have methods like render()
    props: ["model"],
    data(){
        return{
            searchType:{},
            searchQuery:{},
            searchResultsPromiseState: {},
        };
        /*will be added when you work with component state*/ },
    created(){
        if(!this.searchResultsPromiseState.promise){
            resolvePromise(searchDishes({}), this.searchResultsPromiseState,);
        }
        /*lifecycle:  move the first search initialization here! */},


    render(){
        function selectChangeACB(selectChange){
            this.searchType = selectChange;
        }
        function inputChangeACB(searchText){
           this.searchQuery = searchText;
        }
        function searchButtonACB(){
            console.log(this.searchQuery)
            resolvePromise(searchDishes({"query": this.searchQuery, "type": this.searchType}), this.searchResultsPromiseState);
        }




        return (<div>

            <SearchFormView dishTypeOptions={["starter", "main course", "dessert"]}   onSearchButtonClicked={searchButtonACB.bind(this)} onInputChange ={inputChangeACB.bind(this)}
                            onSelectChange = {selectChangeACB.bind(this)}
            />
            { promiseNoData(this.searchResultsPromiseState) ||
                <SearchResultsView searchResults = {this.searchResultsPromiseState.data} onPicAndTextClick ={aDishClickACB.bind(this)}/> }
        </div>)



        function aDishClickACB (dish){
            this.model.setCurrentDish(dish.id)
        }



        /* re-use the TW2 functional component code, but replace props with this!
        Do not forget to bind the callbacks!
                   onSomeCustomEvent={someACB.bind(this)}
*/
    },
};

export default Search;



