'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

static get computed(){
    return ['url']
}

class Image extends Model {
    getUrl({path}){
        return `${Env.get('APP_URL')}/images/${path}`
    }
}

module.exports = Image
