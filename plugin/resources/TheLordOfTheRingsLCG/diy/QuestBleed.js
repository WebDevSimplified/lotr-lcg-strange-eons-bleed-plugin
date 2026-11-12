/* COMPONENT CONFIGURATION */
const Card = 'QuestBleed';
const PortraitListKey = new Array(
	'Portrait','Collection','EncounterSet',
	'PortraitBack','EncounterSet1','EncounterSet2',
	'EncounterSet3','EncounterSet4','EncounterSet5' );
const CARDVERSION = 2;
//2: a\u00f1adido sheet a drawOption*
function createTemplates( diy ){
	diy.frontTemplateKey = 'QuestBleed-front';
	diy.backTemplateKey = 'QuestBleed-back';
	diy.faceStyle = FaceStyle.TWO_FACES;
	// Print bleed: the frames include a 1/6" (12pt) bleed on every side.
	diy.bleedMargin = 12 ;
	diy.extensionName = 'TheLordOfTheRingsLCG-Bleed.seext' ;
	diy.settings.reset('LRL-Flavour-alignment') ;
	diy.settings.set('LRL-Flavour-format', '<image res://TheLordOfTheRingsLCG/image/empty1x1.png 1pt 2pt>\n<size 80%><i>') ;
	diy.settings.set('LRL-Shadow-format', '<center><image res://TheLordOfTheRingsLCG/image/ShadowSeparator.png ' + diy.settings.get('ShadowSeparatorSize', '1.5') + 'in>\n<size 103%><i>') ;
	diy.settings.set('LRL-Shadow-formatEnd', '</i><size 97.087%>') ;
	diy.settings.set('LRL-Shadow-alignment', '<left>') ;
	diy.settings.set('LRL-Story-format', '<i>') ;
	diy.settings.set('LRL-Story-formatEnd', '</i>') ;
}
function createInterface( diy, editor, sheet ){
/* PORTRAIT */
	Portrait_panel = new portraitPanel(diy,PORTRAIT,@LRL-Portrait+': '+@LRL-front);
	if( diy.settings.get('QuestTint',null) == null ) diy.settings.set('QuestTint',questTint(diy));
	QuestTint_list = new comboBox([new ca.cgjennings.apps.arkham.diy.ListItem('none','No Tint'),new ca.cgjennings.apps.arkham.diy.ListItem('original','Original Tint'),new ca.cgjennings.apps.arkham.diy.ListItem('new','New Tint')],null);
	PortraitBack_panel = new portraitPanel(diy,PORTRAITBACK,@LRL-Portrait+': '+@LRL-back);
	PortraitBackMirror_button = new repeaterButton(@LRL-mirror,'',
		function(){
			PortraitList[PORTRAITBACK].setImage(
				PortraitList[PORTRAITBACK].getSource(),
				ImageUtils.mirror(PortraitList[PORTRAITBACK].getImage(),true,false)
			);
			PortraitBack_panel.updatePanel();
		}
	);
	PortraitShare_button = new toggleButton(@LRL-share,'',diy.settings.getBoolean('PortraitShare',true),null);
/* TEMPLATE */
	var combo = new Array('Standard','Gold','Nightmare','CustomDifficulty');
	for(let index=0;index<combo.length;index++){
		let item = combo[index];
		combo[index] = ListItem(item,@('LRL-'+item),eval('LRL.'+item+'Icon'));
	}
	Template_list = new comboBox(combo,null);
	Template_hsb = new HSBPanel();
/* ICONS */
	Collection_list = new comboBox(LRL.CollectionCombo.concat(LRL.EncounterSetCombo.slice(3).filter(function(item, index){ var set = LRL.EncounterSetList[index]; return typeof set == 'string' && LRL.CollectionList.indexOf(set) < 0; })),null);
	Collection_panel = new portraitPanel(diy,COLLECTION,@LRL-Collection+': '+@LRL-custom);
	EncounterSet_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet_portrait = new portraitPanel(diy,ENCOUNTERSET,@LRL-EncounterSet+': '+@LRL-custom);
	EncounterSet1_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet1_portrait = new portraitPanel(diy,ENCOUNTERSET1,@LRL-EncounterSet+' 1: '+@LRL-custom);
	EncounterSet2_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet2_portrait = new portraitPanel(diy,ENCOUNTERSET2,@LRL-EncounterSet+' 2: '+@LRL-custom);
	EncounterSet3_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet3_portrait = new portraitPanel(diy,ENCOUNTERSET3,@LRL-EncounterSet+' 3: '+@LRL-custom);
	EncounterSet4_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet4_portrait = new portraitPanel(diy,ENCOUNTERSET4,@LRL-EncounterSet+' 4: '+@LRL-custom);
	EncounterSet5_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet5_portrait = new portraitPanel(diy,ENCOUNTERSET5,@LRL-EncounterSet+' 5: '+@LRL-custom);
/* STATS */
	Stage_list = new spinner(0,9,1,1,null);
	Progress_list = new comboBox(LRL.combo99,null);
/* TEXT */
	diy.nameField = new textField($Name,12,null);
	Adventure_text = new textField($Adventure,12,null);
	Story_text = new textArea($Story,6,50,true);
	Rules_text = new textArea($Rules,10,50,true);
	Condition_text = new textArea($Condition,2,50,true);
	OptionRight_text = new textField($OptionRight,12,null);
	Type_text = new textField($Type,12,null);
	Artist_text = new textField($Artist,12,null);
	Copyright_text = new textField($Copyright,12,null);
	CollectionInfo_text = new textField($CollectionInfo,12,null);
	CollectionNumber_text = new spinner(0,999,1,0,null);
	NameBack_text = new textField($NameBack,12,null);
	StoryBack_text = new textArea($StoryBack,6,50,true);
	RulesBack_text = new textArea($RulesBack,10,50,true);
	ConditionBack_text = new textArea($ConditionBack,2,50,true);
	ArtistBack_text = new textField($ArtistBack,12,null);
	NameShare_button = new toggleButton(@LRL-share,'',diy.settings.getBoolean('NameShare',true),null);
	CollectionNumberHide_button = new toggleButton(@LRL-hide,'',diy.settings.getBoolean('CollectionNumberHide',false),null);
	var RulesFrontTab = new Grid(); 
	RulesFrontTab.editorTabScrolling = true;
	RulesFrontTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',
		diy.nameField,'growx',
		separator(),'newline,growx',
		@LRL-Adventure,'newline,split',
		Adventure_text,'growx',
		separator(),'newline,growx',
		@LRL-Stage,'newline,split',
		Stage_list,'growx',
		separator(),'newline,growx',
		@LRL-Story,'newline,center',
		Story_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',
		new tipButton(@LRL-Rules-tip),'split',
		new tipButton(@LRL-Keyword-tip),'',
		Rules_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Condition,'newline,center',
		Condition_text,'newline,growx',
		separator(),'newline,growx'
	);
	RulesFrontTab.addToEditor(editor,@LRL-Rules+': '+@LRL-front);
	var RulesBackTab = new Grid(); 
	RulesBackTab.editorTabScrolling = true;
	RulesBackTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',
		NameBack_text,'growx',
		NameShare_button,'split',
		separator(),'newline,growx',
		LRL.ProgressIcon,'newline,split',
		Progress_list,'growx',
		separator(),'newline,growx',
		@LRL-Story,'newline,center',
		StoryBack_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',
		new tipButton(@LRL-Rules-tip),'split',
		new tipButton(@LRL-Keyword-tip),'',
		RulesBack_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Condition,'newline,center',
		ConditionBack_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-OptionRight,'newline,split',
		new tipButton(@LRL-option-tip),'split',
		OptionRight_text,'split,growx',
		separator(),'newline,growx'
	);
	RulesBackTab.addToEditor(editor,@LRL-Rules+': '+@LRL-back);
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
		QuestTint_list,'split',
		separator(),'newline,growx',
		PortraitBack_panel,'newline,growx',
		@LRL-Artist,'newline,split',
		ArtistBack_text,'growx',
		PortraitBackMirror_button,'split',
		PortraitShare_button,'split',
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
		separator(),'newline,growx',
		@LRL-EncounterSet1,'newline,split',
		EncounterSet1_list,'growx',
		EncounterSet1_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-EncounterSet2,'newline,split',
		EncounterSet2_list,'growx',
		EncounterSet2_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-EncounterSet3,'newline,split',
		EncounterSet3_list,'growx',
		EncounterSet3_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-EncounterSet4,'newline,split',
		EncounterSet4_list,'growx',
		EncounterSet4_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-EncounterSet5,'newline,split',
		EncounterSet5_list,'growx',
		EncounterSet5_portrait,'newline,growx',
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
		CollectionNumber_text,'split',
		CollectionNumberHide_button,'',
		separator(),'newline,growx',
		@LRL-Copyright,'newline,split',
		Copyright_text,'growx',
		separator(),'newline,growx'
	);
	CollectionTab.addToEditor(editor,@LRL-Collection);
	var bindings = new Bindings(editor,diy);
	bindings.add('Stage',Stage_list,[0,1]);
	bindings.add('Progress',Progress_list,[1]);
	bindings.add('Template',Template_list,[0,1]);
	bindings.add('Template-tint',Template_hsb,[0,1]);
	bindings.add('Name',diy.nameField,[0,1]);
	bindings.add('NameBack',NameBack_text,[1]);
	bindings.add('NameShare',NameShare_button,[1]);
	bindings.add('ArtistBack',ArtistBack_text,[1]);
	bindings.add('Adventure',Adventure_text,[0,1]);
	bindings.add('Story',Story_text,[0]);
	bindings.add('Rules',Rules_text,[0]);
	bindings.add('Condition',Condition_text,[0]);
	bindings.add('EncounterSet',EncounterSet_list,[0,1]);
	bindings.add('EncounterSet1',EncounterSet1_list,[0]);
	bindings.add('EncounterSet2',EncounterSet2_list,[0]);
	bindings.add('EncounterSet3',EncounterSet3_list,[0]);
	bindings.add('EncounterSet4',EncounterSet4_list,[0]);
	bindings.add('EncounterSet5',EncounterSet5_list,[0]);
	bindings.add('PortraitShare',PortraitShare_button,[1]);
	bindings.add('QuestTint',QuestTint_list,[0]);
	bindings.add('StoryBack',StoryBack_text,[1]);
	bindings.add('RulesBack',RulesBack_text,[1]);
	bindings.add('ConditionBack',ConditionBack_text,[1]);
	bindings.add('OptionRight',OptionRight_text,[1]);
	bindings.add('Artist',Artist_text,[0,1]);
	bindings.add('Copyright',Copyright_text,[0,1]);
	bindings.add('CollectionInfo',CollectionInfo_text,[0,1]);
	bindings.add('Collection',Collection_list,[0,1]);
	bindings.add('CollectionNumberHide',CollectionNumberHide_button,[0]);
	bindings.add('CollectionNumber',CollectionNumber_text,[0,1]);
	bindings.bind();
}
function createFrontPainter( diy, sheet ){
/* TEMPLATE */
	DifficultyDeco_tinter = new TintCache(new TintFilter(),
		diy.settings.getImageResource('tintable-difficultyDeco')
	);
/* STATS */
	NumberIcon_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint(checkKey('NumberIcon','-tint'));
	NumberIcon_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
	Stage_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint('Stage-tint');
	Stage_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
/* TEXT */
	Name_box = markupBox(sheet);
	Name_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	Name_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	Adventure_box = markupBox(sheet);
	Adventure_box.defaultStyle = diy.settings.getTextStyle(checkKey('Adventure-style'),null);
	Adventure_box.alignment = diy.settings.getTextAlignment(checkKey('Adventure-alignment'));
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
	AdapterImage = null;
}
function createBackPainter( diy, sheet ){
/* TEMPLATE */
	Progress_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint('Progress');
	Progress_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
	NameBack_box = markupBox(sheet);
	NameBack_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	NameBack_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	OptionRight_box = markupBox(sheet);
	OptionRight_box.defaultStyle = diy.settings.getTextStyle(checkKey('OptionRight-style'),null);
	OptionRight_box.alignment = diy.settings.getTextAlignment(checkKey('OptionRight-alignment'));
	ArtistBack_box = markupBox(sheet);
	ArtistBack_box.defaultStyle = diy.settings.getTextStyle(checkKey('Artist-style'),null);
	ArtistBack_box.alignment = diy.settings.getTextAlignment(checkKey('Artist-alignment'));
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
	if(typeof(SE2CARD) != 'undefined'){
		sheet.paintPortrait(g);
		sheet.paintImage(g,
			ImageUtils.get('TheLordOfTheRingsLCG/image/sepia.png'),
			'QuestBleed-Portrait-portrait-clip-region'
		);
	}else{
		if( questTint(diy) != 'none' ){
			var imageTinted = PortraitList[PORTRAIT].getImage();
			var imagePanX = PortraitList[PORTRAIT].getPanX();
			var imagePanY = PortraitList[PORTRAIT].getPanY();
			var imageRotation = PortraitList[PORTRAIT].getRotation();
			var imageScale = PortraitList[PORTRAIT].getScale();
			if($Template == 'Nightmare'){
				imageTinted = createRedishImage(imageTinted);
			}else{
				imageTinted = questTint(diy) == 'new' ? createPrintedSepiaImage(imageTinted) : createSepiaImage(imageTinted);
			}
			var Region = String($QuestBleed-Portrait-portrait-clip-region).split(',');
			var AT = java.awt.geom.AffineTransform;	
			var transform =	AT.getTranslateInstance(
				Number(Region[0])+(Number(Region[2])/2)+imagePanX-((imageTinted.width*imageScale)/2),
				Number(Region[1])+(Number(Region[3])/2)+imagePanY-((imageTinted.height*imageScale)/2)
			);
			transform.concatenate(AT.getScaleInstance(imageScale,imageScale));
			transform.concatenate(AT.getRotateInstance(-imageRotation * Math.PI/180,imageTinted.width/2,imageTinted.height/2));
			g.drawImage(imageTinted,transform,null);
		}else{
			PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
		}
	}
/* TEMPLATE */
	var hsb;
	switch(String($Template)){
	case 'Gold':
		sheet.paintTemplateImage(g);
		hsb = diy.settings.getTint($Template);
		DifficultyDeco_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,DifficultyDeco_tinter.getTintedImage(),checkKey('difficultyDeco-region'));
		break;
	case 'CustomDifficulty':
		sheet.paintTemplateImage(g);
		hsb = diy.settings.getTint('Template');
		DifficultyDeco_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,DifficultyDeco_tinter.getTintedImage(),checkKey('difficultyDeco-region'));
		break;
	case 'Nightmare':
		sheet.paintImage(g,Card+'-Nightmare-front-template',0,0);
		break;
	default:
		sheet.paintTemplateImage(g);
	}
