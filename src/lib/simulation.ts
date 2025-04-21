import { faker } from '@faker-js/faker';

// Types for city data
export type CityData = {
  traffic: {
    congestionLevel: number; // 0-100
    vehiclesOnRoad: number;
    publicTransportUsage: number; // 0-100
    accidentCount: number;
  };
  energy: {
    electricityUsage: number; // in MW
    renewablePercentage: number; // 0-100
    peakDemand: number; // in MW
    carbonEmission: number; // tons
  };
  water: {
    consumption: number; // in million liters
    qualityIndex: number; // 0-100
    treatmentCapacity: number; // in million liters
    reservoirLevel: number; // 0-100
  };
  environment: {
    airQualityIndex: number; // 0-500
    greenSpacePercentage: number; // 0-100
    wasteRecycled: number; // in tons
    noiseLevel: number; // in dB
  };
  economy: {
    budget: number; // in millions
    revenue: number; // in millions
    expenses: number; // in millions
    growthRate: number; // percentage
  };
  social: {
    happinessIndex: number; // 0-100
    employmentRate: number; // 0-100
    crimeRate: number; // per 1000 people
    healthIndex: number; // 0-100
  };
  time: {
    hour: number; // 0-23
    day: number; // 1-31
    month: number; // 1-12
    year: number;
  };
};

export type Policy = {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: 'traffic' | 'energy' | 'environment' | 'economy' | 'social' | 'water';
  impact: {
    traffic?: Partial<CityData['traffic']>;
    energy?: Partial<CityData['energy']>;
    environment?: Partial<CityData['environment']>;
    economy?: Partial<CityData['economy']>;
    social?: Partial<CityData['social']>;
    water?: Partial<CityData['water']>;
  };
  active: boolean;
  implementationTime: number; // in days
  implementationProgress: number; // 0-100
};

export type Event = {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  category: 'traffic' | 'energy' | 'environment' | 'economy' | 'social' | 'water';
  impact: {
    traffic?: Partial<CityData['traffic']>;
    energy?: Partial<CityData['energy']>;
    environment?: Partial<CityData['environment']>;
    economy?: Partial<CityData['economy']>;
    social?: Partial<CityData['social']>;
    water?: Partial<CityData['water']>;
  };
  timeStart: number; // timestamp
  duration: number; // in hours
  active: boolean;
  resolved: boolean;
};

// Initial city data
export const initialCityData: CityData = {
  traffic: {
    congestionLevel: 45,
    vehiclesOnRoad: 12500,
    publicTransportUsage: 35,
    accidentCount: 3
  },
  energy: {
    electricityUsage: 250,
    renewablePercentage: 20,
    peakDemand: 320,
    carbonEmission: 450
  },
  water: {
    consumption: 150,
    qualityIndex: 85,
    treatmentCapacity: 200,
    reservoirLevel: 70
  },
  environment: {
    airQualityIndex: 75,
    greenSpacePercentage: 25,
    wasteRecycled: 120,
    noiseLevel: 65
  },
  economy: {
    budget: 350,
    revenue: 45,
    expenses: 40,
    growthRate: 2.5
  },
  social: {
    happinessIndex: 68,
    employmentRate: 92,
    crimeRate: 8.5,
    healthIndex: 75
  },
  time: {
    hour: 9,
    day: 15,
    month: 6,
    year: 2023
  }
};

