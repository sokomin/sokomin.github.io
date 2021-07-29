
var xmlData;
var MOBList = null;
var ResultAry = new Array();

var ContentDisplayCount = 10;	//コンテンツの1ページ最大表示数
var CreateCount = 1;	//枠の作成数 初期値1

$(document).ready(
	function(){
		//var fName = "http://dl.dropbox.com/u/70568694/MonsterDataBase/MonsterList.xml";
		var fName = "MonsterList.xml";
		httpObj = createXMLHttpRequest(LoadingData);
		if (httpObj)
		{
			httpObj.open("GET", fName, true);
			//httpObj.open("GET","http://allow-any-origin.appspot.com/" + fName, true);		
			httpObj.send(null);
		}
	}
);

function createXMLHttpRequest(cbFunc)
{
	var XMLhttpObject = null;
	try{
		XMLhttpObject = new XMLHttpRequest();
	}catch(e){
		try{
			XMLhttpObject = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				XMLhttpObject = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){
				return null;
			}
		}
	}
	if (XMLhttpObject) XMLhttpObject.onreadystatechange = cbFunc;;
	return XMLhttpObject;
}

function LoadingData()
{
	if ((httpObj.readyState == 4) && (httpObj.status == 200))
	{
		xmlData = httpObj.responseXML;
		MOBList = $(xmlData).find("Monster").each(function(){
			return $(this);
		});		
		$("#status").empty().append("<font color=\"#FFFFFF\">OK</font>");
		
		var Mode = $.getUrlVar('Mode');
		SearchOfKeyword(Mode);
		DisplayDataAry(0);
	}
	else
	{
		$("#status").empty().append("<font color=\"#FFFFFF\">Now Loading...</font>");
	}
}

$.extend({
	getUrlVars: function(){
    	var vars = [], hash;
    	var hashes;
    	if((window.location.href.indexOf('#')) == -1)
    	{
    		hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    	}
    	else
    	{
    		hashes = window.location.href.slice(window.location.href.indexOf('?') + 1, window.location.href.indexOf('#')).split('&');
    	}
    	for(var i = 0; i < hashes.length; i++)
   		{
      		hash = hashes[i].split('=');
      		vars.push(hash[0]);
      		vars[hash[0]] = decodeURI(hash[1]);
    	}
    	return vars;
  	},
  	getUrlVar: function(name){
    	return $.getUrlVars()[name];
  	}
});

function SearchOfKeyword(Mode)
{
	ResultAry.length = 0;		//グローバル配列の再初期化
	//種族、系統検索
	if(Mode == 1)
	{
		var SearchSpecies = $.getUrlVar('type');
		var SearchLineage = $.getUrlVar('Lin');
		if(SearchSpecies.length　&& SearchLineage.length)
		{
			var acnt = 0;
			$(xmlData).find("Monster").each(function(){
				var mSpe = $(this).find("Species").text();
				var mLin = $(this).find("Lineage").text();
				if((mSpe.indexOf(SearchSpecies , 0) != -1) && (mLin.indexOf(SearchLineage , 0) != -1))
				{
					var id = $(this).attr("id");
					ResultAry[acnt++] = id;
				}
			});
		}		
	}
	//キーワード検索
	else if(Mode == 2)
	{
		var SearchWord = $.getUrlVar('keyword');
		if(SearchWord.length)
		{
			var acnt = 0;
			$(xmlData).find("Monster").each(function(){
				var mName = $(this).find("MonsterName").text();
				if(mName.indexOf(SearchWord , 0) != -1)
				{
					var id = $(this).attr("id");
					ResultAry[acnt++] = id;
				}
			});
		}		
	}
	//ページ選管なし検索
	else if(Mode == 3)
	{
		var SearchWord = document.searchform1.keyword.value;
		if(SearchWord.length)
		{
			var acnt = 0;
			$(xmlData).find("Monster").each(function(){
				var mName = $(this).find("MonsterName").text();
				if(mName.indexOf(SearchWord , 0) != -1)
				{
					var id = $(this).attr("id");
					ResultAry[acnt++] = id;
				}
			});
		}
	}
	//モンスタースキル検索
	else if(Mode == 4)
	{
		var SearchWord = $.getUrlVar('keyword');
		if(SearchWord.length)
		{
			var acnt = 0;
			$(xmlData).find("Monster").each(function(){
				var mName = $(this).find("MonsterSkill").text();
				if(mName.indexOf(SearchWord , 0) != -1)
				{
					var id = $(this).attr("id");
					ResultAry[acnt++] = id;
				}
			});
		}
	}	
}

