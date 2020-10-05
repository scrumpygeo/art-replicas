import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

// this file not connected to our app so we need to call server directly
connectDB()

const importData = async () => {
  try {
    // i. clear all 3 collections
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // ii. import users - goes into an array
    const createdUsers = await User.insertMany(users)
    // iii. grab admin user's id from that array (1st one)
    const adminUser = createdUsers[0]._id

    // iv. get the products and add admin user to it
    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      }
    })

    // v. insert sampleProducts into db
    await Product.insertMany(sampleProducts)
    console.log('Data imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroytData = async () => {
  try {
    // i. clear all 3 collections
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data destroyed!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroytData()
} else {
  importData()
}
