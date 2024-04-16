const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const productsModel = require('./models/productsModel')

require('dotenv').config()

const port = process.env.PORT || 10000
const app = express()

app.use(
	cors({
		origin: ['https://eurogreed.onrender.com'],
		methods: 'GET, PATCH, POST, DELETE'
	})
)
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI)


//получение продуктов
app.get('/getProducts', async (req, res) => {
	try {
	  const products = await productsModel.find({})
	  //отображение скидочного / обычногг ценника
	  products.forEach(async product => {
		if(product.showDiscount) {
		  product.discountPrice = product.price * 0.75
		} else {
		  product.discountPrice = product.price
		}
		await product.save()
	  })
	  res.send(products)
	} catch (err) {
	  console.error('Произошла ошибка', err)
	  res.status(500).send({ error: 'Произошла ошибка при получении продуктов', err })
	}
  })


//добавление продуктов
  app.post('/addProducts', async (req, res) => {
	try {
	  const { name, price, image } = req.body
	  //генирация скидки при добавлении (я считаю так верно)
	  const randomlySelected = Math.random() < 0.5
	  const newProduct = {
		name,
		price,
		image,
		showDiscount: randomlySelected 
	  };
	  await productsModel.create(newProduct)
	  res.send({ message: 'успешно' })
	} catch (err) {
	  console.error('Произошла ошибка при добавлении', err)
	  res.send({ error: `Произошла ошибка при добавлении: ${err}` })
	}
  })
  
  
  //обнуление скидок
  app.patch('/setDiscount', async (req, res) => {
	try {
	  await productsModel.updateMany({}, { showDiscount: false })
	  res.send({ message: 'Всем пользователям showDiscount = false' })
	} catch (err) {
	  console.error('Произошла ошибка при редактировании', err)
	  res.status(500).send({
		error: `Произошла ошибка при редактировании: ${err}`
	  })
	}
  })

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`)
})
