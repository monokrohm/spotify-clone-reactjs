import React, { useState } from 'react'
import styled from 'styled-components'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import MicExternalOnOutlinedIcon from '@mui/icons-material/MicExternalOnOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CastIcon from '@mui/icons-material/Cast';
import PictureInPictureAltIcon from '@mui/icons-material/PictureInPictureAlt';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import VolumeDownOutlinedIcon from '@mui/icons-material/VolumeDownOutlined';
import Slider from '@mui/material/Slider';
import { playClick, pauseClick, previousClick, nextClick, shuffleClick } from '../spotify';
import { useDataLayerValue } from '../DataLayer'

function FooterPlayback() {
    const [{ playback, currentTrack }] = useDataLayerValue();
    const [playState, setPlayState] = useState(playback?.is_playing);
    const [shuffleState, setShuffleState] = useState(playback?.shuffle_state)

    return (
        <Container >
            <Content>
                <NowPlaying>
                    {currentTrack && <img src={currentTrack?.item?.album.images[0].url} alt={currentTrack?.item?.name} />}
                    <TrackInfo>
                        {currentTrack && <span>{currentTrack?.item?.name}</span>}
                        {currentTrack && <p>{currentTrack?.item?.artists[0].name}</p>}
                    </TrackInfo>
                    <FavoriteBorderIcon className='fave' />
                </NowPlaying>

                <PlaybackControls>
                    <PlaybackButtons $shuffleshow={shuffleState}>
                        <ShuffleIcon onClick={() => { shuffleClick(!shuffleState); setShuffleState(!shuffleState) }} className="playback_small_shuffle" />
                        <SkipPreviousIcon onClick={previousClick} className="playback_small" />
                        {
                            playState ?
                                <PauseCircleIcon onClick={() => { pauseClick(); setPlayState(!playState); }} className="playback_small play" /> :
                                <PlayCircleIcon onClick={() => { playClick(); setPlayState(!playState); }} className="playback_small play" />
                        }
                        <SkipNextIcon onClick={nextClick} className="playback_small" />
                        <RepeatOutlinedIcon className="playback_small" />
                    </PlaybackButtons>
                </PlaybackControls>

                <RightControls >
                    <SlideshowIcon className="right_icons" />
                    <MicExternalOnOutlinedIcon className="right_icons" />
                    <MenuIcon className="right_icons" />
                    <CastIcon className="right_icons" />
                    <VolumeDownOutlinedIcon className="right_icons" />
                    <Slider size="small" style={{ width: '95px' }} />
                    <PictureInPictureAltIcon className="right_icons" />
                    <OpenInFullIcon className="right_icons" />
                </RightControls>
            </Content>
        </Container>
    )
}

export default FooterPlayback

const Container = styled.div`
    display: flex;
    margin: 0 8px 8px 8px;
    z-index: 99;
`

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 72px;
    background-color: black;
`

const NowPlaying = styled.div`
    display: flex;
    flex: 0.3;
    align-items: center;

    img{
        padding: 8px;
        width: 56px;
        height: 56px;
        border-radius: 5px;
        cursor: pointer;
    }
    .fave{
        margin-left: 13px;
        font-size: 20px;
        opacity: 0.5;
        cursor: pointer;

        transition: 200ms opacity ease-in;

        &:hover{
            opacity: 1;
        }
    }
    span{
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
    }
    p{
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
    }
`

const TrackInfo = styled.div`
    margin: 0 7px;

    span{
        font-size: 14px;
        cursor: pointer;

        &:hover{
            text-decoration: underline;
        }
    }
    p{
        font-size: 11px;
        opacity: 0.5;
        cursor: pointer;

        &:hover{
            text-decoration: underline;
            opacity: 1;
        }
    }
`

const PlaybackControls = styled.div`
    display: flex;
    flex: 0.4;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
`

const PlaybackButtons = styled.div`
    display: flex;
    align-items: center;

    .playback_small{
        padding: 0 5px;
        font-size: 28px;
        opacity: 0.6;

        transition: 200ms opacity ease-in;

        &:hover{
            opacity: 1;
        }
    }
    .playback_small.play{
        font-size: 45px;

        transition: 0.2s transform ease-in-out;
        
        &:hover{
            transform: scale(1.05);
        }
    }
    .playback_small_shuffle{
        padding: 0 5px;
        font-size: 28px;
        opacity: ${prop => prop.$shuffleshow ? "1" : "0.6"};

        transition: 200ms opacity ease-in;

        &:hover{
            opacity: 1;
        }
    }
`

const RightControls = styled.div`
    display: flex;
    flex: 0.3;
    align-items: center;
    justify-content: end;
    padding-right: 5px;

    .right_icons{
        padding: 0 6px;
        font-size: 20px;
        opacity: 0.5;
        cursor: pointer;

        transition: 200ms opacity ease-in;

        &:hover{
            opacity: 1;
        }
    }
`