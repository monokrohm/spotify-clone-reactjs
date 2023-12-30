import React, { useEffect } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import FooterAd from '../components/FooterAd';
import FooterPlayback from '../components/FooterPlayback';
import LeftPaneTop from '../components/LeftPaneTop';
import LeftPaneLibrary from '../components/LeftPaneLibrary';
import SearchOptions from '../components/SearchOptions';
import {
    currentToken, getUserData, getUserPlaylists, getCurrentTrack,
    getCategories, getUserShows, getFollowedArtists, getPlayback,
    getRecentTrack
} from '../spotify'
import { useDataLayerValue } from '../DataLayer';

function Search() {
    const [{ token, categories }, dispatch] = useDataLayerValue()

    useEffect(() => {
        async function setData() {
            if (currentToken.access_token) {
                if (!token) {
                    const user = await getUserData();
                    const playlists = await getUserPlaylists();
                    const shows = await getUserShows();
                    const artists = await getFollowedArtists();

                    dispatch({
                        type: "SET_USER",
                        user: user
                    })
                    dispatch({
                        type: "SET_TOKEN",
                        token: currentToken.access_token
                    })
                    dispatch({
                        type: "SET_PLAYLISTS",
                        playlists: playlists
                    })
                    dispatch({
                        type: "SET_SHOWS",
                        shows: shows
                    })
                    dispatch({
                        type: "SET_ARTISTS",
                        artists: artists
                    })
                }

                if (!categories) {
                    const categories = await getCategories();

                    dispatch({
                        type: "SET_CATEGORIES",
                        categories: categories
                    })
                }

                const currentPlayback = await getPlayback();
                const currentTrack = await getCurrentTrack();
                const recentTracks = await getRecentTrack();

                dispatch({
                    type: "SET_PLAYBACK",
                    playback: currentPlayback
                })
                dispatch({
                    type: "SET_CURRENTTRACK",
                    currentTrack: currentTrack
                })
                dispatch({
                    type: "SET_RECENTTRACKS",
                    recentTracks: recentTracks
                })
            }
        }
        setData();
    }, [])

    return (
        <AppContainer>
            <Container>
                <LeftPane $user={token}>
                    <LeftPaneTop />
                    <LeftPaneLibrary />
                </LeftPane>

                <MainContainer $user={token}>
                    <Header />
                    <SearchOptions />
                </MainContainer>
            </Container>
            {token ? <FooterPlayback /> : <FooterAd />}
        </AppContainer>
    )
}

export default Search

const AppContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    height: 100vh;
    overflow: hidden;
`
const Container = styled.div`
    display: flex;
    height: 100%;
    margin: 8px;
`

const LeftPane = styled.div`
    display: flex;
    flex: 1;
    flex-flow: column nowrap;
    min-width: ${prop => prop.$user ? "360px" : "340px"};
    max-width: ${prop => prop.$user ? "420px" : "340px"};
`

const MainContainer = styled.div`
    display: flex;
    flex: 1;
    position: relative;
    margin-left: 8px;
    border-radius: 10px;
    background-color: #121212;
    overflow-y: scroll;
    overflow-x: hidden;

    transition: --var1 .5s;
    @property --var1 {
        syntax: "<color>";
        inherits: true;
        initial-value: rgba(18,18,18,0);
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