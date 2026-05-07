console.log('BabyFood editable v8 cargada');
'use strict';
const STORAGE_KEY='bf_editable_v8';
const OLD_KEYS=['bf_editable_v6','bf_editable_v5','bf_editable_v3'];
const CAT_ICON={verdura:'🥦',cereal:'🌾',proteina:'🍗',fruta:'🍎'};
const CAT_LABEL={verdura:'Verduras, hortalizas y tubérculos',cereal:'Cereales',proteina:'Proteínas',fruta:'Frutas'};
const MONTHS=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DAYS_SHORT=['L','M','X','J','V','S','D'];
const DENSE_FOODS=new Set(['Patata','Zanahoria','Boniato','Arroz','Pasta','Sémola','Pan sin sal','Maíz','Plátano','Garbanzo','Alubia blanca','Alubia roja','Lenteja roja']);
const HYDRATING_FOODS=new Set(['Pera','Ciruela','Naranja','Mandarina','Sandía','Melón','Mango','Calabacín','Tomate','Aguacate','Judía verde','Brócoli']);
const GRAIN_FOODS=new Set(['Arroz','Avena','Maíz','Pasta','Trigo / gluten','Quinoa','Pan sin sal','Sémola']);
let PLAN_FILTERS={avoidLatex:false,avoidDairy:false};
const DEFAULT_ALLERGENS_LIST=[
{name:'Huevo',cat:'proteina',iron:true},
{name:'Trigo / gluten',cat:'cereal',allergen:true,dense:true},
{name:'Soja',cat:'proteina',iron:true},
{name:'Cacahuete',cat:'proteina',iron:true},
{name:'Almendra',cat:'proteina'},
{name:'Avellana',cat:'proteina'},
{name:'Nuez',cat:'proteina'},
{name:'Sésamo',cat:'verdura'},
{name:'Pescado blanco',cat:'proteina',iron:true},
{name:'Salmón',cat:'proteina',iron:true},
{name:'Marisco',cat:'proteina'},
{name:'Mostaza',cat:'verdura'},
{name:'Kiwi',cat:'fruta',latex:true},
{name:'Melocotón',cat:'fruta',latex:true},
{name:'Fresa',cat:'fruta'}];
const DEFAULT_ALLERGEN_NAMES=new Set(DEFAULT_ALLERGENS_LIST.map(f=>f.name));
const INITIAL_STATE={
 babyBirthDate:null,birthDateSkipped:false,shoppingWeekOffset:0,calNotes:{},dayOverrides:{},testing:[],blocks:[],recipes:[],
 safeFoods:[],
 pendingFoods:[
  {name:'Zanahoria',cat:'verdura'},
  {name:'Calabaza',cat:'verdura'},
  {name:'Calabacín',cat:'verdura'},
  {name:'Boniato',cat:'verdura'},
  {name:'Patata',cat:'verdura'},
  {name:'Brócoli',cat:'verdura',iron:true},
  {name:'Coliflor',cat:'verdura'},
  {name:'Judía verde',cat:'verdura'},
  {name:'Puerro',cat:'verdura'},
  {name:'Arroz',cat:'cereal',dense:true},
  {name:'Maíz',cat:'cereal'},
  {name:'Guisantes',cat:'verdura',iron:true},
  {name:'Tomate',cat:'verdura'},
  {name:'Berenjena',cat:'verdura'},
  {name:'Pimiento',cat:'verdura'},
  {name:'Cebolla',cat:'verdura'},
  {name:'Avena',cat:'cereal',dense:true},
  {name:'Pasta',cat:'cereal',dense:true},
  {name:'Quinoa',cat:'cereal',iron:true},
  {name:'Manzana',cat:'fruta'},
  {name:'Pera',cat:'fruta'},
  {name:'Plátano',cat:'fruta'},
  {name:'Melón',cat:'fruta'},
  {name:'Sandía',cat:'fruta'},
  {name:'Naranja',cat:'fruta'},
  {name:'Mandarina',cat:'fruta'},
  {name:'Mango',cat:'fruta'},
  {name:'Ciruela',cat:'fruta'},
  {name:'Albaricoque',cat:'fruta'},
  {name:'Aguacate',cat:'fruta'},
  {name:'Pollo',cat:'proteina',iron:true},
  {name:'Pavo',cat:'proteina',iron:true},
  {name:'Ternera',cat:'proteina',iron:true},
  {name:'Cordero',cat:'proteina',iron:true},
  {name:'Cerdo magro',cat:'proteina',iron:true},
  {name:'Conejo',cat:'proteina',iron:true},
  {name:'Lenteja roja',cat:'proteina',iron:true},
  {name:'Garbanzo',cat:'proteina',iron:true},
  {name:'Alubia blanca',cat:'proteina',iron:true},
  {name:'Huevo',cat:'proteina',iron:true,allergen:true},
  {name:'Trigo / gluten',cat:'cereal',allergen:true,dense:true},
  {name:'Soja',cat:'proteina',iron:true,allergen:true},
  {name:'Cacahuete',cat:'proteina',iron:true,allergen:true},
  {name:'Almendra',cat:'proteina',allergen:true},
  {name:'Avellana',cat:'proteina',allergen:true},
  {name:'Nuez',cat:'proteina',allergen:true},
  {name:'Sésamo',cat:'verdura',allergen:true},
  {name:'Pescado blanco',cat:'proteina',iron:true,allergen:true},
  {name:'Salmón',cat:'proteina',iron:true,allergen:true},
  {name:'Marisco',cat:'proteina',allergen:true},
  {name:'Mostaza',cat:'verdura',allergen:true},
  {name:'Kiwi',cat:'fruta',latex:true,allergen:true},
  {name:'Melocotón',cat:'fruta',latex:true,allergen:true},
  {name:'Fresa',cat:'fruta',allergen:true}
 ],
 dairyFoods:[
  {name:'Yogur natural',cat:'proteina',availableMonth:9},
  {name:'Queso tierno',cat:'proteina',availableMonth:9},
  {name:'Leche entera de vaca',cat:'proteina',availableMonth:12,allergen:true}
 ],
 allergenPool:[],
 avoidFoods:[
  'Espinaca','Acelga','Borraja','Miel antes de 12 meses','Leche de vaca como bebida antes de 12 meses','Sal añadida','Azúcar añadido','Zumos','Frutos secos enteros','Uvas enteras','Manzana cruda en trozos duros','Zanahoria cruda','Palomitas','Salchichas en rodajas','Pez espada / emperador','Atún rojo','Tiburón / cazón / tintorera','Lucio'
 ],
 reactions:[],
 reactionHistory:[],dairyUnlocked9:false,dairyUnlocked12:false,dairyPromptSeen9:false,dairyPromptSeen12:false
};
let S=deepClone(INITIAL_STATE); let calViewDate=new Date(); let lastReportText=''; let BLOCK_SWAP=null;
function deepClone(o){return JSON.parse(JSON.stringify(o));}
function today(){return fmtDate(new Date());}
function fmtDate(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function parseDate(s){const [y,m,d]=String(s).split('-').map(Number); return new Date(y,m-1,d);}
function addDays(dateStr,n){const d=parseDate(dateStr); d.setDate(d.getDate()+n); return fmtDate(d);}
function daysBetween(a,b){return Math.floor((parseDate(b)-parseDate(a))/86400000);}
function jsStr(s){return JSON.stringify(String(s));}
function monthBounds(dateStr){const d=parseDate(dateStr); const s=new Date(d.getFullYear(),d.getMonth(),1); const e=new Date(d.getFullYear(),d.getMonth()+1,0); return {start:fmtDate(s),end:fmtDate(e)};}
function formatShortDate(s){const d=parseDate(s); return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0,3)} ${d.getFullYear()}`;}
function formatDateRange(start,end){const s=parseDate(start),e=parseDate(end); return `${s.getDate()} ${MONTHS[s.getMonth()].slice(0,3)} — ${e.getDate()} ${MONTHS[e.getMonth()].slice(0,3)} ${e.getFullYear()}`;}
function normalizeName(n){return String(n||'').trim();}
function monthDiffFromBirth(){if(!S.babyBirthDate)return null; const b=parseDate(S.babyBirthDate), t=parseDate(today()); let m=(t.getFullYear()-b.getFullYear())*12+(t.getMonth()-b.getMonth()); if(t.getDate()<b.getDate()) m--; return Math.max(0,m);}
function ageText(){if(!S.babyBirthDate)return 'Edad no configurada'; const w=Math.floor(daysBetween(S.babyBirthDate,today())/7); const m=monthDiffFromBirth(); return `Semana ${w} · ${m} meses aprox.`;}
function requireBirthDateForPlan(){if(S.babyBirthDate)return true; alert('Antes de generar el plan debes indicar la fecha de nacimiento del bebé.'); closeModal('modal-setup-plan'); openModal('modal-birthdate'); return false;}
function autoPromptDairyUnlock(){const m=monthDiffFromBirth(); if(m===null)return; if(m>=9&&!S.dairyPromptSeen9&&S.dairyFoods.some(f=>Number(f.availableMonth||9)===9)){S.dairyPromptSeen9=true; save(); setTimeout(()=>{if(confirm('🧀 Lácteos desbloqueados\n\nYa puedes introducir yogur natural y queso tierno. ¿Quieres añadirlos a pendientes?'))activateDairy(9);},250);} if(m>=12&&!S.dairyPromptSeen12&&S.dairyFoods.some(f=>Number(f.availableMonth||9)===12)){S.dairyPromptSeen12=true; save(); setTimeout(()=>{if(confirm('🥛 Leche de vaca disponible\n\nYa puedes añadirla a pendientes. ¿Quieres hacerlo ahora?'))activateDairy(12);},250);}}
function enrichFood(f){if(!f)return null; const out={iron:false,latex:false,allergen:false,dense:false,hydrating:false,grain:false,...f}; if(GRAIN_FOODS.has(out.name)||out.grain)out.cat='cereal'; if(DENSE_FOODS.has(out.name))out.dense=true; if(HYDRATING_FOODS.has(out.name))out.hydrating=true; out.grain=out.cat==='cereal'; return out;}

function normalizeAllergenFlags(){
  // Defensa contra estados corruptos: en un estado limpio no todos los pendientes deben ser alérgenos.
  // Solo conservamos allergen:true cuando es un alérgeno conocido o el usuario lo marcó y ya existe guardado así.
  const defaultNames=DEFAULT_ALLERGEN_NAMES;
  const pending=safeArr(S.pendingFoods).map(enrichFood).filter(Boolean);
  const allergenCount=pending.filter(f=>f.allergen).length;
  if(pending.length && allergenCount/pending.length>0.75){
    S.pendingFoods=pending.map(f=> defaultNames.has(f.name) ? {...f,allergen:true} : {...f,allergen:false});
  }
}
function foodBadge(f){const e=enrichFood(f); let h=''; const ar=activeReactionInfo(e.name); if(ar)h+=`<span class="badge b-reaction" data-action="showReactionInfo" data-name="${escapeAttr(e.name)}" title="Ver reacción">Reacción</span>`; if(e.iron)h+='<span class="badge b-tag">hierro</span>'; if(e.allergen)h+='<span class="badge b-allergen">alérgeno</span>'; if(e.latex)h+='<span class="badge b-tag">látex</span>'; if(e.dense)h+='<span class="badge b-tag">denso</span>'; if(e.hydrating)h+='<span class="badge b-tag">agua</span>'; return h;}
function safeArr(a){return Array.isArray(a)?a:[];}
function dedupe(arr){const seen=new Set(); return safeArr(arr).filter(x=>x&&x.name&&!seen.has(x.name)&&(seen.add(x.name),true)).map(enrichFood);}
function sortFoodsAZ(arr){return dedupe(arr).sort((a,b)=>String(a.name).localeCompare(String(b.name),'es',{sensitivity:'base'}));}
function ensureState(){S={...deepClone(INITIAL_STATE),...S}; ['safeFoods','pendingFoods','dairyFoods','allergenPool','reactions','testing'].forEach(k=>S[k]=dedupe(S[k])); if(S.allergenPool&&S.allergenPool.length){S.allergenPool.forEach(f=>{const ef={...enrichFood(f),allergen:true}; if(!S.pendingFoods.some(x=>x.name===ef.name)&&!S.safeFoods.some(x=>x.name===ef.name)&&!S.dairyFoods.some(x=>x.name===ef.name))S.pendingFoods.push(ef);}); S.allergenPool=[];} ['safeFoods','pendingFoods','dairyFoods','reactions','testing'].forEach(k=>S[k]=dedupe(S[k])); S.dairyUnlocked9=!!S.dairyUnlocked9; S.dairyUnlocked12=!!S.dairyUnlocked12; S.dairyPromptSeen9=!!S.dairyPromptSeen9; S.dairyPromptSeen12=!!S.dairyPromptSeen12; S.reactionHistory=Array.isArray(S.reactionHistory)?S.reactionHistory:[]; S.reactionHistory=S.reactionHistory.filter(r=>r&&r.name).map(r=>({id:r.id||Date.now()+Math.random(),name:r.name,cat:r.cat||'verdura',date:r.date||today(),source:r.source||'manual',status:r.status||'active',resolvedDate:r.resolvedDate||null,notes:r.notes||''})); S.reactions.forEach(r=>{if(!S.reactionHistory.some(h=>h.name===r.name&&h.status==='active'))S.reactionHistory.push({id:Date.now()+Math.random(),name:r.name,cat:r.cat||'verdura',date:r.date||today(),source:'manual',status:'active',resolvedDate:null,notes:''});}); S.reactions=dedupe(S.reactions.map(r=>({...r,date:activeReactionInfo(r.name)?.date||r.date||today()}))); normalizeAllergenFlags(); S.blocks=Array.isArray(S.blocks)?S.blocks:[]; S.blocks=S.blocks.filter(b=>b&&b.startDate&&b.endDate).map(b=>({...b,foods:dedupe(b.foods||[]),newFood:b.newFood?enrichFood(b.newFood):null,dailyFruits:Array.isArray(b.dailyFruits)?dedupe(b.dailyFruits):[]})); S.calNotes=S.calNotes||{}; S.dayOverrides=S.dayOverrides||{}; S.recipes=S.recipes||[]; S.shoppingWeekOffset=S.shoppingWeekOffset||0;}
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(S));}catch(e){console.warn(e);}}
function load(){try{const d=localStorage.getItem(STORAGE_KEY); if(d){S={...deepClone(INITIAL_STATE),...JSON.parse(d)}; ensureState(); return;} for(const k of OLD_KEYS){const o=localStorage.getItem(k); if(o){S={...deepClone(INITIAL_STATE),...JSON.parse(o)}; ensureState(); save(); return;}} ensureState();}catch(e){console.warn(e); ensureState();}}
function allFoods(){return dedupe([...S.safeFoods,...S.pendingFoods,...S.dairyFoods]);}
function allSelectableFoods(){return dedupe([...S.safeFoods,...S.pendingFoods].filter(f=>!isReaction(f.name)));}
function findBlockForDate(ds){return S.blocks.find(x=>x&&x.startDate<=ds&&x.endDate>=ds)||null;}
function getDayOverride(ds){S.dayOverrides=S.dayOverrides||{}; return S.dayOverrides[ds]||{};}
function setDayOverride(ds,ov){S.dayOverrides=S.dayOverrides||{}; const clean={...ov}; if(!clean.deleted&&!clean.noEat&&!clean.fruitName&&!(clean.extraFoods||[]).length&&!(clean.removedNames||[]).length){delete S.dayOverrides[ds];}else{S.dayOverrides[ds]=clean;}}
function isDayDeleted(ds){const ov=getDayOverride(ds); return !!(ov.deleted||ov.noEat);}
function getFoodsForDate(b,ds){
  if(!b||isDayDeleted(ds))return [];
  const ov=getDayOverride(ds);
  const removed=new Set(ov.removedNames||[]);
  let foods=dedupe([...(b.foods||[]),...(b.newFood&&b.newFood.cat!=='fruta'?[b.newFood]:[])]).filter(f=>!removed.has(f.name));
  foods=dedupe([...foods,...safeArr(ov.extraFoods).map(enrichFood).filter(Boolean)]);
  return foods;
}
function getFruitForDateEffective(b,ds){
  if(!b||isDayDeleted(ds))return null;
  const ov=getDayOverride(ds);
  if(ov.fruitName){return allFoods().find(f=>f.name===ov.fruitName)||{name:ov.fruitName,cat:'fruta'};}
  return fruitForDate(b,ds);
}
function dateRangeDays(start,end){const out=[]; for(let ds=start;ds<=end;ds=addDays(ds,1))out.push(ds); return out;}

function isSafe(n){return S.safeFoods.some(f=>f.name===n);} function isPending(n){return S.pendingFoods.some(f=>f.name===n);} function isAllergen(n){return allFoods().some(f=>f.name===n&&f.allergen);} function isReaction(n){return S.reactions.some(f=>f.name===n);} function removeEverywhere(n){S.safeFoods=S.safeFoods.filter(f=>f.name!==n);S.pendingFoods=S.pendingFoods.filter(f=>f.name!==n);S.dairyFoods=S.dairyFoods.filter(f=>f.name!==n);S.allergenPool=[];S.testing=S.testing.filter(f=>f.name!==n);}
function addFoodTo(pool, food){
  food=enrichFood(food);
  if(!food.name)return false;
  if(isReaction(food.name)){alert('Este alimento está en Reacciones. Primero pulsa Reintentar o elimínalo de reacciones.');return false;}
  if(!S[pool])S[pool]=[];
  removeEverywhere(food.name);
  S[pool].push(food);
  ensureState();
  save();
  renderAlimentos();
  renderPlan();
  renderCalendario();
  return true;
}
function isAgeRestrictedFood(f){const name=String(f?.name||'').toLowerCase(); const m=monthDiffFromBirth(); if(m===null&&(name.includes('leche')||name.includes('yogur')||name.includes('queso')))return true; if(name.includes('leche')&&m<12)return true; if((name.includes('yogur')||name.includes('queso'))&&m<9)return true; return false;}
function isDairyFood(f){const name=String(f?.name||'').toLowerCase(); return name.includes('leche')||name.includes('yogur')||name.includes('queso');}
function passesPlanFilters(f){f=enrichFood(f); if(isReaction(f.name))return false; if(isAgeRestrictedFood(f))return false; if(PLAN_FILTERS.avoidLatex&&f.latex)return false; if(PLAN_FILTERS.avoidDairy&&isDairyFood(f))return false; return true;}
function pendingAllergens(){return dedupe(S.pendingFoods).filter(f=>f&&f.allergen===true&&passesPlanFilters(f));}
function normalPendingFoods(){return dedupe(S.pendingFoods).filter(f=>!f.allergen&&passesPlanFilters(f));}
function allAllergenFoods(){return dedupe([...S.pendingFoods,...S.safeFoods,...S.dairyFoods]).filter(f=>f.allergen);}
function digestScore(arr){return dedupe(arr).reduce((sum,f)=>sum+(f.hydrating?1:0)-(f.dense?1:0),0);}
function isDigestOk(arr){const dense=dedupe(arr).filter(f=>f.dense).length; return dense<=1 || digestScore(arr)>=0;}
function activeReactionInfo(n){return (S.reactionHistory||[]).slice().reverse().find(r=>r.name===n&&r.status==='active')||null;}
function addReactionRecord(food,source='manual',date=today()){food=enrichFood(food); const existing=activeReactionInfo(food.name); if(existing)return existing; const rec={id:Date.now()+Math.random(),name:food.name,cat:food.cat||'verdura',date:date||today(),source,status:'active',resolvedDate:null,notes:''}; S.reactionHistory.push(rec); if(!isReaction(food.name))S.reactions.push({...food,date:rec.date,source}); return rec;}
function resolveReaction(n){let changed=false; (S.reactionHistory||[]).forEach(r=>{if(r.name===n&&r.status==='active'){r.status='resolved'; r.resolvedDate=today(); changed=true;}}); if(isReaction(n)){S.reactions=S.reactions.filter(r=>r.name!==n); changed=true;} return changed;}
function showReactionInfo(n){const r=activeReactionInfo(n) || (S.reactionHistory||[]).slice().reverse().find(x=>x.name===n); if(!r){alert('No hay reacción registrada para este alimento.');return;} document.getElementById('block-detail-title').textContent='🚫 Reacción registrada'; document.getElementById('block-detail-content').innerHTML=`<div class="info-box info-red"><b>${escapeHtml(r.name)}</b></div><div style="font-size:13px;line-height:1.7;color:var(--text2)"><b>Fecha:</b> ${escapeHtml(formatShortDate(r.date))}<br><b>Estado:</b> ${r.status==='active'?'Activa':'Resuelta'}${r.resolvedDate?`<br><b>Resuelta:</b> ${escapeHtml(formatShortDate(r.resolvedDate))}`:''}</div>`; openModal('modal-block-detail');}
function openReactionHistory(){const rows=(S.reactionHistory||[]).slice().sort((a,b)=>String(b.date).localeCompare(String(a.date))); document.getElementById('block-detail-title').textContent='📜 Historial de reacciones'; document.getElementById('block-detail-content').innerHTML=rows.length?rows.map(r=>`<div class="food-row"><div><div class="food-name">${escapeHtml(r.name)} <span class="badge ${r.status==='active'?'b-reaction':'b-gray'}">${r.status==='active'?'Activa':'Resuelta'}</span></div><div class="food-meta">${escapeHtml(formatShortDate(r.date))}${r.resolvedDate?' · resuelta '+escapeHtml(formatShortDate(r.resolvedDate)):''}</div></div></div>`).join(''):'<div class="empty">Sin historial de reacciones</div>'; openModal('modal-block-detail');}
function showScreen(name){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));document.getElementById('screen-'+name).classList.add('active');document.getElementById('nav-'+name).classList.add('active');document.getElementById('main-scroll').scrollTop=0; if(name==='alimentos')renderAlimentos(); if(name==='plan')renderPlan(); if(name==='calendario')renderCalendario(); if(name==='guia')renderGuia(); if(name==='ajustes')renderAjustes();}
function openModal(id){if(id==='modal-add-reaction')populateReactionFoodSelect(); if(id==='modal-add-allergen')populateAllergenPresetSelect(); if(id==='modal-setup-plan')preparePlanModal(); const el=document.getElementById(id); if(!el)return; el.classList.add('open'); document.body.style.overflow='hidden'; if(!history.state||history.state.modal!==id){try{history.pushState({modal:id},'',location.href);}catch(e){}}}
function closeModal(id){const el=document.getElementById(id); if(el)el.classList.remove('open'); document.body.style.overflow='';}
document.querySelectorAll('.modal-overlay').forEach(el=>el.addEventListener('click',e=>{if(e.target===el)closeModal(el.id);}));
window.addEventListener('popstate',()=>{document.querySelectorAll('.modal-overlay.open').forEach(el=>closeModal(el.id));});
function renderStatsAlimentos(){document.getElementById('stats-alimentos').innerHTML=`<div class="stat"><div class="stat-n" style="color:var(--green)">${S.safeFoods.length}</div><div class="stat-l">Seguros</div></div><div class="stat"><div class="stat-n" style="color:var(--blue)">${S.pendingFoods.length}</div><div class="stat-l">Pendientes</div></div><div class="stat"><div class="stat-n" style="color:var(--amber)">${allAllergenFoods().length}</div><div class="stat-l">Alérgenos</div></div><div class="stat"><div class="stat-n" style="color:var(--red)">${S.reactions.length}</div><div class="stat-l">Reacciones</div></div>`;}
function renderFoodGroups(items){
  items=sortFoodsAZ(items);
  if(!items.length)return '<div class="empty">Sin alimentos</div>';
  const groups={verdura:[],cereal:[],proteina:[],fruta:[]};
  items.forEach(f=>(groups[f.cat]||groups.verdura).push(f));
  let html='';
  ['verdura','cereal','proteina','fruta'].forEach(cat=>{
    if(!groups[cat].length)return;
    html+=`<div class="cat-box cat-${cat}"><div class="cat-header">${CAT_ICON[cat]} <span>${CAT_LABEL[cat]}</span></div><div class="cat-items">`+groups[cat].map(f=>`<div class="food-row food-row-click" data-action="openEditFood" data-name="${escapeAttr(f.name)}"><div><div class="food-name">${escapeHtml(f.name)}${foodBadge(f)}</div></div><div class="food-chevron">›</div></div>`).join('')+`</div></div>`;
  });
  return html;
}
function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function escapeAttr(s){return escapeHtml(s);}

function findFoodPool(name){
  const pools=['safeFoods','pendingFoods','dairyFoods','reactions'];
  for(const pool of pools){
    const food=(S[pool]||[]).find(f=>f.name===name);
    if(food) return {pool,food};
  }
  return null;
}
function poolLabel(pool){return {safeFoods:'Seguros',pendingFoods:'Pendientes',dairyFoods:'Lácteos bloqueados',reactions:'Reacciones'}[pool]||pool;}
function renderFoodDetailActions(pool,name){
  const el=document.getElementById('edit-food-actions');
  if(!el)return;
  const n=escapeAttr(name);
  let html='';
  if(pool==='safeFoods'){
    html=`<button class="btn btn-full btn-danger" data-action="markReactionFromSafe" data-name="${n}">Registrar reacción</button><button class="btn btn-full" data-action="removeSafe" data-name="${n}">Mover a pendientes</button>`;
  }else if(pool==='pendingFoods'){
    html=`<button class="btn btn-full btn-success" data-action="movePendingToSafe" data-name="${n}">Marcar como seguro</button><button class="btn btn-full btn-danger" data-action="markReactionFromPending" data-name="${n}">Registrar reacción</button><button class="btn btn-full" data-action="removePending" data-name="${n}">Eliminar alimento</button>`;
  }else if(pool==='dairyFoods'){
    html=`<button class="btn btn-full" data-action="removeDairy" data-name="${n}">Eliminar lácteo</button>`;
  }else if(pool==='reactions'){
    html=`<button class="btn btn-full btn-success" data-action="retryReaction" data-name="${n}">Reintentar: pasar a pendientes</button><button class="btn btn-full" data-action="showReactionInfo" data-name="${n}">Ver reacción</button>`;
  }
  el.innerHTML=html?`<div class="divider"></div><div class="mini-title">Acciones</div>${html}<div class="divider"></div>`:'';
}

function openEditFood(name){
  const found=findFoodPool(name);
  if(!found){alert('No encuentro ese alimento.');return;}
  const f=enrichFood(found.food);
  document.getElementById('edit-original-name').value=f.name;
  document.getElementById('edit-food-name').value=f.name;
  document.getElementById('edit-food-cat').value=f.cat||'verdura';
  document.getElementById('edit-food-iron').checked=!!f.iron;
  document.getElementById('edit-food-latex').checked=!!f.latex;
  document.getElementById('edit-food-allergen').checked=!!f.allergen;
  document.getElementById('edit-food-dense').checked=!!f.dense;
  document.getElementById('edit-food-hydrating').checked=!!f.hydrating;
  document.getElementById('edit-food-current').textContent=`Lista actual: ${poolLabel(found.pool)}`;
  renderFoodDetailActions(found.pool,f.name);
  openModal('modal-edit-food');
}
function renameInBlocks(oldName,newFood){
  S.blocks.forEach(b=>{
    (b.foods||[]).forEach(f=>{if(f.name===oldName)Object.assign(f,enrichFood(newFood));});
    (b.dailyFruits||[]).forEach(f=>{if(f.name===oldName)Object.assign(f,enrichFood(newFood));});
    if(b.newFood&&b.newFood.name===oldName)b.newFood=enrichFood(newFood);
    if(b.reactionFood===oldName)b.reactionFood=newFood.name;
  });
}
function renameInReactionHistory(oldName,newFood){
  (S.reactionHistory||[]).forEach(r=>{if(r.name===oldName){r.name=newFood.name;r.cat=newFood.cat||r.cat;}});
  (S.reactions||[]).forEach(r=>{if(r.name===oldName)Object.assign(r,enrichFood(newFood));});
}
function saveEditedFood(){
  const oldName=document.getElementById('edit-original-name').value;
  const found=findFoodPool(oldName);
  if(!found){alert('No encuentro ese alimento.');return;}
  const name=normalizeName(document.getElementById('edit-food-name').value);
  if(!name){alert('El nombre no puede estar vacío.');return;}
  const edited={...found.food,name,cat:document.getElementById('edit-food-cat').value,iron:document.getElementById('edit-food-iron').checked,latex:document.getElementById('edit-food-latex').checked,allergen:document.getElementById('edit-food-allergen').checked,dense:document.getElementById('edit-food-dense').checked,hydrating:document.getElementById('edit-food-hydrating').checked};
  if(found.food.availableMonth) edited.availableMonth=found.food.availableMonth;
  let targetPool=found.pool;
  removeEverywhere(oldName);
  if(found.pool==='reactions'){
    S.reactions=S.reactions.filter(f=>f.name!==oldName);
    addReactionRecord(edited,'manual');
  }else{
    if(!S[targetPool].some(f=>f.name===edited.name))S[targetPool].push(enrichFood(edited));
  }
  renameInBlocks(oldName,edited);
  renameInReactionHistory(oldName,edited);
  ensureState(); save(); closeModal('modal-edit-food'); renderAlimentos(); renderPlan(); renderCalendario();
}
function renderAlimentos(){ensureState();renderStatsAlimentos();document.getElementById('safe-list').innerHTML=renderFoodGroups(S.safeFoods);document.getElementById('pending-list').innerHTML=renderFoodGroups(S.pendingFoods);renderDairyList();renderReactionsList();updateHeader();}
function renderDairyList(){const m=monthDiffFromBirth(); let html=''; const can9=m!==null&&m>=9, can12=m!==null&&m>=12; if(m===null) html+=`<div class="info-box info-amber">Configura la fecha de nacimiento para desbloquear lácteos por edad.</div>`; if(can9&&S.dairyFoods.some(f=>Number(f.availableMonth||9)<=9)) html+=`<div class="info-box info-green">🧀 Lácteos desbloqueados: yogur natural y queso tierno. Al activarlos pasarán a pendientes.</div><button class="btn btn-full btn-success" data-action="activateDairy" data-month="9">Añadir lácteos de 9 meses a pendientes</button>`; if(can12&&S.dairyFoods.some(f=>Number(f.availableMonth||9)<=12)) html+=`<div class="info-box info-green">🥛 Leche de vaca disponible. Pasará a pendientes.</div><button class="btn btn-full btn-success" data-action="activateDairy" data-month="12">Añadir lácteos de 12 meses a pendientes</button>`; html+=S.dairyFoods.length?sortFoodsAZ(S.dairyFoods).map(f=>`<div class="food-row food-row-click" data-action="openEditFood" data-name="${escapeAttr(f.name)}"><div><div class="food-name">${escapeHtml(f.name)}${foodBadge(f)}</div><div class="food-meta">Disponible desde ${f.availableMonth||9} meses</div></div><div class="food-chevron">›</div></div>`).join(''):'<div class="empty">No hay lácteos bloqueados</div>'; document.getElementById('dairy-list').innerHTML=html;}
function renderAllergenPoolList(){const el=document.getElementById('allergen-pool-list'); if(!el)return; let arr=orderAllergens(allAllergenFoods()); el.innerHTML=arr.length?renderFoodGroups(arr,f=>`<button class="btn btn-sm btn-danger" data-action="markReactionFromAny" data-name="${escapeAttr(f.name)}">Reacción</button><button class="btn btn-sm" data-action="openEditFood" data-name="${escapeAttr(f.name)}">Editar</button>`):'<div class="empty">No hay alérgenos potenciales</div>';}
function renderReactionsList(){const el=document.getElementById('reactions-list'); if(!S.reactions.length){el.innerHTML='<div class="empty">Sin reacciones activas 🎉</div>';return;} el.innerHTML=sortFoodsAZ(S.reactions).map(r=>`<div class="food-row food-row-click" data-action="openEditFood" data-name="${escapeAttr(r.name)}"><div><div class="food-name">${escapeHtml(r.name)} <span class="badge b-reaction" data-action="showReactionInfo" data-name="${escapeAttr(r.name)}">Reacción</span></div><div class="food-meta">${activeReactionInfo(r.name)?.date||r.date||''} · ${CAT_LABEL[r.cat]||'Sin categoría'}</div></div><div class="food-chevron">›</div></div>`).join('');}
function foodFromForm(prefix){const base={name:normalizeName(document.getElementById(prefix+'-name')?.value||''),cat:document.getElementById(prefix+'-cat')?.value||'proteina',iron:!!document.getElementById(prefix+'-iron')?.checked,latex:!!document.getElementById(prefix+'-latex')?.checked,allergen:!!document.getElementById(prefix+'-allergen')?.checked,dense:!!document.getElementById(prefix+'-dense')?.checked,hydrating:!!document.getElementById(prefix+'-hydrating')?.checked}; return enrichFood(base);}
function clearForm(prefix){['name','iron','latex','allergen','dense','hydrating'].forEach(k=>{const el=document.getElementById(prefix+'-'+k); if(!el)return; if(el.type==='checkbox')el.checked=false; else el.value='';});}
function addSafeFood(){const f=foodFromForm('safe'); if(!f.name){alert('Escribe el nombre');return;} addFoodTo('safeFoods',f); clearForm('safe'); closeModal('modal-add-safe');}
function addPendingFood(){const f=foodFromForm('pending'); if(!f.name){alert('Escribe el nombre');return;} addFoodTo('pendingFoods',f); clearForm('pending'); closeModal('modal-add-pending');}
function addDairyFood(){const name=normalizeName(document.getElementById('dairy-name').value); if(!name){alert('Escribe el nombre');return;} const f={name,cat:'proteina',availableMonth:Number(document.getElementById('dairy-age').value)}; addFoodTo('dairyFoods',f); document.getElementById('dairy-name').value=''; closeModal('modal-add-dairy');}
function addAllergenToPool(){const preset=document.getElementById('allergen-preset-select').value; const custom=normalizeName(document.getElementById('allergen-custom').value); const found=DEFAULT_ALLERGENS_LIST.find(a=>a.name===preset); const f={...(found||{}),name:custom||preset,cat:document.getElementById('allergen-cat').value,iron:!!document.getElementById('allergen-iron').checked||!!found?.iron,latex:!!document.getElementById('allergen-latex').checked||!!found?.latex,dense:!!document.getElementById('allergen-dense')?.checked||!!found?.dense,hydrating:!!document.getElementById('allergen-hydrating')?.checked||!!found?.hydrating,allergen:true}; if(!f.name){alert('Selecciona o escribe un alérgeno');return;} addFoodTo('pendingFoods',f); document.getElementById('allergen-custom').value=''; closeModal('modal-add-allergen');}
function addReactionManual(){const sel=document.getElementById('reaction-food-select').value; const custom=normalizeName(document.getElementById('reaction-food-custom').value); const name=custom||sel; if(!name){alert('Selecciona o escribe un alimento');return;} const food=allFoods().find(f=>f.name===name)||{name,cat:'verdura'}; const res=handleReactionAndRebuild(food,'manual',today()); closeModal('modal-add-reaction'); renderAlimentos(); renderPlan(); renderCalendario(); if(res.changed)alert('Reacción registrada. He rehecho el plan futuro desde hoy y he mantenido intacto el pasado.');}
function removeSafe(n){const f=S.safeFoods.find(x=>x.name===n); if(!f)return; if(!confirm(`¿Mover "${n}" de seguros a pendientes?`))return; S.safeFoods=S.safeFoods.filter(x=>x.name!==n); if(!isPending(n))S.pendingFoods.push(enrichFood(f)); save(); renderAlimentos(); rebuildFromTodayIfNeeded();}
function removePending(n){if(!confirm(`¿Eliminar "${n}" de pendientes?`))return; S.pendingFoods=S.pendingFoods.filter(f=>f.name!==n); save(); renderAlimentos(); rebuildFromTodayIfNeeded();}
function removeDairy(n){if(!confirm(`¿Eliminar "${n}" de lácteos?`))return; S.dairyFoods=S.dairyFoods.filter(f=>f.name!==n); save(); renderAlimentos();}
function removeAllergenPool(n){if(!confirm(`¿Quitar "${n}" de alérgenos?`))return; S.allergenPool=S.allergenPool.filter(f=>f.name!==n); save(); renderAlimentos(); rebuildFromTodayIfNeeded();}
function markReactionFromAny(n){const found=findFoodPool(n); if(!found||found.pool==='reactions')return; const res=handleReactionAndRebuild(found.food,'manual',today()); renderAlimentos(); renderPlan(); renderCalendario(); if(res.changed)alert('Reacción registrada. He rehecho el plan futuro desde hoy y he mantenido intacto el pasado.');}
function markReactionFromSafe(n){const f=S.safeFoods.find(x=>x.name===n); if(!f)return; const res=handleReactionAndRebuild(f,'manual',today()); renderAlimentos(); renderPlan(); renderCalendario(); if(res.changed)alert('Reacción registrada. He rehecho el plan futuro desde hoy y he mantenido intacto el pasado.');}
function markReactionFromPending(n){const f=S.pendingFoods.find(x=>x.name===n); if(!f)return; const res=handleReactionAndRebuild(f,'manual',today()); renderAlimentos(); renderPlan(); renderCalendario(); if(res.changed)alert('Reacción registrada. He rehecho el plan futuro desde hoy y he mantenido intacto el pasado.');}
function markReactionAllergen(n){const f=S.allergenPool.find(x=>x.name===n); if(!f)return; const res=handleReactionAndRebuild(f,'manual',today()); renderAlimentos(); renderPlan(); renderCalendario(); if(res.changed)alert('Reacción registrada. He rehecho el plan futuro desde hoy y he mantenido intacto el pasado.');}
function movePendingToSafe(n){const f=S.pendingFoods.find(x=>x.name===n); if(!f)return; removeEverywhere(n); resolveReaction(n); S.safeFoods.push(f); save(); renderAlimentos();}
function approveAllergen(n){const f=S.allergenPool.find(x=>x.name===n); if(!f)return; removeEverywhere(n); resolveReaction(n); if(!isSafe(n))S.safeFoods.push(f); save(); renderAlimentos();}
function retryReaction(n){const r=S.reactions.find(x=>x.name===n)||activeReactionInfo(n); if(!r)return; resolveReaction(n); removeEverywhere(n); if(!isPending(n)&&!isSafe(n)&&!isAllergen(n))S.pendingFoods.push({name:r.name,cat:r.cat||'verdura',iron:!!r.iron,latex:!!r.latex}); save(); renderAlimentos(); alert('El alimento pasa a pendientes para volver a introducirlo. La reacción queda guardada en historial.');}
function removeReaction(n){const r=S.reactions.find(x=>x.name===n)||activeReactionInfo(n); resolveReaction(n); if(r&&!isPending(n)&&!isSafe(n)&&!isAllergen(n))S.pendingFoods.push({...r,date:undefined,source:undefined,status:undefined,resolvedDate:undefined}); save(); renderAlimentos();}
function activateDairy(month){month=Number(month); const m=monthDiffFromBirth(); if(m===null||m<month){alert('Todavía no corresponde por edad.');return;} const move=S.dairyFoods.filter(f=>Number(f.availableMonth||9)<=month); S.dairyFoods=S.dairyFoods.filter(f=>Number(f.availableMonth||9)>month); move.forEach(f=>{if(!isPending(f.name)&&!isSafe(f.name))S.pendingFoods.push({...f,availableMonth:undefined});}); if(month>=9)S.dairyUnlocked9=true; if(month>=12)S.dairyUnlocked12=true; save(); renderAlimentos();}
function populateReactionFoodSelect(){const sel=document.getElementById('reaction-food-select'); const arr=allFoods(); sel.innerHTML='<option value="">Selecciona alimento...</option>'+arr.map(f=>`<option value="${escapeHtml(f.name)}">${escapeHtml(f.name)}</option>`).join('');}
function populateAllergenPresetSelect(){const used=new Set(allFoods().map(f=>f.name)); const sel=document.getElementById('allergen-preset-select'); sel.innerHTML='<option value="">Selecciona...</option>'+DEFAULT_ALLERGENS_LIST.filter(a=>!used.has(a.name)).map(a=>`<option value="${escapeHtml(a.name)}">${escapeHtml(a.name)}</option>`).join('');}
document.getElementById('allergen-preset-select').addEventListener('change',function(){const f=DEFAULT_ALLERGENS_LIST.find(a=>a.name===this.value); if(f){document.getElementById('allergen-cat').value=f.cat; document.getElementById('allergen-iron').checked=!!f.iron; document.getElementById('allergen-latex').checked=!!f.latex; if(document.getElementById('allergen-dense'))document.getElementById('allergen-dense').checked=!!enrichFood(f).dense; if(document.getElementById('allergen-hydrating'))document.getElementById('allergen-hydrating').checked=!!enrichFood(f).hydrating;}});
function orderAllergens(arr){return dedupe(arr).sort((a,b)=>{if(a.name==='Huevo')return 1;if(b.name==='Huevo')return -1;return a.name.localeCompare(b.name,'es');});}
function blockDays(b){if(!b||!b.startDate||!b.endDate)return 3; return Math.max(1,daysBetween(b.startDate,b.endDate)+1);}
function usageCounts(blocks=[]){const c={}; safeArr(blocks).forEach(b=>{const d=blockDays(b); safeArr(b.foods).forEach(f=>{if(f&&f.name)c[f.name]=(c[f.name]||0)+d;}); if(b.newFood&&b.newFood.name&&b.newFood.cat!=='fruta')c[b.newFood.name]=(c[b.newFood.name]||0)+d; safeArr(b.dailyFruits).forEach(f=>{if(f&&f.name)c[f.name]=(c[f.name]||0)+1;});}); return c;}
function recentUseMap(blocks=[],limit=4){const c={}; safeArr(blocks).slice(-limit).forEach((b,idx)=>{const weight=limit-idx; const d=blockDays(b); safeArr(b.foods).forEach(f=>{if(f&&f.name)c[f.name]=(c[f.name]||0)+weight*d;}); if(b.newFood&&b.newFood.name&&b.newFood.cat!=='fruta')c[b.newFood.name]=(c[b.newFood.name]||0)+weight*d; safeArr(b.dailyFruits).forEach(f=>{if(f&&f.name)c[f.name]=(c[f.name]||0)+weight;});}); return c;}
function lastBlockFoodNames(blocks=[]){const b=safeArr(blocks).slice(-1)[0]; const set=new Set(); if(!b)return set; safeArr(b.foods).forEach(f=>{if(f&&f.name)set.add(f.name);}); safeArr(b.dailyFruits).forEach(f=>{if(f&&f.name)set.add(f.name);}); if(b.newFood&&b.newFood.name)set.add(b.newFood.name); return set;}
function isBaseFood(f){f=enrichFood(f); if(!f)return false; const base=new Set(['Calabacín','Calabaza','Judía verde','Puerro','Zanahoria','Coliflor','Tomate','Berenjena','Cebolla']); return f.cat==='verdura'&&base.has(f.name);}
function isGrain(f){f=enrichFood(f); if(!f)return false; return f.cat==='cereal';}
function isCerealOrDenseBase(f){f=enrichFood(f); if(!f)return false; return !!f.grain || ['Patata','Boniato'].includes(f.name);}
function recentGrainBlocks(blocks=[],limit=3){return safeArr(blocks).slice(-limit).reduce((n,b)=>n+(dedupe([...(b.foods||[]),...(b.newFood?[b.newFood]:[])]).some(f=>isGrain(f))?1:0),0);}
function choiceScore(f,counts={},recent={},opts={}){f=enrichFood(f); if(!f||!f.name)return Number.POSITIVE_INFINITY; let score=0; const use=counts[f.name]||0; const rec=recent[f.name]||0; const base=isBaseFood(f); const protein=f.cat==='proteina'; const fruit=f.cat==='fruta'; const grain=isGrain(f); const denseBase=isCerealOrDenseBase(f);
  // Penalización progresiva, no bloqueo: las bases vegetales pueden repetirse más.
  let useWeight=base?6:(protein?18:(fruit?22:(grain?46:(denseBase?52:(f.cat==='verdura'?32:16)))));
  let recentWeight=base?10:(protein?34:(fruit?48:(grain?105:(denseBase?120:(f.cat==='verdura'?58:24)))));
  score+=use*useWeight; score+=rec*recentWeight;
  // Memoria global: evita que un alimento se convierta en comodín durante meses.
  const globalWeight=base?0.20:(protein?1.15:(fruit?1.45:(grain?2.2:(denseBase?2.4:1.8))));
  score+=use*use*globalWeight;
  if(opts.avoidNames&&opts.avoidNames.has(f.name))score+=base?30:(denseBase?155:105);
  if(opts.avoidGrain&&grain)score+=240;
  // Hierro importa, pero no debe convertir alimentos marcados manualmente en comodín.
  if(opts.preferIron&&f.iron)score-=protein?6:2;
  if(opts.preferIron&&f.iron&&use>9)score+=(use-9)*34;
  // Látex y alérgeno son etiquetas de control/aviso, nunca prioridad.
  // Si ya son seguros pueden usarse, pero se penalizan para no dominar el plan.
  if(f.latex)score+=120+(use*34)+(rec*60)+(use*use*1.6);
  if(f.allergen)score+=100+(use*28)+(rec*54)+(use*use*1.35);
  if(opts.needsHydrating&&f.hydrating)score-=10;
  if(opts.avoidDense&&f.dense)score+=denseBase?105:55; if(f.name==='Patata')score+=(use*30)+(rec*60)+(use*use*0.9);
  if(opts.preferBase&&base)score-=6;
  if(opts.preferHydrating&&f.hydrating)score-=6;
  if(opts.sameCatPenalty)score+=opts.sameCatPenalty;
  return score;}
function pickBalanced(arr, used=new Set(), counts={}, recent={}, opts={}){let list=dedupe(arr).filter(f=>f&&f.name&&!used.has(f.name)); if(!list.length)return null; const avoid=opts.avoidNames||new Set(); let preferred=list.filter(f=>!avoid.has(f.name)); if(preferred.length)list=preferred; const jitter=opts.randomize?8:0; list=list.map(f=>({f,score:choiceScore(f,counts,recent,opts)+(jitter?Math.random()*jitter:0)})); list.sort((a,b)=>a.score-b.score||a.f.name.localeCompare(b.f.name,'es')); return list[0].f;}
function pickNewFood(arr, usedNew=new Set(), counts={}, recent={}){arr=dedupe(arr).filter(f=>f&&f.name&&!usedNew.has(f.name)); if(!arr.length)return null; arr.sort((a,b)=>{const ca=counts[a.cat]||0, cb=counts[b.cat]||0; if(ca!==cb)return ca-cb; const sa=choiceScore(a,{},recent,{preferIron:true}); const sb=choiceScore(b,{},recent,{preferIron:true}); if(sa!==sb)return sa-sb; return a.name.localeCompare(b.name,'es');}); return arr[0];}
function getSafeByCat(cat){return dedupe(S.safeFoods).filter(f=>f.cat===cat&&passesPlanFilters(f));}
function safeFruits(){return getSafeByCat('fruta');}
function getUsedNewFoodsInMonth(startDate){const mb=monthBounds(startDate); return new Set(S.blocks.filter(b=>!(b.endDate<mb.start||b.startDate>mb.end)).map(b=>b.newFood?.name).filter(Boolean));}
function getUsedNewFoodsAll(){return new Set(S.blocks.map(b=>b.newFood?.name).filter(Boolean));}
function nextBlockTypeForStart(startDate){const prev=S.blocks.filter(b=>b.endDate<startDate).sort((a,b)=>b.endDate.localeCompare(a.endDate))[0]; if(!prev)return 'normal'; if(prev.type==='normal' && pendingAllergens().length)return 'allergen'; return 'normal';}
function buildLunchFromSafe(existing=[], extraFood=null){const usedSafe=new Set(); const counts=usageCounts(existing); const recent=recentUseMap(existing,5); const avoidNames=lastBlockFoodNames(existing); let lunch=[]; const veggies=getSafeByCat('verdura'); const cereals=getSafeByCat('cereal'); const proteins=getSafeByCat('proteina'); const baseVeggies=veggies.filter(f=>f&&isBaseFood(f)); const otherVeggies=veggies.filter(f=>f&&!isBaseFood(f));
  const hasDense=()=>dedupe([...lunch,...(extraFood?[extraFood]:[])]).some(f=>f&&f.dense);
  const hasHydrating=()=>dedupe([...lunch,...(extraFood?[extraFood]:[])]).some(f=>f&&f.hydrating);
  const hasGrain=()=>dedupe([...lunch,...(extraFood?[extraFood]:[])]).some(f=>isGrain(f));
  const grainRecently=recentGrainBlocks(existing,3);
  const grainAllowed=grainRecently===0 && !isGrain(extraFood) && !extraFood?.dense;
  // 1) Verdura base: puede repetirse, pero se reparte con penalización suave.
  const firstV=pickBalanced(baseVeggies.length?baseVeggies:veggies,usedSafe,counts,recent,{avoidNames,preferBase:true,needsHydrating:!!extraFood?.dense,avoidGrain:true}); if(firstV){lunch.push(firstV);usedSafe.add(firstV.name);}
  // 2) Segunda verdura o cereal ocasional: el cereal es una categoría real y no obligatorio.
  let secondPool=otherVeggies.length?otherVeggies:veggies;
  if(hasDense()){const hyd=veggies.filter(f=>f&&f.hydrating); if(hyd.length)secondPool=hyd;}
  else if(grainAllowed && cereals.length){secondPool=[...secondPool,...cereals];}
  const secondV=pickBalanced(secondPool,usedSafe,counts,recent,{avoidNames,needsHydrating:hasDense(),preferHydrating:hasDense(),avoidDense:hasDense(),avoidGrain:!grainAllowed||hasGrain()}); if(secondV){lunch.push(secondV);usedSafe.add(secondV.name);}
  // 3) Proteína: fuerte rotación y preferencia de hierro, sin bloquear si hay pocas.
  const protein=pickBalanced(proteins,usedSafe,counts,recent,{avoidNames,preferIron:true,avoidDense:hasDense(),avoidGrain:true}); if(protein){lunch.push(protein);usedSafe.add(protein.name);}
  while(lunch.length<3){let fillPool=S.safeFoods.filter(f=>f&&f.cat!=='fruta'&&passesPlanFilters(f)); if(hasDense()){const hyd=fillPool.filter(f=>f&&f.hydrating&&!isGrain(f)); if(hyd.length&&!hasHydrating())fillPool=hyd;} const fill=pickBalanced(fillPool,usedSafe,counts,recent,{avoidNames,preferIron:true,needsHydrating:hasDense(),preferHydrating:hasDense(),avoidDense:hasDense(),avoidGrain:!grainAllowed||hasGrain()}); if(!fill)break; lunch.push(fill); usedSafe.add(fill.name);}
  if(lunch.length<3)return null;
  // Ajuste digestivo final: si se juntan densos, cambia el primer denso no nuevo por una verdura hidratante.
  if(!isDigestOk([...lunch,...(extraFood?[extraFood]:[])])){const hyd=pickBalanced(getSafeByCat('verdura').filter(f=>f&&f.hydrating),new Set(lunch.map(f=>f.name)),counts,recent,{avoidNames,needsHydrating:true,preferHydrating:true,avoidGrain:true}); if(hyd){const idx=lunch.findIndex(f=>f&&f.dense&&(!extraFood||f.name!==extraFood.name)); if(idx>=0)lunch[idx]=hyd;}}
  return lunch;}
function buildRecipe(type, existing, usedNew){const recent=recentUseMap(existing,4); const catCounts={verdura:0,cereal:0,proteina:0,fruta:0}; safeArr(existing).forEach(b=>{if(b.newFood&&b.newFood.cat)catCounts[b.newFood.cat]=(catCounts[b.newFood.cat]||0)+1;}); let newFood=null; if(type==='allergen'){newFood=pickNewFood(orderAllergens(pendingAllergens()),usedNew,catCounts,recent); if(!newFood)return null;}else{newFood=pickNewFood(normalPendingFoods(),usedNew,catCounts,recent); if(!newFood)return null;} newFood=enrichFood(newFood); const lunch=buildLunchFromSafe(existing,newFood); if(!lunch)return null; return {foods:lunch,newFood};}
function buildSafeOnlyRecipe(existing=[]){
  let lunch=buildLunchFromSafe(existing,null);
  if(!lunch){
    // Fallback de mantenimiento: si ya no quedan alimentos nuevos, no bloqueamos el mes.
    // Usamos alimentos seguros disponibles, priorizando que haya al menos una proteína.
    const counts=usageCounts(existing);
    const recent=recentUseMap(existing,6);
    const avoidNames=lastBlockFoodNames(existing);
    const used=new Set();
    lunch=[];
    const veggies=getSafeByCat('verdura');
    const cereals=getSafeByCat('cereal');
    const proteins=getSafeByCat('proteina');
    const v1=pickBalanced(veggies,used,counts,recent,{avoidNames,preferHydrating:true,avoidDense:false,avoidGrain:true});
    if(v1){lunch.push(v1);used.add(v1.name);}
    const p1=pickBalanced(proteins,used,counts,recent,{avoidNames,preferIron:true,avoidDense:false,avoidGrain:true});
    if(p1){lunch.push(p1);used.add(p1.name);}
    let fillPool=[...veggies,...cereals,...proteins].filter(f=>f&&passesPlanFilters(f));
    while(lunch.length<3&&fillPool.length){
      const fill=pickBalanced(fillPool,used,counts,recent,{avoidNames,preferIron:lunch.filter(f=>f&&f.cat==='proteina').length===0,avoidDense:lunch.some(f=>f&&f.dense),avoidGrain:lunch.some(f=>f&&f.cat==='cereal')});
      if(!fill)break;
      lunch.push(fill); used.add(fill.name);
    }
  }
  if(!lunch||lunch.length<3)return null;
  return {foods:lunch,newFood:null};
}
function hasAvailableNormal(usedNew){return normalPendingFoods().some(f=>!usedNew.has(f.name));}
function hasAvailableAllergen(usedNew){return orderAllergens(pendingAllergens()).some(f=>!usedNew.has(f.name));}
function generateBlocks(startDate,count=10,endDate=null){
  let blocks=[];
  let current=startDate;
  let usedNew=getUsedNewFoodsAll();
  // Alternancia determinista por posición global: normal → alérgeno → normal.
  // No depende del estado previo ambiguo ni de si hay alérgenos disponibles.
  const previousCount=S.blocks.filter(b=>b&&b.endDate<startDate).length;
  for(let i=0;i<count;i++){
    if(endDate&&current>endDate)break;
    const context=[...S.blocks,...blocks];
    const normalAvailable=hasAvailableNormal(usedNew);
    const allergenAvailable=hasAvailableAllergen(usedNew);
    const desiredType=((previousCount+i)%2===0)?'normal':'allergen';
    let type=desiredType;
    let rec=null;

    if(desiredType==='allergen'){
      if(allergenAvailable){
        rec=buildRecipe('allergen',context,usedNew);
        type='allergen';
      }
      // Si ya no quedan alérgenos pendientes, el bloque pasa a normal.
      if(!rec&&normalAvailable){
        rec=buildRecipe('normal',context,usedNew);
        type='normal';
      }
    }else{
      if(normalAvailable){
        rec=buildRecipe('normal',context,usedNew);
        type='normal';
      }
      // En huecos normales sin alimentos nuevos NO metemos alérgenos extra:
      // se mantiene bloque normal de mantenimiento para no romper la alternancia.
    }

    if(!rec){
      rec=buildSafeOnlyRecipe(context);
      type='normal';
    }
    if(!rec)break;
    const bEnd=endDate&&addDays(current,2)>endDate?endDate:addDays(current,2);
    const b={id:Date.now()+i,type,startDate:current,endDate:bEnd,foods:rec.foods,newFood:rec.newFood||null,completed:false,reactionFood:null};
    b.dailyFruits=getDailyFruits(b,context);
    blocks.push(b);
    if(rec.newFood){
      usedNew.add(rec.newFood.name);
      virtuallyPromoteFoodForPlanning(rec.newFood);
    }
    current=addDays(b.endDate,1);
  }
  return blocks;
}
function preparePlanModal(){const input=document.getElementById('plan-start-date'); input.value=today(); const m=monthDiffFromBirth(); document.getElementById('under-six-warning').innerHTML=(m!==null&&m<6)?'<div class="info-box info-amber">Antes de los 6 meses solo debería iniciarse alimentación complementaria por indicación del pediatra.</div>':''; const dairyFilter=document.getElementById('filter-dairy-wrap'); if(dairyFilter)dairyFilter.style.display=(m!==null&&m>=9)?'block':'none';}

function snapshotFoodState(){return {
  safeFoods:deepClone(S.safeFoods),
  pendingFoods:deepClone(S.pendingFoods),
  dairyFoods:deepClone(S.dairyFoods),
  allergenPool:deepClone(S.allergenPool),
  testing:deepClone(S.testing||[])
};}
function restoreFoodState(snap){
  S.safeFoods=snap.safeFoods; S.pendingFoods=snap.pendingFoods; S.dairyFoods=snap.dairyFoods; S.allergenPool=snap.allergenPool; S.testing=snap.testing||[];
}
function virtuallyPromoteIntroducedBefore(dateStr){
  // Para planificar meses futuros, tratamos como seguros los alimentos nuevos
  // que ya estaban programados en bloques anteriores sin reacción registrada.
  safeArr(S.blocks).forEach(b=>{
    if(!b || !b.newFood || b.reactionFood) return;
    if(String(b.endDate||'')>=dateStr) return;
    const food=enrichFood(b.newFood);
    if(!food || !food.name) return;
    const n=food.name;
    S.pendingFoods=safeArr(S.pendingFoods).filter(f=>f.name!==n);
    S.dairyFoods=safeArr(S.dairyFoods).filter(f=>f.name!==n);
    S.allergenPool=safeArr(S.allergenPool).filter(f=>f.name!==n);
    S.testing=safeArr(S.testing).filter(f=>f.name!==n);
    if(!safeArr(S.safeFoods).some(f=>f.name===n)) S.safeFoods.push(food);
  });
  ensureState();
}

function virtuallyPromoteFoodForPlanning(food){
  // Durante la generación de un horizonte largo, un alimento nuevo que ya ha completado
  // su bloque anterior sin reacción debe poder usarse como seguro en bloques posteriores.
  // Esto evita que una regeneración tras reacción se quede usando solo los seguros iniciales.
  food=enrichFood(food);
  if(!food || !food.name || isReaction(food.name))return;
  const n=food.name;
  S.pendingFoods=safeArr(S.pendingFoods).filter(f=>f.name!==n);
  S.dairyFoods=safeArr(S.dairyFoods).filter(f=>f.name!==n);
  S.allergenPool=[];
  S.testing=safeArr(S.testing).filter(f=>f.name!==n);
  if(!safeArr(S.safeFoods).some(f=>f.name===n))S.safeFoods.push(food);
  S.safeFoods=dedupe(S.safeFoods);
  S.pendingFoods=dedupe(S.pendingFoods);
}

function generatePlan(){
  if(!requireBirthDateForPlan())return;
  PLAN_FILTERS={avoidLatex:!!document.getElementById('filter-avoid-latex')?.checked,avoidDairy:!!document.getElementById('filter-avoid-dairy')?.checked};
  const selected=document.getElementById('plan-start-date').value;
  if(!selected){alert('Elige un mes');return;}
  const mb=monthBounds(selected);
  const start=selected;
  const existing=S.blocks.filter(b=>!(b.endDate<start||b.startDate>mb.end));
  const oldBlocks=deepClone(S.blocks);
  if(existing.length){if(!confirm('Ya hay plan desde esa fecha hasta final de mes. ¿Quieres rehacer solo ese tramo?'))return; S.blocks=S.blocks.filter(b=>b.endDate<start||b.startDate>mb.end);}
  const count=Math.ceil((daysBetween(start,mb.end)+1)/3);
  const foodSnap=snapshotFoodState();
  let newBlocks=[];
  try{
    virtuallyPromoteIntroducedBefore(start);
    newBlocks=generateBlocks(start,count,mb.end);
  }catch(err){
    console.error('Error generando plan',err);
    alert('Error generando plan: '+(err&&err.message?err.message:err));
  }finally{
    restoreFoodState(foodSnap);
  }
  if(!newBlocks.length){
    S.blocks=oldBlocks; save();
    alert('No se ha podido generar el plan. Revisa que haya suficientes alimentos seguros: al menos 1 verdura, 1 proteína y 1 fruta segura.');
    return;
  }
  S.blocks=[...S.blocks,...newBlocks].sort((a,b)=>a.startDate.localeCompare(b.startDate));
  save(); closeModal('modal-setup-plan'); renderPlan(); renderCalendario();
  if(!newBlocks.some(b=>b.newFood)){alert('Mes generado como mantenimiento: no quedaban alimentos nuevos/alérgenos pendientes para introducir.');}
}

function rebuildFutureAfterReaction(reactionDate,name){
  // Conserva todo lo anterior a la reacción y rehace el futuro para que el alimento no vuelva a aparecer.
  reactionDate=reactionDate||today();
  const future=S.blocks.filter(b=>String(b.endDate||'')>=reactionDate);
  if(!future.length)return {changed:false,rebuilt:0};
  const horizon=future.reduce((max,b)=>!max||String(b.endDate)>max?String(b.endDate):max,'');
  const past=S.blocks.filter(b=>String(b.endDate||'')<reactionDate);
  const oldBlocks=deepClone(S.blocks);
  const foodSnap=snapshotFoodState();
  let newBlocks=[];
  try{
    S.blocks=past;
    virtuallyPromoteIntroducedBefore(reactionDate);
    const count=Math.ceil((daysBetween(reactionDate,horizon)+1)/3);
    newBlocks=generateBlocks(reactionDate,count,horizon);
  }catch(err){
    console.error('Error regenerando futuro tras reacción',err);
    S.blocks=oldBlocks;
    return {changed:false,rebuilt:0,error:err};
  }finally{
    restoreFoodState(foodSnap);
  }
  S.blocks=[...past,...newBlocks].sort((a,b)=>a.startDate.localeCompare(b.startDate));
  return {changed:true,rebuilt:newBlocks.length,horizon};
}
function handleReactionAndRebuild(food,source='manual',date=today()){
  food=enrichFood(food);
  removeEverywhere(food.name);
  addReactionRecord(food,source,date);
  const result=rebuildFutureAfterReaction(date,food.name);
  save();
  return result;
}

function rebuildFromTodayIfNeeded(){/* no rehace automáticamente para no borrar histórico inesperadamente */}
function getDailyFruits(b,existing=[]){let pool=safeFruits(); const nf=enrichFood(b.newFood); if(nf&&nf.cat==='fruta'&&b.type==='allergen'&&!isSafe(nf.name))return [nf,nf,nf]; const counts=usageCounts(existing); const recent=recentUseMap(existing,6); const avoidNames=lastBlockFoodNames(existing); const needsHydrating=dedupe([...(b.foods||[]),...(b.newFood?[b.newFood]:[])]).some(f=>f&&f.dense); let res=[]; const used=new Set(); for(let i=0;i<3;i++){ if(i===0&&nf&&nf.cat==='fruta'){res.push(nf); used.add(nf.name); continue;} if(!pool.length)continue; let candidates=pool; if(needsHydrating){const hyd=pool.filter(f=>f&&f.hydrating); if(hyd.length)candidates=hyd;} const chosen=pickBalanced(candidates,used,counts,recent,{avoidNames,needsHydrating,preferHydrating:needsHydrating,avoidDense:false}); if(chosen){res.push(chosen); if(pool.length>=3)used.add(chosen.name);} }
 while(res.length<3&&pool.length){const chosen=pickBalanced(pool,new Set(res.filter(Boolean).map(f=>f.name)),counts,recent,{avoidNames,needsHydrating,preferHydrating:needsHydrating}); if(chosen)res.push(chosen); else res.push(pool[res.length%pool.length]);}
 return res.slice(0,3);}
function fruitForDate(b,ds){const idx=Math.max(0,Math.min(2,daysBetween(b.startDate,ds))); return (Array.isArray(b.dailyFruits)&&b.dailyFruits[idx])||getDailyFruits(b)[idx]||null;}
function checkBlockCompletions(){const tod=today(); let changed=false; S.blocks.forEach(b=>{if(!b.completed&&b.endDate<tod&&!b.reactionFood&&b.newFood){const n=b.newFood.name; removeEverywhere(n); resolveReaction(n); if(!isSafe(n))S.safeFoods.push(enrichFood(b.newFood)); b.completed=true; changed=true;}}); if(changed)save();}
function renderCurrentBlockCard(b){const dayNum=daysBetween(b.startDate,today())+1; const fruit=fruitForDate(b,today()); return `<div class="card" style="border:2px solid var(--accent)"><div class="mini-title">📍 Bloque actual — Día ${dayNum} de 3</div><div style="font-size:15px;font-weight:900;margin-bottom:5px">${b.type==='allergen'?'⚠️ Bloque alérgeno':'🔵 Bloque normal'}</div><div style="font-size:12px;color:var(--text3);font-weight:800;margin-bottom:12px">${formatDateRange(b.startDate,b.endDate)}</div><div class="mini-title">🍲 Mediodía</div><div class="block-foods">${(b.foods||[]).filter(Boolean).map(f=>`<span class="block-food-tag">${CAT_ICON[f.cat]||'🍽'} ${escapeHtml(f.name)}</span>`).join('')}${b.newFood&&b.newFood.cat!=='fruta'?`<span class="block-food-tag block-food-new">✨ ${escapeHtml(b.newFood.name)}</span>`:''}</div><div class="mini-title" style="margin-top:12px">🍎 Fruta de tarde</div><div class="block-foods">${fruit?`<span class="block-food-tag ${b.newFood&&fruit.name===b.newFood.name?'block-food-new':''}">${b.newFood&&fruit.name===b.newFood.name?'✨ ':''}${escapeHtml(fruit.name)}</span>`:'<span class="badge b-gray">Sin fruta segura</span>'}</div>${b.newFood?`<div class="info-box ${b.type==='allergen'?'info-amber':'info-blue'}" style="margin-top:12px;margin-bottom:0">Alimento nuevo: <strong>${escapeHtml(b.newFood.name)}</strong></div>`:''}<button class="btn btn-sm btn-danger" style="margin-top:12px;width:100%" onclick="openReactionForBlock(${b.id})">Registrar reacción</button></div>`;}
function blockManualSummary(b){
  const rows=[];
  dateRangeDays(b.startDate,b.endDate).forEach((ds,idx)=>{
    const ov=getDayOverride(ds);
    if(!ov||(!ov.deleted&&!ov.noEat&&!ov.fruitName&&!(ov.extraFoods||[]).length&&!(ov.removedNames||[]).length))return;
    const bits=[];
    if(ov.noEat||ov.deleted)bits.push('sin plan');
    if(ov.fruitName)bits.push('fruta: '+ov.fruitName);
    if((ov.extraFoods||[]).length)bits.push('+ '+(ov.extraFoods||[]).map(f=>f.name).join(', '));
    if((ov.removedNames||[]).length)bits.push('− '+(ov.removedNames||[]).join(', '));
    rows.push(`<span class="block-food-tag b-tag">Día ${parseDate(ds).getDate()} editado: ${escapeHtml(bits.join(' · '))}</span>`);
  });
  if(!rows.length && !b.manualNewFood)return '';
  const lock=b.manualNewFood&&b.newFood?`<span class="block-food-tag b-tag">🔒 nuevo manual: ${escapeHtml(b.newFood.name)}</span>`:'';
  return `<span style="flex-basis:100%;height:0"></span>${lock}${rows.join('')}`;
}
function blockSwapInlineHtml(b,role,idx,current){
  if(!BLOCK_SWAP||BLOCK_SWAP.id!==b.id||BLOCK_SWAP.role!==role||BLOCK_SWAP.idx!==idx)return '';
  const candidates=blockSwapCandidates(b,role,idx);
  if(!candidates.length)return `<div class="block-swap-inline"><span class="food-meta">No hay sustitutos compatibles</span></div>`;
  return `<div class="block-swap-inline">${candidates.map(f=>`<button type="button" class="block-swap-option" onclick="event.stopPropagation();applyBlockFoodSwap(${b.id},'${role}',${idx},${escapeAttr(jsStr(f.name))})">${CAT_ICON[f.cat]||''} ${escapeHtml(f.name)}</button>`).join('')}</div>`;
}
function blockFoodTagHtml(b,f,role,idx,extraClass=''){
  if(!f)return '';
  const label=role==='fruit'?`Día ${parseDate(addDays(b.startDate,idx)).getDate()}: 🍎 ${b.newFood&&f.name===b.newFood.name?'✨ ':''}${escapeHtml(f.name)}`:`${role==='new'?'✨ ':''}${CAT_ICON[f.cat]||'🍽'} ${escapeHtml(f.name)}`;
  return `<span class="block-food-edit-wrap"><button type="button" class="block-food-tag block-food-edit ${extraClass}" onclick="event.stopPropagation();openBlockFoodSwap(${b.id},'${role}',${idx})">${label}</button>${blockSwapInlineHtml(b,role,idx,f)}</span>`;
}
function foodTagsForBlock(b){
  const lunch=(b.foods||[]).filter(Boolean).map((f,i)=>blockFoodTagHtml(b,f,'food',i,(b.newFood&&f.name===b.newFood.name?'block-food-new':''))).join('');
  const nf=b.newFood&&b.newFood.cat!=='fruta'?blockFoodTagHtml(b,b.newFood,'new',0,'block-food-new'):'';
  const fruits=getDailyFruits(b).map((f,i)=>blockFoodTagHtml(b,f,'fruit',i,(b.newFood&&f.name===b.newFood.name?'block-food-new':''))).join('');
  return `${lunch}${nf}<span style="flex-basis:100%;height:0"></span>${fruits}${blockManualSummary(b)}`;
}
function renderPlan(){checkBlockCompletions(); const el=document.getElementById('plan-content'); if(!S.blocks.length){el.innerHTML=`${renderShoppingList()}<div class="card" style="text-align:center;padding:24px"><div style="font-size:40px;margin-bottom:12px">📋</div><div style="font-size:16px;font-weight:900;margin-bottom:6px">Sin plan generado</div><div style="font-size:13px;color:var(--text3);margin-bottom:8px">${ageText()}</div><button class="btn btn-primary btn-full" onclick="openModal('modal-setup-plan')">Generar plan mensual</button></div>`;return;} const tod=today(); let html=renderShoppingList(); html+=renderMilestone(); html+=`<div style="display:flex;justify-content:space-between;align-items:center;margin:16px 0 8px"><div class="section-title" style="margin:0">Todos los bloques</div><button class="btn btn-sm btn-primary" onclick="openModal('modal-setup-plan')">Generar / rehacer mes</button></div>`; S.blocks.forEach(b=>{const isPast=b.endDate<tod,isCur=b.startDate<=tod&&b.endDate>=tod; html+=`<div class="block-card ${b.type==='allergen'?'block-allergen':'block-normal'}" onclick="openBlockDetail(${b.id})" style="${isPast?'opacity:.75':''}"><div class="block-title">${b.type==='allergen'?'⚠️ Bloque alérgeno':'🔵 Bloque normal'} ${isPast?'<span class="badge b-gray">Completado</span>':isCur?'<span class="badge b-safe">Actual</span>':''}</div><div class="block-dates">📅 ${formatDateRange(b.startDate,b.endDate)}</div><div class="block-foods">${foodTagsForBlock(b)}</div>${b.reactionFood?`<div style="margin-top:8px"><span class="badge b-reaction">Reacción: ${escapeHtml(b.reactionFood)}</span></div>`:''}</div>`;}); el.innerHTML=html;}
function renderMilestone(){return pendingAllergens().length?'':`<div class="card"><div class="card-title">🏁 Alérgenos completados</div><div class="info-box info-green">Has pasado por toda la lista de alérgenos pendientes. A partir de ahora el plan continuará con bloques normales.</div></div>`;}
function openBlockDetail(id){
  const b=S.blocks.find(x=>x.id===id); if(!b)return;
  const title=b.type==='allergen'?'⚠️ Bloque alérgeno':'🔵 Bloque normal';
  document.getElementById('block-detail-title').innerHTML='';
  document.getElementById('block-detail-content').innerHTML=`<div class="block-title-line"><div class="modal-title">${title}</div><button class="btn btn-sm btn-primary save-icon-btn" title="Guardar bloque" onclick="saveManualBlock(${b.id})">💾</button></div>
  <div class="info-box ${b.type==='allergen'?'info-amber':'info-blue'}">${formatDateRange(b.startDate,b.endDate)}</div>
  <div class="mini-title">Alimentos del bloque</div>
  <div class="block-foods">${foodTagsForBlock(b)}</div>
  ${b.reactionFood?`<div class="info-box info-red" style="margin-top:10px">Reacción: <b>${escapeHtml(b.reactionFood)}</b></div>`:''}
  <div class="divider"></div>
  <button class="btn btn-full" onclick="remakeBlock(${b.id})">Rehacer solo este bloque</button>
  <button class="btn btn-full btn-danger" onclick="deleteBlock(${b.id})">Eliminar bloque</button>
  <button class="btn btn-full btn-danger" style="margin-top:12px" onclick="openReactionForBlock(${b.id})">Registrar reacción</button>`;
  openModal('modal-block-detail');
}
function openReactionForBlock(id){const b=S.blocks.find(x=>x.id===id); if(!b)return; const foods=dedupe([...(b.foods||[]),...(b.newFood?[b.newFood]:[]),...getDailyFruits(b)]); document.getElementById('block-detail-title').textContent='🚫 Registrar reacción'; document.getElementById('block-detail-content').innerHTML=`<div class="info-box info-red">¿Con qué alimento hubo reacción?</div><select id="reaction-block-food" style="margin-bottom:12px"><option value="">Selecciona...</option>${foods.map(f=>`<option value="${escapeHtml(f.name)}">${escapeHtml(f.name)}</option>`).join('')}</select><button class="btn btn-full btn-danger" onclick="confirmBlockReaction(${id})">Confirmar reacción</button>`; openModal('modal-block-detail');}
function confirmBlockReaction(id){const name=document.getElementById('reaction-block-food').value; if(!name){alert('Selecciona un alimento');return;} const b=S.blocks.find(x=>x.id===id); if(!b)return; const food=allFoods().find(f=>f.name===name)||b.foods.find(f=>f.name===name)||b.newFood||{name,cat:'verdura'}; const reactionDate=(b.startDate<=today()&&b.endDate>=today())?today():b.startDate; b.reactionFood=name; const res=handleReactionAndRebuild(food,'bloque',reactionDate); closeModal('modal-block-detail'); renderPlan(); renderCalendario(); renderAlimentos(); if(res.changed)alert('Reacción registrada. He rehecho el plan futuro desde '+formatShortDate(reactionDate)+' y he mantenido intacto el pasado.');}
function weekRange(offset=0){const d=parseDate(today()); const day=d.getDay()||7; d.setDate(d.getDate()-day+1+offset*7); const start=fmtDate(d); d.setDate(d.getDate()+6); return {start,end:fmtDate(d)};}
function setShoppingWeek(delta){S.shoppingWeekOffset=(S.shoppingWeekOffset||0)+delta; save(); renderPlan();}
function renderShoppingList(){const w=weekRange(S.shoppingWeekOffset||0); const foods=[]; for(let ds=w.start;ds<=w.end;ds=addDays(ds,1)){const b=findBlockForDate(ds); if(b&&!isDayDeleted(ds)){foods.push(...getFoodsForDate(b,ds)); const fr=getFruitForDateEffective(b,ds); if(fr)foods.push(fr);}} const uniq=dedupe(foods); const groups={verdura:[],cereal:[],proteina:[],fruta:[]}; uniq.forEach(f=>(groups[f.cat]||groups.verdura).push(f.name)); let body=''; ['verdura','cereal','proteina','fruta'].forEach(cat=>{if(groups[cat].length)body+=`<div class="cat-header">${CAT_ICON[cat]} <span>${CAT_LABEL[cat]}</span></div><div style="font-size:13px;color:var(--text2);line-height:1.7;margin-bottom:6px">${groups[cat].sort().join(', ')}</div>`;}); if(!body)body='<div class="empty">No hay alimentos programados esta semana</div>'; return `<div class="card"><div class="card-title">🛒 Lista de compra semanal</div><div class="cal-nav" style="margin-bottom:8px"><button class="btn btn-sm" onclick="setShoppingWeek(-1)">← Semana</button><span style="font-size:12px;font-weight:900;color:var(--text2)">${formatDateRange(w.start,w.end)}</span><button class="btn btn-sm" onclick="setShoppingWeek(1)">Semana →</button></div>${body}</div>`;}
function renderCalendario(){checkBlockCompletions(); const y=calViewDate.getFullYear(),m=calViewDate.getMonth(); document.getElementById('cal-month-label').textContent=MONTHS[m]+' '+y; document.getElementById('cal-headers').innerHTML=DAYS_SHORT.map(d=>`<div class="cal-dh">${d}</div>`).join(''); const first=new Date(y,m,1).getDay(); const offset=first===0?6:first-1; const days=new Date(y,m+1,0).getDate(); let cells=''; for(let i=0;i<offset;i++)cells+='<div class="cal-cell c-empty"></div>'; for(let d=1;d<=days;d++){const ds=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`; const b=findBlockForDate(ds); let cls='cal-cell'; if(ds===today())cls+=' today'; if(ds<today())cls+=' c-past'; if(isDayDeleted(ds))cls+=' c-empty'; else if(b?.reactionFood)cls+=' c-reaction'; else if(b?.type==='allergen')cls+=' c-allergen'; else if(b?.type==='normal')cls+=' c-normal'; const lab=isDayDeleted(ds)?'<div class="ctype">OFF</div>':(b?`<div class="ctype">${b.type==='allergen'?'ALG':'NOR'}</div>`:''); cells+=`<div class="${cls}" onclick="openDayModal('${ds}')"><span class="cnum">${d}</span>${lab}</div>`;} document.getElementById('cal-cells').innerHTML=cells;}
function changeMonth(dir){calViewDate.setMonth(calViewDate.getMonth()+dir); renderCalendario();}
function openDayModal(ds){
  const d=parseDate(ds); const b=findBlockForDate(ds); const ov=getDayOverride(ds);
  document.getElementById('modal-day-title').textContent=`${d.getDate()} de ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  let html='';
  if(b&&!isDayDeleted(ds)){
    const fr=getFruitForDateEffective(b,ds);
    const lunch=getFoodsForDate(b,ds);
    html+=`<div class="info-box ${b.type==='allergen'?'info-amber':'info-blue'}">${b.type==='allergen'?'⚠️ Bloque alérgeno':'🔵 Bloque normal'} · Día ${daysBetween(b.startDate,ds)+1} de 3</div><div class="mini-title">🍲 Mediodía</div><div class="block-foods">${lunch.map(f=>`<span class="block-food-tag ${b.newFood&&f.name===b.newFood.name?'block-food-new':''}">${b.newFood&&f.name===b.newFood.name?'✨ ':''}${CAT_ICON[f.cat]||'🍽'} ${escapeHtml(f.name)}</span>`).join('')||'<span class="badge b-gray">Sin alimentos</span>'}</div><div class="mini-title" style="margin-top:12px">🍎 Fruta tarde</div><div class="block-foods">${fr?`<span class="block-food-tag ${b.newFood&&fr.name===b.newFood.name?'block-food-new':''}">${b.newFood&&fr.name===b.newFood.name?'✨ ':''}${escapeHtml(fr.name)}</span>`:'Sin fruta'}</div>`;
    if(b.reactionFood)html+=`<div class="info-box info-red" style="margin-top:10px">Reacción: <b>${escapeHtml(b.reactionFood)}</b></div>`;
    const safeNonFruit=sortFoodsAZ(S.safeFoods.filter(f=>f.cat!=='fruta'&&!lunch.some(x=>x.name===f.name)));
    const removable=lunch;
    const fruits=sortFoodsAZ(S.safeFoods.filter(f=>f.cat==='fruta'));
    html+=`<div class="divider"></div><div class="section-title">✏️ Editar día</div>
      <div class="field"><div class="field-label">Cambiar fruta</div><select id="edit-day-fruit"><option value="">Mantener fruta actual</option>${fruits.map(f=>`<option value="${escapeAttr(f.name)}" ${fr&&fr.name===f.name?'selected':''}>${escapeHtml(f.name)}</option>`).join('')}</select></div><button class="btn btn-full" onclick="saveDayFruit('${ds}')">Guardar fruta</button>
      <div class="field"><div class="field-label">Añadir alimento al mediodía</div><select id="edit-day-add"><option value="">Selecciona...</option>${safeNonFruit.map(f=>`<option value="${escapeAttr(f.name)}">${escapeHtml(f.name)}</option>`).join('')}</select></div><button class="btn btn-full" onclick="addFoodToDay('${ds}')">Añadir alimento</button>
      <div class="field"><div class="field-label">Quitar alimento solo este día</div><select id="edit-day-remove"><option value="">Selecciona...</option>${removable.map(f=>`<option value="${escapeAttr(f.name)}">${escapeHtml(f.name)}</option>`).join('')}</select></div><button class="btn btn-full" onclick="removeFoodFromDay('${ds}')">Quitar alimento</button>
      <button class="btn btn-full btn-danger" onclick="markNoEatDay('${ds}')">Marcar día como no comió / sin plan</button>
      <button class="btn btn-full" onclick="regenerateFromDateManual('${ds}')">Regenerar desde este día</button>`;
  } else if(b&&isDayDeleted(ds)){
    html+=`<div class="empty">Este día está marcado como sin plan / no comió.</div><button class="btn btn-full btn-primary" onclick="restoreDay('${ds}')">Restaurar día</button><button class="btn btn-full" onclick="regenerateFromDateManual('${ds}')">Regenerar desde este día</button>`;
  } else {
    html='<div class="empty">No hay bloque programado para este día</div><button class="btn btn-full btn-primary" onclick="fillBlockAtDate(\''+ds+'\')">Generar bloque aquí</button><button class="btn btn-full" onclick="regenerateFromDateManual(\''+ds+'\')">Generar desde este día</button>';
  }
  const note=S.calNotes[ds]||''; html+=`<div class="divider"></div><div class="field-label">Nota del día</div><textarea id="day-note" rows="2" style="resize:none;margin-top:5px;margin-bottom:10px">${escapeHtml(note)}</textarea><button class="btn btn-full btn-primary" onclick="saveNote('${ds}')">Guardar nota</button>`;
  document.getElementById('modal-day-content').innerHTML=html; openModal('modal-day');
}
function saveNote(ds){const note=document.getElementById('day-note').value.trim(); if(note)S.calNotes[ds]=note; else delete S.calNotes[ds]; save(); closeModal('modal-day'); renderCalendario();}
function openReportModal(){document.getElementById('report-start').value=fmtDate(new Date(calViewDate.getFullYear(),calViewDate.getMonth(),1)); document.getElementById('report-end').value=fmtDate(new Date(calViewDate.getFullYear(),calViewDate.getMonth()+1,0)); document.getElementById('report-output').innerHTML=''; openModal('modal-report');}
function countMapAdd(map,key,n=1){map[key]=(map[key]||0)+n;}
function generateDateReport(){
  const start=document.getElementById('report-start').value,end=document.getElementById('report-end').value;
  if(!start||!end||end<start){alert('Elige un rango válido');return;}
  const foodCounts={},catCounts={verdura:0,cereal:0,proteina:0,fruta:0},ironCounts={},latexCounts={},newIntro=[],allergens=[],reactions=[];
  let normal=0, allergen=0; const considered=new Set();
  const reactionSeen=new Set();
  const addReactionLine=(name,date,status)=>{
    if(!name)return;
    const key=name+'|'+date;
    if(reactionSeen.has(key))return;
    reactionSeen.add(key);
    reactions.push(`- ${name}: ${formatShortDate(date)}${status&&status!=='active'?` (${status==='resolved'?'resuelta':'historial'})`:''}`);
  };
  for(let ds=start;ds<=end;ds=addDays(ds,1)){
    const b=S.blocks.find(x=>x.startDate<=ds&&x.endDate>=ds);
    if(!b)continue;
    if(!considered.has(b.id)){
      considered.add(b.id);
      if(b.type==='allergen')allergen++; else normal++;
      if(b.newFood)newIntro.push(`- ${b.newFood.name}: ${formatShortDate(b.startDate)} (${b.type==='allergen'?'alérgeno':'normal'})`);
      if(b.type==='allergen'&&b.newFood)allergens.push(`- ${b.newFood.name}: ${b.reactionFood===b.newFood.name?'con reacción':'sin reacción registrada'} (${formatDateRange(b.startDate,b.endDate)})`);
      if(b.reactionFood)addReactionLine(b.reactionFood,b.startDate,'active');
    }
    const foods=[...(b.foods||[])];
    if(b.newFood&&b.newFood.cat!=='fruta')foods.push(b.newFood);
    const fr=fruitForDate(b,ds); if(fr)foods.push(fr);
    dedupe(foods).filter(Boolean).forEach(f=>{countMapAdd(foodCounts,f.name); countMapAdd(catCounts,f.cat); if(f.iron)countMapAdd(ironCounts,f.name); if(f.latex)countMapAdd(latexCounts,f.name);});
  }
  // Las reacciones son eventos propios. Se incluyen aunque el bloque original haya sido regenerado.
  (S.reactionHistory||[]).forEach(r=>{
    if(r&&r.date>=start&&r.date<=end)addReactionLine(r.name,r.date,r.status||'active');
  });
  reactions.sort((a,b)=>a.localeCompare(b,'es'));
  const fmtCounts=obj=>Object.entries(obj).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],'es')).map(([k,v])=>`- ${k}: ${v}`).join('\n')||'- Sin datos';
  lastReportText=`RESUMEN ${formatShortDate(start)} — ${formatShortDate(end)}\n\nDÍAS ANALIZADOS\n${daysBetween(start,end)+1}\n\nBLOQUES\n- Normales: ${normal}\n- Alérgenos: ${allergen}\n\nALIMENTOS CONSUMIDOS\n${fmtCounts(foodCounts)}\n\nALIMENTOS NUEVOS INTRODUCIDOS\n${newIntro.join('\n')||'- Sin datos'}\n\nALÉRGENOS PROBADOS\n${allergens.join('\n')||'- Sin datos'}\n\nREACCIONES\n${reactions.join('\n')||'- Sin reacciones registradas'}\n\nCATEGORÍAS\n- Verduras/hortalizas/tubérculos: ${catCounts.verdura||0}\n- Cereales: ${catCounts.cereal||0}\n- Proteínas: ${catCounts.proteina||0}\n- Frutas: ${catCounts.fruta||0}\n\nALIMENTOS CON HIERRO\n${fmtCounts(ironCounts)}\n\nALIMENTOS CON LÁTEX\n${fmtCounts(latexCounts)}`;
  document.getElementById('report-output').innerHTML=`<div class="report-box">${escapeHtml(lastReportText)}</div>`;
}
function copyReport(){if(!lastReportText){alert('Genera primero el resumen');return;} navigator.clipboard?.writeText(lastReportText).then(()=>alert('Resumen copiado')).catch(()=>alert('No se pudo copiar automáticamente. Selecciona el texto manualmente.'));}
function renderGuia(){document.getElementById('guia-content').innerHTML=`<div class="card"><div class="card-title">📘 Guía de alimentación complementaria</div>${guide('👶 Antes de los 6 meses','<p>La alimentación principal debe ser leche materna o fórmula infantil.</p><div class="info-box info-amber">Antes de los 6 meses, la alimentación complementaria solo debería iniciarse por indicación del pediatra.</div><ul><li>No iniciar sólidos por decisión propia antes de tiempo.</li><li>No sustituir tomas de leche por comida.</li><li>Si hay indicación médica, seguir la pauta concreta del pediatra.</li></ul>')}${guide('🥣 6–8 meses','<p>Etapa inicial de alimentación complementaria.</p><ul><li>Introducir alimentos poco a poco.</li><li>Probar un alimento nuevo durante varios días.</li><li>Priorizar alimentos ricos en hierro.</li><li>No añadir sal, azúcar ni edulcorantes.</li><li>La leche sigue siendo el alimento principal.</li><li>Respetar hambre y saciedad: no forzar cantidades.</li></ul>')}${guide('🧀 9–11 meses','<ul><li>Yogur natural sin azúcar: desde 9–10 meses.</li><li>Queso tierno: desde 9–10 meses.</li><li>La leche materna o fórmula sigue siendo prioritaria.</li></ul><div class="info-box info-amber">La leche de vaca entera como bebida principal debe esperar hasta los 12 meses.</div>')}${guide('🥛 12 meses o más','<ul><li>Puede introducirse leche de vaca entera.</li><li>Puede ir comiendo cada vez más parecido al resto de la familia.</li><li>Seguir evitando sal y azúcar añadidos.</li><li>Evitar alimentos duros o con riesgo de atragantamiento.</li></ul>')}${guide('⚠️ Alimentos a evitar o vigilar','<p><b>No recomendados:</b></p><ul><li>Sal añadida.</li><li>Azúcar añadido.</li><li>Miel antes de los 12 meses.</li><li>Zumos si puede tomar fruta entera.</li><li>Bollería, galletas, cacao, embutidos y ultraprocesados.</li></ul><p><b>Verduras con nitratos:</b> espinaca, acelga y borraja. En BabyFood se excluyen del pool durante el primer año para evitar riesgos.</p><p><b>Riesgo de atragantamiento:</b> frutos secos enteros, uvas enteras, palomitas, zanahoria cruda, manzana cruda y salchichas en rodajas.</p>')}${guide('🥜 Alérgenos','<ul><li>Introducir de uno en uno.</li><li>Observar varios días antes de introducir otro alimento nuevo.</li><li>Seguir la pauta indicada por el pediatra.</li><li>Si hay reacción, registrar el alimento y consultar con profesionales sanitarios.</li></ul><div class="info-box info-amber">En esta app los alérgenos se trabajan en bloques específicos de 3 días.</div>')}${guide('🏷️ Etiquetas de alimentos','<ul><li><b>Hierro:</b> alimentos interesantes para priorizar en el plan.</li><li><b>Látex:</b> alimentos que conviene tener identificados si existe sensibilidad o alergia relacionada.</li><li><b>Denso:</b> alimentos que pueden compactar la receta si se combinan entre sí.</li><li><b>Agua:</b> alimentos hidratantes que ayudan a equilibrar recetas densas.</li></ul>')}${guide('🚨 Qué hacer en caso de atragantamiento','<p><b>Si el bebé tose o llora:</b></p><ul><li>Está respirando: deja que tosa.</li><li>No metas los dedos en la boca.</li><li>No le des agua.</li></ul><p><b>Si no puede respirar, no tose o se pone morado:</b></p><ul><li>Coloca al bebé boca abajo sobre tu antebrazo, con la cabeza más baja que el cuerpo.</li><li>Da 5 golpes firmes en la espalda, entre los omóplatos.</li><li>Gíralo boca arriba.</li><li>Da 5 compresiones torácicas con dos dedos en el centro del pecho.</li><li>Repite: 5 golpes en espalda → 5 compresiones en pecho.</li></ul><div class="info-box info-red">Si pierde la consciencia: llama al 112 inmediatamente e inicia RCP si sabes realizarla.</div><p><b>Nunca hacer:</b></p><ul><li>No meter dedos a ciegas.</li><li>No sacudir al bebé.</li><li>No darle líquidos.</li></ul>')}${guide('🧠 Consejos generales','<ul><li>El bebé decide cuánto come.</li><li>No obligar, presionar ni premiar con comida.</li><li>Comer siempre sentado y supervisado.</li><li>Evitar pantallas durante la comida.</li><li>Ofrecer variedad, aunque al principio rechace algunos alimentos.</li><li>La exposición repetida ayuda a aceptar nuevos sabores.</li></ul>')}</div>`;}
function guide(title,content){return `<div class="guide-item"><button class="guide-btn" onclick="toggleGuide(this)">${title}</button><div class="guide-content">${content}</div></div>`;}
function toggleGuide(btn){const c=btn.nextElementSibling; const open=c.style.display==='block'; document.querySelectorAll('.guide-content').forEach(x=>x.style.display='none'); c.style.display=open?'none':'block';}
function renderAjustes(){document.getElementById('settings-birthdate').value=S.babyBirthDate||'';}
function saveBirthDateFromSettings(){S.babyBirthDate=document.getElementById('settings-birthdate').value||null; S.birthDateSkipped=false; save(); updateHeader(); renderAlimentos(); autoPromptDairyUnlock(); alert('Fecha guardada');}
function saveBabyBirthDate(){const v=document.getElementById('baby-birthdate').value; if(!v){alert('Elige una fecha');return;} S.babyBirthDate=v; S.birthDateSkipped=false; save(); closeModal('modal-birthdate'); updateHeader(); renderAlimentos(); autoPromptDairyUnlock();}
function skipBirthDateSetup(){S.birthDateSkipped=true; save(); closeModal('modal-birthdate');}
function maybeOpenBirthModal(){if(!S.babyBirthDate&&!S.birthDateSkipped)setTimeout(()=>openModal('modal-birthdate'),300);}
function updateHeader(){document.getElementById('header-chip').textContent=`${S.safeFoods.length} seguros`; document.getElementById('age-sub').textContent=ageText();}
function clearPlanCalendar(){if(!confirm('¿Borrar TODO el plan y calendario? Se mantendrán los alimentos.'))return; if(!confirm('¿Seguro? Esta acción no se puede deshacer.'))return; S.blocks=[]; S.calNotes={}; S.testing=[]; save(); renderPlan(); renderCalendario(); alert('Plan y calendario borrados.');}
function resetAllData(){if(!confirm('¿Borrar TODOS los datos?'))return; if(!confirm('¿Seguro? Se perderán alimentos, plan y notas.'))return; S=deepClone(INITIAL_STATE); save(); renderAlimentos(); showScreen('alimentos');}
function exportData(){const blob=new Blob([JSON.stringify(S,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`babyfood-backup-${today().replace(/-/g,'')}.json`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);}
function importData(input){const file=input.files[0]; if(!file)return; if(!confirm('¿Importar este archivo? Reemplazará los datos actuales.')){input.value='';return;} const r=new FileReader(); r.onload=e=>{try{S={...deepClone(INITIAL_STATE),...JSON.parse(e.target.result)}; ensureState(); save(); updateHeader(); renderAlimentos(); renderPlan(); renderCalendario(); renderAjustes(); alert('Datos importados');}catch(err){alert('Archivo no válido');} input.value='';}; r.readAsText(file);}

// Exponer funciones para onclick en todos los navegadores

function saveDayFruit(ds){const name=document.getElementById('edit-day-fruit')?.value||''; const ov=getDayOverride(ds); if(name)ov.fruitName=name; else delete ov.fruitName; setDayOverride(ds,ov); save(); openDayModal(ds); renderCalendario(); renderPlan();}
function addFoodToDay(ds){const name=document.getElementById('edit-day-add')?.value||''; if(!name){alert('Selecciona un alimento');return;} const f=S.safeFoods.find(x=>x.name===name); if(!f)return; const ov=getDayOverride(ds); ov.extraFoods=dedupe([...(ov.extraFoods||[]),f]); setDayOverride(ds,ov); save(); openDayModal(ds); renderPlan(); renderCalendario();}
function removeFoodFromDay(ds){const name=document.getElementById('edit-day-remove')?.value||''; if(!name){alert('Selecciona un alimento');return;} const ov=getDayOverride(ds); ov.removedNames=[...new Set([...(ov.removedNames||[]),name])]; ov.extraFoods=(ov.extraFoods||[]).filter(f=>f.name!==name); setDayOverride(ds,ov); save(); openDayModal(ds); renderPlan(); renderCalendario();}
function markNoEatDay(ds){if(!confirm('¿Marcar este día como sin plan / no comió?'))return; const ov=getDayOverride(ds); ov.noEat=true; ov.deleted=true; setDayOverride(ds,ov); save(); closeModal('modal-day'); renderCalendario(); renderPlan();}
function restoreDay(ds){const ov=getDayOverride(ds); delete ov.noEat; delete ov.deleted; setDayOverride(ds,ov); save(); openDayModal(ds); renderCalendario(); renderPlan();}
function findGapAroundDate(ds){
  let start=ds,end=ds;
  while(!findBlockForDate(addDays(start,-1))) {
    const prev=addDays(start,-1);
    const sameMonth=parseDate(prev).getMonth()===parseDate(ds).getMonth()&&parseDate(prev).getFullYear()===parseDate(ds).getFullYear();
    if(!sameMonth)break; start=prev;
  }
  while(!findBlockForDate(addDays(end,1))) {
    const next=addDays(end,1);
    const sameMonth=parseDate(next).getMonth()===parseDate(ds).getMonth()&&parseDate(next).getFullYear()===parseDate(ds).getFullYear();
    if(!sameMonth)break; end=next;
  }
  return {start,end,days:daysBetween(start,end)+1};
}
function fillBlockAtDate(ds){
  if(findBlockForDate(ds)){alert('Ese día ya pertenece a un bloque.');return;}
  const gap=findGapAroundDate(ds);
  if(gap.days<3){alert('No hay 3 días libres consecutivos para generar un bloque completo.');return;}
  const blocksToMake=Math.floor(gap.days/3);
  const snap=snapshotFoodState(); let nb=[];
  try{virtuallyPromoteIntroducedBefore(gap.start); nb=generateBlocks(gap.start,blocksToMake,addDays(gap.start,blocksToMake*3-1));}
  catch(e){console.error(e); alert('No se pudo generar bloque: '+(e.message||e));}
  finally{restoreFoodState(snap);}
  if(!nb.length){alert('No se pudo generar bloque.');return;}
  S.blocks=[...S.blocks,...nb].sort((a,b)=>a.startDate.localeCompare(b.startDate)); save(); closeModal('modal-day'); renderCalendario(); renderPlan();
}
function deleteBlock(id){const b=S.blocks.find(x=>x.id===id); if(!b)return; if(!confirm('¿Eliminar este bloque? Quedará un hueco en el calendario.'))return; S.blocks=S.blocks.filter(x=>x.id!==id); dateRangeDays(b.startDate,b.endDate).forEach(ds=>delete (S.dayOverrides||{})[ds]); save(); closeModal('modal-block-detail'); renderCalendario(); renderPlan();}
function collectManualFixedFoods(b){
  const fixed=[];
  (b.manualFixedFoods||[]).forEach(n=>{const f=(b.foods||[]).find(x=>x&&x.name===n)||S.safeFoods.find(x=>x.name===n); if(f)fixed.push(enrichFood(f));});
  return dedupe(fixed);
}
function applyFixedFoodsToLunch(lunch,fixed){
  lunch=dedupe(lunch||[]); fixed=dedupe(fixed||[]);
  fixed.forEach(ff=>{
    if(lunch.some(x=>x.name===ff.name))return;
    const idx=lunch.findIndex(x=>x&&x.cat===ff.cat&&!fixed.some(k=>k.name===x.name));
    if(idx>=0)lunch[idx]=ff;
    else if(lunch.length<3)lunch.push(ff);
  });
  return dedupe(lunch).slice(0,3);
}
function remakeBlock(id){
  const b=S.blocks.find(x=>x.id===id); if(!b)return;
  const old=deepClone(S.blocks); const snap=snapshotFoodState(); let nb=[];
  try{
    b.remakeNonce=(b.remakeNonce||0)+1;
    b.remakeHistory=Array.isArray(b.remakeHistory)?b.remakeHistory:[];
    const base=S.blocks.filter(x=>x.id!==id);
    S.blocks=base;
    virtuallyPromoteIntroducedBefore(b.startDate);
    const fakeOld={...b,id:Date.now()+Math.random(),startDate:addDays(b.startDate,-3),endDate:addDays(b.startDate,-1)};
    const historyBlocks=(b.remakeHistory||[]).slice(-6).map((names,hidx)=>({id:Date.now()+hidx+99,startDate:addDays(b.startDate,-6-hidx*3),endDate:addDays(b.startDate,-4-hidx*3),foods:names.map(n=>S.safeFoods.find(f=>f.name===n)).filter(Boolean),dailyFruits:[],newFood:null}));
    const context=[...S.blocks,...historyBlocks,fakeOld];
    const fixed=collectManualFixedFoods(b);
    if(b.manualNewFood&&b.newFood){
      const preserved=enrichFood(b.newFood);
      let lunch=buildLunchFromSafe(context,preserved);
      if(!lunch)throw new Error('No hay suficientes alimentos seguros para rehacer el bloque manteniendo el alimento nuevo.');
      lunch=applyFixedFoodsToLunch(lunch,fixed);
      const rebuilt={...b, foods:lunch, newFood:preserved, completed:false, reactionFood:null, manualNewFood:true, manualFixedFoods:fixed.map(f=>f.name), manualSaved:false};
      rebuilt.dailyFruits=getDailyFruits(rebuilt,context);
      nb=[rebuilt];
    }else{
      const used=getUsedNewFoodsAll();
      if(b.newFood)used.add(b.newFood.name);
      const rec=buildRecipe(b.type,context,used)||buildSafeOnlyRecipe(context);
      if(!rec)throw new Error('No se pudo construir una receta alternativa.');
      let lunch=applyFixedFoodsToLunch(rec.foods,fixed);
      const rebuilt={...b, foods:lunch, newFood:rec.newFood||null, completed:false, reactionFood:null, manualNewFood:false, manualFixedFoods:fixed.map(f=>f.name), manualSaved:false};
      rebuilt.dailyFruits=getDailyFruits(rebuilt,context);
      nb=[rebuilt];
    }
  }catch(e){console.error(e); alert('No se pudo rehacer el bloque: '+(e.message||e)); S.blocks=old; nb=[];}
  finally{restoreFoodState(snap);}
  if(nb.length){const generatedNames=dedupe([...(nb[0].foods||[]),...(nb[0].newFood?[nb[0].newFood]:[]),...(nb[0].dailyFruits||[])]).map(f=>f.name); nb[0].remakeHistory=[...((b.remakeHistory||[]).slice(-8)),generatedNames]; S.blocks=[...S.blocks.filter(x=>x.id!==id),...nb].sort((a,b)=>a.startDate.localeCompare(b.startDate)); dateRangeDays(b.startDate,b.endDate).forEach(ds=>delete (S.dayOverrides||{})[ds]); save(); renderCalendario(); renderPlan(); openBlockDetail(id);}
}
function blockSwapCandidates(b,role,idx){
  if(role==='new'){
    const current=b.newFood;
    const pool=b.type==='allergen'?orderAllergens(pendingAllergens()):normalPendingFoods();
    return dedupe(pool).filter(f=>f&&(!current||f.cat===current.cat)&&(!current||f.name!==current.name));
  }
  if(role==='fruit'){
    const current=fruitForDate(b,addDays(b.startDate,idx));
    return safeFruits().filter(f=>!current||f.name!==current.name);
  }
  const current=(b.foods||[])[idx];
  return S.safeFoods.filter(f=>f&&current&&f.cat===current.cat&&f.name!==current.name);
}
function openBlockFoodSwap(id,role,idx){
  BLOCK_SWAP=(BLOCK_SWAP&&BLOCK_SWAP.id===id&&BLOCK_SWAP.role===role&&BLOCK_SWAP.idx===idx)?null:{id,role,idx};
  openBlockDetail(id);
}
function applyBlockFoodSwap(id,role,idx,name){
  const b=S.blocks.find(x=>x.id===id); if(!b)return;
  name=name||'';
  if(!name)return;
  const candidates=blockSwapCandidates(b,role,idx);
  const f=candidates.find(x=>x.name===name);
  if(!f){alert('Alimento no compatible.');return;}
  if(role==='new'){
    b.newFood=enrichFood(f); b.manualNewFood=true;
  }else if(role==='fruit'){
    b.dailyFruits=Array.isArray(b.dailyFruits)?b.dailyFruits:getDailyFruits(b);
    b.dailyFruits[idx]=enrichFood(f);
  }else{
    b.foods=b.foods||[]; b.foods[idx]=enrichFood(f);
    b.manualFixedFoods=[...new Set([...(b.manualFixedFoods||[]),f.name])];
  }
  b.manualSaved=false;
  BLOCK_SWAP=null;
  dateRangeDays(b.startDate,b.endDate).forEach(ds=>delete (S.dayOverrides||{})[ds]);
  save(); renderPlan(); renderCalendario(); openBlockDetail(id);
}

function closeBlockSwapIfOpen(){
  if(!BLOCK_SWAP)return;
  const id=BLOCK_SWAP.id;
  BLOCK_SWAP=null;
  if(document.getElementById('modal-block-detail')?.classList.contains('open')) openBlockDetail(id);
}
function saveManualBlock(id){
  const b=S.blocks.find(x=>x.id===id); if(!b)return;
  b.manualSaved=true;
  b.manualFixedFoods=dedupe([...(b.manualFixedFoods||[]).map(n=>({name:n})),...(b.foods||[]).filter(f=>f&&f.name&&b.manualFixedFoods&&b.manualFixedFoods.includes(f.name))]).map(f=>f.name);
  save(); renderPlan(); renderCalendario(); closeModal('modal-block-detail');
}
function changeBlockNewFood(id){
  const b=S.blocks.find(x=>x.id===id); const name=document.getElementById('edit-block-new')?.value||'';
  if(!b||!name){alert('Selecciona un alimento');return;}
  const f=allFoods().find(x=>x.name===name); if(!f)return;
  const preserved=enrichFood(f);
  const context=S.blocks.filter(x=>x.id!==id);
  const lunch=buildLunchFromSafe([...context,b],preserved);
  if(lunch) b.foods=lunch;
  b.newFood=preserved;
  b.manualNewFood=true;
  b.completed=false;
  b.reactionFood=null;
  b.dailyFruits=getDailyFruits(b,context);
  dateRangeDays(b.startDate,b.endDate).forEach(ds=>delete (S.dayOverrides||{})[ds]);
  save(); openBlockDetail(id); renderPlan(); renderCalendario();
}
function changeBlockType(id,type){const b=S.blocks.find(x=>x.id===id); if(!b)return; const old=deepClone(S.blocks); const snap=snapshotFoodState(); let rec=null; try{S.blocks=S.blocks.filter(x=>x.id!==id); virtuallyPromoteIntroducedBefore(b.startDate); rec=buildRecipe(type,S.blocks,getUsedNewFoodsAll())||buildSafeOnlyRecipe(S.blocks);}catch(e){console.error(e);}finally{restoreFoodState(snap); S.blocks=old;} if(!rec){alert('No se pudo cambiar el tipo de bloque.');return;} b.type=type; b.foods=rec.foods; b.newFood=rec.newFood; b.dailyFruits=getDailyFruits(b,S.blocks.filter(x=>x.id!==id)); save(); openBlockDetail(id); renderPlan(); renderCalendario();}
function regenerateFromDateManual(ds){
  if(!confirm('¿Regenerar el plan desde esta fecha conservando todo lo anterior?'))return;
  const future=S.blocks.filter(b=>b.endDate>=ds || (b.startDate<=ds&&b.endDate>=ds));
  const horizon=future.reduce((max,b)=>!max||b.endDate>max?b.endDate:max,'')||addDays(ds,29);
  const past=S.blocks.filter(b=>b.endDate<ds);
  const old=deepClone(S.blocks); const snap=snapshotFoodState(); let nb=[];
  try{S.blocks=past; virtuallyPromoteIntroducedBefore(ds); const count=Math.max(1,Math.ceil((daysBetween(ds,horizon)+1)/3)); nb=generateBlocks(ds,count,horizon);}catch(e){console.error(e); alert('No se pudo regenerar: '+(e.message||e)); S.blocks=old; nb=[];}finally{restoreFoodState(snap);}
  if(nb.length){S.blocks=[...past,...nb].sort((a,b)=>a.startDate.localeCompare(b.startDate)); Object.keys(S.dayOverrides||{}).forEach(k=>{if(k>=ds)delete S.dayOverrides[k];}); save(); closeModal('modal-day'); closeModal('modal-block-detail'); renderCalendario(); renderPlan(); alert('Plan regenerado desde '+formatShortDate(ds)+'.');}
}


document.addEventListener('click',function(e){
  if(!BLOCK_SWAP)return;
  if(e.target.closest('.block-food-edit-wrap'))return;
  if(e.target.closest('#modal-block-detail .modal-sheet')){
    closeBlockSwapIfOpen();
  }
});
Object.assign(window, {
  activateDairy,
  addAllergenToPool,
  addDairyFood,
  addPendingFood,
  addReactionManual,
  addSafeFood,
  approveAllergen,
  changeMonth,
  clearPlanCalendar,
  closeModal,
  confirmBlockReaction,
  copyReport,
  exportData,
  generateDateReport,
  generatePlan,
  rebuildFutureAfterReaction,
  saveDayFruit, addFoodToDay, removeFoodFromDay, markNoEatDay, restoreDay, fillBlockAtDate, deleteBlock, remakeBlock, openBlockFoodSwap, applyBlockFoodSwap, saveManualBlock, changeBlockNewFood, changeBlockType, regenerateFromDateManual,
  importData,
  markReactionAllergen,
  markReactionFromAny,
  markReactionFromPending,
  markReactionFromSafe,
  movePendingToSafe,
  openBlockDetail,
  openDayModal,
  openModal,
  openReactionForBlock,
  openReportModal,
  openReactionHistory,
  openEditFood,
  removeAllergenPool,
  removeDairy,
  removePending,
  removeReaction,
  removeSafe,
  resetAllData,
  showReactionInfo,
  retryReaction,
  saveBabyBirthDate,
  saveEditedFood,
  saveBirthDateFromSettings,
  saveNote,
  setShoppingWeek,
  showScreen,
  skipBirthDateSetup,
  toggleGuide,
  closeBlockSwapIfOpen
});


// Acciones dinámicas de listas de alimentos. Evita onclick con comillas rotas.
document.addEventListener('click', function(e){
  const btn = e.target.closest('[data-action]');
  if(!btn) return;
  const fn = window[btn.dataset.action];
  if(typeof fn === 'function'){
    e.preventDefault();
    e.stopPropagation();
    const insideEdit = !!btn.closest('#modal-edit-food');
    fn(btn.dataset.name || btn.dataset.month);
    if(insideEdit && !['saveEditedFood','showReactionInfo','openEditFood'].includes(btn.dataset.action)){
      closeModal('modal-edit-food');
    }
  }
});

load(); checkBlockCompletions(); renderAlimentos(); renderGuia(); updateHeader(); autoPromptDairyUnlock();
// Base limpia SIN service worker: desregistra cualquier SW antiguo y limpia cachés viejas.
function cleanupOldServiceWorkers(){
  try{
    if('serviceWorker' in navigator){
      navigator.serviceWorker.getRegistrations()
        .then(regs=>Promise.all(regs.map(r=>r.unregister())))
        .catch(()=>{});
    }
    if('caches' in window){
      caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k)))).catch(()=>{});
    }
  }catch(e){console.warn('No se pudo limpiar caché/SW antiguo', e);}
}
window.addEventListener('load', cleanupOldServiceWorkers);
