function ContactSection() {
  const contactInfo = {
    email: "your.email@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    availability: "Available for full-time opportunities"
  };

  const professionalLinks = [
    { href: "mailto:your.email@example.com", icon: "📧", label: "Email", primary: true },
    { href: "https://linkedin.com/in/yourusername", icon: "💼", label: "LinkedIn", primary: true },
    { href: "https://github.com/yourusername", icon: "🔗", label: "GitHub", primary: true },
    { href: "/resume.pdf", icon: "📄", label: "Resume", primary: true },
    { href: "https://calendly.com/yourusername", icon: "📅", label: "Schedule Call", primary: false }
  ];

  return (
    <section className="contact-section" aria-labelledby="contact-heading">
      <header>
        <h2 id="contact-heading">Let's Connect</h2>
        <p className="section-intro">
          Ready to discuss opportunities and collaborate on exciting projects
        </p>
      </header>
      
      <div className="contact-content">
        <div className="contact-info" role="region" aria-labelledby="availability-heading">
          <h3 id="availability-heading" className="sr-only">Availability and Contact Information</h3>
          <p className="availability" role="status" aria-live="polite">
            <strong>{contactInfo.availability}</strong>
          </p>
          
          <div className="contact-details" role="list" aria-label="Contact information">
            <p role="listitem">
              <span aria-label="Location">📍</span>
              <span>{contactInfo.location}</span>
            </p>
            <p role="listitem">
              <span aria-label="Phone number">📞</span>
              <a href={`tel:${contactInfo.phone}`} aria-label={`Call ${contactInfo.phone}`}>
                {contactInfo.phone}
              </a>
            </p>
            <p role="listitem">
              <span aria-label="Email address">✉️</span>
              <a href={`mailto:${contactInfo.email}`} aria-label={`Send email to ${contactInfo.email}`}>
                {contactInfo.email}
              </a>
            </p>
          </div>
        </div>

        <div className="contact-links" role="region" aria-labelledby="links-heading">
          <h3 id="links-heading" className="sr-only">Professional Links</h3>
          
          <div className="primary-links" role="group" aria-label="Primary contact methods">
            <h4 className="sr-only">Primary Links</h4>
            {professionalLinks.filter(link => link.primary).map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                className="contact-link primary" 
                target={link.href.startsWith('http') ? '_blank' : '_self'}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                aria-label={`${link.label} - ${link.href.startsWith('http') ? 'opens in new tab' : ''}`}
              >
                <span aria-hidden="true">{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
          
          <div className="secondary-links" role="group" aria-label="Additional contact options">
            <h4 className="sr-only">Additional Options</h4>
            {professionalLinks.filter(link => !link.primary).map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                className="contact-link secondary"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`${link.label} - opens in new tab`}
              >
                <span aria-hidden="true">{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

