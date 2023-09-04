import React from 'react'
import './TagSearch.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export const TagSearch = ({handleSearchChange, inputText, isFocused, handleFocused}) => {
    return <div className="form-group fg--search">
        <FontAwesomeIcon icon={faMagnifyingGlass} className='fa-search-icon'/>
        <input 
            type='text'
            placeholder="Search" 
            style={{"boxShadow":  isFocused && inputText.length > 0 ?  "0 4px 4px 0 rgba(0, 0, 0, 0.25)" : "none"}}
            value={inputText} 
            onFocus={handleFocused} 
            onChange={handleSearchChange}
        />
    </div>
}