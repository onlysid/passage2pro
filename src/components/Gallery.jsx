import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import React from 'react';
import { SectionWrapper } from "../hoc";

const images = [
    '/assets/images/Img00001.jpg',
    '/assets/images/Img00002.jpg',
    '/assets/images/Img00003.jpg',
    '/assets/images/Img00004.jpg',
    '/assets/images/Img00005.jpg',
    '/assets/images/Img00006.jpg',
    '/assets/images/Img00008.jpg',
    '/assets/images/Img00009.jpg',
    '/assets/images/Img00010.jpg',
    '/assets/images/Img00011.jpg',
    '/assets/images/Img00012.jpg',
    '/assets/images/Img00013.jpg',
    '/assets/images/Img00014.jpg',
    '/assets/images/Img00015.jpg',
    '/assets/images/Img00016.jpg',
    '/assets/images/Img00017.jpg',
    '/assets/images/Img00018.jpg',
    '/assets/images/Img00019.jpg',
    '/assets/images/Img00020.jpg',
    '/assets/images/Img00021.jpg',
    '/assets/images/Img00022.jpg',
];

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