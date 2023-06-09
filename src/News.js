import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
constructor(props){
  super(props);
this.state = {
    articles : [],
    loading : false,
    page : 1,
    totalResults: 0
}
document.title = `WiseMan News | ${this.capitalizeFirstLetter(this.props.category)}`
}
async updateNews(){
  this.setState({loading:true});
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=04f14f2884e14740842bbea161dc96fa&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json();
  this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,loading: false});
}
async componentDidMount(){
this.updateNews();
}

handleNextClick = async ()=> {
 this.setState({page: this.state.page + 1});
 this.updateNews();
  }

handlePrevClick = async() => {
  this.setState({page: this.state.page - 1});
 this.updateNews();
}
// fetchMoreData = () => {
// this.setState({page: this.state.page + 1})
// this.updateNews();
// };

  render() {
    return (

      <div className='container my-5'>
        <h1 className="text-center">WisemanNews - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
            {/* {this.state.loading && <Spinner/>} */}

            {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={<Spinner/>}
        /> */}
                  <div className="row my-5 mx-5">
             { this.state.articles.map((element)=>{
                    return <div className='col-md-4' key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
              })}
          </div>
          {/* <InfiniteScroll/> */}
                {/* <div className="container d-flex justify-content-between">
                  <button disabled={this.state.page<=1} type="button" className="btn btn-outline-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                  <button disabled={this.state.page>=Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-outline-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}

        </div>
    )
  }
}

export default News
