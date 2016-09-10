'use strict'

import express from 'express';
import controller from './events.controller';

const router = express.Router();

router.get('/all', controller.all);
router.get('/all/:date', controller.date);
router.put('/create', controller.create);
router.put('/update/:id', controller.update)

export default router;