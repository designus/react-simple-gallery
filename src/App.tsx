
import { Gallery } from './components/gallery';

function App() {
  const renderGallery1 = () => {
    const images = ['./1.jpg', './2.jpg', './3.jpg', './4.jpg', './5.jpg', './6.jpg'].map(photo => ({ full: photo, thumb: photo }))
    return (
      <>
        <h1>Custom gallery</h1>
        <Gallery
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
