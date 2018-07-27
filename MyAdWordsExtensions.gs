function listAccountsExtensions(){
	// Keep track of the MCC account for future reference.
	var mccAccount = AdWordsApp.currentAccount();
	Logger.log("MyAccount: " + mccAccount.getName());

	var accountIterator = MccApp.accounts().get();
	var totalNumEntities = accountIterator.totalNumEntities();
    var entitiesCounter = 0;
    Logger.log('Total accounts found : ' + totalNumEntities);

	var accounts_list = [];

	// Iterate through the list of accounts
	while (accountIterator.hasNext()) {
		var account = accountIterator.next();
		entitiesCounter++;

		Logger.log("--------------------------");
		Logger.log("Account extensions: " + account.getName());

		// Select the client account.
		MccApp.select(account);
      	
		var calloutIterator = AdWordsApp.extensions().callouts().get();
		var mobileAppIterator = AdWordsApp.extensions().mobileApps().get();
		var phoneNumberIterator = AdWordsApp.extensions().phoneNumbers().get();
		var sitelinkIterator = AdWordsApp.extensions().sitelinks().get();
		var snippetIterator = AdWordsApp.extensions().snippets().get();
		var messageIterator = AdWordsApp.extensions().messages().get();
		
		var messages = getExtensions(messageIterator);
		Logger.log("Messages: " + messages.length);

		var callouts = getExtensions(calloutIterator);
		Logger.log("Callouts: " + callouts.length);

		var mobileApps = getExtensions(mobileAppIterator);
		Logger.log("MobileApps: " + mobileApps.length);
		
		var phoneNumbers = getExtensions(phoneNumberIterator);
		Logger.log("Phone Numbers: " + phoneNumbers.length);

		var sitelinks = getExtensions(sitelinkIterator);
		Logger.log("Sitelinks: " + sitelinks.length);

		var snippets = getExtensions(snippetIterator);
		Logger.log("Snippets: " + snippets.length);
		
		var extensions = [];

		extensions = extensions.concat(messages);
		extensions = extensions.concat(callouts);
		extensions = extensions.concat(mobileApps);
		extensions = extensions.concat(phoneNumbers);
		extensions = extensions.concat(sitelinks);
		extensions = extensions.concat(snippets);

		var newAccount = {
			name: account.getName(),
			extensions: extensions
		};

		Logger.log("Loading extensions: " + ((entitiesCounter * 100) / totalNumEntities) + "%");

		accounts_list.push(newAccount);

	}

	// Switch back to MCC account
	MccApp.select(mccAccount);

	return accounts_list;
}

function getExtensions(iterator){

	var extensions = [];

	while (iterator.hasNext()) {
		var extension = iterator.next();
		var extensionStats = extension.getStatsFor("ALL_TIME");

		var obj = {
			text: typeof extension.getText === 'function' ? extension.getText() : "",
			extensionText: typeof extension.getExtensionText === 'function' ? extension.getExtensionText() : "",
			linkText: typeof extension.getLinkText === 'function' ? extension.getLinkText() : "",
			description1: typeof extension.getDescription1 === 'function' ? extension.getDescription1() : "",
			description2: typeof extension.getDescription2 === 'function' ? extension.getDescription2() : "",
			values: typeof extension.getValues === 'function' ? extension.getValues() : "",
			message: typeof extension.getMessageText === 'function' ? extension.getMessageText() : "",
			phoneNumber: typeof extension.getPhoneNumber === "function" ? extension.getPhoneNumber() : "",
			entityType: extension.getEntityType(),
			stats: {
				cost: extensionStats.getCost(),
				clicks: extensionStats.getClicks(),
				impressions: extensionStats.getImpressions(),
				ctr: extensionStats.getCtr(), // em %
				averageCpc: extensionStats.getAverageCpc(),
				averageCpm: extensionStats.getAverageCpm()
			}
		}

		//Logger.log(obj);
		extensions.push(obj);
	}

	return extensions;
}