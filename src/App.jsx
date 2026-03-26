import { useState, useEffect } from 'react'
import { getProducts, postProduct, deleteProduct, editProduct } from './services/products'

const App = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productCat, setProductCat] = useState('')
  const [productImage, setProductImage] = useState([''])
  const [isCreated, setIsCreated] = useState(1);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    getProducts().then((res) => {
      setProducts(res)
      setIsLoading(false)
    })

  }, [isCreated])

  const createProduct = async () => {
    const product = {
      title: productName,
      price: productPrice,
      images: [productImage],
      description: productDescription,
      categoryId: productCat
    }
    await postProduct(product)
    setIsCreated((prev) => prev + 1)
  }

  const delProduct = async (id) => {
    await deleteProduct(id)
    setIsCreated((prev) => prev + 1)
  }

  const updateProduct = async (id) => {
    setIsCreating(false)
    const selectedProduct = products.find((product) => product.id === id)
    setSelectedProductId(selectedProduct.id)
    setProductName(selectedProduct.title);
    setProductPrice(selectedProduct.price);
    setProductDescription(selectedProduct.description);
    setProductCat(selectedProduct.categoryId);
    setProductImage(selectedProduct.images);

    setIsModalOpen(true)
  }

  const update = async () => {
    const product = {
      title: productName,
      price: productPrice,
      images: productImage,
      description: productDescription,
      categoryId: productCat
    }
    await editProduct(selectedProductId, product)
    setIsCreated((prev) => prev + 1)
    setIsModalOpen(false)
  }

  return (
    <>
      {isLoading && <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>Loading...</div>}
      <button
        onClick={() => {
          setIsCreating(true)
          setIsModalOpen(true)
        }}
        className='border p-2'>
        Open modal
      </button>
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2'>
        {products.map((product) => (
          <div key={product.id} className='relative flex items-center justify-center flex-col border p-3'>
            <button onClick={() => updateProduct(product.id)} className='p-2 border bg-blue-200 text-blue-600 absolute right-2 top-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.275 12.475L11.525 8.7L14.3 5.95l-.725-.725L8.8 10q-.3.3-.7.3t-.7-.3t-.3-.712t.3-.713l4.75-4.75q.6-.6 1.413-.6t1.412.6l.725.725l1.25-1.25q.3-.3.713-.3t.712.3L20.7 5.625q.3.3.3.713t-.3.712zM4 21q-.425 0-.712-.288T3 20v-1.925q0-.4.15-.763t.425-.637l6.525-6.55l3.775 3.75l-6.55 6.55q-.275.275-.637.425t-.763.15z" /></svg>
            </button>
            <button onClick={() => delProduct(product.id)} className='p-2 border bg-red-200 text-red-600 absolute right-12 top-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" /></svg>
            </button>
            <img className='h-75 object-cover' src={product.images[0]} alt={product.title} />
            <h2>{product.title}</h2>
          </div>
        ))}
      </div>


      {isModalOpen && <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-150 border h-100 p-4 bg-white'>
        <div className='flex items-center justify-between'>
          <p className='text-center text-2xl'>Create product</p>
          <button onClick={() => setIsModalOpen(false)} className='border h-8 w-8'>X</button>
        </div>

        <input value={productName} onChange={(e) => setProductName(e.target.value)} className='border w-1/2 my-2 p-2' placeholder='Product name' type="text" />
        <input value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className='border w-1/2 my-2 p-2' placeholder='Description' type="text" />
        <input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className='border w-1/2 my-2 p-2' placeholder='Price' type="text" />
        <input value={productCat} onChange={(e) => setProductCat(e.target.value)} className='border w-1/2 my-2 p-2' placeholder='Category' type="text" />
        <input value={productImage[0]} onChange={(e) => setProductImage([e.target.value])} className='border w-1/2 my-2 p-2' placeholder='Image url' type="text" />

        <div className='flex text-center justify-center bg-green-500 max-w-25 p-2 text-white'>
          {isCreating ? <button onClick={createProduct}>Create</button> : <button onClick={() => update()}>Update</button>}
        </div>
      </div>
      }

    </>
  )
}

export default App;