function promiseNoData(props) {
    console.log(props)

    if (!props.promise) {
        return (<div>no data</div>);

    }
    if (!props.data && !props.error) {
        return (<img src="http://www.csc.kth.se/~cristi/loading.gif"/>);
    }
    if (props.error) {
        return (<div>{(props.error).toString()}</div>);
    }

}


export default promiseNoData;