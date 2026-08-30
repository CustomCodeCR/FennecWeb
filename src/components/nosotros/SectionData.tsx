interface SectionDataProps {
  title: string;
  description: string;
  values: string[];
}

function SectionData({ title, description, values }: SectionDataProps) {
  return (
    <div className="about-container">
      {/* Video */}
      <div className="about-video-container">
        <video className="about-video" autoPlay loop muted playsInline>
          <source src="/video2.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>

        <div className="about-video-overlay" />

        <div className="about-video-label">
          <span>+48</span>
          <p>Años de experiencia</p>
        </div>
      </div>

      {/* Información */}
      <div className="about-content">
        <span className="about-eyebrow">CONÓCENOS</span>

        <div className="about-info-grid">
          <div className="about-description">
            <h2>{title}</h2>

            <div className="about-line" />

            <p>{description}</p>
          </div>

          <div className="about-values">
            <span className="about-values-label">LO QUE NOS DEFINE</span>

            <h3>Nuestros valores</h3>

            <div className="about-values-grid">
              {values.map((value, index) => (
                <div className="about-value" key={value}>
                  <span className="about-value-number">0{index + 1}</span>

                  <span className="about-value-name">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionData;

