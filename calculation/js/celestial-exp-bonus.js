function init1() {
    document.f.a1.value = 1;

    document.f.b1.value = 0;

    document.f.r1.value = 0;
    document.f.r2.value = 0;

    document.f.b1.options[0] = new Option('2017～最新', 0, 1, 1);
    document.f.b1.options[1] = new Option('2015～2011', 1);
    document.f.b1.options[2] = new Option('2011～2015', 2);
    document.f.b1.options[3] = new Option('2015～2016', 3);
}

function init2() {
    //TODO localstorage辺りから引っ張ってきたい。
}


const exp_2011array = [
    55744517768,
    59220420218,
    62869346790,
    66697739612,
    70712202334,
    74919502296,
    79326572702,
    83940514800,
    88768600068,
    93818272406,
    99097150334,
    104613029196,
    110373883370,
    116387868484,
    122663323638,
    129208773632,
    136032931200,
    143144699250,
    150553173110,
    158267642780,
    166297595190,
    174652716464,
    183342894190,
    192378219696,
    201768990332,
    211525711758,
    221659100238,
    232180084940,
    243099810242,
    254429638044,
    266181150086,
    278366150272,
    290996667000,
    304084955498,
    317643500166,
    331685016924,
    346222455566,
    361269002120,
    376838081214,
    392943358448,
    409598742772,
    426818388870,
    444616699550,
    463008328140,
    482008180890,
    501631419380,
    521893462934,
    542809991040,
    564396945776,
    586670534242,
    609647230998,
    633343780508,
    657777199590,
    682964779872,
    708924090254,
    735672979376,
    763229578092,
    791612301950,
    820839853678,
    850931225676,
    881905702514,
    913782863436,
    946582584870,
    980325042944,
    1015030716008,
    1050720387162,
    1087415146790,
    1125136395100,
    1163905844670,
    1203745523000,
    1244677775070,
    1286725265904,
    1329910983140,
    1374258239606,
    1419790675902,
    1466532262988,
    1514507304778,
    1563740440740,
    1614256648502,
    1666081246464,
    1719239896416,
    1773758606162,
    1829663732150,
    1886981982108,
    1945740417686,
    2005966457104,
    2067687877806,
    2130932819120,
    2195729784924,
    2262107646318,
    2330095644302
];

const exp_2015array = [
    55744226568,
    59218963578,
    62864974950,
    66687534172,
    70691782494,
    74882730456,
    79265259422,
    83844123120,
    88623949188,
    93609240726,
    98803309734,
    104209471812,
    109831046160,
    115671355578,
    121733726466,
    128021488824,
    134537976252,
    141286525950,
    148270478718,
    155493178956,
    162957974664,
    170668217442,
    178627262490,
    186838468608,
    195305198196,
    204030817254,
    213018695382,
    222272205780,
    231794725248,
    241589634186,
    251660316594,
    262010160072,
    272642555820,
    283560898638,
    294768586926,
    306269022684,
    318065611512,
    330161762610,
    342560888778,
    355266406416,
    368281735524,
    381610299702,
    395255526150,
    409220845668,
    423509692656,
    438125505114,
    453071724642,
    468351796440,
    483969169308,
    499927295646,
    516229631454,
    532879636332,
    549880773480,
    567236509698,
    584950315386,
    603025664544,
    621466034772,
    640274907270,
    659455766838,
    679012101876,
    698947404384,
    719265169962,
    739968897810,
    761062090728,
    782548255116,
    804430900974,
    826713541902,
    849399695100,
    872492881368,
    895996625106,
    919914454314,
    944249900592,
    969006499140,
    994187788758,
    1019797311846,
    1045838614404,
    1072315246032,
    1099230759930,
    1126588712898,
    1154392665336,
    1182646181244,
    1211352828222,
    1240516177470,
    1270139803788,
    1300227285576,
    1330782204834,
    1361808147162,
    1393308701760,
    1425287461428,
    1457748022566,
    1490693985174
];

