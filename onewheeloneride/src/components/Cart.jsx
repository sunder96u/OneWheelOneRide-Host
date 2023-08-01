import { useContext, useState, useEffect } from 'react'
import Context from '../Context'




export default function Cart () {

    const { cart, setCartInfo } = useContext(Context)
    const { user, setUserInfo } = useContext(Context)
    const [total, setTotal] = useState(0)

    const increaseQuantity = (id) => {
        if (cart.find(item => id === item.id)) {
            setCartInfo(cart.map(item => item.id === id? {...item, quantity: item.quantity + 1 } : item))
            localStorage.setItem('cart', JSON.stringify(cart.map(item => item.id === id? {...item, quantity: item.quantity + 1 } : item)))
        }
    }

    const decreaseQuantity = (id) => {
        if (cart.find(item => id === item.id) && cart.find(item => id === item.id).quantity > 1) {
            setCartInfo(cart.map(item => item.id === id? {...item, quantity: item.quantity - 1 } : item))
            localStorage.setItem('cart', JSON.stringify(cart.map(item => item.id === id? {...item, quantity: item.quantity - 1 } : item)))
        } else if (cart.find(item => id === item.id) && cart.find(item => id === item.id).quantity === 1) {
            setCartInfo(cart.filter(item => item.id!== id))
            localStorage.setItem('cart', JSON.stringify(cart.filter(item => item.id!== id)))
        }
    }

    const removeItem = (id) => {
        if (cart.find(item => id === item.id)) {
            setCartInfo(cart.filter(item => item.id!== id))
            localStorage.setItem('cart', JSON.stringify(cart.filter(item => item.id!== id)))
        }
    }
    
    useEffect(() => {
        if(localStorage.getItem('cart')){
            setCartInfo(JSON.parse(localStorage.getItem('cart')))
        }
        for (let i = 0; i < cart.length; i++) {
            let myTotal = 0
            let itemTotal = 0
            itemTotal = cart[i].price * cart[i].quantity
            myTotal = myTotal + itemTotal
            setTotal(myTotal)
            // setTotal(cart[i].price * cart[i].quantity)
        }
    }, [])


    if (cart.length === 0) {
        return (
            <div className="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="true" tabIndex="-1" id="offcanvasCart" aria-labelledby="offcanvasCartLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasCartLabel">Cart</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div className="row">
                    <p> Your cart is empty</p>
                </div>
            </div>
        </div>
        )
    } else {
        return (
            <div className="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="true" tabIndex="-1" id="offcanvasCart" aria-labelledby="offcanvasCartLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasCartLabel">Cart - {cart.length}</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="line"></div>
                <div className="offcanvas-body">
                    {cart.map((item, index) => {
                        return (
                            <div key={index}>
                            <div className="row">
                                <div className="row">
                                    <div className="col-4">
                                            <img src={item.picture} alt="" className="img-fluid" />
                                    </div>
                                    <div className="col-7">
                                        <div className="col-12">
                                            <h6>{item.name}</h6>
                                        </div>
                                        <div className="row">
                                            <div className="col-2">
                                                <button type="button" className="btn btn-primary" onClick={() => decreaseQuantity(item.id)}>-</button>
                                            </div>
                                            <div className="col-2">
                                                <button className="btn btn-primary">{item.quantity}</button>
                                            </div>
                                            <div className="col-2">
                                                <button type="button" className="btn btn-primary" onClick={() => increaseQuantity(item.id)}>+</button>
                                            </div>
                                            <div className="col-6">
                                                <p>${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-1">
                                        <button type="button" className="btn btn-primary" onClick={() => removeItem(item.id)}>X</button>
                                    </div>
                                </div> 
                            </div>
                            <div className="line"></div>  
                            </div>    
                        )
                    })}
                </div>
                <div className="line"></div>
                <div className="offcanvas-Footer bcgrey">
                    <div className="row">
                        <div className="d-grid gap-6 col-12">
                            <button type="button" className="btn btn-primary space">Checkout</button>
                        </div>
                        <div className="d-grid gap-6 col-12">
                            <button type="button" className="btn btn-secondary space" data-bs-dismiss="offcanvas">Continue Shopping</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}