function DisplayDataAry(pageNumber)
{
	var ResultStr = "";
	var sIndex = 0;
	var eIndex = 0;

	var pageLoopCount = CreatepIndex("pheader", pageNumber);
	CreatepIndex("pfooter", pageNumber);	
	CreateTable(ContentDisplayCount);
	SetString(ContentDisplayCount);

	if(ResultAry.length)
	{
		sIndex = pageNumber * ContentDisplayCount + 1;	
		for(var j = 0 ; j < ContentDisplayCount; j++) 
		{
			var aryIndex = j + (pageNumber * ContentDisplayCount);
			if(aryIndex < ResultAry.length)
			{
				eIndex = aryIndex + 1;
				SettingData(ResultAry[aryIndex], j);
			}
		}
		$("#s_result").empty().append(ResultAry.length + "件のモンスターが該当しました。  " + sIndex + "件目から" + eIndex + "件目までの表示");
	}
	else
	{
		$("#s_result").empty().append("該当モンスターはありませんでした。");
	}
}

function SettingData(mobNumber, Count)
{
	var $Target;

	//ここに入った時点で表示できる
	$Target = $("#" + "tmain" + Count);
	$Target.css({"display": "block"});
	
	var $stMOB = $(MOBList[mobNumber]);
	//Mobid
	$Target = $("#" + "tmain" + Count + "flv");
	$Target.attr("name", mobNumber);
	//MonsterName
	var mName = $stMOB.find("MonsterName").text();
	$Target = $("#" + "tmain" + Count + "name");
	$Target.text(mName).attr("title", mobNumber);
	//Species
	var mSpc = $stMOB.find("Species").text();
	if(mSpc == 0){ mSpc = "アンデッド型"; }
	if(mSpc == 1){ mSpc = "人間型"; }
	if(mSpc == 2){ mSpc = "悪魔型"; }
	if(mSpc == 3){ mSpc = "動物型"; }
	if(mSpc == 4){ mSpc = "神獣型"; }
	$Target = $("#" + "tmain" + Count +"fty" + 0);
	$Target.val(mSpc);
	//Lineage
	var mLin = $stMOB.find("Lineage").text();
	if(mLin == 0){ mLin = "一般1"; }
	if(mLin == 1){ mLin = "一般2"; }
	if(mLin == 2){ mLin = "一般3"; }
	if(mLin == 3){ mLin = "一般4"; }
	if(mLin == 4){ mLin = "セミボス1"; }
	if(mLin == 5){ mLin = "セミボス2"; }
	if(mLin == 6){ mLin = "セミボス3"; }
	if(mLin == 7){ mLin = "ボス1"; }
	if(mLin == 8){ mLin = "ボス2"; }
	if(mLin == 9){ mLin = "ボス3"; }
	$Target = $("#" + "tmain" + Count + "fty" + 1);
	$Target.val(mLin);
	//Image
	var mImage = $stMOB.find("EffectId").text();
	mImage = "./MonsterImage/" + mImage.toLowerCase() + ".png";
	$Target = $("#" + "tmain" + Count + "image");
	$Target.append($("<img />").attr({
		src: mImage,
		alt: "NoImage"
	}));
	//Skill
	var mSkill = $stMOB.find("MonsterSkill").text();
	$Target = $("#" + "tmain" + Count + "skill");
	$Target.append($('<br />')).append($('<p />').css({
		"margin": "5px 3px",
		"color": "#FFFFFF"
	}).append(mSkill));
	//DropItemType
	var mDtype = $stMOB.find("DropItemType").text();
	$Target = $("#" + "tmain" + Count + "dtype");
	$Target.append($('<br />')).append($('<p />').css({
		"margin": "5px 3px",
		"color": "#FFFFFF"
	}).append(mDtype));
	
	StatusUpdate("tmain" + Count, mobNumber);
}

