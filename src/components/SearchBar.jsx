import React from 'react'
import styled from 'styled-components'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function SearchBar() {
    return (
        <SearchContainer>
            <SearchOutlinedIcon className="search_icon" />
            <SearchInput></SearchInput>
        </SearchContainer>
    )
}

export default SearchBar

const SearchContainer = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    background-color: transparent;
    z-index: 3;

    .search_icon{
        position: absolute; 
        padding: 10px;
        background-color: transparent;
    }
`
const SearchInput = styled.input.attrs({ placeholder: "What do you want to listen to?" })`
    display: flex;
    padding: 14px 38px;
    width: 365px;
    box-sizing: border-box;
    border: 1px solid transparent;
    border-radius: 50px;
    background-color: #242424;

    &:hover{
        border: 1px solid rgb(70,70,70);
        background-color: #2a2a2a;
    }
    &:focus{
        outline: none;
        border: 2px solid white;
    }
`