export default function Footer() {
  return (
    <footer className="p-4 bg-black text-gray-400">
      <div className="flex justify-center items-center flex-wrap space-x-8">
        <div className="flex items-center space-x-3 whitespace-nowrap">
          <p className="font-semibold text-white">Sam:</p>
          <a
            href="https://github.com/IndieMasco"
            className="hover:text-red-400 text-white"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sam-p-j-clark/"
            className="hover:text-red-400 text-white"
          >
            Linkedin
          </a>
        </div>
        <div className="flex items-center space-x-3 whitespace-nowrap">
          <p className="font-semibold text-white">Gabby:</p>
          <a
            href="https://github.com/gabbythecoder"
            className="hover:text-red-400 text-white"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/gabbyy-frenchh/"
            className="hover:text-red-400 text-white"
          >
            Linkedin
          </a>
        </div>
        <div className="flex items-center space-x-3 whitespace-nowrap">
          <p className="font-semibold text-white">Will:</p>
          <a
            href="https://github.com/Sparkes7"
            className="hover:text-red-400 text-white"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/will-sparkes/"
            className="hover:text-red-400 text-white"
          >
            Linkedin
          </a>
        </div>
      </div>
    </footer>
  );
}