function StatusUpdate(tableid, mobid)
{
	var $stMOB = $(MOBList[mobid]);
	
	var MobLv = $("#" + tableid + "flv").val();
	if(MobLv === ""){ MobLv = 1; }
	else{ MobLv = parseFloat(MobLv); }
	
	var Hp1 = parseFloat($stMOB.find("DefaultHP").text()) / 100.0; 			//基礎HP　	係数/100
	var Hp2 = parseFloat($stMOB.find("LevelUpBonus").text()) / 10.0;		//上昇HP　	係数/10
	var Hp3 = parseFloat($stMOB.find("ConditionBonus").text()) / 10.0;		//健康補正 	係数/10
	
	var STRup = parseFloat($stMOB.find("STR").text()) * parseFloat($stMOB.find("StatusFactor").text()) / 100000.0;		//力上昇  	力基礎/100000
	var AGIup = parseFloat($stMOB.find("AGI").text()) * parseFloat($stMOB.find("StatusFactor").text()) / 100000.0;		//敏捷上昇  	力基礎/100000
	var CONup = parseFloat($stMOB.find("CON").text()) * parseFloat($stMOB.find("StatusFactor").text()) / 100000.0;		//健康上昇  	力基礎/100000
	var INTup = parseFloat($stMOB.find("INT").text()) * parseFloat($stMOB.find("StatusFactor").text()) / 100000.0;		//知識上昇  	力基礎/100000
	var WISup = parseFloat($stMOB.find("WIS").text()) * parseFloat($stMOB.find("StatusFactor").text()) / 100000.0;		//知恵上昇  	力基礎/100000
	var CHSup = parseFloat($stMOB.find("CHS").text()) * parseFloat($stMOB.find("StatusFactor").text()) / 100000.0;		//威厳上昇  	力基礎/100000
	var LUCup = parseFloat($stMOB.find("LUC").text()) * parseFloat($stMOB.find("StatusFactor").text()) / 100000.0;		//運上昇  	力基礎/100000
	
	var AtcMinup = parseFloat($stMOB.find("AtcMinValueBonus").text()) / 100.0;		//最小攻撃力上昇	最小攻撃上昇/100
	var AtcMaxup = parseFloat($stMOB.find("AtcMaxValueBonus").text()) / 100.0;		//最大攻撃力上昇	最大攻撃上昇/100
	var Defup = parseFloat($stMOB.find("DefenseValueBonus").text()) / 100.0;		//防御力上昇		防御力上昇/100
	var AtcSpeed = parseFloat($stMOB.find("AtcSpeed").text()) / 100.0;				//攻撃速度		攻撃速度/100
	var MovSpeed = parseFloat($stMOB.find("MovSpeed").text());						//移動速度
	
	var MobSTR = Math.floor(((STRup * (MobLv - 1)) + parseFloat($stMOB.find("STR").text())));			//力最終値
	var MobAGI = Math.floor(((AGIup * (MobLv - 1)) + parseFloat($stMOB.find("AGI").text())));			//敏捷最終値
	var MobCON = Math.floor(((CONup * (MobLv - 1)) + parseFloat($stMOB.find("CON").text())));			//健康最終値
	var MobINT = Math.floor(((INTup * (MobLv - 1)) + parseFloat($stMOB.find("INT").text())));			//知識最終値
	var MobWIS = Math.floor(((WISup * (MobLv - 1)) + parseFloat($stMOB.find("WIS").text())));			//知恵最終値
	var MobCHS = Math.floor(((CHSup * (MobLv - 1)) + parseFloat($stMOB.find("CHS").text())));			//威厳最終値
	var MobLUC = Math.floor(((LUCup * (MobLv - 1)) + parseFloat($stMOB.find("LUC").text())));			//運最終値
	
	var MobHP = Math.floor((Hp2 * MobLv + Hp1 ) + (Hp3 * MobCON));										//HP最終値
	var MobAtcMin = Math.floor((((AtcMinup * (MobLv - 1.0) + parseFloat($stMOB.find("AtcMinValue").text()))) * (1.0 + MobSTR / 200.0)));		//最小攻撃力最終値					
	var MobAtcMax = Math.floor((((AtcMaxup * (MobLv - 1.0) + parseFloat($stMOB.find("AtcMaxValue").text()))) * (1.0 + MobSTR / 200.0)));		//最大攻撃力最終値						
	var MobDef = Math.floor((((Defup * (MobLv - 1.0) + parseFloat($stMOB.find("DefenseValue").text()))) * (1.0 + MobCON / 100.0)));			//防御力最終値
	
	var MobEl_Fire  = Math.floor(parseFloat($stMOB.find("FireResistance").text()) + (MobWIS / 20.0));
	var MobEl_Water = Math.floor(parseFloat($stMOB.find("WaterResistance").text()) + (MobWIS / 20.0));
	var MobEl_Wind  = Math.floor(parseFloat($stMOB.find("WindResistance").text()) + (MobWIS / 20.0));
	var MobEl_Earth = Math.floor(parseFloat($stMOB.find("EarthResistance").text()) + (MobWIS / 20.0));
	var MobEl_Light = Math.floor(parseFloat($stMOB.find("LightResistance").text()) + (MobWIS / 20.0));
	var MobEl_Dark  = Math.floor(parseFloat($stMOB.find("DarkResistance").text()) + (MobWIS / 20.0));
	
	var MobReg_1 = Math.floor(parseFloat($stMOB.find("Resistance1").text()) + (parseFloat($stMOB.find("Resistance10").text()) * ((MobWIS + MobCHS) / 1000.0)));	
	var MobReg_2 = Math.floor(parseFloat($stMOB.find("Resistance2").text()) + (parseFloat($stMOB.find("Resistance10").text()) * ((MobWIS + MobCHS) / 1000.0)));	
	var MobReg_3 = Math.floor(parseFloat($stMOB.find("Resistance3").text()) + (parseFloat($stMOB.find("Resistance10").text()) * ((MobWIS + MobCHS) / 1000.0)));	
	var MobReg_4 = Math.floor(parseFloat($stMOB.find("Resistance4").text()) + (parseFloat($stMOB.find("Resistance10").text()) * ((MobWIS + MobCHS) / 1000.0)));	
	var MobReg_5 = Math.floor(parseFloat($stMOB.find("Resistance5").text()) + (parseFloat($stMOB.find("Resistance10").text()) * ((MobWIS + MobCHS) / 1000.0)));	
	var MobReg_6 = Math.floor(parseFloat($stMOB.find("Resistance6").text()) + (parseFloat($stMOB.find("Resistance10").text()) * ((MobWIS + MobCHS) / 1000.0)));	
	var MobReg_7 = Math.floor(parseFloat($stMOB.find("Resistance7").text()) + (parseFloat($stMOB.find("Resistance10").text()) * ((MobWIS + MobCHS) / 1000.0)));	
	var MobReg_8 = Math.floor(parseFloat($stMOB.find("Resistance8").text()) + (parseFloat($stMOB.find("Resistance10").text()) * ((MobWIS + MobCHS) / 1000.0)));	
	var MobReg_9 = Math.floor(parseFloat($stMOB.find("Resistance9").text()) + (parseFloat($stMOB.find("Resistance10").text()) * ((MobWIS + MobCHS) / 1000.0)));

	var MobReg_10 = Math.floor(parseFloat($stMOB.find("Resistance10").text()) * (1 + ((MobWIS + MobCHS) / 500.0)));				//異常
	var MobReg_11 = Math.floor(parseFloat($stMOB.find("Resistance11").text()) * (1 + ((MobWIS + MobCHS) / 1000.0)));			//低下
	var MobReg_12 = Math.floor(parseFloat($stMOB.find("Resistance12").text()) * (1 + ((MobWIS + MobCHS) / 1000.0)));			//呪い
	
	var MobReg_13 = Math.floor(parseFloat($stMOB.find("Resistance13").text()) * (1 + ((MobWIS + MobCHS) / 1000.0)));			//致命打
	var MobReg_14 = Math.floor(parseFloat($stMOB.find("Resistance14").text()) * (1 + ((MobWIS + MobCHS) / 1000.0)));			//決定打
	
	var ActivRange = parseInt($stMOB.find("ActiveRange").text());		//アクティブ射程
	var Blocking = parseInt($stMOB.find("Blocking").text());			//ブロック率
	var MobExp = Math.floor((parseFloat($stMOB.find("DefaultExp").text()) / 10) * (MobLv + 4));			//基礎経験値
	
	//表示書き換え
	$("#" + tableid + "fab1_0").val(MobHP);
	$("#" + tableid + "fab1_1").val(MobAtcMin + "~" + MobAtcMax);
	$("#" + tableid + "fab1_2").val(MobDef);
	
	$("#" + tableid + "fab2_0").val(AtcSpeed);
	$("#" + tableid + "fab2_1").val(MovSpeed);
	$("#" + tableid + "fab2_2").val(Blocking);
	$("#" + tableid + "fab2_3").val(ActivRange);
	$("#" + tableid + "fab2_4").val(MobExp);
	
	$("#" + tableid + "fst0").val(MobSTR);
	$("#" + tableid + "fst1").val(MobAGI);
	$("#" + tableid + "fst2").val(MobCON);
	$("#" + tableid + "fst3").val(MobINT);
	$("#" + tableid + "fst4").val(MobWIS);
	$("#" + tableid + "fst5").val(MobCHS);
	$("#" + tableid + "fst6").val(MobLUC);
	
	$("#" + tableid + "fel0").val(MobEl_Fire);
	$("#" + tableid + "fel1").val(MobEl_Water);
	$("#" + tableid + "fel2").val(MobEl_Wind);
	$("#" + tableid + "fel3").val(MobEl_Earth);
	$("#" + tableid + "fel4").val(MobEl_Light);
	$("#" + tableid + "fel5").val(MobEl_Dark);
	
	$("#" + tableid + "freg1_0").val(parseInt($stMOB.find("Resistance1").text()));
	$("#" + tableid + "freg1_1").val(parseInt($stMOB.find("Resistance2").text()));
	$("#" + tableid + "freg1_2").val(parseInt($stMOB.find("Resistance3").text()));
	$("#" + tableid + "freg1_3").val(parseInt($stMOB.find("Resistance4").text()));
	$("#" + tableid + "freg1_4").val(parseInt($stMOB.find("Resistance5").text()));
	$("#" + tableid + "freg1_5").val(parseInt($stMOB.find("Resistance6").text()));
	$("#" + tableid + "freg1_6").val(parseInt($stMOB.find("Resistance7").text()));
	$("#" + tableid + "freg1_7").val(parseInt($stMOB.find("Resistance8").text()));
	$("#" + tableid + "freg1_8").val(parseInt($stMOB.find("Resistance9").text()));
	$("#" + tableid + "freg1_9").val(parseInt($stMOB.find("Resistance10").text()));
	$("#" + tableid + "freg1_10").val(parseInt($stMOB.find("Resistance11").text()));
	$("#" + tableid + "freg1_11").val(parseInt($stMOB.find("Resistance12").text()));
	$("#" + tableid + "freg1_12").val(parseInt($stMOB.find("Resistance13").text()));
	$("#" + tableid + "freg1_13").val(parseInt($stMOB.find("Resistance14").text()));
	
	$("#" + tableid + "freg2_0").val(MobReg_1);
	$("#" + tableid + "freg2_1").val(MobReg_2);
	$("#" + tableid + "freg2_2").val(MobReg_3);
	$("#" + tableid + "freg2_3").val(MobReg_4);
	$("#" + tableid + "freg2_4").val(MobReg_5);
	$("#" + tableid + "freg2_5").val(MobReg_6);
	$("#" + tableid + "freg2_6").val(MobReg_7);
	$("#" + tableid + "freg2_7").val(MobReg_8);
	$("#" + tableid + "freg2_8").val(MobReg_9);
	$("#" + tableid + "freg2_9").val(MobReg_10);
	$("#" + tableid + "freg2_10").val(MobReg_11);
	$("#" + tableid + "freg2_11").val(MobReg_12);
	$("#" + tableid + "freg2_12").val(MobReg_13);
	$("#" + tableid + "freg2_13").val(MobReg_14);
	
}

