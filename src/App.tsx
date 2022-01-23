
import { Gallery } from './components/gallery';
import { GalleryImage } from './components/types';

function App() {
  const renderGallery1 = () => {
    const images: GalleryImage<string>[] = ['./1.jpg', './2.jpg', './3.jpg', './4.jpg', './5.jpg', './6.jpg'].map(photo => ({ full: photo, thumb: photo, title: 'Testing' }))
    return (
      <>
        <h1>Custom gallery</h1>
        <Gallery
          images={images}
          renderFullImage={image => <img src={image.full} />}
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
