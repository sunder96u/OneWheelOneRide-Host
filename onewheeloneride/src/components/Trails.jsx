import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



export default function Trails () {

    const [trails, setTrails] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getTrails = async () => {
            const response = await axios.get('https://onewheeloneride-back.up.railway.app/trails')
            setTrails(response.data)
        }
        getTrails()
    }, [])

    const details = (id) => {
        navigate(`/Trail/${id}`)
    }

    if (trails.length === 0) {
        return (
            <div><h1>Loading...</h1></div>
        )
    } else {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="container-fluid bcgrey">
                            <div className="col-12">
                                <div className="row space">
                                    <div className="col-4">
                                        <h1 className="black">Picture</h1>
                                    </div>
                                    <div className="col-3">
                                        <h1 className="black">Name</h1>
                                    </div>
                                    <div className="col-3">
                                        <h1 className="black">Difficulty</h1>
                                    </div>
                                    <div className="col-2">
                                        <h1 className="black">Address</h1>
                                    </div>
                                </div>
                                <div className="thickLine"></div>
                                {trails.map((trail, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="row space" onClick={() => details(trail.id)}>
                                                 <div className="col-4">
                                                    <img src={trail.picture} className="img-fluid maxHeight"/>
                                                </div>
                                                <div className="col-3">
                                                    <p className="black">{trail.name}</p>
                                                </div>
                                                <div className="col-3">
                                                    <p className="black">{trail.difficulty}</p>
                                                </div>
                                                <div className="col-2">
                                                    <p className="black">P{trail.address}</p>
                                                </div>
                                            </div>
                                            <div className="line"></div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}