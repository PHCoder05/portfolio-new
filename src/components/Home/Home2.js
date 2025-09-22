import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/Pankaj_pass.jpg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I fell in love with programming and I have at least learnt
              something, I think… 🤷‍♂️
              <br />
              <br />I am fluent in classics like
              <i>
                <b className="purple"> OOP, JavaScript, HTML, CSS, and Python. </b>
              </i>
              <br />
              <br />
              My field of Interest's are building new &nbsp;
              <i>
                <b className="purple">Web Technologies and Products </b> and
                also in areas related to{" "}
                <b className="purple">
                DevOps and Cloud Infrastructure.
                </b>
              </i>
              <br />
              <br />
              Whenever possible, I also apply my passion for developing products
              with <b className="purple">Node.js, Next.js, Express.js</b> and
              <i>
                <b className="purple">
                  {" "}
                  Modern JavaScript Libraries and Frameworks
                </b>
              </i>
              &nbsp; like
              <i>
                <b className="purple"> React.js, MongoDB, Firebase</b>
              </i>
              <br />
              <br />
              I also have experience with <b className="purple">DevOps tools</b> like
              <i>
                <b className="purple"> Docker, Kubernetes, Jenkins, Terraform, Ansible, and CI/CD pipelines</b>
              </i>
              &nbsp; for building scalable and maintainable applications.
              <br />
              <br />
              I love to <b className="purple">explore new things</b> - whether it's discovering
              <i>
                <b className="purple"> new technologies, new areas of development, or new cities</b>
              </i>
              &nbsp; around the world. This curiosity drives me to constantly learn and grow in both my personal and professional life! 🌍
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/PHCoder05"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://twitter.com/pankaj_hadole"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/pankaj-hadole-722476232/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/krish_0512_/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
