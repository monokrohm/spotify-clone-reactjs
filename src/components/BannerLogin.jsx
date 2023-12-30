import React from 'react'
import styled from 'styled-components'

function BannerLogin() {
    return (
        <Container>
            <h1>Log in to begin</h1>
            <Description>
                <span>Some features may require a premium account.</span>
                <p>Playback controls require a premium account and a recently played track.</p>
            </Description>
        </Container>
    )
}

export default BannerLogin

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    margin-top: 90px;
    margin-left: 24px;

    h1{
        font-size: 22px;
        white-space: nowrap;
    }
    
`

const Description = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    margin-top: 22px;
    height: 100px;
    padding: 16px;
    border-radius: 5px; 
    background-color: #181818;
    cursor: pointer;

    transition: 0.2s background-color ease-in;

    &:hover{
        background-color: #242424;
    }

    span{
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.5px;
        white-space: nowrap;
    }
    p{
        margin-top: 5px;
        font-size: 14px;
        white-space: nowrap;
        color: rgba(250,250,250,0.5);
    }
`