const exp_2017array = [250,
    420,
    770,
    1200,
    1710,
    2300,
    3190,
    4200,
    5330,
    6580,
    7950,
    9440,
    11390,
    13500,
    15770,
    18200,
    20790,
    23540,
    26450,
    29520,
    33250,
    37180,
    41310,
    45640,
    50170,
    54900,
    59830,
    64960,
    70290,
    75820,
    82250,
    88920,
    95830,
    102980,
    110370,
    118000,
    125870,
    133980,
    142330,
    150920,
    159750,
    168820,
    179070,
    189600,
    200410,
    211500,
    222870,
    234520,
    246450,
    258660,
    271150,
    283920,
    296970,
    310300,
    323910,
    337800,
    353190,
    368900,
    384930,
    401280,
    417950,
    434940,
    452250,
    469880,
    487830,
    506100,
    524690,
    543600,
    562830,
    582380,
    602250,
    622440,
    644490,
    666900,
    689670,
    712800,
    736290,
    760140,
    784350,
    808920,
    833850,
    859140,
    884790,
    910800,
    937170,
    963900,
    990990,
    1018440,
    1046250,
    1074420,
    1104850,
    1135680,
    1166910,
    1198540,
    1230570,
    1263000,
    1295830,
    1329060,
    1362690,
    1396720,
    1431150,
    1465980,
    1501210,
    1536840,
    1572870,
    1609300,
    1646130,
    1683360,
    1720990,
    1759020,
    1799750,
    1840920,
    1882530,
    1924580,
    1967070,
    2010000,
    2053370,
    2097180,
    2141430,
    2186120,
    2231250,
    2276820,
    2322830,
    2369280,
    2416170,
    2463500,
    2511270,
    2559480,
    2608130,
    2657220,
    2706750,
    2756720,
    2809870,
    2863500,
    2917610,
    2972200,
    3027270,
    3082820,
    3138850,
    3195360,
    3252350,
    3309820,
    3367770,
    3426200,
    3485110,
    3544500,
    3604370,
    3664720,
    3725550,
    3786860,
    3848650,
    3910920,
    3973670,
    4036900,
    4100610,
    4164800,
    4232690,
    4301100,
    4370030,
    4439480,
    4509450,
    4579940,
    4650950,
    4722480,
    4794530,
    4867100,
    4940190,
    5013800,
    5087930,
    5162580,
    5237750,
    5313440,
    5389650,
    5466380,
    5543630,
    5621400,
    5699690,
    5778500,
    5857830,
    5937680,
    6018050,
    6098940,
    6184090,
    6269800,
    6356070,
    6442900,
    6530290,
    6618240,
    6706750,
    6795820,
    6885450,
    6975640,
    7066390,
    7157700,
    7249570,
    7342000,
    7434990,
    7528540,
    7622650,
    7717320,
    7812550,
    7908340,
    8004690,
    8101600,
    8199070,
    8297100,
    8395690,
    8494840,
    8594550,
    8694820,
    8799950,
    8905680,
    9012010,
    9118940,
    9226470,
    9334600,
    9443330,
    9552660,
    9662590,
    9773120,
    9884250,
    9995980,
    10108310,
    10221240,
    10334770,
    10448900,
    10563630,
    10678960,
    10794890,
    10911420,
    11028550,
    11146280,
    11264610,
    11383540,
    11503070,
    11623200,
    11743930,
    11865260,
    11987190,
    12109720,
    12237750,
    12366420,
    12495730,
    12625680,
    12756270,
    12887500,
    13019370,
    13151880,
    13285030,
    13418820,
    13553250,
    13688320,
    13824030,
    13960380,
    14097370,
    14235000,
    14373270,
    14512180,
    14651730,
    14791920,
    14932750,
    15074220,
    15216330,
    15359080,
    15502470,
    15646500,
    15791170,
    15936480,
    16082430,
    16229020,
    16376250,
    16524120,
    16678170,
    16832900,
    16988310,
    17144400,
    17301170,
    17458620,
    17616750,
    17775560,
    17935050,
    18095220,
    18256070,
    18417600,
    18579810,
    18742700,
    18906270,
    19070520,
    19235450,
    19401060,
    19567350,
    19734320,
    19901970,
    20070300,
    20239310,
    20409000,
    20579370,
    20750420,
    20922150,
    21094560,
    21267650,
    21441420,
    21615870,
    21791000,
    21966810,
    22143300,
    22326690,
    22510800,
    22695630,
    22881180,
    23067450,
    23254440,
    23442150,
    23630580,
    23819730,
    24009600,
    24200190,
    24391500,
    24583530,
    24776280,
    24969750,
    25163940,
    25358850,
    25554480,
    25750830,
    25947900,
    26145690,
    26344200,
    26543430,
    26743380,
    26944050,
    27145440,
    27347550,
    27550380,
    27753930,
    27958200,
    28163190,
    28368900,
    28575330,
    28782480,
    28990350,
    29198940,
    29415190,
    29632200,
    29849970,
    30068500,
    30287790,
    30507840,
    30728650,
    30950220,
    31172550,
    31395640,
    31619490,
    31844100,
    32069470,
    32295600,
    32522490,
    32750140,
    32978550,
    33207720,
    33437650,
    33668340,
    33899790,
    34132000,
    34364970,
    34598700,
    34833190,
    35068440,
    35304450,
    35541220,
    35778750,
    36017040,
    36256090,
    36495900,
    36736470,
    36977800,
    37219890,
    37462740,
    37706350,
    37950720,
    38203550,
    38457180,
    38711610,
    38966840,
    39222870,
    39479700,
    39737330,
    39995760,
    40254990,
    40515020,
    40775850,
    41037480,
    41299910,
    41563140,
    41827170,
    42092000,
    42357630,
    42624060,
    42891290,
    43159320,
    43428150,
    43697780,
    43968210,
    44239440,
    44511470,
    44784300,
    45057930,
    45332360,
    45607590,
    45883620,
    46160450,
    46438080,
    46716510,
    46995740,
    47275770,
    47556600,
    47838230,
    48120660,
    48403890,
    48687920,
    48981250,
    49275420,
    49570430,
    49866280,
    50162970,
    50460500,
    50758870,
    51058080,
    51358130,
    51659020,
    51960750,
    52263320,
    52566730,
    52870980,
    53176070,
    53482000,
    53788770,
    54096380,
    54404830,
    54714120,
    55024250,
    55335220,
    55647030,
    55959680,
    56273170,
    56587500,
    56902670,
    57218680,
    57535530,
    57853220,
    58171750,
    58491120,
    58811330,
    59132380,
    59454270,
    59777000,
    60100570,
    60424980,
    60750230,
    61076320,
    61403250,
    61731020,
    62068970,
    62407800,
    62747510,
    63088100,
    63429570,
    63771920,
    64115150,
    64459260,
    64804250,
    65150120,
    65496870,
    65844500,
    66193010,
    66542400,
    66892670,
    67243820,
    67595850,
    67948760,
    68302550,
    68657220,
    69012770,
    69369200,
    69726510,
    70084700,
    70443770,
    70803720,
    71164550,
    71526260,
    71888850,
    72252320,
    72616670,
    72981900,
    73348010,
    73715000,
    74082870,
    74451620,
    74821250,
    75191760,
    75563150,
    75935420,
    76308570,
    76682600,
    77057510,
    77433300,
    77820190,
    78208000,
    78596730,
    78986380,
    79376950,
    79768440,
    80160850,
    80554180,
    80948430,
    81343600,
    81739690,
    82136700,
    82534630,
    82933480,
    83333250,
    83733940,
    84135550,
    84538080,
    84941530,
    85345900,
    85751190,
    86157400,
    86564530,
    86972580,
    87381550,
    87791440,
    88202250,
    88613980,
    89026630,
    89440200,
    89854690,
    90270100,
    90686430,
    91103680,
    91521850,
    91940940,
    92360950,
    92781880,
    93203730,
    93626500,
    94050190,
    94474800,
    94900330,
    95326780,
    95754150,
    96182440,
    96622790,
    97064100,
    97506370,
    97949600,
    98393790,
    98838940,
    99285050,
    99732120,
    100180150,
    100629140,
    101079090,
    101530000,
    101981870,
    102434700,
    102888490,
    103343240,
    103798950,
    104255620,
    104713250,
    105171840,
    105631390,
    106091900,
    106553370,
    107015800,
    107479190,
    107943540,
    108408850,
    108875120,
    109342350,
    109810540,
    110279690,
    110749800,
    111220870,
    111692900,
    112165890,
    112639840,
    113114750,
    113590620,
    114067450,
    114545240,
    115023990,
    115503700,
    115984370,
    116466000,
    116948590,
    117432140,
    117916650,
    118402120,
    118900650,
    119400180,
    119900710,
    120402240,
    120904770,
    121408300,
    121912830,
    122418360,
    122924890,
    123432420,
    123940950,
    124450480,
    124961010,
    125472540,
    125985070,
    126498600,
    127013130,
    127528660,
    128045190,
    128562720,
    129081250,
    129600780,
    130121310,
    130642840,
    131165370,
    131688900,
    132213430,
    132738960,
    133265490,
    133793020,
    134321550,
    134851080,
    135381610,
    135913140,
    136445670,
    136979200,
    137513730,
    138049260,
    138585790,
    139123320,
    139661850,
    140201380,
    140741910,
    141283440,
    141825970,
    142369500,
    142914030,
    143459560,
    144006090,
    144553620,
    145115250,
    145677920,
    146241630,
    146806380,
    147372170,
    147939000,
    148506870,
    149075780,
    149645730,
    150216720,
    150788750,
    151361820,
    151935930,
    152511080,
    153087270,
    153664500,
    154242770,
    154822080,
    155402430,
    155983820,
    156566250,
    157149720,
    157734230,
    158319780,
    158906370,
    159494000,
    160082670,
    160672380,
    161263130,
    161854920,
    162447750,
    163041620,
    163636530,
    164232480,
    164829470,
    165427500,
    166026570,
    166626680,
    167227830,
    167830020,
    168433250,
    169037520,
    169642830,
    170249180,
    170856570,
    171465000,
    172074470,
    172684980,
    173296530,
    173909120,
    174522750,
    175137420,
    175767270,
    176398200,
    177030210,
    177663300,
    178297470,
    178932720,
    179569050,
    180206460,
    180844950,
    181484520,
    182125170,
    182766900,
    183409710,
    184053600,
    184698570,
    185344620,
    185991750,
    186639960,
    187289250,
    187939620,
    188591070,
    189243600,
    189897210,
    190551900,
    191207670,
    191864520,
    192522450,
    193181460,
    193841550,
    194502720,
    195164970,
    195828300,
    196492710,
    197158200,
    197824770,
    198492420,
    199161150,
    199830960,
    200501850,
    201173820,
    201846870,
    202521000,
    203196210,
    203872500,
    204549870,
    205228320,
    205907850,
    206588460,
    207270150,
    207952920,
    208636770,
    209321700,
    210007710,
    210694800,
    211398190,
    212102700,
    212808330,
    213515080,
    214222950,
    214931940,
    215642050,
    216353280,
    217065630,
    217779100,
    218493690,
    219209400,
    219926230,
    220644180,
    221363250,
    222083440,
    222804750,
    223527180,
    224250730,
    224975400,
    225701190,
    226428100,
    227156130,
    227885280,
    228615550,
    229346940,
    230079450,
    230813080,
    231547830,
    232283700,
    233020690,
    233758800,
    234498030,
    235238380,
    235979850,
    236722440,
    237466150,
    238210980,
    238956930,
    239704000,
    240452190,
    241201500,
    241951930,
    242703480,
    243456150,
    244209940,
    244964850,
    245720880,
    246478030,
    247236300,
    247995690,
    248756200,
    249517830,
    250280580,
    251044450,
    251809440,
    252591890,
    253375500,
    254160270,
    254946200,
    255733290,
    256521540,
    257310950,
    258101520,
    258893250,
    259686140,
    260480190,
    261275400,
    262071770,
    262869300,
    263667990,
    264467840,
    265269680,
    266076834,
    266896790,
    267742876,
    268635942,
    269606048,
    270694158,
    271953840,
    273452972,
    275275454,
    277522926,
    280316492,
    283798450,
    288134028,
    293513126,
    300152064,
    308295336,
    318217370,
    330224294,
    344655708,
    361886462,
    382328440,
    406432350,
    434689520,
    467633700,
    505842870,
    549941054,
    600600140,
    658541706,
    724538852,
    799418038,
    884060928,
    979406240,
    1086451602,
    1206255414,
    1339938716,
    1488687062,
    1653752400,
    1836454958,
    2038185136,
    2260405404,
    2504652206,
    2772537870,
    3065752524,
    3386066018,
    3735329852,
    4115479110,
    4528534400,
    4976603800,
    5461884810,
    5986666310,
    6553330524,
    7164354990,
    7822314536,
    8529883262,
    9289836528,
    10105052948,
    10978516390,
    11913317982,
    12912658124,
    13979848506,
    15118314132,
    16331595350,
    17623349888,
    18997354896,
    20457508994,
    22007834326,
    23652478620,
    25395717254,
    27241955328,
    29195729742,
    31261711280,
    33444706700,
    35749660830,
    38181658670,
    40745927500,
    43447838994,
    46292911340,
    49286811366,
    52435356672,
    55744226568,
    59218963578,
    62864974950,
    66687534172,
    70691782494,
    74882730456,
    79265259422,
    83844123120,
    88623949188,
    93609240726,
    98803309734,
    98804257404,
    98805217074,
    98806188744,
    98807172414,
    98808168084,
    98809175754,
    98810195424,
    98811227094,
    98812270764,
    98813326434,
    98814413164,
    98815512294,
    98816623824,
    98817747754,
    98818884084,
    98820032814,
    98821193944,
    98822367474,
    98823553404,
    98824751734,
    98825962464,
    98827185594,
    98828421124,
    98829669054,
    98830929384,
    98832202114,
    98833487244,
    98834784774,
    98836094704,
    98837417034,
    98838751764,
    98840098894,
    98841458424,
    98842830354,
    98844214684,
    98845611414,
    98847020544,
    98848442074,
    98849876004,
    98851322334,
    98852781064,
    98854252194,
    98855735724,
    98857231654,
    98858739984,
    98860260714,
    98861793844,
    98863339374,
    98864897304,
    98866467634,
    98868050364,
    98869645494,
    98871253024,
    98872872954,
    98874505284,
    98876150014,
    98877807144,
    98879476674,
    98881158604,
    98882852934,
    98884559664,
    98886278794,
    98888010324,
    98889754254,
    98891510584,
    98893279314,
    98895060444,
    98896853974,
    98898659904,
    98900478234,
    98902308964,
    98904152094,
    98906039084,
    98907938874,
    98909851464,
    98911776854,
    98913715044,
    98915666034,
    98917629824,
    98919606414,
    98921595804,
    98923597994,
    98925612984,
    98927640774,
    98929681364,
    98931734754,
    98933800944,
    98935879934,
    98937971724,
    98940076314,
    98942193704,
    98944323894,
    98946466884,
    98948622674,
    98950791264,
    98952972654,
    98955166844,
    98957373834,
    98959593624,
    98961826214,
    98964071604,
    98966329794,
    98968600784,
    98970884574,
    98973181164,
    98975490554,
    98977812744,
    98980147734,
    98982495524,
    98984856114,
    98987229504,
    98989615694,
    98992014684,
    98994426474,
    98996851064,
    98999288454,
    99001738644,
    99004201634,
    99006677424,
    99009166014,
    99011667404,
    99014181594,
    99016708584,
    99019248374,
    99021800964,
    99024366354,
    99026944544,
    99029535534,
    99032139324,
    99034755914,
    99037385304,
    99040027494,
    99042682484,
    99045350274,
    99048030864,
    99050724254,
    99053474704,
    99056238354,
    99059015204,
    99061805254,
    99064608504,
    99067424954,
    99070254604,
    99073097454,
    99075953504,
    99078822754,
    99081705204,
    99084600854,
    99087509704,
    99090431754,
    99093367004,
    99096315454,
    99099277104,
    99102251954,
    99105240004,
    99108241254,
    99111255704,
    99114283354,
    99117324204,
    99120378254,
    99123445504,
    99126525954,
    99129619604,
    99132726454,
    99135846504,
    99138979754,
    99142126204,
    99145285854,
    99148458704,
    99151644754,
    99154844004,
    99158056454,
    99161282104,
    99164520954,
    99167773004,
    99171038254,
    99174316704,
    99177608354,
    99180913204,
    99184231254,
    99187562504,
    99190906954,
    99194264604,
    99197635454,
    99201019504,
    99204416754,
    99207827204,
    99211250854,
    99214687704,
    99218137754,
    99221601004,
    99225077454,
    99228567104,
    99232069954,
    99235586004,
    99239115254,
    99242657704,
    99246213354,
    99249782204,
    99253364254,
    99256959504,
    99260567954,
    99264247064,
    99267939774,
    99271646084,
    99275365994,
    99279099504,
    99282846614,
    99286607324,
    99290381634,
    99294169544,
    99297971054,
    99301786164,
    99305614874,
    99309457184,
    99313313094,
    99317182604,
    99321065714,
    99324962424,
    99328872734,
    99332796644,
    99336734154,
    99340685264,
    99344649974,
    99348628284,
    99352620194,
    99356625704,
    99360644814,
    99364677524,
    99368723834,
    99372783744,
    99376857254,
    99380944364,
    99385045074,
    99389159384,
    99393287294,
    99397428804,
    99401583914,
    99405752624,
    99409934934,
    99414130844,
    99418340354,
    99422563464,
    99426800174,
    99431050484,
    99435314394,
    99439591904,
    99443883014,
    99448187724,
    99452506034,
    99456837944,
    99461183454,
    99465542564,
    99469915274,
    99474301584,
    99478701494,
    99483115004,
    99487542114,
    99491982824,
    99496437134,
    99500905044,
    99505386554,
    99509881664,
    99514390374,
    99518912684,
    99523448594,
    99527998104,
    99532561214,
    99537137924,
    99541728234,
    99546404204,
    99551095174,
    99555801144,
    99560522114,
    99565258084,
    99570009054,
    99574775024,
    99579555994,
    99584351964,
    99589162934,
    99593988904,
    99598829874,
    99603685844,
    99608556814,
    99613442784,
    99618343754,
    99623259724,
    99628190694,
    99633136664,
    99638097634,
    99643073604,
    99648064574,
    99653070544,
    99658091514,
    99663127484,
    99668178454,
    99673244424,
    99678325394,
    99683421364,
    99688532334,
    99693658304,
    99698799274,
    99703955244,
    99709126214,
    99714312184,
    99719513154,
    99724729124,
    99729960094,
    99735206064,
    99740467034,
    99745743004,
    99751033974,
    99756339944,
    99761660914,
    99766996884,
    99772347854,
    99777713824,
    99783094794,
    99788490764,
    99793901734,
    99799327704,
    99804768674,
    99810224644,
    99815695614,
    99821181584,
    99826682554,
    99832198524,
    99837729494,
    99843275464,
    99848836434,
    99854412404,
    99860003374,
    99865609344,
    99871230314,
    99876866284,
    99882517254,
    99888183224,
    99893864194,
    99899560164,
    99905271134,
    99911082164,
    99916908594,
    99922750424,
    99928607654,
    99934480284,
    99940368314,
    99946271744,
    99952190574,
    99958124804,
    99964074434,
    99970039464,
    99976019894,
    99982015724,
    99988026954,
    99994053584,
    100000095614,
    100006153044,
    100012225874,
    100018314104,
    100024417734,
    100030536764,
    100036671194,
    100042821024,
    100048986254,
    100055166884,
    100061362914,
    100067574344,
    100073801174,
    100080043404,
    100086301034,
    100092574064,
    100098862494,
    100105166324,
    100111485554,
    100117820184,
    100124170214,
    100130535644,
    100136916474,
    100143312704,
    100149724334,
    100156151364,
    100162593794,
    100169051624,
    100175524854,
    100182013484,
    100188517514,
    100195036944,
    100201571774,
    100208122004,
    100214687634,
    100221268664,
    100227865094,
    100234476924,
    100241104154,
    100247746784,
    100254404814,
    100261078244,
    100267767074,
    100274471304,
    100281190934,
    100287925964,
    100294676394,
    100301442224,
    100308223454,
    100315020084,
    100321832114,
    100328659544,
    100335502374,
    100342360604,
    100349234234,
    100356123264,
    100363027694,
    100370046984,
    100377082074,
    100384132964,
    100391199654,
    100398282144,
    100405380434,
    100412494524,
    100419624414,
    100426770104,
    100433931594,
    100441108884,
    100448301974,
    100455510864,
    100462735554,
    100469976044,
    100477232334,
    100484504424,
    100491792314,
    100499096004,
    100506415494,
    100513750784,
    100521101874,
    100528468764,
    100535851454,
    100543249944,
    100550664234,
    100558094324,
    100565540214,
    100573001904,
    100580479394,
    100587972684,
    100595481774,
    100603006664,
    100610547354,
    100618103844,
    100625676134,
    100633264224,
    100640868114,
    100648487804,
    100656123294,
    100663774584,
    100671441674,
    100679124564,
    100686823254,
    100694537744,
    100702268034,
    100710014124,
    100717776014,
    100725553704,
    100733347194,
    100741156484,
    100748981574,
    100756822464,
    100764679154,
    100772551644,
    100780439934,
    100788344024,
    100796263914,
    100804199604,
    100812151094,
    100820118384,
    100828101474,
    100836100364,
    100844115054,
    100852145544,
    100860191834,
    100868253924,
    100876331814,
    100884425504,
    100892534994,
    100900660284,
    100908801374,
    100916958264,
    100925130954,
    100933433704,
    100941752654,
    100950087804,
    100958439154,
    100966806704,
    100975190454,
    100983590404,
    100992006554,
    101000438904,
    101008887454,
    101017352204,
    101025833154,
    101034330304,
    101042843654,
    101051373204,
    101059918954,
    101068480904,
    101077059054,
    101085653404,
    101094263954,
    101102890704,
    101111533654,
    101120192804,
    101128868154,
    101137559704,
    101146267454,
    101154991404,
    101163731554,
    101172487904,
    101181260454,
    101190049204,
    101198854154,
    101207675304,
    101216512654,
    101225366204,
    101234235954,
    101243121904,
    101252024054,
    101260942404,
    101269876954,
    101278827704,
    101287794654,
    101296777804,
    101305777154,
    101314792704,
    101323824454,
    101332872404,
    101341936554,
    101351016904,
    101360113454,
    101369226204,
    101378355154,
    101387500304,
    101396661654,
    101405839204,
    101415032954,
    101424242904,
    101433469054,
    101442711404,
    101451969954,
    101461244704,
    101470535654,
    101479842804,
    101489166154,
    101498505704,
    101507861454,
    101517233404,
    101526621554,
    101536025904,
    101545446454,
    101554883204,
    101564336154,
    101573805304,
    101583290654,
    101592792204,
    101602309954,
    101611973364,
    101621653374,
    101631349984,
    101641063194,
    101650793004,
    101660539414,
    101670302424,
    101680082034,
    101689878244,
    101699691054,
    101709520464,
    101719366474,
    101729229084,
    101739108294,
    101749004104,
    101758916514,
    101768845524,
    101778791134,
    200000000000
];

