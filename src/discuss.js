import React , { Component , useState } from 'react';
import  Axios  from 'axios';

import Post from './post';

// function fun(post){return <Post post={ { content : post } } />}


// {
//     "number" : 0 ,
//     "content" : "First-post-Gravity",
//     "comments" : [
//         {
//             "comment" : "First-comment-in-first-post"
//         }
//     ]
// },

class Discussion extends Component{

    constructor(props){
        super(props)
        this.state = {
            // posts : [{content:'post1'}],
            posts : [],
        }
        this.onNewPost = this.onNewPost.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.getPosts();
        setInterval(this.getPosts , 1000);
    }

    getPosts(){
        Axios.post('https://discussion-app-backend.herokuapp.com/get-posts' ).then(
            (res)=>{
                this.setState(
                    ()=>(
                        {
                            posts : res.data,
                        }
                    )
                )
                // console.log(res.data);
            }
        );
    }

    onNewPost() {
        this.getPosts();
    }

    render(){
        return(
            <div>
                Discussion
                {
                    this.state.posts.map(
                        (p)=>(
                            <Post post={p} />
                        )
                    )
                }
                <CreatePost onCreate={this.onNewPost}/>
            </div>
        )
    }

}


function CreatePost(props) {

    const [value , setValue] = useState('');

    const handleSubmit = (event)=>{
        event.preventDefault()
        Axios.post('https://discussion-app-backend.herokuapp.com/add-post' , 
            {
                content : value
            }
        ).then(
            ()=>{
                props.onCreate()
            }
        )
        setValue('');
    }

    return(

        <div>
            <form>
                <input value={value} type='text' placeholder='your-post-here' onChange={(e)=>setValue(e.target.value)} />
                <button onClick={ handleSubmit } >post</button>
            </form>
        </div>

    );
}


export default Discussion ;