import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './Components/App'
import SecurityProvider from './Context/SecurityProvider'

const root=ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <BrowserRouter>
   <SecurityProvider>
    <App/>
   </SecurityProvider>
  </BrowserRouter>
)