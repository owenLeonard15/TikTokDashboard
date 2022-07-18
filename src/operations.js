import { gql } from '@apollo/client';

export const ADD_TAG = gql`
    mutation addTag($inText: String!) {
        insertOneHashtag(data:{hashtag: $inText}) {
            _id
            hashtag
        }
    }
`
export const DELETE_TAG = gql`
    mutation deleteTag($inText: String!) {
        deleteOneHashtag(query:{hashtag: $inText} ) {
            _id
            hashtag
        }
    }
`

export const DELETE_TAG_METRICS = gql`
    mutation deleteTagMetrics($inText: String!) {
        deleteManyMetrics(query:{hashtag: $inText}){
            deletedCount
        }
    }
`

export const GET_TAGS = gql`
  query GetTags{
    hashtags {
        _id
        hashtag
    }
}
`;





 