function SetString(num)
{
	var resultTag = "";
	for(var i = 0; i < num; i++)
 	{
 		$("#" + "tmain" + i + "type" + 0).text("種族");
 		$("#" + "tmain" + i + "type" + 1).text("系統");
 		
 		$("#" + "tmain" + i + "abbility1_" + 0).text("HP");
 		$("#" + "tmain" + i + "abbility1_" + 1).text("攻撃力");
 		$("#" + "tmain" + i + "abbility1_" + 2).text("防御力");
 		$("#" + "tmain" + i + "abbility2_" + 0).text("攻撃速度");
 		$("#" + "tmain" + i + "abbility2_" + 1).text("移動速度");
 		$("#" + "tmain" + i + "abbility2_" + 2).text("ブロック率");
 		$("#" + "tmain" + i + "abbility2_" + 3).text("アクティブ射程");
 		$("#" + "tmain" + i + "abbility2_" + 4).text("基礎経験値");
 		
 		$("#" + "tmain" + i + "status" + 0).text("力");
 		$("#" + "tmain" + i + "status" + 1).text("敏捷");
 		$("#" + "tmain" + i + "status" + 2).text("健康");
 		$("#" + "tmain" + i + "status" + 3).text("知識");
 		$("#" + "tmain" + i + "status" + 4).text("知恵");
 		$("#" + "tmain" + i + "status" + 5).text("威厳");
 		$("#" + "tmain" + i + "status" + 6).text("運");
 		
 		$("#" + "tmain" + i + "ereg" + 0).text("火");
 		$("#" + "tmain" + i + "ereg" + 1).text("水");
 		$("#" + "tmain" + i + "ereg" + 2).text("風");
 		$("#" + "tmain" + i + "ereg" + 3).text("土");
 		$("#" + "tmain" + i + "ereg" + 4).text("光");
 		$("#" + "tmain" + i + "ereg" + 5).text("闇");
 		
 		$("#" + "tmain" + i + "reg1_" + 0).text("暗闇");
 		$("#" + "tmain" + i + "reg1_" + 1).text("毒");
 		$("#" + "tmain" + i + "reg1_" + 2).text("睡眠");
 		$("#" + "tmain" + i + "reg1_" + 3).text("コールド");
 		$("#" + "tmain" + i + "reg1_" + 4).text("フリーズ");
 		$("#" + "tmain" + i + "reg1_" + 5).text("スタン");
 		$("#" + "tmain" + i + "reg1_" + 6).text("石化");
 		$("#" + "tmain" + i + "reg1_" + 14).text("混乱");
 		$("#" + "tmain" + i + "reg1_" + 15).text("魅了");
 		$("#" + "tmain" + i + "reg1_" + 16).text("異常");
 		$("#" + "tmain" + i + "reg1_" + 17).text("低下");
 		$("#" + "tmain" + i + "reg1_" + 18).text("呪い");
 		$("#" + "tmain" + i + "reg1_" + 19).text("致命打");
 		$("#" + "tmain" + i + "reg1_" + 20).text("決定打");
 		
  		$("#" + "tmain" + i + "reg2_" + 0).text("暗闇");
 		$("#" + "tmain" + i + "reg2_" + 1).text("毒");
 		$("#" + "tmain" + i + "reg2_" + 2).text("睡眠");
 		$("#" + "tmain" + i + "reg2_" + 3).text("コールド");
 		$("#" + "tmain" + i + "reg2_" + 4).text("フリーズ");
 		$("#" + "tmain" + i + "reg2_" + 5).text("スタン");
 		$("#" + "tmain" + i + "reg2_" + 6).text("石化");
 		$("#" + "tmain" + i + "reg2_" + 14).text("混乱");
 		$("#" + "tmain" + i + "reg2_" + 15).text("魅了");
 		$("#" + "tmain" + i + "reg2_" + 16).text("異常");
 		$("#" + "tmain" + i + "reg2_" + 17).text("低下");
 		$("#" + "tmain" + i + "reg2_" + 18).text("呪い");
 		$("#" + "tmain" + i + "reg2_" + 19).text("致命打");
 		$("#" + "tmain" + i + "reg2_" + 20).text("決定打");		
 	}
 }

