import React from 'react'
import styled from 'styled-components'
import RowItem from './RowItem';
import { useDataLayerValue } from '../DataLayer'

function RowFeaturedPlaylists() {
    const [{ featuredP }] = useDataLayerValue()

    return (
        <Container>
            <TitleContainer>
                <h1>Featured playlists</h1>
                <span>Show all</span>
            </TitleContainer>
            <RowContainer>
                {
                    featuredP?.playlists.items.map((feat) => (
                        <RowItem key={feat.id} thumbnail={feat.images[0]?.url}
                            title={feat.name} sub={feat.description} type={feat.type} />
                    ))
                }
            </RowContainer>
        </Container>
    )
}

export default RowFeaturedPlaylists

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