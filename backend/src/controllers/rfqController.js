import { processRFQSubmission, fetchRFQDetails, listAllRFQs } from '../services/rfqService.js';

export const submitRFQ = async (req, res, next) => {
  try {
    const rfqResult = await processRFQSubmission(req.body);
    res.status(201).json({
      success: true,
      message: 'Export RFQ Manifest registered successfully.',
      data: rfqResult
    });
  } catch (err) {
    next(err);
  }
};

export const getRFQByReference = (req, res, next) => {
  try {
    const { referenceId } = req.params;
    const rfq = fetchRFQDetails(referenceId);
    res.json({
      success: true,
      data: rfq
    });
  } catch (err) {
    next(err);
  }
};

export const getAllSubmissions = (req, res, next) => {
  try {
    const all = listAllRFQs();
    res.json({
      success: true,
      count: all.length,
      data: all
    });
  } catch (err) {
    next(err);
  }
};
