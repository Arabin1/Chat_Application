import profileValidator from '../common/user/profile.middleware.js';
import passwordValidator from '../common/user/password.middleware.js';

const registerValidator = [...profileValidator, ...passwordValidator];

export default registerValidator;
