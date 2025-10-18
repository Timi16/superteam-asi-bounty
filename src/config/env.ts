// placeholder

import { config } from 'dotenv';
import { z } from 'zod';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
config({ path: path.resolve(__dirname, '../../.env') });

// Environment schema validation
const envSchema = z.object({
  // Global
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  
  // Fetch.ai
  AGENTVERSE_API_KEY: z.string().min(1, 'Agentverse API key is required'),
  FETCH_NETWORK: z.enum(['testnet', 'mainnet']).default('testnet'),
  
  // Database
  MONGODB_URI: z.string().url('Invalid MongoDB URI'),
  
  // APIs
  GOOGLE_MAPS_API_KEY: z.string().min(1, 'Google Maps API key is required'),
  OPENWEATHER_API_KEY: z.string().min(1, 'OpenWeather API key is required'),
  
  // Fuel pricing
  FUEL_PRICE_MIN: z.coerce.number().positive().default(900),
  FUEL_PRICE_MAX: z.coerce.number().positive().default(1300),
  FUEL_BASE_LAGOS: z.coerce.number().positive().default(950),
  FUEL_BASE_IBADAN: z.coerce.number().positive().default(980),
  FUEL_BASE_ABEOKUTA: z.coerce.number().positive().default(975),
  FUEL_SURGE_THRESHOLD: z.coerce.number().positive().default(1.15),
  FUEL_VOLATILITY: z.coerce.number().positive().default(0.08),
  
  // Orchestrator
  ORCHESTRATOR_NAME: z.string().default('logistics-orchestrator'),
  ORCHESTRATOR_SEED: z.string().length(32, 'Seed must be 32 characters'),
  ORCHESTRATOR_PORT: z.coerce.number().positive().default(8000),
  ORCHESTRATOR_HTTP_PORT: z.coerce.number().positive().default(4000),
  ORCHESTRATOR_WS_PORT: z.coerce.number().positive().default(4001),
  ORCHESTRATOR_HOST: z.string().default('0.0.0.0'),
  
  // Planner
  PLANNER_NAME: z.string().default('logistics-planner'),
  PLANNER_SEED: z.string().length(32, 'Seed must be 32 characters'),
  PLANNER_PORT: z.coerce.number().positive().default(8010),
  BID_QUORUM_SUPPLIERS: z.coerce.number().positive().default(1),
  BID_QUORUM_WAREHOUSES: z.coerce.number().positive().default(1),
  BID_QUORUM_TRUCKS: z.coerce.number().positive().default(1),
  SCORE_W_COST: z.coerce.number().min(0).max(1).default(0.35),
  SCORE_W_ETA: z.coerce.number().min(0).max(1).default(0.30),
  SCORE_W_RELIABILITY: z.coerce.number().min(0).max(1).default(0.25),
  SCORE_W_CAPACITY: z.coerce.number().min(0).max(1).default(0.10),
  BID_TIMEOUT_MS: z.coerce.number().positive().default(30000),
  
  // MeTTa
  METTA_SERVICE_URL: z.string().url().default('http://localhost:8001'),
  METTA_KB_DIR: z.string().default('src/metta/knowledge'),
  
  // Truck agents
  TRUCK1_NAME: z.string().default('truck-lagos-ibadan-1'),
  TRUCK1_SEED: z.string().length(32),
  TRUCK1_PORT: z.coerce.number().positive().default(8001),
  TRUCK1_REGION: z.string().default('Lagos-Ibadan'),
  TRUCK1_BASE_PRICE: z.coerce.number().positive().default(28000),
  TRUCK1_CAPACITY: z.coerce.number().positive().default(20000),
  TRUCK1_RELIABILITY: z.coerce.number().min(0).max(1).default(0.95),
  TRUCK1_FUEL_EFFICIENCY: z.coerce.number().positive().default(8.5),
  TRUCK1_START_LAT: z.coerce.number().default(6.4474),
  TRUCK1_START_LNG: z.coerce.number().default(3.3601),
  TRUCK1_OPERATING_COST: z.coerce.number().positive().default(1200),
  
  TRUCK2_NAME: z.string().default('truck-lagos-ibadan-2'),
  TRUCK2_SEED: z.string().length(32),
  TRUCK2_PORT: z.coerce.number().positive().default(8002),
  TRUCK2_REGION: z.string().default('Lagos-Ibadan'),
  TRUCK2_BASE_PRICE: z.coerce.number().positive().default(26000),
  TRUCK2_CAPACITY: z.coerce.number().positive().default(18000),
  TRUCK2_RELIABILITY: z.coerce.number().min(0).max(1).default(0.88),
  TRUCK2_FUEL_EFFICIENCY: z.coerce.number().positive().default(9.2),
  TRUCK2_START_LAT: z.coerce.number().default(6.5244),
  TRUCK2_START_LNG: z.coerce.number().default(3.3792),
  TRUCK2_OPERATING_COST: z.coerce.number().positive().default(1100),
  
  TRUCK3_NAME: z.string().default('truck-lagos-abeokuta'),
  TRUCK3_SEED: z.string().length(32),
  TRUCK3_PORT: z.coerce.number().positive().default(8003),
  TRUCK3_REGION: z.string().default('Lagos-Abeokuta'),
  TRUCK3_BASE_PRICE: z.coerce.number().positive().default(22000),
  TRUCK3_CAPACITY: z.coerce.number().positive().default(15000),
  TRUCK3_RELIABILITY: z.coerce.number().min(0).max(1).default(0.92),
  TRUCK3_FUEL_EFFICIENCY: z.coerce.number().positive().default(10.0),
  TRUCK3_START_LAT: z.coerce.number().default(6.5244),
  TRUCK3_START_LNG: z.coerce.number().default(3.3792),
  TRUCK3_OPERATING_COST: z.coerce.number().positive().default(950),
  
  // Warehouse agents
  WAREHOUSE1_NAME: z.string().default('warehouse-apapa'),
  WAREHOUSE1_SEED: z.string().length(32),
  WAREHOUSE1_PORT: z.coerce.number().positive().default(8011),
  WAREHOUSE1_LOCATION: z.string().default('Apapa'),
  WAREHOUSE1_THROUGHPUT: z.coerce.number().positive().default(500),
  WAREHOUSE1_STORAGE_COST_PER_DAY: z.coerce.number().positive().default(50),
  WAREHOUSE1_HANDLING_FEE: z.coerce.number().positive().default(5000),
  WAREHOUSE1_MAX_CAPACITY: z.coerce.number().positive().default(100000),
  WAREHOUSE1_CURRENT_UTILIZATION: z.coerce.number().min(0).max(1).default(0.65),
  WAREHOUSE1_LAT: z.coerce.number().default(6.4474),
  WAREHOUSE1_LNG: z.coerce.number().default(3.3601),
  
  WAREHOUSE2_NAME: z.string().default('warehouse-ikeja'),
  WAREHOUSE2_SEED: z.string().length(32),
  WAREHOUSE2_PORT: z.coerce.number().positive().default(8012),
  WAREHOUSE2_LOCATION: z.string().default('Ikeja'),
  WAREHOUSE2_THROUGHPUT: z.coerce.number().positive().default(350),
  WAREHOUSE2_STORAGE_COST_PER_DAY: z.coerce.number().positive().default(45),
  WAREHOUSE2_HANDLING_FEE: z.coerce.number().positive().default(4500),
  WAREHOUSE2_MAX_CAPACITY: z.coerce.number().positive().default(80000),
  WAREHOUSE2_CURRENT_UTILIZATION: z.coerce.number().min(0).max(1).default(0.55),
  WAREHOUSE2_LAT: z.coerce.number().default(6.5833),
  WAREHOUSE2_LNG: z.coerce.number().default(3.3500),
  
  // Supplier agents
  SUPPLIER1_NAME: z.string().default('supplier-cement-dangote'),
  SUPPLIER1_SEED: z.string().length(32),
  SUPPLIER1_PORT: z.coerce.number().positive().default(8021),
  SUPPLIER1_LOCATION: z.string().default('Lagos'),
  SUPPLIER1_PRODUCTS: z.string().default('cement'),
  SUPPLIER1_UNIT_PRICE_CEMENT: z.coerce.number().positive().default(4500),
  SUPPLIER1_MIN_ORDER: z.coerce.number().positive().default(50),
  SUPPLIER1_MAX_STOCK: z.coerce.number().positive().default(10000),
  SUPPLIER1_CURRENT_STOCK: z.coerce.number().positive().default(8500),
  SUPPLIER1_LEAD_TIME_HOURS: z.coerce.number().positive().default(2),
  SUPPLIER1_LAT: z.coerce.number().default(6.5244),
  SUPPLIER1_LNG: z.coerce.number().default(3.3792),
  
  SUPPLIER2_NAME: z.string().default('supplier-rice-olam'),
  SUPPLIER2_SEED: z.string().length(32),
  SUPPLIER2_PORT: z.coerce.number().positive().default(8022),
  SUPPLIER2_LOCATION: z.string().default('Apapa'),
  SUPPLIER2_PRODUCTS: z.string().default('rice'),
  SUPPLIER2_UNIT_PRICE_RICE: z.coerce.number().positive().default(3800),
  SUPPLIER2_MIN_ORDER: z.coerce.number().positive().default(100),
  SUPPLIER2_MAX_STOCK: z.coerce.number().positive().default(20000),
  SUPPLIER2_CURRENT_STOCK: z.coerce.number().positive().default(15000),
  SUPPLIER2_LEAD_TIME_HOURS: z.coerce.number().positive().default(4),
  SUPPLIER2_LAT: z.coerce.number().default(6.4474),
  SUPPLIER2_LNG: z.coerce.number().default(3.3601),
  
  SUPPLIER3_NAME: z.string().default('supplier-general-goods'),
  SUPPLIER3_SEED: z.string().length(32),
  SUPPLIER3_PORT: z.coerce.number().positive().default(8023),
  SUPPLIER3_LOCATION: z.string().default('Ikeja'),
  SUPPLIER3_PRODUCTS: z.string().default('electronics,furniture,textiles'),
  SUPPLIER3_UNIT_PRICE_DEFAULT: z.coerce.number().positive().default(2500),
  SUPPLIER3_MIN_ORDER: z.coerce.number().positive().default(20),
  SUPPLIER3_MAX_STOCK: z.coerce.number().positive().default(5000),
  SUPPLIER3_CURRENT_STOCK: z.coerce.number().positive().default(4200),
  SUPPLIER3_LEAD_TIME_HOURS: z.coerce.number().positive().default(3),
  SUPPLIER3_LAT: z.coerce.number().default(6.5833),
  SUPPLIER3_LNG: z.coerce.number().default(3.3500),
  
  // Oracle
  ORACLE_NAME: z.string().default('oracle-market-intelligence'),
  ORACLE_SEED: z.string().length(32),
  ORACLE_PORT: z.coerce.number().positive().default(8031),
  ORACLE_PUBLISH_INTERVAL: z.coerce.number().positive().default(300000),
  ORACLE_FETCH_WEATHER: z.coerce.boolean().default(true),
  ORACLE_FETCH_TRAFFIC: z.coerce.boolean().default(true),
  ORACLE_FETCH_FUEL: z.coerce.boolean().default(true),
  TRAFFIC_DELAY_THRESHOLD: z.coerce.number().positive().default(120),
  PORT_CONGESTION_THRESHOLD: z.coerce.number().positive().default(180),
  
  // Cities
  CITY_LAGOS_LAT: z.coerce.number().default(6.5244),
  CITY_LAGOS_LNG: z.coerce.number().default(3.3792),
  CITY_LAGOS_PORT_LAT: z.coerce.number().default(6.4474),
  CITY_LAGOS_PORT_LNG: z.coerce.number().default(3.3601),
  CITY_IBADAN_LAT: z.coerce.number().default(7.3775),
  CITY_IBADAN_LNG: z.coerce.number().default(3.9470),
  CITY_ABEOKUTA_LAT: z.coerce.number().default(7.1475),
  CITY_ABEOKUTA_LNG: z.coerce.number().default(3.3619),
  
  // Lanes
  LANE_LAGOS_IBADAN_RELIABILITY: z.coerce.number().min(0).max(1).default(0.89),
  LANE_LAGOS_ABEOKUTA_RELIABILITY: z.coerce.number().min(0).max(1).default(0.92),
  LANE_LAGOS_IBADAN_AVG_DELAY: z.coerce.number().default(25),
  LANE_LAGOS_ABEOKUTA_AVG_DELAY: z.coerce.number().default(15),
  
  // Rush hour
  RUSH_HOUR_MORNING_START: z.coerce.number().default(7),
  RUSH_HOUR_MORNING_END: z.coerce.number().default(10),
  RUSH_HOUR_EVENING_START: z.coerce.number().default(16),
  RUSH_HOUR_EVENING_END: z.coerce.number().default(19),
  RUSH_HOUR_MULTIPLIER: z.coerce.number().default(1.35),
  
  // Port
  PORT_APAPA_AVG_DELAY: z.coerce.number().default(180),
  PORT_CONGESTION_PENALTY: z.coerce.number().default(0.15),
  
  // Dev/Debug
  DEBUG_MODE: z.coerce.boolean().default(false),
  SIMULATE_DELAYS: z.coerce.boolean().default(true),
  SIMULATE_DELAY_MIN_MS: z.coerce.number().default(800),
  SIMULATE_DELAY_MAX_MS: z.coerce.number().default(2500),
  ENABLE_MOCK_FALLBACK: z.coerce.boolean().default(true),
  LOG_AGENT_MESSAGES: z.coerce.boolean().default(true),
  
  // Security
  CORS_ORIGINS: z.string().default('http://localhost:3000,http://localhost:4000'),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
});

// Parse and validate environment
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment validation failed:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      process.exit(1);
    }
    throw error;
  }
};

export const env = parseEnv();

// Validate scoring weights sum to 1.0
const weightSum = env.SCORE_W_COST + env.SCORE_W_ETA + env.SCORE_W_RELIABILITY + env.SCORE_W_CAPACITY;
if (Math.abs(weightSum - 1.0) > 0.001) {
  console.error(`❌ Scoring weights must sum to 1.0 (current: ${weightSum})`);
  process.exit(1);
}

console.log('✅ Environment variables loaded and validated');