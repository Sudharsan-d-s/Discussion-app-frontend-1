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
        this.state = {
            post : this.props.post,
        };
    }

    render(){
        return(
            <div>
                <div className='content'>
                    Post
                    <p>
                        <h1>{ this.state.post.content }</h1>
                    </p>
                </div>
                <CommentBox comments={ { number:this.state.post.number , comments : this.state.post.comments }  }/>
            </div>
        );
    }
}


export default Post ;