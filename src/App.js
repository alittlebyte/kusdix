import React, { Component } from 'react';
import { connect } from 'react-redux';
import store, { listAutos, addAuto, deleteAuto } from './store.js';

import duck from './duck.png';
import './App.css';

class App extends Component{
	constructor(props){
		super(props);

		this.state = {
			title:'',
			description:'',
			year:'',
			color:'white',
			status:'in_stock',
			price:''
		}
	}

	validateData = () => {
		let titleVal = document.querySelector('#title').value
		let titleLabel = document.querySelector('.title_label')
		let yearVal = document.querySelector('#year').value
		let yearLabel = document.querySelector('.year_label')
		let priceVal = document.querySelector('#price').value
		let priceLabel = document.querySelector('.price_label')
		let descVal = document.querySelector('#description').value
		let descLabel = document.querySelector('.description_label')

		if(titleVal === "") {
			titleLabel.style.transform = "translateY(30px)"
			titleLabel.style.fontSize = "12px"
			titleLabel.style.color = "#c4092f"
			titleLabel.textContent = "Название не может быть пустым!"
		} else {
			titleLabel.style.transform = "translateY(-30px)"
			titleLabel.style.fontSize = "15px"
			titleLabel.style.color = "#666"
			titleLabel.textContent = "Название"		
		}		
		
		if(yearVal === "") {
			yearLabel.style.transform = "translateY(30px)"
			yearLabel.style.fontSize = "12px"
			yearLabel.style.color = "#c4092f"
			yearLabel.textContent = "Год не может быть пустым!"
		} else if(!/^(197\d|198\d|199\d|200\d|201\d|2020)$/.test(yearVal)){
			yearLabel.style.transform = "translateY(30px)"
			yearLabel.style.fontSize = "12px"
			yearLabel.style.color = "#c4092f"
			yearLabel.textContent = "Год может быть только числом от 1970 до 2020!"	
		} else {
			yearLabel.style.transform = "translateY(-30px)"
			yearLabel.style.fontSize = "15px"
			yearLabel.style.color = "#666"
			yearLabel.textContent = "Год"	
		}
		if(priceVal === ""){
			priceLabel.style.transform = "translateY(30px)"
			priceLabel.style.fontSize = "12px"
			priceLabel.style.color = "#c4092f"
			priceLabel.textContent = "Цена не может быть пустой!"
		} else if(priceVal < 0) {
			priceLabel.style.transform = "translateY(30px)"
			priceLabel.style.fontSize = "12px"
			priceLabel.style.color = "#c4092f"
			priceLabel.textContent = "Цена не может быть отрицательной!"	
		} else if(Number.isNaN(parseInt(priceVal))){
			priceLabel.style.transform = "translateY(30px)"
			priceLabel.style.fontSize = "12px"
			priceLabel.style.color = "#c4092f"
			priceLabel.textContent = "Цена должна быть числом!"	
		} else {
			priceLabel.style.transform = "translateY(-30px)"
			priceLabel.style.fontSize = "15px"
			priceLabel.style.color = "#666"
			priceLabel.textContent = "Цена"	
		}
		
		if(descVal === ""){
			descLabel.style.transform = "translateY(30px)"
			descLabel.style.fontSize = "12px"
			descLabel.style.color = "#c4092f"
			descLabel.textContent = "Описание не может быть пустым!"
		} else {
			descLabel.style.transform = "translateY(-30px)"
			descLabel.style.fontSize = "15px"
			descLabel.style.color = "#666"
			descLabel.textContent = "Описание"	
		}
	}

	handleAutoData = e => { 
		this.validateData()
		if(e.target.type === "radio" && e.target.name in this.state){
			this.setState({ [e.target.name]:e.target.value })
		} else if (e.target.id in this.state) {
			this.setState({ [e.target.id]:e.target.value })
		}
	}

	handleAutoForm = e => {
		e.preventDefault() 
		if (Object.keys(this.state).every(k => this.state[k]) && !(document.querySelector('.title_label').style.color === "rgb(196, 9, 47)") && !(document.querySelector('.year_label').style.color === "rgb(196, 9, 47)") && !(document.querySelector('.price_label').style.color === "rgb(196, 9, 47)") && !(document.querySelector('.description_label').style.color === "rgb(196, 9, 47)")) {
			this.props.addAuto(this.state)
		}
	}

	handleAutoButton = e => {
		this.props.deleteAuto(e.target.id)
	}

