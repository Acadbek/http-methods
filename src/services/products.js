import { BASE_URL } from "../contants";

export const getProducts = async () => {
  try {
    const data = await fetch(BASE_URL)
    const response = await data.json()

    return response;
  } catch (error) {
    console.log(error);
  }
}

export const postProduct = async (product) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })

  return response
}

export const deleteProduct = async (id) => {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    alert(error.message)
  }
}

export const editProduct = async (id, product) => {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
  } catch (error) {
    alert(error.message)
  }
}