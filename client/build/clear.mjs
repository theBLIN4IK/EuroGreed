import exp from "constants"

async function ClearSale() {

const clear = document.querySelector('.clear')
  
  const patchData = (url, updatedData) => {
	return new Promise((resolve, reject) =>
		fetch(`${url}`, {
			method: 'PATCH',
			body: JSON.stringify(updatedData),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}
  


  clear.addEventListener('click', async () => {
	try {
	  let info = await patchData('https://eurogreedserver.onrender.com/setDiscount', {})
	  console.log(info)
	} catch (err) {
	  console.error('Произошла ошибка при редактировании', err)
	}
  })

}
export default ClearSale