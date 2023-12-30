import React from 'react'
import styled from 'styled-components'

function LeftPaneItem({ Icon, title }) {
    return (
        <ItemContainer>
            {Icon && <Icon className="item_icon" />}
            {Icon ? <span>{title}</span> : <p>{title}</p>}
        </ItemContainer>
    )
}

export default LeftPaneItem

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
    cursor: pointer;

    .item_icon{
        margin-right: 18px;
        font-size: 26px;
        background-color: transparent;
        opacity: 0.6;

        transition: 200ms opacity ease-in;
    }
    span{
        font-size: 16px;
        font-weight: 600; 
        letter-spacing: 0.3px;
        color: rgba(250,250,250,0.6);

        transition: 200ms color ease-in;
    }

    &:hover{
        span{
            color: rgb(250,250,250);
        }
        .item_icon{
            opacity: 1;
        }
    }
`