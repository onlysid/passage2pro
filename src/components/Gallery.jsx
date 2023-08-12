import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import React from 'react';
import { SectionWrapper } from "../hoc";
import { images } from "../assets/images";

function Gallery() {
    // return (
    //     <img src={images[0]} alt="" />
    // )
    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        >
            <Masonry>
                {
                    images.map((image, i) => (
                        <img src={image} alt="" key={i} />
                    ))
                }
            </Masonry>
        </ResponsiveMasonry>
    )
}

export default SectionWrapper(Gallery, "gallery");