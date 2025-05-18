import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';

// URL de l'API configurée comme constante
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function PayBuilder() {
  // Récupération du paramètre builderCin depuis l'URL
  const { builderCin } = useParams(); // Si votre route est /client/paybuilder/:builderCin
  
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Vérification des valeurs au chargement du composant
    console.log("builderCin depuis l'URL:", builderCin);
    console.log("CIN du client dans localStorage:", localStorage.getItem('cin'));
  }, [builderCin]);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!amount || amount <= 0) {
      setMessage("Veuillez saisir un montant valide");
      setIsLoading(false);
      return;
    }

    const clientCin = localStorage.getItem('cin');
    if (!clientCin) {
      setMessage("Vous devez être connecté pour effectuer un paiement");
      setIsLoading(false);
      return;
    }
    
    if (!builderCin) {
      setMessage("Identifiant de l'artisan manquant");
      setIsLoading(false);
      return;
    }

    // Génération d'un orderId unique
    const orderId = uuidv4();
    
    // Création de l'objet de données
    const paymentData = {
      builderCin: builderCin,
      amount: amount,
      clientCin: clientCin,
      orderId: orderId
    };
    
    console.log("Données envoyées à l'API:", paymentData);

    // Envoi de la requête - Maintenant avec Flouci au lieu de Paymee
    axios.post(`${API_URL}/api/payment`, paymentData)
    .then((response) => {
      console.log("Réponse de l'API:", response.data);
      if (response.data.success) {
        // Si le paiement est réussi et contient un lien de paiement Flouci, rediriger
        if (response.data.paymentLink) {
          // Redirection vers la page de paiement Flouci
          window.location.href = response.data.paymentLink;
        } else {
          setMessage("✅ Paiement traité avec succès!");
          setAmount("");
        }
      } else {
        // Amélioration de la gestion des erreurs
        setMessage(response.data.message || "Échec du paiement");
      }
      setIsLoading(false);
    })
    .catch((err) => {
      console.error("Erreur de paiement:", err);
      // Log détaillé de l'erreur pour débogage
      if (err.response) {
        console.error("Détails de l'erreur:", err.response.data);
        setMessage(err.response.data.message || "Une erreur est survenue lors du traitement du paiement");
      } else {
        setMessage("Impossible de contacter le serveur de paiement. Veuillez réessayer plus tard.");
      }
      setIsLoading(false);
    });
  };

  return (
    <div className="login-page">
      <div className="payment-card">
        <h2 className="payment-title">Payer l'artisan</h2>
        <form className="payment-form" onSubmit={handlePayment}>
          <label>
            Montant (TND)
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="1"
              disabled={isLoading}
            />
          </label>

          <button type="submit" className="pay-button" disabled={isLoading}>
            {isLoading ? "Traitement en cours..." : "Payer maintenant"}
          </button>

          {message && (
            <p
              className="payment-message"
              style={{ color: message.includes('✅') ? 'green' : 'red' }}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default PayBuilder;
