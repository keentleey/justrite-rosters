import React, { useState, useEffect, useMemo } from 'react'

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
  yellow: '#F5A623', yellowDark: '#E09200', yellowLight: '#FFF3D4',
  blue: '#1A3C6E', blueMid: '#2B5BA8', blueLight: '#E8EEFA',
  green: '#1D6F42', red: '#E53935', redLight: '#FFEBEE',
  gray: '#6B7280', grayLight: '#F0F2F5', white: '#FFFFFF',
  dark: '#1A1A2E', border: '#E5E7EB',
}

// ─── DEFAULT DEPARTMENTS (dynamic – stored in localStorage) ──────────────────
const DEFAULT_DEPARTMENTS = [
  { id: 'Cashier',       name: 'Cashier',       isPlaceholder: false },
  { id: 'Groceries',     name: 'Groceries',     isPlaceholder: false },
  { id: 'Drinks',        name: 'Drinks',        isPlaceholder: false },
  { id: 'Toiletries',    name: 'Toiletries',    isPlaceholder: false },
  { id: 'Household',     name: 'Household',     isPlaceholder: false },
  { id: 'Electronics',   name: 'Electronics',   isPlaceholder: false },
  { id: 'Backstore',     name: 'Backstore',     isPlaceholder: false },
  { id: 'Merchandisers', name: 'Merchandisers', isPlaceholder: true  },
  { id: 'Security',      name: 'Security',      isPlaceholder: true  },
]

