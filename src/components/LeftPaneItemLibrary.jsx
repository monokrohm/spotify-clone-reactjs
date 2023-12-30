import React from 'react'
import styled from 'styled-components'

function LeftPaneItemLibrary({ thumbnail, title, type, owner }) {
    function uppercaseFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <ItemContainer $type={type} >
            {thumbnail && <img src={thumbnail} />}
            {thumbnail ?
                <TextContainer>
                    {title}
                    <TypeContainer>
                        {type && <span>{uppercaseFirst(type)} {owner ? "·" : ""} {owner}</span>}
                    </TypeContainer>
                </TextContainer> :
                <p>{title}</p>}
        </ItemContainer>
    )
}

export default LeftPaneItemLibrary

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 8px;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;

    transition: 200ms color ease-in;

    img{
        margin-right: 12px;
        width: 48px;
        border-radius: ${prop => prop.$type == 'artist' ? '100%' : '5px'};
    }
    &:hover{
        background-color: #1A1A1A;
    }
`

const TextContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
`

const TypeContainer = styled.div`
    span{
        font-size: 14px;
        color: rgba(250,250,250,0.5);
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
    }
`