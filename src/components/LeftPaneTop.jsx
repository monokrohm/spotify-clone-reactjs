import React from 'react'
import styled from 'styled-components'
import LeftPaneItem from './LeftPaneItem';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useDataLayerValue } from '../DataLayer';
import { Link } from 'react-router-dom';

function LeftPaneTop() {
    const [{ token }] = useDataLayerValue();

    return (
        <TopContainer>
            <TopOptions >
                {token ? null : <img src="/images/Spotify_LogoWhite.png" alt="" />}
                <Link to="/" style={{ textDecoration: "none" }}><LeftPaneItem Icon={HomeOutlinedIcon} title="Home" /></Link>
                <Link to="/search" style={{ textDecoration: "none" }}><LeftPaneItem Icon={SearchOutlinedIcon} title="Search" /></Link>
            </TopOptions>
        </TopContainer>
    )
}

export default LeftPaneTop

const TopContainer = styled.div`
    display: flex;
    margin-bottom: 8px;
    padding: 10px 0;
    border-radius: 10px;
    background-color: #121212;
`
const TopOptions = styled.div`
    display: flex;
    flex-flow: column nowrap;
    margin-left: 24px;

    img{
        margin: 10px 0px;
        width: 80px;
    }
`
