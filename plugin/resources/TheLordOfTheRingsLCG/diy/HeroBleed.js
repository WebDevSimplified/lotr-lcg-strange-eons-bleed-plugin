/* COMPONENT CONFIGURATION */
const Card = 'HeroBleed';
const PortraitListKey = new Array('Portrait','Collection','CustomSphere','BodyIcon','PortraitPromo');
const CARDVERSION = 2;
//2: a\u00f1adido sheet a drawOption*
var Body_box;
function createTemplates( diy ){
	diy.frontTemplateKey = 'HeroBleed-front';
	diy.backTemplateKey = 'HeroBleed-back';
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
	PortraitPromo_panel = new portraitPanel(diy,PORTRAITPROMO,@LRL-Portrait+': '+@LRL-promo);
/* TEMPLATE */
	var combo = new Array(
		'Leadership','Lore','Spirit','Tactics','Neutral',
		'Baggins','Fellowship','Mastery','CustomSphere'
	);
	for(let index=0;index<combo.length;index++){
		let item = combo[index];
		combo[index] = ListItem(item,@('LRL-'+item),eval('LRL.'+item+'Icon'));
	}
	Template_list = new comboBox(combo,null);
	Template_hsb = new HSBPanel();
	Promo_button = new toggleButton(@LRL-promo,'',diy.settings.getBoolean('Promo',false));
	CustomSphere_portrait = new portraitPanel(diy,CUSTOMSPHERE,@LRL-Sphere+': '+@LRL-custom);
	BodyIcon_portrait = new portraitPanel(diy,BODYICON,@LRL-BodyIcon+': '+@LRL-custom);
	BodyIcon_transparency = new slider(1,10,5,[1,@LRL-high,4,@LRL-medium,7,@LRL-low,10,@LRL-opaque],null);
/* ICONS */
	Collection_list = new comboBox(LRL.CollectionCombo.concat(LRL.EncounterSetCombo.slice(3).filter(function(item, index){ var set = LRL.EncounterSetList[index]; return typeof set == 'string' && LRL.CollectionList.indexOf(set) < 0; })),null);
	Collection_panel = new portraitPanel(diy,COLLECTION,@LRL-Collection+': '+@LRL-custom);
/* STATS */
	ThreatCost_list = new comboBox(LRL.combo99,null);
	Willpower_list = new comboBox(LRL.combo99,null);
	Attack_list = new comboBox(LRL.combo99,null);
	Defense_list = new comboBox(LRL.combo99,null);
	HitPoints_list = new comboBox(LRL.combo99,null);
/* TEXT */
	diy.nameField = new textField($Name,12,null);
	Unique_button = new toggleButton('',LRL.UniqueIcon,diy.settings.getBoolean('Unique',false),null);
	Trait_text = new textField($Trait,12,null);
	Rules_text = new textArea($Rules,10,50,true);
	Flavour_text = new textArea($Flavour,6,50,true);
	OptionRight_text = new textField($OptionRight,12,null);
	Type_text = new textField($Type,12,null);
	Artist_text = new textField($Artist,12);
	Copyright_text = new textField($Copyright,12);
	CollectionInfo_text = new textField($CollectionInfo,12);
	CollectionNumber_text = new spinner(0,999,1,0,null);
	var RulesTab = new Grid();
	RulesTab.editorTabScrolling = true;
	RulesTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',Unique_button,'split',diy.nameField,'growx',
		separator(),'newline,growx',
		LRL.ThreatCostIcon,'newline,split',ThreatCost_list,'growx',
		LRL.HitPointsIcon,'split',HitPoints_list,'growx',
		LRL.WillpowerIcon,'newline,split',Willpower_list,'growx',
		LRL.AttackIcon,'split',Attack_list,'growx',
		LRL.DefenseIcon,'split',Defense_list,'growx',
		separator(),'newline,growx',
		@LRL-Trait,'newline,split',new tipButton(@LRL-Trait-tip),'split',Trait_text,'growx,split',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',new tipButton(@LRL-Rules-tip),'split',new tipButton(@LRL-Keyword-tip),'',Rules_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Flavour,'newline,center',Flavour_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-OptionRight,'newline,split',new tipButton(@LRL-option-tip),'split',OptionRight_text,'split,growx',
		separator(),'newline,growx'
	);
	RulesTab.addToEditor(editor,@LRL-Rules);
	var TemplateTab = new Grid();
	TemplateTab.editorTabScrolling = true;
	TemplateTab.place(
		separator(),'newline,growx',
		@LRL-Template,'newline,split',Template_list,'growx,split',Promo_button,'',
		separator(),'newline,growx',
		Template_hsb,'newline,growx',
		CustomSphere_portrait,'newline,growx',
		BodyIcon_portrait,'newline,growx',
		@LRL-transparency,'newline,split',BodyIcon_transparency,'growx',
		separator(),'newline,growx'
	);
	TemplateTab.addToEditor(editor,@LRL-Template);
	var PortraitTab = new Grid();
	PortraitTab.editorTabScrolling = true;
	PortraitTab.place(
		separator(),'newline,growx',
		Portrait_panel,'newline,growx',
		PortraitPromo_panel,'newline,growx',
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
		separator(),'newline,growx'
	);
	CollectionTab.addToEditor(editor,@LRL-Collection);
	var bindings = new Bindings(editor,diy);
	bindings.add('Name',diy.nameField,[0]);
	bindings.add('Unique',Unique_button,[0]);
	bindings.add('Trait',Trait_text,[0]);
	bindings.add('Rules',Rules_text,[0]);
	bindings.add('Flavour',Flavour_text,[0]);
	bindings.add('OptionRight',OptionRight_text,[0]);
	bindings.add('ThreatCost',ThreatCost_list,[0]);
	bindings.add('Willpower',Willpower_list,[0]);
	bindings.add('Attack',Attack_list,[0]);
	bindings.add('Defense',Defense_list,[0]);
	bindings.add('HitPoints',HitPoints_list,[0]);
	bindings.add('Template',Template_list,[0]);
	bindings.add('Promo',Promo_button,[0]);
	bindings.add('Template-tint',Template_hsb,[0]);
	bindings.add('BodyIcon-transparency',BodyIcon_transparency,[0]);
	bindings.add('Type',Type_text,[0]);
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
	Template_tinter = new TintCache(new TintFilter(),diy.settings.getImageResource(checkKey('tintable-sphereText')));
	TemplatePromo_tinter = new TintCache(new TintFilter(),diy.settings.getImageResource('HeroBleed-Promo-tintable-sphereText'));
	BodyIcon_tinter = new TintCache(new TintFilter(),null);
