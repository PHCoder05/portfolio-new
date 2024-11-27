import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import maryway from "../../Assets/Projects/maryway.jpg";
import emotion from "../../Assets/Projects/emotion.png";
import blog from "../../Assets/Projects/blog.png";
import capriole from "../../Assets/Projects/capriole.png";
import sbspune from "../../Assets/Projects/sbspune.png";
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

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={blog}
              isBlog={false}
              title="BlogSpot"
              description="Welcome to my blog, where I share insights, tips, and updates on web development, coding, and technology. Whether you're a beginner or an experienced developer, you'll find content designed to inspire, educate, and keep you updated on the latest trends and best practices in the tech world."
              ghLink="https://github.com/PHCoder05/BlogSpot"
              demoLink="https://blog-phcoder05.vercel.app/"              
            />
          </Col> 
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
                  <Col md={4} className="project-card">
            <ProjectCard
              imgPath={sbspune}
              isBlog={false}
              title="sbspune"
              description="Sky Blue Stationery, founded in 2011, provides high-quality office supplies, stationery, housekeeping materials, and computer consumables. We cater to the needs of businesses, educators, and home offices, ensuring every workspace is efficient, organized, and inspiring. "
              ghLink="https://github.com/PHCoder05/sbspune"
              demoLink="https://www.sbspune.com/"
            />
          </Col> 
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
