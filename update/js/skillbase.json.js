const SKILL_BASE = [
    {
        "id": 0,
        "imageid": 0,
        "unknown1_6": 0,
        "str_name": "垂直斬り",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵の頭を狙って剣を垂直に振り下ろす。",
        "str_progress": "威力, 速度"
    },
    {
        "id": 1,
        "imageid": 1,
        "unknown1_6": 0,
        "str_name": "水平斬り",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵の腰を狙って剣を水平に斬りつける。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 2,
        "imageid": 2,
        "unknown1_6": 0,
        "str_name": "袈裟斬り",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵の肩口から切り下ろす。",
        "str_progress": "威力, 致命打率"
    },
    {
        "id": 3,
        "imageid": 3,
        "unknown1_6": 0,
        "str_name": "突き",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵を剣で一気に突き刺す。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 4,
        "imageid": 792,
        "unknown1_6": 0,
        "str_name": "ストレートクラッカー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "刀に力を吹き入れ、前方に剣気を打ち出す。剣気の範囲内にいる全ての敵にダメージを与える。",
        "str_progress": "威力、命中率"
    },
    {
        "id": 5,
        "imageid": 794,
        "unknown1_6": 0,
        "str_name": "イリュージョンスラッシュ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "剣を利用し敵を攻撃する時、追加で高速度で敵を切り裂く。",
        "str_progress": "発動確率"
    },
    {
        "id": 6,
        "imageid": 6,
        "unknown1_6": 0,
        "str_name": "スパイクシールディング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵の攻撃を防ぐ瞬間に盾にインパクトを加え、攻撃をしてくる敵にダメージを与える。\r\n敵の近接攻撃のみ使用可能。",
        "str_progress": "威力"
    },
    {
        "id": 7,
        "imageid": 7,
        "unknown1_6": 0,
        "str_name": "コンプリートプロテクション",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "盾を使用して敵からの物理的な攻撃をほぼ完璧に防ぐ。\r\nこの行動中には他の行動は行えない。",
        "str_progress": "ブロック率, 防御力"
    },
    {
        "id": 8,
        "imageid": 8,
        "unknown1_6": 0,
        "str_name": "ダンシングブロッカー",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "盾を空中に浮かべて敵の攻撃を防ぐ。\r\n防御力はそのままだが、ブロック中にも攻撃が可能になる。",
        "str_progress": "ブロック率"
    },
    {
        "id": 9,
        "imageid": 9,
        "unknown1_6": 0,
        "str_name": "シマーリングシールド",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "自分の盾を空中に浮かべて指定した味方を保護する。",
        "str_progress": "ブロック率, 持続時間"
    },
    {
        "id": 10,
        "imageid": 10,
        "unknown1_6": 0,
        "str_name": "ノッキングショット",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "盾で敵を殴って後退させる。",
        "str_progress": "威力, ノックバック距離, ノックバック確率"
    },
    {
        "id": 11,
        "imageid": 11,
        "unknown1_6": 0,
        "str_name": "ビターシールド",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "盾で敵を殴って麻痺状態にする。",
        "str_progress": "威力, ノックバック距離, 麻痺持続時間, 麻痺確率"
    },
    {
        "id": 12,
        "imageid": 12,
        "unknown1_6": 0,
        "str_name": "タンクラッシュ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "盾と剣で体を保護しながら、敵に突進して攻撃する。",
        "str_progress": "威力, 防御力"
    },
    {
        "id": 13,
        "imageid": 13,
        "unknown1_6": 0,
        "str_name": "ブーメランシールド",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "盾をブーメランのように敵に投げて攻撃する。\r\n盾は騎士に戻ってくる。",
        "str_progress": "威力"
    },
    {
        "id": 14,
        "imageid": 14,
        "unknown1_6": 0,
        "str_name": "トワーリングプロテクター",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "空中に浮かべた盾を素早く回して大きな渦巻きを作り、その渦巻きで敵を攻撃する。",
        "str_progress": "威力"
    },
    {
        "id": 15,
        "imageid": 15,
        "unknown1_6": 0,
        "str_name": "グレートガッツ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵に殴られて気絶の状況になっても、意志力で体勢を維持する。魔法抵抗力が上昇し、初期は防御力が劣るが熟達するにつれ防御力も少しずつ増加する。",
        "str_progress": "発動確率、防御力、魔法抵抗力"
    },
    {
        "id": 16,
        "imageid": 16,
        "unknown1_6": 0,
        "str_name": "シューティングスター",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "前方の敵に巨大な力で剣を投げて攻撃する。\r\n100％命中する。投げた後は両手剣に武器変更される。",
        "str_progress": "威力, 決定打率, 再装着時間"
    },
    {
        "id": 17,
        "imageid": 17,
        "unknown1_6": 0,
        "str_name": "デュエリング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵に決闘を挑む。一定時間の間、指定された敵は剣士だけを攻撃する",
        "str_progress": "発動確率, 敵命中率, 持続時間, ダメージ減少率"
    },
    {
        "id": 18,
        "imageid": 18,
        "unknown1_6": 0,
        "str_name": "マッスルインフレーション",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "全身の筋肉に力を入れて、より優れた技術を引き出すために用意する。さらに、物理攻撃力と移動速度、風系列の攻撃力を向上させる効果もある。",
        "str_progress": "向上数値"
    },
    {
        "id": 19,
        "imageid": 19,
        "unknown1_6": 0,
        "str_name": "ウォークライ",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "戦場で雄叫びをあげて周辺の敵に同時にダメージを与える。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 20,
        "imageid": 20,
        "unknown1_6": 0,
        "str_name": "サザンクロス",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵に十字斬り攻撃を行う。\r\n敵の回避補正値を無視して攻撃を行う。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 21,
        "imageid": 21,
        "unknown1_6": 0,
        "str_name": "シミターカッティング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵の周りを回転し、剣の刃で連続攻撃を行う。\r\n攻撃中は回避率が上昇し、敵のブロック率を無視して攻撃を行う。",
        "str_progress": "威力, 回避率"
    },
    {
        "id": 22,
        "imageid": 22,
        "unknown1_6": 0,
        "str_name": "スウィングインフィニティー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵に目にも止まらぬ連続攻撃を行う。",
        "str_progress": "威力, 攻撃回数"
    },
    {
        "id": 23,
        "imageid": 23,
        "unknown1_6": 0,
        "str_name": "パラレルスティング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "自分の左右に数個の分身を作り、敵を同時に突く。",
        "str_progress": "威力, 分身個数"
    },
    {
        "id": 24,
        "imageid": 24,
        "unknown1_6": 0,
        "str_name": "ファイナルチャージング",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "狙いを定めた敵に剣を突き出しながら突進し、途中の敵を巻き込みながらダメージを与える。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 25,
        "imageid": 25,
        "unknown1_6": 1,
        "str_name": "打ち下ろし",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "剣の重さを利用して敵に垂直に振り下ろす。",
        "str_progress": "威力"
    },
    {
        "id": 26,
        "imageid": 26,
        "unknown1_6": 1,
        "str_name": "二段打ち下ろし",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "剣を２回素早く振り下ろして３回のダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 27,
        "imageid": 737,
        "unknown1_6": 1,
        "str_name": "オナーオブザナイト",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵と対峙する際に、戦士としての誇りと気概が見えない力となって全身を包む。\r\n戦士の防御力とHPが増加する。",
        "str_progress": "防御力増加率, 最大HP増加率"
    },
    {
        "id": 28,
        "imageid": 28,
        "unknown1_6": 1,
        "str_name": "ソニックブレード",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "剣を大きく振り下ろし、真空波を作って遠距離の敵を攻撃する。",
        "str_progress": "威力"
    },
    {
        "id": 29,
        "imageid": 738,
        "unknown1_6": 1,
        "str_name": "ディレイクラッシング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "少しの間、剣気を溜めて一度でより強い攻撃を与える。",
        "str_progress": "威力, 攻撃速度"
    },
    {
        "id": 30,
        "imageid": 739,
        "unknown1_6": 1,
        "str_name": "ブレイキングスパイク",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "スキルのCP消費量を減らす。\r\n力を温存する為、自身の魔法ダメージと物理ダメージは弱化する。",
        "str_progress": "CP補正値, 物理, 魔法ダメージ減少数値"
    },
    {
        "id": 31,
        "imageid": 31,
        "unknown1_6": 1,
        "str_name": "水平振り回し",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "剣を横に振り回して攻撃する。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 32,
        "imageid": 32,
        "unknown1_6": 1,
        "str_name": "ラウンディングブーム",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "剣を出したまま回転して、周囲の敵に剣圧の風を飛ばす。",
        "str_progress": "威力, 打撃範囲"
    },
    {
        "id": 33,
        "imageid": 740,
        "unknown1_6": 1,
        "str_name": "ブラッディアームス",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "ダメージを与える度に自分のHPを消費し、クリティカル確率とクリティカルダメージを増加させる。",
        "str_progress": "致命打確率, 致命打ダメージ"
    },
    {
        "id": 34,
        "imageid": 34,
        "unknown1_6": 1,
        "str_name": "ブラッドシェーカー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "自分の体と剣に付いている血を拭い、その血を刃の形にして敵に飛ばす。\r\n最後に受けたダメージと与えたダメージに比例して攻撃力が上昇する。\r\n但し、１度使用すると血が飛んで消えるので威力は減少する。",
        "str_progress": "威力、打撃比例率"
    },
    {
        "id": 35,
        "imageid": 35,
        "unknown1_6": 1,
        "str_name": "タイフーンインパルス",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "激しく剣を振り回し、前方の敵に向かって剣圧の嵐を飛ばす。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 36,
        "imageid": 36,
        "unknown1_6": 1,
        "str_name": "ドラゴンツイスター",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "剣を大きく振り回し、氷の竜を召喚する。\r\n氷竜は戦士の周りを旋回し、周囲の敵に大ダメージを与える。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 37,
        "imageid": 37,
        "unknown1_6": 1,
        "str_name": "強突き",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "力を込めた刃を素早く突き出す。",
        "str_progress": "威力, 攻撃速度"
    },
    {
        "id": 38,
        "imageid": 38,
        "unknown1_6": 1,
        "str_name": "スピンスラスティング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "剣を螺旋状に突き出す。普通の突きより威力が強く、盾をも貫く。",
        "str_progress": "威力, 攻撃速度, ブロック率無視"
    },
    {
        "id": 39,
        "imageid": 741,
        "unknown1_6": 1,
        "str_name": "不撓不屈",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "一定以上のスキルを使用すると、体力及びCPが少量回復する。",
        "str_progress": "HP回復量, CP回復量"
    },
    {
        "id": 40,
        "imageid": 40,
        "unknown1_6": 1,
        "str_name": "ハリケーンショック",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "分身術を利用して、敵に垂直振り下ろしと水平振り回し、突き攻撃を同時に行う。",
        "str_progress": "威力, 攻撃速度, 命中率"
    },
    {
        "id": 41,
        "imageid": 41,
        "unknown1_6": 1,
        "str_name": "ジャンプ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "剣を上に持ち上げてジャンプを行う。\r\n着地点の敵は押し出されてしばらく麻痺する。",
        "str_progress": "移動距離, 麻痺時間"
    },
    {
        "id": 42,
        "imageid": 42,
        "unknown1_6": 1,
        "str_name": "ジャンプ攻撃",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ジャンプの後、着地点で剣を垂直に振り下ろす。\r\n着地点の敵は押し出される。",
        "str_progress": "移動距離, 威力"
    },
    {
        "id": 43,
        "imageid": 43,
        "unknown1_6": 1,
        "str_name": "ワイルドスタンプ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "ジャンプの後、着地点で剣を振り回し、その周囲の敵にダメージを与える。\r\n着地点の敵は押し出される。",
        "str_progress": "威力"
    },
    {
        "id": 44,
        "imageid": 44,
        "unknown1_6": 1,
        "str_name": "オルターリングヒッター",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "非常に素早く移動した後、敵に連続攻撃を行う。\r\nディレイクラッシングスキルで連係するとダメージを増幅させる。",
        "str_progress": "威力, 打撃回数"
    },
    {
        "id": 45,
        "imageid": 45,
        "unknown1_6": 1,
        "str_name": "アタックインターセプター",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "攻撃を受けた瞬間、反撃を行う。",
        "str_progress": "威力, ブロック率"
    },
    {
        "id": 46,
        "imageid": 46,
        "unknown1_6": 1,
        "str_name": "アーマークラッシャー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "攻撃を受けて反撃に成功した時、敵の防御力及びブロック率を低下させる。",
        "str_progress": "ブロック率減少数値, 防御力減少数値"
    },
    {
        "id": 47,
        "imageid": 742,
        "unknown1_6": 1,
        "str_name": "出血の刃",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "攻撃時、一定確率で出血効果を起こす。",
        "str_progress": "発動確率"
    },
    {
        "id": 48,
        "imageid": 743,
        "unknown1_6": 1,
        "str_name": "ウェポンディフェンダー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "防御膜を作り一定時間の間、全ての状態異常攻撃に抵抗し、受けたダメージを凝縮する。自分のすべてのスキルレベルを上げる。",
        "str_progress": "防御膜上昇率, クールタイム減少, 全ての状態異常攻撃抵抗"
    },
    {
        "id": 49,
        "imageid": 49,
        "unknown1_6": 1,
        "str_name": "ブラッドレイジ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵の攻撃を受けると怒り状態になって、物理及び魔法攻撃力が同時に上昇する。",
        "str_progress": "上昇率, 持続時間"
    },
    {
        "id": 50,
        "imageid": 50,
        "unknown1_6": 2,
        "str_name": "ファイアーボルト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵に小さい炎を飛ばす。",
        "str_progress": "威力"
    },
    {
        "id": 51,
        "imageid": 51,
        "unknown1_6": 2,
        "str_name": "ファイアーボール",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "自分の頭上に高威力のファイアーボールを複数生み出し、それを一斉に飛ばし、爆発させる。",
        "str_progress": "ボール個数, 威力"
    },
    {
        "id": 52,
        "imageid": 52,
        "unknown1_6": 2,
        "str_name": "ファイアーエンチャント",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "味方一人の武器に火の力を吹き入れて攻撃力を高める。",
        "str_progress": "上昇率, 持続時間"
    },
    {
        "id": 53,
        "imageid": 53,
        "unknown1_6": 2,
        "str_name": "フレイムストーム",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "前方の敵に火炎を巻き起こして攻撃する。\r\n前方の一直線上の敵に大ダメージを与える。",
        "str_progress": "威力, 射程距離"
    },
    {
        "id": 54,
        "imageid": 54,
        "unknown1_6": 2,
        "str_name": "メテオシャワー",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "星界より巨大な隕石を召喚して、広範囲の敵を攻撃する。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 55,
        "imageid": 55,
        "unknown1_6": 2,
        "str_name": "ミスティックフォッグ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "味方一人の周りに霧を発生させ、敵の狙いを惑わし、味方の回避率を高める。",
        "str_progress": "回避率, 持続時間"
    },
    {
        "id": 56,
        "imageid": 56,
        "unknown1_6": 2,
        "str_name": "チリングタッチ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵に接近し、杖に宿した冷気で敵を凍らせる一撃を放つ。",
        "str_progress": "威力, 氷結時間"
    },
    {
        "id": 57,
        "imageid": 57,
        "unknown1_6": 2,
        "str_name": "アイススタラグマイト",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "自分の足元に急速に大きくなる氷柱を召喚する。 ウィザードはその氷柱に上がることができ、近接攻撃を行うことも受けることも不可能になる。",
        "str_progress": "回避率, 持続時間, 氷柱の耐久力"
    },
    {
        "id": 58,
        "imageid": 58,
        "unknown1_6": 2,
        "str_name": "ファウンテンバリア",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "指定した味方の周りに強力な水の防御膜を形成して防御力を高める。",
        "str_progress": "防御力, 持続時間"
    },
    {
        "id": 59,
        "imageid": 59,
        "unknown1_6": 2,
        "str_name": "ウォーターキャノン",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "小範囲の敵に水大砲を発射する。",
        "str_progress": "威力, 射程距離, 範囲"
    },
    {
        "id": 60,
        "imageid": 60,
        "unknown1_6": 2,
        "str_name": "レビテイト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "自分の体を低空状態にする。低空状態になると集中力が若干上がって、地面からの被害が半減する。",
        "str_progress": "持続時間, 集中力"
    },
    {
        "id": 61,
        "imageid": 61,
        "unknown1_6": 2,
        "str_name": "テレポーテーション",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "指定した場所に瞬間移動する。\r\n低レベル時は瞬間移動の後に集中力が落ちるが、レベルが上がると上昇するようになる。",
        "str_progress": "キャスティング速度, 集中力, 射程距離"
    },
    {
        "id": 62,
        "imageid": 62,
        "unknown1_6": 2,
        "str_name": "トルネードシールド",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "自分の周囲に小さい嵐を発生して接近してくる敵に持続ダメージを与える。",
        "str_progress": "防御力, 威力, 回避率, 持続時間"
    },
    {
        "id": 63,
        "imageid": 63,
        "unknown1_6": 2,
        "str_name": "ライトニングサンダー",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "雷と稲妻で敵に物理、精神の両方でダメージを与える。ダメージと一定時間の速度低下を与え、感電状態を引き起こす",
        "str_progress": "威力"
    },
    {
        "id": 64,
        "imageid": 64,
        "unknown1_6": 2,
        "str_name": "ヘイスト",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "一人の味方の空気抵抗を減らして、攻撃速度と移動速度を増加させる。",
        "str_progress": "速度増加率, 持続時間"
    },
    {
        "id": 65,
        "imageid": 65,
        "unknown1_6": 2,
        "str_name": "ロックバウンディング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵の足首と足の周囲に小石を積み上げて敵の動きを封鎖する。",
        "str_progress": "威力"
    },
    {
        "id": 66,
        "imageid": 66,
        "unknown1_6": 2,
        "str_name": "グラビティアンプリファー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "指定した領域に重力場を発生させ、周りに入ってくる敵の動きを鈍くする。",
        "str_progress": "発動確率, 範囲"
    },
    {
        "id": 67,
        "imageid": 67,
        "unknown1_6": 2,
        "str_name": "アースクエイク",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "自分の周囲に地震を発生させ、攻撃する。敵はしばらく麻痺する。",
        "str_progress": "威力"
    },
    {
        "id": 68,
        "imageid": 68,
        "unknown1_6": 2,
        "str_name": "アースヒール",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "地脈の気を使って、味方の体力を一定比率で回復する。",
        "str_progress": "回復率"
    },
    {
        "id": 69,
        "imageid": 69,
        "unknown1_6": 2,
        "str_name": "ストーンタッチ",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "敵一体を石化させる。ある程度弱くなった敵にだけ効果がある。\r\n石化した敵は解けるまでは無防備状態になる。\r\n敵が硬化し、与ダメージが減少する。",
        "str_progress": "石化持続時間, 限界HP"
    },
    {
        "id": 70,
        "imageid": 70,
        "unknown1_6": 2,
        "str_name": "チャージング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "上位魔法を使うための準備呪文。\r\n精神を集中する事で魔法の影響を受け、魔法抵抗力が瞬間的に上昇する。",
        "str_progress": "キャスティング速度"
    },
    {
        "id": 71,
        "imageid": 71,
        "unknown1_6": 2,
        "str_name": "ダブルチャージング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "より強い魔法を使うための準備呪文。CPを持続的に回復する。ただしCPがマイナスの場合は呪文の効果が発揮されない。",
        "str_progress": "CP回復量"
    },
    {
        "id": 72,
        "imageid": 72,
        "unknown1_6": 2,
        "str_name": "ターキーチャージング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "高位魔法を使うための準備呪文。\r\n魔法的な濃度が上昇し、瞬間的な知恵の上昇で魔法抵抗力が飛躍的に向上する。",
        "str_progress": "キャスティング速度, 上昇知恵"
    },
    {
        "id": 73,
        "imageid": 73,
        "unknown1_6": 2,
        "str_name": "フォーベガーチャージング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "究極魔法を使うための準備呪文。魔法攻撃力が増加する。",
        "str_progress": "魔法攻撃力"
    },
    {
        "id": 74,
        "imageid": 74,
        "unknown1_6": 2,
        "str_name": "クリティカルヒット",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "魔法の杖で敵を攻撃し、一定確率で致命打と決定打を与えることができる。チャージングと同様、上位魔法を使うための準備行動でもある",
        "str_progress": "威力, 致命打率, 命中率"
    },
    {
        "id": 75,
        "imageid": 75,
        "unknown1_6": 3,
        "str_name": "ウルフクロー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "前足の爪で敵を攻撃する。",
        "str_progress": "威力"
    },
    {
        "id": 76,
        "imageid": 76,
        "unknown1_6": 3,
        "str_name": "アイアンクロー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "魔法の力で足爪を鋼鉄のように固くして敵を攻撃する。",
        "str_progress": "威力"
    },
    {
        "id": 77,
        "imageid": 77,
        "unknown1_6": 3,
        "str_name": "フレイムクロー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "魔法の炎を足爪に宿して敵を攻撃する。",
        "str_progress": "威力、攻撃回数"
    },
    {
        "id": 78,
        "imageid": 78,
        "unknown1_6": 3,
        "str_name": "グランドクロー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "大ぶりで殴り、前方の広い範囲の敵にダメージを与える。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 79,
        "imageid": 79,
        "unknown1_6": 3,
        "str_name": "チェーンドクロー",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵に素早い動きで連続攻撃を行う。",
        "str_progress": "威力、速度、攻撃回数"
    },
    {
        "id": 80,
        "imageid": 80,
        "unknown1_6": 3,
        "str_name": "ウルフファング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "顎で敵を噛みちぎる。",
        "str_progress": "威力、命中率"
    },
    {
        "id": 81,
        "imageid": 81,
        "unknown1_6": 3,
        "str_name": "ポイズンファング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "毒の魔法を付与した牙で敵を攻撃し、敵を毒状態にする。",
        "str_progress": "威力"
    },
    {
        "id": 82,
        "imageid": 82,
        "unknown1_6": 3,
        "str_name": "ハイドロフォビア",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵の死角に噛み付いて、混乱状態にさせる。",
        "str_progress": "威力、混乱持続時間"
    },
    {
        "id": 83,
        "imageid": 83,
        "unknown1_6": 3,
        "str_name": "バイトハンギング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵を噛み続け、敵の体力を徐々に減少させる。",
        "str_progress": "威力、攻撃速度"
    },
    {
        "id": 84,
        "imageid": 84,
        "unknown1_6": 3,
        "str_name": "バンパイアリックバイト",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵の血を吸い、自分の体力を回復する。ウルフマンの体力が高いほどより強い攻撃を与える。",
        "str_progress": "健康、回復率"
    },
    {
        "id": 85,
        "imageid": 85,
        "unknown1_6": 3,
        "str_name": "ローリングクラッシュ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "体を丸めて回転しながら敵に突進して攻撃する。",
        "str_progress": "威力、射程距離"
    },
    {
        "id": 86,
        "imageid": 86,
        "unknown1_6": 3,
        "str_name": "クローローラー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "体を丸めて回転しながら、周囲の敵を攻撃する。",
        "str_progress": "威力"
    },
    {
        "id": 87,
        "imageid": 87,
        "unknown1_6": 3,
        "str_name": "バーニングオーブ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "全身に炎を纏い、体を回転して炎のボールを作り出して敵に飛ばす。",
        "str_progress": "威力"
    },
    {
        "id": 88,
        "imageid": 88,
        "unknown1_6": 3,
        "str_name": "バウンシングリニア",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵に突進して攻撃し、敵にぶつかると次の敵に反射する。スキルの熟練度によって反射回数が増加し、敵が射程範囲内に存在すると決まった回数を反射する。",
        "str_progress": "威力、命中率、反射回数"
    },
    {
        "id": 89,
        "imageid": 89,
        "unknown1_6": 3,
        "str_name": "フラッシュタックル",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "閃光の如き速さで瞬く間に敵に突進、足爪で攻撃を加える。",
        "str_progress": "威力、命中率"
    },
    {
        "id": 90,
        "imageid": 90,
        "unknown1_6": 3,
        "str_name": "ムーンクライ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵を恐怖で震わせる狼の声。怯える敵が弱化した際に致命的な攻撃を与える。",
        "str_progress": "致命打確率"
    },
    {
        "id": 91,
        "imageid": 91,
        "unknown1_6": 3,
        "str_name": "フルムーン",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "恐怖の遠吠で敵の動きを鈍くする。吠える間、持続的に有効。",
        "str_progress": "移動速度\/攻撃速度\/ブロック減少率, 範囲"
    },
    {
        "id": 92,
        "imageid": 92,
        "unknown1_6": 3,
        "str_name": "ヘイトリドグローリング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "小さな鳴き声で敵を戦意喪失させて、攻撃力と命中率を低下させる。",
        "str_progress": "攻撃力\/命中率\/回避率減少率"
    },
    {
        "id": 93,
        "imageid": 93,
        "unknown1_6": 3,
        "str_name": "ルナティックハウリング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵を狂わせて誰にでも攻撃させる狼の咆哮。敵の状態抵抗力も減少する。",
        "str_progress": "異常状態系抵抗減少の減少率、発動確率"
    },
    {
        "id": 94,
        "imageid": 94,
        "unknown1_6": 3,
        "str_name": "ハウリングブラスト",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "狼の咆哮で魔法力場を生み出し、自分の周囲に大爆発を起こす。",
        "str_progress": "威力、範囲、火抵抗低下"
    },
    {
        "id": 95,
        "imageid": 95,
        "unknown1_6": 3,
        "str_name": "エモーションバースト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵から攻撃を受けると怒りが増幅し、徐々に防御力と魔法防御力が上昇する。",
        "str_progress": "発動確率、防御力、魔法防御力"
    },
    {
        "id": 96,
        "imageid": 96,
        "unknown1_6": 3,
        "str_name": "インスティンクトターミネーター",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "野獣の力を引き出して、各種の異常状態系の攻撃を防ぐ。",
        "str_progress": "異常状態抵抗"
    },
    {
        "id": 97,
        "imageid": 97,
        "unknown1_6": 3,
        "str_name": "アイ・オブ・ザ・ビースト",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "野獣の視線で目標とした敵を脅かす。",
        "str_progress": "強打\/魔法致命打上昇率"
    },
    {
        "id": 98,
        "imageid": 98,
        "unknown1_6": 3,
        "str_name": "ディスプレイスメント",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "本能だけを胴体から分離させ、相手に転移する。自分は瀕死状態になって攻撃を受けなくなり、相手が死ぬまで操縦できる。",
        "str_progress": "発動確率, 限界レベル"
    },
    {
        "id": 99,
        "imageid": 99,
        "unknown1_6": 3,
        "str_name": "ビーストベルセルク",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "野獣の本能を呼び覚まし、物理攻撃力と魔法攻撃力、速度が上昇。ただし、防御力はわずかに減少する。",
        "str_progress": "上昇率、速度、命中率、持続時間"
    },
    {
        "id": 100,
        "imageid": 100,
        "unknown1_6": 4,
        "str_name": "殴打",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵の頭を狙ってメイスで殴りつける。",
        "str_progress": "威力"
    },
    {
        "id": 101,
        "imageid": 101,
        "unknown1_6": 4,
        "str_name": "ソーンスマッシング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "光のトゲがある一撃を加える。\r\nアンデッド系にクリティカルヒットが発生する。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 102,
        "imageid": 102,
        "unknown1_6": 4,
        "str_name": "エクソシズムエンカウンター",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "悪を浄化する3回連続攻撃を放つ。アンデッド系と悪魔系にクリティカルヒットが発生する",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 103,
        "imageid": 103,
        "unknown1_6": 4,
        "str_name": "ゴッドハンド",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "周囲の敵に、神の手の力を込めた一撃を放つ。アンデッド系と悪魔系にはクリティカルヒット効果があり、アンデッド系は一撃で消滅する場合がある。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 104,
        "imageid": 104,
        "unknown1_6": 4,
        "str_name": "ホーリーブロッキング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "聖なる力で、敵の攻撃への盾の防御効果が上昇する。",
        "str_progress": "ブロック率"
    },
    {
        "id": 105,
        "imageid": 105,
        "unknown1_6": 4,
        "str_name": "シールドフラッシュ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "攻撃を受ける瞬間、盾で敵の攻撃を防ぐと同時に、盾の光で相手の視界を奪う。",
        "str_progress": "威力, 発動確率"
    },
    {
        "id": 106,
        "imageid": 106,
        "unknown1_6": 4,
        "str_name": "ターンアンデッド",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "盾に神の光を宿し、自分の周囲にいるアンデッド系の敵たちを麻痺させたり、退けたりする。",
        "str_progress": "キャスティング速度, 限界レベル"
    },
    {
        "id": 107,
        "imageid": 107,
        "unknown1_6": 4,
        "str_name": "セイントシールド",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "盾に神の力を宿し、盾の防御力とブロック率を上昇させる。",
        "str_progress": "ブロック率、回避率"
    },
    {
        "id": 108,
        "imageid": 108,
        "unknown1_6": 4,
        "str_name": "ミラータワー",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "巨大な盾を召喚して選択した味方に加護を施す。\r\n加護に守られている間は、魔法ダメージの一部をビショップに転移する。\r\n範囲魔法にも適用される。ビショップの抵抗力が上昇する。",
        "str_progress": "ダメージ倍率, 持続時間, 抵抗力"
    },
    {
        "id": 109,
        "imageid": 109,
        "unknown1_6": 4,
        "str_name": "ヒーリング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "指定した味方のHPをわずかに即時回復する。",
        "str_progress": "射程距離、回復量"
    },
    {
        "id": 110,
        "imageid": 110,
        "unknown1_6": 4,
        "str_name": "フルヒーリング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "指定した味方の体力を大幅に回復する。",
        "str_progress": "射程距離, 回復量"
    },
    {
        "id": 111,
        "imageid": 111,
        "unknown1_6": 4,
        "str_name": "リザレクション",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "行動不能になった味方を復活して、体力を回復する。\r\nレベルが上がると復活した味方の能力値低下状態も回復する事が出来る。",
        "str_progress": "回復量, ペナルティー回復量"
    },
    {
        "id": 112,
        "imageid": 112,
        "unknown1_6": 4,
        "str_name": "リペント",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "指定した味方の異常、低下、呪い系統の状態異常を治療する。",
        "str_progress": "射程距離"
    },
    {
        "id": 113,
        "imageid": 113,
        "unknown1_6": 4,
        "str_name": "リカバリー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "指定した味方のHPを大幅に即時回復する。",
        "str_progress": "射程距離、回復量"
    },
    {
        "id": 114,
        "imageid": 114,
        "unknown1_6": 4,
        "str_name": "レストレイション",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "周囲にいるパーティーメンバーの異常、低下、呪い系統の状態異常を自動的に治療する。",
        "str_progress": "範囲"
    },
    {
        "id": 115,
        "imageid": 115,
        "unknown1_6": 4,
        "str_name": "パーティーヒーリング",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "周囲にいるパーティー全員の体力を回復する。",
        "str_progress": "回復量, 範囲"
    },
    {
        "id": 116,
        "imageid": 116,
        "unknown1_6": 4,
        "str_name": "ブレッシング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "神の祝福を受けて、味方の体力の一定量を瞬時に回復させ、異常系統の状態異常も防ぐ。また、味方の武器に光の攻撃効果を付与する。",
        "str_progress": "上昇率, 威力, 抵抗力, 持続時間"
    },
    {
        "id": 117,
        "imageid": 117,
        "unknown1_6": 4,
        "str_name": "プロテクティングエビル",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "味方一人の防御力を高める。また、低下系統の状態異常を防ぐ。",
        "str_progress": "防御力, 抵抗力, 持続時間"
    },
    {
        "id": 118,
        "imageid": 118,
        "unknown1_6": 4,
        "str_name": "リゼネレイション",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "指定した味方一人の体力を一定時間、持続的に回復する。",
        "str_progress": "回復量, 持続時間"
    },
    {
        "id": 119,
        "imageid": 119,
        "unknown1_6": 4,
        "str_name": "プロテクティングエレメンタル",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "元素の精霊達を召喚し、自分の周囲にいるパーティーメンバーの元素抵抗力及び状態異常抵抗力を高め、純粋魔法による元素攻撃力を増加する。",
        "str_progress": "抵抗力, 上昇率, 範囲"
    },
    {
        "id": 120,
        "imageid": 728,
        "unknown1_6": 4,
        "str_name": "神聖",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "ビショップの祈りで聖なる力が放たれ十字の印が刻まれる。十字架に触れたモンスターは光属性のダメージを受ける。",
        "str_progress": "威力"
    },
    {
        "id": 121,
        "imageid": 727,
        "unknown1_6": 4,
        "str_name": "異端審問",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "邪教徒を改心させる聖なるハンマーを投げつける。",
        "str_progress": "威力"
    },
    {
        "id": 122,
        "imageid": 122,
        "unknown1_6": 4,
        "str_name": "祈祷",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "祈祷を通じて信仰心を高める。\r\nCPの充填と周囲にいるパーティーメンバーの各種状態異常の抵抗力を上昇させる。",
        "str_progress": "キャスティング速度, 抵抗力, 持続時間"
    },
    {
        "id": 123,
        "imageid": 496,
        "unknown1_6": 4,
        "str_name": "聖霊盾術",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "自身の現在の防御力の一定水準より低い攻撃をブロックした場合、ブロックモーションが発動しない。",
        "str_progress": "増加率"
    },
    {
        "id": 124,
        "imageid": 124,
        "unknown1_6": 4,
        "str_name": "賛美",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "ミサを通じて賛美と感謝を捧げ、神の栄光を帰する。\r\nCPの充填と周辺にいるパーティーメンバーの集中力が飛躍的に向上する。",
        "str_progress": "キャスティング速度, 集中力, 持続時間"
    },
    {
        "id": 125,
        "imageid": 125,
        "unknown1_6": 5,
        "str_name": "テレキネシス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "念動力で敵を攻撃する。",
        "str_progress": "威力, 速度, 麻痺確率"
    },
    {
        "id": 126,
        "imageid": 126,
        "unknown1_6": 5,
        "str_name": "ブレスドハンマー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "聖霊の祝福を受けた魔法のハンマーを召喚して敵に投げる。\r\n攻撃された敵は光抵抗力が低下する。",
        "str_progress": "威力、命中率、光抵抗力減少率"
    },
    {
        "id": 127,
        "imageid": 127,
        "unknown1_6": 5,
        "str_name": "ヘブンリープレシング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "巨大な天上界のハンマーを召喚して、敵の頭上に落とす。敵はハンマーの衝撃でしばらくレベルが低下される。",
        "str_progress": "威力, 命中率, 敵レベル低下"
    },
    {
        "id": 128,
        "imageid": 128,
        "unknown1_6": 5,
        "str_name": "フェザーニードル",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "聖なる力が込められた翼の羽を飛ばして攻撃する。\r\n攻撃された敵は命中率と回避率が低下する。",
        "str_progress": "威力、命中率、持続時間"
    },
    {
        "id": 129,
        "imageid": 129,
        "unknown1_6": 5,
        "str_name": "ホーリーサークル",
        "unknown2_0": 3,
        "unknown10_139": 3,
        "str_description": "聖霊の力が宿ったサークルを飛ばして攻撃する。\r\n攻撃された敵は命中率と回避率が低下する。",
        "str_progress": "威力、速度、持続時間"
    },
    {
        "id": 130,
        "imageid": 130,
        "unknown1_6": 5,
        "str_name": "ブラッディウィング",
        "unknown2_0": 4,
        "unknown10_139": 3,
        "str_description": "自分の生命力を犠牲にしながら折れた翼から出る膏血を敵に撤いて攻撃する。",
        "str_progress": "威力、速度、持続時間"
    },
    {
        "id": 131,
        "imageid": 131,
        "unknown1_6": 5,
        "str_name": "ホールドパーソン",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "人間系、悪魔系の敵の動きを封じる。",
        "str_progress": "成功確率, 持続時間"
    },
    {
        "id": 132,
        "imageid": 132,
        "unknown1_6": 5,
        "str_name": "ヒーリング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "味方の体力を回復する。知識値によって回復量が増加する。",
        "str_progress": "回復量"
    },
    {
        "id": 133,
        "imageid": 133,
        "unknown1_6": 5,
        "str_name": "ホールドモンスター",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "動物系、神獣系の敵の動きを封じる。",
        "str_progress": "成功確率, 持続時間"
    },
    {
        "id": 134,
        "imageid": 134,
        "unknown1_6": 5,
        "str_name": "マジックディスペリング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "聖霊を宿し、敵にかけられた各種補助魔法を解除する。",
        "str_progress": "成功確率, CP減少量"
    },
    {
        "id": 135,
        "imageid": 135,
        "unknown1_6": 5,
        "str_name": "エバンジェリズム",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵を教化して味方にすると同時に、敵の信仰心を吸収し、自身の能力を強化する。",
        "str_progress": "成功確率, 限界レベル"
    },
    {
        "id": 136,
        "imageid": 136,
        "unknown1_6": 5,
        "str_name": "サンクチュアリ ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "しばらく敵の全ての攻撃から自分を保護してくれる絶対的な防御膜を形成する。\r\n持続時間中は歩きを除いた一切のスキルアクションは不可能となる。",
        "str_progress": "移動速度, 持続時間"
    },
    {
        "id": 137,
        "imageid": 137,
        "unknown1_6": 5,
        "str_name": "エバキュエイション",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "自分を近くの安全な町に移動する。",
        "str_progress": "キャスティング速度, 成功確率"
    },
    {
        "id": 138,
        "imageid": 138,
        "unknown1_6": 5,
        "str_name": "コーリング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "パーティーメンバーを自分の周囲に呼び寄せる。追放天使のパーティーメンバーは瞬く間に術者の周囲にテレポートされる。呼び出したパーティーメンバーを麻痺させてしまう事と、不安定な大気によって失敗してしまう事があるのが短所。",
        "str_progress": "移動距離"
    },
    {
        "id": 139,
        "imageid": 139,
        "unknown1_6": 5,
        "str_name": "タウンポータル",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "近くの安全な町へと通じるポータルを開く。このポータルは一方通行で、持続時間内であれば他のプレイヤーたちも使用できる。",
        "str_progress": "持続時間, 移動距離"
    },
    {
        "id": 140,
        "imageid": 140,
        "unknown1_6": 5,
        "str_name": "ディテクティングエビル",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "周辺にいる敵の邪悪な気を探知する。\r\n画面内にいながら見えない敵と、画面外の一定距離にいる敵を探知する。",
        "str_progress": "範囲"
    },
    {
        "id": 141,
        "imageid": 141,
        "unknown1_6": 5,
        "str_name": "デストロイングアンデッド",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "自分の周囲一定半径内にいる敵を神聖な力で制圧する。相対的に弱い一部アンデッドたちは逃げ出すか麻痺を受け、また一部の邪悪な敵は光の力でダメージを受ける。また、相手を麻痺状態にする。",
        "str_progress": "範囲, 限界レベル"
    },
    {
        "id": 142,
        "imageid": 142,
        "unknown1_6": 5,
        "str_name": "デストロイングアンホーリー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "自分の周囲一定半径内のアンデッド、悪魔系の敵を神聖な力で屈服させる。聖なる光により敵の光属性抵抗力が低下する。",
        "str_progress": "範囲、光抵抗減少"
    },
    {
        "id": 143,
        "imageid": 143,
        "unknown1_6": 5,
        "str_name": "サンクンライトニング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "追放天使が物理攻撃を繰り出す際に、天空から召喚された複数の稲妻が敵に落ちる。",
        "str_progress": "威力"
    },
    {
        "id": 144,
        "imageid": 144,
        "unknown1_6": 5,
        "str_name": "ホーリークロス",
        "unknown2_0": 5,
        "unknown10_139": 3,
        "str_description": "巨大な光の十字架を召喚して、指定した周囲にいる一定半径内の敵を攻撃。その力でパーティーメンバーの体力を回復する。知識値によって回復量が増加する。",
        "str_progress": "威力、回復量、範囲"
    },
    {
        "id": 145,
        "imageid": 145,
        "unknown1_6": 5,
        "str_name": "ジャッジメントデイ",
        "unknown2_0": 5,
        "unknown10_139": 3,
        "str_description": "無数の十字架で一定範囲内の敵を攻撃する。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 146,
        "imageid": 146,
        "unknown1_6": 5,
        "str_name": "回想",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "昔の自分が使った天上の魔法を回想して潜在能力を呼び出す。\r\n上級技術を使うための準備行動をとる。",
        "str_progress": "キャスティング速度"
    },
    {
        "id": 147,
        "imageid": 147,
        "unknown1_6": 5,
        "str_name": "回顧",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "過ぎ去りし時を回顧し、以前の能力を引き出せるように集中する。周囲にいるパーティーメンバーの全体速度が上昇する。",
        "str_progress": "キャスティング速度、速度増加率、持続時間"
    },
    {
        "id": 148,
        "imageid": 148,
        "unknown1_6": 5,
        "str_name": "想起",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "過去を想起することで、天使であった頃の能力を発揮する。追放天使の物理ダメージが上昇する。",
        "str_progress": "物理ダメージ増加"
    },
    {
        "id": 149,
        "imageid": 149,
        "unknown1_6": 5,
        "str_name": "郷愁",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "天使であった頃の郷愁の念が一定時間天使の能力を付与してくれる。天上の祝福スキルを保有している場合は、一定時間自身の周囲のパーティーメンバーの物理、魔法ダメージが上昇する。",
        "str_progress": "キャスティング速度、物理、魔法ダメージ増加"
    },
    {
        "id": 150,
        "imageid": 150,
        "unknown1_6": 6,
        "str_name": "スローイングダガー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "短剣を投げて攻撃。",
        "str_progress": "威力, 命中率, 攻撃速度"
    },
    {
        "id": 151,
        "imageid": 151,
        "unknown1_6": 6,
        "str_name": "ポイゾネスダガー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "武器に毒を塗って攻撃。攻撃を受けた敵の防具を腐食させ、最終防御力を低下させる。",
        "str_progress": "威力"
    },
    {
        "id": 152,
        "imageid": 152,
        "unknown1_6": 6,
        "str_name": "ダブルスローイング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "一体の敵へ複数の短剣を同時に投げて攻撃。短剣は一つだけ使用。",
        "str_progress": "威力, 命中率, 攻撃回数"
    },
    {
        "id": 153,
        "imageid": 153,
        "unknown1_6": 6,
        "str_name": "ダガースプレー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "射程内にいるすべての敵を攻撃。ダガーは一本のみ使用。",
        "str_progress": "威力、命中率、攻撃数"
    },
    {
        "id": 154,
        "imageid": 154,
        "unknown1_6": 6,
        "str_name": "ダーティーフィーバー",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "一回の攻撃で、周囲360度範囲内にいる敵達に順次攻撃。攻撃対象は自分のパーティーに攻撃している敵と攻撃しようとしている敵に限定。敵1体につき短剣一投。",
        "str_progress": "威力, 命中率, 攻撃速度"
    },
    {
        "id": 155,
        "imageid": 158,
        "unknown1_6": 6,
        "str_name": "解毒",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "全ての毒を同時に解毒する技術。麻痺などの異常系状態低下も解除し、一定時間は毒に対して抵抗力を持つようになる。",
        "str_progress": "改善率、持続時間"
    },
    {
        "id": 156,
        "imageid": 805,
        "unknown1_6": 6,
        "str_name": "縮地の技",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "瞬間的に素早く足を動かし、速いスピードで目的地まで移動する。",
        "str_progress": "移動距離"
    },
    {
        "id": 157,
        "imageid": 803,
        "unknown1_6": 6,
        "str_name": "一斉爆発",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "スイッチを押して射程内に設置されたすべてのトラップを一度に爆発させ、トラップの爆発範囲内にいるすべての敵を攻撃する。",
        "str_progress": "範囲"
    },
    {
        "id": 158,
        "imageid": 802,
        "unknown1_6": 6,
        "str_name": "無力化",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵の手を撃って敵の武器を使えないように無力化させる。",
        "str_progress": "威力"
    },
    {
        "id": 159,
        "imageid": 159,
        "unknown1_6": 6,
        "str_name": "シャドウスニーキング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "影の中に自分の身を隠す。攻撃をしたら解ける。上逹すると心に余裕ができ、シーフのスキルをもう少し効率的に使うことができるようになる。",
        "str_progress": "持続時間"
    },
    {
        "id": 160,
        "imageid": 160,
        "unknown1_6": 6,
        "str_name": "マウストラップ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "道の要所に刺のあるネズミ取りを設置する。",
        "str_progress": "威力, 設置時間, 設置レベル"
    },
    {
        "id": 161,
        "imageid": 161,
        "unknown1_6": 6,
        "str_name": "ディザームトラップ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "探知したトラップを解体する。失敗時はトラップが作動してしまう。",
        "str_progress": "解体時間, 成功率, 解体レベル"
    },
    {
        "id": 162,
        "imageid": 162,
        "unknown1_6": 6,
        "str_name": "ブービートラップ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "道の要所に足首を引っ掛けて敵の動きを妨げるトラップを設置する。",
        "str_progress": "威力, 設置時間, 設置レベル, 麻痺時間"
    },
    {
        "id": 163,
        "imageid": 163,
        "unknown1_6": 6,
        "str_name": "エクスプロージョントラップ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "道の要所に踏むと爆発するトラップを設置する。",
        "str_progress": "威力, 設置時間, 設置レベル, 爆発半径"
    },
    {
        "id": 164,
        "imageid": 164,
        "unknown1_6": 6,
        "str_name": "有毒ガス",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "毒のガスが広がる爆弾を投げる。毒ガスに触れた敵は魔法抵抗力が弱化する。",
        "str_progress": "威力、設置時間、設置レベル、爆発半径"
    },
    {
        "id": 165,
        "imageid": 804,
        "unknown1_6": 6,
        "str_name": "専門道具",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "戦闘前、シーフの専門道具を装着してCPを回復する。",
        "str_progress": "CP回復量"
    },
    {
        "id": 166,
        "imageid": 166,
        "unknown1_6": 6,
        "str_name": "足音探知",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "姿を隠した人やモンスターを探知し、互いに意思疎通をして、攻撃を受けた時に救援を要請するモンスターの関係が分かる。",
        "str_progress": "探知レベル"
    },
    {
        "id": 167,
        "imageid": 800,
        "unknown1_6": 6,
        "str_name": "奇襲",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "非常に素早い速度で敵に移動し、攻撃を加える。",
        "str_progress": "威力"
    },
    {
        "id": 168,
        "imageid": 168,
        "unknown1_6": 6,
        "str_name": "秘密探知",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "隠し扉、隠された宝物箱、スイッチなど自分の周りに隠された全ての秘密装置及びトラップ、人を探知し出す探知スキルの決定版。",
        "str_progress": "探知レベル"
    },
    {
        "id": 169,
        "imageid": 169,
        "unknown1_6": 6,
        "str_name": "シックスセンス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "探知能力を高めるための補充行動。\r\n自分の全ての感覚を総動員して潜在能力を出す。",
        "str_progress": "キャスティング速度"
    },
    {
        "id": 170,
        "imageid": 170,
        "unknown1_6": 6,
        "str_name": "スペシャリストのスキル",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "スペシャリストのシーフの手技を使用し、宝箱、扉などを鍵を使わず開ける。",
        "str_progress": "成功確率、解体レベル"
    },
    {
        "id": 171,
        "imageid": 806,
        "unknown1_6": 6,
        "str_name": "トラップ改造",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "保有するトラップを改造し、少しの間魔法ダメージを増加させる。",
        "str_progress": "魔法攻撃力"
    },
    {
        "id": 172,
        "imageid": 172,
        "unknown1_6": 6,
        "str_name": "ピックポケット",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵に攻撃を与えて、その隙に敵のゴールドを盗む。",
        "str_progress": "成功確率"
    },
    {
        "id": 173,
        "imageid": 173,
        "unknown1_6": 6,
        "str_name": "強奪",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵に致命打を与えて、敵のアイテムを奪い取る。",
        "str_progress": "威力, 成功確率"
    },
    {
        "id": 174,
        "imageid": 174,
        "unknown1_6": 6,
        "str_name": "暗殺",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "敵を一撃で倒す。",
        "str_progress": "威力, 成功確率, 限界レベル"
    },
    {
        "id": 175,
        "imageid": 175,
        "unknown1_6": 7,
        "str_name": "正拳突き",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "左手の拳で攻撃。各種拳技術の基本になるスキルで、突き直後、右手で直接攻撃する他スキルのスキルレベルがしばらく上昇。",
        "str_progress": "威力, 攻撃速度, 命中率"
    },
    {
        "id": 176,
        "imageid": 733,
        "unknown1_6": 7,
        "str_name": "噴火",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "戦いに夢中になった武道家の熱気が、火山の噴火のように燃え上がる。クリティカル率が上昇。",
        "str_progress": "発動確率, クリティカル確率"
    },
    {
        "id": 177,
        "imageid": 177,
        "unknown1_6": 7,
        "str_name": "回転突き",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "左手の拳をねじって殴る。通常の攻撃より威力的で、直後、右手、左足スキルのレベルがしばらく上昇。",
        "str_progress": "威力, 攻撃速度, 命中率"
    },
    {
        "id": 178,
        "imageid": 178,
        "unknown1_6": 7,
        "str_name": "貫顎",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "右腕の肘で敵の顎を攻撃し、クリティカルヒットボーナスが発生。直後、左手、右足スキルのレベルと致命打確率がしばらく上昇。",
        "str_progress": "威力, 回避率低下, 致命打確率"
    },
    {
        "id": 179,
        "imageid": 179,
        "unknown1_6": 7,
        "str_name": "連打",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "左手を利用して激しい連打で攻撃。直後、右手、下蹴り種類スキルのレベルがしばらく上昇。",
        "str_progress": "威力, 攻撃速度, 命中率, 連射回数"
    },
    {
        "id": 180,
        "imageid": 180,
        "unknown1_6": 7,
        "str_name": "急所攻撃",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵の急所を攻撃し、一定の確率で敵の体力を現在の半分に減らす致命打を与える。直後、左足スキルのレベルがしばらく上昇。",
        "str_progress": "威力, 攻撃速度, 決定打確率"
    },
    {
        "id": 181,
        "imageid": 734,
        "unknown1_6": 7,
        "str_name": "煙幕",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "武道家が起こした素早い戦闘煙幕。回避率および移動速度増加",
        "str_progress": "回避率, 移動速度"
    },
    {
        "id": 182,
        "imageid": 182,
        "unknown1_6": 7,
        "str_name": "回し蹴り",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "右後ろ回し蹴り攻撃。下蹴り種類スキルのレベルと回避率がしばらく上昇。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 183,
        "imageid": 183,
        "unknown1_6": 7,
        "str_name": "かかと落とし",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "左前蹴り後、そのまま振り下ろして二度攻撃。直後、右足スキルのレベルと命中率がしばらく上昇",
        "str_progress": "威力, 打撃範囲, 命中率, 右足スキルレベル上昇。"
    },
    {
        "id": 184,
        "imageid": 184,
        "unknown1_6": 7,
        "str_name": "後回し蹴り",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "右足の後回し蹴りで広い範囲を攻撃。弾き飛ばしてダメージを与える。左手スキルのレベルと回避率がしばらく上昇。",
        "str_progress": "威力, 回避率"
    },
    {
        "id": 185,
        "imageid": 185,
        "unknown1_6": 7,
        "str_name": "飛び蹴り",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "ある程度離れている敵にあっという間に近付いて振り下ろし攻撃。直後、右足スキルのレベルと命中率がしばらく上昇。",
        "str_progress": "威力, 命中率, 右足スキルレベル上昇"
    },
    {
        "id": 186,
        "imageid": 186,
        "unknown1_6": 7,
        "str_name": "三連回し蹴り",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "三回連続で回し蹴りを放つ。右手スキルのレベルと回避率がしばらく上昇。",
        "str_progress": "威力, 回避率"
    },
    {
        "id": 187,
        "imageid": 735,
        "unknown1_6": 7,
        "str_name": "力の息吹",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "武道家の潜在能力を引き出す呼吸法。スキルレベルが上昇し、状態異常の持続時間を減少させる。",
        "str_progress": "スキルレベル上昇"
    },
    {
        "id": 188,
        "imageid": 188,
        "unknown1_6": 7,
        "str_name": "払い蹴り",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "しゃがんで右足で敵の足首あたりを攻撃。正確に当たったら敵はしばらく移動できなくなる。",
        "str_progress": "威力, 麻痺時間"
    },
    {
        "id": 189,
        "imageid": 732,
        "unknown1_6": 7,
        "str_name": "竜巻蹴り",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "足をからみかけて攻撃。敵を転倒させて、クリティカルボーナスが発生する",
        "str_progress": "HP比例値"
    },
    {
        "id": 190,
        "imageid": 190,
        "unknown1_6": 7,
        "str_name": "防御",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "不動の防御の構えを取って敵の攻撃に耐える。ダメージに抵抗し、最大HPが増加",
        "str_progress": "麻痺抵抗率, ダメージ減少率, 最大HP増加"
    },
    {
        "id": 191,
        "imageid": 191,
        "unknown1_6": 7,
        "str_name": "回避",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵の攻撃を素早く避ける。",
        "str_progress": "発動確率"
    },
    {
        "id": 192,
        "imageid": 192,
        "unknown1_6": 7,
        "str_name": "仰け反る",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵の攻撃に合わせて体を反らし、残りの攻撃を回避する。攻撃を受けた後も硬直状態がなく、しばらく無敵な状態になる。",
        "str_progress": "発動確率, 無敵時間, 麻痺抵抗"
    },
    {
        "id": 193,
        "imageid": 193,
        "unknown1_6": 7,
        "str_name": "流水撃",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵の攻撃を横に流して顎を殴り攻撃。\r\n必ずクリティカルヒットになる。",
        "str_progress": "発動確率, 威力"
    },
    {
        "id": 194,
        "imageid": 194,
        "unknown1_6": 7,
        "str_name": "掴み",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "敵の様々な攻撃武器を手で掴んで防御。一定のダメージを反射させる。魔法なども掴むことができる。",
        "str_progress": "発動確率"
    },
    {
        "id": 195,
        "imageid": 195,
        "unknown1_6": 7,
        "str_name": "気合",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "気合いを入れて敵の攻撃にも押されず、防御力と攻撃力を増加させる",
        "str_progress": "攻撃力, 防御力"
    },
    {
        "id": 196,
        "imageid": 736,
        "unknown1_6": 7,
        "str_name": "破砕拳",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "拳に気を込めて二度飛ばし、攻撃する。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 197,
        "imageid": 197,
        "unknown1_6": 7,
        "str_name": "分身",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "自分の分身を作って敵を混乱させて、敵から受ける攻撃回数を減らす。",
        "str_progress": "持続時間, 分身個数"
    },
    {
        "id": 198,
        "imageid": 731,
        "unknown1_6": 7,
        "str_name": "絶招",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "武道家が禁じ手とされる奥義を解放する。体内の気を急激に増幅させ、強打および魔法致命打率を増加させる。",
        "str_progress": "威力, 持続時間"
    },
    {
        "id": 199,
        "imageid": 199,
        "unknown1_6": 7,
        "str_name": "烈風撃",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "気を溜めて烈風を飛ばし、攻撃する。",
        "str_progress": "威力, 射程距離, 命中率"
    },
    {
        "id": 200,
        "imageid": 200,
        "unknown1_6": 9,
        "str_name": "射掛ける",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "矢を射て敵を攻撃する。",
        "str_progress": "威力"
    },
    {
        "id": 201,
        "imageid": 807,
        "unknown1_6": 9,
        "str_name": "フレイムアロー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "炎の魔力を込めた魔法の矢を発射する。",
        "str_progress": "威力"
    },
    {
        "id": 202,
        "imageid": 808,
        "unknown1_6": 9,
        "str_name": "フローズンアロー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "氷の魔力を込めた魔法の矢を発射する。",
        "str_progress": "威力"
    },
    {
        "id": 203,
        "imageid": 809,
        "unknown1_6": 9,
        "str_name": "デュアルアロー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "炎と氷の魔力を込めた魔法の矢を発射する。",
        "str_progress": "威力"
    },
    {
        "id": 204,
        "imageid": 202,
        "unknown1_6": 9,
        "str_name": "ピアシングアロー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "強く矢を放ち、敵を貫通する攻撃を行う。",
        "str_progress": "威力"
    },
    {
        "id": 205,
        "imageid": 203,
        "unknown1_6": 9,
        "str_name": "スナイプ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "致命的なダメージを与えた時、さらに大きなダメージを与える矢を発射する。",
        "str_progress": "威力"
    },
    {
        "id": 206,
        "imageid": 206,
        "unknown1_6": 9,
        "str_name": "ボイドボウ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "持っている弓矢を空中に浮かべて遠隔操縦しながら、武器を槍に持ち替える。\r\nアーチャーに戻ると自動解除される。",
        "str_progress": "威力, 持続時間"
    },
    {
        "id": 207,
        "imageid": 545,
        "unknown1_6": 9,
        "str_name": "ボウストライキング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "矢を扱う腕前を磨き、攻撃速度が上昇する。",
        "str_progress": "攻撃速度"
    },
    {
        "id": 208,
        "imageid": 208,
        "unknown1_6": 9,
        "str_name": "エターナルプロジェクター",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "ボイドボウの強化版。\r\n空中に浮遊した弓矢は、続けて矢を発射する。",
        "str_progress": "威力, 持続時間"
    },
    {
        "id": 209,
        "imageid": 209,
        "unknown1_6": 9,
        "str_name": "テイルチェイサー",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "他の単発性のアーチャー技術で敵を攻撃する時にそれが命中すると、数発の矢が自動発射され、数倍の威力でダメージを与える矢を自動で打ち上げる。",
        "str_progress": "威力、発動確率、矢の個数"
    },
    {
        "id": 210,
        "imageid": 210,
        "unknown1_6": 9,
        "str_name": "ブラインドシンカー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "輝く矢を射て敵の目を眩ませる。相手は目が見えなくなり、しばらく動けなくなる。",
        "str_progress": "威力"
    },
    {
        "id": 211,
        "imageid": 211,
        "unknown1_6": 9,
        "str_name": "マジカルアロー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "魔法の矢を作って敵を攻撃する。矢のストックがなくても攻撃は可能である。",
        "str_progress": "威力"
    },
    {
        "id": 212,
        "imageid": 212,
        "unknown1_6": 9,
        "str_name": "シーカーアロー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵を追いかける誘導矢を放つ。敵にロックオンした矢は敵に当たるか、死ぬまで追いかける。",
        "str_progress": "威力"
    },
    {
        "id": 213,
        "imageid": 213,
        "unknown1_6": 9,
        "str_name": "ビックスパロー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵を貫通する巨大な矢を発射する。限界ダメージが増加する。",
        "str_progress": "威力"
    },
    {
        "id": 214,
        "imageid": 810,
        "unknown1_6": 9,
        "str_name": "グレーシャルシャード",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "前方に回転しながら飛ぶ氷の魔力を込めた矢を発射する。矢から出る魔法の氷柱を周囲にまき散らし攻撃する。",
        "str_progress": "威力"
    },
    {
        "id": 215,
        "imageid": 215,
        "unknown1_6": 9,
        "str_name": "スプレッドアロー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "多方向に分かれながら攻撃する矢を放つ。",
        "str_progress": "威力"
    },
    {
        "id": 216,
        "imageid": 216,
        "unknown1_6": 9,
        "str_name": "マシーンアロー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "複数の矢を一体の敵に向かって連射する。",
        "str_progress": "威力、連発個数 "
    },
    {
        "id": 217,
        "imageid": 217,
        "unknown1_6": 9,
        "str_name": "レイヤーストーム",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "超近接用矢のスキルで周りの敵を攻撃する。遠距離にいる敵に使用すると、打撃範囲がなくなる。",
        "str_progress": "威力"
    },
    {
        "id": 218,
        "imageid": 218,
        "unknown1_6": 9,
        "str_name": "ビットグライダー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "複数の矢を一体の敵に向かって一斉に発射する。ハイレベルな射撃スキルであるため、追加の射撃スキルは適用されない。",
        "str_progress": "威力、矢の個数 "
    },
    {
        "id": 219,
        "imageid": 219,
        "unknown1_6": 9,
        "str_name": "ランドマーカー",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "魔力を込めた爆弾の矢を発射する。爆弾は周辺の敵に粘着され爆発し、5回粘着されると自動で爆発して大きなダメージを与える。",
        "str_progress": "威力、打撃範囲、矢の個数"
    },
    {
        "id": 220,
        "imageid": 220,
        "unknown1_6": 9,
        "str_name": "インターバルシューター",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "矢を使うスキルを使用すると追加で打撃を与える魔法の弓を生成する。魔法の弓は自動でアーチャーの矢の攻撃と同時に攻撃する。",
        "str_progress": " 威力、持続時間、矢の個数 "
    },
    {
        "id": 221,
        "imageid": 811,
        "unknown1_6": 9,
        "str_name": "グライディングファイアー",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "爆発する魔力を込めた矢を発射する。矢は爆発しながら飛び、爆発範囲内にいるすべての敵を攻撃する。",
        "str_progress": "威力、打撃範囲"
    },
    {
        "id": 222,
        "imageid": 222,
        "unknown1_6": 9,
        "str_name": "ウォーターフォール",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "氷の魔力を込めた矢を虚空に射る事でその矢が散乱し、敵に向かって滝のように降り注ぐ。",
        "str_progress": " 威力、打撃範囲"
    },
    {
        "id": 223,
        "imageid": 223,
        "unknown1_6": 9,
        "str_name": "集中",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "精神を集中して、魔法の矢を射るための精神統一を行う。",
        "str_progress": "キャスティング時間"
    },
    {
        "id": 224,
        "imageid": 224,
        "unknown1_6": 9,
        "str_name": "瞑想",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "瞑想状態に入り、精神統一を行って少しの間命中率が上昇する。",
        "str_progress": "キャスティング時間、上昇命中率、持続時間"
    },
    {
        "id": 225,
        "imageid": 225,
        "unknown1_6": 8,
        "str_name": "突き",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "槍で突いて攻撃する。",
        "str_progress": "威力"
    },
    {
        "id": 226,
        "imageid": 226,
        "unknown1_6": 8,
        "str_name": "デザートブラスト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "槍を回して敵を殴打する。\r\n周囲の敵を退け、若干のダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 227,
        "imageid": 227,
        "unknown1_6": 8,
        "str_name": "ラピッドスティンガー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "素早い速度で敵を突き貫く。\r\n正確に命中させることで、敵に回避と反撃の隙を与えない。",
        "str_progress": "威力, 命中率, 速度"
    },
    {
        "id": 228,
        "imageid": 228,
        "unknown1_6": 8,
        "str_name": "槍投げ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持っている槍を敵に投擲し、ダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 229,
        "imageid": 229,
        "unknown1_6": 8,
        "str_name": "インパクトスピア",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "虚像で作った槍を投擲し、敵を気絶させ、ダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 230,
        "imageid": 230,
        "unknown1_6": 8,
        "str_name": "ジャベリンテンペスト",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "回転しながら敵を貫通する槍を投擲し、敵に多段ヒットでダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 231,
        "imageid": 231,
        "unknown1_6": 8,
        "str_name": "ブレイキングポイント",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "槍術で敵の攻撃を防ぐ。",
        "str_progress": "発動確率"
    },
    {
        "id": 232,
        "imageid": 232,
        "unknown1_6": 8,
        "str_name": "サイドステップ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "軽快な動きで敵の攻撃を回避する。",
        "str_progress": "発動確率"
    },
    {
        "id": 233,
        "imageid": 233,
        "unknown1_6": 8,
        "str_name": "スピンアライジング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "攻撃を受けた時に槍を旋回させ、周辺の敵にダメージを与える。",
        "str_progress": "威力、発動確率"
    },
    {
        "id": 234,
        "imageid": 234,
        "unknown1_6": 8,
        "str_name": "アーマーディスアセンブラ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵を攻撃し、敵の鎧を完全解体して防御力を落とす。",
        "str_progress": "発動確率、防御力減少、持続時間"
    },
    {
        "id": 235,
        "imageid": 779,
        "unknown1_6": 8,
        "str_name": "ライトニングエンチャント",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "ランサーが自身の槍に魔法をかけ、敵に与えたダメージに比例し追加で光属性ダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 236,
        "imageid": 236,
        "unknown1_6": 8,
        "str_name": "旋風突き",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "槍を回し周囲をなぎ払った後、敵を攻撃する。\r\n近くにいる敵を吹き飛ばし、対象には追加で突き攻撃を加える。",
        "str_progress": "威力"
    },
    {
        "id": 237,
        "imageid": 237,
        "unknown1_6": 8,
        "str_name": "サプライジングレイド",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "槍を旋回し、その勢いで瞬間的に敵との距離を詰めてから、突きで攻撃する。",
        "str_progress": "威力"
    },
    {
        "id": 238,
        "imageid": 238,
        "unknown1_6": 8,
        "str_name": "ワールランニング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "槍を回しながら前方に突進する。前方にいる敵は横に押し出される。",
        "str_progress": "移動速度"
    },
    {
        "id": 239,
        "imageid": 778,
        "unknown1_6": 8,
        "str_name": "スチールレイン",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "空から数多くの槍を召喚し、範囲内にいる全ての敵を攻撃する。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 240,
        "imageid": 777,
        "unknown1_6": 8,
        "str_name": "ロージングインパクト",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "魔法で巨大化させた槍を前方に投擲し、ダメージを与える。槍が通った線上にいる全ての敵にダメージを与える。",
        "str_progress": "威力、打撃数"
    },
    {
        "id": 241,
        "imageid": 241,
        "unknown1_6": 8,
        "str_name": "グラウンドシェイカー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "魔力を込めた槍を地面に突き立てて小さい地震を引き起こす。敵は身動きが取れず、バランスを失って倒れる。",
        "str_progress": "威力"
    },
    {
        "id": 242,
        "imageid": 242,
        "unknown1_6": 8,
        "str_name": "ラジアルアーク",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "魔力を込めた槍を地面に突き刺して槍を媒体に稲妻を召喚し、周囲に放射上の衝撃波を飛ばす。",
        "str_progress": "威力、範囲、打撃数"
    },
    {
        "id": 243,
        "imageid": 243,
        "unknown1_6": 8,
        "str_name": "ファイアー・アンド・アイス",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "槍の一端には炎, 反対側には氷を召喚し、槍を旋回させて炎と氷が渦を描くように攻撃する。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 244,
        "imageid": 244,
        "unknown1_6": 8,
        "str_name": "ガーディアンポスト",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "魔力を込めた槍を地面に突き刺して、稲妻を召喚する。\r\n槍は地面に残り、弓矢に武器を持ち直す。召喚された稲妻は指定した敵に向かって連続で放電攻撃を行う。",
        "str_progress": "威力、範囲、持続時間、攻撃回数"
    },
    {
        "id": 245,
        "imageid": 245,
        "unknown1_6": 8,
        "str_name": "エントラップメントピアシング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "多数の分身を生み出し、敵を囲んで集中攻撃を行う。",
        "str_progress": "威力, 分身個数"
    },
    {
        "id": 246,
        "imageid": 246,
        "unknown1_6": 8,
        "str_name": "オーサムフォートレス",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "多数の分身を生み出し、近くの敵を同時に攻撃する。",
        "str_progress": "威力, 命中率, 分身個数"
    },
    {
        "id": 247,
        "imageid": 247,
        "unknown1_6": 8,
        "str_name": "ミラーメラーミスト",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "自分の槍に霧の魔法をかけて指定した味方の周囲を旋回させ、敵の攻撃を防ぐ防御幕を生み出す。\r\n自身は弓矢に持ち直す。この技術の使用中は槍を武器として使うことができない。",
        "str_progress": "ブロック率, 持続時間"
    },
    {
        "id": 248,
        "imageid": 248,
        "unknown1_6": 8,
        "str_name": "確信",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "固く決心をして、槍の魔法を使うために精神力を高める。",
        "str_progress": "キャスティング時間"
    },
    {
        "id": 249,
        "imageid": 249,
        "unknown1_6": 8,
        "str_name": "信念",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "心の中で自分に対する信念を揺ぎ無きものにし、槍の魔法を使うための精神力を高める。瞬間的に物理攻撃力と魔法攻撃力が上昇する。",
        "str_progress": "キャスティング時間、攻撃力、魔法攻撃力"
    },
    {
        "id": 250,
        "imageid": 250,
        "unknown1_6": 10,
        "str_name": "笛棒攻撃",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "笛を棒のように使って攻撃する。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 251,
        "imageid": 251,
        "unknown1_6": 10,
        "str_name": "攻撃命令",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "手なずけたペットと召喚獣に単純な攻撃命令を下す。\r\n指定した敵を攻撃し、しばらくペットの攻撃力が上昇する。",
        "str_progress": "モンスター攻撃力, 持続時間"
    },
    {
        "id": 252,
        "imageid": 252,
        "unknown1_6": 10,
        "str_name": "防御命令",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "手なずけたペットと召喚獣に防御中心の攻撃命令を下す。\r\n指定した敵を攻撃し、しばらくペットの防御力が上昇する。",
        "str_progress": "モンスター防御力, 持続時間"
    },
    {
        "id": 253,
        "imageid": 772,
        "unknown1_6": 10,
        "str_name": "忠実な部下",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ビーストテイマーが受けるダメージの一部を手なずけたペットと召喚獣が引き受ける。",
        "str_progress": "ダメージ移転率"
    },
    {
        "id": 254,
        "imageid": 254,
        "unknown1_6": 10,
        "str_name": "特技命令",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "手なずけたペットが習得している特殊技術を使用するように命令する。",
        "str_progress": "モンスター命中率, 持続時間"
    },
    {
        "id": 255,
        "imageid": 255,
        "unknown1_6": 10,
        "str_name": "手なずける",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "体力が一定以下に減少しているモンスターを手なずけて自分のペットにする。\r\n一般1,2形モンスターにのみ有効で、一般3以上には効果がない。\r\n自分のレベルとスキルレベルが高くなると、高レベルモンスターを手なずける事が可能になる。\r\n若干のダメージも与える。",
        "str_progress": "威力, 限界レベル, 成功確率"
    },
    {
        "id": 256,
        "imageid": 256,
        "unknown1_6": 10,
        "str_name": "睨み合い",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "手なずけるを試みている敵をカリスマによって抑えつけ、手なずけるに失敗しても敵に攻撃されないようにする。\r\n手なずけるが成功した場合、忠誠度とレベルが上昇する。\r\n忠誠度が高くなるとペットの能力値が増加して、100％以上の強化が可能",
        "str_progress": "成功確率、忠誠度増加量、最大忠誠度"
    },
    {
        "id": 257,
        "imageid": 257,
        "unknown1_6": 10,
        "str_name": "ペット奪取",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵が連れているペットを奪取してその敵のCPを一定比率減少させる。\r\n※モンスターペット未実装",
        "str_progress": "威力, 持続時間, 限界レベル, 成功確率"
    },
    {
        "id": 258,
        "imageid": 258,
        "unknown1_6": 10,
        "str_name": "撒き餌",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "周辺のモンスターが餌の周りに集まってくる。\r\n手なずけることが容易になると同時に回避率も低下して、簡単に攻撃を与えるようになる。",
        "str_progress": "有効範囲、持続時間、成功確率、抵抗力低下値"
    },
    {
        "id": 259,
        "imageid": 259,
        "unknown1_6": 10,
        "str_name": "説得",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "体力が一定以下に減少しているモンスターを説得して自分のペットにする。一般1,2,3,4形モンスターに有効で、セミボス以上のモンスターには効果がない。自分のレベルとスキルレベルが高くなると、高レベルモンスターの説得が可能になる。",
        "str_progress": "威力、限界レベル、成功確率"
    },
    {
        "id": 260,
        "imageid": 260,
        "unknown1_6": 10,
        "str_name": "応急処置",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "手なずけたペットと召喚獣の傷を応急処置する。",
        "str_progress": "応急措置量"
    },
    {
        "id": 261,
        "imageid": 261,
        "unknown1_6": 10,
        "str_name": "励ます",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "手なずけたペットと召喚獣を励まして攻撃力と防御力を上昇させる。",
        "str_progress": "増加値, 持続時間"
    },
    {
        "id": 262,
        "imageid": 262,
        "unknown1_6": 10,
        "str_name": "治療",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "手なずけたペットと召喚獣の全ての傷を即座に一発で治療する。",
        "str_progress": "回復値"
    },
    {
        "id": 263,
        "imageid": 263,
        "unknown1_6": 10,
        "str_name": "誉める",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "手なずけたペットと召喚獣を誉めてレベルを一時的に上昇させる。",
        "str_progress": "増加値、持続時間"
    },
    {
        "id": 264,
        "imageid": 264,
        "unknown1_6": 10,
        "str_name": "蘇生",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "瀕死状態に落ちているペットや召喚獣を胸に抱いて蘇生させる。\r\nスキルレベルが低いと蘇生したペットの経験値に深刻な低下がくる場合もある。\r\nこのスキルを使わなくても瀕死状態のペットは1分後には体力1になって復活する。",
        "str_progress": "経験値ペナルティー減少率, 回復値"
    },
    {
        "id": 265,
        "imageid": 265,
        "unknown1_6": 10,
        "str_name": "叫ぶ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "叫んで雑念を吹き飛ばして気を充填し、ビーストテイマーの技術がよく通じるようにする。",
        "str_progress": "キャスティング時間"
    },
    {
        "id": 266,
        "imageid": 266,
        "unknown1_6": 10,
        "str_name": "脅かす",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "周囲に恐怖感を生み出して気を充填し、ビーストテイマーの技術がよく通じるようにする。",
        "str_progress": "キャスティング時間"
    },
    {
        "id": 267,
        "imageid": 267,
        "unknown1_6": 10,
        "str_name": "飼育記録",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "選択したペットの育成内容を記録した文書を作成する。\r\n指定したペットは自由になり文書だけが手元に残るが、文書を使用すると指定したペットを呼び出すことができる。",
        "str_progress": "記録可能ペットの限界レベル"
    },
    {
        "id": 268,
        "imageid": 268,
        "unknown1_6": 10,
        "str_name": "叱る",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "ペットの間違いを叱りつけてより多くの経験値が得られるようにする。\r\n但し、自分のレベルと同じかそれ以上のペットには効果がない。",
        "str_progress": "獲得経験値率, 有効半径"
    },
    {
        "id": 269,
        "imageid": 269,
        "unknown1_6": 10,
        "str_name": "唐辛子を食べさせる",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "ペットに辛い唐辛子を食べさせ、一時的にすべてのステータスを向上させる。",
        "str_progress": "向上率、持続時間、"
    },
    {
        "id": 270,
        "imageid": 270,
        "unknown1_6": 10,
        "str_name": "憂鬱な日",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "手なずけたペットと召喚獣の全てのステータスを向上させる。",
        "str_progress": "ステータス上昇値"
    },
    {
        "id": 271,
        "imageid": 271,
        "unknown1_6": 10,
        "str_name": "霧の朝",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "手なずけたペットと召喚獣の全ての状態異常と元素抵抗力、防御力を向上させる。",
        "str_progress": "状態異常抵抗、元素抵抗力、防御力"
    },
    {
        "id": 272,
        "imageid": 272,
        "unknown1_6": 10,
        "str_name": "風雨の日",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "手なずけたペットと召喚獣の攻撃速度と移動速度、体力を向上させる。",
        "str_progress": "向上率"
    },
    {
        "id": 273,
        "imageid": 273,
        "unknown1_6": 10,
        "str_name": "のどかな一日",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "手なずけたペットと召喚獣の全ての属性の攻撃力を向上させる。",
        "str_progress": "向上率"
    },
    {
        "id": 274,
        "imageid": 274,
        "unknown1_6": 10,
        "str_name": "気まぐれの日",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "手なずけたペットと召喚獣のクリティカルの発動確率とクリティカルダメージを向上させる。",
        "str_progress": "向上率"
    },
    {
        "id": 275,
        "imageid": 275,
        "unknown1_6": 11,
        "str_name": "笛吹き",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "特殊な音色で敵に攻撃を行う。",
        "str_progress": "威力"
    },
    {
        "id": 276,
        "imageid": 276,
        "unknown1_6": 11,
        "str_name": "突撃命令",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "現在のペットと召喚獣に敵に向かって突進する命令を下す。\r\n召喚獣の攻撃力が上昇する。",
        "str_progress": "召喚獣の攻撃力"
    },
    {
        "id": 277,
        "imageid": 277,
        "unknown1_6": 11,
        "str_name": "保護命令",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ペットと召喚獣に身を保護しながら敵を攻撃する命令を下す。\r\n召喚獣の防御力が上昇する。",
        "str_progress": "召喚獣の防御力"
    },
    {
        "id": 278,
        "imageid": 278,
        "unknown1_6": 11,
        "str_name": "ライディングドック",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ケルビーがサマナーを乗せて素早い速度で移動する。移動速度とサマナーの火抵抗力が向上する。",
        "str_progress": "移動速度、集中力"
    },
    {
        "id": 279,
        "imageid": 279,
        "unknown1_6": 11,
        "str_name": "テイルスピアー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "攻撃時、ケルビーの尻尾についている火の槍で敵にダメージを与える。",
        "str_progress": "威力、命中率、発動確率"
    },
    {
        "id": 280,
        "imageid": 280,
        "unknown1_6": 11,
        "str_name": "フレームリング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "ケルビーの周囲に円形の火炎の壁を形成する。火炎に触れた敵に熱気でダメージを与える。",
        "str_progress": "威力、持続時間"
    },
    {
        "id": 281,
        "imageid": 281,
        "unknown1_6": 11,
        "str_name": "インシナレイト",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "ケルビーが高熱の火炎で取り囲まれ、周辺に接近するすべての敵にダメージを与える。 ",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 282,
        "imageid": 282,
        "unknown1_6": 11,
        "str_name": "ブロウフィッシュアイシクル",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "攻撃時、スウェルファーが召喚した氷柱が敵に落下して範囲ダメージを与える。",
        "str_progress": "威力、範囲、発動確率"
    },
    {
        "id": 283,
        "imageid": 283,
        "unknown1_6": 11,
        "str_name": "エクスパンション",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "スウェルファーがトゲを立てて体を膨らませ、サマナーを防御する。\r\nパーティーメンバーもトゲが立った状態になる。",
        "str_progress": "召喚獣の防御力、有効範囲、リターン率"
    },
    {
        "id": 284,
        "imageid": 284,
        "unknown1_6": 11,
        "str_name": "バブルガムエクスプロージョン",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "スウェルファーが作り出した爆発する泡を空中から落下させる。炸裂した水球は広範囲の敵にダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 285,
        "imageid": 285,
        "unknown1_6": 11,
        "str_name": "アクアバンブー",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "召喚魔法により地下水脈の流れを操り、一定範囲の地域の竹を急速に成長させる。鋭い竹に触れた敵は持続的にダメージを受ける。また、エリア内にいる味方のクリティカルヒット確率を上昇させる。",
        "str_progress": "威力"
    },
    {
        "id": 286,
        "imageid": 286,
        "unknown1_6": 11,
        "str_name": "ワインディングクロー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "攻撃時に、ウィンディの鉤爪で敵にダメージを与える。",
        "str_progress": "威力、発動確率"
    },
    {
        "id": 287,
        "imageid": 287,
        "unknown1_6": 11,
        "str_name": "リフトアップ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵の周囲に突風を巻き起こして、空中に飛ばして落とす。\r\n敵の体重が重ければ重いほど大きなダメージを与えるが、着地技術がある敵には効果が薄く、高レベルの敵は持ち上げることすら出来ない。",
        "str_progress": "威力, 限界レベル"
    },
    {
        "id": 288,
        "imageid": 288,
        "unknown1_6": 11,
        "str_name": "ゲイルパンチ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵に風を圧縮したロケットパンチを放つ。\r\n命中するとその周囲に竜巻が生じて、周囲の敵も打撃を受ける。",
        "str_progress": "威力, 範囲, 持続時間"
    },
    {
        "id": 289,
        "imageid": 289,
        "unknown1_6": 11,
        "str_name": "バキュームポイント",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "特定の場所にウィンディを固定させ、その周囲に真空のホールを生成する。\r\nホールの影響圏内にいる敵はホールの影響でウィンディを攻撃しにくくなり、持続的に若干のダメージを与える。",
        "str_progress": "威力, 範囲, 持続時間, 召喚獣の防御力\/抵抗力"
    },
    {
        "id": 290,
        "imageid": 290,
        "unknown1_6": 11,
        "str_name": "アーストラーマー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "攻撃時に、ヘッジャーの足踏みで発生した地震により敵に追加ダメージを与える。",
        "str_progress": "威力, 発動確率"
    },
    {
        "id": 291,
        "imageid": 291,
        "unknown1_6": 11,
        "str_name": "ヘッジャーヘッジング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ヘッジャーが指定した地形の土を掘って、移動を防ぐ障害物を形成する。",
        "str_progress": "障害物の長さ, 障害物の体力"
    },
    {
        "id": 292,
        "imageid": 292,
        "unknown1_6": 11,
        "str_name": "アルマジロローリング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "アルマジロのように体を丸くしたヘッジャーが命令場所まで回転しながら突進する。周辺に持続的ダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 293,
        "imageid": 293,
        "unknown1_6": 11,
        "str_name": "リフレクションスキン",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "ヘッジャーの肌に魔法反射の呪文を付与し、どのような魔法でも術者に反射する。\r\nモグラはサマナーの周囲で、サマナーの代わりに魔法を受ける。",
        "str_progress": "反射確率, 召喚獣の抵抗力"
    },
    {
        "id": 294,
        "imageid": 294,
        "unknown1_6": 11,
        "str_name": "ケルビー召喚",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "召喚獣である火犬「ケルビー」を召喚する。\r\n1段階状態で召喚する。繰り返して使用すると充填効果もある。",
        "str_progress": "キャスティング時間"
    },
    {
        "id": 295,
        "imageid": 295,
        "unknown1_6": 11,
        "str_name": "スウェルファー召喚",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "水の召喚獣だる「スウェルファー」を召喚する。1段階状態で召喚する。繰り返して使用すると充填効果もある。",
        "str_progress": "キャスティング時間"
    },
    {
        "id": 296,
        "imageid": 296,
        "unknown1_6": 11,
        "str_name": "ウィンディ召喚",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "召喚獣である風鳥「ウィンディ」を召喚する。\r\n1段階状態で召喚する。繰り返して使用すると充填効果もある。",
        "str_progress": "キャスティング時間"
    },
    {
        "id": 297,
        "imageid": 297,
        "unknown1_6": 11,
        "str_name": "ヘッジャー召喚",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "召喚獣である地モグラ「ヘッジャー」を召喚する。\r\n1段階状態で召喚する。繰り返して使用すると充填効果もある。",
        "str_progress": "キャスティング時間"
    },
    {
        "id": 298,
        "imageid": 298,
        "unknown1_6": 11,
        "str_name": "召喚獣パワーアップ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "指定した1段階の召喚獣を2段階にパワーアップすると同時に充填を行う。2段階にならないと3、4レベルの技術は使用できない",
        "str_progress": "キャスティング時間"
    },
    {
        "id": 299,
        "imageid": 299,
        "unknown1_6": 11,
        "str_name": "召喚獣ダブルパワーアップ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "自分の周りの召喚獣をパワーアップさせて、レベル・魔法攻撃力・全体速度・体力・魔法抵抗率を上昇させる。",
        "str_progress": "上昇率"
    },
    {
        "id": 300,
        "imageid": 300,
        "unknown1_6": 12,
        "str_name": "石投げ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "スリングで弾丸を投げる最小の攻撃。弾丸が石弾丸や鉄弾の種類の場合はもっと効果が良い。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 301,
        "imageid": 301,
        "unknown1_6": 12,
        "str_name": "岩投げ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "スリングで巨大な岩を投げ、周囲の岩を何でもつかんでは飛ばす技術のため、弾丸の必要無し。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 302,
        "imageid": 302,
        "unknown1_6": 12,
        "str_name": "ホットスピンストーン",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "スリングの弾丸を強く回転させて摩擦熱を発生させ、弾丸は高熱の状態で敵に向かって飛ぶ。",
        "str_progress": "威力"
    },
    {
        "id": 303,
        "imageid": 303,
        "unknown1_6": 12,
        "str_name": "ランダムショット",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "スリングで前方に弾丸を乱射する。",
        "str_progress": "威力"
    },
    {
        "id": 304,
        "imageid": 304,
        "unknown1_6": 12,
        "str_name": "ゴリアテスレイヤー",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "巨人ゴリアテも倒せるほど、力強いスリングの一撃を繰り出す。非常に強力で、周囲の敵にも被害を与える。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 305,
        "imageid": 305,
        "unknown1_6": 12,
        "str_name": "ボトル投げ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "スリングでファイアーボトルや毒ガスなどを投げるのに特化した技術。",
        "str_progress": "威力"
    },
    {
        "id": 306,
        "imageid": 306,
        "unknown1_6": 12,
        "str_name": "ポーション投げ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "味方を治癒する効果があるポーションを投げ、周囲のパーティーメンバー達を回復させ、状態異常を解除する。",
        "str_progress": "回復量、範囲"
    },
    {
        "id": 307,
        "imageid": 789,
        "unknown1_6": 12,
        "str_name": "ボトル専門家",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "熟練されたボトル攻撃でさらに強力に敵を攻撃する。",
        "str_progress": "威力"
    },
    {
        "id": 308,
        "imageid": 790,
        "unknown1_6": 12,
        "str_name": "特薬処方",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "一定時間の間、ボトルに特殊な酸性物質を添加する。特殊な酸性物質の入ったボトルに当たった敵はすべての抵抗が少しの間低下する。",
        "str_progress": "威力"
    },
    {
        "id": 309,
        "imageid": 791,
        "unknown1_6": 12,
        "str_name": "ボトル束投擲",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "ボトルを束で投げ、前方のすべての敵にダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 310,
        "imageid": 310,
        "unknown1_6": 12,
        "str_name": "横びんた",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "スリングの皮部分で敵の横っ面を殴って攻撃する。レベルによって狂気攻撃の発動確率が変化する。",
        "str_progress": "威力, 攻撃速度, 命中率, 発動確率"
    },
    {
        "id": 311,
        "imageid": 311,
        "unknown1_6": 12,
        "str_name": "大びんた",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "大きな手で敵の横っ面を殴って攻撃する。敵は殴られた反対方向にふっ飛ぶ。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 312,
        "imageid": 312,
        "unknown1_6": 12,
        "str_name": "スリング殴り",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "その場でスリングをぐるぐると回し、近くにいる敵に連続で打撃を与える。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 313,
        "imageid": 313,
        "unknown1_6": 12,
        "str_name": "ビックリびんた",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "大きな手で敵の横っ面を殴って攻撃する。攻撃が当たった敵は一番近い所にいる敵にぶつかって2次打撃を加え、その敵の攻撃を受ける。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 314,
        "imageid": 314,
        "unknown1_6": 12,
        "str_name": "モンスターバレット",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "近距離の短いスリングで当てた後、遠距離の敵に投げる。発射した後は近くの敵に連続的に弾かれていく。",
        "str_progress": "威力, 命中率, 反射回数"
    },
    {
        "id": 315,
        "imageid": 315,
        "unknown1_6": 12,
        "str_name": "死んだふり",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "地面に倒れて死んだふりをする。周囲の敵のターゲットにならない。一回使用後、再使用まで時間がかかるので危険な状況だけで使うこと。",
        "str_progress": "防御力\/抵抗力増加, 持続時間"
    },
    {
        "id": 316,
        "imageid": 316,
        "unknown1_6": 12,
        "str_name": "トリックキック",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "死んだふりをする中で接近してくる敵に足をかけて倒し、足にひっかかった時は比較的大きい打撃を与えるが、攻撃に気づかれてひっかけることができない場合が多い。",
        "str_progress": "威力, 発動確率"
    },
    {
        "id": 317,
        "imageid": 317,
        "unknown1_6": 12,
        "str_name": "スキップジャンプ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "ぴょんぴょん距離を取って走り回って敵の注意を集め、走る間のすべての攻撃を無視することができる。一回の使用後、体力低下で一定時間同じスキルを使うことができないことが難点。",
        "str_progress": "移動速度, 持続時間"
    },
    {
        "id": 318,
        "imageid": 318,
        "unknown1_6": 12,
        "str_name": "うそ泣き",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "大きい声でうそ泣きをする。しばらくの間、周囲の敵からターゲットにならない。また強力なスキルを使うことができるように精神を整える。",
        "str_progress": "キャスティング時間"
    },
    {
        "id": 319,
        "imageid": 319,
        "unknown1_6": 12,
        "str_name": "おしゃべり",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "ひっきりなしに、しゃべりまくって周囲にいる敵の一部を退屈で眠らせてしまう。同時に気持ちよくなって強力なスキルを使用できるようになる。",
        "str_progress": "キャスティング時間, 有効範囲, 睡眠確率"
    },
    {
        "id": 320,
        "imageid": 320,
        "unknown1_6": 12,
        "str_name": "うさぎ変身",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "短時間、小さなうさぎに変身する。しばらくの間は敵の対象にならないので、取り囲まれた敵陣から逃げる時に使用。一回使用すると変身の衝撃で再使用まで時間がかかる。",
        "str_progress": "持続時間, 抵抗力"
    },
    {
        "id": 321,
        "imageid": 321,
        "unknown1_6": 12,
        "str_name": "武器変身",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "一定時間の間、指定したパーティーメンバーの武器に変身してパーティーのインベントリに入りこむ。武器の性能はプリンセスやパーティーメンバーの能力に比例し、各種ボトルや食べ物を投げることができる。",
        "str_progress": "持続時間, PT武器攻撃力"
    },
    {
        "id": 322,
        "imageid": 322,
        "unknown1_6": 12,
        "str_name": "丸太変身",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "道中を大きくなった丸太に変身してゴロゴロころがって行き、丸太がころがり着く所にいる敵は皆打撃を受ける。",
        "str_progress": "威力"
    },
    {
        "id": 323,
        "imageid": 323,
        "unknown1_6": 12,
        "str_name": "バルーンアタック",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "ワンドを使って巨大プリンセスに変身。少しの間、ボールのように丸くなり敵を踏みつぶして攻撃することができる。",
        "str_progress": "威力, 防御力, 持続時間"
    },
    {
        "id": 324,
        "imageid": 324,
        "unknown1_6": 12,
        "str_name": "プリンセスのキス",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "地面に座りこんでうそ泣きをした後、敵に投げキッスを飛ばし、飛んできたキスに当たると一定確率で蛙に変身する。ボスクラス以上の敵や敵の体力が大量に残っている時には通じない。",
        "str_progress": "成功確率, 持続時間"
    },
    {
        "id": 325,
        "imageid": 325,
        "unknown1_6": 13,
        "str_name": "スウィングワンド",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ワンドを振り回して敵を攻撃する。",
        "str_progress": "威力"
    },
    {
        "id": 326,
        "imageid": 326,
        "unknown1_6": 13,
        "str_name": "スターガン",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "小さな星一つをワンドから発射して攻撃する。星に当たった敵は、移動速度が減少する",
        "str_progress": "威力"
    },
    {
        "id": 327,
        "imageid": 327,
        "unknown1_6": 13,
        "str_name": "アケインワンド",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "ワンドに宿る力を利用し、より強力な光属性の攻撃を行う",
        "str_progress": "発動確率, 威力"
    },
    {
        "id": 328,
        "imageid": 328,
        "unknown1_6": 13,
        "str_name": "コメットシューティング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "大きな彗星をワンドで作り出して敵に打ち当てる",
        "str_progress": "威力"
    },
    {
        "id": 329,
        "imageid": 329,
        "unknown1_6": 13,
        "str_name": "クエーサーシャワー",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "宇宙の天体、星群を前方の敵にでたらめに振り撤く",
        "str_progress": "威力"
    },
    {
        "id": 330,
        "imageid": 330,
        "unknown1_6": 13,
        "str_name": "金切り声",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "金切り声を上げて周囲の敵を驚かす。敵は移動低下状態になる。",
        "str_progress": "速度低下値, 発動確率"
    },
    {
        "id": 331,
        "imageid": 331,
        "unknown1_6": 13,
        "str_name": "ムーンウォーキング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "軽快な魔法の歌を歌う。低確率で敵の攻撃を避け、無効化する",
        "str_progress": "発動確率"
    },
    {
        "id": 332,
        "imageid": 332,
        "unknown1_6": 13,
        "str_name": "バトルマーチ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "パーティーメンバーの士気を高めてくれる力強い歌を歌う。パーティーメンバーの攻撃力と命中率、攻撃速度、移動速度が上がる",
        "str_progress": "上昇率"
    },
    {
        "id": 333,
        "imageid": 333,
        "unknown1_6": 13,
        "str_name": "レッツダンシング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "歌を歌って周囲のモンスターを一定確率で踊らせる",
        "str_progress": "発動確率"
    },
    {
        "id": 334,
        "imageid": 334,
        "unknown1_6": 13,
        "str_name": "アイドルスター",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "パーティーメンバーの士気を高めてくれる力強い歌を歌う。パーティーメンバーの防御力と回避率、魔法攻撃力、魔法致命打が上がる",
        "str_progress": "有効範囲, 上昇率"
    },
    {
        "id": 335,
        "imageid": 335,
        "unknown1_6": 13,
        "str_name": "アストラルスピリット",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "星の精霊が自分の周囲にある危険装置を教えてくれる。パーティーメンバーたちにも危険装置の位置が見える。",
        "str_progress": "探知範囲, 探知レベル"
    },
    {
        "id": 336,
        "imageid": 336,
        "unknown1_6": 13,
        "str_name": "ステラピア",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "星の力を借りて最大CPが上昇する。CPを持続的に少量回復する",
        "str_progress": "上昇率, 持続時間"
    },
    {
        "id": 337,
        "imageid": 337,
        "unknown1_6": 13,
        "str_name": "スターライト",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "空から降り落ちる星々の光がパーティーメンバーのもとに幸運と知恵を持ってきてくれる",
        "str_progress": "増加数値, 持続時間"
    },
    {
        "id": 338,
        "imageid": 338,
        "unknown1_6": 13,
        "str_name": "勝利の女神",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "空の星を呼んでパーティーメンバー中一人のレベルを一時的に向上させる",
        "str_progress": "レベル上昇値, 持続時間"
    },
    {
        "id": 339,
        "imageid": 339,
        "unknown1_6": 13,
        "str_name": "ウルトラノヴァ",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "空から落ちてくる流れ星が一定範囲内の敵に打撃を与える。一定確率ですべての低下系状態異常にかかる",
        "str_progress": "威力, 範囲, 発動確率, 低下量"
    },
    {
        "id": 340,
        "imageid": 340,
        "unknown1_6": 13,
        "str_name": "愛の伝書鳩",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "リトルウィッチのもとに、不足した消耗アイテムの回復薬、治療薬、ファイアーボトル等を買ってきて配逹する鳩を召喚する。もちろん、お金もかかり、配逹費もかかるが、常連には値下げしてくれるらしい",
        "str_progress": "アイテム種類, 配達費"
    },
    {
        "id": 341,
        "imageid": 341,
        "unknown1_6": 13,
        "str_name": "ラビットラッシュ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ワンドの先で小さなウサギ達を召喚する。ウサギ達はターゲットの敵を取り囲んで移動不能にする",
        "str_progress": "威力"
    },
    {
        "id": 342,
        "imageid": 342,
        "unknown1_6": 13,
        "str_name": "マジカルドローイング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "ワンドで標的を描くと、その標的となった敵のコピーが飛び出して代わりに戦う。たまに手が震えて失敗する時もあり、複雑で描き難いものはコピー不可能。一度に一体の敵だけコピー可能",
        "str_progress": "持続時間, 限界レベル, 複製品HP"
    },
    {
        "id": 343,
        "imageid": 343,
        "unknown1_6": 13,
        "str_name": "ローズガーデン",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "自分の周りにバラの庭を造りだす。庭園内にいるパーティーメンバーはトゲ状態になり、CP消耗が減少する。リトルウィッチ一人につき、一度に1つだけローズガーデンを生成可能",
        "str_progress": "範囲, 持続時間, リターン率"
    },
    {
        "id": 344,
        "imageid": 344,
        "unknown1_6": 13,
        "str_name": "マジックボックス",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "敵一体を魔法の箱に入れてねじってしまう。箱を攻撃すれば敵を即死させることもできるが、失敗すれば敵は回復して元気にそのまま脱出してしまう",
        "str_progress": "発動確率, 限界レベル"
    },
    {
        "id": 345,
        "imageid": 345,
        "unknown1_6": 13,
        "str_name": "ブレストファイア",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "胸から光の光線を発射する",
        "str_progress": "威力"
    },
    {
        "id": 346,
        "imageid": 346,
        "unknown1_6": 13,
        "str_name": "ビッグサービス",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "変身の瞬間を利用してパーティーメンバーの体力を回復する。周囲のパーティーメンバーたちの体力を少量回復して、大量の体力が応急処置状態になる。",
        "str_progress": "範囲, 回復量"
    },
    {
        "id": 347,
        "imageid": 347,
        "unknown1_6": 13,
        "str_name": "ライトニングワインダー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "変身時の回転を利用して電気を発散。周りの敵へ稲妻が広がる。",
        "str_progress": "威力, 範囲, 攻撃回数"
    },
    {
        "id": 348,
        "imageid": 348,
        "unknown1_6": 13,
        "str_name": "花の乙女スペシャル",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "変身を繰り返して周囲の敵を攻撃する。また破片を飛ばして敵を攻撃。スキル完了後はプリンセスに戻る。",
        "str_progress": "威力, 範囲, 発動確率, 攻撃回数"
    },
    {
        "id": 349,
        "imageid": 349,
        "unknown1_6": 13,
        "str_name": "ガールズパラダイス",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "画面いっぱいに変身中の自分の分身を作る。パーティーメンバーたちはHPとCPが一定の割合で充填される。使用後はプリンセスに戻る。",
        "str_progress": "範囲, 回復量, クールタイム"
    },
    {
        "id": 350,
        "imageid": 350,
        "unknown1_6": 14,
        "str_name": "フルアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "装備している様々な武器で敵を攻撃したり、または降霊したモンスターに攻撃命令を下す。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 351,
        "imageid": 351,
        "unknown1_6": 14,
        "str_name": "ダークナイト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "周囲にいる敵の視野を狭め見難くする。",
        "str_progress": "範囲, 持続時間, 発動確率"
    },
    {
        "id": 352,
        "imageid": 352,
        "unknown1_6": 14,
        "str_name": "死霊術",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "体力が一定値以下に低下したアンデッド系列のモンスターにネクロマンサーの魂を注入し、ネクロマンサーが操るアンデッドを作ってしまう。一般1～4型モンスターにのみ有効で、一般セミボス以上はこのスキルの影響を受けない。自分のレベルとスキルレベルが高いほど、高レベル",
        "str_progress": "命中率, 限界レベル, 成功確率, ペット能力値増加"
    },
    {
        "id": 353,
        "imageid": 353,
        "unknown1_6": 14,
        "str_name": "催眠術",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "体力が低下している敵を衝動的な睡魔に陥れて眠り状態にさせる。睡眠状態の敵は攻撃されると致命的なダメージを受ける。",
        "str_progress": "持続時間"
    },
    {
        "id": 354,
        "imageid": 354,
        "unknown1_6": 14,
        "str_name": "ダークネスイリュージョン",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "まやかしの闇で自分と周囲にいる敵の「知識と力」、「知恵と敏捷性」をそれぞれ入れ替える",
        "str_progress": "持続時間"
    },
    {
        "id": 355,
        "imageid": 355,
        "unknown1_6": 14,
        "str_name": "デビルイリュージョン",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "望む位置に、自分が悪魔に変化したと思わせるような幻影を作る。敵は、この幻影を先に攻撃するので時間を稼ぐことができる",
        "str_progress": "射程距離, 持続時間, 幻影のHP"
    },
    {
        "id": 356,
        "imageid": 356,
        "unknown1_6": 14,
        "str_name": "ダメージカット",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "体力を共有する魔術空間を形成してパーティーメンバーとダメージを共有する。レベルが上がれば、さらに多くのメンバーとダメージを共有することができる。なお、メンバーが行動不能になる場合、その直前に効果が消え去り、他のメンバーへのダメージをシャットアウトする",
        "str_progress": "ダメージ減少率, 有効距離, 持続時間"
    },
    {
        "id": 357,
        "imageid": 357,
        "unknown1_6": 14,
        "str_name": "陰謀の影",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "邪悪な陰謀を企むことで自分を苦しめ、自身にダメージを与える。持続時間の経過により、アイテムやスキルの効果が消える時、効果が持続していた時間分のダメージを敵に与える",
        "str_progress": "威力, 持続時間"
    },
    {
        "id": 358,
        "imageid": 358,
        "unknown1_6": 14,
        "str_name": "死の予言",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵に死の呪いをかけて、敵の体力を現在の体力から決まった割合の体力に、応急処置的に変えてしまう",
        "str_progress": "応急処置転換の割合"
    },
    {
        "id": 359,
        "imageid": 359,
        "unknown1_6": 14,
        "str_name": "マリオネット",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "アンデッド系ペットの能力値が大幅に増加する。あまりにも危険な術であるため、安易に使用できないところが欠点。",
        "str_progress": "威力"
    },
    {
        "id": 360,
        "imageid": 360,
        "unknown1_6": 14,
        "str_name": "嫌み",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "毒づいて敵の物理攻撃の命中率および、物理攻撃の回避率を低下させる",
        "str_progress": "持続時間, 敵命中\/回避低下率"
    },
    {
        "id": 361,
        "imageid": 361,
        "unknown1_6": 14,
        "str_name": "悪口",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "悪口で敵の集中力を落として、六大元素抵抗力を弱化させる。魔法攻撃の威力を高めることができる",
        "str_progress": "抵抗力低下率"
    },
    {
        "id": 362,
        "imageid": 362,
        "unknown1_6": 14,
        "str_name": "悪態",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "周囲の敵に毒づいて、敵の攻撃力と防御力、全体速度を低下させる",
        "str_progress": "範囲, 持続時間, 攻撃力, 防御力, 全体速度低下率"
    },
    {
        "id": 363,
        "imageid": 363,
        "unknown1_6": 14,
        "str_name": "毒舌",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "周囲の敵をののしり、怒らせる事で全体的な能力値を低下させる",
        "str_progress": "持続時間, 発動確率, レベル低下"
    },
    {
        "id": 364,
        "imageid": 364,
        "unknown1_6": 14,
        "str_name": "逆鱗",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "悪意に満ちた悪口で戦闘本能を刺激させる。ただし、敵が限られた小時間内に攻撃を成功させることができなければ、極端なダメージを与えることができる",
        "str_progress": "威力, 限界時間"
    },
    {
        "id": 365,
        "imageid": 365,
        "unknown1_6": 14,
        "str_name": "吸血",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "術にかかった敵に与えたダメージの一部を変換して、パーティーメンバーの体力を回復する",
        "str_progress": "発動確率, 持続時間, 献血の割合"
    },
    {
        "id": 366,
        "imageid": 366,
        "unknown1_6": 14,
        "str_name": "針のむしろ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵の余裕を奪って攻撃のミスを誘い、自責の念にとらわれた敵に闇ダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 367,
        "imageid": 367,
        "unknown1_6": 14,
        "str_name": "ミラーカーズ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵が攻撃を試みる度に、攻撃者もダメージを受ける呪いをかける",
        "str_progress": "威力, 持続時間"
    },
    {
        "id": 368,
        "imageid": 368,
        "unknown1_6": 14,
        "str_name": "蟻地獄",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "強力な呪いで、敵が体力を回復しようとすると一定のダメージを与えて回復することができないようにする",
        "str_progress": "威力"
    },
    {
        "id": 369,
        "imageid": 369,
        "unknown1_6": 14,
        "str_name": "死の香り",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "薄気味悪い死の香りで、敵の異常系抵抗力・低下系抵抗力・呪い系抵抗力を一定数値以上、無効にさせてしまう。",
        "str_progress": "威力, 持続時間, 抵抗力低下率"
    },
    {
        "id": 370,
        "imageid": 370,
        "unknown1_6": 14,
        "str_name": "恐怖の幻影",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ネクロマンサーの途方もない幻想が視覚化し、周囲の敵を幻覚に陥れる、術者は霊感を高めることで、さらに強力な攻撃を準備することができるようになる。",
        "str_progress": "威力"
    },
    {
        "id": 371,
        "imageid": 371,
        "unknown1_6": 14,
        "str_name": "ファントムインパルス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "非常に強い精神的な衝撃によって使用者のCPがマイナスされた分だけ、闇ダメージを敵に与える",
        "str_progress": "再使用時間"
    },
    {
        "id": 372,
        "imageid": 372,
        "unknown1_6": 14,
        "str_name": "悪夢",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵が睡眠状態である場合、悪夢に陥れる。一定時間毎にダメージをずっと与え、誰かの助けや治療薬がなければ永遠に悪夢の中から目覚めることができないかも知れない恐ろしい術",
        "str_progress": "威力, 持続時間"
    },
    {
        "id": 373,
        "imageid": 373,
        "unknown1_6": 14,
        "str_name": "烈火の怒り",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵にだけ見える幻想を作り出し攻撃できないようにする術。敵は幻想の中に巻き込まれている間は攻撃される事が無く、持続時間が経つと敵に一定ダメージを与えられる",
        "str_progress": "発動確率, 威力, 限界時間"
    },
    {
        "id": 374,
        "imageid": 374,
        "unknown1_6": 14,
        "str_name": "蘇生術",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "行動不能になった者をアンデッドの属性でしばらく蘇生させる。能力値低下ペナルティーがなく、制限時間中は体力が無くなっても行動不能状態にならない。制限時間になると、また行動不能状態になる",
        "str_progress": "持続時間"
    },
    {
        "id": 375,
        "imageid": 375,
        "unknown1_6": 15,
        "str_name": "スピンフラッシュ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "悪魔の鞭を振り回して鋭い攻撃を敵に与える",
        "str_progress": "威力, 命中"
    },
    {
        "id": 376,
        "imageid": 376,
        "unknown1_6": 15,
        "str_name": "ドローボディー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "鞭で遠い所にいる敵をからめて自分の前まで連れてくる",
        "str_progress": "命中, 発動確率"
    },
    {
        "id": 377,
        "imageid": 377,
        "unknown1_6": 15,
        "str_name": "マッドデビル",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "悪魔の本性が呼び覚まされ最大HPが増加する",
        "str_progress": "最大HP"
    },
    {
        "id": 378,
        "imageid": 378,
        "unknown1_6": 15,
        "str_name": "悪魔の誘惑",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "悪魔の美貌を利用して誘惑し、敵を味方にしてしまう。他の複雑な制約がなく、チャーミングの成功確率は高いが、持続時間が短い",
        "str_progress": "持続時間, 発動確率"
    },
    {
        "id": 379,
        "imageid": 379,
        "unknown1_6": 15,
        "str_name": "バインドブレイズ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "強烈な地獄の業火に包まれた鞭で攻撃する。地獄の業火は一定回数にわたってダメージを与え続ける",
        "str_progress": "威力, 命中率, 攻撃回数"
    },
    {
        "id": 380,
        "imageid": 380,
        "unknown1_6": 15,
        "str_name": "地獄の矛",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "自分が攻撃する際に、地獄の監獄にある鉄の矛を召喚し、敵を突いて攻撃する",
        "str_progress": "威力、発動確率"
    },
    {
        "id": 381,
        "imageid": 381,
        "unknown1_6": 15,
        "str_name": "ヘルプリズン",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵を地の底より召喚した「地獄の監獄」の中に閉じこめてしまう。敵は一定時間移動できない。",
        "str_progress": " "
    },
    {
        "id": 382,
        "imageid": 382,
        "unknown1_6": 15,
        "str_name": "ワームバイト",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "地中から虫を召喚し、自分を攻撃した敵を噛ませる。噛まれた敵はダメージを受け、噛まれている間は動くことができない",
        "str_progress": "威力, 発動確率, 虫HP, 虫防御力"
    },
    {
        "id": 383,
        "imageid": 383,
        "unknown1_6": 15,
        "str_name": "スパイダーウェブ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "自分が攻撃されると、周囲の一定地域に移動を抑止する蜘蛛の糸を撒き散らす",
        "str_progress": "範囲, 持続時間, 発動確率"
    },
    {
        "id": 384,
        "imageid": 384,
        "unknown1_6": 15,
        "str_name": "アラクノフォビア",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "周囲の一定地域に移動を抑止する蜘蛛の糸を撒き散らす。抜け出せない敵は糸の中で蜘蛛の攻撃を受ける",
        "str_progress": "威力"
    },
    {
        "id": 385,
        "imageid": 385,
        "unknown1_6": 15,
        "str_name": "ポイズンボム",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵の体内に広がった毒を瞬時に爆発させ、強力なダメージを与える。 ",
        "str_progress": "威力"
    },
    {
        "id": 386,
        "imageid": 386,
        "unknown1_6": 15,
        "str_name": "ポイズンガス",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "一定の地域に毒ガスの雲を形成する。その中にいる敵は毒に侵され、大地抵抗が減少する。",
        "str_progress": "威力、範囲、中毒、大地抵抗減少"
    },
    {
        "id": 387,
        "imageid": 387,
        "unknown1_6": 15,
        "str_name": "ポイズンスプレー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "一定範囲内の敵が毒にかかった場合、その体内に広がった毒を全身に拡散させてダメージと一緒に、暗闇と混乱とマヒ状態を引き起こす",
        "str_progress": "威力、範囲"
    },
    {
        "id": 388,
        "imageid": 388,
        "unknown1_6": 15,
        "str_name": "ポイズンエクスプロージョン",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵が毒にかかった場合、瞬間的に体外に毒を噴き出すようにする。体外に出た毒が残り、敵に強力なダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 389,
        "imageid": 389,
        "unknown1_6": 15,
        "str_name": "モータルクラウド",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "周囲に強力で致命的なダメージをあたえる毒ガスで出来た雲を振りまく。その毒ガスの雲の中では、敵は毒に侵される。",
        "str_progress": "威力、範囲、中毒"
    },
    {
        "id": 390,
        "imageid": 390,
        "unknown1_6": 15,
        "str_name": "ディープスロウ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "非常に悲しい歌声で気を引き、敵のすべての行動を遅くしてしまう",
        "str_progress": "発動確率, 攻撃\/移動速度低下"
    },
    {
        "id": 391,
        "imageid": 391,
        "unknown1_6": 15,
        "str_name": "ブラックブルース",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵の鎧の内側に多くの刺を作って鎧の内側から攻撃する。防御力が高い敵であればあるほど、強力なダメージを与えることが出来る",
        "str_progress": "威力, 攻撃回数"
    },
    {
        "id": 392,
        "imageid": 392,
        "unknown1_6": 15,
        "str_name": "デッドリーナイトメア",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "周囲の敵を悪夢の眠りに巻き込む。眠った敵は持続的にダメージを受けて、攻撃を受けるか周囲の助けがなければ目覚めることが出来ない。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 393,
        "imageid": 393,
        "unknown1_6": 15,
        "str_name": "レクイエム",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "死者のための鎮魂曲を歌って、生者を深い悲しみに落とすことで体力回復が出来ないようにしてしまい、体力回復の効果を下げてしまう。また、行動不能状態を回復できなくする",
        "str_progress": "発動確率, 回復率低下"
    },
    {
        "id": 394,
        "imageid": 394,
        "unknown1_6": 15,
        "str_name": "ブラッディークロス",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "敵を攻撃する場合、低い確率で血で染まった呪い十字架を召喚して攻撃する。この十字架は一定範囲内にいる敵の体力を吸い取りパーティーメンバーに与える",
        "str_progress": "威力, 発動確率"
    },
    {
        "id": 395,
        "imageid": 395,
        "unknown1_6": 15,
        "str_name": "魔の約定",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵をとても甘ったるい餌で誘惑して契約を結ぶ。契約した敵は一定時間毎に体力を回復するが、周りの敵にはダメージが与えられる",
        "str_progress": "敵回復量, 持続時間"
    },
    {
        "id": 396,
        "imageid": 396,
        "unknown1_6": 15,
        "str_name": "魂の契約",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵が契約を結んだ状態の時に、その契約を修正して死後の魂に関する権利を悪魔に譲渡する。これで敵は死んだ際に最後の一撃を与えた者に一定数のCPを奪われるようになる",
        "str_progress": "威力, 持続時間"
    },
    {
        "id": 397,
        "imageid": 397,
        "unknown1_6": 15,
        "str_name": "血の盟約",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵が契約を結んだ状態の時に、その契約を修正して死後の血に関する権利を悪魔に譲渡する。これで敵は死んだ際に最後の一撃を与えた者に一定数の体力を奪われるようになる",
        "str_progress": "威力, 持続時間"
    },
    {
        "id": 398,
        "imageid": 398,
        "unknown1_6": 15,
        "str_name": "契約破棄",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵が契約を結んだ状態の時に、一方的に契約を破棄して敵に衝撃と共に大きな闇ダメージを与える",
        "str_progress": "威力"
    },
    {
        "id": 399,
        "imageid": 399,
        "unknown1_6": 15,
        "str_name": "裏切りの契約",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "敵が契約を結んだ状態の時に、悪質で不公平な契約に強制的に更新し、敵の防御力と闇属性抵抗力を減少させる。",
        "str_progress": "持続時間、防御力減少、闇属性抵抗力減少"
    },
    {
        "id": 400,
        "imageid": 400,
        "unknown1_6": 16,
        "str_name": "斜め斬り",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "鎌を高く掲げ斬りつける。",
        "str_progress": "威力、命中率"
    },
    {
        "id": 401,
        "imageid": 401,
        "unknown1_6": 16,
        "str_name": "必殺斬り",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵の弱点を狙って致命打を与える。ただし、成功確率は高くない。",
        "str_progress": "威力"
    },
    {
        "id": 402,
        "imageid": 402,
        "unknown1_6": 16,
        "str_name": "竜巻起こし",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "鎌で突風を起こして、敵を巻き込む。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 403,
        "imageid": 403,
        "unknown1_6": 16,
        "str_name": "乱斬り",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "鎌で敵を無差別に斬りつけ攻撃する。スキル使用後、移動可能。",
        "str_progress": "威力、攻撃回数"
    },
    {
        "id": 404,
        "imageid": 405,
        "unknown1_6": 16,
        "str_name": "嵐斬り",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "吹き荒れる刃の竜巻を起こし、敵を切り裂く。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 405,
        "imageid": 404,
        "unknown1_6": 16,
        "str_name": "脚斬り",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "鎌で敵の足を斬りつけ動きを鈍くし、攻撃を回避させないようにする。",
        "str_progress": "成功確率、持続時間、回避低下率"
    },
    {
        "id": 406,
        "imageid": 406,
        "unknown1_6": 16,
        "str_name": "腕斬り",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "鎌でモンスターの腕を斬りつけ、攻撃力を低下させる。",
        "str_progress": "確率、持続時間"
    },
    {
        "id": 407,
        "imageid": 407,
        "unknown1_6": 16,
        "str_name": "胴斬り",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵に深い傷を負わせて、自動発動スキルを解除し使用不可にする。モンスターの場合、防御力を低下させる。",
        "str_progress": "成功確率、持続時間"
    },
    {
        "id": 408,
        "imageid": 408,
        "unknown1_6": 16,
        "str_name": "魂斬り",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵の魂を斬りつけて衰弱させる。魂を斬られると低確率で異常系抵抗、低下系抵抗、呪い系抵抗が低下する。",
        "str_progress": "成功確率、持続時間"
    },
    {
        "id": 409,
        "imageid": 409,
        "unknown1_6": 16,
        "str_name": "真空斬り",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "鎌で周囲の空気を切り裂き、真空空間を作り出す。真空空間では、レベル1のスキルしか使用できない。",
        "str_progress": "範囲、持続時間"
    },
    {
        "id": 410,
        "imageid": 410,
        "unknown1_6": 16,
        "str_name": "アセンブル",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "の世に彷徨う魂を呼び集め、その力でさらに強力な技を使えるようにする。",
        "str_progress": "持続時間、キャスティング時間"
    },
    {
        "id": 411,
        "imageid": 411,
        "unknown1_6": 16,
        "str_name": "リバレイト",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "束縛された魂を解放し、一定時間すべての能力を上昇させる。「アセンブル」状態でのみ使用可能。",
        "str_progress": "持続時間、能力値増加率"
    },
    {
        "id": 412,
        "imageid": 412,
        "unknown1_6": 16,
        "str_name": "アブソーブ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "呼び集めた魂を体内に吸収し、自分の体力を回復させる。「アセンブル」状態でのみ使用可能",
        "str_progress": "HP回復量、キャスティング時間"
    },
    {
        "id": 413,
        "imageid": 413,
        "unknown1_6": 16,
        "str_name": "サンクチュアリ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "一時的に、霊界に肉体を移動させることで、どのような干渉も受け付けない状態になる。「アセンブル」状態でのみ使用可能。",
        "str_progress": "持続時間、移動速度"
    },
    {
        "id": 414,
        "imageid": 414,
        "unknown1_6": 16,
        "str_name": "魂の暴走",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "魂を崩壊させて発生したエネルギーを吸収し、攻撃速度及び移動速度を増加させる。また、すべてのスキルを消費CP無しで使用可能となるが、回避率と防御力が低下する。「アセンブル」状態でのみ使用可能",
        "str_progress": "速度増加率, ペナルティー減少"
    },
    {
        "id": 415,
        "imageid": 415,
        "unknown1_6": 16,
        "str_name": "クルーエルソウル",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "パーティーメンバーに残忍な魂を乗り移らせて、致命打確率、魔法致命打確率、致命打威力を上昇させる。ただし、CPを消費し続ける。",
        "str_progress": "威力, 確率"
    },
    {
        "id": 416,
        "imageid": 416,
        "unknown1_6": 16,
        "str_name": "スクリームソウル",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "パーティーメンバーに狂気の魂を乗り移らせて、攻撃力を上昇させる。ただし、CPを消費し続ける。",
        "str_progress": "威力"
    },
    {
        "id": 417,
        "imageid": 417,
        "unknown1_6": 16,
        "str_name": "ワンダーソウル",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "パーティーメンバーに彷徨う魂を乗り移らせて、回避率を上昇させる。受けるダメージが減少する。また、魂の力で魔法抵抗力を少々増加させる。ただし、CPを消費し続ける",
        "str_progress": "回避率"
    },
    {
        "id": 418,
        "imageid": 418,
        "unknown1_6": 16,
        "str_name": "神隠し",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "パーティーメンバーに透明な魂を乗り移らせて、敵から先制攻撃を受けない状態にするが、移動速度は遅くなる。また、CPを消費し続ける。",
        "str_progress": "移動速度"
    },
    {
        "id": 419,
        "imageid": 419,
        "unknown1_6": 16,
        "str_name": "レイジソウル",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "パーティーメンバーに憤怒の魂を乗り移らせ、魔法ダメージを増幅させる。ただし、CPを消費し続ける。",
        "str_progress": "威力, 確率"
    },
    {
        "id": 420,
        "imageid": 420,
        "unknown1_6": 16,
        "str_name": "ソウルプランダー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "闇に染まった霊を召喚し、敵の魂を闇に落とす。魂が堕落した敵は持続的な闇ダメージを受ける。",
        "str_progress": "闇ダメージ"
    },
    {
        "id": 421,
        "imageid": 421,
        "unknown1_6": 16,
        "str_name": "魂の追放",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵の魂に地獄の雄叫びを浴びせることで恐怖の世界に包み込み、思考と反対の行動をさせる。恐怖の世界に包まれると動くことができなくなる",
        "str_progress": "範囲"
    },
    {
        "id": 422,
        "imageid": 422,
        "unknown1_6": 16,
        "str_name": "ソウルトレース",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "魂の世界を通り抜けて瞬時に敵の懐に入り、鎌で攻撃する",
        "str_progress": "威力, 射程距離"
    },
    {
        "id": 423,
        "imageid": 423,
        "unknown1_6": 16,
        "str_name": "魂のスイッチ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵にかかっている魔法の効果を逆転させ、有害な魔法に変換する",
        "str_progress": "持続時間, 変換率"
    },
    {
        "id": 424,
        "imageid": 424,
        "unknown1_6": 16,
        "str_name": "ソウルブレイズ",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "魂を燃やす霊火を召喚し、持続的に火炎ダメージを与える。霊火が消える瞬間、かけられていた全ての魔法が消える。",
        "str_progress": "威力、最大打撃人数"
    },
    {
        "id": 425,
        "imageid": 425,
        "unknown1_6": 17,
        "str_name": "ポゼッション・ブル",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "右手で深く突いた後に闘牛の魂を憑依させて、一定時間ダメージを増加させる",
        "str_progress": "威力"
    },
    {
        "id": 426,
        "imageid": 426,
        "unknown1_6": 17,
        "str_name": "ポゼッション・ホーク",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "風のマナを込めて攻撃した後、鷹の魂を憑依させてより素早い攻撃を可能にする。",
        "str_progress": "威力"
    },
    {
        "id": 427,
        "imageid": 427,
        "unknown1_6": 17,
        "str_name": "ポゼッション・ベア",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "高く上げた右手で攻撃して前方にダメージを与えた後、熊の魂を憑依させる事で強力な攻撃を与える確率が増加する。",
        "str_progress": "威力"
    },
    {
        "id": 428,
        "imageid": 428,
        "unknown1_6": 17,
        "str_name": "ポゼッション・スネーク",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "回転攻撃で敵の急所を突き、敵のCPを減少させた後、蛇の魂を憑依させて攻撃時の獲得CP量が増加する。",
        "str_progress": "威力"
    },
    {
        "id": 429,
        "imageid": 429,
        "unknown1_6": 17,
        "str_name": "ポゼッション・ピューマ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "右手で敵を斬りつけた後にピューマの魂を憑依させて、一定時間、クリティカル確率を上昇させる。",
        "str_progress": "威力"
    },
    {
        "id": 430,
        "imageid": 430,
        "unknown1_6": 17,
        "str_name": "蛇の目拳",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "蛇の形をしたオーラを放ち、敵を闘士の前に引き寄せる。",
        "str_progress": "威力"
    },
    {
        "id": 431,
        "imageid": 431,
        "unknown1_6": 17,
        "str_name": "鷹の目拳",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "鋭いマナを体内から爆破させ、周囲にダメージを与えて攻撃に弱い状態にする。",
        "str_progress": "威力, 低下率"
    },
    {
        "id": 432,
        "imageid": 432,
        "unknown1_6": 17,
        "str_name": "大熊拳",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "強力な一撃を放ち、敵を麻痺させる。強打された敵は後遺症が残り、移動速度が減少する",
        "str_progress": "威力, ノックバック確率, ノックバック距離"
    },
    {
        "id": 433,
        "imageid": 433,
        "unknown1_6": 17,
        "str_name": "猛牛拳",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "前方に突進する。突進経路内の全ての敵にダメージを与える。",
        "str_progress": "威力, 射程距離"
    },
    {
        "id": 434,
        "imageid": 434,
        "unknown1_6": 17,
        "str_name": "ピューマアタック",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "一瞬だけ光速となって敵に近付き、急所を突いて出血を起こし、持続的ダメージを与える。",
        "str_progress": "威力, 攻撃回数, 出血ダメージ"
    },
    {
        "id": 435,
        "imageid": 435,
        "unknown1_6": 17,
        "str_name": "雷撃破",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵を掴んでダメージを与え、オーラを集中し武器を強化する。",
        "str_progress": "威力, 最大武器攻撃力"
    },
    {
        "id": 436,
        "imageid": 436,
        "unknown1_6": 17,
        "str_name": "双連破",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "オーラを集めて分身を作り出し、周辺のすべての敵に連打を浴びせる",
        "str_progress": "威力, 連打回数, 分身個数"
    },
    {
        "id": 437,
        "imageid": 437,
        "unknown1_6": 17,
        "str_name": "竜撃破",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "敵を強打で吹き飛ばした後、連打攻撃で追い討ちをかける",
        "str_progress": "威力, 連打回数"
    },
    {
        "id": 438,
        "imageid": 438,
        "unknown1_6": 17,
        "str_name": "プラズマボルト",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "凝集させたオーラを高速で何度も打ち出して敵を攻撃する",
        "str_progress": "威力, 射程距離, 回数"
    },
    {
        "id": 439,
        "imageid": 439,
        "unknown1_6": 17,
        "str_name": "桜吹雪",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "戦闘中に闘士が高揚感に包まれる。オーラを爆破させて吹き飛ばす。",
        "str_progress": "威力, 爆破範囲"
    },
    {
        "id": 440,
        "imageid": 440,
        "unknown1_6": 17,
        "str_name": "コンセントレーション",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "オーラを集中させCPを集めて、より大きな攻撃を準備する。",
        "str_progress": "上向値"
    },
    {
        "id": 441,
        "imageid": 441,
        "unknown1_6": 17,
        "str_name": "リフレクション",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "魔法攻撃を受ける瞬間にオーラで体を包み込み、魔法抵抗力を持って集めたオーラを利用し、反撃する。",
        "str_progress": "威力, 確率, 魔法抵抗率"
    },
    {
        "id": 442,
        "imageid": 442,
        "unknown1_6": 17,
        "str_name": "半月いなし",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "攻撃される瞬間にオーラを集中させて敵の攻撃をいなし、反撃の準備をする。",
        "str_progress": "発動確率, 命中率"
    },
    {
        "id": 443,
        "imageid": 443,
        "unknown1_6": 17,
        "str_name": "胴砕き",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "攻撃時、敵の体制を崩して防御させない",
        "str_progress": "確率"
    },
    {
        "id": 444,
        "imageid": 444,
        "unknown1_6": 17,
        "str_name": "覚醒",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "最大限まで潜在能力を引き出し、オーラを爆破させて激しく攻撃する。",
        "str_progress": "威力, 上昇率"
    },
    {
        "id": 445,
        "imageid": 445,
        "unknown1_6": 17,
        "str_name": "ピューマラッシュ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "獲物を追うピューマのように移動速度が増加し、走る時にCP消耗量が永久的に減少する。",
        "str_progress": "移動速度, 集中力"
    },
    {
        "id": 446,
        "imageid": 446,
        "unknown1_6": 17,
        "str_name": "スネークマジック",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "一瞬にして環境に適応する蛇の如く、全ての異常抵抗力が永久的に上昇する。",
        "str_progress": "全ての異常抵抗力"
    },
    {
        "id": 447,
        "imageid": 447,
        "unknown1_6": 17,
        "str_name": "ビーストハート",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "激しく力強く鼓動する心臓を持つ猛牛の如く、最大限まで肉体を覚醒させることで体力の最大値を上昇させる",
        "str_progress": "最大体力"
    },
    {
        "id": 448,
        "imageid": 448,
        "unknown1_6": 17,
        "str_name": "ホークアイ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "どこまでも見渡す鷹の目の如く、致命的な攻撃を与える確率が増加し、射程距離が永久的に増加する。",
        "str_progress": "射程距離, 致命打確率"
    },
    {
        "id": 449,
        "imageid": 449,
        "unknown1_6": 17,
        "str_name": "神撃破",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "オーラで攻撃を強化し、強打確率が永久的に増加する。",
        "str_progress": "強打確率"
    },
    {
        "id": 450,
        "imageid": 450,
        "unknown1_6": 18,
        "str_name": "シューティングライト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "単体の敵を対象に殺傷力がある光属性のビームを放つ。",
        "str_progress": "威力"
    },
    {
        "id": 451,
        "imageid": 451,
        "unknown1_6": 18,
        "str_name": "リフレクトライト",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "何かに当たると反射するビームを放つ。",
        "str_progress": "威力、反射回数"
    },
    {
        "id": 452,
        "imageid": 452,
        "unknown1_6": 18,
        "str_name": "スプレッドビーム",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "前方に拡散して触れたすべての敵に、ビームに当たっている間持続的にダメージを与えるビームを放つ。",
        "str_progress": "威力"
    },
    {
        "id": 453,
        "imageid": 453,
        "unknown1_6": 18,
        "str_name": "クリムゾン・アイ",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "RED STONEの影響で変異してしまった右目の力を解放させ、周辺にいるすべての敵に強力な光属性の魔法攻撃を行う",
        "str_progress": "威力, 攻撃対象増加, 範囲"
    },
    {
        "id": 454,
        "imageid": 454,
        "unknown1_6": 18,
        "str_name": "オプティカルホール",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "指定した場所に光エネルギーを集中させ、爆発を引き起こす巨大なホールを設置する。\r\nオプティカルホールを設置すると強烈な光を発してホールが爆発し、周辺のすべての敵に大ダメージを与える",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 455,
        "imageid": 455,
        "unknown1_6": 18,
        "str_name": "速読",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "速読により集中力と魔法抵抗力を瞬間的に高め、一定量のCPを回復する",
        "str_progress": "キャスティング速度, 集中力, 魔法抵抗力増加"
    },
    {
        "id": 456,
        "imageid": 456,
        "unknown1_6": 18,
        "str_name": "メルティングアイズ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "強烈な光を発して周囲にいるすべての敵にダメージを与え、命中率を減少させる。",
        "str_progress": "威力、打撃範囲"
    },
    {
        "id": 457,
        "imageid": 457,
        "unknown1_6": 18,
        "str_name": "バイタリゼーション",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "心身を安定させる光の力で、身体のすべての部分を活性化してCPの最大値を増加させ、物理攻撃に光属性の追加ダメージを与える。",
        "str_progress": "上昇率、持続時間"
    },
    {
        "id": 458,
        "imageid": 458,
        "unknown1_6": 18,
        "str_name": "光のカーテン",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "指定したパーティーメンバーに光の力を分け与え、少しの間敵の物理攻撃をガードする。",
        "str_progress": "持続時間"
    },
    {
        "id": 459,
        "imageid": 459,
        "unknown1_6": 18,
        "str_name": "タイムコントロール",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "指定した対象の時間を止め、少しの間不死状態にする。",
        "str_progress": "クールタイム減少、キャスティング時間"
    },
    {
        "id": 460,
        "imageid": 460,
        "unknown1_6": 18,
        "str_name": "ビットショット",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "光の欠片、ビットを敵に放つ。",
        "str_progress": "威力"
    },
    {
        "id": 461,
        "imageid": 462,
        "unknown1_6": 18,
        "str_name": "光のクリスタル",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ビットを結晶にして、一定範囲内のビットが付着した敵を石化状態にする。",
        "str_progress": "石化持続時間"
    },
    {
        "id": 462,
        "imageid": 461,
        "unknown1_6": 18,
        "str_name": "ダブルエフェクト",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "光を失っているビットを敵に投げつける。既にビットが付着している敵に投げつけると、ヒット数が増加する。",
        "str_progress": "威力、ヒット数増加"
    },
    {
        "id": 463,
        "imageid": 463,
        "unknown1_6": 18,
        "str_name": "デストラクション",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "光の塊、大きなビットを敵に落としてダメージを与える。衝撃で割れた欠片は小さなビットとなって敵の周囲に散乱し、100％敵に付着する。",
        "str_progress": "威力、打撃範囲"
    },
    {
        "id": 464,
        "imageid": 464,
        "unknown1_6": 18,
        "str_name": "蜂の巣",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "ビットが付着した周辺の敵を感知する。敵を感知したビットは強く振動し、周期的にダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 465,
        "imageid": 465,
        "unknown1_6": 18,
        "str_name": "エクスパンション",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "敵に付着したビットを全て爆発させ、強力なダメージを与える。",
        "str_progress": "威力、ヒット数増加"
    },
    {
        "id": 466,
        "imageid": 467,
        "unknown1_6": 18,
        "str_name": "ラジエーション",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "一定範囲内に放射線を放出して敵の弱点をスキャンし、敵の攻撃力、防御力、回避率を減少させる。",
        "str_progress": "範囲増加、攻撃力低下、防御力低下、回避率低下"
    },
    {
        "id": 467,
        "imageid": 466,
        "unknown1_6": 18,
        "str_name": "反発する光",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "低下系にかかった敵に光属性ダメージを追加で与える。",
        "str_progress": "威力"
    },
    {
        "id": 468,
        "imageid": 797,
        "unknown1_6": 18,
        "str_name": "放射光",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "攻撃を受けると、一定確率で周辺に光ダメージを与える。",
        "str_progress": "威力、発動確率、打撃範囲"
    },
    {
        "id": 469,
        "imageid": 469,
        "unknown1_6": 18,
        "str_name": "シャードビジョン",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "ビットを利用してビットが付着した敵を攻撃する時、物理限界ダメージが増加する。効果が発動した後、ビットは消滅する。",
        "str_progress": "威力"
    },
    {
        "id": 470,
        "imageid": 470,
        "unknown1_6": 18,
        "str_name": "オプティカルレンズ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ビットが付着した対象を攻撃する時、命中率が上昇する。",
        "str_progress": "命中率増加"
    },
    {
        "id": 471,
        "imageid": 471,
        "unknown1_6": 18,
        "str_name": "光化学",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "光のコントロール能力を高めて、光属性の最小攻撃力を上昇させる。",
        "str_progress": "ダメージ補正率増加"
    },
    {
        "id": 472,
        "imageid": 472,
        "unknown1_6": 18,
        "str_name": "カウンターオフェンシブ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "光奏師が自分の周りを光で囲んで壁を作り、魔法回避率を上げる。",
        "str_progress": "魔法回避率増加"
    },
    {
        "id": 473,
        "imageid": 473,
        "unknown1_6": 18,
        "str_name": "リベレーションコード",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "光とビットのコントロール能力を高めて、さらに遠くの敵も攻撃可能にする",
        "str_progress": "範囲増加"
    },
    {
        "id": 474,
        "imageid": 474,
        "unknown1_6": 18,
        "str_name": "アウェイクニング",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "右目の力を引き出して、ビットと光属性攻撃の射程距離を増加させる",
        "str_progress": "射程距離増加"
    },
    {
        "id": 475,
        "imageid": 557,
        "unknown1_6": 19,
        "str_name": "クロスアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "両手に持った2本の剣で敵を2回斬る。",
        "str_progress": "威力"
    },
    {
        "id": 476,
        "imageid": 558,
        "unknown1_6": 19,
        "str_name": "アンクルロブ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵の足首を狙って、剣を内側から外側に広げるように振り回す。攻撃を受けた敵は足首を斬られ移動速度が減少する。",
        "str_progress": "威力"
    },
    {
        "id": 477,
        "imageid": 559,
        "unknown1_6": 19,
        "str_name": "アンビートンツインアタック",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "その場で回転する無敗の双剣術で敵を攻撃する。",
        "str_progress": "威力"
    },
    {
        "id": 478,
        "imageid": 560,
        "unknown1_6": 19,
        "str_name": "ファイナライジングファウンド",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "最初の打撃が成功すると幻影分身と共に確定された連打攻撃を与える。",
        "str_progress": "威力、分身個数"
    },
    {
        "id": 479,
        "imageid": 561,
        "unknown1_6": 19,
        "str_name": "パニッシュメントクロス",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "魔力で生成した幻影分身と共に四方から敵を攻撃する。",
        "str_progress": "威力、分身個数"
    },
    {
        "id": 480,
        "imageid": 562,
        "unknown1_6": 19,
        "str_name": "イリュージョンシュート",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "魔力で生成した幻影剣を前方に打ち出して敵を攻撃する。",
        "str_progress": "威力"
    },
    {
        "id": 481,
        "imageid": 563,
        "unknown1_6": 19,
        "str_name": "イリュージョンハープン",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "攻撃した敵を自分の目の前まで引き寄せる幻影の銛を飛ばす。",
        "str_progress": "威力"
    },
    {
        "id": 482,
        "imageid": 564,
        "unknown1_6": 19,
        "str_name": "ブレードバッシング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "強力なイリュージョンシュートを生成し、敵に連発攻撃をする。",
        "str_progress": "威力"
    },
    {
        "id": 483,
        "imageid": 565,
        "unknown1_6": 19,
        "str_name": "マルチブーメランシュート",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "扇状に多数の幻影剣を飛ばす。飛んで行った幻影剣はブーメランのように戻りながら追加ダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 484,
        "imageid": 566,
        "unknown1_6": 19,
        "str_name": "ファントムストーム",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "大気を切り裂くほどの速い速度で剣を数回振り回す。これによって発生した強大な力は嵐を巻き起こし周りの敵にダメージを与える。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 485,
        "imageid": 567,
        "unknown1_6": 19,
        "str_name": "シャドーオーバーステップ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵の影を踏んで瞬間的に距離を縮めた後、致命打を与える。",
        "str_progress": "威力"
    },
    {
        "id": 486,
        "imageid": 568,
        "unknown1_6": 19,
        "str_name": "ビジョンドッペルゲンガー",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "魔力で生成した幻影分身を召喚する。この召喚分身は周りの敵にダメージを与える。分身が消える前に再びスキルを使うと分身がいた位置に瞬時に移動できる。",
        "str_progress": "威力"
    },
    {
        "id": 487,
        "imageid": 569,
        "unknown1_6": 19,
        "str_name": "ファンタズムイベーション",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "危険な状況に陥ると素早く回避して、幻影分身を残す。この分身は敵の注意を引きつけて攻撃されると即時爆発する。",
        "str_progress": "威力、発動確率"
    },
    {
        "id": 488,
        "imageid": 570,
        "unknown1_6": 19,
        "str_name": "シャドウカーテン",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "危険な状況に陥ると影の中に隠れて敵の攻撃を無効化させる。",
        "str_progress": "発動確率"
    },
    {
        "id": 489,
        "imageid": 571,
        "unknown1_6": 19,
        "str_name": "ハルシネイションスモーク",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵を幻覚に陥れる魔力の煙幕をはる。この煙幕を吸い込んだ敵は幻覚に陥り、攻撃を受ける時にクリティカル攻撃を受ける確率があがる。",
        "str_progress": "威力、範囲、確率"
    },
    {
        "id": 490,
        "imageid": 572,
        "unknown1_6": 19,
        "str_name": "スウィフトタンブリング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "素早く体を転がしながら移動する。",
        "str_progress": "威力"
    },
    {
        "id": 491,
        "imageid": 573,
        "unknown1_6": 19,
        "str_name": "エアリアルバースト",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ジャンプしながら体を回転して周りの敵を吹き飛ばす。",
        "str_progress": "威力、ノックバック確率"
    },
    {
        "id": 492,
        "imageid": 574,
        "unknown1_6": 19,
        "str_name": "ショックリバレイション",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "手の中で念力を爆発させて強く押し出しながら衝撃を解放する。衝撃波に当たった敵は衝撃で感電する。",
        "str_progress": "威力"
    },
    {
        "id": 493,
        "imageid": 575,
        "unknown1_6": 19,
        "str_name": "トーマントカウンター",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "敵の攻撃に向かって反射的に防御態勢を取る。敵の攻撃を防ぐと同時に幻影剣を何発も発射して敵に反撃する。",
        "str_progress": "発動確率、連射回数"
    },
    {
        "id": 494,
        "imageid": 576,
        "unknown1_6": 19,
        "str_name": "ユニコーンズロア",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "自分を攻撃する敵に大きな雄叫びをあげる。ユニコーンの強力な魔力が放出され敵は畏縮する。",
        "str_progress": "威力、範囲、持続時間"
    },
    {
        "id": 495,
        "imageid": 577,
        "unknown1_6": 19,
        "str_name": "ウィニンググルーブ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵を倒すたびに勝利に陶酔して攻撃リズムがあがる。徐々に攻撃速度が上昇し、幻影剣が自動で生成される。",
        "str_progress": "持続時間"
    },
    {
        "id": 496,
        "imageid": 578,
        "unknown1_6": 19,
        "str_name": "スパイラルホーン",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "鋭いユニコーンの角で敵の隙を狙い、追加でダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 497,
        "imageid": 579,
        "unknown1_6": 19,
        "str_name": "ミラージュウォール",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "幻影剣を体の周りに纏って、敵の攻撃を防御する。",
        "str_progress": "ブロック率、持続時間"
    },
    {
        "id": 498,
        "imageid": 819,
        "unknown1_6": 19,
        "str_name": "グリーミングアウラ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "光をコントロールして光の最小攻撃力を上昇させる。",
        "str_progress": "ダメージ補正率増加"
    },
    {
        "id": 499,
        "imageid": 581,
        "unknown1_6": 19,
        "str_name": "ブレードグライディング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "剣の刃を鋭く鍛えて心の安定を取戻し、CPを充電する。",
        "str_progress": "キャスティング速度"
    },
    {
        "id": 500,
        "imageid": 500,
        "unknown1_6": 32,
        "str_name": "ソードアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "モンスターが剣で繰り出す平凡な攻撃。\r\n剣を所持しているモンスターが使用する。",
        "str_progress": ""
    },
    {
        "id": 501,
        "imageid": 501,
        "unknown1_6": 32,
        "str_name": "クラブアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "モンスターが棍棒等で繰り出す平凡な打撃系の攻撃。\r\n棍棒を所持しているモンスターが使用する。",
        "str_progress": ""
    },
    {
        "id": 502,
        "imageid": 502,
        "unknown1_6": 32,
        "str_name": "ピストアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "モンスターが素手で繰り出す平凡な近距離攻撃。\r\n武器を所持していないモンスターが使用する。",
        "str_progress": ""
    },
    {
        "id": 503,
        "imageid": 503,
        "unknown1_6": 32,
        "str_name": "ピンシャーアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "モンスターが鋏で繰り出す平凡な近距離攻撃。\r\nカニ、サソリ等、鋏を持っているモンスターが使用する。",
        "str_progress": ""
    },
    {
        "id": 504,
        "imageid": 504,
        "unknown1_6": 32,
        "str_name": "ボウアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "モンスターが弓矢で繰り出す平凡な遠距離攻撃。\r\n弓矢を所持しているモンスターが使用する。",
        "str_progress": ""
    },
    {
        "id": 505,
        "imageid": 505,
        "unknown1_6": 32,
        "str_name": "ヒーリング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "味方の体力を回復する。",
        "str_progress": ""
    },
    {
        "id": 506,
        "imageid": 506,
        "unknown1_6": 32,
        "str_name": "モンスターチャージング１",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "モンスターが大きな技術を使うために行う基本的な予備動作。",
        "str_progress": ""
    },
    {
        "id": 507,
        "imageid": 507,
        "unknown1_6": 32,
        "str_name": "モンスターチャージング２",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "モンスターが大きな技術を使うために行う基本的な予備動作。",
        "str_progress": ""
    },
    {
        "id": 508,
        "imageid": 508,
        "unknown1_6": 32,
        "str_name": "モンスターチャージング３",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "モンスターが大きな技術を使うために行う基本的な予備動作。",
        "str_progress": ""
    },
    {
        "id": 509,
        "imageid": 509,
        "unknown1_6": 32,
        "str_name": "エクスアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "モンスターが斧で繰り出す平凡な攻撃。\r\n斧を所持しているモンスターが使用する。",
        "str_progress": ""
    },
    {
        "id": 510,
        "imageid": 510,
        "unknown1_6": 32,
        "str_name": "モンスターチャージ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "モンスターが遠く離れている敵に繰り出す突進攻撃。\r\n射程は遠距離攻撃より短いが、近距離攻撃よりは長い。",
        "str_progress": ""
    },
    {
        "id": 511,
        "imageid": 511,
        "unknown1_6": 32,
        "str_name": "ブラッドベルセルク",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "モンスターが自分の体力を犠牲にして攻撃力を上昇させる技術。\r\n体力は少し低下するが、高い攻撃力を得る。",
        "str_progress": ""
    },
    {
        "id": 512,
        "imageid": 512,
        "unknown1_6": 32,
        "str_name": "インスタントキリング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "相手の急所を的確に狙って即死をもたらす精密な打撃を放つ。\r\n攻撃力は低いが、もし急所に攻撃が当たると一撃で倒す事が出来る。",
        "str_progress": ""
    },
    {
        "id": 513,
        "imageid": 513,
        "unknown1_6": 32,
        "str_name": "ピアスインパクト",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "炎のように過激な攻撃を繰り出す。\r\n実際に火花が散るほどの強力な攻撃を行う。",
        "str_progress": ""
    },
    {
        "id": 514,
        "imageid": 514,
        "unknown1_6": 32,
        "str_name": "ブラッドエキスパンド",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "攻撃力を犠牲して自分の体力を回復する技術。\r\n防御系モンスターがよく使用する技術である。",
        "str_progress": ""
    },
    {
        "id": 515,
        "imageid": 515,
        "unknown1_6": 32,
        "str_name": "ポイズナスクロー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "毒が仕込まれている爪で攻撃する技術。",
        "str_progress": ""
    },
    {
        "id": 516,
        "imageid": 516,
        "unknown1_6": 32,
        "str_name": "スリーピーホール",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "呪いの呪文で敵を寝かしつける。\r\nこの攻撃を受けると急に眠気が襲い掛かり、眠ってしまう。\r\nしかし、寝ている間に他の攻撃を与えると目を覚ます。",
        "str_progress": ""
    },
    {
        "id": 517,
        "imageid": 517,
        "unknown1_6": 32,
        "str_name": "スクリームフィアー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "恐ろしい悲鳴で敵に精神的、肉体的な衝撃を与える。\r\nこの攻撃を受けた相手はしばらく麻痺することになる。",
        "str_progress": ""
    },
    {
        "id": 518,
        "imageid": 518,
        "unknown1_6": 32,
        "str_name": "フリーリジェネレーション",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "特別な動作を必要とせず、自動で体力が少しずつ回復する。",
        "str_progress": ""
    },
    {
        "id": 519,
        "imageid": 519,
        "unknown1_6": 32,
        "str_name": "スタンアタック",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "強くぶん殴って敵をしばらく気絶させるスキル。気絶が主な目的だからその分破壊力は低い。",
        "str_progress": ""
    },
    {
        "id": 520,
        "imageid": 520,
        "unknown1_6": 32,
        "str_name": "ブラインドアタック(M)",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵の目を狙って攻撃を行い、敵の視力を奪う攻撃。\r\n精密な攻撃であるため、攻撃力は若干低下する。",
        "str_progress": ""
    },
    {
        "id": 521,
        "imageid": 521,
        "unknown1_6": 32,
        "str_name": "ディメンジョンアーマー",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "敵の攻撃を次元の彼方へ転移して、一定のダメージ以上は無効にすることができる究極の技術。",
        "str_progress": ""
    },
    {
        "id": 522,
        "imageid": 522,
        "unknown1_6": 32,
        "str_name": "フォースドレイン",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵のレベルを数段階弱らせて、戦闘力を低下させる攻撃を放つ。",
        "str_progress": ""
    },
    {
        "id": 523,
        "imageid": 523,
        "unknown1_6": 32,
        "str_name": "ライフドレイン",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵の体力を吸収して自分の体力にする攻撃を放つ。\r\nこの技術が熟練すると敵の体力を自分のCPに転換することも可能になる。",
        "str_progress": ""
    },
    {
        "id": 524,
        "imageid": 524,
        "unknown1_6": 32,
        "str_name": "狼召喚",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "自分の近辺に一般3の狼一匹を召喚する。",
        "str_progress": "狼"
    },
    {
        "id": 525,
        "imageid": 525,
        "unknown1_6": 32,
        "str_name": "コウモリの群れ召喚",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "自分の近辺に一般3のコウモリの群れを召喚する。",
        "str_progress": "コウモリの群れ"
    },
    {
        "id": 526,
        "imageid": 526,
        "unknown1_6": 32,
        "str_name": "死の予告状",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "死の力を宿し、範囲内に入ってきた敵に死を告げる。\r\n制限時間内に抜け出せなかった敵はその場で死亡する。",
        "str_progress": ""
    },
    {
        "id": 527,
        "imageid": 527,
        "unknown1_6": 32,
        "str_name": "デスタッチ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵に死の力を宿した手を伸ばす。\r\n致命打になる確率が上昇する。",
        "str_progress": ""
    },
    {
        "id": 528,
        "imageid": 63,
        "unknown1_6": 32,
        "str_name": "ライトニングサンダー(M)",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "雷と稲妻で敵に物理、精神の両方でダメージを与える。ダメージと一定時間の速度低下を与え、感電状態を引き起こす",
        "str_progress": "威力"
    },
    {
        "id": 529,
        "imageid": 529,
        "unknown1_6": 32,
        "str_name": "ダミーテレポート",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵に攻撃を受けた瞬間にダミーを生成し、直後に若干離れたところへテレポートする。",
        "str_progress": ""
    },
    {
        "id": 530,
        "imageid": 530,
        "unknown1_6": 32,
        "str_name": "スタートリングライナー(M)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 531,
        "imageid": 531,
        "unknown1_6": 32,
        "str_name": "ピアシングアロー(M)",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 532,
        "imageid": 532,
        "unknown1_6": 32,
        "str_name": "スナイプ(M)",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 533,
        "imageid": 533,
        "unknown1_6": 32,
        "str_name": "スカルペネトレータ(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 534,
        "imageid": 534,
        "unknown1_6": 32,
        "str_name": "影隠れ(M)",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "影の中に自分の身を隠す。攻撃をしたら解ける。上逹すると心に余裕できシーフのスキルをもう少し効率的に使うことができるようになる",
        "str_progress": "持続時間"
    },
    {
        "id": 535,
        "imageid": 535,
        "unknown1_6": 32,
        "str_name": "暗殺(M)",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 536,
        "imageid": 536,
        "unknown1_6": 32,
        "str_name": "スティール(M)",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "相手の財布を素早く盗み取りゴールドを盗む。ただし、一回で大金を盗むことはできない",
        "str_progress": ""
    },
    {
        "id": 537,
        "imageid": 537,
        "unknown1_6": 32,
        "str_name": "ダガーアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "短剣を使用した鋭い攻撃を放つ。\r\n時々急所に当たり、致命打になる場合もある。",
        "str_progress": ""
    },
    {
        "id": 538,
        "imageid": 538,
        "unknown1_6": 32,
        "str_name": "バイパーダガー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "毒を塗りつけた短剣で攻撃する",
        "str_progress": ""
    },
    {
        "id": 539,
        "imageid": 539,
        "unknown1_6": 32,
        "str_name": "カウンタースティング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "相手の攻撃方向を巧みに誘導して、相手を短剣で攻撃する高難度反撃スキル",
        "str_progress": ""
    },
    {
        "id": 540,
        "imageid": 540,
        "unknown1_6": 32,
        "str_name": "共鳴",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "周辺に自分と同じ形態のモンスターがいると攻撃力が上昇する。",
        "str_progress": ""
    },
    {
        "id": 541,
        "imageid": 541,
        "unknown1_6": 32,
        "str_name": "ディスチャージアタック",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "物理攻撃と共に相手のCPを減らしてしまう攻撃スキル",
        "str_progress": ""
    },
    {
        "id": 542,
        "imageid": 542,
        "unknown1_6": 32,
        "str_name": "ヘルカーニバル",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "相手を食いちぎって、自分の体力を回復する",
        "str_progress": ""
    },
    {
        "id": 543,
        "imageid": 543,
        "unknown1_6": 32,
        "str_name": "ポイズンガス(M)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "一定の地域に毒ガスの雲を形成し、その中の敵は毒に侵される",
        "str_progress": ""
    },
    {
        "id": 544,
        "imageid": 544,
        "unknown1_6": 32,
        "str_name": "リアニメイトソーサリー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "死んだ下位級の信奉者、原人、原始人などの人型モンスターを蘇生する",
        "str_progress": ""
    },
    {
        "id": 545,
        "imageid": 545,
        "unknown1_6": 32,
        "str_name": "ファイアーボルト(M)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 546,
        "imageid": 546,
        "unknown1_6": 32,
        "str_name": "ファイアボール(M)",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "自分の頭上に高威力のファイアーボールを複数生み出し、それを一斉に飛ばし、爆発させる。",
        "str_progress": ""
    },
    {
        "id": 547,
        "imageid": 547,
        "unknown1_6": 32,
        "str_name": "ファイアースキン",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "自分の周囲に火炎を召喚する。近接した敵に持続的にダメージを与える",
        "str_progress": ""
    },
    {
        "id": 548,
        "imageid": 548,
        "unknown1_6": 32,
        "str_name": "フレイムストーム(M)",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 549,
        "imageid": 549,
        "unknown1_6": 32,
        "str_name": "メテオシャワー(M)",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 550,
        "imageid": 550,
        "unknown1_6": 32,
        "str_name": "メルティングウェポン",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "相手の武器にぶよぶよしている物を付けて武器の威力を弱化させてしまう",
        "str_progress": ""
    },
    {
        "id": 551,
        "imageid": 551,
        "unknown1_6": 32,
        "str_name": "ハルバードアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "巨大な斧矛の刃で敵を攻撃する。",
        "str_progress": ""
    },
    {
        "id": 552,
        "imageid": 552,
        "unknown1_6": 32,
        "str_name": "ハルバードストライク",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "斧槍を振り下ろすと同時に、武器の風圧で周囲の敵にも攻撃を加える",
        "str_progress": ""
    },
    {
        "id": 553,
        "imageid": 553,
        "unknown1_6": 32,
        "str_name": "スマッシュベロシティー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵に攻撃が命中する度に攻撃速度と移動速度が上昇する",
        "str_progress": ""
    },
    {
        "id": 554,
        "imageid": 554,
        "unknown1_6": 32,
        "str_name": "ソーンアーマー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "魔法の力で鎧に強力な針を生み出す。\r\n近接して攻撃する敵にはこの針で反撃する",
        "str_progress": ""
    },
    {
        "id": 555,
        "imageid": 555,
        "unknown1_6": 32,
        "str_name": "ディテクティング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ブラー、インビジブル効果とトラップを探知する。\r\nセミボス級以上のモンスターは基本的に持っている能力。",
        "str_progress": ""
    },
    {
        "id": 556,
        "imageid": 556,
        "unknown1_6": 32,
        "str_name": "バインディングモルプ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "棒で攻撃すると共に変身したキャラクター、すなわちウルフマン、追放天使、リトルウィッチ、悪魔の移動速度、攻撃速度を著しく低下させる",
        "str_progress": ""
    },
    {
        "id": 557,
        "imageid": 557,
        "unknown1_6": 32,
        "str_name": "レンジヒール",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "広範囲領域にいるモンスターの傷を回復する",
        "str_progress": ""
    },
    {
        "id": 558,
        "imageid": 558,
        "unknown1_6": 32,
        "str_name": "ダークブレス",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "闇の神による祝福。周囲にいる味方の体力が少しずつ増加する",
        "str_progress": ""
    },
    {
        "id": 559,
        "imageid": 559,
        "unknown1_6": 32,
        "str_name": "ウィップアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "鞭を使って相手を攻撃する。熟達すれば相手をしばらく麻痺させることができる",
        "str_progress": ""
    },
    {
        "id": 560,
        "imageid": 560,
        "unknown1_6": 32,
        "str_name": "コボルト召喚",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "自分の近くに一般１のコボルト一匹を召喚する",
        "str_progress": ""
    },
    {
        "id": 561,
        "imageid": 561,
        "unknown1_6": 32,
        "str_name": "ピエンド召喚",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "自分の近くに一般１のピエンド一匹を召喚する",
        "str_progress": ""
    },
    {
        "id": 562,
        "imageid": 562,
        "unknown1_6": 32,
        "str_name": "レイズスケルトン",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "死んだ仲間の死骸の骨だけを利用して骸骨戦士を生み出す。\r\n生み出される骸骨戦士はランダムで両剣が斧の一つを持って現われる",
        "str_progress": ""
    },
    {
        "id": 563,
        "imageid": 563,
        "unknown1_6": 32,
        "str_name": "アニメイトパートナー(M)",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "行動不能になったパーティーメンバーの一人をアンデッドの属性でしばらく蘇生させる。能力値低下ペナルティーがなく、制限時間中は体力が無くなっても行動不能状態にならない。制限時間になると、また行動不能状態になる",
        "str_progress": ""
    },
    {
        "id": 564,
        "imageid": 564,
        "unknown1_6": 32,
        "str_name": "死の予言(M)",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "敵に死の呪いをかけて、敵の体力を現在の体力から決まった割合の体力に、応急処置的に変えてしまう",
        "str_progress": ""
    },
    {
        "id": 565,
        "imageid": 565,
        "unknown1_6": 32,
        "str_name": "キックアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "巨大な足で敵を踏みつける。",
        "str_progress": ""
    },
    {
        "id": 566,
        "imageid": 566,
        "unknown1_6": 32,
        "str_name": "マウルリングアタック",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "両腕で敵を殴り飛ばして攻撃する",
        "str_progress": ""
    },
    {
        "id": 567,
        "imageid": 567,
        "unknown1_6": 32,
        "str_name": "つかんで投げつける",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵を掴んで地面に叩きつけてしまう。体力に比例して攻撃力が増加する",
        "str_progress": ""
    },
    {
        "id": 568,
        "imageid": 222,
        "unknown1_6": 32,
        "str_name": "ブリザード",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "極寒の吹雪を召喚し、敵を攻撃する。",
        "str_progress": "威力、打撃範囲"
    },
    {
        "id": 569,
        "imageid": 1275,
        "unknown1_6": 32,
        "str_name": "ソニックブロー(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "剣を素早く振り下ろし、真空波で広い範囲の敵を攻撃する",
        "str_progress": "威力, 範囲, 命中率"
    },
    {
        "id": 570,
        "imageid": 570,
        "unknown1_6": 32,
        "str_name": "ハンドレッドソード",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "百の剣の残像を生み出すほどの究極の剣術。\r\n相手の回避と盾ブロックなど、殆どすべての回避スキルもこの攻撃の前では無力となる",
        "str_progress": ""
    },
    {
        "id": 571,
        "imageid": 571,
        "unknown1_6": 32,
        "str_name": "アイスボルト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵に氷の結晶を飛ばして攻撃する。",
        "str_progress": "威力"
    },
    {
        "id": 572,
        "imageid": 572,
        "unknown1_6": 32,
        "str_name": "レッドアイピア",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "レッドアイ魔法師なら誰でも知っている簡単で力強い魔術。\r\n周りの敵に恐怖感を与えて戦闘能力を喪失させる",
        "str_progress": ""
    },
    {
        "id": 573,
        "imageid": 573,
        "unknown1_6": 32,
        "str_name": "フロストクェイク",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "周りに冷気の震動を発散して、敵を冷たく氷らせてしまう",
        "str_progress": ""
    },
    {
        "id": 574,
        "imageid": 574,
        "unknown1_6": 32,
        "str_name": "スネークアイ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "魔力の宿った眼力で、敵を毒に侵させる技術。",
        "str_progress": ""
    },
    {
        "id": 575,
        "imageid": 575,
        "unknown1_6": 32,
        "str_name": "ストンゲイズ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "目から光を出して相手を石化させてしまうスキル",
        "str_progress": ""
    },
    {
        "id": 576,
        "imageid": 576,
        "unknown1_6": 32,
        "str_name": "アイオブザビホルダー",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "凄まじい目で相手を睨めつけ、各種状態異常を起こす邪悪な能力",
        "str_progress": ""
    },
    {
        "id": 577,
        "imageid": 577,
        "unknown1_6": 32,
        "str_name": "スピアーアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "モンスターが槍を使用して行う、平凡な攻撃。",
        "str_progress": ""
    },
    {
        "id": 578,
        "imageid": 578,
        "unknown1_6": 32,
        "str_name": "シールドピアシング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "盾を潜り抜ける槍の鋭い攻撃。\r\n相手の盾ブロックを無効化することができる",
        "str_progress": ""
    },
    {
        "id": 579,
        "imageid": 579,
        "unknown1_6": 32,
        "str_name": "スピアーチャージング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "モンスターが槍を使用して行う、多少強力な一撃。",
        "str_progress": ""
    },
    {
        "id": 580,
        "imageid": 580,
        "unknown1_6": 32,
        "str_name": "ソードクラッシュ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "力強い一撃を放つ。あっという間に体力を減らしてしまう恐ろしいスキル",
        "str_progress": ""
    },
    {
        "id": 581,
        "imageid": 581,
        "unknown1_6": 32,
        "str_name": "ランスチャージング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "巨大な槍を所持しているモンスターが行う、強力な槍の攻撃。",
        "str_progress": ""
    },
    {
        "id": 582,
        "imageid": 582,
        "unknown1_6": 32,
        "str_name": "テイルアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "尻尾を振り回して攻撃する。\r\n足にかかるとしばらく麻痺する。",
        "str_progress": ""
    },
    {
        "id": 583,
        "imageid": 583,
        "unknown1_6": 32,
        "str_name": "テールバッシュ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "しっぽで敵を押しのけて攻撃する",
        "str_progress": ""
    },
    {
        "id": 584,
        "imageid": 584,
        "unknown1_6": 32,
        "str_name": "インビジビリティ",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "一定量の力を集めれば自動で相手の視野から消える究極の姿を隠すスキル",
        "str_progress": ""
    },
    {
        "id": 585,
        "imageid": 585,
        "unknown1_6": 32,
        "str_name": "エヴィルゾーン",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "周辺にいる全ての味方の思考を、悪あるいは絶対悪にする。",
        "str_progress": ""
    },
    {
        "id": 586,
        "imageid": 586,
        "unknown1_6": 32,
        "str_name": "デビルスピード",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "周りの味方に悪魔の精神を吹き入れて行動力を上昇する",
        "str_progress": ""
    },
    {
        "id": 587,
        "imageid": 49,
        "unknown1_6": 32,
        "str_name": "ブラッドレイジ(M)",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵の攻撃を受けると怒り状態になって、攻撃力と速度が上昇する。",
        "str_progress": "上昇率, 持続時間"
    },
    {
        "id": 588,
        "imageid": 588,
        "unknown1_6": 32,
        "str_name": "ブラッドコンポーザー",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "相手の攻撃を受ければ受けるほど、冷情さを取り戻して集中力と防御力が上昇する",
        "str_progress": ""
    },
    {
        "id": 589,
        "imageid": 589,
        "unknown1_6": 32,
        "str_name": "ワインディングサイズ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "巨大な鎌を所持している敵の恐怖の一撃。\r\n目標だけではなく、周囲に居る者にも鎌が発生する鋭い風でダメージを与える。",
        "str_progress": ""
    },
    {
        "id": 590,
        "imageid": 590,
        "unknown1_6": 32,
        "str_name": "ミラーカーズ(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵が攻撃を試みる度に、攻撃者もダメージを受ける呪いをかける",
        "str_progress": ""
    },
    {
        "id": 591,
        "imageid": 591,
        "unknown1_6": 32,
        "str_name": "嫌み(M)",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "毒づいて敵の物理攻撃命中率及び物理攻撃回避率を低下させる",
        "str_progress": ""
    },
    {
        "id": 592,
        "imageid": 592,
        "unknown1_6": 32,
        "str_name": "悪口(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "悪口で敵の集中力を落として、6つの元素抵抗力を弱化させる。魔法攻撃の威力を高めることができる",
        "str_progress": ""
    },
    {
        "id": 593,
        "imageid": 593,
        "unknown1_6": 32,
        "str_name": "悪態(M)",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "周辺の敵に毒づいて、敵の攻撃力と防御力を低下させる",
        "str_progress": ""
    },
    {
        "id": 594,
        "imageid": 594,
        "unknown1_6": 32,
        "str_name": "スペクトラルフィスト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "自分の拳に各種の元素の精霊を呼び出し、強固なものとして敵を攻撃する。敵に全属性の元素攻撃を与える。",
        "str_progress": ""
    },
    {
        "id": 595,
        "imageid": 43,
        "unknown1_6": 32,
        "str_name": "ワイルドスタンプ(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "ジャンプの後、着地点で剣を振り回し、その周囲の敵にダメージを与える。着地点の敵は押し出される",
        "str_progress": "威力"
    },
    {
        "id": 596,
        "imageid": 596,
        "unknown1_6": 32,
        "str_name": "アンテイム",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵の召喚獣やテイミングモンスターをその場で開放する。場合によっては味方にする事もできて、元主人を攻撃することもある",
        "str_progress": ""
    },
    {
        "id": 597,
        "imageid": 597,
        "unknown1_6": 32,
        "str_name": "RED STONEの情熱",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "RED STONEに向けた情熱。周り味方の攻撃力、防御力、速度、HP、CP最大値がしばらくの間飛躍的に向上し、使用中は周囲の敵に莫大なダメージを与える",
        "str_progress": ""
    },
    {
        "id": 598,
        "imageid": 598,
        "unknown1_6": 32,
        "str_name": "フロストバイト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "冷たい息を含みながら敵に噛み付き、冷気で敵を凍えさせる。",
        "str_progress": ""
    },
    {
        "id": 599,
        "imageid": 599,
        "unknown1_6": 32,
        "str_name": "オイリーアーマー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "自分の体に特殊な油を塗り、敵の攻撃が失敗するようにする",
        "str_progress": ""
    },
    {
        "id": 600,
        "imageid": 83,
        "unknown1_6": 32,
        "str_name": "バイトハンギング(M)",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵を噛み続け、敵の体力を徐々に減少させる",
        "str_progress": "威力, 攻撃速度"
    },
    {
        "id": 601,
        "imageid": 601,
        "unknown1_6": 32,
        "str_name": "スパイダースティング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵を麻痺させるクモの毒針を放つ。特殊な毒性も含まれているので致命打となる場合もある",
        "str_progress": ""
    },
    {
        "id": 602,
        "imageid": 602,
        "unknown1_6": 32,
        "str_name": "スパイダーウェブ(M)",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "自分が攻撃されると、周囲の一定地域に敵の移動を抑止する蜘蛛の糸を撒き散らす",
        "str_progress": ""
    },
    {
        "id": 603,
        "imageid": 603,
        "unknown1_6": 32,
        "str_name": "アラクノフォビア(M)",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "自分が攻撃されると、周囲の一定地域に敵の移動を抑止する蜘蛛の糸を撒き散らす。抜け出せない敵は糸の中で蜘蛛の攻撃を受ける",
        "str_progress": ""
    },
    {
        "id": 604,
        "imageid": 604,
        "unknown1_6": 32,
        "str_name": "ポイズンテイル",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "毒性のあるサソリの針で突き刺す。\r\n毒だけではなく、強力な揮発性の毒液に引火した炎まで加わっている強力な攻撃である。",
        "str_progress": ""
    },
    {
        "id": 605,
        "imageid": 605,
        "unknown1_6": 32,
        "str_name": "アシッドベノム",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "鉄と皮を腐食させる強酸成分が含まれた毒液を振り撤いて相手の鎧を無力化させる",
        "str_progress": ""
    },
    {
        "id": 606,
        "imageid": 606,
        "unknown1_6": 32,
        "str_name": "ブライトフラッシュ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "非常に眩しい光を発散し、自分の周囲にいる敵の視野を一時的に奪う。命中率と回避率を低下させる",
        "str_progress": ""
    },
    {
        "id": 607,
        "imageid": 607,
        "unknown1_6": 32,
        "str_name": "インクスプレー",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵に墨汁を吹き出して攻撃する。敵は闇の呪いにかかる",
        "str_progress": ""
    },
    {
        "id": 608,
        "imageid": 608,
        "unknown1_6": 32,
        "str_name": "体当たり",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "体重を乗せた全身で相手にぶつかる攻撃を放つ。この攻撃を受けると攻撃者の重さに押し出される事もある。",
        "str_progress": ""
    },
    {
        "id": 609,
        "imageid": 609,
        "unknown1_6": 32,
        "str_name": "バブルバリアー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "攻撃を受けると、身体から泡を発生させて敵の物理的、魔法的攻撃を遮断してしまう",
        "str_progress": ""
    },
    {
        "id": 610,
        "imageid": 610,
        "unknown1_6": 32,
        "str_name": "キャンサーホール",
        "unknown2_0": 8,
        "unknown10_139": 0,
        "str_description": "敵を飲み込んでしまうキャンサーのスキル。\r\n飲み込まれた敵は一定のダメージを受けるか、周りの誰かがキャンサーを攻撃しなければ、抜け出すのが困難",
        "str_progress": ""
    },
    {
        "id": 611,
        "imageid": 611,
        "unknown1_6": 32,
        "str_name": "セルフレプリカ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "攻撃を受けると、身体を増殖して分離してしまう",
        "str_progress": ""
    },
    {
        "id": 612,
        "imageid": 612,
        "unknown1_6": 32,
        "str_name": "スウォムラッシュ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "昆虫たちが自分の威勢を利用して攻撃するスキルで、群集が薄くなればなるほど、破壊力が低くなって群集は解体されて消える。",
        "str_progress": ""
    },
    {
        "id": 613,
        "imageid": 613,
        "unknown1_6": 32,
        "str_name": "インフェルノバイト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "高熱を帯びた牙で敵を噛みつける。",
        "str_progress": ""
    },
    {
        "id": 614,
        "imageid": 614,
        "unknown1_6": 32,
        "str_name": "フレームリング(M)",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "自分の周囲に火炎の壁を形成する",
        "str_progress": ""
    },
    {
        "id": 615,
        "imageid": 615,
        "unknown1_6": 32,
        "str_name": "インシナレイト(M)",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "自分の身体を激しい高熱の火炎で包み、近付くすべての敵にダメージを与える",
        "str_progress": ""
    },
    {
        "id": 616,
        "imageid": 616,
        "unknown1_6": 32,
        "str_name": "ロックバウンディング(M)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 617,
        "imageid": 617,
        "unknown1_6": 32,
        "str_name": "地獄の矛(M)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "自分が攻撃されると、地獄の監獄にある鉄の矛を召喚し、敵を突いて攻撃する",
        "str_progress": ""
    },
    {
        "id": 618,
        "imageid": 618,
        "unknown1_6": 32,
        "str_name": "ヘルプリズン(M)",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "自分を攻撃した敵を地の底より召喚した、地獄の監獄の中に閉じこめてしまう。敵は監獄を壊すまで動くことができない",
        "str_progress": ""
    },
    {
        "id": 619,
        "imageid": 619,
        "unknown1_6": 32,
        "str_name": "ワームバイト(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "地の中で虫を召喚し、自分を攻撃した敵を噛ませる。噛まれた敵はダメージを受け、噛まれている間は動くことができない",
        "str_progress": ""
    },
    {
        "id": 620,
        "imageid": 620,
        "unknown1_6": 32,
        "str_name": "アルティメットバリア",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "周辺の地形に反重力場を設置して、周辺の敵を一定距離以内に近付けないようにする",
        "str_progress": ""
    },
    {
        "id": 621,
        "imageid": 621,
        "unknown1_6": 32,
        "str_name": "ウォークライ(M)",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 622,
        "imageid": 622,
        "unknown1_6": 32,
        "str_name": "インフェルノブレス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "前方の敵に火の息を吐き出して攻撃する。",
        "str_progress": ""
    },
    {
        "id": 623,
        "imageid": 623,
        "unknown1_6": 32,
        "str_name": "グルルムゲスプ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "前方の敵に闇の火炎を噴き出して攻撃する",
        "str_progress": ""
    },
    {
        "id": 624,
        "imageid": 624,
        "unknown1_6": 32,
        "str_name": "フローズンダガー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "氷の短剣を敵に投げる。",
        "str_progress": ""
    },
    {
        "id": 625,
        "imageid": 625,
        "unknown1_6": 32,
        "str_name": "クリスタルフラッシュ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "明るく輝く氷結晶を上方に放出した後、自分の四方に冷気を散らして攻撃する",
        "str_progress": ""
    },
    {
        "id": 626,
        "imageid": 626,
        "unknown1_6": 32,
        "str_name": "ウィンディクラップ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "風の魔力が宿った手のひらで敵を攻撃する。周囲の敵にもダメージを与える。",
        "str_progress": ""
    },
    {
        "id": 627,
        "imageid": 627,
        "unknown1_6": 32,
        "str_name": "アースブレード",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "地の魔力を宿した強力な剣で敵を攻撃する。",
        "str_progress": ""
    },
    {
        "id": 628,
        "imageid": 628,
        "unknown1_6": 32,
        "str_name": "アイアンブレード",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "鋼鉄に魔力を付与したゴーレム専用剣で敵を攻撃する。",
        "str_progress": ""
    },
    {
        "id": 629,
        "imageid": 629,
        "unknown1_6": 32,
        "str_name": "ダイアモンドブレード",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "世の中で最も硬度があるダイアモンドの剣で敵を攻撃する。",
        "str_progress": ""
    },
    {
        "id": 630,
        "imageid": 630,
        "unknown1_6": 32,
        "str_name": "ダークウェポン",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "味方の武器に暗黒の力を吹き込んで威力を増加する",
        "str_progress": ""
    },
    {
        "id": 631,
        "imageid": 631,
        "unknown1_6": 32,
        "str_name": "ディップソング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "周囲の味方をトゲ状態にする歌を歌う",
        "str_progress": ""
    },
    {
        "id": 632,
        "imageid": 632,
        "unknown1_6": 32,
        "str_name": "デッドリーナイトメア(M)",
        "unknown2_0": 10,
        "unknown10_139": 0,
        "str_description": "周囲の敵を悪夢の眠りに巻き込む。眠った敵は持続的にダメージを受けて、攻撃されるか周囲の助けがなければ目覚めることが出来ない。",
        "str_progress": ""
    },
    {
        "id": 633,
        "imageid": 633,
        "unknown1_6": 32,
        "str_name": "コールドハンマー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "氷のように冷たいハンマーで敵を攻撃し、敵の動きを鈍くさせる一撃を放つ。",
        "str_progress": ""
    },
    {
        "id": 634,
        "imageid": 634,
        "unknown1_6": 32,
        "str_name": "スポイルドウォーター",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵から攻撃を受けると、周りの敵に汚染された水を噴き出しながら攻撃する。\r\nこの水に当たった敵は冷却され、広範囲の呪いにかかる",
        "str_progress": ""
    },
    {
        "id": 635,
        "imageid": 635,
        "unknown1_6": 32,
        "str_name": "ブランチフィスト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "木の枝の腕で敵を攻撃。広範囲にかけて敵に打撃を与える。",
        "str_progress": ""
    },
    {
        "id": 636,
        "imageid": 636,
        "unknown1_6": 32,
        "str_name": "ライトビーム",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "前方の敵に光の息を吐き出して攻撃する。",
        "str_progress": ""
    },
    {
        "id": 637,
        "imageid": 637,
        "unknown1_6": 32,
        "str_name": "レーザービーム",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "光の力場を重ねた凄まじいエネルギーを射出する究極の光攻撃手段である",
        "str_progress": ""
    },
    {
        "id": 638,
        "imageid": 638,
        "unknown1_6": 32,
        "str_name": "逆鱗(M)",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "悪意に満ちた悪口で戦闘本能を刺激させる。ただし、敵が限られた小時間内に攻撃を成功させることができなければ、極端なダメージを与えることができる",
        "str_progress": "威力, 限界時間"
    },
    {
        "id": 639,
        "imageid": 639,
        "unknown1_6": 32,
        "str_name": "石投げ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "スリングで弾丸を投げる最小の攻撃。弾丸が石弾丸や鉄弾の種類の場合はもっと効果が良い",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 640,
        "imageid": 640,
        "unknown1_6": 32,
        "str_name": "サイクロンピーク(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "回転を加えた剣で敵に突攻撃を行う。 周囲の敵もその剣圧に巻き込まれるとダメージを受ける。",
        "str_progress": "威力, 攻撃速度, 命中率"
    },
    {
        "id": 641,
        "imageid": 641,
        "unknown1_6": 32,
        "str_name": "ホルンアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "モンスターが剣で繰り出す平凡な攻撃。",
        "str_progress": ""
    },
    {
        "id": 642,
        "imageid": 642,
        "unknown1_6": 32,
        "str_name": "スタンアタック",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "強くぶん殴って敵をしばらく気絶させるスキル。気絶が主な目的だからその分破壊力は低い。",
        "str_progress": ""
    },
    {
        "id": 643,
        "imageid": 643,
        "unknown1_6": 32,
        "str_name": "ソニックブレード(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "剣を大きく振り下ろし、真空波を作って遠距離の敵を攻撃する。",
        "str_progress": "威力"
    },
    {
        "id": 644,
        "imageid": 644,
        "unknown1_6": 32,
        "str_name": "アイオブザビースト(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "野獣の視線で目標とした敵を動けないように縛る。",
        "str_progress": "発動確率"
    },
    {
        "id": 645,
        "imageid": 645,
        "unknown1_6": 32,
        "str_name": "流水撃(M)",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵の攻撃を横に流して顎を殴り攻撃。必ずクリティカルヒットになる。",
        "str_progress": "発動確率, 威力"
    },
    {
        "id": 646,
        "imageid": 646,
        "unknown1_6": 32,
        "str_name": "ドローボディー(M)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "鞭で遠い所にいる敵をからめて自分の前まで連れてくる",
        "str_progress": "命中, 発動確率"
    },
    {
        "id": 647,
        "imageid": 647,
        "unknown1_6": 32,
        "str_name": "ディバインアーチ(M)",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "パーティーメンバーの頭上に聖なるアーチを発生させ、聖霊の加護を与える。聖霊の加護は各種状態異常と魔法攻撃から保護し、習得スキルのレベルが上昇する。",
        "str_progress": "抵抗力, 増加率, 範囲"
    },
    {
        "id": 648,
        "imageid": 648,
        "unknown1_6": 32,
        "str_name": "フェザーニードル",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "聖なる力が込められた翼の羽を飛ばして攻撃する。攻撃された敵は命中率と回避率が低下する。",
        "str_progress": "威力、命中率、持続時間"
    },
    {
        "id": 649,
        "imageid": 649,
        "unknown1_6": 32,
        "str_name": "回避(M)",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵の攻撃を素早く避ける。",
        "str_progress": "発動確率"
    },
    {
        "id": 650,
        "imageid": 650,
        "unknown1_6": 32,
        "str_name": "ボイドボウ(M)",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "持っている弓矢を空中に浮かべて遠隔操縦しながら、武器を槍に持ち替える。アーチャーに戻ると自動解除される。",
        "str_progress": "威力, 持続時間"
    },
    {
        "id": 651,
        "imageid": 651,
        "unknown1_6": 32,
        "str_name": "マウルリングアタックII",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "両腕で敵を殴り飛ばして攻撃する",
        "str_progress": ""
    },
    {
        "id": 652,
        "imageid": 652,
        "unknown1_6": 32,
        "str_name": "ホットスピンストーン(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "スリングの弾丸を強く回転させて摩擦熱を発生させ、弾丸は高熱の状態で敵に向かって飛ぶ",
        "str_progress": "威力"
    },
    {
        "id": 653,
        "imageid": 653,
        "unknown1_6": 32,
        "str_name": "ジャッジメントデイ(M)",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "無数の十字架で一定範囲内の敵を攻撃し、周囲のパーティーメンバーは全ての状態異常が回復する。",
        "str_progress": "威力, 範囲, 発動確率"
    },
    {
        "id": 654,
        "imageid": 654,
        "unknown1_6": 32,
        "str_name": "蟻地獄(M)",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "強力な呪いで、敵が体力を回復しようとすると一定のダメージを与えて回復することができないようにする",
        "str_progress": "威力"
    },
    {
        "id": 655,
        "imageid": 655,
        "unknown1_6": 32,
        "str_name": "ダークネスイリュージョン(M)",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "まやかしの闇で自分と周囲にいる敵の「知識と力」、「知恵と敏捷性」をそれぞれ入れ替える",
        "str_progress": "持続時間"
    },
    {
        "id": 656,
        "imageid": 656,
        "unknown1_6": 32,
        "str_name": "グルルムゲスプII",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "前方の敵に闇の火炎を噴き出して攻撃する",
        "str_progress": ""
    },
    {
        "id": 657,
        "imageid": 657,
        "unknown1_6": 32,
        "str_name": "ソニックブロー(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "剣を素早く振り下ろし、真空波で広い範囲の敵を攻撃する。",
        "str_progress": "威力, 範囲, 命中率"
    },
    {
        "id": 658,
        "imageid": 658,
        "unknown1_6": 32,
        "str_name": "バキュームポイント(M)",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": ""
    },
    {
        "id": 659,
        "imageid": 659,
        "unknown1_6": 32,
        "str_name": "岩投げ(M)",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "スリングで巨大な岩を投げ、周囲の岩を何でもつかんでは飛ばす技術のため、弾丸の必要無し",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 660,
        "imageid": 660,
        "unknown1_6": 32,
        "str_name": "アースクエイク(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "自分の周囲に地震を発生させ、敵にダメージを与える。敵はしばらく麻痺する。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 661,
        "imageid": 661,
        "unknown1_6": 32,
        "str_name": "ホールドパーソン(M)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "人間系、悪魔系の敵の動きを封じる。",
        "str_progress": "成功確率, 持続時間"
    },
    {
        "id": 662,
        "imageid": 662,
        "unknown1_6": 32,
        "str_name": "スナイプII",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵を狙撃する。移動していない敵に100％命中し、クリティカルヒットが発生する。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 663,
        "imageid": 663,
        "unknown1_6": 32,
        "str_name": "ホーリーサークル(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "聖霊の力が宿ったサークルを飛ばして攻撃する。攻撃された敵は命中率と回避率が低下する。",
        "str_progress": "威力、速度、持続時間"
    },
    {
        "id": 664,
        "imageid": 664,
        "unknown1_6": 32,
        "str_name": "ダブルスローイング(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "一体の敵へ複数の短剣を同時に投げて攻撃。短剣は一つだけ使用",
        "str_progress": "威力, 命中率, 攻撃回数"
    },
    {
        "id": 665,
        "imageid": 665,
        "unknown1_6": 32,
        "str_name": "グラウンドシェイカー(M)",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "魔力を込めた槍を地面に突き立てて小さい地震を引き起こす。敵は身動きが取れず、バランスを失って倒れる。",
        "str_progress": "威力, 持続時間"
    },
    {
        "id": 666,
        "imageid": 666,
        "unknown1_6": 32,
        "str_name": "死の視線",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "凄まじい目で相手を睨みつけ、各種状態異常を引き起こす邪悪な能力",
        "str_progress": ""
    },
    {
        "id": 667,
        "imageid": 667,
        "unknown1_6": 32,
        "str_name": "足掛け蹴り(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "足をからみかけて攻撃。敵を転倒させて、クリティカルボーナスが発生する。",
        "str_progress": "威力, 麻痺時間, 致命打確率"
    },
    {
        "id": 668,
        "imageid": 668,
        "unknown1_6": 32,
        "str_name": "ゲイルパンチ(M)",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 669,
        "imageid": 669,
        "unknown1_6": 32,
        "str_name": "ソードクラッシュII",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "力強い一撃を放つ。あっという間に体力を減らしてしまう恐ろしいスキル",
        "str_progress": ""
    },
    {
        "id": 670,
        "imageid": 670,
        "unknown1_6": 32,
        "str_name": "払い蹴り(M)",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "しゃがんだ右足で敵のふくらはぎを攻撃。卓越した攻撃力と共にランダムで敵の移動速度を低下させる効果がある技術。",
        "str_progress": "威力, 麻痺時間"
    },
    {
        "id": 671,
        "imageid": 671,
        "unknown1_6": 32,
        "str_name": "ホーリークロス(M)",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "巨大な光の十字架を召喚して、指定した周囲にいる一定半径内の敵を攻撃してその力でパーティーメンバーの体力を回復する。",
        "str_progress": "威力, 回復量, 範囲"
    },
    {
        "id": 672,
        "imageid": 672,
        "unknown1_6": 32,
        "str_name": "クリスタルフラッシュII",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "明るく輝く氷結晶を上方に放出した後、自分の四方に冷気を散らして攻撃する",
        "str_progress": ""
    },
    {
        "id": 673,
        "imageid": 673,
        "unknown1_6": 32,
        "str_name": "烈火の怒り(M)",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵にだけ見える幻想を作り出し攻撃できないようにする術。敵は幻想の中に巻き込まれている間は攻撃される事が無く、持続時間が経つと敵に一定ダメージを与えられる",
        "str_progress": "発動確率, 威力, 限界時間"
    },
    {
        "id": 674,
        "imageid": 674,
        "unknown1_6": 32,
        "str_name": "掴み投げ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵を掴んで地面に叩きつけてしまう。体力に比例して攻撃力が増加する",
        "str_progress": ""
    },
    {
        "id": 675,
        "imageid": 675,
        "unknown1_6": 32,
        "str_name": "トワーリングプロテクター(M)",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "空中に浮かべた盾を素早く回して大きな渦巻きを作り、その渦巻きで敵を攻撃する。旋風に当たった敵はしばらく麻痺する。",
        "str_progress": "威力, 麻痺時間"
    },
    {
        "id": 676,
        "imageid": 676,
        "unknown1_6": 32,
        "str_name": "ファイナルチャージング(M)",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "狙いを定めた敵に剣を突き出しながら突進し、途中の敵を巻き込みながらダメージを与える。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 677,
        "imageid": 677,
        "unknown1_6": 32,
        "str_name": "針のむしろ(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵の余裕を奪って攻撃のミスを誘い、自責の念にとらわれた敵に闇ダメージを与える",
        "str_progress": "威力"
    },
    {
        "id": 678,
        "imageid": 678,
        "unknown1_6": 32,
        "str_name": "フロストクェイクII",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "周りに冷気の震動を発散して、敵を冷たく氷らせてしまう",
        "str_progress": ""
    },
    {
        "id": 679,
        "imageid": 679,
        "unknown1_6": 32,
        "str_name": "貫顎(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "右腕の肘で敵の顎を攻撃し、クリティカルヒットボーナスが発生。直後、左手、右足スキルのレベルと致命打確率がしばらく上昇。",
        "str_progress": "威力, 致命打確率"
    },
    {
        "id": 680,
        "imageid": 680,
        "unknown1_6": 32,
        "str_name": "ピアシング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵を噛み続け、敵の体力を徐々に減少させる",
        "str_progress": "威力, 攻撃速度"
    },
    {
        "id": 681,
        "imageid": 681,
        "unknown1_6": 32,
        "str_name": "ブラッディウィング(M)",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "自分の生命力を犠牲にしながら折れた翼から出る膏血を敵に撤いて攻撃する。",
        "str_progress": "威力、速度、持続時間"
    },
    {
        "id": 682,
        "imageid": 682,
        "unknown1_6": 32,
        "str_name": "ワイルドスタンプ(M)II",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "ジャンプの後、着地点で剣を振り回し、その周囲の敵にダメージを与える。着地点の敵は押し出される。",
        "str_progress": "威力"
    },
    {
        "id": 683,
        "imageid": 683,
        "unknown1_6": 32,
        "str_name": "タイフーンインパルス(M)",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "激しく剣を振り回し、前方の敵に向かって剣圧の嵐を飛ばす。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 684,
        "imageid": 684,
        "unknown1_6": 32,
        "str_name": "マジックディスペリング(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "聖霊を宿し、敵にかけられた各種補助魔法を解除する。",
        "str_progress": "成功確率, CP減少量"
    },
    {
        "id": 685,
        "imageid": 685,
        "unknown1_6": 32,
        "str_name": "ライフドレインII",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵の体力を吸収して自分の体力にする攻撃を放つ。この技術が熟練すると敵の体力を自分のCPに転換することも可能になる。",
        "str_progress": ""
    },
    {
        "id": 686,
        "imageid": 686,
        "unknown1_6": 32,
        "str_name": "スカルペネトレータ(M)II",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 687,
        "imageid": 687,
        "unknown1_6": 32,
        "str_name": "烈風撃(M)",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "風を起こして攻撃。",
        "str_progress": "威力、射程距離、命中率"
    },
    {
        "id": 688,
        "imageid": 688,
        "unknown1_6": 32,
        "str_name": "ブレストファイア(M)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "胸から火炎光線を発射する。発射後にはプリンセスに戻る",
        "str_progress": "威力"
    },
    {
        "id": 689,
        "imageid": 689,
        "unknown1_6": 32,
        "str_name": "RED STONEの情熱II",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "RED STONEに向けた情熱。周り味方の攻撃力、防御力、速度、HP、CP最大値がしばらくの間飛躍的に向上し、使用中は周囲の敵に莫大なダメージを与える",
        "str_progress": ""
    },
    {
        "id": 690,
        "imageid": 690,
        "unknown1_6": 32,
        "str_name": "ミラーカーズ(M)II",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵が攻撃を試みる度に、攻撃者もダメージを受ける呪いをかける",
        "str_progress": ""
    },
    {
        "id": 691,
        "imageid": 691,
        "unknown1_6": 32,
        "str_name": "アイスブレスPOT",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 692,
        "imageid": 692,
        "unknown1_6": 32,
        "str_name": "ドラゴンロアPOT",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 693,
        "imageid": 693,
        "unknown1_6": 32,
        "str_name": "スリップウィングPOT",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 694,
        "imageid": 694,
        "unknown1_6": 32,
        "str_name": "コンバージョンアイスPOT",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 695,
        "imageid": 695,
        "unknown1_6": 32,
        "str_name": "ドラゴンアースクエイクPOT",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 696,
        "imageid": 696,
        "unknown1_6": 32,
        "str_name": "デッドボディPOT",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "死体を特定方向に発射して閉めるキャラクターにダメージを加える。低い確率で即死する可能性があるため注意。",
        "str_progress": " "
    },
    {
        "id": 697,
        "imageid": 697,
        "unknown1_6": 32,
        "str_name": "フレームラインPOT",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": ""
    },
    {
        "id": 698,
        "imageid": 698,
        "unknown1_6": 32,
        "str_name": "エクスプロージョンスタッフPOT",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": ""
    },
    {
        "id": 699,
        "imageid": 699,
        "unknown1_6": 32,
        "str_name": "デビルクロウPOT",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": ""
    },
    {
        "id": 700,
        "imageid": 700,
        "unknown1_6": 32,
        "str_name": "スパイダーウェブ・リアクション",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "自分が攻撃されると、周囲の一定地域に敵の移動を抑止する蜘蛛の糸を撒き散らす",
        "str_progress": ""
    },
    {
        "id": 701,
        "imageid": 701,
        "unknown1_6": 32,
        "str_name": "アラクノフォビア・リアクション",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "自分が攻撃されると、周囲の一定地域に敵の移動を抑止する蜘蛛の糸を撒き散らす。",
        "str_progress": ""
    },
    {
        "id": 702,
        "imageid": 702,
        "unknown1_6": 32,
        "str_name": "スパイダーウェブ・リアクション",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "自分が攻撃されると、周囲の一定地域に敵の移動を抑止する蜘蛛の糸を撒き散らす",
        "str_progress": ""
    },
    {
        "id": 703,
        "imageid": 703,
        "unknown1_6": 32,
        "str_name": "アラクノフォビア・リアクション",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "自分が攻撃されると、周囲の一定地域に敵の移動を抑止する蜘蛛の糸を撒き散らす。抜け出せない敵は糸の中で蜘蛛の攻撃を受ける",
        "str_progress": "発動確率, 威力"
    },
    {
        "id": 704,
        "imageid": 704,
        "unknown1_6": 32,
        "str_name": "ポイズンエクスプロージョン・リ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "自分が攻撃されたら自分の周りの一定地域に敵の移動を封鎖する蜘蛛の巣を設置する",
        "str_progress": ""
    },
    {
        "id": 705,
        "imageid": 705,
        "unknown1_6": 32,
        "str_name": "モータルクラウド・リアクション",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "自分が攻撃されたら自分の周りの一定地域に敵の移動を封鎖する蜘蛛の巣を設置する",
        "str_progress": ""
    },
    {
        "id": 706,
        "imageid": 706,
        "unknown1_6": 32,
        "str_name": "契約打撃",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 707,
        "imageid": 707,
        "unknown1_6": 32,
        "str_name": "ギガライトニング・リアクション",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": ""
    },
    {
        "id": 708,
        "imageid": 708,
        "unknown1_6": 32,
        "str_name": "魂の演奏者称号効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 709,
        "imageid": 709,
        "unknown1_6": 32,
        "str_name": "攻速プラス",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 710,
        "imageid": 710,
        "unknown1_6": 32,
        "str_name": "動速プラス",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 711,
        "imageid": 711,
        "unknown1_6": 32,
        "str_name": "回避プラス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 712,
        "imageid": 712,
        "unknown1_6": 32,
        "str_name": "火炎プラス",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 713,
        "imageid": 713,
        "unknown1_6": 32,
        "str_name": "オートHPプラス",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 714,
        "imageid": 714,
        "unknown1_6": 32,
        "str_name": "体力プラス",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 715,
        "imageid": 715,
        "unknown1_6": 32,
        "str_name": "防御プラス",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 716,
        "imageid": 63,
        "unknown1_6": 32,
        "str_name": "ライトニングサンダーPOT",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "雷と稲妻で敵に物理、精神の両方でダメージを与える。ダメージと一定時間の速度低下を与え、感電状態を引き起こす",
        "str_progress": "威力"
    },
    {
        "id": 717,
        "imageid": 43,
        "unknown1_6": 32,
        "str_name": "ワイルドスタンプPOT",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "ジャンプの後、着地点で剣を振り回し、その周囲の敵にダメージを与える。着地点の敵は押し出される。",
        "str_progress": "威力"
    },
    {
        "id": 718,
        "imageid": 718,
        "unknown1_6": 32,
        "str_name": "フロストバイトPOT",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "冷たい息を含みながら敵に噛み付き、冷気で敵を凍えさせる。",
        "str_progress": ""
    },
    {
        "id": 719,
        "imageid": 719,
        "unknown1_6": 32,
        "str_name": "スピアーアタックPOT",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "モンスターが槍を使用して行う、平凡な攻撃。",
        "str_progress": ""
    },
    {
        "id": 720,
        "imageid": 720,
        "unknown1_6": 32,
        "str_name": "スパイダーウェブ・リアクション",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "自分が攻撃されると、周囲の一定地域に敵の移動を抑止する蜘蛛の糸を撒き散らす",
        "str_progress": ""
    },
    {
        "id": 721,
        "imageid": 721,
        "unknown1_6": 32,
        "str_name": "ヴェノムクラウド・リアクション",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "自分が攻撃されると、周囲の一定地域に敵の移動を抑止する蜘蛛の糸を撒き散らす",
        "str_progress": ""
    },
    {
        "id": 722,
        "imageid": 722,
        "unknown1_6": -1,
        "str_name": "リザードフレアーEx",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が被ダメージを受けた時だけではなく、攻撃中もリザードフレアーが発動する。",
        "str_progress": "発動確率"
    },
    {
        "id": 723,
        "imageid": 723,
        "unknown1_6": -1,
        "str_name": "ヴェッセルブロウアップEx",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が被ダメージを受けた時だけではなく、攻撃中もヴェッセルブロウアップが発動する。",
        "str_progress": "発動確率"
    },
    {
        "id": 724,
        "imageid": 724,
        "unknown1_6": -1,
        "str_name": "アコースティックマインEx",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が被ダメージを受けた時だけではなく、攻撃中もアコースティックマインが発動する。",
        "str_progress": "発動確率"
    },
    {
        "id": 725,
        "imageid": 725,
        "unknown1_6": -1,
        "str_name": "インタークェイクEx",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が被ダメージを受けた時だけではなく、攻撃中もインタークェイクが発動する。",
        "str_progress": "発動確率"
    },
    {
        "id": 726,
        "imageid": 726,
        "unknown1_6": -1,
        "str_name": "フォトンビーコンEx",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が被ダメージを受けた時だけではなく、攻撃中もフォトンビーコンが発動する。",
        "str_progress": "発動確率"
    },
    {
        "id": 727,
        "imageid": 727,
        "unknown1_6": -1,
        "str_name": "影法師の泉Ex",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が被ダメージを受けた時だけではなく、攻撃中も影法師の泉が発動する。",
        "str_progress": "発動確率"
    },
    {
        "id": 728,
        "imageid": 728,
        "unknown1_6": -1,
        "str_name": "クラウンズウェーブEx",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が被ダメージを受けた時だけではなく、攻撃中もクラウンズウェーブが発動する。",
        "str_progress": "発動確率"
    },
    {
        "id": 729,
        "imageid": 729,
        "unknown1_6": -1,
        "str_name": "ブレイズオブケルベロス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ケルベロスが攻撃時、敵をスタン状態にする場合がある。スキルレベルが上がるほどスタン確率が増加。",
        "str_progress": "スタン確率"
    },
    {
        "id": 730,
        "imageid": 730,
        "unknown1_6": -1,
        "str_name": "ララバイオブセイレーン",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "セイレーンが攻撃時、敵をスタン状態にする場合がある。スキルレベルが上がるほどスタン確率が増加。",
        "str_progress": "スタン確率"
    },
    {
        "id": 731,
        "imageid": 731,
        "unknown1_6": -1,
        "str_name": "ウィングビートオブハーピー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ハーピーが攻撃時、敵をスタン状態にする場合がある。スキルレベルが上がるほどスタン確率が増加。",
        "str_progress": "スタン確率"
    },
    {
        "id": 732,
        "imageid": 732,
        "unknown1_6": -1,
        "str_name": "ロアーオブカトブレパス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "カトブレパスが攻撃時、敵をスタン状態にする場合がある。スキルレベルが上がるほどスタン確率が増加。",
        "str_progress": "スタン確率"
    },
    {
        "id": 733,
        "imageid": 733,
        "unknown1_6": -1,
        "str_name": "トゥインクルオブピクシー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ピクシーが攻撃時、敵をスタン状態にする場合がある。スキルレベルが上がるほどスタン確率が増加。",
        "str_progress": "スタン確率"
    },
    {
        "id": 734,
        "imageid": 734,
        "unknown1_6": -1,
        "str_name": "フィアオブアビス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "アビスが攻撃時、敵をスタン状態にする場合がある。スキルレベルが上がるほどスタン確率が増加。",
        "str_progress": "スタン確率"
    },
    {
        "id": 735,
        "imageid": 735,
        "unknown1_6": -1,
        "str_name": "スクリームオブファントム",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ファントムが攻撃時、敵をスタン状態にする場合がある。スキルレベルが上がるほどスタン確率が増加。",
        "str_progress": "スタン確率"
    },
    {
        "id": 736,
        "imageid": 736,
        "unknown1_6": -1,
        "str_name": "業火の心臓",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "業火の全ての攻撃がさらに強くなる。スキルレベルが上がるほど攻撃力がより増加する。",
        "str_progress": "ダメージ"
    },
    {
        "id": 737,
        "imageid": 737,
        "unknown1_6": -1,
        "str_name": "爆水の心臓",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "爆水の全ての攻撃がさらに強くなる。スキルレベルが上がるほど攻撃力がより増加する。",
        "str_progress": "ダメージ"
    },
    {
        "id": 738,
        "imageid": 738,
        "unknown1_6": -1,
        "str_name": "烈風の心臓",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "烈風の全ての攻撃がさらに強くなる。スキルレベルが上がるほど攻撃力がより増加する。",
        "str_progress": "ダメージ"
    },
    {
        "id": 739,
        "imageid": 739,
        "unknown1_6": -1,
        "str_name": "大地の心臓",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "大地の全ての攻撃がさらに強くなる。スキルレベルが上がるほど攻撃力がより増加する。",
        "str_progress": "ダメージ"
    },
    {
        "id": 740,
        "imageid": 740,
        "unknown1_6": -1,
        "str_name": "雷光の心臓",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "雷光の全ての攻撃がさらに強くなる。スキルレベルが上がるほど攻撃力がより増加する。",
        "str_progress": "ダメージ"
    },
    {
        "id": 741,
        "imageid": 741,
        "unknown1_6": -1,
        "str_name": "黒闇の心臓",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "黒闇の全ての攻撃がさらに強くなる。スキルレベルが上がるほど攻撃力がより増加する。",
        "str_progress": "ダメージ"
    },
    {
        "id": 742,
        "imageid": 742,
        "unknown1_6": -1,
        "str_name": "幻影の心臓",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "幻影の全ての攻撃がさらに強くなる。スキルレベルが上がるほど攻撃力がより増加する。",
        "str_progress": "ダメージ"
    },
    {
        "id": 743,
        "imageid": 743,
        "unknown1_6": -1,
        "str_name": "地獄の炎",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "業火が敵を攻撃する確率が大幅上昇。スキルレベルが上がるほど攻撃する確率がさらに増加。",
        "str_progress": "発動確率"
    },
    {
        "id": 744,
        "imageid": 744,
        "unknown1_6": -1,
        "str_name": "水の波動",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "爆水が敵を攻撃する確率が大幅上昇。スキルレベルが上がるほど攻撃する確率がさらに増加。",
        "str_progress": "発動確率"
    },
    {
        "id": 745,
        "imageid": 745,
        "unknown1_6": -1,
        "str_name": "雷鳴",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "烈風が敵を攻撃する確率が大幅上昇。スキルレベルが上がるほど攻撃する確率がさらに増加。",
        "str_progress": "発動確率"
    },
    {
        "id": 746,
        "imageid": 746,
        "unknown1_6": -1,
        "str_name": "激震",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "大地が敵を攻撃する確率が大幅上昇。スキルレベルが上がるほど攻撃する確率がさらに増加。",
        "str_progress": "発動確率"
    },
    {
        "id": 747,
        "imageid": 747,
        "unknown1_6": -1,
        "str_name": "後光",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "雷光が敵を攻撃する確率が大幅上昇。スキルレベルが上がるほど攻撃する確率がさらに増加。",
        "str_progress": "発動確率"
    },
    {
        "id": 748,
        "imageid": 748,
        "unknown1_6": -1,
        "str_name": "深淵",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "黒闇が敵を攻撃する確率が大幅上昇。スキルレベルが上がるほど攻撃する確率がさらに増加。",
        "str_progress": "発動確率"
    },
    {
        "id": 749,
        "imageid": 749,
        "unknown1_6": -1,
        "str_name": "空虚",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "幻想が敵を攻撃する確率が大幅上昇。スキルレベルが上がるほど攻撃する確率がさらに増加。",
        "str_progress": "発動確率"
    },
    {
        "id": 750,
        "imageid": 750,
        "unknown1_6": -1,
        "str_name": "ヒートキャノンEx",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ヒートキャノンが自動でチャージされる。自動でチャージされた ヒートキャノンも持主の意志で使用可能。スキルレベルが上がるほどチャージクールタイムが減少。",
        "str_progress": "クールタイム減少"
    },
    {
        "id": 751,
        "imageid": 751,
        "unknown1_6": -1,
        "str_name": "クリスタルインジェクターEx",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "クリスタルインジェクターが自動でチャージされる。自動でチャージされたクリスタルインジェクターも持主の意志で使用可能。スキルレベルが上がるほどチャージクールタイムが減少。",
        "str_progress": "クールタイム減少"
    },
    {
        "id": 752,
        "imageid": 752,
        "unknown1_6": -1,
        "str_name": "プレッシャーディスチャージEx",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "プレッシャーディスチャージが自動でチャージされる。自動でチャージされたプレッシャーディスチャージも持主の意志で使用可能。スキルレベルが上がるほどチャージクールタイムが減少。",
        "str_progress": "クールタイム減少"
    },
    {
        "id": 753,
        "imageid": 753,
        "unknown1_6": -1,
        "str_name": "マグマキャスティングEx",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "マグマキャスティングが自動でチャージされる。自動でチャージされたマグマキャスティングも持主の意志で使用可能。スキルレベルが上がるほどチャージクールタイムが減少。",
        "str_progress": "クールタイム減少"
    },
    {
        "id": 754,
        "imageid": 754,
        "unknown1_6": -1,
        "str_name": "レールレーザーEx",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "レールレーザーが自動でチャージされる。自動でチャージされたレールレーザーも持主の意志で使用可能。スキルレベルが上がるほどチャージクールタイムが減少。",
        "str_progress": "クールタイム減少"
    },
    {
        "id": 755,
        "imageid": 755,
        "unknown1_6": -1,
        "str_name": "ヴォルテックスフリングEx",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ヴォルテックスフリングが自動でチャージされる。自動でチャージされた ヴォルテックスフリングも持主の意志で使用可能。スキルレベルが上がるほどチャージクールタイムが減少。",
        "str_progress": "クールタイム減少"
    },
    {
        "id": 756,
        "imageid": 756,
        "unknown1_6": -1,
        "str_name": "シャフトスプレーEx",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "シャフトスプレーが自動でチャージされる。自動でチャージされたシャフトスプレーも持主の意志で使用可能。スキルレベルが上がるほどチャージクールタイムが減少。",
        "str_progress": "クールタイム減少"
    },
    {
        "id": 757,
        "imageid": 757,
        "unknown1_6": -1,
        "str_name": "烈火の解放",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ヒートキャノンのチャージ累積回数が増加。スキルレベルが上がるほど最大チャージ累積回数も増加。",
        "str_progress": "チャージ回数"
    },
    {
        "id": 758,
        "imageid": 758,
        "unknown1_6": -1,
        "str_name": "水滸の解放",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "クリスタルインジェクターのチャージ累積回数が増加。スキルレベルが上がるほど最大チャージ累積回数も増加。",
        "str_progress": "チャージ回数"
    },
    {
        "id": 759,
        "imageid": 759,
        "unknown1_6": -1,
        "str_name": "木蓮の解放",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "プレッシャーディスチャージのチャージ累積回数が増加。スキルレベルが上がるほど最大チャージ累積回数も増加。",
        "str_progress": "チャージ回数"
    },
    {
        "id": 760,
        "imageid": 760,
        "unknown1_6": -1,
        "str_name": "金剛の解放",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "マグマキャスティングのチャージ累積回数が増加。スキルレベルが上がるほど最大チャージ累積回数も増加。",
        "str_progress": "チャージ回数"
    },
    {
        "id": 761,
        "imageid": 761,
        "unknown1_6": -1,
        "str_name": "光輪の解放",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "レールレーザーのチャージ累積回数が増加。スキルレベルが上がるほど最大チャージ累積回数も増加。",
        "str_progress": "チャージ回数"
    },
    {
        "id": 762,
        "imageid": 762,
        "unknown1_6": -1,
        "str_name": "奈落の解放",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ヴォルテックスフリングのチャージ累積回数が増加。スキルレベルが上がるほど最大チャージ累積回数も増加。",
        "str_progress": "チャージ回数"
    },
    {
        "id": 763,
        "imageid": 763,
        "unknown1_6": -1,
        "str_name": "幻夢の解放",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "シャフトスプレーのチャージ累積回数が増加。スキルレベルが上がるほど最大チャージ累積回数も増加。",
        "str_progress": "チャージ回数"
    },
    {
        "id": 764,
        "imageid": 634,
        "unknown1_6": 20,
        "str_name": "黒魔術の加護",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "掃除の邪魔をする者を退治するため、眠っていた魔法能力が発揮される。黒魔術師の時に着用していた十字架の効果がメイド変身状態でも一部適用。",
        "str_progress": "なし"
    },
    {
        "id": 765,
        "imageid": 768,
        "unknown1_6": 20,
        "str_name": "紅皿欠皿",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "狂気に包まれたメイドが投げ付けた皿が辺りへ散乱し、ダメージを増加させる。",
        "str_progress": "無し"
    },
    {
        "id": 766,
        "imageid": 769,
        "unknown1_6": 20,
        "str_name": "熟練家政婦",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "慣れた仕草で熟練した腕前を披露する。攻撃の際は稀に追加ダメージを与える。",
        "str_progress": "無し"
    },
    {
        "id": 767,
        "imageid": 767,
        "unknown1_6": 20,
        "str_name": "ネープルスダブルウェーブ",
        "unknown2_0": 4,
        "unknown10_139": 4096,
        "str_description": "メイドが内なる魔法の力で燃える皿を召喚、敵に投げつけて火炎ダメージを与える。ヒット数が増加する。",
        "str_progress": "威力"
    },
    {
        "id": 768,
        "imageid": 515,
        "unknown1_6": 20,
        "str_name": "サイクロンブルーム",
        "unknown2_0": 4,
        "unknown10_139": 16384,
        "str_description": "ほうきを回転させながら前方に投げる。ほうきはメイドに戻ってくるときもダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 769,
        "imageid": 518,
        "unknown1_6": 20,
        "str_name": "ディベストドレス",
        "unknown2_0": 2,
        "unknown10_139": 16384,
        "str_description": "巧みな手さばきで対象の衣服や鎧などを一瞬で脱がし、対象に一定確率で追加の確率ダメージを与える。相手に与える追加ダメージは、着用した十字架と同属性を持つ。",
        "str_progress": "威力, 確率"
    },
    {
        "id": 770,
        "imageid": 770,
        "unknown1_6": 32,
        "str_name": "ポイズントラップ(M)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "踏むと毒ガスが噴き出すトラップを設置。トラップが作動すると一定時間毒ダメージを与える。毒ダメージと同時に移動速度を減少させることがある。",
        "str_progress": ""
    },
    {
        "id": 771,
        "imageid": 771,
        "unknown1_6": 32,
        "str_name": "ダイビング(M)",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ガーフ専用機。その場で飛翔して急降下による体当たりを行う。攻撃を受けた敵は一定の確率でしばらくの間スタン状態になる。",
        "str_progress": ""
    },
    {
        "id": 772,
        "imageid": 772,
        "unknown1_6": 32,
        "str_name": "ダークエンチャント(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "バルザロズが使用する黒魔術。闇ダメージを与えると同時に敵を石化状態にする。",
        "str_progress": ""
    },
    {
        "id": 773,
        "imageid": 773,
        "unknown1_6": 32,
        "str_name": "ポイズンブレス(M)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "バルザロズ2の専用機。一定の範囲に毒ガスを噴射する。効果範囲にいる敵は毒に侵されることがある。",
        "str_progress": ""
    },
    {
        "id": 774,
        "imageid": 774,
        "unknown1_6": 32,
        "str_name": "アビス(M)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ニキアの専用機。魔法の波を発生させて、敵を水の中に密閉してダメージを与える。密閉状態の敵は体力が残っていても溺死することがある。",
        "str_progress": " "
    },
    {
        "id": 775,
        "imageid": 775,
        "unknown1_6": 32,
        "str_name": "闇範囲攻撃",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 776,
        "imageid": 776,
        "unknown1_6": 32,
        "str_name": "フロストバイト",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "冷たい息を含みながら敵に噛み付き、冷気で敵を凍えさせる。",
        "str_progress": ""
    },
    {
        "id": 777,
        "imageid": 777,
        "unknown1_6": 32,
        "str_name": "ヘルプリズン",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "自分を攻撃した敵を、地の底より召喚した「地獄の監獄」の中に閉じこめてしまう。敵は監獄を壊すまで動くことができない",
        "str_progress": "発動確率, 監獄HP, 監獄防御力"
    },
    {
        "id": 778,
        "imageid": 778,
        "unknown1_6": 32,
        "str_name": "冒険家追加闇ダメージ",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 779,
        "imageid": 779,
        "unknown1_6": 32,
        "str_name": "火炎範囲攻撃",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 780,
        "imageid": 516,
        "unknown1_6": 20,
        "str_name": "クレイジーラッシュ",
        "unknown2_0": 5,
        "unknown10_139": 8192,
        "str_description": "狂気に満ちたメイドが色々な種類の家事道具を投げて周辺のすべての敵にダメージを与える。使用時、地面に皿があると強化される。",
        "str_progress": "威力, 攻撃回数"
    },
    {
        "id": 781,
        "imageid": 508,
        "unknown1_6": 20,
        "str_name": "アルティメットブルームラッシュ",
        "unknown2_0": 3,
        "unknown10_139": -32768,
        "str_description": "ほうきをかけながら突撃する。対象の前で転んで、その衝撃で範囲内のすべての敵にダメージを与えてる。到着地点に割れた皿があると、追加で割れた皿を生成する。",
        "str_progress": "威力"
    },
    {
        "id": 782,
        "imageid": 514,
        "unknown1_6": 20,
        "str_name": "グライドディッシュ",
        "unknown2_0": 3,
        "unknown10_139": -32768,
        "str_description": "対象にお皿を投げて攻撃する。お皿が一定回数、敵の間で跳ね返りながら攻撃する。跳ね返した回数によって攻撃力が増加。",
        "str_progress": "威力、反射回数"
    },
    {
        "id": 783,
        "imageid": 513,
        "unknown1_6": 20,
        "str_name": "お掃除の邪魔は絶対に許さない",
        "unknown2_0": 4,
        "unknown10_139": 12288,
        "str_description": "掃除を邪魔する対象をほうきの棒の部分で連続で突く。",
        "str_progress": "威力, 攻撃回数"
    },
    {
        "id": 784,
        "imageid": 507,
        "unknown1_6": 20,
        "str_name": "ブルームクラッシャー",
        "unknown2_0": 2,
        "unknown10_139": -16384,
        "str_description": "ほうきを地面にかけながら突撃する。動線上のすべての敵にダメージを与えると同時に後ろにノックバックさせ、熟練家政婦の発動確率を少しの間増加させる。",
        "str_progress": "威力"
    },
    {
        "id": 785,
        "imageid": 509,
        "unknown1_6": 20,
        "str_name": "カオスクリーニング",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "運によって致命打攻撃を回避した場合、一定確率で敵をマヒ状態にする。追加クリティカル確率が増加する。",
        "str_progress": "確率"
    },
    {
        "id": 786,
        "imageid": 786,
        "unknown1_6": 32,
        "str_name": "抵抗力弱化床",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 787,
        "imageid": 635,
        "unknown1_6": 21,
        "str_name": "黒炎の古書",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "地下界の領主に受け継がれる古書の力を借りて、スキル使用時に消費したCP量によって知識を上昇させる。",
        "str_progress": "なし"
    },
    {
        "id": 788,
        "imageid": 636,
        "unknown1_6": 21,
        "str_name": "デモニックサポート",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "地下界の女王として悪魔たちから魔力の奉仕を受ける。ダークコアを使用するスキルをより気軽に使用できるようになる。",
        "str_progress": "なし"
    },
    {
        "id": 789,
        "imageid": 817,
        "unknown1_6": 21,
        "str_name": "地下界の炎",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "地下界の炎をより効率的に扱えるようになる。破滅の円盤、ストームデビル、永劫の苦痛を使用時消費されるCPが減少。",
        "str_progress": "なし"
    },
    {
        "id": 790,
        "imageid": 604,
        "unknown1_6": 21,
        "str_name": "地下界の軍勢",
        "unknown2_0": 5,
        "unknown10_139": 4096,
        "str_description": "ダークコアの力で兵器を追加召喚。兵器召喚スキルの打撃数を3連打に変更する。また、兵器召喚スキルの既存打撃数によって攻撃力の倍数が増加。このスキルを活性化させると、終わらない苦痛、烙印スキルは活性化できない。",
        "str_progress": "消費量、追加ダメージ"
    },
    {
        "id": 791,
        "imageid": 586,
        "unknown1_6": 21,
        "str_name": "デモンマーシャル",
        "unknown2_0": 5,
        "unknown10_139": 16384,
        "str_description": "地下界の次元扉を開いて、魔界総司令官のハルバートで攻撃。知識値によって打撃回数が増加する。",
        "str_progress": "威力"
    },
    {
        "id": 792,
        "imageid": 815,
        "unknown1_6": 21,
        "str_name": "サーマニングボイド",
        "unknown2_0": 4,
        "unknown10_139": 16384,
        "str_description": "自分を補助する魔法陣を多数召喚する。兵器召喚系スキルを使用する時、追加の魔法ダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 793,
        "imageid": 591,
        "unknown1_6": 21,
        "str_name": "ブラックスターオブカラミティ",
        "unknown2_0": 5,
        "unknown10_139": 8192,
        "str_description": "地下界の次元扉を開いて、黒い星形をした不安定な魔力球体を召喚。3連続の爆発が発生する。CP消耗量は自身の最大CPの一定値を超えない。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 794,
        "imageid": 816,
        "unknown1_6": 21,
        "str_name": "ダークエクスプロージョン",
        "unknown2_0": 3,
        "unknown10_139": -32768,
        "str_description": "ダークコアに力を凝縮させた後爆発させ、周辺の全ての敵にさらに強力なダメージを与える。",
        "str_progress": "威力、打撃範囲"
    },
    {
        "id": 795,
        "imageid": 605,
        "unknown1_6": 21,
        "str_name": "罪深き烙印",
        "unknown2_0": 5,
        "unknown10_139": -32768,
        "str_description": "ブラックヴォルカニック、ブラックライトニング、ブラックスタースキルでダメージを与えた敵に烙印を押す。烙印は2つ重なると爆発してダメージを与える。このスキルを活性化させると、終わらない苦痛、地下界の武器庫スキルは活性化できない。",
        "str_progress": "消費量、被害量を倍に"
    },
    {
        "id": 796,
        "imageid": 818,
        "unknown1_6": 21,
        "str_name": "破滅の円盤",
        "unknown2_0": 5,
        "unknown10_139": 12288,
        "str_description": "黒い炎が巻き付いた円盤を飛ばし敵を攻撃する。ダメージを受けた敵は攻撃速度が減少する。",
        "str_progress": "威力、攻撃速度低下"
    },
    {
        "id": 797,
        "imageid": 595,
        "unknown1_6": 21,
        "str_name": "ストームデビル",
        "unknown2_0": 4,
        "unknown10_139": -16384,
        "str_description": "魔力の竜巻を発生させて敵にダメージを与える。ダメージを受けた敵は竜巻の中心部に巻き込まれる。",
        "str_progress": "威力、打撃範囲"
    },
    {
        "id": 798,
        "imageid": 603,
        "unknown1_6": 21,
        "str_name": "永劫の苦痛",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "黒い炎で敵にダメージを与えるたびに残り火をつけてさらに強力な追加ダメージを与える。このスキルを活性化すると地下界の武器庫、烙印スキルは活性化できない。",
        "str_progress": "威力"
    },
    {
        "id": 799,
        "imageid": 799,
        "unknown1_6": 32,
        "str_name": "氷柱",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 800,
        "imageid": 800,
        "unknown1_6": 32,
        "str_name": "ファイアーワインダ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "セリジを中心に 1秒間に 8方向へ向けて円を描いてファイアーボルトを発射する",
        "str_progress": " "
    },
    {
        "id": 801,
        "imageid": 801,
        "unknown1_6": 32,
        "str_name": "ミラーイメージ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "セリジマスターが何人かに分身させる。この時、いくつかに分身したセリジマスターは、どれも本物と同じ能力を持つ",
        "str_progress": " "
    },
    {
        "id": 802,
        "imageid": 802,
        "unknown1_6": 32,
        "str_name": "ポリモーフ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵をカエルやウサギに変化させる",
        "str_progress": " "
    },
    {
        "id": 803,
        "imageid": 803,
        "unknown1_6": 32,
        "str_name": "パワーヒーリング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "指定したパーティーメンバーの体力をほぼ完全に回復",
        "str_progress": " "
    },
    {
        "id": 804,
        "imageid": 804,
        "unknown1_6": 32,
        "str_name": "ライトニングバリアー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "セリジマスターの周りに電気のバリアを作る。セリジマスターの周りに近付いた敵はダメージを受ける",
        "str_progress": " "
    },
    {
        "id": 805,
        "imageid": 805,
        "unknown1_6": 32,
        "str_name": "チェーンライトニング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "セリジがセリジマスターにライトニングを発射、セリジマスターに近づいた敵に順番にライトニングが移る",
        "str_progress": " "
    },
    {
        "id": 806,
        "imageid": 806,
        "unknown1_6": 32,
        "str_name": "ファイアーウォール",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "火の障壁を生成して攻撃されないようにする。この時、火の障壁に触れた者はダメージを負う。",
        "str_progress": " "
    },
    {
        "id": 807,
        "imageid": 807,
        "unknown1_6": 32,
        "str_name": "ギガライトニング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "空で力強い落雷を発生させて落雷が落ちた地点にしばらく電気が流れるトラップを残しておく。",
        "str_progress": " "
    },
    {
        "id": 808,
        "imageid": 808,
        "unknown1_6": 32,
        "str_name": "アイスブレス",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 809,
        "imageid": 809,
        "unknown1_6": 32,
        "str_name": "スリップウィング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 810,
        "imageid": 810,
        "unknown1_6": 32,
        "str_name": "ドラゴンロア",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 811,
        "imageid": 811,
        "unknown1_6": 32,
        "str_name": "コンバージョンアイス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 812,
        "imageid": 812,
        "unknown1_6": 32,
        "str_name": "アイシドフィーラ",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 813,
        "imageid": 813,
        "unknown1_6": 32,
        "str_name": "フォグフォーム",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 814,
        "imageid": 814,
        "unknown1_6": 32,
        "str_name": "アイシクル",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 815,
        "imageid": 815,
        "unknown1_6": 32,
        "str_name": "戦意喪失",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 816,
        "imageid": 816,
        "unknown1_6": 32,
        "str_name": "ドラゴンアースクエイク",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 817,
        "imageid": 817,
        "unknown1_6": 32,
        "str_name": "石化攻撃",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ランダムな地帯に広範囲の石化をしかけて機能障害を起こさせる",
        "str_progress": " "
    },
    {
        "id": 818,
        "imageid": 818,
        "unknown1_6": 32,
        "str_name": "ヘッドアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 819,
        "imageid": 819,
        "unknown1_6": 32,
        "str_name": "キャラクタードリンク",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 820,
        "imageid": 820,
        "unknown1_6": 32,
        "str_name": "回転攻撃",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 821,
        "imageid": 821,
        "unknown1_6": 32,
        "str_name": "粘着とりもち",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 822,
        "imageid": 821,
        "unknown1_6": 32,
        "str_name": "粘着とりもち2",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 823,
        "imageid": 819,
        "unknown1_6": 32,
        "str_name": "キャラクタードリンク2",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 824,
        "imageid": 824,
        "unknown1_6": 32,
        "str_name": "稲妻回転攻撃",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 825,
        "imageid": 825,
        "unknown1_6": -1,
        "str_name": "強化クーラントキャノン",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "小範囲の敵に水大砲を発射する。従来スキルより、鈍化効果が上昇。",
        "str_progress": "威力, 射程距離, 範囲"
    },
    {
        "id": 826,
        "imageid": 826,
        "unknown1_6": 32,
        "str_name": "ポイズンブレス",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 827,
        "imageid": 827,
        "unknown1_6": 32,
        "str_name": "尻尾振り",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 828,
        "imageid": 828,
        "unknown1_6": 32,
        "str_name": "マウスフル",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 829,
        "imageid": 829,
        "unknown1_6": 32,
        "str_name": "玉発射",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 830,
        "imageid": 830,
        "unknown1_6": 32,
        "str_name": "ダークサンダー",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 831,
        "imageid": 831,
        "unknown1_6": 32,
        "str_name": "デスボール",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 832,
        "imageid": 832,
        "unknown1_6": 32,
        "str_name": "ゾンビメーカー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 833,
        "imageid": 833,
        "unknown1_6": 32,
        "str_name": "デッドボディ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "死体を特定方向に発射して閉めるキャラクターにダメージを加える。低い確率で即死する可能性があるため注意。",
        "str_progress": " "
    },
    {
        "id": 834,
        "imageid": 834,
        "unknown1_6": 32,
        "str_name": "フレームライン",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": ""
    },
    {
        "id": 835,
        "imageid": 835,
        "unknown1_6": -1,
        "str_name": "感電to風ダメージ引き寄せ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 836,
        "imageid": 836,
        "unknown1_6": 32,
        "str_name": "エクスプロージョンスタッフ",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": ""
    },
    {
        "id": 837,
        "imageid": 837,
        "unknown1_6": 32,
        "str_name": "マジカルシールド",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": ""
    },
    {
        "id": 838,
        "imageid": 838,
        "unknown1_6": 32,
        "str_name": "飛行",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": ""
    },
    {
        "id": 839,
        "imageid": 839,
        "unknown1_6": 32,
        "str_name": "デビルクロウ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": ""
    },
    {
        "id": 840,
        "imageid": 395,
        "unknown1_6": 32,
        "str_name": "魔の約定(B)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": ""
    },
    {
        "id": 841,
        "imageid": 841,
        "unknown1_6": 32,
        "str_name": "サモンデモン",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": ""
    },
    {
        "id": 842,
        "imageid": 63,
        "unknown1_6": 32,
        "str_name": "ライトニングサンダー(セイジ)",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "雷と稲妻で敵に物理、精神の両方でダメージを与える。ダメージと一定時間の速度低下を与え、感電状態を引き起こす",
        "str_progress": "威力"
    },
    {
        "id": 843,
        "imageid": 843,
        "unknown1_6": 32,
        "str_name": "モンスターボム",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": ""
    },
    {
        "id": 844,
        "imageid": 817,
        "unknown1_6": 32,
        "str_name": "石化攻撃2",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ランダムな地帯に広範囲の石化をしかけて機能障害を起こさせる",
        "str_progress": " "
    },
    {
        "id": 845,
        "imageid": 845,
        "unknown1_6": -1,
        "str_name": "桜吹雪爆破",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 846,
        "imageid": 846,
        "unknown1_6": 32,
        "str_name": "MB55_前足蹴り",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "近接基本攻撃",
        "str_progress": ""
    },
    {
        "id": 847,
        "imageid": 847,
        "unknown1_6": 32,
        "str_name": "MB56_フレイムストーム",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "フレイムストーム",
        "str_progress": ""
    },
    {
        "id": 848,
        "imageid": 848,
        "unknown1_6": 32,
        "str_name": "MB57_ウィンドブレード",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "翼を振り回し、すべての方向にいる敵に風属性のミサイルを飛ばす。",
        "str_progress": ""
    },
    {
        "id": 849,
        "imageid": 849,
        "unknown1_6": 32,
        "str_name": "MB58_故墟の咆哮",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "叫ぶ",
        "str_progress": ""
    },
    {
        "id": 850,
        "imageid": 850,
        "unknown1_6": 32,
        "str_name": "MB59_絶滅の光",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "叫ぶ",
        "str_progress": ""
    },
    {
        "id": 851,
        "imageid": 678,
        "unknown1_6": 19,
        "str_name": "高貴なる野性",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "筋力に頼っていた獣人の中に、戦闘力を引き出す高貴な野性が目覚める。致命的な物理攻撃を加える時、追加で光ダメージが発生する。",
        "str_progress": "なし"
    },
    {
        "id": 852,
        "imageid": 679,
        "unknown1_6": 19,
        "str_name": "ソードダンス",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "魔力が込められた剣で敵を攻撃し、その魂を吸収する。致命的な魔法攻撃を加える時、追加の物理攻撃ダメージが発生する。",
        "str_progress": "なし"
    },
    {
        "id": 853,
        "imageid": 680,
        "unknown1_6": 19,
        "str_name": "神獣の威厳",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "威厳のオーラを纏った獣人が攻撃を受けると、攻撃者を感電状態にする。",
        "str_progress": "なし"
    },
    {
        "id": 854,
        "imageid": 561,
        "unknown1_6": 19,
        "str_name": "トレースアクロス",
        "unknown2_0": 4,
        "unknown10_139": 4096,
        "str_description": "魔力で作り出した幻影の分身と共に四方の敵を攻撃する。同時に強化されたファイナライジングプレッシャーをCPの消費なしで発動することができる。",
        "str_progress": "威力、分身個数"
    },
    {
        "id": 855,
        "imageid": 560,
        "unknown1_6": 19,
        "str_name": "ファイナライジングプレッシャー",
        "unknown2_0": 4,
        "unknown10_139": 16384,
        "str_description": "攻撃と同時にいくつかの分身が順番に連続攻撃を加える。",
        "str_progress": "威力、分身個数"
    },
    {
        "id": 856,
        "imageid": 578,
        "unknown1_6": 19,
        "str_name": "ヘリカルホーン",
        "unknown2_0": 5,
        "unknown10_139": 16384,
        "str_description": "鋭利なユニコーンの角で敵の隙をついてダメージを与える。トレースアクロス及びファイナライジングプレッシャー使用時の発動確率が大幅に上昇する。",
        "str_progress": "威力"
    },
    {
        "id": 857,
        "imageid": 566,
        "unknown1_6": 19,
        "str_name": "ファントムブラッドストーム",
        "unknown2_0": 5,
        "unknown10_139": 8192,
        "str_description": "大気を切り裂く程の速さで剣を数回振る。これによって発生した強大な力が爆風を起こし、周辺の敵にダメージを与える。同時に低い確率でマルチブーメランスラッシュが発動する。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 858,
        "imageid": 565,
        "unknown1_6": 19,
        "str_name": "マルチブーメランスラッシュ",
        "unknown2_0": 3,
        "unknown10_139": -32768,
        "str_description": "扇状に多数の幻影剣を飛ばす。飛んで行った幻影剣はブーメランのように戻りながらさらに強力な追加ダメージを与える。",
        "str_progress": "威力、範囲、確率"
    },
    {
        "id": 859,
        "imageid": 576,
        "unknown1_6": 19,
        "str_name": "ユニコーンズクライング",
        "unknown2_0": 4,
        "unknown10_139": -32768,
        "str_description": "自分を攻撃する敵に対して咆哮をあげる。放たれたユニコーンの強力な魔力が敵を萎縮させる。さらに広範囲に大きな咆哮をあげる。",
        "str_progress": "威力、範囲、持続時間"
    },
    {
        "id": 860,
        "imageid": 575,
        "unknown1_6": 19,
        "str_name": "アゲインストフィアー",
        "unknown2_0": 5,
        "unknown10_139": 12288,
        "str_description": "敵の攻撃に対して反撃態勢をとる。敵の攻撃を回避、または防御すると同時にイリュージョンシュートを数発発射する。",
        "str_progress": "発動確率、連射回数"
    },
    {
        "id": 861,
        "imageid": 569,
        "unknown1_6": 19,
        "str_name": "ファンタズムアボイド",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "危機的状況になると後方にすばやく回避し、魔力で生成した幻影の分身を残す。この幻影は1秒後に爆発し、周辺の敵にダメージを与える。",
        "str_progress": "威力、発動確率"
    },
    {
        "id": 862,
        "imageid": 559,
        "unknown1_6": 19,
        "str_name": "アンビートンツインストーム",
        "unknown2_0": 4,
        "unknown10_139": -16384,
        "str_description": "その場で回転する無敗の双剣術で周辺の敵に強力な攻撃を加える。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 863,
        "imageid": 863,
        "unknown1_6": 32,
        "str_name": "MB60_グロッキー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "グロッキー",
        "str_progress": ""
    },
    {
        "id": 864,
        "imageid": 864,
        "unknown1_6": 32,
        "str_name": "MB61_絶滅の光 必殺技用",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "広い範囲の敵に火の雨を降らす。",
        "str_progress": ""
    },
    {
        "id": 865,
        "imageid": 865,
        "unknown1_6": 32,
        "str_name": "MB62_必殺技-簡単",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "10秒間、敵に攻撃を受けたダメージに比例してスキルレベルを上げて使用。",
        "str_progress": ""
    },
    {
        "id": 866,
        "imageid": 866,
        "unknown1_6": 32,
        "str_name": "MB63_必殺技-普通",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "10秒間、敵に攻撃を受けたダメージに比例してスキルレベルを上げて使用。",
        "str_progress": ""
    },
    {
        "id": 867,
        "imageid": 867,
        "unknown1_6": 32,
        "str_name": "MB64_必殺技-難しい",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "10秒間、敵に攻撃を受けたダメージに比例してスキルレベルを上げて使用。",
        "str_progress": ""
    },
    {
        "id": 868,
        "imageid": 868,
        "unknown1_6": 32,
        "str_name": "MB65_必殺技-非常に難しい",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "10秒間、敵に攻撃を受けたダメージに比例してスキルレベルを上げて使用。",
        "str_progress": ""
    },
    {
        "id": 869,
        "imageid": 869,
        "unknown1_6": -1,
        "str_name": "ファイアボール爆破",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 870,
        "imageid": 870,
        "unknown1_6": -1,
        "str_name": "ドラゴンツイスター",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "剣を大きく振り回し、氷の竜を召喚する。氷竜は戦士の周りを旋回し、周囲の敵に大ダメージを与える。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 871,
        "imageid": 36,
        "unknown1_6": -1,
        "str_name": "ドラゴンストーム",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "剣を大きく振り回し、氷の竜を召喚する。氷竜は戦士の周りを旋回し、周囲の敵に大ダメージを与える。範囲内の敵は移動速度と魔法抵抗力が低下する。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 872,
        "imageid": 762,
        "unknown1_6": 22,
        "str_name": "サイトアンドトラック",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "自然と周辺の動きを把握し、一定周期ごとに敵に標識を残す。おかげで戦闘が起きた際はより迅速に対応することができる。",
        "str_progress": "無し"
    },
    {
        "id": 873,
        "imageid": 763,
        "unknown1_6": 22,
        "str_name": "水晶学",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "魔力水晶の効率をあげるための実用性の高い学問。この探求熱で魔力水晶の効率と活用度をもっと引き上げる。",
        "str_progress": "無し"
    },
    {
        "id": 874,
        "imageid": 764,
        "unknown1_6": 22,
        "str_name": "デアデブル",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "マスケッティアが突進し、敵を攻撃したり倒す際に一定の確率で弾丸を獲得する。",
        "str_progress": "無し"
    },
    {
        "id": 875,
        "imageid": 755,
        "unknown1_6": 23,
        "str_name": "連携錬成",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "繰り返しの爆破に興奮したアルケミストが、連携して錬成を行う。キャタパルトエンバーを3回重複すると周辺の敵に大きなダメージを与え、再びキャタパルトエンバーを詠唱して炎を残す。",
        "str_progress": "無し"
    },
    {
        "id": 876,
        "imageid": 757,
        "unknown1_6": 23,
        "str_name": "クリエイター",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "ホムンクルスと融合する際に、ホムンクルスの能力の一定値の分、アルケミストの能力が上昇し、初回融合時はホムンクルス固有効果を使用することができる。",
        "str_progress": "無し"
    },
    {
        "id": 877,
        "imageid": 758,
        "unknown1_6": 23,
        "str_name": "合併症",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "アルケミストの猛毒ポーションで合併症状を起こす。敵に病気効果が発動するたびに、ポーション回復速度、移動速度、水属性抵抗、攻撃速度が一定値減少する。",
        "str_progress": "無し"
    },
    {
        "id": 878,
        "imageid": 683,
        "unknown1_6": 23,
        "str_name": "キャタパルトエンバー",
        "unknown2_0": 3,
        "unknown10_139": 4096,
        "str_description": "エクスプロード、ダブルデトネイション、スパートフレア、アウトバーストが命中する際に、フライングエンバーが自動詠唱され炎を残す。火炎ダメージを受けた敵は火傷状態となり、炎が消えるまで火属性抵抗力が下がる。最大3回効果が重複する。",
        "str_progress": "威力, 火抵抗減少"
    },
    {
        "id": 879,
        "imageid": 685,
        "unknown1_6": 23,
        "str_name": "アウトブレイク",
        "unknown2_0": 5,
        "unknown10_139": 16384,
        "str_description": "フライングエンバー状態の敵に錬金術を詠唱し、広い距離で複数回の爆破を起こす。",
        "str_progress": "威力, 連打回数"
    },
    {
        "id": 880,
        "imageid": 756,
        "unknown1_6": 23,
        "str_name": "インフロードフレアー",
        "unknown2_0": 4,
        "unknown10_139": 16384,
        "str_description": "錬金術を詠唱し、指定した場所に爆破を起こす。爆破範囲内の敵は、火属性ダメージを受ける。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 881,
        "imageid": 696,
        "unknown1_6": 23,
        "str_name": "Bトルーパー : ヒューズイグノア",
        "unknown2_0": 2,
        "unknown10_139": 8192,
        "str_description": "錬金術で攻撃型ホムンクルスを錬成し召喚する。ホムンクルスイグノアがアルケミストと融合し攻撃に協力する。初融合の際は周辺の敵に大地属性のダメージを与え、以降は指定した敵を攻撃して大地属性のダメージを与える。全てのダメージはイグノアの攻撃力の影響を受ける。",
        "str_progress": "威力, 連打回数"
    },
    {
        "id": 882,
        "imageid": 697,
        "unknown1_6": 23,
        "str_name": "Bタンカー : ヒューズリアム",
        "unknown2_0": 2,
        "unknown10_139": -32768,
        "str_description": "錬金術で防御型ホムンクルスを錬成し召喚する。ホムンクルスリアムがアルケミストと融合し防御に協力する。初融合の際は3秒間無敵になる。以降の攻撃で広い範囲の敵に対し大地属性のダメージを与える。",
        "str_progress": "威力, 範囲, 確率"
    },
    {
        "id": 883,
        "imageid": 698,
        "unknown1_6": 23,
        "str_name": "Bヒーラー : ヒューズシンシア",
        "unknown2_0": 2,
        "unknown10_139": -32768,
        "str_description": "錬成した回復型ホムンクルスを召喚する。ホムンクルス「シンシア」がアルケミストと融合して味方の回復を支援する。最初融合時に、自分の最大体力の50を回復する。以後、10秒に1回、確率的に味方の体力を回復させる。",
        "str_progress": "威力, 範囲, 持続時間"
    },
    {
        "id": 884,
        "imageid": 759,
        "unknown1_6": 23,
        "str_name": "ホリフィックエリア",
        "unknown2_0": 3,
        "unknown10_139": 12288,
        "str_description": "一定範囲に猛毒ポーションをかけて錬金術を詠唱する。範囲内に入った敵に、攻撃周期毎に病気効果を残す。",
        "str_progress": "威力"
    },
    {
        "id": 885,
        "imageid": 770,
        "unknown1_6": 23,
        "str_name": "インベックションリキッド",
        "unknown2_0": 1,
        "unknown10_139": -16384,
        "str_description": "錬金術で作った毒物を取り出し、指定の敵に水属性ダメージを与えて病気効果を残す。既に病気効果を持っている対象の場合は効果が重複する。",
        "str_progress": "威力"
    },
    {
        "id": 886,
        "imageid": 761,
        "unknown1_6": 23,
        "str_name": "クリーピートリートメント",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "病気効果を持つ周辺の敵を爆発させる。周辺の敵は水属性のダメージを受け、病気効果重複回数によってダメージを倍に受ける。爆発された病気は効果を持たずに消える。",
        "str_progress": "威力"
    },
    {
        "id": 887,
        "imageid": 608,
        "unknown1_6": 22,
        "str_name": "キングメイト",
        "unknown2_0": 4,
        "unknown10_139": 4096,
        "str_description": "両手の銃を出し敵に連続発射。チェックマークの標識が刻まれた敵に対しては、致命打攻撃時に一定の確率でより強力なダメージを与える。累積標識の数によって大ダメージを与える確率が上がる。",
        "str_progress": "威力, 攻撃回数"
    },
    {
        "id": 888,
        "imageid": 624,
        "unknown1_6": 22,
        "str_name": "ファジスタントマーク",
        "unknown2_0": 2,
        "unknown10_139": 16384,
        "str_description": "素早く銃を出し、敵に向かって発射して標識を残す。同じ敵に複数回標識を刻むことができ、標識ができた敵を攻撃するとより大きなダメージを与えることができる。",
        "str_progress": "威力, 追加ダメージ, 標識最大重複個数"
    },
    {
        "id": 889,
        "imageid": 626,
        "unknown1_6": 22,
        "str_name": "バーストファイヤー",
        "unknown2_0": 2,
        "unknown10_139": 16384,
        "str_description": "左手の銃に強力な魔力を乗せて発砲。弾丸は攻撃線上にいる全ての敵を貫通し、標識が刻まれた敵に大きな爆破を起こしてダメージを与える。",
        "str_progress": "威力, 命中率, 確率"
    },
    {
        "id": 890,
        "imageid": 765,
        "unknown1_6": 22,
        "str_name": "カーテンタイム",
        "unknown2_0": 2,
        "unknown10_139": 8192,
        "str_description": "好きな場所に魔力水晶を投げて爆破させる。爆破した魔力水晶は周辺の敵にダメージを与え、自分が戦闘中に活用する魔力水晶を広い範囲に撒く。",
        "str_progress": "威力"
    },
    {
        "id": 891,
        "imageid": 607,
        "unknown1_6": 22,
        "str_name": "フォーカスドチョイス",
        "unknown2_0": 3,
        "unknown10_139": -32768,
        "str_description": "敵に向かって慎重に照準する。少し時間はかかるが必ず命中する弾丸を発射し大きなダメージを与える。保有中の魔力水晶を活用すると、周辺の敵にもダメージを与えることができる。",
        "str_progress": "威力"
    },
    {
        "id": 892,
        "imageid": 609,
        "unknown1_6": 22,
        "str_name": "グランド・フィナーレ",
        "unknown2_0": 5,
        "unknown10_139": -32768,
        "str_description": "素早く回転して両手の銃を敵に発射し、連続ダメージを与える。発射した弾丸は周辺の魔力水晶と連携し、より大きなダメージを与えることができる。",
        "str_progress": "威力, 攻撃回数"
    },
    {
        "id": 893,
        "imageid": 615,
        "unknown1_6": 22,
        "str_name": "グラインディンツポイント",
        "unknown2_0": 1,
        "unknown10_139": 12288,
        "str_description": "背中に背負った長銃を出し、魔力一つを消耗して敵に発射する。既存弾丸の代わりに特殊弾丸を使用したり、近接対象に使用した場合はより大きなダメージを与えることができる。",
        "str_progress": "威力"
    },
    {
        "id": 894,
        "imageid": 766,
        "unknown1_6": 22,
        "str_name": "パンピングヒット",
        "unknown2_0": 2,
        "unknown10_139": -16384,
        "str_description": "CPを消費して長銃の魔力を強制充填させる。稀に特殊弾丸が充填されることがある。",
        "str_progress": "多数の弾丸を装填する確率"
    },
    {
        "id": 895,
        "imageid": 618,
        "unknown1_6": 22,
        "str_name": "パーティーフルスィング",
        "unknown2_0": 5,
        "unknown10_139": -16384,
        "str_description": "全ての魔力を消耗して長銃を発射し、対象と周辺にダメージを与える。残り魔力と消耗弾丸によってその威力が異なる。特殊弾丸を使用する場合、より大きなダメージを与えることができる。",
        "str_progress": "威力"
    },
    {
        "id": 896,
        "imageid": 896,
        "unknown1_6": -1,
        "str_name": "キャタパルトエンバー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "エクスプロード、ダブルデトネイション、スパートフレア、アウトバーストが命中する際に、フライングエンバーが自動詠唱され炎を残す。火炎ダメージを受けた敵は火傷状態となり、炎が消えるまで火属性抵抗力が下がる。最大3回効果が重複する。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 897,
        "imageid": 897,
        "unknown1_6": -1,
        "str_name": "ヒューズイグノア発動",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 898,
        "imageid": 898,
        "unknown1_6": -1,
        "str_name": "Bトルーパー : ヒューズイグノア",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "錬金術で攻撃型ホムンクルスを錬成し召喚する。ホムンクルスイグノアがアルケミストと融合し攻撃に協力する。初融合の際は周辺の敵に大地属性のダメージを与え、以降は指定した敵を攻撃して大地属性のダメージを与える。全てのダメージはイグノアの攻撃力の影響を受ける。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 899,
        "imageid": 899,
        "unknown1_6": -1,
        "str_name": "グランド・フィナーレ水晶爆破",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 900,
        "imageid": 900,
        "unknown1_6": 32,
        "str_name": "シールドクラフト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 901,
        "imageid": 901,
        "unknown1_6": 32,
        "str_name": "エレメントポスト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 902,
        "imageid": 902,
        "unknown1_6": 32,
        "str_name": "エーテルシェル",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 903,
        "imageid": 903,
        "unknown1_6": 32,
        "str_name": "ハローナイトアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 904,
        "imageid": 904,
        "unknown1_6": 32,
        "str_name": "オビティアンスキル",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 905,
        "imageid": 905,
        "unknown1_6": -1,
        "str_name": "ヒューズリアム発動",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 906,
        "imageid": 906,
        "unknown1_6": -1,
        "str_name": "Bタンカー : ヒューズリアム",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "錬金術で防御型ホムンクルスを錬成し召喚する。ホムンクルスリアムがアルケミストと融合し防御に協力する。初融合の際はバリア生成。以降の攻撃で広い範囲の敵に対し大地属性のダメージを与える。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 907,
        "imageid": 907,
        "unknown1_6": -1,
        "str_name": "ヒューズシンシア発動",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 908,
        "imageid": 908,
        "unknown1_6": -1,
        "str_name": "バーストファイヤー爆破",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 909,
        "imageid": 909,
        "unknown1_6": -1,
        "str_name": "フォーカスドチョイス水晶爆破",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 910,
        "imageid": 52,
        "unknown1_6": -1,
        "str_name": "ファイアーエンチャント(O)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "味方一人の武器に火の力を吹き入れて攻撃力を高める",
        "str_progress": "上昇率, 持続時間"
    },
    {
        "id": 911,
        "imageid": 58,
        "unknown1_6": -1,
        "str_name": "ファウンテンバリア(O)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "指定した味方の周りに強力な水の防御膜を形成して防御力を高める",
        "str_progress": "防御力, 持続時間"
    },
    {
        "id": 912,
        "imageid": 64,
        "unknown1_6": -1,
        "str_name": "ヘイスト(O)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "一人の味方の空気抵抗を減らして、攻撃速度と移動速度を増加させる",
        "str_progress": "速度増加率, 持続時間"
    },
    {
        "id": 913,
        "imageid": 68,
        "unknown1_6": -1,
        "str_name": "アースヒール(O)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "地脈の気を使って、味方の体力を一定比率で回復する",
        "str_progress": "回復率"
    },
    {
        "id": 914,
        "imageid": 116,
        "unknown1_6": -1,
        "str_name": "ブレッシング(O)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "神の祝福を受けて、味方の体力の一定量を瞬時に回復させ、異常系統の状態異常も防ぐ。また、味方の武器に光の攻撃効果を付与する",
        "str_progress": "上昇率, 威力, 抵抗力, 持続時間"
    },
    {
        "id": 915,
        "imageid": 117,
        "unknown1_6": -1,
        "str_name": "プロテクティングエビル(O)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "味方一人の防御力を高める。また、低下系統の状態異常を防ぐ",
        "str_progress": "防御力, 抵抗力, 持続時間"
    },
    {
        "id": 916,
        "imageid": 111,
        "unknown1_6": -1,
        "str_name": "リザレクション(O)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "行動不能になった味方を復活して、体力を回復する。レベルが上がると復活した味方の能力値低下状態も回復する事が出来る",
        "str_progress": "回復量, ペナルティー回復量"
    },
    {
        "id": 917,
        "imageid": 110,
        "unknown1_6": -1,
        "str_name": "フルヒーリング(O)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "指定した味方の体力を大幅に回復",
        "str_progress": "射程距離, 回復量"
    },
    {
        "id": 918,
        "imageid": 139,
        "unknown1_6": -1,
        "str_name": "タウンポータル(O)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "近くの安全な町へと通じるポータルを開く。このポータルは一方通行で、持続時間内であれば他のプレイヤーたちも使用できる",
        "str_progress": "持続時間, 移動距離"
    },
    {
        "id": 919,
        "imageid": 144,
        "unknown1_6": -1,
        "str_name": "ホーリークロス(O)",
        "unknown2_0": 1,
        "unknown10_139": 3,
        "str_description": "巨大な光の十字架を召喚して、指定した周囲にいる一定半径内の敵を攻撃。その力でパーティーメンバーの体力を回復する。知識値によって回復量が増加する。",
        "str_progress": "威力、回復量、範囲"
    },
    {
        "id": 920,
        "imageid": 54,
        "unknown1_6": -1,
        "str_name": "メテオシャワー(O)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "星界より巨大な隕石を召喚して、広範囲の敵を攻撃する",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 921,
        "imageid": 180,
        "unknown1_6": -1,
        "str_name": "急所攻撃(O)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵の急所を攻撃し、一定の確率で敵の体力を現在の半分に減らす致命打を与える。直後、左足スキルのレベルがしばらく上昇",
        "str_progress": "威力, 攻撃速度, 決定打確率"
    },
    {
        "id": 922,
        "imageid": 922,
        "unknown1_6": 32,
        "str_name": "グレートレンジヒールPOT",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "広範囲領域にいるモンスターの傷を回復する",
        "str_progress": ""
    },
    {
        "id": 923,
        "imageid": 923,
        "unknown1_6": 32,
        "str_name": "パワーヒーリング(M)",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "指定したパーティーメンバーの体力をほぼ完全に回復",
        "str_progress": " "
    },
    {
        "id": 924,
        "imageid": 924,
        "unknown1_6": 32,
        "str_name": "ソウルクラッシュ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "闇の力を込めて振り下ろす",
        "str_progress": "闇ダメージ, 物理ダメージ, 持続ダメージ"
    },
    {
        "id": 925,
        "imageid": 925,
        "unknown1_6": 32,
        "str_name": "ソウルリィープ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "鎌を高く持ち上げて斜めに切り降ろして魂を収穫する。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 926,
        "imageid": 926,
        "unknown1_6": 32,
        "str_name": "大嵐斬り",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "吹き荒れる刃の竜巻を起こし、敵を吹き飛ばす。斬ると同時に硬直させる。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 927,
        "imageid": 927,
        "unknown1_6": 32,
        "str_name": "ダブルスラッシュ(B)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "モンスターが剣で行う2連打攻撃",
        "str_progress": ""
    },
    {
        "id": 928,
        "imageid": 928,
        "unknown1_6": 32,
        "str_name": "フレイムストーム(B)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "基本的な火魔法攻撃。強力な敵が使用する。",
        "str_progress": ""
    },
    {
        "id": 929,
        "imageid": 929,
        "unknown1_6": 32,
        "str_name": "ウォーターキャノン(B)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "基本的な水魔法攻撃。強力な敵が使用する。",
        "str_progress": ""
    },
    {
        "id": 930,
        "imageid": 930,
        "unknown1_6": 32,
        "str_name": "岩投げ(B)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "基本的な大地魔法攻撃。強力な敵が使用する。",
        "str_progress": ""
    },
    {
        "id": 931,
        "imageid": 931,
        "unknown1_6": 32,
        "str_name": "ライトニング(B)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "基本的な雷魔法攻撃。強力な敵が使用する。",
        "str_progress": ""
    },
    {
        "id": 932,
        "imageid": 932,
        "unknown1_6": 32,
        "str_name": "ライトビーム(B)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "前方の敵に光の息を吐き出して攻撃する。",
        "str_progress": ""
    },
    {
        "id": 933,
        "imageid": 933,
        "unknown1_6": 32,
        "str_name": "メイスアタック(B)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "メイスを使ったスケルトンキングの基本攻撃",
        "str_progress": ""
    },
    {
        "id": 935,
        "imageid": 935,
        "unknown1_6": 32,
        "str_name": "ダークネススウィング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "周辺を荒らす、破壊的な攻撃",
        "str_progress": ""
    },
    {
        "id": 936,
        "imageid": 936,
        "unknown1_6": 32,
        "str_name": "破滅の連撃",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "スケルトンキングの連続攻撃",
        "str_progress": ""
    },
    {
        "id": 937,
        "imageid": 937,
        "unknown1_6": 32,
        "str_name": "リィーピングラッシュ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "バンシーが鎌を持ち上げて敵を追跡",
        "str_progress": ""
    },
    {
        "id": 938,
        "imageid": 938,
        "unknown1_6": 32,
        "str_name": "魂収穫",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "指定した地点周囲の敵を攻撃する多数の分身を生み出し、同時に攻撃する。",
        "str_progress": "威力, 命中率, 分身個数"
    },
    {
        "id": 939,
        "imageid": 939,
        "unknown1_6": -1,
        "str_name": "ファイアー・アンド・アイス(リピ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 940,
        "imageid": 940,
        "unknown1_6": 32,
        "str_name": "MB66_右手攻撃",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "近接基本攻撃",
        "str_progress": ""
    },
    {
        "id": 941,
        "imageid": 941,
        "unknown1_6": 32,
        "str_name": "MB67_破滅の進撃",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "ジャンプして両手で地面を打ち叩く。",
        "str_progress": ""
    },
    {
        "id": 942,
        "imageid": 942,
        "unknown1_6": 32,
        "str_name": "MB68_足鳴らし",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "足を鳴らし、範囲打撃",
        "str_progress": ""
    },
    {
        "id": 943,
        "imageid": 943,
        "unknown1_6": 32,
        "str_name": "リィーピングアタック(B)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "巨大な鎌で行うバンシーの基本攻撃",
        "str_progress": ""
    },
    {
        "id": 944,
        "imageid": 944,
        "unknown1_6": 32,
        "str_name": "MB69_悪魔の咆哮",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "悪魔がたけり立つ",
        "str_progress": ""
    },
    {
        "id": 945,
        "imageid": 945,
        "unknown1_6": 32,
        "str_name": "MB70_ M斬りつけ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "近接基本攻撃",
        "str_progress": ""
    },
    {
        "id": 946,
        "imageid": 946,
        "unknown1_6": 32,
        "str_name": "MB71_横斬り",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "横斬りに全力を込め、剣気を打ち出す。",
        "str_progress": ""
    },
    {
        "id": 947,
        "imageid": 947,
        "unknown1_6": 32,
        "str_name": "MB72_降霊術",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "地獄の魂を呼び覚ます。",
        "str_progress": ""
    },
    {
        "id": 948,
        "imageid": 948,
        "unknown1_6": 32,
        "str_name": "MB73_ホーリーデストロイヤー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ゲリオ専用スキル。その場で飛び上がって地面に急降下し、大きな衝撃を引き起こす。",
        "str_progress": ""
    },
    {
        "id": 949,
        "imageid": 949,
        "unknown1_6": 32,
        "str_name": "MB74_歪んだ信頼",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "被ダメージを反射し、体力を回復する。",
        "str_progress": ""
    },
    {
        "id": 950,
        "imageid": 950,
        "unknown1_6": 32,
        "str_name": "MB75_歪んだ信頼-普通",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "被ダメージを反射し、体力を回復する。",
        "str_progress": ""
    },
    {
        "id": 951,
        "imageid": 951,
        "unknown1_6": 32,
        "str_name": "MB76_歪んだ信頼-難しい",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "被ダメージを反射し、体力を回復する。",
        "str_progress": ""
    },
    {
        "id": 952,
        "imageid": 952,
        "unknown1_6": 32,
        "str_name": "ゲリオ_アースクエイク(M)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "自分の周囲に地震を発生させ、攻撃する。敵はしばらく麻痺する。パターン用。",
        "str_progress": "威力"
    },
    {
        "id": 953,
        "imageid": 953,
        "unknown1_6": 32,
        "str_name": "粉砕",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "両手で叩き壊す。",
        "str_progress": ""
    },
    {
        "id": 954,
        "imageid": 954,
        "unknown1_6": 32,
        "str_name": "MB77_歪んだ信頼-非常に難しい",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "被ダメージを反射し、体力を回復する。",
        "str_progress": ""
    },
    {
        "id": 956,
        "imageid": 956,
        "unknown1_6": -1,
        "str_name": "追撃後、自爆[M]ガイド",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 957,
        "imageid": 957,
        "unknown1_6": 32,
        "str_name": "パターン用_破滅の進撃",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": ""
    },
    {
        "id": 958,
        "imageid": 958,
        "unknown1_6": 32,
        "str_name": "追撃後、自爆[M]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": ""
    },
    {
        "id": 959,
        "imageid": 959,
        "unknown1_6": 32,
        "str_name": "追撃後、自爆[M] 非アクション",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 960,
        "imageid": 960,
        "unknown1_6": 32,
        "str_name": "追撃後、自爆[M] アクション",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 961,
        "imageid": 961,
        "unknown1_6": -1,
        "str_name": "ホイールウィンドプロテクター・",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 962,
        "imageid": 962,
        "unknown1_6": -1,
        "str_name": "タンクガーシュ・後続打",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 963,
        "imageid": 792,
        "unknown1_6": -1,
        "str_name": "ストレートクラッカー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 964,
        "imageid": 792,
        "unknown1_6": -1,
        "str_name": "クロスクラッカー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 965,
        "imageid": 965,
        "unknown1_6": -1,
        "str_name": "ゲイルパンチスタン",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 966,
        "imageid": 966,
        "unknown1_6": 32,
        "str_name": "槍の連続突き[M]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "100クリティカルで何度も突く。",
        "str_progress": " "
    },
    {
        "id": 967,
        "imageid": 967,
        "unknown1_6": 32,
        "str_name": "槍回し[M]",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "槍を大きく振り回し、多数の敵を攻撃して押し出す。押された敵は衝撃により攻撃の命中率が低下する。",
        "str_progress": " "
    },
    {
        "id": 968,
        "imageid": 968,
        "unknown1_6": 32,
        "str_name": "鎌斬り[M]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "鎌を振り回して敵にダメージを与え、出血状態にする。",
        "str_progress": " "
    },
    {
        "id": 969,
        "imageid": 969,
        "unknown1_6": 32,
        "str_name": "鎌大斬り[M]",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "鎌を大きく振り回し、自分の前の多数の敵にダメージを与え、出血状態にする。",
        "str_progress": " "
    },
    {
        "id": 970,
        "imageid": 970,
        "unknown1_6": 32,
        "str_name": "噛み付く[M]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵を噛み付いて負傷を負わせる。負傷を負った敵は動きが鈍くなる。",
        "str_progress": " "
    },
    {
        "id": 971,
        "imageid": 971,
        "unknown1_6": 32,
        "str_name": "回し蹴り[M]",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "前足を振り回し、相手を蹴る。ダメージを受けた敵は押し出され、出血状態になる。",
        "str_progress": " "
    },
    {
        "id": 972,
        "imageid": 972,
        "unknown1_6": 32,
        "str_name": "MB78_雷牙",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "雷が流れる牙で噛み付きダメージを与え、感電状態にする。",
        "str_progress": ""
    },
    {
        "id": 973,
        "imageid": 973,
        "unknown1_6": 32,
        "str_name": "MB79_雷爪",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "雷が流れる爪でひっかきダメージを与え、感電状態にする。",
        "str_progress": ""
    },
    {
        "id": 974,
        "imageid": 974,
        "unknown1_6": 32,
        "str_name": "MB80_雷の咆哮",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "雷の力がこもった咆哮を放ち、感電した敵を感電爆破させる。",
        "str_progress": ""
    },
    {
        "id": 975,
        "imageid": 975,
        "unknown1_6": 32,
        "str_name": "MB81_頭に噛み付く",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵の頭に噛み付いてダメージを与え、出血状態異常にする。",
        "str_progress": " "
    },
    {
        "id": 976,
        "imageid": 976,
        "unknown1_6": 32,
        "str_name": "MB82_刺束",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "大量の毒針を発射する。",
        "str_progress": ""
    },
    {
        "id": 977,
        "imageid": 977,
        "unknown1_6": 32,
        "str_name": "MB83_根の爆発投射体",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "根を出して土中から突き出させる。",
        "str_progress": ""
    },
    {
        "id": 978,
        "imageid": 978,
        "unknown1_6": -1,
        "str_name": "アリドネ根元の爆発",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 979,
        "imageid": 979,
        "unknown1_6": 32,
        "str_name": "雷球発射",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "雷の力がこもった咆哮を放ち、感電した敵を感電爆破させる。",
        "str_progress": ""
    },
    {
        "id": 980,
        "imageid": 980,
        "unknown1_6": -1,
        "str_name": "雷球衝撃波",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 981,
        "imageid": 981,
        "unknown1_6": 32,
        "str_name": "クレセントライトニング[M]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "槍を地面に突き刺して槍を媒体に稲妻を召喚し、さらに広い範囲にいる敵にダメージを与える。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 982,
        "imageid": 982,
        "unknown1_6": -1,
        "str_name": "アリドネ根元の爆発_頭",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 983,
        "imageid": 983,
        "unknown1_6": 32,
        "str_name": "ウォータードロップ[M]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "毒の水滴投下",
        "str_progress": "威力、範囲"
    },
    {
        "id": 984,
        "imageid": 984,
        "unknown1_6": 32,
        "str_name": "大地爆発[M]",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "大地の中の自然のマナを爆発させる。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 985,
        "imageid": 985,
        "unknown1_6": 32,
        "str_name": "MB83_刺発射",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "大量の毒針を発射する。",
        "str_progress": ""
    },
    {
        "id": 986,
        "imageid": 986,
        "unknown1_6": 32,
        "str_name": "MB83_噛み付く",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵の頭に噛み付いてダメージを与え、出血状態異常にする。",
        "str_progress": " "
    },
    {
        "id": 987,
        "imageid": 987,
        "unknown1_6": -1,
        "str_name": "MB78_雷の毛皮",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "雷の流れる牙で噛み付きダメージを与え、感電状態にする。",
        "str_progress": ""
    },
    {
        "id": 988,
        "imageid": 988,
        "unknown1_6": 32,
        "str_name": "MB84_根の爆発投射体(子)",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "根を出して土中から突き出させる。",
        "str_progress": ""
    },
    {
        "id": 989,
        "imageid": 989,
        "unknown1_6": 32,
        "str_name": "ワイルドスタンプ(M)III",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "ジャンプの後、着地点で剣を振り回し、その周囲の敵にダメージを与える。着地点の敵は押し出される。",
        "str_progress": "威力"
    },
    {
        "id": 990,
        "imageid": 990,
        "unknown1_6": -1,
        "str_name": "グライディングファイアー_複製",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 991,
        "imageid": 991,
        "unknown1_6": -1,
        "str_name": "フレームアロー_複製",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 992,
        "imageid": 992,
        "unknown1_6": -1,
        "str_name": "フローズンアロー_複製",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 993,
        "imageid": 993,
        "unknown1_6": -1,
        "str_name": "デュアルアロー_複製",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 994,
        "imageid": 994,
        "unknown1_6": -1,
        "str_name": "ハーモニーアロー_複製",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 995,
        "imageid": 995,
        "unknown1_6": -1,
        "str_name": "グレーシャルシャード_複製",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 996,
        "imageid": 996,
        "unknown1_6": -1,
        "str_name": "リワインドマーカー_複製",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 997,
        "imageid": 997,
        "unknown1_6": -1,
        "str_name": "ウォーターフォール_複製",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 998,
        "imageid": 998,
        "unknown1_6": -1,
        "str_name": "シーカーアロー_追加効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 999,
        "imageid": 999,
        "unknown1_6": 32,
        "str_name": "ソードアタック[騎神]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "近接基本攻撃",
        "str_progress": ""
    },
    {
        "id": 1000,
        "imageid": 1000,
        "unknown1_6": 32,
        "str_name": "テイルスピアー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 1001,
        "imageid": 280,
        "unknown1_6": 32,
        "str_name": "フレームリング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "ケルビーの周囲に円形の火炎の壁を形成する。火炎に触れた敵に熱気でダメージを与える。",
        "str_progress": "威力、持続時間"
    },
    {
        "id": 1002,
        "imageid": 1002,
        "unknown1_6": 32,
        "str_name": "ワインディングクロー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 1003,
        "imageid": 287,
        "unknown1_6": 32,
        "str_name": "リフトアップ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵の周囲に突風を巻き起こして、敵の残った体力に比例する攻撃を与える。着地技術がある敵には効果が薄く、高レベルの敵は持ち上げることすら出来ない。",
        "str_progress": "威力, 限界レベル"
    },
    {
        "id": 1004,
        "imageid": 288,
        "unknown1_6": 32,
        "str_name": "ゲイルパンチ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵に風を圧縮したロケットパンチを放つ。命中するとその周囲に竜巻が生じて、周囲の敵も打撃を受ける。",
        "str_progress": "威力, 範囲, 持続時間"
    },
    {
        "id": 1005,
        "imageid": 289,
        "unknown1_6": 32,
        "str_name": "バキュームポイント",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "特定の場所に固定させた真空のホールを生成する。ホールの影響圏内にいる敵はホールの影響で攻撃しにくくなり、持続的に若干のダメージを与える。",
        "str_progress": "威力, 範囲, 持続時間, 召喚獣の防御力\/抵抗力"
    },
    {
        "id": 1006,
        "imageid": 1006,
        "unknown1_6": 32,
        "str_name": "ブロウフィッシュアイシクル",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 1007,
        "imageid": 284,
        "unknown1_6": 32,
        "str_name": "バブルガムエクスプロージョン",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "スウェルファーが作り出した爆発する泡を空中から落下させる。炸裂した水球は広範囲の敵にダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1008,
        "imageid": 285,
        "unknown1_6": 32,
        "str_name": "アクアバンブー",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "喚魔法により地下水脈の流れを操り、一定範囲の地域の竹を急速に成長させる。鋭い竹に触れた敵は持続的にダメージを受ける。また、エリア内にいる味方のクリティカルヒット確率を上昇させる。",
        "str_progress": "威力"
    },
    {
        "id": 1009,
        "imageid": 291,
        "unknown1_6": 32,
        "str_name": "ヘッジャーヘッジング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "周囲の土を掘って、移動を防ぐ障害物を形成する。",
        "str_progress": "障害物の長さ, 障害物の体力"
    },
    {
        "id": 1010,
        "imageid": 292,
        "unknown1_6": 32,
        "str_name": "アルマジロローリング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "アルマジロのように体を丸くしたヘッジャーが命令場所まで回転しながら突進する。周辺に持続的ダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1011,
        "imageid": 1011,
        "unknown1_6": -1,
        "str_name": "ファイアーボルト[Pet]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が戦闘中の場合、ミニペットが敵に小さな火炎を発射する",
        "str_progress": "ダメージ, 発動確率"
    },
    {
        "id": 1012,
        "imageid": 1012,
        "unknown1_6": -1,
        "str_name": "アイスボルト[Pet]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が戦闘中の場合、ミニペットが敵に冷たい氷の結晶を発射して攻撃する",
        "str_progress": "ダメージ, 発動確率"
    },
    {
        "id": 1013,
        "imageid": 1013,
        "unknown1_6": -1,
        "str_name": "ストームボルト[Pet]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が戦闘中の場合、ミニペットが敵に風の刃を投げ飛ばし攻撃する",
        "str_progress": "ダメージ, 発動確率"
    },
    {
        "id": 1014,
        "imageid": 1014,
        "unknown1_6": -1,
        "str_name": "ロックバウンディング[Pet]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が戦闘中の場合、ミニペットが敵の足首と足の周囲に小石を積み上げて敵の動きを封鎖する",
        "str_progress": "ダメージ, 発動確率"
    },
    {
        "id": 1015,
        "imageid": 1015,
        "unknown1_6": -1,
        "str_name": "ライトビーム[Pet]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が戦闘中の場合、ミニペットが敵に眩しいほどの光線を集中して打ち込み攻撃をする",
        "str_progress": "ダメージ, 発動確率"
    },
    {
        "id": 1016,
        "imageid": 1016,
        "unknown1_6": -1,
        "str_name": "地獄の矛[Pet]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が戦闘中である場合、ミニペットが地獄の監獄にある鉄の矛を地中から召喚し、それを持って敵を突いて攻撃する",
        "str_progress": "ダメージ, 発動確率"
    },
    {
        "id": 1017,
        "imageid": 1017,
        "unknown1_6": -1,
        "str_name": "火の力",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "火の力を持主に付与し、持主の能力を上昇させる",
        "str_progress": "力"
    },
    {
        "id": 1018,
        "imageid": 1018,
        "unknown1_6": -1,
        "str_name": "水の知恵",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "水の知恵を持主に付与し、持主の能力を上昇させる",
        "str_progress": "知恵"
    },
    {
        "id": 1019,
        "imageid": 1019,
        "unknown1_6": -1,
        "str_name": "風の敏捷",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "風の敏捷さを持主に付与し、持主の能力を上昇させる",
        "str_progress": "敏捷さ"
    },
    {
        "id": 1020,
        "imageid": 1020,
        "unknown1_6": -1,
        "str_name": "大地の健康",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "大地の健康を持主に付与し、持主の能力を上昇させる",
        "str_progress": "健康"
    },
    {
        "id": 1021,
        "imageid": 1021,
        "unknown1_6": -1,
        "str_name": "光の知識",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "光の知識を持主に付与し、持主の能力を上昇させる",
        "str_progress": "知識"
    },
    {
        "id": 1022,
        "imageid": 1022,
        "unknown1_6": -1,
        "str_name": "闇のカリスマ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "闇のカリスマを持主に付与し、持主の能力を上昇させる",
        "str_progress": "カリスマ"
    },
    {
        "id": 1023,
        "imageid": 1023,
        "unknown1_6": -1,
        "str_name": "ファーストエイド[Pet]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が戦闘中の場合、ミニペットが持主の落ちた体力を回復してくれる。ただし、一時的な処置の為、時間が経過すると再び傷口が開いてしまう",
        "str_progress": "回復数値, 発動確率"
    },
    {
        "id": 1024,
        "imageid": 1024,
        "unknown1_6": -1,
        "str_name": "ヒーリング[Pet]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が戦闘中の場合、ミニペットが持主の体力を少しだけ即時に回復",
        "str_progress": "回復数値, 発動確率"
    },
    {
        "id": 1025,
        "imageid": 1025,
        "unknown1_6": -1,
        "str_name": "リゼネレイション[Pet]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が戦闘中の場合、ミニペットが持主の体力を持続的に回復させる",
        "str_progress": "回復数値, 発動確率"
    },
    {
        "id": 1026,
        "imageid": 1026,
        "unknown1_6": -1,
        "str_name": "キュア[Pet]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が戦闘中の場合、ミニペットが持主にかけられた状態異常を治療してくれる",
        "str_progress": "発動確率"
    },
    {
        "id": 1027,
        "imageid": 1027,
        "unknown1_6": -1,
        "str_name": "リザレクション[Pet]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットが行動不能になった持主を復活させ、体力を回復させてくれる。スキルレベルが上がると復活した時の持主の能力値低下状態も回復させることが出来る",
        "str_progress": "発動確率, 能力値ペナルティー減少率, 回復数値"
    },
    {
        "id": 1028,
        "imageid": 1028,
        "unknown1_6": -1,
        "str_name": "チャージング[Pet]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が戦闘中の場合、ミニペットが持主のCPを充填させてくれる。強い魔法バリアの影響で魔法抵抗力が瞬間的に上昇する",
        "str_progress": "発動確率, CP充填量"
    },
    {
        "id": 1029,
        "imageid": 1029,
        "unknown1_6": -1,
        "str_name": "トレジャーハンター",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主に財宝ハンターの能力を付与する。ミニペットの持主は秘密ダンジョンの封じられた門や箱などをより簡単に破壊できるようになる",
        "str_progress": "オブジェクト破壊能力"
    },
    {
        "id": 1030,
        "imageid": 1030,
        "unknown1_6": -1,
        "str_name": "アイテムコレクター",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主の代わりに周辺にあるアイテムを拾って来てくれる。レベルが上がると、より広範囲にある良いアイテムを探せるようになる。\r\n- 1Lv：消耗品\r\n- 2Lv：普通アイテム\r\n- 3Lv：レアアイテム\r\n- 4Lv：ユニークアイテム\r\n- 5Lv：スーパーユニークアイテム",
        "str_progress": "発動確率, ルーチング可能アイテムランク"
    },
    {
        "id": 1031,
        "imageid": 1031,
        "unknown1_6": -1,
        "str_name": "トラップイベーダー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主にトラップ回避能力を付与する。ミニペットの持主はトラップにかかっても回避できる確率が上昇する",
        "str_progress": "トラップ回避率"
    },
    {
        "id": 1032,
        "imageid": 1032,
        "unknown1_6": -1,
        "str_name": "ゴールドホルダー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主に代わって周辺にあるゴールドを拾って来てくれる。\r\n- 1Lv：10Gold 以下\r\n- 2Lv：20Gold 以下\r\n- 3Lv：40Gold 以下\r\n- 4Lv：80Gold 以下\r\n- 5Lv：制限なし",
        "str_progress": "発動確率, ゴールド獲得量"
    },
    {
        "id": 1033,
        "imageid": 1033,
        "unknown1_6": -1,
        "str_name": "アドベンチャーラー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主に冒険家の能力を付与し、戦闘不能後に復活した際、減少してしまう能力値のペナルティを少なくしてくれる",
        "str_progress": "デスペナルティ減少"
    },
    {
        "id": 1034,
        "imageid": 1034,
        "unknown1_6": -1,
        "str_name": "ロックスミスマスター",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主に錠名人の能力を付与し、持主が使用する鍵の効率を上昇させる",
        "str_progress": "鍵解体レベル"
    },
    {
        "id": 1035,
        "imageid": 1035,
        "unknown1_6": -1,
        "str_name": "エンブレスガーネット",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "柘榴石の能力を持主に与え、持主の火抵抗力を上昇させる",
        "str_progress": "火抵抗力"
    },
    {
        "id": 1036,
        "imageid": 1036,
        "unknown1_6": -1,
        "str_name": "エンブレスアクアマリン",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "アクアマリンの能力を持主に与え、持主の水抵抗力を上昇させる",
        "str_progress": "水抵抗力"
    },
    {
        "id": 1037,
        "imageid": 1037,
        "unknown1_6": -1,
        "str_name": "エンブレスペリドット",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "カンラン石の能力を持主に与え、持主の風抵抗力を上昇させる",
        "str_progress": "風抵抗力"
    },
    {
        "id": 1038,
        "imageid": 1038,
        "unknown1_6": -1,
        "str_name": "エンブレスアンバー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "琥珀の能力を持主に与え、持主の大地抵抗力を上昇させる",
        "str_progress": "大地抵抗力"
    },
    {
        "id": 1039,
        "imageid": 1039,
        "unknown1_6": -1,
        "str_name": "エンブレスパール",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "真珠の能力を持主に与え、持主の光抵抗力を上昇させる",
        "str_progress": "光抵抗力"
    },
    {
        "id": 1040,
        "imageid": 1040,
        "unknown1_6": -1,
        "str_name": "エンブレスブラックパール",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "黒真珠の能力を持主に与え、持主の闇抵抗力を上昇させる",
        "str_progress": "闇抵抗力"
    },
    {
        "id": 1041,
        "imageid": 1041,
        "unknown1_6": -1,
        "str_name": "リザードフレアー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "サラマンダが持主には害を成さない熱い空気を噴出し、持主を攻撃する周囲の敵にダメージを与える",
        "str_progress": "ダメージ, 発動確率"
    },
    {
        "id": 1042,
        "imageid": 1042,
        "unknown1_6": -1,
        "str_name": "ヴェッセルブロウアップ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ウンディーネが持主の周囲にある空気中の水分を凝縮させ、持主を攻撃する敵たちを凍らせてしまう",
        "str_progress": "ダメージ, 発動確率, 持続時間"
    },
    {
        "id": 1043,
        "imageid": 1043,
        "unknown1_6": -1,
        "str_name": "アコースティックマイン",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "シルフィーが事前に用意した音波地雷で持主を攻撃する周囲の敵たちにダメージを与える",
        "str_progress": "ダメージ, 発動確率"
    },
    {
        "id": 1044,
        "imageid": 1044,
        "unknown1_6": -1,
        "str_name": "インタークェイク",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ノームの魔術ハンマーで大地を打ち、持主を攻撃する周囲の敵たちにダメージを与える強い衝撃波を発生させる",
        "str_progress": "ダメージ, 発動確率"
    },
    {
        "id": 1045,
        "imageid": 1045,
        "unknown1_6": -1,
        "str_name": "フォトンビーコン",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ウィスプーの強い光を光子化させ、周辺に噴出させる技。持主の周囲にいる敵たちに強い威力を発揮する",
        "str_progress": "ダメージ, 範囲, 発動確率"
    },
    {
        "id": 1046,
        "imageid": 1046,
        "unknown1_6": -1,
        "str_name": "影法師の泉",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "シャドウの闇の幕をあっという間に周辺に拡大させ、持主を攻撃する周囲の敵たちに闇の攻撃を与える",
        "str_progress": "ダメージ, 範囲, 発動確率"
    },
    {
        "id": 1047,
        "imageid": 1047,
        "unknown1_6": -1,
        "str_name": "テイルエクステンション",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "サラマンダの尻尾を拡大させ、リザードフレアーの爆発範囲と発動確率を上昇させる",
        "str_progress": "範囲, 発動確率"
    },
    {
        "id": 1048,
        "imageid": 1048,
        "unknown1_6": -1,
        "str_name": "ビッグボトル",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "容量の大きなウォーターボトルを手にしたウンディーネは、ヴェッセルブロウアップをもっと頻繁に、そしてもっと遠くにいる敵にまで威力を発揮させることができる",
        "str_progress": "範囲, 発動確率"
    },
    {
        "id": 1049,
        "imageid": 1049,
        "unknown1_6": -1,
        "str_name": "ウェーブリバーバー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "効果的な音波反響板の設置により、アコースティックマインの発動確率と射程距離を上昇させる",
        "str_progress": "範囲, 発動確率"
    },
    {
        "id": 1050,
        "imageid": 1050,
        "unknown1_6": -1,
        "str_name": "アンプリチュードログ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "大地の振幅を測定し、より効率的なインタークェイクの使用が可能になる。インタークェイクの発動確率と範囲を上昇させる",
        "str_progress": "範囲, 発動確率"
    },
    {
        "id": 1051,
        "imageid": 1051,
        "unknown1_6": -1,
        "str_name": "コンカーブグラス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "光子を効率的に集められる凹面反射鏡のおかげで、フォトンビーコンの発動確率と爆発範囲を増加させる",
        "str_progress": "範囲, 発動確率"
    },
    {
        "id": 1052,
        "imageid": 1052,
        "unknown1_6": -1,
        "str_name": "ダークボックス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "闇を閉じ込める闇幕ボックス。シルエットインフィトレーションの発動確率と爆発範囲を増加させる",
        "str_progress": "範囲, 発動確率"
    },
    {
        "id": 1053,
        "imageid": 1053,
        "unknown1_6": -1,
        "str_name": "サラマンダの背びれ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "サラマンダの背中にあるたくさんの熱い角で、サラマンダが使用する‘ファイアボルト[Pet]’の威力を強化させる",
        "str_progress": "ダメージ"
    },
    {
        "id": 1054,
        "imageid": 1054,
        "unknown1_6": -1,
        "str_name": "ウンディーネの涙",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ウンディーネが流す悲しい涙が、ウンディーネが使用する‘アイスボルト[Pet]’の威力を強化させる",
        "str_progress": "ダメージ"
    },
    {
        "id": 1055,
        "imageid": 1055,
        "unknown1_6": -1,
        "str_name": "シルフィーのため息",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "シルフィーが噴き出す鋭いため息が、シルフィーが使用する‘ストームボルト[Pet]’の威力を強化させる",
        "str_progress": "ダメージ"
    },
    {
        "id": 1056,
        "imageid": 1056,
        "unknown1_6": -1,
        "str_name": "ノームのつるはし",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ノームが振り回す重いつるはしが、ノームが使用する‘ロックバウンディング[Pet]’の威力を強化させる",
        "str_progress": "ダメージ"
    },
    {
        "id": 1057,
        "imageid": 1057,
        "unknown1_6": -1,
        "str_name": "ウィスプーのプリズム",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ウィスプーの周囲に漂うプリズムが、ウィスプーが使用する‘ライトビーム[Pet]’の威力を強化させる",
        "str_progress": "ダメージ"
    },
    {
        "id": 1058,
        "imageid": 1058,
        "unknown1_6": -1,
        "str_name": "シャドウのカーテン",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "シャドウの闇を維持するための暗幕が、シャドウが使用する‘地獄の矛[Pet]’威力を強化させる",
        "str_progress": "ダメージ"
    },
    {
        "id": 1059,
        "imageid": 1059,
        "unknown1_6": -1,
        "str_name": "メルティングアイボール",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "サラマンダの瞳を溶かしてしまうほどに強く強化させる。その影響で持主の魔法攻撃力が強化される",
        "str_progress": "魔法攻撃力"
    },
    {
        "id": 1060,
        "imageid": 1060,
        "unknown1_6": -1,
        "str_name": "ハーティハンズ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "握っていると心が落ち着くウンディーネの手で持主を補佐する。ウンディーネの持主は冷静な心理状態となり敵への命中率が上昇される",
        "str_progress": "命中率"
    },
    {
        "id": 1061,
        "imageid": 1061,
        "unknown1_6": -1,
        "str_name": "クールヘアー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "シルフィーの涼やかな髪で持主の周囲にある空気をより動き易くするように調節してくれる。持主の攻撃速度が速くなる",
        "str_progress": "攻撃速度"
    },
    {
        "id": 1062,
        "imageid": 1062,
        "unknown1_6": -1,
        "str_name": "ソリッドシューズ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ノームの丈夫な靴が持主を心強く補佐し、持主が敵の攻撃をさらに回避し易くさせる",
        "str_progress": "回避率"
    },
    {
        "id": 1063,
        "imageid": 1063,
        "unknown1_6": -1,
        "str_name": "ワイヤードフレーム",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ウィスプーの周囲に漂う小さな薄い網形の魔法網が敵の弱点を見つけ出し、魔法抵抗力を一部分無力化させ、持主の魔法攻撃効率を上昇させる",
        "str_progress": "魔法抵抗力減少"
    },
    {
        "id": 1064,
        "imageid": 1064,
        "unknown1_6": -1,
        "str_name": "ダブルドレープ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "シャドウの暗幕が２倍に厚くなり、持主が敵に向かって、より果敢に威力のある物理攻撃が可能になる",
        "str_progress": "物理攻撃力"
    },
    {
        "id": 1065,
        "imageid": 1065,
        "unknown1_6": -1,
        "str_name": "クルセーダー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの攻撃するモンスターが、人間型ボスモンスターや、セイジであった場合、ミニペットの攻撃力増加",
        "str_progress": "ダメージ"
    },
    {
        "id": 1066,
        "imageid": 1066,
        "unknown1_6": -1,
        "str_name": "ダンジョンマスター",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの攻撃するモンスターが、アンデッド型ボスモンスターや、ドラコリッチであった場合、ミニペットの攻撃力増加",
        "str_progress": "ダメージ"
    },
    {
        "id": 1067,
        "imageid": 1067,
        "unknown1_6": -1,
        "str_name": "デビルクラッシャー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの攻撃するモンスターが、悪魔型ボスモンスターや、アークデビルであった場合、ミニペットの攻撃力増加",
        "str_progress": "ダメージ"
    },
    {
        "id": 1068,
        "imageid": 1068,
        "unknown1_6": -1,
        "str_name": "ポーチャー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの攻撃するモンスターが、動物型ボスモンスターや、ティアメスであった場合、ミニペットの攻撃力増加",
        "str_progress": "ダメージ"
    },
    {
        "id": 1069,
        "imageid": 1069,
        "unknown1_6": -1,
        "str_name": "ドラゴンスレイヤー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの攻撃するモンスターが、ボスモンスターや、巨大型モンスターであった場合、ミニペットの攻撃力増加",
        "str_progress": "ダメージ"
    },
    {
        "id": 1070,
        "imageid": 1070,
        "unknown1_6": -1,
        "str_name": "ディバインイレイザー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの攻撃するモンスターが、神獣型ボスモンスターや、アクアドラゴンであった場合、ミニペットの攻撃力増加",
        "str_progress": "ダメージ"
    },
    {
        "id": 1071,
        "imageid": 1071,
        "unknown1_6": -1,
        "str_name": "劫火",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "この世をも滅ぼすことが出来るという恐ろしい大火で持主の敵を攻撃する",
        "str_progress": "ダメージ, 発動確率"
    },
    {
        "id": 1072,
        "imageid": 1072,
        "unknown1_6": -1,
        "str_name": "氷点",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "全ての物を一瞬で凍らせてしまう氷点下の冷たいオーラを利用し、持主の敵を攻撃する",
        "str_progress": "ダメージ, 発動確率"
    },
    {
        "id": 1073,
        "imageid": 1073,
        "unknown1_6": -1,
        "str_name": "爆風",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "とても猛烈な暴風を作り出し、持主の敵に発射する",
        "str_progress": "ダメージ, 範囲, 発動確率"
    },
    {
        "id": 1074,
        "imageid": 1074,
        "unknown1_6": -1,
        "str_name": "猛毒",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "大地の無情な毒オーラで、持主に危害を与える敵を攻撃する",
        "str_progress": "ダメージ, 発動確率"
    },
    {
        "id": 1075,
        "imageid": 1075,
        "unknown1_6": -1,
        "str_name": "閃光",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "目はもちろんのこと、露出した皮膚にまで痛みを与える強力な閃光で、持主に危害を与える敵を壊滅させる",
        "str_progress": "ダメージ, 範囲, 発動確率"
    },
    {
        "id": 1076,
        "imageid": 1076,
        "unknown1_6": -1,
        "str_name": "漆黒",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "全ての感覚を失ってしまいそうなほど絶望的な闇を利用し、持主を攻撃する敵たちにダメージを与える",
        "str_progress": "ダメージ, 発動確率"
    },
    {
        "id": 1077,
        "imageid": 1077,
        "unknown1_6": -1,
        "str_name": "ボミルの合力",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "竹林の中をそよぐ風に混じる素早いボミルの手助けで‘劫火’の威力を倍にさせる",
        "str_progress": "ダメージ"
    },
    {
        "id": 1078,
        "imageid": 1078,
        "unknown1_6": -1,
        "str_name": "ガミルの助勢",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "どんな荒い雨や風にもびくともしない頑丈なガミルの手助けで‘氷点’を恐ろしい技へと変化させる",
        "str_progress": "ダメージ"
    },
    {
        "id": 1079,
        "imageid": 1079,
        "unknown1_6": -1,
        "str_name": "バミルの応援",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "水面上を泳ぎまわる楽しいバミルの手助けにより‘爆風’のダメージを強化させる",
        "str_progress": "ダメージ"
    },
    {
        "id": 1080,
        "imageid": 1080,
        "unknown1_6": -1,
        "str_name": "チャミルの補助",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "山の頂上を守護する真っ白なチャミルの手助けで‘猛毒’の威力を上昇させる",
        "str_progress": "ダメージ"
    },
    {
        "id": 1081,
        "imageid": 1081,
        "unknown1_6": -1,
        "str_name": "ドミルの支援",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "磐石の上から限りなく横に広がる水平のドミルの手助けにより‘閃光’を強力な技へと作り上げる",
        "str_progress": "ダメージ"
    },
    {
        "id": 1082,
        "imageid": 1082,
        "unknown1_6": -1,
        "str_name": "ムミルの加勢",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "海の上で怒涛と共に怒れるムミルの手助けで‘漆黒’を絶望的な威力へと強化させる",
        "str_progress": "ダメージ"
    },
    {
        "id": 1083,
        "imageid": 1083,
        "unknown1_6": -1,
        "str_name": "体力ポーションアップ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ヒールポーションを効率的に使用する方法を悟り、ヒールポーションが持主の体力を回復させる量を時々増やしてくれる",
        "str_progress": "ポーション効率"
    },
    {
        "id": 1084,
        "imageid": 1084,
        "unknown1_6": -1,
        "str_name": "必殺ポーションアップ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "チャージングポーションを効率的に使用する方法を悟り、チャージングポーションが持主のCPを回復させる量を時々増やしてくれる",
        "str_progress": "CPポーション効率"
    },
    {
        "id": 1085,
        "imageid": 1085,
        "unknown1_6": -1,
        "str_name": "必殺技アップ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が必殺技を使用する際、タイミングよく気の流れを読み取り、再び持主に読み取ったその気流の一部を返してくれる",
        "str_progress": "発動確率"
    },
    {
        "id": 1086,
        "imageid": 1086,
        "unknown1_6": -1,
        "str_name": "体力回復アップ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が回復魔法を受ける際、瞬間的に魔法効果がよく浸透する体質に変わり、通常よりもさらにヒール効果を上昇させる",
        "str_progress": "ヒールスキル回復体力, 発動確率"
    },
    {
        "id": 1087,
        "imageid": 1087,
        "unknown1_6": -1,
        "str_name": "アイテム探知アップ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主の見野を明るくし、少しでもよりアイテムを見つけ出す確率を上昇させる",
        "str_progress": "魔法アイテムドロップ確率"
    },
    {
        "id": 1088,
        "imageid": 1088,
        "unknown1_6": -1,
        "str_name": "ゴールド探知アップ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主の目に映る様々な多くの光りを削り、ゴールドの輝きだけを見つけ出す確率を上昇させる",
        "str_progress": "ゴールドドロップ確率"
    },
    {
        "id": 1089,
        "imageid": 1089,
        "unknown1_6": -1,
        "str_name": "ルビーコア",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの中心部を紅玉化し、持主の魔法抵抗力を上昇させるのと同時に、火抵抗力に対するペナルティーを減少してくれる",
        "str_progress": "魔法抵抗力, フィールド火抵抗力ペナルティー減少"
    },
    {
        "id": 1090,
        "imageid": 1090,
        "unknown1_6": -1,
        "str_name": "サファイアコア",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの中心部を青玉化し、持主の魔法抵抗力を上昇させるのと同時に、水抵抗力に対するペナルティーを減少してくれる",
        "str_progress": "魔法抵抗力, フィールド水抵抗力ペナルティー減少"
    },
    {
        "id": 1091,
        "imageid": 1091,
        "unknown1_6": -1,
        "str_name": "エメラルドコア",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの中心部を翠玉化し、持主の魔法抵抗力を上昇させるのと同時に、風抵抗力に対するペナルティーを減少してくれる",
        "str_progress": "魔法抵抗力, フィールド風抵抗力ペナルティー減少"
    },
    {
        "id": 1092,
        "imageid": 1092,
        "unknown1_6": -1,
        "str_name": "トパーズコア",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの中心部を黄玉化し、持主の魔法抵抗力を上昇させるのと同時に、大地抵抗力に対するペナルティーを減少してくれる",
        "str_progress": "魔法抵抗力, フィールド大地抵抗力ペナルティー減少"
    },
    {
        "id": 1093,
        "imageid": 1093,
        "unknown1_6": -1,
        "str_name": "ダイヤモンドコア",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの中心部を金剛石化し、持主の魔法抵抗力を上昇させるのと同時に、光抵抗力に対するペナルティーを減少してくれる",
        "str_progress": "魔法抵抗力, フィールド光抵抗力ペナルティー減少"
    },
    {
        "id": 1094,
        "imageid": 1094,
        "unknown1_6": -1,
        "str_name": "オニキスコア",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの中心部を縞瑪瑙化し、持主の魔法抵抗力を上昇させるのと同時に、闇抵抗力に対するペナルティーを減少してくれる",
        "str_progress": "魔法抵抗力, フィールド闇抵抗力ペナルティー減少"
    },
    {
        "id": 1095,
        "imageid": 1095,
        "unknown1_6": -1,
        "str_name": "フレイムマスター",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの攻撃するモンスターが、人間型ボスモンスターや、セイジであった場合、該当モンスターの抵抗力が減少する",
        "str_progress": "抵抗力減少"
    },
    {
        "id": 1096,
        "imageid": 1096,
        "unknown1_6": -1,
        "str_name": "ブリザードマスター",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの攻撃するモンスターが、アンデッド型ボスモンスターや、ドラコリッチであった場合、該当モンスターの抵抗力が減少する",
        "str_progress": "抵抗力減少"
    },
    {
        "id": 1097,
        "imageid": 1097,
        "unknown1_6": -1,
        "str_name": "ストームマスター",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの攻撃するモンスターが、悪魔型ボスモンスターや、アークデビルであった場合、該当モンスターの抵抗力が減少する",
        "str_progress": "抵抗力減少"
    },
    {
        "id": 1098,
        "imageid": 1098,
        "unknown1_6": -1,
        "str_name": "クェイクマスター",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの攻撃するモンスターが、動物型ボスモンスターや、ティアメスであった場合、モンスターの抵抗力が減少する",
        "str_progress": "抵抗力減少"
    },
    {
        "id": 1099,
        "imageid": 1099,
        "unknown1_6": -1,
        "str_name": "フラッシュマスター",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの攻撃するモンスターが、ボスモンスターや、巨大型モンスターであった場合、モンスターの抵抗力が減少する",
        "str_progress": "抵抗力減少"
    },
    {
        "id": 1100,
        "imageid": 1100,
        "unknown1_6": -1,
        "str_name": "ボイドマスター",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの攻撃するモンスターが、神獣型ボスモンスターや、アクアドラゴンであった場合、モンスターの抵抗力が減少する",
        "str_progress": "抵抗力減少"
    },
    {
        "id": 1101,
        "imageid": 1101,
        "unknown1_6": -1,
        "str_name": "ヒートキャノン",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットや持主が攻撃する際、その反動力を充填しておき、魔力が満タンになると持主の意志で魔力を放出する。‘ファイアボルト[Pet]’が何十発も連射される",
        "str_progress": "ダメージ, 連続攻撃回数"
    },
    {
        "id": 1102,
        "imageid": 1102,
        "unknown1_6": -1,
        "str_name": "クリスタルインジェクター",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットや持主が攻撃する際に充填したエネルギーで、小範囲の敵に氷の結晶体を発射する。攻撃を受けた敵たちは凍りつき、一定時間動くことができなくなる",
        "str_progress": "ダメージ, 持続時間, 発動確率"
    },
    {
        "id": 1103,
        "imageid": 1103,
        "unknown1_6": -1,
        "str_name": "プレッシャーディスチャージ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットや持主が攻撃する際に充填したエネルギーで、持主が指定した敵に‘ストームボルト[Pet]’を連発で発射する",
        "str_progress": "連続攻撃回数"
    },
    {
        "id": 1104,
        "imageid": 1104,
        "unknown1_6": -1,
        "str_name": "マグマキャスティング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットや持主が攻撃する際に充填したエネルギーで、周辺にいる広範囲の敵たちに、熱いマグマを持主が指定したタイミングで吹きかけ、攻撃をする",
        "str_progress": "ダメージ"
    },
    {
        "id": 1105,
        "imageid": 1105,
        "unknown1_6": -1,
        "str_name": "レールレーザー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットや持主が攻撃する際に充填したエネルギーで、持主が指定した位置に光のエネルギーを撃ち、その周囲の敵を攻撃する",
        "str_progress": "ダメージ"
    },
    {
        "id": 1106,
        "imageid": 1106,
        "unknown1_6": -1,
        "str_name": "ヴォルテックスフリング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットや持主が攻撃する際に充填したエネルギーで、持主が指定した位置に暗闇の幕を投げかけ、その周囲の敵たちを攻撃する",
        "str_progress": "ダメージ"
    },
    {
        "id": 1107,
        "imageid": 1107,
        "unknown1_6": -1,
        "str_name": "即席導火線",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "通常よりは短く効率的な導火線で‘ヒートキャノン’の充填時間を短縮させる",
        "str_progress": "充填回数短縮"
    },
    {
        "id": 1108,
        "imageid": 1108,
        "unknown1_6": -1,
        "str_name": "結晶化促進剤",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "より氷の結晶化がうまく出来上がる促進剤の使用で‘クリスタルインジェクター’の充填時間を短縮させる",
        "str_progress": "充填回数短縮"
    },
    {
        "id": 1109,
        "imageid": 1109,
        "unknown1_6": -1,
        "str_name": "密封補助食品",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "風を閉じ込めておくための密閉空間を補ってくれるサプリメントの使用により‘プレッシャーディスチャージ’の充填時間を短縮させる",
        "str_progress": "充填回数短縮"
    },
    {
        "id": 1110,
        "imageid": 1110,
        "unknown1_6": -1,
        "str_name": "高圧発電機",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "より急速に、より高熱のマグマを生成できる高圧発電機の使用により‘マグマキャスティング’の充填時間を短縮させる",
        "str_progress": "充填回数短縮"
    },
    {
        "id": 1111,
        "imageid": 1111,
        "unknown1_6": -1,
        "str_name": "磁気誘導機",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "磁気流をより効率的に生成できる磁気誘導機の使用により‘レールレーザー’の充填時間を短縮させる",
        "str_progress": "充填回数短縮"
    },
    {
        "id": 1112,
        "imageid": 1112,
        "unknown1_6": -1,
        "str_name": "ブラックボックス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "闇を効率的に閉じ込めることができるブラックボックスの使用により‘ヴォルテックスフリング’の充填時間を短縮させる",
        "str_progress": "充填回数短縮"
    },
    {
        "id": 1113,
        "imageid": 1113,
        "unknown1_6": -1,
        "str_name": "タオの羽",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "光の巨神タオの羽で祝福されたハオリンが、持主の敵を以前に増して攻撃するようになる",
        "str_progress": "発動確率"
    },
    {
        "id": 1114,
        "imageid": 1114,
        "unknown1_6": -1,
        "str_name": "フルムの鱗",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "光の巨神フルムの鱗で祝福されたミオリンが、持主の敵を以前に増して攻撃するようになる",
        "str_progress": "発動確率"
    },
    {
        "id": 1115,
        "imageid": 1115,
        "unknown1_6": -1,
        "str_name": "ソルの牙",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "光の巨神ソルの牙で祝福されたスオリンが、持主の敵を以前に増して攻撃するようになる",
        "str_progress": "発動確率"
    },
    {
        "id": 1116,
        "imageid": 1116,
        "unknown1_6": -1,
        "str_name": "ナルンの鬣",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "光の巨神ナルンのたてがみで祝福されたダオリンが、持主の敵を以前に増して攻撃するようになる",
        "str_progress": "発動確率"
    },
    {
        "id": 1117,
        "imageid": 1117,
        "unknown1_6": -1,
        "str_name": "巨神の体液",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "光の巨神たちの体液で祝福されたチャオリンが、持主の敵を以前に増して攻撃するようになる",
        "str_progress": "発動確率"
    },
    {
        "id": 1118,
        "imageid": 1118,
        "unknown1_6": -1,
        "str_name": "巨神のカケラ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "光の巨神たちのカケラで祝福されたゴオリンが、持主の敵を以前に増して攻撃するようになる",
        "str_progress": "発動確率"
    },
    {
        "id": 1119,
        "imageid": 1119,
        "unknown1_6": -1,
        "str_name": "ミニブレス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの能力で持主の体力最大値を上昇させる",
        "str_progress": "最大体力"
    },
    {
        "id": 1120,
        "imageid": 1120,
        "unknown1_6": -1,
        "str_name": "ミニブルース",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの能力で持主のCP最大値を上昇させる",
        "str_progress": "最大CP"
    },
    {
        "id": 1121,
        "imageid": 1121,
        "unknown1_6": -1,
        "str_name": "ミニヘイスト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの能力で持主の移動速度を上昇させる",
        "str_progress": "移動速度"
    },
    {
        "id": 1122,
        "imageid": 1122,
        "unknown1_6": -1,
        "str_name": "ミニプロテクティング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの能力で持主の防御力を上昇させる",
        "str_progress": "防御力"
    },
    {
        "id": 1123,
        "imageid": 1123,
        "unknown1_6": -1,
        "str_name": "ミニディバインアーチ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの能力で持主が既に習得したスキル群のスキルレベルを上昇させる",
        "str_progress": "スキルレベル"
    },
    {
        "id": 1124,
        "imageid": 1124,
        "unknown1_6": -1,
        "str_name": "ミニ装備バッジ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの能力で持主が使用できる装備のレベルを上昇させる",
        "str_progress": "装備着用レベル"
    },
    {
        "id": 1125,
        "imageid": 1125,
        "unknown1_6": -1,
        "str_name": "ハミルの熱気",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ハミルの祝福でミニペットの攻撃するモンスターが、人間型ボスモンスターや、セイジであった場合、ミニペットの攻撃頻度が増加する",
        "str_progress": "発動確率"
    },
    {
        "id": 1126,
        "imageid": 1126,
        "unknown1_6": -1,
        "str_name": "ミミルの氷塊",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミミルの祝福でミニペットの攻撃するモンスターが、アンデッド型ボスモンスターや、ドラコリッチであった場合、ミニペットの攻撃頻度が増加する",
        "str_progress": "発動確率"
    },
    {
        "id": 1127,
        "imageid": 1127,
        "unknown1_6": -1,
        "str_name": "スミルの竜巻",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "スミルの祝福でミニペットの攻撃するモンスターが、悪魔型ボスモンスターや、アークデビルであった場合、ミニペットの攻撃頻度が増加する",
        "str_progress": "発動確率"
    },
    {
        "id": 1128,
        "imageid": 1128,
        "unknown1_6": -1,
        "str_name": "ダミルの地響き",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ダミルの祝福でミニペットの攻撃するモンスターが、動物型ボスモンスターや、ティアメスであった場合、ミニペットの攻撃頻度が増加する",
        "str_progress": "発動確率"
    },
    {
        "id": 1129,
        "imageid": 1129,
        "unknown1_6": -1,
        "str_name": "チャミルの閃光",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "チャミルの祝福でミニペットの攻撃するモンスターが、ボスモンスターや、巨大型モンスターであった場合、ミニペットの攻撃頻度が増加する",
        "str_progress": "発動確率"
    },
    {
        "id": 1130,
        "imageid": 1130,
        "unknown1_6": -1,
        "str_name": "ゴミルの無限迷宮",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ゴミルの祝福でミニペットの攻撃するモンスターが、神獣型ボスモンスターや、アクアドラゴンであった場合、ミニペットの攻撃頻度が増加する",
        "str_progress": "発動確率"
    },
    {
        "id": 1131,
        "imageid": 1131,
        "unknown1_6": -1,
        "str_name": "エアロビクス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "有酸素運動を行ない体力増加",
        "str_progress": "最大体力"
    },
    {
        "id": 1132,
        "imageid": 1132,
        "unknown1_6": -1,
        "str_name": "ウエートトレーニング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "筋肉運動で体力増進",
        "str_progress": "最大体力"
    },
    {
        "id": 1133,
        "imageid": 1133,
        "unknown1_6": -1,
        "str_name": "ボディスカルプター",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "筋肉作りをして体力強化",
        "str_progress": "最大体力"
    },
    {
        "id": 1134,
        "imageid": 1134,
        "unknown1_6": -1,
        "str_name": "ストレッチング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ストレッチをして体力・精神力増加",
        "str_progress": "最大 CP"
    },
    {
        "id": 1135,
        "imageid": 1135,
        "unknown1_6": -1,
        "str_name": "ヨガ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "精神統一をして精神力増進",
        "str_progress": "最大 CP"
    },
    {
        "id": 1136,
        "imageid": 1136,
        "unknown1_6": -1,
        "str_name": "サマディ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "心頭滅却し、精神力を強化する",
        "str_progress": "最大 CP"
    },
    {
        "id": 1137,
        "imageid": 1137,
        "unknown1_6": -1,
        "str_name": "ビッグファイア",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの火ダメージ +10％",
        "str_progress": ""
    },
    {
        "id": 1138,
        "imageid": 1138,
        "unknown1_6": -1,
        "str_name": "ビッグウォーター",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの水ダメージ +10％",
        "str_progress": ""
    },
    {
        "id": 1139,
        "imageid": 1139,
        "unknown1_6": -1,
        "str_name": "ビッグストーム",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの風ダメージ +10％",
        "str_progress": ""
    },
    {
        "id": 1140,
        "imageid": 1140,
        "unknown1_6": -1,
        "str_name": "ビッグアース",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの大地ダメージ +10％",
        "str_progress": ""
    },
    {
        "id": 1141,
        "imageid": 1141,
        "unknown1_6": -1,
        "str_name": "ビッグライト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの光ダメージ +10％",
        "str_progress": ""
    },
    {
        "id": 1142,
        "imageid": 1142,
        "unknown1_6": -1,
        "str_name": "ビッグダークネス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの 闇ダメージ +10％",
        "str_progress": ""
    },
    {
        "id": 1143,
        "imageid": 1143,
        "unknown1_6": -1,
        "str_name": "レインボーエレメント",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットのダメージ +5％",
        "str_progress": ""
    },
    {
        "id": 1144,
        "imageid": 1144,
        "unknown1_6": -1,
        "str_name": "レインボーエレメント",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットのダメージ +5％",
        "str_progress": ""
    },
    {
        "id": 1145,
        "imageid": 1145,
        "unknown1_6": -1,
        "str_name": "マッシヴファイア",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの火ダメージ +15％",
        "str_progress": ""
    },
    {
        "id": 1146,
        "imageid": 1146,
        "unknown1_6": -1,
        "str_name": "マッシヴウォーター",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの水ダメージ +15％",
        "str_progress": ""
    },
    {
        "id": 1147,
        "imageid": 1147,
        "unknown1_6": -1,
        "str_name": "マッシヴストーム",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの風ダメージ +15％",
        "str_progress": ""
    },
    {
        "id": 1148,
        "imageid": 1148,
        "unknown1_6": -1,
        "str_name": "マッシヴアース",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの大地ダメージ +15％",
        "str_progress": ""
    },
    {
        "id": 1149,
        "imageid": 1149,
        "unknown1_6": -1,
        "str_name": "マッシヴライト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの光ダメージ +15％",
        "str_progress": ""
    },
    {
        "id": 1150,
        "imageid": 1150,
        "unknown1_6": -1,
        "str_name": "マッシヴダークネス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの闇ダメージ +15％",
        "str_progress": ""
    },
    {
        "id": 1151,
        "imageid": 1151,
        "unknown1_6": -1,
        "str_name": "エンシェントエレメント",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットのダメージ +10％",
        "str_progress": ""
    },
    {
        "id": 1152,
        "imageid": 1152,
        "unknown1_6": -1,
        "str_name": "太極の環",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットのスキル発動確率 +120％",
        "str_progress": ""
    },
    {
        "id": 1153,
        "imageid": 1153,
        "unknown1_6": -1,
        "str_name": "ヘツルリンステップ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ペットのボスダメージ +100％",
        "str_progress": ""
    },
    {
        "id": 1154,
        "imageid": 1154,
        "unknown1_6": -1,
        "str_name": "トゥルーエレメンタル",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットのダメージ +50％",
        "str_progress": ""
    },
    {
        "id": 1155,
        "imageid": 1155,
        "unknown1_6": -1,
        "str_name": "ハイポセンター",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "基本型ペットスキルレベル +1",
        "str_progress": ""
    },
    {
        "id": 1156,
        "imageid": 1156,
        "unknown1_6": -1,
        "str_name": "古代神の残影",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットのスキル発動確率 +150％",
        "str_progress": ""
    },
    {
        "id": 1157,
        "imageid": 1157,
        "unknown1_6": -1,
        "str_name": "アドバンスドリメイク Ⅰ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットのスキルレベル +1",
        "str_progress": ""
    },
    {
        "id": 1158,
        "imageid": 1158,
        "unknown1_6": -1,
        "str_name": "アドバンスドリメイク Ⅱ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットのスキルレベル +1",
        "str_progress": ""
    },
    {
        "id": 1159,
        "imageid": 1159,
        "unknown1_6": -1,
        "str_name": "アドバンスドリメイク Ⅲ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットのスキルレベル +1",
        "str_progress": ""
    },
    {
        "id": 1160,
        "imageid": 1160,
        "unknown1_6": -1,
        "str_name": "アドバンスドリメイク Ⅳ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットのスキルレベル +1",
        "str_progress": ""
    },
    {
        "id": 1161,
        "imageid": 13,
        "unknown1_6": 0,
        "str_name": "バウンシングシールド",
        "unknown2_0": 5,
        "unknown10_139": -16384,
        "str_description": "自分が持っている盾を敵に向かって強く飛ばす。盾は敵との間を飛び交い大きなダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1162,
        "imageid": 12,
        "unknown1_6": 0,
        "str_name": "タンククラッシュ",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "盾と刀で体を守りながら敵に突進し攻撃する。スキル使用後、一定時間防御力とブロック率が上昇する。",
        "str_progress": "威力、防御力"
    },
    {
        "id": 1163,
        "imageid": 793,
        "unknown1_6": 0,
        "str_name": "フェイタルツイスター",
        "unknown2_0": 4,
        "unknown10_139": -32768,
        "str_description": "一定時間の間、指定した敵を追跡する旋風を巻き起こす。旋風は近接する敵に持続的にダメージを与える。",
        "str_progress": "威力、時速時間"
    },
    {
        "id": 1164,
        "imageid": 14,
        "unknown1_6": 0,
        "str_name": "ホイールウィンドプロテクター",
        "unknown2_0": 5,
        "unknown10_139": 8192,
        "str_description": "空中に浮かべた盾を素早く回して大きな渦巻きを作り、その渦巻きで敵を攻撃する。特殊な風を起こし剣士の周辺にいる敵に追加ダメージ与える。",
        "str_progress": "威力"
    },
    {
        "id": 1165,
        "imageid": 17,
        "unknown1_6": 0,
        "str_name": "メトルデュエリング",
        "unknown2_0": 3,
        "unknown10_139": 12288,
        "str_description": "選択した敵とその周辺全ての敵に決闘を挑む。\r\n一定時間の間、指定された敵は剣士だけを攻撃する。",
        "str_progress": "発動確率, 敵命中率, 持続時間, ダメージ減少率"
    },
    {
        "id": 1166,
        "imageid": 19,
        "unknown1_6": 0,
        "str_name": "ウォーフープ",
        "unknown2_0": 5,
        "unknown10_139": -32768,
        "str_description": "戦場で雄叫びをあげて周辺の敵に同時にダメージを与える。雄叫びから一定時間、魔法攻撃力が上昇する。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 1167,
        "imageid": 792,
        "unknown1_6": 0,
        "str_name": "クロスクラッカー",
        "unknown2_0": 2,
        "unknown10_139": 16384,
        "str_description": "刀にさらに強力な力を吹き入れ、前方に剣気を打ち出す。巨大な剣気が届く範囲内にいるすべての敵にダメージを与える。",
        "str_progress": "威力、命中率"
    },
    {
        "id": 1168,
        "imageid": 23,
        "unknown1_6": 0,
        "str_name": "パラレルブリッツ",
        "unknown2_0": 4,
        "unknown10_139": 4096,
        "str_description": "自分の左右に数個の分身を作り、敵を同時に突く。このスキルで攻撃時、アルティメットスラッシュスキルの与ダメージが上昇。",
        "str_progress": "威力、分身個数 "
    },
    {
        "id": 1169,
        "imageid": 794,
        "unknown1_6": 0,
        "str_name": "アルティメットスラッシュ",
        "unknown2_0": 5,
        "unknown10_139": 16384,
        "str_description": "剣を利用し敵を攻撃する時、目には見えない速度で攻撃し、敵に追加ダメージを与える。",
        "str_progress": "発動確率"
    },
    {
        "id": 1170,
        "imageid": 796,
        "unknown1_6": 0,
        "str_name": "剣魂一如",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "剣を自身の身体のように操る境地に達し、剣気をさらに巧みに操れるようになる。",
        "str_progress": "無し"
    },
    {
        "id": 1171,
        "imageid": 476,
        "unknown1_6": 0,
        "str_name": "一挙両得",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "自分の風抵抗力数値分、風属性攻撃力が上昇",
        "str_progress": "無し"
    },
    {
        "id": 1172,
        "imageid": 795,
        "unknown1_6": 0,
        "str_name": "生まれつきの胆力",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "剣士が敵の攻撃を恐れず、さらに大胆に戦う。",
        "str_progress": "無し"
    },
    {
        "id": 1173,
        "imageid": 738,
        "unknown1_6": 1,
        "str_name": "ディレイクラッシングムーブ",
        "unknown2_0": 4,
        "unknown10_139": 4096,
        "str_description": "少しの間、剣気を溜めて一度でより強い攻撃を与える。",
        "str_progress": "威力, 攻撃速度"
    },
    {
        "id": 1174,
        "imageid": 739,
        "unknown1_6": 1,
        "str_name": "ディスパーションスパイク",
        "unknown2_0": 5,
        "unknown10_139": -32768,
        "str_description": "スキルのCP消費量を減らす。\r\n力を保存している為、魔法ダメージと物理ダメージも弱化する。",
        "str_progress": "CP補正値, 物理, 魔法ダメージ減少数値"
    },
    {
        "id": 1175,
        "imageid": 32,
        "unknown1_6": 1,
        "str_name": " トリプルラウンディングブーム",
        "unknown2_0": 2,
        "unknown10_139": -16384,
        "str_description": "剣を出したまま3回転して、周囲の敵に剣圧の風を飛ばす。従来のスキルと比べて、より正確な攻撃が可能。",
        "str_progress": "威力, 爆発範囲"
    },
    {
        "id": 1176,
        "imageid": 34,
        "unknown1_6": 1,
        "str_name": "ブラッドサッカー",
        "unknown2_0": 3,
        "unknown10_139": -32768,
        "str_description": "自分の体と剣に付いている血を拭い、その血を刃の形にして敵に飛ばす。\r\n最後に受けたダメージと与えたダメージに比例して攻撃力が上昇し、敵は出血状態になる。\r\n但し、１度使用すると血が飛んで消えるので威力は減少する。敵を倒すと体力が一定量回復。",
        "str_progress": "威力, 打撃比例率"
    },
    {
        "id": 1177,
        "imageid": 36,
        "unknown1_6": 1,
        "str_name": "ドラゴンストーム",
        "unknown2_0": 5,
        "unknown10_139": 8192,
        "str_description": "剣を大きく振り回し、氷の竜を召喚する。\r\n氷竜は戦士の周りを旋回し、周囲の敵に大ダメージを与える。範囲内の敵は移動速度と魔法抵抗力が低下する。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 1178,
        "imageid": 40,
        "unknown1_6": 1,
        "str_name": "ハリケーンインパクト",
        "unknown2_0": 4,
        "unknown10_139": 16384,
        "str_description": "分身術を利用して、敵に垂直振り下ろしと水平振り回し、突き攻撃を同時に行う。\r\n打撃された敵は出血と感電状態になる。",
        "str_progress": "威力, 攻撃速度, 命中率"
    },
    {
        "id": 1179,
        "imageid": 43,
        "unknown1_6": 1,
        "str_name": "サベージスタンプ",
        "unknown2_0": 3,
        "unknown10_139": 12288,
        "str_description": "ジャンプの後、着地点で剣を振り回し、強い爆発を起こす。\r\n周囲の敵にダメージを与え、自分の防御力も上昇する。",
        "str_progress": "威力"
    },
    {
        "id": 1180,
        "imageid": 44,
        "unknown1_6": 1,
        "str_name": "オルターリングストライカー",
        "unknown2_0": 4,
        "unknown10_139": 16384,
        "str_description": "非常に素早く移動した後、敵に連続攻撃を行う。\r\nその後、少し間防御力と回避率が上昇する。\r\nディレイクラッシングスキルで連係するとダメージを増幅させる。",
        "str_progress": "威力, 打撃回数"
    },
    {
        "id": 1181,
        "imageid": 49,
        "unknown1_6": 1,
        "str_name": "ブラッドヒューリー",
        "unknown2_0": 4,
        "unknown10_139": -16384,
        "str_description": "敵の攻撃を受けると怒り状態になって、物理及び魔法攻撃力、致命打確率が同時に上昇する。",
        "str_progress": " 上昇率、持続時間 "
    },
    {
        "id": 1182,
        "imageid": 478,
        "unknown1_6": 1,
        "str_name": "渾身の攻撃",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "打撃時、一定確率で防御力無視",
        "str_progress": "無し"
    },
    {
        "id": 1183,
        "imageid": 479,
        "unknown1_6": 1,
        "str_name": "勝利の褒賞",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "敵を倒すとCP獲得",
        "str_progress": "無し"
    },
    {
        "id": 1184,
        "imageid": 480,
        "unknown1_6": 1,
        "str_name": "過剰反応",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "防御力数値によってダメージを追加で与える",
        "str_progress": "無し"
    },
    {
        "id": 1185,
        "imageid": 451,
        "unknown1_6": 18,
        "str_name": "バウンドライト",
        "unknown2_0": 3,
        "unknown10_139": 16384,
        "str_description": "何かに当たると反射するビームを放つ。ビームが一定回数、敵の間を跳ねながら攻撃する。",
        "str_progress": "威力、反射回数"
    },
    {
        "id": 1186,
        "imageid": 452,
        "unknown1_6": 18,
        "str_name": "エクステンドビーム",
        "unknown2_0": 4,
        "unknown10_139": 16384,
        "str_description": "前方に拡散して触れたすべての敵に、ビームに当たっている間もっと早い周期で持続的にダメージを与えるビームを放つ。",
        "str_progress": "威力"
    },
    {
        "id": 1187,
        "imageid": 453,
        "unknown1_6": 18,
        "str_name": "クリムゾン・アイ【改】",
        "unknown2_0": 5,
        "unknown10_139": 4096,
        "str_description": "RED STONEの影響で変異してしまった右目の力を解放させ、周辺にいるすべての敵に強力な光属性の魔法攻撃を行う。\r\n周囲の敵が少ない場合は、最大三回まで攻撃する。",
        "str_progress": "威力, 攻撃対象増加, 範囲"
    },
    {
        "id": 1188,
        "imageid": 457,
        "unknown1_6": 18,
        "str_name": "インビゴレイト",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "心身を安定させる光の力で、身体のすべての部分を活性化して、CPの最大値を増加させる。同時に物理攻撃に光属性の追加ダメージを与え、攻撃の致命打確率が上昇する。",
        "str_progress": "上昇率、持続時間"
    },
    {
        "id": 1189,
        "imageid": 458,
        "unknown1_6": 18,
        "str_name": "光のレガリア",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "指定したパーティーメンバーに光の力を分け与え、少しの間全ての敵からの攻撃をガードする。",
        "str_progress": "持続時間"
    },
    {
        "id": 1190,
        "imageid": 459,
        "unknown1_6": 18,
        "str_name": "タイムドミネーター",
        "unknown2_0": 4,
        "unknown10_139": 12288,
        "str_description": "全てのパーティーメンバーの時間を止め、少しの間不死状態にする。",
        "str_progress": "キャスティング時間"
    },
    {
        "id": 1191,
        "imageid": 464,
        "unknown1_6": 18,
        "str_name": "蜂の巣【改】",
        "unknown2_0": 5,
        "unknown10_139": -32768,
        "str_description": "ビットが付着した周辺の敵を感知する。敵を感知したビットは強く振動し、さらに短い周期でダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1192,
        "imageid": 465,
        "unknown1_6": 18,
        "str_name": "ディフュージョン",
        "unknown2_0": 5,
        "unknown10_139": -32768,
        "str_description": "敵に付着したビットを全て爆発させ、強力なダメージを与える。さらに広い範囲を探索してダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1193,
        "imageid": 469,
        "unknown1_6": 18,
        "str_name": "クリスタルビジョン",
        "unknown2_0": 5,
        "unknown10_139": 8192,
        "str_description": "ビットを利用してビットが付着した敵を攻撃する時、物理限界ダメージが増加する。クリスタルオペレーターの熟練されたコントロールでビットが消滅されず維持される。",
        "str_progress": "威力"
    },
    {
        "id": 1194,
        "imageid": 487,
        "unknown1_6": 18,
        "str_name": "ミラーコート",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "敵を光属性スキルで攻撃すると、周辺の光が反射し、追加ダメージを与える。",
        "str_progress": "無し"
    },
    {
        "id": 1195,
        "imageid": 488,
        "unknown1_6": 18,
        "str_name": "ビットコントロール",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "付着したビットを調整し、周辺にまき散らす。散らばったビットは周辺の敵に付着する。",
        "str_progress": "無し"
    },
    {
        "id": 1196,
        "imageid": 489,
        "unknown1_6": 18,
        "str_name": "果てしない妨害",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "敵にダメージを与えた瞬間、光線が発射される。光線は攻撃した敵の弱点をスキャンし、敵の攻撃力、防御力、回避率を減少させる。",
        "str_progress": "無し"
    },
    {
        "id": 1197,
        "imageid": 303,
        "unknown1_6": 12,
        "str_name": "ワイルドランダムショット",
        "unknown2_0": 4,
        "unknown10_139": 4096,
        "str_description": "スリングの弾を扇状に素早く数回乱射する",
        "str_progress": "威力"
    },
    {
        "id": 1198,
        "imageid": 304,
        "unknown1_6": 12,
        "str_name": "ミラクルゴリアテスローター",
        "unknown2_0": 5,
        "unknown10_139": 16384,
        "str_description": "巨人ゴリアテも倒せるほど、力強い範囲型スリングの一撃",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 1199,
        "imageid": 789,
        "unknown1_6": 12,
        "str_name": "ボトル権威者",
        "unknown2_0": 2,
        "unknown10_139": 8192,
        "str_description": "ボトルを利用した攻撃の熟練度の限界を超えた。さらに強力に敵を攻撃し、限界ダメージも増加させる。",
        "str_progress": "威力"
    },
    {
        "id": 1200,
        "imageid": 305,
        "unknown1_6": 12,
        "str_name": "必殺ボトル投げ",
        "unknown2_0": 1,
        "unknown10_139": -32768,
        "str_description": "スリングでファイアーボトルや毒ガスなどを投げるのに特化した技術。熟練した腕前で敵にさらに強力なダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1201,
        "imageid": 791,
        "unknown1_6": 12,
        "str_name": "ボトル束洗礼",
        "unknown2_0": 3,
        "unknown10_139": -32768,
        "str_description": "ボトルを束で投げ、前方にいる全ての敵にダメージを与える。さらに多くのボトルを投げ、敵に魔法スリングの効果を適用する。",
        "str_progress": "威力"
    },
    {
        "id": 1202,
        "imageid": 319,
        "unknown1_6": 12,
        "str_name": "おしゃべり女王",
        "unknown2_0": 3,
        "unknown10_139": 16384,
        "str_description": "ひっきりなしに、しゃべりまくって周囲にいる敵の一部を退屈で眠らせてしまう。\r\n同時に気持ちよくなって強力なスキルを使用できるようになる。おしゃべりが終わったあとも, しばらくCPを追加獲得",
        "str_progress": "キャスティング時間, 有効範囲, 睡眠確率"
    },
    {
        "id": 1203,
        "imageid": 320,
        "unknown1_6": 12,
        "str_name": "一緒にウサギ変身",
        "unknown2_0": 1,
        "unknown10_139": -16384,
        "str_description": "一定時間の間、小さなウサギに変身する。ウサギになっている間はダメージ無効状態となり、一定範囲内のプリンセスを攻撃した敵は気絶する。敵が気絶すると、プリンセスは元の姿に戻る。",
        "str_progress": "持続時間, 効果持続時間, クールタイム"
    },
    {
        "id": 1204,
        "imageid": 321,
        "unknown1_6": 12,
        "str_name": "特殊武器変身",
        "unknown2_0": 2,
        "unknown10_139": 12288,
        "str_description": "一定時間の間、指定したパーティーメンバーの武器に変身してパーティーのインベントリに入りこむ。武器に変身したプリンセスがボトル投げ系スキルを使用すると威力が増加する。",
        "str_progress": "持続時間、PT武器攻撃力"
    },
    {
        "id": 1205,
        "imageid": 323,
        "unknown1_6": 12,
        "str_name": "ビックバルーンアタック",
        "unknown2_0": 4,
        "unknown10_139": -16384,
        "str_description": "ワンドを使って巨大プリンセスに変身。少しの間、ボールのように丸くなり敵を踏みつぶして攻撃することができる。従来のスキルより攻撃範囲が増加。",
        "str_progress": "威力, 防御力, 持続時間"
    },
    {
        "id": 1206,
        "imageid": 481,
        "unknown1_6": 12,
        "str_name": "精密攻撃",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "命中率が上昇し、対象との距離に応じて限界ダメージが増加する。",
        "str_progress": "無し"
    },
    {
        "id": 1207,
        "imageid": 482,
        "unknown1_6": 12,
        "str_name": "マジックスリング",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "スリングに魔法の力が込められていて魔法が付与されたスリングとして投げたボトルに追加効果を付与する。",
        "str_progress": "無し"
    },
    {
        "id": 1208,
        "imageid": 483,
        "unknown1_6": 12,
        "str_name": "ドレスパワー",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "鎧の防御力に比例して、敵の各種状態異常の抵抗力が減少する。また、プリンセスが変身スキルを使用した際に全ステータス能力値が増加する。",
        "str_progress": "無し"
    },
    {
        "id": 1209,
        "imageid": 326,
        "unknown1_6": 13,
        "str_name": "アステラガン",
        "unknown2_0": 2,
        "unknown10_139": 16384,
        "str_description": "小さな星一つをワンドから発射して攻撃する。星に当たった敵はギャラクシーに染まり、ギャラクシー状態の別の敵に移動速度低下を移転させる",
        "str_progress": "威力"
    },
    {
        "id": 1210,
        "imageid": 328,
        "unknown1_6": 13,
        "str_name": "ビックコメットシューティング",
        "unknown2_0": 4,
        "unknown10_139": 16384,
        "str_description": "大きな彗星をワンドで作り出して敵に打ち当てる。攻撃した敵周辺にいるギャラクシー状態の別の敵に出血効果を移転させる",
        "str_progress": "威力"
    },
    {
        "id": 1211,
        "imageid": 329,
        "unknown1_6": 13,
        "str_name": "ギャラクシーシャワー",
        "unknown2_0": 5,
        "unknown10_139": 4096,
        "str_description": "銀河を流れる宇宙の天体、星群を前方の敵にでたらめに振り撤く。攻撃された敵は宇宙の力に囚われたギャラクシー状態になる。",
        "str_progress": "威力"
    },
    {
        "id": 1212,
        "imageid": 334,
        "unknown1_6": 13,
        "str_name": "スーパーアイドルスター",
        "unknown2_0": 5,
        "unknown10_139": 12288,
        "str_description": "パーティーメンバーの士気を高めてくれる力強い歌をメンバーと一緒に歌う。\r\n一緒に歌うパーティーメンバーの数が増えるほど、色んな効果が追加される",
        "str_progress": "有効範囲, 上昇率"
    },
    {
        "id": 1213,
        "imageid": 339,
        "unknown1_6": 13,
        "str_name": "ウルトラスーパーノヴァ",
        "unknown2_0": 5,
        "unknown10_139": 8192,
        "str_description": "空から落ちてくる流れ星が一定範囲内の敵に三回打撃を与える。一定確率ですべての低下系状態異常にかかる。ローズガーデンが発動する",
        "str_progress": "威力, 範囲, 発動確率, 低下量"
    },
    {
        "id": 1214,
        "imageid": 340,
        "unknown1_6": 13,
        "str_name": "平和の伝書鳩",
        "unknown2_0": 1,
        "unknown10_139": -16384,
        "str_description": "リトルウィッチのもとに、不足した消耗アイテムの回復薬、治療薬、ファイアーボトル等を買ってきて配逹する鳩を召喚する。\r\n購入できるアイテムが増え、より便利になった。もちろん、お金もかかり、配逹費もかかるが、常連には値下げしてくれるらしい。",
        "str_progress": "アイテム種類, 配達費"
    },
    {
        "id": 1215,
        "imageid": 344,
        "unknown1_6": 13,
        "str_name": "ミスティックボックス",
        "unknown2_0": 5,
        "unknown10_139": -16384,
        "str_description": "敵一体を魔法の箱に入れてねじってしまう。箱を攻撃すれば敵を即死させるか、決定打が発動することもできるが、失敗すれば敵はそのまま脱出してしまう。\r\nパーティーメンバーも箱の攻撃が可能",
        "str_progress": "発動確率, 限界レベル"
    },
    {
        "id": 1216,
        "imageid": 347,
        "unknown1_6": 13,
        "str_name": "サンダーボルトワインダー",
        "unknown2_0": 3,
        "unknown10_139": -32768,
        "str_description": "強い魔法の力で敵に電気を発散する。サンダーボルトは周辺の敵に転移し、感電される。既に攻撃を受けた敵にもサンダーボルトが反射される。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 1217,
        "imageid": 348,
        "unknown1_6": 13,
        "str_name": "花の乙女デラックス",
        "unknown2_0": 4,
        "unknown10_139": -32768,
        "str_description": "変身を繰り返して光の破片を飛ばし周囲の敵を攻撃する。攻撃が終わったらプリンセスに戻る。",
        "str_progress": "威力, 範囲, 発動確率,  攻撃回数"
    },
    {
        "id": 1218,
        "imageid": 484,
        "unknown1_6": 13,
        "str_name": "スターライトパレード",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "銀河状態の敵に物理攻撃をすると2回の追加ダメージ",
        "str_progress": "なし"
    },
    {
        "id": 1219,
        "imageid": 485,
        "unknown1_6": 13,
        "str_name": "華麗なる変身",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "ローズガーデン範囲内にいると変身スキルが解除されない",
        "str_progress": "無し"
    },
    {
        "id": 1220,
        "imageid": 486,
        "unknown1_6": 13,
        "str_name": "平和の歌",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "リトルウィッチが皆と歌っている間、パーティーメンバー数によってパーティーメンバーのスキルレベルを上昇させる",
        "str_progress": "なし"
    },
    {
        "id": 1221,
        "imageid": 54,
        "unknown1_6": 2,
        "str_name": "メテオシャワーダブルインパクト",
        "unknown2_0": 5,
        "unknown10_139": 4096,
        "str_description": "星界より巨大な隕石を召喚して、広範囲の敵に10回攻撃する。長い詠唱時間が必要。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 1222,
        "imageid": 51,
        "unknown1_6": 2,
        "str_name": "ファイヤーワールド",
        "unknown2_0": 2,
        "unknown10_139": 16384,
        "str_description": "自分の頭上に高威力のファイアーボールを複数生み出し、それを一斉に飛ばし、爆発させる。発動後、ファイアーボールが生成されるまで移動可能。",
        "str_progress": "ボールの数, 威力"
    },
    {
        "id": 1223,
        "imageid": 53,
        "unknown1_6": 2,
        "str_name": "インフェルノストーム",
        "unknown2_0": 4,
        "unknown10_139": 16384,
        "str_description": "前方の敵に火炎を巻き起こして攻撃する。\r\n前方の一直線上の敵に大ダメージを与える。従来のスキルより攻撃範囲が増加。",
        "str_progress": "威力, 射程距離"
    },
    {
        "id": 1224,
        "imageid": 490,
        "unknown1_6": 2,
        "str_name": "業火の禁書",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "火炎魔法の神髄が記された禁書を得ることにより、火炎魔法の消耗CPが減少、およびに火炎魔法の威力が増加する。",
        "str_progress": "無し"
    },
    {
        "id": 1225,
        "imageid": 59,
        "unknown1_6": 2,
        "str_name": "クーラントキャノン",
        "unknown2_0": 5,
        "unknown10_139": 8192,
        "str_description": "小範囲の敵に水大砲を発射する。従来スキルより、鈍化効果が上昇。",
        "str_progress": "威力, 射程距離, 範囲"
    },
    {
        "id": 1226,
        "imageid": 751,
        "unknown1_6": 2,
        "str_name": "アイスフィールド",
        "unknown2_0": 3,
        "unknown10_139": -32768,
        "str_description": "地面を凍らせて範囲内の敵に持続的ダメージを与え、氷状態にする。",
        "str_progress": "威力"
    },
    {
        "id": 1227,
        "imageid": 752,
        "unknown1_6": 2,
        "str_name": "フロストシャード",
        "unknown2_0": 2,
        "unknown10_139": -32768,
        "str_description": "鋭い氷の破片を敵に放つ。破片に当たった敵は霜に包まれる。",
        "str_progress": "威力, 氷持続時間"
    },
    {
        "id": 1228,
        "imageid": 748,
        "unknown1_6": 2,
        "str_name": "氷の心",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "血が凍りつくほど体温を下げ、水の精霊と直接共感する。クーラントキャノン使用中、一定の確率で呼び出しに答えた水の精霊が支援魔法で攻撃する。",
        "str_progress": "無し"
    },
    {
        "id": 1229,
        "imageid": 74,
        "unknown1_6": 2,
        "str_name": "デッドリーヒット",
        "unknown2_0": 1,
        "unknown10_139": 12288,
        "str_description": "魔法の杖で敵を攻撃し、一定確率で致命打と決定打を与えることができる。チャージングと同様、上位魔法を使うための準備行動でもある。攻撃した敵が感電状態か、鈍化状態の場合追加効果が発動。限界突破時、効果が10倍で適用。だたし、CPが不足している場合は発動しない。",
        "str_progress": "威力, 致命打, 命中率"
    },
    {
        "id": 1230,
        "imageid": 62,
        "unknown1_6": 2,
        "str_name": "エレクトリックシールド",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "自分の周囲に稲妻を含む小さい嵐を発生させ、周辺の敵を感電状態にする。",
        "str_progress": "防御力, 威力, 回避率, 持続時間"
    },
    {
        "id": 1231,
        "imageid": 750,
        "unknown1_6": 2,
        "str_name": "エレクトリックエリア",
        "unknown2_0": 2,
        "unknown10_139": -16384,
        "str_description": "稲妻を流し込み、持続的にダメージを与え感電状態にする。",
        "str_progress": "威力"
    },
    {
        "id": 1232,
        "imageid": 492,
        "unknown1_6": 2,
        "str_name": "魔導戦闘",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "近接格闘を行うウィザードたちの戦闘方法。感電爆破によって敵が倒れた時に、引き寄せの風を起こし戦闘をサポートしてくれる。",
        "str_progress": "無し"
    },
    {
        "id": 1233,
        "imageid": 79,
        "unknown1_6": 3,
        "str_name": "ヴァンパイアクロー",
        "unknown2_0": 4,
        "unknown10_139": 4096,
        "str_description": "敵に素早い動きで連続攻撃を行う。力の値次第でより高いダメージを与えることができる。",
        "str_progress": "威力、速度、攻撃回数"
    },
    {
        "id": 1234,
        "imageid": 99,
        "unknown1_6": 3,
        "str_name": "ブラッディビーストベルセルク",
        "unknown2_0": 5,
        "unknown10_139": 16384,
        "str_description": "野獣の本能を呼び覚まし、攻撃力と火属性攻撃力、速度、体力が上昇。全ての物理攻撃に出血効果が追加され、出血状態にかかった敵を攻撃する場合、防御力が一定時間上昇。",
        "str_progress": "上昇率、速度、命中率、持続時間"
    },
    {
        "id": 1235,
        "imageid": 80,
        "unknown1_6": 3,
        "str_name": "ライカンスローフパン",
        "unknown2_0": 1,
        "unknown10_139": 16384,
        "str_description": "顎で敵を噛み千切る。出血状態の敵を攻撃すると、敵の物理攻撃力と敵致命打低下を下げる。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 1236,
        "imageid": 493,
        "unknown1_6": 3,
        "str_name": "血の覚醒",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "出血状態の敵に攻撃すると、与えた被害量の一定分の体力を回復する。敵から一定数値以上のダメージを受けた場合、決められた限界数値分だけのダメージを受ける。",
        "str_progress": "無し"
    },
    {
        "id": 1237,
        "imageid": 87,
        "unknown1_6": 3,
        "str_name": "バーニングフレイム",
        "unknown2_0": 3,
        "unknown10_139": 8192,
        "str_description": "全身に炎を纏い、体を回転して炎のボールを作り出して敵に飛ばす。炎のボールはゆっくりと進んで、敵とその周辺にダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1238,
        "imageid": 91,
        "unknown1_6": 3,
        "str_name": "フルムーンオーバーフロー",
        "unknown2_0": 2,
        "unknown10_139": -32768,
        "str_description": "スキルを使用すると敵が一定の時間動けなくなる。怯えた敵の移動速度と攻撃速度、ブロック率が一定時間減少する。",
        "str_progress": "移動速度, 攻撃速度, ブロック減少率"
    },
    {
        "id": 1239,
        "imageid": 94,
        "unknown1_6": 3,
        "str_name": "ハウリングエルプション",
        "unknown2_0": 5,
        "unknown10_139": -32768,
        "str_description": "狼の咆哮で魔法力場を生み出し、自分の周囲に大爆発を起こす。従来より威力と範囲が増加。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 1240,
        "imageid": 494,
        "unknown1_6": 3,
        "str_name": "灼熱の心臓",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "心臓から燃え上がる灼熱の魔力で火属性ダメージを強化させ、火属性ダメージの強化限界値を増加させる。",
        "str_progress": "無し"
    },
    {
        "id": 1241,
        "imageid": 88,
        "unknown1_6": 3,
        "str_name": "リバウンディングリニア",
        "unknown2_0": 4,
        "unknown10_139": 12288,
        "str_description": "突進して攻撃し、敵にぶつかると次の敵に反射する。一定時間、回避率が増加。攻撃した敵に対して、ウルフマンの現在の体力に比例して追加ダメージを与える。",
        "str_progress": "威力、命中率、反射回数"
    },
    {
        "id": 1242,
        "imageid": 93,
        "unknown1_6": 3,
        "str_name": "ルナティックロアー",
        "unknown2_0": 4,
        "unknown10_139": -16384,
        "str_description": "敵を狂わせて誰にでも攻撃させる狼の咆哮。一定確率でスタン状態になる。敵の状態抵抗力も減少する。叫んでいる間はずっと有効。",
        "str_progress": "発動確率委、異常状態系抵抗力低下"
    },
    {
        "id": 1243,
        "imageid": 92,
        "unknown1_6": 3,
        "str_name": "エンミティグローリング",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "小さな鳴き声で敵を戦意喪失させて、攻撃力と命中率を低下させる。一定CPを消耗し、バウンシングリニア(リバウンディングリニア)の攻撃力を大幅増加させる。吠えている間はずっと有効。",
        "str_progress": "攻撃力\/命中率減少率"
    },
    {
        "id": 1244,
        "imageid": 495,
        "unknown1_6": 3,
        "str_name": "月輪の呪縛",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "クリティカル確率と敵致命打抵抗低下が上昇する。",
        "str_progress": "無し"
    },
    {
        "id": 1245,
        "imageid": 102,
        "unknown1_6": 4,
        "str_name": "エクソシズムリチュアル",
        "unknown2_0": 3,
        "unknown10_139": 4096,
        "str_description": "悪を浄化する攻撃を放つ。二度目の打撃が範囲内の敵を全て攻撃。アンデッド系と悪魔系にクリティカルヒットが発生する確率が向上。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 1246,
        "imageid": 101,
        "unknown1_6": 4,
        "str_name": "ソーンシャタリング",
        "unknown2_0": 2,
        "unknown10_139": 16384,
        "str_description": "光のトゲがある一撃を加える。アンデッド系にクリティカルヒットが発生。光のトゲが爆発しながら、範囲内の全ての敵の防御力を低下させる。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 1247,
        "imageid": 118,
        "unknown1_6": 4,
        "str_name": "アタナシオス",
        "unknown2_0": 4,
        "unknown10_139": 16384,
        "str_description": "指定した味方一人の体力を一定時間、持続的に回復する。使用者が自分自身に使用する場合、使用者のレベルによって防御力上昇。",
        "str_progress": "回復量, 持続時間"
    },
    {
        "id": 1248,
        "imageid": 729,
        "unknown1_6": 4,
        "str_name": "栄誉の告知",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "神のお告げを受けて敵を貫く。敵の致命打抵抗率が低下する。",
        "str_progress": "なし"
    },
    {
        "id": 1249,
        "imageid": 105,
        "unknown1_6": 4,
        "str_name": "シールドグレア",
        "unknown2_0": 2,
        "unknown10_139": 8192,
        "str_description": "攻撃を受ける瞬間、盾で敵の攻撃を防ぐと同時に、盾に反射する光で相手の視界を奪い、感電状態にする。遠距離の敵にも適用される。感電状態の敵が攻撃する場合に追加効果が発動。",
        "str_progress": "威力, 発動確率"
    },
    {
        "id": 1251,
        "imageid": 106,
        "unknown1_6": 4,
        "str_name": "コンバートファナティック",
        "unknown2_0": 2,
        "unknown10_139": -32768,
        "str_description": "対象を狂信状態にさせる。狂信状態になった対象は、攻撃速度が増加する代わりに攻撃力が低下する。アンデッドに使用する場合は、麻痺、逃亡などの状態異常は発生しない。",
        "str_progress": "キャスティング速度, 限界レベル"
    },
    {
        "id": 1252,
        "imageid": 104,
        "unknown1_6": 4,
        "str_name": "ホーリーショックブロッキング",
        "unknown2_0": 1,
        "unknown10_139": -32768,
        "str_description": "聖なる力と盾で周辺の敵を硬直させる。",
        "str_progress": "ブロック率"
    },
    {
        "id": 1253,
        "imageid": 497,
        "unknown1_6": 4,
        "str_name": "崇高な復讐",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "シールドピアシング攻撃にダメージを受けてもシールドフラッシュのダメージを与えられる。",
        "str_progress": "無し"
    },
    {
        "id": 1254,
        "imageid": 728,
        "unknown1_6": 4,
        "str_name": "神聖の顕現",
        "unknown2_0": 5,
        "unknown10_139": 12288,
        "str_description": "ビショップの祈りで真の聖なる力が放たれ十字の印が刻まれる。十字架に触れたモンスターは光属性のダメージを受ける。",
        "str_progress": "威力"
    },
    {
        "id": 1255,
        "imageid": 108,
        "unknown1_6": 4,
        "str_name": "ミラーオベリスク",
        "unknown2_0": 5,
        "unknown10_139": -16384,
        "str_description": "巨大な盾を召喚して選択した味方に加護を施す。加護に守られている間は、魔法ダメージの一部をビショップに転移する。範囲魔法にも適用される。ビショップの抵抗力が上昇する。従来より最大使用数とダメージ転移量増加。",
        "str_progress": "ダメージ倍率, 持続時間, 抵抗力"
    },
    {
        "id": 1256,
        "imageid": 119,
        "unknown1_6": 4,
        "str_name": "エレメンタルハーモニー",
        "unknown2_0": 4,
        "unknown10_139": -16384,
        "str_description": "元素の精霊達を召喚し、自分の周囲にいるパーティーメンバーの元素抵抗力及び状態異常抵抗力を高め、純粋魔法による元素攻撃力を増加する。さらに魔法攻撃を一定確率で吸収。パーティーメンバーの数によってスキルレベル上昇幅が増加する。",
        "str_progress": "抵抗力、上昇率、範囲"
    },
    {
        "id": 1257,
        "imageid": 498,
        "unknown1_6": 4,
        "str_name": "光輝の証",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "攻撃した対象の光属性を弱化させる。",
        "str_progress": "なし"
    },
    {
        "id": 1258,
        "imageid": 135,
        "unknown1_6": 5,
        "str_name": "ゴスペルキリグマ",
        "unknown2_0": 3,
        "unknown10_139": 4096,
        "str_description": "敵を教化して味方にすると同時に、敵の信仰心を吸収し、自分の能力を強化する。敵のタイプによりその効果が異なる。",
        "str_progress": "成功確率、限界レベル"
    },
    {
        "id": 1259,
        "imageid": 128,
        "unknown1_6": 5,
        "str_name": "ホーリーフェザーニードル",
        "unknown2_0": 2,
        "unknown10_139": 16384,
        "str_description": "聖なる力が込められた翼の大きい羽を飛ばして攻撃する。攻撃された敵は命中率と回避率が低下する。従来より攻撃範囲が増加。",
        "str_progress": "威力, 命中率, 持続時間"
    },
    {
        "id": 1260,
        "imageid": 127,
        "unknown1_6": 5,
        "str_name": "リペントプレシング",
        "unknown2_0": 2,
        "unknown10_139": 16384,
        "str_description": "巨大な天上界のハンマーを召喚して、敵の頭上に落とす。敵はハンマーの衝撃で一定時間レベルが低下して攻撃が楽になる。",
        "str_progress": "威力, 命中率, 敵レベル低下"
    },
    {
        "id": 1261,
        "imageid": 499,
        "unknown1_6": 5,
        "str_name": "弱点把握",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "ゴスペルキリグマの憑依バフ発生時に、同じスキル使用するとダメージ上昇。違うスキルを使用すると新たに弱点把握が必要。",
        "str_progress": "無し"
    },
    {
        "id": 1262,
        "imageid": 145,
        "unknown1_6": 5,
        "str_name": "ドゥームデイ",
        "unknown2_0": 5,
        "unknown10_139": 8195,
        "str_description": "光の球体を召喚し、一定範囲内の全ての敵を攻撃する稲妻を落とす。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 1263,
        "imageid": 142,
        "unknown1_6": 5,
        "str_name": "サブミッションアンホーリー",
        "unknown2_0": 3,
        "unknown10_139": -32768,
        "str_description": "自分の周囲一定半径内のアンデッド、悪魔系の敵を神聖な力で屈服させる。聖なる光により敵の光属性抵抗力が低下する。また、神聖な力で魔法致命打確率を増加させる。",
        "str_progress": "範囲、光抵抗減少、魔法致命打確率"
    },
    {
        "id": 1264,
        "imageid": 134,
        "unknown1_6": 5,
        "str_name": "マジックエクスペリング",
        "unknown2_0": 3,
        "unknown10_139": -32768,
        "str_description": "聖霊を宿し、敵にかけられた各種補助魔法を解除する。解除に成功すると、一定確率で決められた時間の間、光属性攻撃力増加。",
        "str_progress": "成功確率, CP減少量"
    },
    {
        "id": 1265,
        "imageid": 500,
        "unknown1_6": 5,
        "str_name": "双翼の光",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "折れた翼の力を取り戻し、光属性の魔法攻撃力を増加させる。",
        "str_progress": "なし"
    },
    {
        "id": 1266,
        "imageid": 139,
        "unknown1_6": 5,
        "str_name": "セイントウェイ",
        "unknown2_0": 5,
        "unknown10_139": 12288,
        "str_description": "両方向で移動できる二つの光のゲートを開く。同じフィールド内でのみ移動可能。",
        "str_progress": "持続時間, 移動距離"
    },
    {
        "id": 1267,
        "imageid": 136,
        "unknown1_6": 5,
        "str_name": "ホーリースピリッツ",
        "unknown2_0": 2,
        "unknown10_139": -16384,
        "str_description": "敵の全ての攻撃から自分を保護してくれる絶対的な防御膜を形成する。持続時間中は魂の状態となり、自由に移動可能。持続時間内にスキルを再度使用すると、肉体が魂がある場所に移動、スキルを使用しないと魂が元の位置に強制移動。",
        "str_progress": "持続時間"
    },
    {
        "id": 1268,
        "imageid": 137,
        "unknown1_6": 5,
        "str_name": "トランスポーテーション",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "自分とパーティーメンバーを共に近くの安全な町に移動する。",
        "str_progress": "キャスティング速度, 成功確率, 移動距離"
    },
    {
        "id": 1269,
        "imageid": 501,
        "unknown1_6": 5,
        "str_name": "天上の祝福",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "天上からの祝福により基本移動速度増加し、該当スキル習得時にスキル「郷愁」に追加効果が付与される。",
        "str_progress": "なし"
    },
    {
        "id": 1270,
        "imageid": 1270,
        "unknown1_6": 32,
        "str_name": "分身攻撃[騎神]",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "自分の分身を作り、計5回の攻撃を与える。",
        "str_progress": ""
    },
    {
        "id": 1271,
        "imageid": 1271,
        "unknown1_6": 32,
        "str_name": "大斬り[騎神]",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1272,
        "imageid": 1272,
        "unknown1_6": 32,
        "str_name": "メテオシャワー(M)[騎神]",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1273,
        "imageid": 1273,
        "unknown1_6": 32,
        "str_name": " 噛み付くll[M]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵を噛み付いて負傷を負わせる。負傷を負った敵は動きが鈍くなる。",
        "str_progress": " "
    },
    {
        "id": 1274,
        "imageid": 1274,
        "unknown1_6": 32,
        "str_name": "回し蹴りll[M]",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "前足を振り回し、相手を蹴る。ダメージを受けた敵は押し出され、出血状態になる。",
        "str_progress": " "
    },
    {
        "id": 1275,
        "imageid": 1275,
        "unknown1_6": 32,
        "str_name": "ソニックブロー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "剣を出したまま回転して、周囲の敵に剣圧の風を飛ばす。",
        "str_progress": "威力, 範囲, 命中率"
    },
    {
        "id": 1276,
        "imageid": 1276,
        "unknown1_6": 32,
        "str_name": "ワイルドスタンプヘルパー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "剣を出したまま3回転して、周囲の敵に剣圧の風を飛ばす。従来のスキルと比べて、より正確な攻撃が可能。",
        "str_progress": "威力, 爆発範囲"
    },
    {
        "id": 1277,
        "imageid": 1277,
        "unknown1_6": 32,
        "str_name": "サベージスタンプヘルパー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "剣を出したまま3回転して、周囲の敵に剣圧の風を飛ばす。従来のスキルと比べて、より正確な攻撃が可能。",
        "str_progress": "威力, 爆発範囲"
    },
    {
        "id": 1278,
        "imageid": 1278,
        "unknown1_6": 32,
        "str_name": "花に噛み付く",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵の頭に噛み付いてダメージを与え、出血状態異常にする。",
        "str_progress": " "
    },
    {
        "id": 1279,
        "imageid": 1279,
        "unknown1_6": 32,
        "str_name": "毒針発射",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "大量の毒針を発射する。",
        "str_progress": ""
    },
    {
        "id": 1280,
        "imageid": 1280,
        "unknown1_6": 32,
        "str_name": "花のてっぺんに噛み付く",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵の頭に噛み付いてダメージを与え、出血状態異常にする。",
        "str_progress": " "
    },
    {
        "id": 1281,
        "imageid": 1281,
        "unknown1_6": 32,
        "str_name": "毒針の束",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "大量の毒針を発射する。",
        "str_progress": ""
    },
    {
        "id": 1282,
        "imageid": 1282,
        "unknown1_6": -1,
        "str_name": "ダークエクスプロージョン",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1283,
        "imageid": 565,
        "unknown1_6": -1,
        "str_name": "マルチブーメランカッティング_呼",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1284,
        "imageid": 560,
        "unknown1_6": -1,
        "str_name": "ファイナライジングプレッシャー",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1300,
        "imageid": 617,
        "unknown1_6": 22,
        "str_name": " レフトファイア",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "足のホルスターから左手で銃を出し、敵の方に一回発射。",
        "str_progress": "威力、攻撃速度"
    },
    {
        "id": 1301,
        "imageid": 625,
        "unknown1_6": 22,
        "str_name": "ニーキャッピング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "左手の銃で敵の足を狙い撃つ。攻撃された敵は一定時間移動できない。",
        "str_progress": "威力"
    },
    {
        "id": 1302,
        "imageid": 624,
        "unknown1_6": 22,
        "str_name": "チェックマーク",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "素早く拳銃を取り出して敵に向かて発射。撃たれた敵にはマークが表れる。マークが表れた敵には、チェックメイト及び長銃系列のスキルがターゲッティングなしで敵中する。",
        "str_progress": "威力"
    },
    {
        "id": 1303,
        "imageid": 626,
        "unknown1_6": 22,
        "str_name": "スクウェアエイム",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "左手で持った銃に強い魔力を込めて発砲。弾丸は攻撃線上にいる全ての敵を貫通する。",
        "str_progress": "威力、命中率、確率"
    },
    {
        "id": 1304,
        "imageid": 627,
        "unknown1_6": 22,
        "str_name": "パラマウントフォーカス",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "CPを持続的に消耗し、マスケッティアのクリティカル確率とクリティカルダメージ、ブロック貫通確率を上昇させる。",
        "str_progress": "威力、確率"
    },
    {
        "id": 1305,
        "imageid": 628,
        "unknown1_6": 22,
        "str_name": "ライトファイア",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "右腕のホルスターから右手で銃を出し、敵の方に一回発射。",
        "str_progress": "威力、命中率"
    },
    {
        "id": 1306,
        "imageid": 765,
        "unknown1_6": 22,
        "str_name": "ターンイットオン",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "好きな場所に魔力水晶を投げて爆破させる。爆破した魔力水晶は周辺の敵にダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1307,
        "imageid": 630,
        "unknown1_6": 22,
        "str_name": "ピールオフ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "右手で持った銃の弾丸に魔力波長を起こして発砲。ブロック効果を貫通して敵のバフを除外。",
        "str_progress": "威力"
    },
    {
        "id": 1308,
        "imageid": 631,
        "unknown1_6": 22,
        "str_name": "ヘフティーオプレス",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "右手の銃で重めの弾丸を発射。撃たれた敵は大きな衝撃によりCP減少。",
        "str_progress": "威力"
    },
    {
        "id": 1309,
        "imageid": 607,
        "unknown1_6": 22,
        "str_name": "ケアフルチョイス",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵に向かって慎重に照準。少し時間はかかるが、弾丸は必ず命中する。",
        "str_progress": "威力"
    },
    {
        "id": 1310,
        "imageid": 608,
        "unknown1_6": 22,
        "str_name": "チェックメイト",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "両手の銃を出し敵に連続発射。チェックマークの烙印が付いた敵に優先的に発射する。",
        "str_progress": "威力、攻撃回数"
    },
    {
        "id": 1311,
        "imageid": 609,
        "unknown1_6": 22,
        "str_name": "アトラクションドロー",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "素早く回転しながら両手の拳銃を敵に発射し、連続的なダメージを与える。",
        "str_progress": "威力、攻撃回数"
    },
    {
        "id": 1312,
        "imageid": 610,
        "unknown1_6": 22,
        "str_name": "リボルバースナップ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "手首をもっと早く回し、射撃速度を増加させる。連射速度が速くなる。",
        "str_progress": "攻撃速度"
    },
    {
        "id": 1313,
        "imageid": 611,
        "unknown1_6": 22,
        "str_name": "チップフォーユー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "戦闘に没頭し、より攻撃的な射撃を行う。",
        "str_progress": "威力"
    },
    {
        "id": 1314,
        "imageid": 612,
        "unknown1_6": 22,
        "str_name": "オーバーブレット",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "集中力を極限まで高めて追加射撃を行う。体内で発生した熱エネルギーが指先まで持続的に供給され、弾丸に火属性ダメージが付与される。",
        "str_progress": "威力"
    },
    {
        "id": 1315,
        "imageid": 613,
        "unknown1_6": 22,
        "str_name": "ソーサラーズリロード",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "長銃の魔力をチャージ。長銃を使用できるようになると同時に長銃の威力を増加。",
        "str_progress": "威力、充填最大値"
    },
    {
        "id": 1316,
        "imageid": 614,
        "unknown1_6": 22,
        "str_name": "エンジュアー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "長銃の魔力充填の効率を上げる為、CPを持続的に消耗。長銃の魔力充填時間が短縮され、威力は上昇。",
        "str_progress": "威力、充填時間短縮"
    },
    {
        "id": 1317,
        "imageid": 615,
        "unknown1_6": 22,
        "str_name": "ホロウポイント",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "背中の長銃を出し、長銃の魔力を一つ消耗して敵に発射する。長銃の弾丸が拡散され、周辺の敵にまでダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1318,
        "imageid": 616,
        "unknown1_6": 22,
        "str_name": "インセンディオリーシェル",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "長銃の魔力を二つ消耗して爆発を起こす。爆発した対象と周辺に火属性のダメージを与える。攻撃した場所には炎の跡が残って、持続的なダメージを与えて敵の命中率まで減少させる。",
        "str_progress": "威力、持続時間"
    },
    {
        "id": 1319,
        "imageid": 618,
        "unknown1_6": 22,
        "str_name": "パーティータイム",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "全ての魔力を消耗して長銃を発射し、対象と周辺にダメージを与える。残りの魔力によってその威力が変わる。",
        "str_progress": "威力"
    },
    {
        "id": 1320,
        "imageid": 619,
        "unknown1_6": 22,
        "str_name": "アクロバティックガンナー",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "床に背中を当てて、身体を回転させ両足を振り回し攻撃する。攻撃が的中すると、敵は後ろへ倒れて気絶する。",
        "str_progress": "威力、攻撃回数"
    },
    {
        "id": 1321,
        "imageid": 620,
        "unknown1_6": 22,
        "str_name": "ウイーゼルアウト",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "身体を素早く動かして敵の攻撃を回避する。",
        "str_progress": "回避率"
    },
    {
        "id": 1322,
        "imageid": 621,
        "unknown1_6": 22,
        "str_name": "ハングオン",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "二つの銃を出してまた入れ、CPをチャージ。",
        "str_progress": "上昇数値"
    },
    {
        "id": 1323,
        "imageid": 622,
        "unknown1_6": 22,
        "str_name": "アブゾーブヒート",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "二つの銃を出してまた入れ、CPをチャージ。スキルを使用すると、しばらくの間獲得CP量が増加。",
        "str_progress": "上昇数値、持続時間"
    },
    {
        "id": 1324,
        "imageid": 623,
        "unknown1_6": 22,
        "str_name": "フォワードヴォリーション",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "二つの銃を出してまた入れ、CPをチャージ。しばらくの間、敵が致命打を受ける確率が増加。",
        "str_progress": "上昇数値、持続時間"
    },
    {
        "id": 1325,
        "imageid": 681,
        "unknown1_6": 23,
        "str_name": "エクスプロード",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "圧縮した可燃性ガスを錬成して敵の周りに単発の爆発を発生させる。敵は火属性ダメージを受ける。",
        "str_progress": "威力"
    },
    {
        "id": 1326,
        "imageid": 682,
        "unknown1_6": 23,
        "str_name": "ダブルデトネイション",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "圧縮した可燃性ガスを錬成して敵の周りに連続した爆発を発生させる。敵は一定時間硬直状態になり、火属性ダメージを受ける。",
        "str_progress": "威力"
    },
    {
        "id": 1327,
        "imageid": 683,
        "unknown1_6": 23,
        "str_name": "フライングエンバー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "単体の敵を発火させる。火炎ダメージを受けた敵は火傷状態となり、鎮火するまで火属性抵抗が低下する。",
        "str_progress": "威力、火抵抗減少"
    },
    {
        "id": 1328,
        "imageid": 684,
        "unknown1_6": 23,
        "str_name": "スパートフレア",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "錬成した炎を前方に放射する。範囲内にいる敵は火属性ダメージを受ける。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 1329,
        "imageid": 685,
        "unknown1_6": 23,
        "str_name": "アウトバースト",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "錬金術を使用して、フライングエンバー状態の敵単体に数回の爆発を発生させる。",
        "str_progress": "威力、連打回数"
    },
    {
        "id": 1330,
        "imageid": 686,
        "unknown1_6": 23,
        "str_name": "メディカルリキッド",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "錬成した薬物を用いて指定した味方の体力を即時に回復させる。知識値によって回復量が増加する。",
        "str_progress": "回復量"
    },
    {
        "id": 1331,
        "imageid": 687,
        "unknown1_6": 23,
        "str_name": "セラピーエリア",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "錬金術を使用して、一定の範囲に細胞再生ガスを発生させる。効果範囲にいる味方の体力が回復する。知識値によって回復量が増加する。",
        "str_progress": "回復量、範囲"
    },
    {
        "id": 1332,
        "imageid": 688,
        "unknown1_6": 23,
        "str_name": "フローイングトリートメント",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "指定した味方に錬成した回復薬を使用する。薬の効果により一定時間味方の体力が持続的に回復する。知識値によって回復量が増加。",
        "str_progress": "回復量"
    },
    {
        "id": 1333,
        "imageid": 689,
        "unknown1_6": 23,
        "str_name": "バイタルトランスファー",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "錬金術の等価交換の原則を利用して、消費したCP分の一定の倍数の体力と全ての状態異常を回復させる。性質を変えるタイプの錬金術は危険なため、再使用までに時間が必要となる。",
        "str_progress": "回復量"
    },
    {
        "id": 1334,
        "imageid": 690,
        "unknown1_6": 23,
        "str_name": "プロモートリフォーム",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "人体錬成術を用いて一時的に臓器の機能を変異させる。効果中はポーションによる回復量と回復速度が増加する。",
        "str_progress": "ポーション回復量および回復速度増加"
    },
    {
        "id": 1335,
        "imageid": 691,
        "unknown1_6": 23,
        "str_name": "ブローイン : ガスティ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "周囲の空気を圧縮させて指定した味方に突風を吹きつける。風圧によって味方の物理攻撃力が増加する。",
        "str_progress": "物理攻撃力増加率、持続時間"
    },
    {
        "id": 1336,
        "imageid": 692,
        "unknown1_6": 23,
        "str_name": "ブローイン : ゼフィーロ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "周囲の空気を圧縮させて指定した味方にそよ風を吹きつける。風圧によって味方の魔法攻撃力が増加する。",
        "str_progress": "魔法攻撃力増加率、持続時間"
    },
    {
        "id": 1337,
        "imageid": 693,
        "unknown1_6": 23,
        "str_name": "ブローイン : アセンディング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "周囲の空気を圧縮させて指定した味方に暴風を吹きつける。風圧によって味方の最大体力と最大CPが増加する。",
        "str_progress": "体力及びCP増加率、持続時間"
    },
    {
        "id": 1338,
        "imageid": 694,
        "unknown1_6": 23,
        "str_name": "ブローイン : スウィフト",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "周囲の空気を圧縮させて指定した味方に素早い風を吹きつける。風圧によって味方の攻撃速度と移動速度が増加。",
        "str_progress": "速度増加率、持続時間"
    },
    {
        "id": 1339,
        "imageid": 695,
        "unknown1_6": 23,
        "str_name": "ライジングカレント",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "錬金術を使用して上昇気流を発生させる。気流の力によりアルケミストの周囲の風の効果が強化される。",
        "str_progress": "威力"
    },
    {
        "id": 1340,
        "imageid": 696,
        "unknown1_6": 23,
        "str_name": "ビルドトルーパー : イグノア",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "錬成した攻撃型ホムンクルスを召喚する。ホムンクルス「イグノア」が味方の攻撃を支援する。",
        "str_progress": "キャスティング時間"
    },
    {
        "id": 1341,
        "imageid": 697,
        "unknown1_6": 23,
        "str_name": "ビルドタンカー : リアム",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "錬成した防御型ホムンクルスを召喚する。ホムンクルス「リアム」が味方の防御を支援する。",
        "str_progress": "キャスティング時間"
    },
    {
        "id": 1342,
        "imageid": 698,
        "unknown1_6": 23,
        "str_name": "ビルドヒーラー : シンシア",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "錬成した回復型ホムンクルスを召喚する。ホムンクルス「シンシア」が味方の回復を支援する。",
        "str_progress": "キャスティング時間"
    },
    {
        "id": 1343,
        "imageid": 771,
        "unknown1_6": 23,
        "str_name": "ホムンクルスハードニング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "錬成したホムンクルスを強化させる。ホムンクルスの全てのステータスが向上する。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 1344,
        "imageid": 700,
        "unknown1_6": 23,
        "str_name": "エンハンス : ホムンクルス",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "ホムンクルスに特殊な薬物を投与して戦闘力を高める。ホムンクルスの体力、防御力、魔法抵抗力、全体属性、攻撃力が増加する。",
        "str_progress": "威力"
    },
    {
        "id": 1345,
        "imageid": 701,
        "unknown1_6": 23,
        "str_name": "ディストラスト",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "魔法を信用しないアルケミストたちが魔術師に対抗するために確立した教義。アルケミストの魔法属性抵抗力が増加する。",
        "str_progress": "全属性抵抗力増加"
    },
    {
        "id": 1346,
        "imageid": 702,
        "unknown1_6": 23,
        "str_name": "ハーフヴァンパイア",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "秘密のベールに隠された錬金術の中でも奥義に分類される知識体系。錬金術師の知識、および知恵が増加する。",
        "str_progress": "知識、知恵"
    },
    {
        "id": 1347,
        "imageid": 703,
        "unknown1_6": 23,
        "str_name": "インテーク",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "アルケミストが薬物の研究を行う。CPがわずかにチャージされる。",
        "str_progress": "キャスティング速度"
    },
    {
        "id": 1348,
        "imageid": 704,
        "unknown1_6": 23,
        "str_name": "ディプソジェニック",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "アルケミストが正体不明の薬物の研究を行う。CPがチャージされ魔法致命打確率が増加する。",
        "str_progress": "キャスティング速度"
    },
    {
        "id": 1349,
        "imageid": 705,
        "unknown1_6": 23,
        "str_name": "ドーピング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "アルケミストが禁じられた薬物の研究を行う。CPが大幅にチャージされスキルレベルが増加する。",
        "str_progress": "キャスティング速度、スキルレベル"
    },
    {
        "id": 1350,
        "imageid": 1350,
        "unknown1_6": 32,
        "str_name": "火炎の床",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1351,
        "imageid": 1351,
        "unknown1_6": 32,
        "str_name": "火炎範囲攻撃",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1352,
        "imageid": 1352,
        "unknown1_6": 32,
        "str_name": "アウトバースト追加効果",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "宇宙空間より巨大な隕石を召喚して、広範囲の敵を攻撃する。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 1500,
        "imageid": 1500,
        "unknown1_6": 32,
        "str_name": "MB00_ハルバードストライク",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "強く振り下ろすと同時に、武器の風圧で周囲の敵にも攻撃を加える",
        "str_progress": ""
    },
    {
        "id": 1501,
        "imageid": 1501,
        "unknown1_6": 32,
        "str_name": "MB01_ポイズンクロー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "毒のついた爪での攻撃技術",
        "str_progress": ""
    },
    {
        "id": 1502,
        "imageid": 1502,
        "unknown1_6": 32,
        "str_name": "MB02_ハウリング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1503,
        "imageid": 1503,
        "unknown1_6": 32,
        "str_name": "MB03_ダイビング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ガーフ専用機。その場で飛翔して急降下による体当たりを行う。攻撃を受けた敵は一定の確率でしばらくの間スタン状態になる。",
        "str_progress": ""
    },
    {
        "id": 1504,
        "imageid": 1504,
        "unknown1_6": 32,
        "str_name": "MB04_レイムストーム",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1505,
        "imageid": 1505,
        "unknown1_6": 32,
        "str_name": "MB05_ポイズンガス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "一定の範囲に毒ガスの雲を形成する。効果範囲にいる敵は毒に侵される",
        "str_progress": ""
    },
    {
        "id": 1510,
        "imageid": 1510,
        "unknown1_6": 32,
        "str_name": "MB10_インフェルノクロー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "近接基本攻撃",
        "str_progress": ""
    },
    {
        "id": 1511,
        "imageid": 1511,
        "unknown1_6": 32,
        "str_name": "MB11_インフェルノバイト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "高温の牙で敵に噛みつく。",
        "str_progress": ""
    },
    {
        "id": 1512,
        "imageid": 1512,
        "unknown1_6": 32,
        "str_name": "MB12_レイムストーム",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1513,
        "imageid": 1513,
        "unknown1_6": 32,
        "str_name": "MB13_インフェルノブレス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1514,
        "imageid": 1514,
        "unknown1_6": 32,
        "str_name": "MB14_メテオシャワー",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "宇宙空間より巨大な隕石を召喚して、広範囲の敵を攻撃する",
        "str_progress": ""
    },
    {
        "id": 1520,
        "imageid": 1520,
        "unknown1_6": 32,
        "str_name": "MB20_スマッシング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "近接基本攻撃",
        "str_progress": ""
    },
    {
        "id": 1521,
        "imageid": 1521,
        "unknown1_6": 32,
        "str_name": "MB21_突き",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "中距離突き攻撃",
        "str_progress": ""
    },
    {
        "id": 1522,
        "imageid": 1522,
        "unknown1_6": 32,
        "str_name": "MB22_狂化",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "自身に移動速度および、攻撃速度バフがかかると同時に追加で光ダメージと水ダメージを与える。",
        "str_progress": ""
    },
    {
        "id": 1523,
        "imageid": 1523,
        "unknown1_6": 32,
        "str_name": "MB23_シャウティング",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1524,
        "imageid": 1524,
        "unknown1_6": 32,
        "str_name": "MB24_ライトニングサンダー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1525,
        "imageid": 1525,
        "unknown1_6": 32,
        "str_name": "MB25_バーティカルアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "バルザロズの連続攻撃、とても痛い。",
        "str_progress": ""
    },
    {
        "id": 1530,
        "imageid": 1530,
        "unknown1_6": 32,
        "str_name": "MB30_ハンマースマッシング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "近接基本攻撃",
        "str_progress": ""
    },
    {
        "id": 1531,
        "imageid": 1531,
        "unknown1_6": 32,
        "str_name": "MB31_ハンマースマッシング2",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "近接基本攻撃",
        "str_progress": ""
    },
    {
        "id": 1532,
        "imageid": 1532,
        "unknown1_6": 32,
        "str_name": "MB32_デスブーム",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1533,
        "imageid": 1533,
        "unknown1_6": 32,
        "str_name": "MB33_ハウリング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1534,
        "imageid": 1534,
        "unknown1_6": 32,
        "str_name": "MB34_ハンマークラッシュ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1540,
        "imageid": 1540,
        "unknown1_6": 32,
        "str_name": "MB40_ウォーターキャノン",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ニキアの遠距離攻撃魔法",
        "str_progress": ""
    },
    {
        "id": 1541,
        "imageid": 1541,
        "unknown1_6": 32,
        "str_name": "MB41_殴打",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "モンスターの一般的な攻撃",
        "str_progress": ""
    },
    {
        "id": 1542,
        "imageid": 1542,
        "unknown1_6": 32,
        "str_name": "MB42_スーパーノヴァ",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "落下する流れ星によって一定の範囲内の敵に3回攻撃を与える。一定の確率ですべての低下系状態異常にかかる。",
        "str_progress": ""
    },
    {
        "id": 1543,
        "imageid": 1543,
        "unknown1_6": 32,
        "str_name": "MB43_フローズンクェイク",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "周囲に冷気の振動を放出し対象を凍らせてしまう。",
        "str_progress": ""
    },
    {
        "id": 1544,
        "imageid": 1544,
        "unknown1_6": 32,
        "str_name": "MB44_アビス",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "宇宙空間より巨大な隕石を召喚して、広範囲の敵を攻撃する。",
        "str_progress": ""
    },
    {
        "id": 1545,
        "imageid": 1545,
        "unknown1_6": 32,
        "str_name": "MB45_稲妻回転攻撃[ニキア]",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1546,
        "imageid": 1546,
        "unknown1_6": 32,
        "str_name": "MB46_パワーヒーリング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "指定したパーティーメンバーの体力をほぼ完全に回復する。",
        "str_progress": ""
    },
    {
        "id": 1547,
        "imageid": 1547,
        "unknown1_6": 32,
        "str_name": "MB47_ウォーターメテオ[ニキア]",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "宇宙空間から巨大な隕石を召喚して、広範囲の敵を攻撃する。",
        "str_progress": ""
    },
    {
        "id": 1550,
        "imageid": 1550,
        "unknown1_6": 32,
        "str_name": "MB50_バルザロズスマッシュ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "強く振り下ろすと同時に、武器の風圧で周囲の敵にも攻撃を加える。",
        "str_progress": ""
    },
    {
        "id": 1551,
        "imageid": 1551,
        "unknown1_6": 32,
        "str_name": "MB51_ウォークライ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1552,
        "imageid": 1552,
        "unknown1_6": 32,
        "str_name": "MB52_ポイズンブレス",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "バルザロズ2の専用機。一定の範囲に毒ガスを噴射する。効果範囲にいる敵は毒に侵されることがある。",
        "str_progress": ""
    },
    {
        "id": 1553,
        "imageid": 1553,
        "unknown1_6": 32,
        "str_name": "MB53_デスブーム",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1554,
        "imageid": 1554,
        "unknown1_6": 32,
        "str_name": "MB54_バーティカルアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "バルザロズの連続攻撃、とても痛い。",
        "str_progress": ""
    },
    {
        "id": 1600,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "筋力強化",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的に力を増加させる。力が増加する代わりに健康が減少します。",
        "str_progress": ""
    },
    {
        "id": 1601,
        "imageid": 639,
        "unknown1_6": -1,
        "str_name": "知識強化 ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的に知識を増加させる。知識が増加する代わりに健康が減少します。",
        "str_progress": ""
    },
    {
        "id": 1602,
        "imageid": 640,
        "unknown1_6": -1,
        "str_name": "敏捷強化",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的に敏捷を増加させる。敏捷が増加する代わりにカリスマが減少する。",
        "str_progress": ""
    },
    {
        "id": 1603,
        "imageid": 641,
        "unknown1_6": -1,
        "str_name": "知恵強化",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的に知恵を増加させる。知恵が増加する代わりに敏捷が減少します。",
        "str_progress": ""
    },
    {
        "id": 1604,
        "imageid": 642,
        "unknown1_6": -1,
        "str_name": "健康強化",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的に健康を増加させる。健康が増加する代わりにカリスマが減少する。",
        "str_progress": ""
    },
    {
        "id": 1605,
        "imageid": 643,
        "unknown1_6": -1,
        "str_name": "カリスマ強化",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的にカリスマを増加させる。カリスマが増加する代わりに敏捷が減少します。",
        "str_progress": ""
    },
    {
        "id": 1606,
        "imageid": 644,
        "unknown1_6": -1,
        "str_name": "メンテナンス術",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "装備の点検・整備が上達し、耐久度が減少する確率を下げる。",
        "str_progress": ""
    },
    {
        "id": 1607,
        "imageid": 645,
        "unknown1_6": -1,
        "str_name": "体力再生",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵にダメージを与えた際に、HPが一定量回復する。\r\n<c:LTRED>※ PVP時は1\/20に減少し適用。<n>",
        "str_progress": ""
    },
    {
        "id": 1608,
        "imageid": 646,
        "unknown1_6": -1,
        "str_name": "ランダム追加ダメージ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "一定の数値分のランダム属性の追加ダメージが発生する。",
        "str_progress": ""
    },
    {
        "id": 1609,
        "imageid": 647,
        "unknown1_6": -1,
        "str_name": "物理強打",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "一定確率で強力な物理ダメージを与える。\r\n<c:LTRED>※物理致命打と同時に発動した場合、物理強打の効果は適用されない。<n>",
        "str_progress": ""
    },
    {
        "id": 1610,
        "imageid": 677,
        "unknown1_6": -1,
        "str_name": "魔法強打",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "一定確率で強力な魔法ダメージを与える。\r\n<c:LTRED>※魔法致命打と同時に発動した場合、魔法強打の効果は適用されない。<n>",
        "str_progress": ""
    },
    {
        "id": 1611,
        "imageid": 648,
        "unknown1_6": -1,
        "str_name": "魔力の暴走",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "一定の確率で、自身の攻撃力増加および魔法攻撃力増加に応じた数値によって限界ダメージを無視した追加ダメージが入る。\r\n<c:LTRED>※ 追加ダメージは最大 150％ 制限<n>",
        "str_progress": ""
    },
    {
        "id": 1612,
        "imageid": 649,
        "unknown1_6": -1,
        "str_name": "覚醒",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "一定の確率で、自身のダメージ限界を無視したダメージを与える。",
        "str_progress": ""
    },
    {
        "id": 1613,
        "imageid": 650,
        "unknown1_6": -1,
        "str_name": "適応力",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "特定のマップ進入時、減少する自分のステータス値を一定数回復させる。",
        "str_progress": ""
    },
    {
        "id": 1614,
        "imageid": 651,
        "unknown1_6": -1,
        "str_name": "耐性",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "特定のマップ進入時、減少した最大抵抗力を一定数回復させる。",
        "str_progress": ""
    },
    {
        "id": 1615,
        "imageid": 652,
        "unknown1_6": -1,
        "str_name": "魔力吸収",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "与えたダメージの一定数のCPを回復させる。",
        "str_progress": ""
    },
    {
        "id": 1616,
        "imageid": 653,
        "unknown1_6": -1,
        "str_name": "時空の歪み",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "被ダメージの最低保証値を一定数値減少させる。\r\n<c:LTRED>※ PVP時は1\/20に減少し適用。<n>",
        "str_progress": ""
    },
    {
        "id": 1617,
        "imageid": 654,
        "unknown1_6": -1,
        "str_name": "パラレルスティング改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "パラレルスティング 最大打撃回数が1回増加する。",
        "str_progress": ""
    },
    {
        "id": 1618,
        "imageid": 655,
        "unknown1_6": -1,
        "str_name": "ドラゴンツイスター改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "氷の龍が一定の確率でもう１回現れる。",
        "str_progress": ""
    },
    {
        "id": 1619,
        "imageid": 656,
        "unknown1_6": -1,
        "str_name": "テイルチェイサー改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "発動後、対象が生存している場合、追加で矢を発射し、対象の最大体力に比例したダメージを与える。",
        "str_progress": ""
    },
    {
        "id": 1620,
        "imageid": 657,
        "unknown1_6": -1,
        "str_name": "オーサムフォートレス改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "さらに強力な分身を作って、より強力で遠くまで届く攻撃を与える。",
        "str_progress": ""
    },
    {
        "id": 1621,
        "imageid": 754,
        "unknown1_6": -1,
        "str_name": "フォーベガーチャージング改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "フォーベガーチャージングの効果がより長い時間維持される。",
        "str_progress": ""
    },
    {
        "id": 1622,
        "imageid": 659,
        "unknown1_6": -1,
        "str_name": "ビーストベルセルク改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "血に酔った殺戮者の本能が覚醒し一定時間無敵状態になる。体力吸収効果も発生する。",
        "str_progress": ""
    },
    {
        "id": 1623,
        "imageid": 660,
        "unknown1_6": -1,
        "str_name": "ミラータワー改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミラータワーを自分に発動する場合、自分の最大HPの2倍、他人に発動する場合、自分の最大HPの1\/4のシールドを生成する。\r\n<c:LTRED>※シールド再使用時のクールタイム30秒、PVP時は自分にも1\/4のシールドのみ生成。<n>",
        "str_progress": ""
    },
    {
        "id": 1624,
        "imageid": 661,
        "unknown1_6": -1,
        "str_name": "ホーリークロス改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "体力が回復した対象に、回復量と同等のシールドを生成する。\r\n<c:LTRED>※PVP時はシールド再使用時のクールタイム30秒<n>",
        "str_progress": ""
    },
    {
        "id": 1625,
        "imageid": 662,
        "unknown1_6": -1,
        "str_name": "唐辛子を食べさせる改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "唐辛子の王「ハバネロ」を使用し、ペットが与えるダメージを増加させる。",
        "str_progress": ""
    },
    {
        "id": 1626,
        "imageid": 663,
        "unknown1_6": -1,
        "str_name": "召喚獣パワーアップ改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "召喚獣の潜在能力を引き出し最大体力を増加させる。",
        "str_progress": ""
    },
    {
        "id": 1627,
        "imageid": 664,
        "unknown1_6": -1,
        "str_name": "ダーティーフィーバー改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "攻撃回数を8回に増加させる。",
        "str_progress": ""
    },
    {
        "id": 1628,
        "imageid": 665,
        "unknown1_6": -1,
        "str_name": "分身改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "分身数を増やすことで、敵の攻撃に対してさらに2回分回多く耐えられるようになる。",
        "str_progress": ""
    },
    {
        "id": 1629,
        "imageid": 666,
        "unknown1_6": -1,
        "str_name": "ゴリアテスレイヤー改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "特殊な石の射出法により竜巻を発生させ、石に当たった敵を中心に吸い寄せる。\r\n<c:LTRED>※ PVP時は中央に吸い寄せられる。クールタイム10秒<n>",
        "str_progress": ""
    },
    {
        "id": 1630,
        "imageid": 667,
        "unknown1_6": -1,
        "str_name": "花の乙女スペシャル改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "花の乙女スペシャルスキルが発動しても、プリンセスに変身しない。",
        "str_progress": ""
    },
    {
        "id": 1631,
        "imageid": 668,
        "unknown1_6": -1,
        "str_name": "死霊術改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ネクロマンサーの支配下にあるアンデッドの体力を増加させる。",
        "str_progress": ""
    },
    {
        "id": 1632,
        "imageid": 669,
        "unknown1_6": -1,
        "str_name": "バインドブレイズ改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ダメージに加えて、敵の火属性抵抗力を下げる。",
        "str_progress": ""
    },
    {
        "id": 1633,
        "imageid": 676,
        "unknown1_6": -1,
        "str_name": "乱斬り改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "連打の最後に数人の敵を攻撃する強力な一撃を加える。",
        "str_progress": ""
    },
    {
        "id": 1634,
        "imageid": 670,
        "unknown1_6": -1,
        "str_name": "半月いなし改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "回避した瞬間に全身に闘気を集中させ反撃を準備する。",
        "str_progress": ""
    },
    {
        "id": 1635,
        "imageid": 798,
        "unknown1_6": -1,
        "str_name": "放射光改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "1秒間、無敵状態になる。",
        "str_progress": ""
    },
    {
        "id": 1636,
        "imageid": 672,
        "unknown1_6": -1,
        "str_name": "パニッシュメントクロス改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "攻撃時にさらにもう1体の分身幻影が追加され、もう一度攻撃を加える。",
        "str_progress": ""
    },
    {
        "id": 1637,
        "imageid": 673,
        "unknown1_6": -1,
        "str_name": "掃除の邪魔しちゃダメ改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ほうきでもう1回打撃する。",
        "str_progress": ""
    },
    {
        "id": 1638,
        "imageid": 674,
        "unknown1_6": -1,
        "str_name": "デモンコマンダー改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "地下界の下僕たちの念が集まり、ごくまれにCP消費せずにスキルを発動することができる。",
        "str_progress": ""
    },
    {
        "id": 1639,
        "imageid": 675,
        "unknown1_6": -1,
        "str_name": "アトラクションドロー改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "手首のスナップが洗練され、敵により素早く連続ダメージを与えることができる。",
        "str_progress": ""
    },
    {
        "id": 1640,
        "imageid": 1640,
        "unknown1_6": 32,
        "str_name": "メテオ床",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "攻撃を受けると、自身の周囲の一定範囲に敵の移動を封鎖する蜘蛛の巣を形成する。捕縛された敵は巣の中央から出現する蜘蛛の攻撃を受ける",
        "str_progress": "発動確率、威力"
    },
    {
        "id": 1641,
        "imageid": 1641,
        "unknown1_6": 32,
        "str_name": "メテオ床",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "攻撃を受けると、自身の周囲の一定範囲に敵の移動を封鎖する蜘蛛の巣を形成する。捕縛された敵は巣の中央から出現する蜘蛛の攻撃を受ける",
        "str_progress": "発動確率、威力"
    },
    {
        "id": 1642,
        "imageid": 780,
        "unknown1_6": -1,
        "str_name": "筋力集中鍛錬",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的に力を大幅に増加させる。",
        "str_progress": ""
    },
    {
        "id": 1643,
        "imageid": 781,
        "unknown1_6": -1,
        "str_name": "知識集中鍛錬",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的に知識を大幅に増加させる。",
        "str_progress": ""
    },
    {
        "id": 1644,
        "imageid": 782,
        "unknown1_6": -1,
        "str_name": "敏捷集中鍛錬",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的に敏捷を大幅に増加させる。",
        "str_progress": ""
    },
    {
        "id": 1645,
        "imageid": 783,
        "unknown1_6": -1,
        "str_name": "知恵集中鍛錬",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的に知恵を大幅に増加させる。",
        "str_progress": ""
    },
    {
        "id": 1646,
        "imageid": 784,
        "unknown1_6": -1,
        "str_name": "健康集中鍛錬",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的に健康を大幅に増加させる。",
        "str_progress": ""
    },
    {
        "id": 1647,
        "imageid": 785,
        "unknown1_6": -1,
        "str_name": "カリスマ集中鍛錬",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的にカリスマを大幅に増加させる。",
        "str_progress": ""
    },
    {
        "id": 1648,
        "imageid": 786,
        "unknown1_6": -1,
        "str_name": "運集中鍛錬",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的に運を大幅に増加させる。",
        "str_progress": ""
    },
    {
        "id": 1649,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "筋力強化 - 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的に力を増加させる。",
        "str_progress": ""
    },
    {
        "id": 1650,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "知識強化 - 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的に知識を増加させる。",
        "str_progress": ""
    },
    {
        "id": 1651,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "敏捷強化 - 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的に敏捷を増加させる。",
        "str_progress": ""
    },
    {
        "id": 1652,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "知恵強化 - 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的に知恵を増加させる。",
        "str_progress": ""
    },
    {
        "id": 1653,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "健康強化 - 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的に健康を増加させる。",
        "str_progress": ""
    },
    {
        "id": 1654,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "カリスマ強化 - 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "永久的にカリスマを増加させる。",
        "str_progress": ""
    },
    {
        "id": 1655,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "メンテナンス術 - 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "装備の点検・整備が上達し、耐久度が減少する確率を下げる。",
        "str_progress": ""
    },
    {
        "id": 1656,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "体力再生 - 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵にダメージを与えた際に、一定量のHPが回復する。",
        "str_progress": ""
    },
    {
        "id": 1657,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "ランダム追加ダメージ - 特殊強化",
        "unknown2_0": -20289,
        "unknown10_139": 0,
        "str_description": "一定の数値分のランダム属性の追加ダメージが発生する。",
        "str_progress": ""
    },
    {
        "id": 1658,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "物理強打 - 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ダブルクリティカルダメージが増加する。",
        "str_progress": ""
    },
    {
        "id": 1659,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "魔法強打 - 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "最終ダメージが増加する。",
        "str_progress": ""
    },
    {
        "id": 1660,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "魔力の暴走 - 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "発動確率が増加する。",
        "str_progress": ""
    },
    {
        "id": 1661,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "覚醒 - 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "最終ダメージが増加する。",
        "str_progress": ""
    },
    {
        "id": 1662,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "適応力 - 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "純粋ステータスが増加する。",
        "str_progress": ""
    },
    {
        "id": 1663,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "耐性 - 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "最大抵抗力が回復する。",
        "str_progress": ""
    },
    {
        "id": 1664,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "魔力吸収 - 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "与えたダメージに比例しCPが回復する。",
        "str_progress": ""
    },
    {
        "id": 1665,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "時空の歪み - 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "PVP時は、防御力が増加する。",
        "str_progress": ""
    },
    {
        "id": 1666,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "楔 - 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ダブルクリティカルダメージが増加する。",
        "str_progress": ""
    },
    {
        "id": 1667,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "魔力増幅 - 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "魔法致命打の被ダメージが増加する。",
        "str_progress": ""
    },
    {
        "id": 1668,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "筋力集中鍛錬- 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "物理ダメージが増加する。",
        "str_progress": ""
    },
    {
        "id": 1669,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "知識集中鍛錬- 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "魔法ダメージが増加する。",
        "str_progress": ""
    },
    {
        "id": 1670,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "敏捷集中鍛錬- 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "クリティカルダメージが増加する。",
        "str_progress": ""
    },
    {
        "id": 1671,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "知恵集中鍛錬- 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "受ける全ての属性魔法ダメージの一定数値を吸収する。",
        "str_progress": ""
    },
    {
        "id": 1672,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "健康集中鍛錬- 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "最大HPが増加する。",
        "str_progress": ""
    },
    {
        "id": 1673,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "カリスマ集中鍛錬- 特殊強化効果",
        "unknown2_0": -20289,
        "unknown10_139": 0,
        "str_description": "最大CPが増加する。",
        "str_progress": ""
    },
    {
        "id": 1674,
        "imageid": 638,
        "unknown1_6": -1,
        "str_name": "運集中鍛錬- 特殊強化効果",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "運が増加する。",
        "str_progress": ""
    },
    {
        "id": 1675,
        "imageid": 787,
        "unknown1_6": -1,
        "str_name": "楔",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "攻撃する対象の物理致命打抵抗を減少させる。",
        "str_progress": ""
    },
    {
        "id": 1676,
        "imageid": 788,
        "unknown1_6": -1,
        "str_name": "魔法増幅",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "魔法致命打のダメージ比率を増加させる。",
        "str_progress": ""
    },
    {
        "id": 1680,
        "imageid": 1680,
        "unknown1_6": -1,
        "str_name": "ファイアーボトル投げ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1681,
        "imageid": 1681,
        "unknown1_6": -1,
        "str_name": "必殺ファイアーボトル投げ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1682,
        "imageid": 1682,
        "unknown1_6": -1,
        "str_name": "光子砲",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 1701,
        "imageid": 582,
        "unknown1_6": 21,
        "str_name": "シューティングチャクラム",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "闇のゲートを使って召喚したチャクラムを敵に放つ。",
        "str_progress": "威力"
    },
    {
        "id": 1702,
        "imageid": 583,
        "unknown1_6": 21,
        "str_name": "バウンスチャクラム",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "闇のゲートを使って召喚したチャクラムを敵に放つ。チャクラムは敵の間を反射しながら攻撃する。",
        "str_progress": "威力、反射回数"
    },
    {
        "id": 1703,
        "imageid": 584,
        "unknown1_6": 21,
        "str_name": "デモンソルジャー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "地下界の次元扉を開いて、魔法兵士のクレイモアで敵の足を攻撃。",
        "str_progress": "威力"
    },
    {
        "id": 1704,
        "imageid": 815,
        "unknown1_6": 21,
        "str_name": "サーマニングダーク",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "自分を補助する魔法陣を召喚する。兵器召喚系スキルを使用する時、追加の魔法ダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1705,
        "imageid": 586,
        "unknown1_6": 21,
        "str_name": "デモンコマンダー",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "地下界の次元扉を開いて、魔界軍団長のハルバートで3方向から同時攻撃。",
        "str_progress": "威力、射程距離"
    },
    {
        "id": 1706,
        "imageid": 587,
        "unknown1_6": 21,
        "str_name": "ブラックファイヤーウェーブ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ダークコアを使って黒い炎を吐き出す。",
        "str_progress": "威力"
    },
    {
        "id": 1707,
        "imageid": 816,
        "unknown1_6": 21,
        "str_name": "ブラックエクスプロージョン",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "ダークコアに力を凝縮させた後爆発させ、周辺の全ての敵にダメージを与える。",
        "str_progress": "威力、打撃範囲"
    },
    {
        "id": 1708,
        "imageid": 589,
        "unknown1_6": 21,
        "str_name": "ブラックヴォルカニックボム",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "地下界の次元扉を開いて、敵に黒い火山弾を発射する。",
        "str_progress": "威力、打撃回数、打撃範囲"
    },
    {
        "id": 1709,
        "imageid": 590,
        "unknown1_6": 21,
        "str_name": "ブラックライトニング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "地下界の次元扉を開いて、断続的に黒い雷で衝撃波を発生させ敵を気絶させる。雷は3回発生する。",
        "str_progress": "威力、打撃範囲"
    },
    {
        "id": 1710,
        "imageid": 591,
        "unknown1_6": 21,
        "str_name": "ブラックスター",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "地下界の次元扉を開いて、黒い星の形をした不安定な魔力球体を召喚。3連続の爆発が発生する。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 1711,
        "imageid": 592,
        "unknown1_6": 21,
        "str_name": "魔力フィールド：疫病",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "巨大な魔力球体で周辺の敵の闇抵抗力を下げる魔力フィールドを設置。",
        "str_progress": "範囲、持続時間、闇属性抵抗力減少"
    },
    {
        "id": 1712,
        "imageid": 593,
        "unknown1_6": 21,
        "str_name": "魔力フィールド：足枷",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "巨大な魔力球体で周辺の敵の移動速度を下げる魔力フィールドを設置。",
        "str_progress": "範囲、持続時間、移動速度低下 "
    },
    {
        "id": 1713,
        "imageid": 594,
        "unknown1_6": 21,
        "str_name": "魔力フィールド：棘",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "巨大な魔力球体で周辺の味方の魔法致命打発生確率を高める魔力フィールドを設置。",
        "str_progress": "範囲、持続時間、魔法致命打確率"
    },
    {
        "id": 1714,
        "imageid": 595,
        "unknown1_6": 21,
        "str_name": "ダストデビル",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "魔力の竜巻を発生させて敵にダメージを与える。竜巻の中にいる敵は一定確率で竜巻の中心部へ強制移動する。",
        "str_progress": "威力、範囲、確率"
    },
    {
        "id": 1715,
        "imageid": 596,
        "unknown1_6": 21,
        "str_name": "切滅の円盤",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "威力を高めるために魔力を凝縮させた爆発性の円盤を敵に飛ばす。ダメージを受けた敵は攻撃速度が低下する。",
        "str_progress": "威力、射程距離、範囲、攻撃速度低下"
    },
    {
        "id": 1716,
        "imageid": 602,
        "unknown1_6": 21,
        "str_name": "浄化の炎",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "浄化の炎で闇のエネルギーを燃焼させ純粋な魔法エネルギーへ変換。スキルの闇ダメージが増加する代わりにCP消費も増加。",
        "str_progress": "威力"
    },
    {
        "id": 1717,
        "imageid": 603,
        "unknown1_6": 21,
        "str_name": "終わらない苦痛",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "黒い炎で敵にダメージを与えるたびに残り火をつけて追加ダメージを与える。このスキルを活性化すると地下界の武器庫、烙印スキルは活性化できない。",
        "str_progress": "威力"
    },
    {
        "id": 1718,
        "imageid": 604,
        "unknown1_6": 21,
        "str_name": "地下界の武器庫",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ダークコアの力で兵器を追加召喚。兵器召喚スキルの打撃数を3連打に変更する。このスキルを活性化させると終わらない苦痛、烙印スキルは活性化できない。",
        "str_progress": "消費量、追加ダメージ"
    },
    {
        "id": 1719,
        "imageid": 605,
        "unknown1_6": 21,
        "str_name": "烙印",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "ブラックヴォルカニック、ブラックライトニング、ブラックスタースキルでダメージを与えた敵に烙印を押す。烙印は3つ重なると爆発してダメージを与える。このスキルを活性化させると終わらない苦痛、地下界の武器庫スキルは活性化できない。",
        "str_progress": "消費量、被害量を倍に"
    },
    {
        "id": 1720,
        "imageid": 606,
        "unknown1_6": 21,
        "str_name": "位相変異",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "敵から物理攻撃や魔法攻撃を受けると一定確率で体の周りに異空間を作って攻撃を地下界へ飛ばしながら回避。",
        "str_progress": "発動確率"
    },
    {
        "id": 1721,
        "imageid": 597,
        "unknown1_6": 21,
        "str_name": "地下界の女王",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "地下界の女王らしい威厳を発揮。レベルが上がるほどカリスマが増加。",
        "str_progress": "カリスマ増加"
    },
    {
        "id": 1722,
        "imageid": 598,
        "unknown1_6": 21,
        "str_name": "ダークエンチャント",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "指定した味方に、闇の祝福を与える。魔法ダメージを与えるたびに追加闇ダメージを与える。",
        "str_progress": "上昇率、持続時間"
    },
    {
        "id": 1723,
        "imageid": 599,
        "unknown1_6": 21,
        "str_name": "シェイドウィング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "自分自身の影に魔法をかける。作られた黒い羽根のおかげで移動速度と攻撃速度が増加。",
        "str_progress": "速度増加率"
    },
    {
        "id": 1724,
        "imageid": 600,
        "unknown1_6": 21,
        "str_name": "次元扉の鍵",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "地下界の次元扉を操る魔法を自分自身に使用。攻撃魔法の効率を高め、魔法致命打発生確率を増加させる。",
        "str_progress": "魔法致命打確率、持続時間"
    },
    {
        "id": 1725,
        "imageid": 601,
        "unknown1_6": 21,
        "str_name": "地下界の魔力源",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ダークコアを地下界の魔力源と繋いでCPを回復。",
        "str_progress": "キャスティング速度"
    },
    {
        "id": 1789,
        "imageid": 1789,
        "unknown1_6": 32,
        "str_name": "デッドボディ(アクション2)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": ""
    },
    {
        "id": 1790,
        "imageid": 1790,
        "unknown1_6": 32,
        "str_name": "魂斬り[M]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "鎌を高く上げて斜めに斬りつけた後、魂を刈り取る。",
        "str_progress": "威力、命中率"
    },
    {
        "id": 1791,
        "imageid": 1791,
        "unknown1_6": 32,
        "str_name": "大嵐斬り[M]",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "吹き荒れる刃の竜巻を起こし、敵を吹き飛ばす。斬ると同時に硬直させる。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 1792,
        "imageid": 1792,
        "unknown1_6": 32,
        "str_name": "グラウンドシェイカー (EP)",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "魔力を込めた槍を地面に突き立てて小さい地震を引き起こす。敵は身動きが取れず、バランスを失って倒れる。",
        "str_progress": "威力、持続時間"
    },
    {
        "id": 1793,
        "imageid": 1793,
        "unknown1_6": 32,
        "str_name": "闇の嵐_ヘクトル ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "闇と風が混ざり合い、強力な風を吹き起こす。パターン向けスキル",
        "str_progress": ""
    },
    {
        "id": 1794,
        "imageid": 1794,
        "unknown1_6": 32,
        "str_name": "ナインテールブレイズ_混沌の大地",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "強烈な地獄の業火に包まれた鞭で攻撃する。地獄の業火は一定回数にわたってダメージを与え続ける。従来よりダメージとCP獲得量が増加。",
        "str_progress": "威力, 命中率, 攻撃回数"
    },
    {
        "id": 1795,
        "imageid": 1795,
        "unknown1_6": 32,
        "str_name": "バンパイアリックバイト_混沌の大",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵の血を吸い、自分の体力を回復する。ウルフマンの体力が高いほどより強い攻撃を与える。",
        "str_progress": "健康、回復率"
    },
    {
        "id": 1796,
        "imageid": 1796,
        "unknown1_6": 32,
        "str_name": "ディレイクラッシングムーブ_混沌",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "しばらくの間力を溜めて一気に爆発させてより強力なダメージを与える",
        "str_progress": "威力、攻撃速度"
    },
    {
        "id": 1797,
        "imageid": 1797,
        "unknown1_6": 32,
        "str_name": "稲妻乱切り_混沌の大地",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "鎌で敵をより強く無差別に斬りつけ打ち下ろす。",
        "str_progress": "威力, 攻撃回数"
    },
    {
        "id": 1798,
        "imageid": 1798,
        "unknown1_6": 32,
        "str_name": "サベージスタンプ_混沌の大地",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ジャンプの後、着地点で剣を振り回し、強い爆発を引き起こす。周囲の敵にダメージを与えると同時に自分の防御力を上昇させる。",
        "str_progress": "威力"
    },
    {
        "id": 1799,
        "imageid": 1799,
        "unknown1_6": 32,
        "str_name": "音速かかと落とし_混沌の大地",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "左前蹴り後、そのまま振り下ろして攻撃ごとに範囲爆発攻撃を与え、敵を一か所に集める。右足スキルのレベルと命中率がしばらく上昇。",
        "str_progress": "威力, 命中率, 右足スキルレベル上昇"
    },
    {
        "id": 1800,
        "imageid": 502,
        "unknown1_6": 20,
        "str_name": "ブルームスイング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "単体対象に向かってほうきを振り回す。",
        "str_progress": "威力, 速度"
    },
    {
        "id": 1801,
        "imageid": 503,
        "unknown1_6": 20,
        "str_name": "ヘビーブルーム",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "単体対象にほうきを振り下ろして攻撃し、途中で転んで前方範囲内の敵にもダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1802,
        "imageid": 504,
        "unknown1_6": 20,
        "str_name": "燃えるほこり",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ほうきの先のほこりを投げつけて燃やし、敵にダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1803,
        "imageid": 505,
        "unknown1_6": 20,
        "str_name": "シューティングダスト",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "単体対象にほうきを掃き上げて攻撃する。ホコリを浴びた対象は一定確率で混乱にかかる。",
        "str_progress": "威力"
    },
    {
        "id": 1804,
        "imageid": 767,
        "unknown1_6": 20,
        "str_name": "ネープルスウェーブ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "メイドが内なる魔法の力で燃える皿を召喚、敵に投げつけて火炎ダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1805,
        "imageid": 507,
        "unknown1_6": 20,
        "str_name": "ブルームアサルト",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ほうきを地面にかけながら突撃する。動線上のすべての敵にダメージを与えると同時に後ろにノックバック。",
        "str_progress": "威力"
    },
    {
        "id": 1806,
        "imageid": 508,
        "unknown1_6": 20,
        "str_name": "エクストリームブルームラッシュ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "ほうきをかけながら突撃する。対象の前で転んで、その衝撃で範囲内のすべての敵にダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1807,
        "imageid": 509,
        "unknown1_6": 20,
        "str_name": "カオスクリーニング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "運によって致命打攻撃を回避した場合、一定確率で敵をマヒ状態にする。",
        "str_progress": "確率"
    },
    {
        "id": 1808,
        "imageid": 510,
        "unknown1_6": 20,
        "str_name": "潔癖の乙女",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "追加回避確率が永久的に増加。",
        "str_progress": "回避確率増加"
    },
    {
        "id": 1809,
        "imageid": 511,
        "unknown1_6": 20,
        "str_name": "パーフェクトクリーニング",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "ほうきの棒の部分を突き出して連続で突き出しながら突進する。",
        "str_progress": "威力, 移動速度, 攻撃回数"
    },
    {
        "id": 1810,
        "imageid": 512,
        "unknown1_6": 20,
        "str_name": "ダストインパクト",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ほうきで地面を強くたたき、石などを前方一直線に飛ばして敵を吹き飛ばしマヒさせる。ダメージを受けた敵は移動速度が減少。",
        "str_progress": "威力, ノックバック確率, 移動速度低下"
    },
    {
        "id": 1811,
        "imageid": 513,
        "unknown1_6": 20,
        "str_name": "掃除の邪魔しちゃダメ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "掃除を邪魔する対象をほうきの棒の部分で連続で突く。",
        "str_progress": "威力, 攻撃回数"
    },
    {
        "id": 1812,
        "imageid": 514,
        "unknown1_6": 20,
        "str_name": "スローイングディッシュ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "対象にお皿を投げて攻撃する。お皿が一定回数、敵の間で跳ね返りながら攻撃する。",
        "str_progress": "威力, 反射回数"
    },
    {
        "id": 1813,
        "imageid": 515,
        "unknown1_6": 20,
        "str_name": "ブルームスパイラル",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "ほうきを回転させながら前方に投げて範囲内の敵にダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1814,
        "imageid": 516,
        "unknown1_6": 20,
        "str_name": "マッドラッシュ",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "狂気に満ちたメイドが色々な種類の家事道具を投げて周辺のすべての敵にダメージを与える。",
        "str_progress": "威力, 攻撃回数"
    },
    {
        "id": 1815,
        "imageid": 517,
        "unknown1_6": 20,
        "str_name": "インサイト",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "メイドの鋭い洞察力で敵の弱点を把握し、ダブルクリティカル時、一定確率でダメージを増加させる。",
        "str_progress": "威力, 確率"
    },
    {
        "id": 1816,
        "imageid": 518,
        "unknown1_6": 20,
        "str_name": "ストリップドレス",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "巧みな手さばきで対象の衣服や鎧などを一瞬で脱がし、対象に一定確率で追加の火炎ダメージを与える。",
        "str_progress": "威力, 確率"
    },
    {
        "id": 1817,
        "imageid": 519,
        "unknown1_6": 20,
        "str_name": "ライフリサイクル",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "無駄遣いを知らないメイドの節約精神を高めて、自分の最大体力と最大CPが増加。",
        "str_progress": "最大体力, 最大CP"
    },
    {
        "id": 1818,
        "imageid": 520,
        "unknown1_6": 20,
        "str_name": "ブルームマスタリー",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "経験豊富なメイドがほうきを自由自在に操り、一定確率で強力な一撃を繰り出す。",
        "str_progress": "確率"
    },
    {
        "id": 1819,
        "imageid": 521,
        "unknown1_6": 20,
        "str_name": "セーブマイマスター",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "主人の危機に忠誠心溢れるメイドが怒り、攻撃を受けた後にもひるまず少しの間無敵状態になる。",
        "str_progress": "発動確率, 無敵時間"
    },
    {
        "id": 1820,
        "imageid": 522,
        "unknown1_6": 20,
        "str_name": "ナクリエマの加護",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ナクリエマ王国所属のメイドにのみ許される加護。加護のレベルが上がると運が永久的に増加。",
        "str_progress": "運増加"
    },
    {
        "id": 1821,
        "imageid": 523,
        "unknown1_6": 20,
        "str_name": "掃除準備：掃き出す",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "掃除をする前の準備運動。CPを少し充電し、ホコリとゴミを掃き出すための力をためる。",
        "str_progress": "キャスティング時間"
    },
    {
        "id": 1822,
        "imageid": 524,
        "unknown1_6": 20,
        "str_name": "掃除準備：拭き取る",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "掃除をする前に本格的に体をほぐす。CPを適度に充電し、綺麗に拭き取って磨くための力をためる。",
        "str_progress": "上昇数値, 持続時間"
    },
    {
        "id": 1823,
        "imageid": 525,
        "unknown1_6": 20,
        "str_name": "掃除準備：殺菌消毒",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "掃除をする前にしっかり準備運動を行う。CPを多めに充電し、掃き出しては拭き取って、各種病原菌を殺菌するための力をためる。",
        "str_progress": "攻撃力, 防御力"
    },
    {
        "id": 1824,
        "imageid": 526,
        "unknown1_6": 20,
        "str_name": "メイドオブメイド",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "全てのメイドの頂点に立つ優れた家事能力で、CP消費量を永久的に減少させる。",
        "str_progress": "集中力, CP消耗量減少"
    },
    {
        "id": 1825,
        "imageid": 1825,
        "unknown1_6": 32,
        "str_name": "パラレルブリッツ_混沌の大地",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "自分の左右に数個の分身を作り、敵を同時に突く。幻影の剣士覚醒スキルで敵を倒した後、一定時間内に別の敵を本スキルで攻撃すると初打撃に限り命中率が上昇",
        "str_progress": "威力, 分身個数"
    },
    {
        "id": 1826,
        "imageid": 154,
        "unknown1_6": 6,
        "str_name": "ダーティーフューリー",
        "unknown2_0": 4,
        "unknown10_139": 4096,
        "str_description": "一回の攻撃で、周囲360度範囲内にいる敵達に順次攻撃。攻撃対象は自分のパーティーに攻撃している敵と攻撃しようとしている敵に限定。敵1体につき短剣一投。刃がもっと鋭くなり最小ダメージが増加する。",
        "str_progress": "威力, 命中率, 攻撃速度"
    },
    {
        "id": 1827,
        "imageid": 152,
        "unknown1_6": 6,
        "str_name": "コインシデンスドローイング",
        "unknown2_0": 3,
        "unknown10_139": 16384,
        "str_description": "一体の敵へ複数の短剣を同時に投げて攻撃。クリティカルダメージ発生確率を持つ。短剣は一つだけ使用。",
        "str_progress": "威力, 命中率, 攻撃回数"
    },
    {
        "id": 1828,
        "imageid": 153,
        "unknown1_6": 6,
        "str_name": "ダガー総攻撃",
        "unknown2_0": 3,
        "unknown10_139": 16384,
        "str_description": "射程内にいるすべての敵を攻撃。周囲の敵が少数の場合、攻撃を最大2回まで集中させる。ダガーは一本のみ使用。",
        "str_progress": "威力、命中率"
    },
    {
        "id": 1829,
        "imageid": 162,
        "unknown1_6": 6,
        "str_name": "ブレードトラップ",
        "unknown2_0": 3,
        "unknown10_139": 8192,
        "str_description": "トラップ専門家の手でトラップの機能を極大化させる。爆発すると範囲内の全ての敵にダメージを与え、麻痺させる。",
        "str_progress": "威力、設置時間、設置レベル、麻痺時間"
    },
    {
        "id": 1830,
        "imageid": 163,
        "unknown1_6": 6,
        "str_name": "トリプルイクストラップ",
        "unknown2_0": 4,
        "unknown10_139": -32768,
        "str_description": "道の要所に踏むと3回連続で爆発する強力なトラップを設置する。爆発すると範囲内の全ての敵にダメージを与える。",
        "str_progress": "威力、設置時間、設置レベル、爆発半径"
    },
    {
        "id": 1831,
        "imageid": 164,
        "unknown1_6": 6,
        "str_name": "ポイズンミスト",
        "unknown2_0": 5,
        "unknown10_139": -32768,
        "str_description": "猛毒のガスが広がるトラップを敵に投げる。猛毒のガスにダメージを受けた敵は魔法抵抗力が弱化する。",
        "str_progress": "持続時間、抵抗力、低下率"
    },
    {
        "id": 1832,
        "imageid": 159,
        "unknown1_6": 6,
        "str_name": "シャドウイントルーダー",
        "unknown2_0": 4,
        "unknown10_139": 12288,
        "str_description": "影の中に自分の身を完全に隠す。上逹すると心に余裕ができ、シーフのスキルをもう少し効率的に使うことができるようになる。特に暗殺、奇襲スキルの攻撃力が増加する。ただし5回攻撃した後には解ける。",
        "str_progress": "持続時間"
    },
    {
        "id": 1833,
        "imageid": 800,
        "unknown1_6": 6,
        "str_name": "かく乱",
        "unknown2_0": 2,
        "unknown10_139": -16384,
        "str_description": "非常に素早い速度で敵に接近し、攻撃を加える。また、敵の神経をかく乱させ硬直状態にする。",
        "str_progress": "威力"
    },
    {
        "id": 1834,
        "imageid": 174,
        "unknown1_6": 6,
        "str_name": "サイレントキリング",
        "unknown2_0": 5,
        "unknown10_139": -16384,
        "str_description": "敵を一撃で倒す。効率的なスキル使用でCP消耗量が減少。",
        "str_progress": "威力、成功確率、限界レベル"
    },
    {
        "id": 1835,
        "imageid": 1835,
        "unknown1_6": 32,
        "str_name": "槍投げ_混沌の大地",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持っている槍を敵に投擲して弓矢に持ち替える。",
        "str_progress": ""
    },
    {
        "id": 1836,
        "imageid": 527,
        "unknown1_6": 6,
        "str_name": "卑劣な戦略",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "敵の弱点を素早く把握し、致命的な一撃を加える事ができるようになる。攻撃された敵は出血持続ダメージを受け、コインシデンスドローイングスキルの回数が12回で固定される。",
        "str_progress": "なし"
    },
    {
        "id": 1837,
        "imageid": 528,
        "unknown1_6": 6,
        "str_name": "トラップスペシャリスト",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "トラップ専門家の手でトラップの機能を極大化させる。トラップ類の認識範囲が広くなり、一斉爆発の打撃回数が増加する。",
        "str_progress": "なし"
    },
    {
        "id": 1838,
        "imageid": 801,
        "unknown1_6": 6,
        "str_name": "トドメの一撃",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "敵の弱点を一目で把握し、体力の低い敵に対し、失った体力に比例して奇襲、かく乱、暗殺、サイレントキリングスキルの限界ダメージ制限が増加する。体力50以下、20以下の敵に適用。",
        "str_progress": "なし"
    },
    {
        "id": 1839,
        "imageid": 180,
        "unknown1_6": 7,
        "str_name": "一撃必殺",
        "unknown2_0": 4,
        "unknown10_139": 4096,
        "str_description": "敵の急所を攻撃し、一定の確率で敵の体力を現在の1\/3に減らす致命打を与える。麻痺している敵を攻撃すると決定打が発動する場合がある。直後、左足スキルのレベルがしばらく上昇。",
        "str_progress": "威力, 攻撃速度, 命中率, 致命打確率, 決定打確率"
    },
    {
        "id": 1840,
        "imageid": 179,
        "unknown1_6": 7,
        "str_name": "猛連撃",
        "unknown2_0": 3,
        "unknown10_139": 16384,
        "str_description": "左手を利用して激しい連打で攻撃。直後、右手、下蹴り種類スキルのレベルがしばらく上昇。",
        "str_progress": "威力, 攻撃速度, 命中率"
    },
    {
        "id": 1841,
        "imageid": 178,
        "unknown1_6": 7,
        "str_name": "破貫顎",
        "unknown2_0": 3,
        "unknown10_139": 16384,
        "str_description": "右腕の肘で敵の顎を攻撃し、クリティカルヒットボーナスが発生する。また致命打攻撃時に敵の攻撃力を減少させる。直後、左手、右足スキルのレベルと致命打確率がしばらく上昇。",
        "str_progress": "威力, 致命打確率"
    },
    {
        "id": 1842,
        "imageid": 186,
        "unknown1_6": 7,
        "str_name": "爆裂回転脚",
        "unknown2_0": 3,
        "unknown10_139": 8192,
        "str_description": "三回連続で回し蹴りを放ち、攻撃ごとに範囲爆発攻撃を与える。右手スキルのレベルと回避率がしばらく上昇。",
        "str_progress": "威力, 回避率"
    },
    {
        "id": 1843,
        "imageid": 183,
        "unknown1_6": 7,
        "str_name": "音速かかと落とし",
        "unknown2_0": 2,
        "unknown10_139": -32768,
        "str_description": "左前蹴り後、そのまま振り下ろして攻撃ごとに範囲爆発攻撃を与え、弾き飛ばして敵を一か所に集める。右足スキルのレベルと命中率がしばらく上昇",
        "str_progress": "威力, 命中率, 右足スキルレベル上昇"
    },
    {
        "id": 1844,
        "imageid": 184,
        "unknown1_6": 7,
        "str_name": "鉤蹴り",
        "unknown2_0": 2,
        "unknown10_139": -32768,
        "str_description": "右後ろ回し蹴り攻撃で広い半円範囲の敵を攻撃。左手スキルのレベルと回避率がしばらく上昇。",
        "str_progress": "威力, 回避率"
    },
    {
        "id": 1845,
        "imageid": 199,
        "unknown1_6": 7,
        "str_name": "烈風激波",
        "unknown2_0": 5,
        "unknown10_139": 12288,
        "str_description": "気功弾を飛ばして敵を攻撃する。範囲ダメージを与え、敵を麻痺させる。",
        "str_progress": "威力, 射程距離, 命中率"
    },
    {
        "id": 1846,
        "imageid": 736,
        "unknown1_6": 7,
        "str_name": "無双拳",
        "unknown2_0": 2,
        "unknown10_139": -16384,
        "str_description": "拳に気を込めて四回飛ばし、攻撃する。無双拳が命中した敵は、風属性の追加ダメージを受ける。",
        "str_progress": "威力"
    },
    {
        "id": 1847,
        "imageid": 195,
        "unknown1_6": 7,
        "str_name": "豪気",
        "unknown2_0": 1,
        "unknown10_139": -16384,
        "str_description": "気合いを入れて攻撃力と防御力が増加する。全属性の攻撃力も含まれる",
        "str_progress": "攻撃力, 防御力"
    },
    {
        "id": 1848,
        "imageid": 530,
        "unknown1_6": 7,
        "str_name": "闘魂",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "武道家の闘志が熱く燃え上がる。クリティカルおよびダブルクリティカル時、追加ダメージを与える",
        "str_progress": "なし"
    },
    {
        "id": 1849,
        "imageid": 730,
        "unknown1_6": 7,
        "str_name": "宙返り",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "宙返りのように素早く蹴る。蹴り攻撃を与えるたびに火属性攻撃力が強化および累積する",
        "str_progress": "なし"
    },
    {
        "id": 1850,
        "imageid": 531,
        "unknown1_6": 7,
        "str_name": "全身全霊",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "戦いの最中、武道家が全力を出して魔法回避率を上昇させる",
        "str_progress": "なし"
    },
    {
        "id": 1851,
        "imageid": 1851,
        "unknown1_6": 32,
        "str_name": "跳弾ボトル投げ_混沌の大地",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "スリングでファイアーボトルや毒ガスなどを投げるのに特化した技術。ファイアーボトルや毒ガス、フリージングなどの効果を極大化させることができる。投げたボトルはバウンドし、周りの敵にも被害を及ぼす",
        "str_progress": "威力, ボトル消費"
    },
    {
        "id": 1852,
        "imageid": 431,
        "unknown1_6": 17,
        "str_name": "覇鷹拳",
        "unknown2_0": 3,
        "unknown10_139": 4096,
        "str_description": "鋭いマナを体内から爆破させ、周囲にダメージを与えて攻撃に弱い状態にする。秘伝体現を発動させる。",
        "str_progress": "威力, 低下率"
    },
    {
        "id": 1853,
        "imageid": 436,
        "unknown1_6": 17,
        "str_name": "鳳凰連破",
        "unknown2_0": 5,
        "unknown10_139": 16384,
        "str_description": "オーラを集めて分身を作り出し、周辺のすべての敵に連打を浴びせる。秘伝体現の効果で強化される。",
        "str_progress": "威力, 連打回数, 分身数"
    },
    {
        "id": 1854,
        "imageid": 435,
        "unknown1_6": 17,
        "str_name": "秘儀・雷撃破",
        "unknown2_0": 4,
        "unknown10_139": 16384,
        "str_description": "敵を掴んでダメージを与え、オーラを集中し武器を強化する。秘伝体現の効果で強化される。",
        "str_progress": "威力, 最大武器攻撃力"
    },
    {
        "id": 1855,
        "imageid": 438,
        "unknown1_6": 17,
        "str_name": "プラズマブラスト",
        "unknown2_0": 5,
        "unknown10_139": 8192,
        "str_description": "対象地域にオーラで爆撃する。使用中は動くことができず、CP不足または移動するまで引き続き詠唱する。",
        "str_progress": "威力, 打撃範囲, 攻撃速度"
    },
    {
        "id": 1856,
        "imageid": 430,
        "unknown1_6": 17,
        "str_name": "覇蛇拳",
        "unknown2_0": 2,
        "unknown10_139": -32768,
        "str_description": "蛇の形をしたオーラを放ち、敵を被撃対象の周辺まで引き寄せる。",
        "str_progress": "威力, 打撃範囲, 束縛確率"
    },
    {
        "id": 1857,
        "imageid": 444,
        "unknown1_6": 17,
        "str_name": "明鏡止水",
        "unknown2_0": 5,
        "unknown10_139": -32768,
        "str_description": "最大限まで潜在能力を引き出し、すべての能力値を飛躍的に上昇させて激しく攻撃する。該当攻撃をプラズマブラストと見なす。",
        "str_progress": "威力, 上昇率"
    },
    {
        "id": 1858,
        "imageid": 437,
        "unknown1_6": 17,
        "str_name": "秘儀・竜撃破",
        "unknown2_0": 5,
        "unknown10_139": 12288,
        "str_description": "敵を強打で吹き飛ばした後、連打攻撃で追い討ちをかける。打撃を与えるたびに致命打確率が増加し、三位一体による追加効果を受ける。",
        "str_progress": "威力, 連打回数"
    },
    {
        "id": 1859,
        "imageid": 434,
        "unknown1_6": 17,
        "str_name": "ピューマペスティネイション",
        "unknown2_0": 4,
        "unknown10_139": -16384,
        "str_description": "瞬間的に自分自身を加速させ遠くにいる敵まで一瞬で近づいた後、急所を刺して出血を起こしては持続的ダメージを与える。出血は重複する。",
        "str_progress": "威力, 攻撃回数, 出血ダメージ, 出血重複量"
    },
    {
        "id": 1860,
        "imageid": 432,
        "unknown1_6": 17,
        "str_name": "覇熊拳",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "強力な一撃を放ち、目標の敵とその周辺の敵をノックバックさせる。",
        "str_progress": "威力, ノックバック確率, ノックバック距離"
    },
    {
        "id": 1861,
        "imageid": 536,
        "unknown1_6": 17,
        "str_name": "秘伝体現",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "闘士たちに伝わる秘伝書を解読して、フォースを覚えコンボの本質を身に着ける。",
        "str_progress": "無し"
    },
    {
        "id": 1862,
        "imageid": 537,
        "unknown1_6": 17,
        "str_name": "オーバーヒート",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "攻撃すればするほど強力に攻撃できる。攻撃中により強力なオーラを放出する。",
        "str_progress": "無し"
    },
    {
        "id": 1863,
        "imageid": 538,
        "unknown1_6": 17,
        "str_name": "三位一体",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "同時に3種類の霊を憑依させ三位一体になる。三位一体になると闘志効果が発動し、憑依した霊による追加効果を受けて攻撃力と回避率が上昇する。",
        "str_progress": "無し"
    },
    {
        "id": 1864,
        "imageid": 405,
        "unknown1_6": 16,
        "str_name": "大嵐斬り",
        "unknown2_0": 5,
        "unknown10_139": 4096,
        "str_description": "吹き荒れる刃の竜巻を起こして敵を吹き飛ばし、追加で風のダメージを与える。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 1865,
        "imageid": 402,
        "unknown1_6": 16,
        "str_name": "竜神昇",
        "unknown2_0": 3,
        "unknown10_139": 16384,
        "str_description": "鎌で突風を起こして、敵に飛ばす。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 1866,
        "imageid": 401,
        "unknown1_6": 16,
        "str_name": "鬼斬り",
        "unknown2_0": 2,
        "unknown10_139": 16384,
        "str_description": "遠くから鎌を降り回し、敵の弱点を狙って致命打を与える。相手が風刃の舞状態である場合、より強力なダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1867,
        "imageid": 414,
        "unknown1_6": 16,
        "str_name": "ソウルカタストロフィ",
        "unknown2_0": 5,
        "unknown10_139": 8192,
        "str_description": "魂を崩壊させて発生したエネルギーを吸収し、攻撃速度及び移動速度を増加させる。また、すべてのスキルを消費CP無しで使用可能になる。「アセンブル」状態でのみ使用可能。解放効果状態で使うと再使用時間が短縮される。尚、拘束された魂爆発の確率が増加する",
        "str_progress": "速度増加率, ペナルティー減少"
    },
    {
        "id": 1868,
        "imageid": 411,
        "unknown1_6": 16,
        "str_name": "フルリバレイト",
        "unknown2_0": 2,
        "unknown10_139": -32768,
        "str_description": "束縛された魂を解放し、もっと長い時間すべての能力値および敵に対する致命打確率が上昇する。「アセンブル」状態でのみ使用可能。",
        "str_progress": "持続時間、能力値上昇率"
    },
    {
        "id": 1869,
        "imageid": 403,
        "unknown1_6": 16,
        "str_name": "稲妻乱切り",
        "unknown2_0": 4,
        "unknown10_139": -32768,
        "str_description": "鎌で敵をより強く無差別に斬りつけ打ち下ろす。",
        "str_progress": "威力、攻撃回数"
    },
    {
        "id": 1870,
        "imageid": 424,
        "unknown1_6": 16,
        "str_name": "ソウルバーン",
        "unknown2_0": 5,
        "unknown10_139": 12288,
        "str_description": "魂を燃焼する霊火を召喚して、一定時間毎に強まる霊火で相手にダメージを与え火属性抵抗力を低下させる。霊火が消える瞬間、かかっていた全ての魔法も消える。",
        "str_progress": "威力, 確率, 最大打撃人数"
    },
    {
        "id": 1871,
        "imageid": 420,
        "unknown1_6": 16,
        "str_name": "ソウルディヴィジョン",
        "unknown2_0": 1,
        "unknown10_139": -16384,
        "str_description": "闇に染まった霊を召喚し、敵の魂を闇に落とす。敵の魂は分裂され、持続的闇ダメージを受ける。",
        "str_progress": "闇ダメージ"
    },
    {
        "id": 1872,
        "imageid": 421,
        "unknown1_6": 16,
        "str_name": "魂の抽出",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "敵の魂に地獄の雄叫びを浴びせることで恐怖の世界に包み込み、思考と反対の行動をさせる。強制的に魂が抽出されると全ての持続ダメージを解除させて大きなダメージを与える。",
        "str_progress": "火炎ダメージ, 闇ダメージ"
    },
    {
        "id": 1873,
        "imageid": 533,
        "unknown1_6": 16,
        "str_name": "風刃の舞",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "覚醒スキルで攻撃した敵に追加被害を与える。風の刃は毎秒ごとに物理攻撃の一定数値だけ風ダメージを与える。",
        "str_progress": "なし"
    },
    {
        "id": 1874,
        "imageid": 534,
        "unknown1_6": 16,
        "str_name": "魂の楔",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "散らばっている魂を拘束して常にアセンブル状態を維持し、一定の確率で魂が爆発し、敵に強力なダメージを与える。",
        "str_progress": "なし"
    },
    {
        "id": 1875,
        "imageid": 535,
        "unknown1_6": 16,
        "str_name": "戦闘部族の秘術",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "戦闘部族の秘術を使用して敵に持続ダメージを与えるたびにCPを回復し、スキルクールタイムを減少させる。",
        "str_progress": "無し"
    },
    {
        "id": 1876,
        "imageid": 220,
        "unknown1_6": 9,
        "str_name": "インターバルボマー",
        "unknown2_0": 3,
        "unknown10_139": 4096,
        "str_description": "矢を使うスキルを使用すると追加で打撃を与える魔法の弓を生成する。魔法の弓はより長く使用でき、自動でアーチャーの矢の攻撃と同時に攻撃する。",
        "str_progress": "威力、持続時間"
    },
    {
        "id": 1877,
        "imageid": 209,
        "unknown1_6": 9,
        "str_name": "シャドウチェイサー",
        "unknown2_0": 5,
        "unknown10_139": 16384,
        "str_description": "他のアーチャー技術で敵を攻撃する時にそれが命中すると、数発の矢が自動発射され、追加でさらに多数の矢を発射する。",
        "str_progress": "威力"
    },
    {
        "id": 1878,
        "imageid": 216,
        "unknown1_6": 9,
        "str_name": "バラージショット",
        "unknown2_0": 2,
        "unknown10_139": 16384,
        "str_description": "複数の矢を一体の敵に向かって連射し、発射速度が増加する。",
        "str_progress": "威力"
    },
    {
        "id": 1879,
        "imageid": 219,
        "unknown1_6": 9,
        "str_name": "リワインドマーカー",
        "unknown2_0": 4,
        "unknown10_139": 8192,
        "str_description": "魔力を込めた爆弾の矢を発射する。爆弾は周辺の敵に粘着され爆発し、5回粘着されると自動で爆発して大きなダメージを与える。爆発後敵が退治できなかった場合、爆弾が再粘着される。再粘着された爆弾はリワインドマーカーの影響を受け再び爆発する。",
        "str_progress": "威力、打撃範囲"
    },
    {
        "id": 1880,
        "imageid": 814,
        "unknown1_6": 9,
        "str_name": "イリュージョンアーチャー",
        "unknown2_0": 2,
        "unknown10_139": -32768,
        "str_description": "アーチャーと共にいる蜃気楼を召喚する。蜃気楼はアーチャーの属性ダメージスキルをコピーして攻撃する。",
        "str_progress": "威力"
    },
    {
        "id": 1881,
        "imageid": 809,
        "unknown1_6": 9,
        "str_name": "ハーモニックアロー",
        "unknown2_0": 2,
        "unknown10_139": -32768,
        "str_description": "魔法で火と氷の魔力を込めた矢を生成し連射する。",
        "str_progress": "威力"
    },
    {
        "id": 1882,
        "imageid": 217,
        "unknown1_6": 9,
        "str_name": "レイヤーテンペスト",
        "unknown2_0": 3,
        "unknown10_139": 12288,
        "str_description": "超近接用矢のスキルで周りの敵を攻撃する。遠距離にいる敵に使用すると、打撃範囲がなくなる。近距離にいるさらに多数の敵を攻撃可能になる。",
        "str_progress": "威力"
    },
    {
        "id": 1883,
        "imageid": 202,
        "unknown1_6": 9,
        "str_name": "バーストショット",
        "unknown2_0": 2,
        "unknown10_139": -16384,
        "str_description": "矢で敵を貫通して攻撃し、出血状態にする。出血状態の敵を攻撃すると、出血ダメージをもう一回与える事ができる。",
        "str_progress": "威力"
    },
    {
        "id": 1884,
        "imageid": 212,
        "unknown1_6": 9,
        "str_name": "シーカーミサイル",
        "unknown2_0": 2,
        "unknown10_139": -16384,
        "str_description": "敵を追いかける誘導矢を発射する。敵にロックオンした矢は敵に当たったり、死んだりするまで追いかける。敵を退治できなかった場合、アーチャーが敵の前に移動する。",
        "str_progress": "威力"
    },
    {
        "id": 1885,
        "imageid": 812,
        "unknown1_6": 9,
        "str_name": "ハンターズアイ",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "遠距離の敵を射撃することに適したハンターの目。遠距離の敵に与えるクリティカル攻撃のダメージ量が上昇する。",
        "str_progress": "なし"
    },
    {
        "id": 1886,
        "imageid": 546,
        "unknown1_6": 9,
        "str_name": "インテリジェンスバースト",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "自分の敏捷によってクリティカル確率を獲得する。",
        "str_progress": "なし"
    },
    {
        "id": 1887,
        "imageid": 813,
        "unknown1_6": 9,
        "str_name": "ポイントブランク",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "近距離の敵を攻撃することに適しているスキル。短い射程から攻撃すると、ヒット数が増加する。他のスキルによる追加打撃は発生しない。",
        "str_progress": "なし"
    },
    {
        "id": 1888,
        "imageid": 227,
        "unknown1_6": 8,
        "str_name": "パラライズスティンガー",
        "unknown2_0": 2,
        "unknown10_139": 4096,
        "str_description": "素早い速度で敵を突き貫く。次に攻撃するスキルの攻撃速度を増加させる。",
        "str_progress": "威力、命中率、速度"
    },
    {
        "id": 1889,
        "imageid": 245,
        "unknown1_6": 8,
        "str_name": "エントラップメントインペール",
        "unknown2_0": 3,
        "unknown10_139": 16384,
        "str_description": "多数の分身を生み出し、敵を囲んで正確に攻撃する。従来より命中率が上昇。",
        "str_progress": "威力, 分身個数"
    },
    {
        "id": 1890,
        "imageid": 208,
        "unknown1_6": 9,
        "str_name": "ヴィジョンキャスター",
        "unknown2_0": 4,
        "unknown10_139": 16384,
        "str_description": "ボイドボウの強化版。空中に浮遊し、休む暇もなく矢を発射する。従来より攻撃頻度上昇。",
        "str_progress": "威力, 持続時間"
    },
    {
        "id": 1891,
        "imageid": 242,
        "unknown1_6": 8,
        "str_name": "クレセントライトニング",
        "unknown2_0": 3,
        "unknown10_139": 8192,
        "str_description": "槍を地面に突き刺して槍を媒体に稲妻を召喚し、さらに広い範囲にいる敵にダメージを与える。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 1892,
        "imageid": 243,
        "unknown1_6": 8,
        "str_name": "ブレイズ・アンド・ブリザード",
        "unknown2_0": 4,
        "unknown10_139": -32768,
        "str_description": " 槍の一端には炎、 反対側には氷を召喚し、槍を旋回させて炎と氷が渦を描くように攻撃する。近接の場合、攻撃の的中率がさらに上がる。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 1893,
        "imageid": 249,
        "unknown1_6": 8,
        "str_name": "信義",
        "unknown2_0": 2,
        "unknown10_139": -32768,
        "str_description": "心の中で自分に対する信念を揺ぎ無きものにし、槍の魔法を使うための精神力を高める。瞬間的に物理攻撃力と魔法攻撃力が上昇。従来より持続時間が増加する。",
        "str_progress": "キャスティング時間、攻撃力、魔法攻撃力"
    },
    {
        "id": 1894,
        "imageid": 777,
        "unknown1_6": 8,
        "str_name": "ロージングストライク",
        "unknown2_0": 4,
        "unknown10_139": 12288,
        "str_description": "魔法で巨大化させた槍を前方に投擲し、ダメージを与える。覚醒パッシブを強化する。",
        "str_progress": "威力"
    },
    {
        "id": 1895,
        "imageid": 778,
        "unknown1_6": 8,
        "str_name": "スチールマルチレイン",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "空から数多くの槍を召喚し、範囲内にいる全ての敵を攻撃する。さらに広い範囲で攻撃する。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 1896,
        "imageid": 230,
        "unknown1_6": 8,
        "str_name": "ジャベリンストーム",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "回転する槍を投擲し、敵に多段ヒットでダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1897,
        "imageid": 548,
        "unknown1_6": 8,
        "str_name": "チェインストライク",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "ヴァンガードキャバリエが強化された攻撃術。攻撃すればするほど攻撃力が高まる。",
        "str_progress": "なし"
    },
    {
        "id": 1898,
        "imageid": 549,
        "unknown1_6": 8,
        "str_name": "元素合成",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "着用している刺青の属性種類に関係なく、着用した刺青の数値だけ自分のすべての属性数値が上昇",
        "str_progress": "なし"
    },
    {
        "id": 1899,
        "imageid": 776,
        "unknown1_6": 8,
        "str_name": "熟練の戦術家",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "数多くの戦闘経験から習得した槍投げ術。攻撃するたびに、魔力を込めた槍が爆発し、追加ダメージを与える。",
        "str_progress": "なし"
    },
    {
        "id": 1900,
        "imageid": 1900,
        "unknown1_6": 32,
        "str_name": "グライディングバフトーテム",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 1901,
        "imageid": 369,
        "unknown1_6": 14,
        "str_name": "パフュームオブデス",
        "unknown2_0": 5,
        "unknown10_139": 4096,
        "str_description": "薄気味悪い死の香りで、敵の異常系抵抗力・低下系抵抗力・呪い系抵抗力を一定数値以上、無効にさせてしまう。従来より闇属性ダメージが増加し、闇属性ダメージを吸収できる。",
        "str_progress": "威力, 持続時間, 抵抗力低下率"
    },
    {
        "id": 1902,
        "imageid": 354,
        "unknown1_6": 14,
        "str_name": "ダークネストリック",
        "unknown2_0": 5,
        "unknown10_139": 16384,
        "str_description": "まやかしの闇で自分と周囲にいる敵の「知識と力」、「知恵と敏捷性」それぞれを入れ替える。入れ替え後、力が知識より高ければ武器攻撃力が増加し、知識が力より高ければスキル「パフュームオブデス」のダメージが増加する。",
        "str_progress": "持続時間"
    },
    {
        "id": 1903,
        "imageid": 350,
        "unknown1_6": 14,
        "str_name": "ネームレスアタック",
        "unknown2_0": 1,
        "unknown10_139": 16384,
        "str_description": "装備している様々な武器で範囲内の敵を攻撃したり、または降霊したモンスターに攻撃命令を下す。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 1904,
        "imageid": 364,
        "unknown1_6": 14,
        "str_name": "怒髪衝天",
        "unknown2_0": 5,
        "unknown10_139": 8192,
        "str_description": "悪意に満ちた悪口で戦闘本能を刺激させる。ただし、敵が限られたわずかな時間内に対象を殺せなければ、極端なダメージを与えることができる。",
        "str_progress": "威力, 限界時間"
    },
    {
        "id": 1905,
        "imageid": 367,
        "unknown1_6": 14,
        "str_name": "無慈悲な拷問",
        "unknown2_0": 3,
        "unknown10_139": -32768,
        "str_description": "敵が攻撃を試みる度に、攻撃者も強大なダメージを受ける呪いをかける。",
        "str_progress": "威力, 持続時間"
    },
    {
        "id": 1906,
        "imageid": 366,
        "unknown1_6": 14,
        "str_name": "地獄針のむしろ",
        "unknown2_0": 3,
        "unknown10_139": -32768,
        "str_description": "敵の余裕を奪って攻撃のミスを誘い、自責の念を大きく増幅させ闇ダメージを与えながら命中率を減少させる。そのかわり自責の念に落ちた敵は攻撃速度が増加する。",
        "str_progress": "威力"
    },
    {
        "id": 1907,
        "imageid": 355,
        "unknown1_6": 14,
        "str_name": "デビルミラージュ",
        "unknown2_0": 1,
        "unknown10_139": 12288,
        "str_description": "任意の場所に、自分が悪魔に変化したと思わせるような幻影を作る。敵は、この幻影を先に攻撃するので時間を稼ぐことができる。幻影は周辺の敵に持続的ダメージを与え、従来より持続時間が短縮されて幻影が消えると周辺の敵にダメージを与える。",
        "str_progress": "威力、射程距離, 持続時間, 幻影のHP"
    },
    {
        "id": 1908,
        "imageid": 358,
        "unknown1_6": 14,
        "str_name": "死の宣告",
        "unknown2_0": 4,
        "unknown10_139": -16384,
        "str_description": "範囲内の敵に死の呪いをかけ、敵の体力を現在の体力から決まった割合の体力に、応急処置状態に変えてしまう。応急処置状態の敵のHPを全て減らすと、闇属性ダメージを追加で与える。",
        "str_progress": "威力、応急処置転換の割合"
    },
    {
        "id": 1909,
        "imageid": 357,
        "unknown1_6": 14,
        "str_name": "闇よりの使徒",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "邪悪な陰謀を企むことで自分を苦しめ、自身にダメージを与える。持続時間の経過により、アイテムやスキルの効果が消える時、効果が持続していた時間分、従来より大きいダメージを敵に与える。",
        "str_progress": "威力, 持続時間"
    },
    {
        "id": 1910,
        "imageid": 539,
        "unknown1_6": 14,
        "str_name": "ライフスティール",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "物理攻撃をするたびに少しずつ生命力を吸収する。",
        "str_progress": "なし"
    },
    {
        "id": 1911,
        "imageid": 540,
        "unknown1_6": 14,
        "str_name": "偽りの身体",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "人形服の中に隠していた呪いを一気に炸裂させる。敵に呪いをかけて、呪いを保有した敵に恐ろしい幻影を見せて闇属性ダメージを追加で与える。",
        "str_progress": "なし"
    },
    {
        "id": 1912,
        "imageid": 541,
        "unknown1_6": 14,
        "str_name": "邪悪な手札",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "敵を倒した際に、HPを一定値回復する。",
        "str_progress": "なし"
    },
    {
        "id": 1913,
        "imageid": 379,
        "unknown1_6": 15,
        "str_name": "ナインテールブレイズ",
        "unknown2_0": 4,
        "unknown10_139": 4096,
        "str_description": "強烈な地獄の業火に包まれた鞭で攻撃する。地獄の業火は一定回数にわたってダメージを与え続ける。従来よりダメージとCP獲得量が増加。",
        "str_progress": "威力、攻撃回数"
    },
    {
        "id": 1914,
        "imageid": 376,
        "unknown1_6": 15,
        "str_name": "ダイナマイトボディ",
        "unknown2_0": 1,
        "unknown10_139": 16384,
        "str_description": "鞭で遠い所にいる敵をからめて自分の前まで連れてくる。 的中すると敵の火炎抵抗を減少させる。",
        "str_progress": "威力"
    },
    {
        "id": 1915,
        "imageid": 383,
        "unknown1_6": 15,
        "str_name": "スパイダーペイン",
        "unknown2_0": 4,
        "unknown10_139": 16384,
        "str_description": "自分の周囲の一定地域に移動を抑止する蜘蛛の糸を撒き散らす。 さらに、敵に火炎ダメージを与える。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 1916,
        "imageid": 398,
        "unknown1_6": 15,
        "str_name": "契約再考",
        "unknown2_0": 4,
        "unknown10_139": 8192,
        "str_description": "敵が契約を結んだ状態の時に、一方的に契約の負担をなすりつけて衝撃とともに爆破ダメージを与える",
        "str_progress": "威力"
    },
    {
        "id": 1917,
        "imageid": 396,
        "unknown1_6": 15,
        "str_name": "堕魂の契約",
        "unknown2_0": 2,
        "unknown10_139": -32768,
        "str_description": "敵が契約を結んだ状態の時に、その契約を修正して死後の魂に関する権利を悪魔に譲渡する。これで敵は移動速度が減少し、死んだ際に最後の一撃を与えた者に一定数のCPを奪われるようになる。",
        "str_progress": "威力, 持続時間"
    },
    {
        "id": 1918,
        "imageid": 397,
        "unknown1_6": 15,
        "str_name": "呪血の契約",
        "unknown2_0": 3,
        "unknown10_139": -32768,
        "str_description": "敵が契約を結んだ状態の時に、その契約を修正して死後の血に関する権利を悪魔に譲渡する。これで敵は攻撃速度が減少し、死んだ際に最後の一撃を与えた者に一定数の体力を奪われるようになる",
        "str_progress": "威力, 持続時間"
    },
    {
        "id": 1919,
        "imageid": 389,
        "unknown1_6": 15,
        "str_name": "ヴェノムクラウド",
        "unknown2_0": 5,
        "unknown10_139": 12288,
        "str_description": "一定地域に致命的な毒ガス雲を振りまく。その中の敵は中毒状態になり、さらに打撃数が増加する。",
        "str_progress": "威力、範囲、中毒"
    },
    {
        "id": 1920,
        "imageid": 385,
        "unknown1_6": 15,
        "str_name": "ポイズンエクスプロッシブ",
        "unknown2_0": 1,
        "unknown10_139": -16384,
        "str_description": "敵の体内に広がった毒を瞬時に爆発させて強力なダメージをあたえる。中毒状態の敵に使うと、打撃数が増加する。",
        "str_progress": "威力"
    },
    {
        "id": 1921,
        "imageid": 390,
        "unknown1_6": 15,
        "str_name": "ディープディプレッション",
        "unknown2_0": 2,
        "unknown10_139": -16384,
        "str_description": "非常に悲しい歌声で気を引き、敵のすべての行動を遅くしてしまう。さらに毒にかかっている敵は、低下率が上昇する。",
        "str_progress": "発動確率, 攻撃\/移動速度低下"
    },
    {
        "id": 1922,
        "imageid": 542,
        "unknown1_6": 15,
        "str_name": "クイーンズプライド",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "周りに移動速度が減少した敵が多ければ多いほど女王の威厳が高まり、自身の魔法ダメージと攻撃速度が上昇する",
        "str_progress": "なし"
    },
    {
        "id": 1923,
        "imageid": 543,
        "unknown1_6": 15,
        "str_name": "デモンチェイン",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "魔の約定状態の敵に魂の契約や血の盟約、契約引き換えを使うと効果が範囲内の全ての敵に適用される。",
        "str_progress": "なし"
    },
    {
        "id": 1924,
        "imageid": 544,
        "unknown1_6": 15,
        "str_name": "エクスタシーボム",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "ポイズンボムで毒を爆発させエクスタシーを感じる。爆発させた回数だけCPが充填される。 ",
        "str_progress": "なし"
    },
    {
        "id": 1925,
        "imageid": 261,
        "unknown1_6": 10,
        "str_name": "エール",
        "unknown2_0": 2,
        "unknown10_139": 4096,
        "str_description": "手なずけたペットと召喚獣にエールを送り、物理攻撃力と防御力、魔法強打の確率を高める。敵を攻撃する時、対象の致命打抵抗が減少する。",
        "str_progress": "増加数値、持続時間"
    },
    {
        "id": 1926,
        "imageid": 274,
        "unknown1_6": 10,
        "str_name": "変化に富んだ日々",
        "unknown2_0": 5,
        "unknown10_139": 16384,
        "str_description": "手なずけたペットと召喚獣のクリティカル発動確率とクリティカルダメージ、ダブルクリティカルダメージを向上させる。",
        "str_progress": "向上率"
    },
    {
        "id": 1927,
        "imageid": 273,
        "unknown1_6": 10,
        "str_name": "日差しがうららかな一日",
        "unknown2_0": 4,
        "unknown10_139": 16384,
        "str_description": "手なずけたペットと召喚獣の全ての属性攻撃力と魔法致命打の確率を向上させる。",
        "str_progress": "向上率"
    },
    {
        "id": 1928,
        "imageid": 269,
        "unknown1_6": 10,
        "str_name": "唐辛子リミットブレイク",
        "unknown2_0": 5,
        "unknown10_139": 8192,
        "str_description": "ペットに辛い唐辛子を食べさせ、一時的にすべてのステータスを向上させる。さらに、ペットが攻撃した時に与えたダメージに比例し体力を回復する。",
        "str_progress": "向上率、回復率、持続時間"
    },
    {
        "id": 1929,
        "imageid": 251,
        "unknown1_6": 10,
        "str_name": "絶対攻撃",
        "unknown2_0": 1,
        "unknown10_139": -32768,
        "str_description": "手なずけたペットと召喚獣により効果的な攻撃命令を下す。 指定した敵を攻撃し、しばらくペットの物理攻撃力とクリティカル確率が上昇する。",
        "str_progress": "モンスター攻撃力, モンスター致命打確率, 持続時間"
    },
    {
        "id": 1930,
        "imageid": 252,
        "unknown1_6": 10,
        "str_name": "絶対防御",
        "unknown2_0": 1,
        "unknown10_139": -32768,
        "str_description": "手なずけたペットと召喚獣により効果的な防御中心の攻撃命令を下す。 しばらくペットの防御力とブロック率が上昇する。",
        "str_progress": "モンスター防御力, モンスターブロック確率, 持続時間"
    },
    {
        "id": 1931,
        "imageid": 270,
        "unknown1_6": 10,
        "str_name": "晴れた空",
        "unknown2_0": 1,
        "unknown10_139": 12288,
        "str_description": "手なずけたペットと召喚獣の全てのステータスを向上させ、ペットと召喚獣の強打と魔法致命打の確率が増加する。",
        "str_progress": "増加値"
    },
    {
        "id": 1932,
        "imageid": 256,
        "unknown1_6": 10,
        "str_name": "チャームアイ",
        "unknown2_0": 2,
        "unknown10_139": -16384,
        "str_description": "手なずけるを試みている敵をカリスマによって抑えつけ、手なずけるに失敗しても敵に攻撃されないようにする。手なずけるが成功した場合、忠誠度は100になり、ペットレベルも従来より上昇する。",
        "str_progress": "成功確率, 忠誠度増加量, 最大忠誠度"
    },
    {
        "id": 1933,
        "imageid": 268,
        "unknown1_6": 10,
        "str_name": "怒鳴る",
        "unknown2_0": 4,
        "unknown10_139": -16384,
        "str_description": "ペットの間違いを叱りつけてすごく多くの経験値が得られるようにする。但し、自分のレベルと同じかそれ以上のペットには効果がない。従来より獲得経験値と範囲が増加。",
        "str_progress": "獲得経験値率, 有効半径"
    },
    {
        "id": 1934,
        "imageid": 773,
        "unknown1_6": 10,
        "str_name": "気の置けない友達",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "ビーストテイマーとペットの関係がさらに深まり、ペットがより強力なダメージを与えられるようになる。",
        "str_progress": "無し"
    },
    {
        "id": 1935,
        "imageid": 774,
        "unknown1_6": 10,
        "str_name": "強化命令",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "卓越した調教技術に基づき、より体系的で明確な命令を下す。",
        "str_progress": "無し"
    },
    {
        "id": 1936,
        "imageid": 775,
        "unknown1_6": 10,
        "str_name": "天気予報",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "ビーストテイマーが天気を見て、[憂鬱な日]、[霧の朝]とその覚醒スキル効果の一部を自分が受けられるようにする。",
        "str_progress": "無し"
    },
    {
        "id": 1937,
        "imageid": 276,
        "unknown1_6": 11,
        "str_name": "突撃の鼓笛",
        "unknown2_0": 1,
        "unknown10_139": 4096,
        "str_description": "現在のペットと召喚獣に敵に向かって突進する命令を下す。ペットと召喚獣の攻撃力が従来より上昇する。",
        "str_progress": "召喚獣攻撃力"
    },
    {
        "id": 1938,
        "imageid": 277,
        "unknown1_6": 11,
        "str_name": "保護の鼓笛",
        "unknown2_0": 1,
        "unknown10_139": 16384,
        "str_description": "ペットと召喚獣に身を保護しながら敵を攻撃する命令を下す。召喚獣の防御力が従来より上昇する。",
        "str_progress": "召喚獣防御力"
    },
    {
        "id": 1939,
        "imageid": 299,
        "unknown1_6": 11,
        "str_name": "愛のオーラ",
        "unknown2_0": 4,
        "unknown10_139": 16384,
        "str_description": "自分の周りの召喚獣をパワーアップさせて、レベル・魔法攻撃力・全体速度・体力・魔法抵抗率を上昇させる。追加でパーティーメンバーの能力値を上昇させる。",
        "str_progress": "上昇率"
    },
    {
        "id": 1940,
        "imageid": 281,
        "unknown1_6": 11,
        "str_name": "エクスペンションインシナレイト",
        "unknown2_0": 5,
        "unknown10_139": 8192,
        "str_description": "全ての召喚獣の体が高熱の火炎で取り囲まれ、周辺に接近するすべての敵にダメージを与える。すべての召喚獣に該当効果が付与される。",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 1941,
        "imageid": 288,
        "unknown1_6": 11,
        "str_name": "ゲイルパンチMK2",
        "unknown2_0": 4,
        "unknown10_139": -32768,
        "str_description": "敵に風を圧縮したロケットパンチを放つ。命中するとその周囲に竜巻が生じて、周囲の敵も打撃を受けながら竜巻の方に吸い込まれる。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 1942,
        "imageid": 289,
        "unknown1_6": 11,
        "str_name": "アビスポイント",
        "unknown2_0": 5,
        "unknown10_139": -32768,
        "str_description": "特定の場所に鳥を生成して、その周辺に敵を惑わす乱気流を発生させる。。気流の影響下にある敵は、その影響で鳥を攻撃しにくくなり持続的に若干打撃を受ける。インシナレイトを使っている状態で使用すると追加ダメージ発生。",
        "str_progress": "威力, 範囲, 持続時間, 召喚獣防御力\/抵抗力"
    },
    {
        "id": 1943,
        "imageid": 284,
        "unknown1_6": 11,
        "str_name": "ウォーターボミング",
        "unknown2_0": 4,
        "unknown10_139": 12288,
        "str_description": "スウェルファーが作り出した巨大な水球を空中から落下させる。地上で炸裂した水球は広範囲の敵にダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1944,
        "imageid": 285,
        "unknown1_6": 11,
        "str_name": "アクアブランブル",
        "unknown2_0": 5,
        "unknown10_139": -16384,
        "str_description": "召喚魔法により地下水脈の流れを操り、一定範囲の地域の竹を急速に成長させる。鋭い竹に触れた敵は持続的にダメージを受け、エリア内の味方のクリティカルヒット確率と攻撃速度を上昇する。同時に3個まで設置可能。",
        "str_progress": "威力"
    },
    {
        "id": 1945,
        "imageid": 291,
        "unknown1_6": 11,
        "str_name": "ヘッジャーフェンシング",
        "unknown2_0": 2,
        "unknown10_139": -16384,
        "str_description": "ヘッジャーが指定した地形の土を掘って、移動を防ぐ障害物を形成する。また同時に防具を腐食させ、防御力を下げる。",
        "str_progress": "威力, 範囲, 持続時間"
    },
    {
        "id": 1946,
        "imageid": 554,
        "unknown1_6": 11,
        "str_name": "絶対服従",
        "unknown2_0": 1,
        "unknown10_139": 1024,
        "str_description": "鍛え上げられた召喚能力で命令効果がペットにも影響を与える。",
        "str_progress": "なし"
    },
    {
        "id": 1947,
        "imageid": 555,
        "unknown1_6": 11,
        "str_name": "火と風の祭",
        "unknown2_0": 1,
        "unknown10_139": 2048,
        "str_description": "ケルビーとウィンディーを召喚すると火と風が出会い強い火の風を起こす。魔法攻撃力とすべての攻撃範囲が上昇する。",
        "str_progress": "なし"
    },
    {
        "id": 1948,
        "imageid": 556,
        "unknown1_6": 11,
        "str_name": "土と水の恵み",
        "unknown2_0": 1,
        "unknown10_139": 3072,
        "str_description": "大地に水が注がれて強い生命の力が生まれる。基本攻撃力、魔法攻撃力、体力が上昇する。",
        "str_progress": "なし"
    },
    {
        "id": 1949,
        "imageid": 288,
        "unknown1_6": 32,
        "str_name": "ゲイルパンチMk2",
        "unknown2_0": 4,
        "unknown10_139": -32768,
        "str_description": "敵に風を圧縮したロケットパンチを放つ。命中するとその周囲に竜巻が生じて、周囲の敵も打撃を受けながら竜巻の方に吸い込まれる。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 1950,
        "imageid": 289,
        "unknown1_6": 32,
        "str_name": "アビスポイント",
        "unknown2_0": 5,
        "unknown10_139": -32768,
        "str_description": "特定の場所に鳥を生成して、その周辺に敵を惑わす乱気流を発生させる。気流の影響下にある敵は、その影響で鳥を攻撃しにくくなり持続的に若干打撃を受ける。インシナレイトを使っている状態で使用すると追加ダメージ発生。",
        "str_progress": "威力, 範囲, 持続時間, 召喚獣防御力\/抵抗力"
    },
    {
        "id": 1951,
        "imageid": 284,
        "unknown1_6": 32,
        "str_name": "ウォーターボミング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "スウェルファーが作り出した巨大な水球を空中から落下させる。地上で炸裂した水球は広範囲の敵にダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1952,
        "imageid": 285,
        "unknown1_6": 32,
        "str_name": "アクアブランブル",
        "unknown2_0": 5,
        "unknown10_139": -16384,
        "str_description": "召喚魔法により地下水脈の流れを操り、一定範囲の地域の竹を急速に成長させる。鋭い竹に触れた敵は持続的にダメージを受け、エリア内の味方のクリティカルヒット確率と攻撃速度を上昇する。同時に3個まで設置可能。",
        "str_progress": "威力"
    },
    {
        "id": 1953,
        "imageid": 291,
        "unknown1_6": 32,
        "str_name": "ヘッジャーフェンシング",
        "unknown2_0": 2,
        "unknown10_139": -16384,
        "str_description": "ヘッジャーが指定した地形の土を掘って、移動を防ぐ障害物を形成する。また同時に防具を腐食させ、防御力を下げる。",
        "str_progress": "威力, 範囲, 持続時間"
    },
    {
        "id": 1954,
        "imageid": 1954,
        "unknown1_6": -1,
        "str_name": "マジカルアロー[Pet]",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が戦闘中の場合、ミニペットが敵に小さな幻の矢を打つ",
        "str_progress": "ダメージ, 発動確率"
    },
    {
        "id": 1955,
        "imageid": 1955,
        "unknown1_6": -1,
        "str_name": "ラッキーファンタジー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "幻想的な幸運の力を持ち主に付与し、持ち主の能力を向上させてくれる",
        "str_progress": "運"
    },
    {
        "id": 1956,
        "imageid": 1956,
        "unknown1_6": -1,
        "str_name": "ペットリストア",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主が被ダメージを受けると受けたダメージに比例して、持主の体力を回復させてくれる",
        "str_progress": "発動確率, 回復量"
    },
    {
        "id": 1957,
        "imageid": 1957,
        "unknown1_6": -1,
        "str_name": "コンバットエクスパート",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主にチャームを付与し、アイテム値段、修理費など各種商人に払う額を少しだけ減少させてくれる。",
        "str_progress": "割引率"
    },
    {
        "id": 1958,
        "imageid": 1958,
        "unknown1_6": -1,
        "str_name": "エンブレイスアメジスト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "アメジストの能力を持主に付与し、持主の状態異常抵抗力を向上させてくれる",
        "str_progress": "状態異常抵抗力"
    },
    {
        "id": 1959,
        "imageid": 1959,
        "unknown1_6": -1,
        "str_name": "クラウンズウェーブ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主にはダメージを与えない鋭い音波を四方に発射し、周辺の敵に打撃を与える。",
        "str_progress": "ダメージ, 発動確率"
    },
    {
        "id": 1960,
        "imageid": 1960,
        "unknown1_6": -1,
        "str_name": "振動拡声器",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "音を増幅させる振動拡声器を使用し、クラウンズウェーブの発動確率と範囲を向上させる",
        "str_progress": "範囲, 発動確率"
    },
    {
        "id": 1961,
        "imageid": 1961,
        "unknown1_6": -1,
        "str_name": "イリュージョンマスク",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "マスクを着用することで、マジカルアロー[Pet]の威力を強化させる。",
        "str_progress": "ダメージ"
    },
    {
        "id": 1962,
        "imageid": 1962,
        "unknown1_6": -1,
        "str_name": "ヴァンパイアハンズ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "攻撃した際のダメージの一定量を持主に与える。",
        "str_progress": "発動確率"
    },
    {
        "id": 1963,
        "imageid": 1963,
        "unknown1_6": -1,
        "str_name": "ゴリアテコンカラー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットが攻撃するモンスターがセミボスモンスターの場合、ミニペットの攻撃力が増加",
        "str_progress": "ダメージ"
    },
    {
        "id": 1964,
        "imageid": 1964,
        "unknown1_6": -1,
        "str_name": "悪夢の蜃気楼",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "囲まれた者たちを地の果てまで絶望させる幻想の力で、持主の敵を攻撃する",
        "str_progress": "ダメージ, 発動確率"
    },
    {
        "id": 1965,
        "imageid": 1965,
        "unknown1_6": -1,
        "str_name": "アシスタンスオブジュミル",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "焚火の上で踊るように上昇する垂直のアシスタンスオブジュミルにより、悪夢の蜃気楼の威力をより強化させる。",
        "str_progress": "ダメージ"
    },
    {
        "id": 1966,
        "imageid": 1966,
        "unknown1_6": -1,
        "str_name": "幻想領域",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主がスキルを使用して敵を攻撃する時、CPの回復量をさらに増加させる",
        "str_progress": "発動確率"
    },
    {
        "id": 1967,
        "imageid": 1967,
        "unknown1_6": -1,
        "str_name": "クリスタルコア",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの中心部をクリスタル化し、持主の魔法抵抗力を向上させると同時に全ての魔法抵抗力に対するペナルティを少しずつ減らしてくれる",
        "str_progress": "魔法抵抗力、フィールド魔法抵抗力ペナルティー減少"
    },
    {
        "id": 1968,
        "imageid": 1968,
        "unknown1_6": -1,
        "str_name": "ミラージュマスター",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットが攻撃するモンスターがセミボスモンスターの場合、該当モンスターの抵抗力が減少する",
        "str_progress": "抵抗力減少"
    },
    {
        "id": 1969,
        "imageid": 1969,
        "unknown1_6": -1,
        "str_name": "シャフトスプレー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペット、持主が攻撃する度に充満したエネルギーで周囲の敵に幻の矢を降らせ攻撃する",
        "str_progress": "ダメージ"
    },
    {
        "id": 1970,
        "imageid": 1970,
        "unknown1_6": -1,
        "str_name": "秘密道具",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "より早く幻の矢を生成できる秘密道具の使用により、シャフトスプレーのチャージ時間を短縮させる",
        "str_progress": "チャージ回数短縮"
    },
    {
        "id": 1971,
        "imageid": 1971,
        "unknown1_6": -1,
        "str_name": "巨神の影",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "光の巨神たちの影で、祝福を受けたザオリンが持主の敵をもっと頻繁に攻撃する",
        "str_progress": "発動確率"
    },
    {
        "id": 1972,
        "imageid": 1972,
        "unknown1_6": -1,
        "str_name": "ミニマッスルインフレーション",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミニペットの能力で、持主の致命打率を上げる",
        "str_progress": "致命打"
    },
    {
        "id": 1973,
        "imageid": 1973,
        "unknown1_6": -1,
        "str_name": "ジャミルの虚像",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ジャミルの祝福により、ミニペットが攻撃するモンスターがセミボスモンスターの場合、ミニペットの攻撃頻度が増える",
        "str_progress": "発動確率"
    },
    {
        "id": 1974,
        "imageid": 1974,
        "unknown1_6": -1,
        "str_name": "アニマの激励",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主を激励し、能力を向上させる",
        "str_progress": "知識、知恵、健康"
    },
    {
        "id": 1975,
        "imageid": 1975,
        "unknown1_6": -1,
        "str_name": "アニムスの祝福",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主を祝福し、能力を向上させる",
        "str_progress": "力、敏捷、カリスマ"
    },
    {
        "id": 1976,
        "imageid": 1976,
        "unknown1_6": -1,
        "str_name": "エンブレイスジュエル",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "多様な宝石の能力を持主に付与し、持主の全ての魔法抵抗力を向上させる",
        "str_progress": "魔法抵抗力"
    },
    {
        "id": 1977,
        "imageid": 1977,
        "unknown1_6": -1,
        "str_name": "対人間型防御",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主の対人間型防御の能力を高め、モンスターが人間型の場合、持主の防御力を増加させる",
        "str_progress": "防御力"
    },
    {
        "id": 1978,
        "imageid": 1978,
        "unknown1_6": -1,
        "str_name": "対人間型攻撃",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "持主の対人間型攻撃の能力を高め、モンスターが人間型の場合、持主の攻撃力を増加させる",
        "str_progress": "攻撃力"
    },
    {
        "id": 1979,
        "imageid": 1979,
        "unknown1_6": -1,
        "str_name": "太陽の躍動",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "太陽の躍動を受け、ミニペットが攻撃するモンスターがセミボスモンスターの場合、ミニペットの攻撃頻度が上昇",
        "str_progress": "発動確率"
    },
    {
        "id": 1980,
        "imageid": 1980,
        "unknown1_6": -1,
        "str_name": "月の思想",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "月の思想を受け、ミニペットが攻撃するモンスターがセミボスモンスターの場合、ミニペットの攻撃頻度が上昇",
        "str_progress": "発動確率"
    },
    {
        "id": 1981,
        "imageid": 1981,
        "unknown1_6": -1,
        "str_name": "太陽の支配者",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "対人専用スキル。持主に太陽の加護を与え、持主が攻撃する度に相手プレイヤーに光属性の追加ダメージが発生する。スキルレベルが上がるほど光属性の追加ダメージが増加",
        "str_progress": "ダメージ"
    },
    {
        "id": 1982,
        "imageid": 1982,
        "unknown1_6": -1,
        "str_name": "太陰の守護者",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "対人専用スキル。持主に太陰の加護を与え、持主が攻撃する度に相手プレイヤーに闇属性の追加ダメージが発生する。スキルレベルが上がるほど闇属性の追加ダメージが増加",
        "str_progress": "ダメージ"
    },
    {
        "id": 1983,
        "imageid": 1983,
        "unknown1_6": -1,
        "str_name": "ブリッツボルト",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "陽が基本スキルで攻撃すると敵を感電状態にする。スキルレベルが上がるほど感電持続時間が増加",
        "str_progress": "持続時間"
    },
    {
        "id": 1984,
        "imageid": 1984,
        "unknown1_6": -1,
        "str_name": "スパークラッシュ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "陰が基本スキルで攻撃すると敵を感電状態にする。スキルレベルが上がるほど感電持続時間が増加",
        "str_progress": "持続時間"
    },
    {
        "id": 1985,
        "imageid": 1985,
        "unknown1_6": -1,
        "str_name": "リアルエレメンタル",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ペットのダメージ +50％、精霊型の補助スキルレベル +1",
        "str_progress": ""
    },
    {
        "id": 1986,
        "imageid": 1986,
        "unknown1_6": -1,
        "str_name": "無極元素",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "基本型ペットのスキルレベル +1、自然型の補助スキルレベル +1",
        "str_progress": ""
    },
    {
        "id": 1987,
        "imageid": 1987,
        "unknown1_6": -1,
        "str_name": "古代神の意思",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ペットのスキル発動確率 +150％、神霊型の補助スキルレベル +1",
        "str_progress": ""
    },
    {
        "id": 1988,
        "imageid": 1988,
        "unknown1_6": -1,
        "str_name": "古代の民の宴 Ⅰ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ペットの全スキルレベル +1、ステータス増加スキルレベル +1",
        "str_progress": ""
    },
    {
        "id": 1989,
        "imageid": 1989,
        "unknown1_6": -1,
        "str_name": "古代の民の宴 Ⅱ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ペットの全スキルレベル +1、ステータス増加スキルレベル +1",
        "str_progress": ""
    },
    {
        "id": 1990,
        "imageid": 1990,
        "unknown1_6": -1,
        "str_name": "古代の民の宴 Ⅲ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ペットの全スキルレベル +1、ステータス増加スキルレベル +1",
        "str_progress": ""
    },
    {
        "id": 1991,
        "imageid": 1991,
        "unknown1_6": -1,
        "str_name": "古代の民の宴 Ⅳ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ペットの全スキルレベル +1、ステータス増加スキルレベル +1",
        "str_progress": ""
    },
    {
        "id": 1992,
        "imageid": 1992,
        "unknown1_6": -1,
        "str_name": "パーフェクトエレメンタル",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ペットのダメージ +50％、精霊型の補助スキルレベル +2",
        "str_progress": ""
    },
    {
        "id": 1993,
        "imageid": 1993,
        "unknown1_6": -1,
        "str_name": "星煌元素",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "基本型ペットのスキルレベル +1、自然型の補助スキルレベル +2",
        "str_progress": ""
    },
    {
        "id": 1994,
        "imageid": 1994,
        "unknown1_6": -1,
        "str_name": "古代神の現身",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ペットのスキル発動確率 ×150％、神霊型主人の補助スキルレベル +2",
        "str_progress": ""
    },
    {
        "id": 1995,
        "imageid": 1995,
        "unknown1_6": -1,
        "str_name": "陰陽融合",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ペットのスキル発動確率 ×100％、基本型ペットのスキルレベル +1、ペットのダメージ +30％",
        "str_progress": ""
    },
    {
        "id": 1996,
        "imageid": 1996,
        "unknown1_6": -1,
        "str_name": "陰陽調和",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ペットのスキル発動確率 +150％、基本型ペットのスキルレベル +1、ペットのダメージ +50％、ペットスキルレベル +1",
        "str_progress": ""
    },
    {
        "id": 1997,
        "imageid": 1997,
        "unknown1_6": -1,
        "str_name": "ドリームファンタジー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ペットの物理ダメージ +10％",
        "str_progress": ""
    },
    {
        "id": 1998,
        "imageid": 1998,
        "unknown1_6": -1,
        "str_name": "メッシブファンタジー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ペットの物理ダメージ +20％",
        "str_progress": ""
    },
    {
        "id": 1999,
        "imageid": 1999,
        "unknown1_6": 32,
        "str_name": "アーストラーマー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "強く叩きおろし、暫くの間敵を気絶させる。",
        "str_progress": ""
    },
    {
        "id": 2000,
        "imageid": 2000,
        "unknown1_6": 32,
        "str_name": "フォグフォームPOT",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 2001,
        "imageid": 2001,
        "unknown1_6": 32,
        "str_name": "アイシクルPOT",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 2002,
        "imageid": 2002,
        "unknown1_6": 32,
        "str_name": "戦意喪失POT",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 2003,
        "imageid": 2003,
        "unknown1_6": 32,
        "str_name": "アイシドフィーラPOT",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 2004,
        "imageid": 2004,
        "unknown1_6": 32,
        "str_name": "魔の約定(B)",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": ""
    },
    {
        "id": 2005,
        "imageid": 2005,
        "unknown1_6": 32,
        "str_name": "死の視線POT",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "凄まじい目で相手を睨めつけ、各種状態異常を起こす邪悪な能力",
        "str_progress": ""
    },
    {
        "id": 2006,
        "imageid": 2006,
        "unknown1_6": 32,
        "str_name": "飛行POT",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": ""
    },
    {
        "id": 2007,
        "imageid": 2007,
        "unknown1_6": 32,
        "str_name": "ポリモフエクスプロージョンPOT",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": ""
    },
    {
        "id": 2008,
        "imageid": 2008,
        "unknown1_6": 32,
        "str_name": "エンジェリックソードPOT",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "モンスターが槍を使用して行う、平凡な攻撃。",
        "str_progress": ""
    },
    {
        "id": 2009,
        "imageid": 2009,
        "unknown1_6": 32,
        "str_name": "スラストラッシュPOT",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ヴァルキリーが剣と共に突進して直線上にいる全ての敵をノックバックさせる",
        "str_progress": ""
    },
    {
        "id": 2010,
        "imageid": 2010,
        "unknown1_6": 32,
        "str_name": "光の祝福POT",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ヴァルキリーが自身に光の祝福を与えて移動速度と攻撃速度を一時的に増加させる。また攻撃に光ダメージを付与する。",
        "str_progress": ""
    },
    {
        "id": 2011,
        "imageid": 2011,
        "unknown1_6": 32,
        "str_name": "シャインニングフリーズPOT",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "眩しい光を放って少しの間、相手の視界を奪う。",
        "str_progress": "威力"
    },
    {
        "id": 2012,
        "imageid": 2012,
        "unknown1_6": 32,
        "str_name": "シャイニングエクスプロージョン",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "雷で敵に物理的、心理的なダメージを与える。ダメージと一定時間、敵の速度低下及び感電状態にする。",
        "str_progress": "威力"
    },
    {
        "id": 2013,
        "imageid": 2013,
        "unknown1_6": 32,
        "str_name": "フラッシュPOT",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "眩しい光を放って少しの間、周りにいる相手の視界を奪う。",
        "str_progress": "威力"
    },
    {
        "id": 2014,
        "imageid": 2014,
        "unknown1_6": 32,
        "str_name": "グラディエルスラッシュPOT",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "ヴァルキリーが光速で剣を振り回して敵を切る。また発生する風圧で周りにいる敵を一か所に集める。",
        "str_progress": ""
    },
    {
        "id": 2015,
        "imageid": 2015,
        "unknown1_6": 32,
        "str_name": "ホーリーポールライティングPOT",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "ヴァルキリーが光速で剣を振り回して敵を切る。また発生する風圧でターゲットの周りにいる敵を一か所に集める。",
        "str_progress": ""
    },
    {
        "id": 2016,
        "imageid": 2016,
        "unknown1_6": 32,
        "str_name": "アポカリプスパニッシャPOT",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": ""
    },
    {
        "id": 2017,
        "imageid": 2017,
        "unknown1_6": 32,
        "str_name": "ドラゴニックスマッシュPOT",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "モンスターが敵を攻撃する、平凡な攻撃。",
        "str_progress": ""
    },
    {
        "id": 2018,
        "imageid": 2018,
        "unknown1_6": 32,
        "str_name": "ヴォルカニックショットPOT",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "燃え上がる火炎玉を飛ばして爆発させ、周りの敵に物理火炎被害を与える。",
        "str_progress": ""
    },
    {
        "id": 2019,
        "imageid": 2019,
        "unknown1_6": 32,
        "str_name": "ドラゴニックレイジPOT",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "指定した味方の武器に炎の力を降り注いで、属性攻撃力を付与する。",
        "str_progress": ""
    },
    {
        "id": 2020,
        "imageid": 2020,
        "unknown1_6": 32,
        "str_name": "ヴォルカニックブレイクPOT",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "両手で地面を強くたたきつけ、地面を割ってマグマを爆発させる。",
        "str_progress": ""
    },
    {
        "id": 2021,
        "imageid": 2021,
        "unknown1_6": 32,
        "str_name": "ヴォルカニックディバイドPOT",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "ドラゴンの魔力を乗せた波動を流し込んで、周りの敵の防御力、火炎抵抗力、闇抵抗力を半減させる。",
        "str_progress": ""
    },
    {
        "id": 2022,
        "imageid": 2022,
        "unknown1_6": 32,
        "str_name": "ヴォルカニッククラウリングPOT",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": ""
    },
    {
        "id": 2023,
        "imageid": 2023,
        "unknown1_6": 32,
        "str_name": "イグニッションフリーズンPOT",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": ""
    },
    {
        "id": 2024,
        "imageid": 2024,
        "unknown1_6": 32,
        "str_name": "ドラゴニックボムPOT",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": ""
    },
    {
        "id": 2025,
        "imageid": 2025,
        "unknown1_6": 32,
        "str_name": "ディアボリックインフェルノPOT",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": " ",
        "str_progress": " "
    },
    {
        "id": 2026,
        "imageid": 2026,
        "unknown1_6": 32,
        "str_name": "エンジェリックソードPOT2",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "モンスターが槍を使用して行う、平凡な攻撃。",
        "str_progress": ""
    },
    {
        "id": 2027,
        "imageid": 2027,
        "unknown1_6": 32,
        "str_name": "ヴォルカニックブレイクPOT2",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "両手で地面を強くたたきつけ、地面を割ってマグマを爆発させる。",
        "str_progress": ""
    },
    {
        "id": 2028,
        "imageid": 2028,
        "unknown1_6": 32,
        "str_name": "ラウンディングブーム2",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 2029,
        "imageid": 2029,
        "unknown1_6": 32,
        "str_name": "ドラゴニックスマッシュPOT2",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "モンスターが敵を攻撃する、平凡な攻撃。",
        "str_progress": ""
    },
    {
        "id": 2030,
        "imageid": 2030,
        "unknown1_6": 32,
        "str_name": "ペンタフィップ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "自分の分身を作って一度に3回攻撃を行う。",
        "str_progress": ""
    },
    {
        "id": 2031,
        "imageid": 2031,
        "unknown1_6": 32,
        "str_name": "ハードナックル",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "イグノアが振りかぶった拳で二回打撃を与える",
        "str_progress": "威力"
    },
    {
        "id": 2032,
        "imageid": 2032,
        "unknown1_6": 32,
        "str_name": "ショックウェーブ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "イグノアが両手を地面を強く打ち下ろすことで衝撃波が発生し、周辺の敵にダメージを与える。",
        "str_progress": "威力、クールタイム減少"
    },
    {
        "id": 2033,
        "imageid": 2033,
        "unknown1_6": 32,
        "str_name": "レイジバースト",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "イグノアが自爆によって消滅する。消滅の際に発生する崩壊の力により周囲に大きな被害を与える。",
        "str_progress": "威力、範囲"
    },
    {
        "id": 2034,
        "imageid": 2034,
        "unknown1_6": 32,
        "str_name": "シールドアタック",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "リアムが盾で敵を攻撃する。一定の確率で敵の注意を引きつける。",
        "str_progress": "威力"
    },
    {
        "id": 2035,
        "imageid": 2035,
        "unknown1_6": 32,
        "str_name": "タウント",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "リアムが防御姿勢を取りながら周辺の敵を挑発する。リアムが受けるダメージが減少する",
        "str_progress": "ダメージ減少率、使用周期"
    },
    {
        "id": 2036,
        "imageid": 2036,
        "unknown1_6": 32,
        "str_name": "カーディアンズオブグローリー",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "リアムが守護の祝福と共に消滅する。消滅の際に発生する崩壊の力により周辺の味方の最大体力、防御力、魔法抵抗力が上昇する。",
        "str_progress": "最大体力、防御力、魔法防御力"
    },
    {
        "id": 2037,
        "imageid": 2037,
        "unknown1_6": 32,
        "str_name": "救いの手",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "シンシアが治癒の力で味方の体力を回復する。",
        "str_progress": "回復率、使用周期"
    },
    {
        "id": 2038,
        "imageid": 2038,
        "unknown1_6": 32,
        "str_name": "犠牲の祝福",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "シンシアが自身の生命を味方に分け与えて消滅する。消滅の際に発生する崩壊の力により体力が大量に回復し、全異常状態を解除して状態抵抗力が増加する。",
        "str_progress": "回復率、範囲"
    },
    {
        "id": 2039,
        "imageid": 2039,
        "unknown1_6": 32,
        "str_name": "ウォーターキャノン",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "狭い範囲の敵に強力な水圧の水鉄砲を発射。攻撃を受けた敵は水圧によって後退する。 ",
        "str_progress": ""
    },
    {
        "id": 2040,
        "imageid": 2040,
        "unknown1_6": 32,
        "str_name": "ソードエンパラー",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "自分の分身を作って一度に3回攻撃を行う。",
        "str_progress": ""
    },
    {
        "id": 2041,
        "imageid": 2041,
        "unknown1_6": 32,
        "str_name": "フレイムクロー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "鋭い足爪に火の力を込めて敵を攻撃する。",
        "str_progress": ""
    },
    {
        "id": 2042,
        "imageid": 2042,
        "unknown1_6": 32,
        "str_name": "フレイムストーム(エリートファル",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 2043,
        "imageid": 2043,
        "unknown1_6": 32,
        "str_name": "ポイズンボム(エリート森の司令)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "no comment",
        "str_progress": ""
    },
    {
        "id": 2044,
        "imageid": 2044,
        "unknown1_6": 32,
        "str_name": "トキシックレイン(エリート森の司",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "声を上げる",
        "str_progress": ""
    },
    {
        "id": 2045,
        "imageid": 2045,
        "unknown1_6": 32,
        "str_name": "ブラックファイヤーウェーブ (M)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "地面を流れる三又の黒い炎を吐き出す。",
        "str_progress": ""
    },
    {
        "id": 2046,
        "imageid": 2046,
        "unknown1_6": 32,
        "str_name": "ヴェノムスモーク (M)",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "一定の地域に毒ガスの雲を形成し、その中いる敵は毒に侵される",
        "str_progress": ""
    },
    {
        "id": 2047,
        "imageid": 2047,
        "unknown1_6": 32,
        "str_name": "パーティーヒーリング",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "周囲にいるパーティー全員の体力を回復する。",
        "str_progress": "回復量, 範囲"
    },
    {
        "id": 53,
        "imageid": 53,
        "unknown1_6": 2,
        "str_name": "??? ??",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "??? ??? ???? ??? ??. ?? ??? ?? ???? ? ??? ??",
        "str_progress": "??, ?? ??"
    },
    {
        "id": 230,
        "imageid": 230,
        "unknown1_6": 8,
        "str_name": "??? ????",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "???? ?? ???? ?? ?? ??? ?? ??? ??? ?.",
        "str_progress": "??"
    },
    {
        "id": 319,
        "imageid": 319,
        "unknown1_6": 12,
        "str_name": "????",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "? ? ?? ??? ?? ??? ?? ?? ??? ??? ??. ??? ??? ??? ? ??? ? ? ?? ??",
        "str_progress": "??? ??, ?? ??, ?? ??"
    },
    {
        "id": 373,
        "imageid": 373,
        "unknown1_6": 14,
        "str_name": "??",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "???? ??? ??? ???? ??? ? ?? ??. ?? ????? ????? ?? ???? ???? ??? ????? ??? ?? ?? ???? ??",
        "str_progress": "?? ??, ??, ?? ??"
    },
    {
        "id": 1202,
        "imageid": 319,
        "unknown1_6": 12,
        "str_name": "????",
        "unknown2_0": 3,
        "unknown10_139": 16384,
        "str_description": "? ? ?? ??? ?? ??? ?? ?? ??? ??? ??. ??? ??? ??? ? ??? ?? ? ? ?? ?? ??? ? ? ??? ?? ?? ?? CP? ?? ??",
        "str_progress": "??? ??, ?? ??, ?? ??"
    },
    {
        "id": 11,
        "imageid": 11,
        "unknown1_6": 0,
        "str_name": "ビターシールド",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": "威力, ノックバック距離, 麻痺持続時間, 麻痺確率"
    },
    {
        "id": 12,
        "imageid": 12,
        "unknown1_6": 0,
        "str_name": "タンクラッシュ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": "威力, 防御力"
    },
    {
        "id": 17,
        "imageid": 17,
        "unknown1_6": 0,
        "str_name": "デュエリング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵に決闘を挑む。一定時間の間、指定された敵は剣士だけを攻撃する",
        "str_progress": "発動確率, 敵命中率, 持続時間, ダメージ減少率"
    },
    {
        "id": 24,
        "imageid": 24,
        "unknown1_6": 0,
        "str_name": "ファイナルチャージング",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "狙いを定めた敵に剣を突き出しながら突進し、途中の敵を巻き込みながらダメージを与える。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 38,
        "imageid": 38,
        "unknown1_6": 1,
        "str_name": "スピンスラスティング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "剣を螺旋状に突き出す。普通の突きより威力が強く、盾をも貫く。",
        "str_progress": "威力, 攻撃速度, ブロック率無視"
    },
    {
        "id": 41,
        "imageid": 41,
        "unknown1_6": 1,
        "str_name": "ジャンプ",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "剣を上に持ち上げてジャンプを行う。\r\n着地点の敵は押し出されてしばらく麻痺する。",
        "str_progress": "移動距離, 麻痺時間"
    },
    {
        "id": 42,
        "imageid": 42,
        "unknown1_6": 1,
        "str_name": "ジャンプ攻撃",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ジャンプの後、着地点で剣を垂直に振り下ろす。\r\n着地点の敵は押し出される。",
        "str_progress": "移動距離, 威力"
    },
    {
        "id": 44,
        "imageid": 44,
        "unknown1_6": 1,
        "str_name": "オルターリングヒッター",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "非常に素早く移動した後、敵に連続攻撃を行う。\r\nディレイクラッシングスキルで連係するとダメージを増幅させる。",
        "str_progress": "威力, 打撃回数"
    },
    {
        "id": 48,
        "imageid": 743,
        "unknown1_6": 1,
        "str_name": "ウェポンディフェンダー",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "防御膜を作り一定時間の間、全ての状態異常攻撃に抵抗し、受けたダメージを凝縮する。自分のすべてのスキルレベルを上げる。",
        "str_progress": "防御膜上昇率, クールタイム減少, 全ての状態異常攻撃抵抗"
    },
    {
        "id": 61,
        "imageid": 61,
        "unknown1_6": 2,
        "str_name": "テレポーテーション",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "指定した場所に瞬間移動する。\r\n低レベル時は瞬間移動の後に集中力が落ちるが、レベルが上がると上昇するようになる。",
        "str_progress": "キャスティング速度, 集中力, 射程距離"
    },
    {
        "id": 65,
        "imageid": 65,
        "unknown1_6": 2,
        "str_name": "ロックバウンディング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "敵の足首と足の周囲に小石を積み上げて敵の動きを封鎖する。",
        "str_progress": "威力"
    },
    {
        "id": 66,
        "imageid": 66,
        "unknown1_6": 2,
        "str_name": "グラビティアンプリファー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "指定した領域に重力場を発生させ、周りに入ってくる敵の動きを鈍くする。",
        "str_progress": "発動確率, 範囲"
    },
    {
        "id": 68,
        "imageid": 68,
        "unknown1_6": 2,
        "str_name": "アースヒール",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "地脈の気を使って、味方の体力を一定比率で回復する。",
        "str_progress": "回復率"
    },
    {
        "id": 69,
        "imageid": 69,
        "unknown1_6": 2,
        "str_name": "ストーンタッチ",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "敵一体を石化させる。ある程度弱くなった敵にだけ効果がある。\r\n石化した敵は解けるまでは無防備状態になる。\r\n敵が硬化し、与ダメージが減少する。",
        "str_progress": "石化持続時間, 限界HP"
    },
    {
        "id": 82,
        "imageid": 82,
        "unknown1_6": 3,
        "str_name": "ハイドロフォビア",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵の死角に噛み付いて、混乱状態にさせる。",
        "str_progress": "威力、混乱持続時間"
    },
    {
        "id": 89,
        "imageid": 89,
        "unknown1_6": 3,
        "str_name": "フラッシュタックル",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "閃光の如き速さで瞬く間に敵に突進、足爪で攻撃を加える。",
        "str_progress": "威力、命中率"
    },
    {
        "id": 105,
        "imageid": 105,
        "unknown1_6": 4,
        "str_name": "シールドフラッシュ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "攻撃を受ける瞬間、盾で敵の攻撃を防ぐと同時に、盾の光で相手の視界を奪う。",
        "str_progress": "威力, 発動確率"
    },
    {
        "id": 108,
        "imageid": 108,
        "unknown1_6": 4,
        "str_name": "ミラータワー",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "巨大な盾を召喚して選択した味方に加護を施す。\r\n加護に守られている間は、魔法ダメージの一部をビショップに転移する。\r\n範囲魔法にも適用される。ビショップの抵抗力が上昇する。",
        "str_progress": "ダメージ倍率, 持続時間, 抵抗力"
    },
    {
        "id": 109,
        "imageid": 109,
        "unknown1_6": 4,
        "str_name": "ヒーリング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "指定した味方のHPをわずかに即時回復する。",
        "str_progress": "射程距離、回復量"
    },
    {
        "id": 110,
        "imageid": 110,
        "unknown1_6": 4,
        "str_name": "フルヒーリング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "指定した味方の体力を大幅に回復する。",
        "str_progress": "射程距離, 回復量"
    },
    {
        "id": 111,
        "imageid": 111,
        "unknown1_6": 4,
        "str_name": "リザレクション",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "行動不能になった味方を復活して、体力を回復する。\r\nレベルが上がると復活した味方の能力値低下状態も回復する事が出来る。",
        "str_progress": "回復量, ペナルティー回復量"
    },
    {
        "id": 113,
        "imageid": 113,
        "unknown1_6": 4,
        "str_name": "リカバリー",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "指定した味方のHPを大幅に即時回復する。",
        "str_progress": "射程距離、回復量"
    },
    {
        "id": 115,
        "imageid": 115,
        "unknown1_6": 4,
        "str_name": "パーティーヒーリング",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "周囲にいるパーティー全員の体力を回復する。",
        "str_progress": "回復量, 範囲"
    },
    {
        "id": 116,
        "imageid": 116,
        "unknown1_6": 4,
        "str_name": "ブレッシング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "神の祝福を受けて、味方の体力の一定量を瞬時に回復させ、異常系統の状態異常も防ぐ。また、味方の武器に光の攻撃効果を付与する。",
        "str_progress": "上昇率, 威力, 抵抗力, 持続時間"
    },
    {
        "id": 117,
        "imageid": 117,
        "unknown1_6": 4,
        "str_name": "プロテクティングエビル",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "味方一人の防御力を高める。また、低下系統の状態異常を防ぐ。",
        "str_progress": "防御力, 抵抗力, 持続時間"
    },
    {
        "id": 118,
        "imageid": 118,
        "unknown1_6": 4,
        "str_name": "リゼネレイション",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "指定した味方一人の体力を一定時間、持続的に回復する。",
        "str_progress": "回復量, 持続時間"
    },
    {
        "id": 119,
        "imageid": 119,
        "unknown1_6": 4,
        "str_name": "プロテクティングエレメンタル",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "元素の精霊達を召喚し、自分の周囲にいるパーティーメンバーの元素抵抗力及び状態異常抵抗力を高め、純粋魔法による元素攻撃力を増加する。",
        "str_progress": "抵抗力, 上昇率, 範囲"
    },
    {
        "id": 122,
        "imageid": 122,
        "unknown1_6": 4,
        "str_name": "祈祷",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "祈祷を通じて信仰心を高める。\r\nCPの充填と周囲にいるパーティーメンバーの各種状態異常の抵抗力を上昇させる。",
        "str_progress": "キャスティング速度, 抵抗力, 持続時間"
    },
    {
        "id": 127,
        "imageid": 127,
        "unknown1_6": 5,
        "str_name": "ヘブンリープレシング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "巨大な天上界のハンマーを召喚して、敵の頭上に落とす。敵はハンマーの衝撃でしばらくレベルが低下される。",
        "str_progress": "威力, 命中率, 敵レベル低下"
    },
    {
        "id": 131,
        "imageid": 131,
        "unknown1_6": 5,
        "str_name": "ホールドパーソン",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "人間系、悪魔系の敵の動きを封じる。",
        "str_progress": "成功確率, 持続時間"
    },
    {
        "id": 132,
        "imageid": 132,
        "unknown1_6": 5,
        "str_name": "ヒーリング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "味方の体力を回復する。知識値によって回復量が増加する。",
        "str_progress": "回復量"
    },
    {
        "id": 134,
        "imageid": 134,
        "unknown1_6": 5,
        "str_name": "マジックディスペリング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "聖霊を宿し、敵にかけられた各種補助魔法を解除する。",
        "str_progress": "成功確率, CP減少量"
    },
    {
        "id": 136,
        "imageid": 136,
        "unknown1_6": 5,
        "str_name": "サンクチュアリ ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "しばらく敵の全ての攻撃から自分を保護してくれる絶対的な防御膜を形成する。\r\n持続時間中は歩きを除いた一切のスキルアクションは不可能となる。",
        "str_progress": "移動速度, 持続時間"
    },
    {
        "id": 138,
        "imageid": 138,
        "unknown1_6": 5,
        "str_name": "コーリング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "パーティーメンバーを自分の周囲に呼び寄せる。追放天使のパーティーメンバーは瞬く間に術者の周囲にテレポートされる。呼び出したパーティーメンバーを麻痺させてしまう事と、不安定な大気によって失敗してしまう事があるのが短所。",
        "str_progress": "移動距離"
    },
    {
        "id": 156,
        "imageid": 805,
        "unknown1_6": 6,
        "str_name": "縮地の技",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "瞬間的に素早く足を動かし、速いスピードで目的地まで移動する。",
        "str_progress": "移動距離"
    },
    {
        "id": 158,
        "imageid": 802,
        "unknown1_6": 6,
        "str_name": "無力化",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵の手を撃って敵の武器を使えないように無力化させる。",
        "str_progress": "威力"
    },
    {
        "id": 162,
        "imageid": 162,
        "unknown1_6": 6,
        "str_name": "ブービートラップ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "道の要所に足首を引っ掛けて敵の動きを妨げるトラップを設置する。",
        "str_progress": "威力, 設置時間, 設置レベル, 麻痺時間"
    },
    {
        "id": 164,
        "imageid": 164,
        "unknown1_6": 6,
        "str_name": "有毒ガス",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "毒のガスが広がる爆弾を投げる。毒ガスに触れた敵は魔法抵抗力が弱化する。",
        "str_progress": "威力、設置時間、設置レベル、爆発半径"
    },
    {
        "id": 167,
        "imageid": 800,
        "unknown1_6": 6,
        "str_name": "奇襲",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "非常に素早い速度で敵に移動し、攻撃を加える。",
        "str_progress": "威力"
    },
    {
        "id": 188,
        "imageid": 188,
        "unknown1_6": 7,
        "str_name": "払い蹴り",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "しゃがんで右足で敵の足首あたりを攻撃。正確に当たったら敵はしばらく移動できなくなる。",
        "str_progress": "威力, 麻痺時間"
    },
    {
        "id": 191,
        "imageid": 191,
        "unknown1_6": 7,
        "str_name": "回避",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵の攻撃を素早く避ける。",
        "str_progress": "発動確率"
    },
    {
        "id": 192,
        "imageid": 192,
        "unknown1_6": 7,
        "str_name": "仰け反る",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵の攻撃に合わせて体を反らし、残りの攻撃を回避する。攻撃を受けた後も硬直状態がなく、しばらく無敵な状態になる。",
        "str_progress": "発動確率, 無敵時間, 麻痺抵抗"
    },
    {
        "id": 193,
        "imageid": 193,
        "unknown1_6": 7,
        "str_name": "流水撃",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵の攻撃を横に流して顎を殴り攻撃。\r\n必ずクリティカルヒットになる。",
        "str_progress": "発動確率, 威力"
    },
    {
        "id": 194,
        "imageid": 194,
        "unknown1_6": 7,
        "str_name": "掴み",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "敵の様々な攻撃武器を手で掴んで防御。一定のダメージを反射させる。魔法なども掴むことができる。",
        "str_progress": "発動確率"
    },
    {
        "id": 197,
        "imageid": 197,
        "unknown1_6": 7,
        "str_name": "分身",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "自分の分身を作って敵を混乱させて、敵から受ける攻撃回数を減らす。",
        "str_progress": "持続時間, 分身個数"
    },
    {
        "id": 237,
        "imageid": 237,
        "unknown1_6": 8,
        "str_name": "サプライジングレイド",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "槍を旋回し、その勢いで瞬間的に敵との距離を詰めてから、突きで攻撃する。",
        "str_progress": "威力"
    },
    {
        "id": 238,
        "imageid": 238,
        "unknown1_6": 8,
        "str_name": "ワールランニング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "槍を回しながら前方に突進する。前方にいる敵は横に押し出される。",
        "str_progress": "移動速度"
    },
    {
        "id": 262,
        "imageid": 262,
        "unknown1_6": 10,
        "str_name": "治療",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "手なずけたペットと召喚獣の全ての傷を即座に一発で治療する。",
        "str_progress": "回復値"
    },
    {
        "id": 291,
        "imageid": 291,
        "unknown1_6": 11,
        "str_name": "ヘッジャーヘッジング",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ヘッジャーが指定した地形の土を掘って、移動を防ぐ障害物を形成する。",
        "str_progress": "障害物の長さ, 障害物の体力"
    },
    {
        "id": 313,
        "imageid": 313,
        "unknown1_6": 12,
        "str_name": "ビックリびんた",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "大きな手で敵の横っ面を殴って攻撃する。攻撃が当たった敵は一番近い所にいる敵にぶつかって2次打撃を加え、その敵の攻撃を受ける。",
        "str_progress": "威力, 命中率"
    },
    {
        "id": 319,
        "imageid": 319,
        "unknown1_6": 12,
        "str_name": "おしゃべり",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "ひっきりなしに、しゃべりまくって周囲にいる敵の一部を退屈で眠らせてしまう。同時に気持ちよくなって強力なスキルを使用できるようになる。",
        "str_progress": "キャスティング時間, 有効範囲, 睡眠確率"
    },
    {
        "id": 341,
        "imageid": 341,
        "unknown1_6": 13,
        "str_name": "ラビットラッシュ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ワンドの先で小さなウサギ達を召喚する。ウサギ達はターゲットの敵を取り囲んで移動不能にする",
        "str_progress": "威力"
    },
    {
        "id": 343,
        "imageid": 343,
        "unknown1_6": 13,
        "str_name": "ローズガーデン",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "自分の周りにバラの庭を造りだす。庭園内にいるパーティーメンバーはトゲ状態になり、CP消耗が減少する。リトルウィッチ一人につき、一度に1つだけローズガーデンを生成可能",
        "str_progress": "範囲, 持続時間, リターン率"
    },
    {
        "id": 346,
        "imageid": 346,
        "unknown1_6": 13,
        "str_name": "ビッグサービス",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "変身の瞬間を利用してパーティーメンバーの体力を回復する。周囲のパーティーメンバーたちの体力を少量回復して、大量の体力が応急処置状態になる。",
        "str_progress": "範囲, 回復量"
    },
    {
        "id": 353,
        "imageid": 353,
        "unknown1_6": 14,
        "str_name": "催眠術",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "体力が低下している敵を衝動的な睡魔に陥れて眠り状態にさせる。睡眠状態の敵は攻撃されると致命的なダメージを受ける。",
        "str_progress": "持続時間"
    },
    {
        "id": 354,
        "imageid": 354,
        "unknown1_6": 14,
        "str_name": "ダークネスイリュージョン",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "まやかしの闇で自分と周囲にいる敵の「知識と力」、「知恵と敏捷性」をそれぞれ入れ替える",
        "str_progress": "持続時間"
    },
    {
        "id": 376,
        "imageid": 376,
        "unknown1_6": 15,
        "str_name": "ドローボディー",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "鞭で遠い所にいる敵をからめて自分の前まで連れてくる",
        "str_progress": "命中, 発動確率"
    },
    {
        "id": 381,
        "imageid": 381,
        "unknown1_6": 15,
        "str_name": "ヘルプリズン",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "敵を地の底より召喚した「地獄の監獄」の中に閉じこめてしまう。敵は一定時間移動できない。",
        "str_progress": " "
    },
    {
        "id": 399,
        "imageid": 399,
        "unknown1_6": 15,
        "str_name": "裏切りの契約",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "敵が契約を結んだ状態の時に、悪質で不公平な契約に強制的に更新し、敵の防御力と闇属性抵抗力を減少させる。",
        "str_progress": "持続時間、防御力減少、闇属性抵抗力減少"
    },
    {
        "id": 406,
        "imageid": 406,
        "unknown1_6": 16,
        "str_name": "腕斬り",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "鎌でモンスターの腕を斬りつけ、攻撃力を低下させる。",
        "str_progress": "確率、持続時間"
    },
    {
        "id": 407,
        "imageid": 407,
        "unknown1_6": 16,
        "str_name": "胴斬り",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "敵に深い傷を負わせて、自動発動スキルを解除し使用不可にする。モンスターの場合、防御力を低下させる。",
        "str_progress": "成功確率、持続時間"
    },
    {
        "id": 409,
        "imageid": 409,
        "unknown1_6": 16,
        "str_name": "真空斬り",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "鎌で周囲の空気を切り裂き、真空空間を作り出す。真空空間では、レベル1のスキルしか使用できない。",
        "str_progress": "範囲、持続時間"
    },
    {
        "id": 412,
        "imageid": 412,
        "unknown1_6": 16,
        "str_name": "アブソーブ",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "呼び集めた魂を体内に吸収し、自分の体力を回復させる。「アセンブル」状態でのみ使用可能",
        "str_progress": "HP回復量、キャスティング時間"
    },
    {
        "id": 422,
        "imageid": 422,
        "unknown1_6": 16,
        "str_name": "ソウルトレース",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "魂の世界を通り抜けて瞬時に敵の懐に入り、鎌で攻撃する",
        "str_progress": "威力, 射程距離"
    },
    {
        "id": 423,
        "imageid": 423,
        "unknown1_6": 16,
        "str_name": "魂のスイッチ",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "敵にかかっている魔法の効果を逆転させ、有害な魔法に変換する",
        "str_progress": "持続時間, 変換率"
    },
    {
        "id": 430,
        "imageid": 430,
        "unknown1_6": 17,
        "str_name": "蛇の目拳",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "蛇の形をしたオーラを放ち、敵を闘士の前に引き寄せる。",
        "str_progress": "威力"
    },
    {
        "id": 432,
        "imageid": 432,
        "unknown1_6": 17,
        "str_name": "大熊拳",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "強力な一撃を放ち、敵を麻痺させる。強打された敵は後遺症が残り、移動速度が減少する",
        "str_progress": "威力, ノックバック確率, ノックバック距離"
    },
    {
        "id": 433,
        "imageid": 433,
        "unknown1_6": 17,
        "str_name": "猛牛拳",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "前方に突進する。突進経路内の全ての敵にダメージを与える。",
        "str_progress": "威力, 射程距離"
    },
    {
        "id": 434,
        "imageid": 434,
        "unknown1_6": 17,
        "str_name": "ピューマアタック",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "一瞬だけ光速となって敵に近付き、急所を突いて出血を起こし、持続的ダメージを与える。",
        "str_progress": "威力, 攻撃回数, 出血ダメージ"
    },
    {
        "id": 481,
        "imageid": 563,
        "unknown1_6": 19,
        "str_name": "イリュージョンハープン",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "攻撃した敵を自分の目の前まで引き寄せる幻影の銛を飛ばす。",
        "str_progress": "威力"
    },
    {
        "id": 486,
        "imageid": 568,
        "unknown1_6": 19,
        "str_name": "ビジョンドッペルゲンガー",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "魔力で生成した幻影分身を召喚する。この召喚分身は周りの敵にダメージを与える。分身が消える前に再びスキルを使うと分身がいた位置に瞬時に移動できる。",
        "str_progress": "威力"
    },
    {
        "id": 487,
        "imageid": 569,
        "unknown1_6": 19,
        "str_name": "ファンタズムイベーション",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "危険な状況に陥ると素早く回避して、幻影分身を残す。この分身は敵の注意を引きつけて攻撃されると即時爆発する。",
        "str_progress": "威力、発動確率"
    },
    {
        "id": 488,
        "imageid": 570,
        "unknown1_6": 19,
        "str_name": "シャドウカーテン",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "危険な状況に陥ると影の中に隠れて敵の攻撃を無効化させる。",
        "str_progress": "発動確率"
    },
    {
        "id": 490,
        "imageid": 572,
        "unknown1_6": 19,
        "str_name": "スウィフトタンブリング",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "素早く体を転がしながら移動する。",
        "str_progress": "威力"
    },
    {
        "id": 491,
        "imageid": 573,
        "unknown1_6": 19,
        "str_name": "エアリアルバースト",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ジャンプしながら体を回転して周りの敵を吹き飛ばす。",
        "str_progress": "威力、ノックバック確率"
    },
    {
        "id": 784,
        "imageid": 507,
        "unknown1_6": 20,
        "str_name": "ブルームクラッシャー",
        "unknown2_0": 2,
        "unknown10_139": -16384,
        "str_description": "ほうきを地面にかけながら突撃する。動線上のすべての敵にダメージを与えると同時に後ろにノックバックさせ、熟練家政婦の発動確率を少しの間増加させる。",
        "str_progress": "威力"
    },
    {
        "id": 797,
        "imageid": 595,
        "unknown1_6": 21,
        "str_name": "ストームデビル",
        "unknown2_0": 4,
        "unknown10_139": -16384,
        "str_description": "魔力の竜巻を発生させて敵にダメージを与える。ダメージを受けた敵は竜巻の中心部に巻き込まれる。",
        "str_progress": "威力、打撃範囲"
    },
    {
        "id": 861,
        "imageid": 569,
        "unknown1_6": 19,
        "str_name": "ファンタズムアボイド",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "危機的状況になると後方にすばやく回避し、魔力で生成した幻影の分身を残す。この幻影は1秒後に爆発し、周辺の敵にダメージを与える。",
        "str_progress": "威力、発動確率"
    },
    {
        "id": 882,
        "imageid": 697,
        "unknown1_6": 23,
        "str_name": "Bタンカー : ヒューズリアム",
        "unknown2_0": 2,
        "unknown10_139": -32768,
        "str_description": "錬金術で防御型ホムンクルスを錬成し召喚する。ホムンクルスリアムがアルケミストと融合し防御に協力する。初融合の際は3秒間無敵になる。以降の攻撃で広い範囲の敵に対し大地属性のダメージを与える。",
        "str_progress": "威力, 範囲, 確率"
    },
    {
        "id": 883,
        "imageid": 698,
        "unknown1_6": 23,
        "str_name": "Bヒーラー : ヒューズシンシア",
        "unknown2_0": 2,
        "unknown10_139": -32768,
        "str_description": "錬成した回復型ホムンクルスを召喚する。ホムンクルス「シンシア」がアルケミストと融合して味方の回復を支援する。最初融合時に、自分の最大体力の50を回復する。以後、10秒に1回、確率的に味方の体力を回復させる。",
        "str_progress": "威力, 範囲, 持続時間"
    },
    {
        "id": 907,
        "imageid": 907,
        "unknown1_6": 32,
        "str_name": "ヒューズシンシア発動",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "",
        "str_progress": "威力, 範囲"
    },
    {
        "id": 1162,
        "imageid": 12,
        "unknown1_6": 0,
        "str_name": "タンククラッシュ",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "盾と刀で体を守りながら敵に突進し攻撃する。スキル使用後、一定時間防御力とブロック率が上昇する。",
        "str_progress": "威力、防御力"
    },
    {
        "id": 1163,
        "imageid": 793,
        "unknown1_6": 0,
        "str_name": "フェイタルツイスター",
        "unknown2_0": 4,
        "unknown10_139": -32768,
        "str_description": "一定時間の間、指定した敵を追跡する旋風を巻き起こす。旋風は近接する敵に持続的にダメージを与える。",
        "str_progress": "威力、時速時間"
    },
    {
        "id": 1165,
        "imageid": 17,
        "unknown1_6": 0,
        "str_name": "メトルデュエリング",
        "unknown2_0": 3,
        "unknown10_139": 12288,
        "str_description": "選択した敵とその周辺全ての敵に決闘を挑む。\r\n一定時間の間、指定された敵は剣士だけを攻撃する。",
        "str_progress": "発動確率, 敵命中率, 持続時間, ダメージ減少率"
    },
    {
        "id": 1180,
        "imageid": 44,
        "unknown1_6": 1,
        "str_name": "オルターリングストライカー",
        "unknown2_0": 4,
        "unknown10_139": 16384,
        "str_description": "非常に素早く移動した後、敵に連続攻撃を行う。\r\nその後、少し間防御力と回避率が上昇する。\r\nディレイクラッシングスキルで連係するとダメージを増幅させる。",
        "str_progress": "威力, 打撃回数"
    },
    {
        "id": 1202,
        "imageid": 319,
        "unknown1_6": 12,
        "str_name": "おしゃべり女王",
        "unknown2_0": 3,
        "unknown10_139": 16384,
        "str_description": "ひっきりなしに、しゃべりまくって周囲にいる敵の一部を退屈で眠らせてしまう。\r\n同時に気持ちよくなって強力なスキルを使用できるようになる。おしゃべりが終わったあとも, しばらくCPを追加獲得",
        "str_progress": "キャスティング時間, 有効範囲, 睡眠確率"
    },
    {
        "id": 1247,
        "imageid": 118,
        "unknown1_6": 4,
        "str_name": "アタナシオス",
        "unknown2_0": 4,
        "unknown10_139": 16384,
        "str_description": "指定した味方一人の体力を一定時間、持続的に回復する。使用者が自分自身に使用する場合、使用者のレベルによって防御力上昇。",
        "str_progress": "回復量, 持続時間"
    },
    {
        "id": 1249,
        "imageid": 105,
        "unknown1_6": 4,
        "str_name": "シールドグレア",
        "unknown2_0": 2,
        "unknown10_139": 8192,
        "str_description": "攻撃を受ける瞬間、盾で敵の攻撃を防ぐと同時に、盾に反射する光で相手の視界を奪い、感電状態にする。遠距離の敵にも適用される。感電状態の敵が攻撃する場合に追加効果が発動。",
        "str_progress": "威力, 発動確率"
    },
    {
        "id": 1252,
        "imageid": 104,
        "unknown1_6": 4,
        "str_name": "ホーリーショックブロッキング",
        "unknown2_0": 1,
        "unknown10_139": -32768,
        "str_description": "聖なる力と盾で周辺の敵を硬直させる。",
        "str_progress": "ブロック率"
    },
    {
        "id": 1255,
        "imageid": 108,
        "unknown1_6": 4,
        "str_name": "ミラーオベリスク",
        "unknown2_0": 5,
        "unknown10_139": -16384,
        "str_description": "巨大な盾を召喚して選択した味方に加護を施す。加護に守られている間は、魔法ダメージの一部をビショップに転移する。範囲魔法にも適用される。ビショップの抵抗力が上昇する。従来より最大使用数とダメージ転移量増加。",
        "str_progress": "ダメージ倍率, 持続時間, 抵抗力"
    },
    {
        "id": 1256,
        "imageid": 119,
        "unknown1_6": 4,
        "str_name": "エレメンタルハーモニー",
        "unknown2_0": 4,
        "unknown10_139": -16384,
        "str_description": "元素の精霊達を召喚し、自分の周囲にいるパーティーメンバーの元素抵抗力及び状態異常抵抗力を高め、純粋魔法による元素攻撃力を増加する。さらに魔法攻撃を一定確率で吸収。パーティーメンバーの数によってスキルレベル上昇幅が増加する。",
        "str_progress": "抵抗力、上昇率、範囲"
    },
    {
        "id": 1260,
        "imageid": 127,
        "unknown1_6": 5,
        "str_name": "リペントプレシング",
        "unknown2_0": 2,
        "unknown10_139": 16384,
        "str_description": "巨大な天上界のハンマーを召喚して、敵の頭上に落とす。敵はハンマーの衝撃で一定時間レベルが低下して攻撃が楽になる。",
        "str_progress": "威力, 命中率, 敵レベル低下"
    },
    {
        "id": 1264,
        "imageid": 134,
        "unknown1_6": 5,
        "str_name": "マジックエクスペリング",
        "unknown2_0": 3,
        "unknown10_139": -32768,
        "str_description": "聖霊を宿し、敵にかけられた各種補助魔法を解除する。解除に成功すると、一定確率で決められた時間の間、光属性攻撃力増加。",
        "str_progress": "成功確率, CP減少量"
    },
    {
        "id": 1266,
        "imageid": 139,
        "unknown1_6": 5,
        "str_name": "セイントウェイ",
        "unknown2_0": 5,
        "unknown10_139": 12288,
        "str_description": "両方向で移動できる二つの光のゲートを開く。同じフィールド内でのみ移動可能。",
        "str_progress": "持続時間, 移動距離"
    },
    {
        "id": 1267,
        "imageid": 136,
        "unknown1_6": 5,
        "str_name": "ホーリースピリッツ",
        "unknown2_0": 2,
        "unknown10_139": -16384,
        "str_description": "敵の全ての攻撃から自分を保護してくれる絶対的な防御膜を形成する。持続時間中は魂の状態となり、自由に移動可能。持続時間内にスキルを再度使用すると、肉体が魂がある場所に移動、スキルを使用しないと魂が元の位置に強制移動。",
        "str_progress": "持続時間"
    },
    {
        "id": 1301,
        "imageid": 625,
        "unknown1_6": 22,
        "str_name": "ニーキャッピング",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "左手の銃で敵の足を狙い撃つ。攻撃された敵は一定時間移動できない。",
        "str_progress": "威力"
    },
    {
        "id": 1307,
        "imageid": 630,
        "unknown1_6": 22,
        "str_name": "ピールオフ",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "右手で持った銃の弾丸に魔力波長を起こして発砲。ブロック効果を貫通して敵のバフを除外。",
        "str_progress": "威力"
    },
    {
        "id": 1308,
        "imageid": 631,
        "unknown1_6": 22,
        "str_name": "ヘフティーオプレス",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "右手の銃で重めの弾丸を発射。撃たれた敵は大きな衝撃によりCP減少。",
        "str_progress": "威力"
    },
    {
        "id": 1330,
        "imageid": 686,
        "unknown1_6": 23,
        "str_name": "メディカルリキッド",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "錬成した薬物を用いて指定した味方の体力を即時に回復させる。知識値によって回復量が増加する。",
        "str_progress": "回復量"
    },
    {
        "id": 1331,
        "imageid": 687,
        "unknown1_6": 23,
        "str_name": "セラピーエリア",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "錬金術を使用して、一定の範囲に細胞再生ガスを発生させる。効果範囲にいる味方の体力が回復する。知識値によって回復量が増加する。",
        "str_progress": "回復量、範囲"
    },
    {
        "id": 1332,
        "imageid": 688,
        "unknown1_6": 23,
        "str_name": "フローイングトリートメント",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "指定した味方に錬成した回復薬を使用する。薬の効果により一定時間味方の体力が持続的に回復する。知識値によって回復量が増加。",
        "str_progress": "回復量"
    },
    {
        "id": 1623,
        "imageid": 660,
        "unknown1_6": 6,
        "str_name": "ミラータワー改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "ミラータワーを自分に発動する場合、自分の最大HPの2倍、他人に発動する場合、自分の最大HPの1\/4のシールドを生成する。\r\n<c:LTRED>※シールド再使用時のクールタイム30秒、PVP時は自分にも1\/4のシールドのみ生成。<n>",
        "str_progress": ""
    },
    {
        "id": 1624,
        "imageid": 661,
        "unknown1_6": 6,
        "str_name": "ホーリークロス改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "体力が回復した対象に、回復量と同等のシールドを生成する。\r\n<c:LTRED>※PVP時はシールド再使用時のクールタイム30秒<n>",
        "str_progress": ""
    },
    {
        "id": 1629,
        "imageid": 666,
        "unknown1_6": 6,
        "str_name": "ゴリアテスレイヤー改",
        "unknown2_0": 1,
        "unknown10_139": 0,
        "str_description": "特殊な石の射出法により竜巻を発生させ、石に当たった敵を中心に吸い寄せる。\r\n<c:LTRED>※ PVP時は中央に吸い寄せられる。クールタイム10秒<n>",
        "str_progress": ""
    },
    {
        "id": 1709,
        "imageid": 590,
        "unknown1_6": 21,
        "str_name": "ブラックライトニング",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "地下界の次元扉を開いて、断続的に黒い雷で衝撃波を発生させ敵を気絶させる。雷は3回発生する。",
        "str_progress": "威力、打撃範囲"
    },
    {
        "id": 1714,
        "imageid": 595,
        "unknown1_6": 21,
        "str_name": "ダストデビル",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "魔力の竜巻を発生させて敵にダメージを与える。竜巻の中にいる敵は一定確率で竜巻の中心部へ強制移動する。",
        "str_progress": "威力、範囲、確率"
    },
    {
        "id": 1720,
        "imageid": 606,
        "unknown1_6": 21,
        "str_name": "位相変異",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "敵から物理攻撃や魔法攻撃を受けると一定確率で体の周りに異空間を作って攻撃を地下界へ飛ばしながら回避。",
        "str_progress": "発動確率"
    },
    {
        "id": 1803,
        "imageid": 505,
        "unknown1_6": 20,
        "str_name": "シューティングダスト",
        "unknown2_0": 3,
        "unknown10_139": 0,
        "str_description": "単体対象にほうきを掃き上げて攻撃する。ホコリを浴びた対象は一定確率で混乱にかかる。",
        "str_progress": "威力"
    },
    {
        "id": 1805,
        "imageid": 507,
        "unknown1_6": 20,
        "str_name": "ブルームアサルト",
        "unknown2_0": 2,
        "unknown10_139": 0,
        "str_description": "ほうきを地面にかけながら突撃する。動線上のすべての敵にダメージを与えると同時に後ろにノックバック。",
        "str_progress": "威力"
    },
    {
        "id": 1819,
        "imageid": 521,
        "unknown1_6": 20,
        "str_name": "セーブマイマスター",
        "unknown2_0": 5,
        "unknown10_139": 0,
        "str_description": "主人の危機に忠誠心溢れるメイドが怒り、攻撃を受けた後にもひるまず少しの間無敵状態になる。",
        "str_progress": "発動確率, 無敵時間"
    },
    {
        "id": 1829,
        "imageid": 162,
        "unknown1_6": 6,
        "str_name": "ブレードトラップ",
        "unknown2_0": 3,
        "unknown10_139": 8192,
        "str_description": "トラップ専門家の手でトラップの機能を極大化させる。爆発すると範囲内の全ての敵にダメージを与え、麻痺させる。",
        "str_progress": "威力、設置時間、設置レベル、麻痺時間"
    },
    {
        "id": 1831,
        "imageid": 164,
        "unknown1_6": 6,
        "str_name": "ポイズンミスト",
        "unknown2_0": 5,
        "unknown10_139": -32768,
        "str_description": "猛毒のガスが広がるトラップを敵に投げる。猛毒のガスにダメージを受けた敵は魔法抵抗力が弱化する。",
        "str_progress": "持続時間、抵抗力、低下率"
    },
    {
        "id": 1832,
        "imageid": 159,
        "unknown1_6": 6,
        "str_name": "シャドウイントルーダー",
        "unknown2_0": 4,
        "unknown10_139": 12288,
        "str_description": "影の中に自分の身を完全に隠す。上逹すると心に余裕ができ、シーフのスキルをもう少し効率的に使うことができるようになる。特に暗殺、奇襲スキルの攻撃力が増加する。ただし5回攻撃した後には解ける。",
        "str_progress": "持続時間"
    },
    {
        "id": 1833,
        "imageid": 800,
        "unknown1_6": 6,
        "str_name": "かく乱",
        "unknown2_0": 2,
        "unknown10_139": -16384,
        "str_description": "非常に素早い速度で敵に接近し、攻撃を加える。また、敵の神経をかく乱させ硬直状態にする。",
        "str_progress": "威力"
    },
    {
        "id": 1843,
        "imageid": 183,
        "unknown1_6": 7,
        "str_name": "音速かかと落とし",
        "unknown2_0": 2,
        "unknown10_139": -32768,
        "str_description": "左前蹴り後、そのまま振り下ろして攻撃ごとに範囲爆発攻撃を与え、弾き飛ばして敵を一か所に集める。右足スキルのレベルと命中率がしばらく上昇",
        "str_progress": "威力, 命中率, 右足スキルレベル上昇"
    },
    {
        "id": 1856,
        "imageid": 430,
        "unknown1_6": 17,
        "str_name": "覇蛇拳",
        "unknown2_0": 2,
        "unknown10_139": -32768,
        "str_description": "蛇の形をしたオーラを放ち、敵を被撃対象の周辺まで引き寄せる。",
        "str_progress": "威力, 打撃範囲, 束縛確率"
    },
    {
        "id": 1859,
        "imageid": 434,
        "unknown1_6": 17,
        "str_name": "ピューマペスティネイション",
        "unknown2_0": 4,
        "unknown10_139": -16384,
        "str_description": "瞬間的に自分自身を加速させ遠くにいる敵まで一瞬で近づいた後、急所を刺して出血を起こしては持続的ダメージを与える。出血は重複する。",
        "str_progress": "威力, 攻撃回数, 出血ダメージ, 出血重複量"
    },
    {
        "id": 1860,
        "imageid": 432,
        "unknown1_6": 17,
        "str_name": "覇熊拳",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "強力な一撃を放ち、目標の敵とその周辺の敵をノックバックさせる。",
        "str_progress": "威力, ノックバック確率, ノックバック距離"
    },
    {
        "id": 1896,
        "imageid": 230,
        "unknown1_6": 8,
        "str_name": "ジャベリンストーム",
        "unknown2_0": 3,
        "unknown10_139": -16384,
        "str_description": "回転する槍を投擲し、敵に多段ヒットでダメージを与える。",
        "str_progress": "威力"
    },
    {
        "id": 1902,
        "imageid": 354,
        "unknown1_6": 14,
        "str_name": "ダークネストリック",
        "unknown2_0": 5,
        "unknown10_139": 16384,
        "str_description": "まやかしの闇で自分と周囲にいる敵の「知識と力」、「知恵と敏捷性」それぞれを入れ替える。入れ替え後、力が知識より高ければ武器攻撃力が増加し、知識が力より高ければスキル「パフュームオブデス」のダメージが増加する。",
        "str_progress": "持続時間"
    },
    {
        "id": 1914,
        "imageid": 376,
        "unknown1_6": 15,
        "str_name": "ダイナマイトボディ",
        "unknown2_0": 1,
        "unknown10_139": 16384,
        "str_description": "鞭で遠い所にいる敵をからめて自分の前まで連れてくる。 的中すると敵の火炎抵抗を減少させる。",
        "str_progress": "威力"
    },
    {
        "id": 2037,
        "imageid": 2037,
        "unknown1_6": 32,
        "str_name": "救いの手",
        "unknown2_0": 4,
        "unknown10_139": 0,
        "str_description": "シンシアが治癒の力で味方の体力を回復する。",
        "str_progress": "回復率、使用周期"
    }
]