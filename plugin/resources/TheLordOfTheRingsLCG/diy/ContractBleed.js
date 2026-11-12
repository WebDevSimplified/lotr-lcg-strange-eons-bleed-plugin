/* COMPONENT CONFIGURATION */
const Card = 'ContractBleed';
const PortraitListKey = new Array('Portrait','Collection');
const CARDVERSION = 1;
function createTemplates( diy ){
	diy.frontTemplateKey = 'ContractBleed-front';
	diy.backTemplateKey = 'ContractBleed-back';
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
/* PORTRAIT */
	Portrait_panel = new portraitPanel(diy,PORTRAIT,@LRL-Portrait);
/* TEMPLATE */
	var combo = new Array(
		'SingleSided','DoubleSided'
	);
	for(let index=0;index<combo.length;index++){
		let item = combo[index];
		combo[index] = ListItem(item,@('LRL-'+item),eval('LRL.'+item+'Icon'));
	}
	Template_list = new comboBox(combo, null );
/* ICONS */
	Collection_list = new comboBox(LRL.CollectionCombo.concat(LRL.EncounterSetCombo.slice(3).filter(function(item, index){ var set = LRL.EncounterSetList[index]; return typeof set == 'string' && LRL.CollectionList.indexOf(set) < 0; })),null);
	Collection_panel = new portraitPanel(diy,COLLECTION,@LRL-Collection+': '+@LRL-custom);
/* STATS */
/* TEXT */
	diy.nameField = new textField($Name,12,null);
//	Trait_text = new textField($Trait,12,null);
	Rules_text = new textArea($Rules,10,50,true);
	Flavour_text = new textArea($Flavour,6,50,true);
	RulesBack_text = new textArea($RulesBack,10,50,true);
	FlavourBack_text = new textArea($FlavourBack,6,50,true);
	Type_text = new textField($Type,12,null);
	SideA_text = new textField($SideA,12,null);
	SideB_text = new textField($SideB,12,null);
	Artist_text = new textField($Artist,12,null);
	Copyright_text = new textField($Copyright,12,null);
	CollectionInfo_text = new textField($CollectionInfo,12,null);
	CollectionNumber_text = new spinner(0,999,1,0,null);
	var RulesTab = new Grid();
	RulesTab.editorTabScrolling = true;
	RulesTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',diy.nameField,'growx',
//		separator(),'newline,growx',
//		@LRL-Trait,'newline,split',new tipButton(@LRL-Trait-tip),'split',Trait_text,'growx,split',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',new tipButton(@LRL-Rules-tip),'',Rules_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Flavour,'newline,center',Flavour_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',new tipButton(@LRL-Rules-tip),'',RulesBack_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Flavour,'newline,center',FlavourBack_text,'newline,growx',
		separator(),'newline,growx'
	);
	RulesTab.addToEditor(editor,@LRL-Rules);
	var TemplateTab = new Grid();
	TemplateTab.editorTabScrolling = true;
	TemplateTab.place(
		separator(),'newline,growx',
		@LRL-Template,'newline,split',Template_list,'growx',
//		separator(),'newline,growx',
//		Template_hsb,'newline,growx',
//		CustomSphere_portrait,'newline,growx',
		separator(),'newline,growx'
	);
	TemplateTab.addToEditor(editor,@LRL-Template);
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
	var CollectionTab = new Grid(); 
	CollectionTab.editorTabScrolling = true;
	CollectionTab.place(
		separator(),'newline,growx',
		@LRL-Collection,'newline,split',Collection_list,'growx',
		Collection_panel,'newline',
		@LRL-CollectionInfo,'newline,split',CollectionInfo_text,'growx,split',
		@LRL-CollectionNumber,'split',CollectionNumber_text,'',
		separator(),'newline,growx',
		@LRL-Copyright,'newline,split',Copyright_text,'growx',
		separator(),'newline,growx',
		@LRL-Type,'newline,split',new tipButton(@LRL-Type-tip),'split',Type_text,'growx,split',
		@LRL-SideA,'newline,split',SideA_text,'growx,split',
		@LRL-SideB,'newline,split',SideB_text,'growx,split',
		separator(),'newline,growx'
	);
	CollectionTab.addToEditor(editor,@LRL-Collection);
	var bindings = new Bindings(editor,diy);
	bindings.add('Name',diy.nameField,[0,1]);
