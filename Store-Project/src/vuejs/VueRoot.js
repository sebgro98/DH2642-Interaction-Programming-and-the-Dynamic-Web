// Add relevant imports here

// Define the VueRoot component
import resolvePromise from "../resolvePromise";
import {searchDishes} from "../dishSource";
import SearchFormView from "../views/searchFormView";
import promiseNoData from "../views/promiseNoData";
import SearchResultsView from "../views/searchResultsView";
import {firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase} from "../firebaseModel";
import App from "../views/app";

const VueRoot = {
    // ordinary JS object literal, can have methods like render()
    rootModel: ["props"],

    data(){
        return{
            currPromiseState: {},
        };
        /*will be added when you work with component state*/ },
    created(){

        if(!this.currPromiseState.promise){
            resolvePromise(firebaseModelPromise(), this.currPromiseState, notifyPromiseStateACB.bind(this));
        }

        function notifyPromiseStateACB(){
            if (!this.currPromiseState.data){
                return;
            }

            updateFirebaseFromModel(this.currPromiseState.data)
            updateModelFromFirebase(this.currPromiseState.data)
        }


        /*lifecycle: firebaseModelPromise() move the first search initialization here! */},


    render(){
        return promiseNoData(this.currPromiseState) || <App model={this.currPromiseState.data} />;
    },

}

// Export the VueRoot component
export default VueRoot