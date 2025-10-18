// Base types
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  city: string;
  address?: string;
  coordinates: Coordinates;
}

// Agent types
export type AgentRole = 'orchestrator' | 'planner' | 'truck' | 'warehouse' | 'supplier' | 'oracle';

export interface AgentIdentity {
  id: string;
  name: string;
  address: string;
  role: AgentRole;
  port: number;
  capabilities?: string[];
  metadata?: Record<string, unknown>;
}

// RFQ (Request for Quote) types
export interface RFQ {
  id: string;
  text: string;
  parsed: {
    quantity: number;
    unit: string;
    product: string;
    origin: Location;
    destination: Location;
    deadline: Date;
  };
  status: RFQStatus;
  createdAt: Date;
  updatedAt: Date;
  metadata?: {
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    specialRequirements?: string[];
    estimatedValue?: number;
  };
}

export type RFQStatus = 
  | 'pending' 
  | 'broadcasting' 
  | 'collecting_bids' 
  | 'awarding' 
  | 'awarded' 
  | 'rebidding' 
  | 'failed';

// Bid types
export interface Bid {
  id: string;
  rfqId: string;
  agentId: string;
  agentName: string;
  agentRole: AgentRole;
  price: number;
  eta: number; // minutes
  confidence: number; // 0-1
  reliability: number; // 0-1
  capacity: number;
  details: BidDetails;
  status: BidStatus;
  createdAt: Date;
  expiresAt: Date;
}

export interface BidDetails {
  breakdown?: {
    baseCost?: number;
    fuelCost?: number;
    operatingCost?: number;
    margin?: number;
  };
  route?: {
    distance: number; // km
    duration: number; // minutes
    trafficMultiplier?: number;
  };
  constraints?: {
    maxWeight?: number;
    requiresRefrigeration?: boolean;
    availableFrom?: Date;
    availableUntil?: Date;
  };
  metadata?: Record<string, unknown>;
}

export type BidStatus = 'submitted' | 'under_review' | 'accepted' | 'rejected';

// Award types
export interface Award {
  id: string;
  rfqId: string;
  winners: {
    supplier: Bid;
    warehouse: Bid;
    truck: Bid;
  };
  totalCost: number;
  totalEta: number; // minutes
  overallConfidence: number;
  score: number;
  reasoning?: string;
  status: AwardStatus;
  issuedAt: Date;
  acceptedAt?: Date;
  completedAt?: Date;
}

export type AwardStatus = 
  | 'issued' 
  | 'accepted' 
  | 'in_progress' 
  | 'completed' 
  | 'failed';

// Oracle alert types
export interface OracleAlert {
  id: string;
  type: OracleAlertType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  data: {
    fuelPrice?: number;
    fuelChange?: number;
    trafficDelay?: number;
    weatherCondition?: string;
    portDelay?: number;
    affectedRoutes?: string[];
    affectedRfqs?: string[];
  };
  timestamp: Date;
  expiresAt?: Date;
}

export type OracleAlertType = 
  | 'fuel.surge' 
  | 'traffic.congestion' 
  | 'weather.severe' 
  | 'port.delay';

// Message types for agent communication
export interface AgentMessage<T = unknown> {
  id: string;
  type: string;
  from: string;
  to?: string;
  payload: T;
  timestamp: Date;
  correlationId?: string;
}

// Truck-specific types
export interface TruckCapabilities {
  capacity: number;
  fuelEfficiency: number;
  reliability: number;
  basePrice: number;
  operatingCost: number;
  regions: string[];
  currentLocation: Coordinates;
}

// Warehouse-specific types
export interface WarehouseCapabilities {
  location: Location;
  throughput: number;
  maxCapacity: number;
  currentUtilization: number;
  storageCostPerDay: number;
  handlingFee: number;
  specialties?: string[];
}

// Supplier-specific types
export interface SupplierCapabilities {
  location: Location;
  products: string[];
  pricing: Record<string, number>;
  minOrder: number;
  maxStock: number;
  currentStock: number;
  leadTimeHours: number;
}

// Scoring types
export interface ScoringWeights {
  cost: number;
  eta: number;
  reliability: number;
  capacity: number;
}

export interface BidScore {
  bidId: string;
  agentId: string;
  normalizedScores: {
    cost: number;
    eta: number;
    reliability: number;
    capacity: number;
  };
  weightedScore: number;
  rank: number;
}

export interface ScoringResult {
  rfqId: string;
  scores: BidScore[];
  winners: {
    supplier: BidScore;
    warehouse: BidScore;
    truck: BidScore;
  };
  metadata?: {
    mettaModifiers?: Record<string, number>;
    reasoning?: string;
  };
}

// MeTTa types
export interface MettaQuery {
  type: 'reliability' | 'rush_penalty' | 'lane_condition' | 'recommendation';
  params: Record<string, unknown>;
}

export interface MettaResponse {
  result: unknown;
  confidence: number;
  reasoning?: string;
  metadata?: Record<string, unknown>;
}

// Google Maps types
export interface RouteInfo {
  origin: Coordinates;
  destination: Coordinates;
  distance: number; // meters
  duration: number; // seconds
  durationInTraffic?: number; // seconds
  polyline?: string;
  trafficMultiplier: number;
}

// Weather types
export interface WeatherInfo {
  location: Coordinates;
  condition: string;
  temperature: number;
  description: string;
  severity: 'clear' | 'light' | 'moderate' | 'severe';
  impactOnLogistics: number; // 0-1 (0 = no impact, 1 = severe impact)
}

// Fuel price types
export interface FuelPrice {
  location: string;
  pricePerLiter: number;
  currency: 'NGN';
  timestamp: Date;
  change?: number; // percentage change from baseline
}

// Database models (for MongoDB)
export interface RFQDocument extends RFQ {
  _id?: string;
}

export interface BidDocument extends Bid {
  _id?: string;
}

export interface AwardDocument extends Award {
  _id?: string;
}

export interface AgentDocument extends AgentIdentity {
  _id?: string;
  lastSeen: Date;
  statistics?: {
    totalBids: number;
    acceptedBids: number;
    rejectedBids: number;
    averageResponseTime: number;
  };
}

// WebSocket event types
export interface WSEvent<T = unknown> {
  event: string;
  data: T;
  timestamp: Date;
}

// HTTP request/response types
export interface CreateRFQRequest {
  text: string;
}

export interface CreateRFQResponse {
  rfq: RFQ;
  message: string;
}

export interface GetRFQResponse {
  rfq: RFQ;
  bids: Bid[];
  award?: Award;
}

export interface ListAgentsResponse {
  agents: AgentIdentity[];
  total: number;
}

// Error types
export interface ErrorResponse {
  error: string;
  message: string;
  details?: unknown;
  timestamp: Date;
}