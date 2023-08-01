import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Context from '../Context'
import CreateReview from '../components/newProductReviewModal'
import EditReview from './editProductReviewModal'


export default function Products () {

    const { cart, setCartInfo } = useContext(Context) 
    const [product, setProduct] = useState([])
    const [reviews, setReviews] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [rating, setRating] = useState(0)
    let key = useParams()
    let review
    let allreviews
    let myReview

    if (localStorage.getItem('token')) {
        review = 
        <button onClick={() => setOpenModal(true)}>Add Review</button>

        for (let i = 0; i < reviews.length; i++) {
            if (user.id === reviews[i].user_id) {
                myReview =
                <div>
                    <button onClick={() => setOpenEditModal(true)}>Edit</button>
                    <button onClick={() => onXClick(reviews[i].id)}>X</button>
                </div>
            }
        }
    }


    useEffect(() => {
        const getProduct = async () => {
            const response = await axios.get(`https://onewheeloneride-back.up.railway.app/products/${key.id}`)
            setProduct(response.data)
            const responseReviews = await axios.get(`https://onewheeloneride-back.up.railway.app/productreviews`)
            setReviews(responseReviews.data)


        }
        getProduct()
    }, [])

    const onXClick = async (id) => {
        const response = await axios.delete(`https://onewheeloneride-back.up.railway.app/productreviews/${id}`)
        setReviews(response.data)
    }

    if (reviews.length > 0) {
        allreviews = 
            <div className="row">
                {reviews.map((review, index) => {  
                    if (review.product_id == key.id) {
                    return (
                        <div className="card cardReview space" key={index}>
                            {myReview}
                            <div className="card-body">
                                <h5 className="card-title">{review.rating} out of 5</h5>
                                <p className="card-text">{review.review}</p>
                                <EditReview open={openEditModal} onClose={() => setOpenEditModal(false)} reviews={review} product={product} />
                            </div>
                        </div>
                    )
                }})}
            </div>
    } else {
        allreviews = <p>No reviews yet</p>
    }

    const addToCart = (product) => { 
        if (cart.find(item => item.id === product.id)) {
            setCartInfo(cart.map(item => item.id === product.id? {...item, quantity: item.quantity + 1 } : item))
            localStorage.setItem('cart', JSON.stringify(cart.map(item => item.id === product.id? {...item, quantity: item.quantity + 1 } : item)))
        } else {
            setCartInfo([...cart, {...product, quantity: 1 }])
            localStorage.setItem('cart', JSON.stringify([...cart, {...product, quantity: 1 }]))
        }
    }

    if (product.length === 0) {
        return (
            <div><h1>Loading...</h1></div>
        )
    } else { 
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <button type="button" className="btn btn-danger" onClick={() => window.history.back()}>Return</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-4">
                        <img className="img-fluid" src={product.picture} />
                    </div>
                    <div className="col-lg-6 col-md-8">
                        <div className="row">
                            <h3>{product.name}</h3>
                        </div>
                        <div className="row">
                            <h3>${product.price}</h3>
                        </div>
                        <div className="row">
                            <button type="button" className="btn btn-warning" onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                        <div className="row">
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className='col-md-12'>
                    <h1>Reviews</h1>

                        {review}
                        <div className="col-12">
                            <div className='container'>
                                {allreviews}
                            </div>
                            
                        </div>
                    </div>
                </div>
                <CreateReview open={openModal} onClose={() => setOpenModal(false)} product={product} />
            </div>
        )
    }
}