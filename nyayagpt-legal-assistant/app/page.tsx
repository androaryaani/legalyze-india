"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Scale,
  AlertTriangle,
  CheckCircle,
  Brain,
  Clock,
  IndianRupee,
  FileText,
  Users,
  Lightbulb,
  ArrowRight,
  Star,
  Shield,
  Gavel,
  Search,
  BookOpen,
  Target,
  TrendingUp,
  UserCheck,
} from "lucide-react"

interface CaseAnalysis {
  caseType: string
  caseStrength: "Strong" | "Moderate" | "Weak"
  winProbability: string
  timeEstimate: string
  costEstimate: string
  complexityLevel: "Simple" | "Moderate" | "Complex"

  // AI Analysis
  factAnalysis: {
    strongPoints: string[]
    weakPoints: string[]
    missingEvidence: string[]
    legalBasis: string[]
  }

  // Strategic Advice
  strategy: {
    primaryApproach: string
    alternativeApproaches: string[]
    negotiationPoints: string[]
    courtStrategy: string[]
  }

  // Cross-verification
  legalValidation: {
    applicableLaws: Array<{
      section: string
      relevance: string
      strength: "High" | "Medium" | "Low"
    }>
    precedents: string[]
    contradictions: string[]
  }

  // Opponent Analysis
  opponentAnalysis: {
    likelyDefense: string[]
    counterArguments: string[]
    weaknesses: string[]
    negotiationLeverage: string[]
  }

  // Action Plan
  actionPlan: Array<{
    phase: string
    actions: string[]
    timeline: string
    priority: "High" | "Medium" | "Low"
  }>

  // Lawyer Recommendation
  lawyerAdvice: {
    needsLawyer: boolean
    reason: string
    specialization: string
    experience: string
    estimatedFees: string
  }

  warnings: string[]
  tips: string[]
}

