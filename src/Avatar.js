import React from "react";
function Avatar({image, attributes}){

    const attributesName = Object.keys(attributes);

    const imageJsx = 
    <img 
    src={image} 
    width={attributes.width} 
    height={attributes.height}
    alt={attributes.alt}
    style={attributes.style}
    title={attributes.title}
    />

    return (
        imageJsx
    );
}

export default Avatar;