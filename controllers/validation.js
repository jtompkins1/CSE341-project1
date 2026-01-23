const { body, validationResult } = require('express-validator')

const contactValidationRules = () => {
  return [
        // firstName: req.body.firstName,
        // lastName: req.body.lastName,
        // email: req.body.email,
        // favoriteColor: req.body.favoriteColor,
        // birthday: req.body.birthday

    

    body('firstName')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ max: 30 }).withMessage('First name cannot exceed 30 characters'),

    body('lastName')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ max: 30 }).withMessage('Last name cannot exceed 100 characters'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be a valid email address'),

    body('favoriteColor')
        .trim()
        .notEmpty().withMessage('Favorite color is required')
        .isLength({ max: 20 }).withMessage('Favorite color cannot exceed 20 characters'),

    body('birthday')
        .trim()
        .notEmpty().withMessage('Birthday is required')
        .isISO8601().withMessage('Birthday must be a valid date in ISO 8601 format'),
  ]
}

const idValidation = () => {

  param('id')

    .isMongoId()

    .withMessage('Invalid contact ID'),

  validate

}
 


const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    success:false,
    errors: extractedErrors,
  })
}

module.exports = {
  contactValidationRules,
  validate,
  idValidation
}