function calc1() {
    var r1 = 0;
    var r2 = 0;
    var a1 = parseInt(document.f.a1.value) ? parseInt(document.f.a1.value) : 0;
    var b1 = parseInt(document.f.b1.value) ? parseInt(document.f.b1.value) : 0;
    var sup = def_celestial_sup(a1);
    if (sup === 99) {
        document.f.r1.value = "調査中";
        document.f.r2.value = "調査中";
        return;
    }
    if (sup === -1) {
        document.f.r1.value = "適正外";
        document.f.r2.value = "適正外";
        return;
    }

    if (b1 === 0) {
        if (a1 <= 0) {
            document.f.r1.value = 0;
            document.f.r2.value = 0;
            return;
        } else if (a1 >= 1500) {
            document.f.r1.value = 0;
            document.f.r2.value = "最高レベルは1500です。";
            return;
        }

        r1 = exp_2017array[a1 - 1] * sup / 100;
        r2 = exp_2017array[a1 - 1] * sup * 3 / 100;
    } else if (b1 === 1) {
        if (a1 <= 0) {
            document.f.r1.value = 0;
            document.f.r2.value = 0;
            return;
        } else if (a1 >= 99999999) {
            document.f.r1.value = "ループしました。";
            document.f.r2.value = "ループしました。";
            return;
        }
        r1 = calc_2005exp(a1) * sup / 100;
        r2 = calc_2005exp(a1) * sup * 3 / 100;
    } else if (b1 === 2) {
        //2011～2015
        if (a1 <= 0) {
            document.f.r1.value = 0;
            document.f.r2.value = 0;
            return;
        } else if (a1 >= 1000) {
            document.f.r1.value = "5000兆";
            document.f.r2.value = "最高レベルは1000です。";
            return;
        } else if (a1 < 909) {
            r1 = exp_2017array[a1 - 1];
            r2 = exp_2017array[a1 - 1];
        } else if (a1 < 1000) {
            r1 = exp_2011array[a1 - 909];
            r2 = exp_2011array[a1 - 909];
        }
        r1 = r1 * sup / 100;
        r2 = r2 * sup * 3 / 100;
    } else if (b1 === 3) {
        //2015～2016
        if (a1 <= 0) {
            document.f.r1.value = 0;
            document.f.r2.value = 0;
            return;
        } else if (a1 >= 1500) {
            document.f.r1.value = "5000兆";
            document.f.r2.value = "最高レベルは1000です。";
            return;
        } else if (a1 < 909) {
            r1 = exp_2017array[a1 - 1];
            r2 = exp_2017array[a1 - 1];
        } else if (a1 < 1000) {
            r1 = exp_2015array[a1 - 909];
            r2 = exp_2015array[a1 - 909];
        }
        r1 = r1 * sup / 100;
        r2 = r2 * sup * 3 / 100;
    } else {
        //ここ通らないはずです。
        console.log("ｚｚｚ");
    }

    document.f.r1.value = Math.floor(r1);
    document.f.r2.value = Math.floor(r2);

}

