// ─── Roof types ──────────────────────────────────────────────────────────────
// Drives the home "Roof Types" selector AND a dedicated page per material at
// /roof-types/<slug>. img/desc/good/life power the home widget; the rest is SEO.


export const ROOF_TYPES = [
  {
    slug: 'asphalt-shingle',
    name:'Asphalt Shingle', tag:'Most popular',
    img:`/photos/roof-shingle.jpg`,
    desc:'The most common roof in Texas. Affordable, durable, and available in dozens of colors. 25 to 50 year warranties available depending on the line.',
    good:'Most homes, Best value', life:'25-50 yrs',
    metaTitle:'Asphalt Shingle Roofing in Houston & Dallas | LD Roofing',
    metaDescription:'Asphalt shingle roofing in Houston and Dallas. Affordable, durable, and available in dozens of colors. Class 4 impact-resistant options can lower your insurance.',
    intro:'Asphalt shingle is far and away the most popular roofing material in Texas, and for good reason. It offers the best balance of cost, performance, and curb appeal.',
    body:[
      { type:'p', text:'If you want the best balance of cost, performance, and looks, asphalt shingle is almost always the answer. It comes in a wide range of quality tiers, from basic 3-tab to premium architectural and designer shingles that can last half a century.' },
      { type:'p', text:'We typically steer homeowners toward architectural shingles rather than basic 3-tab. The price difference is small but the durability and appearance are noticeably better.' },
      { type:'callout', text:'Most major manufacturers offer impact-resistant Class 4 shingles, which can earn you a discount on home insurance in hail-prone areas. In Texas, this is often a no-brainer.' },
    ],
  },
  {
    slug: 'standing-seam-metal',
    name:'Standing Seam Metal', tag:'Premium look',
    img:`/photos/roof-metal.jpg`,
    desc:'Hidden fastener metal panels for a clean, modern profile. Reflects heat, sheds water, and lasts 2 to 3 times longer than shingles.',
    good:'Modern homes, Coastal, High-end', life:'40-70 yrs',
    metaTitle:'Standing Seam Metal Roofing in Houston & Dallas | LD Roofing',
    metaDescription:'Standing seam metal roofing in Houston and Dallas. Clean modern panels with hidden fasteners that reflect heat, shed water, and last 40 to 70 years.',
    intro:'Standing seam metal is a premium hidden-fastener system. The seams are raised and locked together with no exposed screws, for a clean look that lasts decades.',
    body:[
      { type:'p', text:'Standing seam looks clean, sheds water beautifully, reflects solar heat, and lasts two to three times longer than asphalt shingle. It is a favorite on modern and coastal homes.' },
      { type:'p', text:'The trade-offs are cost and aesthetics. Standing seam typically runs two to three times the cost of a basic shingle roof, and the modern look fits some homes better than others. We are honest about whether the long-term value is worth it for your home.' },
      { type:'callout', text:'Metal roofs perform extremely well in hurricane-force winds and shed hail better than most materials when properly installed.' },
    ],
  },
  {
    slug: 'clay-concrete-tile',
    name:'Clay & Concrete Tile', tag:'Mediterranean',
    img:`/photos/roof-clay.jpg`,
    desc:'Heavy, beautiful, and built to last. Excellent for Spanish, Mediterranean, and Southwestern style homes. Resists fire and rot.',
    good:'Stucco homes, Spanish style', life:'50-100 yrs',
    metaTitle:'Clay & Concrete Tile Roofing in Houston & Dallas | LD Roofing',
    metaDescription:'Clay and concrete tile roofing in Houston and Dallas. Beautiful, fire-resistant, and built to last 50 to 100 years on Spanish and Mediterranean style homes.',
    intro:'Tile roofs are heavy, beautiful, and built to outlast most homeowners. They are the natural choice for Spanish revival, Mediterranean, and Southwestern style homes.',
    body:[
      { type:'p', text:'Tile looks fantastic on stucco exteriors and resists fire and rot. A well-installed tile roof can last 50 to 100 years.' },
      { type:'p', text:'A few notes: tile is heavy, and not every home is built to support it without structural reinforcement. Individual tiles can crack from foot traffic or large hail, so maintenance needs to be done carefully by someone who knows tile.' },
    ],
  },
  {
    slug: 'slate-cedar-shake',
    name:'Slate & Cedar Shake', tag:'Specialty',
    img:`/photos/roof-cedar.jpg`,
    desc:'Natural slate and cedar shake roofing for historic homes and high-end renovations. We handle the specialty install.',
    good:'Historic, Custom, Estate homes', life:'30-100+ yrs',
    metaTitle:'Slate & Cedar Shake Roofing in Houston & Dallas | LD Roofing',
    metaDescription:'Slate and cedar shake roofing in Houston and Dallas for historic homes, custom builds, and estate renovations. Experienced specialty installation.',
    intro:'Slate and cedar shake are specialty materials for historic homes, high-end renovations, and custom builds where the architecture and budget both support it.',
    body:[
      { type:'p', text:'Natural slate is essentially permanent. Cedar shake develops a beautiful weathered patina over time but requires more maintenance than most modern materials.' },
      { type:'p', text:'Both require experienced installers. Slate is heavy and brittle, and cedar shake needs specific underlayment and ventilation to perform in Texas humidity. We are happy to walk you through the trade-offs.' },
    ],
  },
  {
    slug: 'tpo-membrane',
    name:'TPO Membrane', tag:'Commercial flat',
    img:`/photos/roof-tpo.jpg`,
    desc:'The most popular commercial flat roof system. Heat-welded seams, energy-efficient white surface, and proven performance in Texas heat.',
    good:'Warehouses, Retail, Offices', life:'20-30 yrs',
    metaTitle:'TPO Membrane Flat Roofing in Houston & Dallas | LD Roofing',
    metaDescription:'TPO membrane flat roofing in Houston and Dallas. Energy-efficient, heat-welded single-ply roofing for warehouses, retail, restaurants, and office buildings.',
    intro:'TPO is the dominant commercial flat roofing material in Texas: a single-ply membrane with heat-welded seams and an energy-efficient white surface.',
    body:[
      { type:'p', text:'For property managers and business owners, TPO offers the best combination of cost, energy efficiency, and longevity for most flat roof applications.' },
      { type:'p', text:'Installation quality is critical because the heat-welded seams are what give TPO its waterproof performance. This is not a system to trust to an inexperienced crew.' },
    ],
  },
  {
    slug: 'epdm-rubber',
    name:'EPDM Rubber', tag:'Proven flat',
    img:`/photos/roof-rubber.jpg`,
    desc:'The original single-ply membrane. Black rubber roofing with decades of track record on commercial buildings of every size.',
    good:'Commercial, Industrial', life:'25-30 yrs',
    metaTitle:'EPDM Rubber Flat Roofing in Houston & Dallas | LD Roofing',
    metaDescription:'EPDM rubber flat roofing in Houston and Dallas. The original single-ply membrane with a decades-long track record on commercial and industrial buildings.',
    intro:'EPDM is the original single-ply membrane: black rubber roofing with a decades-long track record on commercial buildings of every size.',
    body:[
      { type:'p', text:'EPDM is durable, proven, and cost-effective for large commercial and industrial roofs. It handles temperature swings well and is straightforward to repair.' },
    ],
  },
  {
    slug: 'modified-bitumen',
    name:'Modified Bitumen', tag:'Flat & low-slope',
    img:`/photos/roof-modified-bitumen.jpg`,
    desc:'Asphalt-based rolled roofing for low-slope residential additions, garages, and small commercial. Affordable and reliable.',
    good:'Garages, Additions, Small commercial', life:'15-25 yrs',
    metaTitle:'Modified Bitumen Roofing in Houston & Dallas | LD Roofing',
    metaDescription:'Modified bitumen roofing in Houston and Dallas. Affordable, reliable asphalt-based rolled roofing for low-slope additions, garages, and small commercial.',
    intro:'Modified bitumen is asphalt-based rolled roofing for low-slope residential additions, garages, and small commercial buildings.',
    body:[
      { type:'p', text:'It is affordable, reliable, and a great fit wherever a low-slope surface meets a modest budget. We install it where it makes sense and recommend other systems where it does not.' },
    ],
  },
  {
    slug: 'corrugated-metal',
    name:'Corrugated Metal', tag:'Workhorse',
    img:`/photos/roof-corrugated-metal.jpg`,
    desc:'Exposed-fastener metal panels, economical and tough. The go-to for barns, shops, ag buildings, and budget-conscious homeowners.',
    good:'Outbuildings, Rural, Budget', life:'30-50 yrs',
    metaTitle:'Corrugated Metal Roofing in Houston & Dallas | LD Roofing',
    metaDescription:'Corrugated metal roofing in Houston and Dallas. Economical, tough exposed-fastener panels for barns, shops, ag buildings, and budget-conscious homeowners.',
    intro:'Corrugated metal is the workhorse of metal roofing: economical, tough exposed-fastener panels that hold up for decades.',
    body:[
      { type:'p', text:'It is the go-to for barns, shops, agricultural buildings, and budget-conscious homeowners who want the longevity of metal without the cost of standing seam.' },
    ],
  },
]

export const getRoofTypeBySlug = (slug) => ROOF_TYPES.find(r => r.slug === slug)
