import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Carousel from 'better-react-carousel'
import axios from 'axios'




export default function Parts () {
    const [category, setCategory] = useState("")
    const [models, setModel] = useState(4)
    const [parts, setParts] = useState([])
    let navigate = useNavigate()
    let model = useParams()

    useEffect(() => {
        const getParts = async (e) => {
            const response = await axios.get(`https://onewheeloneride-back.up.railway.app/products`)
            setParts(response.data)
        }
        getParts()
    }, [])

    let header1
    let header2
    let myParts

    if (model.name === '2') {
        header1 = 
            <h1>XR Parts Categories</h1>
    } else if (model.name === '1') {
        header1 = 
            <h1>GT Parts Categories</h1>
    } else if (model.name === '3') {
        header1 = 
            <h1>Pint/PintX Parts Categories</h1>
    }

    if (category === "tires") {
        header2 = 
            <h1>Tires</h1>
        myParts = 
            <div className="row">
                {parts.map((parts, index) => {
                    if (parts.category_id.id === 4 && (parseInt(model.name) === parts.model_id.id || parts.model_id.id === 4)) {
                        return ( 
                        <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                            <div className="card mb-3">
                                <img src={parts.picture} className="card-img-top iconLrg" alt={parts.name}/>
                                <h5 className="card-title">{parts.name}</h5>
                                <h5>${parts.price}</h5>
                                <p className="cardDescription">{parts.description}</p>
                                <button type="button" className="btn btn-primary" onClick={() => details(parts.id)}>View More</button>
                            </div>
                        </div>
                        )
                    }
                })}
            </div>
    } else if (category === "fenders") {
        header2 = 
            <h1>Fenders</h1>
        myParts = 
            <div className="row">
                {parts.map((parts, index) => {
                    if (parts.category_id.id === 1 && (parseInt(model.name) === parts.model_id.id || parts.model_id.id === 4)) {
                        return ( 
                        <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                            <div className="card mb-3">
                                <img src={parts.picture} className="card-img-top iconLrg" alt={parts.name}/>
                                <h5 className="card-title">{parts.name}</h5>
                                <h5>${parts.price}</h5>
                                <p className="cardDescription">{parts.description}</p>
                                <button type="button" className="btn btn-primary" onClick={() => details(parts.id)}>View More</button>
                            </div>
                        </div>
                        )
                    }
                })}
            </div>
    } else if (category === "rails") {
        header2 =
            <h1>Rails</h1>
        myParts = 
            <div className="row">
                {parts.map((parts, index) => {
                    if (parts.category_id.id === 5 && (parseInt(model.name) === parts.model_id.id || parts.model_id.id === 4)) {
                        return ( 
                        <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                            <div className="card mb-3">
                                <img src={parts.picture} className="card-img-top iconLrg" alt={parts.name}/>
                                <h5 className="card-title">{parts.name}</h5>
                                <h5>${parts.price}</h5>
                                <p className="cardDescription">{parts.description}</p>
                                <button type="button" className="btn btn-primary" onClick={() => details(parts.id)}>View More</button>
                            </div>
                        </div>
                        )
                    }
                })}
            </div>
    } else if (category === "footpads") {
        header2 =
            <h1>Footpads</h1>
        myParts = 
            <div className="row">
                {parts.map((parts, index) => {
                    if (parts.category_id.id === 3 && (parseInt(model.name) === parts.model_id.id || parts.model_id.id === 4)) {
                        return ( 
                        <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                            <div className="card mb-3">
                                <img src={parts.picture} className="card-img-top iconLrg" alt={parts.name}/>
                                <h5 className="card-title">{parts.name}</h5>
                                <h5>${parts.price}</h5>
                                <p className="cardDescription">{parts.description}</p>
                                <button type="button" className="btn btn-primary" onClick={() => details(parts.id)}>View More</button>
                            </div>
                        </div>
                        )
                    }
                })}
            </div>
    } else if (category === "bumpers") {
        header2 =
            <h1>Bumpers</h1>
        myParts = 
            <div className="row">
                {parts.map((parts, index) => {
                    if (parts.category_id.id === 6 && (parseInt(model.name) === parts.model_id.id || parts.model_id.id === 4)) {
                        return ( 
                        <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                            <div className="card mb-3">
                                <img src={parts.picture} className="card-img-top iconLrg" alt={parts.name}/>
                                <h5 className="card-title">{parts.name}</h5>
                                <h5>${parts.price}</h5>
                                <p className="cardDescription">{parts.description}</p>
                                <button type="button" className="btn btn-primary" onClick={() => details(parts.id)}>View More</button>
                            </div>
                        </div>
                        )
                    }
                })}
            </div>
    } else if (category === "handles") {
        header2 = 
            <h1>Handles</h1>
        myParts = 
            <div className="row">
                {parts.map((parts, index) => {
                    if (parts.category_id.id === 2 && (parseInt(model.name) === parts.model_id.id || parts.model_id.id === 4)) {
                        return ( 
                        <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                            <div className="card mb-3">
                                <img src={parts.picture} className="card-img-top iconLrg" alt={parts.name}/>
                                <h5 className="card-title">{parts.name}</h5>
                                <h5>${parts.price}</h5>
                                <p className="cardDescription">{parts.description}</p>
                                <button type="button" className="btn btn-primary" onClick={() => details(parts.id)}>View More</button>
                            </div>
                        </div>
                        )
                    }
                })}
            </div>
    } else if (category === "stands") {
        header2 = 
            <h1>Stands</h1>
        myParts = 
            <div className="row">
                {parts.map((parts, index) => {
                    if (parts.category_id.id === 7 && (parseInt(model.name) === parts.model_id.id || parts.model_id.id === 4)) {
                        return ( 
                        <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                            <div className="card mb-3">
                                <img src={parts.picture} className="card-img-top iconLrg" alt={parts.name}/>
                                <h5 className="card-title">{parts.name}</h5>
                                <h5>${parts.price}</h5>
                                <p className="cardDescription">{parts.description}</p>
                                <button type="button" className="btn btn-primary" onClick={() => details(parts.id)}>View More</button>
                            </div>
                        </div>
                        )
                    }
                })}
            </div>
    } else {
        header2 =
            <h1>All Parts</h1>
        myParts = 
        <div className="row">
        {parts.map((parts, index) => {
            if (parseInt(model.name) === parts.model_id.id || parts.model_id.id === 4) {
                return ( 
                <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                    <div className="card mb-3">
                        <img src={parts.picture} className="card-img-top iconLrg" alt={parts.name}/>
                        <h5 className="card-title">{parts.name}</h5>
                        <h5>${parts.price}</h5>
                        <p className="cardDescription">{parts.description}</p>
                        <button type="button" className="btn btn-primary" onClick={() => details(parts.id)}>View More</button>
                    </div>
                </div>
                )
            }
        })}
    </div>
    }

    const details = (id) => {
        navigate(`/Product/${id}`)
    }

    if (parts.length === 0) {
        return (
            <div><h1>Loading...</h1></div>
        )
    } else {
        return (
            <div className="container-fluid">
                <div className="row">
                    {header1}
                    <Carousel cols={4} rows={1} gap={10} loop showDots={true}>
                        <Carousel.Item>
                                <div className="card text-center mb-3 cardHeight" onClick={() => setCategory('tires')}>
                                    <img className="card-img-top icon" alt="..." src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS0RX6PokCNPMee7CGpwL5rIvqRF_XbTN-EQ&usqp=CAU"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Tires</h5>
                                    </div>
                                </div>
                        </Carousel.Item>
                        <Carousel.Item>
                                <div className="card text-center mb-3 cardHeight" onClick={() => setCategory('fenders')}>
                                    <img className="card-img-top icon" alt="..." src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMS8Sn_SRPe-pl0A4r3hP5S8YcELGkLQTz-A&usqp=CAU"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Fenders</h5>
                                    </div>
                                </div>
                        </Carousel.Item>
                        <Carousel.Item>
                                <div className="card text-center mb-3 cardHeight" onClick={() => setCategory('rails')}>
                                    <img className="card-img-top icon" alt="..." src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQncnLAlYPM7aylKIZLkDw7ymDJC7C-ePcoHA&usqp=CAU"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Rails</h5>
                                    </div>
                                </div>
                        </Carousel.Item>
                        <Carousel.Item>
                                <div className="card text-center mb-3 cardHeight" onClick={() => setCategory('footpads')}>
                                    <img className="card-img-top icon" alt="..." src="data:image/jpeg;base64,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"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Footpads</h5>
                                    </div>
                                </div>
                        </Carousel.Item>
                        <Carousel.Item>
                                <div className="card text-center mb-3 cardHeight" onClick={() => setCategory('bumpers')}>
                                    <img className="card-img-top icon" alt="..." src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcbEelCgqlpZUYqsbDKa4parpqOaBSbDIl0A&usqp=CAU"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Bumpers</h5>
                                    </div>
                                </div>
                        </Carousel.Item>
                        <Carousel.Item>
                                <div className="card text-center mb-3 cardHeight" onClick={() => setCategory('handles')}>
                                    <img className="card-img-top icon" alt="..." src="data:image/jpeg;base64,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"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Handles</h5>
                                    </div>
                                </div>
                        </Carousel.Item>
                        <Carousel.Item>
                                <div className="card text-center mb-3 cardHeight" onClick={() => setCategory('stands')}>
                                    <img className="card-img-top icon" alt="..." src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFTClOq7u7TaAVfgTEehyr3QMxzk_FlC8tuRGN2ZjSuccZGDkuGie-IhtcNB4E9lmyg4k&usqp=CAU"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Stands</h5>
                                    </div>
                                </div>
                        </Carousel.Item>
                        <Carousel.Item>
                                <div className="card text-center mb-3 cardHeight" onClick={() => setCategory('all')}>
                                    <img className="card-img-top icon" alt="..." src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROMW1kPY15ap-Tse011Uzg6r40J08SH72i2A&usqp=CAU"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">All Products</h5>
                                    </div>
                                </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="row">
                    {header2}
                </div>
                    {myParts}
            </div>
        )
    }
}