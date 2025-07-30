import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Brain, 
  Maximize2, 
  FileText, 
  Lightbulb, 
  Target, 
  Gavel 
} from 'lucide-react';

interface FloatingChatProps {
  t: any;
  showToast?: (message: string) => void;
  userType?: 'main' | 'user' | 'admin' | 'lawyer';
}

interface CaseAnalysis {
  caseType: string;
  caseStrength: "Strong" | "Moderate" | "Weak";
  winProbability: string;
  timeEstimate: string;
  costEstimate: string;
  complexityLevel: "Simple" | "Moderate" | "Complex";

  // AI Analysis
  factAnalysis: {
    strongPoints: string[];
    weakPoints: string[];
    missingEvidence: string[];
    legalBasis: string[];
  };

  // Strategic Advice
  strategy: {
    primaryApproach: string;
    alternativeApproaches: string[];
    negotiationPoints: string[];
    courtStrategy: string[];
  };

  // Cross-verification
  legalValidation: {
    applicableLaws: Array<{
      section: string;
      relevance: string;
      strength: "High" | "Medium" | "Low";
    }>;
    precedents: string[];
    contradictions: string[];
  };

  // Opponent Analysis
  opponentAnalysis: {
    likelyDefense: string[];
    counterArguments: string[];
    weaknesses: string[];
    negotiationLeverage: string[];
  };

  // Action Plan
  actionPlan: Array<{
    phase: string;
    actions: string[];
    timeline: string;
    priority: "High" | "Medium" | "Low";
  }>;

  // Lawyer Recommendation
  lawyerAdvice: {
    needsLawyer: boolean;
    reason: string;
    specialization: string;
    experience: string;
    estimatedFees: string;
  };

  warnings: string[];
  tips: string[];
}

