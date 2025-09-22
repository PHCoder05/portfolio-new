import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiJavascript1, DiReact, DiNodejs, DiMongodb, DiPython, DiGit, DiJava } from "react-icons/di";
import { SiFirebase, SiNextdotjs, SiDocker, SiKubernetes, SiNginx, SiJenkins, SiTerraform, SiAnsible, SiGithubactions, SiExpress } from "react-icons/si";

function Techstack() {
  return (
    <>
      <h3 className="project-heading" style={{ marginTop: 20 }}>DevOps</h3>
      <Row style={{ justifyContent: "center", paddingBottom: "30px" }}>
        <Col xs={4} md={2} className="tech-icons"><SiDocker /><div style={{ marginTop: 8, fontSize: 12 }}>Docker</div></Col>
        <Col xs={4} md={2} className="tech-icons"><SiKubernetes /><div style={{ marginTop: 8, fontSize: 12 }}>Kubernetes</div></Col>
        <Col xs={4} md={2} className="tech-icons"><SiNginx /><div style={{ marginTop: 8, fontSize: 12 }}>Nginx</div></Col>
        <Col xs={4} md={2} className="tech-icons"><SiJenkins /><div style={{ marginTop: 8, fontSize: 12 }}>Jenkins</div></Col>
        <Col xs={4} md={2} className="tech-icons"><SiTerraform /><div style={{ marginTop: 8, fontSize: 12 }}>Terraform</div></Col>
        <Col xs={4} md={2} className="tech-icons"><SiAnsible /><div style={{ marginTop: 8, fontSize: 12 }}>Ansible</div></Col>
        <Col xs={4} md={2} className="tech-icons"><SiGithubactions /><div style={{ marginTop: 8, fontSize: 12 }}>CI/CD</div></Col>
      </Row>

      <h3 className="project-heading" style={{ marginTop: 10 }}>Development</h3>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col xs={4} md={2} className="tech-icons"><SiNextdotjs /><div style={{ marginTop: 8, fontSize: 12 }}>Next.js</div></Col>
        <Col xs={4} md={2} className="tech-icons"><SiExpress /><div style={{ marginTop: 8, fontSize: 12 }}>Express.js</div></Col>
        <Col xs={4} md={2} className="tech-icons"><DiNodejs /><div style={{ marginTop: 8, fontSize: 12 }}>Node.js</div></Col>
        <Col xs={4} md={2} className="tech-icons"><DiReact /><div style={{ marginTop: 8, fontSize: 12 }}>React</div></Col>
        <Col xs={4} md={2} className="tech-icons"><DiJavascript1 /><div style={{ marginTop: 8, fontSize: 12 }}>JavaScript</div></Col>
        <Col xs={4} md={2} className="tech-icons"><DiMongodb /><div style={{ marginTop: 8, fontSize: 12 }}>MongoDB</div></Col>
        <Col xs={4} md={2} className="tech-icons"><DiGit /><div style={{ marginTop: 8, fontSize: 12 }}>Git</div></Col>
        <Col xs={4} md={2} className="tech-icons"><SiFirebase /><div style={{ marginTop: 8, fontSize: 12 }}>Firebase</div></Col>
        <Col xs={4} md={2} className="tech-icons"><DiPython /><div style={{ marginTop: 8, fontSize: 12 }}>Python</div></Col>
        <Col xs={4} md={2} className="tech-icons"><DiJava /><div style={{ marginTop: 8, fontSize: 12 }}>Java</div></Col>
      </Row>
    </>
  );
}

export default Techstack;