// Available policies
export const availablePolicies: Policy[] = [
  {
    id: 'p1',
    name: 'Increase Public Transport',
    description: 'Invest in more buses and trains to reduce congestion',
    cost: 25,
    category: 'traffic',
    impact: {
      traffic: { congestionLevel: -15, publicTransportUsage: 15 },
      environment: { airQualityIndex: -10 },
      economy: { expenses: 5 }
    },
    active: false,
    implementationTime: 30,
    implementationProgress: 0
  },
  {
    id: 'p2',
    name: 'Green Energy Initiative',
    description: 'Invest in solar and wind power',
    cost: 40,
    category: 'energy',
    impact: {
      energy: { renewablePercentage: 20, carbonEmission: -100 },
      economy: { expenses: 8, revenue: 5 },
      social: { happinessIndex: 5 }
    },
    active: false,
    implementationTime: 60,
    implementationProgress: 0
  },
  {
    id: 'p3',
    name: 'Car-Free Downtown',
    description: 'Ban cars in the city center',
    cost: 15,
    category: 'traffic',
    impact: {
      traffic: { congestionLevel: -25, vehiclesOnRoad: -3000 },
      environment: { airQualityIndex: -20, noiseLevel: -10 },
      social: { happinessIndex: 8, healthIndex: 5 },
      economy: { revenue: -3 }
    },
    active: false,
    implementationTime: 15,
    implementationProgress: 0
  },
  {
    id: 'p4',
    name: 'Smart Grid Implementation',
    description: 'Upgrade power grid with smart technology',
    cost: 35,
    category: 'energy',
    impact: {
      energy: { electricityUsage: -30, peakDemand: -40 },
      economy: { expenses: -5, growthRate: 0.5 }
    },
    active: false,
    implementationTime: 45,
    implementationProgress: 0
  },
  {
    id: 'p5',
    name: 'Urban Farming Initiative',
    description: 'Convert unused spaces into community gardens',
    cost: 10,
    category: 'environment',
    impact: {
      environment: { greenSpacePercentage: 5, airQualityIndex: -5 },
      social: { happinessIndex: 7, healthIndex: 3 },
      economy: { revenue: 2 }
    },
    active: false,
    implementationTime: 20,
    implementationProgress: 0
  },
  {
    id: 'p6',
    name: 'Business Tax Reduction',
    description: 'Lower taxes to attract more businesses',
    cost: 0,
    category: 'economy',
    impact: {
      economy: { revenue: -10, growthRate: 1.5 },
      social: { employmentRate: 3, happinessIndex: 2 }
    },
    active: false,
    implementationTime: 10,
    implementationProgress: 0
  }
];

// Potential events
export const potentialEvents: Event[] = [
  {
    id: 'e1',
    title: 'Heatwave',
    description: 'Record temperatures increase energy demand for cooling',
    severity: 'warning',
    category: 'energy',
    impact: {
      energy: { electricityUsage: 50, peakDemand: 70 },
      water: { consumption: 30, reservoirLevel: -10 },
      social: { healthIndex: -5 }
    },
    timeStart: Date.now(),
    duration: 72,
    active: false,
    resolved: false
  },
  {
    id: 'e2',
    title: 'Music Festival',
    description: 'Annual music festival brings tourists and increases traffic',
    severity: 'info',
    category: 'traffic',
    impact: {
      traffic: { congestionLevel: 20, vehiclesOnRoad: 5000 },
      economy: { revenue: 15 },
      social: { happinessIndex: 10, crimeRate: 1 }
    },
    timeStart: Date.now(),
    duration: 48,
    active: false,
    resolved: false
  },
  {
    id: 'e3',
    title: 'Infrastructure Failure',
    description: 'Main water pipe burst in downtown area',
    severity: 'critical',
    category: 'environment',
    impact: {
      water: { consumption: -20, qualityIndex: -15 },
      economy: { expenses: 12 },
      social: { happinessIndex: -15 }
    },
    timeStart: Date.now(),
    duration: 36,
    active: false,
    resolved: false
  },
  {
    id: 'e4',
    title: 'International Investment',
    description: 'Foreign company establishes new office downtown',
    severity: 'info',
    category: 'economy',
    impact: {
      economy: { revenue: 20, growthRate: 1 },
      social: { employmentRate: 5, happinessIndex: 5 },
      traffic: { congestionLevel: 5, vehiclesOnRoad: 1000 }
    },
    timeStart: Date.now(),
    duration: 0, // Permanent
    active: false,
    resolved: false
  }
];

// Data history for analytics
export type DataPoint = {
  timestamp: number;
  value: number;
};

export type MetricHistory = {
  [key: string]: {
    [subKey: string]: DataPoint[];
  };
};

