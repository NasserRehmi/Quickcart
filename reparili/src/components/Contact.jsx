import React from 'react';
import MainLayout from './MainLayout';
const Contact = () => {
  return (
    <MainLayout>
      <section className='normal-page'>
        <h1 className='about-title'>Contact Us</h1>
        <p className='about-description'>
          If you have any questions or need assistance, feel free to reach out to us through any of the following methods:
        </p>

        <div className='contact-details'>
          <p><strong>WhatsApp:</strong> <a href="https://wa.me/+21695626262" target="_blank" rel="noopener noreferrer">+216 95626262</a></p>
          <p><strong>Email:</strong> <a href="mailto:hossemedinerahmi@gmail.com">hossemedinerahmi@gmail.com</a></p>
        </div>
      </section>
    </MainLayout>
  );
};
export default Contact;
