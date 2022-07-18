import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'

const TagInput = ({handleInputChange, handleInputSubmit, handleInputDelete, inText}) => {

    
    return <tr className='trData' style={{"display": "flex", "justifyContent": "space-between", "paddingBottom": "5px", "alignItems": "flex-end"}}>
        <td style={{"padding": "5px"}}><input value={inText} onChange={handleInputChange}/></td>
        <td style={{"padding": "5px 10px"}}><FontAwesomeIcon className='submitIcon'  icon={faPlusCircle} onClick={handleInputSubmit}/></td>
        <td style={{"padding": "5px 10px"}}><FontAwesomeIcon className='submitIcon'  icon={faTrash} onClick={handleInputDelete}/></td></tr>
}

export default TagInput;