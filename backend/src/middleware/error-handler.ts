// Error handling middleware
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CustomError } from '../utils/errors';
import { logger } from '../utils/logger';

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    logger.error('Error:', error);

    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        error: error.message
      });
      return;
    }

    res.status(500).json({
      error: 'Internal server error'
    });
  } catch (err) {
    logger.error('Error in error handler:', err);
    res.status(500).json({
      error: 'Internal server error in error handler'
    });
  }
};