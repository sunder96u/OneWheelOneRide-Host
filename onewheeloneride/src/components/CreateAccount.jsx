import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
 



export default function CreateAccount () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [error, setError] = useState(false)
    let navigate = useNavigate()

    const handleSubmitUser = async (e) => {
        e.preventDefault()
        if (!email ||!password ||!firstName ||!lastName) {
            setError(true)
        } else {
            if (password === confirmPassword) {
                const user = await axios.get(`https://onewheeloneride-back.up.railway.app/login`)
                for (let i = 0; i < user.data.length; i++) {
                    if (user.data[i].email === email) {
                        setErrorEmail(true)
                    } else {
                        const newUser = await axios.post('https://onewheeloneride-back.up.railway.app/register', {
                            email: email,
                            password: password,
                            first_name: firstName,
                            last_name: lastName
                        })
                        navigate('/login')
                    }
                }
            } else if  (password !== confirmPassword) {
                setErrorPassword(true)
            }
        }

                
    }


    return (
        <div className="container">
            <div className="row">
                <form onSubmit={handleSubmitUser}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="firstName" onChange={((e) => setFirstName(e.target.value))}/>
                        <p className="invalid" style={{display: error? "": "none"}}>All fields required!</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastName" onChange={((e) => setLastName(e.target.value))}/>
                        <p className="invalid" style={{display: error? "": "none"}}>All fields required!</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" onChange={((e) => setEmail(e.target.value))}/>
                        <p className="invalid" style={{display: errorEmail? "": "none"}}>Email already in use!</p>
                        <p className="invalid" style={{display: error? "": "none"}}>All Fields required!</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={((e) => setPassword(e.target.value))}/>
                        <p className="invalid" style={{display: errorPassword? "": "none"}}>Passwords do not match!</p>
                        <p className="invalid" style={{display: error? "": "none"}}>All fields required</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Re-enter Password</label>
                        <input type="password" className="form-control" id="confirmPassword" onChange={((e) => setConfirmPassword(e.target.value))}/>
                        <p className="invalid" style={{display: errorPassword? "": "none"}}>Passwords do not match!</p>
                        <p className="invalid" style={{display: error? "": "none"}}>All fields required</p>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Create Account</button>
                    </div>
                </form>
             </div>
        </div>
    )
}