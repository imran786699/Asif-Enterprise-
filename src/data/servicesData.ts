import { ServiceItem, ProjectItem, Testimonial } from '../types';

export const BUSINESS_INFO = {
  name: 'Asif Enterprise',
  tagline: 'Reliable Labours & Master Carpenters for Any Type of Work',
  phone: '+916006413495',
  displayPhone: '+91 60064 13495',
  whatsappUrl: 'https://wa.me/916006413495',
  email: 'asifenterprise.services@gmail.com',
  workingHours: '7:00 AM – 9:00 PM (Emergency Dispatch 24/7)',
  address: 'Aharbal-Kulgam Road, Lamimarg, Wotu, Kulgam, Jammu & Kashmir',
  shortLocation: 'Kulgam, Jammu & Kashmir',
  mapUrl: 'https://maps.app.goo.gl/WGY28pR6AzmgD96o7',
  embedMapUrl: 'https://maps.google.com/maps?q=33.650428,74.796425&hl=en&z=14&output=embed',
  coordinates: {
    lat: 33.650428,
    lng: 74.796425
  },
  coverageAreas: ['Kulgam & Anantnag Districts', 'Shopian & Pulwama', 'Srinagar & Valley Districts', 'On-Site Across North India by Contract'],
  dispatchTime: '60 - 120 Minutes for Emergency Requests',
  proprietorName: 'Asif',
  proprietorTitle: 'Proprietor & Master Contractor',
  proprietorDp: '/assets/aistudio/image_c58ec26f_75bf3a00.jpg',
  proprietorFallbackDp: '/image_c58ec26f.jpg',
  guarantees: [
    '100% Aadhaar & Background Verified Personnel',
    'Free Replacement Guarantee within 2 Hours',
    'Fixed Transparent Pricing – Zero Hidden Surprises',
    'Daily, Weekly & Turnkey Project Billing'
  ]
};

export interface WorkerActionPhoto {
  id: string;
  trade: string;
  category: 'labour' | 'carpentry' | 'shifting';
  title: string;
  description: string;
  location: string;
  toolsUsed: string;
  crewSize: string;
  imageUrl: string;
  serviceId: string;
}

export const WORKER_ACTION_PHOTOS: WorkerActionPhoto[] = [
  {
    id: 'w-1',
    trade: 'General Civil Labour',
    category: 'labour',
    title: 'Reinforced Concrete & Brickwork Assistance',
    description: 'Site helpers carrying cement mortar, arranging bricks, and assisting senior masons on a 3-storey building foundation.',
    location: 'Srinagar Bypass Site',
    toolsUsed: 'Mortar pans, wheelbarrows, spade kits',
    crewSize: '6 Civil Labours Deployed',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    serviceId: 'general-labour'
  },
  {
    id: 'w-2',
    trade: 'Master Carpentry',
    category: 'carpentry',
    title: 'Handcrafted Wardrobe & Teak Joinery',
    description: 'Senior master carpenter cutting precision mortise joints, planing timber, and assembling modular wardrobe frames.',
    location: 'Anantnag Residential Bungalow',
    toolsUsed: 'Electric planers, router bits, Japanese hand saw',
    crewSize: '2 Master Artisans + 1 Helper',
    imageUrl: 'https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?auto=format&fit=crop&w=1200&q=80',
    serviceId: 'master-carpenter'
  },
  {
    id: 'w-3',
    trade: 'Modular Kitchen Fitment',
    category: 'carpentry',
    title: 'Precision Carcass Assembly & Soft-Close Slides',
    description: 'Fitting hydraulic tandem drawers, Blum soft-close hinges, and waterproof skirting with laser level alignment.',
    location: 'Kulgam Town Interior Project',
    toolsUsed: 'Cross-line laser, cordless drill drivers, hole-saws',
    crewSize: '2 Kitchen Specialists',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    serviceId: 'modular-kitchen'
  },
  {
    id: 'w-4',
    trade: 'Loading & Shifting',
    category: 'shifting',
    title: 'Heavy Furniture & Appliance Floor Shifting',
    description: 'Trained crew utilizing heavy-duty lifting straps to transport solid oak dining sets and double-door refrigerators without wall scratches.',
    location: 'Shopian Multi-Story Residence',
    toolsUsed: 'Padded blankets, cargo straps, hand dollies',
    crewSize: '4 Shifting Labours',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    serviceId: 'loading-shifting'
  },
  {
    id: 'w-5',
    trade: 'Door Framing & Hardware',
    category: 'carpentry',
    title: 'Chaukhat Restoration & Smart Lock Installation',
    description: 'Master craftsman installing heavy teak door chaukhats, mortise lock sets, and precision hinge trimming.',
    location: 'Baramulla Commercial Complex',
    toolsUsed: 'Chisel sets, laser plumb, heavy anchor bolts',
    crewSize: '1 Master Carpenter',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    serviceId: 'door-window-framing'
  },
  {
    id: 'w-6',
    trade: 'Demolition & Site Clearance',
    category: 'labour',
    title: 'Partition Wall Hacking & Swift Malba Bagging',
    description: 'Safety-equipped crew breaking non-loadbearing brick partitions, sorting salvage timber, and loading rubble onto tractor trolleys.',
    location: 'Pulwama Renovation Site',
    toolsUsed: 'Sledgehammers, safety helmets, debris sacks',
    crewSize: '5 Demolition Labours',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
    serviceId: 'demolition-cleaning'
  }
];

