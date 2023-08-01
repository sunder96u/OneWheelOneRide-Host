import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CreateGroupComment from './newCommentModal'
import EditComment from './editCommentModal'

import axios from 'axios'

export default function Group () {

    const [group, setGroup] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()
    const [openModal, setOpenModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [comments, setComments] = useState([])
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [reviews, setReviews] = useState([])

    let addComment
    let allComments
    let joinGroup
    let myReview

    if (localStorage.getItem('token')) {
        addComment = <button onClick={() => setOpenModal(true)}>Add Comment</button>

        for (let i = 0; i < comments.length; i++) {
            if (user.id === comments[i].id) {
                myReview =
                <div>
                    <button onClick={() => setOpenEditModal(true)} >Edit</button>
                    <button onClick={() => onXClick(comments[i].id)}>X</button>
                </div>
            }
        }
    }

    const onXClick = async (id) => {
        const response = await axios.delete(`https://onewheeloneride-back.up.railway.app/productreviews/${id}`)
        setReviews(response.data)
    }

    useEffect(() => {
        const getGroup = async () => {
            const response = await axios.get(`https://onewheeloneride-back.up.railway.app/groups/${id}`)
            setGroup(response.data)
            const responseComments = await axios.get(`https://onewheeloneride-back.up.railway.app/comments`)
            setComments(responseComments.data)
        }
        getGroup()
    }, [])


    if (comments.length > 0) {
        allComments = 
        <div className="row">
            {comments.map((comment, index) => {
                if (comment.group_id == id) {
                return (
                    <div className="card cardReview space" key={index}>
                        {myReview}
                        <div className="card-body">
                            <h5 className="card-title">{comment.comment}</h5>
                            <EditComment myComment={comment} group={group} open={openEditModal} onClose={() => setOpenEditModal(false)} />
                        </div>
                    </div>
                )
            }})}
        </div>
    }

    if (group.length === 0) {
        return (
            <div><h1>Loading...</h1></div>
        )
    } else {      
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-1">
                    <button type="button" className="btn btn-danger" onClick={() => window.history.back()}>Return</button>
                </div>
                {joinGroup}
            </div>
            <div className="row">
                <div className="col-md-6">
                    <img src={group.picture} alt={group.name} className="img-fluid"/>
                </div>
                <div className="col-md-6">
                    <h1>{group.name}</h1>
                    <h4>{group.description}</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h3>Next Ride:</h3>
                    {addComment}
                    {allComments}
                </div>
            </div>
            <CreateGroupComment open={openModal} onClose={() => setOpenModal(false)} group={group} />
        </div>
    )
    }
}