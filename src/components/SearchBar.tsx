import React from 'react';  
import TextField from '@mui/material/TextField';

const SearchBar: React.FC<{ onSearch: (searchTerm: string) => void }> = ({ onSearch }) => {  
    return (  
        <TextField  
            type="text"  
            placeholder="Search agents..."  
            onChange={e => onSearch(e.target.value)}  
            variant='outlined'
            label="Search"
            sx={{width: "100%"}}
        />  
    );  
};  

export default SearchBar;