export const SERVICES: ServiceItem[] = [
  // Labour Services
  {
    id: 'general-labour',
    name: 'General Construction & Site Labour',
    category: 'labour',
    headline: 'Hardworking, energetic helpers for construction sites and civil works',
    description: 'Trained site helpers for carrying bricks, concrete mixing, earthwork, curing, scaffolding assistance, and site cleanup.',
    startingPrice: 900,
    priceUnit: 'per worker / day (8 hrs)',
    features: [
      'Concrete & cement mixing assistance',
      'Brick and stone transport on-site',
      'Site clearance and scaffolding support',
      'Excavation and debris clearing'
    ],
    recommendedTeam: '2 - 10 Workers',
    toolsIncluded: ['Basic spades & buckets on demand'],
    skillBadges: [
      { label: 'Safety Certified', type: 'safety', highlight: true },
      { label: '5+ Years Exp', type: 'experience' },
      { label: 'Police Verified', type: 'credential' },
      { label: 'Heavy Lift Trained', type: 'specialty' }
    ],
    popular: true
  },
  {
    id: 'loading-shifting',
    name: 'House & Commercial Shifting Labour',
    category: 'labour',
    headline: 'Careful loading, unloading, and heavy item shifting crew',
    description: 'Tough and disciplined labour team for shifting furniture, appliances, building materials, cartons, and warehouse inventories.',
    startingPrice: 950,
    priceUnit: 'per worker / day (8 hrs)',
    features: [
      'Safe lifting of heavy sofas, almirahs & appliances',
      'Truck / tempo loading & unloading',
      'Floor-to-floor stair carrying without wall scuffs',
      'Commercial warehouse cargo stacking'
    ],
    recommendedTeam: '2 - 6 Workers',
    toolsIncluded: ['Hand ropes & lifting belts'],
    skillBadges: [
      { label: 'Zero-Scratch Record', type: 'safety', highlight: true },
      { label: '6+ Years Exp', type: 'experience' },
      { label: 'Fragile Goods Care', type: 'specialty' },
      { label: 'ID Verified Crew', type: 'credential' }
    ],
    popular: true
  },
  {
    id: 'demolition-cleaning',
    name: 'Demolition & Debris Removal Crew',
    category: 'labour',
    headline: 'Safe wall hacking, tile chipping & fast malba cleanup',
    description: 'Equipped crew for non-structural partition demolition, tile breaking, plaster removal, and swift debris loading into tractor/dumpers.',
    startingPrice: 1100,
    priceUnit: 'per worker / day (8 hrs)',
    features: [
      'Controlled partition wall & slab breaking',
      'Floor tile chipping and surface preparation',
      'Bagging malba/debris in heavy-duty sacks',
      'Loading into disposal vehicles'
    ],
    recommendedTeam: '3 - 8 Workers',
    toolsIncluded: ['Sledgehammers, chisels & shovels'],
    skillBadges: [
      { label: 'PPE Safety Certified', type: 'safety', highlight: true },
      { label: '8+ Years Exp', type: 'experience' },
      { label: 'Controlled Wall Hacking', type: 'specialty' },
      { label: 'Debris Clearance Pro', type: 'credential' }
    ]
  },
  {
    id: 'deep-site-cleaning',
    name: 'Post-Construction & Yard Cleaning',
    category: 'labour',
    headline: 'Thorough site scrubbing, cement stain removal & yard clearing',
    description: 'Dedicated post-work cleaning team to scrub paint drops, cement residue, dust, weeds, and debris before handover.',
    startingPrice: 900,
    priceUnit: 'per worker / day (8 hrs)',
    features: [
      'Cement scrape and window frame detailing',
      'Compound weed clearance & earth levelling',
      'Drainage ditch clearing',
      'Waste segregation & disposal packing'
    ],
    recommendedTeam: '2 - 4 Workers',
    toolsIncluded: ['Wire brushes, scrapers, brooms & wipers'],
    skillBadges: [
      { label: 'Pre-Handover Certified', type: 'credential', highlight: true },
      { label: '5+ Years Exp', type: 'experience' },
      { label: 'Surface Stain Removal', type: 'specialty' },
      { label: 'Eco-Waste Disposal', type: 'safety' }
    ]
  },

  // Carpentry Services
  {
    id: 'master-carpenter',
    name: 'Master Carpenter (Woodwork & Interior)',
    category: 'carpentry',
    headline: 'Experienced craftsman for custom furniture, wardrobes & wood finishes',
    description: 'Skilled senior carpenter for constructing wardrobes, TV consoles, bed frames, wooden ceilings, wall panelling, and fine timber craftsmanship.',
    startingPrice: 1200,
    priceUnit: 'per artisan / day (8 hrs)',
    features: [
      'Custom plywood & solid wood cabinetry',
      'Modern laminate pressing & edge-banding',
      'Bed frames, dressing tables & custom almirahs',
      'Wooden ceiling rafters & acoustic panelling'
    ],
    recommendedTeam: '1 Master + 1 Helper',
    toolsIncluded: ['Full power tool set (cutters, routers, planers)'],
    skillBadges: [
      { label: '12+ Years Exp', type: 'experience', highlight: true },
      { label: 'Master Artisan', type: 'credential' },
      { label: 'Zero-Gap Joinery Pro', type: 'specialty' },
      { label: 'Power Tools Certified', type: 'safety' }
    ],
    popular: true
  },
  {
    id: 'modular-kitchen',
    name: 'Modular Kitchen Installation & Fitment',
    category: 'carpentry',
    headline: 'Precision carcass assembly, tandem boxes & hydraulic fittings',
    description: 'Specialist kitchen carpenters for assembling base & wall cabinets, soft-close Blum/Hettich hinges, pantry units, and basket systems.',
    startingPrice: 1350,
    priceUnit: 'per specialist / day (8 hrs)',
    features: [
      'Precision laser alignment for carcass boxes',
      'Soft-close drawer slides & lift-up systems',
      'Chimney & hob wooden cutout sealing',
      'Waterproof skirting & profile handles'
    ],
    recommendedTeam: '2 Carpenters',
    toolsIncluded: ['Laser levels, drill presses, jig-saws'],
    skillBadges: [
      { label: 'Blum & Hettich Certified', type: 'credential', highlight: true },
      { label: '10+ Years Exp', type: 'experience' },
      { label: 'Laser Alignment Specialist', type: 'specialty' },
      { label: 'Hydraulic Hardware Pro', type: 'safety' }
    ],
    popular: true
  },
  {
    id: 'door-window-framing',
    name: 'Door & Window Framing & Hardware Repair',
    category: 'carpentry',
    headline: 'Door hanging, lock replacement, chaukhat fitting & alignment',
    description: 'Rapid on-demand carpentry service for jammed doors, Yale/Godrej lock installation, sliding track repairs, and wooden window shutters.',
    startingPrice: 900,
    priceUnit: 'per artisan / day (8 hrs)',
    features: [
      'Wooden door trimming, planing & re-alignment',
      'Mortise lock, smart lock & tower bolt installation',
      'Glass beadings and mesh shutter fixes',
      'Door frame (chaukhat) fixing & anchor bolts'
    ],
    recommendedTeam: '1 Carpenter',
    toolsIncluded: ['Hand planers, router bits, chisel kits'],
    skillBadges: [
      { label: 'Lock Master Certified', type: 'credential', highlight: true },
      { label: '9+ Years Exp', type: 'experience' },
      { label: 'Precision Planing Pro', type: 'specialty' },
      { label: 'Frame Anchor Specialist', type: 'safety' }
    ]
  },
  {
    id: 'wood-polishing',
    name: 'Wood Polishing, PU Coating & Refinishing',
    category: 'carpentry',
    headline: 'Restore old furniture, French spirit polish & Melamine/PU finish',
    description: 'Finishing artisans to strip old faded varnish, sand smoothly, apply wood stains, and achieve high-gloss or matte PU finishes.',
    startingPrice: 1100,
    priceUnit: 'per polisher / day (8 hrs)',
    features: [
      'Hand-rubbed French spirit & shellac polish',
      'Spray PU (polyurethane) and Melamine coating',
      'Walnut, teak and mahogany wood staining',
      'Antique restoration & scratch buffing'
    ],
    recommendedTeam: '1 Polisher + 1 Assistant',
    toolsIncluded: ['Spray gun, orbital sanders, polishing pads'],
    skillBadges: [
      { label: 'PU & Melamine Certified', type: 'credential', highlight: true },
      { label: '11+ Years Exp', type: 'experience' },
      { label: 'French Polish Specialist', type: 'specialty' },
      { label: 'Antique Restorer', type: 'safety' }
    ]
  },

  // Turnkey Services
  {
    id: 'turnkey-contract',
    name: 'Commercial & Residential Turnkey Labour Supply',
    category: 'turnkey',
    headline: 'Bulk worker dispatch with on-site supervisor for projects & factories',
    description: 'Contractual workforce supply for builders, architects, warehouse operators, and industrial units with guaranteed daily attendance.',
    startingPrice: 900,
    priceUnit: 'per worker / day (Bulk 10+ batch)',
    features: [
      'Dedicated on-site supervisor included',
      'Guaranteed replacement on sickness or leave',
      'Weekly or monthly consolidated billing',
      'Strict safety gear and tool compliance'
    ],
    recommendedTeam: '10 to 50+ Workers',
    toolsIncluded: ['Complete safety gear & standard toolboxes'],
    skillBadges: [
      { label: 'Safety Certified', type: 'safety', highlight: true },
      { label: '15+ Years Contract Exp', type: 'experience' },
      { label: 'Site Supervisor Deployed', type: 'credential' },
      { label: '100% Attendance Guarantee', type: 'specialty' }
    ]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Custom Teak Bedroom Wardrobes & Panelling',
    category: 'Carpentry',
    location: 'Rajbagh Residential Villa',
    workersDeployed: 3,
    duration: '6 Days',
    description: 'Fabrication of floor-to-ceiling 4-door wardrobe with hydraulic lift-up storage, hidden drawer safes, and natural walnut matte polish.',
    highlights: ['Zero-gap joinery', 'Hettich soft-close hinges', 'Custom mirror frame'],
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'proj-2',
    title: 'Site Demolition & Malba Clearing',
    category: 'Labour Crew',
    location: 'Commercial Showroom, Lal Chowk',
    workersDeployed: 6,
    duration: '2 Days',
    description: 'Safe demolition of 3 brick partitions, chipping 1,200 sq ft floor tiles, and clearing 4 truckloads of debris within 48 hours.',
    highlights: ['Zero structural vibration', 'Disposal permits handled', 'Site left broom-clean'],
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'proj-3',
    title: 'Modern Modular Kitchen & Quartz Fitment',
    category: 'Carpentry',
    location: 'Hyderpora Heights',
    workersDeployed: 2,
    duration: '3 Days',
    description: 'Precision mounting of marine-grade ply carcass units, acrylic shutters, tall pantry pulls, and corner carousel hardware.',
    highlights: ['Laser leveled', 'Waterproof sealed plinth', 'Soft-close tandem drawers'],
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'proj-4',
    title: 'Warehouse Relocation & Goods Loading',
    category: 'Labour Crew',
    location: 'Industrial Estate, Rangreth',
    workersDeployed: 8,
    duration: '1 Day (10 hrs)',
    description: 'Rapid packing, loading into 4 heavy transport trucks, and floor stacking of 45 tons of electrical conduits and machinery.',
    highlights: ['Zero product damage', 'Organized pallet stacking', 'Completed 2 hours ahead of schedule'],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Er. Tariq Ahmad Mir',
    role: 'Building Contractor',
    location: 'Srinagar',
    rating: 5,
    review: 'Asif Enterprise has supplied civil labours and shuttering carpenters for three of my building projects. Their boys are punctual, respectful, and genuinely hardworking. Whenever we need extra hands on short notice, Asif delivers.',
    serviceUsed: 'Construction Labour & Shuttering',
    date: 'October 2026'
  },
  {
    id: 'test-2',
    clientName: 'Dr. Shabnam Akhtar',
    role: 'Homeowner',
    location: 'Rawalpora',
    rating: 5,
    review: 'Called their number +916006413495 on Saturday morning because my main entrance door hinge snapped and jammed shut. A master carpenter reached my home within 70 minutes with proper tools, fixed it cleanly, and charged a fair, honest rate.',
    serviceUsed: 'Door & Lock Repair Carpentry',
    date: 'September 2026'
  },
  {
    id: 'test-3',
    clientName: 'Farooq Brothers Furniture',
    role: 'Showroom Owner',
    location: 'Batamaloo',
    rating: 5,
    review: 'We regularly book Asif’s shifting team to unload heavy oak and walnut dining tables from inter-state trucks. They treat expensive furniture with extreme care. Not a single dent or scratch.',
    serviceUsed: 'Heavy Goods Loading & Unloading',
    date: 'August 2026'
  },
  {
    id: 'test-4',
    clientName: 'Mohammad Younis',
    role: 'Interior Designer',
    location: 'Baramulla',
    rating: 5,
    review: 'Top notch modular kitchen carpenters. They know how to handle German soft-close fittings and laser levels without needing constant babysitting. Very professional contractor.',
    serviceUsed: 'Modular Kitchen Fitment',
    date: 'July 2026'
  }
];

