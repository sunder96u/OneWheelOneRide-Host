import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'



export default function Login () {

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [error, setError] = useState(false)
        const navigate = useNavigate()

        const finduser = async (e) => {
           const user = await axios.get(`https://onewheeloneride-back.up.railway.app/login`)
           for ( let i = 0; i < user.data.length; i++ ) {
               if ( user.data[i].email === email && user.data[i].password === password ) {
                localStorage.setItem('user', JSON.stringify(user.data[i]))
                localStorage.setItem('token', user.data[i].token)
                setEmail('')
                setPassword('')
                navigate('/')  
               } else {
                setError(true)
               }
           }
        }

        const handleSubmitUser = async (e) => {
            e.preventDefault()
            finduser(e)
        }


    return (
        <div className="container">
            <div className="row">
                <form onSubmit={handleSubmitUser}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="email" onChange={((e) => setEmail(e.target.value))} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary btn-block" onClick={() => finduser()}>Login</button>
                        <p className="invalid" style={{display: error? "": "none"}}>Username or password is incorrect. Please try again!</p>
                    </div>
                </form>
                <div className="mb-3">
                    <p>New Here? <Link to="/CreateAccount">Create an Account</Link></p>
                </div>
            </div>
        </div>
    )
}