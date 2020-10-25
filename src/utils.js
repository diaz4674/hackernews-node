const jwt = require("jsonwebtoken");
const APP_SECRET = "Graphql-is-awesome";

function getUserId(context) {
	const Authorization = context.request.get("Authorization");
	if (Authorization) {
		const token = Authorization.replace("bearer ", "");
		const { userId } = jwt.verify(token, APP_SECRET);
		return userId;
	}

	throw new Error("Not authenticated");
}

module.exports = {
	APP_SECRET,
	getUserId,
};
