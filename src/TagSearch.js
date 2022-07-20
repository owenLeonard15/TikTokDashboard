
const TagSearch = ({handleSearchChange, inputText}) => {
    
    return <tr className='trData' style={{"display": "flex", "justifyContent": "flex-start", "alignItems": "flex-end"}}>
        <td style={{"padding": "5px"}}><input placeholder="search for a tag.. " value={inputText} onChange={handleSearchChange}/></td></tr>
}

export default TagSearch;