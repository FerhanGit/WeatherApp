var Arrow = require('arrow');

var PostBlock = Arrow.Block.extend({
	name: 'postRequest',
	description: 'will reduce data received from API endpoint to get the highest and lowest temperatures after the request',
	action: function (req, resp, next) {
            //req.log.info(resp.getBody());
            req.log.info("Post Request Block executed");
            next();
	}
});

module.exports = PostBlock;
