import React, {useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [value,setValue] = useState([])
  const [articles,setArticles] = useState([])
  const [loading,setLoading] = useState(true)
  const [page,setPage] = useState(1)
  const [totalResults,setTotalResults] = useState(0)


 

  const  updateNews = async () => {
    props.setProgress(10);
    console.log("progress ",props.setProgress(10));
    console.log("updateNews");
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    console.log("progress ",props.setProgress(30));

    console.log("data=== >", data);
    let parseData = await data.json();
    console.log("parseData=== >", parseData);
    props.setProgress(80);
    console.log("progress ",props.setProgress(80));
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(()=>{
    updateNews();
  },value)

 const  handlePrevClick = async () => {
    setPage(page - 1 );
    updateNews();
  };

  const handleNextClick = async () => {
  setPage(page + 1);
    updateNews();
  };

  const fetchMoreData = async () => {
    setPage(page + 1);

    console.log("page==========>",page);
    props.setProgress(20);
    console.log("fetchMoreData");
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    props.setProgress(50);

    console.log("fetchMoreData data=== >", data);
    let parseData = await data.json();
    console.log(" fetchMoreData parseData=== >", parseData);
    setArticles( articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }



    return (
      <>
        <h1 className="text-center" style={{ margin: `60px 0px` }}>
          { props.category.charAt(0).toUpperCase() + props.category.slice(1)} - Top Headlines
        </h1>
        {/* {!this.state.loading && <Spinner/>}  */}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row  my-3">
              {articles.map((element,index) => {
                return (
                  <div className="col-md-4" key={index}>
                    <NewsItem
                      title={element.title ?element.title.slice(0, 40):""}
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://as2.ftcdn.net/v2/jpg/03/65/40/15/1000_F_365401520_zLTViwtTegqkr11c5uBElk8SfgTL8Uty.jpg"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button  disable={(this.state.page <=1).toString()} type="button" className="btn btn-primary" onClick={this.handlePrevClick} > &larr; Previous</button>
          <button  type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next 	&rarr;</button>
        </div> */}
      </>
    );
  
}

News.defaultProps = {
  country: "in",
  page: 1,
  category: "general",
};

News.propsTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  page: PropTypes.number,
};

export default News;