function CreateTable(num)
{
	var $div_main = $('<div />');
	for(var i = 0; i < num; i++)
	{	
		var id = "tmain" + i ;
		var $table = $('<table />');
				
		var $tr_Name = $('<tr />');		
		$tr_Name.append($('<th />').attr("id", (id + "name")).addClass("title"));
		$tr_Name.append($('<th />').attr({
			"rowspan": "7",
			"colspan": "2"
		}).css({
			"background-color": "#000000"
		}).append($('<div />').attr("id", (id + "image"))));
			
		var $tr_Lv = $('<tr />');		
		$tr_Lv.append($('<td />').attr({
			"id": (id + "lv"),
			"title": "Lvを変更すると能力値が更新されます。"
		}).text('入力Lv: ').append($('<input />').attr({
			id: id + "flv",
			name: "", 
			type: "text",
			value: "200"
		}).addClass("inputlvform").css("width", "100px").bind("keyup", function(){
			var has = $(this).attr("id");
			has = has.substr(0, (has.length - 3));
			StatusUpdate(has, $(this).attr("name"));
		})));
		
		var $tr_Type = $('<tr />');		
		$tr_Type.append($('<td />').attr("id", (id + "type")).append(CreateSubTable(i, "type", 2, 2)));

		var $tr_Abbility = $('<tr />');		
		$tr_Abbility.append($('<td />').attr("id", (id + "abbility1_")).append(CreateSubTable(i, "abbility1_", 2, 3)));
		
		var $tr_Abbility2 = $('<tr />');		
		$tr_Abbility2.append($('<td />').attr("id", (id + "abbility2_")).append(CreateSubTable(i, "abbility2_", 2, 5)));		

		var $tr_Status = $('<tr />');		
		$tr_Status.append($('<td />').attr("id", (id + "status")).append(($('<div />').css({
			"margin": "3px 0 0 5px",
			"text-align": "left",
			"vertical-align": "top"
		}).text('<基礎能力値> (Lv入力対応)'))).append(CreateSubTable(i, "status", 2, 7)));
		
		var $tr_Ereg = $('<tr />');		
		$tr_Ereg.append($('<td />').attr("id", (id + "ereg")).append(($('<div />').css({
			"margin": "3px 0 0 5px",
			"text-align": "left",
			"vertical-align": "top"
		}).text('<元素抵抗値> (Lv入力対応)'))).append(CreateSubTable(i, "ereg", 2, 6)));		

		var $tr_Reg1 = $('<tr />');		
		$tr_Reg1.append($('<td />').attr("id", (id + "reg1")).append(($('<div />').css({
			"margin": "3px 0 0 5px",
			"text-align": "left",
			"vertical-align": "top"
		}).text('<基礎抵抗値>'))).append(CreateSubTable(i, "reg1_", 4, 7)));
		$tr_Reg1.append($('<td />').attr({
			"id": (id + "skill"),
			"rowspan": "2"
		}).css({
			"padding": "3px 0 0 5px",
			"text-align": "left",
			"vertical-align": "top"
		}).text('<使用スキル>'));
		$tr_Reg1.append($('<td />').attr({
			"id": (id + "dtype"),
			"rowspan": "2"
		}).css({
			"padding": "3px 0 0 5px",
			"text-align": "left",
			"vertical-align": "top"
		}).text('<Dropアイテム>'));	
		
		var $tr_Reg2 = $('<tr />');		
		$tr_Reg2.append($('<td />').attr("id", (id + "reg2")).append(($('<div />').css({
			"margin": "3px 0 0 5px",
			"text-align": "left",
			"vertical-align": "top"
		}).text('<最終抵抗値> (Lv入力対応)'))).append(CreateSubTable(i, "reg2_", 4, 7)));
	 	$table.addClass("mobtable").attr("id", id).css({
	 		display: "none"
	 	});
	 	
	 	$table.append($tr_Name);
	 	$table.append($tr_Lv);
	 	$table.append($tr_Type);
	 	$table.append($tr_Abbility);
	 	$table.append($tr_Abbility2);
	 	$table.append($tr_Status);
	 	$table.append($tr_Ereg);
	 	$table.append($tr_Reg1);
	 	$table.append($tr_Reg2);
		$div_main.append($table);
	}
	$("#m_result").empty().append($div_main);
}

