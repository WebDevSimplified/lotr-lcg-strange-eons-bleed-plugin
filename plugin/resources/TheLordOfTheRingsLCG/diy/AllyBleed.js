const Card = 'AllyBleed';
const PortraitListKey = new Array('Portrait','Collection','CustomSphere','BodyIcon');
const CARDVERSION = 2;
//2: a\u00f1adido sheet a drawOption*
function createTemplates( diy ){
	
	diy.frontTemplateKey = 'AllyBleed-front';
	diy.backTemplateKey = 'AllyBleed-back';
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

function createInterface(diy,editor,sheet){
	
	var bindings = new Bindings(editor,diy);

/* RULES TAB */
	ResourceCost_list = new comboBox( LRL.combo99 , null ) ;
	bindings.add( 'ResourceCost' , ResourceCost_list , [ 0 ] ) ;
	
	Willpower_list = new comboBox( LRL.combo99 , null ) ;
	bindings.add( 'Willpower' , Willpower_list , [ 0 ] ) ;
	
	Attack_list = new comboBox( LRL.combo99 , null ) ;
	bindings.add( 'Attack' , Attack_list , [ 0 ] ) ;
	
	Defense_list = new comboBox( LRL.combo99 , null ) ;
	bindings.add( 'Defense' , Defense_list , [ 0 ] ) ;
	
	HitPoints_list = new comboBox( LRL.combo99 , null ) ;
	bindings.add( 'HitPoints' , HitPoints_list , [ 0 ] ) ;
	
	diy.nameField = new textField( $Name , 12 , null ) ;
	bindings.add( 'Name' , diy.nameField , [ 0 ] ) ;
	
	Unique_button = new toggleButton(
		'' ,
		LRL.UniqueIcon ,
		diy.settings.getBoolean( 'Unique' , false ) ,
		null
	) ;
	bindings.add( 'Unique' , Unique_button , [ 0 ] ) ;
	
	Trait_text = new textField( $Trait , 12 , null ) ;
	bindings.add( 'Trait' , Trait_text , [ 0 ] ) ;
	
	Rules_text = new textArea( $Rules , 10 , 50 , true ) ;
	bindings.add( 'Rules' , Rules_text , [ 0 ] ) ;
	
	Flavour_text = new textArea( $Flavour , 6 , 50 , true ) ;
	bindings.add( 'Flavour' , Flavour_text , [ 0 ] ) ;
	
	OptionLeft_text = new textField( $OptionLeft , 12 , null ) ;
	bindings.add( 'OptionLeft' , OptionLeft_text , [ 0 ] ) ;
	
	OptionRight_text = new textField( $OptionRight , 12 , null ) ;
	bindings.add( 'OptionRight' , OptionRight_text , [ 0 ] ) ;
	
	var RulesTab = new Grid();
	RulesTab.editorTabScrolling = true;
	RulesTab.place(
		@LRL-Name , 'newline,split' ,
		Unique_button , 'split' , 
		diy.nameField , 'growx' ,
		LRL.ResourceCostIcon , 'newline,split' ,
		ResourceCost_list , 'growx' ,
		LRL.HitPointsIcon , 'split' ,
		HitPoints_list , 'growx' ,
		LRL.WillpowerIcon , 'newline,split' ,
		Willpower_list , 'growx' ,
		LRL.AttackIcon , 'split' ,
		Attack_list , 'growx' ,
		LRL.DefenseIcon , 'split' , 
		Defense_list , 'growx' ,
		@LRL-Trait , 'newline,split' , 
		new tipButton( @LRL-Trait-tip ) ,'split' ,
		Trait_text , 'growx,split' ,
		separator() , 'newline,growx' ,
		@LRL-Rules , 'newline,center,split' , 
		new tipButton( @LRL-Rules-tip ) , 'split' ,
		new tipButton( @LRL-Keyword-tip ) , '' ,
		Rules_text , 'newline,growx' ,
		separator() , 'newline,growx' ,
		@LRL-Flavour , 'newline,center' , 
		Flavour_text , 'newline,growx' ,
		separator() , 'newline,growx' ,
		OptionLeft_text , 'newline,split,growx' ,
		@LRL-options , 'split' , 
		new tipButton( @LRL-option-tip ) , 'split' ,
		OptionRight_text , 'split,growx'
	) ;
	RulesTab.addToEditor( editor , @LRL-Rules ) ;
	
	var combo = new Array(
		'Leadership' ,
		'Lore' ,
		'Spirit' ,
		'Tactics' ,
		'Neutral' ,
		'Baggins' ,
		'Fellowship' ,
		'Mastery' ,
		'CustomSphere'
	);
	for( let index = 0 ; index < combo.length ; index++ ){
		let item = combo[ index ] ;
		combo[ index ] = ListItem(
			item , 
			@( 'LRL-' + item ) ,
			eval( 'LRL.' + item + 'Icon' )
		) ;
	}
	Template_list = new comboBox( combo , null ) ;
	bindings.add( 'Template' , Template_list , [ 0 ] ) ;

	Template_hsb = new HSBPanel();
	bindings.add( 'Template-tint' , Template_hsb , [ 0 ] ) ;
	
	BodyIcon_transparency = new slider(
		1 , 10 , 5 , 
		[ 1 , @LRL-high ,
			4 , @LRL-medium ,
			7 , @LRL-low , 
			10 , @LRL-opaque
		] , null 
	) ;
	bindings.add( 'BodyIcon-transparency' , BodyIcon_transparency , [ 0 ] ) ;
	
	var TemplateTab = new Grid() ;
	TemplateTab.editorTabScrolling = true ;
	TemplateTab.place(
		@LRL-Template , 'newline,split' ,
		Template_list , 'growx' ,
		Template_hsb , 'newline,growx' ,
		new portraitPanel( 
			diy , CUSTOMSPHERE ,
			@LRL-Sphere + ': ' + @LRL-custom 
		) ,'newline,growx',
		new portraitPanel(
			diy , BODYICON ,
			@LRL-BodyIcon + ': ' + @LRL-custom
		) , 'newline,growx' ,
		@LRL-transparency , 'newline,split' ,
		BodyIcon_transparency , 'growx'
	);
	TemplateTab.addToEditor( editor , @LRL-Template ) ;
	
	Portrait_panel = new portraitPanel(
		diy , PORTRAIT , @LRL-Portrait 
	) ;
	
	Artist_text = new textField( $Artist , 12 , null ) ;
	bindings.add( 'Artist' , Artist_text , [ 0 ] ) ;
	
	var PortraitTab = new Grid();
	PortraitTab.editorTabScrolling = true;
	PortraitTab.place(
		Portrait_panel , 'newline,growx' ,
		@LRL-Artist , 'newline,split' ,
		Artist_text , 'growx' ,
		PortraitMirrorButton() , 'split'
	) ;
	PortraitTab.addToEditor( editor , @LRL-Portrait ) ;
	
	Collection_list = new comboBox(LRL.CollectionCombo.concat(LRL.EncounterSetCombo.slice(3).filter(function(item, index){ var set = LRL.EncounterSetList[index]; return typeof set == 'string' && LRL.CollectionList.indexOf(set) < 0; })),null) ;
	bindings.add( 'Collection', Collection_list , [ 0 ] ) ;
	
	Type_text = new textField( $Type , 12 , null ) ;
	bindings.add( 'Type' , Type_text , [ 0 ] ) ;
	
	Copyright_text = new textField( $Copyright , 12 , null ) ;
	bindings.add( 'Copyright' , Copyright_text , [ 0 ] ) ;
	
	CollectionInfo_text = new textField( $CollectionInfo , 12 , null ) ;
	bindings.add( 'CollectionInfo' , CollectionInfo_text , [ 0 ] ) ;
	
	CollectionNumber_text = new spinner( 0 , 999 , 1 , 0 , null ) ;
	bindings.add( 'CollectionNumber' , CollectionNumber_text , [ 0 ] ) ;
	
	var CollectionTab = new Grid() ; 
	CollectionTab.editorTabScrolling = true;
	CollectionTab.place(
		@LRL-Collection , 'newline,split' ,
		Collection_list , 'growx' ,
		new portraitPanel(
			diy , COLLECTION , 
			@LRL-Collection + ': ' + @LRL-custom 
		) , 'newline' ,
		@LRL-CollectionInfo , 'newline,split' ,
		CollectionInfo_text , 'growx,split' ,
		@LRL-CollectionNumber , 'split' ,
		CollectionNumber_text , '' ,
		@LRL-Copyright , 'newline,split' ,
		Copyright_text , 'growx' ,
		@LRL-Type , 'newline,split' ,
		new tipButton( @LRL-Type-tip ) , 'split' ,
		Type_text , 'growx,split'
	) ;
	CollectionTab.addToEditor( editor , @LRL-Collection ) ;

	bindings.bind() ;

}

function createFrontPainter( diy, sheet ){

/* TEMPLATE */
	SphereText_tinter = new TintCache(
		new TintFilter() ,
		diy.settings.getImageResource( Card + '-tintable-sphereText' )
	) ;
	SphereColour_tinter = new TintCache(
		new TintFilter(),
		diy.settings.getImageResource( 'tintable-sphereColour' )
	) ;
	BodyIcon_tinter = new TintCache( new TintFilter() , null ) ;

/* STATS */
	ResourceCost_tinter = new TintCache( new TintFilter() , null ) ;
	var hsb = diy.settings.getTint( checkKey( 'ResourceCost-tint' ) ) ;
	ResourceCost_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
	HitPoints_tinter = new TintCache( new TintFilter() , null ) ;
	hsb = diy.settings.getTint(checkKey( 'HitPoints-tint' ) ) ;
	HitPoints_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;

/* TEXT */
	Name_box = markupBox( sheet ) ;
	Name_box.defaultStyle = diy.settings.getTextStyle( checkKey( 'Name-style' ) , null ) ;
	Name_box.alignment = diy.settings.getTextAlignment( checkKey( 'Name-alignment' ) ) ;
	Name_box.setStyleForTag(
		$LRLSymbols-tag ,
		diy.settings.getTextStyle( 'LRLSymbols' , null ) 
	) ;

	Body_box = markupBox(sheet);
	Body_box.defaultStyle = diy.settings.getTextStyle(
		checkKey( 'Body-style' ) , null 
	) ;
	Body_box.alignment = diy.settings.getTextAlignment( checkKey( 'Body-alignment' ) ) ;
	Body_box.setLineTightness( $Body-tightness ) ;
	for( let index = 0 ; index < LRL.TagList.length ; index++ ){
		let item = LRL.TagList[ index ] ;
		Body_box.setReplacementForTag( 
			$( item + '-tag' ) ,
			$( item + '-tag-replacement' )
		) ;
	}
	for( let index = 0 ; index < LRL.StyleList.length ; index++ ){
		let item = LRL.StyleList[ index ] ;
		Body_box.setStyleForTag(
			$( item + '-tag' ) ,
			diy.settings.getTextStyle( item + '-style' , null )
		) ;
	}
	
	OptionLeft_box = markupBox( sheet ) ;
	OptionLeft_box.defaultStyle = diy.settings.getTextStyle( checkKey( 'OptionLeft-style' ) , null ) ;
	OptionLeft_box.alignment = diy.settings.getTextAlignment( checkKey( 'OptionLeft-alignment' ) ) ;
	
	OptionRight_box = markupBox( sheet ) ;
	OptionRight_box.defaultStyle = diy.settings.getTextStyle( checkKey( 'OptionRight-style' ) , null ) ;
	OptionRight_box.alignment = diy.settings.getTextAlignment( checkKey( 'OptionRight-alignment' ) ) ;
	
	Type_box = markupBox( sheet ) ;
	Type_box.defaultStyle = diy.settings.getTextStyle( checkKey( 'Type-style' ) , null ) ;
	Type_box.alignment = diy.settings.getTextAlignment( checkKey( 'Type-alignment' ) ) ;
	
	Artist_box = markupBox( sheet ) ;
	Artist_box.defaultStyle = diy.settings.getTextStyle( checkKey( 'Artist-style' ) , null ) ;
	Artist_box.alignment = diy.settings.getTextAlignment( checkKey( 'Artist-alignment' ) ) ;
	
	Copyright_box = markupBox( sheet ) ;
	Copyright_box.defaultStyle = diy.settings.getTextStyle(checkKey('Copyright-style'),null);
	Copyright_box.alignment = diy.settings.getTextAlignment(checkKey('Copyright-alignment'));
	
	CollectionInfo_box = markupBox( sheet ) ;
	CollectionInfo_box.defaultStyle = diy.settings.getTextStyle( checkKey( 'CollectionInfo-style' ) , null ) ;
	CollectionInfo_box.alignment = diy.settings.getTextAlignment( checkKey( 'CollectionInfo-alignment' ) ) ;
	
	CollectionNumber_box = markupBox( sheet ) ;
	CollectionNumber_box.defaultStyle = diy.settings.getTextStyle( checkKey( 'CollectionNumber-style' ) , null ) ;
	CollectionNumber_box.alignment = diy.settings.getTextAlignment( checkKey( 'CollectionNumber-alignment' ) ) ;
}

function paintFront( g, diy, sheet ){

/* PORTRAIT */
	if( typeof( SE2CARD ) != 'undefined' ){
		sheet.paintPortrait( g ) ;
	}else{
		PortraitList[ PORTRAIT ].paint( g , sheet.getRenderTarget() ) ;
	}

/* TEMPLATE */
	if( $Template == 'CustomSphere' ){
		let hsb = diy.settings.getTint( 'Template-tint' ) ;
		SphereText_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
		BodyIcon_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
		sheet.paintImage( 
			g ,
			SphereText_tinter.getTintedImage() ,
			checkKey( 'sphereText-region' )
		) ;
		BodyIcon_tinter.setImage( PortraitList[ BODYICON ].getImage() ) ;
		sheet.paintImage(
			g , 
			ImageUtilities.alphaComposite( 
				BodyIcon_tinter.getTintedImage() , 
				Number( $BodyIcon-transparency) / 10 
			) ,
			checkKey( 'BodyIcon-portrait-clip-region' )
		) ;
	}else{
		sheet.paintImage(
			g ,
			checkKey( 'sphereText' ) ,
			checkKey( 'sphereText-region' )
		) ;
	}
	sheet.paintTemplateImage( g ) ;
	switch( String( $Template ) ){
	case 'Neutral' : break ;
	case 'CustomSphere' :
		sheet.paintImage( 
			g ,
			checkKey( 'sphereDeco' ) ,
			checkKey( 'sphereDeco-region' )
		) ;
		let hsb = diy.settings.getTint( 'Template-tint' ) ;
		SphereColour_tinter.setFactors(
			hsb[0] , hsb[1] , (hsb[2]/3)+0.67
		) ;
		sheet.paintImage(
			g ,
			SphereColour_tinter.getTintedImage() ,
			checkKey( 'sphereColour1-region' )
		) ;
		sheet.paintImage(
			g ,
			SphereColour_tinter.getTintedImage() ,
			checkKey( 'sphereColour2-region' )
		) ;
		break ;
	default:
		sheet.paintImage( 
			g ,
			checkKey( 'sphereDeco' ) ,
			checkKey( 'sphereDeco-region' ) 
		);
		sheet.paintImage( 
			g ,
			ImageUtils.get( 'TheLordOfTheRingsLCG/image/' + $Template + '-sc.png' ) ,
			checkKey( 'sphereColour1-region' ) 
		) ;
		sheet.paintImage( 
			g ,
			ImageUtils.get( 'TheLordOfTheRingsLCG/image/' + $Template + '-sc.png' ) , 
			checkKey( 'sphereColour2-region' )
		) ;
	}

/* ICONS */
	if(diy.settings.getBoolean('LRL-NoBottom',false) === false) paintIcon( COLLECTION , g , sheet ) ;
	paintIcon( CUSTOMSPHERE , g , sheet ) ;

/* STATS */
	ResourceCost_tinter.setImage(
		ImageUtils.get( 'TheLordOfTheRingsLCG/numbert/' + $ResourceCost + '.png' ) 
	) ;
	sheet.paintImage( 
		g , 
		ResourceCost_tinter.getTintedImage() , 
		checkKey( 'ResourceCost-region' )
	) ;
	sheet.paintImage( 
		g , 
		ImageUtils.get( 'TheLordOfTheRingsLCG/number/' + $Willpower + '.png' ) ,
		checkKey( 'Willpower-region' ) 
	) ;
	sheet.paintImage( 
		g , 
		ImageUtils.get( 'TheLordOfTheRingsLCG/number/' + $Attack + '.png' ) ,
		checkKey( 'Attack-region' ) 
	) ;
	sheet.paintImage( 
		g , 
		ImageUtils.get( 'TheLordOfTheRingsLCG/number/' + $Defense + '.png' ) ,
		checkKey( 'Defense-region' ) 
	) ;
	HitPoints_tinter.setImage( 
		ImageUtils.get( 'TheLordOfTheRingsLCG/numbert/' + $HitPoints + '.png' ) 
	) ;
	sheet.paintImage( 
		g , 
		HitPoints_tinter.getTintedImage() , 
		checkKey( 'HitPoints-region' ) 
	) ;

/* TEXTS */
	drawName( g , diy ) ;
	drawBody( new Array( 'Trait' , 'Rules' , 'Flavour' ) , g , diy ) ;
	drawOptionLeft( g , diy , sheet ) ;
	drawOptionRight( g , diy , sheet ) ;
	drawType( g , diy ) ;
	drawArtist( g , diy ) ;
	drawCopyright( g , diy ) ;
	drawCollectionInfo( g , diy ) ;
	drawCollectionNumber( g , diy ) ;

/*FINISH*/
	saveLocalized( diy ) ;

}

if( sourcefile == 'Quickscript' ){
	Settings.shared.addSettingsFrom( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/settings/'+Card+'.settings' ) ;
	Settings.shared.addSettingsFrom( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.settings' ) ;
	Settings.shared.addSettingsFrom( 'project:TheLordOfTheRingsLCG-B/resources/TheLordOfTheRingsLCG/LRL-B.settings' ) ;
	Settings.shared.addSettingsFrom( 'project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/LRL-I.settings' ) ;
	Settings.shared.addSettingsFrom( 'project:TheLordOfTheRingsLCG-P/resources/TheLordOfTheRingsLCG/LRL-P.settings' ) ;
	Settings.shared.addSettingsFrom( 'project:TheLordOfTheRingsLCG-PHD/resources/TheLordOfTheRingsLCG/LRL-PHD.settings' ) ;
	useLibrary( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.js' ) ;
	Eons.namedObjects.LRL = new gameObject() ;
	useLibrary( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/diy/LRL-library.js' ) ;
	GameLanguage.addStrings( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/LRL-game' ) ;
	InterfaceLanguage.addStrings( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/LRL-interface' ) ;
	InterfaceLanguage.addStrings( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/LRL-icons' ) ;
	testDIYScript() ;
}else{
	useLibrary( 'res://TheLordOfTheRingsLCG/diy/LRL-library.js' ) ;
}
