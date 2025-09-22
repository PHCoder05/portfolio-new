import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Pankaj Hadole </span>
            from <span className="purple"> Amravati, India.</span>
            <br />
            I am currently a Student at{" "} <a 
            href ="https://jspmrscoe.edu.in/"
            target ="_blank"
            rel ="noopener noreferrer"
            className="purple">
              JSPM's Rajarshi Shahu College of Engineering, Pune
            </a>
            <br />
            I Have Successfully completed my diploma at{" "}
            <a
              href="https://www.gpamravati.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="purple"
            >
              Government Polytechnic Amravati
            </a>{" "}
            in Information Technology.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Writing Technical Blogs
            </li>
            <li className="about-activity">
              <ImPointRight /> Exploring New Technologies
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling & Meeting New People
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference and always keep learning!"{" "}
          </p>
          <footer className="blockquote-footer">Pankaj Hadole</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
