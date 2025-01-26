import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  initialDeposit: {
    type: String,
    required: true,
  },
  loanPeriod: {
    type: String,
    required: true,
  },
  monthlyInstallment: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
    unique: true
  },
  subcategory: {
    type: String,
    required: true,
  },
  totalAmountAfterDeposit: {
    type: String,
    required: true,
  },
  totalLoan: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Loan = mongoose.model('Request', LoanSchema);


export default Loan;