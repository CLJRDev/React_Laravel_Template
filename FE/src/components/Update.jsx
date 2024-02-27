import {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';

export default function Update(){
  const {id} = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    image: ''
  });

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/products/${id}`)
      .then(response => {
        setProductData(response.data);
      });
  }, []);

  if(!productData) return null;

  function handleChange(event){
    const {name, value} = event.target;
    setProductData(preProduct => {
      return {
        ...preProduct,
        [name]: name != 'image' ? value : event.target.files[0]
      }
    });  
  }

  const updateProduct = async() => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', productData.name);
    formData.append('image', productData.image);
    const response = await axios.post(`http://127.0.0.1:8000/api/products/${id}`, formData, {
      headers: {'Content-Type':"multipart/form-data"}
    });

    if(response){
      console.log(response.data.message);
      navigate('/');
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    await updateProduct();
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
          {/* <img height={200} width={200} src={`http://127.0.0.1:8000/storage/${productData.image}`}/> */}
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Sửa</button>
          <Link to='/'><button className='ms-2 btn btn-primary'>Trang chủ</button></Link>
        </div>       
      </form>
    </div>
  )
}