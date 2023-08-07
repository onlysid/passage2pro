import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Football = ({ }) => {
    const footie = useGLTF("./football/scene.gltf");

    return (
        <mesh>
            <ambientLight intensity={1} />
            <primitive
                object={footie.scene}
            />
        </mesh>
    );
};

const FootballCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Add a listener for changes to the screen size
        const mediaQuery = window.matchMedia("(max-width: 500px)");

        // Set the initial value of the `isMobile` state variable
        setIsMobile(mediaQuery.matches);

        // Define a callback function to handle changes to the media query
        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches);
        };

        // Add the callback function as a listener for changes to the media query
        mediaQuery.addEventListener("change", handleMediaQueryChange);

        // Remove the listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);

    return (
        <Canvas camera={{ position: [0, 0, 38] }}>
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <directionalLight position={[-10, -10, -5]} intensity={1} />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
            <Suspense fallback={<CanvasLoader />}>
                <Football isMobile={isMobile} />
            </Suspense>
        </Canvas>
    );
};

export default FootballCanvas;