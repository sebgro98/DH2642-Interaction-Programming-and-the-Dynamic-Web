function SearchFormView(props) {
    return (
        <div class="searchFromView">
            <input onChange = {onInputChangeABC}> </input>

            <select onChange = {onselectChangeABC}>
                <option>
                    Choose:
                </option>
                {props.dishTypeOptions.map(dishTypeCB)}
            </select>
            <button onClick={onButtonClickABC} >
                Search!
            </button>

            <button onClick={summaryButtonABC} >
                To Summary!
            </button>

        </div>
    );

    function dishTypeCB (dish) {
        return <option>{dish}</option>
    }

    function onInputChangeABC(text){
        props.onInputChange(text.target.value)
    }

    function onselectChangeABC(options){
        if(options.target.value === "Choose:"){
            return;
        }
        props.onSelectChange(options.target.value)
    }

    function onButtonClickABC(){
        props.onSearchButtonClicked();
    }

    function summaryButtonABC() {
        window.location.hash="#summary"
    }
}

export default SearchFormView