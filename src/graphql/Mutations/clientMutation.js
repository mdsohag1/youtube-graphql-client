import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
   mutation register($name: String!, $email: String!, $password: String!) {
      register(name: $name, email: $email, password: $password) {
         _id
         name
         img
         coverImg
         subscriber
         subscribedUsers
         token
      }
   }
`;
export const LOGIN_USER = gql`
   mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
         _id
         name
         img
         coverImg
         subscriber
         subscribedUsers
         token
      }
   }
`;
export const GOOGLE_LOGIN_USER = gql`
   mutation googleSignin($email: String!) {
      googleSignin(email: $email) {
         _id
         name
         img
         coverImg
         subscriber
         subscribedUsers
         token
      }
   }
`;

export const ADD_VIDEO = gql`
   mutation addVideo(
      $tittle: String!
      $desc: String!
      $imgUrl: String!
      $videoUrl: String!
   ) {
      addVideo(
         tittle: $tittle
         desc: $desc
         imgUrl: $imgUrl
         videoUrl: $videoUrl
      ) {
         _id
         tittle
         desc
      }
   }
`;
