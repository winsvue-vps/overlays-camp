// import BackgroundAnimated from '../assets/background-animated.mp4'

export default function LiveBaseScreen() {
  return (
    <div className="overflow-hidden w-full h-screen fixed top-0 left-0 pointer-events-none z-0">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-auto h-auto min-w-full min-h-full object-cover"
      >
        <source src="https://wins.company/assets/Media/bg.mp4" type="video/mp4" />
      </video>
    </div>
  )
}