/* ICONS */
	if(diy.settings.getBoolean('LRL-NoBottom',false) === false) paintIcon(COLLECTION,g,sheet);
	(($Template == 'Nightmare' || $Template == 'ShipNightmare') && ImageUtils.get('TheLordOfTheRingsLCG-Bleed/icon/black/' + $EncounterSet + '.png', true, true) ? sheet.paintImage(g, ImageUtils.get('TheLordOfTheRingsLCG-Bleed/icon/black/' + $EncounterSet + '.png', true, true), checkKey('EncounterSet-portrait-clip-region')) : paintIcon(ENCOUNTERSET,g,sheet));
	let adapterList = new Array(
		'EncounterSet1','EncounterSet2',
		'EncounterSet3','EncounterSet4','EncounterSet5' );
	let adapterSelector = 0;
	for(let index=0;index<adapterList.length;index++){
		if($(adapterList[index])!='EmptyIcon'){
			adapterSelector=index+1;
		}
	}
	sheet.paintImage(g,checkKey('adapter'+adapterSelector),checkKey('adapter-region'));
	sheet.paintImage(g,getIcon(ENCOUNTERSET1),checkKey('EncounterSet1-portrait-clip-region'));
	sheet.paintImage(g,getIcon(ENCOUNTERSET2),checkKey('EncounterSet2-portrait-clip-region'));
	sheet.paintImage(g,getIcon(ENCOUNTERSET3),checkKey('EncounterSet3-portrait-clip-region'));
	sheet.paintImage(g,getIcon(ENCOUNTERSET4),checkKey('EncounterSet4-portrait-clip-region'));
	sheet.paintImage(g,getIcon(ENCOUNTERSET5),checkKey('EncounterSet5-portrait-clip-region'));