	componentDidMount() {
		store.dispatch(listAutos())
	}

	render(){

		function fixDuplicates(string){
			return string.split(' ').filter(function(allItems,i,a){
					return i === a.indexOf(allItems);
			}).join(' ');
		}

		function changeColor(prop){
			switch(prop){
				case 'white':
					return "#FFF";
				case 'black':
					return "#000";
				case 'grey':
					return "#CBCBCC";
				case 'red':
					return "#D74345";
				case 'green':
					return "#88C504";
				default:
					return;       
			}
		}

		function changeStatus(prop){
			switch(prop){
				case 'in_stock':
					return "В наличии";
				case 'pending':
					return "Ожидается";
				case 'out_of_stock':
					return "Нет в наличии";
				default:
					return;
			}
		}

		function stylizePrice(num){
			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")
		}

		return (
			<div className="App">
				<div className="header">
					<img src={duck} alt="captain quack" />
				</div>
				<h1>¡Ay Caramba!</h1>
				<div className="form_holder">
					<form className="form" onSubmit={this.handleAutoForm} >
						<input type="text" placeholder=" " id="title" onChange={this.handleAutoData}/>
						<label className="title_label" htmlFor="title">Название</label>
						<input type="text" placeholder=" " id="year" onChange={this.handleAutoData} />
						<label className="year_label" htmlFor="year">Год</label>
						<input type="text" placeholder=" " id="price" onChange={this.handleAutoData} />
						<label className="price_label" htmlFor="price">Цена</label>
						<input type="text" placeholder=" " id="description" onChange={this.handleAutoData} />  
						<label className="description_label" htmlFor="description">Описание</label>        
						<div id="color_group">
							<div className="color_group_text">Цвет</div>
							<input className="radio_btn" type="radio" value="white" name="color" id="color_white" onClick={this.handleAutoData} />
							<label className="radio_label" htmlFor="color_white"></label>
							<input className="radio_btn" type="radio" value="black" name="color" id="color_black" onClick={this.handleAutoData} />
							<label className="radio_label" htmlFor="color_black"></label>
							<input className="radio_btn" type="radio" value="grey" name="color" id="color_grey" onClick={this.handleAutoData} />
							<label className="radio_label" htmlFor="color_grey"></label>
							<input className="radio_btn" type="radio" value="red" name="color" id="color_red" onClick={this.handleAutoData} />
							<label className="radio_label" htmlFor="color_red"></label>
							<input className="radio_btn" type="radio" value="green" name="color" id="color_green" onClick={this.handleAutoData} />
							<label className="radio_label" htmlFor="color_green"></label>
						</div>
						<select id="status" onChange={this.handleAutoData}>
							<option value="in_stock">В наличии</option>
							<option value="pending">Ожидается</option>
							<option value="out_of_stock">Нет в наличии</option>
						</select>
						<button type="submit" id="send"> ОТПРАВИТЬ <i className="arrow_right"></i> </button>
					</form>
				</div>


				<div className="table_heading">АВТОМОБИЛИ В НАЛИЧИИ</div>
				<div className="table_holder">
					<table className="table">
						<thead>
							<tr>
								<th>Название</th>
								<th>Год</th>
								<th>Цвет</th>
								<th>Статус</th>
								<th>Цена</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
						{!this.props.autos.length 
						? <tr> 
								<td colSpan="6">Пока что тут пусто. Добавьте своё авто сейчас!</td> 
							</tr> 							
						: this.props.autos.map(auto =>{
							return(
								<tr key={auto.id}>
									<td><div>{fixDuplicates(auto.title)}<p>{auto.description}</p></div></td>
									<td>{auto.year}</td>
									<td><div className="table_circle" style={{backgroundColor:changeColor(auto.color)}}></div></td>
									<td>{auto.status === 'pednding'? changeStatus('pending') : changeStatus(auto.status)}</td>
									<td>{stylizePrice(auto.price)} руб.</td>
									<td><button className="table_button" id={auto.id} onClick={this.handleAutoButton}>Удалить</button></td>
								</tr>
							)
						})}
						</tbody>
					</table>
				</div>
				<div className="footer">
					<p>© 2015 CAPTAIN QUACK</p>
					<p>Десница тысячелетия и моллюск!</p>
				</div>
			</div>
		)
	}

}

const mapStateToProps = state => ({
	autos: state.autos
})

export default connect(mapStateToProps,{addAuto,deleteAuto})(App);