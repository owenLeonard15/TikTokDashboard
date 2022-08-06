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
    hashtags (
        query: {}
        limit: 100000
        sortBy: _ID_DESC
    ){
        _id
        hashtag
    }
}
`;

export const GET_METRICS = gql`
    query GetMetrics{
        metrics (
            query: {}
            limit: 100000000
            sortBy: HASHTAG_ASC
        ) {
            hashtag
            views
            date
        }
    }
`





 