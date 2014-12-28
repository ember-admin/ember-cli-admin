'use strict';

module.exports = function(environment, appConfig) {
	if (!appConfig.EmberENV.appName) {
		appConfig.EmberENV.appName = appConfig.modulePrefix;	
	}
	return appConfig;
};