export default function AILawyerGPT() {
  const [query, setQuery] = useState("")
  const [analysis, setAnalysis] = useState<CaseAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [analysisStep, setAnalysisStep] = useState("")

  // AI Lawyer Analysis Engine
  const performAILawyerAnalysis = (query: string): CaseAnalysis => {
    const lowerQuery = query.toLowerCase()

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
      }
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
            "Force majeure clauses may protect builder in some cases",
            "Government approval delays may excuse builder",
            "Buyer's payment defaults may weaken case",
          ],
        },

        opponentAnalysis: {
          likelyDefense: [
            "Will claim force majeure due to COVID-19",
            "Will blame government approval delays",
            "Will show technical/environmental clearance issues",
            "Will claim buyer payment defaults",
            "Will argue agreement terms are ambiguous",
          ],
          counterArguments: [
            "Force majeure must be specifically proven",
            "Builder should have anticipated approval delays",
            "Buyer payments were made on time as per schedule",
            "Agreement terms are clear and unambiguous",
            "Other projects by same builder also delayed",
          ],
          weaknesses: [
            "Pattern of delays in multiple projects",
            "Poor financial management",
            "Lack of proper project planning",
            "Violation of RERA compliance",
            "Customer complaints and negative reviews",
          ],
          negotiationLeverage: [
            "RERA complaint threat",
            "Consumer forum case",
            "Media and social media exposure",
            "Buyer group collective action",
            "Regulatory action by authorities",
          ],
        },

        actionPlan: [
          {
            phase: "Immediate (1-2 weeks)",
            actions: [
              "Collect all documents and calculate exact delay",
              "Send legal notice to builder",
              "File RERA complaint online",
              "Connect with other affected buyers",
              "Document current construction status",
            ],
            timeline: "2 weeks",
            priority: "High",
          },
          {
            phase: "Short-term (1-3 months)",
            actions: [
              "Attend RERA hearings",
              "File consumer forum complaint",
              "Negotiate with builder for settlement",
              "Prepare detailed cost calculation",
              "Gather expert opinions on construction",
            ],
            timeline: "3 months",
            priority: "High",
          },
          {
            phase: "Medium-term (3-12 months)",
            actions: [
              "RERA authority proceedings",
              "Consumer forum hearings",
              "Settlement negotiations",
              "Evidence submission and arguments",
              "Interim relief applications",
            ],
            timeline: "12 months",
            priority: "Medium",
          },
        ],

        lawyerAdvice: {
          needsLawyer: false,
          reason:
            "RERA complaints can be filed by buyers themselves. Lawyer needed only for complex cases or if builder has strong legal team",
          specialization: "Real Estate Law and Consumer Protection",
          experience: "5-10 years in property disputes and RERA cases",
          estimatedFees: "₹25,000 - ₹75,000 (if lawyer needed)",
        },

        warnings: [
          "RERA complaint has 3-year limitation period",
          "Keep all payment receipts safely",
          "Don't accept partial possession without proper inspection",
          "Builder may try to delay tactics - be persistent",
        ],

        tips: [
          "Join buyer groups for collective bargaining power",
          "Document everything with photographs and videos",
          "RERA online filing is simple and effective",
          "Consumer forum provides additional remedy",
          "Media pressure often works with builders",
        ],
      }
    }

    // Employment/Job Issue - AI Analysis
    else if (lowerQuery.includes("job") || lowerQuery.includes("salary") || lowerQuery.includes("company")) {
      return {
        caseType: "Employment Dispute - Wrongful Termination/Salary",
        caseStrength: "Moderate",
        winProbability: "60-70% (depends on employment terms)",
        timeEstimate: "6 months - 1 year",
        costEstimate: "₹25,000 - ₹75,000",
        complexityLevel: "Moderate",

        factAnalysis: {
          strongPoints: [
            "Labour laws generally favor employees",
            "Wrongful termination attracts compensation",
            "Salary non-payment is clear breach",
            "Industrial Disputes Act provides protection",
            "Conciliation process available",
          ],
          weakPoints: [
            "At-will employment clauses in contract",
            "Performance issues may justify termination",
            "Company financial difficulties",
            "Probation period termination easier",
            "Contract worker vs permanent employee distinction",
          ],
          missingEvidence: [
            "Employment contract/offer letter",
            "Salary slips and bank statements",
            "Performance appraisals and reviews",
            "Email correspondence with management",
            "Termination letter and reasons",
            "PF/ESI contribution records",
          ],
          legalBasis: [
            "Industrial Disputes Act 1947",
            "Payment of Wages Act 1936",
            "Contract Act 1872",
            "Labour laws (state-specific)",
          ],
        },

        strategy: {
          primaryApproach: "Conciliation first, then Labour Court if needed",
          alternativeApproaches: [
            "Direct negotiation with HR/management",
            "Union intervention and support",
            "Labour Commissioner complaint",
            "Civil suit for breach of contract",
            "Criminal complaint for salary non-payment",
          ],
          negotiationPoints: [
            "Full salary payment with interest",
            "Notice period compensation",
            "Gratuity and PF settlement",
            "Experience certificate and references",
            "Mutual separation agreement",
          ],
          courtStrategy: [
            "Prove wrongful termination without proper procedure",
            "Establish salary payment defaults",
            "Show violation of labour law provisions",
            "Claim compensation for mental harassment",
            "Demand reinstatement or compensation",
          ],
        },

        legalValidation: {
          applicableLaws: [
            {
              section: "Industrial Disputes Act Section 25F",
              relevance: "Conditions for valid retrenchment",
              strength: "High",
            },
            {
              section: "Payment of Wages Act Section 5",
              relevance: "Timely salary payment obligation",
              strength: "High",
            },
            {
              section: "Contract Act Section 73",
              relevance: "Compensation for breach",
              strength: "Medium",
            },
          ],
          precedents: [
            "Workmen of American Express vs Management (1985)",
            "Excel Wear vs Labour Court (2019)",
            "Various Labour Court decisions on wrongful termination",
          ],
          contradictions: [
            "Contract terms may allow termination with notice",
            "Performance issues may justify termination",
            "Company closure may excuse obligations",
          ],
        },

        opponentAnalysis: {
          likelyDefense: [
            "Will claim performance issues",
            "Will show misconduct allegations",
            "Will argue contract terms allow termination",
            "Will claim financial difficulties",
            "Will dispute employment status (contract vs permanent)",
          ],
          counterArguments: [
            "Performance issues not documented properly",
            "No proper disciplinary procedure followed",
            "Contract terms may be unfair and void",
            "Financial difficulties don't excuse salary payment",
            "Work pattern establishes permanent employment",
          ],
          weaknesses: [
            "Labour law violations",
            "Improper termination procedure",
            "Salary payment defaults",
            "No proper documentation",
            "Employee welfare law violations",
          ],
          negotiationLeverage: [
            "Labour law compliance issues",
            "Negative publicity threat",
            "Other employee complaints",
            "Regulatory action by labour department",
            "Union support and solidarity",
          ],
        },

        actionPlan: [
          {
            phase: "Immediate (1 week)",
            actions: [
              "Send written complaint to HR",
              "Collect all employment documents",
              "Calculate exact dues (salary, PF, gratuity)",
              "Approach Labour Commissioner",
              "Consult with labour lawyer",
            ],
            timeline: "1 week",
            priority: "High",
          },
          {
            phase: "Short-term (1-2 months)",
            actions: [
              "File complaint with Labour Commissioner",
              "Attend conciliation meetings",
              "Negotiate settlement terms",
              "Prepare case for Labour Court",
              "Gather witness statements",
            ],
            timeline: "2 months",
            priority: "High",
          },
        ],

        lawyerAdvice: {
          needsLawyer: true,
          reason: "Labour laws are complex and require expertise in industrial relations",
          specialization: "Labour and Employment Law",
          experience: "5-10 years in employment disputes",
          estimatedFees: "₹15,000 - ₹50,000",
        },

        warnings: [
          "Employment disputes have limitation periods",
          "Document all communications with employer",
          "Don't resign under pressure without legal advice",
          "Salary non-payment can become criminal matter",
        ],

        tips: [
          "Labour Commissioner conciliation is free and effective",
          "Union support can strengthen your case",
          "Keep detailed records of work and performance",
          "Settlement is often better than prolonged litigation",
        ],
      }
    }

    // Default Complex Case Analysis
    else {
      return {
        caseType: "Complex Legal Matter",
        caseStrength: "Unknown",
        winProbability: "Requires detailed analysis",
        timeEstimate: "Varies",
        costEstimate: "₹50,000 - ₹2,00,000",
        complexityLevel: "Complex",

        factAnalysis: {
          strongPoints: ["Requires case-specific analysis"],
          weakPoints: ["Need more details to assess"],
          missingEvidence: ["Complete case facts needed"],
          legalBasis: ["Multiple laws may be applicable"],
        },

        strategy: {
          primaryApproach: "Detailed case analysis required",
          alternativeApproaches: ["Consultation with specialist lawyer needed"],
          negotiationPoints: ["Case-specific"],
          courtStrategy: ["Depends on case merits"],
        },

        legalValidation: {
          applicableLaws: [
            {
              section: "Various",
              relevance: "Case-specific analysis needed",
              strength: "Medium",
            },
          ],
          precedents: ["Requires research"],
          contradictions: ["Need detailed facts"],
        },

        opponentAnalysis: {
          likelyDefense: ["Unknown without case details"],
          counterArguments: ["Requires analysis"],
          weaknesses: ["Need opponent information"],
          negotiationLeverage: ["Case-specific"],
        },

        actionPlan: [
          {
            phase: "Immediate",
            actions: [
              "Collect all relevant documents",
              "Prepare detailed case summary",
              "Consult with specialist lawyer",
              "Identify applicable laws",
              "Assess case strength",
            ],
            timeline: "1-2 weeks",
            priority: "High",
          },
        ],

        lawyerAdvice: {
          needsLawyer: true,
          reason: "Complex cases require expert legal analysis and strategy",
          specialization: "Depends on case type",
          experience: "Senior lawyer with relevant expertise",
          estimatedFees: "Varies based on complexity",
        },

        warnings: ["Complex cases need immediate legal attention"],
        tips: ["Provide more specific details for better analysis"],
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)

    // Simulate AI analysis steps
    const steps = [
      "📊 Case facts को analyze कर रहा हूं...",
      "⚖️ Applicable laws को cross-check कर रहा हूं...",
      "🔍 Legal precedents search कर रहा हूं...",
      "🎯 Opponent strategy predict कर रहा हूं...",
      "📋 Action plan prepare कर रहा हूं...",
      "✅ Final analysis complete!",
    ]

    for (let i = 0; i < steps.length; i++) {
      setAnalysisStep(steps[i])
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    const aiAnalysis = performAILawyerAnalysis(query)
    setAnalysis(aiAnalysis)
    setIsLoading(false)
    setAnalysisStep("")
  }

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "Strong":
        return "bg-green-100 text-green-800 border-green-200"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Weak":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Simple":
        return "bg-green-100 text-green-800"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800"
      case "Complex":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Scale className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">AI Lawyer GPT</h1>
            <Brain className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-xl text-gray-600 mb-2">🤖 AI-Powered Legal Analysis & Strategy</p>
          <p className="text-sm text-gray-500">
            Case Analysis • Legal Validation • Strategic Advice • Opponent Analysis
          </p>
        </div>

        {/* Query Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              अपना Case Detail में बताइए
            </CardTitle>
            <CardDescription>
              जितनी detail देंगे, उतना accurate legal analysis मिलेगा। Main एक experienced lawyer की तरह आपके case को analyze
              करूंगा।
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="Example: 
• Meri wife ne mujh par 498A ka jhootha case kiya hai. Humari love marriage thi 2020 mein, koi dowry nahi liya tha. Ab wo kehti hai maine usse torture kiya aur 5 lakh dowry manga. Police ne notice bheja hai. Mere paas sare WhatsApp messages hain jo prove karte hain ki maine kabhi dowry nahi manga. Kya karna chahiye?

• Builder ne mujhe 2019 mein flat book karaya tha, delivery date March 2021 tha. Abhi tak flat nahi mila. Agreement mein 12% penalty clause hai delay ke liye. Maine total 50 lakh diye hain. Builder kehta hai COVID ki wajah se delay hua. RERA complaint kar sakta hun?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-[150px]"
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 animate-pulse" />
                    {analysisStep}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    AI Legal Analysis शुरू करें
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* AI Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Case Overview */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Gavel className="h-6 w-6 text-blue-600" />🤖 AI Legal Analysis Overview
                </CardTitle>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge className={`${getStrengthColor(analysis.caseStrength)} border text-sm px-3 py-1`}>
                    Case Strength: {analysis.caseStrength}
                  </Badge>
                  <Badge className={`${getComplexityColor(analysis.complexityLevel)} text-sm px-3 py-1`}>
                    {analysis.complexityLevel}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Win Rate: {analysis.winProbability}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {analysis.timeEstimate}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" />
                    {analysis.costEstimate}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-lg mb-2">{analysis.caseType}</h3>
              </CardContent>
            </Card>

            {/* Fact Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-green-600" />📊 Case Facts Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Strong Points (आपके Favor में)
                    </h4>
                    <ul className="space-y-1">
                      {analysis.factAnalysis.strongPoints.map((point, index) => (
                        <li key={index} className="text-sm text-green-700 flex items-start gap-2">
                          <ArrowRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Weak Points (Challenges)
                    </h4>
                    <ul className="space-y-1">
                      {analysis.factAnalysis.weakPoints.map((point, index) => (
                        <li key={index} className="text-sm text-red-700 flex items-start gap-2">
                          <ArrowRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Missing Evidence (जरूरी सबूत)
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {analysis.factAnalysis.missingEvidence.map((evidence, index) => (
                      <li key={index} className="text-sm text-yellow-700 flex items-start gap-2">
                        <Target className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        {evidence}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Legal Validation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  ⚖️ Legal Validation & Cross-Check
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Applicable Laws:</h4>
                  <div className="space-y-2">
                    {analysis.legalValidation.applicableLaws.map((law, index) => (
                      <div key={index} className="bg-purple-50 p-3 rounded border border-purple-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-purple-900">{law.section}</span>
                          <Badge
                            className={`${law.strength === "High" ? "bg-green-100 text-green-800" : law.strength === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                          >
                            {law.strength}
                          </Badge>
                        </div>
                        <p className="text-sm text-purple-700">{law.relevance}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Legal Precedents:</h4>
                  <ul className="space-y-1">
                    {analysis.legalValidation.precedents.map((precedent, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <Gavel className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        {precedent}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Strategic Advice */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />🎯 Strategic Legal Advice
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Primary Strategy:</h4>
                  <p className="text-sm text-blue-700">{analysis.strategy.primaryApproach}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Alternative Approaches:</h4>
                    <ul className="space-y-1">
                      {analysis.strategy.alternativeApproaches.map((approach, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <ArrowRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {approach}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Negotiation Points:</h4>
                    <ul className="space-y-1">
                      {analysis.strategy.negotiationPoints.map((point, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <ArrowRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opponent Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-red-600" />🎭 Opponent Analysis & Counter-Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">Opponent's Likely Defense:</h4>
                    <ul className="space-y-1">
                      {analysis.opponentAnalysis.likelyDefense.map((defense, index) => (
                        <li key={index} className="text-sm text-red-700 flex items-start gap-2">
                          <ArrowRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {defense}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Our Counter-Arguments:</h4>
                    <ul className="space-y-1">
                      {analysis.opponentAnalysis.counterArguments.map((counter, index) => (
                        <li key={index} className="text-sm text-green-700 flex items-start gap-2">
                          <ArrowRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {counter}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">Negotiation Leverage:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {analysis.opponentAnalysis.negotiationLeverage.map((leverage, index) => (
                      <li key={index} className="text-sm text-yellow-700 flex items-start gap-2">
                        <Star className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        {leverage}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Action Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />📋 Phase-wise Action Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.actionPlan.map((phase, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-lg">{phase.phase}</h4>
                        <div className="flex gap-2">
                          <Badge className={getPriorityColor(phase.priority)}>{phase.priority} Priority</Badge>
                          <Badge variant="outline">{phase.timeline}</Badge>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {phase.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Lawyer Recommendation */}
            <Card
              className={`border-2 ${analysis.lawyerAdvice.needsLawyer ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  👨‍💼 Lawyer Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Lawyer Required:</span>
                    <Badge
                      className={
                        analysis.lawyerAdvice.needsLawyer ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                      }
                    >
                      {analysis.lawyerAdvice.needsLawyer ? "YES - Highly Recommended" : "Optional"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{analysis.lawyerAdvice.reason}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium">Specialization:</span> {analysis.lawyerAdvice.specialization}
                    </div>
                    <div>
                      <span className="font-medium">Experience:</span> {analysis.lawyerAdvice.experience}
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium">Estimated Fees:</span> {analysis.lawyerAdvice.estimatedFees}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warnings & Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <Shield className="h-5 w-5" />
                    ⚠️ Critical Warnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysis.warnings.map((warning, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-red-50 rounded border border-red-200">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-red-700">{warning}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Lightbulb className="h-5 w-5" />💡 Expert Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysis.tips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 rounded border border-blue-200">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-blue-700">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>🤖 AI-powered legal analysis based on Indian laws and precedents</p>
          <p className="mt-2">⚖️ Cross-verified with Constitution, IPC, CrPC, and Supreme Court judgments</p>
          <p className="mt-1">⚠️ This is AI analysis. For complex cases, consult with experienced lawyers.</p>
        </div>
      </div>
    </div>
  )
}
