import React from 'react';
import {TagSearch} from './TagSearch.tsx';
import './TagSearch.css'

export const TagSearchBar = ({ handleFocused, handleSearchChange, searchText }) => {
    
    return (
        <div className='select-search-container'>
            <TagSearch inputText={searchText} handleFocused={handleFocused} handleSearchChange={handleSearchChange}/>             
        </div> 
    )
}
