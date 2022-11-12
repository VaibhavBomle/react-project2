import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description,imageUrl,newsUrl,author,date} = this.props;
    return (
      <div className="container my-3">
        <div className="card" style={{width: "18rem"}}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small class="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-primary">
              Go somewhere 
              
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
