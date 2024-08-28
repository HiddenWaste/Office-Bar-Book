import React, { useState, useEffect } from 'react';
import DrinkSlide from './components/DrinkSlide';
import drinksData from './data/drinks.json';
import './styles.css';

// Main App Component
const App = () => {
    // Setup the usestates for the slideshow and drinks
    const [drinks, setDrinks] = useState([]);
    const [isSlideshowActive, setIsSlideshowActive] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Load drinks data on component mount
    useEffect(() => {
        setDrinks(drinksData); // imported json data
    }, []);

    const startSlideshow = () => {
        setIsSlideshowActive(true);
        setCurrentSlide(0); // Start with the first drink
        
        // Fullscreen API: Request full-screen mode
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
        
        // Fullscreen API: Exit full-screen mode
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(err => {
                console.error(`Error attempting to exit full-screen mode: ${err.message}`);
            });
        }
    };

    useEffect(() => {
        if (isSlideshowActive) {
            const interval = setInterval(nextSlide, 9000); // Change slide every 3 seconds
            return () => clearInterval(interval);
        }
    }, [isSlideshowActive, drinks.length]);

    return (
        <div className="app">
            <header>
                <h1>The Office Bar and Grill Cocktails!!!</h1>
                <button onClick={startSlideshow} className="start-slideshow-button">
                    (Restauraunt Slideshow)
                </button>
            </header>
            <div className="slideshow">
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
