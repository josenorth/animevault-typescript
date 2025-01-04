export function Video() {
    return (
      <video width="1920" height="1080" controls={false} muted={true} autoPlay>
        <source src="/path/to/video.mp4" type="video/mp4" />
        <track
          src="/videos/momo-dandadan.mp4"
          srcLang="en"
        />
      </video>
    )
  }