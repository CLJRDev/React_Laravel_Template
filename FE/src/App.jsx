import Header from './components/Header'
import Product from './components/Product'
import Add from './components/Add'
import Update from './components/Update'
import {Routes, Route} from 'react-router-dom'

export default function App(){
  return (
    <div className='App'>
      <Header />
      <Routes>        
        <Route path='/' element={<Product />}/>
        <Route path='/add' element={<Add />}/>        
        <Route path='/update/:id' element={<Update />}/>                
      </Routes>
    </div>    
  )
}
