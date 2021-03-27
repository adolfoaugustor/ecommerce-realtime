'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User')

class UserController {
	/**
	 * Show a list of all users.
	 * GET users
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index({ request, response, pagination }) {
		const { name } = request.only(['name'])

		const query = User.query()

		if (name) {
			query
				.where('name', 'LIKE', `%${name}%`)
				.orWhere('surname', 'LIKE', `%${name}%`)
				.orWhere('email', 'LIKE', `%${name}%`)
		}
		const users = await query.paginate(pagination.page, pagination.perpage)
		return response.send(users)
	}

	/**
	 * Create/save a new user.
	 * POST users
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async store({ request, response }) {
		const data = request.only([
			'name',
			'surname',
			'email',
			'password',
			'image_id'
			])
	
			const user = await User.create(data)

		return response.status(201).send(user)
	}

	/**
	 * Display a single user.
	 * GET users/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async show({ params:{id}, request, response, view }) {
		const user = await User.findOrFail(id)
		try {
			return response.status(200).send(user)
		} catch (error) {
			return response.status(401).send({ message: "Usuário não encontrado!" })
		}
	}

	/**
	 * Update user details.
	 * PUT or PATCH users/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update({ params: { id }, request, response }) {
		const user = await User.findOrFail(id)
		try {
			const userData = request.only(['name', 'surname', 'email', 'password', 'image_id'])
			user.merge(userData)

			return response.status(200).send(user)
		} catch (error) {
			return response.status(401).send({ message: "Não foi possível cadastrar o usuário!" })
		}
	}

	/**
	 * Delete a user with id.
	 * DELETE users/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({ params: { id }, request, response }) {
		const user = await User.findOrFail(id)
		try {
			await user.delete()
			return response.status(204).send()
		} catch (error) {
			return response.status(500).send({ message: "Não foi possível deletar o usuário!" })
		}
	}
}

module.exports = UserController
