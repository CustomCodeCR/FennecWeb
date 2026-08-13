interface SectionDataProps {
  imageSrc: string
  titles: string[]
  contents: string[]
  imageFirst: boolean
}

function SectionData({
  titles,
  contents,
  imageFirst,
}: SectionDataProps) {
  return (
    <div
      className={`about-container ${
        imageFirst ? '' : 'lg:flex-row-reverse'
      }`}
    >
      {/* Video */}
      <div className="about-video-container">
        <video
          className="about-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video2.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>

        <div className="about-video-overlay" />

        <div className="about-video-label">
          <span>+37</span>
          <p>Años de experiencia</p>
        </div>
      </div>

      {/* Información */}
      <div className="about-content">
        <span className="about-eyebrow">
          CONÓCENOS
        </span>

        {titles.map((title, index) => (
          <div
            key={title}
            className="about-block"
          >
            <h2>{title}</h2>

            <div className="about-line" />

            <p>{contents[index]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionData