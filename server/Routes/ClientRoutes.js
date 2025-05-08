import express from 'express';
import con from '../utils/db.js';
import jwt from "jsonwebtoken";
import multer from 'multer';
import path from 'path';
import verifyUser from '../middleware/VerifyUser.js';
import bcrypt from 'bcrypt';
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

const multerUploads = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const uploadUploads = multer({ storage: multerUploads });

router.post("/loginclient", (req, res) => {
  const sql = "SELECT * FROM client WHERE email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const storedPassword = result[0].mdp;
      const cin = result[0].cin;
      bcrypt.compare(req.body.mdp, storedPassword, (err, isMatch) => {
        if (err) return res.json({ loginStatus: false, Error: "Password comparison error" });
        if (isMatch) {
          const token = jwt.sign({ cin: cin }, "jwt_secret_key", { expiresIn: "1h" });
          res.cookie("token", token, { httpOnly: true });
          return res.json({ loginStatus: true, cin: cin });
        } else {
          return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
      });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

router.post("/loginbuilder", (req, res) => {
  const sql = "SELECT * FROM builder WHERE email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const storedPassword = result[0].mdp;
      const cin = result[0].cin;
      bcrypt.compare(req.body.mdp, storedPassword, (err, isMatch) => {
        if (err) return res.json({ loginStatus: false, Error: "Password comparison error" });
        if (isMatch) {
          const token = jwt.sign({ cin: cin }, "jwt_secret_key", { expiresIn: "1h" });
          res.cookie("token", token, { httpOnly: true });
          return res.json({ loginStatus: true, cin: cin });
        } else {
          return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
      });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

router.post("/loginadmin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const storedPassword = result[0].mdp;
      const cin = result[0].cin;
      bcrypt.compare(req.body.mdp, storedPassword, (err, isMatch) => {
        if (err) return res.json({ loginStatus: false, Error: "Password comparison error" });
        if (isMatch) {
          const token = jwt.sign({ cin: cin }, "jwt_secret_key", { expiresIn: "1h" });
          res.cookie("token", token, { httpOnly: true });
          return res.json({ loginStatus: true, cin: cin });
        } else {
          return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
      });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'Strict' });
  res.json({ logoutStatus: true });
});

router.post("/signup", upload.single("image"), (req, res) => {
  const { cin, nom, prenom, email, telephone, adresse, password, role } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!cin || !nom || !prenom || !email || !telephone || !adresse || !password || !role) {
    return res.json({ Status: false, Error: "All fields are required" });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.json({ Status: false, Error: "Password hashing error" });

    let sql, values;

    if (role === "builder") {
      sql = `INSERT INTO builder (cin, nom, prenom, email, telephone, adresse, mdp, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      values = [cin, nom, prenom, email, telephone, adresse, hashedPassword, image];
    } else if (role === "client") {
      sql = `INSERT INTO client (cin, nom, prenom, email, telephone, adresse, mdp) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      values = [cin, nom, prenom, email, telephone, adresse, hashedPassword];
    } else if (role === "admin") {
      sql = `INSERT INTO admin (cin, nom, prenom, email, telephone, adresse, mdp) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      values = [cin, nom, prenom, email, telephone, adresse, hashedPassword];
    } else {
      return res.json({ Status: false, Error: "Invalid role selected" });
    }

    con.query(sql, values, (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error: " + err });
      return res.json({ Status: true, Message: "Signup successful", UserID: cin });
    });
  });
});

router.get("/client/:cin", (req, res) => {
  const { cin } = req.params;
  const sql = "SELECT nom, prenom, email,adresse, telephone FROM client WHERE cin = ?";
  con.query(sql, [cin], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Database error" });
    if (result.length === 0) return res.json({ Status: false, Error: "Builder not found" });
    res.json({ Status: true, Result: result[0] });
  });
});

router.get("/builder/:cin", (req, res) => {
  const { cin } = req.params;
  const sql = "SELECT nom, prenom, email, telephone, image FROM builder WHERE cin = ?";
  con.query(sql, [cin], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Database error" });
    if (result.length === 0) return res.json({ Status: false, Error: "Builder not found" });
    res.json({ Status: true, Result: result[0] });
  });
});

router.get("/admin/:cin", (req, res) => {
  const { cin } = req.params;
  const sql = "SELECT nom, prenom, email, telephone FROM admin WHERE cin = ?";
  con.query(sql, [cin], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Database error" });
    if (result.length === 0) return res.json({ Status: false, Error: "Builder not found" });
    res.json({ Status: true, Result: result[0] });
  });
});

router.post("/builderupdate", async (req, res) => {
  const { cin, adresse,email, telephone, mdp } = req.body;
  if (!cin) return res.status(400).json({ message: "CIN is required" });

  let sql = "UPDATE builder SET adresse=?,email=?, telephone=? WHERE cin=?";
  let values = [adresse,email, telephone, cin];

  if (mdp) {
    try {
      const hashedPassword = await bcrypt.hash(mdp, 10);
      sql = "UPDATE builder SET adresse=?, telephone=?, mdp=? WHERE cin=?";
      values = [adresse,email, telephone, hashedPassword, cin];
    } catch (error) {
      return res.status(500).json({ message: "Error hashing password" });
    }
  }

  con.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "Builder updated successfully" });
  });
});

router.post("/clientupdate", async (req, res) => {
  const { cin, adresse, telephone, mdp } = req.body;
  if (!cin) return res.status(400).json({ message: "CIN is required" });

  let sql = "UPDATE client SET adresse=?, telephone=? WHERE cin=?";
  let values = [adresse, telephone, cin];

  if (mdp) {
    try {
      const hashedPassword = await bcrypt.hash(mdp, 10);
      sql = "UPDATE client SET adresse=?, telephone=?, mdp=? WHERE cin=?";
      values = [adresse, telephone, hashedPassword, cin];
    } catch (error) {
      return res.status(500).json({ message: "Error hashing password" });
    }
  }

  con.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "client updated successfully" });
  });
});

router.post("/adminupdate", async (req, res) => {
  const { cin, adresse, telephone, mdp } = req.body;
  if (!cin) return res.status(400).json({ message: "CIN is required" });

  let sql = "UPDATE admin SET adresse=?, telephone=? WHERE cin=?";
  let values = [adresse, telephone, cin];

  if (mdp) {
    try {
      const hashedPassword = await bcrypt.hash(mdp, 10);
      sql = "UPDATE admin SET adresse=?, telephone=?, mdp=? WHERE cin=?";
      values = [adresse, telephone, hashedPassword, cin];
    } catch (error) {
      return res.status(500).json({ message: "Error hashing password" });
    }
  }

  con.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "admin updated successfully" });
  });
});
router.delete('/admins/:cin', verifyUser, (req, res) => {
  const { cin } = req.params;
  const query = 'DELETE FROM admin WHERE cin = ?';

  con.query(query, [cin], (err, result) => {
    if (err) {
      console.error('Error deleting admin:', err);
      return res.status(500).json({ error: 'Error deleting admin' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ message: 'Admin deleted successfully' });
  });
});

router.get('/builderslts', verifyUser, (req, res) => {
  const { cin } = req.query;
  if (cin) {
    const sql = "SELECT nom, prenom, email, telephone, image FROM builder WHERE cin = ?";
    const workCountSql = `SELECT builder_cin, COUNT(*) AS done_work_count FROM work WHERE status = 'done' AND builder_cin = ?`;

    con.query(sql, [cin], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Database error" });
      if (result.length === 0) return res.json({ Status: false, Error: "Builder not found" });
      
      con.query(workCountSql, [cin], (err2, workCountResult) => {
        if (err2) return res.json({ Status: false, Error: "Database error" });
        const doneWorkCount = workCountResult.length > 0 ? workCountResult[0].done_work_count : 0;
        const builderData = result[0];
        builderData.done_work_count = doneWorkCount;
        return res.json({ Status: true, Result: builderData });
      });
    });
  } else {
    const builderSql = `SELECT * FROM builder`;
    const workCountSql = `SELECT builder_cin, COUNT(*) AS done_work_count FROM work WHERE status = 'done' GROUP BY builder_cin`;

    con.query(builderSql, (err, builders) => {
      if (err) return res.json({ Status: false, Error: err.sqlMessage });

      con.query(workCountSql, (err2, workCounts) => {
        if (err2) return res.json({ Status: false, Error: err2.sqlMessage });

        const workCountMap = {};
        workCounts.forEach(row => { workCountMap[row.builder_cin] = row.done_work_count; });

        const finalResult = builders.map(builder => ({
          ...builder,
          done_work_count: workCountMap[builder.cin] || 0
        }));

        return res.json({ Status: true, Result: finalResult });
      });
    });
  }
});

router.get('/builder/details/:cin', (req, res) => {
  const { cin } = req.params;
  const sql = "SELECT * FROM builder WHERE cin = ?";
  con.query(sql, [cin], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error: " + err });
    if (result.length > 0) return res.json({ Status: true, Result: result });
    return res.json({ Status: false, Error: "No builder found with this CIN", Result: [] });
  });
});

router.post("/requests", uploadUploads.array("photos"), (req, res) => {
  const { clientCin, cin, area, address } = req.body;
  const photos = req.files.map((file) => file.filename);

  const getNamesQuery = `SELECT (SELECT CONCAT(nom, ' ', prenom) FROM client WHERE cin = ?) AS client, (SELECT CONCAT(nom, ' ', prenom) FROM builder WHERE cin = ?) AS builder_name`;

  con.query(getNamesQuery, [clientCin, cin], (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to get names" });

    const clientName = results[0].client || "Unknown Client";
    const builderName = results[0].builder_name || "Unknown Builder";

    const insertQuery = `INSERT INTO work (client_cin, builder_cin, surface, adresse, images, client, builder_name) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const insertValues = [clientCin, cin, area, address, JSON.stringify(photos), clientName, builderName];

    con.query(insertQuery, insertValues, (err, result) => {
      if (err) return res.status(500).json({ message: "Failed to submit request" });
      res.status(200).json({ message: "Request submitted successfully", data: { clientCin, clientName, builderCin: cin, builderName, area, address, photos } });
    });
  });
});

router.get('/workrequests/:builderCin', verifyUser, (req, res) => {
  const { builderCin } = req.params;
  const query = `SELECT id, client_cin, client, status FROM work WHERE builder_cin = ?`;

  con.query(query, [builderCin], (err, results) => {
    if (err) return res.status(500).json({ error: 'Internal Server Error' });
    if (results.length === 0) return res.status(404).json({ error: 'No work requests found' });
    res.json(results);
  });
});

router.get('/clientwork/:clientCin', verifyUser, (req, res) => {
  const { clientCin } = req.params;
  const query = `SELECT id, builder_cin, builder_name, status FROM work WHERE client_cin = ?`;

  con.query(query, [clientCin], (err, results) => {
    if (err) return res.status(500).json({ error: 'Internal Server Error' });
    if (results.length === 0) return res.status(404).json({ error: 'No work requests found' });
    res.json(results);
  });
});

router.put("/workrequests/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const query = "UPDATE work SET status = ? WHERE id = ?";
  con.query(query, [status, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to update status" });
    res.status(200).json({ message: "Status updated successfully" });
  });
});

router.put('/workrequests/update/:id', verifyUser, (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const query = `UPDATE work SET status = ? WHERE id = ?`;

  con.query(query, [status, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Internal Server Error' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Work request not found' });
    res.json({ message: 'Status updated successfully' });
  });
});

