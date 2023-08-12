import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import React from 'react';
import { SectionWrapper } from "../hoc";

const images = [
    './src/assets/images/Img00001.jpg',
    './src/assets/images/Img00002.jpg',
    './src/assets/images/Img00003.jpg',
    './src/assets/images/Img00004.jpg',
    './src/assets/images/Img00005.jpg',
    './src/assets/images/Img00006.jpg',
    './src/assets/images/Img00008.jpg',
    './src/assets/images/Img00009.jpg',
    './src/assets/images/Img00010.jpg',
    './src/assets/images/Img00011.jpg',
    './src/assets/images/Img00012.jpg',
    './src/assets/images/Img00013.jpg',
    './src/assets/images/Img00014.jpg',
    './src/assets/images/Img00015.jpg',
    './src/assets/images/Img00016.jpg',
    './src/assets/images/Img00017.jpg',
    './src/assets/images/Img00018.jpg',
    './src/assets/images/Img00019.jpg',
    './src/assets/images/Img00020.jpg',
    './src/assets/images/Img00021.jpg',
    './src/assets/images/Img00022.jpg',
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