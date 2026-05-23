

export function applyMonsterLevel(mob, lv, statDownPct = 0) {
  if (!mob) return null;
  const Lv = Math.max(1, Number(lv) || 1);
  const STD = 1.0 - (Number(statDownPct) || 0) / 100.0;

  const Hp1 = mob.defaultHp / 100.0;
  const Hp2 = (mob.levelUpBonus   > 0 ? mob.levelUpBonus   : mob.unknown_109) / 10.0;
  const Hp3 = (mob.conditionBonus > 0 ? mob.conditionBonus : mob.unknown_112) / 10.0;

  const sf  = mob.statusFactor;
  const STRup = mob.str  * sf / 100000.0;
  const AGIup = mob.agi  * sf / 100000.0;
  const CONup = mob.con  * sf / 100000.0;
  const INTup = mob.intl * sf / 100000.0;
  const WISup = mob.wis  * sf / 100000.0;
  const CHSup = mob.chs  * sf / 100000.0;
  const LUCup = mob.luc  * sf / 100000.0;

  const AtcMinup = mob.atcMinBonus / 100.0;
  const AtcMaxup = mob.atcMaxBonus / 100.0;
  const Defup    = mob.defBonus    / 100.0;

  const MobSTR  = Math.floor((STRup * (Lv - 1) + mob.str ) * STD);
  const MobAGI  = Math.floor((AGIup * (Lv - 1) + mob.agi ) * STD);
  const MobCON  = Math.floor((CONup * (Lv - 1) + mob.con ) * STD);
  const MobINT  = Math.floor((INTup * (Lv - 1) + mob.intl) * STD);
  const MobWIS  = Math.floor((WISup * (Lv - 1) + mob.wis ) * STD);
  const MobCHS  = Math.floor((CHSup * (Lv - 1) + mob.chs ) * STD);
  const MobLUC  = Math.floor((LUCup * (Lv - 1) + mob.luc ) * STD);

  const MobHP     = Math.floor(Hp2 * Lv + Hp1 + Hp3 * MobCON);
  const MobAtcMin = Math.floor((AtcMinup * (Lv - 1.0) + mob.atcMin) * (1.0 + MobSTR / 200.0));
  const MobAtcMax = Math.floor((AtcMaxup * (Lv - 1.0) + mob.atcMax) * (1.0 + MobSTR / 200.0));
  const MobDef    = Math.floor((Defup    * (Lv - 1.0) + mob.def)    * (1.0 + MobCON / 100.0));

  
  const RMS = Math.min(MobWIS, 10000);
  const elemBonus = RMS / 20.0;

  

  
  const RRMS = Math.min(MobWIS + MobCHS, 1000);
  const r10Raw = mob.resistance10;

  return {
    
    ...mob,
    lvApplied:   Lv,
    statDownPct: Number(statDownPct) || 0,

    str:  MobSTR,  agi:  MobAGI,  con:  MobCON,
    intl: MobINT,  wis:  MobWIS,  chs:  MobCHS,  luc:  MobLUC,

    defaultHp: MobHP,
    atcMin:    MobAtcMin,
    atcMax:    MobAtcMax,
    def:       MobDef,

    fireRes:  Math.floor(mob.fireRes  + elemBonus),
    waterRes: Math.floor(mob.waterRes + elemBonus),
    windRes:  Math.floor(mob.windRes  + elemBonus),
    earthRes: Math.floor(mob.earthRes + elemBonus),
    lightRes: Math.floor(mob.lightRes + elemBonus),
    darkRes:  Math.floor(mob.darkRes  + elemBonus),

    resistance1:  Math.floor(mob.resistance1  + r10Raw * (RRMS / 1000.0)),
    resistance2:  Math.floor(mob.resistance2  + r10Raw * (RRMS / 1000.0)),
    resistance3:  Math.floor(mob.resistance3  + r10Raw * (RRMS / 1000.0)),
    resistance4:  Math.floor(mob.resistance4  + r10Raw * (RRMS / 1000.0)),
    resistance5:  Math.floor(mob.resistance5  + r10Raw * (RRMS / 1000.0)),
    resistance6:  Math.floor(mob.resistance6  + r10Raw * (RRMS / 1000.0)),
    resistance7:  Math.floor(mob.resistance7  + r10Raw * (RRMS / 1000.0)),
    resistance8:  Math.floor(mob.resistance8  + r10Raw * (RRMS / 1000.0)),
    resistance9:  Math.floor(mob.resistance9  + r10Raw * (RRMS / 1000.0)),
    resistance10: Math.floor(mob.resistance10 * (1.0 + RRMS / 500.0)),
    resistance11: Math.floor(mob.resistance11 * (1.0 + RRMS / 1000.0)),
    resistance12: Math.floor(mob.resistance12 * (1.0 + RRMS / 1000.0)),
    resistance13: Math.floor(mob.resistance13 * (1.0 + RRMS / 1000.0)),
    resistance14: Math.floor(mob.resistance14 * (1.0 + RRMS / 1000.0)),

    defaultExp:  Math.floor((mob.defaultExp / 10) * (Lv + 4)),
  };
}
