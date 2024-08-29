import React, { useState, useEffect } from 'react';
import DrinkSlide from './components/DrinkSlide';
import drinksData from './data/drinks.json';
import './styles.css';

// Main App Component
const App = () => {
    const [drinks, setDrinks] = useState([]);
    const [isSlideshowActive, setIsSlideshowActive] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        setDrinks(drinksData);
    }, []);

    const startSlideshow = () => {
        setIsSlideshowActive(true);
        setCurrentSlide(0);

        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        }
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % drinks.length);
    };

    const exitSlideshow = () => {
        setIsSlideshowActive(false);

        if (document.exitFullscreen) {
            document.exitFullscreen().catch(err => {
                console.error(`Error attempting to exit full-screen mode: ${err.message}`);
            });
        }
    };

    useEffect(() => {
        if (isSlideshowActive) {
            const interval = setInterval(nextSlide, 9000);
            return () => clearInterval(interval);
        }
    }, [isSlideshowActive, drinks.length]);

    return (
        <div className="app">
            <header>
                <h1>The Office Bar and Grill Cocktails!!!</h1>
                <button onClick={startSlideshow} className="start-slideshow-button">
                    (Restaurant Slideshow)
                </button>
            </header>
            <div className={`slideshow ${isSlideshowActive ? '' : 'grid'}`}>
                {isSlideshowActive ? (
                    <div className="full-screen-slideshow">
                        <DrinkSlide drink={drinks[currentSlide]} />
                        <button onClick={exitSlideshow} className="exit-slideshow-button">
                            ~
                        </button>
                    </div>
                ) : (
                    drinks.map((drink, index) => (
                        <DrinkSlide key={index} drink={drink} />
                    ))
                )}
            </div>
        </div>
    );
};

export default App;
