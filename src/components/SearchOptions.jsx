import React from 'react'
import styled from 'styled-components'
import SearchItem from './SearchItem'
import { useDataLayerValue } from '../DataLayer';

function SearchOptions() {
    const [{ categories }] = useDataLayerValue();

    return (
        <Container>
            <h2>Browse all</h2>
            <ContentGrid>
                {
                    categories?.categories.items.map((category) => (
                        <SearchItem key={category.id} thumbnail={category.icons[0].url}
                            title={category.name} />
                    ))
                }
            </ContentGrid>
        </Container>
    )
}

export default SearchOptions

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    position: absolute;
    margin-top: 66px;
    padding: 24px;
    width: 100%;

    max-width: 2200px;

    h2{
        margin-bottom: 20px;
        font-size: 23px;
        white-space: nowrap;
    }
`

const ContentGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 200px);
    grid-template-rows: repeat(auto-fit, 200px);
    grid-gap: 12px;
`