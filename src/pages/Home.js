import React from "react";
import vit_logo from "../images/vit.png";
import fls_logo from "../images/fl_smidth_logo.png";
// import robo from "../images/rubber-video-unscreen.gif";
import polymer from "../images/polymer.png";
import robot from "../images/robot.png";
import blob from "../images/blob.png";
import "../index.css";

const Home = () => {
  return (
    <div className="home-container width-80">
      <div class="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 home-content">
            <h1 className="home-head">Blend Builder Pro</h1>
            <p>
              This is an intelligent system that takes two features (input and
              output) and creates a relationship between them, then reverse
              computes how we can mix input features to get the desired output
              values. This will be extremely beneficial because it will reduce
              the company's trial and error costs by obtaining an estimate
              composition to begin working from rather than starting from
              scratch.
            </p>
            <div class="logo-container">
              <img class="vit-home-logo" alt="vit-logo" src={vit_logo} />
              <img class="fl-home-logo" alt="fl-logo" src={fls_logo} />
            </div>
          </div>

          <div className="col-lg-6 col-md-12 home-img">
            <div className="home-img-container">
              <div className="blob">
                <img src={blob} alt="blob" />
              </div>
              <div className="robot">
                <img src={robot} alt="robot" />
              </div>
              <div className="polymer">
                <img src={polymer} alt="polymer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
