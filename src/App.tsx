import './App.css'
import { Gallery, GalleryImage } from './gallery';
import image1 from '../static/sampleImages/kiemas1.jpg';
import image2 from '../static/sampleImages/kiemas2.jpg'

function App() {

  const renderGallery1 = () => {
    const images: GalleryImage<string>[] = [image1, image2].map(photo => ({ full: photo, thumb: photo }))
    return (
      <>
        <h1>Simple images</h1>
        <Gallery
          images={images}
          renderThumbImage={image => <img src={image.thumb} />}
          renderFullImage={image => <div className="max-w-screen-2xl"><img src={image.full} /></div>}
        />
      </>
    )
  }

  return (
    <div className="bg-amber-50 p-20">
      {renderGallery1()}
    </div>
  )
}

export default App
