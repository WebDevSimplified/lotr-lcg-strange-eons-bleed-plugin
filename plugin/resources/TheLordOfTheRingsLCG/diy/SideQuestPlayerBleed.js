/* COMPONENT CONFIGURATION */
const Card = 'SideQuestPlayerBleed';
const PortraitListKey = new Array('Portrait','Collection','CustomSphere','BodyIcon');//,'CustomSphere','BodyIcon' );
const CARDVERSION = 2;
//2: esferas; a\u00f1adido sheet a drawOption*
function createTemplates( diy ){
	diy.frontTemplateKey = 'SideQuestPlayerBleed-front';
	diy.backTemplateKey = 'SideQuestPlayerBleed-back';
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
	var combo = new Array(
		'Leadership','Lore','Spirit','Tactics','Neutral',
		'Baggins','Fellowship','Mastery','CustomSphere'
	);
	for(let index=0;index<combo.length;index++){
		let item = combo[index];
		combo[index] = ListItem(item,@('LRL-'+item),eval('LRL.'+item+'Icon'));
	}
	Template_list = new comboBox(combo,
		function(){ try{
			switch(String($Template)){
			case 'Neutral':
			case 'CustomSphere':
				hsb = diy.settings.getTint('Template');
				TemplateDeco_tinter.setFactors(hsb[0],hsb[1]*1.2,hsb[2]*0.8);
				break;
			default:
				SphereIconImage = ImageUtils.get('TheLordOfTheRingsLCG/icon/'+$Template+'.png');
				hsb = diy.settings.getTint(checkKey($Template+'-tint'));
				TemplateDeco_tinter.setFactors(hsb[0],hsb[1]*1.2,hsb[2]*0.8);
			}
		}catch(err){} }
	);
	Template_hsb = new HSBPanel();
	BodyIcon_transparency = new slider(1,10,5,[1,@LRL-high,4,@LRL-medium,7,@LRL-low,10,@LRL-opaque],null);
/* ICONS */
	Collection_list = new comboBox(LRL.CollectionCombo.concat(LRL.EncounterSetCombo.slice(3).filter(function(item, index){ var set = LRL.EncounterSetList[index]; return typeof set == 'string' && LRL.CollectionList.indexOf(set) < 0; })),null);
	Collection_panel = new portraitPanel(diy,COLLECTION,@LRL-Collection+': '+@LRL-custom);
/* STATS */
	ResourceCost_list = new comboBox(LRL.combo99,null);
	Progress_list = new comboBox(LRL.combo99,null);
/* TEXT */
	diy.nameField = new textField($Name,12,null);
	Story_text = new textArea($Story,6,50,true);
	Rules_text = new textArea($Rules,10,50,true);
	Condition_text = new textArea($Condition,2,50,true);
	OptionRight_text = new textField($OptionRight,12,null);
	Artist_text = new textField($Artist,12,null);
	Copyright_text = new textField($Copyright,12,null);
	CollectionInfo_text = new textField($CollectionInfo,12,null);
	CollectionNumber_text = new spinner(0,999,1,0,null);
	var RulesTab = new Grid(); 
	RulesTab.editorTabScrolling = true;
	RulesTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',diy.nameField,'growx',
		separator(),'newline,growx',
		LRL.ProgressIcon,'newline,split',Progress_list,'growx',
		LRL.ResourceCostIcon,'split',ResourceCost_list,'growx',
		separator(),'newline,growx',
		@LRL-Story,'newline,center',Story_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',new tipButton(@LRL-Rules-tip),'',Rules_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Condition,'newline,center',Condition_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-OptionRight,'newline,split',OptionRight_text,'growx',
		separator(),'newline,growx'
	);
	RulesTab.addToEditor(editor,@LRL-Rules);
	var TemplateTab = new Grid();
	TemplateTab.editorTabScrolling = true;
	TemplateTab.place(
		separator(),'newline,growx',
			@LRL-Template,'newline,split',Template_list,'growx',
		separator(),'newline,growx',
			Template_hsb,'newline,growx',
			new portraitPanel(diy,CUSTOMSPHERE,@LRL-Sphere+': '+@LRL-custom),'newline,growx',
			new portraitPanel(diy,BODYICON,@LRL-BodyIcon+': '+@LRL-custom),'newline,growx',
			@LRL-transparency,'newline,split',BodyIcon_transparency,'growx',
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
		separator(),'newline,growx'
	);
	CollectionTab.addToEditor(editor,@LRL-Collection);
	var bindings = new Bindings(editor,diy);
	bindings.add('Name',diy.nameField,[0]);
	bindings.add('Story',Story_text,[0]);
	bindings.add('Rules',Rules_text,[0]);
	bindings.add('Condition',Condition_text,[0]);
	bindings.add('OptionRight',OptionRight_text,[0]);
	bindings.add('Progress',Progress_list,[0]);
	bindings.add('ResourceCost',ResourceCost_list,[0]);
	bindings.add('Artist',Artist_text,[0]);
	bindings.add('Copyright',Copyright_text,[0]);
	bindings.add('CollectionInfo',CollectionInfo_text,[0]);
	bindings.add('Collection',Collection_list,[0]);
	bindings.add('CollectionNumber',CollectionNumber_text,[0]);
	bindings.add('Template',Template_list,[0]);
	bindings.add('Template-tint',Template_hsb,[0]);
	bindings.add('BodyIcon-transparency',BodyIcon_transparency,[0]);
	bindings.bind();
	
}
function createFrontPainter( diy, sheet ){
	SphereText_tinter = new TintCache(new TintFilter(),diy.settings.getImageResource(Card+'-tintable-sphereText'));
	SphereColour_tinter = new TintCache(new TintFilter(),diy.settings.getImageResource('tintable-dragonColour'));
	BodyIcon_tinter = new TintCache(new TintFilter(),null);
/* ICONS */
/* STATS */
	ResourceCost_tinter = new TintCache(new TintFilter(),null);
	var hsb = diy.settings.getTint(checkKey('ResourceCost-tint'));
	ResourceCost_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
	Progress_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint('Progress');
	Progress_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
/* TEXT */
	Name_box = markupBox(sheet);
	Name_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	Name_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	OptionRight_box = markupBox(sheet);
	OptionRight_box.defaultStyle = diy.settings.getTextStyle(checkKey('OptionRight-style'),null);
	OptionRight_box.alignment = diy.settings.getTextAlignment(checkKey('OptionRight-alignment'));
	Artist_box = markupBox(sheet);
	Artist_box.defaultStyle = diy.settings.getTextStyle(checkKey('Artist-style'),null);
	Artist_box.alignment = diy.settings.getTextAlignment(checkKey('Artist-alignment'));
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
function paintFront( g, diy, sheet ){

/* PORTRAIT */
	PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
/* TEMPLATE */
	sheet.paintImage(g,'SideQuestPlayerBleed-shadow');
	if($Template == 'CustomSphere'){
		let hsb = diy.settings.getTint('Template-tint');
		SphereText_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		BodyIcon_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,SphereText_tinter.getTintedImage(),checkKey('sphereText-region'));
		BodyIcon_tinter.setImage(PortraitList[BODYICON].getImage());
		sheet.paintImage(g,ImageUtilities.alphaComposite(BodyIcon_tinter.getTintedImage(),Number($BodyIcon-transparency)/10),checkKey('BodyIcon-portrait-clip-region'));
	}else{
		sheet.paintImage(g,checkKey('sphereText'),checkKey('sphereText-region'));
	}
	sheet.paintTemplateImage(g);
	switch(String($Template)){
	case 'Neutral': break;
	case 'CustomSphere':
		sheet.paintImage(g,checkKey('sphereDeco'),checkKey('sphereDeco-region'));
		hsb = diy.settings.getTint('Template-tint');
		SphereColour_tinter.setFactors(hsb[0],hsb[1],(hsb[2]/3)+0.67);
		sheet.paintImage(g,SphereColour_tinter.getTintedImage(),checkKey('sphereColour-region'));
		break;
	default:
		sheet.paintImage(g,checkKey('sphereDeco'),checkKey('sphereDeco-region'));
		hsb = diy.settings.getTint($Template+'-tint');
		SphereColour_tinter.setFactors(hsb[0],hsb[1],(hsb[2]/3)+0.67);
		sheet.paintImage(g,SphereColour_tinter.getTintedImage(),checkKey('sphereColour-region'));
	}
/* ICONS */
	if(diy.settings.getBoolean('LRL-NoBottom',false) === false) paintIcon(COLLECTION,g,sheet);
	paintIcon(CUSTOMSPHERE,g,sheet);
/* STATS */
	ResourceCost_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/'+$ResourceCost+'.png'));
	sheet.paintImage(g,ResourceCost_tinter.getTintedImage(),checkKey('ResourceCost-region'));
	Progress_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/'+$Progress+'.png'));
	sheet.paintImage(g,Progress_tinter.getTintedImage(),checkKey('Progress-region'));
/* TEXTS */
	drawName(g,diy);
	const BODY_SHAPE = new PageShape.CupShape( 0, 30, 269, 0, 0 );
	const BODY_OPTIONRIGHT_SHAPE = new PageShape.CompoundShape(
		BODY_SHAPE,
		363, new PageShape.InsetShape( 0, 56 )
	);
	if(String($OptionRight)!=""){
		Body_box.setPageShape(BODY_OPTIONRIGHT_SHAPE);
	}else{
		Body_box.setPageShape(BODY_SHAPE);
	}
	drawBody(new Array('Story','Rules','Condition'),g,diy);
	drawOptionRight(g,diy,sheet);
	drawArtist(g,diy);
	drawCopyright(g,diy);
	drawCollectionInfo(g,diy);
	drawCollectionNumber(g,diy);
/*FINISH*/
	saveLocalized(diy);
}
if(sourcefile == 'Quickscript'){
	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/diy/LRL-library.js');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/settings/'+Card+'.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-B.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-I.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-P.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-PHD.settings');
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
