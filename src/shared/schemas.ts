// placeholder
import { z } from 'zod';

// Coordinates schema
export const coordinatesSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

// Location schema
export const locationSchema = z.object({
  city: z.string().min(1),
  address: z.string().optional(),
  coordinates: coordinatesSchema,
});

// Agent identity schema
export const agentIdentitySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  address: z.string().min(1),
  role: z.enum(['orchestrator', 'planner', 'truck', 'warehouse', 'supplier', 'oracle']),
  port: z.number().positive(),
  capabilities: z.array(z.string()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// RFQ schema
export const rfqParsedSchema = z.object({
  quantity: z.number().positive(),
  unit: z.string().min(1),
  product: z.string().min(1),
  origin: locationSchema,
  destination: locationSchema,
  deadline: z.coerce.date(),
});

export const rfqMetadataSchema = z.object({
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  specialRequirements: z.array(z.string()).optional(),
  estimatedValue: z.number().positive().optional(),
});

export const rfqSchema = z.object({
  id: z.string().uuid(),
  text: z.string().min(1),
  parsed: rfqParsedSchema,
  status: z.enum(['pending', 'broadcasting', 'collecting_bids', 'awarding', 'awarded', 'rebidding', 'failed']),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  metadata: rfqMetadataSchema.optional(),
});

// Bid schema
export const bidDetailsSchema = z.object({
  breakdown: z.object({
    baseCost: z.number().optional(),
    fuelCost: z.number().optional(),
    operatingCost: z.number().optional(),
    margin: z.number().optional(),
  }).optional(),
  route: z.object({
    distance: z.number().positive(),
    duration: z.number().positive(),
    trafficMultiplier: z.number().positive().optional(),
  }).optional(),
  constraints: z.object({
    maxWeight: z.number().optional(),
    requiresRefrigeration: z.boolean().optional(),
    availableFrom: z.coerce.date().optional(),
    availableUntil: z.coerce.date().optional(),
  }).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const bidSchema = z.object({
  id: z.string().uuid(),
  rfqId: z.string().uuid(),
  agentId: z.string().uuid(),
  agentName: z.string().min(1),
  agentRole: z.enum(['truck', 'warehouse', 'supplier']),
  price: z.number().positive(),
  eta: z.number().positive(),
  confidence: z.number().min(0).max(1),
  reliability: z.number().min(0).max(1),
  capacity: z.number().positive(),
  details: bidDetailsSchema,
  status: z.enum(['submitted', 'under_review', 'accepted', 'rejected']),
  createdAt: z.coerce.date(),
  expiresAt: z.coerce.date(),
});

// Award schema
export const awardSchema = z.object({
  id: z.string().uuid(),
  rfqId: z.string().uuid(),
  winners: z.object({
    supplier: bidSchema,
    warehouse: bidSchema,
    truck: bidSchema,
  }),
  totalCost: z.number().positive(),
  totalEta: z.number().positive(),
  overallConfidence: z.number().min(0).max(1),
  score: z.number(),
  reasoning: z.string().optional(),
  status: z.enum(['issued', 'accepted', 'in_progress', 'completed', 'failed']),
  issuedAt: z.coerce.date(),
  acceptedAt: z.coerce.date().optional(),
  completedAt: z.coerce.date().optional(),
});

// Oracle alert schema
export const oracleAlertSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['fuel.surge', 'traffic.congestion', 'weather.severe', 'port.delay']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  message: z.string().min(1),
  data: z.object({
    fuelPrice: z.number().optional(),
    fuelChange: z.number().optional(),
    trafficDelay: z.number().optional(),
    weatherCondition: z.string().optional(),
    portDelay: z.number().optional(),
    affectedRoutes: z.array(z.string()).optional(),
    affectedRfqs: z.array(z.string()).optional(),
  }),
  timestamp: z.coerce.date(),
  expiresAt: z.coerce.date().optional(),
});

// Agent message schema
export const agentMessageSchema = z.object({
  id: z.string().uuid(),
  type: z.string().min(1),
  from: z.string().min(1),
  to: z.string().optional(),
  payload: z.unknown(),
  timestamp: z.coerce.date(),
  correlationId: z.string().optional(),
});

// HTTP request schemas
export const createRFQRequestSchema = z.object({
  text: z.string().min(10, 'RFQ text must be at least 10 characters'),
});

// MeTTa query schema
export const mettaQuerySchema = z.object({
  type: z.enum(['reliability', 'rush_penalty', 'lane_condition', 'recommendation']),
  params: z.record(z.unknown()),
});

// Route info schema
export const routeInfoSchema = z.object({
  origin: coordinatesSchema,
  destination: coordinatesSchema,
  distance: z.number().positive(),
  duration: z.number().positive(),
  durationInTraffic: z.number().positive().optional(),
  polyline: z.string().optional(),
  trafficMultiplier: z.number().positive(),
});

// Weather info schema
export const weatherInfoSchema = z.object({
  location: coordinatesSchema,
  condition: z.string(),
  temperature: z.number(),
  description: z.string(),
  severity: z.enum(['clear', 'light', 'moderate', 'severe']),
  impactOnLogistics: z.number().min(0).max(1),
});

// Fuel price schema
export const fuelPriceSchema = z.object({
  location: z.string().min(1),
  pricePerLiter: z.number().positive(),
  currency: z.literal('NGN'),
  timestamp: z.coerce.date(),
  change: z.number().optional(),
});

// Validation helper functions
export const validateRFQ = (data: unknown) => {
  return rfqSchema.parse(data);
};

export const validateBid = (data: unknown) => {
  return bidSchema.parse(data);
};

export const validateAward = (data: unknown) => {
  return awardSchema.parse(data);
};

export const validateOracleAlert = (data: unknown) => {
  return oracleAlertSchema.parse(data);
};

export const validateAgentMessage = (data: unknown) => {
  return agentMessageSchema.parse(data);
};

export const validateCreateRFQRequest = (data: unknown) => {
  return createRFQRequestSchema.parse(data);
};