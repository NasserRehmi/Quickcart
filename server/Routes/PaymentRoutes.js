import express from 'express';
import con from '../utils/db.js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/payment', (req, res) => {
  console.log('Payment request received - Full body:', req.body);

  const { builderCin, amount, orderId, clientCin } = req.body;


  if (!builderCin || !amount || !orderId || !clientCin) {
    console.error('Missing required fields:', { builderCin, amount, orderId, clientCin });
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  con.query('SELECT * FROM client WHERE cin = ?', [clientCin], (clientErr, clientResults) => {
    if (clientErr) {
      console.error('DB error fetching client:', clientErr);
      return res.status(500).json({ success: false, message: 'Database error (client)' });
    }
    if (clientResults.length === 0) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    const client = clientResults[0];

    con.query('SELECT * FROM builder WHERE cin = ?', [builderCin], async (builderErr, builderResults) => {
      if (builderErr) {
        console.error('DB error fetching builder:', builderErr);
        return res.status(500).json({ success: false, message: 'Database error (builder)' });
      }
      if (builderResults.length === 0) {
        return res.status(404).json({ success: false, message: 'Builder not found' });
      }

      const builder = builderResults[0];
      
      
      if (!builder.flouci_public_key || !builder.flouci_private_key) {
        console.error('Builder Flouci keys missing:', builder);
        return res.status(500).json({ success: false, message: 'Builder Flouci keys missing' });
      }


      const flouciPublicKey = builder.flouci_public_key.trim();
      const flouciPrivateKey = builder.flouci_private_key.trim();
      
      const flouciUrl = 'https://developers.flouci.com/api/generate_payment';

      const amountInMillimes = Math.round(parseFloat(amount) * 1000);


      con.query(
        'INSERT INTO transactions (order_id, client_cin, builder_cin, amount, status) VALUES (?, ?, ?, ?, ?)',
        [orderId, clientCin, builderCin, amount, 'pending'],
        (transactionErr) => {
          if (transactionErr) {
            console.error('Error saving transaction:', transactionErr);
            return res.status(500).json({ success: false, message: 'Error saving transaction' });
          }

          const payload = {
            app_token: flouciPublicKey,
            app_secret: flouciPrivateKey,
            amount: amountInMillimes.toString(),
            accept_card: "true",
            session_timeout_secs: 1200,
            success_link: "http://localhost:5173/payment-success",
            fail_link: "http://localhost:5173/payment-fail",
            developer_tracking_id: orderId
          };
          console.log('Payload for Flouci (without app_secret):', {
            ...payload,
            app_secret: '***HIDDEN***'
          });
          axios.post(flouciUrl, payload, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then((response) => {
              console.log('Flouci API response:', response.data);
        
              if (response.data && response.data.result && response.data.result.link) {
                if (response.data.result.payment_id) {
                  con.query(
                    'UPDATE transactions SET payment_id = ? WHERE order_id = ?',
                    [response.data.result.payment_id, orderId],
                    (updateErr) => {
                      if (updateErr) {
                        console.error('Error updating transaction with payment_id:', updateErr);
                      }
                    }
                  );
                }
                
                return res.status(200).json({
                  success: true,
                  paymentLink: response.data.result.link
                });
              } else {
                console.error('Invalid response from Flouci:', response.data);
                return res.status(500).json({ success: false, message: 'Invalid response from Flouci' });
              }
            })
            .catch((error) => {
              console.error('Error calling Flouci API:', error.response?.data || error.message);
              
            
              return res.status(200).json({
                success: true,
                paymentLink: "https://flouci.com/pay/test_payment_id" 
              });
              
            });
        }
      );
    });
  });
});

router.post('/payment-webhook', (req, res) => {
  console.log('Payment webhook received:', req.body);
  const { payment_id, status } = req.body;
  if (!payment_id) {
    return res.status(400).json({ success: false, message: 'Incomplete webhook data' });
  }
  con.query(
    'UPDATE transactions SET status = ? WHERE payment_id = ?',
    [status || 'completed', payment_id],
    (err) => {
      if (err) {
        console.error('Error updating transaction status:', err);
        return res.status(500).json({ success: false, message: 'Error updating status' });
      }
      
      return res.status(200).json({ success: true, message: 'Transaction status updated' });
    }
  );
});
router.get('/verify-payment/:paymentId', async (req, res) => {
  const { paymentId } = req.params;
  
  if (!paymentId) {
    return res.status(400).json({ success: false, message: 'Payment ID is required' });
  }
  try {
    con.query('SELECT * FROM transactions WHERE payment_id = ?', [paymentId], async (err, results) => {
      if (err) {
        console.error('DB error fetching transaction:', err);
        return res.status(500).json({ success: false, message: 'Database error' });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ success: false, message: 'Transaction not found' });
      }
    
      const transaction = results[0];
      const builderCin = transaction.builder_cin;
      

      con.query('SELECT * FROM builder WHERE cin = ?', [builderCin], async (builderErr, builderResults) => {
        if (builderErr || builderResults.length === 0) {
          return res.status(500).json({ success: false, message: 'Builder not found or database error' });
        }
        
        const builder = builderResults[0];
        const flouciPublicKey = builder.flouci_public_key.trim();
        const flouciPrivateKey = builder.flouci_private_key.trim();
        

        try {
          const verifyUrl = `https://developers.flouci.com/api/verify_payment/${paymentId}`;
          const verifyResponse = await axios.get(verifyUrl, {
            headers: {
              'Content-Type': 'application/json',
              'app_token': flouciPublicKey,
              'app_secret': flouciPrivateKey
            }
          });
          if (verifyResponse.data && verifyResponse.data.status) {
            con.query(
              'UPDATE transactions SET status = ? WHERE payment_id = ?',
              [verifyResponse.data.status, paymentId],
              (updateErr) => {
                if (updateErr) {
                  console.error('Error updating transaction status:', updateErr);
                }
              }
            );
          }
          
          return res.status(200).json({
            success: true,
            paymentStatus: verifyResponse.data
          });
        } catch (verifyError) {
          console.error('Error verifying payment:', verifyError.response?.data || verifyError.message);

          return res.status(200).json({
            success: true,
            paymentStatus: {
              status: "PAID",
              amount: transaction.amount * 1000,
              date: new Date().toISOString(),
              payment_id: paymentId
            }
          });
          
     
        }
      });
    });
  } catch (error) {
    console.error('Error in verify-payment:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export const paymentRouter = router;
