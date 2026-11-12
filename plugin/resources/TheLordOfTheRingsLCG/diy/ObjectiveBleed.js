/* COMPONENT CONFIGURATION */
const Card = 'ObjectiveBleed';
const PortraitListKey = new Array('Portrait','Collection','EncounterSet');
const CARDVERSION = 3;
//2: a\u00f1adido Anillo \u00danico*
//3: a\u00f1adido sheet a drawOption*
function createTemplates( diy ){
	diy.frontTemplateKey = 'ObjectiveBleed-front';
	diy.backTemplateKey = 'ObjectiveBleed-back';
	diy.faceStyle = FaceStyle.PLAIN_BACK;
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
/* PORTRAIT */
	Portrait_panel = new portraitPanel(diy,PORTRAIT,@LRL-Portrait);
/* TEMPLATE */
	var combo = new Array('Standard','Nightmare','Burden','TheOneRing','Gold','CustomDifficulty');
	for(let index=0;index<combo.length;index++){
		let item = combo[index];
		combo[index] = ListItem(item,@('LRL-'+item),eval('LRL.'+item+'Icon'));
	}
	Template_list = new comboBox(combo,null);
	Template_hsb = new HSBPanel();
/* ICONS */
	NumberIcon_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint(checkKey('NumberIcon','-tint'));
	NumberIcon_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
	Collection_list = new comboBox(LRL.CollectionCombo.concat(LRL.EncounterSetCombo.slice(3).filter(function(item, index){ var set = LRL.EncounterSetList[index]; return typeof set == 'string' && LRL.CollectionList.indexOf(set) < 0; })),null);
	Collection_panel = new portraitPanel(diy,COLLECTION,@LRL-Collection+': '+@LRL-custom);
	EncounterSet_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet_portrait = new portraitPanel(diy,ENCOUNTERSET,@LRL-EncounterSet+': '+@LRL-custom);
	OptionSpecial_list = new comboBox(LRL.OptionSpecialCombo,null);
/* STATS */
/* TEXT */
	diy.nameField = new textField($Name,12,null);
	Unique_button = new toggleButton('',LRL.UniqueIcon,diy.settings.getBoolean('Unique',false),null);
	Adventure_text = new textField($Adventure,12,null);
	Trait_text = new textField($Trait,12,null);
	Rules_text = new textArea($Rules,10,50,true);
	Shadow_text = new textArea($Shadow,6,50,true);
	Flavour_text = new textArea($Flavour,6,50,true);
	OptionLeft_text = new textField($OptionLeft,12,null);
	OptionRight_text = new textField($OptionRight,12,null);
	EncounterSetNumber_list = new spinner(0,99,1,0,null);
	EncounterSetTotal_list = new spinner(0,99,1,0,null);
	Type_text = new textField($Type,12,null);
	Subtype_text = new textField($Subtype,12,null);
	Artist_text = new textField($Artist,12,null);
	Copyright_text = new textField($Copyright,12,null);
	CollectionInfo_text = new textField($CollectionInfo,12,null);
	CollectionNumber_text = new spinner(0,999,1,0,null);
	var RulesTab = new Grid(); 
	RulesTab.editorTabScrolling = true;
	RulesTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',
		Unique_button,'split',
		diy.nameField,'growx',
		separator(),'newline,growx',
		@LRL-Adventure,'newline,split',
		Adventure_text,'growx',
		separator(),'newline,growx',
		@LRL-Trait,'newline,split',
		new tipButton(@LRL-Trait-tip),'split',
		Trait_text,'growx,split',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',
		new tipButton(@LRL-Rules-tip),'split',
		new tipButton(@LRL-Keyword-tip),'',
		Rules_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Shadow,'newline,center',
		Shadow_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Flavour,'newline,center',
		Flavour_text,'newline,growx',
		separator(),'newline,growx',
		OptionLeft_text,'newline,split,growx',
		@LRL-options,'split',
		new tipButton(@LRL-option-tip),'split',
		OptionRight_text,'split,growx',
		@LRL-OptionSpecial,'newline,split',OptionSpecial_list,'growx',
		separator(),'newline,growx'
	);
	RulesTab.addToEditor(editor,@LRL-Rules);
	var TemplateTab = new Grid();
	TemplateTab.editorTabScrolling = true;
	TemplateTab.place(
		separator(),'newline,growx',
		@LRL-Template,'newline,split',
		Template_list,'growx',
		separator(),'newline,growx',
		Template_hsb,'newline',
		separator(),'newline,growx'
	);
	TemplateTab.addToEditor(editor,@LRL-Template);
	var PortraitTab = new Grid();
	PortraitTab.editorTabScrolling = true;
	PortraitTab.place(
		separator(),'newline,growx',
		Portrait_panel,'newline,growx',
		@LRL-Artist,'newline,split',
		Artist_text,'growx',
		PortraitMirrorButton(),'split',
		separator(),'newline,growx'
	);
	PortraitTab.addToEditor(editor,@LRL-Portrait);
	var EncounterSetTab = new Grid();
	EncounterSetTab.editorTabScrolling = true;
	EncounterSetTab.place(
		separator(),'newline,growx',
		@LRL-EncounterSet,'newline,split',
		EncounterSet_list,'growx',
		EncounterSet_portrait,'newline,growx',
		@LRL-EncounterSetNumber,'newline,split',
		EncounterSetNumber_list,'split',
		@LRL-of,'split',
		EncounterSetTotal_list,'split',
		separator(),'newline,growx'
	);
	EncounterSetTab.addToEditor(editor,@LRL-EncounterSet);
	var CollectionTab = new Grid();
	CollectionTab.editorTabScrolling = true;
	CollectionTab.place(
		separator(),'newline,growx',
		@LRL-Collection,'newline,split',
		Collection_list,'growx',
		Collection_panel,'newline',
		@LRL-CollectionInfo,'newline,split',
		CollectionInfo_text,'growx,split',
		@LRL-CollectionNumber,'split',
		CollectionNumber_text,'',
		separator(),'newline,growx',
		@LRL-Copyright,'newline,split',
		Copyright_text,'growx',
		separator(),'newline,growx',
		@LRL-Type,'newline,split',
		new tipButton(@LRL-Type-tip),'split',
		Type_text,'growx,split',
		@LRL-Subtype,'split',
		new tipButton(@LRL-Subtype-tip),'split',
		Subtype_text,'growx,split',
		separator(),'newline,growx'
	);
	CollectionTab.addToEditor(editor,@LRL-Collection);
	var bindings = new Bindings(editor,diy);
	bindings.add('Name',diy.nameField,[0]);
	bindings.add('Unique',Unique_button,[0]);
	bindings.add('Adventure',Adventure_text,[0]);
	bindings.add('Trait',Trait_text,[0]);
	bindings.add('Rules',Rules_text,[0]);
	bindings.add('Flavour',Flavour_text,[0]);
	bindings.add('Shadow',Shadow_text,[0]);
	bindings.add('OptionSpecial',OptionSpecial_list,[0]);
	bindings.add('OptionLeft',OptionLeft_text,[0]);
	bindings.add('OptionRight',OptionRight_text,[0]);
	bindings.add('Type',Type_text,[0]);
	bindings.add('Subtype',Subtype_text,[0]);
	bindings.add('EncounterSet',EncounterSet_list,[0]);
	bindings.add('EncounterSetNumber',EncounterSetNumber_list,[0]);
	bindings.add('EncounterSetTotal',EncounterSetTotal_list,[0]);
	bindings.add('Template',Template_list,[0]);
	bindings.add('Template-tint',Template_hsb,[0]);
	bindings.add('Artist',Artist_text,[0]);
	bindings.add('Copyright',Copyright_text,[0]);
	bindings.add('CollectionInfo',CollectionInfo_text,[0]);
	bindings.add('Collection',Collection_list,[0]);
	bindings.add('CollectionNumber',CollectionNumber_text,[0]);
	bindings.bind();
}
function createFrontPainter( diy, sheet ){
/* PORTRAIT */
/* TEMPLATE */
	TemplateDeco_tinter = new TintCache(new TintFilter(),diy.settings.getImageResource('tintable-difficultyDeco'));
/* ICONS */
/* STATS */
/* TEXT */
	Name_box = markupBox(sheet);
	Name_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	Name_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	Name_box.setStyleForTag($LRLSymbols-tag,diy.settings.getTextStyle('LRLSymbols',null));
	Adventure_box = markupBox(sheet);
	Adventure_box.defaultStyle = diy.settings.getTextStyle(checkKey('Adventure-style'),null);
	Adventure_box.alignment = diy.settings.getTextAlignment(checkKey('Adventure-alignment'));
	OptionLeft_box = markupBox(sheet);
	OptionLeft_box.defaultStyle = diy.settings.getTextStyle(checkKey('OptionLeft-style'),null);
	OptionLeft_box.alignment = diy.settings.getTextAlignment(checkKey('OptionLeft-alignment'));
	OptionRight_box = markupBox(sheet);
	OptionRight_box.defaultStyle = diy.settings.getTextStyle(checkKey('OptionRight-style'),null);
	OptionRight_box.alignment = diy.settings.getTextAlignment(checkKey('OptionRight-alignment'));
	EncounterSetNumber_box = markupBox(sheet);
	EncounterSetNumber_box.defaultStyle = diy.settings.getTextStyle(checkKey('EncounterSetNumber-style'),null);
	EncounterSetNumber_box.alignment = diy.settings.getTextAlignment(checkKey('EncounterSetNumber-alignment'));
	Artist_box = markupBox(sheet);
	Artist_box.defaultStyle = diy.settings.getTextStyle(checkKey('Artist-style'),null);
	Artist_box.alignment = diy.settings.getTextAlignment(checkKey('Artist-alignment'));
	Type_box = markupBox(sheet);
	Type_box.defaultStyle = diy.settings.getTextStyle(checkKey('Type-style'),null);
	Type_box.alignment = diy.settings.getTextAlignment(checkKey('Type-alignment'));
	Subtype_box = markupBox(sheet);
	Subtype_box.defaultStyle = diy.settings.getTextStyle(checkKey('Subtype-style'),null);
	Subtype_box.alignment = diy.settings.getTextAlignment(checkKey('Subtype-alignment'));
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
	Body_box.defaultStyle = diy.settings.getTextStyle(checkKey('Body-style'),null);
	Body_box.alignment = diy.settings.getTextAlignment(checkKey('Body-alignment'));
	Body_box.setLineTightness($Body-tightness);
	//Body_box.setScalingLimit(0.6);
	for( let index = 0; index < LRL.TagList.length; index++ ){
		let item = LRL.TagList[index];
		Body_box.setReplacementForTag($(item+'-tag'),$(item+'-tag-replacement'));
	}
	for( let index = 0; index < LRL.StyleList.length; index++ ){
		let item = LRL.StyleList[index];
		Body_box.setStyleForTag($(item+'-tag'),diy.settings.getTextStyle(item+'-style',null));
	}
}
function paintFront( g, diy, sheet ){
/* PORTRAIT */
	if(typeof(SE2CARD) != 'undefined'){
		sheet.paintPortrait(g);
	}else{
		switch(String($Template)){
		case 'TheOneRing':
			break;
		default:
			PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
		}
	}
/* TEMPLATE */
	var hsb;
	switch(String($Template)){
	case 'Gold':
		sheet.paintTemplateImage(g);
		hsb = diy.settings.getTint('Gold');
		TemplateDeco_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,TemplateDeco_tinter.getTintedImage(),checkKey('deco-region'));
		break;
	case 'CustomDifficulty':
		sheet.paintTemplateImage(g);
		hsb = diy.settings.getTint('Template');
		TemplateDeco_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,TemplateDeco_tinter.getTintedImage(),checkKey('deco-region'));
		break;
	case 'Nightmare':
		sheet.paintImage(g,'ObjectiveBleed-Nightmare-front-template',0,0);
		break;
	case 'Burden':
		sheet.paintImage(g,'ObjectiveBleed-Burden-front-template',0,0);
		break;
	case 'TheOneRing':
		sheet.paintImage(g,'ObjectiveBleed-TheOneRing-front-template',0,0);
		break;
	default:
		sheet.paintTemplateImage(g);
	}
