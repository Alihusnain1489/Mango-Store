'use client';

import { useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { Search, Eye, X, Mail, Phone, MapPin, ShoppingBag, TrendingUp } from 'lucide-react';

interface Customer { id:string; name:string; email:string; phone:string; city:string; orders:number; spent:number; joined:string; status:'active'|'inactive'; av:string; }

const CUSTOMERS: Customer[] = [
  { id:'C001', name:'Ahmad Ali',     email:'ahmad@gmail.com',   phone:'0300-1234567', city:'Gulberg',    orders:12, spent:14800, joined:'Jan 2025', status:'active',   av:'AA' },
  { id:'C002', name:'Sara Khan',     email:'sara@gmail.com',    phone:'0321-9876543', city:'DHA',        orders:7,  spent:6200,  joined:'Feb 2025', status:'active',   av:'SK' },
  { id:'C003', name:'Usman Tariq',   email:'usman@gmail.com',   phone:'0333-5554444', city:'Johar Town', orders:18, spent:21000, joined:'Mar 2025', status:'active',   av:'UT' },
  { id:'C004', name:'Fatima Malik',  email:'fatima@gmail.com',  phone:'0312-7778888', city:'Model Town', orders:3,  spent:1800,  joined:'Apr 2025', status:'inactive', av:'FM' },
  { id:'C005', name:'Hassan Raza',   email:'hassan@gmail.com',  phone:'0345-2223333', city:'Bahria',     orders:9,  spent:9200,  joined:'May 2025', status:'active',   av:'HR' },
  { id:'C006', name:'Ayesha Butt',   email:'ayesha@gmail.com',  phone:'0301-6665555', city:'Askari',     orders:5,  spent:4600,  joined:'Jun 2025', status:'active',   av:'AB' },
];

const AVC: Record<string,string> = { AA:'#2d7a47',SK:'#2563eb',UT:'#7c3aed',FM:'#d4952a',HR:'#e53e3e',AB:'#0891b2' };

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState<Customer|null>(null);

  const filtered = CUSTOMERS.filter(c=>
    c.name.toLowerCase().includes(search.toLowerCase())||
    c.email.toLowerCase().includes(search.toLowerCase())||
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell>
      <div style={{ maxWidth:1100 }}>

        {/* Summary */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:12, marginBottom:20 }}>
          {[
            { label:'Total Customers', value:CUSTOMERS.length,                                  color:'#111b13' },
            { label:'Active',          value:CUSTOMERS.filter(c=>c.status==='active').length,   color:'#2d7a47' },
            { label:'Total Orders',    value:CUSTOMERS.reduce((a,c)=>a+c.orders,0),             color:'#2563eb' },
            { label:'Total Revenue',   value:`Rs ${(CUSTOMERS.reduce((a,c)=>a+c.spent,0)/1000).toFixed(0)}K`, color:'#d4952a' },
          ].map(c=>(
            <div key={c.label} style={{ background:'#fff', border:'1px solid #eaefea', borderRadius:10, padding:'14px 16px' }}>
              <div style={{ fontSize:22, fontWeight:800, color:c.color }}>{c.value}</div>
              <div style={{ fontSize:11, color:'#9aaa9b', marginTop:2 }}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div style={{ marginBottom:16, position:'relative', display:'inline-block' }}>
          <Search size={13} style={{ position:'absolute', left:9, top:'50%', transform:'translateY(-50%)', color:'#b0bbb0' }}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search customers…"
            style={{ paddingLeft:28, paddingRight:12, paddingTop:8, paddingBottom:8, border:'1px solid #eaefea', borderRadius:8, fontSize:13, width:280, fontFamily:'inherit', outline:'none', background:'#fff' }}/>
        </div>

        {/* Table */}
        <div style={{ background:'#fff', borderRadius:12, border:'1px solid #eaefea', overflow:'hidden' }}>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ background:'#fafcfa', borderBottom:'1px solid #eaefea' }}>
                  {['Customer','Email','Phone','City','Orders','Spent','Status',''].map(h=>(
                    <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:10, fontWeight:700, color:'#9aaa9b', textTransform:'uppercase', letterSpacing:'0.07em', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c,i)=>(
                  <tr key={c.id} style={{ borderTop:'1px solid #f4f6f4', background:i%2===0?'#fff':'#fdfeff' }}>
                    <td style={{ padding:'11px 14px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:30, height:30, borderRadius:'50%', background:AVC[c.av]||'#2d7a47', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:10, fontWeight:700, flexShrink:0 }}>{c.av}</div>
                        <div>
                          <div style={{ fontSize:12, fontWeight:600, color:'#111b13' }}>{c.name}</div>
                          <div style={{ fontSize:11, color:'#9aaa9b' }}>Since {c.joined}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding:'11px 14px', fontSize:12, color:'#9aaa9b' }}>{c.email}</td>
                    <td style={{ padding:'11px 14px', fontSize:12, color:'#9aaa9b' }}>{c.phone}</td>
                    <td style={{ padding:'11px 14px', fontSize:12, color:'#9aaa9b' }}>{c.city}</td>
                    <td style={{ padding:'11px 14px', fontWeight:700, color:'#111b13' }}>{c.orders}</td>
                    <td style={{ padding:'11px 14px', fontWeight:700, color:'#2d7a47' }}>Rs {c.spent.toLocaleString()}</td>
                    <td style={{ padding:'11px 14px' }}>
                      <span style={{ background:c.status==='active'?'#edf7f1':'#f3f4f6', color:c.status==='active'?'#2d7a47':'#9aaa9b', fontSize:11, fontWeight:600, padding:'2px 8px', borderRadius:5, textTransform:'capitalize' }}>{c.status}</span>
                    </td>
                    <td style={{ padding:'11px 14px' }}>
                      <button onClick={()=>setDetail(c)} style={{ width:28, height:28, border:'none', borderRadius:6, background:'#edf7f1', color:'#2d7a47', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <Eye size={13}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Customer detail modal */}
      {detail&&(
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
          <div style={{ background:'#fff', borderRadius:14, width:'100%', maxWidth:420, boxShadow:'0 20px 60px rgba(0,0,0,0.18)' }}>
            <div style={{ padding:'16px 22px', borderBottom:'1px solid #eaefea', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:16, fontWeight:700, color:'#111b13' }}>Customer Profile</span>
              <button onClick={()=>setDetail(null)} style={{ background:'none', border:'none', cursor:'pointer', color:'#9aaa9b', display:'flex', padding:0 }}><X size={16}/></button>
            </div>
            <div style={{ padding:24 }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, marginBottom:20 }}>
                <div style={{ width:60, height:60, borderRadius:'50%', background:AVC[detail.av]||'#2d7a47', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:20, fontWeight:700 }}>{detail.av}</div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:18, fontWeight:700, color:'#111b13' }}>{detail.name}</div>
                  <div style={{ fontSize:12, color:'#9aaa9b' }}>Customer since {detail.joined}</div>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:16 }}>
                {[
                  { icon:<ShoppingBag size={14} color="#2563eb"/>, label:'Total Orders', value:String(detail.orders), bg:'#eff6ff' },
                  { icon:<TrendingUp  size={14} color="#2d7a47"/>, label:'Total Spent',  value:`Rs ${detail.spent.toLocaleString()}`, bg:'#edf7f1' },
                ].map(s=>(
                  <div key={s.label} style={{ background:s.bg, borderRadius:8, padding:'12px 14px', display:'flex', alignItems:'center', gap:10 }}>
                    {s.icon}
                    <div>
                      <div style={{ fontSize:15, fontWeight:800, color:'#111b13' }}>{s.value}</div>
                      <div style={{ fontSize:11, color:'#9aaa9b' }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {[
                  { icon:<Mail size={13} color="#9aaa9b"/>, text:detail.email },
                  { icon:<Phone size={13} color="#9aaa9b"/>, text:detail.phone },
                  { icon:<MapPin size={13} color="#9aaa9b"/>, text:detail.city+', Lahore' },
                ].map((item,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:'#f8faf8', borderRadius:8 }}>
                    {item.icon}
                    <span style={{ fontSize:13, color:'#111b13' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding:'14px 22px', borderTop:'1px solid #eaefea', display:'flex', justifyContent:'flex-end' }}>
              <button onClick={()=>setDetail(null)} style={{ background:'#111b13', color:'#fff', border:'none', borderRadius:7, padding:'8px 16px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}