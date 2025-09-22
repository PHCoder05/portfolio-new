import React from "react";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import { FaGithub, FaLinkedin, FaCode, FaTerminal } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <section className="home-section">
      <Particle />
      <div className="home-content">
        <div className="home-header">
          <div className="code-block">
            <span className="code-comment">{"// Welcome to my portfolio"}</span>
            <br />
            <span className="code-keyword">const</span> developer = {"{"}
            <br />
            &nbsp;&nbsp;name: <span className="code-string">"Pankaj Hadole"</span>,
            <br />
            &nbsp;&nbsp;title: <Type />
            <br />
            {"}"};
          </div>
          <h1 className="heading-name">
            <FaTerminal className="icon-terminal" /> 
            <span className="highlight">Hello, World!  &nbsp; </span> <span className="name-highlight">I'm Pankaj Hadole</span>
          </h1>
          <p className="home-about-body">
            I'm passionate about crafting clean, efficient code and building innovative solutions.
          </p>
          <div className="social-links">
            <a href="https://github.com/PHCoder05" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/pankaj-hadole-722476232" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://codepen.io/Pankaj_0512" target="_blank" rel="noopener noreferrer" className="icon-link">
              <FaCode />
            </a>
          </div>
          <div className="cta-buttons">
            <Link to="/project" className="btn btn-primary">View Projects</Link>
            <a href="mailto:pankajhadole24@gmail.com" className="btn btn-outline-primary">Contact Me</a>
            <a href="https://github.com/PHCoder05" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary" aria-label="GitHub Profile">GitHub</a>
            <a href="https://www.linkedin.com/in/pankaj-hadole-722476232" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary" aria-label="LinkedIn Profile">LinkedIn</a>

          </div>
        </div>
      </div>
      <Home2 />
    </section>
  );
}

export default Home;
