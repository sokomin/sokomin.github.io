(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.RefinementModel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const success = [1, 1, .9, .8, .7, .6, .5, .4, .3, .2, .15, .1, .08, .06, .05, .04, .02, .01, .005, .001];
  const ink = [10,10,30,30,50,50,100,100,200,200,300,300,500,500,1000,1500,1500,2000,2000,2500];
  const crystal = [0,0,0,0,0,0,0,0,0,0,3,3,5,5,8,8,10,10,20,20];
  const chaos = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,3];
  const gold = [1e5,2e5,3e5,5e5,8e5,1e6,2e6,3e6,4e6,5e6,2e7,4e7,6e7,8e7,1e8,1e8,2e8,2e8,3e8,3e8];
  const thresholds = [1,5,10,15,18];
  const materials = [
    { key:'ink', name:'魔力インク', icon:'2922' },
    { key:'crystal', name:'結晶石', icon:'1437' },
    { key:'chaos', name:'混沌石', icon:'3535' },
    { key:'guard', name:'製錬ガード', icon:'3536' },
    { key:'guard2', name:'製錬ガードⅡ', icon:'3770' }
  ];
  const keys = ['attempts','ink','crystal','chaos','gold','guard','guard2','destroyed'];
  const empty = () => Object.fromEntries(keys.map(k => [k,0]));
  function integer(value, min, max, name) {
    if (value === '' || value == null || typeof value === 'boolean' || !Number.isInteger(Number(value)) || Number(value) < min || Number(value) > max) throw new Error(name + 'を選択してください。');
    return Number(value);
  }
  function config(input) {
    const start = integer(input.start,0,19,'開始段階'), target = integer(input.target,1,20,'目標段階');
    if (start >= target) throw new Error('目標段階は開始段階より高くしてください。');
    if (!['none','guard','guard2'].includes(input.guard)) throw new Error('ガードを選択してください。');
    return { start, target, guard:input.guard, guardFrom:integer(input.guardFrom,0,19,'ガードの使用開始段階') };
  }
  function transition(stage, input) {
    const i = integer(stage,0,19,'製錬段階');
    const guard = input.guard !== 'none' && i >= Number(input.guardFrom) ? input.guard : 'none';
    const failure = guard === 'guard2' && i >= 10 && i <= 14 ? i - 1 : guard !== 'none' && i < 10 ? i : i <= 6 ? Math.max(0,i-1) : 0;
    const expense = { ...empty(), attempts:1, ink:ink[i], crystal:crystal[i], chaos:chaos[i], gold:gold[i] };
    if (guard !== 'none') expense[guard] = 1;
    const destruction = guard === 'none' && i >= 10 ? .05 : 0;
    return { stage:i, success:success[i], failure, guard, destruction, expense };
  }
  function expectation(input) {
    const plan = config(input), differences = [];
    // Positive forward increments avoid cancellation even when +20 is very unlikely.
    for (let i=0; i<plan.target; i++) {
      const t = transition(i,plan), row = { ...t.expense };
      row.destroyed = (1-t.success)*t.destruction;
      for (const key of keys) {
        let rebuild=0;
        for (let j=t.failure;j<i;j++) rebuild+=differences[j][key];
        row[key]=(row[key]+(1-t.success)*rebuild)/t.success;
      }
      differences.push(row);
    }
    const total=empty();
    for (let i=plan.start;i<plan.target;i++) for (const key of keys) total[key]+=differences[i][key];
    return { ...total, start:plan.start, target:plan.target, slots:thresholds.filter(n => n<=plan.target).length };
  }
  function cost(counts, prices, replacement = null) {
    let subtotal=counts.gold;
    const missing=[];
    for (const item of materials) {
      if (!(counts[item.key]>0)) continue;
      const price=prices[item.key]?.gold;
      if (!Number.isFinite(price) || price<0) missing.push(item.key);
      else subtotal+=counts[item.key]*price;
    }
    if (counts.destroyed>0) {
      if (!Number.isFinite(replacement) || replacement<0) missing.push('replacement');
      else subtotal+=counts.destroyed*replacement;
    }
    return { total:missing.length ? null : subtotal, subtotal, missing };
  }
  function fresh(stage=0) { return { stage:integer(stage,0,19,'開始段階'), ...empty(), broken:false, log:[] }; }
  function step(state,input,random=Math.random) {
    const plan=config(input);
    if (state.broken || state.stage>=plan.target) return state;
    const t=transition(state.stage,plan), roll=random();
    if (!Number.isFinite(roll) || roll<0 || roll>=1) throw new Error('抽選値が不正です。');
    const next={ ...state, log:[...state.log] };
    for (const key of keys) next[key]+=t.expense[key];
    let outcome;
    if (roll<t.success) { next.stage++;outcome='成功'; }
    else if (t.destruction && roll>=t.success+(1-t.success)*(1-t.destruction)) { next.stage=0;next.destroyed++;next.broken=true;outcome='破壊'; }
    else { next.stage=t.failure;outcome=next.stage===state.stage?'維持':next.stage===0?'0に戻る':'低下'; }
    next.log.push({ from:state.stage,to:next.stage,outcome });next.log=next.log.slice(-30);
    return next;
  }
  return { rules:{success,ink,crystal,chaos,gold,thresholds}, materials, config, transition, expectation, cost, fresh, step };
});