// Initialize empty history
export const initializeHistory = (): MetricHistory => {
  const history: MetricHistory = {};
  const categories = ['traffic', 'energy', 'water', 'environment', 'economy', 'social'];
  
  categories.forEach(category => {
    history[category] = {};
    
    // Get all keys from the initial data for this category
    Object.keys((initialCityData as any)[category]).forEach(key => {
      history[category][key] = [];
    });
  });
  
  return history;
};

// Simulation variables
let cityData: CityData = { ...initialCityData };
let activePolicies: Policy[] = [];
let activeEvents: Event[] = [];
let metricHistory: MetricHistory = initializeHistory();

// Time acceleration factor
let timeAcceleration = 1; // 1 = real-time, 2 = 2x speed, etc.
let lastUpdate = Date.now();
let simulationRunning = true;

// Get a copy of the current city data
export const getCityData = (): CityData => {
  return { ...cityData };
};

// Get active policies
export const getActivePolicies = (): Policy[] => {
  return [...activePolicies];
};

// Get active events
export const getActiveEvents = (): Event[] => {
  return [...activeEvents];
};

// Get metric history
export const getMetricHistory = (): MetricHistory => {
  return JSON.parse(JSON.stringify(metricHistory));
};

// Set time acceleration
export const setTimeAcceleration = (factor: number): void => {
  timeAcceleration = Math.max(0, Math.min(10, factor)); // Clamp between 0 and 10
};

// Activate a policy
export const activatePolicy = (policyId: string): void => {
  const policy = availablePolicies.find(p => p.id === policyId);
  if (policy && !policy.active) {
    policy.active = true;
    policy.implementationProgress = 0;
    activePolicies.push({ ...policy });
    
    // Deduct cost immediately
    cityData.economy.budget -= policy.cost;
  }
};

// Random float between min and max
const randomFloat = (min: number, max: number): number => {
  return min + Math.random() * (max - min);
};

// Random int between min and max (inclusive)
const randomInt = (min: number, max: number): number => {
  return Math.floor(randomFloat(min, max + 1));
};

// Clamp a value between min and max
const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

// Update time in the simulation
const updateTime = (deltaTime: number): void => {
  // Convert real seconds to simulation minutes
  const simulationMinutes = deltaTime * timeAcceleration * 60;
  
  cityData.time.hour += simulationMinutes / 60;
  
  // Handle hour rollover
  if (cityData.time.hour >= 24) {
    cityData.time.day += Math.floor(cityData.time.hour / 24);
    cityData.time.hour %= 24;
    
    // Handle day rollover
    if (cityData.time.day > 30) { // Simplified month length
      cityData.time.month += 1;
      cityData.time.day = 1;
      
      // Handle month rollover
      if (cityData.time.month > 12) {
        cityData.time.year += 1;
        cityData.time.month = 1;
      }
    }
  }
};

// Apply daily fluctuations based on time of day
const applyTimePatterns = (): void => {
  const hour = cityData.time.hour;
  
  // Traffic patterns
  if (hour >= 7 && hour <= 9) {
    // Morning rush hour
    cityData.traffic.congestionLevel = clamp(cityData.traffic.congestionLevel + randomFloat(10, 20), 0, 100);
    cityData.traffic.vehiclesOnRoad = clamp(cityData.traffic.vehiclesOnRoad + randomInt(2000, 4000), 0, 30000);
  } else if (hour >= 16 && hour <= 18) {
    // Evening rush hour
    cityData.traffic.congestionLevel = clamp(cityData.traffic.congestionLevel + randomFloat(15, 25), 0, 100);
    cityData.traffic.vehiclesOnRoad = clamp(cityData.traffic.vehiclesOnRoad + randomInt(3000, 5000), 0, 30000);
  } else if (hour >= 22 || hour <= 5) {
    // Night time
    cityData.traffic.congestionLevel = clamp(cityData.traffic.congestionLevel - randomFloat(30, 40), 0, 100);
    cityData.traffic.vehiclesOnRoad = clamp(cityData.traffic.vehiclesOnRoad - randomInt(6000, 10000), 1000, 30000);
  }
  
  // Energy patterns
  if (hour >= 18 && hour <= 22) {
    // Evening peak
    cityData.energy.electricityUsage = clamp(cityData.energy.electricityUsage + randomFloat(30, 50), 0, 500);
    cityData.energy.peakDemand = Math.max(cityData.energy.peakDemand, cityData.energy.electricityUsage);
  } else if (hour >= 0 && hour <= 5) {
    // Night time low
    cityData.energy.electricityUsage = clamp(cityData.energy.electricityUsage - randomFloat(100, 150), 50, 500);
  }
};

