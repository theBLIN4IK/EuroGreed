async function post() {
    const req2 = document.querySelector('.add')

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
	  await postData('https://eurogreedserver.onrender.com/addProducts', product)
	  intxt.value = ''
      innum.value = ''
      imgblock.src = 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
	} catch (err) {
	  console.error('Произошла ошибка при добавлении', err)
	}
	addblock.style.display = 'none'
  })
}
export default post