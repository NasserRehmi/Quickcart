import React from 'react';
import { Link } from 'react-router-dom';

function PaymentFail() {
  return (
    <div className="payment-fail-page">
      <div className="fail-card">
        <h1>Échec du paiement</h1>
        <div className="fail-icon">❌</div>
        <p>Votre paiement n'a pas pu être traité.</p>
        <p>Veuillez vérifier vos informations de paiement et réessayer.</p>
        
        <div className="action-buttons">
          <Link to="/dashboard" className="secondary-button">
            Retour au tableau de bord
          </Link>
          <Link to="/client/paybuilder" className="primary-button">
            Réessayer le paiement
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentFail;
