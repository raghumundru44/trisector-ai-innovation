const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock AI Chat Responses generator
const generateAIChatResponse = (message, sector) => {
  const msgLower = message.toLowerCase();
  
  if (sector === 'agriculture') {
    if (msgLower.includes('soil') || msgLower.includes('moisture') || msgLower.includes('water')) {
      return "Based on multispectral satellite overlays and our root-zone sensor nodes, field A3 exhibits a 12% moisture deficit. I recommend initiating a targeted 15-minute drip irrigation cycle at 04:00 AM to optimize absorption and prevent nitrogen leaching.";
    }
    if (msgLower.includes('yield') || msgLower.includes('harvest') || msgLower.includes('crop')) {
      return "Predictive modeling indicates a yield yield increase of +8.4% for your maize crop, driven by optimized thermal accumulation. Harvest window is projected for Sept 12-16 to avoid forecasted high-humidity fronts.";
    }
    if (msgLower.includes('fertilizer') || msgLower.includes('pest') || msgLower.includes('disease')) {
      return "Our computer vision drone sweeps have flagged early-stage leaf spot in the northwestern quadrant of the orchard. Action Required: Apply a selective bio-fungicide within 48 hours to prevent spores spreading to adjacent sectors.";
    }
    return "Hello! I am your Agriculture AI Agent. Ask me about crop yields, soil moisture analysis, drone health monitoring, or weather anomaly routing.";
  }
  
  if (sector === 'industry') {
    if (msgLower.includes('supplier') || msgLower.includes('delivery') || msgLower.includes('lead')) {
      return "Supplier logistics scan: Incoming deliveries from Zone A are currently on schedule with a 98.2% on-time rate. Lead times remain stable at 1.4 days. I have automated a cargo clearance token for the upcoming fleet.";
    }
    if (msgLower.includes('storage') || msgLower.includes('capacity') || msgLower.includes('silo') || msgLower.includes('warehouse')) {
      return "Warehouse storage monitors indicate capacity is at 74.6% utilization. Internal storage temperature is steady at 18.5°C. I recommend routing incoming supplier pallets to Section C to optimize retrieval speeds.";
    }
    return "Greetings. I am your Industrial IoT AI Assistant. You can query me about supplier delivery logistics, active supplier lead times, storage capacity utilization, or warehouse microclimate stability.";
  }
  
  if (sector === 'service') {
    if (msgLower.includes('transport') || msgLower.includes('route') || msgLower.includes('fleet') || msgLower.includes('dispatch')) {
      return "Transport Recommendation Engine: Active congestion detected on Route B. I recommend auto-dispatching fleet units along Route A immediately, saving approximately 18 minutes of drive time and maintaining SLA compliance.";
    }
    if (msgLower.includes('loan') || msgLower.includes('insurance') || msgLower.includes('rate') || msgLower.includes('claim') || msgLower.includes('plan')) {
      return "Loan & Insurance Matcher: Client profile has been auto-screened. Recommending Pre-Approved Insurance Plan B with an optimized interest rate of 4.2%. Risk assessment holds a 95.8% approval probability index.";
    }
    return "Hi there! I am your Service Operations AI Agent. Ask me about dynamic transport route recommendations, dispatch optimizations, customer loan eligibility matrices, or commercial insurance matches.";
  }

  // General Master Coordinator Routing
  if (msgLower.includes('agri') || msgLower.includes('soil') || msgLower.includes('moisture') || msgLower.includes('crop') || msgLower.includes('yield') || msgLower.includes('harvest') || msgLower.includes('disease') || msgLower.includes('price') || msgLower.includes('health')) {
    return `[Auto-Routed to Agriculture AI] ` + generateAIChatResponse(message, 'agriculture');
  }
  if (msgLower.includes('industry') || msgLower.includes('supplier') || msgLower.includes('delivery') || msgLower.includes('storage') || msgLower.includes('capacity') || msgLower.includes('warehouse') || msgLower.includes('silo')) {
    return `[Auto-Routed to Industrial IoT AI] ` + generateAIChatResponse(message, 'industry');
  }
  if (msgLower.includes('service') || msgLower.includes('transport') || msgLower.includes('route') || msgLower.includes('loan') || msgLower.includes('insurance') || msgLower.includes('fleet') || msgLower.includes('driver')) {
    return `[Auto-Routed to Services Ops AI] ` + generateAIChatResponse(message, 'service');
  }

  return "I am the Trisector AI Master Coordinator. I aggregate data streams from all three operational agents:\n\n🌱 Agriculture AI (Crop Health: 94.8%, Market Price: $385/Ton)\n⚙️ Industrial IoT (Supplier Delivery: 98.2%, Storage Capacity: 74.6%)\n👥 Service Operations (Transport: Route A, Insurance: Pre-Approved Plan B)\n\nAsk me any specific question about crop health, supplier logistics, or dynamic transport routes, and I will route it to the appropriate sub-agent.";
};

// API Route: Sector Predictions and Metrics
app.get('/', (req, res) => {
  res.json({ status: "active", service: "Trisector AI Backend Node", message: "Connect endpoints via /api/predictions/:sector or /api/chat" });
});

