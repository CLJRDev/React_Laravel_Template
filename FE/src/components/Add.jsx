import {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Add(){
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: '',
    image: ''
  });

  function handleChange(event){
    const {name, value} = event.target;
    setProductData(preProduct => {
      return {
        ...preProduct,
        [name]: name === 'image' ? event.target.files[0] : value
      }
    });
  }

  const addProduct = async() => {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('image', productData.image);
    const response = await axios.post('http://127.0.0.1:8000/api/products', formData, {
      headers:{'Content-Type':"multipart/form-data"}
    });
    if(response){
      console.log(response.data.message);
      navigate('/');
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    await addProduct();
  }

  return (
    <div className='container-md'>
      <form className='row' onSubmit={handleSubmit}>
        <div className="my-3 col-6">
          <label htmlFor="name" className="h5 form-label">Tên sản phẩm</label>
          <input 
            value={productData.name}            
            name='name' 
            type="text" 
            className="form-control" 
            id="name"           
            onChange={handleChange}  
          />
        </div>
        <div className="my-3 col-6">
          <label htmlFor="image" className="h5 form-label">Hình ảnh</label>
          <input         
            name='image' 
            type="file" 
            className="form-control" 
            id="image"           
            onChange={handleChange}  
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Thêm</button>
          <Link to='/'><button className='ms-2 btn btn-primary'>Trang chủ</button></Link>
        </div>       
      </form>
    </div>
  )
}