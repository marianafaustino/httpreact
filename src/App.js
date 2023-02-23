import './App.css';
import {useState, useEffect} from "react";
// 4- Custom hook
import { useFetch } from './hooks/useFetch';


const url = "http://localhost:3004/products"

function App() {

  const [products, setProducts]= useState([])
// 4- custom hook
  const {data: items, httpConfig, loading, error} = useFetch(url)

  const [name,setName]= useState("")
  const [price, setPrice]= useState("")

// 1- Resgatando dados
 // useEffect(() => {
   
   // async function fetchData() {
     // const res = await fetch(url)
      //const data = await res.json()
      
     // setProducts(data)
    //}
    
    //fetchData();
  //}, [])

  // 2- add de produto
  const handleSubmit = async (e)=>{
    e.preventDefault()

    const product = {
      name,
      price,
    }
    
    //const res = await fetch(url, {
      //method: "POST",
      //headers: {
       // "content-Type": "application/json"
      //},
      //body: JSON.stringify(product),
    //})

  // 3- carregamento dinâmico
  //const addedProduct = await res.json()
  //setProducts((prevProducts)=>[...prevProducts,addedProduct])

// 5- refatorando POST
  httpConfig(product, "POST")

  setName("")
  setPrice("")

}

  return (
    <div className="App">
      <h1>Lista de produtos:</h1>
    {/* 6- loading */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {!error &&
      <ul>
      {items && items.map(product => <li key={product.id}>{product.name} - R$ {product.price}</li>)}
      </ul>
      }

    <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
          </label>
          <label>
            Preço:
            <input type="number" name="price" value={price} onChange={(e)=> setPrice(e.target.value)} />
          </label>
    {/* 7- state de loading no POST */}

          {loading && 
          <input type="submit" value="Aguarde..." />
          }

          {!loading &&
          <input type="submit" value="Criar" />
          }
        </form>
    </div>
      
    </div>
  );
}

export default App;
