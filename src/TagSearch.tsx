import './TagSearch.css'

export const TagSearch = ({handleSearchChange, inputText, handleFocused}) => {
    return <input className='select-search-input' placeholder="add a hashtag.. " value={inputText} onFocus={handleFocused} onChange={handleSearchChange}/>
}