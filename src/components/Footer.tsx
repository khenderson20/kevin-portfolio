
import { SiNetlify, SiNamecheap, SiGithub, SiLinkedin } from 'react-icons/si';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="w-full bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 border-t border-white/10"
    >
      <div className="container-responsive">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Left: Brand and Copyright */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold gradient-text mb-4">Kevin Henderson</h3>
              <p className="text-sm text-gray-300 mb-2">
                © {year} Kevin Henderson. All rights reserved.
              </p>
              <p className="text-xs text-gray-400">
                Crafted with ❤️ and modern web technologies
              </p>
            </div>

            {/* Middle Left: Navigation Links */}
            <div className="lg:col-span-1">
              <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wide mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#home" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                    About
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Middle Right: Contact and Social */}
            <div className="lg:col-span-1">
              <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wide mb-4">
                Connect With Me
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <SiGithub className="w-4 h-4 text-gray-400" />
                  <a href="https://github.com/khenderson20" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                    GitHub
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <SiLinkedin className="w-4 h-4 text-gray-400" />
                  <a href="https://www.linkedin.com/in/kevin-h-cs/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                    LinkedIn
                  </a>
                </li>

              </ul>
            </div>

            {/* Right: Technology Stack */}
            <div className="lg:col-span-1">
              <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wide mb-4">
                Technology Stack
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <SiNetlify className="w-4 h-4 text-[#00C7B7]" aria-hidden="true" />
                  <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                    Hosted on Netlify
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <SiNamecheap className="w-4 h-4 text-[#DE3723]" aria-hidden="true" />
                  <a href="https://www.namecheap.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                    Domain from Namecheap
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom: Legal and Attribution */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
              <div className="flex flex-wrap items-center gap-4">
                <a href="/privacy" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="/cookies" className="hover:text-white transition-colors duration-200">
                  Cookie Policy
                </a>
              </div>
              <p>
                Designed and built by <span className="font-semibold gradient-text">Kevin Henderson</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

