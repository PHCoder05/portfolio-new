import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import maryway from "../../Assets/Projects/maryway.jpg";
import emotion from "../../Assets/Projects/emotion.png";
// import editor from "../../Assets/Projects/codeEditor.png";
import capriole from "../../Assets/Projects/capriole.png";
// import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="My First Website"
              description=" My personal portfolio website, my first project, is now live! Hosted using GitHub Pages, it showcases my skills, projects, and achievements. Check it out to learn more about me and my journey!."
              ghLink="https://github.com/PHCoder05/My-Portfolio"
              demoLink="https://phcoder05.github.io/My-Portfolio/"
            />
          </Col>
{/* 
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Editor.io"
              description="Online code and markdown editor build with react.js. Online Editor which supports html, css, and js code with instant view of website. Online markdown editor for building README file which supports GFM, Custom Html tags with toolbar and instant preview.Both the editor supports auto save of work using Local Storage"
              ghLink="https://github.com/soumyajit4419/Editor.io"
              demoLink="https://editor.soumya-jit.tech/"              
            />
          </Col> */}
<Col md={4} className="project-card">
    <ProjectCard
        imgPath={emotion}
        isBlog={false}
        title="Face Recognition Based Attendance System"
        description="The Facial Recognition Based Attendance System uses advanced technology to quickly and accurately track student attendance. It captures and analyzes facial features, matches them with stored student images, and records attendance automatically. It's user-friendly, secure, and scalable for implementation in educational institutions."
        ghLink="https://github.com/PHCoder05/Face-Recognition-Base-Attedance-System"
        demoLink="YOUR_DEMO_LINK_HERE"
    />
</Col>
<Col md={4} className="project-card">
    <ProjectCard
        imgPath={maryway}
        isBlog={false}
        title="Markyway"
        description=
        "This is a social media marketing website. I started as an intern and was later hired as a Website Administrator. I developed and now maintain the website part-time."
        ghLink="https://github.com/PHCoder05/Markyway"
        demoLink="https://markyway.netlify.app/"
    />
</Col>

  <Col md={4} className="project-card">
            <ProjectCard
              imgPath={capriole}
              isBlog={false}
              title="Capriole Sport Tech"
              description="Capriole is committed to bridging the gap between athletes and the best sports venues. We provide a seamless experience for booking venues and managing sports academies with ease and efficiency. "
              ghLink="https://github.com/PHCoder05/Sport-Tech"
              demoLink="https://www.capriolesportstech.com/"
            />
          </Col> 
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
