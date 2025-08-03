function ContactSection() {
  const contactLinks = [
    { href: "mailto:your.email@example.com", icon: "📧", label: "Email" },
    { href: "https://github.com/yourusername", icon: "🔗", label: "GitHub" },
    { href: "https://soundcloud.com/yourusername", icon: "🎵", label: "SoundCloud" },
    { href: "https://linkedin.com/in/yourusername", icon: "💼", label: "LinkedIn" }
  ];

  return (
    <section className="contact-section">
      <h2>Get In Touch</h2>
      <div className="contact-content">
        <p>Let's collaborate on something amazing</p>
        <div className="contact-links">
          {contactLinks.map((link, index) => (
            <a key={index} href={link.href} className="contact-link">
              {link.icon} {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactSection;