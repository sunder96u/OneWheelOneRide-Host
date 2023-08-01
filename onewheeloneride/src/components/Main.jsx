import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './Home'
import Group from './Group'
import Groups from './Groups'
import Parts from './Parts'
import Product from './Product'
import Trail from './Trail'
import Trails from './Trails'
import Login from './Login'
import CreateAccount from './CreateAccount'
import Cart from './Cart'






export default function Main () {
    const [Model, setModel] = useState('XR')



    return (
        <div className="container-fluid main">
            <Cart />
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route path="/OneWheelOneRide-Front" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/OneWheelOneRide-Front/Login" element={<Login />} />
                <Route path="/CreateAccount" element={<CreateAccount />} />
                <Route path="/Group/:id" element={<Group />} />
                <Route path="/Groups" element={<Groups />} />
                <Route path="/Parts/:name" element={<Parts model={Model} />} />
                <Route path="/Product/:id" element={<Product />} />
                <Route path="/Trail/:id" element={<Trail />} />
                <Route path="/Trails" element={<Trails />} />
            </Routes>
            
        </div>
    )
}