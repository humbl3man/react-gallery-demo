import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';

const GalleryContainer = styled.div`
  max-width: 65em;
  margin: 1rem auto;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const GalleryItem = styled.div`
  margin-right: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.055);
  overflow: hidden;
  transition: 200ms linear;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }

  &:hover {
    box-shadow: 0 20px 20px rgba(0, 0, 0, 0.1);
  }

  img {
    display: block;
    vertical-align: middle;
    transition: 300ms ease-in-out;
  }

  &:hover img {
    transform: scale(1.2);
  }
`;

const StyledGalleryModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;

  .backdrop {
    position: absolute;
    z-index: 1001;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .dialog {
    position: relative;
    z-index: 1002;
    max-width: 65em;
    background: #fff;
    padding: 0.25rem;
    border-radius: 5px;
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.1);
    min-height: 20em;
    min-width: 20em;
  }

  .close {
    color: #111;
    position: absolute;
    top: -20px;
    right: -20px;
    box-shadow: 10px 20px 40px rgba(0, 0, 0, 0.8);
    z-index: 1002;
    cursor: pointer;
    transition: 200ms ease;
    background: #fff;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 24px;
    }
    &:hover {
      transform: scale(1.1);
    }
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
    transition: all 300ms;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0);
  } to {
    transform: rotate(360deg);
  }
`;

const ImageLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  .loading-spinner {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: inline-block;
    border-left: 3px solid #e8e8e8;
    border-right: 3px solid #e8e8e8;
    border-top: 3px solid #e8e8e8;
    border-bottom: 3px solid dodgerblue;
    animation: ${rotate} 600ms cubic-bezier(0.61, -0.01, 0.32, 1.05) infinite;
  }
`;

const GalleryViewerCtrl = styled.div`
  position: absolute;
  top: 50%;
  left: ${props => (props.prev ? '-35px' : 'calc(100% + 20px)')};
  transform: translateY(-50%);
  display: ${props => (props.hidden ? 'none' : 'block')};
  z-index: 1002;
  cursor: pointer;
  color: #fff;
  font-size: 2rem;
  * {
    vertical-align: middle;
  }
`;

export default class Gallery extends Component {
  state = {
    images: [
      {
        id: 1,
        alt: 'image - 1069',
        smallSrc: 'https://picsum.photos/300/300?image=1069',
        largeSrc: 'https://picsum.photos/1600/800?image=1069'
      },
      {
        id: 2,
        alt: 'image - 961',
        smallSrc: 'https://picsum.photos/300/300?image=961',
        largeSrc: 'https://picsum.photos/1600/800?image=961'
      },
      {
        id: 3,
        alt: 'image - 1074',
        smallSrc: 'https://picsum.photos/300/300?image=1074',
        largeSrc: 'https://picsum.photos/1600/800?image=1074'
      },
      {
        id: 4,
        alt: 'image - 1084',
        smallSrc: 'https://picsum.photos/300/300?image=1084',
        largeSrc: 'https://picsum.photos/1600/800?image=1084'
      },
      {
        id: 5,
        alt: 'image - 1062',
        smallSrc: 'https://picsum.photos/300/300?image=1062',
        largeSrc: 'https://picsum.photos/1600/800?image=1062'
      },
      {
        id: 6,
        alt: 'image - 1050',
        smallSrc: 'https://picsum.photos/300/300?image=1050',
        largeSrc: 'https://picsum.photos/1600/800?image=1050'
      },
      {
        id: 7,
        alt: 'image - 1020',
        smallSrc: 'https://picsum.photos/300/300?image=1020',
        largeSrc: 'https://picsum.photos/1000/600?image=1020'
      },
      {
        id: 8,
        alt: 'image - 1003',
        smallSrc: 'https://picsum.photos/300/300?image=1003',
        largeSrc: 'https://picsum.photos/1000/600?image=1003'
      },
      {
        id: 9,
        alt: 'image - 815',
        smallSrc: 'https://picsum.photos/300/300?image=815',
        largeSrc: 'https://picsum.photos/1000/600?image=815'
      }
    ],
    selectedImage: null,
    imageLoading: true
  };

  componentDidMount() {
    window.addEventListener('keypress', e => {
      const key = e.which;
    });
  }

  handleImageClick = e => {
    const { id, largeSrc } = e.target.dataset;
    if (id && largeSrc) {
      this.setState(prevState => ({
        selectedImage: {
          id: parseInt(id, 10),
          largeSrc
        },
        imageLoading: true
      }));
    }
  };

  handleImageDismiss = () => {
    this.setState({
      selectedImage: null
    });
  };

  handleLargeImageLoad = e => {
    this.setState({
      imageLoading: false
    });
  };

  findSubsequentImage = (id, direction = 'previous') => {
    const { images } = this.state;
    const i = images.findIndex(image => image.id === id);
    if (i === 0 && direction === 'previous') {
      return images[images.length - 1];
    }
    if (i === images.length - 1 && direction === 'next') {
      return images[0];
    }

    return images[direction === 'next' ? i + 1 : i - 1];
  };

  displayPrevImage = () => {
    const { selectedImage } = this.state;
    if (selectedImage) {
      const { id } = selectedImage;
      if (id) {
        const prevImage = this.findSubsequentImage(id, 'previous');
        if (prevImage) {
          this.setState({
            selectedImage: prevImage
          });
        }
      }
    }
  };

  displayNextImage = () => {
    const { selectedImage } = this.state;
    if (selectedImage) {
      const { id } = selectedImage;
      if (id) {
        const prevImage = this.findSubsequentImage(id, 'next');
        if (prevImage) {
          this.setState({
            selectedImage: prevImage,
            imageLoading: true
          });
        }
      }
    }
  };

  handleGalleryModalKeypress = e => {
    console.log(e.which);
  };

  render() {
    const { images, selectedImage, imageLoading } = this.state;

    return (
      <React.Fragment>
        <GalleryContainer>
          {images.map(image => (
            <GalleryItem key={image.id}>
              <img
                onClick={this.handleImageClick}
                data-id={image.id}
                data-large-src={image.largeSrc}
                src={image.smallSrc}
                alt={image.alt}
              />
            </GalleryItem>
          ))}
        </GalleryContainer>

        {selectedImage && (
          <StyledGalleryModal>
            <div className="backdrop" />
            <div className="dialog">
              <GalleryViewerCtrl onClick={this.displayPrevImage} prev>
                <i className="fas fa-chevron-left" />
              </GalleryViewerCtrl>
              <GalleryViewerCtrl onClick={this.displayNextImage} next>
                <i className="fas fa-chevron-right" />
              </GalleryViewerCtrl>
              <i className="close" onClick={this.handleImageDismiss}>
                <i className="fas fa-times" />
              </i>
              {imageLoading && (
                <ImageLoader>
                  <span className="loading-spinner" />
                </ImageLoader>
              )}
              <img src={selectedImage.largeSrc} alt={selectedImage.alt} onLoad={this.handleLargeImageLoad} />
            </div>
          </StyledGalleryModal>
        )}
      </React.Fragment>
    );
  }
}
