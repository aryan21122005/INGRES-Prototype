// Block-wise comprehensive groundwater data generator for all Indian blocks
// Based on official CGWB assessment patterns and realistic regional variations

export interface GroundwaterBlock {
  blockCode: string;
  blockName: string;
  district: string;
  state: string;
  coordinates: { lat: number; lng: number };
  assessmentYear: string;
  data: {
    annualExtractableResource: number; // BCM
    groundwaterRecharge: number; // BCM
    naturalDischarges: number; // BCM
    totalExtraction: number; // BCM
    stage_of_extraction: number; // Percentage
    category: 'Safe' | 'Semi-Critical' | 'Critical' | 'Over-Exploited';
    
    extraction: {
      irrigation: number;
      domestic: number;
      industrial: number;
      total: number;
    };
    
    recharge: {
      rainfall: number;
      irrigation_return_flow: number;
      canal_seepage: number;
      tank_recharge: number;
      other_sources: number;
      total: number;
    };
    
    quality: {
      ec: number; // Electrical Conductivity
      fluoride: number;
      nitrate: number;
      iron: number;
      arsenic: number;
      quality_class: 'Good' | 'Moderate' | 'Poor' | 'Very Poor';
    };
  };
  
  historical: Array<{
    year: string;
    extraction: number;
    recharge: number;
    stage_of_extraction: number;
    category: string;
  }>;
}

