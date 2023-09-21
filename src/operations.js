import { gql } from '@apollo/client';

export const ADD_TAG = gql`
    mutation addTag($searchText: String!) {
        insertOneHashtag(data:{hashtag: $searchText}) {
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

export const GET_METRICS_FROM_LIST = gql`
    query GetMetrics($currentTags: [String]!){
        metrics(
            query: {hashtag_in: $currentTags}
            limit: 100000000
            sortBy: HASHTAG_ASC
        ) {
        hashtag
        views
        date
        }
    }
`


export const GET_PCT_CHANGES_ONE_DAY = gql`
query GetMetricPercentChanges($today: String!){
    metric_pct_changes(
        query: {date: $today }, 
        limit:100, 
        sortBy: ONE_DAY_DESC
        ) {
        _id
        hashtag
        one_day
    }
  }
`

export const GET_PCT_CHANGES_ONE_WEEK = gql`
query GetMetricPercentChanges($today: String!){
    metric_pct_changes(
        query: {date: $today }, 
        limit:100, 
        sortBy: ONE_WEEK_DESC
        ) {
        _id
        hashtag
        one_week
    }
  }
`

export const GET_PCT_CHANGES_TWO_WEEKS = gql`
query GetMetricPercentChanges($today: String!){
    metric_pct_changes(
        query: {date: $today }, 
        limit:100, 
        sortBy: TWO_WEEKS_DESC
        ) {
        _id
        hashtag
        two_weeks
    }
  }
`

export const GET_PCT_CHANGES_ONE_MONTH= gql`
query GetMetricPercentChanges($today: String!){
    metric_pct_changes(
        query: {date: $today }, 
        limit:100, 
        sortBy: ONE_MONTH_DESC
        ) {
        _id
        hashtag
        one_month
    }
  }
`

export const GET_PCT_CHANGES_THREE_MONTHS = gql`
query GetMetricPercentChanges($today: String!){
    metric_pct_changes(
        query: {date: $today },
        limit:100,
        sortBy: THREE_MONTHS_DESC
        ) {
        _id
        hashtag
        three_months
    }
}
`

export const GET_PCT_CHANGES_SIX_MONTHS = gql`
query GetMetricPercentChanges($today: String!){
    metric_pct_changes(
        query: {date: $today },
        limit:100,
        sortBy: SIX_MONTHS_DESC
        ) {
        _id
        hashtag
        six_months
    }
}
`

export const GET_PCT_CHANGES_ONE_YEAR = gql`
query GetMetricPercentChanges($today: String!){
    metric_pct_changes(
        query: {date: $today },
        limit:100,
        sortBy: ONE_YEAR_DESC
        ) {
        _id
        hashtag
        one_year
    }
}
`

