class ApiResponse {
	constructor(message = 'success', statusCode, data) {
		this.message = message;
		this.data = data;
		this.statusCode = statusCode;
		this.success = statusCode < 400;
	}
}
module.exports = ApiResponse;
