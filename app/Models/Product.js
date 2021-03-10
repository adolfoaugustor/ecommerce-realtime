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

    categories(){
        return this.belongsToMany('App/Models/Category')
    }

    /**
     * relacionamento entre produtose cupons
     */
    coupuns(){
        return this.belongsToMany('App/Models/Coupon')
    }
}

module.exports = Product
