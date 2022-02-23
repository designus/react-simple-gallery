
import { Gallery } from './components/gallery';
import { GalleryImage } from './components/types';
import image1 from './assets/1.jpg';
import image2 from './assets/2.jpg';
import image3 from './assets/3.jpg';
import image4 from './assets/4.jpg';
import image5 from './assets/5.jpg';
import image6 from './assets/6.jpg';

function App() {
  const renderGallery1 = () => {
    const images: GalleryImage<string>[] = [image1, image2, image3, image4, image5, image6].map((photo, index) => ({
      full: photo,
      thumb: photo,
      title: index % 2 ? `Photo title no ${index}` : undefined
    }))
    return (
      <div className="sg-max-w-lg">
        <h1>Custom gallery</h1>
        <Gallery
          images={images}
          transition="slide"
        />
      </div>
    )
  }

  return (
    <div className="test">
      {renderGallery1()}
    </div>
  )
}

export default App
