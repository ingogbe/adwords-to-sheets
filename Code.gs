function main() {

	var SPREADSHEET_URL = 'GOOGLE_SPREADSHEET_URL';

  	var accounts = listAccountsDetailedCampaigns();
  	addClientsCampaigns(accounts, SPREADSHEET_URL);

  	var account_extensions = listAccountsExtensions();
  	addClientsExtensions(account_extensions, SPREADSHEET_URL);

	
}

function addClientsExtensions(account_extensions, SPREADSHEET_URL){

	var extensions_dataRows = [];

	account_extensions.forEach(function(account, account_index){
		account.extensions.forEach(function(extension, extension_index){
			extensions_dataRows.push([
				account.name,
				extension.entityType,
              	extension.text,
              	extension.extensionText,
              	extension.linkText,
              	extension.description1,
              	extension.description2,
              	extension.values,
              	extension.message,
              	extension.phoneNumber,
              	extension.stats.cost,
              	extension.stats.clicks,
              	extension.stats.impressions,
              	extension.stats.ctr,
              	extension.stats.averageCpc,
              	extension.stats.averageCpm
            ]);
        });
	});
  
  	//Open spreadsheet and get tabs
	var ss = openSpreadsheet(SPREADSHEET_URL);
  	var sheet_extensions = ss.getSheetByName('AdwordsExtensions');

  	//Begin - Clear old data
  	var sheet_extensions_rows = sheet_extensions.getDataRange().getNumRows();
    var sheet_extensions_dataRangeClear = 'A2:P' + sheet_extensions_rows;

 	clearSheetDataRange(sheet_extensions, sheet_extensions_dataRangeClear);
	//End - Clear old data


	var adwordsExtensionHeader = [[
		'Account name',
		'Extension entityType',
		'Extension text',
		'Extension extensionText',
		'Extension linkText',
		'Extension description1',
		'Extension description2',
		'Extension values',
		'Extension message',
		'Extension phoneNumber',
		'Extension cost',
		'Extension clicks',
		'Extension impressions',
		'Extension ctr',
		'Extension averageCpc',
		'Extension averageCpm'
	]];
	appendARowRange(sheet_extensions, adwordsExtensionHeader , 'A1:P1');

	if(extensions_dataRows.length > 0){
		var sheet_extensions_dataRangeInsert = 'A2:P' + (extensions_dataRows.length + 1);
		appendARowRange(sheet_extensions, extensions_dataRows ,sheet_extensions_dataRangeInsert);

		var range = sheet_extensions.getRange(sheet_extensions_dataRangeInsert);
		range.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
	}

}


function addClientsCampaigns(accounts, SPREADSHEET_URL){
	var clientes_dataRows = [];
  	var adwordsCampaign_dataRows = [];

  	accounts.forEach(function(account, account_index){
      
      	var totalCost = 0;
      
      	account.campaigns.forEach(function(campaign, campaign_index){
			totalCost = totalCost + campaign.stats.cost;
			adwordsCampaign_dataRows.push([
				account.name,
              	campaign.name,
              	campaign.status,
              	campaign.startDate,
              	campaign.endDate,
              	campaign.stats.cost,
              	campaign.stats.clicks,
              	campaign.stats.impressions,
              	campaign.stats.ctr,
              	campaign.stats.averageCpc,
              	campaign.stats.averageCpm,
              	campaign.budget.amount,
              	campaign.budget.totalAmount,
              	campaign.budget.type,
              	campaign.budget.deliveryMethod
            ]);
        });

        clientes_dataRows.push([account.name, totalCost]);
    });
  
  	//Open spreadsheet and get tabs
	var ss = openSpreadsheet(SPREADSHEET_URL);
  	var sheet_clientes = ss.getSheetByName('Clientes');
  	var sheet_adwordsCampaign = ss.getSheetByName('AdwordsCampaign');

  	//Begin - Clear old data
  	var sheet_clientes_rows = sheet_clientes.getDataRange().getNumRows();
    var sheet_adwordsCampaign_rows = sheet_adwordsCampaign.getDataRange().getNumRows();
  
    var sheet_clientes_dataRangeClear = 'A2:B' + sheet_clientes_rows;
 	var sheet_adwordsCampaign_dataRangeClear = 'A2:O' + sheet_adwordsCampaign_rows;

 	clearSheetDataRange(sheet_clientes, sheet_clientes_dataRangeClear);
	clearSheetDataRange(sheet_adwordsCampaign, sheet_adwordsCampaign_dataRangeClear);
	//End - Clear old data


	//Begin - Insert new data

	var clientesHeader = [[
		'Account name',
		'Total Cost'
	]];
	appendARowRange(sheet_clientes, clientesHeader , 'A1:B1');

	var adwordsCampaignHeader = [[
		'Account name',
		'Campaign Name',
		'Campaign Status',
		'Campaign Start Data',
		'Campaign End Data',
		'Campaign Cost',
		'Campaign Clicks',
		'Campaign Impressions',
		'Campaign CTR (%)',
		'Campaign Avg. CPC',
		'Campaign Avg. CPM',
		'Campaign Budget Amount',
		'Campaign Budget Total Amount',
		'Campaign Budget Type (Total or Daily)',
		'Campaign Budget Delivery Method (Standard or Accelerated)'
	]];
	appendARowRange(sheet_adwordsCampaign, adwordsCampaignHeader , 'A1:O1');


	if(clientes_dataRows.length > 0){
		var sheet_clientes_dataRangeInsert = 'A2:B' + (clientes_dataRows.length + 1);
		appendARowRange(sheet_clientes, clientes_dataRows ,sheet_clientes_dataRangeInsert);
	}

	if(adwordsCampaign_dataRows.length > 0){
		var sheet_adwordsCampaign_dataRangeInsert = 'A2:O' + (adwordsCampaign_dataRows.length + 1);
		appendARowRange(sheet_adwordsCampaign, adwordsCampaign_dataRows, sheet_adwordsCampaign_dataRangeInsert);

		var range = sheet_adwordsCampaign.getRange(sheet_adwordsCampaign_dataRangeInsert);
		range.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
	}
 	
	//End - Insert new data
}



