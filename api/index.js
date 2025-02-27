require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB', err);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const Expense = require('./models/expense');

app.post('/expenses', async (req, res) => {
  try {
    const {type, account, category, amount, date, note, day} = req.body;

    const newExpense = new Expense({
      type,
      account,
      category,
      amount,
      date,
      note,
      day,
    });

    await newExpense.save();

    res
      .status(201)
      .json({message: 'Expense created Successfully', expense: newExpense});
  } catch (error) {
    console.log('Error creating expense', error);
    return res.status(500).json({message: 'Internal server error'});
  }
});

app.get('/expenses', async (req, res) => {
  try {
    const {date} = req.query;
    const expenses = await Expense.find({date: date});
    res.status(200).json(expenses);
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({message: 'Error getting all expenses'});
  }
});

app.get('/allExpenses', async (req, res) => {
  try {
    const expenses = await Expense.find({});
    res.status(200).json(expenses);
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({error: 'Error getting expenses'});
  }
});
