module.exports = {
	isLoggedIn : function(req){
		return req.session ? !!req.session.user : false;
	},

	checkUser : function (req, res, next){
		if(isLoggedIn(req)){
			next();
		} else {
			res.redirect('/client/signin.html');
		}
	},

	createSession : function(req, res, newUser) {
		return req.session.regenerate(function() {
			req.session.user = newUser; 
			res.redirect('/client/selectSubject.html');
		})
	}

}