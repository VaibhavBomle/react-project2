import React, { Component } from 'react'
import NavBar from './component/NavBar'
import News from './component/News'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize = 5;

  state = {
    progress :10
  }
  setProgress = (progress) =>{
    this.setState({
      progress:progress
    })
  }
  render() {
    return (
      <div>
        <Router>
         <NavBar/>
         <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height = {3}
      />
         <div className="container">
         <Routes>
             <Route exact path='/' element={<News setProgress = {this.setProgress} pageSize = {this.pageSize} country = 'in' category = 'general'/>} />
             <Route exact path='/business' element={<News setProgress = {this.setProgress} pageSize = {this.pageSize} country = 'in' category = 'business'/>} />
             <Route exact path='/entertainment' element={<News setProgress = {this.setProgress} pageSize = {this.pageSize} country = 'in' category = 'entertainment'/>} />
             <Route exact path='/health' element={<News setProgress = {this.setProgress} pageSize = {this.pageSize} country = 'in' category = 'health'/>} />
             <Route exact path='/science' element={<News setProgress = {this.setProgress} pageSize = {this.pageSize} country = 'in' category = 'science'/>} />
             <Route exact path='/sports' element={<News setProgress = {this.setProgress} pageSize = {this.pageSize} country = 'in' category = 'sports'/>} />
             <Route exact path='/technology' element={<News setProgress = {this.setProgress} pageSize = {this.pageSize} country = 'in' category = 'technology'/>} /> 
          </Routes>
          </div>
        </Router>
      </div>
    )
  }
}
