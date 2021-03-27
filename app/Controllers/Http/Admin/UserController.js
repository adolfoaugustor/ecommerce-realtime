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
	async index({ request, response, view }) {
		const name = request.input('name')
		const query = User.query()

		if (name) {
			query.where('name', 'LIKE', `%${name}%`)
			query.orWhere('surname', 'LIKE', `%${name}%`)
			query.orWhere('email', 'LIKE', `%${name}%`)
		}
		const users = await query.pagination(pagination.page, pagination.limit)
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
		try {
			const userData = request.only(['name', 'surname', 'email', 'password', 'image_id'])
			const user = await User.create({ userData })
			return response.status(201).send(user)
		} catch (error) {
			return response.status(400).send({ message: "Não foi possivel cadastrar o usuário!" })
		}
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
	async show({ params, request, response, view }) {
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
	async update({ params, request, response }) {
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
	async destroy({ params, request, response }) {
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
