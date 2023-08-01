import { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'

export default function newTrailReviewModal ({open, onClose, trail, myReview}) {

    const [review, setReview] = useState('')
    const [rating, setRating] = useState(1)
    const [ user, setUserInfo] = useState('')

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem('user')))
        setReview(myReview)
    }, [])

    console.log(review)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUserInfo(JSON.parse(localStorage.getItem('user')))
        const newcomment = await axios.put(`https://onewheeloneride-back.up.railway.app/trailreviews/${myReview.id}`, {
            review: review,
            rating: rating,
            user_id: user.id,
            trail_id: trail.id
        })
        onClose()
    }

    return (
        <div onClick={onClose}>
            <Modal show={open} onClick={(e) => {e.stopPropagation()}}>
                <Modal.Header closeButton onClick={onClose}>
                    <Modal.Title className="black">Add Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                <div className="mb-3">
                                    <label htmlFor="rating" className="form-label black">Rating:</label>
                                    <div className="form-check form-check-inline">
                                        <input className="for-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" onClick={() => setRating(1)} defaultChecked></input>
                                        <label className="form-check-label black" htmlFor="inlineRadio1">Easy</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="for-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" onClick={() => setRating(2)} value="2"></input>
                                        <label className="form-check-label black" htmlFor="inlineRadio1">Moderate</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="for-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" onClick={() => setRating(3)} value="3"></input>
                                        <label className="form-check-label black" htmlFor="inlineRadio1">Hard</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="for-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" onClick={() => setRating(4)} value="4"></input>
                                        <label className="form-check-label black" htmlFor="inlineRadio1">Very Hard</label>
                                    </div>
                                </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="comment" className="form-label black">Review</label>
                                    <textarea className="form-control" id="comment" onChange={(e) => setReview(e.target.value)}>{review.review}</textarea>
                                </div>
                            </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                    <Button type="submit" variant="primary" onClick={handleSubmit}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}