import TagSearch from './TagSearch';
import './TagSearch.css'

const TagSearchBar = ({ handleFocused, handleSearchChange, searchText }) => {
    
    return (
        <div className='select-search-container'>
            <TagSearch inputText={searchText} handleFocused={handleFocused} handleSearchChange={handleSearchChange}/>             
        </div> 
    )
}

export default TagSearchBar

