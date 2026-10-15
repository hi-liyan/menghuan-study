'use strict';
function setGain(agility,coefficient){if(!Number.isInteger(agility)||agility<0||agility>1000||![.35,.5,.7].includes(coefficient))throw Error('敏捷请填 0–1000 的整数，并选择一个示例系数。');return Math.round(agility*coefficient*100)/100}
function outfitPlan(school,level,budget,stage){
if(!['ne','df','wdd'].includes(school)||!Number.isInteger(level)||level<1||level>175||![500,1000,3000,5000].includes(budget)||!['blank','task','ready'].includes(stage))throw Error('请选好门派、预算和装备情况；其他等级请填 1–175 的整数。');
const name={ne:'女儿村',df:'阴曹地府',wdd:'无底洞'}[school];
const steps=[];
if(level<100)steps.push('先按当前等级挑能穿的装备。低于100级，不能直接照搬常规100级四孔装备；先核对孔数上限和穿戴条件，再比较可用的低级组合。不要为了“双四孔”先买穿不上的装备。');
else steps.push('先核对能穿的装备等级和已有开孔。在保留基础属性、套装安排的前提下，比较两件正确门派固伤组合的成品；100级及以上只是常规四孔的起点，不代表必须买更高等级。');
if(stage==='blank')steps.push('把六件装备、四件灵饰逐个检查。先补空缺和明显不合用的部位；戒指、耳饰先比较价格合适的固伤成品，后排留意气血和防御。');
if(stage==='task')steps.push('把身上任务装的符石、耐久、套装件数和灵饰星辉列出来。能继续用的留下，只替换确实缺伤害、速度或生存的部位。');
if(stage==='ready')steps.push('既然已有双四孔和固伤灵饰，先查是否正确生效，再记录副目标伤害。不要重复买基础配置；把现有初值、星辉和候选成品放在一起算差价。');
if(school==='ne')steps.push('女儿村先核对暗器技巧、输出技能和法修。装备比较武器的适用伤害与敏捷、衣服敏捷附加；雨落寒沙的凤舞九天组合和前排固伤也逐项检查。');
if(school==='df')steps.push('地府先核对阎罗令相关技能和经脉。武器比较适用伤害与敏捷，符石查索命无常；测试时保持昼夜一致，主目标和其他小怪的伤害分开记。');
if(school==='wdd')steps.push('无底洞先想好主要秒怪还是经常治疗救人。输出时检查夺命咒流派、销魂噬骨和固伤灵饰；兼顾辅助时，保留需要的速度、气血和防御，别为一项输出拆掉整套生存配置。');
if(budget<=1000)steps.push('这阶段先看够用的成品和基础缺口。单固伤与便宜的双固伤都可以比价；暂缓昂贵特技、极限属性和高锻过渡装。每笔花费记下来，别前两件买完就没钱补其他位置。');
else if(budget===3000)steps.push('先把基础配置和生存留够，再比较双固伤成品、现有灵饰补星辉，以及敏捷衣服和实用武器。三件敏套要算整套替换差价，别只看套装多加多少敏捷。');
else steps.push('预算较多也先看现有短板。把更好初值、双固伤、提高星辉、敏套和实用特技分开比价；每完成一项就回常刷任务测试，不必一次把所有部位推到最高档。');
steps.push('鞋子和腰带的速度按整队配速来定，头盔、项链、腰带一起安排套装与符石；手镯、配饰按承伤补生存。若人物输出技能或法修落后，先和第二课的修炼预算比较；若只差宝宝收尾，也把宝宝补刀算进去。');
return{name,level,budget,stage,steps};
}
if(typeof module!=='undefined')module.exports={setGain,outfitPlan};
if(typeof document!=='undefined'){
const el=id=>document.getElementById(id);
function updateSet(){try{const raw=el('set-agility').value;if(!raw.trim())throw Error('请填写套装增加的敏捷。');const agility=Number(raw),coefficient=Number(el('set-coef').value),gain=setGain(agility,coefficient);el('set-result').innerHTML='<div class="result"><strong>+'+gain.toFixed(1)+'</strong><span>理论基础固伤增量</span></div><div class="result"><strong>'+agility+' × '+coefficient+'</strong><span>增加敏捷 × 示例系数</span></div>'}catch(e){el('set-result').textContent=e.message}}
el('set-agility').addEventListener('input',updateSet);el('set-coef').addEventListener('change',updateSet);updateSet();
el('reset-checks').onclick=()=>{document.querySelectorAll('[data-check]').forEach(box=>{box.checked=false;box.dispatchEvent(new Event('change'))})};
el('outfit-level').addEventListener('change',()=>{el('outfit-other').disabled=el('outfit-level').value!=='other';el('outfit-result').hidden=true});
function invalidate(){el('outfit-result').hidden=true;el('outfit-error').textContent=''}document.querySelectorAll('#outfit-form input,#outfit-form select').forEach(e=>e.addEventListener('change',invalidate));el('outfit-other').addEventListener('input',invalidate);
el('outfit-form').addEventListener('submit',e=>{e.preventDefault();try{let level=el('outfit-level').value;if(level==='other'){if(!el('outfit-other').value.trim())throw Error('请填写实际角色等级。');level=el('outfit-other').value}const plan=outfitPlan(el('outfit-school').value,Number(level),Number(el('outfit-budget').value),el('outfit-stage').value);el('outfit-error').textContent='';el('outfit-result').hidden=false;el('outfit-result').replaceChildren();const title=document.createElement('h3');title.textContent=plan.level+'级'+plan.name+' · '+plan.budget.toLocaleString('zh-CN')+'万'+(plan.budget===5000?'及以上':'')+'预算检查清单';el('outfit-result').append(title);const list=document.createElement('ol');plan.steps.forEach(text=>{const item=document.createElement('li');item.textContent=text;list.append(item)});el('outfit-result').append(list);const note=document.createElement('p');note.textContent='先按这份顺序查看已有装备和区内成品价格，确认后一次改一项。它是配装学习建议，不保证这笔预算能买齐全部项目。';el('outfit-result').append(note)}catch(error){el('outfit-error').textContent=error.message;el('outfit-result').hidden=true}});
}

if(typeof document!=='undefined'){
const quiz=document.getElementById('systems-quiz'),feedback=document.getElementById('systems-feedback');
quiz.addEventListener('change',e=>{if(e.target.name!=='systems-answer')return;feedback.textContent=e.target.value==='three'?'答对了。月亮石是宝石强化，凤舞九天是符石组合，画魂是装备套装效果。套装收益还要穿够规定件数。':'再看看最后一行“变身术之画魂”。它属于装备套装，和月亮石、凤舞九天各算一套系统。你可以换个答案再试。'});
document.getElementById('systems-reset').onclick=()=>{quiz.querySelectorAll('input[type=radio]').forEach(e=>e.checked=false);feedback.textContent='选一个答案，看看有没有分清。'};
}
