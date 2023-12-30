import React from 'react'
import styled from 'styled-components'
import LeftPaneItemLibrary from './LeftPaneItemLibrary';
import LeftPaneItem from './LeftPaneItem';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ListIcon from '@mui/icons-material/List';
import { useDataLayerValue } from '../DataLayer';
import { Link } from 'react-router-dom';

function LeftPaneLibrary() {
    const [{ token, shows, artists, playlists }] = useDataLayerValue();

    return (
        <LibraryMainContainer>
            <LibraryOptions style={{ justifyContent: "space-between" }}>
                <Link to="/" style={{ textDecoration: "none" }}><LeftPaneItem Icon={StackedBarChartIcon} title="Your Library" /></Link>
                <LibraryOptionsButtons>
                    <AddButton>+</AddButton>
                    {token ? <AddButton style={{ fontSize: "20px" }}>→</AddButton> : null}
                </LibraryOptionsButtons>
            </LibraryOptions>
            {token ?
                <LibraryOptions style={{ marginTop: "10px", marginLeft: "16px", paddingBottom: "8px" }}>
                    <SortButton>Playlists</SortButton>
                    <SortButton>Artists</SortButton>
                    <SortButton>Podcasts & Shows</SortButton>
                </LibraryOptions> :
                null
            }

            <LibraryContainer $user={token}>
                <ListContainer>
                    {token ?
                        <LibraryOptions style={{ maxHeight: "46px", marginLeft: "16px", justifyContent: "space-between" }}>
                            <AddButton><SearchOutlinedIcon className="search_icon" /></AddButton>
                            <RecentsContainer>
                                Recents
                                <ListIcon className="list_icon" />
                            </RecentsContainer>
                        </LibraryOptions> :
                        null
                    }

                    {playlists?.items?.map(playlist => (
                        <LeftPaneItemLibrary key={playlist.id} thumbnail={playlist.images[0].url}
                            title={playlist.name} type={playlist.type} owner={playlist.owner?.display_name} />
                    ))}
                    {shows?.items?.map(show => (
                        <LeftPaneItemLibrary key={show.show.id} thumbnail={show.show.images[0].url}
                            title={show.show.name} type={show.show.type} owner={show.show.publisher} />
                    ))}
                    {artists?.artists?.items?.map(artist => (
                        <LeftPaneItemLibrary key={artist.id} thumbnail={artist.images[0].url}
                            title={artist.name} type={artist.type} />
                    ))}
                </ListContainer>
            </LibraryContainer>
        </LibraryMainContainer >
    )
}

export default LeftPaneLibrary

const LibraryMainContainer = styled.div`
    display: flex;    
    flex-flow: column nowrap;
    flex: 1;
    width: 100%;
    border-radius: 10px;
    background-color: #121212;
`

const LibraryOptions = styled.div`
    display: flex;
    align-items: center;
    margin-right: 8px;
    margin-left: 24px;
`

const LibraryOptionsButtons = styled.div`
    display: flex;
    align-items: center;
`

const AddButton = styled.button`
    margin: 10px 0;
    margin-right: 5px;
    padding: 0;
    width: 35px;
    height: 35px;
    font-size: 28px;
    border: none;
    border-radius: 50px;
    background-color: transparent;
    color: rgba(250,250,250,0.5);
    cursor: pointer;

    transition: 200ms color ease-in;

    .search_icon{
        opacity: 0.5;
    }
    &:hover{
        background-color: #191919;
        color: rgb(250,250,250);
        
        .search_icon{
            opacity: 1;
        }
    }
`

const SortButton = styled.button`
    margin-right: 8px;
    padding: 6px 12px;
    border: none;
    border-radius: 50px;
    font-size: 14px;
    background-color: #232323;
    cursor: pointer;

    &:hover{
        background-color: #2a2a2a;
    }
`

const RecentsContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #b8b8b8;
    cursor: pointer;

    .list_icon{
        margin-left: 5px;
        font-size: 25px;
        opacity: 0.7;
    }
    &:hover{
        transform: scale(1.03);
        color: white;
        
        .list_icon{
            opacity: 1;
        }
    }
`

const LibraryContainer = styled.div`
    display: flex;
    flex: 1;
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;

    transition: --var1 .5s;
    @property --var1 {
        syntax: "<color>";
        inherits: true;
        initial-value: rgba(18,18,18,1);
    }
    &:hover {
        --var1: rgba(250,250,250,0.3);
    }
    &::-webkit-scrollbar {
        display: ${prop => prop.$user ? "initial" : "none"};
        width: 12px;
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: var(--var1);
    }
    &::-webkit-scrollbar-track-piece:start {
        margin-top: 5px;
    }
    &::-webkit-scrollbar-track-piece:end {
        margin-bottom: 5px; 
    }
`

const ListContainer = styled.div`
    position: absolute;
    width: 100%;
`