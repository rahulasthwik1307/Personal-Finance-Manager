export default function Loader({ fullScreen = false }) {
    return (
      <div className={`${fullScreen ? 'min-h-screen' : 'h-64'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }