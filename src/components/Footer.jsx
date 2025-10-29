import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="p-4 bg-black">
      <div className="flex flex-col sm:flex-row justify-between items-center flex-wrap max-w-5xl mx-auto gap-4 sm:gap-0">
        <div className="flex items-center space-x-3 whitespace-nowrap">
          <p className="font-semibold">Sam:</p>
          <a
            href="https://github.com/IndieMasco"
            className="hover:text-(--hover-colour)"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/sam-p-j-clark/"
            className="hover:text-(--hover-colour)"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
        <div className="flex items-center space-x-3 whitespace-nowrap">
          <p className="font-semibold">Gabby:</p>
          <a
            href="https://github.com/gabbythecoder"
            className="hover:text-(--hover-colour)"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/gabbyy-frenchh/"
            className="hover:text-(--hover-colour)"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
        <div className="flex items-center space-x-3 whitespace-nowrap">
          <p className="font-semibold">Will:</p>
          <a
            href="https://github.com/Sparkes7"
            className="hover:text-(--hover-colour)"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/will-sparkes/"
            className="hover:text-(--hover-colour)"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
