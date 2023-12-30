import React from 'react'
import styled from 'styled-components'

function BannerItem({ thumbnail, title }) {
    return (
        <MainConatainer>
            <Container>
                <img src={thumbnail} alt='' />
                <span>{title}</span>
            </Container>
        </MainConatainer>
    )
}

export default BannerItem

const MainConatainer = styled.div`
    display: flex;
    flex: 1;
`

const Container = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    border-radius: 5px; 
    background-color: rgba(120,120,120,0.2);
    cursor: pointer;

    transition: 0.2s background-color ease-in;
    
    img{
        inset: 0;
        border-radius: 5px;
        z-index: 4;
    }
    span{
        margin-left: 15px;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.5px;
        white-space: nowrap;
    }
    &:hover{
        background-color: rgba(120,120,120,0.5);
    }

    @media (max-width: 1180px){
        max-height: 45px;

        img{
            min-width: 0px;
            max-width: 45px;
            max-height: 45px;
        }
    }
    @media (min-width: 1181px) and (max-width: 1580px){
        max-height: 48px;

        img{
            min-width: 0px;
            max-width: 48px;
            max-height: 48px;
        }
    }
    @media (min-width: 1581px) and (max-width: 2090px){
        max-height: 64px;

        img{
            min-width: 0px;
            max-width: 64px;
            max-height: 64px;
        }
    }
    @media (min-width: 2091px){
        img{
            min-width: 0px;
            max-width: 80px;
            max-height: 80px;
        }
    }

`
