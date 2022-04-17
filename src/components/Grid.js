import React from 'react'
import Box from './Box'

// Represents a 10 x 18 grid of grid squares

export default function Grid(props) {

  // generates an array of 18 rows, each containing 10 GridSquares.

    const grid = []
    for (let row = 0; row < 18; row ++) {
        grid.push([])
        for (let col = 0; col < 10; col ++) {
            grid[row].push(<Box key={`${col}${row}`}/>)
        }
    }

  // The components generated in makeGrid are rendered in div.grid-board

    return (
        <div className='gridBoard'>
            {grid}
        </div>
    )
}

const styles = {
    gridBoard:{
        display: grid,
        gridTemplateColumns: 10px 17px,
        gridGap: 0,
        alignSelf: flexStart
    }
    }