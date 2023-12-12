const crypto = require('crypto');

const { EMAIL_VERIFICATION_EXPIRY } = require('../constant');
const generateTemporaryToken = () => {
	const unHashedToken = crypto.randomBytes(20).toString('hex');
	const hashedToken = crypto
		.createHash('sha256')
		.update(unHashedToken)
		.digest()
		.toString('hex');
	const emailVerificationExpiry = new Date(
		Date.now() + EMAIL_VERIFICATION_EXPIRY
	);

	return { hashedToken, unHashedToken, emailVerificationExpiry };
};

module.exports = {
	generateTemporaryToken,
};
