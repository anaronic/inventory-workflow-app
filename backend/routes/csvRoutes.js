const express = require('express');
const router = express.Router();
const multer = require('multer');
const { format: formatCsv } = require('@fast-csv/format');
const csv = require('fast-csv');
const { Readable } = require('stream');

const Inventory = require('../models/Inventory');
const Workflow = require('../models/Workflow');

const models = {
  inventory: Inventory,
  workflows: Workflow
};

// Multer setup for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// --- EXPORT Route ---
router.get('/export/:collection', async (req, res) => {
  const { collection } = req.params;
  const Model = models[collection];

  if (!Model) {
    return res.status(404).json({ message: 'Collection not found' });
  }

  try {
    const data = await Model.find().lean();
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No data to export' });
    }

    const filename = `${collection}_export_${new Date().toISOString()}.csv`;
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    const csvStream = formatCsv({ headers: true });
    csvStream.pipe(res);

    data.forEach(doc => {
      // Convert ObjectId and other special types to string
      const sanitizedDoc = Object.keys(doc).reduce((acc, key) => {
        acc[key] = doc[key] ? doc[key].toString() : '';
        return acc;
      }, {});
      csvStream.write(sanitizedDoc);
    });

    csvStream.end();
  } catch (error) {
    console.error(`❌ Error exporting ${collection}:`, error);
    res.status(500).json({ message: 'Server error during export' });
  }
});

// --- IMPORT Route ---
router.post('/import/:collection', upload.single('file'), async (req, res) => {
  const { collection } = req.params;
  const Model = models[collection];

  if (!Model) {
    return res.status(404).json({ message: 'Collection not found' });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const records = [];
  const fileBuffer = req.file.buffer;
  const stream = Readable.from(fileBuffer.toString());

  csv.parseStream(stream, { headers: true })
    .on('error', error => {
      console.error(error);
      res.status(400).json({ message: 'Error parsing CSV file.' });
    })
    .on('data', row => {
      // Basic data cleaning and type conversion
      const cleanedRow = {};
      for (let key in row) {
        if (Model.schema.paths[key]) {
          const schemaType = Model.schema.paths[key].instance;
          let value = row[key];

          if (value === null || value === '' || typeof value === 'undefined') continue;

          if (schemaType === 'Number') {
            value = parseFloat(value);
            if (isNaN(value)) continue;
          } else if (schemaType === 'Date') {
            value = new Date(value);
            if (isNaN(value.getTime())) continue;
          }
        }
        cleanedRow[key] = value;
      }
      records.push(cleanedRow);
    })
    .on('end', async (rowCount) => {
      if (records.length === 0) {
        return res.status(400).json({ message: "CSV file is empty or doesn't contain valid data." });
      }

      try {
        await Model.insertMany(records, { ordered: false });
        res.status(201).json({ message: `${rowCount} records successfully imported into ${collection}.` });
      } catch (error) {
        console.error(`❌ Error importing to ${collection}:`, error);
        res.status(500).json({
          message: 'Error during bulk import. Some records may not have been imported.',
          details: error.message
        });
      }
    });
});

module.exports = router; 