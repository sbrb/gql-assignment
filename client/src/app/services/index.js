import { getToken } from '@/utils/getToken';
import { GraphQLClient, gql } from 'graphql-request';

const api_endpoint = 'http://localhost:8080/graphql';
const token = getToken();

const graphQLClient = new GraphQLClient(api_endpoint, {
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

export const fetchAllUsers = async () => {
  const query = gql`
    query AllUsers {
      allUsers {
        _id
        firstName
        lastName
        userName
        profilePic
        follow
      }
    }
  `;
  const response = await graphQLClient.request(query);
  return response;
};

export const fetchUserDetails = async () => {
  const query = gql`
    query UserProfile {
      userProfile {
        firstName
        lastName
        userName
        profilePic
        following
        email
      }
    }
  `;
  const response = await graphQLClient.request(query);
  return response;
};

export const signUp = async (firstName, lastName, userName, phone, email, password, profilePic) => {
  const mutation = gql`
    mutation SignUp($firstName: String!, $lastName: String!, $userName: String!, $phone: String!, $email: String!, $password: String!, $profilePic: String) {
      userSignUp(firstName: $firstName, lastName: $lastName, userName: $userName, phone: $phone, email: $email, password: $password, profilePic: $profilePic) {
        token
      }
    }
  `;

  const variables = { firstName, lastName, userName, phone, email, password, profilePic };

  const response = await graphQLClient.request(mutation, variables);
  return response;
};

export const signIn = async (email, password) => {
  const mutation = gql`
    mutation SignIn($email: String!, $password: String!) {
      userSignin(email: $email, password: $password) {
        token
      }
    }
  `;

  const variables = { email, password };

  const response = await graphQLClient.request(mutation, variables);
  return response;
};

export const followUser = async (treatedUserId) => {
  const mutation = gql`
    mutation FollowUser($treatedUserId: ID!) {
      followUser(treatedUserId: $treatedUserId) {
        token
      }
    }
  `;

  const variables = { treatedUserId };

  const response = await graphQLClient.request(mutation, variables);
  return response;
};

export const unfollowUser = async (treatedUserId) => {
  const mutation = gql`
    mutation UnfollowUser($treatedUserId: ID!) {
      unfollowUser(treatedUserId: $treatedUserId) {
        token
      }
    }
  `;

  const variables = { treatedUserId };

  const response = await graphQLClient.request(mutation, variables);
  return response;
};