/* STATS */
	Stage_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/a'+$Stage+'.png'));
	sheet.paintImage(g,Stage_tinter.getTintedImage(),checkKey('Stage-region'));
/* TEXT */
	drawName(g,diy);
	drawAdventure(g,diy);
	drawBody(new Array('Story','Rules','Condition'),g,diy);
	drawArtist(g,diy);
	drawCopyright(g,diy);
	drawCollectionInfo(g,diy);
	if(diy.settings.getBoolean('CollectionNumberHide',false)){
		CollectionNumber_box.markupText = '---';
		CollectionNumber_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('CollectionNumber-region')));
	}else{
		drawCollectionNumber(g,diy);
	}
/*FINISH*/
	saveLocalized(diy);
}
function paintBack( g, diy, sheet ){
/* PORTRAIT */
	if(typeof(SE2CARD) != 'undefined'){
		sheet.paintPortrait(g);
	}else{
		if(diy.settings.getBoolean('PortraitShare',false)){
			PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
		}else{
			PortraitList[PORTRAITBACK].paint(g,sheet.getRenderTarget());
		}
	}
/* TEMPLATE */
	var hsb;
	switch(String($Template)){
	case 'Gold':
		sheet.paintTemplateImage(g);
		hsb = diy.settings.getTint($Template);
		DifficultyDeco_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,DifficultyDeco_tinter.getTintedImage(),checkKey('difficultyDeco-region'));
		break;
	case 'CustomDifficulty':
		sheet.paintTemplateImage(g);
		hsb = diy.settings.getTint('Template');
		DifficultyDeco_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,DifficultyDeco_tinter.getTintedImage(),checkKey('difficultyDeco-region'));
		break;
	case 'Nightmare':
		sheet.paintImage(g,Card+'-Nightmare-back-template',0,0);
		break;
	default:
		sheet.paintTemplateImage(g);
	}
