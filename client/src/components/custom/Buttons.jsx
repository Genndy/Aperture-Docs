import React, { useState } from "react";
import '../style.css'
import IcFiles from '../../assets/img/ic-files.svg'

var image = IcFiles

const IconButton = (props) => {
    const [
        hover,
        setHover
    ] = useState(false);

    const toggleHover = () => {
        setHover(!hover);
        console.log("Hover!")
    };

    image = props.image

    return (
        <div className="image_button_container" onMouseEnter={toggleHover}
        onMouseOut={toggleHover}
        {...props}>
            <img src={image} alt="" className="image_button"/>
        </div>
    );
}    

function onIconButtonHover(props){
    image = {IcFiles}
}

export default IconButton;