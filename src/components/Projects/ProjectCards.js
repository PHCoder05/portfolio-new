import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub, BsGit } from "react-icons/bs";
import { GoGitCommit } from "react-icons/go";

function ProjectCards(props) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>
          {props.title}
          {props.status && (
            <Badge bg={props.status === "Working" ? "success" : props.status === "Completed" ? "secondary" : props.status === "Archived" ? "dark" : "info"} style={{ marginLeft: 8 }}>
              {props.status}
            </Badge>
          )}
        </Card.Title>
        {props.date && (
          <div style={{ color: "#9aa0a6", fontSize: 12, marginBottom: 8 }}>
            {new Date(props.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
          </div>
        )}
        {(props.userRecentCommits > 0 || props.userPRs > 0) && (
          <div style={{ color: "#9aa0a6", fontSize: 12, marginBottom: 8 }}>
            {props.userRecentCommits > 0 && (<span>{props.userRecentCommits} commits in last 30 days</span>)}
            {props.userRecentCommits > 0 && props.userPRs > 0 && <span> · </span>}
            {props.userPRs > 0 && (<span>{props.userPRs} PRs</span>)}
          </div>
        )}
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
        {props.ghLink && (
          <Button variant="primary" href={props.ghLink} target="_blank" rel="noopener noreferrer">
            <BsGithub /> &nbsp;
            {props.isBlog ? "Blog" : "GitHub"}
          </Button>
        )}
        {"\n"}
        {"\n"}

        {/* If the component contains Demo link and if it's not a Blog then, it will render the below component  */}

        {!props.isBlog && props.demoLink && (
          <Button
            variant="primary"
            href={props.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: "10px" }}
          >
            <CgWebsite /> &nbsp;
            {"Demo"}
          </Button>
        )}

        {props.commitsLink && (
          <Button
            variant="outline-light"
            href={props.commitsLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: "10px" }}
          >
            <GoGitCommit /> &nbsp; Commits
          </Button>
        )}

        {props.prsLink && (
          <Button
            variant="outline-light"
            href={props.prsLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: "10px" }}
          >
            <BsGit /> &nbsp; PRs
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
