(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.PotentialProcessing=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  function price(value){
    if(value==null||String(value).trim()==='')return null;
    const n=Number(value);
    if(!Number.isFinite(n)||n<0||n>1e8)throw new Error('その他の追加費用は0～100000000本で入力してください。');
    return n;
  }
  function calculate(refinement,input,settings,prices,otherCost){
    const extra=price(otherCost),target=input.kind==='equipment'&&input.part!=='auxiliary'?Number(input.refining):0;
    const start=target?Number(settings.start??0):0;
    if(!Number.isInteger(target)||target<0||target>20||!Number.isInteger(start)||start<0||start>target)throw new Error('製錬開始は分解時の製錬段階以下にしてください。');
    if(start===target)return {refiningHon:0,totalHon:extra,missing:[],counts:null};
    const guard=settings.guard??(target>10?'guard':'none'),guardFrom=Number(settings.guardFrom??(target>10?10:0));
    if(target>10&&(guard==='none'||guardFrom>10))throw new Error('＋11以上の製錬費はガードを使用して計算してください。');
    const counts=refinement.expectation({start,target,guard,guardFrom});
    const result=refinement.cost(counts,prices),refiningHon=result.total===null?null:result.total/1e8;
    return {refiningHon,totalHon:refiningHon===null||extra===null?null:refiningHon+extra,missing:result.missing,counts};
  }
  return {calculate};
});
