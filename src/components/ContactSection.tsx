
import {
  LuMapPin,
  LuPhone,
  LuMail,
  LuLinkedin,
  LuGithub,
  LuFileText,
  LuCalendar,
  LuSend,
  LuCheck,
  LuX
} from 'react-icons/lu';

// Icon mapping for consistent styling and semantic meaning
const ContactIcons = {
  location: LuMapPin,
  phone: LuPhone,
  email: LuMail,
  linkedin: LuLinkedin,
  github: LuGithub,
  resume: LuFileText,
  calendar: LuCalendar,
  send: LuSend,
  success: LuCheck,
  error: LuX,
} as const;

function ContactSection() {

  const contactInfo = {
    email: "kevin.henderson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Antonio, TX",
    availability: "Available for full-time opportunities"
  };

  const professionalLinks = [
    {
      href: "mailto:kevin.henderson@example.com",
      icon: "email",
      label: "Email",
      description: "Send me a message",
      primary: true
    },
    {
      href: "https://linkedin.com/in/kevinhenderson",
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
      href: "/resume.pdf",
      icon: "resume",
      label: "Resume",
      description: "Download PDF",
      primary: false
    },
    {
      href: "https://calendly.com/kevinhenderson",
      icon: "calendar",
      label: "Schedule Call",
      description: "Book a meeting",
      primary: false
    }
  ] as const;

  return (
    <section className="contact-section page-section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <header className="contact-header">
          <h2 id="contact-heading" className="typography-h1">
            Let's Connect
          </h2>
          <p className="section-intro typography-body-large">
            Ready to discuss opportunities and collaborate on exciting projects
          </p>
        </header>

        <div className="contact-content">
          {/* Contact Information Card */}
          <div className="contact-info-card glass-card" role="region" aria-labelledby="contact-info-heading">
            <div className="card-3d-inner">
              <div className="card-3d-front">
                <header className="card-header">
                  <h3 id="contact-info-heading" className="typography-h3">
                    Get In Touch
                  </h3>
                  <p className="availability typography-body" role="status" aria-live="polite">
                    {contactInfo.availability}
                  </p>
                </header>

                <div className="contact-details">
                  <div className="contact-detail-item">
                    <ContactIcons.location className="contact-icon" aria-hidden="true" />
                    <div className="contact-detail-content">
                      <span className="contact-label typography-label-large">Location</span>
                      <span className="contact-value typography-body">{contactInfo.location}</span>
                    </div>
                  </div>

                  <div className="contact-detail-item">
                    <ContactIcons.phone className="contact-icon" aria-hidden="true" />
                    <div className="contact-detail-content">
                      <span className="contact-label typography-label-large">Phone</span>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="contact-value contact-link typography-body"
                        aria-label={`Call ${contactInfo.phone}`}
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="contact-detail-item">
                    <ContactIcons.email className="contact-icon" aria-hidden="true" />
                    <div className="contact-detail-content">
                      <span className="contact-label typography-label-large">Email</span>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="contact-value contact-link typography-body"
                        aria-label={`Send email to ${contactInfo.email}`}
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Professional Links */}
                <div className="professional-links">
                  <h4 className="links-heading typography-h4">Connect With Me</h4>

                  <div className="links-grid">
                    {professionalLinks.map((link, index) => {
                      const IconComponent = ContactIcons[link.icon as keyof typeof ContactIcons];
                      return (
                        <a
                          key={index}
                          href={link.href}
                          className={`professional-link ${link.primary ? 'primary' : 'secondary'}`}
                          target={link.href.startsWith('http') ? '_blank' : '_self'}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                          aria-label={`${link.label} - ${link.description}${link.href.startsWith('http') ? ' (opens in new tab)' : ''}`}
                        >
                          <IconComponent className="link-icon" aria-hidden="true" />
                          <div className="link-content">
                            <span className="link-label typography-label-large">{link.label}</span>
                            <span className="link-description typography-caption">{link.description}</span>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Glass Effect Overlay */}
                <div className="glass-overlay"></div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