// State-wise administrative data and regional characteristics
const stateData = {
  'Andhra Pradesh': {
    districts: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Kadapa', 'Tirupati', 'Anantapur', 'Chittoor', 'East Godavari', 'West Godavari', 'Krishna', 'Prakasam', 'Srikakulam', 'Vizianagaram'],
    baseCoords: { lat: 15.9129, lng: 79.7400 },
    blocksPerDistrict: 45,
    characteristics: { avgRainfall: 966, soilType: 'alluvial', stressLevel: 'medium' }
  },
  'Arunachal Pradesh': {
    districts: ['Tawang', 'West Kameng', 'East Kameng', 'Papum Pare', 'Kurung Kumey', 'Kra Daadi', 'Lower Subansiri', 'Upper Subansiri', 'West Siang', 'East Siang', 'Siang', 'Upper Siang', 'Lower Siang', 'Lower Dibang Valley', 'Dibang Valley', 'Anjaw', 'Lohit', 'Namsai', 'Changlang', 'Tirap', 'Longding'],
    baseCoords: { lat: 28.2180, lng: 94.7278 },
    blocksPerDistrict: 12,
    characteristics: { avgRainfall: 2782, soilType: 'forest', stressLevel: 'low' }
  },
  'Assam': {
    districts: ['Kamrup', 'Nagaon', 'Sonitpur', 'Barpeta', 'Dhubri', 'Cachar', 'Karimganj', 'Hailakandi', 'Dibrugarh', 'Tinsukia', 'Jorhat', 'Golaghat', 'Sivasagar', 'Charaideo', 'Majuli', 'Lakhimpur', 'Dhemaji', 'Biswanath', 'Darrang', 'Udalguri', 'Baksa', 'Nalbari', 'Bongaigaon', 'Chirang', 'Kokrajhar', 'Goalpara', 'South Salmara-Mankachar', 'Morigaon', 'Hojai', 'West Karbi Anglong', 'Karbi Anglong', 'Dima Hasao'],
    baseCoords: { lat: 26.2006, lng: 92.9376 },
    blocksPerDistrict: 35,
    characteristics: { avgRainfall: 1861, soilType: 'alluvial', stressLevel: 'low' }
  },
  'Bihar': {
    districts: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Purnia', 'Araria', 'Kishanganj', 'Katihar', 'Madhepura', 'Saharsa', 'Supaul', 'Khagaria', 'Begusarai', 'Munger', 'Lakhisarai', 'Sheikhpura', 'Nalanda', 'Jehanabad', 'Aurangabad', 'Rohtas', 'Kaimur', 'Buxar', 'Bhojpur', 'Saran', 'Siwan', 'Gopalganj', 'East Champaran', 'West Champaran', 'Vaishali', 'Samastipur', 'Madhubani', 'Sitamarhi', 'Sheohar', 'Supual', 'Arwal', 'Jamui', 'Banka'],
    baseCoords: { lat: 25.0961, lng: 85.3131 },
    blocksPerDistrict: 25,
    characteristics: { avgRainfall: 1205, soilType: 'alluvial', stressLevel: 'high' }
  },
  'Chhattisgarh': {
    districts: ['Raipur', 'Bilaspur', 'Durg', 'Rajnandgaon', 'Korba', 'Raigarh', 'Jashpur', 'Surguja', 'Kanker', 'Bastar', 'Dantewada', 'Narayanpur', 'Bijapur', 'Sukma', 'Kondagaon', 'Balod', 'Baloda Bazar', 'Gariaband', 'Mahasamund', 'Dhamtari', 'Kabirdham', 'Janjgir-Champa', 'Koriya', 'Surajpur', 'Balrampur', 'Gaurela-Pendra-Marwahi', 'Mungeli', 'Bemetara'],
    baseCoords: { lat: 21.2787, lng: 81.8661 },
    blocksPerDistrict: 18,
    characteristics: { avgRainfall: 1292, soilType: 'red', stressLevel: 'medium' }
  },
  'Delhi': {
    districts: ['New Delhi', 'North Delhi', 'North East Delhi', 'East Delhi', 'North West Delhi', 'West Delhi', 'South West Delhi', 'South Delhi', 'South East Delhi', 'Central Delhi', 'Shahdara'],
    baseCoords: { lat: 28.7041, lng: 77.1025 },
    blocksPerDistrict: 3,
    characteristics: { avgRainfall: 617, soilType: 'alluvial', stressLevel: 'critical' }
  },
  'Goa': {
    districts: ['North Goa', 'South Goa'],
    baseCoords: { lat: 15.2993, lng: 74.1240 },
    blocksPerDistrict: 6,
    characteristics: { avgRainfall: 2932, soilType: 'laterite', stressLevel: 'low' }
  },
  'Gujarat': {
    districts: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Anand', 'Bharuch', 'Mehsana', 'Patan', 'Sabarkantha', 'Banaskantha', 'Kutch', 'Porbandar', 'Junagadh', 'Amreli', 'Morbi', 'Surendranagar', 'Kheda', 'Panchmahals', 'Dahod', 'Mahisagar', 'Arvalli', 'Botad', 'Devbhoomi Dwarka', 'Gir Somnath', 'Narmada', 'Navsari', 'Tapi', 'Valsad', 'Dang'],
    baseCoords: { lat: 22.2587, lng: 71.1924 },
    blocksPerDistrict: 22,
    characteristics: { avgRainfall: 803, soilType: 'black', stressLevel: 'high' }
  },
  'Haryana': {
    districts: ['Faridabad', 'Gurgaon', 'Mewat', 'Palwal', 'Sonipat', 'Rohtak', 'Jhajjar', 'Mahendragarh', 'Rewari', 'Narnaul', 'Ambala', 'Kurukshetra', 'Yamunanagar', 'Panchkula', 'Karnal', 'Panipat', 'Kaithal', 'Jind', 'Fatehabad', 'Hisar', 'Bhiwani', 'Charkhi Dadri'],
    baseCoords: { lat: 29.0588, lng: 76.0856 },
    blocksPerDistrict: 15,
    characteristics: { avgRainfall: 617, soilType: 'alluvial', stressLevel: 'critical' }
  },
  'Himachal Pradesh': {
    districts: ['Shimla', 'Mandi', 'Kullu', 'Solan', 'Sirmaur', 'Una', 'Hamirpur', 'Kangra', 'Chamba', 'Bilaspur', 'Kinnaur', 'Lahaul and Spiti'],
    baseCoords: { lat: 31.1048, lng: 77.1734 },
    blocksPerDistrict: 8,
    characteristics: { avgRainfall: 1251, soilType: 'mountain', stressLevel: 'low' }
  },
  'Jharkhand': {
    districts: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh', 'Giridih', 'Ramgarh', 'Khunti', 'Gumla', 'Simdega', 'Lohardaga', 'Chatra', 'Palamu', 'Garwa', 'Koderma', 'Jamtara', 'Dumka', 'Pakur', 'Godda', 'Sahebganj', 'Saraikela-Kharsawan', 'West Singhbhum', 'East Singhbhum'],
    baseCoords: { lat: 23.6102, lng: 85.2799 },
    blocksPerDistrict: 14,
    characteristics: { avgRainfall: 1463, soilType: 'red', stressLevel: 'medium' }
  },
  'Karnataka': {
    districts: ['Bangalore Urban', 'Bangalore Rural', 'Ramanagara', 'Kolar', 'Chikkaballapur', 'Tumkur', 'Chitradurga', 'Davanagere', 'Shimoga', 'Belagavi', 'Bagalkot', 'Bijapur', 'Gulbarga', 'Raichur', 'Koppal', 'Gadag', 'Dharwad', 'Uttara Kannada', 'Haveri', 'Bellary', 'Yadgir', 'Kalaburagi', 'Bidar', 'Mandya', 'Hassan', 'Dakshina Kannada', 'Udupi', 'Chikmagalur', 'Kodagu', 'Mysore', 'Chamarajanagar'],
    baseCoords: { lat: 15.3173, lng: 75.7139 },
    blocksPerDistrict: 27,
    characteristics: { avgRainfall: 1219, soilType: 'red', stressLevel: 'medium' }
  },
  'Kerala': {
    districts: ['Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam', 'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'],
    baseCoords: { lat: 10.8505, lng: 76.2711 },
    blocksPerDistrict: 8,
    characteristics: { avgRainfall: 3107, soilType: 'laterite', stressLevel: 'low' }
  },
  'Madhya Pradesh': {
    districts: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa', 'Murwara', 'Singrauli', 'Chhatarpur', 'Panna', 'Damoh', 'Tikamgarh', 'Datia', 'Shivpuri', 'Guna', 'Vidisha', 'Raisen', 'Betul', 'Harda', 'Hoshangabad', 'Katni', 'Narsinghpur', 'Dindori', 'Mandla', 'Chhindwara', 'Seoni', 'Balaghat', 'Sidhi', 'Shahdol', 'Umaria', 'Anuppur', 'Jashpur', 'Surguja', 'Korba', 'Bilaspur', 'Durg', 'Rajnandgaon', 'Kanker', 'Bastar', 'Dantewada', 'Narayanpur', 'Bijapur', 'Sukma', 'Kondagaon', 'Balod', 'Baloda Bazar', 'Gariaband', 'Mahasamund', 'Dhamtari'],
    baseCoords: { lat: 22.9734, lng: 78.6569 },
    blocksPerDistrict: 25,
    characteristics: { avgRainfall: 1194, soilType: 'black', stressLevel: 'medium' }
  },
  'Maharashtra': {
    districts: ['Mumbai City', 'Mumbai Suburban', 'Thane', 'Palghar', 'Raigad', 'Ratnagiri', 'Sindhudurg', 'Nashik', 'Dhule', 'Nandurbar', 'Jalgaon', 'Ahmednagar', 'Pune', 'Solapur', 'Satara', 'Sangli', 'Kolhapur', 'Aurangabad', 'Jalna', 'Beed', 'Latur', 'Osmanabad', 'Nanded', 'Hingoli', 'Parbhani', 'Buldhana', 'Akola', 'Washim', 'Amravati', 'Wardha', 'Nagpur', 'Bhandara', 'Gondia', 'Chandrapur', 'Gadchiroli', 'Yavatmal'],
    baseCoords: { lat: 19.7515, lng: 75.7139 },
    blocksPerDistrict: 28,
    characteristics: { avgRainfall: 1181, soilType: 'black', stressLevel: 'high' }
  },
  'Manipur': {
    districts: ['Imphal East', 'Imphal West', 'Bishnupur', 'Thoubal', 'Churachandpur', 'Kangpokpi', 'Pherzawl', 'Tengnoupal', 'Chandel', 'Jiribam', 'Kakching', 'Noney', 'Tamenglong', 'Kamjong', 'Senapati', 'Ukhrul'],
    baseCoords: { lat: 24.6637, lng: 93.9063 },
    blocksPerDistrict: 8,
    characteristics: { avgRainfall: 1467, soilType: 'red', stressLevel: 'low' }
  },
  'Meghalaya': {
    districts: ['East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills'],
    baseCoords: { lat: 25.4670, lng: 91.3662 },
    blocksPerDistrict: 7,
    characteristics: { avgRainfall: 2818, soilType: 'red', stressLevel: 'low' }
  },
  'Mizoram': {
    districts: ['Aizawl', 'Champhai', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha', 'Serchhip', 'Hnahthial', 'Khawzawl', 'Saitual'],
    baseCoords: { lat: 23.1645, lng: 92.9376 },
    blocksPerDistrict: 3,
    characteristics: { avgRainfall: 2663, soilType: 'red', stressLevel: 'low' }
  },
  'Nagaland': {
    districts: ['Dimapur', 'Kohima', 'Mokokchung', 'Mon', 'Phek', 'Tuensang', 'Wokha', 'Zunheboto', 'Kiphire', 'Longleng', 'Peren'],
    baseCoords: { lat: 26.1584, lng: 94.5624 },
    blocksPerDistrict: 7,
    characteristics: { avgRainfall: 1814, soilType: 'red', stressLevel: 'low' }
  },
  'Odisha': {
    districts: ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh'],
    baseCoords: { lat: 20.9517, lng: 85.0985 },
    blocksPerDistrict: 21,
    characteristics: { avgRainfall: 1489, soilType: 'laterite', stressLevel: 'medium' }
  },
  'Punjab': {
    districts: ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Muktsar', 'Nawanshahr', 'Pathankot', 'Patiala', 'Rupnagar', 'Sahibzada Ajit Singh Nagar', 'Sangrur', 'Tarn Taran'],
    baseCoords: { lat: 31.1471, lng: 75.3412 },
    blocksPerDistrict: 18,
    characteristics: { avgRainfall: 617, soilType: 'alluvial', stressLevel: 'critical' }
  },
  'Rajasthan': {
    districts: ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Ganganagar', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Tonk', 'Udaipur'],
    baseCoords: { lat: 27.0238, lng: 74.2179 },
    blocksPerDistrict: 32,
    characteristics: { avgRainfall: 531, soilType: 'sandy', stressLevel: 'critical' }
  },
  'Sikkim': {
    districts: ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim'],
    baseCoords: { lat: 27.5330, lng: 88.5122 },
    blocksPerDistrict: 4,
    characteristics: { avgRainfall: 3500, soilType: 'mountain', stressLevel: 'low' }
  },
  'Tamil Nadu': {
    districts: ['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'],
    baseCoords: { lat: 11.1271, lng: 78.6569 },
    blocksPerDistrict: 32,
    characteristics: { avgRainfall: 998, soilType: 'black', stressLevel: 'high' }
  },
  'Telangana': {
    districts: ['Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 'Komaram Bheem Asifabad', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 'Medchal Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal Rural', 'Warangal Urban', 'Yadadri Bhuvanagiri'],
    baseCoords: { lat: 18.1124, lng: 79.0193 },
    blocksPerDistrict: 19,
    characteristics: { avgRainfall: 905, soilType: 'black', stressLevel: 'medium' }
  },
  'Tripura': {
    districts: ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura'],
    baseCoords: { lat: 23.9408, lng: 91.9882 },
    blocksPerDistrict: 8,
    characteristics: { avgRainfall: 2663, soilType: 'red', stressLevel: 'low' }
  },
  'Uttar Pradesh': {
    districts: ['Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kheri', 'Kushinagar', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'],
    baseCoords: { lat: 26.8467, lng: 80.9462 },
    blocksPerDistrict: 28,
    characteristics: { avgRainfall: 1025, soilType: 'alluvial', stressLevel: 'high' }
  },
  'Uttarakhand': {
    districts: ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'],
    baseCoords: { lat: 30.0668, lng: 79.0193 },
    blocksPerDistrict: 8,
    characteristics: { avgRainfall: 1611, soilType: 'mountain', stressLevel: 'low' }
  },
  'West Bengal': {
    districts: ['Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur'],
    baseCoords: { lat: 22.9868, lng: 87.8550 },
    blocksPerDistrict: 34,
    characteristics: { avgRainfall: 1582, soilType: 'alluvial', stressLevel: 'medium' }
  }
};

export class ComprehensiveGroundwaterService {
  private static blocks: GroundwaterBlock[] = [];
  private static isInitialized = false;

  // Generate realistic groundwater data based on regional characteristics
  private static generateBlockData(
    state: string, 
    district: string, 
    blockName: string, 
    coordinates: { lat: number; lng: number },
    characteristics: any
  ): GroundwaterBlock {
    
    // Base values influenced by regional characteristics
    const stressMultiplier = {
      'low': 0.3,
      'medium': 0.7,
      'high': 1.1,
      'critical': 1.5
    }[characteristics.stressLevel];

    const rainfallFactor = characteristics.avgRainfall / 1200; // Normalize to average rainfall
    
    // Generate realistic base values
    const baseRecharge = (0.5 + Math.random() * 2.0) * rainfallFactor;
    const baseExtraction = baseRecharge * (0.2 + Math.random() * 0.8) * stressMultiplier;
    const stageOfExtraction = Math.min(200, (baseExtraction / baseRecharge) * 100 * (0.8 + Math.random() * 0.4));
    
    // Determine category based on stage of extraction
    let category: 'Safe' | 'Semi-Critical' | 'Critical' | 'Over-Exploited';
    if (stageOfExtraction < 70) category = 'Safe';
    else if (stageOfExtraction < 90) category = 'Semi-Critical';
    else if (stageOfExtraction < 100) category = 'Critical';
    else category = 'Over-Exploited';

    // Generate detailed extraction breakdown
    const irrigationRatio = ['Punjab', 'Haryana', 'Uttar Pradesh'].includes(state) ? 0.7 : 0.5;
    const industrialRatio = ['Gujarat', 'Maharashtra', 'Tamil Nadu'].includes(state) ? 0.15 : 0.08;
    const domesticRatio = 1 - irrigationRatio - industrialRatio;

    return {
      blockCode: `${state.substring(0,2).toUpperCase()}${district.substring(0,3).toUpperCase()}${blockName.substring(0,3).toUpperCase()}`,
      blockName,
      district,
      state,
      coordinates,
      assessmentYear: '2024-25',
      data: {
        annualExtractableResource: baseRecharge * 0.9,
        groundwaterRecharge: baseRecharge,
        naturalDischarges: baseRecharge * 0.2,
        totalExtraction: baseExtraction,
        stage_of_extraction: Math.round(stageOfExtraction * 10) / 10,
        category,
        
        extraction: {
          irrigation: baseExtraction * irrigationRatio,
          domestic: baseExtraction * domesticRatio,
          industrial: baseExtraction * industrialRatio,
          total: baseExtraction
        },
        
        recharge: {
          rainfall: baseRecharge * 0.7,
          irrigation_return_flow: baseRecharge * 0.15,
          canal_seepage: baseRecharge * 0.08,
          tank_recharge: baseRecharge * 0.04,
          other_sources: baseRecharge * 0.03,
          total: baseRecharge
        },
        
        quality: {
          ec: 500 + Math.random() * 2000,
          fluoride: Math.random() * 2,
          nitrate: 10 + Math.random() * 80,
          iron: Math.random() * 2,
          arsenic: Math.random() * 0.02,
          quality_class: category === 'Safe' ? 'Good' : 
                        category === 'Semi-Critical' ? 'Moderate' :
                        category === 'Critical' ? 'Poor' : 'Very Poor'
        }
      },
      
      historical: [
        { year: '2020-21', extraction: baseExtraction * 0.88, recharge: baseRecharge * 1.05, stage_of_extraction: stageOfExtraction * 0.84, category: 'Safe' },
        { year: '2021-22', extraction: baseExtraction * 0.92, recharge: baseRecharge * 1.02, stage_of_extraction: stageOfExtraction * 0.90, category: 'Safe' },
        { year: '2022-23', extraction: baseExtraction * 0.96, recharge: baseRecharge * 0.98, stage_of_extraction: stageOfExtraction * 0.95, category: category },
        { year: '2023-24', extraction: baseExtraction * 0.98, recharge: baseRecharge * 1.01, stage_of_extraction: stageOfExtraction * 0.97, category: category },
        { year: '2024-25', extraction: baseExtraction, recharge: baseRecharge, stage_of_extraction: stageOfExtraction, category: category }
      ]
    };
  }

  // Initialize comprehensive block database
  static initialize() {
    if (this.isInitialized) return;

    Object.entries(stateData).forEach(([stateName, stateInfo]) => {
      stateInfo.districts.forEach((district, districtIndex) => {
        // Generate blocks for each district
        for (let blockIndex = 0; blockIndex < stateInfo.blocksPerDistrict; blockIndex++) {
          const blockName = `${district} Block ${blockIndex + 1}`;
          
          // Generate coordinates around district center with some spread
          const latOffset = (Math.random() - 0.5) * 1.0; // ±0.5 degrees
          const lngOffset = (Math.random() - 0.5) * 1.0;
          const coordinates = {
            lat: stateInfo.baseCoords.lat + latOffset + (districtIndex * 0.1),
            lng: stateInfo.baseCoords.lng + lngOffset + (districtIndex * 0.1)
          };

          const block = this.generateBlockData(
            stateName,
            district,
            blockName,
            coordinates,
            stateInfo.characteristics
          );

          this.blocks.push(block);
        }
      });
    });

    this.isInitialized = true;
    console.log(`Generated ${this.blocks.length} comprehensive groundwater blocks`);
  }

  static getAllBlocks(): GroundwaterBlock[] {
    if (!this.isInitialized) this.initialize();
    return this.blocks;
  }

  static getBlocksByState(state: string): GroundwaterBlock[] {
    if (!this.isInitialized) this.initialize();
    return this.blocks.filter(block => 
      block.state.toLowerCase().includes(state.toLowerCase())
    );
  }

  static getBlocksByDistrict(district: string): GroundwaterBlock[] {
    if (!this.isInitialized) this.initialize();
    return this.blocks.filter(block => 
      block.district.toLowerCase().includes(district.toLowerCase())
    );
  }

  static searchBlocks(query: string): GroundwaterBlock[] {
    if (!this.isInitialized) this.initialize();
    const lowerQuery = query.toLowerCase();
    return this.blocks.filter(block =>
      block.blockName.toLowerCase().includes(lowerQuery) ||
      block.district.toLowerCase().includes(lowerQuery) ||
      block.state.toLowerCase().includes(lowerQuery)
    );
  }

  static getBlocksByCategory(category: string): GroundwaterBlock[] {
    if (!this.isInitialized) this.initialize();
    return this.blocks.filter(block => 
      block.data.category.toLowerCase() === category.toLowerCase()
    );
  }

  static getStateSummary(state: string) {
    const stateBlocks = this.getBlocksByState(state);
    if (stateBlocks.length === 0) return null;

    const categories = { 'Safe': 0, 'Semi-Critical': 0, 'Critical': 0, 'Over-Exploited': 0 };
    let totalExtraction = 0;
    let totalRecharge = 0;

    stateBlocks.forEach(block => {
      categories[block.data.category]++;
      totalExtraction += block.data.totalExtraction;
      totalRecharge += block.data.groundwaterRecharge;
    });

    return {
      state,
      totalBlocks: stateBlocks.length,
      categories,
      averageStageOfExtraction: stateBlocks.reduce((sum, b) => sum + b.data.stage_of_extraction, 0) / stateBlocks.length,
      totalExtraction,
      totalRecharge,
      overallStatus: totalExtraction / totalRecharge > 1 ? 'Over-Exploited' : 
                     totalExtraction / totalRecharge > 0.9 ? 'Critical' :
                     totalExtraction / totalRecharge > 0.7 ? 'Semi-Critical' : 'Safe'
    };
  }

  static getNationalSummary() {
    if (!this.isInitialized) this.initialize();
    
    const categories = { 'Safe': 0, 'Semi-Critical': 0, 'Critical': 0, 'Over-Exploited': 0 };
    let totalExtraction = 0;
    let totalRecharge = 0;

    this.blocks.forEach(block => {
      categories[block.data.category]++;
      totalExtraction += block.data.totalExtraction;
      totalRecharge += block.data.groundwaterRecharge;
    });

    return {
      totalBlocks: this.blocks.length,
      totalStates: Object.keys(stateData).length,
      categories,
      averageStageOfExtraction: this.blocks.reduce((sum, b) => sum + b.data.stage_of_extraction, 0) / this.blocks.length,
      totalExtraction,
      totalRecharge,
      overallStatus: totalExtraction / totalRecharge > 1 ? 'Over-Exploited' : 
                     totalExtraction / totalRecharge > 0.9 ? 'Critical' :
                     totalExtraction / totalRecharge > 0.7 ? 'Semi-Critical' : 'Safe'
    };
  }
}