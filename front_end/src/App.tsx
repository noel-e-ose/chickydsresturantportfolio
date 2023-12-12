import React from 'react';
import { DAppProvider, ChainId, Sepolia, Mainnet } from '@usedapp/core'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Header } from './components/header';
import { Main } from './components/main';
import { Menu } from './components/userroutes/menu';
import { Admindashboard } from './components/adminroutes/admindashboard';
import { Cart } from './components/userroutes/cart';
import { Trackorders } from './components/userroutes/trackorders';
import { Userdetails } from './components/userroutes/userdetails';
import { Orderpromo } from "./components/userroutes/meals/orderpromo";
import { Orderchickenfrieskebab } from './components/userroutes/meals';
import { Orderchickenwings } from './components/userroutes/meals';
import { Orderfrenchfries } from './components/userroutes/meals';
import { Orderfrenchfriesketchup } from './components/userroutes/meals';
import { Orderbbq } from './components/userroutes/meals';
import { Orderketchup } from './components/userroutes/meals';
import { Orderburger } from './components/userroutes/meals';
import { Ordercorndog } from './components/userroutes/meals';
import { Orderhotdog } from './components/userroutes/meals';
import { Orderchickenpie } from './components/userroutes/meals';
import { Ordercoke } from './components/userroutes/meals';
import { Orderpepsi } from './components/userroutes/meals';
import { Orderfanta } from './components/userroutes/meals';
import { Ordersprite } from './components/userroutes/meals';
import { ViewOrders } from './components/adminroutes';
import { Viewusers } from './components/adminroutes';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Header/>}>
      <Route index element= {<Main/>}/>
      <Route path='menu' element={<Menu/>}/>
      <Route path='cart/menu' element={<Menu/>}/>
      <Route path='trackorders/menu' element={<Menu/>}/>
      <Route path='admindashboard' element={<Admindashboard/>}/>
      <Route path='admindashboard/viewusers/admindashboard' element={<Admindashboard/>}/>
      <Route path='admindashboard/vieworders/admindashboard' element={<Admindashboard/>}/>
      <Route path='admindashboard/vieworders/admindashboard/vieworders' element={<ViewOrders/>}/>
      <Route path='admindashboard/viewusers/admindashboard/viewusers' element={<Viewusers/>}/>
      <Route path='admindashboard/vieworders/viewusers/vieworders' element={<ViewOrders/>}/>
      <Route path='admindashboard/viewusers/vieworders/viewusers' element={<Viewusers/>}/>
      <Route path='admindashboard/vieworders/viewusers' element={<Viewusers/>}/>
      <Route path='admindashboard/viewusers/vieworders' element={<ViewOrders/>}/>
      <Route path='admindashboard/vieworders/viewusers/admindashboard' element={<Admindashboard/>}/>
      <Route path='admindashboard/viewusers/vieworders/admindashboard' element={<Admindashboard/>}/>
      <Route path='admindashboard/vieworders' element={<ViewOrders/>}/>
      <Route path='admindashboard/viewusers' element={<Viewusers/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='trackorders' element={<Trackorders/>}/>
      <Route path='userdetails' element={<Userdetails/>}/>
      <Route path='orderpromo' element={<Orderpromo/>}/>
      <Route path='menu/orderpromo' element={<Orderpromo/>}/>
      <Route path='menu/orderchickenfrieskebab' element={<Orderchickenfrieskebab/>}/>
      <Route path='menu/orderchickenwings' element={<Orderchickenwings/>}/>
      <Route path='menu/orderfrenchfries' element={<Orderfrenchfries/>}/>
      <Route path='menu/orderfrenchfriesketchup' element={<Orderfrenchfriesketchup/>}/>
      <Route path='menu/orderbbq' element={<Orderbbq/>}/>
      <Route path='menu/orderketchup' element={<Orderketchup/>}/>
      <Route path='menu/orderburger' element={<Orderburger/>}/>
      <Route path='menu/ordercorndog' element={<Ordercorndog/>}/>
      <Route path='menu/orderhotdog' element={<Orderhotdog/>}/>
      <Route path='menu/orderchickenpie' element={<Orderchickenpie/>}/>
      <Route path='menu/ordercoke' element={<Ordercoke/>}/>
      <Route path='menu/orderpepsi' element={<Orderpepsi/>}/>
      <Route path='menu/orderfanta' element={<Orderfanta/>}/>
      <Route path='menu/ordersprite' element={<Ordersprite/>}/>
    </Route>
  )
)



function App() {
  return (
    <DAppProvider config={{
      readOnlyChainId: Sepolia.chainId | Mainnet.chainId,
      readOnlyUrls: {
        [Sepolia.chainId]: 'https://sepolia.infura.io/v3/c4b585bfa1f748d3bf957e3d15edd173',
        [Mainnet.chainId]: 'https://mainnet.infura.io/v3/c4b585bfa1f748d3bf957e3d15edd173'
      }
    }}>
      <div>
        <RouterProvider router={router}/>
      </div>
    </DAppProvider>
  );
}

export default App;
