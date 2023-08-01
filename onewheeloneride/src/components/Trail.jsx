import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CreateReview from './newTrailReviewModal'
import EditReview from './editTrailReviewModal'

import axios from 'axios'

export default function Trail () {

    const [trails, setTrails] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()
    const [openModal, setOpenModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [reviews, setReviews] = useState([])
    const [searchInput, setSearchInput] = useState('')


    let addReview
    let allreviews
    let myReview

    const searchBar = () => {}

    if (localStorage.getItem('token')) {
            addReview = <button onClick={() => setOpenModal(true)}>Add Review</button>

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
        const getTrail = async () => {
            const response = await axios.get(`https://onewheeloneride-back.up.railway.app/trails/${id}`)
            setTrails(response.data)
            const responseReviews = await axios.get(`https://onewheeloneride-back.up.railway.app/trailreviews`)
            setReviews(responseReviews.data)
        }
        getTrail()
    }, [])


    const onXClick = async (id) => {
        const response = await axios.delete(`https://onewheeloneride-back.up.railway.app/trailreviews/${id}`)
        setReviews(response.data)
    }

    if (reviews.length > 0) {
        allreviews = 
        <div className="row">
            {reviews.map((review, index) => {
                if (review.trail_id == id) {
                return (
                    <div className="card cardReview space" key={index}>
                        {myReview}
                        <div className='card-body'>
                            <h5 className='card-title'>Difficulty: {review.rating}</h5>
                            <p className='card-text'>{review.review}</p>
                            <EditReview myReview={review} trail={trails} open={openEditModal} onClose={() => setOpenEditModal(false)} />
                        </div>
                    </div>
                )
            }})}
        </div>
    }

    if (trails.length === 0) {
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
                <div className="col-md-6">
                    <img src={trails.picture} alt={trails.name} className="img-fluid"/>
                </div>
                <div className="col-md-6">
                    <h1>{trails.name}</h1>
                    <h2>Difficulty: {trails.difficulty}</h2>
                    <h4>Address: {trails.address}</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h3>Reviews</h3>
                    {addReview}
                    {allreviews}
                </div>
            </div>
            <CreateReview open={openModal} onClose={() => setOpenModal(false)} trail={trails} />
        </div>
    )
    }
}