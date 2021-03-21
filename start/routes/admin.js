'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  // Categories
  Route.resource('categories', 'CategoryController').apiOnly()
  // Products
  Route.resource('products', 'ProductController').apiOnly()
  // Coupon
  Route.resource('coupons', 'CouponController').apiOnly()
  // Order
  Route.resource('orders', 'OrderController').apiOnly()
  // Image
  Route.resource('images', 'ImageController').apiOnly()
  // User
  Route.resource('users', 'UserController').apiOnly()
})
  .prefix('v1/admin')
  .namespace('Admin')