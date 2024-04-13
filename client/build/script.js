const req1 = document.querySelector('.get')
const req3 = document.querySelector('.sale')
const req2 = document.querySelector('.add')

// GET
const getData = url => {
  return new Promise((resolve, reject) =>
    fetch(url)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
  )
}

const products = document.querySelector('.products')

async function loadAndDisplayProducts() {
	try {
	  const json = await getData('http://localhost:10000/getProducts')
	  products.innerHTML = '';
	  json.reverse().forEach(product => {
		products.insertAdjacentHTML('beforeend',
		  `<li>
		   <img src="${product.image}" class="image"> 
		   <p class="name">${product.name}</p>
		   <p class="price1">${product.price} byn</p>
		   </li>`
		)
	  })
	} catch (err) {
	  console.error('An error occurred', err)
	}
  }
  
  req1.addEventListener('click', loadAndDisplayProducts)
  
const sales = document.querySelector('.sales')




//saaaaleeee
req3.addEventListener('click', async () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  })

  try {
	  const json = await getData('http://localhost:10000/getProducts')
	  sales.innerHTML = ''
    const discountedProducts = json.filter(product => product.showDiscount)
	  discountedProducts.reverse().forEach(product => {
		sales.insertAdjacentHTML('beforeend',
		  `<li>
		   <img src="${product.image}" class="image"> 
		   <p class="name">${product.name}</p>
		   <p class="price1">${product.discountPrice} byn</p>
       <p class="price2">${product.price} byn</p>
		   </li>`
		)
	  })
	} catch (err) {
	  console.error('An error occurred', err)
	}
})


//! POST
const postData = (url, data) => {
	return new Promise((resolve, reject) => {
	  fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-type': 'application/json; charset=UTF-8' }
	  })
		.then(response => response.json())
		.then(json => {
		  resolve(json);
		  loadAndDisplayProducts()
		})
		.catch(error => reject(error))
	});
  }
  
  
//adding product
  const addblock = document.querySelector('.addblock')
  const imgblock = document.querySelector('.imgblock')
  const intxt = document.querySelector('.intxt')
  const innum = document.querySelector('.innum')
  const upload = document.querySelector('.upload')

  req2.addEventListener('click', async () => {
	addblock.style.display = 'flex'
  })

  imgblock.addEventListener('click', async () => {
	let photo = prompt('Введите ссылку на изображение')
	if (photo) {
	  imgblock.src = photo
	}
  })


  upload.addEventListener('click', async () => {
	let name = intxt.value
	let price = innum.value
	let image = imgblock.src
	try {
	  let product = { name, price, image }
	  await postData('http://localhost:10000/addProducts', product)
	  intxt.value = ''
      innum.value = ''
      imgblock.src = 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
	} catch (err) {
	  console.error('Произошла ошибка при добавлении', err)
	}
	addblock.style.display = 'none'
  })
  
  




//
//const name = document.querySelector('.name').value
//const price = document.querySelector('.price').value
//const image = document.querySelector('.image').value
// let name = prompt('Введите имя')
// let price = prompt('Введите цену')
// let image = prompt('Введите ссылку на изображение')
// try {
//	let product = { name, price, image }
//	let info = await postData('http://localhost:3002/addProducts', product)
//	console.log(info)
// } catch (err) {
//	console.error('Произошла ошибка при добавлении', err)
// }


















////! DELETE
//const deleteData = url => {
//	return new Promise((resolve, reject) =>
//		fetch(`${url}`, {
//			method: 'DELETE'
//		})
//			.then(response => {
//				if (response.ok) {
//					resolve('Данные успешно удалены')
//				} else {
//					reject('Ошибка удаления данных')
//				}
//			})
//			.catch(error => reject(error))
//	)
//}

//req3.addEventListener('click', async () => {
//	try {
//		let name = prompt('Введите имя, по которому ищем')
//		let info = await deleteData(`http://localhost:3002/deleteUser/${name}`)
//		console.log(info)
//	} catch (err) {
//		console.error('Произошла ошибка при удалении пользователя', err)
//	}
//})
//
//










 //left
  //! PATCH
//  const patchData = (url, updatedData) => {
//	return new Promise((resolve, reject) =>
//		fetch(`${url}`, {
//			method: 'PATCH',
//			body: JSON.stringify(updatedData),
//			headers: { 'Content-type': 'application/json; charset=UTF-8' }
//		})
//			.then(response => response.json())
//			.then(json => resolve(json))
//			.catch(error => reject(error))
//	)
//}
//req4.addEventListener('click', async () => {
//	try {
//		let name = prompt('Введите имя, по которому ищем')
//		let newName = prompt('Введите новое имя')
//		let newEmail = prompt('Введите новый email')
//		let newPassword = prompt('Введите новый пароль')
//		let user = {
//			newName,
//			newEmail,
//			newPassword
//		}
//		let info = await patchData(`http://localhost:3002/editUser/${name}`, user)
//		console.log(info)
//	} catch (err) {
//		console.error('Произошла ошибка при редактировании пользователя', err)
//	}
//})  const req4 = document.querySelector('.req4PATCH')