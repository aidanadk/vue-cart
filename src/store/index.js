import { createStore } from 'vuex'

export default createStore({
	state: {
		pizzas: [],
		category: null,
		sortBy: {
			id: 0,
			name: 'rating',
		},
		cartItems: new Map(),
	},
	getters: {
		getAddedPizzasCount(state) {
			let totalCount = 0
			const pizzas = state.cartItems.values()

			for (const pizza of pizzas) {
				totalCount += pizza.count
			}
			return totalCount
		},
		getAddedPizzsaSum(state) {
			let totalSum = 0
			const pizzas = state.cartItems.values()

			for (const pizza of pizzas) {
				const pizzaTotalPrice = pizza.price * pizza.count
				totalSum += pizzaTotalPrice
			}

			return totalSum
		},
	},
	mutations: {
		GET_PIZZA(state, pizzas) {
			state.pizzas = pizzas
		},
		SET_CATEGORY(state, categoryIndex) {
			state.category = categoryIndex
		},
		SET_SORT(state, sortItem) {
			state.sortBy = { name: sortItem.sortBy, id: sortItem.id }
			switch (sortItem.sortBy) {
				case 'rating':
					return state.pizzas.sort((a, b) => a.rating - b.rating)
				case 'price':
					return state.pizzas.sort((a, b) => a.price - b.price)
				case 'name':
					return state.pizzas.sort((a, b) => (a.name > b.name ? 1 : -1))
			}
		},
		ADD_CART(state, pizza) {
			const stringifiedPizza = JSON.stringify(pizza)
			const isPizzaAdded = state.cartItems.get(stringifiedPizza)

			if (!isPizzaAdded) {
				state.cartItems.set(stringifiedPizza, { ...pizza, count: 1 })
				return
			} else {
				const addedPizza = state.cartItems.get(stringifiedPizza)
				state.cartItems.set(stringifiedPizza, { ...pizza, count: addedPizza.count + 1 })
				return
			}
		},
	},
	actions: {
		async getPizzaAction({ commit }) {
			const response = await fetch('http://localhost:3000/pizzas')
			const jsonPizzas = await response.json()
			commit('GET_PIZZA', jsonPizzas)
		},
		async getFilteredPizzaz({ commit }, category) {
			const response = await fetch(`http://localhost:3000/pizzas?category=${category}`)
			const jsonPizzas = await response.json()
			commit('SET_CATEGORY', category)
			commit('GET_PIZZA', jsonPizzas)
		},
	},
	modules: {},
})
