import React, { useState } from 'react'

function Post(props:any) {
    const titleElement = <h2 className="title text-start">{props.post.title}</h2>;
    const authorElement = <b className="card-text text-start">By {props.post.user.username}</b>
    const bodyElement = <p className="card-text text-start">{props.post.body }</p>;
    const tagElement = props.post.tags.map((tag: string) => {
        return (
            <span>{tag}</span>
        );
    })

  return (
    <div>
        <div className="row">
            <div className="col-8">
                {titleElement}
            </div>
        </div>
        <div className="row">
            <div className="col-8">
                {tagElement}
            </div>
        </div>
        <div className="row">
            <div className="col-8">
                {authorElement}
            </div>
        </div>
        <div className="row">
            <div className="col-8">
                {bodyElement}
            </div>
        </div>
    </div>
  )
}

export default Post