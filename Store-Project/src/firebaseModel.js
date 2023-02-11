// Add relevant imports here
import firebaseConfig from "/src/firebaseConfig.js";
import {getDishDetails} from "./dishSource";
import DinnerModel from "./DinnerModel";

// TODO

// Initialise firebase
firebase.initializeApp(firebaseConfig);
const REF="dinnerModel31";
firebase.database().ref(REF+"/test").set("dummy");
// TODO

function observerRecap(model) {
    model.addObserver(SomeFunctionACB);
    function SomeFunctionACB(payload){
        console.log(payload)
    }
}

function firebaseModelPromise() {
    function makeBigPromiseACB(firebaseData) {
        console.log("rgsdfg")
        //console.log(Object.keys(firebaseData.val().addedDishes))
        console.log(firebaseData.val())
        console.log("fdgfdgf")
        let addedDishes = firebaseData.val()?.addedDishes ? firebaseData.val().addedDishes : []; //using val()? instead of val()
        //let dishes = firebaseData.val()?.ourDishes ?? [];
        const dishPromiseArray= Object.keys(addedDishes).map(makeDishPromiseCB);
        //TODO
        function makeDishPromiseCB(dishID){
            return getDishDetails(dishID);
        }

        function createModelACB(dishArray){
            console.log("13123")
            console.log(dishArray)
            console.log(dishArray)
            console.log("2413")
            let numberOfGuests = firebaseData.val()?.numberOfGuests ? firebaseData.val().numberOfGuests : 2; //using val()? instead of val()
            return new DinnerModel(numberOfGuests, dishArray)

        }


        return Promise.all(dishPromiseArray).then(createModelACB)
    }


    return firebase.database().ref(REF /* <-- note! Whole object! */).once("value").then(makeBigPromiseACB);;
}

function updateFirebaseFromModel(model) {


    function SomeFunction(payload){
        if (payload === undefined) {
            return;
        }


        if (payload.changedNumOfGuests) {
            firebase.database().ref(REF + "/numberOfGuests").set(model.numberOfGuests);
        }

        if (payload.currDishIsSet){
            firebase.database().ref(REF+"/CurrentDishSet/").set(model.currentDish)
        }
        if(payload.addedDish) {
            firebase.database().ref(REF+"/addedDishes/" + payload.addedDish.id).set(model.dishes)

        }
        if (payload.removedDish){
            firebase.database().ref(REF+"/addedDishes/" + payload.removedDish.id).set(null)
        }


    }
    return model.addObserver(SomeFunction)
}

function updateModelFromFirebase(model) {
    firebase.database().ref(REF+ "/numberOfGuests").on("value",
        function guestsChangedInFirebaseACB(firebaseData){ model.setNumberOfGuests(firebaseData.val());}
    );


    firebase.database().ref(REF+"/CurrentDishSet/").on("value", currentDishChangedInFirebaseACB)

    firebase.database().ref(REF+"/addedDishes/").on("child_added", aDishIsAddedACB)

    firebase.database().ref(REF+"/addedDishes/").on("child_removed", aDishIsRemovedACB)


    function aDishIsAddedACB(firebaseData){
        if (!Boolean(model.dishes.find(dish => dish.id == firebaseData.key))) {
            getDishDetails(+firebaseData.key).then(function suitableCallbackName(dish){ model.addToMenu(dish) } );
        }

    }
    function aDishIsRemovedACB(firebaseData){
       model.removeFromMenu({id:+firebaseData.key})
    }

    function currentDishChangedInFirebaseACB(firebaseData){
       model.setCurrentDish(firebaseData.val());
    }



    //TODO
    return;
}

// Remember to uncomment the following line:
 export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase};