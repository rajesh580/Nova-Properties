/**
 * Nova Properties Data Store (ES6 Module)
 * Sourced from novaproperties.vip and enriched with Stage Properties & Golden Oak architecture
 */

export const NOVA_DATA = {
  brand: {
    name: "NOVA PROPERTIES",
    subName: "Dubai Luxury Real Estate",
    tagline: "Smart Investments Start Here",
    founded: 2012,
    founder: "James Whitfield",
    reraOrn: "28419",
    dldLicense: "947120",
    phone: "+971 4 555 0100",
    phoneClean: "+97145550100",
    mobile: "+971 50 123 4567",
    mobileClean: "+971501234567",
    email: "info@novaproperties.vip",
    address: "Level 14, Gate Building, DIFC, Dubai, UAE",
    secondaryAddress: "Emaar Square, Building 4, Downtown Dubai",
    hours: "Sun – Thu: 9:00 AM – 6:00 PM | Fri: 9:00 AM – 1:00 PM",
    rating: 4.9,
    reviewsCount: 128
  },

  currencies: {
    AED: { symbol: "AED", label: "AED (د.إ)", rate: 1.0 },
    USD: { symbol: "$", label: "USD ($)", rate: 0.2723 },
    EUR: { symbol: "€", label: "EUR (€)", rate: 0.2514 },
    GBP: { symbol: "£", label: "GBP (£)", rate: 0.2152 },
    INR: { symbol: "₹", label: "INR (₹)", rate: 22.85 }
  },

  stats: [
    { value: "AED 2.4B+", label: "Transaction Volume", sub: "Closed across prime Dubai" },
    { value: "500+", label: "Prime Properties Sold", sub: "Waterfront, penthouses & villas" },
    { value: "14", label: "Languages Spoken", sub: "Global multilingual advisory" },
    { value: "12+ Years", label: "Market Experience", sub: "Continuous DIFC presence since 2012" }
  ],

  properties: [
    {
      id: "NP-1001",
      title: "Royal Atlantis Sky Villa & Penthouse",
      location: "Palm Jumeirah, Dubai",
      community: "Palm Jumeirah",
      type: "Penthouse",
      purpose: "buy",
      priceAED: 18500000,
      beds: 4,
      baths: 5,
      sqft: 5200,
      sqm: 483,
      badge: "Exclusive Penthouse",
      status: "Ready",
      featured: true,
      goldenVisa: true,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
      ],
      roiRate: 6.8,
      serviceChargeAED: 26,
      floorPlan: {
        orientation: "North-West (Arabian Gulf Sunset)",
        levels: "Single-Level Sky Villa",
        ceilingHeight: "3.60 m",
        zones: [
          { name: "Grand Living & Dining Salon", area: "135 m²", desc: "Dual exposure with full-height glazing facing Palm crescent" },
          { name: "Master Sanctuary & Spa Bath", area: "78 m²", desc: "Freestanding stone bath, walk-in dressing suite & sea balcony" },
          { name: "Private Pool Sky Terrace", area: "96 m²", desc: "Temperature-regulated infinity plunge pool & sun deck" },
          { name: "Chef's Show & Prep Kitchens", area: "45 m²", desc: "Gaggenau 400-series appliances & Sub-Zero refrigeration" },
          { name: "En-Suite Guest Suites (3)", area: "129 m²", desc: "Acoustically isolated suites with private walk-in wardrobes" }
        ]
      },
      description: "Sky-high luxury with panoramic 360-degree views of the Arabian Gulf and Dubai skyline. Features private temperature-controlled infinity pool on the terrace, bespoke Italian marble flooring, Gaggenau kitchen appliances, smart home automation, and dedicated private elevator access.",
      amenities: ["Private Infinity Pool", "Panoramic Sea & Skyline Views", "Direct Beach Access", "Private Elevator", "Concierge 24/7", "Valet Parking", "Smart Automation", "Gaggenau Kitchen", "Gym & Spa Access"],
      permitNumber: "DLD-PERMIT-849201",
      advisor: {
        name: "James Whitfield",
        role: "Founder & CEO",
        phone: "+971 50 123 4567"
      }
    },
    {
      id: "NP-1002",
      title: "Opera Grand Luxury Boulevard Suite",
      location: "Downtown Dubai, Dubai",
      community: "Downtown Dubai",
      type: "Apartment",
      purpose: "buy",
      priceAED: 3200000,
      beds: 2,
      baths: 2,
      sqft: 1450,
      sqm: 135,
      badge: "Burj Khalifa View",
      status: "Ready",
      featured: true,
      goldenVisa: true,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
      ],
      roiRate: 7.8,
      serviceChargeAED: 22,
      floorPlan: {
        orientation: "East-Facing (Burj Khalifa & Fountain)",
        levels: "Mid-Rise Corner Suite",
        ceilingHeight: "3.20 m",
        zones: [
          { name: "Living & Entertaining Lounge", area: "52 m²", desc: "Framed line-of-sight to Burj Khalifa spire" },
          { name: "Master Suite & Ensuite", area: "36 m²", desc: "Italian joinery with backlit dressing mirrors" },
          { name: "Second Bedroom / Executive Study", area: "24 m²", desc: "Acoustic insulated wall panels & city panorama" },
          { name: "Boulevard Viewing Balcony", area: "14 m²", desc: "Direct views of Dubai Opera plaza" }
        ]
      },
      description: "Front-row seats to the iconic Burj Khalifa and Dubai Fountain. Fully designer furnished, floor-to-ceiling soundproof acoustic glass, high rental yield potential exceeding 7.8% net ROI. Seconds away from Dubai Opera and Fashion Avenue.",
      amenities: ["Burj Khalifa View", "Fully Furnished", "Rooftop Pool", "High Rental Yield", "Covered Parking", "Direct Boulevard Access", "Modern Fitness Center"],
      permitNumber: "DLD-PERMIT-672109",
      advisor: {
        name: "Sara Al Mansoori",
        role: "Senior Consultant",
        phone: "+971 50 234 5678"
      }
    },
    {
      id: "NP-1003",
      title: "The Signature Lakefront Estate",
      location: "Emirates Hills, Dubai",
      community: "Emirates Hills",
      type: "Villa",
      purpose: "buy",
      priceAED: 42000000,
      beds: 6,
      baths: 7,
      sqft: 9800,
      sqm: 910,
      badge: "Trophy Residence",
      status: "Ready",
      featured: true,
      goldenVisa: true,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
      ],
      roiRate: 5.4,
      serviceChargeAED: 9,
      floorPlan: {
        orientation: "South-West (Golf Course & Lake)",
        levels: "Basement + Ground + First + Rooftop Deck",
        ceilingHeight: "4.20 m (Double Height Foyer: 8.5 m)",
        zones: [
          { name: "Grand Reception & Formal Dining", area: "210 m²", desc: "Double-height atrium with custom Calacatta marble" },
          { name: "Presidential Master Wing", area: "140 m²", desc: "Dual walk-in closets, private wellness spa & sauna" },
          { name: "Basement 10-Car Showroom & Cinema", area: "280 m²", desc: "Climate-controlled gallery and 12-seat private Dolby cinema" },
          { name: "Olympic Pool & Sunken Fire Lounge", area: "190 m²", desc: "Lakefront lawn with temperature-regulated lap pool" },
          { name: "Guest Suites (5) & Staff Quarters", area: "240 m²", desc: "Independent suites plus driver and maid accommodations" }
        ]
      },
      description: "Nestled in the prestigious Sector E of Emirates Hills ('The Beverly Hills of Dubai'). Expansive 18,000 sqft plot overlooking the private golf lake, Olympic-sized swimming pool, sunken fire pit, 10-car basement showroom, cinema room, and separate service quarters.",
      amenities: ["Private Lakefront Plot", "Championship Golf View", "Basement Showroom", "Private Cinema", "Staff Quarters", "Smart Security", "Landscaped Garden", "Temperature-controlled Pool"],
      permitNumber: "DLD-PERMIT-339182",
      advisor: {
        name: "James Whitfield",
        role: "Founder & CEO",
        phone: "+971 50 123 4567"
      }
    },
    {
      id: "NP-1004",
      title: "Rimal Waterfront Horizon Residence",
      location: "Jumeirah Beach Residence (JBR), Dubai",
      community: "JBR",
      type: "Apartment",
      purpose: "buy",
      priceAED: 1850000,
      beds: 1,
      baths: 2,
      sqft: 920,
      sqm: 85,
      badge: "Beachfront Living",
      status: "Ready",
      featured: false,
      goldenVisa: false,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
      ],
      roiRate: 8.6,
      serviceChargeAED: 18,
      floorPlan: {
        orientation: "West-Facing (Direct Arabian Sea)",
        levels: "High Floor Seaside Suite",
        ceilingHeight: "3.00 m",
        zones: [
          { name: "Open-Concept Living & Kitchenette", area: "44 m²", desc: "Polished terrazzo floors and full sea-facing window wall" },
          { name: "Master Suite & Ensuite", area: "28 m²", desc: "King suite with custom acoustic glazing" },
          { name: "Sunset Horizon Balcony", area: "13 m²", desc: "Direct views of Ain Dubai & beach promenade" }
        ]
      },
      description: "Direct beachfront access on The Walk JBR. Unobstructed Arabian Gulf vistas, turnkey renovated interior with contemporary coastal finishes. Ideal vacation holiday home or high-performing holiday home rental producing 8.5%+ gross returns.",
      amenities: ["Direct Beach Access", "Sea View Balcony", "Turnkey Furnished", "Pool & Gym", "High ROI Rental", "Walking distance to Tram"],
      permitNumber: "DLD-PERMIT-512034",
      advisor: {
        name: "Sara Al Mansoori",
        role: "Senior Consultant",
        phone: "+971 50 234 5678"
      }
    },
    {
      id: "NP-1005",
      title: "Polo Homes Courtyard Sanctuary",
      location: "Arabian Ranches, Dubai",
      community: "Arabian Ranches",
      type: "Villa",
      purpose: "buy",
      priceAED: 5500000,
      beds: 3,
      baths: 4,
      sqft: 3200,
      sqm: 297,
      badge: "Gated Family Oasis",
      status: "Ready",
      featured: false,
      goldenVisa: true,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
      ],
      roiRate: 6.2,
      serviceChargeAED: 7,
      floorPlan: {
        orientation: "North-East (Polo Club Grounds)",
        levels: "Ground + First Floor Villa",
        ceilingHeight: "3.40 m",
        zones: [
          { name: "Courtyard Salon & Family Living", area: "88 m²", desc: "Spanish Andalusian arches opening to private courtyard pool" },
          { name: "Master Suite with Sun Terrace", area: "46 m²", desc: "Overlooking green fairways and equestrian trails" },
          { name: "En-suite Bedrooms (2)", area: "62 m²", desc: "Spacious children or guest accommodation" },
          { name: "Private Pool Garden & BBQ Pavilion", area: "95 m²", desc: "Covered pergola and outdoor dining" }
        ]
      },
      description: "Surrounded by lush green fairways and tranquility. Beautiful private Mediterranean courtyard, extended pergola, landscaped private swimming pool, gourmet open-plan kitchen, and top international school district access.",
      amenities: ["Private Pool & Garden", "Polo Club Access", "Covered Garage 2 Cars", "Gated Security", "Near Top Schools", "Pet Friendly"],
      permitNumber: "DLD-PERMIT-194821",
      advisor: {
        name: "Marcus Vance",
        role: "Private Client Advisor",
        phone: "+971 50 456 7890"
      }
    },
    {
      id: "NP-1006",
      title: "Gate Precinct Executive Office Suite",
      location: "DIFC, Dubai",
      community: "DIFC",
      type: "Commercial",
      purpose: "buy",
      priceAED: 4200000,
      beds: 0,
      baths: 2,
      sqft: 2400,
      sqm: 223,
      badge: "Prime Commercial",
      status: "Ready",
      featured: false,
      goldenVisa: true,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
      ],
      roiRate: 8.1,
      serviceChargeAED: 24,
      floorPlan: {
        orientation: "North (DIFC Gate & Sheikh Zayed Road)",
        levels: "High Floor Corner Executive Floorplate",
        ceilingHeight: "3.50 m",
        zones: [
          { name: "Executive Boardroom", area: "45 m²", desc: "State-of-the-art telepresence & acoustic micro-perforated wood" },
          { name: "Partner Corner Offices (3)", area: "68 m²", desc: "Floor-to-ceiling glass partitions with smart privacy frost" },
          { name: "Open-Plan Analyst Trading Floor", area: "80 m²", desc: "CAT 7 data cablerun & ergonomic workstations for 24 staff" },
          { name: "Client Welcoming Lounge & Barista Station", area: "30 m²", desc: "Book-matched marble coffee station & concierge desk" }
        ]
      },
      description: "Grade A corporate headquarters within DIFC's financial free zone. Fully fitted with boardrooms, acoustic phone booths, executive corner offices, panoramic skyline views, 4 allocated basement parking spaces, and DFSA licensing compatibility.",
      amenities: ["DIFC Financial District", "Grade A Specification", "Fitted Executive Offices", "4 Reserved Parking Spaces", "High Speed Fiber", "24/7 Building Security"],
      permitNumber: "DLD-PERMIT-481902",
      advisor: {
        name: "Priya Sharma",
        role: "Commercial Specialist",
        phone: "+971 50 345 6789"
      }
    },
    {
      id: "NP-1007",
      title: "Fairway Vistas Fairway Mansion",
      location: "Dubai Hills Estate, Dubai",
      community: "Dubai Hills Estate",
      type: "Villa",
      purpose: "buy",
      priceAED: 12800000,
      beds: 5,
      baths: 6,
      sqft: 6400,
      sqm: 595,
      badge: "Golf Course Frontage",
      status: "Ready",
      featured: true,
      goldenVisa: true,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
      ],
      roiRate: 6.4,
      serviceChargeAED: 11,
      floorPlan: {
        orientation: "West-Facing (18-Hole Championship Course)",
        levels: "Ground + First Floor Luxury Villa",
        ceilingHeight: "3.80 m",
        zones: [
          { name: "Double-Height Grand Living Hall", area: "140 m²", desc: "Spectacular golf fairway vistas through 7m glass curtains" },
          { name: "Primary Master Sanctuary", area: "82 m²", desc: "Private terrace, dual dressing rooms & stone soaking tub" },
          { name: "Family Salon & Show Kitchen", area: "65 m²", desc: "Miele induction cooktops and central quartz dining island" },
          { name: "Private Pool & Alfresco Lounge", area: "120 m²", desc: "Sunken seating lounge with bio-ethanol fireplace" },
          { name: "Additional 4 En-Suite Bedrooms", area: "160 m²", desc: "Private balconies & built-in Italian closets" }
        ]
      },
      description: "Contemporary modern architecture directly facing the 18-hole championship golf course with uninterrupted views of the Downtown skyline. Dual show & dirty kitchens, maids & driver rooms, high double-height ceilings, and private lap pool.",
      amenities: ["Championship Golf Views", "Burj Khalifa Line-of-Sight", "Double Height Ceilings", "Private Lap Pool", "Maid & Driver Rooms", "Close to Dubai Hills Mall"],
      permitNumber: "DLD-PERMIT-728190",
      advisor: {
        name: "Marcus Vance",
        role: "Private Client Advisor",
        phone: "+971 50 456 7890"
      }
    },
    {
      id: "NP-1008",
      title: "Bluewaters Bay Waterfront Haven",
      location: "Bluewaters Island, Dubai",
      community: "Bluewaters Island",
      type: "Apartment",
      purpose: "rent",
      priceAED: 380000,
      rentPeriod: "/year",
      beds: 3,
      baths: 4,
      sqft: 2150,
      sqm: 200,
      badge: "Luxury Annual Rental",
      status: "Ready",
      featured: true,
      goldenVisa: false,
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
      ],
      roiRate: 7.9,
      serviceChargeAED: 21,
      floorPlan: {
        orientation: "South-West (Ain Dubai & Marina Channel)",
        levels: "High Floor Corner Waterfront Suite",
        ceilingHeight: "3.30 m",
        zones: [
          { name: "Corner Panoramic Living & Dining", area: "82 m²", desc: "Wrap-around balcony with unobstructed views of Ain Dubai" },
          { name: "Master Suite & Private Sun Balcony", area: "48 m²", desc: "Custom timber joinery and spa shower" },
          { name: "Guest Bedroom Suites (2)", area: "55 m²", desc: "En-suite bathrooms with Italian sanitaryware" },
          { name: "Semi-Open Gourmet Kitchen", area: "22 m²", desc: "Fully integrated German appliances & breakfast bar" }
        ]
      },
      description: "Island lifestyle steps away from Ain Dubai and world-class dining. Panoramic water views, wrap-around sunset balcony, modern Scandinavian minimalism interior, infinity edge podium pool, and private residents beach club access.",
      amenities: ["Ain Dubai Water Views", "Private Beach Club Access", "Wrap-around Balcony", "Infinity Edge Pool", "2 Covered Parking Bays", "24/7 Security"],
      permitNumber: "DLD-PERMIT-918230",
      advisor: {
        name: "Sara Al Mansoori",
        role: "Senior Consultant",
        phone: "+971 50 234 5678"
      }
    }
  ],

  offPlanProjects: [
    {
      id: "OP-01",
      title: "The Crest Residences",
      developer: "EMAAR Properties",
      location: "Downtown Dubai",
      priceStartingAED: 1200000,
      handover: "Q4 2026",
      paymentPlan: "60 / 40 (Post-Handover Available)",
      downPayment: "10% on Booking",
      tag: "High Demand Launch",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80",
      description: "A visionary high-rise residential masterpiece by Emaar, positioned along the Downtown canal with pedestrian link to Dubai Mall and Burj Park. Projected net rental yields of 7.5% - 8.2% upon delivery.",
      roi: "7.8% Net Estimated",
      typesAvailable: ["1 Bed Luxury", "2 Bed Corner", "3 Bed Duplex"]
    },
    {
      id: "OP-02",
      title: "Marina Gate III",
      developer: "Select Group",
      location: "Dubai Marina",
      priceStartingAED: 2800000,
      handover: "Q2 2027",
      paymentPlan: "70 / 30 On Completion",
      downPayment: "20% on Booking",
      tag: "Limited Waterfront Units",
      image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80",
      description: "The final jewel of the acclaimed Marina Gate trilogy. Unrivaled podium amenities including an Olympic infinity pool suspended over the yacht marina, padel courts, and private yacht berth allocations.",
      roi: "7.2% Net Estimated",
      typesAvailable: ["2 Bed Marina View", "3 Bed Sky Residence", "4 Bed Penthouse"]
    },
    {
      id: "OP-03",
      title: "Palm Beach Residences",
      developer: "Nakheel",
      location: "Palm Jumeirah",
      priceStartingAED: 4500000,
      handover: "Q1 2027",
      paymentPlan: "80 / 20 Flexible Plan",
      downPayment: "15% on Booking",
      tag: "Private Beachfront",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      description: "Exclusive beachfront collection on Palm Jumeirah's western crescent. Private beach club access, panoramic sunset views, private boat jetty, and bespoke interior packages curated by Milanese designers.",
      roi: "6.9% Net Estimated",
      typesAvailable: ["2 & 3 Bed Apartments", "4 Bed Garden Mansions"]
    },
    {
      id: "OP-04",
      title: "Sobha Seahaven Tower B",
      developer: "Sobha Realty",
      location: "Dubai Harbour",
      priceStartingAED: 3100000,
      handover: "Q3 2026",
      paymentPlan: "60 / 40 Linked to Milestones",
      downPayment: "10% on Booking",
      tag: "Cruise Terminal & Marina",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      description: "Ultra-prime maritime living flanked by Dubai Harbour and Palm Jumeirah. Sobha signature backward-integrated German craftsmanship, smart infinity pools, and direct promenade access.",
      roi: "7.6% Net Estimated",
      typesAvailable: ["1 to 4 Bed Apartments", "Signature Penthouses"]
    }
  ],

  communities: [
    {
      name: "Downtown Dubai",
      tagline: "The Center of Now",
      propertiesCount: "140+ Listings",
      avgPriceAED: "AED 3.4M",
      yield: "7.2% Net Yield",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
      desc: "Home to Burj Khalifa, Dubai Mall, and Dubai Opera. High-density prestige with world-class dining, culture, and capital appreciation."
    },
    {
      name: "Palm Jumeirah",
      tagline: "World Famous Archipelago",
      propertiesCount: "95+ Listings",
      avgPriceAED: "AED 14.5M",
      yield: "6.5% Net Yield",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      desc: "The global benchmark for waterfront ultra-luxury. Private beaches, superyacht marinas, Michelin-starred culinary venues, and trophy mansions."
    },
    {
      name: "DIFC",
      tagline: "Financial & Culinary Epicenter",
      propertiesCount: "60+ Listings",
      avgPriceAED: "AED 4.2M",
      yield: "7.8% Net Yield",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      desc: "Dubai International Financial Centre — where high finance meets high culture. Prime executive offices, luxury lofts, and Michelin star gastronomy."
    },
    {
      name: "Emirates Hills",
      tagline: "The Beverly Hills of Dubai",
      propertiesCount: "35+ Listings",
      avgPriceAED: "AED 38.0M",
      yield: "5.2% Net Yield",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      desc: "Dubai's most exclusive gated residential enclave. Sprawling custom estates around Montgomerie Championship Golf Course."
    },
    {
      name: "Dubai Hills Estate",
      tagline: "The Green Heart of Dubai",
      propertiesCount: "110+ Listings",
      avgPriceAED: "AED 6.8M",
      yield: "6.9% Net Yield",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      desc: "Master-planned mega-community featuring championship golf, Dubai Hills Mall, international schools, and expansive family parks."
    },
    {
      name: "Dubai Marina",
      tagline: "The Riviera of the Middle East",
      propertiesCount: "180+ Listings",
      avgPriceAED: "AED 2.6M",
      yield: "7.5% Net Yield",
      image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80",
      desc: "Energetic waterfront boulevard, thousands of berths, vibrant alfresco promenade, and consistent global investor liquidity."
    }
  ],

  developers: [
    { name: "EMAAR", status: "Tier 1 Master Developer", award: "Alliance Partner" },
    { name: "DAMAC", status: "Luxury High-Rise Pioneer", award: "Unity Broker Award" },
    { name: "NAKHEEL", status: "Waterfront Master Builder", award: "Preferred Agency" },
    { name: "SOBHA", status: "German Precision Craft", award: "Platinum Partner" },
    { name: "SELECT GROUP", status: "Prime Marina & Palm Leader", award: "Top Producer" },
    { name: "MERAAS", status: "Boutique Coastal Creator", award: "Authorized Broker" },
    { name: "BINGHATTI", status: "Automotive Luxury & Design", award: "Rising Broker Award" }
  ],

  team: [
    {
      name: "James Whitfield",
      title: "Founder & Chief Executive Officer",
      specialty: "Prime Central Dubai & Ultra-High-Net-Worth Advisory",
      experience: "22 Years (12 in Dubai)",
      phone: "+971 50 123 4567",
      email: "james@novaproperties.vip",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
      bio: "Veteran of London's Mayfair and Kensington prime markets before establishing Nova Properties in DIFC in 2012. Trusted confidant to international family offices and sovereign clients."
    },
    {
      name: "Sara Al Mansoori",
      title: "Senior Vice President — Off-Plan & Investments",
      specialty: "Developer Allocations & High-Yield Portfolios",
      experience: "14 Years in Dubai",
      phone: "+971 50 234 5678",
      email: "sara@novaproperties.vip",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      bio: "Unrivaled direct access to executive developer allocations at Emaar, Nakheel, and Select Group. Specialized in off-plan pre-launch entry strategies and capital appreciation arbitrage."
    },
    {
      name: "Priya Sharma",
      title: "Head of Commercial & DIFC Advisory",
      specialty: "DIFC Corporate HQs, Full Floors & Retail Assets",
      experience: "11 Years in Dubai",
      phone: "+971 50 345 6789",
      email: "priya@novaproperties.vip",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      bio: "Advising institutional funds, multinational corporations, and private equity firms on prime office acquisitions, leasehold structuring, and DFSA regulatory premises."
    },
    {
      name: "Marcus Vance",
      title: "Private Client Director — Waterfront Estates",
      specialty: "Palm Jumeirah & Emirates Hills Trophy Homes",
      experience: "16 Years in Luxury Real Estate",
      phone: "+971 50 456 7890",
      email: "marcus@novaproperties.vip",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
      bio: "Representing some of Dubai's most guarded off-market residential estates. Deep expertise in discreet acquisitions, Golden Visa coordination, and architectural appraisal."
    }
  ],

  testimonials: [
    {
      quote: "James and the Nova team orchestrated the acquisition of our Palm Jumeirah penthouse with surgical precision. From private viewings through to DLD transfer, their market intelligence and advocacy were exemplary. They secured us terms other agencies insisted were impossible.",
      author: "Richard Hargreaves",
      designation: "Managing Partner, London Private Equity",
      deal: "Palm Jumeirah Penthouse Acquisition (AED 18.5M)",
      stars: 5,
      avatar: "RH"
    },
    {
      quote: "We came to Dubai seeking a strict 7%+ net yield across off-plan allocations. Sara presented us with three pre-launch allocations before public marketing began. Eighteen months later, two units are up 24% and the rental projections are outperforming expectation. Nova operates at an elite global standard.",
      author: "Marie-Laure Fontaine",
      designation: "Private Wealth Trustee, Geneva",
      deal: "Multi-Unit Off-Plan Portfolio (AED 14.2M)",
      stars: 5,
      avatar: "MF"
    },
    {
      quote: "Relocating our international tech headquarters to DIFC was made frictionless by Priya. She negotiated our Gate Precinct floor on exceptional commercial terms and assisted with the entire fit-out licensing.",
      author: "Tariq Al-Hashemi",
      designation: "Fintech Founder & CEO, Singapore & Dubai",
      deal: "DIFC Commercial Head Office (AED 9.6M)",
      stars: 5,
      avatar: "TA"
    }
  ]
};
