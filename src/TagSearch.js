import './TagSearch.css'

const TagSearch = ({handleSearchChange, inputText, handleFocused}) => {
    return <input className='select-search-input' placeholder="add a hashtag.. " value={inputText} onFocus={handleFocused} onChange={handleSearchChange}/>
}

export default TagSearch;