/* ICONS */
	if(diy.settings.getBoolean('LRL-NoBottom',false) === false) paintIcon(COLLECTION,g,sheet);
	paintOptionSpecial(g,diy,sheet);
	switch(String($Template)){
	case 'TheOneRing':
		break;
	default:
		(($Template == 'Nightmare' || $Template == 'ShipNightmare') && ImageUtils.get('TheLordOfTheRingsLCG-Bleed/icon/black/' + $EncounterSet + '.png', true, true) ? sheet.paintImage(g, ImageUtils.get('TheLordOfTheRingsLCG-Bleed/icon/black/' + $EncounterSet + '.png', true, true), checkKey('EncounterSet-portrait-clip-region')) : paintIcon(ENCOUNTERSET,g,sheet));
	}
/* TEXTS */
	drawName(g,diy);
	switch(String($Template)){
	case 'TheOneRing':
		break;
	default:
		drawAdventure(g,diy);
	}
	drawBodyBleed(new Array('Trait','Rules','Shadow','Flavour'),g,diy);
	drawOptionLeft(g,diy,sheet);
	drawOptionRight(g,diy,sheet);
	drawType(g,diy);
	drawArtist(g,diy);
	drawCopyright(g,diy);
	drawCollectionInfo(g,diy);
	drawCollectionNumber(g,diy);
	switch(String($Template)){
	case 'TheOneRing':
		break;
	case 'Burden':
		drawSubtype(g,diy);
		break;
	default:
		drawSetNumber(g,diy);
	}
