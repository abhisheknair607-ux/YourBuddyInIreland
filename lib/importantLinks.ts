export type ImportantReferenceLink = {
  label: string;
  url: string;
};

export type ImportantReferenceItem = {
  title: string;
  description?: string;
  links: ImportantReferenceLink[];
};

export type ImportantReferenceSection = {
  id: string;
  title: string;
  description: string;
  tone: "sky" | "violet" | "amber" | "emerald" | "rose" | "blue" | "teal" | "indigo" | "orange" | "slate";
  items: ImportantReferenceItem[];
};

export const importantReferenceSections: ImportantReferenceSection[] = [
  {
    id: "student-essentials",
    title: "Student Essentials",
    description: "High-priority links students often need in the first weeks.",
    tone: "sky",
    items: [
      {
        title: "PPSN",
        links: [
          { label: "Gov.ie PPSN", url: "https://www.gov.ie/en/service/12e6f4-get-a-personal-public-service-pps-number" },
          { label: "MyWelfare", url: "https://www.mywelfare.ie" },
          { label: "Citizens Information PPS", url: "https://www.citizensinformation.ie/en/social-welfare/irish-social-welfare-system/personal-public-service-number" }
        ]
      },
      {
        title: "Visa And IRP",
        links: [
          { label: "AVATS", url: "https://www.visas.inis.gov.ie/avats/Default.aspx" },
          { label: "VFS Ireland", url: "https://visa.vfsglobal.com/ind/en/irl/attend-centre" },
          { label: "Irish Immigration", url: "https://www.irishimmigration.ie" },
          { label: "Burgh Quay Appointments", url: "https://www.irishimmigration.ie/burgh-quay-appointments/" }
        ]
      },
      {
        title: "Student Maps",
        links: [
          { label: "Student Map", url: "https://www.google.com/maps/d/viewer?mid=1ObFwqV2vtigkclpjea3sUHNhUuw&ll=53.291859560190396%2C-6.18664934077243&z=13" },
          { label: "Accommodation Map", url: "https://www.google.com/maps/d/viewer?mid=12P4oVY7A4w538meuFJUEEuMIJ1paCuE8&ll=53.28668449709923%2C-6.158606121728503&z=12" },
          { label: "Area Map", url: "https://www.google.com/maps/d/viewer?mid=1ObFwqV2vtigkclpjea3sUHNhUuw&ll=53.32837264518767%2C-6.201412219190399&z=13" }
        ]
      },
      {
        title: "Phones And Taxis",
        links: [
          { label: "Vodafone", url: "https://www.vodafone.ie/mobile/pay-as-you-go" },
          { label: "Three", url: "https://www.three.ie/" },
          { label: "Eir", url: "https://www.eir.ie/mobile/" },
          { label: "Tesco Mobile", url: "https://www.tescomobile.ie/" },
          { label: "Lyca Mobile", url: "https://www.lycamobile.ie/en/" },
          { label: "FREENOW", url: "https://www.free-now.com/ie/" }
        ]
      }
    ]
  },
  {
    id: "education",
    title: "Education",
    description: "Courses, exams, grants, university search and qualification references.",
    tone: "blue",
    items: [
      {
        title: "Leaving Cert",
        links: [
          { label: "SEC", url: "https://www.sec.ie" },
          { label: "Examinations.ie", url: "https://www.examinations.ie" },
          { label: "Citizens Information", url: "https://www.citizensinformation.ie/en/education/state-examinations/junior-cycle-student-award" },
          { label: "StudyClix", url: "https://www.studyclix.ie" }
        ]
      },
      {
        title: "Postgraduate Courses",
        links: [
          { label: "Qualifax", url: "https://www.qualifax.ie" },
          { label: "CAO Postgrad", url: "https://www.cao.ie/index.php?page=postgrad" },
          { label: "Postgrad.ie", url: "https://www.postgrad.ie" },
          { label: "QQI", url: "https://www.qqi.ie" }
        ]
      },
      {
        title: "Universities",
        links: [
          { label: "CAO", url: "https://www.cao.ie" },
          { label: "Irish Universities Association", url: "https://www.iua.ie" },
          { label: "Higher Education Authority", url: "https://hea.ie" },
          { label: "TUS", url: "https://www.tus.ie" }
        ]
      },
      {
        title: "Student Finance",
        links: [
          { label: "SUSI", url: "https://susi.ie" },
          { label: "HEA Student Finance", url: "https://hea.ie/funding-governance-performance/funding/student-finance" },
          { label: "StudentFinance.ie", url: "https://www.studentfinance.ie" },
          { label: "Gov.ie Student Grant", url: "https://www.gov.ie/en/service/student-grant" }
        ]
      }
    ]
  },
  {
    id: "immigration",
    title: "Immigration",
    description: "IRP, stamps, work permits, citizenship and residence permissions.",
    tone: "violet",
    items: [
      {
        title: "IRP Renewal",
        links: [
          { label: "Irish Immigration Service", url: "https://www.irishimmigration.ie" },
          { label: "Burgh Quay Appointments", url: "https://burghquayregistrationoffice.inis.gov.ie" },
          { label: "Citizens Information IRP", url: "https://www.citizensinformation.ie/en/moving-country/moving-to-ireland/rights-of-residence-in-ireland/registration-of-non-eea-nationals-in-ireland" }
        ]
      },
      {
        title: "Stamps And Rights",
        links: [
          { label: "Stamps Explained", url: "https://www.irishimmigration.ie/registering-your-immigration-permission/about-registration/immigration-stamp-for-permission-holders" },
          { label: "Citizens Information Stamps", url: "https://www.citizensinformation.ie/en/moving-country/moving-to-ireland/rights-of-residence-in-ireland/types-of-residence-permission" },
          { label: "Immigrant Council", url: "https://www.immigrantcouncil.ie" }
        ]
      },
      {
        title: "Work Permits",
        links: [
          { label: "Dept. Enterprise", url: "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits" },
          { label: "Gov.ie Permits", url: "https://www.gov.ie/en/collection/61f0d4-employment-permits" },
          { label: "Citizens Information Permits", url: "https://www.citizensinformation.ie/en/moving-country/working-in-ireland/employment-permits/overview-employment-permits" },
          { label: "WorkPermits.ie", url: "https://www.workpermits.ie" }
        ]
      },
      {
        title: "Citizenship",
        links: [
          { label: "Irish Immigration Citizenship", url: "https://www.irishimmigration.ie/citizenship" },
          { label: "Citizens Information Citizenship", url: "https://www.citizensinformation.ie/en/moving-country/irish-citizenship" },
          { label: "Gov.ie Naturalisation", url: "https://www.gov.ie/en/publication/38091b-irish-naturalisation" }
        ]
      }
    ]
  },
  {
    id: "housing",
    title: "Housing And Property",
    description: "Renting, tenant rights, HAP, mortgages and first-home schemes.",
    tone: "emerald",
    items: [
      {
        title: "Tenant Rights",
        links: [
          { label: "RTB", url: "https://www.rtb.ie" },
          { label: "Threshold", url: "https://www.threshold.ie" },
          { label: "Citizens Information Renting", url: "https://www.citizensinformation.ie/en/housing/renting-a-home" },
          { label: "Daft Tenant Guide", url: "https://www.daft.ie/advice/tenants-rights" }
        ]
      },
      {
        title: "HAP",
        links: [
          { label: "HAP Ireland", url: "https://www.hap.ie" },
          { label: "Gov.ie HAP", url: "https://www.gov.ie/en/service/hap" },
          { label: "Citizens Information HAP", url: "https://www.citizensinformation.ie/en/housing/local-authority-and-social-housing/housing-assistance-payment" }
        ]
      },
      {
        title: "Mortgage Tools",
        links: [
          { label: "CCPC Calculator", url: "https://www.ccpc.ie/consumers/money-tools/mortgage-calculator" },
          { label: "Bonkers Mortgages", url: "https://www.bonkers.ie/mortgages" },
          { label: "Switcher Mortgages", url: "https://www.switcher.ie/mortgages" },
          { label: "CCPC Mortgage Guide", url: "https://www.ccpc.ie/consumers/money/mortgages" }
        ]
      },
      {
        title: "First Home",
        links: [
          { label: "First Home Scheme", url: "https://www.firsthomescheme.ie" },
          { label: "Help To Buy", url: "https://www.revenue.ie/en/property/help-to-buy-incentive" },
          { label: "Housing Agency", url: "https://www.housingagency.ie" },
          { label: "Citizens Information Buying", url: "https://www.citizensinformation.ie/en/housing/owning-a-home/help-with-buying-a-home" }
        ]
      }
    ]
  },
  {
    id: "finance",
    title: "Finance",
    description: "Tax, medical cards, means tests, pensions and banking setup.",
    tone: "rose",
    items: [
      {
        title: "Tax",
        links: [
          { label: "Revenue Income Tax", url: "https://www.revenue.ie/en/jobs-and-pensions/calculating-your-income-tax/index.aspx" },
          { label: "ROS", url: "https://www.ros.ie" },
          { label: "TaxBack Ireland", url: "https://www.taxback.com/en/ireland" },
          { label: "Citizens Information Tax", url: "https://www.citizensinformation.ie/en/money-and-tax/tax/income-tax" }
        ]
      },
      {
        title: "Medical Card",
        links: [
          { label: "HSE Medical Card", url: "https://www.hse.ie/eng/services/list/1/schemes/mc" },
          { label: "Gov.ie Medical Card", url: "https://www.gov.ie/en/service/medical-card" },
          { label: "Citizens Information Medical Card", url: "https://www.citizensinformation.ie/en/health/medical-cards-and-gp-visit-cards/medical-card" }
        ]
      },
      {
        title: "Means Test",
        links: [
          { label: "Gov.ie Means Test", url: "https://www.gov.ie/en/collection/means-test" },
          { label: "Citizens Information Means Test", url: "https://www.citizensinformation.ie/en/social-welfare/irish-social-welfare-system/means-test-for-social-welfare-payments/means-test" },
          { label: "MABS", url: "https://www.mabs.ie" }
        ]
      },
      {
        title: "Banking",
        links: [
          { label: "CCPC Accounts", url: "https://www.ccpc.ie/consumers/money/bank-accounts" },
          { label: "An Post Money", url: "https://www.anpostmoney.ie" },
          { label: "Revolut", url: "https://www.revolut.com/en-IE" },
          { label: "N26", url: "https://www.n26.com/en-ie" },
          { label: "AIB", url: "https://aib.ie" },
          { label: "Bank of Ireland", url: "https://www.bankofireland.com" }
        ]
      }
    ]
  },
  {
    id: "healthcare",
    title: "Healthcare",
    description: "GP registration, insurance, HSE services, mental health and pharmacies.",
    tone: "teal",
    items: [
      {
        title: "GP Registration",
        links: [
          { label: "HSE Find A GP", url: "https://www.hse.ie/eng/services/list/2/gp/find-a-gp.html" },
          { label: "GP Nightline", url: "https://www.gpnightline.ie" },
          { label: "Irish College Of GPs", url: "https://www.icgp.ie" },
          { label: "HSE Primary Care", url: "https://www.hse.ie/eng/services/list/2/primarycare" }
        ]
      },
      {
        title: "Health Insurance",
        links: [
          { label: "HIA Comparison", url: "https://www.hia.ie" },
          { label: "VHI", url: "https://www.vhi.ie" },
          { label: "Laya Healthcare", url: "https://www.layahealthcare.ie" },
          { label: "Irish Life Health", url: "https://www.irishlife.ie/health" }
        ]
      },
      {
        title: "HSE Services",
        links: [
          { label: "HSE", url: "https://www.hse.ie" },
          { label: "HSE Services Directory", url: "https://www2.hse.ie/services" },
          { label: "HSE Hospitals", url: "https://www.hse.ie/eng/services/list/3/acutehospitals" }
        ]
      },
      {
        title: "Mental Health",
        links: [
          { label: "HSE Mental Health", url: "https://www2.hse.ie/mental-health" },
          { label: "Samaritans Ireland", url: "https://www.samaritans.ie" },
          { label: "Pieta", url: "https://www.pieta.ie" },
          { label: "Aware", url: "https://www.aware.ie" },
          { label: "Turn2Me", url: "https://www.turn2me.ie" }
        ]
      }
    ]
  },
  {
    id: "employment",
    title: "Employment",
    description: "Job boards, work rights, payslips, training and qualification recognition.",
    tone: "indigo",
    items: [
      {
        title: "Job Search",
        links: [
          { label: "Jobs Ireland", url: "https://www.jobsireland.ie" },
          { label: "IrishJobs", url: "https://www.irishjobs.ie" },
          { label: "Indeed Ireland", url: "https://www.indeed.ie" },
          { label: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs" },
          { label: "RecruitIreland", url: "https://www.recruitireland.com" }
        ]
      },
      {
        title: "Work Rights",
        links: [
          { label: "WRC", url: "https://www.workplacerelations.ie" },
          { label: "Citizens Information Employment", url: "https://www.citizensinformation.ie/en/employment" },
          { label: "Dept. Enterprise", url: "https://www.gov.ie/en/organisation/department-of-enterprise-trade-and-employment" },
          { label: "ICTU", url: "https://www.ictu.ie" }
        ]
      },
      {
        title: "Payslip And PRSI",
        links: [
          { label: "Revenue PAYE", url: "https://www.revenue.ie/en/jobs-and-pensions/index.aspx" },
          { label: "Gov.ie PRSI", url: "https://www.gov.ie/en/service/prsi" },
          { label: "Citizens Information PRSI", url: "https://www.citizensinformation.ie/en/social-welfare/irish-social-welfare-system/social-insurance-prsi" },
          { label: "MyWelfare", url: "https://www.mywelfare.ie" }
        ]
      },
      {
        title: "Skills And Qualifications",
        links: [
          { label: "Springboard+", url: "https://springboardcourses.ie" },
          { label: "Skillnet Ireland", url: "https://www.skillnetireland.ie" },
          { label: "SOLAS", url: "https://www.solas.ie" },
          { label: "NARIC Ireland", url: "https://www.naric.ie" },
          { label: "Qualifications Recognition", url: "https://www.qualificationsrecognition.ie" }
        ]
      }
    ]
  },
  {
    id: "transport",
    title: "Transport",
    description: "Leap Card, Dublin transit, intercity travel, buses and cycling.",
    tone: "orange",
    items: [
      {
        title: "Leap Card",
        links: [
          { label: "Leap Card", url: "https://www.leapcard.ie" },
          { label: "TFI Leap Info", url: "https://www.transportforireland.ie/fares/leap-card" },
          { label: "TFI Journey Planner", url: "https://www.transportforireland.ie/plan-a-journey" }
        ]
      },
      {
        title: "Dublin Transit",
        links: [
          { label: "Dublin Bus", url: "https://www.dublinbus.ie" },
          { label: "Luas", url: "https://www.luas.ie" },
          { label: "DART", url: "https://www.irishrail.ie/dart" },
          { label: "Transport for Ireland", url: "https://www.transportforireland.ie" }
        ]
      },
      {
        title: "Intercity Travel",
        links: [
          { label: "Irish Rail", url: "https://www.irishrail.ie" },
          { label: "Student Rail Discount", url: "https://www.irishrail.ie/en-ie/travel-information/student-travel" },
          { label: "Bus Eireann", url: "https://www.buseireann.ie" },
          { label: "Expressway", url: "https://www.expressway.ie" },
          { label: "Go-Ahead Ireland", url: "https://www.goahead.ie" }
        ]
      },
      {
        title: "Cycling",
        links: [
          { label: "Dublin Bikes", url: "https://www.dublinbikes.ie" },
          { label: "TFI Cycling", url: "https://www.transportforireland.ie/getting-around/by-bike" },
          { label: "Cycling Ireland", url: "https://www.cycling.ie" },
          { label: "Greenways", url: "https://www.greenways.ie" }
        ]
      }
    ]
  },
  {
    id: "utilities",
    title: "Utilities",
    description: "Energy, broadband, mobile providers, switching and home energy grants.",
    tone: "sky",
    items: [
      {
        title: "Energy",
        links: [
          { label: "CRU", url: "https://www.cru.ie" },
          { label: "Bonkers Energy", url: "https://www.bonkers.ie/gas-electricity" },
          { label: "Switcher Energy", url: "https://www.switcher.ie/energy" },
          { label: "CCPC Energy", url: "https://www.ccpc.ie/consumers/money/energy" }
        ]
      },
      {
        title: "Broadband",
        links: [
          { label: "ComReg", url: "https://www.comreg.ie" },
          { label: "Bonkers Broadband", url: "https://www.bonkers.ie/broadband" },
          { label: "Switcher Broadband", url: "https://www.switcher.ie/broadband" },
          { label: "National Broadband Ireland", url: "https://www.nbi.ie" }
        ]
      },
      {
        title: "Mobile",
        links: [
          { label: "ComReg Compare", url: "https://www.comreg.ie/compare" },
          { label: "Bonkers SIM Deals", url: "https://www.bonkers.ie/sim-only-deals" },
          { label: "Three", url: "https://www.three.ie" },
          { label: "Vodafone", url: "https://www.vodafone.ie" },
          { label: "Eir", url: "https://www.eir.ie" }
        ]
      },
      {
        title: "SEAI Grants",
        links: [
          { label: "SEAI Grants", url: "https://www.seai.ie/grants" },
          { label: "Better Energy Homes", url: "https://www.seai.ie/grants/home-energy-grants/better-energy-homes-scheme" },
          { label: "Gov.ie Retrofit Scheme", url: "https://www.gov.ie/en/campaigns/seai-national-home-energy-upgrade-scheme" }
        ]
      }
    ]
  },
  {
    id: "driving",
    title: "Driving",
    description: "Theory test, licence steps, road rules and foreign licence exchange.",
    tone: "amber",
    items: [
      {
        title: "Theory Test",
        links: [
          { label: "TheoryTest.ie", url: "https://www.theorytest.ie" },
          { label: "RSA Theory Test", url: "https://www.rsa.ie/services/learner-drivers/the-theory-test" },
          { label: "NDLS", url: "https://www.ndls.ie" },
          { label: "Practice Tests", url: "https://www.theorytestonline.ie" }
        ]
      },
      {
        title: "Licence Steps",
        links: [
          { label: "RSA Learner Drivers", url: "https://www.rsa.ie/services/learner-drivers" },
          { label: "NDLS Apply Online", url: "https://www.ndls.ie" },
          { label: "Citizens Information Steps", url: "https://www.citizensinformation.ie/en/travel-and-recreation/motoring/driver-licensing/learning-to-drive" },
          { label: "Find Instructor", url: "https://www.adi.ie" }
        ]
      },
      {
        title: "Rules And Foreign Licence",
        links: [
          { label: "RSA Rules Of Road", url: "https://www.rsa.ie/road-safety/education/rules-of-the-road" },
          { label: "Gov.ie Rules Of Road", url: "https://www.gov.ie/en/publication/rules-of-the-road" },
          { label: "NDLS Exchange", url: "https://www.ndls.ie/licence-services/exchange-your-foreign-licence.html" },
          { label: "RSA Foreign Licence", url: "https://www.rsa.ie/services/already-have-a-licence/exchange-a-foreign-licence" }
        ]
      }
    ]
  },
  {
    id: "community",
    title: "Community And Culture",
    description: "Indian community, public advice, embassy support and migrant rights.",
    tone: "slate",
    items: [
      {
        title: "Indian Community",
        links: [
          { label: "Integration Ireland", url: "https://www.integration.ie" },
          { label: "Immigrant Council", url: "https://www.immigrantcouncil.ie" },
          { label: "Nasc", url: "https://www.nasc.ie" },
          { label: "Gov.ie Integration", url: "https://www.gov.ie/en/campaigns/integration" }
        ]
      },
      {
        title: "Public Advice",
        links: [
          { label: "Citizens Information", url: "https://www.citizensinformation.ie" },
          { label: "Citizens Information Board", url: "https://www.citizensinformationboard.ie" },
          { label: "MABS", url: "https://www.mabs.ie" },
          { label: "CCPC Debt", url: "https://www.ccpc.ie/consumers/money/dealing-with-debt" }
        ]
      },
      {
        title: "Indian Embassy",
        links: [
          { label: "Embassy Of India Dublin", url: "https://www.indianembassydublin.in" },
          { label: "Passport Seva India", url: "https://www.passportindia.gov.in" },
          { label: "OCI Card", url: "https://boi.gov.in" }
        ]
      },
      {
        title: "Anti-Racism And Legal Support",
        links: [
          { label: "IHREC", url: "https://www.ihrec.ie" },
          { label: "Nasc", url: "https://www.nasc.ie" },
          { label: "FLAC", url: "https://www.flac.ie" },
          { label: "Amnesty Ireland", url: "https://www.amnesty.ie" }
        ]
      }
    ]
  }
];

export const importantReferenceStats = {
  sections: importantReferenceSections.length,
  topics: importantReferenceSections.reduce(
    (count, section) => count + section.items.length,
    0
  ),
  links: importantReferenceSections.reduce(
    (count, section) =>
      count +
      section.items.reduce((itemCount, item) => itemCount + item.links.length, 0),
    0
  )
};
