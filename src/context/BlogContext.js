import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer'

const blogReducer = (state , action) => {
    switch (action.type){
        case 'get_blogPosts' : 
            return action.payload;
        case 'edit_blogPost' :
            return state.map(blogPost => {
                return blogPost.id == action.payload.id ? action.payload : blogPost;
            });
        case 'delete_blogPost' :
            return state.filter((blogPost) => blogPost.id != action.payload);
        default : 
            return state
    }
}

const getBlogPost = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts')

        dispatch({type : 'get_blogPosts', payload : response.data })
    }
}

const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        await jsonServer.post('/blogposts',{title,content})
        if(callback){
            callback();
        }
    }
}

const deleteBlogPost = dispatch => {
    return async id => {
        console.log(id);
        await jsonServer.delete(`/blogposts/${id}`);
        dispatch({type : 'delete_blogPost', payload : id})
    }
}

const editBlogPost = dispatch => {
    return (id, title, content, callback) => {
        dispatch({
            type : 'edit_blogPost',
            payload : {id, title, content}
        })
        if(callback){
            callback();
        }
    }
}

export const {Context, Provider} = createDataContext(
    blogReducer, 
    {addBlogPost , deleteBlogPost, editBlogPost, getBlogPost}, 
    []
);