import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @descr Fetch All Products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @descr Fetch Single Product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404) // this line optional; without it it will just throw 500 error
    throw new Error('Product not found')
  }
})

// @descr   Delete a Product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404) // this line optional; without it it will just throw 500 error
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById, deleteProduct }
