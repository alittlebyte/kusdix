import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//JSON request
const fetchAutos = () => {
	return axios.get('https://rawgit.com/Varinetz/e6cbadec972e76a340c41a65fcc2a6b3/raw/90191826a3bac2ff0761040ed1d95c59f14eaf26/frontend_test_table.json')
}

//state
const initialState = {
	autos: [],
	loading: false,
	error: null
}

//actions
const loadAutos = () => ({
	type:'LOAD_AUTOS'
})
const getAutos = data => ({
	type:'GET_AUTOS',
	payload:data
})
const errAutos = err => ({
	type:'ERR_AUTOS',
	payload:err
})
export const addAuto = auto => ({
	type:'ADD_AUTO',
	payload:auto
})
export const deleteAuto = autoId => ({
	type:'DELETE_AUTO',
	payload:autoId
})

//action-creators
export const listAutos = () => dispatch => {
	dispatch(loadAutos())

	return fetchAutos()
		.then( res => dispatch(getAutos(res.data)))
		.catch( err => dispatch(errAutos(err)))
}

//reducers
const reduceAutos = (state = initialState, action) => {
	switch(action.type){
		case 'LOAD_AUTOS':
			return {
				...state,
				loading: true
			};
		case 'GET_AUTOS':
			return { 
				autos: action.payload,
				loading: false,
				error: null
			};
		case 'ERR_AUTOS':
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case 'ADD_AUTO':
			let lastId; 
			if(!state.autos.length){
				lastId = 0
			} else {
				lastId = state.autos[state.autos.length-1].id
			}
			let addedAuto = {id:lastId+1, ...action.payload}
			return{
				...state,
				autos:[...state.autos,addedAuto]
			}
		case 'DELETE_AUTO':
			return{
				autos:state.autos.filter(item => item.id !== parseInt(action.payload))
			}
		default:
			return state;
	}
}

//store
const store = createStore(
	reduceAutos, 
	applyMiddleware(thunk)
);

export default store;