import React, { useEffect } from 'react'
import styled from 'styled-components'
import BannerItem from './BannerItem';
import { getArtists } from '../spotify'
import { useDataLayerValue } from '../DataLayer';

function Banner() {
    const [{ token, recentTracks, recentArtists }, dispatch] = useDataLayerValue();
    let currentTime = new Date;
    const recentArtistIds = [...new Map(recentTracks?.items.map((item) =>
        [item.track.artists[0].id, item.track.artists[0].id,])).values()].toString()

    const timeGreeting = (time) => {
        if (time >= 0 && time < 12) {
            return "Good morning";
        } else if (time >= 12 && time < 18) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    }

    useEffect(() => {
        async function setData() {
            if (token) {
                const recentArtists = await getArtists(recentArtistIds);

                dispatch({
                    type: "SET_RECENTARTISTS",
                    recentArtists: recentArtists
                })
            }
        }
        setData()
    }, [])

    //console.log("1", recentArtists)

    return (
        <Container>
            <Content>
                <h1>{timeGreeting(currentTime.getHours())}</h1>
                {recentArtists && <ContentGrid>
                    {
                        recentArtists?.artists.slice(0, 6).map((recent) => (
                            <BannerItem key={recent.id} thumbnail={recent.images[0]?.url}
                                title={recent.name} />
                        ))
                    }
                </ContentGrid>}
            </Content>
        </Container>
    )
}

export default Banner

const Container = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    z-index: 0;

    // &:after{
    //     display: block;
    //     position: absolute;
    //     content: "";
    //     width: 100%;
    //     height: 400px;
    //     background-image: linear-gradient(to top,  rgba(18,18,18,0.5) 0, rgba(91,14,14, 1) 100%);
    // }
`

const Content = styled.div`
    display: flex;
    flex: 1;
    flex-flow: column nowrap;
    margin-top: 65px;
    margin-left: 24px;
    z-index: 1;

    h1{
        font-size: 30px;
        white-space: nowrap;
    }
`

const ContentGrid = styled.div`
    display: grid;
    flex: 1;
    margin-top: 20px;
    margin-right: 12px;
    z-index: 1;

    min-width: 0;
    max-width: 1908px;
    overflow: hidden;

    @media (max-width: 1180px){
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(auto-fit, minmax(45px, 5vw));
        grid-gap: 8px;
        max-height: 151px;
    }
    @media (min-width: 1181px) and (max-width: 1580px){
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: repeat(auto-fit, minmax(48px, 5vw));
        grid-gap: 8px;
        max-height: 104px;
    }
    @media (min-width: 1581px) and (max-width: 2090px){
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: repeat(auto-fit, minmax(64px, 5vw));
        grid-gap: 12px;
        max-height: 140px;
    }
    @media (min-width: 2091px){
        grid-template-columns: 1fr 1fr 1fr;//628px
        grid-template-rows: repeat(auto-fit, minmax(20px, 5vw));
        grid-gap: 12px;
        max-height: 172px;
    }
`