const validateStats = (inputs) => {
  const errors = {};
  // Validation for Image (mandatory)
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  if (!inputs.hasOwnProperty('Image') || !urlRegex.test(inputs.Image)) {
    errors.Image = 'The image must be a link';
  }
  // Validation for Name field (mandatory)
  if (!inputs.hasOwnProperty('Name')) {
    errors.Name = 'Name field is mandatory.';
  } else if (!/^[a-z]{3,20}$/.test(inputs.Name)) {
    errors.Name =
      'Name field must contain between 3 and 20 lowercase letters, without spaces or special characters.';
  }

  // Validation for Types field (mandatory)
  if (
    !inputs.hasOwnProperty('Types') ||
    inputs.Types.length < 1 ||
    inputs.Types.length > 2
  ) {
    errors.Types = 'Types field must have between 1 and 2 elements.';
  }
  if (inputs.Types.length === 2 && inputs.Types[0] === inputs.Types[1]) {
    errors.Types = 'Types cannot be the same';
  }

  // Validation for Speed (if exists)
  if (
    inputs.hasOwnProperty('Speed') &&
    inputs.Speed !== '' &&
    (inputs.Speed < 0 || inputs.Speed > 500)
  ) {
    errors.Speed = 'Speed value must be between 1 and 500.';
  }

  // Validation for Weight (if exists)
  if (
    inputs.hasOwnProperty('Weight') &&
    inputs.Weight !== '' &&
    (inputs.Weight < 0 || inputs.Weight > 400)
  ) {
    errors.Weight = 'Weight value must be between 1 and 400.';
  }

  // Validation for Height (if exists)
  if (
    inputs.hasOwnProperty('Height') &&
    inputs.Height !== '' &&
    (inputs.Height < 0 || inputs.Height > 400)
  ) {
    errors.Height = 'Height value must be between 1 and 400.';
  }

  return errors;
};
module.exports = { validateStats };
