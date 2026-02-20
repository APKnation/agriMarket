import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLanguageStore = defineStore('language', () => {
  const currentLanguage = ref(localStorage.getItem('language') || 'en')
  
  const translations = ref({
    en: {
      // Navigation
      dashboard: 'Dashboard',
      farmers: 'Farmers',
      crops: 'Crops',
      products: 'Products',
      orders: 'Orders',
      analytics: 'Analytics',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      
      // Landing Page
      welcomeBack: 'Welcome Back',
      sustainableFarm: 'Sustainable Farm-to-Market Program',
      connectingFarmers: 'Connecting Tanzanian smallholder farmers with markets through technology, transparency, and sustainable agricultural practices.',
      getStarted: 'Get Started',
      signIn: 'Sign In',
      howItWorks: 'How SFMP Works',
      empoweringFarmers: 'Empowering farmers with digital tools for better market access and sustainable farming',
      register: 'Register',
      manageCrops: 'Manage Crops',
      connectTrade: 'Connect & Trade',
      createAccount: 'Create your account as a farmer, buyer, cooperative, or market partner',
      trackPlanting: 'Track planting, growth, and harvest with climate-smart recommendations',
      listProducts: 'List products, find buyers, and manage orders transparently',
      learnMore: 'Learn more',
      
      // Carousel
      carouselTitle1: 'Join Our Farmer Community',
      carouselDesc1: 'Connect with thousands of Tanzanian farmers and access better markets for your produce.',
      carouselTitle2: 'Smart Crop Management',
      carouselDesc2: 'Use our digital tools to track planting, growth, and harvest with climate-smart recommendations.',
      carouselTitle3: 'Marketplace Access',
      carouselDesc3: 'List your products and connect directly with buyers across Tanzania and beyond.',
      carouselTitle4: 'Data-Driven Insights',
      carouselDesc4: 'Get detailed analytics on crop performance, market trends, and revenue optimization.',
      carouselTitle5: 'Sustainable Agriculture',
      carouselDesc5: 'Join the movement towards climate-smart farming and sustainable agricultural practices.',
      exploreMarket: 'Explore Market',
      viewAnalytics: 'View Analytics',
      joinCommunity: 'Join Community',
      
      // Footer
      siteMap: 'Site Map',
      homepage: 'Homepage',
      technology: 'Technology',
      aboutUs: 'About Us',
      resourcesNews: 'Resources & News',
      careers: 'Careers',
      contactUs: 'Contact Us',
      portal: 'Portal',
      getInTouch: 'Get in Touch',
      subscribeNewsletter: 'Subscribe to our newsletter',
      enterEmail: 'Enter your email',
      subscribe: 'Subscribe',
      legal: 'Legal',
      privacyPolicy: 'Privacy Policy',
      termsOfServices: 'Terms of Services',
      farmersConcerns: 'Farmer\'s Concerns',
      backToTop: 'BACK TO TOP',
      copyright: 'Copyright © {year} SFMP Tanzania. All Rights Reserved.',
      
      // Authentication
      welcomeToSFMP: 'Welcome to SFMP Tanzania',
      signInToAccount: 'Sign in to your SFMP Tanzania account',
      emailAddress: 'Email Address',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      dontHaveAccount: 'Don\'t have an account?',
      signUpHere: 'Sign up here',
      createAccountSFMP: 'Create your SFMP Tanzania account',
      joinSFMP: 'Join SFMP Tanzania',
      connectTanzanian: 'Connect Tanzanian smallholder farmers with markets to promote sustainable agriculture and improve livelihoods through technology and transparency.',
      
      // Forms
      firstName: 'First Name',
      lastName: 'Last Name',
      phoneNumber: 'Phone Number',
      location: 'Location',
      farmSize: 'Farm Size',
      primaryCrops: 'Primary Crops',
      accountType: 'Account Type',
      selectRole: 'Select your role',
      farmer: 'Farmer',
      buyer: 'Buyer',
      cooperative: 'Cooperative',
      admin: 'Admin',
      
      // Dashboard
      totalFarmers: 'Total Farmers',
      activeCrops: 'Active Crops',
      productsListed: 'Products Listed',
      totalRevenue: 'Total Revenue',
      fromLastMonth: 'from last month',
      recentActivity: 'Recent Activity',
      quickActions: 'Quick Actions',
      registerFarmer: 'Register Farmer',
      addCrop: 'Add Crop',
      listProduct: 'List Product',
      viewAnalytics: 'View Analytics',
      
      // Common
      search: 'Search',
      allStatus: 'All Status',
      allCategories: 'All Categories',
      allQualities: 'All Qualities',
      available: 'Available',
      verified: 'Verified',
      pending: 'Pending',
      cancelled: 'Cancelled',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      add: 'Add',
      update: 'Update',
      loading: 'Loading',
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Info'
    },
    
    sw: {
      // Navigation
      dashboard: 'Dashibodi',
      farmers: 'Wakulima',
      crops: 'Mazao',
      products: 'Bidhaa',
      orders: 'Maagizo',
      analytics: 'Uchambuzi',
      profile: 'Wasifu',
      settings: 'Mipangilio',
      logout: 'Toka',
      
      // Landing Page
      welcomeBack: 'Karibu Tena',
      sustainableFarm: 'Programu Endelevu ya Kilimo hadhara hadhara Soko',
      connectingFarmers: 'Kuunganisha wakulima wadogo wa Tanzania na masoko kupitia teknolojia, uwazi, na mazoea endelevu ya kilimo.',
      getStarted: 'Anza',
      signIn: 'Ingia',
      howItWorks: 'SFMP Inavyofanyaaje',
      empoweringFarmers: 'Kuwezesha wakulima kwa zana za kidijitali ili kupata ufikiaji bora wa soko na kilimo endelevu.',
      register: 'Jisajili',
      manageCrops: 'Simamia Mazao',
      connectTrade: 'Lunganisha na Biashara',
      createAccount: 'Waka akaunti yako kama mkulima, mnunuzi, ushirika, au mshirika wa soko',
      trackPlanting: 'Pima kupanda, ukuaji, na mavuno kwa mapendekezo ya kilimo endelevu yanayofaa na hali ya hewa',
      listProducts: 'Orodhesha bidhaa, pata wanunuzi, na simamia maagizo kwa uwazi',
      learnMore: 'Jifunze zaidi',
      
      // Carousel
      carouselTitle1: 'Jiunge na Jumuiya ya Wakulima',
      carouselDesc1: 'Lunganisha na maelfu ya wakulima wa Tanzania na upate ufikiaji bora wa masoko kwa mazao yako.',
      carouselTitle2: 'Usimamizi Mazao wa Akili',
      carouselDesc2: 'Tumia zana zetu za kidijitali kupima kupanda, ukuaji, na mavuno kwa mapendekezo ya kilimo endelevu.',
      carouselTitle3: 'Ufikiaji wa Soko',
      carouselDesc3: 'Orodhesha bidhaa zako na lunganisha moja kwa moja na wanunuzi nchini Tanzania na nje ya nchi.',
      carouselTitle4: 'Maelezo Yanayotegemea Data',
      carouselDesc4: 'Pata uchambuzi wa kina kuhusu utendaji wa mazao, mwelekeo wa soko, na uboreshaji wa mapato.',
      carouselTitle5: 'Kilimo Endelevu',
      carouselDesc5: 'Jiunge na harakati ya kwenda upimaji wa hewa na kilimo endelevu.',
      exploreMarket: 'Chunguza Soko',
      viewAnalytics: 'Ona Uchambuzi',
      joinCommunity: 'Jiunge na Jumuiya',
      
      // Footer
      siteMap: 'Ramani ya Tovuti',
      homepage: 'Ukurasa wa Nyumbani',
      technology: 'Teknolojia',
      aboutUs: 'Kuhusu Sisi',
      resourcesNews: 'Rasilimali na Habari',
      careers: 'Kazi',
      contactUs: 'Wasiliana Nasi',
      portal: 'Lango',
      getInTouch: 'Wasiliana Nasi',
      subscribeNewsletter: 'Jiandikishe kwa jarida letu',
      enterEmail: 'Weka anwani yako',
      subscribe: 'Jiandikishe',
      legal: 'Sheria',
      privacyPolicy: 'Sera ya Faragha',
      termsOfServices: 'Masharti ya Huduma',
      farmersConcerns: 'Wasil wa Wakulima',
      backToTop: 'RUDI JUU',
      copyright: 'Haki miliki © {year} SFMP Tanzania. Haki zote zimehifadhiwa.',
      
      // Authentication
      welcomeToSFMP: 'Karibu SFMP Tanzania',
      signInToAccount: 'Ingia kwenye akaunti yako ya SFMP Tanzania',
      emailAddress: 'Anwani ya Barua pepe',
      password: 'Nenosiri',
      rememberMe: 'Nikumbuke',
      forgotPassword: 'Umesahau nenosiri?',
      dontHaveAccount: 'Huna akaunti?',
      signUpHere: 'Jisajili hapa',
      createAccountSFMP: 'Waka akaunti ya SFMP Tanzania',
      joinSFMP: 'Jiunge na SFMP Tanzania',
      connectTanzanian: 'Kuunganisha wakulima wadogo wa Tanzania na masoko ili kuendeleza kilimo endelevu na kuboresha maisha kupitia teknolojia na uwazi.',
      
      // Forms
      firstName: 'Jina la Kwanza',
      lastName: 'Jina la Mwisho',
      phoneNumber: 'Namba ya Simu',
      location: 'Mahali',
      farmSize: 'Ukubwa wa Shamba',
      primaryCrops: 'Mazao Makuu',
      accountType: 'Aina ya Akaunti',
      selectRole: 'Chagua jukumu lako',
      farmer: 'Mkulima',
      buyer: 'Mnunuzi',
      cooperative: 'Ushirika',
      admin: 'Msimamizi',
      
      // Dashboard
      totalFarmers: 'Jumla ya Wakulima',
      activeCrops: 'Mazao Hai',
      productsListed: 'Bidhaa Zilizoorodheshwa',
      totalRevenue: 'Mapato Jumla',
      fromLastMonth: 'kutoka mwezi uliopita',
      recentActivity: 'Shughuli za Karibuni',
      quickActions: 'Hatua za Haraka',
      registerFarmer: 'Sajili Mkulima',
      addCrop: 'Ongeza Mzao',
      listProduct: 'Orodhesha Bidhaa',
      viewAnalytics: 'Ona Uchambuzi',
      
      // Common
      search: 'Tafuta',
      allStatus: 'Hali Zote',
      allCategories: 'Aina Zote',
      allQualities: 'Ubora Wote',
      available: 'Inapatikana',
      verified: 'Imethibitishwa',
      pending: 'Inasubiri',
      cancelled: 'Imefutwa',
      save: 'Hifadhi',
      cancel: 'Ghairi',
      edit: 'Hariri',
      delete: 'Futa',
      view: 'Ona',
      add: 'Ongeza',
      update: 'Sasisha',
      loading: 'Inapakia',
      success: 'Mafanikio',
      error: 'Hitilafu',
      warning: 'Onyo',
      info: 'Maelezo'
    }
  })

  const setLanguage = (lang) => {
    currentLanguage.value = lang
    localStorage.setItem('language', lang)
  }

  const t = (key, params = {}) => {
    let translation = translations.value[currentLanguage.value][key] || key
    
    // Replace placeholders
    if (params.year) {
      translation = translation.replace('{year}', params.year)
    }
    
    return translation
  }

  return {
    currentLanguage,
    translations,
    setLanguage,
    t
  }
})