//	bindings.add('Trait',Trait_text,[0]);
	bindings.add('Rules',Rules_text,[0]);
	bindings.add('Flavour',Flavour_text,[0]);
	bindings.add('RulesBack',RulesBack_text,[1]);
	bindings.add('FlavourBack',FlavourBack_text,[1]);
	bindings.add('Type',Type_text,[0,1]);
	bindings.add('SideA',SideA_text,[0]);
	bindings.add('SideB',SideB_text,[1]);
	bindings.add('Template',Template_list,[0,1]);
	bindings.add('Artist',Artist_text,[0,1]);
	bindings.add('Copyright',Copyright_text,[0,1]);
	bindings.add('CollectionNumber',CollectionNumber_text,[0,1]);
	bindings.add('Collection',Collection_list,[0,1]);
	bindings.add('CollectionInfo',CollectionInfo_text,[0,1]);
	bindings.bind();
}
function createFrontPainter( diy, sheet ){
/* PORTRAIT */
/* TEMPLATE */
//	SphereColour_tinter = new TintCache(new TintFilter(),diy.settings.getImageResource('tintable-sphereColour'));
/* ICONS */
/* TEXT */
	Name_box = markupBox(sheet);
	Name_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	Name_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
//	OptionLeft_box = markupBox(sheet);
//	OptionLeft_box.defaultStyle = diy.settings.getTextStyle(checkKey('OptionLeft-style'),null);
//	OptionLeft_box.alignment = diy.settings.getTextAlignment(checkKey('OptionLeft-alignment'));
//	OptionRight_box = markupBox(sheet);
//	OptionRight_box.defaultStyle = diy.settings.getTextStyle(checkKey('OptionRight-style'),null);
//	OptionRight_box.alignment = diy.settings.getTextAlignment(checkKey('OptionRight-alignment'));
	Artist_box = markupBox(sheet);
	Artist_box.defaultStyle = diy.settings.getTextStyle(checkKey('Artist-style'),null);
	Artist_box.alignment = diy.settings.getTextAlignment(checkKey('Artist-alignment'));
	Type_box = markupBox(sheet);
	Type_box.defaultStyle = diy.settings.getTextStyle(checkKey('Type-style'),null);
	Type_box.alignment = diy.settings.getTextAlignment(checkKey('Type-alignment'));
	Side_box = markupBox(sheet);
	Side_box.defaultStyle = diy.settings.getTextStyle(checkKey('Side-style'),null);
	Side_box.alignment = diy.settings.getTextAlignment(checkKey('Side-alignment'));
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
/* TEMPLATE */
}
function paintFront( g, diy, sheet ){
/* PORTRAIT */
	PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
/* TEMPLATE */
	sheet.paintTemplateImage(g);
	if(String($Template)=='DoubleSided'){sheet.paintImage(g,'ContractBleed-sideDeco',25,25);}
/* ICONS */
	if(diy.settings.getBoolean('LRL-NoBottom',false) === false) paintIcon(COLLECTION,g,sheet);
/* TEXTS */
	drawName(g,diy);
	drawBody(new Array('Rules','Flavour'),g,diy);
	drawType(g,diy);
	drawArtist(g,diy);
	drawCopyright(g,diy);
	drawCollectionInfo(g,diy);
	drawCollectionNumber(g,diy);
	if(String($Template)=='DoubleSided'){
		if($SideA != ''){ Side_box.markupText = $SideA;
		}else{ Side_box.markupText = #LRL-SideA; }
		Side_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('Side-region')));
	}
/*FINISH*/
	saveLocalized(diy);
}
function paintBack( g, diy, sheet ){
	if(String($Template)=='DoubleSided'){
	/* PORTRAIT */
		PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
	/* TEMPLATE */
		sheet.paintImage(g,'ContractBleed-front-template',0,0);
		sheet.paintImage(g,'ContractBleed-sideDeco',25,25);
	/* ICONS */
		if(diy.settings.getBoolean('LRL-NoBottom',false) === false) paintIcon(COLLECTION,g,sheet);
	/* TEXTS */
		drawName(g,diy);
		drawBody(new Array('RulesBack','FlavourBack'),g,diy);
		drawType(g,diy);
		drawArtist(g,diy);
		drawCopyright(g,diy);
		drawCollectionInfo(g,diy);
		drawCollectionNumber(g,diy);
		if($SideB != ''){ Side_box.markupText = $SideB;
		}else{ Side_box.markupText = #LRL-SideB; }
		Side_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('Side-region')));
	}else{
		sheet.paintTemplateImage(g);
	}
/*FINISH*/
	saveLocalized(diy);
}
if(sourcefile == 'Quickscript'){
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/settings/'+Card+'.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-B.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-I.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-P.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-PHD.settings');
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
