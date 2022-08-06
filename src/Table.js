import { useQuery, useMutation} from '@apollo/client';
import { ADD_TAG, DELETE_TAG, DELETE_TAG_METRICS, GET_TAGS} from './operations';
import TagInput from './TagInput';
import TagSearch from './TagSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';






const Table = ({ setVisibleItem, visibleTags}) => {
    const [inText, setInText] = useState("")
    const [searchText, setSearchText] = useState("")
    const [mutateAddTag, resAddTagData] = useMutation(
        ADD_TAG,
        {
            update (cache, { data }) {
                const newTagFromResponse = data?.insertOneHashtag;
                const existingTags = cache.readQuery({
                    query: GET_TAGS,
                });
                
                cache.writeQuery({
                    query: GET_TAGS,
                    data: {
                        hashtags: [
                            ...existingTags?.hashtags,
                            newTagFromResponse,
                        ],
                    },
                });
            }
        }
    )

    const [mutateDeleteTag, resDeleteTagData] = useMutation(
        DELETE_TAG,
        {
            refetchQueries: [
                {query: GET_TAGS},
                'GetTags'
            ],
        }
    );  

    const [mutateDeleteTagMetrics, resDeleteTagMetricsData] = useMutation(
        DELETE_TAG_METRICS,
    )

    const { loading, error, data } = useQuery(GET_TAGS);

    if (loading) return <p style={{"color": "white"}}>Loading... </p>;
    if (error) return <p>Error :(</p>;


    const handleSubmit = () => {
        let existingTags = data.hashtags.map(hashtagObj => hashtagObj.hashtag)
        if (existingTags.includes(inText)){
            setInText("")
        }

        if (inText && !existingTags.includes(inText)){
            mutateAddTag({
                variables: { inText }
            })
            setInText("")
        }
    }

    const onKeyDown = (e) => {
        if(e.key === "Enter"){
            handleSubmit()
        }
    }

    const handleDelete = () => {
        if(inText){
            mutateDeleteTag({
                variables: { inText }
            })
            
            const res = mutateDeleteTagMetrics({
                variables: { inText }
            })
            setInText("")
        }
    }

    const handleChange = (e) => {
        setInText(e.target.value)
    }

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    const unhideTag = (event, tag) => {
        event.preventDefault()
        setVisibleItem(tag)
    }

    const turnGray = (tag) => {
        document.getElementById(tag).style.color = "lightgray"
    }

    const turnDarkBlue = (tag) => {
        document.getElementById(tag).style.color = "#183153"
    }

    return <table style={{"backgroundColor": "whitesmoke", "fontWeight": "bold", "display": "flex", "flexDirection": "column", "alignItems": "flex-start", "borderRadius": "15px"}}>
        <thead style={{"backgroundColor": "#25518f", "color": "whitesmoke", "borderRadius": "10px 10px 0 0", "width": "100%"}}>
            <tr><th>Hashtags</th></tr>
        </thead>
        <thead>
            <TagSearch inputText={searchText} handleSearchChange={handleSearchChange}/> 

        </thead>
        <tbody style={{display: "block", height: "400px", width: "100%", overflowY: "auto"}}>
            {data.hashtags.map((obj) => {
                
                if(obj.hashtag.startsWith(searchText)){
                    return <tr key={obj.hashtag} className='trData' style={{"display": "flex", "justifyContent": "space-between"}}>
                        <td style={{"padding": "5px"}}>{obj.hashtag}</td>
                        {
                            visibleTags.includes(obj.hashtag) ?
                            <td onMouseDown={e => unhideTag(e, obj.hashtag)} style={{"padding": "5px 10px"}}><FontAwesomeIcon id={obj.hashtag} style={{"color": "#183153"}} className='eyeIcon'  icon={faEye} /></td>
                            :<td onMouseDown={e => unhideTag(e, obj.hashtag)} style={{"padding": "5px 10px"}}><FontAwesomeIcon id={obj.hashtag} onMouseEnter={() => turnDarkBlue(obj.hashtag)} onMouseLeave={() => turnGray(obj.hashtag)} style={{"color": "lightgray"}}className='eyeIcon'  icon={faEye} /></td>
                        }
                    </tr>
                    }
                else return null
                }
            )}
        </tbody>
        <tfoot>
            < TagInput handleInputSubmit={handleSubmit} onKeyDown={onKeyDown} handleInputDelete={handleDelete} handleInputChange={handleChange} inText={inText}/>
        </tfoot>

    </table>

}

export default Table