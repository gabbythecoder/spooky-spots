import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TeamIcon } from "./TeamIcon";

const teamMembers = [
  {
    name: "Sam",
    githubUser: "IndieMasco",
    githubUrl: "https://github.com/IndieMasco",
    linkedinUser: "sam-p-j-clark",
    linkedinUrl: "https://www.linkedin.com/in/sam-p-j-clark/",
  },
  {
    name: "Gabby",
    githubUser: "gabbythecoder",
    githubUrl: "https://github.com/gabbythecoder",
    linkedinUser: "gabbyy-frenchh",
    linkedinUrl: "https://www.linkedin.com/in/gabbyy-frenchh/",
  },
  {
    name: "Will",
    githubUser: "Sparkes7",
    githubUrl: "https://github.com/Sparkes7",
    linkedinUser: "will-sparkes",
    linkedinUrl: "https://www.linkedin.com/in/will-sparkes/",
  },
];

export default function Footer() {
  return (
    <footer className="p-4 bg-black text-white">
      <div className="flex flex-col sm:flex-row justify-around items-center flex-wrap max-w-5xl mx-auto gap-6 sm:gap-4">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="flex items-center space-x-3 whitespace-nowrap"
          >
            <p className="font-semibold">{member.name}:</p>
            <TeamIcon
              platform="GitHub"
              Icon={FaGithub}
              user={member.githubUser}
              url={member.githubUrl}
            />
            <TeamIcon
              platform="LinkedIn"
              Icon={FaLinkedin}
              user={member.linkedinUser}
              url={member.linkedinUrl}
            />
          </div>
        ))}
      </div>
    </footer>
  );
}
