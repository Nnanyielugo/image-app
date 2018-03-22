export { fetchPosts,
          fetchPostById,
          editPost,
          deletePost,
          clearPost,
          fetchComments,
          postComment,
          deleteComment } from './postActions';

export { sendPosts, 
          triggerEditing, 
          triggerResetEditing,
          triggerClearForm,
          triggerPostEditing,
          closePostEdit } from './formActions';

export { register,
          login,
          checkAuthState,
          logout } from './authActions';