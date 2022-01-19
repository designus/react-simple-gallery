import './App.css'
import { Gallery } from './gallery';
import { GalleryImage } from './types';
import image1 from '../static/sampleImages/kiemas1.jpg';
import image2 from '../static/sampleImages/kiemas2.jpg';
import image3 from '../static/sampleImages/kiemas3.jpg';
import image4 from '../static/sampleImages/kiemas4.jpg';
import image5 from '../static/sampleImages/kiemas5.jpg';
import image6 from '../static/sampleImages/kiemas6.jpg';
import image7 from '../static/sampleImages/kiemas7.jpg';
import image8 from '../static/sampleImages/kiemas8.jpg';
import image9 from '../static/sampleImages/kiemas9.jpg';

function App() {

  const renderGallery1 = () => {
    const images: GalleryImage<string>[] = [image1, image2].map(photo => ({ full: photo, thumb: photo }))
    return (
      <>
        <h1>Custom gallery1</h1>
        <Gallery images={images} />
      </>
    )
  }

  const renderGallery2 = () => {
    interface Custom {
      url: string;
    }

    const images: GalleryImage<Custom>[] = [image1, image2, image3].map(photo => ({ full: { url: photo }, thumb: { url: photo }}))

    return (
      <div className="mt-9 max-w-full">
        <h2>Custom gallery2</h2>
        <Gallery
          images={images}
          className='custom-gallery-layout-1'
          renderThumbImage={image => <img src={image.thumb.url} />}
          renderFullImage={image => <img src={image.full.url} />}
        />
      </div>
    )
  }

  const renderGallery3 = () => {

    const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image1, image2, image3].map(photo => ({ full: photo, thumb: photo }))

    return (
      <div className="mt-9 max-w-full">
        <h2>Custom gallery 3</h2>
        <Gallery
          images={images}
          className='custom-gallery-layout-2'
          renderThumbImage={image => <img src={image.thumb} />}
          renderFullImage={image => <img src={image.full} />}
        />
      </div>
    )
  }

  return (
    <div className="bg-amber-50 p-20">
      {renderGallery1()}
      {renderGallery2()}
      {renderGallery3()}
    </div>
  )
}

export default App
