import React from 'react'
import styled from 'styled-components'
import RowItem from './RowItem';
import { useDataLayerValue } from '../DataLayer'

function RowTopArtists() {
    const [{ topArtists }] = useDataLayerValue()

    return (
        <Container>
            <TitleContainer>
                <h1>Jump back in</h1>
                <span>Show all</span>
            </TitleContainer>
            <RowContainer>
                {
                    topArtists?.items.map((top) => (
                        <RowItem key={top.id} thumbnail={top.images[0]?.url}
                            title={top.name} sub={top.type} type={top.type} />
                    ))
                }
            </RowContainer>
        </Container>
    )
}

export default RowTopArtists

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    margin: 11px 0 26px 0;
    max-width: calc(100vw - 420px );

    h1{
        font-size: 22px;
        white-space: nowrap;
    }
`

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 2160px;

    h1{
        font-size: 22px;
        white-space: nowrap;
    }
    span{
        display: flex;
        align-items: flex-end;
        margin-right: 40px;
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap;
        color: #b8b8b8;
        cursor: pointer;

        &:hover{
            text-decoration: underline;
        }
    }
`

const RowContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 190px);
    grid-gap: 25px; 
    margin-top: 22px;
    margin-right: 10px;
    max-height: 270px;
    overflow: hidden;
`