import React,{useState} from 'react'

function Cunter() {
    const [count, setCunt]=useState(0);

    function increment(){
        setCunt(count+1);
    }
    function dicrement(){
        setCunt(count-1);
    }

    return (
        <div>
            <h3>{count}</h3>
            <button onClick = {increment}>increment</button>
            <button onClick = {dicrement}>dicrement</button>
        </div>
    )
}

export default Cunter
