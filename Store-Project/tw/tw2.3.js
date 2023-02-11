import render from "./teacherRender.js";


// make webpack load the file only if it exists
const X= TEST_PREFIX;
let SearchFormView;

try{
    SearchFormView=require("/src/views/"+X+"searchFormView.js").default;
}catch(e){
    render(<div>Please define /src/views/searchFormView.js</div>,  document.getElementById('root'));
}
if(SearchFormView)    
    render(
        <SearchFormView dishTypeOptions={["starter", "main course", "dessert"]}
                        onInputChangeABC={function searchTextACB(text){ console.log("user wants to set the dish search text ", text); }}
                        onselectChangeABC={function searchTypeCB(type){ console.log("user wants to set the dish search type ", type); }}
                        onButtonClickABC={function searchNowACB(){ console.log("user wants to search now!"); }}
        />,
        document.getElementById('root')
    );
