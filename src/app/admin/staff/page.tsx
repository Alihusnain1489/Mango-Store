'use client';

import { useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { Plus, Edit2, Trash2, Search, X, Mail, Phone, Shield, Eye, EyeOff, UserCog } from 'lucide-react';

type Role = 'manager'|'staff'|'delivery';
type Status = 'active'|'inactive'|'on_leave';
interface Staff { id:string; name:string; email:string; phone:string; role:Role; status:Status; joined:string; area:string; orders:number; }

const MOCK: Staff[] = [
  { id:'S001', name:'Khalid Mehmood', email:'khalid@maanalkhair.pk', phone:'0300-1111111', role:'manager',  status:'active',   joined:'01 Jan 2025', area:'All',               orders:342 },
  { id:'S002', name:'Zainab Hussain', email:'zainab@maanalkhair.pk', phone:'0301-2222222', role:'staff',    status:'active',   joined:'15 Mar 2025', area:'Inventory',         orders:218 },
  { id:'S003', name:'Tariq Jameel',   email:'tariq@maanalkhair.pk',  phone:'0321-3333333', role:'delivery', status:'active',   joined:'10 Apr 2025', area:'Gulberg, DHA',      orders:487 },
  { id:'S004', name:'Nadia Aslam',    email:'nadia@maanalkhair.pk',  phone:'0333-4444444', role:'staff',    status:'on_leave', joined:'22 May 2025', area:'Customer Support',  orders:95  },
  { id:'S005', name:'Imran Shahzad',  email:'imran@maanalkhair.pk',  phone:'0345-5555555', role:'delivery', status:'active',   joined:'05 Jun 2025', area:'Model Town, Johar', orders:201 },
];

const RC: Record<Role,{label:string;color:string;bg:string}> = {
  manager:  {label:'Manager',  color:'#d4952a',bg:'#fdf6ea'},
  staff:    {label:'Staff',    color:'#2d7a47',bg:'#edf7f1'},
  delivery: {label:'Delivery', color:'#2563eb',bg:'#eff6ff'},
};
const SC: Record<Status,{label:string;color:string;bg:string}> = {
  active:   {label:'Active',   color:'#2d7a47',bg:'#edf7f1'},
  inactive: {label:'Inactive', color:'#9aaa9b',bg:'#f3f4f6'},
  on_leave: {label:'On Leave', color:'#d4952a',bg:'#fdf6ea'},
};

const EMPTY: Omit<Staff,'id'|'orders'> = { name:'', email:'', phone:'', role:'staff', status:'active', joined:'', area:'' };

export default function StaffPage() {
  const [staff,   setStaff]   = useState<Staff[]>(MOCK);
  const [search,  setSearch]  = useState('');
  const [roleF,   setRoleF]   = useState<'all'|Role>('all');
  const [modal,   setModal]   = useState<'add'|'edit'|'view'|'delete'|null>(null);
  const [sel,     setSel]     = useState<Staff|null>(null);
  const [form,    setForm]    = useState<Omit<Staff,'id'|'orders'>>(EMPTY);
  const [pw,      setPw]      = useState('');
  const [showPw,  setShowPw]  = useState(false);
  const [saving,  setSaving]  = useState(false);

  const filtered = staff.filter(s=>{
    const q=search.toLowerCase();
    return (s.name.toLowerCase().includes(q)||s.email.toLowerCase().includes(q))&&(roleF==='all'||s.role===roleF);
  });

  const openAdd  = ()=>{ setForm(EMPTY); setPw(''); setModal('add'); };
  const openEdit = (s:Staff)=>{ setSel(s); setForm({name:s.name,email:s.email,phone:s.phone,role:s.role,status:s.status,joined:s.joined,area:s.area}); setModal('edit'); };
  const openView = (s:Staff)=>{ setSel(s); setModal('view'); };
  const openDel  = (s:Staff)=>{ setSel(s); setModal('delete'); };

  const save = async ()=>{
    setSaving(true); await new Promise(r=>setTimeout(r,500));
    if (modal==='add') setStaff(p=>[...p,{...form,id:`S00${p.length+1}`,orders:0}]);
    else if (modal==='edit'&&sel) setStaff(p=>p.map(s=>s.id===sel.id?{...form,id:s.id,orders:s.orders}:s));
    setSaving(false); setModal(null);
  };
  const del = async ()=>{
    setSaving(true); await new Promise(r=>setTimeout(r,400));
    if (sel) setStaff(p=>p.filter(s=>s.id!==sel.id));
    setSaving(false); setModal(null);
  };

  const initials = (name:string)=>name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();

  return (
    <AdminShell>
      <div style={{ maxWidth:1100 }}>

        {/* Summary */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:12, marginBottom:20 }}>
          {[
            { label:'Total Staff', value:staff.length,                                    color:'#111b13', bg:'#f4f6f4' },
            { label:'Active',      value:staff.filter(s=>s.status==='active').length,     color:'#2d7a47', bg:'#edf7f1' },
            { label:'On Leave',    value:staff.filter(s=>s.status==='on_leave').length,   color:'#d4952a', bg:'#fdf6ea' },
            { label:'Delivery',    value:staff.filter(s=>s.role==='delivery').length,     color:'#2563eb', bg:'#eff6ff' },
          ].map(c=>(
            <div key={c.label} style={{ background:'#fff', border:'1px solid #eaefea', borderRadius:10, padding:'14px 16px' }}>
              <div style={{ fontSize:22, fontWeight:800, color:c.color }}>{c.value}</div>
              <div style={{ fontSize:11, color:'#9aaa9b', marginTop:2 }}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display:'flex', gap:10, marginBottom:16, justifyContent:'space-between', flexWrap:'wrap' }}>
          <div style={{ display:'flex', gap:10 }}>
            <div style={{ position:'relative' }}>
              <Search size={13} style={{ position:'absolute', left:9, top:'50%', transform:'translateY(-50%)', color:'#b0bbb0' }}/>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search staff…"
                style={{ paddingLeft:28, paddingRight:12, paddingTop:8, paddingBottom:8, border:'1px solid #eaefea', borderRadius:8, fontSize:13, width:220, fontFamily:'inherit', outline:'none', background:'#fff' }}/>
            </div>
            <select value={roleF} onChange={e=>setRoleF(e.target.value as 'all'|Role)}
              style={{ padding:'8px 10px', border:'1px solid #eaefea', borderRadius:8, fontSize:13, fontFamily:'inherit', outline:'none', background:'#fff' }}>
              <option value="all">All Roles</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
          <button onClick={openAdd} style={{ display:'flex', alignItems:'center', gap:7, background:'#111b13', color:'#fff', border:'none', borderRadius:8, padding:'9px 16px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
            <Plus size={14}/> Add Staff
          </button>
        </div>

        {/* Table */}
        <div style={{ background:'#fff', borderRadius:12, border:'1px solid #eaefea', overflow:'hidden' }}>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ background:'#fafcfa', borderBottom:'1px solid #eaefea' }}>
                  {['ID','Staff Member','Contact','Role','Area','Orders','Status','Actions'].map(h=>(
                    <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:10, fontWeight:700, color:'#9aaa9b', textTransform:'uppercase', letterSpacing:'0.07em', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s,i)=>{
                  const rc=RC[s.role]; const sc=SC[s.status];
                  return (
                    <tr key={s.id} style={{ borderTop:'1px solid #f4f6f4', background:i%2===0?'#fff':'#fdfeff' }}>
                      <td style={{ padding:'11px 14px', color:'#9aaa9b', fontSize:11, fontWeight:600 }}>{s.id}</td>
                      <td style={{ padding:'11px 14px' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:32, height:32, borderRadius:'50%', background:'#111b13', display:'flex', alignItems:'center', justifyContent:'center', color:'#6ee0a0', fontSize:11, fontWeight:700, flexShrink:0 }}>{initials(s.name)}</div>
                          <div>
                            <div style={{ fontSize:12, fontWeight:600, color:'#111b13' }}>{s.name}</div>
                            <div style={{ fontSize:11, color:'#9aaa9b' }}>Since {s.joined}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding:'11px 14px' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, color:'#9aaa9b', marginBottom:2 }}><Mail size={10}/>{s.email}</div>
                        <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, color:'#9aaa9b' }}><Phone size={10}/>{s.phone}</div>
                      </td>
                      <td style={{ padding:'11px 14px' }}>
                        <span style={{ background:rc.bg, color:rc.color, fontSize:11, fontWeight:600, padding:'2px 8px', borderRadius:5 }}>{rc.label}</span>
                      </td>
                      <td style={{ padding:'11px 14px', fontSize:12, color:'#9aaa9b' }}>{s.area}</td>
                      <td style={{ padding:'11px 14px', fontWeight:700, color:'#111b13' }}>{s.orders}</td>
                      <td style={{ padding:'11px 14px' }}>
                        <span style={{ background:sc.bg, color:sc.color, fontSize:11, fontWeight:600, padding:'2px 8px', borderRadius:5 }}>{sc.label}</span>
                      </td>
                      <td style={{ padding:'11px 14px' }}>
                        <div style={{ display:'flex', gap:6 }}>
                          <button onClick={()=>openView(s)} style={ab('#edf7f1','#2d7a47')}><Eye size={12}/></button>
                          <button onClick={()=>openEdit(s)} style={ab('#eff6ff','#2563eb')}><Edit2 size={12}/></button>
                          <button onClick={()=>openDel(s)}  style={ab('#fef2f2','#e53e3e')}><Trash2 size={12}/></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit */}
      {(modal==='add'||modal==='edit')&&(
        <div style={overlay}>
          <div style={{ background:'#fff', borderRadius:14, width:'100%', maxWidth:500, maxHeight:'90vh', overflowY:'auto', boxShadow:'0 20px 60px rgba(0,0,0,0.18)' }}>
            <div style={{ padding:'16px 22px', borderBottom:'1px solid #eaefea', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, background:'#fff', zIndex:1 }}>
              <span style={{ fontSize:16, fontWeight:700, color:'#111b13' }}>{modal==='add'?'Add Staff Member':'Edit Staff Member'}</span>
              <button onClick={()=>setModal(null)} style={{ background:'none', border:'none', cursor:'pointer', color:'#9aaa9b', display:'flex', padding:0 }}><X size={16}/></button>
            </div>
            <div style={{ padding:22, display:'flex', flexDirection:'column', gap:14 }}>
              <div style={frow}>
                <div style={fg}><label style={fl}>Full Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={fi} placeholder="Ahmad Ali"/></div>
                <div style={fg}><label style={fl}>Role</label>
                  <select value={form.role} onChange={e=>setForm({...form,role:e.target.value as Role})} style={fi}>
                    <option value="staff">Staff</option><option value="manager">Manager</option><option value="delivery">Delivery</option>
                  </select>
                </div>
              </div>
              <div style={frow}>
                <div style={fg}><label style={fl}>Email</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={fi} placeholder="staff@maanalkhair.pk"/></div>
                <div style={fg}><label style={fl}>Phone</label><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} style={fi} placeholder="0300-0000000"/></div>
              </div>
              {modal==='add'&&(
                <div style={fg}><label style={fl}>Password</label>
                  <div style={{ position:'relative' }}>
                    <input type={showPw?'text':'password'} value={pw} onChange={e=>setPw(e.target.value)} style={{ ...fi, paddingRight:36 }} placeholder="Min. 8 characters"/>
                    <button type="button" onClick={()=>setShowPw(!showPw)} style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#9aaa9b', display:'flex', padding:0 }}>
                      {showPw?<EyeOff size={14}/>:<Eye size={14}/>}
                    </button>
                  </div>
                </div>
              )}
              <div style={frow}>
                <div style={fg}><label style={fl}>Assigned Area</label><input value={form.area} onChange={e=>setForm({...form,area:e.target.value})} style={fi} placeholder="e.g. Gulberg"/></div>
                <div style={fg}><label style={fl}>Status</label>
                  <select value={form.status} onChange={e=>setForm({...form,status:e.target.value as Status})} style={fi}>
                    <option value="active">Active</option><option value="inactive">Inactive</option><option value="on_leave">On Leave</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{ padding:'14px 22px', borderTop:'1px solid #eaefea', display:'flex', gap:10, justifyContent:'flex-end', position:'sticky', bottom:0, background:'#fff' }}>
              <button onClick={()=>setModal(null)} style={cancelB}>Cancel</button>
              <button onClick={save} disabled={saving} style={saveB}>{saving?'Saving…':modal==='add'?'Add Member':'Save'}</button>
            </div>
          </div>
        </div>
      )}

      {/* View */}
      {modal==='view'&&sel&&(
        <div style={overlay}>
          <div style={{ background:'#fff', borderRadius:14, width:'100%', maxWidth:420, boxShadow:'0 20px 60px rgba(0,0,0,0.18)' }}>
            <div style={{ padding:'16px 22px', borderBottom:'1px solid #eaefea', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:16, fontWeight:700, color:'#111b13' }}>Staff Profile</span>
              <button onClick={()=>setModal(null)} style={{ background:'none', border:'none', cursor:'pointer', color:'#9aaa9b', display:'flex', padding:0 }}><X size={16}/></button>
            </div>
            <div style={{ padding:24, display:'flex', flexDirection:'column', alignItems:'center', gap:14 }}>
              <div style={{ width:64, height:64, borderRadius:'50%', background:'#111b13', display:'flex', alignItems:'center', justifyContent:'center', color:'#6ee0a0', fontSize:22, fontWeight:700 }}>
                {initials(sel.name)}
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:18, fontWeight:700, color:'#111b13', marginBottom:4 }}>{sel.name}</div>
                <span style={{ background:RC[sel.role].bg, color:RC[sel.role].color, fontSize:12, fontWeight:600, padding:'3px 12px', borderRadius:20 }}>{RC[sel.role].label}</span>
              </div>
              <div style={{ width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {[{l:'Employee ID',v:sel.id},{l:'Status',v:SC[sel.status].label},{l:'Email',v:sel.email},{l:'Phone',v:sel.phone},{l:'Area',v:sel.area},{l:'Joined',v:sel.joined},{l:'Orders',v:String(sel.orders)}].map(item=>(
                  <div key={item.l} style={{ background:'#f8faf8', borderRadius:8, padding:'10px 12px' }}>
                    <div style={{ fontSize:10, color:'#9aaa9b', textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:700, marginBottom:3 }}>{item.l}</div>
                    <div style={{ fontSize:13, fontWeight:600, color:'#111b13' }}>{item.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding:'14px 22px', borderTop:'1px solid #eaefea', display:'flex', gap:10, justifyContent:'flex-end' }}>
              <button onClick={()=>{setModal(null);openEdit(sel);}} style={cancelB}>Edit</button>
              <button onClick={()=>setModal(null)} style={saveB}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete */}
      {modal==='delete'&&(
        <div style={overlay}>
          <div style={{ background:'#fff', borderRadius:14, width:'100%', maxWidth:360, boxShadow:'0 20px 60px rgba(0,0,0,0.18)' }}>
            <div style={{ padding:28, textAlign:'center' }}>
              <div style={{ width:48, height:48, background:'#fef2f2', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px' }}><Trash2 size={20} color="#e53e3e"/></div>
              <h3 style={{ fontSize:17, fontWeight:700, color:'#111b13', marginBottom:8 }}>Remove Staff Member?</h3>
              <p style={{ fontSize:13, color:'#9aaa9b', marginBottom:22 }}>Are you sure you want to remove <strong>{sel?.name}</strong>?</p>
              <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
                <button onClick={()=>setModal(null)} style={cancelB}>Cancel</button>
                <button onClick={del} disabled={saving} style={{ ...saveB, background:'#e53e3e' }}>{saving?'Removing…':'Remove'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

const ab=(bg:string,color:string):React.CSSProperties=>({ width:28, height:28, border:'none', borderRadius:6, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', background:bg, color });
const overlay:React.CSSProperties = { position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:24 };
const frow:React.CSSProperties = { display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 };
const fg:React.CSSProperties = { display:'flex', flexDirection:'column', gap:5 };
const fl:React.CSSProperties = { fontSize:12, fontWeight:600, color:'#111b13', letterSpacing:'0.02em' };
const fi:React.CSSProperties = { border:'1px solid #eaefea', borderRadius:7, padding:'8px 10px', fontSize:13, fontFamily:'inherit', outline:'none', color:'#111b13', background:'#fff', width:'100%' };
const cancelB:React.CSSProperties = { background:'#fff', border:'1px solid #eaefea', color:'#5a6b61', borderRadius:7, padding:'8px 16px', fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'inherit' };
const saveB:React.CSSProperties = { background:'#111b13', color:'#fff', border:'none', borderRadius:7, padding:'8px 16px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' };