/* ICONS */
/* STATS */
	StatPromo_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint('HeroBleed-Promo-stat');
	StatPromo_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
	ThreatCost_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint('ThreatCost');
	ThreatCost_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
	HitPoints_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint('HitPoints');
	HitPoints_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
/* TEXT */
	Name_box = markupBox(sheet);
	Name_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	Name_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	Name_box.setStyleForTag($LRLSymbols-tag,diy.settings.getTextStyle('LRLSymbols',null));
	OptionRight_box = markupBox(sheet);
	OptionRight_box.defaultStyle = diy.settings.getTextStyle(checkKey('OptionRight-style'),null);
	OptionRight_box.alignment = diy.settings.getTextAlignment(checkKey('OptionRight-alignment'));
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
//	PromoButtonListener()
}
function paintFront( g, diy, sheet ){
/* PORTRAIT */
	if(diy.settings.getBoolean('Promo',false)===true){
		PortraitList[PORTRAITPROMO].paint(g,sheet.getRenderTarget());
	}else{
		if(typeof(SE2CARD) != 'undefined'){
			sheet.paintPortrait(g);
		}else{
			PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
		}
	}
/* TEMPLATE */
	var hsb;
	if(diy.settings.getBoolean('Promo',false)===true){
		switch(String($Template)){
		case 'Neutral':
			TemplatePromo_tinter.setFactors(0,0.1,1);
			sheet.paintImage(g,TemplatePromo_tinter.getTintedImage(),'HeroBleed-Promo-sphereText-region');
			break;
		case 'CustomSphere':
			hsb = diy.settings.getTint('Template');
			TemplatePromo_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
			sheet.paintImage(g,TemplatePromo_tinter.getTintedImage(),'HeroBleed-Promo-sphereText-region');
			break;
		default:
			hsb = diy.settings.getTint(checkKey($Template,'-tint'));
			TemplatePromo_tinter.setFactors(hsb[0],0.2,1);
			sheet.paintImage(g,TemplatePromo_tinter.getTintedImage(),'HeroBleed-Promo-sphereText-region');
		}
		sheet.paintImage(g,'HeroBleed-Promo-front-template',0,0);
		if($Template!= 'Neutral'){
			sheet.paintImage(g,'HeroBleed-Promo-sphereDeco');
			sheet.paintImage(g,
				getIcon(CUSTOMSPHERE),
				'HeroBleed-Promo-CustomSphere-portrait-clip-region'
			);
		}
	}else{
		switch(String($Template)){
		case 'Neutral':
			Template_tinter.setFactors(0,0.1,1);
			sheet.paintImage(g,Template_tinter.getTintedImage(),checkKey('sphereText-region'));
			sheet.paintTemplateImage(g);
			break;
		case 'CustomSphere':
			hsb = diy.settings.getTint('Template');
			Template_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
			sheet.paintImage(g,Template_tinter.getTintedImage(),checkKey('sphereText-region'));
			BodyIcon_tinter.setImage(PortraitList[BODYICON].getImage());
			BodyIcon_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
			sheet.paintImage(g,
				ImageUtilities.alphaComposite(
					BodyIcon_tinter.getTintedImage(),
					Number($BodyIcon-transparency)/10
				),
				checkKey('BodyIcon-portrait-clip-region')
			);
			sheet.paintTemplateImage(g);
			sheet.paintImage(g,checkKey('sphereDeco'));
			break;
		default:
			sheet.paintImage(g,
				checkKey('sphereText'),
				checkKey('sphereText-region')
			);
			sheet.paintTemplateImage(g);
			sheet.paintImage(g,checkKey('sphereDeco'));
		}
		paintIcon(CUSTOMSPHERE,g,sheet);
	}
/* STATS */
	if(diy.settings.getBoolean('Promo',false)===true){
		StatPromo_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/'+$ThreatCost+'.png'));
		sheet.paintImage(g,StatPromo_tinter.getTintedImage(),'HeroBleed-Promo-ThreatCost-region');
		StatPromo_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/'+$Willpower+'.png'));
		sheet.paintImage(g,StatPromo_tinter.getTintedImage(),'HeroBleed-Promo-Willpower-region');
		StatPromo_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/'+$Attack+'.png'));
		sheet.paintImage(g,StatPromo_tinter.getTintedImage(),'HeroBleed-Promo-Attack-region');
		StatPromo_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/'+$Defense+'.png'));
		sheet.paintImage(g,StatPromo_tinter.getTintedImage(),'HeroBleed-Promo-Defense-region');
		HitPoints_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/'+$HitPoints+'.png'));
		sheet.paintImage(g,HitPoints_tinter.getTintedImage(),'HeroBleed-Promo-HitPoints-region');
	}else{
		ThreatCost_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/'+$ThreatCost+'.png'));
		sheet.paintImage(g,
			ThreatCost_tinter.getTintedImage(),
			checkKey('ThreatCost-region')
		);
		sheet.paintImage(g,
			ImageUtils.get('TheLordOfTheRingsLCG/number/'+$Willpower+'.png'),
			checkKey('Willpower-region')
		);
		sheet.paintImage(g,
			ImageUtils.get('TheLordOfTheRingsLCG/number/'+$Attack+'.png'),
			checkKey('Attack-region')
		);
		sheet.paintImage(g,
			ImageUtils.get('TheLordOfTheRingsLCG/number/'+$Defense+'.png'),
			checkKey('Defense-region')
		);
		HitPoints_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/'+$HitPoints+'.png'));
		sheet.paintImage(g,
			HitPoints_tinter.getTintedImage(),
			checkKey('HitPoints-region')
		);
	}
/* TEXTS */
	if(diy.settings.getBoolean('Promo',false)===true){
		if(diy.settings.getBoolean('Unique',false)===true){
			Name_box.markupText = '<lrs>u</lrs><size 50%> <size 200%>'+$Name;
		}else{
			Name_box.markupText = $Name;
		}
		Name_box.drawAsSingleLine(g,diy.settings.getRegion('HeroBleed-Promo-Name-region'));
		var BodyText = '';
		BodyText =  addTextPart(BodyText,'Trait',diy);
		BodyText =  addTextPart(BodyText,'Rules',diy);
		BodyText =  addTextPart(BodyText,'Flavour',diy);
		if($('LRL-'+Card+'-justified') == 'yes'){BodyText = BodyText+'<justified>';}
		Body_box.markupText = BodyText;
		Body_box.setPageShape(diy.settings.getCupShape('HeroBleed-Promo-Body'));
		updateNameTags(Body_box,diy);
		
		if($Type != ''){
			Type_box.markupText = '<size 90%>'+$Type;
		}else{
			Type_box.markupText = '<size 90%>'+#('LRL-'+Card);
		}
		Type_box.drawAsSingleLine(g,diy.settings.getRegion('HeroBleed-Promo-Type-region'));
		if($LRL-Hero-Promo-outOfBox == 'yes'){
			Body_box.draw(g,diy.settings.getRegion('HeroBleed-Promo-Body-region'));
			if(diy.settings.getBoolean('LRL-NoBottom',false) === false) paintIcon(COLLECTION,g,sheet);
			if($Artist == ''){
				Artist_box.markupText = #LRL-IllustratorUnknown;
			}else{
				Artist_box.markupText = #LRL-IllustratorShort+' '+$Artist;
			}
			if(diy.settings.getBoolean('LRL-NoBottom',false) === false) drawTextLineOutlined('Artist',null,strokeMedium,diy,g,sheet);
			Copyright_box.markupText = $Copyright;
			if(diy.settings.getBoolean('LRL-NoBottom',false) === false) drawTextLineOutlined('Copyright',null,strokeMedium,diy,g,sheet);
			CollectionInfo_box.markupText = $CollectionInfo;
			if(diy.settings.getBoolean('LRL-NoBottom',false) === false) drawTextLineOutlined('CollectionInfo',null,strokeMedium,diy,g,sheet);
			if($CollectionNumber > 0){
				CollectionNumber_box.markupText = $CollectionNumber;
			}else{
				CollectionNumber_box.markupText = '---';
			}
			if(diy.settings.getBoolean('LRL-NoBottom',false) === false) drawTextLineOutlined('CollectionNumber',null,strokeMedium,diy,g,sheet);
		}else{
			Body_box.draw(g,diy.settings.getRegion('HeroBleed-Promo-Body-inBox-region'));
			sheet.paintImage(g,getIcon(COLLECTION),diy.settings.getRegion('HeroBleed-Promo-Collection-portrait-clip-region'));
			if($Artist == ''){
				Artist_box.markupText = '<size 80%><black>'+#LRL-IllustratorUnknown;
			}else{
				Artist_box.markupText = '<size 80%><black>'+#LRL-IllustratorShort+' '+$Artist;
			}
			Artist_box.drawAsSingleLine(g,diy.settings.getRegion('HeroBleed-Promo-Artist-region'));
			Copyright_box.markupText = '<size 80%><black>'+$Copyright;
			Copyright_box.drawAsSingleLine(g,diy.settings.getRegion('HeroBleed-Promo-Copyright-region'));
			CollectionInfo_box.markupText = '<size 80%><black>'+$CollectionInfo;
			CollectionInfo_box.drawAsSingleLine(g,diy.settings.getRegion('HeroBleed-Promo-CollectionInfo-region'));
			if($CollectionNumber > 0){
				CollectionNumber_box.markupText = '<size 80%><black>'+$CollectionNumber;
			}else{
				CollectionNumber_box.markupText = '<size 80%><black>---';
			}
			CollectionNumber_box.drawAsSingleLine(g,diy.settings.getRegion('HeroBleed-Promo-CollectionNumber-region'));
		}
	}else{
		if(String($Template)=='Neutral'){
			Body_box.setPageShape(PageShape.RECTANGLE_SHAPE);
		}else{
			Body_box.setPageShape(diy.settings.getCupShape('HeroBleed-Body'));
		}
		if(diy.settings.getBoolean('LRL-NoBottom',false) === false) paintIcon(COLLECTION,g,sheet);
		drawName(g,diy);
		drawBody(new Array('Trait','Rules','Flavour'),g,diy);
		drawOptionRight(g,diy,sheet);
		drawType(g,diy);
		drawArtist(g,diy);
		drawCopyright(g,diy);
		drawCollectionInfo(g,diy);
		drawCollectionNumber(g,diy);
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
