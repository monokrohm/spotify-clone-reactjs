import React, { useEffect } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Banner from '../components/Banner';
import BannerLogin from '../components/BannerLogin';
import FooterAd from '../components/FooterAd';
import FooterPlayback from '../components/FooterPlayback';
import LeftPaneTop from '../components/LeftPaneTop';
import LeftPaneLibrary from '../components/LeftPaneLibrary';
import RowShows from '../components/RowShows';
import RowRecent from '../components/RowRecent';
import RowArtists from '../components/RowArtists';
import RowTopArtists from '../components/RowTopArtists';
import RowTopTracks from '../components/RowTopTracks';
import RowGenreRec from '../components/RowGenreRec';
import RowMoreLike from '../components/RowMoreLike';
import RowFeaturedPlaylists from '../components/RowFeaturedPlaylists';
import {
    currentToken, getUserData, getUserPlaylists, getPlayback, getCurrentTrack,
    getUserShows, getRecentTrack, getFollowedArtists, getTopArtists,
    getTopTracks, getGenreRecommendations, getMoreLike, getFeaturedPlaylists,
} from '../spotify'
import { useDataLayerValue } from '../DataLayer';

function Home() {
    const [{ token, shows, recentTracks, artists, topArtists, topTracks, featuredP, genreRec, moreLike }, dispatch] = useDataLayerValue()

    function randomNum(max) {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
        async function setData() {
            if (currentToken.access_token) {
                if (!featuredP) {
                    const shows = await getUserShows();
                    const artists = await getFollowedArtists();
                    const topArtists = await getTopArtists();
                    const topTracks = await getTopTracks();
                    const featuredP = await getFeaturedPlaylists();

                    dispatch({
                        type: "SET_SHOWS",
                        shows: shows
                    })
                    dispatch({
                        type: "SET_ARTISTS",
                        artists: artists
                    })
                    dispatch({
                        type: "SET_TOPARTISTS",
                        topArtists: topArtists
                    })
                    dispatch({
                        type: "SET_TOPTRACKS",
                        topTracks: topTracks
                    })
                    dispatch({
                        type: "SET_FEATUREDPLAYLISTS",
                        featuredP: featuredP
                    })
                }

                const user = await getUserData();
                const playlists = await getUserPlaylists();
                const currentPlayback = await getPlayback();
                const currentTrack = await getCurrentTrack();
                const recentTracks = await getRecentTrack();
                // const genreRec = await getGenreRecommendations(topArtists?.items[randomNum(topArtists?.items.length)].genres[0]);
                const moreLike = await getMoreLike(recentTracks?.items[0].track.artists[0].id);

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
                dispatch({
                    type: "SET_GENRERECOMMENDATIONS",
                    genreRec: genreRec
                })
                dispatch({
                    type: "SET_MORELIKE",
                    moreLike: moreLike
                })
            }
        }
        setData()
    }, [])

    return (
        <AppContainer>
            <Container>
                <LeftPane $user={token}>
                    <LeftPaneTop />
                    <LeftPaneLibrary />
                </LeftPane>

                <MainContainer $user={token}>
                    {token ? null : <BannerLogin />}
                    <Header />
                    {token ? <Banner /> : null}
                    {
                        token ?
                            <RowsContainer>
                                {shows && <RowShows />}
                                {recentTracks && <RowRecent />}
                                {artists && <RowArtists />}
                                {topArtists && <RowTopArtists />}
                                {topTracks && <RowTopTracks />}
                                {genreRec && Object.keys(genreRec?.tracks).length > 0 ? <RowGenreRec /> : null}
                                {moreLike && <RowMoreLike />}
                                <RowFeaturedPlaylists />
                            </RowsContainer> :
                            null
                    }
                </MainContainer>
            </Container>
            {token ? <FooterPlayback /> : <FooterAd />}
        </AppContainer>
    )
}

export default Home

const AppContainer = styled.div`
    display: flex;
    position: relative;
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

const RowsContainer = styled.div`
    display: flex;
    position: absolute;
    flex-flow: column nowrap;
    margin-top: 320px;
    margin-left: 24px;
    width: 100%;

    max-width: 2200px;

    @media (max-width: 1180px){
        margin-top: 300px;
    }
    @media (min-width: 1181px) and (max-width: 1580px){
        margin-top: 250px;
    }
    @media (min-width: 1581px) and (max-width: 2090px){
        margin-top: 290px;
    }
`