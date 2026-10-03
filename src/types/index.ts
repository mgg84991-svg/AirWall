export interface SensorTelemetry {
  temperature: number; // in Celsius
  feelsLike: number;
  humidity: number; // percentage 0-100
  pm25: number; // µg/m³
  pm10?: number; // µg/m³
  uvIndex?: number; // 0-11+
  pressure?: number; // hPa / mmHg
  timestamp: string;
  source: 'demo' | 'api' | 'custom';
}

export interface ClothingRecommendation {
  summary: string;
  items: string[];
  headwear?: string;
  footwear: string;
  accessories?: string[];
  disclaimer: string;
  comfortLevel: 'cold' | 'cool' | 'optimal' | 'warm' | 'hot' | 'polluted';
}

export interface WeatherScenario {
  id: string;
  label: string;
  subtitle: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pm25: number;
  uvIndex: number;
  recommendation: ClothingRecommendation;
}

export interface ExplodedPart {
  id: number;
  name: string;
  shortName: string;
  category: 'mechanical' | 'electronic' | 'sensor' | 'interface';
  material: string;
  description: string;
  offsetZ: number; // visual separation in px
  specs: string[];
}

export interface TimelineStep {
  step: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  tools: string[];
  status: 'completed' | 'current' | 'planned';
  deliverable: string;
}

export interface EvolutionVersion {
  version: string;
  name: string;
  sensors: string[];
  features: string[];
  status: 'implemented' | 'current' | 'in_development' | 'future';
  badge: string;
}

export interface ChartDataPoint {
  time: string;
  temperature: number;
  pm25: number;
  humidity: number;
}
