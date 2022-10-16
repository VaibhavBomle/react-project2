import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  render() {
    return (
      <div className="container my-4">
        <h2>NewsMonkay - Top Hadlines</h2>
        <div className="row">
            <div className="col-md-4">
            <NewsItem title="myTitle" description="MyDescription" />
            </div>
            <div className="col-md-4">
            <NewsItem title="myTitle" description="MyDescription" />
            </div>
            <div className="col-md-4">
            <NewsItem title="myTitle" description="MyDescription" />
            </div>
            <div className="col-md-4">
            <NewsItem title="myTitle" description="MyDescription" />
            </div>
        </div>
      </div>
    );
  }
}

export default News;
