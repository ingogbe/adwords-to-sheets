function listAccountsDetailedCampaigns(){
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

		var newAccount = {
			name: account.getName(),
			campaigns: []
		};

		Logger.log("--------------------------");
		Logger.log("Account campaigns: " + newAccount.name);

		// Select the client account.
		MccApp.select(account);

		// Select campaigns under the client account
		var campaignIterator = AdWordsApp.campaigns().get();
		Logger.log("Campaigns: " + campaignIterator.totalNumEntities());
		var campaigns = getCampaigns(campaignIterator);

		var videoCampaignIterator = AdWordsApp.videoCampaigns().get();
		Logger.log("Video Campaigns: " + videoCampaignIterator.totalNumEntities());
		var videoCampaigns = getCampaigns(videoCampaignIterator);

		newAccount.campaigns = newAccount.campaigns.concat(campaigns);
		newAccount.campaigns = newAccount.campaigns.concat(videoCampaigns);
      
      	Logger.log("Loading campaigns: " + ((entitiesCounter * 100) / totalNumEntities) + "%");


		accounts_list.push(newAccount);
	}

	// Switch back to MCC account
	MccApp.select(mccAccount);

	return accounts_list;
}

function formatDate(date) {
	function zeroPad(number) {
		return Utilities.formatString('%02d', number);
	}

	return (date == null) ? 'None' : zeroPad(date.year) + '-' + zeroPad(date.month) + '-' + zeroPad(date.day);
}

function getCampaigns(iterator){

	var campaigns = [];

	while (iterator.hasNext()) {
		var campaign = iterator.next();
		var budget = campaign.getBudget();
		var stats = campaign.getStatsFor("ALL_TIME");

		// Campaign data
		var newCampaign = {
			name: campaign.getName(),
			startDate: formatDate(campaign.getStartDate()),
			endDate: formatDate(campaign.getEndDate()),
			status: campaign.isEnabled() ? "enabled" : campaign.isRemoved() ? "removed" : campaign.isPaused() ? "paused" : "not identified",
			budget: {
				amount: budget.getAmount(),
				totalAmount: budget.getTotalAmount(),
				type: budget.getType(), //(Diário ou Total)
				deliveryMethod: budget.getDeliveryMethod() //(Padrão ou acelerado)
			},
			stats: {
				cost: stats.getCost(),
				clicks: stats.getClicks(),
				impressions: stats.getImpressions(),
				ctr: stats.getCtr(), // em %
				averageCpc: stats.getAverageCpc(),
				averageCpm: stats.getAverageCpm()
			}
		};


		campaigns.push(newCampaign);
	}

	return campaigns;
}