// placeholder
// Event channel names for agent communication
export const CHANNELS = {
  // RFQ channels
  RFQ_CREATED: 'rfq.created',
  RFQ_BROADCAST: 'rfq.broadcast',
  RFQ_UPDATED: 'rfq.updated',
  RFQ_CANCELLED: 'rfq.cancelled',
  
  // Bid channels
  BID_SUBMITTED: 'bid.submitted',
  BID_UPDATED: 'bid.updated',
  BID_WITHDRAWN: 'bid.withdrawn',
  BID_COLLECTION_COMPLETE: 'bid.collection.complete',
  BID_QUORUM_REACHED: 'bid.quorum.reached',
  
  // Award channels
  AWARD_ISSUED: 'award.issued',
  AWARD_ACCEPTED: 'award.accepted',
  AWARD_REJECTED: 'award.rejected',
  AWARD_COMPLETED: 'award.completed',
  AWARD_FAILED: 'award.failed',
  
  // Oracle channels
  ORACLE_ALERT: 'oracle.alert',
  ORACLE_FUEL_UPDATE: 'oracle.fuel.update',
  ORACLE_TRAFFIC_UPDATE: 'oracle.traffic.update',
  ORACLE_WEATHER_UPDATE: 'oracle.weather.update',
  ORACLE_PORT_UPDATE: 'oracle.port.update',
  
  // Rebid channels
  REBID_TRIGGERED: 'rebid.triggered',
  REBID_STARTED: 'rebid.started',
  REBID_COMPLETED: 'rebid.completed',
  
  // Agent management channels
  AGENT_REGISTERED: 'agent.registered',
  AGENT_DEREGISTERED: 'agent.deregistered',
  AGENT_STATUS_UPDATE: 'agent.status.update',
  AGENT_HEARTBEAT: 'agent.heartbeat',
  
  // System channels
  SYSTEM_ERROR: 'system.error',
  SYSTEM_HEALTH_CHECK: 'system.health.check',
} as const;

export type ChannelName = typeof CHANNELS[keyof typeof CHANNELS];