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
        const json = await getData('https://eurogreedserver.onrender.com/getProducts')
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
  export default loadAndDisplayProducts