/* ICONS */
	if(diy.settings.getBoolean('LRL-NoBottom',false) === false) paintIcon(COLLECTION,g,sheet);
	(($Template == 'Nightmare' || $Template == 'ShipNightmare') && ImageUtils.get('TheLordOfTheRingsLCG-Bleed/icon/black/' + $EncounterSet + '.png', true, true) ? sheet.paintImage(g, ImageUtils.get('TheLordOfTheRingsLCG-Bleed/icon/black/' + $EncounterSet + '.png', true, true), checkKey('EncounterSet-portrait-clip-region')) : paintIcon(ENCOUNTERSET,g,sheet));
/* STATS */
	Stage_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/b'+$Stage+'.png'));
	sheet.paintImage(g,Stage_tinter.getTintedImage(),checkKey('Stage-region'));
	Progress_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/'+$Progress+'.png'));
	sheet.paintImage(g,Progress_tinter.getTintedImage(),diy.settings.getRegion(checkKey('Progress-region')));
/* TEXT */
	drawAdventure(g,diy);
	drawCopyright(g,diy);
	drawCollectionInfo(g,diy);
	drawCollectionNumber(g,diy);
	const BODYBACK_OPTIONRIGHT_SHAPE = new PageShape.CupShape(0,0,363,0,56);
	if(String($OptionRight)!=""){
		BodyBack_box.setPageShape(BODYBACK_OPTIONRIGHT_SHAPE);
	}else{
		BodyBack_box.setPageShape(PageShape.RECTANGLE_SHAPE);
	}
	drawBodyBack(new Array('StoryBack','RulesBack','ConditionBack'),g,diy);
	drawOptionRight(g,diy,sheet);
	if( diy.settings.getBoolean('NameShare',false)){
		drawName(g,diy);
	}else{
		NameBack_box.markupText = $NameBack;
		NameBack_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('Name-region')));
	}
	if(diy.settings.getBoolean('PortraitShare',false)){
		drawArtist(g,diy);
	}else{
		if( $ArtistBack == '' ){
			ArtistBack_box.markupText = #LRL-IllustratorUnknown;
		}else{
			ArtistBack_box.markupText = #LRL-IllustratorShort+' '+$ArtistBack;
		}
		ArtistBack_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('Artist-region')));
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
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-V.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-VHD.settings');
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

