import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import store, { listAutos, addAuto } from '../store/store.js'

import '../styles/App.css'

const AppFn = () => {
		const dispatch = useDispatch()
		const autos = useSelector(state => state.autos)
		const autoHeaders = ['Название','Год','Цвет','Статус','Цена','']

		useEffect(() => {
			dispatch(listAutos())
		},[dispatch])

		return(
			<main className="App">

				<section className="table_heading">АВТОМОБИЛИ В НАЛИЧИИ</section>
				<section className="table_holder">
					<table className="table">
						<thead>
							<tr>
								{autoHeaders.map(header => <th key={autoHeaders.indexOf(header)}>{header}</th>)}
							</tr>
						</thead>
						<tbody>
							{autos.length
								?autos.map(auto => {
									return(
										<Fragment key={auto.id}>
											<tr>
												<td>{auto.title}</td>
												<td>{auto.year}</td>
												<td>{auto.color}</td>
												<td>{auto.status}</td>
												<td>{auto.price}</td>
												<td><button className="table_button">Удалить</button></td>
											</tr>	
											{auto.description
												?<tr><td>{auto.description}</td></tr>
												:null
											}
										</Fragment>
									)	
								})
								:<tr><td colSpan="6">Пока что тут пусто. Добавьте своё авто сейчас!</td></tr>
							}
						</tbody>
					</table>
				</section>
			</main>
		)
}

export default AppFn;