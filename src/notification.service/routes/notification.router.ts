import {createNotification, getNotifications} from '../controllers/notifications.controller';


const express = require('express');
const router = express.Router();

router.post('/notifications', [], createNotification);
router.get('/notifications', [], getNotifications);

export const notificationRouter = router;