// Apply random variations to create natural-looking fluctuations
const applyRandomVariations = (): void => {
  // Traffic variations
  cityData.traffic.congestionLevel += randomFloat(-2, 2);
  cityData.traffic.vehiclesOnRoad += randomInt(-200, 200);
  cityData.traffic.publicTransportUsage += randomFloat(-1, 1);
  cityData.traffic.accidentCount = Math.max(0, cityData.traffic.accidentCount + (Math.random() > 0.99 ? 1 : 0));
  
  // Energy variations
  cityData.energy.electricityUsage += randomFloat(-5, 8);
  cityData.energy.renewablePercentage += randomFloat(-0.5, 0.5);
  cityData.energy.carbonEmission += randomFloat(-2, 3);
  
  // Environment variations
  cityData.environment.airQualityIndex += randomFloat(-2, 2);
  cityData.environment.noiseLevel += randomFloat(-1, 1);
  
  // Water variations
  cityData.water.consumption += randomFloat(-3, 3);
  cityData.water.qualityIndex += randomFloat(-1, 1);
  cityData.water.reservoirLevel += randomFloat(-0.5, 0.3);
  
  // Economic variations
  cityData.economy.revenue += randomFloat(-0.5, 0.7);
  cityData.economy.expenses += randomFloat(-0.3, 0.6);
  cityData.economy.budget = cityData.economy.budget + cityData.economy.revenue - cityData.economy.expenses;
  
  // Social variations
  cityData.social.happinessIndex += randomFloat(-0.5, 0.5);
  cityData.social.crimeRate += randomFloat(-0.1, 0.2);
  cityData.social.healthIndex += randomFloat(-0.2, 0.2);
  
  // Ensure all values stay within reasonable bounds
  cityData.traffic.congestionLevel = clamp(cityData.traffic.congestionLevel, 0, 100);
  cityData.traffic.publicTransportUsage = clamp(cityData.traffic.publicTransportUsage, 0, 100);
  cityData.traffic.vehiclesOnRoad = Math.max(0, cityData.traffic.vehiclesOnRoad);
  
  cityData.energy.renewablePercentage = clamp(cityData.energy.renewablePercentage, 0, 100);
  cityData.energy.electricityUsage = Math.max(0, cityData.energy.electricityUsage);
  cityData.energy.carbonEmission = Math.max(0, cityData.energy.carbonEmission);
  
  cityData.environment.airQualityIndex = clamp(cityData.environment.airQualityIndex, 0, 500);
  cityData.environment.greenSpacePercentage = clamp(cityData.environment.greenSpacePercentage, 0, 100);
  
  cityData.water.qualityIndex = clamp(cityData.water.qualityIndex, 0, 100);
  cityData.water.reservoirLevel = clamp(cityData.water.reservoirLevel, 0, 100);
  
  cityData.social.happinessIndex = clamp(cityData.social.happinessIndex, 0, 100);
  cityData.social.employmentRate = clamp(cityData.social.employmentRate, 0, 100);
  cityData.social.healthIndex = clamp(cityData.social.healthIndex, 0, 100);
  cityData.social.crimeRate = Math.max(0, cityData.social.crimeRate);
};

// Apply effects of active policies
const applyPolicyEffects = (deltaTime: number): void => {
  activePolicies.forEach(policy => {
    // Update implementation progress
    if (policy.implementationProgress < 100) {
      const progressIncrement = (deltaTime * timeAcceleration * 100) / policy.implementationTime;
      policy.implementationProgress = Math.min(100, policy.implementationProgress + progressIncrement);
    }
    
    // Only apply effects if implementation is complete
    if (policy.implementationProgress >= 100) {
      // Get effect percentage based on how long the policy has been active
      const effectPercent = 1.0;
      
      // Apply impacts to various metrics
      Object.entries(policy.impact).forEach(([category, impacts]) => {
        Object.entries(impacts).forEach(([metric, value]) => {
          const currentValue = (cityData as any)[category][metric];
          const impactValue = (value as number) * effectPercent;
          
          (cityData as any)[category][metric] = currentValue + impactValue;
        });
      });
    }
  });
};

