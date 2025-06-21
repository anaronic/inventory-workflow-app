const mongoose = require('mongoose');

const workflowSchema = new mongoose.Schema({
  workerName: { type: String, required: true },
  paymentAmount: { type: Number, required: true },
  dateGiven: { type: Date, required: true },
  dateReceived: { type: Date },
  expectedCompletionDate: { type: Date, required: true },
  workDescription: { type: String, required: true }  // ✅ NEW FIELD
});

module.exports = mongoose.model('Workflow', workflowSchema);
