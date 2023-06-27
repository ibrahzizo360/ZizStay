import React from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./pages/homepage/HomePage"
import List from "./pages/list/List"
import Hotel from "./pages/hotel/Hotel"


export default function App() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/hotels" element={<List/>}/>
            <Route path="/hotels/:id" element={<Hotel/>}/>
        </Routes>
        </BrowserRouter>
        
    )
}