const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

//MYSQL CONNECTION
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'earist_hris',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//////// REMITTANCE
router.get('/employee-remittance', (req, res) => {
  const sql = 'SELECT * FROM remittance_table';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching data' });
    } else {
      res.json(result);
    }
  });
});

// POST: Add new remittance data
router.post('/employee-remittance', (req, res) => {
  const {
    employeeNumber,
    name,
    liquidatingCash,
    gsisSalaryLoan,
    gsisPolicyLoan,
    gsisArrears,
    cpl,
    mpl,
    mplLite,
    emergencyLoan,
    nbc594,
    increment,
    pagibigFundCont,
    pagibig2,
    multiPurpLoan,
    landbankSalaryLoan,
    earistCreditCoop,
    feu,
  } = req.body;

  const sql = `INSERT INTO remittance_table (employeeNumber, name, liquidatingCash, gsisSalaryLoan, gsisPolicyLoan, gsisArrears, cpl, mpl, mplLite, emergencyLoan, nbc594, increment, pagibigFundCont, pagibig2, multiPurpLoan, landbankSalaryLoan, earistCreditCoop, feu)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    employeeNumber,
    name,
    liquidatingCash,
    gsisSalaryLoan,
    gsisPolicyLoan,
    gsisArrears,
    cpl,
    mpl,
    mplLite,
    emergencyLoan,
    nbc594,
    increment,
    pagibigFundCont,
    pagibig2,
    multiPurpLoan,
    landbankSalaryLoan,
    earistCreditCoop,
    feu,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error during POST request:', err);
      res.status(500).json({ message: 'Error adding data' });
    } else {
      res.status(200).json({ message: 'Data added successfully' });
    }
  });
});

// PUT: Update remittance data by ID
router.put('/employee-remittance/:id', (req, res) => {
  const { id } = req.params;
  const {
    employeeNumber,
    name,
    liquidatingCash,
    gsisSalaryLoan,
    gsisPolicyLoan,
    gsisArrears,
    cpl,
    mpl,
    mplLite,
    emergencyLoan,
    nbc594,
    increment,
    pagibigFundCont,
    pagibig2,
    multiPurpLoan,
    landbankSalaryLoan,
    earistCreditCoop,
    feu,
  } = req.body;

  const sql = `UPDATE remittance_table
    SET
    employeeNumber = ?,
    name = ?,
    liquidatingCash = ?,
    gsisSalaryLoan = ?,
    gsisPolicyLoan =?,
    gsisArrears= ?,
    cpl = ?,
    mpl = ?,
    mplLite = ?,
    emergencyLoan = ?,
    nbc594 = ?,
    increment = ?,
    pagibigFundCont = ?,
    pagibig2 = ?,
    multiPurpLoan = ?,
    landbankSalaryLoan = ?,
    earistCreditCoop = ?,
    feu = ?
                 WHERE id = ?`;

  const values = [
    employeeNumber,
    name,
    liquidatingCash,
    gsisSalaryLoan,
    gsisPolicyLoan,
    gsisArrears,
    cpl,
    mpl,
    mplLite,
    emergencyLoan,
    nbc594,
    increment,
    pagibigFundCont,
    pagibig2,
    multiPurpLoan,
    landbankSalaryLoan,
    earistCreditCoop,
    feu,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error updating data' });
    } else {
      res.status(200).json({ message: 'Data updated successfully' });
    }
  });
});

// DELETE: Delete remittance data by ID
router.delete('/employee-remittance/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM remittance_table WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error deleting data' });
    } else {
      res.status(200).json({ message: 'Data deleted successfully' });
    }
  });
});

module.exports = router;
