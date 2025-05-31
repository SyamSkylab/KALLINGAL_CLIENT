import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img5 from './assets/img5.webp';
import img4 from './assets/img4.webp';
import img1 from './assets/img1.webp';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Slider = () => {
    const images = [img5, img1, img4];

    return (
        <Carousel fade controls indicators interval={4000} pause="hover" wrap>
            {images.map((image, index) => (
                <Carousel.Item key={index}>
                    <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        style={{ width: '100%', height: '140vh', objectFit: 'cover' }}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
};
