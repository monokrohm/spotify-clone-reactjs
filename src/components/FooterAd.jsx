import React from 'react'
import styled from 'styled-components'
import { loginWithSpotifyClick } from '../spotify'

function FooterAd() {
    return (
        <Container>
            <Content>
                <TextContainer>
                    <h6>SPOTIFY CLONE</h6>
                    <span>Log in to your Spotify account to begin. Some features may require a premium account.</span>
                </TextContainer>
                <LoginButton onClick={loginWithSpotifyClick}>Log in for free</LoginButton>
            </Content>
        </Container>
    )
}

export default FooterAd

const Container = styled.div`
    display: flex;
    margin: 0 8px 8px 8px;
    background-image: linear-gradient(to right, rgb(175,40,150), rgb(80,154,244));
`

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 65px;
    width: 100%;
    overflow: hidden;
`

const TextContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    margin-left: 15px;
    white-space: nowrap;
    
    h6{
        font-size: 12px;
        font-weight: 200;
        letter-spacing: 1.2px;
    }
    span{
        letter-spacing: 0.5px;
        font-size: 16px;
    }
`

const LoginButton = styled.button`
    margin-right: 28px;
    padding: 13px 35px;
    border: none;
    border-radius: 50px;
    background-color: white;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.5px;
    white-space: nowrap;
    color: black;
    cursor: pointer;

    &:hover{
        transform: scale(1.04);
        font-weight: 800;
    }
`