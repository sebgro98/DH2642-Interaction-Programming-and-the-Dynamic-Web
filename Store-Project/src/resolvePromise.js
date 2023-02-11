function resolvePromise(promise, promiseState, notify){
    if (promise == null)
        return;
    promiseState.promise=promise;
    promiseState.data= null;           // UI update! The user does not keep seeing results from previous search
    promiseState.error= null;
    NotifyACB()

    function NotifyACB() {
        if (notify) {
            notify();
        }
    }
    function saveDataACB(result){
        if (promiseState.promise !== promise) return;
        promiseState.data= result;
       NotifyACB();
    }  // triggers UI update because of changing state
    function saveErrorACB(err)  {
        if (promiseState.promise !== promise) return;
        promiseState.error= err;
        NotifyACB();

    }    // triggers UI update because of changing state
    promise.then(saveDataACB).catch(saveErrorACB);
}

export default resolvePromise