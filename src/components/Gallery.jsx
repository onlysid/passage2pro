import PhotoAlbum from "react-photo-album";
import React from 'react';
import { SectionWrapper } from "../hoc";

const photos = [
    { src: "src/assets/images/img00001.jpg", width: 0, height: 0 },

];

function Gallery() {
    return <PhotoAlbum layout="rows" photos={photos} />;
}

export default SectionWrapper(Gallery, "gallery");