router.get("/workrequests/details/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM work WHERE id = ?";
  con.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length === 0) return res.status(404).json({ message: "Work request not found" });
    res.json(result[0]);
  });
});

router.delete('/workrequests/delete/:id', verifyUser, (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM work WHERE id = ?`;

  con.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Internal Server Error' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Work request not found' });
    res.json({ message: 'Work request deleted successfully' });
  });
});

router.post('/passreclamation', (req, res) => {
  const { reporter, builderId, description } = req.body;

  if (!builderId || !description || !reporter) {
    return res.json({ Status: false, Error: "All fields are required." });
  }

  const getReporterSql = "SELECT nom, prenom FROM client WHERE cin = ?";
  con.query(getReporterSql, [reporter], (err, reporterResult) => {
    if (err || reporterResult.length === 0) return res.json({ Status: false, Error: "Invalid reporter." });
    
    const reporterName = `${reporterResult[0].nom} ${reporterResult[0].prenom}`;
    const getBuilderSql = "SELECT nom, prenom FROM builder WHERE cin = ?";
    
    con.query(getBuilderSql, [builderId], (err2, builderResult) => {
      if (err2 || builderResult.length === 0) return res.json({ Status: false, Error: "Invalid builder." });
      
      const builderName = `${builderResult[0].nom} ${builderResult[0].prenom}`;
      const insertSql = "INSERT INTO reclamation (reporter, reported, report, date_created) VALUES (?, ?, ?, NOW())";
      
      con.query(insertSql, [reporterName, builderName, description], (err3, result) => {
        if (err3) return res.json({ Status: false, Error: "Insert error: " + err3 });
        return res.json({ Status: true, Message: "Reclamation submitted successfully." });
      });
    });
  });
});

router.get('/reclamations', (req, res) => {
  con.query('SELECT * FROM reclamation', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching reclamations' });
    res.json(results);
  });
});

router.delete('/reclamations/:id', (req, res) => {
  const { id } = req.params;
  con.query('DELETE FROM reclamation WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error deleting reclamation' });
    res.json({ message: 'Reclamation deleted successfully' });
  });
});

router.get('/countusers', verifyUser, (req, res) => {
  const queryClients = 'SELECT COUNT(*) AS totalClients FROM client';
  const queryBuilders = 'SELECT COUNT(*) AS totalBuilders FROM builder';
  const queryWorks = 'SELECT COUNT(*) AS totalWork FROM work';

  con.query(queryClients, (err, clientResult) => {
    if (err) return res.status(500).json({ error: 'Error fetching client count' });

    con.query(queryBuilders, (err, builderResult) => {
      if (err) return res.status(500).json({ error: 'Error fetching builder count' });

      con.query(queryWorks, (err, workResult) => {
        if (err) return res.status(500).json({ error: 'Error fetching work count' });

        const totalClients = clientResult[0].totalClients;
        const totalBuilders = builderResult[0].totalBuilders;
        const totalWork = workResult[0].totalWork;

        res.json({ clients: totalClients, builders: totalBuilders, ongoingRepairs: totalWork });
      });
    });
  });
});

router.get('/clients', verifyUser, (req, res) => {
  const query = 'SELECT * FROM client';
  con.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching clients' });
    res.json(results);
  });
});

router.get('/builders', verifyUser, (req, res) => { 
  const sql = `SELECT * FROM builder`;
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
});

router.get('/admins', verifyUser, (req, res) => {
  const query = 'SELECT * FROM admin';
  con.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching clients' });
    res.json(results);
  });
});

router.delete('/builders/:cin', verifyUser, (req, res) => {
  const cin = req.params.cin;
  const sql = 'DELETE FROM builder WHERE cin = ?';

  con.query(sql, [cin], (err, result) => {
    if (err) return res.status(500).json({ Status: false, Error: err });
    if (result.affectedRows === 0) return res.status(404).json({ Status: false, Message: 'Builder not found' });
    return res.json({ Status: true, Message: 'Builder deleted successfully' });
  });
});

router.delete('/clients/:clientcin', verifyUser, (req, res) => {
  const { clientcin } = req.params;
  const query = 'DELETE FROM client WHERE cin = ?';

  con.query(query, [clientcin], (err, result) => {
    if (err)
    return res.status(500).json({ error: 'Error deleting client' });
    if (result.affectedRows === 0)
    return res.status(404).json({ error: 'Client not found' });
    res.json({ message: 'Client deleted successfully' });
  });
});

router.post('/clients/add', verifyUser, (req, res) => {
  const { name, email, phone, address } = req.body;
  const query = 'INSERT INTO client (name, email, phone, address) VALUES (?, ?, ?, ?)';

  con.query(query, [name, email, phone, address], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error adding new client' });
    res.json({ message: 'Client added successfully', clientId: result.insertId });
  });
});

router.put('/clients/edit/:clientcin', verifyUser, (req, res) => {
  const { clientCin } = req.params;
  const { name, email, phone, address } = req.body;
  const query = `UPDATE client SET name = ?, email = ?, phone = ?, address = ? WHERE cin = ?`;

  con.query(query, [name, email, phone, address, clientCin], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error updating client' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Client not found' });
    res.json({ message: 'Client updated successfully' });
  });
});

export { router as clientRouter };