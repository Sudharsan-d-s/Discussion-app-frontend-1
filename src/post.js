import React , { Component } from 'react';
// import Axios from 'axios';

import CommentBox from './comment-box';


// {
//     "number" : 0 ,
//     "content" : "First-post-Gravity",
//     "comments" : [
//         {
//             "comment" : "First-comment-in-first-post"
//         }
//     ]
// },


class Post extends Component  {

    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return(
            <div>
                <div className='content'>
                    Post
                    <p>
                        <h1>{ this.props.post.content }</h1>
                    </p>
                </div>
                <CommentBox comments={ { number:this.props.post.number , comments : this.props.post.comments }  }/>
            </div>
        );
    }
}


export default Post ;