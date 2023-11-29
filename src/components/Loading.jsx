import "./css/loading.css"
import React from 'react'
import ReactLoading from "react-loading";

function Loading() {
    return (
        <div className='loading'>
            <ReactLoading type="spin" width={"150px"} height={"150px"} />
        </div>
    )
}

export default Loading