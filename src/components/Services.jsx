import React, { useRef, useEffect, useState } from "react";
import { Tilt } from "react-tilt";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";

// VideoPlayer component for video type projects
const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [showOverlay, setShowOverlay] = useState(true);

  // Auto-play muted video when it is in view and not in fullscreen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.fullscreenElement) {
          video.play().catch((err) =>
            console.error("Auto-play error:", err)
          );
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  // Listen for fullscreen changes:
  // When the video exits fullscreen, show the overlay and mute the video.
  useEffect(() => {
    const handleFullScreenChange = () => {
      const fullscreenElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;

      if (!fullscreenElement) {
        // Exited fullscreen: show overlay and mute the video.
        setShowOverlay(true);
        if (videoRef.current) {
          videoRef.current.muted = true;
        }
      } else {
        // In fullscreen: hide overlay.
        setShowOverlay(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener(
      "webkitfullscreenchange",
      handleFullScreenChange
    );
    document.addEventListener("msfullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullScreenChange
      );
    };
  }, []);

  // When the overlay is clicked:
  // - Hide the overlay
  // - Unmute and play the video
  // - Request fullscreen
  const handlePlayClick = () => {
    setShowOverlay(false);
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.play().catch((err) => console.error("Play error:", err));
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className="w-full h-full object-cover object-center rounded-2xl"
      />
      {showOverlay && (
        <div
          className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 cursor-pointer"
          onClick={handlePlayClick}
        >
          <button className="text-white text-4xl">▶</button>
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ index, name, description, image, extra, type }) => {
  return (
    <div id={"project-" + index} className="grow basis-[500px]">
      <Tilt
        options={{
          max: 20,
          scale: 1,
          speed: 450,
        }}
        className={`bg-primary shadow-2xl p-5 rounded-2xl h-full w-full border-solid border-8 ${
          index === 0 ? "border-logo shadow-logo/70" : "shadow-white/50"
        }`}
      >
        <div className="relative w-full h-[300px]">
          {type === "video" ? (
            <VideoPlayer src={image} />
          ) : (
            <img
              src={image}
              alt="project_image"
              className="w-full h-full object-cover object-center rounded-2xl"
            />
          )}
        </div>

        <div className="mt-5">
          <h3
            className={`${
              index === 0 ? "text-logo" : "text-white"
            } font-bold text-[28px] mb-3`}
          >
            {name}
          </h3>
          <hr />
          <div className="mt-3 text-secondary text-[16px]">
            {description.map((item, idx) => (
              <p className="mb-3" key={`${item}-${idx}`}>
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="my-4 flex flex-wrap gap-2">
          {extra.map((tag, idx) => (
            <h3 key={`${tag}-${idx}`} className="text-[18px] font-bold">
              {tag}
            </h3>
          ))}
        </div>
        <hr />
      </Tilt>
    </div>
  );
};

const Services = () => {
  return (
    <>
      <div>
        <p className={`${styles.sectionSubText}`}>Pricing</p>
        <h2 className={`${styles.sectionHeadText}`}>Services.</h2>
      </div>

      <hr />
      <div>
        <p className={`${styles.sectionSubText} my-8 text-center`}>
          * All courses run for 6 weeks
        </p>
      </div>

      <div className="my-10 flex flex-wrap items-stretch gap-7 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      <hr />
    </>
  );
};

export default SectionWrapper(Services, "services");
