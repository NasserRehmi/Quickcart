import React from 'react';
import MainLayout from './MainLayout';

const About = () => {
  return (
    <MainLayout>
      <section className='normal-page'>
        <h1 className='about-title'>About Reparili</h1>
        <p className='about-description'>
        Reparili est une plateforme de premier plan dédiée à la mise en relation des clients avec des artisans fiables et professionnels pour tous leurs besoins en réparation et rénovation de maison. Notre objectif est de simplifier la recherche de prestataires qualifiés pour tout type de projet d’amélioration de l’habitat, en garantissant que votre logement soit entre de bonnes mains.
        </p>
        <p className='about-description'>
        Que vous ayez besoin d’une petite réparation ou d’une rénovation complète, Reparili vous offre une expérience fluide avec des tarifs transparents, des professionnels vérifiés et des méthodes de paiement sécurisées. Nous mettons un point d’honneur à offrir qualité, efficacité et satisfaction client.
        </p>
        <div className='cta-container'>
          <button className='cta-button'>
            Find a Builder
          </button>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
