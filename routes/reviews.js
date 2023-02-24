const express = require('express');
const router = express.Router({mergeParams: true});
const { isLoggedIn, validateReview } = require('../middleware')
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewID', isLoggedIn, catchAsync(reviews.deleteReview));

module.exports = router;