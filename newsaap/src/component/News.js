import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {

  constructor(){
    super();
    console.log("Hello I am a constructor from News component");
    this.state = {
      articles : [],
      loading: false,
      page:1
    }
  }
  handlePrevClick = async()=>{
    console.log("handlePrevClick");
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=151da54f0d5f4cd4884e7e7571f97d60&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    console.log("data=== >",data); 
    let parseData = await data.json();
    console.log("parseData=== >",parseData); 
    this.setState({
       page : this.state.page - 1,
       articles : parseData.articles
    }) 
  }

  handleNextClick = async()=>{
    console.log("handleNextClick");
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){
      console.log("totalResults: ",this.state.totalResults);
    }else{
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=151da54f0d5f4cd4884e7e7571f97d60&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      console.log("data=== >",data); 
      let parseData = await data.json();
      console.log("parseData=== >",parseData); 
      this.setState({
         page : this.state.page + 1,
         articles : parseData.articles
      }) 
    }
     
  }

  async componentDidMount(){
    console.log("Cmd");
    let url = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=151da54f0d5f4cd4884e7e7571f97d60&page=1&pageSize=20";

   let data = await fetch(url);
    console.log("data=== >",data); 
    let parseData = await data.json();
    console.log("parseData=== >",parseData); 
    this.setState({
       articles : parseData.articles,
       totalResults : parseData.totalResults
    }) 
  }
  render() {
    console.log("render.........")
    return (
      <div className="container my-3">
        <h2>NewsMonkay - Top Headlines</h2>
        <div className="row  my-3">
       {this.state.articles.map((element)=>{
            return <div className="col-md-4"  key = {element.url}>
            <NewsItem title={element.title.slice(0,40)} description={element.description?element.description.slice(0,80):element.description} 
            imageUrl = {element.urlToImage?element.urlToImage:"https://as2.ftcdn.net/v2/jpg/03/65/40/15/1000_F_365401520_zLTViwtTegqkr11c5uBElk8SfgTL8Uty.jpg"} newsUrl = {element.url}/>
            </div>
        })} 
        </div>
        <div className="container d-flex justify-content-between">
          <button disable={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick} > &larr; Previous</button>
          <button type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next 	&rarr;</button>
        </div>
      </div>
    )
  }
}

export default News;
