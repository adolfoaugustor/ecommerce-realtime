'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Image = use('App/Models/Image')
const { manage_single_upload, manage_multiple_uploads } = use('App/Helpers')
const fs = use('fs')

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  /**
   * Show a list of all images.
   * GET images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * @param {Object} ctx.pagination
   */
  async index ({ request, response, pagination }) {
    const images = await Image.query()
      .orderBy('id', 'DESC')
      .paginate(pagination.page, pagination.limit)

    return response.send(images)
  }

  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      
      const fileJar = request.file('images',{
        types: ['images'],
        size: '2mb'
      })

      let images = []

      if (!fileJar.files) {
        const file = await manage_single_upload(fileJar)
        if (file.moved()) {
          const image = await Image.create({
            path: file.fimeName,
            size: file.size,
            original_name: file.clientName,
            extension: file.subtype
          })

          images.push(image)

          return response.status(200).send({ success: images, errors:{} })
        }

        return response.status(400).send({
          message: 'Não foi possível processar a imagem.'
        })
      }

      let files = await manage_multiple_uploads(fileJar)
      
      await Promise.all(
        files.success.map(async file => {
          const image = await Image.create({
            path: file.filename,
            size: file.size,
            original_name: file.clientName,
            extension: file.subtype
          })
          images.push(image)
        })
      )

      return response.status(201).send({ success: images, errors: files.error})

    } catch (error) {
      console.error(error) 
      return response.status(400).send({
        message: "Não foi possível processar a sua solicitação!"
      })
    }
  }

  /**
   * Display a single image.
   * GET images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: { id }, request, response, view }) {
    const image = await Image.findOrFail(id)
    return response.send(image)
  }

  /**
   * Update image details.
   * PUT or PATCH images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, request, response }) {
    const image = await Image.findOrFail(id)

    try {
      image.merge(request.only(['original_name']))

      await image.save()

      return response.status(200).send(image)

    } catch (error) {
      
      return response.status(400).send({
        message: 'Não foi possivel atualizar esta imagem no momento!'
      })

    }
  }

  /**
   * Delete a image with id.
   * DELETE images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params: { id }, request, response }) {
    const image = await Image.findOrFail(id)

    try {
      let filepath = Helpers.publicPath(`uploads/${image.path}`)


      await fs.unlink(filepath, err => {  
        if(!err)
        
        await image.delete()
      })


      return response.status(201).send()
    } catch (error) {
      return response.status(400).send({
        message: 'Não foi possivel error esta imagem no momento!'
      })
    }
  }
}

module.exports = ImageController
