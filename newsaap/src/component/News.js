import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    page: 1,
    category: "general",
  };

  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    page: PropTypes.number,
  };

  constructor() {
    super();
    console.log("Hello I am a constructor from News component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async updateNews(pageNo) {
    this.props.setProgress(10);
    console.log("progress ",this.props.setProgress(10));
    console.log("updateNews");
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=151da54f0d5f4cd4884e7e7571f97d60&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    this.props.setProgress(30);
    console.log("progress ",this.props.setProgress(30));

    console.log("data=== >", data);
    let parseData = await data.json();
    console.log("parseData=== >", parseData);
    this.props.setProgress(80);
    console.log("progress ",this.props.setProgress(80));

    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading : false
    });
    this.props.setProgress(100);
  }
  handlePrevClick = async () => {
    // console.log("handlePrevClick");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=151da54f0d5f4cd4884e7e7571f97d60&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading : true});
    // let data = await fetch(url);
    // console.log("data=== >",data);
    // let parseData = await data.json();
    // console.log("parseData=== >",parseData);
    // this.setState({
    //    page : this.state.page - 1,
    //    articles : parseData.articles,
    //    loading : false
    // })
    // console.log("Page: ==========>",this.state.page)
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    // console.log("handleNextClick");
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/20))){
    //   console.log("totalResults: ",this.state.totalResults);
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=151da54f0d5f4cd4884e7e7571f97d60&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading : true});
    //   let data = await fetch(url);
    //   console.log("data=== >",data);
    //   let parseData = await data.json();
    //   console.log("parseData=== >",parseData);
    //  // this.setState({loading : false}); or we can do mention in below
    //   this.setState({
    //      page : this.state.page + 1,
    //      articles : parseData.articles,
    //      loading : false
    //   })
    // }
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });

    console.log("page==========>",this.state.page);
    this.props.setProgress(20);
    console.log("fetchMoreData");
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=151da54f0d5f4cd4884e7e7571f97d60&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    this.props.setProgress(50);

    console.log("fetchMoreData data=== >", data);
    let parseData = await data.json();
    console.log(" fetchMoreData parseData=== >", parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };

  async componentDidMount() {
    this.setState({
      page: this.state.page + 1,
    });
    this.props.setProgress(20);
    console.log("page==========>",this.state.page);
    console.log("Cmd");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=151da54f0d5f4cd4884e7e7571f97d60&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    await setTimeout(5000);
    this.props.setProgress(50);
    let data = await fetch(url);
    this.props.setProgress(80);
    console.log("data=== >", data);
    let parseData = await data.json();
    console.log("parseData=== >", parseData);
    console.log("Loading ===>" + this.state.loading);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  render() {
    console.log("render.........",this.props.category);
    return (
      <>
        <h1 className="text-center" style={{ margin: `60px 0px` }}>
          { this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - Top Headlines
        </h1>
        {/* {!this.state.loading && <Spinner/>}  */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row  my-3">
              {this.state.articles.map((element,index) => {
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
}

export default News;
