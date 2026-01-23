
import { useRef, useEffect } from 'react';
import {
  LuMapPin,
  LuPhone,
  LuMail,
  LuLinkedin,
  LuGithub,

  LuCalendar,
  LuSend,
  LuCheck,
  LuX,
  LuMessageCircle
} from 'react-icons/lu';
import { animations, killScrollTriggersFor, killTweensFor } from '../utils/animations';

// Icon mapping for consistent styling and semantic meaning
const ContactIcons = {
  location: LuMapPin,
  phone: LuPhone,
  email: LuMail,
  linkedin: LuLinkedin,
  github: LuGithub,

  calendar: LuCalendar,
  send: LuSend,
  success: LuCheck,
  error: LuX,
} as const;

function ContactSection() {
  // Animation refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contactCardRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const contactInfo = {
    email: "primary-email@kevinhenderson.dev",
    phone: "+1 (555) 123-4567",
    location: "San Antonio, TX",
    availability: "Available for full-time opportunities"
  };

  const professionalLinks = [
    {
      href: "mailto:primary-email@kevinhenderson.dev",
      icon: "email",
      label: "Email",
      description: "Send me a message",
      primary: true
    },
    {
      href: "https://www.linkedin.com/in/kevin-h-cs/",
      icon: "linkedin",
      label: "LinkedIn",
      description: "Professional network",
      primary: true
    },
    {
      href: "https://github.com/khenderson20",
      icon: "github",
      label: "GitHub",
      description: "View my code",
      primary: true
    },
    {
      href: "https://calendly.com/primary-email-kevinhenderson/one-on-one",
      icon: "calendar",
      label: "Schedule a Meeting",
      description: "Book a meeting",
      primary: false
    }
  ] as const;

  // Animation setup
  useEffect(() => {
    // Capture ref values for cleanup to avoid stale `.current` warnings
    const sectionEl = sectionRef.current;
    const headerEl = headerRef.current;
    const contactCardEl = contactCardRef.current;
    const linkEls = linksRef.current?.children ? Array.from(linksRef.current.children) : [];

    // Optimized delay to ensure DOM elements are fully rendered after lazy loading
    const timer = setTimeout(() => {
      // Section entrance animation - using ScrollTrigger for smooth entrance
      animations.fadeIn(sectionRef.current, {
        duration: 1.2,
        y: 20, // Reduced from 40 to prevent overflow
        scrollTrigger: true,
      });

      // Header animation - with scroll trigger for better visual impact
      animations.fadeIn(headerRef.current, {
        duration: 1,
        delay: 0.2,
        y: 30,
        scrollTrigger: true,
      });

      // Contact card animation - with scroll trigger for better UX
      animations.scaleIn(contactCardRef.current, {
        duration: 0.8,
        delay: 0.3,
        scale: 0.9,
        scrollTrigger: true,
      });

      // Staggered links animation - with scroll trigger for better UX
      if (linksRef.current?.children) {
        animations.staggerFadeIn(linksRef.current.children, {
          duration: 0.6,
          stagger: 0.1,
          delay: 0.4,
          y: 20,
          scrollTrigger: true,
        });
      }
    }, 150); // Optimized delay for DOM readiness

    return () => {
      clearTimeout(timer);
      // Targeted cleanup for this section only
      killScrollTriggersFor([
        sectionEl,
        headerEl,
        contactCardEl,
        linkEls,
      ]);
      killTweensFor([
        sectionEl,
        headerEl,
        contactCardEl,
        linkEls,
      ]);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-6 px-8"
      aria-labelledby="contact-heading"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute -inset-x-16 -top-16 -bottom-0 md:-inset-x-24 md:-top-24 md:-bottom-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-3/4 right-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      <div className="container-responsive relative z-10 section-content-container mb-0">
        <header ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <LuMessageCircle className="w-5 h-5 text-indigo-300" />
            <span className="text-indigo-200 font-medium">Contact</span>
          </div>

          <h2 id="contact-heading" className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            <span className="gradient-text">Let's Connect</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Ready to discuss opportunities and collaborate on exciting projects
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information Card */}
          <div
            ref={contactCardRef}
            className="glass-effect rounded-2xl p-8 md:p-12"
            role="region"
            aria-labelledby="contact-info-heading"
          >
            <header className="mb-8">
              <h3 id="contact-info-heading" className="text-2xl md:text-3xl font-bold text-white mb-4">
                Get In Touch
              </h3>
              <p className="text-lg text-indigo-200 font-medium" role="status" aria-live="polite">
                {contactInfo.availability}
              </p>
            </header>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <ContactIcons.location className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-sm text-gray-400 uppercase tracking-wide">Location</span>
                  <span className="text-lg text-white font-medium">{contactInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Professional Links */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Connect With Me</h4>
              <div ref={linksRef} className="grid grid-cols-2 gap-4">
                {professionalLinks.map((link, index) => {
                  const IconComponent = ContactIcons[link.icon as keyof typeof ContactIcons];
                  return (
                    <a
                      key={index}
                      href={link.href}
                      className={`group flex items-center gap-3 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                        link.primary
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/25'
                          : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white'
                      }`}
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                      aria-label={`${link.label} - ${link.description}${link.href.startsWith('http') ? ' (opens in new tab)' : ''}`}
                    >
                      <IconComponent className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{link.label}</div>
                        <div className="text-sm opacity-75 truncate">{link.description}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Additional Contact Methods */}
          <div className="glass-effect rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Other Ways to Connect
            </h3>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <ContactIcons.email className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="block text-sm text-gray-400 uppercase tracking-wide">Email</span>
                  <a href={`mailto:${contactInfo.email}`} className="text-lg text-white font-medium hover:text-purple-300 transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
              </div>


              <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
                <p className="text-gray-300 leading-relaxed">
                  I'm always excited to discuss new opportunities, collaborate on interesting projects,
                  or simply connect with fellow developers and creators. Feel free to reach out!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;

