
import { Gallery } from './components/gallery';

function App() {
  const renderGallery1 = () => {
    const images = ['/image1.jpg', '/image2.jpg', './image3.jpg', './image4.jpg'].map(photo => ({ full: photo, thumb: photo }))
    return (
      <>
        <h1>Custom gallery</h1>
        <Gallery
          animation="fade" 
          images={images}
        />
      </>
    )
  }

  return (
    <div className="test">
      {renderGallery1()}
    </div>
  )
}

export default App