// Print bleed: the quest's Tint choice. Cards saved before the dropdown
// follow their Tint toggle (on: New Tint, off: No Tint).
function questTint( diy ){
	var tint = diy.settings.get('QuestTint',null);
	if( tint != null ) return String(tint);
	return diy.settings.getBoolean('PortraitTint',true) ? 'new' : 'none';
}

// Print bleed: the printed cards' quest sepia, measured from FFG's A/B scans.
var PrintedSepiaOps = null;
function createPrintedSepiaImage( source ){
	var Arr = java.lang.reflect.Array;
	var BI = java.awt.image.BufferedImage;
	if( PrintedSepiaOps == null ){
		var weights = [0.2,0.66,0.14, 0, 0.5];
		var row = Arr.newInstance( java.lang.Float.TYPE , 5 );
		for( var c = 0 ; c < 5 ; c++ ) Arr.setFloat( row , c , weights[c] );
		var matrix = Arr.newInstance( row.getClass() , 1 );
		Arr.set( matrix , 0 , row );
		var bytes = function( values ){
			var out = Arr.newInstance( java.lang.Byte.TYPE , 256 );
			for( var i = 0 ; i < 256 ; i++ ) Arr.setByte( out , i , values[i] > 127 ? values[i] - 256 : values[i] );
			return out;
		};
		PrintedSepiaOps = {
			combine: new java.awt.image.BandCombineOp( matrix , null ),
			palette: new java.awt.image.IndexColorModel( 8 , 256 ,
				bytes( [3,4,5,6,8,10,12,14,16,18,20,21,23,24,26,27,29,30,31,32,33,35,36,37,38,38,39,40,41,42,43,43,44,45,46,47,48,49,51,52,53,54,56,57,58,60,61,63,64,66,67,69,70,72,73,75,76,78,80,81,83,84,86,87,89,90,91,93,94,96,97,98,100,101,102,104,105,106,108,109,110,111,113,114,115,117,118,119,120,122,123,124,125,127,128,130,131,132,134,135,136,137,139,140,141,142,143,144,146,147,148,149,150,151,152,154,155,156,157,158,160,161,162,163,164,165,166,167,168,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,214,215,216,217,218,218,219,220,221,222,223,223,224,225,225,226,226,227,227,228,228,229,229,230,230,230,231,231,232,232,232,233,233,233,233,234,234,234,234,234,235,235,235,235,235,236,236,236,236,236,236,236,237,237,237,237,237,237,237,237,237,238,238,238,238,238,239,239,239,239,240,240,241,241,242,242,243,244,244,245,246,246,247] ),
				bytes( [2,3,4,4,6,7,8,9,10,12,12,13,14,15,16,17,18,19,20,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,244,245,246,247,248,248,249,250,250,251,251] ),
				bytes( [2,2,3,3,4,5,5,6,7,8,8,9,9,10,10,11,11,12,13,13,14,15,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,34,35,36,36,37,38,38,39,40,40,41,42,42,43,44,44,45,45,46,47,47,48,49,49,50,51,51,52,53,53,54,55,55,56,57,57,58,59,59,60,61,61,62,63,64,64,65,66,66,67,68,68,69,70,71,71,72,73,73,74,75,76,76,77,78,79,79,80,81,82,82,83,84,85,86,87,87,88,89,90,91,91,92,93,94,95,95,96,97,98,99,100,100,101,102,103,104,105,106,107,108,109,110,111,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,131,132,133,134,135,136,137,138,140,141,142,143,144,145,146,147,148,149,151,152,153,154,156,157,159,160,161,163,164,166,168,169,171,172,174,175,177,179,180,182,183,184,186,187,189,190,192,194,195,197,198,200,202,203,205,207,208,210,212,214,216,218,219,221,223,225,227,229,231,232,234,236,238,239,241,242,244,245,246,248,249,250,250,251,251,252,252,252,252] ) )
		};
	}
	var width = source.getWidth();
	var height = source.getHeight();
	// R, G, B, A as bands 0-3, whatever the source's own layout.
	var rgba = new BI( width , height , BI.TYPE_4BYTE_ABGR );
	var g2 = rgba.createGraphics();
	g2.drawImage( source , 0 , 0 , null );
	g2.dispose();
	var level = java.awt.image.Raster.createInterleavedRaster( java.awt.image.DataBuffer.TYPE_BYTE , width , height , 1 , null );
	PrintedSepiaOps.combine.filter( rgba.getRaster() , level );
	var toned = new BI( PrintedSepiaOps.palette , level , false , null );
	var image = new BI( width , height , BI.TYPE_INT_ARGB );
	g2 = image.createGraphics();
	g2.drawImage( toned , 0 , 0 , null );
	g2.dispose();
	image.getAlphaRaster().setRect( rgba.getAlphaRaster() );
	return image;
}
