import React, { Component } from 'react'
import NavBar from './component/NavBar'
import News from './component/News'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize = 5;
  render() {
    return (
      <div>
        <Router>
         <NavBar></NavBar>  
         <Routes>
             <Route exact path='/' element={<News pageSize = {this.pageSize} country = 'in' category = 'general'/>} />
             <Route exact path='/business' element={<News pageSize = {this.pageSize} country = 'in' category = 'business'/>} />
             <Route exact path='/entertainment' element={<News pageSize = {this.pageSize} country = 'in' category = 'entertainment'/>} />
             <Route exact path='/health' element={<News pageSize = {this.pageSize} country = 'in' category = 'health'/>} />
             <Route exact path='/science' element={<News pageSize = {this.pageSize} country = 'in' category = 'science'/>} />
             <Route exact path='/sports' element={<News pageSize = {this.pageSize} country = 'in' category = 'sports'/>} />
             <Route exact path='/technology' element={<News pageSize = {this.pageSize} country = 'in' category = 'technology'/>} /> 
          </Routes>
        </Router>
      </div>
    )
  }
}