export const FAQS = [
  {
    question: 'How do I book workers with Asif Enterprise?',
    answer: 'You can book directly by calling +916006413495, tapping the WhatsApp booking button with your work details, or submitting our online booking form. We confirm team availability and timings within minutes.'
  },
  {
    question: 'How quickly can labours or carpenters arrive at my site?',
    answer: 'For standard bookings, we schedule workers for your preferred morning or afternoon slot (e.g. 8:30 AM). For emergency tasks, we offer rapid dispatch reaching most local locations within 60 to 120 minutes.'
  },
  {
    question: 'Are the workers verified and trustworthy?',
    answer: 'Yes, 100%. Every labourer and carpenter registered under Asif Enterprise has verified government ID (Aadhaar / voter ID), background verification, and verified skill references before dispatch.'
  },
  {
    question: 'What if I am not satisfied with the assigned worker?',
    answer: 'We provide a 2-Hour Free Replacement Guarantee. If a worker is not performing to standard or lacks the required skill for your job, contact us immediately at +916006413495 and we will send a replacement worker without extra charges.'
  },
  {
    question: 'Do the workers bring their own tools?',
    answer: 'Master carpenters always arrive equipped with standard power tools (drills, planers, saws, measuring sets). For general labour, basic tools (spades, buckets, ropes) can be included upon request during booking.'
  },
  {
    question: 'What are the accepted payment methods?',
    answer: 'We accept Cash directly to the supervisor, instant UPI (Google Pay, PhonePe, Paytm), and direct Bank Transfer for commercial contracts. Clear itemized receipts are provided for all bookings.'
  }
];
