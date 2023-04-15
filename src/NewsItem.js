import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

    return (
      <div>
        <div className="card" style={{ width: "18rem;" }}>
          <img src={!imageUrl?"https://n5a7d2f2.stackpathcdn.com/wp-content/uploads/2023/02/Te-Future-Of-Memory-Editorial.jpg":imageUrl} className="card-img-top" alt='' />
          <div className="card-body">
          <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:"1"}}>{source}</span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}....</p>
            <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
