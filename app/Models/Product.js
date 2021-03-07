'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    image(){
        return this.belongsTo('App/Models/Image')
    }

    /**
     * Relacionamento entre produto e imagem
     * galeria de imagens do produto
     */
    images(){
        return this.belongsToMany ('App/Models/Image')
    }
}

module.exports = Product
