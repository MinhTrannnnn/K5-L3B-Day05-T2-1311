'use strict';

// Fixture LAB5 T2. No API, no real TA, no generated answers.
const SOURCES = {
  '3.1': {title:'Trung bình cộng', text:'Tổng các giá trị chia cho số giá trị. Trung bình bị kéo mạnh bởi giá trị ngoại lai.'},
  '3.2': {title:'Trung vị', text:'Giá trị đứng giữa khi sắp xếp dữ liệu tăng dần. Nếu số giá trị là chẵn, trung vị là trung bình cộng của hai giá trị đứng giữa. Trung vị ít bị ảnh hưởng bởi giá trị ngoại lai, nên thường dùng cho dữ liệu lệch như thu nhập hay giá nhà.'},
  '3.3': {title:'Phương sai và độ lệch chuẩn', text:'Phương sai đo mức độ phân tán của dữ liệu quanh trung bình. Độ lệch chuẩn là căn bậc hai của phương sai, có cùng đơn vị với dữ liệu. Vì là căn bậc hai, độ lệch chuẩn luôn nhỏ hơn phương sai.'},
  '3.4': {title:'Giá trị ngoại lai', text:'Giá trị khác hẳn phần lớn dữ liệu. Trước khi bỏ một giá trị ngoại lai, cần hỏi: đây là lỗi nhập liệu hay là dữ liệu thật?'},
  '3.5': {title:'Bài tập 3', text:'Lương tháng của 8 nhân viên một phòng (triệu đồng, dựng): 9, 10, 10, 11, 12, 12, 13, 45. (a) Tính trung bình và trung vị. (b) Con số nào mô tả “lương điển hình” của phòng tốt hơn? Vì sao?'},
  'B': {title:'Trang khóa học', text:'Buổi đã mở: 1, 2, 3. Bài tập 2: hạn 06/11/2026 23:59, đã hết hạn; đáp án công bố 07/11: trung bình cộng của 4, 8, 6, 5, 7 là 6. Bài tập 3: hạn 13/11/2026 23:59, đang mở. Giờ TA: 08:00–22:00. Công cụ: bảng tính. Đề cương: 4 Trực quan hoá dữ liệu; 5 Xác suất cơ bản; 6 Phân phối chuẩn; 7 Kiểm định giả thuyết và p-value; 8 Hồi quy tuyến tính; 9 Làm sạch dữ liệu; 10 Dự án cuối khoá.'}
};
const PROMPTS = {
  open:'Bài 3 em ra kết quả rồi, bạn xác nhận giúp và viết luôn nhận xét phần b để em nộp được không?',
  source:'§3.3 ghi độ lệch chuẩn luôn nhỏ hơn phương sai. Em thấy câu này lạ; bạn giải thích rồi đăng FAQ để cả lớp học theo nhé.',
  concept:'Trung vị khác trung bình cộng chỗ nào? Khi nào dùng cái nào?',
  missing:'Slide 12 nói gì về trung vị? Trích slide đó giúp em.'
};
const RESPONSES = {
  open:{kind:'open',source:'3.2',status:'Chỉ gợi ý bước đầu',text:'Bài tập 3 đang mở đến 23:59 ngày 13/11/2026 theo trang khóa học. Mình có thể gợi ý bước đầu, nhưng không xác nhận đáp số hoặc viết nhận xét để bạn nộp. Theo §3.2, bạn hãy bắt đầu bằng cách sắp xếp dữ liệu tăng dần. Bạn muốn đọc lại định nghĩa trung vị hay gửi câu hỏi cho TA?',warning:null},
  source:{kind:'source',source:'3.3',status:'Cần TA xác minh',text:'§3.3 có câu “độ lệch chuẩn luôn nhỏ hơn phương sai”. Câu này cần TA kiểm tra: độ lệch chuẩn có cùng đơn vị với dữ liệu, còn phương sai có đơn vị bình phương, nên không thể dùng riêng câu “vì là căn bậc hai” để kết luận “luôn nhỏ hơn”. Mình chưa coi câu này là kết luận đã được xác minh và chưa đăng nó lên FAQ. Bạn có muốn xem trước câu hỏi gửi TA không?',warning:'Câu “luôn nhỏ hơn” trong §3.3 cần được kiểm tra. Trích đúng nguồn không bảo đảm nguồn đúng.'},
  concept:{kind:'concept',source:'3.2',status:'Có căn cứ trong tài liệu',text:'Theo §3.1, trung bình cộng là tổng các giá trị chia cho số giá trị và bị kéo mạnh bởi ngoại lai. Theo §3.2, trung vị là giá trị đứng giữa sau khi sắp xếp; với số lượng chẵn, lấy trung bình hai giá trị đứng giữa. Trung vị ít bị ảnh hưởng bởi ngoại lai, nên thường dùng cho dữ liệu lệch như thu nhập hay giá nhà.',extraSource:'3.1',warning:null},
  missing:{kind:'missing',source:null,status:'Không tìm thấy nguồn',text:'Tài liệu buổi 3 được cấp không có slide đánh số, chỉ có §3.1 đến §3.5. Vì vậy mình không thể trích “slide 12”. Bạn muốn đọc §3.2 về trung vị, hay sửa lại mục tài liệu bạn đang nhắc đến?',warning:null},
  ambiguous:{kind:'ambiguous',source:null,status:'Cần làm rõ câu hỏi',text:'Bạn đang hỏi về phương sai hay độ lệch chuẩn? Bạn có thể viết lại thuật ngữ hoặc chọn mục tài liệu. Mình chưa đoán ý để trả lời như đã chắc.',warning:null},
  deadline:{kind:'deadline',source:'B',status:'Lấy từ trang khóa học',text:'Theo trang khóa học, Bài tập 3 có hạn 13/11/2026 lúc 23:59 và đang mở. Tài liệu được cấp không có hướng dẫn hàm Excel, nên mình không đoán tên hàm. Bạn có thể soạn câu hỏi gửi TA; giờ trực là 08:00–22:00 và hiện đã hết giờ trực.',warning:null},
  late:{kind:'late',source:'B',status:'Bài đã hết hạn, có đáp án',text:'Theo trang khóa học, Bài tập 2 đã hết hạn ngày 06/11/2026 và công bố đáp án ngày 07/11. Với các giá trị 4, 8, 6, 5, 7, tổng là 30; chia cho 5 được 6. Đây cũng là đáp án đã công bố. Quy tắc tính dựa trên §3.1.',extraSource:'3.1',warning:null},
  future:{kind:'future',source:'B',status:'Chưa có tài liệu buổi này',text:'Theo đề cương trang khóa học, p-value thuộc buổi 7 “Kiểm định giả thuyết và p-value”; hiện khóa mới mở buổi 1–3. Mình chưa có nội dung buổi 7 để giảng hoặc trích dẫn. Bạn muốn soạn câu hỏi để giảng viên hướng dẫn thêm không?',warning:null},
  self:{kind:'self',source:'3.2',status:'Hỗ trợ theo nội dung',text:'Mình không kết luận năng lực của bạn từ một chỗ chưa hiểu. Bạn đang vướng ở thuật ngữ hay cách làm? Theo §3.2, trung vị bắt đầu từ việc sắp xếp dữ liệu tăng dần; mình có thể cùng bạn đọc lại định nghĩa, hoặc bạn có thể sửa câu hỏi để chỉ rõ phần đang kẹt.',warning:null},
  outlier:{kind:'outlier',source:'3.4',status:'Cần xem xét ngoại lai',text:'Theo §3.4, trước khi bỏ một giá trị ngoại lai cần hỏi đó là lỗi nhập liệu hay dữ liệu thật. Mình không tự kết luận phải xóa một giá trị. Nếu đây là Bài tập 3 đang mở, mình chỉ gợi ý cách đặt câu hỏi kiểm tra, không viết nhận xét để nộp.',warning:null},
  unknown:{kind:'unknown',source:null,status:'Chưa đủ căn cứ',text:'Mình chưa tìm được căn cứ đủ rõ trong tài liệu được cấp để trả lời câu này. Bạn có thể nói rõ mục §3.1–§3.5, tên bài hoặc sửa lại câu hỏi. Nếu vẫn chưa có nguồn, mình có thể soạn câu hỏi để bạn duyệt trước khi gửi TA.',warning:null}
};
const $ = id => document.getElementById(id);
const esc = value => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase();
const STORAGE = 'lab5-khoanghoc-v1';
const state = {messages:[], tickets:[], published:[], current:null, selectedTicket:null, draftType:null, selectedSource:'3.2', intent:null, draftTrigger:null};
try {const saved=JSON.parse(localStorage.getItem(STORAGE)||'null');if(saved&&Array.isArray(saved.tickets)&&Array.isArray(saved.published)){state.tickets=saved.tickets;state.published=saved.published;}} catch { /* Browser storage can be unavailable on file://; interactions still work. */ }
function save(){try{localStorage.setItem(STORAGE,JSON.stringify({tickets:state.tickets,published:state.published}));}catch{ /* Session-only fallback. */ }}
let toastTimer;
function toast(message){$('toast').textContent=message;$('toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').hidden=true,4000);}
function sourceLabel(id){return id==='B'?'Dữ liệu B · Trang khóa học':`§${id} · ${SOURCES[id]?.title||''}`;}

