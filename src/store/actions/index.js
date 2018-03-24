export { fetchPosts,
          fetchPostById,
          editPost,
          deletePost,
          clearPost,
          fetchComments,
          postComment,
          deleteComment,
          favPost,
          unfavPost } from './postActions';

export { sendPosts, 
          triggerEditing, 
          triggerResetEditing,
          triggerClearForm,
          triggerPostEditing,
          closePostEdit } from './formActions';

export { register,
          login,
          checkAuthState,
          logout,
          setCurrentUser,
          updateCurrentUser } from './authActions';

export { loadProfileById,
          fetchPostsOfUsername,
          clearProfileState,
          follow,
          unfollow,
          triggerProfileEditing,
          resetProfileEditing } from './profileActions';