app.get('/api/predictions/:sector', (req, res) => {
  const { sector } = req.params;
  const timestamp = new Date().toLocaleTimeString();

  if (sector === 'agriculture') {
    res.json({
      sector: 'agriculture',
      timestamp,
      status: 'optimal',
      healthIndex: 94.8,
      metrics: [
        { name: 'Crop Health', value: '94.8%', status: 'optimal', delta: '+1.5%' },
        { name: 'Market Price', value: '$385 / Ton', status: 'optimal', delta: '+2.4%' },
        { name: 'Soil Moisture', value: '42.6%', status: 'nominal', delta: '+1.2%' },
        { name: 'Ambient Temp', value: '24.2°C', status: 'nominal', delta: '-0.4°C' }
      ],
      chartData: [
        { time: '08:00', cropHealth: 92, marketPrice: 375 },
        { time: '10:00', cropHealth: 93, marketPrice: 378 },
        { time: '12:00', cropHealth: 93, marketPrice: 380 },
        { time: '14:00', cropHealth: 94, marketPrice: 382 },
        { time: '16:00', cropHealth: 94, marketPrice: 385 },
        { time: '18:00', cropHealth: 95, marketPrice: 384 },
        { time: '20:00', cropHealth: 95, marketPrice: 385 }
      ],
      anomalies: []
    });
  } else if (sector === 'industry') {
    res.json({
      sector: 'industry',
      timestamp,
      status: 'optimal',
      healthIndex: 96.2,
      metrics: [
        { name: 'Supplier Delivery Rate', value: '98.2% On-Time', status: 'optimal', delta: '+1.5%' },
        { name: 'Storage Capacity Used', value: '74.6% Full', status: 'nominal', delta: '+3.1%' },
        { name: 'Active Supplier Nodes', value: '14 Active', status: 'nominal', delta: 'stable' },
        { name: 'Storage Temperature', value: '18.5°C', status: 'nominal', delta: '-0.2°C' }
      ],
      chartData: [
        { time: '08:00', supplierReliability: 96, storageCapacity: 70 },
        { time: '10:00', supplierReliability: 97, storageCapacity: 72 },
        { time: '12:00', supplierReliability: 97, storageCapacity: 73 },
        { time: '14:00', supplierReliability: 98, storageCapacity: 74 },
        { time: '16:00', supplierReliability: 98, storageCapacity: 74 },
        { time: '18:00', supplierReliability: 98, storageCapacity: 75 },
        { time: '20:00', supplierReliability: 98, storageCapacity: 75 }
      ],
      anomalies: []
    });
  } else if (sector === 'service') {
    res.json({
      sector: 'service',
      timestamp,
      status: 'optimal',
      healthIndex: 95.8,
      metrics: [
        { name: 'Transport Dispatch', value: 'Route A (Optimized)', status: 'optimal', delta: '-18m travel' },
        { name: 'Loan & Insurance Match', value: 'Pre-Approved Plan B', status: 'optimal', delta: 'matched' },
        { name: 'Active Fleet Drivers', value: '28 En Route', status: 'nominal', delta: '+3' },
        { name: 'Claims Queue Status', value: '2 Pending Review', status: 'nominal', delta: '-1' }
      ],
      chartData: [
        { time: '08:00', transportEfficiency: 88, insuranceApproveRate: 92 },
        { time: '10:00', transportEfficiency: 90, insuranceApproveRate: 93 },
        { time: '12:00', transportEfficiency: 92, insuranceApproveRate: 94 },
        { time: '14:00', transportEfficiency: 94, insuranceApproveRate: 94 },
        { time: '16:00', transportEfficiency: 95, insuranceApproveRate: 95 },
        { time: '18:00', transportEfficiency: 96, insuranceApproveRate: 95 },
        { time: '20:00', transportEfficiency: 96, insuranceApproveRate: 96 }
      ],
      anomalies: []
    });
  } else {
    res.status(400).json({ error: 'Invalid sector' });
  }
});

// API Route: AI Chatbot Responder
app.post('/api/chat', (req, res) => {
  const { message, sector } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  const reply = generateAIChatResponse(message, sector);
  res.json({ reply, timestamp: new Date().toLocaleTimeString() });
});

const fs = require('fs');
const path = require('path');
const queriesFilePath = path.join(__dirname, 'queries.json');

// Ensure queries.json exists
if (!fs.existsSync(queriesFilePath)) {
  fs.writeFileSync(queriesFilePath, JSON.stringify([], null, 2));
}

// API Route: Submit deployment query
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const newQuery = {
    id: Date.now(),
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  };

  try {
    const fileData = fs.readFileSync(queriesFilePath, 'utf8');
    const queries = JSON.parse(fileData);
    queries.push(newQuery);
    fs.writeFileSync(queriesFilePath, JSON.stringify(queries, null, 2));
    console.log(`📥 [INGESTION] New Deployment Query from ${name} (${email}): "${message}"`);
    res.json({ success: true, message: 'Query stored successfully', query: newQuery });
  } catch (err) {
    console.error('Failed to save query:', err);
    res.status(500).json({ error: 'Internal server error saving query' });
  }
});

// API Route: Get all deployment queries (admin view)
app.get('/api/queries', (req, res) => {
  try {
    const fileData = fs.readFileSync(queriesFilePath, 'utf8');
    const queries = JSON.parse(fileData);
    res.json(queries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read queries' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