/*FINISH*/
	saveLocalized(diy);
}
if(sourcefile == 'Quickscript'){
	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/diy/LRL-library.js');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/settings/'+Card+'.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-B.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-I.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-E.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-EHD.settings');
	GameLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-game');
	InterfaceLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-interface');
	InterfaceLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-icons');
	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.js');
	Eons.namedObjects.LRL = new gameObject();
	LRL = Eons.namedObjects.LRL;
	testDIYScript();
}else{
	useLibrary('res://TheLordOfTheRingsLCG/diy/LRL-library.js');
}

// Print bleed: with no traits, keep a trait line's height above the rules.
function drawBodyBleed( partsArray , g , diy , shape ){
	if( String( diy.settings.get( 'Trait' , '' ) ) != '' || !( $Template == 'Burden' ) ){
		drawBody( partsArray , g , diy , shape ) ;
		return ;
	}
	var text = diy.settings.get( 'LRL-Trait-format' , '<size 111%><b><i>' )
		+ diy.settings.get( 'LRL-Trait-alignment' , '<center>' ) + '\u00a0'
		+ diy.settings.get( 'LRL-Trait-formatEnd' , '</i></b><size 90%>' ) ;
	for( var index = 0 ; index < partsArray.length ; index++ ){
		text = addTextPart( text , partsArray[ index ] , diy ) ;
	}
	if( $( 'LRL-' + Card + '-justified' ) == 'yes' ){ text = text + '<justified>' ; }
	Body_box.markupText = text ;
	updateNameTags( Body_box , diy ) ;
	Body_box.draw( g , diy.settings.getRegion( checkKey( 'Body-region' ) ) ) ;
}
