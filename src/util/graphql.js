import gql from "graphql-tag";

const FETCH_ALL_POSTS_QUERY = gql`
{
  getPosts {
    body
    username
    id
    comments{
      id
      username
      body
      createdAt
    }
    commentsCount
    createdAt
    likesCount
    likes{
      id
      username
    }
  }
}
`;

const FETCH_POST_QUERY = gql`
  query getPost($postId: ID!) {
    getSinglePost(postId: $postId) {
      id username body createdAt
      likes {
        id username
      } 
      likesCount
      comments{
        id username body createdAt
      }
      commentsCount
    }
  }
`;

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      registerCredentials: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      commentsCount
      likesCount
    }
  }
`;

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes{
        id username
      }
      likesCount
    }
  }
`

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id body username createdAt
      }
      commentsCount
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id body username createdAt
      }
      commentsCount
    }
  }
`;

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) 
  }
`;

export { FETCH_ALL_POSTS_QUERY, FETCH_POST_QUERY, LOGIN_USER, REGISTER_USER, CREATE_POST_MUTATION, LIKE_POST_MUTATION, CREATE_COMMENT_MUTATION, DELETE_COMMENT_MUTATION, DELETE_POST_MUTATION };