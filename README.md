# react-simple-gallery
Simple image gallery for React applications

## Features

* Zero dependencies
* Written in TypeScript
* Size: ~21KB and ~6KB Gzipped
* Configurable layout (using CSS)
* Does not support IE11

React simple gallery exports 2 bundles - one for react and one for preact. However preact support is limited - it only works when it gets bundled with Webpack 5 (preact-cli@3.3.5 is still using webpack 4). As a result, preact version of the library has only been tested with gatsby-plugin-preact in latest version of Gatsby build environment.  

## ⚡️ Quick Start

This package can be installed with npm

```
npm install @designus/react-simple-gallery
```
or yarn:
```
yarn add @designus/react-simple-gallery
```

## Examples

### Simple example

```tsx
import { Gallery, GalleryImage } from '@designus/react-simple-gallery';
import image1 from './assets/1.jpg';
import image2 from './assets/2.jpg';
import image3 from './assets/3.jpg';

function SimpleGallery() {
  const images: GalleryImage[] = [image1, image2, image3].map((photo, index) => ({
    full: photo,
    thumb: photo,
    title: `Photo ${index}`
  }))

  return (
    <Gallery images={images} />
  );
}
```

### Gatsby Image support

```tsx
// ...

function SimpleGallery() {
  return (
    <Gallery 
      images={images}
      renderThumbImage={image => (
        <GatsbyImage
          image={image.thumb}
          alt={image.alt}
        />
      )}
      renderFullImage={image => (
        <div className="w-full">
          <GatsbyImage
            image={image.full}
            alt={image.alt}
            title={image.title}
            objectFit="cover"
          />
        </div>
      )}
    />
  );
}
```
## Configuration

React simple gallery supports the following props:

| Prop              | Type                                        | Default value                                            | Description                                                                   |
| ----------------- | ------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------- |
| images            | ```GalleryImage[]```                        | ```[]```                                                 | An array of images to be displayed                                            |
| className         | ```string```                                | ```''```                                                 | Custom class name that can be used to change the layout                       |
| transition        | ```'none \| fade \| slide'```               | ```none```                                               | A transition used when navigating from one image to the next in a lightbox    |
| renderThumbImage  | ```(image: GalleryImage) => JSX.Element```  | ```(image: GalleryImage) => <img src={image.thumb} />``` | A custom renderer for a thumb image                                           | 
| renderFullImage   | ```(image: GalleryImage) => JSX.Element```  | ```(image: GalleryImage) => <img src={image.full} />```  | A custom renderer for a full image                                            | 
 

