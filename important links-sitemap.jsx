import { useState } from "react";

const saffron = "#FF9933";
const emerald = "#006644";
const cream = "#FDF8F0";
const ink = "#1A1A2E";
const muted = "#6B6B7B";
const tagNew = "#E8F5E9";
const tagNewText = "#2E7D32";
const tagExisting = "#FFF3E0";
const tagExistingText = "#E65100";

const Badge = ({ type }) => (
  <span style={{
    fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em",
    padding: "2px 7px", borderRadius: "20px", textTransform: "uppercase",
    background: type === "new" ? tagNew : tagExisting,
    color: type === "new" ? tagNewText : tagExistingText,
    marginLeft: "8px", verticalAlign: "middle"
  }}>
    {type === "new" ? "✦ NEW" : "Existing"}
  </span>
);

// Each item: { name, desc, links: [{url, label}] }
// links: [] = AI / built-in tool — no external links

const sections = [
  {
    id: "education",
    icon: "🎓",
    label: "Education",
    color: "#4A90D9",
    isNew: false,
    items: [
      {
        name: "AI Study Buddy",
        desc: "AI-powered academic assistance",
        links: []
      },
      {
        name: "Leaving Cert",
        desc: "Junior & Leaving Certificate exams, timetables & results",
        links: [
          { url: "https://www.sec.ie", label: "SEC" },
          { url: "https://www.examinations.ie", label: "Examinations.ie" },
          { url: "https://www.citizensinformation.ie/en/education/state-examinations/junior-cycle-student-award", label: "Citizens Info" },
          { url: "https://www.studyclix.ie", label: "StudyClix (Revision)" },
        ]
      },
      {
        name: "Postgrad",
        desc: "Postgraduate courses, CAO applications & programme search",
        links: [
          { url: "https://www.qualifax.ie", label: "Qualifax" },
          { url: "https://www.cao.ie/index.php?page=postgrad", label: "CAO Postgrad" },
          { url: "https://www.postgrad.ie", label: "Postgrad.ie" },
          { url: "https://www.qqi.ie", label: "QQI" },
        ]
      },
      {
        name: "Study Planner",
        desc: "Personalised study schedules",
        links: []
      },
      {
        name: "Universities",
        desc: "CAO undergraduate admissions, university listings & rankings",
        links: [
          { url: "https://www.cao.ie", label: "CAO" },
          { url: "https://www.iua.ie", label: "Irish Universities Assoc." },
          { url: "https://hea.ie", label: "Higher Education Authority" },
          { url: "https://www.tus.ie", label: "TUS" },
        ]
      },
      {
        name: "Resources",
        desc: "Student grants, scholarships & finance",
        links: [
          { url: "https://susi.ie", label: "SUSI (Student Grants)" },
          { url: "https://hea.ie/funding-governance-performance/funding/student-finance", label: "HEA Student Finance" },
          { url: "https://www.studentfinance.ie", label: "StudentFinance.ie" },
          { url: "https://www.gov.ie/en/service/student-grant", label: "Gov.ie Grant Guide" },
        ]
      },
    ]
  },
  {
    id: "immigration",
    icon: "🛂",
    label: "Immigration",
    color: "#7B5EA7",
    isNew: false,
    items: [
      {
        name: "AI Chatbot",
        desc: "Immigration queries answered instantly",
        links: []
      },
      {
        name: "IRP Renewal",
        desc: "Irish Residence Permit registration, renewal & Burgh Quay appointments",
        links: [
          { url: "https://www.irishimmigration.ie", label: "Irish Immigration Service" },
          { url: "https://burghquayregistrationoffice.inis.gov.ie", label: "Burgh Quay Appointments" },
          { url: "https://www.citizensinformation.ie/en/moving-country/moving-to-ireland/rights-of-residence-in-ireland/registration-of-non-eea-nationals-in-ireland", label: "Citizens Info — IRP" },
        ]
      },
      {
        name: "Stamps & Rights",
        desc: "Stamp 1, 1G, 2, 2A, 3, 4, 5 — entitlements & conditions explained",
        links: [
          { url: "https://www.irishimmigration.ie/registering-your-immigration-permission/about-registration/immigration-stamp-for-permission-holders", label: "Stamps Explained" },
          { url: "https://www.citizensinformation.ie/en/moving-country/moving-to-ireland/rights-of-residence-in-ireland/types-of-residence-permission", label: "Citizens Info — Stamps" },
          { url: "https://www.immigrantcouncil.ie", label: "Immigrant Council of Ireland" },
        ]
      },
      {
        name: "Work Permits",
        desc: "Critical Skills, General Employment & Intra-Company Transfer permits",
        links: [
          { url: "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits", label: "Dept. Enterprise" },
          { url: "https://www.gov.ie/en/collection/61f0d4-employment-permits", label: "Gov.ie Permits Overview" },
          { url: "https://www.citizensinformation.ie/en/moving-country/working-in-ireland/employment-permits/overview-employment-permits", label: "Citizens Info — Permits" },
          { url: "https://www.workpermits.ie", label: "WorkPermits.ie (Guide)" },
        ]
      },
      {
        name: "Citizenship",
        desc: "Naturalisation, Irish citizenship by descent & application process",
        links: [
          { url: "https://www.irishimmigration.ie/citizenship", label: "Irish Immigration Service" },
          { url: "https://www.citizensinformation.ie/en/moving-country/irish-citizenship", label: "Citizens Info — Citizenship" },
          { url: "https://www.gov.ie/en/publication/38091b-irish-naturalisation", label: "Gov.ie — Naturalisation" },
        ]
      },
      {
        name: "PPS Number",
        desc: "Apply for your Personal Public Service number",
        links: [
          { url: "https://www.gov.ie/en/service/12e6f4-get-a-personal-public-service-pps-number", label: "Gov.ie — Apply" },
          { url: "https://www.mywelfare.ie", label: "MyWelfare (Online)" },
          { url: "https://www.citizensinformation.ie/en/social-welfare/irish-social-welfare-system/personal-public-service-number", label: "Citizens Info — PPS" },
        ]
      },
    ]
  },
  {
    id: "driving",
    icon: "🚗",
    label: "Driving",
    color: "#E67E22",
    isNew: false,
    items: [
      {
        name: "AI Chatbot",
        desc: "Driving licence queries answered",
        links: []
      },
      {
        name: "Theory Test",
        desc: "Book your theory test, study materials & practice questions",
        links: [
          { url: "https://www.theorytest.ie", label: "TheoryTest.ie (Book)" },
          { url: "https://www.rsa.ie/services/learner-drivers/the-theory-test", label: "RSA — Theory Test" },
          { url: "https://www.ndls.ie", label: "NDLS" },
          { url: "https://www.theorytestonline.ie", label: "Practice Tests" },
        ]
      },
      {
        name: "Licence Steps",
        desc: "Full pathway: learner permit → lessons → test → full licence",
        links: [
          { url: "https://www.rsa.ie/services/learner-drivers", label: "RSA — Learner Drivers" },
          { url: "https://www.ndls.ie", label: "NDLS (Apply Online)" },
          { url: "https://www.citizensinformation.ie/en/travel-and-recreation/motoring/driver-licensing/learning-to-drive", label: "Citizens Info — Steps" },
          { url: "https://www.adi.ie", label: "ADI (Find Instructor)" },
        ]
      },
      {
        name: "Cost Estimator",
        desc: "Estimate total costs from learner permit to full licence",
        links: []
      },
      {
        name: "Key Info",
        desc: "Rules of the road, road signs & Irish driving laws",
        links: [
          { url: "https://www.rsa.ie/road-safety/education/rules-of-the-road", label: "RSA — Rules of Road" },
          { url: "https://www.gov.ie/en/publication/rules-of-the-road", label: "Gov.ie — Official Book" },
          { url: "https://www.citizensinformation.ie/en/travel-and-recreation/motoring/driving-offences", label: "Citizens Info — Offences" },
        ]
      },
      {
        name: "Foreign Licence",
        desc: "Exchange your Indian driving licence in Ireland",
        links: [
          { url: "https://www.ndls.ie/licence-services/exchange-your-foreign-licence.html", label: "NDLS — Exchange" },
          { url: "https://www.rsa.ie/services/already-have-a-licence/exchange-a-foreign-licence", label: "RSA — Foreign Licence" },
          { url: "https://www.citizensinformation.ie/en/travel-and-recreation/motoring/driver-licensing/exchanging-foreign-driving-permit", label: "Citizens Info — Exchange" },
        ]
      },
    ]
  },
  {
    id: "property",
    icon: "🏠",
    label: "Property",
    color: "#27AE60",
    isNew: false,
    items: [
      {
        name: "AI Chatbot",
        desc: "Housing & tenancy queries",
        links: []
      },
      {
        name: "Tenant Rights",
        desc: "RTB, notice periods, deposit rules & dispute resolution",
        links: [
          { url: "https://www.rtb.ie", label: "RTB (Official Regulator)" },
          { url: "https://www.threshold.ie", label: "Threshold (Housing Charity)" },
          { url: "https://www.citizensinformation.ie/en/housing/renting-a-home", label: "Citizens Info — Renting" },
          { url: "https://www.daft.ie/advice/tenants-rights", label: "Daft — Tenant Guide" },
        ]
      },
      {
        name: "HAP",
        desc: "Housing Assistance Payment — eligibility, application & top-ups",
        links: [
          { url: "https://www.hap.ie", label: "HAP Ireland" },
          { url: "https://www.gov.ie/en/service/hap", label: "Gov.ie — HAP" },
          { url: "https://www.citizensinformation.ie/en/housing/local-authority-and-social-housing/housing-assistance-payment", label: "Citizens Info — HAP" },
        ]
      },
      {
        name: "Mortgage Calculator",
        desc: "Estimate monthly repayments, LTV & total interest",
        links: [
          { url: "https://www.ccpc.ie/consumers/money-tools/mortgage-calculator", label: "CCPC Calculator" },
          { url: "https://www.moneysherpa.ie", label: "MoneySherpa" },
          { url: "https://www.doddl.ie", label: "Doddl" },
          { url: "https://www.bonkers.ie/mortgages", label: "Bonkers Mortgage" },
        ]
      },
      {
        name: "Rates",
        desc: "Current mortgage rates, lender comparison & fixed vs variable",
        links: [
          { url: "https://www.bonkers.ie/mortgages", label: "Bonkers.ie" },
          { url: "https://www.switcher.ie/mortgages", label: "Switcher.ie" },
          { url: "https://www.ccpc.ie/consumers/money/mortgages", label: "CCPC — Mortgage Guide" },
          { url: "https://www.bpfi.ie", label: "BPFI (Banking Federation)" },
        ]
      },
      {
        name: "First Home",
        desc: "First Home Scheme, Help-to-Buy & Affordable Housing",
        links: [
          { url: "https://www.firsthomescheme.ie", label: "First Home Scheme" },
          { url: "https://www.revenue.ie/en/property/help-to-buy-incentive", label: "Help to Buy (Revenue)" },
          { url: "https://www.housingagency.ie", label: "Housing Agency" },
          { url: "https://www.citizensinformation.ie/en/housing/owning-a-home/help-with-buying-a-home", label: "Citizens Info — Buying" },
        ]
      },
    ]
  },
  {
    id: "finance",
    icon: "💶",
    label: "Finance",
    color: "#C0392B",
    isNew: false,
    items: [
      {
        name: "AI Chatbot",
        desc: "Tax and financial queries",
        links: []
      },
      {
        name: "Tax Calculator",
        desc: "PAYE income tax, USC, PRSI & tax credit estimation",
        links: [
          { url: "https://www.revenue.ie/en/jobs-and-pensions/calculating-your-income-tax/index.aspx", label: "Revenue.ie" },
          { url: "https://www.ros.ie", label: "ROS (Revenue Online)" },
          { url: "https://www.taxback.com/en/ireland", label: "TaxBack.com" },
          { url: "https://www.citizensinformation.ie/en/money-and-tax/tax/income-tax", label: "Citizens Info — Tax" },
        ]
      },
      {
        name: "Medical Card",
        desc: "Medical card & GP visit card — eligibility & application",
        links: [
          { url: "https://www.hse.ie/eng/services/list/1/schemes/mc", label: "HSE — Medical Card" },
          { url: "https://www.gov.ie/en/service/medical-card", label: "Gov.ie — Apply" },
          { url: "https://www.citizensinformation.ie/en/health/medical-cards-and-gp-visit-cards/medical-card", label: "Citizens Info" },
        ]
      },
      {
        name: "Means Test",
        desc: "Social welfare means test — income, savings & assets assessed",
        links: [
          { url: "https://www.gov.ie/en/collection/means-test", label: "Gov.ie — Means Test" },
          { url: "https://www.citizensinformation.ie/en/social-welfare/irish-social-welfare-system/means-test-for-social-welfare-payments/means-test", label: "Citizens Info — Means Test" },
          { url: "https://www.mabs.ie", label: "MABS (Free Advice)" },
        ]
      },
      {
        name: "Pensions",
        desc: "Auto-enrolment, PRSAs, defined contribution & pension tracing",
        links: [
          { url: "https://www.pensionsauthority.ie", label: "Pensions Authority" },
          { url: "https://www.gov.ie/en/campaigns/7ac78-auto-enrolment", label: "Gov.ie — Auto-Enrolment" },
          { url: "https://www.citizensinformation.ie/en/money-and-tax/personal-finance/pensions", label: "Citizens Info — Pensions" },
          { url: "https://www.pensionscouncil.ie", label: "Pensions Council" },
        ]
      },
      {
        name: "Banking",
        desc: "Open a bank account — traditional, digital & post office options",
        links: [
          { url: "https://www.ccpc.ie/consumers/money/bank-accounts", label: "CCPC — Compare Accounts" },
          { url: "https://www.anpostmoney.ie", label: "An Post Money (easiest)" },
          { url: "https://www.revolut.com/en-IE", label: "Revolut (Digital)" },
          { url: "https://www.n26.com/en-ie", label: "N26 (Digital)" },
          { url: "https://aib.ie", label: "AIB" },
          { url: "https://www.bankofireland.com", label: "Bank of Ireland" },
        ]
      },
    ]
  },
  {
    id: "utilities",
    icon: "⚡",
    label: "Utilities",
    color: "#2980B9",
    isNew: false,
    items: [
      {
        name: "AI Chatbot",
        desc: "Utilities & switching queries",
        links: []
      },
      {
        name: "Energy",
        desc: "Electricity & gas — setup, tariffs & switching providers",
        links: [
          { url: "https://www.cru.ie", label: "CRU (Regulator)" },
          { url: "https://www.bonkers.ie/gas-electricity", label: "Bonkers — Energy" },
          { url: "https://www.switcher.ie/energy", label: "Switcher — Energy" },
          { url: "https://www.ccpc.ie/consumers/money/energy", label: "CCPC — Energy Guide" },
        ]
      },
      {
        name: "Broadband",
        desc: "Home broadband — plans, speeds & provider comparison",
        links: [
          { url: "https://www.comreg.ie", label: "ComReg (Regulator)" },
          { url: "https://www.bonkers.ie/broadband", label: "Bonkers — Broadband" },
          { url: "https://www.switcher.ie/broadband", label: "Switcher — Broadband" },
          { url: "https://www.nbi.ie", label: "National Broadband Ireland" },
        ]
      },
      {
        name: "Mobile",
        desc: "SIM cards, prepay & bill pay — operator comparison",
        links: [
          { url: "https://www.comreg.ie/compare", label: "ComReg — Compare" },
          { url: "https://www.bonkers.ie/sim-only-deals", label: "Bonkers — SIM Only" },
          { url: "https://www.three.ie", label: "Three" },
          { url: "https://www.vodafone.ie", label: "Vodafone" },
          { url: "https://www.eir.ie", label: "Eir" },
        ]
      },
      {
        name: "Switch Guide",
        desc: "Step-by-step guide to switching energy, broadband & mobile",
        links: [
          { url: "https://www.bonkers.ie", label: "Bonkers.ie" },
          { url: "https://www.switcher.ie", label: "Switcher.ie" },
          { url: "https://www.cru.ie/home/switching-supplier", label: "CRU — How to Switch" },
        ]
      },
      {
        name: "SEAI Grants",
        desc: "Home energy upgrade grants, retrofit & solar PV schemes",
        links: [
          { url: "https://www.seai.ie/grants", label: "SEAI Grants" },
          { url: "https://www.seai.ie/grants/home-energy-grants/better-energy-homes-scheme", label: "Better Energy Homes" },
          { url: "https://www.gov.ie/en/campaigns/seai-national-home-energy-upgrade-scheme", label: "Gov.ie — Retrofit Scheme" },
        ]
      },
    ]
  },
  // ── NEW SECTIONS ──
  {
    id: "healthcare",
    icon: "🏥",
    label: "Healthcare",
    color: "#16A085",
    isNew: true,
    items: [
      {
        name: "AI Chatbot",
        desc: "Health system queries answered",
        links: []
      },
      {
        name: "GP Registration",
        desc: "Find & register with a local GP, out-of-hours & walk-in clinics",
        links: [
          { url: "https://www.hse.ie/eng/services/list/2/gp/find-a-gp.html", label: "HSE — Find a GP" },
          { url: "https://www.gpnightline.ie", label: "GP Nightline (Out-of-Hours)" },
          { url: "https://www.icgp.ie", label: "Irish College of GPs" },
          { url: "https://www.hse.ie/eng/services/list/2/primarycare", label: "HSE Primary Care" },
        ]
      },
      {
        name: "Health Insurance",
        desc: "Compare all four Irish private health insurers",
        links: [
          { url: "https://www.hia.ie", label: "HIA (Official Comparison)" },
          { url: "https://www.vhi.ie", label: "VHI" },
          { url: "https://www.layahealthcare.ie", label: "Laya Healthcare" },
          { url: "https://www.irishlife.ie/health", label: "Irish Life Health" },
          { url: "https://www.glohealth.ie", label: "Glo Health" },
        ]
      },
      {
        name: "HSE Services",
        desc: "Public hospitals, specialist referrals & outpatient services",
        links: [
          { url: "https://www.hse.ie", label: "HSE" },
          { url: "https://www2.hse.ie/services", label: "HSE Services Directory" },
          { url: "https://www.hse.ie/eng/services/list/3/acutehospitals", label: "HSE — Hospitals List" },
        ]
      },
      {
        name: "Mental Health",
        desc: "Wellbeing supports, crisis lines & community services",
        links: [
          { url: "https://www2.hse.ie/mental-health", label: "HSE — Mental Health" },
          { url: "https://www.samaritans.ie", label: "Samaritans Ireland" },
          { url: "https://www.pieta.ie", label: "Pieta (Suicide Prevention)" },
          { url: "https://www.aware.ie", label: "Aware (Depression Support)" },
          { url: "https://www.turn2me.ie", label: "Turn2Me (Online Support)" },
        ]
      },
      {
        name: "Pharmacy Guide",
        desc: "Drug Payment Scheme, prescription charges & pharmacy finder",
        links: [
          { url: "https://www.hse.ie/eng/health/hl/drugpayment", label: "Drug Payment Scheme" },
          { url: "https://www.hpra.ie", label: "HPRA (Medicines Regulator)" },
          { url: "https://www.ipu.ie", label: "Irish Pharmacy Union" },
        ]
      },
    ]
  },
  {
    id: "employment",
    icon: "💼",
    label: "Employment",
    color: "#8E44AD",
    isNew: true,
    items: [
      {
        name: "AI Chatbot",
        desc: "Job search & work rights guidance",
        links: []
      },
      {
        name: "Job Search",
        desc: "Job boards & recruitment platforms for the Irish market",
        links: [
          { url: "https://www.jobsireland.ie", label: "Jobs Ireland (DSP)" },
          { url: "https://www.irishjobs.ie", label: "IrishJobs.ie" },
          { url: "https://www.indeed.ie", label: "Indeed Ireland" },
          { url: "https://www.linkedin.com/jobs", label: "LinkedIn Jobs" },
          { url: "https://www.recruitireland.com", label: "RecruitIreland" },
        ]
      },
      {
        name: "Work Rights",
        desc: "Minimum wage, working hours, leave entitlements & WRC complaints",
        links: [
          { url: "https://www.workplacerelations.ie", label: "WRC" },
          { url: "https://www.citizensinformation.ie/en/employment", label: "Citizens Info — Employment" },
          { url: "https://www.gov.ie/en/organisation/department-of-enterprise-trade-and-employment", label: "Dept. Enterprise" },
          { url: "https://www.ictu.ie", label: "ICTU (Trade Unions)" },
        ]
      },
      {
        name: "Payslip & PRSI",
        desc: "Understanding your payslip, USC bands, PRSI classes & tax credits",
        links: [
          { url: "https://www.revenue.ie/en/jobs-and-pensions/index.aspx", label: "Revenue — PAYE" },
          { url: "https://www.gov.ie/en/service/prsi", label: "Gov.ie — PRSI" },
          { url: "https://www.citizensinformation.ie/en/social-welfare/irish-social-welfare-system/social-insurance-prsi", label: "Citizens Info — PRSI" },
          { url: "https://www.mywelfare.ie", label: "MyWelfare (PRSI Record)" },
        ]
      },
      {
        name: "Skills & Training",
        desc: "Upskilling, reskilling, Springboard+ & government-funded courses",
        links: [
          { url: "https://springboardcourses.ie", label: "Springboard+" },
          { url: "https://www.skillnetireland.ie", label: "Skillnet Ireland" },
          { url: "https://www.solas.ie", label: "SOLAS (Further Education)" },
          { url: "https://www.gov.ie/en/campaigns/generation-apprenticeship", label: "Apprenticeships" },
        ]
      },
      {
        name: "Recognition of Qualifications",
        desc: "Get Indian degrees & professional qualifications formally recognised",
        links: [
          { url: "https://www.qqi.ie", label: "QQI" },
          { url: "https://www.qualificationsrecognition.ie", label: "QQI Recognition Service" },
          { url: "https://www.naric.ie", label: "NARIC Ireland" },
          { url: "https://www.engineersireland.ie", label: "Engineers Ireland" },
        ]
      },
    ]
  },
  {
    id: "transport",
    icon: "🚌",
    label: "Transport",
    color: "#D35400",
    isNew: true,
    items: [
      {
        name: "AI Chatbot",
        desc: "Getting around Ireland",
        links: []
      },
      {
        name: "Leap Card",
        desc: "Get & top up your reusable travel card for all Dublin & national transit",
        links: [
          { url: "https://www.leapcard.ie", label: "Leap Card" },
          { url: "https://www.transportforireland.ie/fares/leap-card", label: "TFI — Leap Info" },
          { url: "https://www.transportforireland.ie/plan-a-journey", label: "TFI Journey Planner" },
        ]
      },
      {
        name: "Dublin Transit",
        desc: "Dublin Bus, Luas tram & DART rail — routes, fares & timetables",
        links: [
          { url: "https://www.dublinbus.ie", label: "Dublin Bus" },
          { url: "https://www.luas.ie", label: "Luas" },
          { url: "https://www.irishrail.ie/dart", label: "DART" },
          { url: "https://www.transportforireland.ie", label: "Transport for Ireland" },
        ]
      },
      {
        name: "Intercity Rail",
        desc: "Train travel between Dublin, Cork, Galway, Limerick & beyond",
        links: [
          { url: "https://www.irishrail.ie", label: "Irish Rail" },
          { url: "https://www.irishrail.ie/en-ie/travel-information/student-travel", label: "Student Rail Discount" },
          { url: "https://www.transportforireland.ie", label: "TFI Journey Planner" },
        ]
      },
      {
        name: "Bus Éireann",
        desc: "National bus network — regional routes & Expressway intercity",
        links: [
          { url: "https://www.buseireann.ie", label: "Bus Éireann" },
          { url: "https://www.expressway.ie", label: "Expressway (Intercity)" },
          { url: "https://www.goahead.ie", label: "Go-Ahead Ireland" },
        ]
      },
      {
        name: "Cycling",
        desc: "Dublin Bikes, cycling infrastructure & national greenways",
        links: [
          { url: "https://www.dublinbikes.ie", label: "Dublin Bikes" },
          { url: "https://www.transportforireland.ie/getting-around/by-bike", label: "TFI — Cycling" },
          { url: "https://www.cycling.ie", label: "Cycling Ireland" },
          { url: "https://www.greenways.ie", label: "Ireland's Greenways" },
        ]
      },
    ]
  },
  {
    id: "community",
    icon: "🪔",
    label: "Community & Culture",
    color: "#FF6B35",
    isNew: true,
    items: [
      {
        name: "AI Chatbot",
        desc: "Community & cultural guidance",
        links: []
      },
      {
        name: "Indian Community",
        desc: "Indian associations, expat groups & integration support",
        links: [
          { url: "https://www.integration.ie", label: "Integration Ireland" },
          { url: "https://www.immigrantcouncil.ie", label: "Immigrant Council of Ireland" },
          { url: "https://www.nasc.ie", label: "Nasc (Migrant Rights)" },
          { url: "https://www.gov.ie/en/campaigns/integration", label: "Gov.ie — Integration" },
        ]
      },
      {
        name: "Citizens Information",
        desc: "Free advice on rights, entitlements & public services",
        links: [
          { url: "https://www.citizensinformation.ie", label: "Citizens Information" },
          { url: "https://www.citizensinformationboard.ie", label: "CIB (National Body)" },
          { url: "https://www.mabs.ie", label: "MABS (Money Advice)" },
        ]
      },
      {
        name: "Indian Embassy",
        desc: "Consular services, passport renewal, OCI & emergency assistance",
        links: [
          { url: "https://www.indianembassydublin.in", label: "Embassy of India, Dublin" },
          { url: "https://www.passportindia.gov.in", label: "Passport Seva India" },
          { url: "https://boi.gov.in", label: "OCI Card (Bureau of Immigration)" },
        ]
      },
      {
        name: "MABS",
        desc: "Free, confidential money advice & debt guidance service",
        links: [
          { url: "https://www.mabs.ie", label: "MABS" },
          { url: "https://www.citizensinformation.ie/en/money-and-tax/personal-finance/debt", label: "Citizens Info — Debt" },
          { url: "https://www.ccpc.ie/consumers/money/dealing-with-debt", label: "CCPC — Dealing with Debt" },
        ]
      },
      {
        name: "Anti-Racism & Support",
        desc: "Report racism, legal supports & migrant rights organisations",
        links: [
          { url: "https://www.ihrec.ie", label: "IHREC (Official Body)" },
          { url: "https://www.nasc.ie", label: "Nasc" },
          { url: "https://www.flac.ie", label: "FLAC (Free Legal Advice)" },
          { url: "https://www.amnesty.ie", label: "Amnesty Ireland" },
        ]
      },
    ]
  },
];

const totalLinks = sections.reduce((acc, s) =>
  acc + s.items.reduce((a, i) => a + i.links.length, 0), 0);

const SectionCard = ({ section, isOpen, onToggle }) => (
  <div style={{
    borderRadius: "16px", overflow: "hidden",
    border: `1.5px solid ${isOpen ? section.color : "#E8E4DC"}`,
    background: "#fff", transition: "all 0.3s ease",
    boxShadow: isOpen ? `0 8px 32px ${section.color}22` : "0 2px 8px rgba(0,0,0,0.04)",
  }}>
    <button onClick={onToggle} style={{
      width: "100%", textAlign: "left", padding: "18px 24px",
      background: isOpen ? `${section.color}0D` : "#fff",
      border: "none", cursor: "pointer", display: "flex",
      alignItems: "center", gap: "14px", transition: "background 0.2s ease",
    }}>
      <span style={{ fontSize: "22px" }}>{section.icon}</span>
      <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", fontWeight: 700, color: ink, flex: 1 }}>
        {section.label}
        {section.isNew ? <Badge type="new" /> : <Badge type="existing" />}
      </span>
      <span style={{ fontSize: "11px", color: muted, marginRight: "8px" }}>
        {section.items.reduce((a, i) => a + i.links.length, 0)} links
      </span>
      <span style={{
        color: section.color, fontWeight: 700, fontSize: "18px",
        transition: "transform 0.3s", display: "inline-block",
        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)"
      }}>›</span>
    </button>

    {isOpen && (
      <div style={{ padding: "4px 24px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "10px", marginTop: "8px" }}>
          {section.items.map((item, i) => (
            <div key={i} style={{
              background: cream, borderRadius: "10px", padding: "13px 15px",
              border: "1px solid #EDE8DE", display: "flex", flexDirection: "column", gap: "6px"
            }}>
              <span style={{ fontWeight: 700, fontSize: "13px", color: ink }}>{item.name}</span>
              <span style={{ fontSize: "12px", color: muted, lineHeight: 1.5 }}>{item.desc}</span>
              {item.links.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "2px" }}>
                  {item.links.map((lnk, j) => (
                    <a key={j} href={lnk.url} target="_blank" rel="noopener noreferrer" style={{
                      fontSize: "10px", color: section.color, fontWeight: 600,
                      textDecoration: "none", border: `1px solid ${section.color}44`,
                      background: `${section.color}0A`, borderRadius: "20px",
                      padding: "3px 9px", whiteSpace: "nowrap",
                    }}>
                      {lnk.label} ↗
                    </a>
                  ))}
                </div>
              ) : (
                <span style={{ fontSize: "10px", color: muted, fontStyle: "italic" }}>Built-in AI tool — no external link</span>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default function App() {
  const [openSections, setOpenSections] = useState(new Set(["immigration", "education"]));
  const [filter, setFilter] = useState("all");

  const toggle = (id) => setOpenSections(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const filtered = filter === "new" ? sections.filter(s => s.isNew)
    : filter === "existing" ? sections.filter(s => !s.isNew)
    : sections;

  return (
    <div style={{ minHeight: "100vh", background: cream, fontFamily: "'DM Sans', 'Segoe UI', sans-serif", padding: "0 0 60px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a:hover { opacity: 0.75; }
      `}</style>

      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${emerald} 0%, #004d30 50%, #1a1a2e 100%)`,
        padding: "48px 32px 40px", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "4px",
          background: `linear-gradient(90deg, ${saffron} 0%, ${saffron} 33%, white 33%, white 66%, #138808 66%, #138808 100%)`
        }} />
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
            <div style={{
              width: "52px", height: "52px", borderRadius: "14px",
              background: `linear-gradient(135deg, ${saffron}, #e67e22)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "26px", flexShrink: 0
            }}>🍀</div>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 800, color: "#fff", lineHeight: 1.1 }}>
                Ireland Guide
              </h1>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", marginTop: "3px" }}>
                Your complete guide to life in Ireland
              </p>
            </div>
          </div>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", lineHeight: 1.7, maxWidth: "600px" }}>
            A structured sitemap with verified official reference links for every section — built for Indian students and professionals navigating Ireland for the first time.
          </p>
          <div style={{ display: "flex", gap: "24px", marginTop: "24px", flexWrap: "wrap" }}>
            {[
              { n: sections.filter(s => !s.isNew).length, label: "Existing Sections" },
              { n: sections.filter(s => s.isNew).length, label: "Suggested New Sections", accent: saffron },
              { n: totalLinks, label: "Reference Links" },
            ].map((stat, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.08)", borderRadius: "10px",
                padding: "10px 18px", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.12)"
              }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 800, color: stat.accent || "#fff" }}>{stat.n}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px 0" }}>

        {/* Controls */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", marginBottom: "20px", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[["all", "All Sections"], ["existing", "Existing"], ["new", "✦ Suggested New"]].map(([val, label]) => (
              <button key={val} onClick={() => setFilter(val)} style={{
                padding: "7px 16px", borderRadius: "20px", fontSize: "12px", fontWeight: 600,
                border: filter === val ? "none" : "1.5px solid #DDD",
                background: filter === val ? ink : "white",
                color: filter === val ? "white" : muted,
                cursor: "pointer", transition: "all 0.2s"
              }}>{label}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => setOpenSections(new Set(sections.map(s => s.id)))} style={{ fontSize: "12px", color: emerald, fontWeight: 600, background: "none", border: `1px solid ${emerald}`, borderRadius: "8px", padding: "6px 12px", cursor: "pointer" }}>Expand All</button>
            <button onClick={() => setOpenSections(new Set())} style={{ fontSize: "12px", color: muted, fontWeight: 600, background: "none", border: "1px solid #DDD", borderRadius: "8px", padding: "6px 12px", cursor: "pointer" }}>Collapse All</button>
          </div>
        </div>

        {(filter === "all" || filter === "new") && (
          <div style={{
            background: "linear-gradient(135deg, #FFF8EE, #FFF3E0)",
            border: `1.5px solid ${saffron}55`, borderRadius: "14px",
            padding: "16px 20px", marginBottom: "20px",
            display: "flex", gap: "14px", alignItems: "flex-start"
          }}>
            <span style={{ fontSize: "22px" }}>✦</span>
            <div>
              <p style={{ fontWeight: 700, color: ink, fontSize: "13px" }}>Suggested New Sections</p>
              <p style={{ color: muted, fontSize: "12px", marginTop: "4px", lineHeight: 1.6 }}>
                We recommend adding <strong>Healthcare, Employment, Transport,</strong> and <strong>Community & Culture</strong> — the four biggest gaps for new arrivals, each with verified official Irish government & regulatory links.
              </p>
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.map(section => (
            <SectionCard
              key={section.id}
              section={section}
              isOpen={openSections.has(section.id)}
              onToggle={() => toggle(section.id)}
            />
          ))}
        </div>

        {/* UX Recommendations */}
        <div style={{ marginTop: "32px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700, color: ink, marginBottom: "14px" }}>
            Additional UX Recommendations
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
            {[
              { icon: "🇮🇳", title: "India-Specific Context", desc: "Flag content for Indian nationals — driving licence exchange, OCI card holders, Indian qualification recognition via NARIC." },
              { icon: "🔔", title: "Deadline Alerts", desc: "IRP renewal reminders, tax filing dates (31 Oct), HAP review dates — push or email alerts keep users compliant." },
              { icon: "📝", title: "Document Checklist", desc: "Per-journey checklists (e.g. 'What to bring to IRP appointment') reduce user anxiety and drop-off." },
              { icon: "🌐", title: "Hindi / Tamil Toggle", desc: "Even basic language support increases trust among newer arrivals who are still settling in." },
              { icon: "📞", title: "Emergency Quick-Access", desc: "Persistent widget: 999/112, Indian Embassy (+353 1 6608833), Citizens Information (0818 07 4000), Samaritans (116 123)." },
              { icon: "⭐", title: "Community Reviews", desc: "Let users rate services (e.g. 'This GP accepts new patients') — crowd-sourced local knowledge from the Indian community." },
            ].map((item, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "12px", padding: "16px", border: "1.5px solid #EDE8DE" }}>
                <div style={{ fontSize: "20px", marginBottom: "8px" }}>{item.icon}</div>
                <p style={{ fontWeight: 700, fontSize: "13px", color: ink, marginBottom: "5px" }}>{item.title}</p>
                <p style={{ fontSize: "12px", color: muted, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: "40px", textAlign: "center", borderTop: "1px solid #EDE8DE", paddingTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "8px" }}>
            <span style={{ width: "32px", height: "4px", background: saffron, borderRadius: "2px" }} />
            <span style={{ width: "32px", height: "4px", background: "#fff", border: "1px solid #DDD", borderRadius: "2px" }} />
            <span style={{ width: "32px", height: "4px", background: "#138808", borderRadius: "2px" }} />
          </div>
          <p style={{ fontSize: "11px", color: muted }}>Built for Indians in Ireland · All links point to official Irish government or regulatory bodies</p>
        </div>
      </div>
    </div>
  );
}
