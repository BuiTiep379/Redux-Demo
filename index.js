const redux = require('redux')
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()
const applyMiddleware = redux.applyMiddleware 
const createStore = redux.createStore
const combineReducers = redux.combineReducers


const BUY_CAKE = 'BUY_CAKE'
const BUY_ICE_CREAM = 'BUY_ICE_CREAM'

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

function buyIceCream() {
    return {
        type: BUY_ICE_CREAM,
        info: 'Second redux action'
    }
}

// (previousState, action) ==> newState

const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfIceCreams: 20
}
const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case BUY_CAKE: 
            return {
                ...state,
                numOfCakes: state.numOfCakes -1
            }   
        default: 
            return state
    }
}
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
        case BUY_ICE_CREAM: 
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams -1
            }  
        default: 
            return state
    }
}


const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial state', store.getState())
const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()