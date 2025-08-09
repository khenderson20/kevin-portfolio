
import { SiAwsamplify, SiAmazonwebservices, SiNamecheap } from 'react-icons/si';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="w-full bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 border-t border-white/10"
   >
      <div className="container-responsive">
        <div className="py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            {/* Left: Copyright + Love */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-300">
                © {year} Kevin Henderson
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Built with ❤️
              </p>
            </div>

            {/* Middle: Tech Stack */}
            <div className="flex-1">
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                  Technology Stack
                </span>
                <ul className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <li className="flex items-center gap-2 text-sm text-gray-200">
                    <SiAwsamplify className="w-5 h-5 text-[#FF9900]" aria-hidden="true" />
                    <a href="https://aws.amazon.com/amplify/" target="_blank" rel="noopener noreferrer" className="hover:text-white/90">
                      AWS Amplify
                    </a>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-200">
                    <SiAmazonwebservices className="w-6 h-6 text-[#FF9900]" aria-hidden="true" />
                    <a href="https://aws.amazon.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white/90">
                      Hosted on AWS
                    </a>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-200">
                    <SiNamecheap className="w-5 h-5 text-[#DE3723]" aria-hidden="true" />
                    <a href="https://www.namecheap.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white/90">
                      Domain from Namecheap
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Attribution */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-300">
                Built by <span className="font-semibold gradient-text">Kevin Henderson</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