//％数値が返ってくるよ、後で1/100してね
//-1はレベル外、99は知らない
function def_celestial_sup(lv) {
    if (lv < 250) {
        return -1;
    }
    if (lv < 700) {
        return 25;
    }
    if (lv < 850) {
        return 99;
    }
    if (lv < 1160) {
        return (3.1 - (lv - 850) * 0.01);
    }
    if (lv >= 1160) {
        return 0;
    }
}


function calc_2005exp(lv) {
    var ans = 0;

    if (lv == 1) {
        ans = 250;
    } else if (lv == 2) {
        ans = 420;
    } else if (lv > 2) {
        i = 0;
        j = 0;
        lv = Math.floor(lv);
        i = Math.ceil((Math.sqrt(4 * lv + 1) - 3) / 2);
        j = lv - 2 - (i - 1) * (i + 2);
        ans = 170 * lv + 80 + (20 / 3) * (3 * (i + 1) * Math.pow(j, 2) + (5 * Math.pow(i, 3) + 9 * Math.pow(i, 2) + 16 * i - 9) * j + (2 * Math.pow(i, 5) + 5 * Math.pow(i, 4) + 12 * Math.pow(i, 3) - 8 * Math.pow(i, 2) - 17 * i + 6));
    } else {
        ans = 0;
    }
    return ans;
}