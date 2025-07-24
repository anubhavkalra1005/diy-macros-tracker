
import './Home.css';
import logo from '../../assets/Logo.png';
import chartImg from '../../assets/react.svg'; // Placeholder, replace with a chart image if available

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <img src={logo} alt="DIY Macros Tracker Logo" className="home-logo" />
                <h1>DIY Macros Tracker</h1>
                <p className="home-tagline">Your personalized nutrition companion</p>
            </header>
            <main className="home-main">
                <section className="home-section">
                    <img src={chartImg} alt="Macros Chart" className="home-chart-img" />
                    <div className="home-section-content">
                        <h2>Master Macros Chart</h2>
                        <p>
                            Access a comprehensive chart of food items with their nutritional facts. The master chart is provided by default, but you can customize it to fit your unique dietary needs. Edit, add, or remove items as you like—your chart, your way!
                        </p>
                    </div>
                </section>
                <section className="home-section">
                    <img src={logo} alt="Track Macros" className="home-chart-img" />
                    <div className="home-section-content">
                        <h2>Track Your Daily Macros</h2>
                        <p>
                            Stay on top of your nutrition goals by tracking your daily macros. Log your meals, monitor your intake, and visualize your progress—all in one place.
                        </p>
                    </div>
                </section>
                <section className="home-cta">
                    <h3>Get Started Today!</h3>
                    <p>Empower your health journey with the DIY Macros Tracker.</p>
                    <button className="home-btn" onClick={() => handleNavigate('/macros-chart')}>Explore Macros Chart</button>
                    <button className="home-btn secondary" onClick={() => handleNavigate('/macros-tracker')}>Start Tracking</button>
                </section>
            </main>
        </div>
    );
}

export default Home;