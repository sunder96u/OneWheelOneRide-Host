import { useState} from 'react' 
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Context from './Context'

 
function App() {

  const [cart, setCartInfo] = useState([])

  return (
    <div>
      <Context.Provider value={{ cart, setCartInfo}}>
        <Header />
        <Main />
      </Context.Provider>
    </div>
  )
}

export default App
