import {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

export default function Header(){
  const [productData, setProductData] = useState(null);

  //Run after all things rendered.
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/products')
      .then(response => {
        setProductData(response.data);
        // console.log(response.data);
      })    
      .catch(error => {
        console.error('Error fetching products: ', error)
      })
  }, []);
  
  if(!productData) return null;

  const productElements = productData.map(product => {
    return <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>      
      <td>        
        <img className='product-image' src={`http://127.0.0.1:8000/storage/${product.image}`}/>
      </td>
      <td>       
        <Link to={`/update/${product.id}`}><button className='btn'>Sửa</button></Link> | 
        <button className='btn' onClick={() => deleteProduct(product.id)}>Xóa</button>
      </td>
    </tr>
  })

  const deleteProduct = id => {
    axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
    .then(response => {
      console.log(response.data.message);
      setProductData(productData.filter(product => {
        return product.id != id;
      }));
    });
  }

  return (
    <div className='content container-md mb-5'>
      <table className='text-center product-table table table-success table-striped align-middle'>
        <thead>
          <tr>
            <th style={{width: '50px'}}>ID</th>
            <th style={{width: '200px'}}>Tên sản phẩm</th>
            <th style={{width: '300px'}}>Hình ảnh</th>
            <th style={{width: '100px'}}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {productElements}
        </tbody>
      </table>
      <Link to='/add'>
        <button className='btn btn-primary'>Thêm sản phẩm</button>  
      </Link>
    </div>
  )
}