'use strict'

const OrderHook = exports = module.exports = {}

OrderHook.updateValues = async (model) => {
    model.$sideLoaded.subtotal  = await modelInstance.items().getSum('subtotal')
    model.$sideLoaded.qty_items = await modelInstance.items().getSum('quantity')
    model.$sideLoaded.discount  = await modelInstance.discounts().getSum('discount')
    model.total = model.$sideLoaded.subtotal - model.$sideLoaded.discount
    return total
}

OrderHook.updateCollectionValues = async (models) => {
    for (let model of models){
        model = await OrderHook.updateValues(model)
    }
    model
}
