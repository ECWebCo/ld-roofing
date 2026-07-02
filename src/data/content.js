// ─── Shared site content (reviews, stats, gallery, process) ──────────────────

export const REVIEWS = [
  { name:'Rick', role:'Business Owner', stars:5, text:'"LD Roofing & Exteriors are the most professional and friendly contractors I have ever worked with. Top quality work and great pricing. Lane the owner really cares about helping his clients."' },
  { name:'Jason', role:'Homeowner, Houston', stars:5, text:'"Lane was superb. He kept us informed and was timely along the way. We will certainly use his service again and recommend LD Roofing and Exteriors."' },
  { name:'Ruben', role:'Property Manager', stars:5, text:'"LD Roofing offered a free roof assessment after a hailstorm. Very professional, provided full assistance with our claim process. Our roof was completed in a single day."' },
  { name:'ABNB Owner', role:'Airbnb Host', stars:5, text:'"Lane sent progress photos throughout and made the whole process seamless. It was important they finished the same day, they did, and left everything spotless."' },
  { name:'Robert', role:'Homeowner, Dallas', stars:5, text:'"Robert Wolf was a great communicator, quick to answer questions and walk us through everything. Could not be happier with how the project turned out."' },
]

export const STATS = [
  { num: 500, suffix:'+', label:'Roofs Replaced' },
  { num: 10,  suffix:'+', label:'Years in Business' },
  { num: 63,  suffix:'',  label:'5-Star Reviews' },
  { num: 32,  suffix:'',  label:'Cities Served' },
]

const GBASE = 'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/91a71a5c-5a1c-4814-b85d-b60b4f2cc6bc'
export const GALLERY = [
  { src:'/photos/residential-shingle-aerial.jpg', label:'Residential Roof, Houston' },
  { src:`${GBASE}/collage_3-1778199484168-0-C-Photo-gallery-6.jpg`, label:'Commercial Project, Dallas' },
  { src:`${GBASE}/collage_1-1778199330797-0-gutter-rapair.jpg`, label:'Gutter Repair, Residential' },
  { src:`${GBASE}/collage_4-1778199373951-0-C-photo-gallery-1.jpg`, label:'Commercial Flat, DFW' },
  { src:`${GBASE}/collage_2-1778199341205-0-R-photo-gallery-5.jpg`, label:'Residential, Sugar Land' },
  { src:`${GBASE}/collage_3-1778199367549-0-InstallationMore2.jpg`, label:'Commercial Install, Houston' },
  { src:`${GBASE}/collage_1-1778199334228-0-siding.jpg`, label:'Siding Project, Residential' },
  { src:`${GBASE}/collage_4-1778199380131-0-C-Photo-gallery-5.jpg`, label:'Commercial, Plano' },
  { src:'/photos/roof-replacement-complete.jpg', label:'Roof Replacement, Katy' },
]

export const PROCESS = [
  { n:'01', title:'Free Inspection & Honest Assessment', desc:'Call or submit a form. We arrive on time, inspect thoroughly, document everything with photos, and explain exactly what we find, clearly and honestly.' },
  { n:'02', title:'Clear Estimate', desc:'You receive a detailed, itemized quote. No hidden fees, no high-pressure sales, no surprises. Financing and insurance-claim support available.' },
  { n:'03', title:'Expert Installation', desc:'Our certified crew works efficiently using the right materials for your roof and your budget, protecting your property throughout.' },
  { n:'04', title:'Final Walkthrough', desc:'We review the completed work with you and leave your property cleaner than we found it. Workmanship warranty included.' },
]
