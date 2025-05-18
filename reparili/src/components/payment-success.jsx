import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function PaymentSuccess( ) {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer l'ID de paiement depuis l'URL si disponible
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('payment_id');
    
    if (paymentId) {
      // Vérifier le statut du paiement
      axios.get(`${API_URL}/api/verify-payment/${paymentId}`)
        .then(response => {
          setPaymentDetails(response.data.paymentStatus);
          setLoading(false);
        })
        .catch(error => {
          console.error("Erreur lors de la vérification du paiement:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="login-page">
      <div className="success-card">
        <h1>Paiement réussi !</h1>
        <div className="success-icon">✅</div>
        <p>Votre paiement a été traité avec succès.</p>
        
        {loading ? (
          <p>Chargement des détails du paiement...</p>
        ) : paymentDetails ? (
          <div className="payment-details">
            <h3>Détails du paiement</h3>
            <p>Montant: {paymentDetails.amount / 1000} TND</p>
            <p>Date: {new Date(paymentDetails.date).toLocaleString()}</p>
            <p>Référence: {paymentDetails.payment_id}</p>
          </div>
        ) : null}
        
        <div className="action-buttons">
          <Link to="/" className="primary-button">
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
