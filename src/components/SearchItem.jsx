import React from 'react'
import styled from 'styled-components'

function RowItem({ title, thumbnail }) {

	return (
		<Container>
			<Content >
				<span>{title}</span>
				<img src={thumbnail} alt='' />
			</Content>
		</Container>
	)
}

export default RowItem

const Container = styled.div`
    display: flex;
    border-radius: 5px; 
    background-color: #27856A;
    cursor: pointer;

	height: 200px;
	width: 200px;
`

const Content = styled.div`
    display: flex;
    flex-flow: column nowrap;
	position: relative;
	width: 100%;
	overflow: hidden;

    span{
    	margin: 12px 0 0 15px;
		font-size: 22px;
        font-weight: 600;
        letter-spacing: 0.5px;
		white-space: wrap;
    }
    img{
		position: absolute;
		margin-top: 110px;
		margin-left: 115px;
		height: 100px;
		width: 100px;
		transform: rotate(25deg);
		z-index: 4;
    }
`