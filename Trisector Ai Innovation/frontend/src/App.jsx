import React, { useState, useEffect, useRef } from 'react';
import {
  Sprout,
  Activity,
  Layers,
  Settings,
  Cpu,
  Users,
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  MessageSquare,
  Send,
  Globe,
  Shield,
  Zap,
  Thermometer,
  Database,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  TrendingDown,
  Clock,
  UserCheck,
  Check
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line
} from 'recharts';

const LogoIcon = ({ className = "w-10 h-10" }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logo-grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="logo-grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <linearGradient id="logo-grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
      <filter id="logo-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0284c7" floodOpacity="0.25" />
      </filter>
    </defs>
    {/* Sector 1: Top Lobe - Agriculture */}
    <path 
      d="M50 15 C62 15, 70 30, 60 42 C50 54, 40 42, 50 15 Z" 
      fill="url(#logo-grad-green)" 
      opacity="0.9"
      filter="url(#logo-shadow)"
    />
    {/* Sector 2: Right Lobe - Industry */}
    <path 
      d="M75 62 C75 74, 52 78, 45 66 C38 54, 58 48, 75 62 Z" 
      fill="url(#logo-grad-blue)" 
      opacity="0.9"
      filter="url(#logo-shadow)"
    />
    {/* Sector 3: Left Lobe - Services */}
    <path 
      d="M25 62 C15 50, 32 40, 43 49 C54 58, 35 74, 25 62 Z" 
      fill="url(#logo-grad-cyan)" 
      opacity="0.9"
      filter="url(#logo-shadow)"
    />
    {/* Core node */}
    <circle cx="50" cy="54" r="5" fill="#ffffff" />
    <circle cx="50" cy="54" r="2.5" fill="#0f172a" />
  </svg>
);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const sectorScenarios = {
  agriculture: {
    title: "Agriculture Challenges & Solutions",
    subtitle: "Solving modern crop intelligence and market logistics",
    problem: {
      title: "The Problem",
      description: "Disconnected farms suffer from unpredictable crop failures, lack of real-time health analytics, and volatile market prices. Farmers are left guessing when to harvest or sell.",
      items: [
        "No real-time visibility into crop health metrics",
        "Volatile market prices catch farmers unprepared",
        "Uncalibrated watering or spray actions ruin harvests"
      ],
      iconBg: "bg-red-950/40 text-red-400 border border-red-900/30"
    },
    solution: {
      title: "The Solution",
      description: "Trisector AI fuses live crop health indices with real-time market price telemetry. The system automatically recommends the perfect harvest windows and pricing actions.",
      items: [
        "Live crop health monitoring via multi-spectral scan",
        "Real-time market price index overlays",
        "Automated yield triggers and irrigation dispatch"
      ],
      iconBg: "bg-brand-green-950/40 text-brand-green-400 border border-brand-green-900/30"
    },
    visual: (
      <div className="w-full h-52 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 bg-emerald-500/20 text-emerald-400 rounded-bl-xl text-xs font-bold font-display uppercase tracking-widest">Live Node</div>
        <div className="w-14 h-14 rounded-full bg-emerald-950/50 text-emerald-400 flex items-center justify-center mb-3 border border-emerald-900/30 shadow-lg animate-pulse">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h4 className="font-bold text-white text-base">Crop Sprout Monitor</h4>
        <p className="text-xs text-slate-400 mt-1 text-center">Tracking chlorophyll absorption & leaf hydration index</p>
        <div className="mt-4 flex items-center gap-4 text-xs font-mono text-emerald-400 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-emerald-900/40">
          <span>Health: 94.8%</span>
          <span>•</span>
          <span>Market: $385/t</span>
        </div>
      </div>
    )
  },
  industry: {
    title: "Industrial Challenges & Solutions",
    subtitle: "Optimizing inbound supplier logistics and warehouse buffering",
    problem: {
      title: "The Problem",
      description: "Factory lines experience critical delays due to unpredictable supplier arrivals. Warehouse space is either under-utilized or overloaded, spiking storage overhead.",
      items: [
        "Unreliable supplier delivery ETA tracking",
        "Silo/warehouse overflow during bulk inputs",
        "Inefficient bin retrieval paths"
      ],
      iconBg: "bg-red-950/40 text-red-400 border border-red-900/30"
    },
    solution: {
      title: "The Solution",
      description: "Trisector AI integrates real-time storage sensors with automated supplier tracking. Buffer spaces are auto-allocated and dispatch gates clear on optimal paths.",
      items: [
        "Automated supplier delivery tracking",
        "Silo fill-level telemetry & storage buffer alerts",
        "Thermal warehouse temperature checks"
      ],
      iconBg: "bg-brand-blue-950/40 text-brand-blue-400 border border-brand-blue-900/30"
    },
    visual: (
      <div className="w-full h-52 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 bg-blue-500/20 text-blue-400 rounded-bl-xl text-xs font-bold font-display uppercase tracking-widest">Live Node</div>
        <div className="w-14 h-14 rounded-full bg-blue-950/50 text-blue-400 flex items-center justify-center mb-3 border border-blue-900/30 shadow-lg animate-pulse">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h4 className="font-bold text-white text-base">Warehouse Storage Grid</h4>
        <p className="text-xs text-slate-400 mt-1 text-center">Monitoring real-time bin allocation & supplier lead time</p>
        <div className="mt-4 flex items-center gap-4 text-xs font-mono text-brand-blue-400 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-brand-blue-900/40">
          <span>Logistics: 98.2%</span>
          <span>•</span>
          <span>Capacity: 74.6%</span>
        </div>
      </div>
    )
  },
  service: {
    title: "Services Ops Challenges & Solutions",
    subtitle: "Accelerating transport routes and micro-finance credit matching",
    problem: {
      title: "The Problem",
      description: "Fleet drivers face severe route delays, while logistics clients wait weeks for transport loan approvals and claims clearing, stalling operational progress.",
      items: [
        "Congested roads block delivery cycles",
        "Manual credit & insurance matching delays",
        "Slow incident payouts freeze asset deployment"
      ],
      iconBg: "bg-red-950/40 text-red-400 border border-red-900/30"
    },
    solution: {
      title: "The Solution",
      description: "Trisector AI routes fleet dispatches based on active transit delays, while screening profiles against matching commercial loan and pre-approved insurance programs.",
      items: [
        "Real-time route optimization dispatches",
        "Instant loan & insurance pre-approvals",
        "Automated claim assessment cycles"
      ],
      iconBg: "bg-teal-950/40 text-teal-400 border border-teal-900/30"
    },
    visual: (
      <div className="w-full h-52 rounded-2xl bg-gradient-to-br from-teal-500/10 to-emerald-500/5 border border-teal-500/20 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 bg-teal-500/20 text-teal-400 rounded-bl-xl text-xs font-bold font-display uppercase tracking-widest">Live Node</div>
        <div className="w-14 h-14 rounded-full bg-teal-950/50 text-teal-400 flex items-center justify-center mb-3 border border-teal-900/30 shadow-lg animate-pulse">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-10a1 1 0 011-1h2.22a2 2 0 011.414.586l4.78 4.78a2 2 0 01.586 1.414V16a1 1 0 01-1 1h-1m-12 0a2 2 0 004 0M19 17a2 2 0 004 0H2" />
          </svg>
        </div>
        <h4 className="font-bold text-white text-base">Fleet & Finance Hub</h4>
        <p className="text-xs text-slate-400 mt-1 text-center">Optimizing driver coordinates & insurance clearing</p>
        <div className="mt-4 flex items-center gap-4 text-xs font-mono text-teal-400 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-teal-900/40">
          <span>ETA: Route A</span>
          <span>•</span>
          <span>Insurance: Pre-Apprv</span>
        </div>
      </div>
    )
  }
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSector, setActiveSector] = useState('agriculture');
  const [activeProblem, setActiveProblem] = useState('disconnected');
  
  // Cross-Sector Supply Chain Simulator States
  const [bagsCount, setBagsCount] = useState(100);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSuccess, setSimulationSuccess] = useState(false);

  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);
  
  const [globalChatOpen, setGlobalChatOpen] = useState(false);
  const [globalMessages, setGlobalMessages] = useState([
    {
      id: 'welcome-global',
      text: "Hello! I am the Trisector AI Master Coordinator. You can ask me general questions about the platform or query any specific sector (Agriculture, Industry, Services). How can I assist you?",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [globalInputValue, setGlobalInputValue] = useState('');
  const [globalIsTyping, setGlobalIsTyping] = useState(false);
  const [globalChatSector, setGlobalChatSector] = useState('general');

  const chatEndRef = useRef(null);
  const globalChatEndRef = useRef(null);

  // Default fallback data for offline mode
  const fallbackData = {
    agriculture: {
      sector: 'agriculture',
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
    },
    industry: {
      sector: 'industry',
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
    },
    service: {
      sector: 'service',
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
    }
  };

  // Fetch Dashboard data from Express Server
  const fetchDashboardData = async (sector) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/predictions/${sector}`);
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        setDashboardData(fallbackData[sector]);
      }
    } catch (error) {
      console.warn("Backend server not reachable. Using mock client-side dashboard telemetry.");
      setDashboardData(fallbackData[sector]);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger data fetch when sector changes
  useEffect(() => {
    fetchDashboardData(activeSector);
    // Initialize sector specific greetings
    setChatMessages([
      {
        id: 'welcome',
        text: getWelcomeMessage(activeSector),
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [activeSector]);

  // Scroll Chat to Bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  // Scroll Global Chat to Bottom
  useEffect(() => {
    globalChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [globalMessages, globalIsTyping, globalChatOpen]);

  // Global Chatboard Send Message Handler
  const handleSendGlobalMessage = async (textToSend) => {
    const text = textToSend || globalInputValue;
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setGlobalMessages(prev => [...prev, userMessage]);
    if (!textToSend) setGlobalInputValue('');
    setGlobalIsTyping(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sector: globalChatSector })
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: data.reply,
          sender: 'ai',
          timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setGlobalMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('API Error');
      }
    } catch (error) {
      setTimeout(() => {
        const replyText = simulateLocalChatResponse(text, globalChatSector);
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: replyText,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setGlobalMessages(prev => [...prev, aiMessage]);
      }, 800);
    } finally {
      setGlobalIsTyping(false);
    }
  };

  // Scroll Reveal Observer for page animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Wait a brief tick for the DOM to settle
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal-item').forEach((el) => observer.observe(el));
    }, 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const getWelcomeMessage = (sector) => {
    if (sector === 'agriculture') return "Hi! I am your Agriculture AI Agent. Ask me about crop health parameters, yield predictions, or real-time market prices.";
    if (sector === 'industry') return "Hello. I am your Industrial IoT AI Agent. Ask me about supplier delivery logistics, lead times, or warehouse storage capacity.";
    return "Welcome. I am your Service Operations AI Agent. Ask me about dynamic transport route recommendations or commercial loan & insurance eligibility schemes.";
  };

  // Handle message submit to backend
  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sector: activeSector })
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: data.reply,
          sender: 'ai',
          timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('API Error');
      }
    } catch (error) {
      // Offline fallback simulator
      setTimeout(() => {
        const replyText = simulateLocalChatResponse(text, activeSector);
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: replyText,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, aiMessage]);
      }, 800);
    } finally {
      setIsTyping(false);
    }
  };

  const simulateLocalChatResponse = (msg, sector) => {
    const text = msg.toLowerCase();
    if (sector === 'agriculture') {
      if (text.includes('health') || text.includes('crop') || text.includes('condition')) {
        return "Crop scan reports optimal vegetative health indices at 94.8%. Photosynthetic rates are elevated. No active blight or pest interventions are required.";
      }
      if (text.includes('price') || text.includes('market') || text.includes('cost')) {
        return "Real-time crop market index reads $385 / Ton, representing a +2.4% daily lift. Predictive models suggest holding release of siloed stock until peak resistance next Tuesday.";
      }
      return "Agriculture telemetry scan complete. Yield forecast is holding strong at 108.4% with optimal sensor bounds across all active fields.";
    }
    if (sector === 'industry') {
      if (text.includes('supplier') || text.includes('delivery') || text.includes('lead')) {
        return "Logistics router reports supplier delivery performance is at 98.2% on-time. Incoming container fleet from Section A is flagged for early arrival in 42 minutes.";
      }
      if (text.includes('storage') || text.includes('capacity') || text.includes('warehouse')) {
        return "Warehouse sensor grid logs total storage utilization at 74.6% capacity. Thermal telemetry shows storage temperature constant at 18.5°C.";
      }
      return "Industrial telemetry scan complete. Logistics, storage capacity utilization, and supplier lead indices are operating within nominal bounds.";
    }
    if (text.includes('transport') || text.includes('route') || text.includes('fleet') || text.includes('dispatch')) {
      return "Dynamic transport router advises switching active delivery dispatches to Route A, bypassing high-density congestion on Route B and saving 18 minutes.";
    }
    if (text.includes('loan') || text.includes('insurance') || text.includes('claim') || text.includes('financial')) {
      return "Credit scoring algorithms have pre-approved Commercial Insurance Plan B with an optimized interest rate of 4.2% and a match confidence rating of 95.8%.";
    }
    return "Service Operations are running stably. Fleet dispatch parameters are optimized and client commercial financial matching rates are nominal.";
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      if (response.ok) {
        setContactSuccess(true);
      } else {
        throw new Error('Contact API failed');
      }
    } catch (err) {
      console.warn('Backend contact route failed. Simulating local submission.');
      setContactSuccess(true);
    } finally {
      setTimeout(() => {
        setContactForm({ name: '', email: '', message: '' });
        setContactSuccess(false);
      }, 3000);
    }
  };

  // Quick Chat Suggested Queries
  const getSuggestedQueries = (sector) => {
    if (sector === 'agriculture') {
      return ["Check Crop Health Index", "Review Crop Market Price", "Run Crop Yield Predictor"];
    }
    if (sector === 'industry') {
      return ["Check Supplier Lead Time", "Verify Storage Capacity", "Analyze Inbound Logistics"];
    }
    return ["Check Transport Route Optimization", "Compare Loan & Insurance Offers", "Review Fleet Delivery Status"];
  };

  return (
    <div className="min-h-screen bg-[#060913] bg-gradient-to-b from-[#060913] via-[#0D1525] to-[#080C16] text-slate-200 antialiased selection:bg-brand-blue-500/30 selection:text-brand-blue-400 relative overflow-x-hidden">
      
      {/* Background Graphic Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-brand-blue-500/20 to-brand-green-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-spin-slow"></div>
      <div className="absolute top-[40%] right-[-10%] w-[45%] h-[45%] bg-gradient-to-bl from-brand-green-500/10 to-brand-blue-500/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-spin-slow [animation-duration:40s]"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-gradient-to-t from-brand-blue-500/10 to-brand-green-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-spin-slow [animation-duration:35s]"></div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <LogoIcon className="w-9 h-9 glow-shadow-blue" />
            <div>
              <span className="font-bold text-lg tracking-tight text-white font-display">Trisector <span className="bg-gradient-to-r from-brand-blue-400 to-brand-green-400 bg-clip-text text-transparent">AI</span></span>
              <p className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold">Innovation Platform</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#problem" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Problem</a>
            <a href="#solution" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Our Solution</a>
            <a href="#sectors" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Sectors</a>
            <a href="#dashboard" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Dashboard Preview</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="#dashboard" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue-500 to-brand-green-500 text-white text-sm font-bold shadow-md hover:shadow-lg hover:shadow-brand-blue-500/20 transition-all hover:scale-[1.02] duration-200">
              Launch Console
            </a>
          </div>

          {/* Mobile Menu Btn */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 md:hidden transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-b border-white/5 absolute top-18 left-0 right-0 py-6 px-6 flex flex-col gap-4 animate-fade-in-up">
            <a href="#problem" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-200">Problem</a>
            <a href="#solution" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-200">Our Solution</a>
            <a href="#sectors" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-200">Sectors</a>
            <a href="#dashboard" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-200">Dashboard Preview</a>
            <a href="#dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-brand-blue-500 to-brand-green-500 text-white font-bold shadow-md">
              Launch Console
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-7 flex flex-col gap-6 text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-950/40 border border-brand-blue-900/60 text-brand-blue-400 font-semibold text-xs uppercase tracking-wider self-start glow-shadow-blue">
              <Sparkles size={14} className="text-brand-green-400" /> Hackathon Showcase v1.0
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-display">
              One AI Platform.<br />
              <span className="bg-gradient-to-r from-brand-blue-400 via-brand-blue-300 to-brand-green-400 bg-clip-text text-transparent glow-blue">
                Three Sectors.
              </span><br />
              Smarter Decisions.
            </h1>
            
            <p className="text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Trisector AI connects three key sectors—Agriculture, Industry, and Services—under one smart engine. Optimize crop yields, prevent factory machine failures, and speed up customer support in real-time.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2">
              <a href="#dashboard" className="px-7 py-4 rounded-xl bg-gradient-to-r from-brand-blue-500 to-brand-green-500 text-white font-bold shadow-lg hover:shadow-xl hover:shadow-brand-blue-500/20 transition-all hover:scale-[1.03] duration-200 text-center flex items-center justify-center gap-2">
                Explore Live Console <ArrowRight size={16} />
              </a>
              <a href="#sectors" className="px-7 py-4 rounded-xl border border-slate-700 text-slate-300 font-semibold bg-white/5 hover:bg-white/10 transition-all text-center">
                Review Sector Frameworks
              </a>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5 mt-4">
              <div>
                <span className="block text-2xl lg:text-3xl font-bold text-white font-display">94.8%</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Agri Yield Index</span>
              </div>
              <div>
                <span className="block text-2xl lg:text-3xl font-bold text-white font-display">&lt; 76s</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Service SLA Time</span>
              </div>
              <div>
                <span className="block text-2xl lg:text-3xl font-bold text-white font-display">87.4%</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Industrial OEE Avg</span>
              </div>
            </div>
          </div>

          {/* Interactive Hero Widget Preview */}
          <div className="md:col-span-5 relative w-full h-[400px] flex items-center justify-center animate-float">
            <div className="absolute w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-brand-blue-500 to-brand-green-500 opacity-10 blur-[65px]"></div>
            
            {/* Main Interactive Floating Glass Cards */}
            <div className="relative glass-card w-full max-w-[360px] p-6 rounded-2xl border border-white/5 bg-[#0F172A]/40 shadow-2xl flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue-500 flex items-center justify-center text-white">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white font-display">Trisector Master Node</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">Model Status: Active</p>
                  </div>
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-brand-green-400 animate-ping"></div>
              </div>

              <div className="h-px bg-white/5"></div>

              {/* Sector Telemetry Feeds */}
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 hover:bg-slate-900/80 border border-white/5 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Sprout size={16} className="text-brand-green-400" />
                    <span className="text-xs font-semibold text-slate-300">Agriculture Telemetry</span>
                  </div>
                  <span className="text-xs font-bold text-brand-green-400 bg-brand-green-950/40 px-2 py-0.5 rounded-full">94.8%</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 hover:bg-slate-900/80 border border-white/5 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Activity size={16} className="text-brand-blue-400" />
                    <span className="text-xs font-semibold text-slate-300">Industrial Bearing Core</span>
                  </div>
                  <span className="text-xs font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded-full">Warning</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 hover:bg-slate-900/80 border border-white/5 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Layers size={16} className="text-brand-blue-400" />
                    <span className="text-xs font-semibold text-slate-300">Service Queue Router</span>
                  </div>
                  <span className="text-xs font-bold text-brand-blue-400 bg-brand-blue-950/40 px-2 py-0.5 rounded-full">76s SLA</span>
                </div>
              </div>

              <div className="h-px bg-white/5"></div>

              <div className="flex items-center gap-2 text-xs text-brand-blue-400 font-semibold bg-brand-blue-950/40 p-2.5 rounded-xl border border-brand-blue-900/30">
                <Sparkles size={14} className="text-brand-green-400 shrink-0" />
                <span>AI recommendation: Calibrate Motor B4</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section id="problem" className="py-24 bg-transparent relative reveal-item">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue-400">The Problem</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
              Fragmented Tools Lead to Operational Blindspots
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Standard businesses operating across multiple sectors face extreme fragmentation. Separate dashboards for field operations, hardware telemetry, and logistics support delay intelligence sharing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div 
              onClick={() => setActiveProblem('disconnected')}
              className={`p-8 rounded-2xl glass-card cursor-pointer transition-all duration-300 hover:scale-[1.02] text-left ${
                activeProblem === 'disconnected' 
                  ? 'border-brand-blue-500/50 bg-slate-900/60 shadow-[0_0_20px_rgba(2,132,199,0.15)] ring-1 ring-brand-blue-500/20' 
                  : 'border-white/5 bg-transparent'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-red-950/50 text-red-400 border border-red-900/50 flex items-center justify-center mb-6">
                <TrendingDown size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-display">Disconnected Systems</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Information is scattered across different apps. Farming data, factory alerts, and customer support never talk to each other, making it hard to see the big picture.
              </p>
            </div>

            {/* Card 2 */}
            <div 
              onClick={() => setActiveProblem('slow')}
              className={`p-8 rounded-2xl glass-card cursor-pointer transition-all duration-300 hover:scale-[1.02] text-left ${
                activeProblem === 'slow' 
                  ? 'border-amber-500/50 bg-slate-900/60 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/20' 
                  : 'border-white/5 bg-transparent'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-950/50 text-amber-400 border border-amber-900/50 flex items-center justify-center mb-6">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-display">Too Slow to React</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Issues are only noticed after things break. Crops dry out, factory motors fail unexpectedly, and support queues back up before anyone takes action.
              </p>
            </div>

            {/* Card 3 */}
            <div 
              onClick={() => setActiveProblem('wasted')}
              className={`p-8 rounded-2xl glass-card cursor-pointer transition-all duration-300 hover:scale-[1.02] text-left ${
                activeProblem === 'wasted' 
                  ? 'border-orange-500/50 bg-slate-900/60 shadow-[0_0_20px_rgba(249,115,22,0.15)] ring-1 ring-orange-500/20' 
                  : 'border-white/5 bg-transparent'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-orange-950/50 text-orange-400 border border-orange-900/50 flex items-center justify-center mb-6">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-display">Wasted Time & Money</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Inefficient planning leads to high costs. Over-watering fields, running heavy machines during peak electricity rate hours, and staff sitting idle.
              </p>
            </div>
          </div>

          {/* Interactive Problem Visual Representation Display */}
          <div className="mt-12 p-8 rounded-2xl border border-slate-800 bg-slate-950/40 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 animate-fade-in-up">
            <div className="flex-1 text-left flex flex-col gap-3">
              <span className="text-xs uppercase font-mono tracking-widest text-slate-500 font-bold">Selected Operational Bottleneck</span>
              <h4 className="text-lg font-bold text-white font-display">
                {activeProblem === 'disconnected' && "Disconnected Systems Anatomy"}
                {activeProblem === 'slow' && "Critical Action Lag Timeline"}
                {activeProblem === 'wasted' && "Resource Waste & Financial Leak Index"}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {activeProblem === 'disconnected' && "Isolated system databases create high barriers for cross-sector intelligence. Crop alerts from farm sensors and structural load metrics from factory floors remain siloed from dispatch managers, resulting in blind actions."}
                {activeProblem === 'slow' && "Without proactive ML prediction routing, warning signs of motor fatigue or crop dehydration take hours to route manually. By the time a ticket is opened, machinery has failed, causing severe operational disruptions."}
                {activeProblem === 'wasted' && "Lack of coordinated resource scheduling drains capital. Powering heavy extruder motors during peak utility rate hours or leaking water yields spikes daily utility costs, cutting operational margins."}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-red-950/40 text-red-400 border border-red-900/40">Status: Unoptimized</span>
                <span className="text-[10px] text-slate-500 font-semibold">• Click other options to compare</span>
              </div>
            </div>

            <div className="w-full md:w-auto shrink-0 flex justify-center">
              {activeProblem === 'disconnected' && (
                <svg viewBox="0 0 400 200" className="w-[320px] sm:w-[360px] h-auto border border-slate-800 rounded-xl bg-slate-950 p-2 shadow-inner" fill="none">
                  {/* Agri Node */}
                  <rect x="20" y="20" width="100" height="40" rx="10" fill="#0A101D" stroke="#10b981" strokeWidth="1.5" />
                  <text x="32" y="44" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="monospace">🌱 AGRI FEED</text>
                  <circle cx="120" cy="40" r="4" fill="#10b981" />

                  {/* Industry Node */}
                  <rect x="20" y="80" width="100" height="40" rx="10" fill="#0A101D" stroke="#0284c7" strokeWidth="1.5" />
                  <text x="32" y="104" fill="#0284c7" fontSize="10" fontWeight="bold" fontFamily="monospace">⚙️ IND FEED</text>
                  <circle cx="120" cy="100" r="4" fill="#0284c7" />

                  {/* Service Node */}
                  <rect x="20" y="140" width="100" height="40" rx="10" fill="#0A101D" stroke="#06b6d4" strokeWidth="1.5" />
                  <text x="32" y="164" fill="#06b6d4" fontSize="10" fontWeight="bold" fontFamily="monospace">👥 SRV FEED</text>
                  <circle cx="120" cy="160" r="4" fill="#06b6d4" />

                  {/* Data paths (broken) */}
                  <path d="M120 40 H200" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M120 100 H200" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M120 160 H200" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" />

                  {/* Barrier/Wall */}
                  <line x1="220" y1="10" x2="220" y2="190" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                  <rect x="205" y="85" width="30" height="30" rx="6" fill="#f43f5e" />
                  <text x="217" y="105" fill="#fff" fontSize="14" fontWeight="bold">!</text>

                  {/* Target (Disconnected Unified DB) */}
                  <rect x="260" y="70" width="120" height="60" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
                  <text x="278" y="96" fill="#64748b" fontSize="10" fontWeight="bold">UNIFIED CORE</text>
                  <text x="282" y="112" fill="#f43f5e" fontSize="9" fontWeight="bold">❌ OFFLINE</text>
                </svg>
              )}

              {activeProblem === 'slow' && (
                <svg viewBox="0 0 400 200" className="w-[320px] sm:w-[360px] h-auto border border-slate-800 rounded-xl bg-slate-950 p-2 shadow-inner" fill="none">
                  {/* Alarm status panel */}
                  <rect x="20" y="20" width="180" height="160" rx="16" fill="#0A101D" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="32" y="50" fill="#f59e0b" fontSize="10" fontWeight="bold">CRITICAL WARNING</text>
                  
                  {/* Time Lag indicator */}
                  <circle cx="110" cy="110" r="40" stroke="#334155" strokeWidth="4" />
                  <circle cx="110" cy="110" r="40" stroke="#f59e0b" strokeWidth="4" strokeDasharray="180 250" />
                  <text x="96" y="114" fill="#f59e0b" fontSize="12" fontWeight="bold" fontFamily="monospace">4.2h</text>
                  <text x="50" y="170" fill="#64748b" fontSize="8" fontWeight="semibold">ALERT NOTIFICATION LAG</text>

                  {/* Incident Trigger */}
                  <g transform="translate(230, 40)">
                    <rect x="0" y="0" width="140" height="120" rx="12" fill="#0F172A" stroke="#f43f5e" strokeWidth="1.5" />
                    <circle cx="70" cy="45" r="20" fill="#f43f5e" fillOpacity="0.2" />
                    <path d="M70 35 V48 M70 54 H70.01" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
                    <text x="25" y="85" fill="#f43f5e" fontSize="10" fontWeight="bold">Motor Overheated</text>
                    <text x="32" y="100" fill="#64748b" fontSize="9">Damage: Critical</text>
                  </g>
                </svg>
              )}

              {activeProblem === 'wasted' && (
                <svg viewBox="0 0 400 200" className="w-[320px] sm:w-[360px] h-auto border border-slate-800 rounded-xl bg-slate-950 p-2 shadow-inner" fill="none">
                  {/* Budget Leak graph */}
                  <rect x="20" y="20" width="360" height="160" rx="16" fill="#0A101D" stroke="#f97316" strokeWidth="1.5" />
                  <text x="30" y="45" fill="#f97316" fontSize="9" fontWeight="bold">RESOURCE LOSS / DAILY OVERHEAD</text>

                  {/* Loss trend curve */}
                  <path d="M50 140 Q 150 100, 250 150 T 350 80" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                  <path d="M50 140 Q 150 100, 250 150 T 350 80 V 160 H 50 Z" fill="url(#orangeGrad)" fillOpacity="0.1" />
                  
                  <defs>
                    <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Waste items annotations */}
                  <g transform="translate(60, 70)">
                    <rect x="0" y="0" width="90" height="24" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                    <text x="8" y="15" fill="#e2e8f0" fontSize="8">💦 Water Waste</text>
                  </g>
                  
                  <g transform="translate(160, 115)">
                    <rect x="0" y="0" width="90" height="24" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                    <text x="8" y="15" fill="#e2e8f0" fontSize="8">⚡ Peak Surcharges</text>
                  </g>

                  <g transform="translate(250, 50)">
                    <rect x="0" y="0" width="105" height="24" rx="6" fill="#f97316" fillOpacity="0.15" stroke="#f97316" strokeWidth="1" />
                    <text x="8" y="15" fill="#f97316" fontSize="8" fontWeight="bold">💸 $1,240 Lost/Day</text>
                  </g>

                  {/* Axis grid */}
                  <line x1="50" y1="160" x2="350" y2="160" stroke="#334155" strokeWidth="1.5" />
                  <line x1="50" y1="40" x2="50" y2="160" stroke="#334155" strokeWidth="1.5" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section id="solution" className="py-24 relative overflow-hidden reveal-item">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            
            {/* Image/Visual Mock of Core Architecture */}
            <div className="md:col-span-5 order-2 md:order-1 flex justify-center">
              <div className="relative glass-card p-6 w-full max-w-[400px] rounded-2xl border border-white/5 bg-[#0F172A]/40 shadow-2xl flex flex-col gap-6">
                <div className="inline-flex px-3 py-1 rounded-full bg-brand-green-950/40 border border-brand-green-900/30 text-brand-green-400 text-xs font-semibold uppercase tracking-wider self-start">
                  Trisector Unified Core
                </div>
                
                {/* Core flow diagram mock */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-brand-blue-500 text-white shadow-md">
                    <Database size={18} />
                    <div className="text-left">
                      <h4 className="text-xs font-bold uppercase tracking-wider">Multi-Stream Data Ingestion</h4>
                      <p className="text-[10px] opacity-80">IoT + Soil Metrics + Support Logs</p>
                    </div>
                  </div>

                  <div className="flex justify-center my-[-8px]">
                    <div className="h-6 w-0.5 bg-gradient-to-b from-brand-blue-500 to-brand-green-500"></div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-white/5 text-slate-200 shadow-sm">
                    <Cpu size={18} className="text-brand-green-400" />
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">DeepML Prediction Router</h4>
                      <p className="text-[10px] text-slate-400">Auto-routes tasks to sector specific nodes</p>
                    </div>
                  </div>

                  <div className="flex justify-center my-[-8px]">
                    <div className="h-6 w-0.5 bg-gradient-to-b from-brand-green-500 to-brand-blue-500"></div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-tr from-brand-blue-500 to-brand-green-500 text-white shadow-md">
                    <Sparkles size={18} />
                    <div className="text-left">
                      <h4 className="text-xs font-bold uppercase tracking-wider">Real-time Sector Console</h4>
                      <p className="text-[10px] opacity-80">Unified control dashboards</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text description */}
            <div className="md:col-span-7 order-1 md:order-2 flex flex-col gap-6 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-green-400">The Solution</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
                Three Specialized Sectors. One Intelligent Engine.
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Trisector AI replaces separate, slow tools with a single smart control room. By reading sensors from your fields, factories, and support teams, the platform automatically recommends the best steps to keep operations running smoothly.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-green-950/40 flex items-center justify-center text-brand-green-400 border border-brand-green-900/50 shrink-0 mt-0.5">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base font-display">Instant Warning Alerts</h4>
                    <p className="text-sm text-slate-400">Immediately notifies your team when fields dry out, machinery runs too hot, or support queues back up.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-blue-950/40 flex items-center justify-center text-brand-blue-400 border border-brand-blue-900/50 shrink-0 mt-0.5">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base font-display">Unified AI Chatbot</h4>
                    <p className="text-sm text-slate-400">An easy-to-use virtual assistant ready to answer questions about crop soil, factory gears, or customer support.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-green-950/40 flex items-center justify-center text-brand-green-400 border border-brand-green-900/50 shrink-0 mt-0.5">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base font-display">Cost & Resource Savings</h4>
                    <p className="text-sm text-slate-400">Calculates power rates to run factory machines when electricity is cheap, and plans support staff schedules in advance.</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Sector AI Features Section */}
      <section id="sectors" className="py-24 relative reveal-item">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-4 mb-20">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green-400">Core Features</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
              Tailored Sector Features
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              See how our smart AI helps each industry grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Agriculture Card */}
            <div className="p-8 rounded-2xl glass-card border border-white/5 flex flex-col gap-6 text-left">
              <div className="w-14 h-14 rounded-2xl bg-brand-green-950/40 border border-brand-green-900/30 flex items-center justify-center text-brand-green-400 shadow-sm">
                <Sprout size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 font-display">Agriculture AI</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Smart farming analytics focused on growing healthier crops and saving water.
                </p>
              </div>
              <ul className="flex flex-col gap-3 text-slate-300 text-sm font-medium">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-green-400 shrink-0" /> Soil Moisture Monitoring
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-green-400 shrink-0" /> Drone Crop Health Scans
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-green-400 shrink-0" /> Smart Fertilizer Schedules
                </li>
              </ul>
            </div>

            {/* Industrial Card */}
            <div className="p-8 rounded-2xl glass-card border border-white/5 flex flex-col gap-6 text-left">
              <div className="w-14 h-14 rounded-2xl bg-brand-blue-950/40 border border-brand-blue-900/30 flex items-center justify-center text-brand-blue-400 shadow-sm">
                <Activity size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 font-display">Industrial AI</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Predictive machine maintenance and smart energy managers to keep production lines running.
                </p>
              </div>
              <ul className="flex flex-col gap-3 text-slate-300 text-sm font-medium">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-blue-400 shrink-0" /> Machine Anomaly Sensors
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-blue-400 shrink-0" /> Smart Energy Load Saver
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-blue-400 shrink-0" /> AI Product Quality Checks
                </li>
              </ul>
            </div>

            {/* Services Card */}
            <div className="p-8 rounded-2xl glass-card border border-white/5 flex flex-col gap-6 text-left">
              <div className="w-14 h-14 rounded-2xl bg-brand-blue-950/40 border border-brand-blue-900/30 flex items-center justify-center text-brand-blue-400 shadow-sm">
                <Layers size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 font-display">Services AI</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Customer service automation to speed up response times and track user satisfaction.
                </p>
              </div>
              <ul className="flex flex-col gap-3 text-slate-300 text-sm font-medium">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-blue-400 shrink-0" /> Customer Mood Analysis
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-blue-400 shrink-0" /> Smart Support Ticket Routing
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-blue-400 shrink-0" /> Early Churn Risk Warnings
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Dashboard Preview Section */}
      <section id="dashboard" className="py-24 bg-transparent relative reveal-item">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue-400">Live Simulation</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
              Unified Trisector Console Preview
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Experience the real-time responsive dashboard directly. Switch sectors to query metrics, view sensor chart trends, and chat with the specialized AI chatbot.
            </p>

            {/* Sector Tabs Switcher */}
            <div className="flex justify-center mt-6">
              <div className="inline-flex p-1.5 rounded-2xl bg-slate-950/60 border border-slate-800 shadow-inner">
                <button
                  onClick={() => setActiveSector('agriculture')}
                  className={`px-6 py-3 rounded-xl text-sm font-bold tracking-tight transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    activeSector === 'agriculture'
                      ? 'bg-slate-900/80 text-brand-green-400 shadow border border-slate-800 scale-[1.02]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sprout size={16} /> Agriculture AI
                </button>
                <button
                  onClick={() => setActiveSector('industry')}
                  className={`px-6 py-3 rounded-xl text-sm font-bold tracking-tight transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    activeSector === 'industry'
                      ? 'bg-slate-900/80 text-brand-blue-400 shadow border border-slate-800 scale-[1.02]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Activity size={16} /> Industrial IoT
                </button>
                <button
                  onClick={() => setActiveSector('service')}
                  className={`px-6 py-3 rounded-xl text-sm font-bold tracking-tight transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    activeSector === 'service'
                      ? 'bg-slate-900/80 text-brand-blue-400 shadow border border-slate-800 scale-[1.02]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers size={16} /> Services Ops
                </button>
              </div>
            </div>
          </div>

          {/* Main Dashboard Widget Container */}
          <div className="rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden bg-[#0A0D16]/90 flex flex-col min-h-[680px]">
            {/* Console Header Bar */}
            <div className="px-8 py-5 border-b border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                  isLoading ? 'bg-slate-400' : dashboardData?.status === 'optimal' ? 'bg-brand-green-500 pulse-green' : 'bg-amber-500 pulse-amber'
                }`}></div>
                <div>
                  <h3 className="font-bold text-lg text-white font-display flex items-center gap-2 uppercase tracking-tight">
                    {activeSector} Node Console
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">Telemetry status: {
                    isLoading ? 'Loading Feed...' : dashboardData?.status === 'optimal' ? 'Systems Nominal (No anomalies)' : 'Active warnings detected'
                  }</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 self-end sm:self-center">
                <span className="text-xs text-slate-400 font-bold bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg">
                  Last Sync: {dashboardData?.timestamp || 'Syncing...'}
                </span>
                <span className="text-xs font-bold text-brand-blue-400 bg-brand-blue-950/40 px-3 py-1.5 rounded-lg border border-brand-blue-900/40">
                  Health Index: {dashboardData?.healthIndex || '0.0'}%
                </span>
              </div>
            </div>

            {/* Dashboard Workspace */}
            <div key={activeSector} className="p-8 flex-1 grid lg:grid-cols-12 gap-8 items-start animate-fade-in-up">
              
              {/* Telemetry Metrics and Chart Column */}
              <div className="lg:col-span-8 flex flex-col gap-8 w-full">
                
                {/* 4 Cards Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {isLoading ? (
                    Array(4).fill(0).map((_, idx) => (
                      <div key={idx} className="h-28 rounded-2xl bg-slate-900/40 animate-pulse border border-slate-800"></div>
                    ))
                  ) : (
                    dashboardData?.metrics.map((metric, idx) => (
                      <div key={idx} className="p-5 rounded-2xl glass-card border border-slate-800/80 hover:shadow-md flex flex-col justify-between h-28 relative overflow-hidden group">
                        {/* Glowing hover bottom bar */}
                        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
                          metric.status === 'warning' ? 'from-red-500 to-amber-500' : 'from-brand-blue-500 to-brand-green-500'
                        } opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-400 tracking-tight">{metric.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            metric.status === 'warning' ? 'bg-red-950/40 border border-red-900/30 text-red-400' : metric.status === 'elevated' ? 'bg-amber-950/40 border border-amber-900/30 text-amber-400' : 'bg-brand-green-950/40 border border-brand-green-900/30 text-brand-green-400'
                          }`}>
                            {metric.delta}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-xl font-bold text-white font-display">{metric.value}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Live Anomaly Warnings (if any) */}
                {!isLoading && dashboardData?.anomalies && dashboardData.anomalies.length > 0 && (
                  <div className="p-4 rounded-xl border border-red-900/50 bg-red-950/30 text-red-400 flex items-center gap-3 text-sm animate-fade-in-up">
                    <AlertTriangle size={18} className="shrink-0 animate-bounce" />
                    <span className="font-semibold">{dashboardData.anomalies[0].message}</span>
                  </div>
                )}

                {/* Graph Card */}
                <div className="p-6 rounded-2xl glass-card border border-slate-800/80 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-white uppercase tracking-wider font-display">Real-Time Sensor Influx Trend</h4>
                    <span className="inline-flex items-center gap-1.5 text-xs text-brand-blue-400 font-semibold bg-brand-blue-950/40 border border-brand-blue-900/30 px-2 py-1 rounded">
                      <TrendingUp size={12} /> Hourly telemetry logs
                    </span>
                  </div>

                  <div className="h-[280px] w-full">
                    {isLoading ? (
                      <div className="w-full h-full bg-slate-900/30 animate-pulse rounded-xl flex items-center justify-center text-slate-400 text-sm">Loading Chart...</div>
                    ) : activeSector === 'agriculture' ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dashboardData?.chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0284c7" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="time" stroke="#475569" fontSize={11} />
                          <YAxis yAxisId="left" stroke="#10b981" fontSize={11} domain={[85, 100]} />
                          <YAxis yAxisId="right" orientation="right" stroke="#0284c7" fontSize={11} domain={[360, 395]} />
                          <Tooltip contentStyle={{ background: '#0f172a', borderRadius: '12px', border: '1px solid #334155', color: '#fff' }} />
                          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                          <Area yAxisId="left" type="monotone" dataKey="cropHealth" name="Crop Health Index %" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorHealth)" />
                          <Area yAxisId="right" type="monotone" dataKey="marketPrice" name="Market Price ($/Ton)" stroke="#0284c7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPrice)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : activeSector === 'industry' ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dashboardData?.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorSupplier" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0284c7" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorStorage" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="time" stroke="#475569" fontSize={11} />
                          <YAxis stroke="#475569" fontSize={11} domain={[50, 100]} />
                          <Tooltip contentStyle={{ background: '#0f172a', borderRadius: '12px', border: '1px solid #334155', color: '#fff' }} />
                          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                          <Area type="monotone" dataKey="supplierReliability" name="Supplier Reliability %" stroke="#0284c7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSupplier)" />
                          <Area type="monotone" dataKey="storageCapacity" name="Storage Capacity %" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorStorage)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dashboardData?.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorTransport" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0284c7" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorInsurance" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="time" stroke="#475569" fontSize={11} />
                          <YAxis stroke="#475569" fontSize={11} domain={[70, 100]} />
                          <Tooltip contentStyle={{ background: '#0f172a', borderRadius: '12px', border: '1px solid #334155', color: '#fff' }} />
                          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                          <Area type="monotone" dataKey="transportEfficiency" name="Transport Efficiency %" stroke="#0284c7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTransport)" />
                          <Area type="monotone" dataKey="insuranceApproveRate" name="Insurance Match Score %" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorInsurance)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>

              </div>

              {/* AI Assistant Chatbot Column */}
              <div className="lg:col-span-4 w-full h-[516px] rounded-2xl border border-slate-800/80 shadow-sm bg-[#0E1626]/70 overflow-hidden flex flex-col">
                {/* Chatbot Header */}
                <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-blue-500 to-brand-green-500 flex items-center justify-center text-white">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white font-display">Sector AI Assistant</h4>
                      <p className="text-[10px] text-brand-green-400 font-semibold uppercase tracking-wider">Node Copilot Active</p>
                    </div>
                  </div>
                </div>

                {/* Messages Body */}
                <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 bg-slate-900/10">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col max-w-[85%] ${
                        msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                      }`}
                    >
                      <div className={`p-3.5 rounded-2xl text-xs leading-relaxed font-medium ${
                        msg.sender === 'user'
                          ? 'bg-brand-blue-600 text-white rounded-tr-none'
                          : 'bg-slate-900/60 text-slate-100 rounded-tl-none border border-slate-800'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 font-semibold">{msg.timestamp}</span>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="self-start flex flex-col gap-1 items-start max-w-[80%]">
                      <div className="px-4 py-3 bg-slate-900/60 rounded-2xl rounded-tl-none border border-slate-800 flex items-center gap-1">
                        <div className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Suggested Queries Chips */}
                <div className="px-6 py-2 border-t border-slate-800/80 flex flex-wrap gap-1.5 bg-slate-950/40">
                  {getSuggestedQueries(activeSector).map((chipText, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(chipText)}
                      className="text-[10px] font-bold text-brand-blue-400 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-2 py-1 rounded-md transition-colors text-left cursor-pointer"
                    >
                      {chipText}
                    </button>
                  ))}
                </div>

                {/* Chat input form */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-4 border-t border-slate-800 bg-[#0E1626]/80 flex gap-2 items-center"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={`Query the ${activeSector} AI...`}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-brand-blue-500 text-xs text-white bg-slate-950/50"
                  />
                  <button
                    type="submit"
                    className="p-3 rounded-xl bg-gradient-to-r from-brand-blue-500 to-brand-green-500 text-white shadow hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <Send size={14} />
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Supply Chain Synergy Simulator Section */}
      <section className="py-24 bg-transparent border-t border-slate-900/60 relative overflow-hidden reveal-item">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green-400">Platform Synergy</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
              Unified Supply Chain Simulator
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Experience the end-to-end synergy: A single listing submitted by a **Farmer** instantly updates storage logs for the **Rice Mill** and matches dispatch routes and insurance for the **Fleet**.
            </p>
          </div>

          <div className="max-w-5xl mx-auto rounded-3xl border border-slate-800/80 bg-[#0A0D16]/95 overflow-hidden shadow-2xl p-8 grid lg:grid-cols-12 gap-8 items-start relative">
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-brand-green-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Configurator Column */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left w-full">
              
              {/* Step 1: Agriculture */}
              <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E1626]/40 flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/50 border border-emerald-900/30 text-emerald-400 flex items-center justify-center">
                    <Sprout size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm font-display uppercase tracking-wide">1. Agriculture Input (Farmer)</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">Crop Listing Ingress</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-semibold">Bags of Paddy Ready:</span>
                    <span className="text-brand-green-400 font-mono font-bold text-sm bg-brand-green-950/40 px-2 py-0.5 rounded border border-brand-green-900/30">{bagsCount} Bags</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="500" 
                    value={bagsCount}
                    onChange={(e) => {
                      setBagsCount(Number(e.target.value));
                      setSimulationSuccess(false);
                    }}
                    className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-brand-green-400"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-bold font-mono">
                    <span>10 BAGS</span>
                    <span>250 BAGS (AVERAGE LOAD)</span>
                    <span>500 BAGS (MAX DISPATCH)</span>
                  </div>
                </div>
              </div>

              {/* Step 2: Industry */}
              <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E1626]/40 flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-950/50 border border-blue-900/30 text-brand-blue-400 flex items-center justify-center">
                    <Activity size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm font-display uppercase tracking-wide">2. Industry Verification (Rice Mill)</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">Storage Capacity & Extrusions</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-2">
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Silo Space Left</span>
                    <span className="text-base font-bold text-white font-mono mt-1">254 Bags Space</span>
                    <p className="text-[9px] text-slate-400 mt-1">Silo #3 holds up to 1000 bags</p>
                  </div>
                  
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Silo Target Match</span>
                    <span className={`text-xs font-bold font-mono mt-1.5 inline-flex items-center gap-1 ${
                      bagsCount <= 254 ? 'text-brand-green-400' : 'text-amber-400'
                    }`}>
                      {bagsCount <= 254 ? '🟢 Nominal (Allocated)' : '⚠️ Overflow (Split Silo)'}
                    </span>
                    <p className="text-[9px] text-slate-400 mt-1">
                      {bagsCount <= 254 
                        ? `Silo #3 handles ${bagsCount} bags comfortably.` 
                        : `Needs auxiliary Silo #4 allocation.`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3: Service */}
              <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E1626]/40 flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-950/50 border border-teal-900/30 text-teal-400 flex items-center justify-center">
                    <Layers size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm font-display uppercase tracking-wide">3. Services Routing (Transport & Finance)</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">Dispatch Logistics & Credit Match</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-2">
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Transport Route</span>
                    <span className="block text-xs font-bold text-teal-400 mt-1">Route A (Optimized)</span>
                    <p className="text-[9px] text-slate-400 mt-1">Avoids I-80 bottle-neck. Saves 18m.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Credit & Insurance Cover</span>
                    <span className="block text-xs font-bold text-white mt-1">Plan B Cover Match</span>
                    <p className="text-[9px] text-slate-400 mt-1">Matches transit crop value (${(bagsCount * 3.85).toFixed(0)} USD)</p>
                  </div>
                </div>
              </div>

              {/* Trigger Button */}
              <button
                disabled={isSimulating}
                onClick={() => {
                  setIsSimulating(true);
                  setSimulationSuccess(false);
                  setTimeout(() => {
                    setIsSimulating(false);
                    setSimulationSuccess(true);
                  }, 2400);
                }}
                className={`w-full py-4 rounded-2xl bg-gradient-to-r from-brand-blue-500 to-brand-green-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-transform hover:scale-[1.01] duration-150 flex items-center justify-center gap-2 cursor-pointer ${
                  isSimulating ? 'opacity-80 cursor-wait' : ''
                }`}
              >
                {isSimulating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Influx Loop...</span>
                  </>
                ) : (
                  <span>Execute Unified Influx Loop</span>
                )}
              </button>

            </div>

            {/* Sandbox Simulation Result Column */}
            <div className="lg:col-span-5 w-full h-full flex flex-col justify-between gap-6">
              
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 flex flex-col gap-6 text-left h-full min-h-[420px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green-500/5 rounded-full blur-2xl pointer-events-none"></div>
                
                <h4 className="font-bold text-xs uppercase font-mono tracking-widest text-slate-500">Synergy Contract Ledger</h4>

                {!isSimulating && !simulationSuccess ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-8">
                    <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                      <Database size={28} />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">Waiting for execution</h5>
                      <p className="text-xs text-slate-400 max-w-[220px] mx-auto mt-1">Configure farmer bag listings and click "Execute Unified Influx Loop" to view cross-sector contract.</p>
                    </div>
                  </div>
                ) : isSimulating ? (
                  <div className="flex-1 flex flex-col justify-center gap-6">
                    <div className="flex items-center gap-3 text-xs text-brand-green-400 font-mono">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-green-400 animate-ping"></div>
                      <span>[AGRI] Ingesting {bagsCount} bags paddy...</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-brand-blue-400 font-mono">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-blue-400 animate-ping [animation-delay:0.3s]"></div>
                      <span>[IND] Verifying storage Silo #3 bounds...</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-teal-400 font-mono">
                      <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping [animation-delay:0.6s]"></div>
                      <span>[SRV] Matching Plan B & dispatching truck B4...</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col gap-5 animate-fade-in-up">
                    <div className="flex items-center gap-2 text-brand-green-400 bg-brand-green-950/40 border border-brand-green-900/30 px-3 py-1.5 rounded-lg self-start text-xs font-bold font-mono">
                      <CheckCircle2 size={14} /> Contract Active
                    </div>
                    
                    <div className="flex flex-col gap-3 font-mono text-xs border-y border-slate-900 py-4">
                      <div className="flex justify-between">
                        <span className="text-slate-500">INGRESS ORIGIN:</span>
                        <span className="text-white font-bold">AGRICULTURE NODE #01</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">CROP LISTING:</span>
                        <span className="text-brand-green-400 font-bold">{bagsCount} Bags (Rice Paddy)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">STORAGE DEPLOYMENT:</span>
                        <span className="text-brand-blue-400 font-bold">
                          {bagsCount <= 254 ? 'Silo #3 (Nominal Ingest)' : 'Silo #3 + Silo #4 (Split)'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">FLEET DISPATCH:</span>
                        <span className="text-teal-400 font-bold">Truck #B4 via Route A</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">TRANSIT COVER PLAN:</span>
                        <span className="text-white font-bold">Insurance Plan B matched</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-900 pt-3">
                        <span className="text-slate-500">TOTAL CONT. VALUE:</span>
                        <span className="text-white font-bold">${(bagsCount * 3.85).toFixed(2)} USD</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex gap-2.5 items-start text-xs leading-relaxed text-slate-300">
                      <Sparkles size={16} className="text-brand-green-400 shrink-0 mt-0.5" />
                      <p>
                        <strong>Synergy Automation:</strong> The database broker has registered the bags listing, allocated storage slot capacity in the rice mill, matched dynamic transit insurance, and queued Route A dispatch coordinates automatically.
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Unified Sector Scenarios Section */}
      <section className="py-24 bg-transparent relative">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue-400">Operational Influx</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
              {sectorScenarios[activeSector]?.title || sectorScenarios.agriculture.title}
            </h2>
            <p className="text-slate-300 text-lg">
              {sectorScenarios[activeSector]?.subtitle || sectorScenarios.agriculture.subtitle}
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* Problem Card (Left) */}
            <div className="lg:col-span-5 p-8 rounded-2xl glass-card border border-red-500/10 flex flex-col gap-6 text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors"></div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${sectorScenarios[activeSector]?.problem.iconBg || sectorScenarios.agriculture.problem.iconBg}`}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display mb-2">{sectorScenarios[activeSector]?.problem.title || sectorScenarios.agriculture.problem.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {sectorScenarios[activeSector]?.problem.description || sectorScenarios.agriculture.problem.description}
                </p>
                <ul className="flex flex-col gap-3">
                  {(sectorScenarios[activeSector]?.problem.items || sectorScenarios.agriculture.problem.items).map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-slate-300">
                      <span className="text-red-400 font-bold shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Visual Node / Image placeholder (Center) */}
            <div className="lg:col-span-2 flex flex-col justify-center items-center">
              <div className="w-full h-full flex flex-col justify-center items-center py-6">
                {sectorScenarios[activeSector]?.visual || sectorScenarios.agriculture.visual}
                <div className="hidden lg:flex flex-col items-center mt-6">
                  <div className="h-10 w-0.5 border-l-2 border-dashed border-slate-700"></div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold mt-2">Active Link</span>
                </div>
              </div>
            </div>

            {/* Solution Card (Right) */}
            <div className="lg:col-span-5 p-8 rounded-2xl glass-card border border-brand-green-500/10 flex flex-col gap-6 text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green-500/5 rounded-full blur-2xl group-hover:bg-brand-green-500/10 transition-colors"></div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${sectorScenarios[activeSector]?.solution.iconBg || sectorScenarios.agriculture.solution.iconBg}`}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display mb-2">{sectorScenarios[activeSector]?.solution.title || sectorScenarios.agriculture.solution.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {sectorScenarios[activeSector]?.solution.description || sectorScenarios.agriculture.solution.description}
                </p>
                <ul className="flex flex-col gap-3">
                  {(sectorScenarios[activeSector]?.solution.items || sectorScenarios.agriculture.solution.items).map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-slate-300">
                      <span className="text-brand-green-400 font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-16 items-center relative">
          
          <div className="md:col-span-6 text-left flex flex-col gap-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green-500">Connect With Us</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight font-display text-white">
              Launch Trisector AI in Your Enterprise
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Connect with our deployment team to integrate your IoT hubs, soil field telemetry, and ticket streams today. Get a customized, secure multi-agent dashboard for your team.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-brand-green-500">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-display">Email Queries</h4>
                  <p className="text-xs text-slate-400">integrations@trisector.ai</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-brand-blue-500">
                  <Globe size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-display">General Inquiries</h4>
                  <p className="text-xs text-slate-400">www.trisector.ai</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 w-full">
            <div className="glass-panel-dark p-8 rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl relative">
              {contactSuccess ? (
                <div className="h-[280px] flex flex-col items-center justify-center gap-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-brand-green-500 flex items-center justify-center text-white mb-2">
                    <UserCheck size={28} />
                  </div>
                  <h4 className="text-xl font-bold font-display">Message Sent Successfully!</h4>
                  <p className="text-slate-400 text-sm">Thank you. An integrations engineer will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-green-500 text-sm text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-green-500 text-sm text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Enterprise Message</label>
                    <textarea
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="How can we help optimize your sector operations?"
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-green-500 text-sm text-white resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-brand-blue-500 to-brand-green-500 text-white font-bold rounded-xl shadow-md hover:scale-[1.01] transition-transform duration-200 mt-2 cursor-pointer"
                  >
                    Submit Deployment Query
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <LogoIcon className="w-7 h-7 glow-shadow-blue" />
            <span className="text-white font-bold text-sm tracking-tight font-display">Trisector AI Innovation</span>
          </div>

          <p className="text-xs text-slate-600 font-semibold">
            © 2026 Trisector AI Innovation. Built for hackathon demonstration. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs font-semibold">
            <a href="#problem" className="hover:text-white transition-colors">Problem</a>
            <a href="#solution" className="hover:text-white transition-colors">Solution</a>
            <a href="#dashboard" className="hover:text-white transition-colors">Dashboard Console</a>
          </div>
        </div>
      </footer>

      {/* Floating Overall AI Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {globalChatOpen && (
          <div className="w-80 sm:w-96 h-[500px] rounded-2xl border border-slate-800 bg-[#0E1626] flex flex-col overflow-hidden mb-4 animate-fade-in-up">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/80 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-blue-500 to-brand-green-500 flex items-center justify-center text-white">
                  <Sparkles size={14} />
                </div>
                <div>
                  <h4 className="font-bold text-xs font-display">Trisector AI Coordinator</h4>
                  <p className="text-[9px] text-brand-green-400 font-bold uppercase tracking-widest">Master Dispatcher Active</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setGlobalChatOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Sector Context Selector inside Chat */}
            <div className="px-4 py-2 border-b border-slate-800 bg-[#0A0D16]/90 flex items-center justify-between gap-1">
              <span className="text-[10px] font-bold text-slate-400">Route Context:</span>
              <div className="flex gap-1">
                {['general', 'agriculture', 'industry', 'service'].map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setGlobalChatSector(sec)}
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded transition-all cursor-pointer ${
                      globalChatSector === sec
                        ? 'bg-brand-blue-600 text-white shadow-sm border border-brand-blue-500'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-850 hover:text-white border border-slate-800'
                    }`}
                  >
                    {sec === 'general' ? 'Core' : sec === 'agriculture' ? 'Agri' : sec === 'industry' ? 'Ind' : 'Serv'}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages Scrolling Area */}
            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-3.5 bg-slate-950/30">
              {globalMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  <div className={`p-3 rounded-2xl text-[11px] leading-relaxed font-semibold ${
                    msg.sender === 'user'
                      ? 'bg-brand-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-900/80 text-slate-100 rounded-tl-none border border-slate-800 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-0.5 font-semibold px-1">{msg.timestamp}</span>
                </div>
              ))}
              {globalIsTyping && (
                <div className="self-start flex flex-col gap-1 items-start max-w-[80%]">
                  <div className="px-3 py-2 bg-slate-900/80 rounded-2xl rounded-tl-none border border-slate-800 flex items-center gap-1">
                    <div className="h-1 w-1 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="h-1 w-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="h-1 w-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
              <div ref={globalChatEndRef} />
            </div>

            {/* Suggested Queries */}
            <div className="px-4 py-2 border-t border-slate-800 bg-[#0A0D16]/50 flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleSendGlobalMessage("Diagnostics report across all sectors")}
                className="text-[9px] font-bold text-brand-blue-400 bg-slate-900 border border-slate-800 hover:bg-slate-850 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
              >
                📊 Platform Diagnostics
              </button>
              <button
                type="button"
                onClick={() => handleSendGlobalMessage("Check soil health status")}
                className="text-[9px] font-bold text-brand-blue-400 bg-slate-900 border border-slate-800 hover:bg-slate-850 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
              >
                🌱 Crop Soil Health
              </button>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendGlobalMessage();
              }}
              className="p-3 border-t border-slate-800 bg-[#0E1626] flex gap-2 items-center"
            >
              <input
                type="text"
                value={globalInputValue}
                onChange={(e) => setGlobalInputValue(e.target.value)}
                placeholder={`Ask coordinator [context: ${globalChatSector}]...`}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-850 focus:outline-none focus:border-brand-blue-500 text-[11px] text-white bg-slate-950/50"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-gradient-to-r from-brand-blue-500 to-brand-green-500 text-white shadow hover:opacity-90 transition-opacity cursor-pointer"
              >
                <Send size={12} />
              </button>
            </form>
          </div>
        )}

        {/* Floating Bubble Button */}
        <button
          type="button"
          onClick={() => setGlobalChatOpen(!globalChatOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-blue-500 to-brand-green-500 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all glow-shadow-blue cursor-pointer relative"
        >
          {globalChatOpen ? <X size={22} /> : <MessageSquare size={22} />}
          {!globalChatOpen && (
            <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-amber-500 border-2 border-white pulse-amber"></span>
          )}
        </button>
      </div>

    </div>
  );
}
