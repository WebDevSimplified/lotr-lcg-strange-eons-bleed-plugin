const Card = 'CampaignBleed';
const PortraitListKey = new Array('Portrait','Collection','EncounterSet');
const CARDVERSION = 1;
function createTemplates( diy ){
	diy.frontTemplateKey = 'CampaignBleed-front';
	diy.backTemplateKey = 'CampaignBleed-back';
	diy.faceStyle = FaceStyle.TWO_FACES;
	// Print bleed: the frames include a 1/6" (12pt) bleed on every side.
	diy.bleedMargin = 12 ;
	diy.extensionName = 'TheLordOfTheRingsLCG-Bleed.seext' ;
	diy.settings.reset('LRL-Flavour-alignment') ;
	diy.settings.set('LRL-Flavour-format', '<image res://TheLordOfTheRingsLCG/image/empty1x1.png 1pt 2pt>\n<size 80%><i>') ;
	diy.settings.set('LRL-Shadow-format', '<center><image res://TheLordOfTheRingsLCG/image/ShadowSeparator.png ' + diy.settings.get('ShadowSeparatorSize', '1.5') + 'in>\n<size 103%><i>') ;
	diy.settings.set('LRL-Shadow-formatEnd', '</i><size 97.087%>') ;
	diy.settings.set('LRL-Shadow-alignment', '<left>') ;
}
function createInterface( diy, editor, sheet ){
	var bindings = new Bindings(editor,diy);
	Portrait_panel = new portraitPanel(diy,PORTRAIT,@LRL-Portrait);
	diy.nameField = new textField($Name,12,null);
	bindings.add('Name',diy.nameField,[0]);
	Cycle_text = new textField($Cylce,12,null);
	bindings.add('Cycle',Cycle_text,[0]);
	Rules_text = new textArea($Rules,10,50,true);
	bindings.add('Rules',Rules_text,[0]);
	Flavour_text = new textArea($Flavour,6,50,true);
	bindings.add('Flavour',Flavour_text,[0]);
	Type_text = new textField($Type,12,null);
	bindings.add('Type',Type_text,[0]);
	EncounterSet_list = new comboBox(LRL.EncounterSetCombo,null);
	bindings.add('EncounterSet',EncounterSet_list,[0]);
	Artist_text = new textField($Artist,12,null);
	bindings.add('Artist',Artist_text,[0]);
	Copyright_text = new textField($Copyright,12,null);
	bindings.add('Copyright',Copyright_text,[0]);
	CollectionNumber_text = new spinner(0,999,1,0,null);
	bindings.add('CollectionNumber',CollectionNumber_text,[0]);
	Collection_list = new comboBox(LRL.CollectionCombo.concat(LRL.EncounterSetCombo.slice(3).filter(function(item, index){ var set = LRL.EncounterSetList[index]; return typeof set == 'string' && LRL.CollectionList.indexOf(set) < 0; })),null);
	bindings.add('Collection',Collection_list,[0]);
	CollectionInfo_text = new textField($CollectionInfo,12,null);
	bindings.add('CollectionInfo',CollectionInfo_text,[0]);
	StoryBack_text = new textArea($StoryBack,6,50,true);
	bindings.add('StoryBack',StoryBack_text,[1]);
	RulesBack_text = new textArea($RulesBack,10,50,true);
	bindings.add('RulesBack',RulesBack_text,[1]);
	FlavourBack_text = new textArea($FlavourBack,6,50,true);
	bindings.add('FlavourBack',FlavourBack_text,[1]);
	
	var RulesFrontTab = new Grid(); 
	RulesFrontTab.editorTabScrolling = true;
	RulesFrontTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',diy.nameField,'growx',
		separator(),'newline,growx',
		@LRL-Cycle,'newline,split',Cycle_text,'growx',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',new tipButton(@LRL-Rules-tip),'',Rules_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Flavour,'newline,center',Flavour_text,'newline,growx',
		separator(),'newline,growx'
	);
	RulesFrontTab.addToEditor(editor,@LRL-Rules+': '+@LRL-front);
	
	var RulesBackTab = new Grid(); 
	RulesBackTab.editorTabScrolling = true;
	RulesBackTab.place(
		separator(),'newline,growx',
		@LRL-Story,'newline,center',StoryBack_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',new tipButton(@LRL-Rules-tip),'',RulesBack_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Flavour,'newline,center',FlavourBack_text,'newline,growx',
		separator(),'newline,growx'
	);
	RulesBackTab.addToEditor(editor,@LRL-Rules+': '+@LRL-back);
	
	var PortraitTab = new Grid();
	PortraitTab.editorTabScrolling = true;
	PortraitTab.place(
		separator(),'newline,growx',
		Portrait_panel,'newline,growx',
		@LRL-Artist,'newline,split',Artist_text,'growx',
		PortraitMirrorButton(),'split',
		separator(),'newline,growx'
	);
	PortraitTab.addToEditor(editor,@LRL-Portrait);
	
	var EncounterSetTab = new Grid();
	EncounterSetTab.editorTabScrolling = true;
	EncounterSetTab.place(
		separator(),'newline,growx',
		@LRL-EncounterSet,'newline,split',EncounterSet_list,'growx',
		new portraitPanel(diy,ENCOUNTERSET,@LRL-EncounterSet+': '+@LRL-custom),'newline',
		separator(),'newline,growx'
	);
	EncounterSetTab.addToEditor(editor,@LRL-EncounterSet);
	
	var CollectionTab = new Grid();
	CollectionTab.editorTabScrolling = true;
	CollectionTab.place(
		separator(),'newline,growx',
		@LRL-Collection,'newline,split',Collection_list,'growx',
		new portraitPanel(diy,COLLECTION,@LRL-Collection+': '+@LRL-custom),'newline',
		@LRL-CollectionInfo,'newline,split',CollectionInfo_text,'growx,split',
		@LRL-CollectionNumber,'split',CollectionNumber_text,'',
		separator(),'newline,growx',
		@LRL-Copyright,'newline,split',Copyright_text,'growx',
		separator(),'newline,growx',
		@LRL-Type,'newline,split',new tipButton(@LRL-Type-tip),'split',Type_text,'growx,split',
		separator(),'newline,growx'
	);
	CollectionTab.addToEditor(editor,@LRL-Collection);

	bindings.bind();
}
function createFrontPainter( diy, sheet ){
	NumberIcon_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint(checkKey('NumberIcon','-tint'));
	NumberIcon_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
	Name_box = markupBox(sheet);
	Name_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	Name_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	Cycle_box = markupBox(sheet);
	Cycle_box.defaultStyle = diy.settings.getTextStyle(checkKey('Cycle-style'),null);
	Cycle_box.alignment = diy.settings.getTextAlignment(checkKey('Cycle-alignment'));
	Artist_box = markupBox(sheet);
	Artist_box.defaultStyle = diy.settings.getTextStyle(checkKey('Artist-style'),null);
	Artist_box.alignment = diy.settings.getTextAlignment(checkKey('Artist-alignment'));
	Type_box = markupBox(sheet);
	Type_box.defaultStyle = diy.settings.getTextStyle(checkKey('Type-style'),null);
	Type_box.alignment = diy.settings.getTextAlignment(checkKey('Type-alignment'));
	Copyright_box = markupBox(sheet);
	Copyright_box.defaultStyle = diy.settings.getTextStyle(checkKey('Copyright-style'),null);
	Copyright_box.alignment = diy.settings.getTextAlignment(checkKey('Copyright-alignment'));
	CollectionInfo_box = markupBox(sheet);
	CollectionInfo_box.defaultStyle = diy.settings.getTextStyle(checkKey('CollectionInfo-style'),null);
	CollectionInfo_box.alignment = diy.settings.getTextAlignment(checkKey('CollectionInfo-alignment'));
	CollectionNumber_box = markupBox(sheet);
	CollectionNumber_box.defaultStyle = diy.settings.getTextStyle(checkKey('CollectionNumber-style'),null);
	CollectionNumber_box.alignment = diy.settings.getTextAlignment(checkKey('CollectionNumber-alignment'));
	Body_box = markupBox(sheet);
	Body_box.defaultStyle = diy.settings.getTextStyle(checkKey('Body','-style'),null);
	Body_box.alignment = diy.settings.getTextAlignment(checkKey('Body','-alignment'));
	Body_box.setLineTightness($Body-tightness);
	for( let index = 0; index < LRL.TagList.length; index++ ){
		let item = LRL.TagList[index];
		Body_box.setReplacementForTag($(item+'-tag'),$(item+'-tag-replacement'));
	}
	for( let index = 0; index < LRL.StyleList.length; index++ ){
		let item = LRL.StyleList[index];
		Body_box.setStyleForTag($(item+'-tag'),diy.settings.getTextStyle(item+'-style',null));
	}
}
function createBackPainter( diy, sheet ){
	BodyBack_box = markupBox(sheet);
	BodyBack_box.defaultStyle = diy.settings.getTextStyle(checkKey('Body','-style'),null);
	BodyBack_box.alignment = diy.settings.getTextAlignment(checkKey('Body','-alignment'));
	BodyBack_box.setLineTightness($Body-tightness);
	for( let index = 0; index < LRL.TagList.length; index++ ){
		let item = LRL.TagList[index];
		BodyBack_box.setReplacementForTag($(item+'-tag'),$(item+'-tag-replacement'));
	}
	for( let index = 0; index < LRL.StyleList.length; index++ ){
		let item = LRL.StyleList[index];
		BodyBack_box.setStyleForTag($(item+'-tag'),diy.settings.getTextStyle(item+'-style',null));
	}
}
function paintFront( g, diy, sheet ){
/* PORTRAIT */
	PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
/* TEMPLATE */
	sheet.paintTemplateImage(g);
/* ICONS */
	if(diy.settings.getBoolean('LRL-NoBottom',false) === false) paintIcon(COLLECTION,g,sheet);
	(($Template == 'Nightmare' || $Template == 'ShipNightmare') && ImageUtils.get('TheLordOfTheRingsLCG-Bleed/icon/black/' + $EncounterSet + '.png', true, true) ? sheet.paintImage(g, ImageUtils.get('TheLordOfTheRingsLCG-Bleed/icon/black/' + $EncounterSet + '.png', true, true), checkKey('EncounterSet-portrait-clip-region')) : paintIcon(ENCOUNTERSET,g,sheet));
/* TEXTS */
	drawName(g,diy);
	drawCycle(g,diy);
	drawBody(new Array('Rules','Flavour'),g,diy);
	drawType(g,diy);
	drawArtist(g,diy);
	drawCopyright(g,diy);
	drawCollectionInfo(g,diy);
	drawCollectionNumber(g,diy);
/*FINISH*/
	saveLocalized(diy);
}
function paintBack( g, diy, sheet ){
/* TEMPLATE */
	sheet.paintTemplateImage(g);
/* TEXTS */
	drawBodyBack(new Array('StoryBack','RulesBack','FlavourBack'),g,diy);
/*FINISH*/
	saveLocalized(diy);
}
if(sourcefile == 'Quickscript'){
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/settings/'+Card+'.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-B.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-I.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-V.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-VHD.settings');
	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.js');
	Eons.namedObjects.LRL = new gameObject();
	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/diy/LRL-library.js');
	GameLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-game');
	InterfaceLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-interface');
	InterfaceLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-icons');
	testDIYScript();
}else{
	useLibrary('res://TheLordOfTheRingsLCG/diy/LRL-library.js');
}
