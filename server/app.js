const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const productsModel = require('./models/productsModel')

require('dotenv').config()

const port = process.env.PORT || 3002
const app = express()

app.use(
	cors({
		origin: ['http://127.0.0.1:5500'],
		methods: 'GET, PATCH, POST, DELETE'
	})
)
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI)

// получение всех пользователей из БД
app.get('/getProducts', async (req, res) => {
	try {
		const products = await productsModel.find({})
		res.send(products)
	} catch (err) {
		console.error('Произошла ошибка', err)
		res.send({ error: 'Произошла ошибка', err })
	}
})


app.post('/addProducts', async (req, res) => {
	try {
	  const { name, price, image } = req.body
	  const newProduct = { name, price, image }
	  await productsModel.create(newProduct)
	  res.send({ message: 'успешно' })
	} catch (err) {
		console.error('Произошла ошибка при добавлении', err)
		res.send({
			error: `Произошла ошибка при добавлении ${err}`
		})
	}
})
  

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`)
})























//app.delete('/deleteUser/:name', async (req, res) => {
//	try {
//	  const { name } = req.params;
//	  const deletedUser = await UserModel.findOneAndDelete({ name });
//  
//	  if (!deletedUser) {
//		return res.status(404).send({ message: 'Пользователь не найден' });
//	  }
//  
//	  res.send({ message: 'Пользователь успешно удален' });
//	} catch (err) {
//	  console.error('Произошла ошибка при удалении пользователя', err);
//	  res.status(500).send({
//		error: `Произошла ошибка при удалении пользователя ${err}`,
//	  });
//	}
//  });
//  







// редактирование пользователя в БД
//app.patch('/editUser/:name', async (req, res) => {
//	try {
//		const { name } = req.params
//		const { newName, newEmail, newPassword } = req.body
//		const user = await UserModel.findOne({ name })
//		if (user) {
//			user.name = newName
//			user.email = newEmail
//			user.password = newPassword
//		}
//		await user.save()
//		res.send({ message: 'Пользователь успешно отредактирован' })
//	} catch (err) {
//		console.error('Произошла ошибка при редактировании пользователя', err)
//		res.send({
//			error: `Произошла ошибка при редактировании пользователя ${err}`
//		})
//	}
//})
//
//
