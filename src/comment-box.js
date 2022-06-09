import Axios from 'axios';
import React, { Component , useState } from 'react';
// import Axios from 'axios';


// {
//     "number" : 0 ,
//     "content" : "First-post-Gravity",
//     "comments" : [
//         {
//             "comment" : "First-comment-in-first-post"
//         }
//     ]
// },



class CommentBox extends Component {

    constructor(props){
        super(props);
        this.state = {
            // comments : [ { content : 'first-comment' } ],
            comments : this.props.comments.comments,
        };
        this.onNewComment = this.onNewComment.bind(this);
        // console.log(this.props.comments);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ comments : nextProps.comments.comments });
    }

    onNewComment(newComment){
        Axios.post('https://discussion-app-backend.herokuapp.com/add-comment' , 
            {
                number : this.props.comments.number,
                comment : newComment,
            }
        ).then(
            (result)=>{
                this.setState(
                    ()=>(
                        {
                            comments : result.data.comments
                        }
                    )
                )
            }
        )
    }

    render(){
        return(
            <div>
                CommentBox
                <div className='comments'>
                    {
                        this.state.comments.map(
                            (c)=>(
                                <Comment comment={c} />
                            )
                        )
                    }
                </div>
                <CreateComment onCreate={ this.onNewComment } />
            </div>
        );
    }

}

function Comment(props){
    return(
        <div>
            <p>{ props.comment.comment }</p>
        </div>
    );
}

function CreateComment(props){

    const [ value , setValue ] = useState('');

    const handleSubmit = (event)=>{
        event.preventDefault();
        props.onCreate(value);
        setValue('');
    }

    return(
        <div>
            <form>
                <input type='text' value={value} placeholder='your-comment-here' onChange={ (e)=>setValue(e.target.value) } />
                <button onClick={ handleSubmit } >post-comment</button>
            </form>
        </div>
    );
}

export default CommentBox ;