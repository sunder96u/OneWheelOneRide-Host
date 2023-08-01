import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



export default function Groups () {

    const [groups, setGroups] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        const getGroups = async () => {
            const response = await axios.get('https://onewheeloneride-back.up.railway.app/groups')
            setGroups(response.data)
        }

        getGroups()
    }, [])

    const details = (id) => {
        navigate(`/Group/${id}`)
    }

    if (groups.length === 0) {
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
                                    <div className="col-4">
                                        <h1 className="black">Name</h1>
                                    </div>
                                    <div className="col-4">
                                        <h1 className="black">Description</h1>
                                    </div>
                                </div>
                                <div className="thickLine"></div>
                                {groups.map((group, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="row space" onClick={() => details(group.id)}>
                                                <div className="col-4">
                                                    <img src={group.picture} className="img-fluid maxHeight"/>
                                                </div>
                                                <div className="col-4">
                                                    <p className="black">{group.name}</p>
                                                </div>
                                                <div className="col-4">
                                                    <p className="black">{group.description}</p>
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