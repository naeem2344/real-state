import React from 'react'
import { CircularProgress } from '@mui/material';

const Loader = () => {
    return (
        <div className='loader__container'><CircularProgress size={50} /></div>
    )
}

export default Loader