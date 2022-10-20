import { gql } from "@apollo/client";

export const RANDOM_VIDEOS = gql`
   query {
      randomVideos {
         _id
         userId
         tittle
         desc
         imgUrl
         videoUrl
         views
         likes
         dislikes
         tags
         createdAt
         updatedAt
         author {
            _id
            name
            img
            coverImg
            subscriber
         }
         comments {
            desc
         }
      }
   }
`;

export const VIDEOS_BY_ID = gql`
   query video($id: ID) {
      video(id: $id) {
         _id
         userId
         tittle
         desc
         imgUrl
         videoUrl
         views
         likes
         dislikes
         tags
         createdAt
         author {
            _id
            name
            img
            coverImg
            subscriber
         }
         comments {
            desc
         }
      }
   }
`;

export const USER = gql`
   query user($id: ID) {
      user(id: $id) {
         _id
         name
         img
         coverImg
         subscriber
         subscribedUsers
      }
   }
`;

export const CHANNEL_VIDEO = gql`
   query channelVideos($id: ID) {
      channelVideos(id: $id) {
         _id
         userId
         tittle
         imgUrl
         views
         createdAt
      }
   }
`;
