import React from 'react'
import styled from 'styled-components'

function RowItem({ thumbnail, title, sub, type }) {
    function uppercaseFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <Container>
            <Content $type={type}>
                <img src={thumbnail} alt='' />
                <span>{title}</span>
                <p>{uppercaseFirst(sub)}</p>
            </Content>
        </Container>
    )
}

export default RowItem

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    padding: 16px;
    border-radius: 5px; 
    background-color: #181818;
    cursor: pointer;

    transition: 0.2s background-color ease-in;

    &:hover{
        background-color: #242424;
    }
`

const Content = styled.div`
    display: flex;
    flex-grow: 0;
    flex-flow: column nowrap;
    max-width: 158px;
    
    img{
        height: 158px;
        width: 158px;
        border-radius: ${prop => prop.$type === 'artist' ? '100%' : '5px'};
    }
    span{
        margin-top: 15px;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.5px;
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
    }
    p{
        display: -webkit-box;
        margin-top: 5px;
        font-size: 14px;
        color: rgba(250,250,250,0.5);
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
`
