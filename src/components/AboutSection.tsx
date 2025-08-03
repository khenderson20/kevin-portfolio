function AboutSection() {
  const skills = [
    "React", "TypeScript", "AWS", "Music Production", 
    "Audio Programming", "Creative Coding"
  ];

  return (
    <section className="about-section">
      <h2>About Me</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            I'm a creative developer and musician who bridges the gap between 
            technology and artistic expression. With a passion for both code 
            and sound, I create digital experiences that resonate.
          </p>
          <p>
            My work spans from interactive web applications to experimental 
            music production, always seeking new ways to merge creativity 
            with technical innovation.
          </p>
        </div>
        <div className="skills">
          <h3>Skills</h3>
          <div className="skill-tags">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;