// Apply effects of active events
const applyEventEffects = (deltaTime: number): void => {
  // Update active events
  activeEvents = activeEvents.filter(event => {
    // Skip if resolved
    if (event.resolved) return false;
    
    // Check if event duration has passed
    if (event.duration > 0) {
      const eventElapsedHours = ((Date.now() - event.timeStart) / 3600000) * timeAcceleration;
      if (eventElapsedHours >= event.duration) {
        event.resolved = true;
        return false;
      }
    }
    
    // Apply event effects
    Object.entries(event.impact).forEach(([category, impacts]) => {
      Object.entries(impacts).forEach(([metric, value]) => {
        const currentValue = (cityData as any)[category][metric];
        (cityData as any)[category][metric] = currentValue + (value as number);
      });
    });
    
    return true;
  });
};

// Check for new random events
const checkForNewEvents = (): void => {
  // Only trigger new events if we don't have too many active ones
  if (activeEvents.length >= 2) return;
  
  // Small chance of a new event every update
  if (Math.random() > 0.997) {
    const availableEvents = potentialEvents.filter(e => !activeEvents.some(ae => ae.id === e.id));
    if (availableEvents.length > 0) {
      const randomEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];
      const eventCopy = { ...randomEvent, timeStart: Date.now(), active: true };
      activeEvents.push(eventCopy);
    }
  }
};

// Update city budget
const updateBudget = (deltaTime: number): void => {
  // Simple budget update based on revenue and expenses
  const hourlyRevenue = cityData.economy.revenue / (24 * 30); // Monthly revenue to hourly
  const hourlyExpenses = cityData.economy.expenses / (24 * 30); // Monthly expenses to hourly
  
  const simulationHours = deltaTime * timeAcceleration;
  cityData.economy.budget += (hourlyRevenue - hourlyExpenses) * simulationHours;
};

// Record current metrics to history
const recordHistory = (): void => {
  const timestamp = Date.now();
  const categories = ['traffic', 'energy', 'water', 'environment', 'economy', 'social'];
  
  categories.forEach(category => {
    Object.keys((cityData as any)[category]).forEach(key => {
      // Don't record time data
      if (category !== 'time') {
        const value = (cityData as any)[category][key];
        
        // Add data point to history
        metricHistory[category][key].push({
          timestamp,
          value
        });
        
        // Limit history length (keep last 1000 points)
        if (metricHistory[category][key].length > 1000) {
          metricHistory[category][key].shift();
        }
      }
    });
  });
};

// Update simulation
export const updateSimulation = (): void => {
  if (!simulationRunning) return;
  
  const now = Date.now();
  const deltaTime = (now - lastUpdate) / 1000; // Convert to seconds
  lastUpdate = now;
  
  // Skip if delta is too large (tab was inactive)
  if (deltaTime > 5) return;
  
  // Update simulation time
  updateTime(deltaTime);
  
  // Apply time patterns
  applyTimePatterns();
  
  // Apply random variations
  applyRandomVariations();
  
  // Apply policy effects
  applyPolicyEffects(deltaTime);
  
  // Apply event effects
  applyEventEffects(deltaTime);
  
  // Check for new events
  checkForNewEvents();
  
  // Update budget
  updateBudget(deltaTime);
  
  // Record history
  recordHistory();
};

// Start simulation
export const startSimulation = (): void => {
  simulationRunning = true;
  lastUpdate = Date.now();
  
  // Set update interval
  setInterval(updateSimulation, 1000); // Update every second
};

// Pause simulation
export const pauseSimulation = (): void => {
  simulationRunning = false;
};

// Reset simulation
export const resetSimulation = (): void => {
  cityData = { ...initialCityData };
  activePolicies = [];
  activeEvents = [];
  metricHistory = initializeHistory();
  lastUpdate = Date.now();
};

// Initialize simulation automatically
startSimulation();