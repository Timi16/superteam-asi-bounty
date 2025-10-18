// placeholder

export const AGENT_ROLES = {
  ORCHESTRATOR: 'orchestrator',
  PLANNER: 'planner',
  TRUCK: 'truck',
  WAREHOUSE: 'warehouse',
  SUPPLIER: 'supplier',
  ORACLE: 'oracle',
} as const;

export const MESSAGE_TYPES = {
  RFQ_CREATED: 'rfq.created',
  RFQ_BROADCAST: 'rfq.broadcast',
  BID_SUBMITTED: 'bid.submitted',
  BID_COLLECTION_COMPLETE: 'bid.collection.complete',
  AWARD_ISSUED: 'award.issued',
  AWARD_ACCEPTED: 'award.accepted',
  ORACLE_ALERT: 'oracle.alert',
  REBID_TRIGGERED: 'rebid.triggered',
  AGENT_REGISTERED: 'agent.registered',
  AGENT_STATUS: 'agent.status',
} as const;

export const ORACLE_ALERT_TYPES = {
  FUEL_SURGE: 'fuel.surge',
  TRAFFIC_CONGESTION: 'traffic.congestion',
  WEATHER_SEVERE: 'weather.severe',
  PORT_DELAY: 'port.delay',
} as const;

export const RFQ_STATUS = {
  PENDING: 'pending',
  BROADCASTING: 'broadcasting',
  COLLECTING_BIDS: 'collecting_bids',
  AWARDING: 'awarding',
  AWARDED: 'awarded',
  REBIDDING: 'rebidding',
  FAILED: 'failed',
} as const;

export const BID_STATUS = {
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
} as const;

export const AWARD_STATUS = {
  ISSUED: 'issued',
  ACCEPTED: 'accepted',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export const NIGERIAN_CITIES = {
  LAGOS: { name: 'Lagos', lat: 6.5244, lng: 3.3792 },
  LAGOS_PORT: { name: 'Lagos Port (Apapa)', lat: 6.4474, lng: 3.3601 },
  APAPA: { name: 'Apapa', lat: 6.4474, lng: 3.3601 },
  IBADAN: { name: 'Ibadan', lat: 7.3775, lng: 3.9470 },
  ABEOKUTA: { name: 'Abeokuta', lat: 7.1475, lng: 3.3619 },
  IKEJA: { name: 'Ikeja', lat: 6.5833, lng: 3.3500 },
  ABUJA: { name: 'Abuja', lat: 9.0765, lng: 7.3986 },
  KANO: { name: 'Kano', lat: 12.0022, lng: 8.5919 },
  PORT_HARCOURT: { name: 'Port Harcourt', lat: 4.8156, lng: 7.0498 },
} as const;

export const PRODUCT_TYPES = {
  CEMENT: 'cement',
  RICE: 'rice',
  ELECTRONICS: 'electronics',
  FURNITURE: 'furniture',
  TEXTILES: 'textiles',
  GENERAL: 'general',
} as const;

export const UNITS = {
  BAGS: 'bags',
  CRATES: 'crates',
  PALLETS: 'pallets',
  TONS: 'tons',
  BOXES: 'boxes',
  UNITS: 'units',
} as const;