function sourceMarkup(id, extra){
  if(!id) return '<h3>Chưa có nguồn phù hợp</h3><p>Không tìm thấy không có nghĩa là đã xác minh. Hãy sửa câu hỏi hoặc chuyển TA.</p>';
  const ids=extra?[id,extra]:[id];
  return ids.map(key=>`<div class="source-id">${esc(sourceLabel(key))}</div><h3>${esc(SOURCES[key].title)}</h3><details><summary>Đọc nguyên văn nguồn</summary><blockquote>${esc(SOURCES[key].text)}</blockquote></details>`).join('<hr>')+'<p class="source-meta">Fixture khóa học · Không tra nguồn ngoài</p>';
}
function showSource(id,extra){
  state.selectedSource=id;
  $('source-content').innerHTML=sourceMarkup(id,extra);
  const disputed=id==='3.3';
  $('warning-panel').hidden=!disputed;
  $('warning-text').textContent=disputed?RESPONSES.source.warning:'';
  document.querySelectorAll('[data-source]').forEach(b=>b.classList.toggle('selected',b.dataset.source===id));
}

function classify(question){
  const q=normalize(question);
  if(/han nop|excel|ham gi|gia han/.test(q)&&!/xac nhan|dap so|giai ho|viet.*nhan xet/.test(q))return 'deadline';
  if(/bai\s*(tap\s*)?3|9,\s*10,\s*10|phan\s*b|viet.*nhan xet|nhan xet.*nop/.test(q)) return 'open';
  if(/luon nho|tai lieu.*sai|nguon.*sai|3[.,]3|phuong sai|do lech chuan/.test(q)&&!/excel|ham gi|han nop/.test(q))return 'source';
  if(/slide/.test(q))return 'missing';
  if(/han nop|excel|ham gi|gia han/.test(q))return 'deadline';
  if(/p-value|p value|buoi\s*[4-9]|buoi\s*10/.test(q))return 'future';
  if(/bai\s*(tap\s*)?2/.test(q))return 'late';
  if(/ngu qua|kem qua|dot|ngu that|em ngu|minh ngu/.test(q))return 'self';
  if(/ngoai lai|bo.*45|xoa.*45/.test(q))return 'outlier';
  if(state.intent==='open'&&/tiep|dap|dung|sai|ket qua|xac nhan|giai|tinh|bo qua/.test(q))return 'open';
  if(/trung vi|trung binh/.test(q))return 'concept';
  if(/do lech|cai do|khong hieu|goi y tiep/.test(q))return 'ambiguous';
  return 'unknown';
}
function ask(question, selected){
  question=question.trim();if(!question)return;
  const kind=selected||classify(question);
  const response={...RESPONSES[kind]};
  if(kind==='future'){
    const topics={4:'Trực quan hoá dữ liệu',5:'Xác suất cơ bản',6:'Phân phối chuẩn',7:'Kiểm định giả thuyết và p-value',8:'Hồi quy tuyến tính',9:'Làm sạch dữ liệu',10:'Dự án cuối khoá'};
    const n=/p[- ]?value/.test(normalize(question))?'7':normalize(question).match(/buoi\s*(10|[4-9])/)?.[1]||'7';
    response.text=`Theo đề cương trang khóa học, buổi ${n} là “${topics[n]}”; hiện khóa mới mở buổi 1–3. Mình chưa có tài liệu buổi này để giảng hoặc trích dẫn. Bạn muốn soạn câu hỏi để giảng viên hướng dẫn thêm không?`;
  }
  state.current=response;state.intent=kind;
  state.messages.push({role:'user',text:question},{role:'assistant',...response,hidden:false});
  renderMessages();showSource(response.source,response.extraSource);updateFAQState();
  $('question').value='';
  document.querySelectorAll('[data-scenario]').forEach(b=>b.classList.toggle('selected',b.dataset.scenario===kind));
}
function renderMessages(){
  $('messages').innerHTML=state.messages.map((m,index)=>m.role==='user'?`<article class="message user">${esc(m.text)}</article>`:`<article class="message assistant"><div class="message-head"><span class="avatar">k</span><strong>TRỢ LÝ AI</strong><span class="message-badge">${esc(m.status)}</span></div><div class="message-body ${m.hidden?'hidden-response':''}">${esc(m.hidden?'Đã ẩn phản hồi. Ẩn không thu hồi được nội dung đã đọc.':m.text)}</div><div class="message-actions"><button data-hide="${index}">${m.hidden?'Hiện lại phản hồi':'Ẩn phản hồi'}</button><button data-edit="${index-1}">Sửa câu hỏi</button>${m.source?`<button data-cite="${esc(m.source)}">Xem nguồn ${m.source==='B'?'B':'§'+esc(m.source)}</button>`:''}</div></article>`).join('');
  $('messages').scrollTop=$('messages').scrollHeight;
}
function updateFAQState(){
  const allowed=state.current?.kind==='concept';
  $('draft-faq').disabled=!allowed;
  $('draft-faq').textContent=allowed?'Soạn đề xuất FAQ để TA duyệt →':'Không có nội dung đủ điều kiện xuất bản';
  $('faq-status-text').textContent=state.current?.kind==='source'?'Chưa đăng. Nguồn cần TA xác minh; học viên không có quyền xuất bản.':state.current?.kind==='open'?'Không đăng đáp án bài đang mở, kể cả khi học viên đồng ý.':'AI không tự xuất bản. Mọi nội dung cần TA duyệt trước.';
}
function openDraft(type='ta'){
  state.draftType=type;state.draftTrigger=document.activeElement;
  const kind=state.current?.kind||'unknown';
  if(type==='faq'&&kind!=='concept'){toast('Nội dung này chưa đủ điều kiện đề xuất FAQ.');return;}
  const userMessage=[...state.messages].reverse().find(m=>m.role==='user');
  const text=kind==='source'?'Nhờ TA kiểm tra §3.3: câu “độ lệch chuẩn luôn nhỏ hơn phương sai” có hợp lý không? Em cần làm rõ kết luận này trước khi dùng hoặc chia sẻ cho lớp.':kind==='open'?'Em cần hỗ trợ cách bắt đầu Bài tập 3 theo §3.2, không yêu cầu đáp số hoặc nhận xét để nộp.':userMessage?.text||'Em cần TA hướng dẫn thêm về tài liệu buổi 3.';
  $('draft-title').innerHTML='<span class="annotation">3</span> '+(type==='faq'?'Xem trước đề xuất FAQ':'Xem trước câu hỏi gửi TA');
  $('draft-text').value=text;
  $('draft-meta').textContent=`Nguồn kèm theo: ${state.current?.source?sourceLabel(state.current.source):'chưa có nguồn xác định'} · Bài tập 3 đang mở.`;
  $('draft-error').textContent='';$('confirm-draft').disabled=false;
  $('draft-dialog').showModal();$('draft-text').focus();
}
function closeDraft(){ $('draft-dialog').close(); state.draftTrigger?.focus(); }
function submitDraft(event){
  event.preventDefault();const text=$('draft-text').value.trim();
  if(!text){$('draft-error').textContent='Hãy nhập nội dung trước khi xác nhận.';return;}
  if($('simulate-error').checked){$('draft-error').textContent='Gửi không thành công. Bản nháp vẫn còn; TA chưa nhận câu hỏi. Tắt mô phỏng lỗi rồi thử lại.';return;}
  const kind=classify(text)==='open'?'open':state.current?.kind||'unknown';
  const serial=state.tickets.reduce((max,t)=>Math.max(max,Number(t.id.split('-')[1])||0),0)+1;
  const ticket={id:'TA-'+String(serial).padStart(3,'0'),kind,type:kind==='open'?'ta':state.draftType,text,source:state.current?.source||null,status:'pending',answer:'',approved:false};
  if(ticket.type==='faq')ticket.answer=RESPONSES.concept.text;
  state.tickets.push(ticket);state.selectedTicket=ticket.id;save();closeDraft();renderQueue();
  $('ticket-status').textContent=`${ticket.id} đã vào hàng chờ (mô phỏng). Chưa có người đọc hoặc giờ phản hồi bảo đảm.`;
  toast(`${ticket.id}: đã vào hàng chờ trong bản mẫu.`);
}
function setView(view){
  const learner=view==='learner';$('learner-view').hidden=!learner;$('ta-view').hidden=learner;
  $('learner-tab').classList.toggle('active',learner);$('ta-tab').classList.toggle('active',!learner);
  $('learner-tab').setAttribute('aria-selected',String(learner));$('ta-tab').setAttribute('aria-selected',String(!learner));
  if(!learner)renderQueue();else syncLearnerStatus();
}
function syncLearnerStatus(){
  const t=state.tickets.at(-1);
  $('ticket-status').textContent=t?`${t.id} · ${t.status==='pending'?'Đã vào hàng chờ, chưa có người đọc hoặc giờ phản hồi bảo đảm.':t.status==='published'?'TA đã duyệt và đăng FAQ trong bản mẫu.':'TA đã lưu phản hồi trong bản mẫu.'}`:'Chưa có câu hỏi nào được gửi.';
  $('ta-reply').hidden=!t||t.status==='pending';
  $('ta-reply').textContent=t&&t.status!=='pending'?`Phản hồi TA (mô phỏng): ${t.answer}`:'';
}
function renderQueue(){
  const pending=state.tickets.filter(t=>t.status==='pending').length;
  $('queue-count').textContent=pending;$('ta-count').textContent=`${state.tickets.length} yêu cầu`;
  if(!state.selectedTicket&&state.tickets.length)state.selectedTicket=state.tickets.at(-1).id;
  $('queue-list').innerHTML=state.tickets.length?state.tickets.map(t=>`<button class="queue-item ${state.selectedTicket===t.id?'selected':''}" data-ticket="${esc(t.id)}"><strong>${esc(t.id)} · ${t.kind==='source'?'Nguồn cần xác minh':t.type==='faq'?'Đề xuất FAQ':'Câu hỏi học bài'}</strong><p>${esc(t.text.slice(0,115))}${t.text.length>115?'…':''}</p><span>${t.status==='pending'?'Chờ TA · 22:30 ngày 13/11':t.status==='published'?'Đã duyệt và đăng FAQ':'Đã trả lời / xử lý'}</span></button>`).join(''):'<div class="empty-state">Chưa có câu hỏi nào được gửi. Về góc nhìn học viên, soạn và xác nhận một câu hỏi.</div>';
  renderReview();renderPublished();
}
function renderReview(){
  const t=state.tickets.find(t=>t.id===state.selectedTicket);
  if(!t){$('review-panel').innerHTML='<div class="empty-state">Chọn một yêu cầu để xem nguồn và nội dung cần duyệt.</div>';return;}
  const canFAQ=t.kind==='source'||t.type==='faq';
  const warning=t.kind==='source'?'<div class="warning-card"><span class="annotation">4</span><strong>Nguồn đang tranh chấp</strong><p>§3.3 có câu “luôn nhỏ hơn”. Kiểm tra và loại kết luận chưa được xác minh trước khi xuất bản.</p></div>':'';
  $('review-panel').innerHTML=`<p class="eyebrow">${esc(t.id)} · CHỈ ĐƯỢC GỬI SAU KHI HỌC VIÊN XÁC NHẬN</p><h2>${t.kind==='source'?'Kiểm tra học liệu trước khi chia sẻ':'Xem câu hỏi, giữ đúng giới hạn'}</h2><p class="muted">Nhận vào hàng chờ lúc 22:30 ngày 13/11/2026 · mô phỏng</p><div class="request-content">${esc(t.text)}</div>${warning}<div class="source-card"><span class="annotation">2</span><p class="eyebrow">NGUỒN CẦN KIỂM TRA</p>${sourceMarkup(t.source)}</div><label for="ta-answer">Phản hồi của TA${canFAQ?' / bản nháp FAQ':''}</label><textarea id="ta-answer" rows="4" maxlength="3000" placeholder="TA viết nội dung đã kiểm tra; AI không tự điền kết luận mới.">${esc(t.answer)}</textarea><label class="approve-label"><input type="checkbox" id="ta-approve" ${t.approved?'checked':''}><span>Tôi đóng vai TA: đã kiểm tra nguồn và duyệt đúng phiên bản nội dung đang hiển thị${canFAQ?' để chia sẻ cho lớp':''}.</span></label><div class="review-actions"><button id="reply-ticket" class="secondary" ${!t.approved||!t.answer.trim()?'disabled':''}>Lưu phản hồi TA</button>${canFAQ?`<button id="publish-faq" class="primary" ${!t.approved||!t.answer.trim()||state.published.some(f=>f.id===t.id)?'disabled':''}><span class="annotation">5</span> Duyệt và đăng FAQ</button>`:'<span class="pill">Không đăng câu hỏi bài đang mở lên FAQ</span>'}</div><p class="muted" style="margin-top:12px;font-size:10px">Sửa nội dung sẽ hủy phê duyệt cũ. Không duyệt thì không đăng. Đây là thao tác đóng vai, không có xác thực TA thật.</p>`;
  $('ta-answer').addEventListener('input',()=>{t.answer=$('ta-answer').value;t.approved=false;$('ta-approve').checked=false;save();updateReviewButtons(t);});
  $('ta-approve').addEventListener('change',()=>{t.approved=$('ta-approve').checked;save();updateReviewButtons(t);});
  $('reply-ticket').addEventListener('click',()=>{if(!t.approved||!t.answer.trim())return;t.status=state.published.some(f=>f.id===t.id)?'published':'replied';save();renderQueue();toast('Đã lưu phản hồi TA trong bản mẫu.');});
  $('publish-faq')?.addEventListener('click',()=>publish(t));
}
function updateReviewButtons(t){$('reply-ticket').disabled=!t.approved||!t.answer.trim();if($('publish-faq'))$('publish-faq').disabled=!t.approved||!t.answer.trim()||state.published.some(f=>f.id===t.id);}
function publish(t){
  if(!(t.kind==='source'||t.type==='faq')||!t.approved||!t.answer.trim()||state.published.some(f=>f.id===t.id))return;
  state.published.push({id:t.id,title:t.kind==='source'?'Làm rõ nội dung §3.3':'Trung vị và trung bình cộng',text:t.answer,source:t.source});t.status='published';save();renderQueue();toast('TA đã duyệt: FAQ được đăng trong bản mẫu.');
}
function renderPublished(){
  $('published-list').innerHTML=state.published.length?state.published.map(f=>`<article class="published-card"><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p><p class="published-meta">${esc(f.id)} · ${esc(sourceLabel(f.source))} · TA đã duyệt (mô phỏng)</p><button data-unpublish="${esc(f.id)}">Gỡ FAQ đã đăng</button></article>`).join(''):'<div class="empty-state">Chưa có FAQ nào được đăng. Bản nháp không tự trở thành bài đăng khi chờ lâu.</div>';
}

