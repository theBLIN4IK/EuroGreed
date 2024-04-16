async function getsale() {
    const req3 = document.querySelector('.sale')

    const getData = url => {
        return new Promise((resolve, reject) =>
          fetch(url)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(error => reject(error))
        )
      }

const sales = document.querySelector('.sales')
req3.addEventListener('click', async () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  })

  try {
	  const json = await getData('https://eurogreedserver.onrender.com/getProducts')
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
}
export default getsale