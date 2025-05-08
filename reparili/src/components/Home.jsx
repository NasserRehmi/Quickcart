import React from 'react';
import MainLayout from './MainLayout';
const Home = () => {
  return (
    <MainLayout>
      <section className='normal-page'>
        <h1 className='about-title'>Welcome to Reparili</h1>
        <p className='about-description'>
        Reparili est votre plateforme de confiance pour mettre en relation les clients avec des artisans qualifiés pour tous vos besoins en réparation de maison. Que ce soit pour des rénovations, des réparations ou de l’entretien, nous vous aidons à trouver les professionnels les mieux adaptés à votre projet, rapidement et en toute simplicité.
        </p>
        <div className='cta-container'>
          <a href="/about" className='cta-button'>Learn More About Us</a>
        </div>
      </section>
    </MainLayout>
  );
};
export default Home;