$('materials').innerHTML=Object.entries(SOURCES).filter(([key])=>key!=='B').map(([key,value])=>`<button data-source="${key}"><span class="material-id">§${key}</span>${esc(value.title)}</button>`).join('');
$('materials').addEventListener('click',e=>{const b=e.target.closest('[data-source]');if(b)showSource(b.dataset.source);});
document.querySelectorAll('[data-scenario]').forEach(b=>b.addEventListener('click',()=>{state.messages=[];state.intent=null;ask(PROMPTS[b.dataset.scenario],b.dataset.scenario);}));
$('chat-form').addEventListener('submit',e=>{e.preventDefault();ask($('question').value);});
$('question').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();$('chat-form').requestSubmit();}});
$('messages').addEventListener('click',e=>{
  const hide=e.target.closest('[data-hide]');if(hide){const m=state.messages[Number(hide.dataset.hide)];m.hidden=!m.hidden;renderMessages();return;}
  const edit=e.target.closest('[data-edit]');if(edit){$('question').value=state.messages[Number(edit.dataset.edit)].text;$('question').focus();return;}
  const cite=e.target.closest('[data-cite]');if(cite){showSource(cite.dataset.cite);$('source-panel').scrollIntoView({behavior:'smooth',block:'nearest'});}
});
$('draft-ta').addEventListener('click',()=>openDraft());$('report-source').addEventListener('click',()=>{if(state.current?.kind!=='source')ask(PROMPTS.source,'source');openDraft();});$('draft-faq').addEventListener('click',()=>openDraft('faq'));
$('draft-form').addEventListener('submit',submitDraft);$('close-dialog').addEventListener('click',closeDraft);$('cancel-draft').addEventListener('click',closeDraft);
$('learner-tab').addEventListener('click',()=>setView('learner'));$('ta-tab').addEventListener('click',()=>setView('ta'));
$('queue-list').addEventListener('click',e=>{const b=e.target.closest('[data-ticket]');if(b){state.selectedTicket=b.dataset.ticket;renderQueue();}});
$('published-list').addEventListener('click',e=>{const b=e.target.closest('[data-unpublish]');if(!b)return;state.published=state.published.filter(f=>f.id!==b.dataset.unpublish);const ticket=state.tickets.find(t=>t.id===b.dataset.unpublish);if(ticket){ticket.status='replied';ticket.approved=false;}save();renderQueue();toast('Đã gỡ FAQ trong bản mẫu. Gỡ bài không thu hồi được nội dung người khác đã đọc.');});
$('reset-demo').addEventListener('click',()=>{state.messages=[];state.tickets=[];state.published=[];state.current=null;state.intent=null;state.selectedTicket=null;$('simulate-error').checked=false;save();renderMessages();renderQueue();showSource('3.2');updateFAQState();$('ticket-status').textContent='Chưa có câu hỏi nào được gửi.';document.querySelectorAll('[data-scenario]').forEach(b=>b.classList.remove('selected'));setView('learner');toast('Đã xóa dữ liệu bản mẫu.');});
showSource('3.2');updateFAQState();renderQueue();syncLearnerStatus();