const INITIAL_STAFF = [
  {id:'S001',name:'Amaka Okafor',dept:'Cashier',shift:'AFT',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S002',name:'Bola Adeyemi',dept:'Cashier',shift:'MOR',role:'supervisor',active:true,pin:'1234',shiftLocked:false},
  {id:'S003',name:'Chidi Eze',dept:'Cashier',shift:'AFT',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S004',name:'Dupe Fashola',dept:'Cashier',shift:'MOR',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S005',name:'Emeka Nwosu',dept:'Cashier',shift:'AFT',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S006',name:'Fatima Usman',dept:'Cashier',shift:'MOR',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S007',name:'Gbenga Lawal',dept:'Cashier',shift:'AFT',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S008',name:'Helen Okoro',dept:'Cashier',shift:'MOR',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S009',name:'Ibrahim Musa',dept:'Cashier',shift:'AFT',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S010',name:'Jumoke Alabi',dept:'Cashier',shift:'MOR',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S011',name:'Kunle Adewale',dept:'Cashier',shift:'AFT',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S012',name:'Lara Sanni',dept:'Cashier',shift:'MOR',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S013',name:'Musa Bello',dept:'Cashier',shift:'AFT',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S014',name:'Nike Coker',dept:'Cashier',shift:'MOR',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S015',name:'Quadri Salami',dept:'Groceries',shift:'MOR',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S016',name:'Rita Okonkwo',dept:'Groceries',shift:'MOR',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S017',name:'Seun Adeleke',dept:'Groceries',shift:'MOR',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S018',name:'Taiwo Abiodun',dept:'Groceries',shift:'AFT',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S019',name:'Uche Igwe',dept:'Groceries',shift:'AFT',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S020',name:'Vera Nnamdi',dept:'Drinks',shift:'MOR',role:'supervisor',active:true,pin:'1234',shiftLocked:false},
  {id:'S021',name:'Wasiu Olawale',dept:'Drinks',shift:'MOR',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S022',name:'Yusuf Garba',dept:'Drinks',shift:'AFT',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S023',name:'Zainab Idris',dept:'Drinks',shift:'AFT',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S024',name:'Priscilla Nwachukwu',dept:'Toiletries',shift:'AFT',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S025',name:'Rasheed Adebayo',dept:'Toiletries',shift:'MOR',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S026',name:'Sophia Obi',dept:'Household',shift:'MOR',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S027',name:'Tunde Bakare',dept:'Household',shift:'AFT',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S028',name:'Usman Danladi',dept:'Electronics',shift:'MOR',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S029',name:'Victoria Ojo',dept:'Electronics',shift:'AFT',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S030',name:'Wale Afolabi',dept:'Backstore',shift:'MOR',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'S031',name:'Ximena Egbo',dept:'Backstore',shift:'AFT',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'M001',name:'Chukwudi Eze',dept:'Merchandisers',shift:'MOR',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'M002',name:'Ngozi Obi',dept:'Merchandisers',shift:'AFT',role:'staff',active:true,pin:'1234',shiftLocked:false},
  {id:'ADMIN',name:'Admin',dept:'Management',shift:'MOR',role:'admin',active:true,pin:'1234',shiftLocked:true},
]

const SHIFT_LABELS = { MOR:'Morning', AFT:'Afternoon', SUN:'Sunday', LNG:'Long Hour', OFF:'Off Day' }
const SHIFT_TIMES  = { MOR:'7:30AM–3:00PM', AFT:'1:30PM–9:00PM', SUN:'9:30AM–9:30PM', LNG:'10:00AM–10:00PM', OFF:'Rest Day' }
const SHIFT_COLORS = {
  MOR:{ bg:'#FFF3D4', text:'#B87E00', border:'#F5A623' },
  AFT:{ bg:'#E8EEFA', text:'#1A3C6E', border:'#2B5BA8' },
  SUN:{ bg:'#E8F5E9', text:'#1D6F42', border:'#1D6F42' },
  LNG:{ bg:'#FCE4EC', text:'#880E4F', border:'#E91E63' },
  OFF:{ bg:'#F3F4F6', text:'#6B7280', border:'#9CA3AF' },
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const isoDate = d => { const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,'0'), day=String(d.getDate()).padStart(2,'0'); return `${y}-${m}-${day}` }
const addDays = (d,n) => { const r=new Date(d); r.setDate(r.getDate()+n); return r }
const startOfWeek = d => { const r=new Date(d); r.setDate(r.getDate()-((r.getDay()+6)%7)); return r }
const monthDays = (y,m) => new Date(y,m+1,0).getDate()
const getInitials = name => name.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase()
const avatarColor = id => { const colors=['#F5A623','#2B5BA8','#1D6F42','#E53935','#7B1FA2','#00838F','#E65100','#AD1457']; let h=0; for(let c of id) h=(h<<5)-h+c.charCodeAt(0); return colors[Math.abs(h)%colors.length] }
const fmtDate = d => new Date(d+'T00:00:00').toLocaleDateString('en-NG',{weekday:'short',day:'numeric',month:'short'})
const todayStr = () => isoDate(new Date())
const WEEK_DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

const deptColor = dept => {
  const map = {
    Cashier:[T.yellowLight,'#B87E00'], Groceries:['#E8F5E9','#1D6F42'],
    Drinks:['#E3F2FD','#1565C0'], Toiletries:['#FCE4EC','#880E4F'],
    Household:['#F3E5F5','#6A1B9A'], Electronics:['#FFF8E1','#F57F17'],
    Backstore:['#EFEBE9','#4E342E'], Merchandisers:['#E0F2F1','#00695C'],
    Security:['#EDE7F6','#4527A0'], Management:['#E8EEFA','#1A3C6E']
  }
  return map[dept] || ['#F3F4F6',T.gray]
}

// ─── WEEKLY ROTATION LOGIC ────────────────────────────────────────────────────
// Returns the effective shift for a staff member on a given date,
// applying weekly alternation unless shift is locked.
function getRotatedShift(s, dateStr) {
  if (s.shiftLocked) return s.shift
  const d = new Date(dateStr + 'T00:00:00')
  // Week number since epoch Jan 1 2024
  const epoch = new Date('2024-01-01T00:00:00')
  const diffDays = Math.floor((d - epoch) / 86400000)
  const weekNum = Math.floor(diffDays / 7)
  const isFlipped = weekNum % 2 === 1
  if (!isFlipped) return s.shift
  return s.shift === 'MOR' ? 'AFT' : s.shift === 'AFT' ? 'MOR' : s.shift
}

// ─── ROSTER GENERATOR ─────────────────────────────────────────────────────────
function generateMonthRoster(staff, year, month, departments) {
  const roster = {}
  const days = monthDays(year, month)
  const placeholderDepts = new Set((departments||DEFAULT_DEPARTMENTS).filter(d=>d.isPlaceholder).map(d=>d.id))
  const activeStaff = staff.filter(s => s.active && s.id !== 'ADMIN' && !placeholderDepts.has(s.dept))

  activeStaff.forEach(s => {
    roster[s.id] = {}
    const allDates = []
    for (let d = 1; d <= days; d++) {
      const dt = new Date(year, month, d)
      allDates.push({ date: isoDate(dt), dow: dt.getDay(), day: d })
    }
    const sundays = allDates.filter(d => d.dow === 0)
    const weekdays = allDates.filter(d => d.dow >= 1 && d.dow <= 6)

    // Sunday alternation
    const sundayShifts = {}
    const sundayOffs = []
    sundays.forEach((sd, idx) => {
      const weekIdx = idx % 2
      if (s.shift === 'MOR') {
        sundayShifts[sd.date] = weekIdx === 0 ? 'SUN' : 'OFF'
        if (weekIdx === 1) sundayOffs.push(sd.date)
      } else {
        sundayShifts[sd.date] = weekIdx === 0 ? 'OFF' : 'SUN'
        if (weekIdx === 0) sundayOffs.push(sd.date)
      }
    })

    // Buffer weekday offs around working Sundays
    const workingSundays = sundays.filter(sd => sundayShifts[sd.date] !== 'OFF').map(sd => sd.date)
    const bufferSet = new Set()
    workingSundays.forEach(sd => {
      const d = new Date(sd + 'T00:00:00')
      for (let i = -3; i <= 2; i++) {
        if (i === 0) continue
        const bd = addDays(d, i)
        if (bd.getMonth() === month && bd.getDay() !== 0) bufferSet.add(isoDate(bd))
      }
    })

    const bufferArr = [...bufferSet].filter(d => weekdays.find(wd => wd.date === d))
    const nonBuffer = weekdays.filter(wd => !bufferSet.has(wd.date)).map(wd => wd.date)
    const candidates = [...bufferArr, ...nonBuffer]
    let weekdayOffs = []
    const step = Math.max(1, Math.floor(candidates.length / 4))
    for (let i = 0; i < 4; i++) { if (candidates[i * step]) weekdayOffs.push(candidates[i * step]) }
    weekdayOffs = [...new Set(weekdayOffs)].slice(0, 4)
    const allOffDates = new Set([...sundayOffs, ...weekdayOffs])

    // Assign shifts with weekly rotation
    allDates.forEach(({ date, dow }) => {
      if (allOffDates.has(date)) { roster[s.id][date] = 'OFF'; return }
      if (dow === 0) { roster[s.id][date] = sundayShifts[date] || 'SUN'; return }
      roster[s.id][date] = getRotatedShift(s, date)
    })
  })

  // ── Long hour logic ──────────────────────────────────────────────────────
  // Per spec: if dept has exactly 2 staff (same base shift) and one is OFF,
  // remaining staff auto-gets LONG HOUR with a fair OFF day nearby.
  const activeDeptIds = (departments||DEFAULT_DEPARTMENTS).filter(d=>!d.isPlaceholder).map(d=>d.id)
  activeDeptIds.forEach(dept => {
    const deptStaff = activeStaff.filter(s => s.dept === dept)
    ;['MOR', 'AFT'].forEach(baseShift => {
      const grp = deptStaff.filter(s => s.shift === baseShift)
      if (grp.length !== 2) return
      for (let d = 1; d <= days; d++) {
        const dt = new Date(year, month, d)
        if (dt.getDay() === 0) continue
        const date = isoDate(dt)
        const offCount = grp.filter(s => roster[s.id] && roster[s.id][date] === 'OFF').length
        if (offCount === 1) {
          const working = grp.find(s => roster[s.id] && roster[s.id][date] !== 'OFF')
          if (working) {
            roster[working.id][date] = 'LNG'
            // Fairness: check if adjacent day is already off
            let hasFairOff = false
            for (let offset of [-2,-1,1,2]) {
              const adj = isoDate(addDays(dt, offset))
              if (roster[working.id][adj] === 'OFF') { hasFairOff = true; break }
            }
            if (!hasFairOff) {
              for (let offset of [-1,-2,1,2]) {
                const adjDt = addDays(dt, offset)
                if (adjDt.getMonth() !== month) continue
                if (adjDt.getDay() === 0) continue
                const adj = isoDate(adjDt)
                if (roster[working.id][adj] && roster[working.id][adj] !== 'OFF' && roster[working.id][adj] !== 'LNG') {
                  roster[working.id][adj] = 'OFF'
                  break
                }
              }
            }
          }
        }
      }
    })
  })

  return roster
}

// ─── CAPACITY CHECK ────────────────────────────────────────────────────────────
function getCapacityWarnings(staff, roster, year, month, departments) {
  const days = monthDays(year, month)
  const issues = []
  const placeholderDepts = new Set((departments||DEFAULT_DEPARTMENTS).filter(d=>d.isPlaceholder).map(d=>d.id))
  const activeDepts = (departments||DEFAULT_DEPARTMENTS).filter(d=>!d.isPlaceholder).map(d=>d.id)
  activeDepts.forEach(dept => {
    const ds = staff.filter(s => s.active && s.dept === dept && s.id !== 'ADMIN')
    if (!ds.length) return
    ;['MOR','AFT'].forEach(shift => {
      const ss = ds.filter(s => s.shift === shift); if (!ss.length) return
      for (let d = 1; d <= days; d++) {
        const date = isoDate(new Date(year, month, d))
        const present = ss.filter(s => (roster[s.id]||{})[date] !== 'OFF').length
        if (present < Math.ceil(ss.length * 0.5)) {
          issues.push({ dept, shift, date, present, total: ss.length })
        }
      }
    })
  })
  return issues.slice(0, 10)
}

// ─── STYLE HELPERS ────────────────────────────────────────────────────────────
const card = { background:T.white, borderRadius:14, padding:16, marginBottom:12, boxShadow:'0 1px 4px rgba(0,0,0,0.07)' }
const cardTitle = { fontSize:11, fontWeight:700, color:T.gray, textTransform:'uppercase', letterSpacing:1, marginBottom:10 }
const inputStyle = { width:'100%', padding:'11px 14px', borderRadius:10, border:`1.5px solid ${T.border}`, fontSize:14, fontFamily:"'Nunito',sans-serif", outline:'none', background:T.white, color:T.dark, marginBottom:12, display:'block', boxSizing:'border-box' }
const labelStyle = { fontSize:11, fontWeight:700, color:T.gray, textTransform:'uppercase', letterSpacing:0.8, display:'block', marginBottom:5 }
const selectStyle = { ...inputStyle, background:T.white }

const btn = (v='primary') => {
  const base = { padding:'10px 18px', borderRadius:10, fontSize:13, fontWeight:700, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6, border:'none', fontFamily:"'Nunito',sans-serif" }
  if (v==='primary') return {...base, background:`linear-gradient(135deg,${T.yellow},${T.yellowDark})`, color:T.dark}
  if (v==='secondary') return {...base, background:T.blueLight, color:T.blue}
  if (v==='danger') return {...base, background:T.redLight, color:T.red}
  if (v==='success') return {...base, background:'#E8F5E9', color:T.green}
  return {...base, background:'transparent', color:T.blue, border:`1px solid ${T.border}`}
}
const btnSm = (v='primary') => ({...btn(v), padding:'6px 12px', fontSize:12})

const shiftBadge = type => ({ padding:'3px 8px', borderRadius:6, fontSize:11, fontWeight:700, background:SHIFT_COLORS[type]?.bg||'#F3F4F6', color:SHIFT_COLORS[type]?.text||T.gray, border:`1px solid ${SHIFT_COLORS[type]?.border||'#9CA3AF'}`, minWidth:36, textAlign:'center', display:'inline-block' })
const deptBadge = dept => { const [bg,text]=deptColor(dept); return { padding:'2px 8px', borderRadius:20, fontSize:10, fontWeight:700, background:bg, color:text, display:'inline-block' } }
const avatarStyle = id => ({ width:42, height:42, borderRadius:12, background:avatarColor(id), display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800, color:T.white, flexShrink:0 })

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────
function Avatar({ s }) { return <div style={avatarStyle(s.id)}>{getInitials(s.name)}</div> }

function Modal({ show, onClose, title, children }) {
  if (!show) return null
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.55)',zIndex:200,display:'flex',alignItems:'flex-end',justifyContent:'center'}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:T.white,borderRadius:'20px 20px 0 0',padding:20,width:'100%',maxWidth:500,maxHeight:'90vh',overflowY:'auto'}}>
        <div style={{width:40,height:4,background:T.border,borderRadius:4,margin:'0 auto 16px'}} />
        {title && <h3 style={{fontSize:18,fontWeight:900,color:T.dark,marginBottom:16}}>{title}</h3>}
        {children}
      </div>
    </div>
  )
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginScreen({ staff, onLogin }) {
  const [id, setId] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true); setError('')
    setTimeout(() => {
      const user = staff.find(s => s.id === id.trim().toUpperCase())
      if (!user) { setError('Staff ID not found'); setLoading(false); return }
      if (!user.active) { setError('Account deactivated'); setLoading(false); return }
      if (user.pin !== pin) { setError('Incorrect PIN'); setLoading(false); return }
      onLogin(user); setLoading(false)
    }, 500)
  }

  return (
    <div style={{minHeight:'100vh',background:`linear-gradient(160deg,${T.blue} 0%,${T.blueMid} 50%,${T.dark} 100%)`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{textAlign:'center',marginBottom:36}}>
        <div style={{width:80,height:80,background:T.yellow,borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',fontSize:38,margin:'0 auto 14px',boxShadow:'0 8px 32px rgba(245,166,35,0.4)'}}>🛒</div>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:26,color:T.white,letterSpacing:1}}>JUSTRITE SUPERSTORE</div>
        <div style={{fontSize:11,color:'rgba(255,255,255,0.45)',letterSpacing:3,marginTop:4}}>ILE-IFE · STAFF PORTAL</div>
      </div>
      <div style={{width:'100%',maxWidth:360,background:'rgba(255,255,255,0.08)',backdropFilter:'blur(20px)',borderRadius:20,padding:24,border:'1px solid rgba(255,255,255,0.12)'}}>
        <div style={{fontSize:13,fontWeight:700,color:'rgba(255,255,255,0.6)',marginBottom:18,textAlign:'center'}}>Sign in to your workspace</div>
        <label style={{...labelStyle,color:'rgba(255,255,255,0.5)'}}>Staff ID</label>
        <input value={id} onChange={e=>setId(e.target.value)} placeholder="e.g. S001 or ADMIN" style={{...inputStyle,background:'rgba(255,255,255,0.1)',border:'1.5px solid rgba(255,255,255,0.2)',color:T.white}} onKeyDown={e=>e.key==='Enter'&&handleLogin()} />
        <label style={{...labelStyle,color:'rgba(255,255,255,0.5)'}}>PIN</label>
        <input value={pin} onChange={e=>setPin(e.target.value)} placeholder="4-digit PIN" type="password" maxLength={4} style={{...inputStyle,background:'rgba(255,255,255,0.1)',border:'1.5px solid rgba(255,255,255,0.2)',color:T.white}} onKeyDown={e=>e.key==='Enter'&&handleLogin()} />
        {error && <div style={{background:'rgba(229,57,53,0.2)',color:'#FF8A80',padding:'8px 12px',borderRadius:8,fontSize:13,fontWeight:600,marginBottom:12}}>{error}</div>}
        <button onClick={handleLogin} disabled={loading} style={{...btn('primary'),width:'100%',justifyContent:'center',padding:13,fontSize:15,opacity:loading?0.7:1}}>
          {loading ? '⏳ Signing in…' : '🔐 Sign In'}
        </button>
        <div style={{textAlign:'center',marginTop:14,fontSize:11,color:'rgba(255,255,255,0.3)'}}>Default PIN: 1234 · Change under Profile</div>
      </div>
    </div>
  )
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ currentUser, staff, roster, assignments, departments }) {
  const today = todayStr()
  const myRoster = roster[currentUser.id] || {}
  const todayShift = myRoster[today] || '--'
  const weekStart = startOfWeek(new Date())
  const weekDates = Array.from({length:7},(_,i)=>isoDate(addDays(weekStart,i)))
  const offCount = Object.values(myRoster).filter(v=>v==='OFF').length
  const partner = staff.find(s=>s.id!==currentUser.id&&s.dept===currentUser.dept&&s.shift===currentUser.shift&&s.active&&s.id!=='ADMIN')
  const myTasks = assignments.filter(a=>a.active&&(a.departments.includes('All')||a.departments.includes(currentUser.dept)))

  const deptNames = (departments||DEFAULT_DEPARTMENTS).filter(d=>!d.isPlaceholder).map(d=>d.id)
  const deptCapacity = deptNames.map(dept => {
    const ds = staff.filter(s=>s.active&&s.dept===dept&&s.id!=='ADMIN')
    return { dept, morTotal:ds.filter(s=>s.shift==='MOR').length, aftTotal:ds.filter(s=>s.shift==='AFT').length, total:ds.length }
  })

  return (
    <div style={{padding:'12px 14px 80px'}}>
      <div style={{...card,background:`linear-gradient(135deg,${T.yellow},${T.yellowDark})`,marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:700,color:'rgba(0,0,0,0.45)',marginBottom:2}}>WELCOME BACK</div>
        <div style={{fontSize:22,fontWeight:900,color:T.dark,fontFamily:"'Barlow Condensed',sans-serif"}}>{currentUser.name}</div>
        <div style={{display:'flex',gap:6,marginTop:8,flexWrap:'wrap'}}>
          <span style={deptBadge(currentUser.dept)}>{currentUser.dept}</span>
          <span style={{...deptBadge(currentUser.dept),background:T.blueLight,color:T.blue}}>{currentUser.role.toUpperCase()}</span>
          <span style={{...deptBadge(currentUser.dept),background:'#E8F5E9',color:T.green}}>{SHIFT_LABELS[currentUser.shift]}</span>
          {currentUser.shiftLocked && <span style={{fontSize:10,color:'#4527A0',fontWeight:700,background:'#EDE7F6',padding:'2px 8px',borderRadius:20}}>🔒 Locked</span>}
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
        <div style={{...card,textAlign:'center',padding:'14px 8px',marginBottom:0}}>
          <div style={{fontSize:10,fontWeight:700,color:T.gray,marginBottom:6}}>{"TODAY'S SHIFT"}</div>
          <span style={shiftBadge(todayShift)}>{todayShift}</span>
          <div style={{fontSize:10,color:T.gray,marginTop:6}}>{SHIFT_TIMES[todayShift]||'—'}</div>
        </div>
        <div style={{...card,textAlign:'center',padding:'14px 8px',marginBottom:0}}>
          <div style={{fontSize:10,fontWeight:700,color:T.gray,marginBottom:6}}>DAYS OFF</div>
          <div style={{fontSize:26,fontWeight:900,color:T.dark,lineHeight:1}}>{offCount}<span style={{fontSize:13,color:T.gray}}>/6</span></div>
          <div style={{fontSize:10,color:T.gray,marginTop:4}}>This Month</div>
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>This Week</div>
        <div style={{display:'flex',gap:5,overflowX:'auto',paddingBottom:4}}>
          {weekDates.map((d,i)=>{
            const sh = myRoster[d]||'--'
            const isToday = d===today
            const sc = SHIFT_COLORS[sh]
            return (
              <div key={d} style={{flexShrink:0,textAlign:'center',minWidth:44}}>
                <div style={{fontSize:9,fontWeight:700,color:isToday?T.yellowDark:T.gray}}>{WEEK_DAYS[i]}</div>
                <div style={{fontSize:14,fontWeight:900,color:isToday?T.yellow:T.dark,margin:'2px 0'}}>{new Date(d+'T00:00:00').getDate()}</div>
                <div style={{...shiftBadge(sh),padding:'2px 4px',fontSize:9,display:'block',background:isToday?(sc?.border||T.border):sc?.bg,color:isToday?T.white:sc?.text}}>{sh}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{...card,background:T.blueLight,border:`1px solid ${T.border}`}}>
        <div style={cardTitle}>Weekly Rotation</div>
        <div style={{fontSize:12,color:T.blue}}>
          Base shift: <strong>{SHIFT_LABELS[currentUser.shift]}</strong>.{' '}
          {currentUser.shiftLocked ? 'Shift is locked — no weekly alternation.' : 'Shift alternates automatically each week (Morning ↔ Afternoon).'}
        </div>
      </div>

      {partner && (
        <div style={card}>
          <div style={cardTitle}>Your Partner</div>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <Avatar s={partner} />
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:700,color:T.dark}}>{partner.name}</div>
              <div style={{fontSize:11,color:T.gray}}>{partner.dept} · {partner.id}</div>
            </div>
            <span style={shiftBadge(partner.shift)}>{partner.shift}</span>
          </div>
        </div>
      )}

      {(currentUser.role==='admin'||currentUser.role==='supervisor') && (
        <div style={card}>
          <div style={cardTitle}>Department Capacity</div>
          {deptCapacity.map(dc=>(
            <div key={dc.dept} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:`1px solid ${T.border}`}}>
              <span style={deptBadge(dc.dept)}>{dc.dept}</span>
              <span style={{fontSize:11,color:T.gray}}>{dc.total} staff</span>
              <span style={{fontSize:11,fontWeight:700,color:dc.total<2?T.red:T.green}}>{dc.morTotal}M / {dc.aftTotal}A</span>
            </div>
          ))}
        </div>
      )}

      {myTasks.length>0&&(
        <div style={card}>
          <div style={cardTitle}>Active Tasks ({myTasks.length})</div>
          {myTasks.slice(0,3).map(a=>{
            const done = a.steps.filter(s=>s.done).length
            const pct = Math.round(done/a.steps.length*100)
            return (
              <div key={a.id} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:`1px solid ${T.border}`}}>
                <div style={{width:36,height:36,background:T.yellowLight,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>📋</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:T.dark}}>{a.title}</div>
                  <div style={{height:5,background:T.border,borderRadius:3,marginTop:5,overflow:'hidden'}}>
                    <div style={{width:`${pct}%`,height:'100%',background:pct===100?T.green:T.yellow,borderRadius:3}} />
                  </div>
                </div>
                <div style={{fontSize:11,fontWeight:700,color:pct===100?T.green:T.gray}}>{done}/{a.steps.length}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── ROSTER VIEW ──────────────────────────────────────────────────────────────
function RosterView({ currentUser, staff, roster, rosterStatus, monthKey, onMonthChange, departments }) {
  const [deptFilter, setDeptFilter] = useState('All')
  const [viewMode, setViewMode] = useState('week')
  const [selected, setSelected] = useState(null)
  const today = todayStr()
  const weekStart = startOfWeek(new Date())
  const weekDates = Array.from({length:7},(_,i)=>isoDate(addDays(weekStart,i)))
  const [year,month] = monthKey.split('-').map(Number)
  const days = monthDays(year,month)
  const monthDates = Array.from({length:days},(_,i)=>{ const d=new Date(year,month,i+1); return {date:isoDate(d),dow:d.getDay(),day:i+1} })

  const depts = departments || DEFAULT_DEPARTMENTS
  const deptNames = depts.map(d=>d.id)
  const placeholderDepts = new Set(depts.filter(d=>d.isPlaceholder).map(d=>d.id))
  const canViewAll = currentUser.role==='admin'||currentUser.role==='supervisor'

  const filtered = staff.filter(s=>
    s.active && s.id!=='ADMIN' &&
    (deptFilter==='All'||s.dept===deptFilter) &&
    (canViewAll||s.dept===currentUser.dept||s.id===currentUser.id)
  )

  const selectedStaff = staff.find(s=>s.id===selected)
  const selRoster = selectedStaff ? (roster[selectedStaff.id]||{}) : {}

  return (
    <div style={{padding:'12px 14px 80px'}}>
      {rosterStatus&&(
        <div style={{background:rosterStatus==='published'?T.green:rosterStatus==='approved'?T.blueMid:T.yellowDark,color:T.white,padding:'8px 14px',borderRadius:10,marginBottom:12,fontSize:12,fontWeight:700}}>
          {rosterStatus==='published'?'✅ Roster Published and Active':rosterStatus==='approved'?'✅ Approved – Pending Publish':'📋 Roster Draft'}
        </div>
      )}

      <div style={{display:'flex',gap:8,marginBottom:10,alignItems:'center'}}>
        <button onClick={()=>setViewMode('week')} style={btnSm(viewMode==='week'?'primary':'ghost')}>Week</button>
        <button onClick={()=>setViewMode('month')} style={btnSm(viewMode==='month'?'primary':'ghost')}>Month</button>
        <div style={{flex:1}}/>
        <select value={deptFilter} onChange={e=>setDeptFilter(e.target.value)} style={{...selectStyle,marginBottom:0,padding:'6px 10px',fontSize:11,width:'auto'}}>
          <option value="All">All</option>
          {deptNames.map(d=><option key={d}>{d}</option>)}
        </select>
      </div>

      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
        <button onClick={()=>onMonthChange(-1)} style={btnSm('ghost')}>◀</button>
        <div style={{fontSize:15,fontWeight:800,color:T.dark}}>{new Date(year,month,1).toLocaleDateString('en-NG',{month:'long',year:'numeric'})}</div>
        <button onClick={()=>onMonthChange(1)} style={btnSm('ghost')}>▶</button>
      </div>

      {/* Placeholder department modules */}
      {depts.filter(d=>d.isPlaceholder && (deptFilter==='All'||deptFilter===d.id)).map(ph=>(
        <div key={ph.id} style={{...card,border:`2px dashed ${T.border}`,background:T.grayLight,marginBottom:12}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{fontSize:28}}>{ph.id==='Security'?'🛡️':'🏷️'}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:800,color:T.dark}}>{ph.name} Roster</div>
              <div style={{fontSize:11,color:T.gray,marginTop:2}}>Separate module — automation not yet active</div>
              <div style={{display:'flex',gap:6,marginTop:6,flexWrap:'wrap'}}>
                <span style={{fontSize:10,fontWeight:700,background:'#EDE7F6',color:'#4527A0',padding:'2px 8px',borderRadius:20}}>PLACEHOLDER</span>
                <span style={{fontSize:10,color:T.gray,fontWeight:600}}>{staff.filter(s=>s.active&&s.dept===ph.id).length} staff registered</span>
              </div>
            </div>
          </div>
          <div style={{marginTop:10,padding:'10px 12px',background:T.white,borderRadius:8,border:`1px solid ${T.border}`,fontSize:11,color:T.gray}}>
            Roster management for this department must be done manually. Logic engine will be activated in a future update.
          </div>
        </div>
      ))}

      {filtered.filter(s=>!placeholderDepts.has(s.dept)).map(s=>{
        const r = roster[s.id]||{}
        const dates = viewMode==='week' ? weekDates : monthDates.map(d=>d.date)
        return (
          <div key={s.id} style={{...card,padding:'10px 12px',marginBottom:8,cursor:'pointer'}} onClick={()=>setSelected(s.id)}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
              <Avatar s={s} />
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:700,color:T.dark,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s.name}</div>
                <div style={{display:'flex',gap:4,marginTop:3,flexWrap:'wrap'}}>
                  <span style={deptBadge(s.dept)}>{s.dept}</span>
                  {s.role==='supervisor'&&<span style={{...deptBadge(s.dept),background:T.blueLight,color:T.blue}}>SUP</span>}
                  {s.shiftLocked&&<span style={{fontSize:9,color:'#4527A0',fontWeight:700,background:'#EDE7F6',padding:'1px 5px',borderRadius:10}}>🔒</span>}
                </div>
              </div>
              <div style={{textAlign:'right',flexShrink:0}}>
                <div style={{fontSize:9,color:T.gray,fontWeight:700}}>OFF</div>
                <div style={{fontSize:16,fontWeight:900,color:T.dark}}>{Object.values(r).filter(v=>v==='OFF').length}/6</div>
              </div>
            </div>
            <div style={{display:'flex',gap:4,overflowX:'auto',paddingBottom:2}}>
              {dates.map((d,i)=>{
                const sh=r[d]; if(!sh) return null
                const isToday=d===today
                return (
                  <div key={d} style={{flexShrink:0,textAlign:'center',minWidth:viewMode==='week'?44:32}}>
                    {viewMode==='week'&&<div style={{fontSize:9,color:isToday?T.yellowDark:T.gray,fontWeight:700}}>{WEEK_DAYS[i]}</div>}
                    {viewMode==='week'&&<div style={{fontSize:12,fontWeight:800,color:isToday?T.yellow:T.dark}}>{new Date(d+'T00:00:00').getDate()}</div>}
                    {viewMode==='month'&&<div style={{fontSize:9,color:T.gray}}>{new Date(d+'T00:00:00').getDate()}</div>}
                    <div style={{...shiftBadge(sh),padding:'2px 4px',fontSize:9,display:'block'}}>{sh}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      <Modal show={!!selectedStaff} onClose={()=>setSelected(null)} title={selectedStaff?.name}>
        {selectedStaff&&(
          <div>
            <div style={{display:'flex',gap:8,marginBottom:14,flexWrap:'wrap'}}>
              <span style={deptBadge(selectedStaff.dept)}>{selectedStaff.dept}</span>
              <span style={shiftBadge(selectedStaff.shift)}>{selectedStaff.shift}</span>
              <span style={{...deptBadge(selectedStaff.dept),background:T.grayLight,color:T.gray}}>{selectedStaff.id}</span>
              {selectedStaff.shiftLocked&&<span style={{fontSize:10,color:'#4527A0',fontWeight:700,background:'#EDE7F6',padding:'2px 8px',borderRadius:20}}>🔒 Locked</span>}
            </div>
            <div style={cardTitle}>Full Month Schedule</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:3}}>
              {['M','T','W','T','F','S','S'].map((d,i)=><div key={i} style={{textAlign:'center',fontSize:9,fontWeight:700,color:T.gray}}>{d}</div>)}
              {Array.from({length:(new Date(year,month,1).getDay()+6)%7}).map((_,i)=><div key={'e'+i}/>)}
              {monthDates.map(({date,day})=>{
                const sh=selRoster[date]||'--'
                const sc=SHIFT_COLORS[sh]
                return (
                  <div key={date} style={{textAlign:'center',padding:'3px 1px',borderRadius:5,background:sc?.bg||'#F3F4F6',border:`1px solid ${sc?.border||T.border}`}}>
                    <div style={{fontSize:8,fontWeight:700,color:sc?.text||T.gray}}>{day}</div>
                    <div style={{fontSize:7,fontWeight:800,color:sc?.text||T.gray}}>{sh}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

// ─── DIRECTORY ────────────────────────────────────────────────────────────────
function Directory({ currentUser, staff, onUpdateStaff, onAddStaff, onDeactivate, departments }) {
  const [search, setSearch] = useState('')
  const [deptF, setDeptF] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [form, setForm] = useState({name:'',dept:'Cashier',shift:'MOR',role:'staff',id:''})
  const canEdit = currentUser.role==='admin'||currentUser.role==='supervisor'
  const depts = departments || DEFAULT_DEPARTMENTS
  const deptNames = depts.map(d=>d.id)

  const filtered = staff.filter(s=>s.id!=='ADMIN'&&(search===''||s.name.toLowerCase().includes(search.toLowerCase())||s.id.toLowerCase().includes(search.toLowerCase()))&&(deptF==='All'||s.dept===deptF))

  const openAdd = () => { setForm({name:'',dept:'Cashier',shift:'MOR',role:'staff',id:''}); setEditTarget(null); setShowForm(true) }
  const openEdit = s => { setForm({name:s.name,dept:s.dept,shift:s.shift,role:s.role,id:s.id}); setEditTarget(s); setShowForm(true) }
  const save = () => {
    if(!form.name.trim()) return
    if(editTarget) { onUpdateStaff({...editTarget,...form}) }
    else { const nid=form.id.trim().toUpperCase()||'S'+String(Date.now()).slice(-4); onAddStaff({...form,id:nid,active:true,pin:'1234',shiftLocked:false}) }
    setShowForm(false)
  }

  return (
    <div style={{padding:'12px 14px 80px'}}>
      <div style={{display:'flex',gap:8,marginBottom:10}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search name or ID…" style={{...inputStyle,marginBottom:0,flex:1}}/>
        {canEdit&&<button onClick={openAdd} style={{...btn('primary'),flexShrink:0}}>+ Add</button>}
      </div>
      <div style={{display:'flex',gap:5,overflowX:'auto',marginBottom:12,paddingBottom:4}}>
        {['All',...deptNames].map(d=><button key={d} onClick={()=>setDeptF(d)} style={{...btnSm(deptF===d?'primary':'ghost'),flexShrink:0,fontSize:11}}>{d}</button>)}
      </div>
      <div style={{fontSize:11,color:T.gray,marginBottom:8,fontWeight:600}}>{filtered.filter(s=>s.active).length} active · {filtered.filter(s=>!s.active).length} inactive</div>

      {filtered.map(s=>(
        <div key={s.id} style={{...card,padding:'12px 14px',marginBottom:8,opacity:s.active?1:0.55}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <Avatar s={s}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:700,color:T.dark,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                {s.name} {!s.active&&<span style={{fontSize:10,color:T.red,fontWeight:700}}>INACTIVE</span>}
              </div>
              <div style={{display:'flex',gap:4,marginTop:4,flexWrap:'wrap'}}>
                <span style={deptBadge(s.dept)}>{s.dept}</span>
                <span style={shiftBadge(s.shift)}>{s.shift}</span>
                {s.role==='supervisor'&&<span style={{...deptBadge(s.dept),background:T.blueLight,color:T.blue}}>SUP</span>}
                <span style={{fontSize:10,color:T.gray,padding:'2px 6px',background:T.grayLight,borderRadius:20,fontWeight:600}}>{s.id}</span>
                {s.shiftLocked&&<span style={{fontSize:9,color:'#4527A0',fontWeight:700,background:'#EDE7F6',padding:'1px 5px',borderRadius:10}}>🔒</span>}
              </div>
            </div>
            {canEdit&&(
              <div style={{display:'flex',gap:4,flexShrink:0}}>
                <button onClick={()=>openEdit(s)} style={btnSm('secondary')}>✏️</button>
                {currentUser.role==='admin'&&<button onClick={()=>onDeactivate(s.id)} style={btnSm('danger')}>{s.active?'🚫':'✅'}</button>}
              </div>
            )}
          </div>
        </div>
      ))}

      <Modal show={showForm} onClose={()=>setShowForm(false)} title={editTarget?'Edit Staff':'Add Staff'}>
        {!editTarget&&<><label style={labelStyle}>Staff ID (optional)</label><input value={form.id} onChange={e=>setForm(f=>({...f,id:e.target.value}))} placeholder="e.g. S045" style={inputStyle}/></>}
        <label style={labelStyle}>Full Name</label>
        <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Full Name" style={inputStyle}/>
        <label style={labelStyle}>Department</label>
        <select value={form.dept} onChange={e=>setForm(f=>({...f,dept:e.target.value}))} style={selectStyle}>{deptNames.map(d=><option key={d}>{d}</option>)}</select>
        <label style={labelStyle}>Shift</label>
        <select value={form.shift} onChange={e=>setForm(f=>({...f,shift:e.target.value}))} style={selectStyle}>
          <option value="MOR">Morning (7:30AM–3:00PM)</option>
          <option value="AFT">Afternoon (1:30PM–9:00PM)</option>
        </select>
        <label style={labelStyle}>Role</label>
        <select value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))} style={selectStyle}>
          <option value="staff">Staff</option>
          <option value="supervisor">Supervisor</option>
          {currentUser.role==='admin'&&<option value="admin">Admin</option>}
        </select>
        <div style={{display:'flex',gap:8}}>
          <button onClick={save} style={{...btn('primary'),flex:1,justifyContent:'center'}}>💾 Save</button>
          <button onClick={()=>setShowForm(false)} style={{...btn('ghost'),flex:1,justifyContent:'center'}}>Cancel</button>
        </div>
      </Modal>
    </div>
  )
}

// ─── TASKS ────────────────────────────────────────────────────────────────────
function Tasks({ currentUser, staff, assignments, onUpdateAssignments, departments }) {
  const [tab, setTab] = useState('active')
  const [showCreate, setShowCreate] = useState(false)
  const [selected, setSelected] = useState(null)
  const [comment, setComment] = useState('')
  const [form, setForm] = useState({title:'',description:'',departments:['All'],steps:['']})
  const canCreate = currentUser.role==='admin'||currentUser.role==='supervisor'
  const deptNames = (departments||DEFAULT_DEPARTMENTS).map(d=>d.id)

  const active = assignments.filter(a=>a.active)
  const archived = assignments.filter(a=>!a.active)
  const list = tab==='active'?active:archived

  const create = () => {
    const steps = form.steps.filter(s=>s.trim()).map((s,i)=>({id:i,text:s,done:false,completedBy:null,completedAt:null}))
    if(!form.title.trim()||!steps.length) return
    onUpdateAssignments([...assignments,{id:'A'+Date.now(),title:form.title,description:form.description,departments:form.departments,steps,comments:[],createdBy:currentUser.id,createdAt:new Date().toISOString(),active:true}])
    setShowCreate(false); setForm({title:'',description:'',departments:['All'],steps:['']})
  }

  const completeStep = (aid, idx) => {
    onUpdateAssignments(assignments.map(a=>{
      if(a.id!==aid) return a
      if(idx>0&&!a.steps[idx-1]?.done) return a
      return {...a,steps:a.steps.map((s,i)=>i===idx?{...s,done:true,completedBy:currentUser.name,completedAt:new Date().toISOString()}:s)}
    }))
    setSelected(s=>assignments.find(a=>a.id===aid)||s)
  }

  const addComment = aid => {
    if(!comment.trim()) return
    onUpdateAssignments(assignments.map(a=>a.id===aid?{...a,comments:[...a.comments,{text:comment,by:currentUser.name,at:new Date().toISOString()}]}:a))
    setComment('')
  }

  const selAssign = assignments.find(a=>a.id===selected?.id)||selected

  return (
    <div style={{padding:'12px 14px 80px'}}>
      <div style={{display:'flex',gap:8,marginBottom:14}}>
        <button onClick={()=>setTab('active')} style={btnSm(tab==='active'?'primary':'ghost')}>Active ({active.length})</button>
        <button onClick={()=>setTab('archived')} style={btnSm(tab==='archived'?'primary':'ghost')}>Archived ({archived.length})</button>
        <div style={{flex:1}}/>
        {canCreate&&<button onClick={()=>setShowCreate(true)} style={btn('primary')}>+ New</button>}
      </div>

      {list.length===0&&<div style={{...card,textAlign:'center',padding:32,color:T.gray}}><div style={{fontSize:32,marginBottom:8}}>📋</div><div style={{fontWeight:700}}>No {tab} tasks</div></div>}

      {list.map(a=>{
        const done=a.steps.filter(s=>s.done).length; const pct=Math.round(done/a.steps.length*100)
        return (
          <div key={a.id} style={{...card,cursor:'pointer'}} onClick={()=>setSelected(a)}>
            <div style={{display:'flex',gap:10,alignItems:'center'}}>
              <div style={{width:40,height:40,borderRadius:12,background:T.yellowLight,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>📋</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:800,color:T.dark}}>{a.title}</div>
                <div style={{fontSize:11,color:T.gray}}>{a.departments.join(', ')}</div>
                <div style={{display:'flex',alignItems:'center',gap:8,marginTop:6}}>
                  <div style={{flex:1,height:5,background:T.border,borderRadius:3,overflow:'hidden'}}>
                    <div style={{width:`${pct}%`,height:'100%',background:pct===100?T.green:T.yellow,borderRadius:3}}/>
                  </div>
                  <span style={{fontSize:11,fontWeight:700,color:pct===100?T.green:T.gray}}>{done}/{a.steps.length}</span>
                </div>
              </div>
              {pct===100&&<span>✅</span>}
            </div>
          </div>
        )
      })}

      <Modal show={!!selAssign} onClose={()=>setSelected(null)} title={selAssign?.title}>
        {selAssign&&(
          <>
            {selAssign.description&&<p style={{fontSize:13,color:T.gray,marginBottom:12}}>{selAssign.description}</p>}
            <div style={cardTitle}>Steps</div>
            {selAssign.steps.map((step,idx)=>{
              const locked=idx>0&&!selAssign.steps[idx-1]?.done
              return (
                <div key={idx} style={{display:'flex',gap:10,alignItems:'flex-start',marginBottom:10,opacity:locked?0.4:1}}>
                  <button disabled={locked||step.done} onClick={e=>{e.stopPropagation();completeStep(selAssign.id,idx)}}
                    style={{width:28,height:28,borderRadius:8,border:`2px solid ${step.done?T.green:T.border}`,background:step.done?T.green:'transparent',color:T.white,cursor:locked?'not-allowed':'pointer',fontSize:13,flexShrink:0,fontFamily:"'Nunito',sans-serif"}}>
                    {step.done?'✓':idx+1}
                  </button>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:step.done?T.green:locked?T.gray:T.dark,textDecoration:step.done?'line-through':'none'}}>{step.text}</div>
                    {step.done&&<div style={{fontSize:10,color:T.gray}}>✓ {step.completedBy} · {new Date(step.completedAt).toLocaleString('en-NG',{dateStyle:'short',timeStyle:'short'})}</div>}
                    {locked&&<div style={{fontSize:10,color:T.red}}>🔒 Complete step {idx} first</div>}
                  </div>
                </div>
              )
            })}
            <div style={{marginTop:14}}>
              <div style={cardTitle}>Comments ({selAssign.comments.length})</div>
              {selAssign.comments.map((c,i)=>(
                <div key={i} style={{background:T.grayLight,borderRadius:8,padding:'8px 10px',marginBottom:6}}>
                  <div style={{fontSize:11,fontWeight:700,color:T.blue}}>{c.by}</div>
                  <div style={{fontSize:13,color:T.dark,marginTop:2}}>{c.text}</div>
                  <div style={{fontSize:10,color:T.gray,marginTop:2}}>{new Date(c.at).toLocaleString('en-NG',{dateStyle:'short',timeStyle:'short'})}</div>
                </div>
              ))}
              <div style={{display:'flex',gap:6,marginTop:8}}>
                <input value={comment} onChange={e=>setComment(e.target.value)} placeholder="Add comment…" style={{...inputStyle,marginBottom:0,flex:1}} onKeyDown={e=>e.key==='Enter'&&addComment(selAssign.id)}/>
                <button onClick={()=>addComment(selAssign.id)} style={btnSm('primary')}>Send</button>
              </div>
            </div>
            {canCreate&&selAssign.active&&<button onClick={()=>{onUpdateAssignments(assignments.map(a=>a.id===selAssign.id?{...a,active:false}:a));setSelected(null)}} style={{...btn('danger'),marginTop:12,width:'100%',justifyContent:'center'}}>Archive</button>}
          </>
        )}
      </Modal>

      <Modal show={showCreate} onClose={()=>setShowCreate(false)} title="New Assignment">
        <label style={labelStyle}>Title</label>
        <input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Task title" style={inputStyle}/>
        <label style={labelStyle}>Description</label>
        <input value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} placeholder="Optional" style={inputStyle}/>
        <label style={labelStyle}>Departments</label>
        <div style={{display:'flex',gap:5,flexWrap:'wrap',marginBottom:12}}>
          {['All',...deptNames].map(d=><button key={d} onClick={()=>setForm(f=>({...f,departments:f.departments.includes(d)?f.departments.filter(x=>x!==d):[...f.departments,d]}))} style={{...btnSm(form.departments.includes(d)?'primary':'ghost'),fontSize:11}}>{d}</button>)}
        </div>
        <label style={labelStyle}>Steps</label>
        {form.steps.map((s,i)=>(
          <div key={i} style={{display:'flex',gap:6,marginBottom:6}}>
            <input value={s} onChange={e=>{const ss=[...form.steps];ss[i]=e.target.value;setForm(f=>({...f,steps:ss}))}} placeholder={`Step ${i+1}`} style={{...inputStyle,marginBottom:0,flex:1}}/>
            {form.steps.length>1&&<button onClick={()=>setForm(f=>({...f,steps:f.steps.filter((_,j)=>j!==i)}))} style={btnSm('danger')}>✕</button>}
          </div>
        ))}
        <button onClick={()=>setForm(f=>({...f,steps:[...f.steps,'']}))} style={{...btn('ghost'),marginBottom:14,width:'100%',justifyContent:'center'}}>+ Add Step</button>
        <div style={{display:'flex',gap:8}}>
          <button onClick={create} style={{...btn('primary'),flex:1,justifyContent:'center'}}>Create</button>
          <button onClick={()=>setShowCreate(false)} style={{...btn('ghost'),flex:1,justifyContent:'center'}}>Cancel</button>
        </div>
      </Modal>
    </div>
  )
}

// ─── SHARE ────────────────────────────────────────────────────────────────────
function Share({ currentUser, staff, roster, monthKey, rosterStatus, onApprove, onPublish }) {
  const [copyMsg, setCopyMsg] = useState('')
  const [pwAction, setPwAction] = useState(null)
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState('')
  const [year,month] = monthKey.split('-').map(Number)
  const monthName = new Date(year,month,1).toLocaleDateString('en-NG',{month:'long',year:'numeric'})
  const isAdmin = currentUser.role==='admin'

  const genMsg = s => {
    const r = roster[s.id]||{}
    const lines = Object.entries(r).sort((a,b)=>a[0].localeCompare(b[0])).map(([d,sh])=>`${fmtDate(d)}: ${SHIFT_LABELS[sh]||sh}`).join('\n')
    return `Hello ${s.name}! 👋\nYour *Justrite Superstore* roster for *${monthName}*:\n\n${lines}\n\n_${s.dept} | ${SHIFT_LABELS[s.shift]}_\n_Justrite Ile-Ife_`
  }

  const copyAll = () => { navigator.clipboard.writeText(staff.filter(s=>s.active&&s.id!=='ADMIN').map(genMsg).join('\n\n---\n\n')).then(()=>{setCopyMsg('Copied!');setTimeout(()=>setCopyMsg(''),2500)}) }
  const share = s => window.open(`https://wa.me/?text=${encodeURIComponent(genMsg(s))}`,'_blank')

  const makeICS = entries => {
    const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Justrite//EN','CALSCALE:GREGORIAN']
    entries.forEach(({date,shift})=>{
      if(!shift||shift==='OFF') return
      const [y,m,d]=date.split('-')
      const st={MOR:'073000',AFT:'133000',SUN:'093000',LNG:'100000'}
      const et={MOR:'150000',AFT:'210000',SUN:'213000',LNG:'220000'}
      lines.push('BEGIN:VEVENT',`DTSTART:${y}${m}${d}T${st[shift]||'080000'}`,`DTEND:${y}${m}${d}T${et[shift]||'160000'}`,`SUMMARY:${SHIFT_LABELS[shift]} – Justrite Superstore`,`DESCRIPTION:${SHIFT_TIMES[shift]}`,`LOCATION:Justrite Superstore Ile-Ife`,'BEGIN:VALARM','TRIGGER:-PT30M','ACTION:DISPLAY','DESCRIPTION:Shift Reminder','END:VALARM','END:VEVENT')
    })
    lines.push('END:VCALENDAR'); return lines.join('\r\n')
  }

  const dlICS = (content, name) => { const b=new Blob([content],{type:'text/calendar'}); const u=URL.createObjectURL(b); const a=document.createElement('a'); a.href=u; a.download=name; a.click(); URL.revokeObjectURL(u) }
  const myRoster = roster[currentUser.id]||{}
  const exportMonth = () => { const entries=Object.entries(myRoster).map(([date,shift])=>({date,shift})); dlICS(makeICS(entries),`justrite-${monthKey}.ics`) }
  const exportWeek = () => { const ws=startOfWeek(new Date()); const dates=Array.from({length:7},(_,i)=>isoDate(addDays(ws,i))); dlICS(makeICS(dates.map(d=>({date:d,shift:myRoster[d]}))),`justrite-week.ics`) }

  const submitPw = () => {
    if(pw!=='justrt2024'){setPwErr('Incorrect password');return}
    if(pwAction==='approve') onApprove()
    if(pwAction==='publish') onPublish()
    setPwAction(null); setPw(''); setPwErr('')
  }

  return (
    <div style={{padding:'12px 14px 80px'}}>
      <div style={card}>
        <div style={cardTitle}>Roster Status</div>
        <div style={{display:'flex',gap:8,marginBottom:14,flexWrap:'wrap'}}>
          {['draft','approved','published'].map(st=>(
            <div key={st} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 12px',borderRadius:8,background:rosterStatus===st?T.yellowLight:T.grayLight,border:`1.5px solid ${rosterStatus===st?T.yellow:T.border}`}}>
              <div style={{width:8,height:8,borderRadius:'50%',background:rosterStatus===st?(st==='published'?T.green:T.yellow):'#D1D5DB'}}/>
              <span style={{fontSize:12,fontWeight:700,color:rosterStatus===st?T.yellowDark:T.gray,textTransform:'capitalize'}}>{st}</span>
            </div>
          ))}
        </div>
        {isAdmin&&(
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {rosterStatus==='draft'&&<button onClick={()=>setPwAction('approve')} style={btn('secondary')}>✅ Approve</button>}
            {rosterStatus==='approved'&&<button onClick={()=>setPwAction('publish')} style={btn('primary')}>📢 Publish</button>}
            {rosterStatus==='published'&&<button onClick={()=>setPwAction('approve')} style={btn('ghost')}>🔓 Unlock</button>}
          </div>
        )}
      </div>

      <div style={card}>
        <div style={cardTitle}>Export My Schedule</div>
        <div style={{fontSize:12,color:T.gray,marginBottom:10}}>Download to Apple Calendar, Google Calendar or Outlook</div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={exportWeek} style={{...btn('secondary'),flex:1,justifyContent:'center'}}>📅 This Week</button>
          <button onClick={exportMonth} style={{...btn('secondary'),flex:1,justifyContent:'center'}}>📆 Full Month</button>
        </div>
      </div>

      <div style={card}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <div style={cardTitle}>WhatsApp Notify</div>
          <button onClick={copyAll} style={btnSm('primary')}>{copyMsg||'📋 Copy All'}</button>
        </div>
        {staff.filter(s=>s.active&&s.id!=='ADMIN').map(s=>(
          <div key={s.id} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:`1px solid ${T.border}`}}>
            <Avatar s={s}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:700,color:T.dark,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s.name}</div>
              <div style={{fontSize:11,color:T.gray}}>{s.dept}</div>
            </div>
            <button onClick={()=>share(s)} style={btnSm('success')}>📱 Send</button>
          </div>
        ))}
      </div>

      <Modal show={!!pwAction} onClose={()=>{setPwAction(null);setPw('');setPwErr('')}}>
        <div style={{textAlign:'center',marginBottom:16}}>
          <div style={{fontSize:36,marginBottom:8}}>🔐</div>
          <div style={{fontSize:16,fontWeight:800,color:T.dark}}>Admin Password Required</div>
          <div style={{fontSize:12,color:T.gray,marginTop:4}}>To {pwAction} the roster</div>
        </div>
        <input value={pw} onChange={e=>setPw(e.target.value)} type="password" placeholder="Enter admin password" style={inputStyle} onKeyDown={e=>e.key==='Enter'&&submitPw()}/>
        {pwErr&&<div style={{color:T.red,fontSize:12,marginBottom:8,fontWeight:600}}>{pwErr}</div>}
        <button onClick={submitPw} style={{...btn('primary'),width:'100%',justifyContent:'center'}}>Confirm</button>
      </Modal>
    </div>
  )
}

// ─── DEPARTMENT MANAGER ───────────────────────────────────────────────────────
function DeptManager({ departments, onUpdateDepts, staff }) {
  const [showForm, setShowForm] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [form, setForm] = useState({ name:'', isPlaceholder:false })
  const [msg, setMsg] = useState('')

  const openAdd = () => { setForm({name:'',isPlaceholder:false}); setEditTarget(null); setShowForm(true); setMsg('') }
  const openEdit = d => { setForm({name:d.name,isPlaceholder:d.isPlaceholder}); setEditTarget(d); setShowForm(true); setMsg('') }

  const save = () => {
    if (!form.name.trim()) { setMsg('Name is required'); return }
    if (editTarget) {
      onUpdateDepts(departments.map(d=>d.id===editTarget.id?{...d,name:form.name,isPlaceholder:form.isPlaceholder}:d))
    } else {
      const id = form.name.trim()
      if (departments.find(d=>d.id===id)) { setMsg('Department already exists'); return }
      onUpdateDepts([...departments, {id, name:id, isPlaceholder:form.isPlaceholder}])
    }
    setShowForm(false); setMsg('')
  }

  const remove = d => {
    const count = staff.filter(s=>s.dept===d.id&&s.active).length
    if (count > 0) { setMsg(`Cannot delete: ${count} active staff in ${d.name}`); return }
    onUpdateDepts(departments.filter(x=>x.id!==d.id))
    setMsg('')
  }

  return (
    <div style={{padding:'12px 14px 80px'}}>
      <div style={{...card,background:`linear-gradient(135deg,${T.blue},${T.dark})`,padding:16,marginBottom:12}}>
        <div style={{fontSize:10,color:'rgba(255,255,255,0.4)',letterSpacing:2,marginBottom:4}}>DEPT MANAGER</div>
        <div style={{fontSize:20,fontWeight:900,color:T.white,fontFamily:"'Barlow Condensed',sans-serif"}}>Manage Departments</div>
        <div style={{fontSize:12,color:'rgba(255,255,255,0.5)',marginTop:4}}>Add, edit or remove departments. Placeholder departments skip automation.</div>
      </div>

      {msg&&<div style={{...card,background:T.redLight,border:`1px solid ${T.red}`,color:T.red,fontSize:13,fontWeight:600,padding:12,marginBottom:12}}>{msg}</div>}

      <button onClick={openAdd} style={{...btn('primary'),marginBottom:12}}>+ Add Department</button>

      {departments.map(d => {
        const staffCount = staff.filter(s=>s.dept===d.id&&s.active).length
        return (
          <div key={d.id} style={{...card,padding:'12px 14px',marginBottom:8}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div style={{flex:1}}>
                <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap',marginBottom:4}}>
                  <span style={deptBadge(d.id)}>{d.name}</span>
                  {d.isPlaceholder&&<span style={{fontSize:9,color:'#4527A0',fontWeight:700,background:'#EDE7F6',padding:'1px 6px',borderRadius:10}}>PLACEHOLDER</span>}
                </div>
                <div style={{fontSize:11,color:T.gray}}>{staffCount} active staff · {d.isPlaceholder?'No automation':'Auto-roster enabled'}</div>
              </div>
              <div style={{display:'flex',gap:4,flexShrink:0}}>
                <button onClick={()=>openEdit(d)} style={btnSm('secondary')}>✏️</button>
                <button onClick={()=>remove(d)} style={btnSm('danger')}>🗑️</button>
              </div>
            </div>
          </div>
        )
      })}

      <Modal show={showForm} onClose={()=>setShowForm(false)} title={editTarget?'Edit Department':'Add Department'}>
        <label style={labelStyle}>Department Name</label>
        <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Bakery" style={inputStyle}/>
        <label style={{...labelStyle,marginBottom:10}}>Type</label>
        <div style={{display:'flex',gap:8,marginBottom:12}}>
          <button onClick={()=>setForm(f=>({...f,isPlaceholder:false}))} style={btnSm(form.isPlaceholder?'ghost':'primary')}>⚙️ Auto-Roster</button>
          <button onClick={()=>setForm(f=>({...f,isPlaceholder:true}))} style={btnSm(form.isPlaceholder?'primary':'ghost')}>📋 Placeholder</button>
        </div>
        <div style={{fontSize:12,color:T.gray,marginBottom:14}}>
          {form.isPlaceholder?'Placeholder departments appear in the roster view but have no automatic scheduling.':'Auto-roster departments get full shift rotation, off-day generation, and capacity checks.'}
        </div>
        {msg&&<div style={{color:T.red,fontSize:12,marginBottom:8,fontWeight:600}}>{msg}</div>}
        <div style={{display:'flex',gap:8}}>
          <button onClick={save} style={{...btn('primary'),flex:1,justifyContent:'center'}}>💾 Save</button>
          <button onClick={()=>setShowForm(false)} style={{...btn('ghost'),flex:1,justifyContent:'center'}}>Cancel</button>
        </div>
      </Modal>
    </div>
  )
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
function Admin({ staff, roster, monthKey, onRegenerate, onMonthChange, departments, onUpdateStaff, autoBalanceEnabled, onToggleAutoBalance }) {
  const [year,month] = monthKey.split('-').map(Number)
  const [overrideTarget, setOverrideTarget] = useState(null)
  const [overrideForm, setOverrideForm] = useState({shift:'MOR',shiftLocked:false})
  const [msg, setMsg] = useState('')

  const depts = departments || DEFAULT_DEPARTMENTS
  const byDept = useMemo(()=>{
    const r={}; depts.forEach(d=>{ r[d.id]=staff.filter(s=>s.active&&s.dept===d.id&&s.id!=='ADMIN') }); return r
  },[staff, depts])

  const warnings = useMemo(()=>getCapacityWarnings(staff,roster,year,month,depts),[staff,roster,year,month,depts])

  const openOverride = s => { setOverrideTarget(s); setOverrideForm({shift:s.shift, shiftLocked:s.shiftLocked||false}) }

  const applyOverride = () => {
    if (!overrideTarget) return
    onUpdateStaff({...overrideTarget, shift:overrideForm.shift, shiftLocked:overrideForm.shiftLocked})
    setMsg(`✅ Override applied for ${overrideTarget.name}`)
    setOverrideTarget(null)
    setTimeout(()=>setMsg(''),3000)
  }

  const activeDepts = depts.filter(d=>!d.isPlaceholder)
  const placeholderDepts = depts.filter(d=>d.isPlaceholder)

  return (
    <div style={{padding:'12px 14px 80px'}}>
      <div style={{...card,background:`linear-gradient(135deg,${T.blue},${T.dark})`,padding:16,marginBottom:12}}>
        <div style={{fontSize:10,color:'rgba(255,255,255,0.4)',letterSpacing:2,textTransform:'uppercase',marginBottom:4}}>Admin Panel</div>
        <div style={{fontSize:20,fontWeight:900,color:T.white,fontFamily:"'Barlow Condensed',sans-serif"}}>Roster Management</div>
        <div style={{fontSize:12,color:'rgba(255,255,255,0.5)',marginTop:4}}>{new Date(year,month,1).toLocaleDateString('en-NG',{month:'long',year:'numeric'})}</div>
      </div>

      {msg&&<div style={{...card,background:'#E8F5E9',border:`1px solid ${T.green}`,color:T.green,fontSize:13,fontWeight:700,padding:12}}>{msg}</div>}

      {/* System Controls */}
      <div style={card}>
        <div style={cardTitle}>System Controls</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:`1px solid ${T.border}`}}>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:T.dark}}>Auto-Balance</div>
            <div style={{fontSize:11,color:T.gray}}>Rebalance when depts fall below 50% capacity</div>
          </div>
          <button onClick={onToggleAutoBalance} style={btnSm(autoBalanceEnabled?'success':'ghost')}>
            {autoBalanceEnabled?'✅ ON':'⭕ OFF'}
          </button>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0'}}>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:T.dark}}>Weekly Rotation</div>
            <div style={{fontSize:11,color:T.gray}}>Morning ↔ Afternoon alternates each week</div>
          </div>
          <span style={{fontSize:11,fontWeight:700,color:T.green,background:'#E8F5E9',padding:'3px 8px',borderRadius:6}}>ALWAYS ON</span>
        </div>
      </div>

      {/* Active Departments */}
      <div style={card}>
        <div style={cardTitle}>Active Department Breakdown</div>
        {activeDepts.map(d=>(
          <div key={d.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'7px 0',borderBottom:`1px solid ${T.border}`}}>
            <span style={deptBadge(d.id)}>{d.name}</span>
            <div style={{display:'flex',gap:10}}>
              <span style={{fontSize:12,fontWeight:700,color:T.dark}}>{(byDept[d.id]||[]).length} staff</span>
              <span style={{fontSize:11,color:T.gray}}>{(byDept[d.id]||[]).filter(s=>s.shift==='MOR').length}M / {(byDept[d.id]||[]).filter(s=>s.shift==='AFT').length}A</span>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder Modules */}
      {placeholderDepts.map(d=>(
        <div key={d.id} style={{...card,border:`2px dashed ${T.border}`,background:T.grayLight,padding:14}}>
          <div style={{display:'flex',gap:10,alignItems:'center'}}>
            <div style={{fontSize:24}}>{d.id==='Security'?'🛡️':'🏷️'}</div>
            <div>
              <div style={{fontSize:13,fontWeight:800,color:T.dark}}>{d.name} — Placeholder Module</div>
              <div style={{fontSize:11,color:T.gray}}>Staff: {(byDept[d.id]||[]).length} · No automation active</div>
            </div>
          </div>
        </div>
      ))}

      {/* Coverage Warnings */}
      {warnings.length>0&&(
        <div style={{...card,border:`1.5px solid ${T.red}`}}>
          <div style={{...cardTitle,color:T.red}}>⚠️ Coverage Warnings ({warnings.length})</div>
          {warnings.map((w,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:`1px solid ${T.border}`,fontSize:12}}>
              <span style={{fontWeight:700}}>{w.dept} {w.shift}</span>
              <span style={{color:T.gray}}>{fmtDate(w.date)}</span>
              <span style={{color:T.red,fontWeight:700}}>{w.present}/{w.total}</span>
            </div>
          ))}
          <div style={{fontSize:11,color:T.gray,marginTop:8}}>Dates with less than 50% department capacity.</div>
        </div>
      )}

      {/* Shift Overrides */}
      <div style={card}>
        <div style={cardTitle}>Staff Shift Overrides</div>
        <div style={{fontSize:12,color:T.gray,marginBottom:10}}>Manually change a staff member's base shift and optionally lock it from weekly rotation.</div>
        <div style={{maxHeight:300,overflowY:'auto'}}>
          {staff.filter(s=>s.id!=='ADMIN'&&s.active).map(s=>(
            <div key={s.id} style={{display:'flex',alignItems:'center',gap:8,padding:'6px 0',borderBottom:`1px solid ${T.border}`}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12,fontWeight:700,color:T.dark,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s.name}</div>
                <div style={{fontSize:10,color:T.gray}}>{s.dept}</div>
              </div>
              <span style={shiftBadge(s.shift)}>{s.shift}</span>
              {s.shiftLocked&&<span style={{fontSize:9,color:'#4527A0',fontWeight:700,background:'#EDE7F6',padding:'1px 5px',borderRadius:10}}>🔒</span>}
              <button onClick={()=>openOverride(s)} style={btnSm('secondary')}>Override</button>
            </div>
          ))}
        </div>
      </div>

      {/* Roster Engine */}
      <div style={card}>
        <div style={cardTitle}>Roster Engine</div>
        <p style={{fontSize:12,color:T.gray,marginBottom:12}}>Regenerate the auto-roster for this month. Placeholder departments are excluded. Base shift assignments are preserved; only offs, long hours, and rotation are recalculated.</p>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
          <button onClick={()=>onMonthChange(-1)} style={btnSm('ghost')}>◀</button>
          <div style={{flex:1,textAlign:'center',fontSize:13,fontWeight:700}}>{new Date(year,month,1).toLocaleDateString('en-NG',{month:'long',year:'numeric'})}</div>
          <button onClick={()=>onMonthChange(1)} style={btnSm('ghost')}>▶</button>
        </div>
        <button onClick={onRegenerate} style={{...btn('primary'),width:'100%',justifyContent:'center'}}>🔄 Regenerate Roster</button>
      </div>

      {/* Override Modal */}
      <Modal show={!!overrideTarget} onClose={()=>setOverrideTarget(null)} title={`Override: ${overrideTarget?.name}`}>
        {overrideTarget&&(
          <>
            <div style={{fontSize:12,color:T.gray,marginBottom:12}}>Set a permanent shift for this staff member. Optionally lock it to prevent weekly rotation.</div>
            <label style={labelStyle}>Assign Shift</label>
            <select value={overrideForm.shift} onChange={e=>setOverrideForm(f=>({...f,shift:e.target.value}))} style={selectStyle}>
              <option value="MOR">Morning (7:30AM–3:00PM)</option>
              <option value="AFT">Afternoon (1:30PM–9:00PM)</option>
            </select>
            <label style={{...labelStyle,marginBottom:10}}>Rotation</label>
            <div style={{display:'flex',gap:8,marginBottom:14}}>
              <button onClick={()=>setOverrideForm(f=>({...f,shiftLocked:true}))} style={btnSm(overrideForm.shiftLocked?'primary':'ghost')}>🔒 Lock Shift</button>
              <button onClick={()=>setOverrideForm(f=>({...f,shiftLocked:false}))} style={btnSm(!overrideForm.shiftLocked?'primary':'ghost')}>🔓 Allow Rotation</button>
            </div>
            <div style={{fontSize:12,color:T.gray,marginBottom:14}}>
              {overrideForm.shiftLocked?'Staff will stay on this shift permanently — no weekly alternation.':'Staff will follow normal weekly rotation from this base shift.'}
            </div>
            <div style={{display:'flex',gap:8}}>
              <button onClick={applyOverride} style={{...btn('primary'),flex:1,justifyContent:'center'}}>✅ Apply</button>
              <button onClick={()=>setOverrideTarget(null)} style={{...btn('ghost'),flex:1,justifyContent:'center'}}>Cancel</button>
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function Profile({ currentUser, onUpdateUser, onLogout }) {
  const [editPin, setEditPin] = useState(false)
  const [editName, setEditName] = useState(false)
  const [oldPin, setOldPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [newName, setNewName] = useState(currentUser.name)
  const [msg, setMsg] = useState('')

  const changePin = () => {
    if(oldPin!==currentUser.pin){setMsg('❌ Current PIN wrong');return}
    if(newPin.length!==4||isNaN(newPin)){setMsg('❌ PIN must be 4 digits');return}
    if(newPin!==confirmPin){setMsg('❌ PINs do not match');return}
    onUpdateUser({...currentUser,pin:newPin}); setEditPin(false); setOldPin(''); setNewPin(''); setConfirmPin(''); setMsg('✅ PIN updated')
    setTimeout(()=>setMsg(''),3000)
  }

  return (
    <div style={{padding:'12px 14px 80px'}}>
      <div style={{...card,textAlign:'center',padding:24,background:`linear-gradient(135deg,${T.blue},${T.blueMid})`}}>
        <div style={{...avatarStyle(currentUser.id),width:70,height:70,fontSize:24,margin:'0 auto 12px',borderRadius:18}}>{getInitials(currentUser.name)}</div>
        <div style={{fontSize:22,fontWeight:900,color:T.white,fontFamily:"'Barlow Condensed',sans-serif"}}>{currentUser.name}</div>
        <div style={{fontSize:12,color:'rgba(255,255,255,0.5)',marginTop:4}}>{currentUser.id}</div>
        <div style={{display:'flex',gap:8,justifyContent:'center',marginTop:10,flexWrap:'wrap'}}>
          <span style={deptBadge(currentUser.dept)}>{currentUser.dept}</span>
          <span style={{background:'rgba(255,255,255,0.15)',color:T.white,padding:'2px 8px',borderRadius:20,fontSize:10,fontWeight:700}}>{currentUser.role.toUpperCase()}</span>
          <span style={shiftBadge(currentUser.shift)}>{currentUser.shift}</span>
          {currentUser.shiftLocked&&<span style={{background:'rgba(255,255,255,0.15)',color:T.white,padding:'2px 8px',borderRadius:20,fontSize:10,fontWeight:700}}>🔒 LOCKED</span>}
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:8}}>
        <div style={{...card,marginBottom:0,textAlign:'center',padding:14}}>
          <div style={{fontSize:16,fontWeight:900,color:T.yellow}}>{SHIFT_LABELS[currentUser.shift]}</div>
          <div style={{fontSize:10,color:T.gray,fontWeight:600,marginTop:3}}>{currentUser.shiftLocked?'Locked Shift':'Base Shift'}</div>
        </div>
        <div style={{...card,marginBottom:0,textAlign:'center',padding:14}}>
          <div style={{fontSize:13,fontWeight:800,color:T.blue}}>{SHIFT_TIMES[currentUser.shift]}</div>
          <div style={{fontSize:10,color:T.gray,fontWeight:600,marginTop:3}}>Work Hours</div>
        </div>
      </div>

      {!currentUser.shiftLocked&&(
        <div style={{...card,background:T.blueLight,marginBottom:8,padding:12}}>
          <div style={{fontSize:12,color:T.blue,fontWeight:600}}>🔄 Weekly Rotation Active — Your shift alternates each week (Morning ↔ Afternoon)</div>
        </div>
      )}

      <div style={card}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div><div style={{fontSize:14,fontWeight:700,color:T.dark}}>Display Name</div><div style={{fontSize:11,color:T.gray}}>{currentUser.name}</div></div>
          <button onClick={()=>setEditName(!editName)} style={btnSm('secondary')}>{editName?'Cancel':'Edit'}</button>
        </div>
        {editName&&<><input value={newName} onChange={e=>setNewName(e.target.value)} style={{...inputStyle,marginTop:12}}/><button onClick={()=>{onUpdateUser({...currentUser,name:newName});setEditName(false)}} style={{...btn('primary'),width:'100%',justifyContent:'center'}}>Save Name</button></>}
      </div>

      <div style={card}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div><div style={{fontSize:14,fontWeight:700,color:T.dark}}>Change PIN</div><div style={{fontSize:11,color:T.gray}}>4-digit login PIN</div></div>
          <button onClick={()=>setEditPin(!editPin)} style={btnSm('secondary')}>{editPin?'Cancel':'Change'}</button>
        </div>
        {editPin&&(
          <div style={{marginTop:12}}>
            <label style={labelStyle}>Current PIN</label>
            <input type="password" value={oldPin} onChange={e=>setOldPin(e.target.value)} maxLength={4} placeholder="Current PIN" style={inputStyle}/>
            <label style={labelStyle}>New PIN</label>
            <input type="password" value={newPin} onChange={e=>setNewPin(e.target.value)} maxLength={4} placeholder="New 4-digit PIN" style={inputStyle}/>
            <label style={labelStyle}>Confirm PIN</label>
            <input type="password" value={confirmPin} onChange={e=>setConfirmPin(e.target.value)} maxLength={4} placeholder="Confirm PIN" style={inputStyle}/>
            <button onClick={changePin} style={{...btn('primary'),width:'100%',justifyContent:'center'}}>Update PIN</button>
          </div>
        )}
        {msg&&<div style={{fontSize:12,fontWeight:600,color:msg.startsWith('✅')?T.green:T.red,marginTop:8}}>{msg}</div>}
      </div>

      <button onClick={onLogout} style={{...btn('danger'),width:'100%',justifyContent:'center',marginTop:4}}>🚪 Sign Out</button>
    </div>
  )
}

// ─── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [staff, setStaff] = useState(()=>{ try{ const s=localStorage.getItem('jr_staff'); return s?JSON.parse(s):INITIAL_STAFF }catch{return INITIAL_STAFF} })
  const [departments, setDepartments] = useState(()=>{ try{ const d=localStorage.getItem('jr_depts'); return d?JSON.parse(d):DEFAULT_DEPARTMENTS }catch{return DEFAULT_DEPARTMENTS} })
  const [currentUser, setCurrentUser] = useState(null)
  const [tab, setTab] = useState('home')
  const [rosterStatus, setRosterStatus] = useState(()=>{ try{ return localStorage.getItem('jr_rs')||'draft' }catch{return 'draft'} })
  const [autoBalanceEnabled, setAutoBalanceEnabled] = useState(()=>{ try{ return localStorage.getItem('jr_ab')!=='false' }catch{return true} })

  const now = new Date()
  const defKey = `${now.getFullYear()}-${now.getMonth()}`
  const [monthKey, setMonthKey] = useState(defKey)
  const [roster, setRoster] = useState(()=>{ try{ const s=localStorage.getItem('jr_r_'+defKey); return s?JSON.parse(s):{} }catch{return {}} })
  const [assignments, setAssignments] = useState(()=>{ try{ const s=localStorage.getItem('jr_a'); return s?JSON.parse(s):[] }catch{return []} })

  useEffect(()=>{ if(!Object.keys(roster).length){ const[y,m]=monthKey.split('-').map(Number); setRoster(generateMonthRoster(staff,y,m,departments)) } },[])
  useEffect(()=>{ try{localStorage.setItem('jr_staff',JSON.stringify(staff))}catch{} },[staff])
  useEffect(()=>{ try{localStorage.setItem('jr_depts',JSON.stringify(departments))}catch{} },[departments])
  useEffect(()=>{ try{localStorage.setItem('jr_r_'+monthKey,JSON.stringify(roster))}catch{} },[roster,monthKey])
  useEffect(()=>{ try{localStorage.setItem('jr_rs',rosterStatus)}catch{} },[rosterStatus])
  useEffect(()=>{ try{localStorage.setItem('jr_a',JSON.stringify(assignments))}catch{} },[assignments])
  useEffect(()=>{ try{localStorage.setItem('jr_ab',String(autoBalanceEnabled))}catch{} },[autoBalanceEnabled])

  const changeMonth = dir => {
    const[y,m]=monthKey.split('-').map(Number)
    const nd=new Date(y,m+dir,1)
    const nk=`${nd.getFullYear()}-${nd.getMonth()}`
    setMonthKey(nk)
    try{ const s=localStorage.getItem('jr_r_'+nk); if(s){setRoster(JSON.parse(s))}else{setRoster(generateMonthRoster(staff,nd.getFullYear(),nd.getMonth(),departments))} }catch{}
  }

  const updateStaff = updated => { setStaff(s=>s.map(x=>x.id===updated.id?updated:x)); if(currentUser?.id===updated.id) setCurrentUser(updated) }
  const addStaff = ns => { if(staff.find(s=>s.id===ns.id)){alert('ID already exists');return} setStaff(s=>[...s,ns]) }
  const deactivate = id => setStaff(s=>s.map(x=>x.id===id?{...x,active:!x.active}:x))
  const regen = () => { const[y,m]=monthKey.split('-').map(Number); setRoster(generateMonthRoster(staff,y,m,departments)); setRosterStatus('draft') }

  const isAdmin = currentUser?.role==='admin'

  const TABS = [
    {id:'home',icon:'🏠',label:'Home'},
    {id:'roster',icon:'📅',label:'Roster'},
    {id:'directory',icon:'👥',label:'Staff'},
    {id:'tasks',icon:'📋',label:'Tasks'},
    ...(isAdmin?[
      {id:'admin',icon:'⚙️',label:'Admin'},
      {id:'deptmgr',icon:'🏬',label:'Depts'},
    ]:[]),
    {id:'share',icon:'📤',label:'Share'},
    {id:'profile',icon:'👤',label:'Me'},
  ]

  if (!currentUser) return <LoginScreen staff={staff} onLogin={setCurrentUser}/>

  const renderPage = () => {
    switch(tab){
      case 'home': return <Dashboard currentUser={currentUser} staff={staff} roster={roster} assignments={assignments} departments={departments}/>
      case 'roster': return <RosterView currentUser={currentUser} staff={staff} roster={roster} rosterStatus={rosterStatus} monthKey={monthKey} onMonthChange={changeMonth} departments={departments}/>
      case 'directory': return <Directory currentUser={currentUser} staff={staff} onUpdateStaff={updateStaff} onAddStaff={addStaff} onDeactivate={deactivate} departments={departments}/>
      case 'tasks': return <Tasks currentUser={currentUser} staff={staff} assignments={assignments} onUpdateAssignments={setAssignments} departments={departments}/>
      case 'admin': return <Admin staff={staff} roster={roster} monthKey={monthKey} onRegenerate={regen} onMonthChange={changeMonth} departments={departments} onUpdateStaff={updateStaff} autoBalanceEnabled={autoBalanceEnabled} onToggleAutoBalance={()=>setAutoBalanceEnabled(v=>!v)}/>
      case 'deptmgr': return <DeptManager departments={departments} onUpdateDepts={setDepartments} staff={staff}/>
      case 'share': return <Share currentUser={currentUser} staff={staff} roster={roster} monthKey={monthKey} rosterStatus={rosterStatus} onApprove={()=>setRosterStatus('approved')} onPublish={()=>setRosterStatus('published')}/>
      case 'profile': return <Profile currentUser={currentUser} onUpdateUser={updateStaff} onLogout={()=>{setCurrentUser(null);setTab('home')}}/>
      default: return null
    }
  }

  return (
    <div style={{minHeight:'100vh',background:T.grayLight,fontFamily:"'Nunito',sans-serif"}}>
      <style>{`
        @keyframes slideUp{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}
        input::placeholder{color:#9CA3AF}
        input:focus,select:focus{border-color:#F5A623!important;box-shadow:0 0 0 3px rgba(245,166,35,0.15)!important;outline:none}
        *{-webkit-tap-highlight-color:transparent}
        button:active{opacity:0.8}
      `}</style>

      <div style={{background:`linear-gradient(135deg,${T.blue},${T.blueMid})`,position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 12px rgba(0,0,0,0.2)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px 8px'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:36,height:36,background:T.yellow,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>🛒</div>
            <div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:17,color:T.white,lineHeight:1.1}}>JUSTRITE SUPERSTORE</div>
              <div style={{fontSize:9,color:'rgba(255,255,255,0.5)',letterSpacing:2,textTransform:'uppercase'}}>Ile-Ife · Roster System</div>
            </div>
          </div>
          <div style={{...avatarStyle(currentUser.id),width:34,height:34,fontSize:11,borderRadius:10,border:`2px solid ${T.yellow}`,cursor:'pointer',flexShrink:0}} onClick={()=>setTab('profile')}>
            {getInitials(currentUser.name)}
          </div>
        </div>
        <div style={{display:'flex',borderTop:'1px solid rgba(255,255,255,0.1)',overflowX:'auto'}}>
          {TABS.map(t=>(
            <div key={t.id} onClick={()=>setTab(t.id)} style={{flex:'0 0 auto',padding:'9px 14px',fontSize:11,fontWeight:tab===t.id?800:600,color:tab===t.id?T.yellow:'rgba(255,255,255,0.55)',background:tab===t.id?'rgba(245,166,35,0.15)':'transparent',borderBottom:tab===t.id?`2px solid ${T.yellow}`:'2px solid transparent',cursor:'pointer',whiteSpace:'nowrap',letterSpacing:0.3}}>
              {t.icon} {t.label}
            </div>
          ))}
        </div>
      </div>

      <div style={{background:T.white,padding:'9px 16px',borderBottom:`1px solid ${T.border}`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{fontSize:15,fontWeight:900,color:T.dark,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:0.5}}>
          {TABS.find(t=>t.id===tab)?.icon} {TABS.find(t=>t.id===tab)?.label?.toUpperCase()}
        </div>
        <div style={{fontSize:11,color:T.gray,fontWeight:600}}>
          {new Date().toLocaleDateString('en-NG',{weekday:'short',day:'numeric',month:'short'})}
        </div>
      </div>

      {renderPage()}
    </div>
  )
}
