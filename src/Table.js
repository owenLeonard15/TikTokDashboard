import { useQuery, gql, useMutation} from '@apollo/client';
import { ADD_TAG, DELETE_TAG, DELETE_TAG_METRICS, GET_TAGS} from './operations';
import TagInput from './TagInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';






const Table = ({ setHiddenItem, hiddenTags}) => {
    const [inText, setInText] = useState("")
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
        if (inText){
            mutateAddTag({
                variables: { inText }
            })
            setInText("")
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

    const hideTag = (event, tag) => {
        event.preventDefault()
        setHiddenItem(tag)
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
        <tbody>
            {data.hashtags.map((obj) => (
                <tr key={obj.hashtag} className='trData' style={{"display": "flex", "justifyContent": "space-between"}}>
                    <td style={{"padding": "5px"}}>{obj.hashtag}</td>
                {
                    hiddenTags.includes(obj.hashtag) ?
                    <td onMouseDown={e => hideTag(e, obj.hashtag)} style={{"padding": "5px 10px"}}><FontAwesomeIcon id={obj.hashtag} style={{"color": "lightgray"}} className='eyeIcon'  icon={faEye} /></td>
                    :<td onMouseDown={e => hideTag(e, obj.hashtag)} style={{"padding": "5px 10px"}}><FontAwesomeIcon id={obj.hashtag} onMouseEnter={() => turnGray(obj.hashtag)} onMouseLeave={() => turnDarkBlue(obj.hashtag)} style={{"color": "#183153"}}className='eyeIcon'  icon={faEye} /></td>
                }
            </tr>
            ))}

            < TagInput inputText={inText} handleInputSubmit={handleSubmit} handleInputDelete={handleDelete} handleInputChange={handleChange} inText={inText}/>
            
        </tbody>
        
    </table>

}

export default Table