const FloatingChat: React.FC<FloatingChatProps> = ({ t, showToast, userType = 'main' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [analysis, setAnalysis] = useState<CaseAnalysis | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [chatHistory, setChatHistory] = useState(() => {
    // Different welcome messages based on user type
    let welcomeMessage = t.chat.welcome || "नमस्ते! मैं NyayaGPT हूँ, आपका कानूनी सहायक। मुझे अपना कानूनी प्रश्न पूछें।";
    
    if (userType === 'user') {
      welcomeMessage += "\n\n🤝 मैं आपके सभी कानूनी दस्तावेज़ और इतिहास को समझता हूँ। मैं DigiLocker से आपके दस्तावेज़ भी प्राप्त कर सकता हूँ।";
    } else if (userType === 'lawyer') {
      welcomeMessage += "\n\n🤝 एक वकील के रूप में, मैं आपको केस और क्लाइंट मैनेजमेंट में मदद कर सकता हूँ। कानूनी दस्तावेज़ और टेम्पलेट्स भी उपलब्ध हैं।";
    } else if (userType === 'admin') {
      welcomeMessage += "\n\n🤝 एक एडमिन के रूप में, मैं आपको प्लेटफॉर्म मैनेजमेंट, यूजर डेटा और सिस्टम अपडेट्स में मदद कर सकता हूँ।";
    } else {
      welcomeMessage += "\n\n🤝 मैं आपको कानूनी सलाह और मार्गदर्शन प्रदान कर सकता हूँ। अधिक सुविधाओं के लिए लॉगिन करें।";
    }
    
    return [{ role: 'assistant', content: welcomeMessage }];
  });

  // AI Lawyer Analysis Engine
  const performAILawyerAnalysis = (query: string): CaseAnalysis => {
    const lowerQuery = query.toLowerCase();

    // 498A Case - Comprehensive AI Analysis
    if (lowerQuery.includes("498a") || lowerQuery.includes("dowry") || lowerQuery.includes("jhooti")) {
      return {
        caseType: "498A Dowry Harassment (False Allegation)",
        caseStrength: "Moderate",
        winProbability: "65-75% (with proper defense)",
        timeEstimate: "2-4 years (trial completion)",
        costEstimate: "₹2,00,000 - ₹5,00,000",
        complexityLevel: "Complex",

        factAnalysis: {
          strongPoints: [
            "Supreme Court guidelines prevent automatic arrest (Rajesh Sharma case)",
            "498A misuse is well-documented in courts",
            "Burden of proof lies on complainant",
            "Family Welfare Committee mediation available",
            "Counter-case possible under IPC 182 (false information)",
          ],
          weakPoints: [
            "498A is non-bailable offense",
            "Social stigma attached to case",
            "Police often favor complainant initially",
            "Media trial possible",
            "Family relationships permanently damaged",
          ],
          missingEvidence: [
            "Bank statements proving no dowry transactions",
            "WhatsApp/SMS conversations with wife/in-laws",
            "Witness statements from wedding attendees",
            "Audio/video recordings of threats (if any)",
            "Medical records disproving physical abuse claims",
            "Income tax returns showing financial status",
          ],
          legalBasis: [
            "IPC Section 498A - Cruelty by husband or relatives",
            "CrPC Section 438 - Anticipatory bail provisions",
            "IPC Section 182 - False information to public servant",
            "Article 21 - Right to life and personal liberty",
            "Supreme Court guidelines in Rajesh Sharma vs State of UP",
          ],
        },

        strategy: {
          primaryApproach:
            "Defensive strategy with counter-offensive - Focus on proving false allegations while maintaining dignity",
          alternativeApproaches: [
            "Immediate anticipatory bail application",
            "Family counseling through Lok Adalat",
            "Mutual consent divorce negotiations",
            "Quashing petition in High Court (if strong evidence)",
            "Compromise through mediation",
          ],
          negotiationPoints: [
            "Mutual consent divorce with reasonable alimony",
            "No criminal proceedings in exchange for settlement",
            "Child custody arrangements (if applicable)",
            "Property division as per mutual agreement",
            "Withdrawal of all cross-complaints",
          ],
          courtStrategy: [
            "Challenge the FIR on procedural grounds",
            "Prove no dowry demand was ever made",
            "Establish malafide intentions of complainant",
            "Present character witnesses",
            "Cross-examine complainant's witnesses thoroughly",
          ],
        },

        legalValidation: {
          applicableLaws: [
            {
              section: "IPC Section 498A",
              relevance: "Primary charge - requires proof of cruelty and dowry demand",
              strength: "High",
            },
            {
              section: "CrPC Section 438",
              relevance: "Anticipatory bail - must be filed immediately",
              strength: "High",
            },
            {
              section: "IPC Section 182",
              relevance: "Counter-case for false FIR",
              strength: "Medium",
            },
          ],
          precedents: [
            "Rajesh Sharma vs State of UP (2017) - No automatic arrest",
            "Arnesh Kumar vs State of Bihar (2014) - Arrest guidelines",
            "Sushil Kumar Sharma vs UOI (2005) - 498A constitutional validity",
          ],
          contradictions: [
            "If no dowry was given at marriage, 498A becomes weak",
            "If wife was working and independent, cruelty claims questionable",
            "If marriage was love marriage, dowry angle becomes difficult to prove",
          ],
        },

        opponentAnalysis: {
          likelyDefense: [
            "Will claim physical and mental torture",
            "Will produce medical certificates of injuries",
            "Will claim dowry demands with specific amounts",
            "Will bring family members as witnesses",
            "Will claim threats to life",
          ],
          counterArguments: [
            "Medical certificates can be obtained easily",
            "Witness statements from wife's family are biased",
            "No independent evidence of dowry demands",
            "Delayed complaint raises questions on genuineness",
            "No police complaints filed earlier despite alleged torture",
          ],
          weaknesses: [
            "Burden of proof lies on complainant",
            "Must prove specific instances of cruelty",
            "Must establish dowry demand with evidence",
            "Delayed FIR weakens the case",
            "Lack of independent witnesses",
          ],
          negotiationLeverage: [
            "Counter-case threat under IPC 182",
            "Social pressure on both families",
            "Child welfare (if children involved)",
            "Financial settlement attractive to complainant",
            "Mutual consent divorce faster than contested case",
          ],
        },

        actionPlan: [
          {
            phase: "Immediate (1-7 days)",
            actions: [
              "Hire experienced criminal lawyer immediately",
              "File anticipatory bail application",
              "Collect all marriage-related documents",
              "Gather bank statements and financial records",
              "Inform family members and prepare witnesses",
            ],
            timeline: "Within 1 week",
            priority: "High",
          },
          {
            phase: "Short-term (1-4 weeks)",
            actions: [
              "Attend anticipatory bail hearings",
              "File counter-complaint under IPC 182",
              "Approach Family Welfare Committee",
              "Collect evidence of false allegations",
              "Prepare witness statements",
            ],
            timeline: "1 month",
            priority: "High",
          },
          {
            phase: "Medium-term (2-6 months)",
            actions: [
              "Regular court appearances",
              "Evidence submission and documentation",
              "Cross-examination preparation",
              "Mediation attempts through court",
              "Settlement negotiations",
            ],
            timeline: "6 months",
            priority: "Medium",
          },
          {
            phase: "Long-term (6 months - 2 years)",
            actions: [
              "Trial proceedings and arguments",
              "Final evidence submission",
              "Judgment and appeal (if needed)",
              "Execution of settlement (if reached)",
              "Case closure formalities",
            ],
            timeline: "2 years",
            priority: "Medium",
          },
        ],

        lawyerAdvice: {
          needsLawyer: true,
          reason: "498A is a serious non-bailable offense requiring expert criminal law knowledge and court experience",
          specialization: "Criminal Law with specific experience in 498A cases",
          experience: "Minimum 10 years in criminal law, preferably handled 50+ 498A cases",
          estimatedFees: "₹1,50,000 - ₹3,00,000 (depending on case complexity and lawyer reputation)",
        },

        warnings: [
          "498A is non-bailable - arrest possible without warrant",
          "Do not contact complainant directly - can be used as evidence",
          "Avoid social media posts about the case",
          "Do not destroy any evidence, even if it seems harmful",
          "Maintain calm behavior - any aggressive action will be used against you",
        ],

        tips: [
          "Document everything - every conversation, every expense, every interaction",
          "Build a strong support system of family and friends",
          "Focus on proving your innocence rather than attacking complainant's character",
          "Consider mediation seriously - it can save time, money, and relationships",
          "Keep your lawyer informed about every development",
        ],
      };
    }

    // Property/Builder Case - AI Analysis
    else if (lowerQuery.includes("builder") || lowerQuery.includes("flat") || lowerQuery.includes("property")) {
      return {
        caseType: "Builder Delay/Property Dispute",
        caseStrength: "Strong",
        winProbability: "80-90% (RERA cases have high success rate)",
        timeEstimate: "1-2 years",
        costEstimate: "₹50,000 - ₹1,50,000",
        complexityLevel: "Moderate",

        factAnalysis: {
          strongPoints: [
            "RERA Act strongly favors buyers",
            "Builder agreement is primary evidence",
            "Delay is easily provable with documents",
            "Interest/penalty clauses usually favor buyer",
            "Consumer forum also provides parallel remedy",
          ],
          weakPoints: [
            "Builder may claim force majeure (COVID, etc.)",
            "Approval delays from authorities",
            "Technical defects in agreement",
            "Partial possession may complicate matters",
            "Builder's financial condition may affect recovery",
          ],
          missingEvidence: [
            "Original builder agreement with all annexures",
            "All payment receipts and bank statements",
            "Builder's RERA registration certificate",
            "Project approval documents",
            "Correspondence with builder (emails, letters)",
            "Site visit photographs showing construction status",
          ],
          legalBasis: [
            "RERA Act 2016 - Builder accountability",
            "Consumer Protection Act 2019 - Service deficiency",
            "Contract Act 1872 - Breach of agreement",
            "Specific Relief Act 1963 - Specific performance",
          ],
        },

        strategy: {
          primaryApproach: "Multi-pronged approach - RERA complaint + Consumer forum + Legal notice",
          alternativeApproaches: [
            "Direct negotiation with builder",
            "Buyer group formation for collective action",
            "Media pressure and social media campaign",
            "Complaint to state housing department",
            "Civil suit for specific performance",
          ],
          negotiationPoints: [
            "Immediate possession with penalty payment",
            "Compensation for rental expenses during delay",
            "Free car parking and other amenities",
            "Upgrade to higher floor/better unit",
            "Refund with interest if possession not possible",
          ],
          courtStrategy: [
            "Prove clear breach of agreement terms",
            "Calculate exact delay period and penalty",
            "Show financial loss due to delay",
            "Establish builder's pattern of delays",
            "Demand specific performance with damages",
          ],
        },

        legalValidation: {
          applicableLaws: [
            {
              section: "RERA Act Section 18",
              relevance: "Penalty for delay in possession",
              strength: "High",
            },
            {
              section: "Consumer Protection Act",
              relevance: "Service deficiency by builder",
              strength: "High",
            },
            {
              section: "Contract Act Section 73",
              relevance: "Compensation for breach of contract",
              strength: "Medium",
            },
          ],
          precedents: [
            "Pioneer Urban vs Govindan (2019) - RERA penalty upheld",
            "Imperia Structures vs Anil Patni (2020) - Consumer forum jurisdiction",
            "Various RERA authority orders favoring buyers",
          ],
          contradictions: [
            "Force majeure clauses in agreement may limit liability",
            "Buyer's payment delays may affect compensation claims",
            "Partial possession acceptance may weaken case",
          ],
        },

        opponentAnalysis: {
          likelyDefense: [
            "Force majeure due to COVID-19/lockdowns",
            "Government approval delays",
            "Labor shortage and material price increase",
            "Buyer's payment delays",
            "Technical interpretation of possession date",
          ],
          counterArguments: [
            "Delays existed before COVID-19",
            "No evidence of approval applications",
            "No formal communication about delays",
            "All payments made as per schedule",
            "Agreement clearly states possession date",
          ],
          weaknesses: [
            "RERA Act is buyer-friendly",
            "Documented delay is hard to defend",
            "Multiple complaints strengthen case",
            "Social media exposure risk",
            "Financial strain of litigation",
          ],
          negotiationLeverage: [
            "Avoid negative publicity",
            "Prevent RERA blacklisting",
            "Avoid interest payment accumulation",
            "Maintain market reputation",
            "Avoid precedent for other buyers",
          ],
        },

        actionPlan: [
          {
            phase: "Immediate (1-7 days)",
            actions: [
              "Collect all documents and agreements",
              "Draft legal notice to builder",
              "Connect with other affected buyers",
              "Consult RERA specialist lawyer",
              "Document current construction status",
            ],
            timeline: "Within 1 week",
            priority: "High",
          },
          {
            phase: "Short-term (1-4 weeks)",
            actions: [
              "Send legal notice to builder",
              "File RERA complaint online",
              "Calculate exact compensation amount",
              "Prepare for RERA hearing",
              "Consider consumer forum complaint",
            ],
            timeline: "1 month",
            priority: "High",
          },
          {
            phase: "Medium-term (2-6 months)",
            actions: [
              "Attend RERA hearings",
              "Negotiate with builder if approached",
              "Maintain documentation of all communications",
              "Follow up on RERA orders",
              "Prepare execution application if needed",
            ],
            timeline: "6 months",
            priority: "Medium",
          },
          {
            phase: "Long-term (6 months - 2 years)",
            actions: [
              "Execute RERA order",
              "Monitor construction progress",
              "Take possession with inspection",
              "Claim interest/compensation",
              "Appeal if order is unfavorable",
            ],
            timeline: "1-2 years",
            priority: "Medium",
          },
        ],

        lawyerAdvice: {
          needsLawyer: true,
          reason: "RERA proceedings benefit from expert representation to maximize compensation",
          specialization: "Real Estate Law with RERA experience",
          experience: "Minimum 5 years in real estate disputes, preferably with RERA authority",
          estimatedFees: "₹30,000 - ₹75,000 (depending on case complexity and lawyer reputation)",
        },

        warnings: [
          "Do not accept possession without protest letter",
          "Do not make further payments without written assurance",
          "Limitation period for RERA complaints is important",
          "Builder may try to add unfavorable clauses in possession letter",
          "Verbal assurances have no legal value",
        ],

        tips: [
          "Join or form a buyers' association for collective action",
          "Document all communications with builder",
          "Take dated photographs of construction status",
          "Calculate interest due precisely as per agreement",
          "Be prepared for a long process but stay persistent",
        ],
      };
    }

    // Default case for other legal queries
    return {
      caseType: "General Legal Query",
      caseStrength: "Moderate",
      winProbability: "Requires more information",
      timeEstimate: "Varies based on specifics",
      costEstimate: "₹10,000 - ₹50,000 (initial consultation)",
      complexityLevel: "Moderate",

      factAnalysis: {
        strongPoints: [
          "Indian legal system provides multiple remedies",
          "Documentation can strengthen your position",
          "Alternative dispute resolution available",
          "Legal aid services accessible if eligible",
        ],
        weakPoints: [
          "Court processes can be lengthy",
          "Costs may escalate with case duration",
          "Outcome depends on evidence quality",
          "Jurisdiction issues may arise",
        ],
        missingEvidence: [
          "Specific details of your situation",
          "Relevant documents and evidence",
          "Timeline of events",
          "Communications related to the issue",
          "Witness information if applicable",
        ],
        legalBasis: [
          "Specific laws depend on your case details",
          "Constitutional remedies may be available",
          "Precedent cases will be relevant",
          "Statutory provisions based on case type",
        ],
      },

      strategy: {
        primaryApproach: "Gather complete information and consult a specialist lawyer for your specific issue",
        alternativeApproaches: [
          "Legal notice as first step",
          "Alternative dispute resolution (mediation/arbitration)",
          "Administrative remedies where applicable",
          "Online dispute resolution platforms",
          "Legal aid services if eligible",
        ],
        negotiationPoints: [
          "Identify your minimum acceptable outcome",
          "Consider time vs. compensation tradeoffs",
          "Explore mutual benefit solutions",
          "Phased resolution approach",
        ],
        courtStrategy: [
          "Proper jurisdiction selection",
          "Strong evidence documentation",
          "Expert witness consideration",
          "Interim relief applications where needed",
          "Appeal preparation if required",
        ],
      },

      legalValidation: {
        applicableLaws: [
          {
            section: "Relevant Acts",
            relevance: "Depends on specific case details",
            strength: "Medium",
          },
          {
            section: "Procedural Laws",
            relevance: "Governs how your case will proceed",
            strength: "Medium",
          },
          {
            section: "Limitation Act",
            relevance: "Time limits for filing cases",
            strength: "High",
          },
        ],
        precedents: [
          "Case-specific precedents will apply",
          "Supreme Court judgments on similar issues",
          "High Court rulings in your jurisdiction",
        ],
        contradictions: [
          "Conflicting judgments may exist",
          "Legal interpretation variations",
          "Jurisdiction-specific differences",
        ],
      },

      opponentAnalysis: {
        likelyDefense: [
          "Denial of claims",
          "Procedural objections",
          "Limitation period arguments",
          "Jurisdiction challenges",
          "Counter-claims possibility",
        ],
        counterArguments: [
          "Strong documentation counters denials",
          "Procedural compliance is essential",
          "Limitation exceptions where applicable",
          "Jurisdiction selection justification",
          "Defense against potential counter-claims",
        ],
        weaknesses: [
          "Depends on specific opponent",
          "Documentation gaps on their side",
          "Reputational concerns",
          "Cost of prolonged litigation",
        ],
        negotiationLeverage: [
          "Litigation costs and time",
          "Reputational impact",
          "Precedent-setting concerns",
          "Business relationship preservation",
          "Confidentiality benefits",
        ],
      },

      actionPlan: [
        {
          phase: "Information Gathering",
          actions: [
            "Collect all relevant documents",
            "Create chronological event timeline",
            "Identify and contact potential witnesses",
            "Research similar cases and outcomes",
            "List damages and quantify where possible",
          ],
          timeline: "1-2 weeks",
          priority: "High",
        },
        {
          phase: "Legal Consultation",
          actions: [
            "Consult specialized lawyer",
            "Evaluate case strength professionally",
            "Understand all available options",
            "Get cost and timeline estimates",
            "Decide on course of action",
          ],
          timeline: "2-3 weeks",
          priority: "High",
        },
        {
          phase: "Initial Legal Steps",
          actions: [
            "Send legal notice if applicable",
            "Attempt pre-litigation resolution",
            "Prepare for filing if needed",
            "Secure evidence properly",
            "Consider interim applications",
          ],
          timeline: "1-2 months",
          priority: "Medium",
        },
        {
          phase: "Case Progression",
          actions: [
            "Regular follow-up with lawyer",
            "Attend proceedings as advised",
            "Provide additional information as needed",
            "Consider settlement offers objectively",
            "Prepare for next stages",
          ],
          timeline: "Ongoing",
          priority: "Medium",
        },
      ],

      lawyerAdvice: {
        needsLawyer: true,
        reason: "Professional legal guidance ensures proper handling of your specific situation",
        specialization: "Depends on your case type",
        experience: "Look for relevant experience in similar cases",
        estimatedFees: "Initial consultation: ₹1,500-₹5,000; Case handling: Varies by complexity",
      },

      warnings: [
        "Don't delay action beyond limitation periods",
        "Avoid discussing case on social media",
        "Don't destroy or alter any evidence",
        "Don't contact opposing party directly once legal process begins",
        "Don't sign documents without legal review",
      ],

      tips: [
        "Maintain organized documentation of everything",
        "Be completely honest with your lawyer",
        "Consider cost vs. benefit realistically",
        "Explore alternative dispute resolution",
        "Be prepared for potentially lengthy process",
      ],
    };
  };

  // Simulate AI analysis with detailed steps in Hindi
  const simulateAIAnalysis = (query: string) => {
    setIsAnalyzing(true);
    setAnalysis(null);
    
    // Simulate analysis steps with more detailed Hindi descriptions
    const steps = [
      "आपके केस का प्रारंभिक विश्लेषण किया जा रहा है...",
      "केस प्रकार की पहचान की जा रही है...",
      "केस की ताकत का मूल्यांकन किया जा रहा है...",
      "सफलता की संभावना की गणना की जा रही है...",
      "कानूनी प्रावधानों और धाराओं की जांच की जा रही है...",
      "समान मामलों का अध्ययन किया जा रहा है...",
      "न्यायालय के निर्णयों का विश्लेषण किया जा रहा है...",
      "रणनीतिक विकल्पों का मूल्यांकन किया जा रहा है...",
      "कार्य योजना तैयार की जा रही है...",
      "विस्तृत रिपोर्ट तैयार की जा रही है...",
      "विश्लेषण पूरा हुआ! रिपोर्ट प्रस्तुत की जा रही है..."
    ];
    
    let stepIndex = 0;
    
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setAnalysisStep(steps[stepIndex]);
        stepIndex++;
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
        setAnalysis(performAILawyerAnalysis(query));
      }
    }, 800); // Slightly faster to keep user engaged
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message to chat
      const newUserMessage = { role: 'user', content: message };
      setChatHistory(prev => [...prev, newUserMessage]);
      
      // Check if this is a detailed legal query that needs analysis
      const needsDetailedAnalysis = 
        message.length > 30 && 
        (message.toLowerCase().includes('case') || 
         message.toLowerCase().includes('court') || 
         message.toLowerCase().includes('legal') ||
         message.toLowerCase().includes('lawyer') ||
         message.toLowerCase().includes('law') ||
         message.toLowerCase().includes('498a') ||
         message.toLowerCase().includes('property') ||
         message.toLowerCase().includes('builder') ||
         message.toLowerCase().includes('divorce') ||
         message.toLowerCase().includes('criminal') ||
         message.toLowerCase().includes('section') ||
         message.toLowerCase().includes('ipc') ||
         message.toLowerCase().includes('crpc'));
      
      // Store the query for later analysis if needed
      if (needsDetailedAnalysis && !isExpanded) {
        sessionStorage.setItem('pendingQuery', message);
        
        // Add AI response suggesting detailed analysis
        setTimeout(() => {
          const aiResponse = {
            role: 'assistant',
            content: `आपका प्रश्न एक जटिल कानूनी मामला लगता है। क्या आप चाहेंगे कि मैं इसका विस्तृत विश्लेषण करूं? इसमें शामिल होगा:

✅ केस की ताकत का आकलन
✅ जीत की संभावना
✅ समय और लागत का अनुमान
✅ कानूनी रणनीति
✅ आगे की कार्रवाई की योजना

विस्तृत विश्लेषण के लिए 'हां' या 'हाँ' टाइप करें या चैट जारी रखने के लिए अपना अगला प्रश्न पूछें।`
          };
          
          setChatHistory(prev => [...prev, aiResponse]);
          if (showToast) {
            showToast(t.chat.responseReceived || "प्रतिक्रिया प्राप्त हुई");
          }
        }, 1000);
      } else if ((message.toLowerCase() === 'हां' || message.toLowerCase() === 'हाँ') && sessionStorage.getItem('pendingQuery') && !isExpanded) {
        // User agreed to detailed analysis
        setIsExpanded(true);
        const pendingQuery = sessionStorage.getItem('pendingQuery') || '';
        simulateAIAnalysis(pendingQuery); // Analyze the stored query
        sessionStorage.removeItem('pendingQuery'); // Clear stored query
        
        // Add AI response about starting analysis
        setTimeout(() => {
          const aiResponse = {
            role: 'assistant',
            content: `मैं आपके मामले का विस्तृत विश्लेषण शुरू कर रहा हूं। यह कुछ क्षण लेगा...`
          };
          
          setChatHistory(prev => [...prev, aiResponse]);
        }, 500);
      } else {
        // Regular chat response
        setTimeout(() => {
          let aiResponse;
          
          // Different responses based on user type
          if (userType === 'user') {
            // Simulate intelligent case analysis for regular users
            const isStrongCase = message.toLowerCase().includes('court') || 
                               message.toLowerCase().includes('lawyer') || 
                               message.toLowerCase().includes('case');
            
            if (isStrongCase) {
              aiResponse = {
                role: 'assistant',
                content: `${t.chat.aiResponse || "आपके प्रश्न के लिए धन्यवाद"} "${message}". 
                
                🔍 **केस विश्लेषण**: आपका मामला मजबूत प्रतीत होता है। 
                
                📋 **मेरी सलाह**: 
                1. पहले, मैं आपको बुनियादी मार्गदर्शन दूंगा
                2. यदि मामला जटिल है, तो एक सत्यापित वकील से बात करना बेहतर होगा
                
                💡 **अगले कदम**: क्या आप चाहेंगे कि मैं आपको एक वकील से जोड़ूं?
                
                🔒 **गोपनीयता**: आपकी सभी जानकारी सुरक्षित है।`
              };
            } else {
              aiResponse = {
                role: 'assistant',
                content: `${t.chat.aiHelp || "मैं आपकी कैसे मदद कर सकता हूं?"} 
                
                🎯 **मेरा विश्लेषण**: यह एक सामान्य कानूनी प्रश्न है। मैं आपको चरण-दर-चरण मार्गदर्शन कर सकता हूं।
                
                📚 **उपलब्ध अधिनियम**: मेरे पास भारतीय कानूनी अधिनियमों के बारे में पूरी जानकारी है।
                
                💬 **बात जारी रखें**: यदि आपके कोई संदेह हैं, तो कृपया पूछें, मैं यहां हूं!`
              };
            }
          } else if (userType === 'lawyer') {
            // Lawyer-specific responses
            aiResponse = {
              role: 'assistant',
              content: `आपके प्रश्न "${message}" के लिए धन्यवाद।
              
              👨‍⚖️ **वकील विशिष्ट जानकारी**: 
              - आपके पास ${Math.floor(Math.random() * 5) + 1} नए केस अपडेट हैं
              - ${Math.floor(Math.random() * 3) + 2} क्लाइंट्स ने आपसे परामर्श का अनुरोध किया है
              
              📄 **उपलब्ध टेम्पलेट्स**: आपके क्षेत्र से संबंधित ${Math.floor(Math.random() * 10) + 5} नए टेम्पलेट्स जोड़े गए हैं
              
              📊 **केस आंकड़े**: आपकी सफलता दर ${Math.floor(Math.random() * 20) + 80}% है`
            };
          } else if (userType === 'admin') {
            // Admin-specific responses
            aiResponse = {
              role: 'assistant',
              content: `आपके प्रश्न "${message}" के लिए धन्यवाद, एडमिन।
              
              👨‍💼 **प्लेटफॉर्म आंकड़े**: 
              - इस सप्ताह ${Math.floor(Math.random() * 50) + 100} नए उपयोगकर्ता
              - ${Math.floor(Math.random() * 200) + 300} नए केस प्रश्न
              - ${Math.floor(Math.random() * 20) + 30} नए वकील पंजीकरण
              
              🔧 **सिस्टम स्थिति**: सभी सिस्टम सामान्य रूप से कार्य कर रहे हैं
              
              📈 **विश्लेषण**: पिछले महीने की तुलना में उपयोगकर्ता जुड़ाव ${Math.floor(Math.random() * 20) + 5}% बढ़ गया है`
            };
          } else {
            // Default response for non-logged in users
            aiResponse = {
              role: 'assistant',
              content: `आपके प्रश्न "${message}" के लिए धन्यवाद।
              
              ℹ️ **जानकारी**: मैं आपको बुनियादी कानूनी जानकारी प्रदान कर सकता हूं।
              
              🔐 **अधिक सुविधाएं**: व्यक्तिगत कानूनी सहायता और DigiLocker एकीकरण जैसी अधिक सुविधाओं के लिए, कृपया लॉगिन करें या साइन अप करें।
              
              💡 **सुझाव**: क्या आप अपने कानूनी प्रश्न के बारे में अधिक विवरण प्रदान कर सकते हैं?`
            };
          }
          
          setChatHistory(prev => [...prev, aiResponse]);
          if (showToast) {
            showToast(t.chat.responseReceived || "प्रतिक्रिया प्राप्त हुई");
          }
        }, 1000);
      }
      
      setMessage('');
    }
  };

  // Render the detailed analysis UI
  const renderAnalysis = () => {
    if (!analysis) return null;
    
    return (
      <div className="analysis-container p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-y-auto max-h-[80vh] w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
            <Brain className="mr-2 text-blue-500" /> 
            {analysis.caseType} - विस्तृत विश्लेषण
          </h2>
          <button 
            onClick={() => setIsExpanded(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Case Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
            <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">केस की ताकत</h3>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                <div 
                  className={`h-2.5 rounded-full ${analysis.caseStrength === "Strong" ? "bg-green-500" : 
                    analysis.caseStrength === "Moderate" ? "bg-yellow-500" : "bg-red-500"}`}
                  style={{ width: analysis.caseStrength === "Strong" ? "85%" : 
                    analysis.caseStrength === "Moderate" ? "50%" : "25%" }}
                ></div>
              </div>
              <span className="ml-2 text-sm font-medium">{analysis.caseStrength}</span>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-gray-700 p-3 rounded-lg">
            <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">जीत की संभावना</h3>
            <p className="text-sm">{analysis.winProbability}</p>
          </div>
          
          <div className="bg-purple-50 dark:bg-gray-700 p-3 rounded-lg">
            <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">समय अनुमान</h3>
            <p className="text-sm">{analysis.timeEstimate}</p>
          </div>
          
          <div className="bg-orange-50 dark:bg-gray-700 p-3 rounded-lg">
            <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">लागत अनुमान</h3>
            <p className="text-sm">{analysis.costEstimate}</p>
          </div>
        </div>
        
        {/* Tabs for detailed analysis */}
        <div className="mb-4">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              <li className="mr-2">
                <button className="inline-block p-2 border-b-2 border-blue-500 rounded-t-lg active text-blue-600 dark:text-blue-300 flex items-center">
                  <FileText className="w-4 h-4 mr-1" /> तथ्य विश्लेषण
                </button>
              </li>
              <li className="mr-2">
                <button className="inline-block p-2 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 dark:hover:border-gray-600 flex items-center">
                  <Lightbulb className="w-4 h-4 mr-1" /> रणनीति
                </button>
              </li>
              <li className="mr-2">
                <button className="inline-block p-2 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 dark:hover:border-gray-600 flex items-center">
                  <Target className="w-4 h-4 mr-1" /> कार्य योजना
                </button>
              </li>
              <li className="mr-2">
                <button className="inline-block p-2 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 dark:hover:border-gray-600 flex items-center">
                  <Gavel className="w-4 h-4 mr-1" /> वकील सलाह
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Fact Analysis Content */}
        <div className="tab-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">मजबूत बिंदु</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {analysis.factAnalysis.strongPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-red-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-red-700 dark:text-red-300 mb-2">कमजोर बिंदु</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {analysis.factAnalysis.weakPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-yellow-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">अनुपलब्ध साक्ष्य</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {analysis.factAnalysis.missingEvidence.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">कानूनी आधार</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {analysis.factAnalysis.legalBasis.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6 bg-indigo-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">प्राथमिक रणनीति</h3>
            <p className="text-sm">{analysis.strategy.primaryApproach}</p>
            
            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mt-3 mb-1">वैकल्पिक दृष्टिकोण</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {analysis.strategy.alternativeApproaches.slice(0, 3).map((approach, index) => (
                <li key={index}>{approach}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6 bg-purple-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">तत्काल कार्रवाई</h3>
            {analysis.actionPlan[0] && (
              <>
                <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-1">{analysis.actionPlan[0].phase}</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {analysis.actionPlan[0].actions.map((action, index) => (
                    <li key={index}>{action}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          
          <div className="mt-6 bg-orange-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">महत्वपूर्ण चेतावनियां</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {analysis.warnings.slice(0, 3).map((warning, index) => (
                <li key={index} className="text-red-600 dark:text-red-400">{warning}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <button
        id="floating-chat"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all z-50 animate-pulse"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <Brain className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce">
              न्याय
            </span>
          </>
        )}
      </button>

      {isOpen && (
        <div className={`fixed ${isExpanded ? 'inset-0 w-full h-full' : 'bottom-24 right-6 w-80 md:w-96'} bg-white border border-gray-200 rounded-lg shadow-xl z-50 animate-fade-in-up ${isDarkMode ? 'dark:bg-gray-800 dark:border-gray-700' : ''}`}>
          <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <Brain className="w-6 h-6 mr-2 text-blue-400" />
              <div>
                <h3 className="font-bold font-serif">NyayaGPT AI</h3>
                <p className="text-sm opacity-90">आपका कानूनी सहायक</p>
              </div>
            </div>
            {isExpanded && (
              <button onClick={() => setIsExpanded(false)} className="text-white hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {isExpanded && isAnalyzing ? (
            <div className="p-8 flex flex-col items-center justify-center h-[80vh]">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-600" />
              </div>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-4">{analysisStep}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">NyayaGPT AI आपके केस का विश्लेषण कर रहा है...</p>
            </div>
          ) : isExpanded && analysis ? (
            renderAnalysis()
          ) : (
            <div className="p-4 h-80 overflow-y-auto bg-gray-50 dark:bg-gray-700 space-y-3">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg shadow-sm max-w-[80%] ${
                    msg.role === 'user'
                      ? 'bg-black text-white ml-auto'
                      : 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              ))}
            </div>
          )}
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="mb-3 flex flex-wrap gap-2">
              {[
                "498A केस में मेरी मदद करें",
                "बिल्डर डिले केस में क्या करूं?",
                "वकील से कैसे मिलूं?",
                "कानूनी दस्तावेज़ कैसे बनाएं?",
                "मेरे अधिकार क्या हैं?"
              ].map((question: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setMessage(question)}
                  className="text-xs bg-gray-100 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500 px-2 py-1 rounded transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="अपना कानूनी प्रश्न यहां पूछें..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all flex items-center justify-center"
                title="भेजें"
              >
                <Send className="w-4 h-4" />
              </button>
              {!isExpanded && !isAnalyzing && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 hover:scale-105 transition-all flex items-center justify-center"
                  title="विस्तृत विश्लेषण मोड"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { FloatingChat };
export default FloatingChat;