import React from "react";
import personaVideo from "../../assets/videos/persona-video.mp4";

const LandingPage = () => {
  return (
    <div className="flex justify-center items-center h-fit mt-4 rounded-sm text-white overflow-hidden">
      <div className="video-container mb-8 ">
        <video
          loop
          autoPlay
          muted
          style={{ height: "35em", borderRadius: "2px" }}
        >
          <source src={personaVideo} type="video/mp4" />
        </video>
      </div>
      <div className="fixed-footer">Powered by Persona</div>
    </div>
  );
};

export default LandingPage;