function CreateSubTable (number, idName, col, row)
{
	var con = 0;
	var $table = $('<table />');
	for(var j = 0; j < col; j++)
	{
		var $tr = $('<tr />');	
		for(var i = 0; i < row; i++)
 		{	
			var id = 'tmain' + number + idName + (i + j * row);
			var $div = $('<div />').attr("id", id);
			var $td = $('<td />');
 			if(j % 2 == 0)
 			{
 				$td.css("background-color", "#505050");
 			}
 			else
 			{
 				var fname = "";
 				var fsize = "5px";
 				var $inp = $('<input />');
 				
 				if(idName === 'type'){ fname = 'tmain' + number + 'fty' + con++; fsize = "190px";}
 				if(idName === 'abbility1_'){ fname = 'tmain' + number + 'fab1_' + con++; fsize = "120px";}
 				if(idName === 'abbility2_'){ fname = 'tmain' + number + 'fab2_' + con++; fsize = "75px";}
 				if(idName === 'status'){ fname = 'tmain' + number + 'fst' + con++; fsize = "45px";}
 				if(idName === 'ereg' ){ fname = 'tmain' + number + 'fel' + con++; fsize = "55px";}
 				if(idName === 'reg1_'){ fname = 'tmain' + number + 'freg1_' + con++; fsize = "45px";}
 				if(idName === 'reg2_'){ fname = 'tmain' + number + 'freg2_' + con++; fsize = "45px";}
				$inp.attr({
					id: fname,
					type: "text",
					readonly: ""
				}).addClass("inputform").css("width", fsize);
	    		$div.append($inp);
	    		
 			}
 			$td.append($div);
			$tr.append($td);
		}
		$table.append($tr);
	}
	$table.addClass("subtable");
	return $table;	
}


function CreatepIndex(sValue, pageNumber)
{
	var remainder = ResultAry.length % ContentDisplayCount;	//余
	var quotient = (ResultAry.length - remainder) / ContentDisplayCount;
	var loopcount = quotient;
	if(remainder != 0) { loopcount += 1; }
	
	var $div_main = $('<div />');
	$div_main.append($('<table />').append(function(){
		var $tr = $('<tr />');
		for(var i=0; i<loopcount; i++)
		{
			var $td = $('<td />');
			var $div_a = $('<div />');
			var $a = $('<a />');
			if(i != pageNumber)
			{
				$a.attr({
					href: "#pagetop"
				}).text(i + 1).click(function(){ DisplayDataAry($(this).text()-1) });
				$div_a.append($a);
			}
			else
			{
				$div_a.text(i + 1);
			}
			$div_a.css("margin", "0 2px");
			$tr.append($td.append($div_a));
		}
		return $tr;
	}));
		
	$div_main.addClass("pindex");
	$("#" + sValue).empty().append($div_main);
	return loopcount;
}

