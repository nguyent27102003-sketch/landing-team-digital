// Auto-generated Backend v1.1 Test Cases & Results Data
export const testCasesData = {
  "legacyTestCases": [
    {
      "Test_ID": "TEST 01",
      "Scenario": "Smartphone USB-C + PC + tripod; Live + Short Video + Product Photo; High; 1 PM; Compact; 5m",
      "Expected_Result": "SMARTPHONE; no camera/tripod purchase; audio+lighting+link",
      "Critical": "Yes"
    },
    {
      "Test_ID": "TEST 02",
      "Scenario": "Pocket 3 + PC + tripod; Video + Live; High; Balanced",
      "Expected_Result": "POCKET; do not repurchase Pocket",
      "Critical": "Yes"
    },
    {
      "Test_ID": "TEST 03",
      "Scenario": "PC; Live; OBS; Fixed",
      "Expected_Result": "WEBCAM_PC eligible and explained",
      "Critical": "Yes"
    },
    {
      "Test_ID": "TEST 04",
      "Scenario": "Smartphone; Live + Video; Budget 500k",
      "Expected_Result": "OVER_BUDGET without dropping mandatory",
      "Critical": "Yes"
    },
    {
      "Test_ID": "TEST 05",
      "Scenario": "Product Photo + Live",
      "Expected_Result": "Webcam not default primary",
      "Critical": "Yes"
    },
    {
      "Test_ID": "TEST 06",
      "Scenario": "Smartphone + compatible existing mic",
      "Expected_Result": "No mic purchase",
      "Critical": "Yes"
    },
    {
      "Test_ID": "TEST 07",
      "Scenario": "Primary DEAD; Backup ACTIVE",
      "Expected_Result": "Use backup",
      "Critical": "Yes"
    },
    {
      "Test_ID": "TEST 08",
      "Scenario": "Primary DEAD; Backup DEAD",
      "Expected_Result": "LINK_NEED_UPDATE",
      "Critical": "Yes"
    },
    {
      "Test_ID": "TEST 09",
      "Scenario": "Live; 2 Hosts",
      "Expected_Result": "Two-host audio solution",
      "Critical": "Yes"
    },
    {
      "Test_ID": "TEST 10",
      "Scenario": "Same input; Compact vs Professional",
      "Expected_Result": "Different sensible recommendations",
      "Critical": "Yes"
    },
    {
      "Test_ID": "TEST 11",
      "Scenario": "Unknown connector",
      "Expected_Result": "MISSING_DATA / warning",
      "Critical": "Yes"
    },
    {
      "Test_ID": "TEST 12",
      "Scenario": "Great but incompatible product",
      "Expected_Result": "Do not recommend",
      "Critical": "Yes"
    },
    {
      "Test_ID": "TEST 13",
      "Scenario": "Recommended product out of stock",
      "Expected_Result": "Use replacement",
      "Critical": "No"
    },
    {
      "Test_ID": "TEST 14",
      "Scenario": "User already owns most equipment",
      "Expected_Result": "Only missing products",
      "Critical": "No"
    },
    {
      "Test_ID": "TEST 15",
      "Scenario": "No valid solution",
      "Expected_Result": "NO_MATCH",
      "Critical": "No"
    }
  ],
  "legacyTestResults": [
    {
      "Test_ID": "TEST 01",
      "Actual_Result": "SMARTPHONE; AUD_DJI_MICMINI + LGT_GDX_C30BI; no camera/tripod; required total 2,560,000; links present",
      "Result": "PASS",
      "Evidence": "Core smartphone path",
      "Run_Date": "2026-08-10",
      "Formula_Error": "No",
      "Retest": "PASS"
    },
    {
      "Test_ID": "TEST 02",
      "Actual_Result": "POCKET selected; capture purchase blank when Has_Pocket=Yes",
      "Result": "PASS",
      "Evidence": "Existing-equipment rule",
      "Run_Date": "2026-08-10",
      "Formula_Error": "No",
      "Retest": "PASS"
    },
    {
      "Test_ID": "TEST 03",
      "Actual_Result": "WEBCAM_PC selected for PC+OBS+Fixed",
      "Result": "PASS",
      "Evidence": "Rule R04",
      "Run_Date": "2026-08-10",
      "Formula_Error": "No",
      "Retest": "PASS"
    },
    {
      "Test_ID": "TEST 04",
      "Actual_Result": "Required audio+light exceeds 500,000; OVER_BUDGET",
      "Result": "PASS",
      "Evidence": "No mandatory item removed",
      "Run_Date": "2026-08-10",
      "Formula_Error": "No",
      "Retest": "PASS"
    },
    {
      "Test_ID": "TEST 05",
      "Actual_Result": "Product photo prevents webcam from being default when smartphone is available",
      "Result": "PASS",
      "Evidence": "Rule R03",
      "Run_Date": "2026-08-10",
      "Formula_Error": "No",
      "Retest": "PASS"
    },
    {
      "Test_ID": "TEST 06",
      "Actual_Result": "Audio product ID blank when Has_Mic=Yes",
      "Result": "PASS",
      "Evidence": "Rule R05",
      "Run_Date": "2026-08-10",
      "Formula_Error": "No",
      "Retest": "PASS"
    },
    {
      "Test_ID": "TEST 07",
      "Actual_Result": "Backup-routing rule present in link table/action logic",
      "Result": "PASS",
      "Evidence": "Data fixture verified",
      "Run_Date": "2026-08-10",
      "Formula_Error": "No",
      "Retest": "PASS"
    },
    {
      "Test_ID": "TEST 08",
      "Actual_Result": "Both-dead state produces update warning in link policy",
      "Result": "PASS",
      "Evidence": "Data fixture verified",
      "Run_Date": "2026-08-10",
      "Formula_Error": "No",
      "Retest": "PASS"
    },
    {
      "Test_ID": "TEST 09",
      "Actual_Result": "Host_Count=2 selects AUD_DJI_MICMINI2",
      "Result": "PASS",
      "Evidence": "Two-host eligible model",
      "Run_Date": "2026-08-10",
      "Formula_Error": "No",
      "Retest": "PASS"
    },
    {
      "Test_ID": "TEST 10",
      "Actual_Result": "Compact selects compact rows; Professional selects Mic 3/RC60B/Tiny2 Lite by system",
      "Result": "PASS",
      "Evidence": "Not just price escalation",
      "Run_Date": "2026-08-10",
      "Formula_Error": "No",
      "Retest": "PASS"
    },
    {
      "Test_ID": "TEST 11",
      "Actual_Result": "Unknown connector returns MISSING_DATA",
      "Result": "PASS",
      "Evidence": "Input validation + status",
      "Run_Date": "2026-08-10",
      "Formula_Error": "No",
      "Retest": "PASS"
    },
    {
      "Test_ID": "TEST 12",
      "Actual_Result": "Compatibility status NOT_COMPATIBLE blocks RC60B + 65W charger chain",
      "Result": "PASS",
      "Evidence": "Compatibility record CMP011",
      "Run_Date": "2026-08-10",
      "Formula_Error": "No",
      "Retest": "PASS"
    },
    {
      "Test_ID": "TEST 13",
      "Actual_Result": "Anker sold-out warning maps UGREEN replacement",
      "Result": "PASS",
      "Evidence": "ALT006",
      "Run_Date": "2026-08-10",
      "Formula_Error": "No",
      "Retest": "PASS"
    },
    {
      "Test_ID": "TEST 14",
      "Actual_Result": "Has_Mic/Light/Tripod blanks those purchase rows",
      "Result": "PASS",
      "Evidence": "Existing-equipment logic",
      "Run_Date": "2026-08-10",
      "Formula_Error": "No",
      "Retest": "PASS"
    },
    {
      "Test_ID": "TEST 15",
      "Actual_Result": "No Smartphone/PC/Pocket returns NO_MATCH",
      "Result": "PASS",
      "Evidence": "System selector",
      "Run_Date": "2026-08-10",
      "Formula_Error": "No",
      "Retest": "PASS"
    }
  ],
  "investmentTestResults": [
    {
      "Test_ID": "INV-01",
      "Requirement_Tested": "Economy valid & complete price",
      "Input_Scenario": "10 kits, Live+Short Video, 1 Host, High Mobility, 5m",
      "Expected_Behavior": "Economy kit is Technical VALID and Cost COMPLETE",
      "Actual_Technical_Status": "VALID",
      "Actual_Cost_Status": "COMPLETE",
      "Actual_Purchase_Status": "READY",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "AUD_DJI_MICMINI + LGT_GDX_C30BI = 2,560,000đ/kit"
    },
    {
      "Test_ID": "INV-02",
      "Requirement_Tested": "Balanced same scenario",
      "Input_Scenario": "10 kits, Live+Short Video, 1 Host, High Mobility, 5m",
      "Expected_Behavior": "Balanced kit is Technical VALID and Cost COMPLETE",
      "Actual_Technical_Status": "VALID",
      "Actual_Cost_Status": "COMPLETE",
      "Actual_Purchase_Status": "READY",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "AUD_DJI_MICMINI + LGT_AMR_ACE25X = 2,760,000đ/kit"
    },
    {
      "Test_ID": "INV-03",
      "Requirement_Tested": "Upgrade meaningful improvement",
      "Input_Scenario": "10 kits, Live+Short Video, 1 Host, Pro style",
      "Expected_Behavior": "Upgrade provides factual gains (Internal Rec/COB)",
      "Actual_Technical_Status": "VALID",
      "Actual_Cost_Status": "INCOMPLETE",
      "Actual_Purchase_Status": "PARTIAL",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "Contains Mic 3 & RC 60B; Cost INCOMPLETE"
    },
    {
      "Test_ID": "INV-04",
      "Requirement_Tested": "Economy incompatible",
      "Input_Scenario": "10 kits, RC 60B + 65W PD Charger",
      "Expected_Behavior": "Technical Status == BLOCKED",
      "Actual_Technical_Status": "BLOCKED",
      "Actual_Cost_Status": "INCOMPLETE",
      "Actual_Purchase_Status": "BLOCKED",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "Requires 100W PD per Sheet 05 CMP011"
    },
    {
      "Test_ID": "INV-05",
      "Requirement_Tested": "Balanced missing price",
      "Input_Scenario": "Balanced kit with AUD_DJI_MIC3",
      "Expected_Behavior": "Technical VALID, Cost INCOMPLETE",
      "Actual_Technical_Status": "VALID",
      "Actual_Cost_Status": "INCOMPLETE",
      "Actual_Purchase_Status": "PARTIAL",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "AUD_DJI_MIC3 price NEED_VERIFY in Sheet 09"
    },
    {
      "Test_ID": "INV-06",
      "Requirement_Tested": "Upgrade no meaningful gain",
      "Input_Scenario": "Upgrade same specs as Balanced",
      "Expected_Behavior": "Do not duplicate Upgrade option",
      "Actual_Technical_Status": "VALID",
      "Actual_Cost_Status": "COMPLETE",
      "Actual_Purchase_Status": "READY",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "Upgrade omitted if no factual improvement"
    },
    {
      "Test_ID": "INV-07",
      "Requirement_Tested": "2 Hosts requirement",
      "Input_Scenario": "10 kits, Host_Count == 2",
      "Expected_Behavior": "Audio selects 2TX kit (AUD_DJI_MICMINI2)",
      "Actual_Technical_Status": "VALID",
      "Actual_Cost_Status": "COMPLETE",
      "Actual_Purchase_Status": "READY",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "Formula E6 returns AUD_DJI_MICMINI2"
    },
    {
      "Test_ID": "INV-08",
      "Requirement_Tested": "Mobility First priority",
      "Input_Scenario": "10 kits, Priority == MOBILITY_FIRST",
      "Expected_Behavior": "Flags compact integrated battery option",
      "Actual_Technical_Status": "VALID",
      "Actual_Cost_Status": "COMPLETE",
      "Actual_Purchase_Status": "READY",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "Selects Ace 25x over mains COB"
    },
    {
      "Test_ID": "INV-09",
      "Requirement_Tested": "Quality First priority",
      "Input_Scenario": "10 kits, Priority == QUALITY_FIRST",
      "Expected_Behavior": "Upgrade can be flagged as is_recommended",
      "Actual_Technical_Status": "VALID",
      "Actual_Cost_Status": "INCOMPLETE",
      "Actual_Purchase_Status": "PARTIAL",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "Upgrade flagged with Cost Warning"
    },
    {
      "Test_ID": "INV-10",
      "Requirement_Tested": "Cost Efficiency priority",
      "Input_Scenario": "10 kits, Priority == COST_EFFICIENCY",
      "Expected_Behavior": "Economy flagged as is_recommended if valid",
      "Actual_Technical_Status": "VALID",
      "Actual_Cost_Status": "COMPLETE",
      "Actual_Purchase_Status": "READY",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "Economy flagged as is_recommended"
    },
    {
      "Test_ID": "INV-11",
      "Requirement_Tested": "Missing mandatory adapter",
      "Input_Scenario": "Smartphone Lightning without adapter",
      "Expected_Behavior": "Technical Status == CONDITIONAL/BLOCKED",
      "Actual_Technical_Status": "CONDITIONAL",
      "Actual_Cost_Status": "COMPLETE",
      "Actual_Purchase_Status": "READY",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "Triggers Lightning adapter check"
    },
    {
      "Test_ID": "INV-12",
      "Requirement_Tested": "Dead direct purchase link",
      "Input_Scenario": "Selected product link DEAD",
      "Expected_Behavior": "Purchase Status == BLOCKED",
      "Actual_Technical_Status": "VALID",
      "Actual_Cost_Status": "COMPLETE",
      "Actual_Purchase_Status": "BLOCKED",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "R14 prevents surfacing dead purchase link"
    },
    {
      "Test_ID": "INV-13",
      "Requirement_Tested": "Official info link only",
      "Input_Scenario": "Selected candidate OFFICIAL link only",
      "Expected_Behavior": "Purchase Status == INFO_ONLY",
      "Actual_Technical_Status": "VALID",
      "Actual_Cost_Status": "INCOMPLETE",
      "Actual_Purchase_Status": "INFO_ONLY",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "Renders 'XEM THÔNG TIN HÃNG' CTA"
    },
    {
      "Test_ID": "INV-14",
      "Requirement_Tested": "Missing price handling",
      "Input_Scenario": "Selected candidate missing price",
      "Expected_Behavior": "Known subtotal shown; Price != 0",
      "Actual_Technical_Status": "VALID",
      "Actual_Cost_Status": "INCOMPLETE",
      "Actual_Purchase_Status": "PARTIAL",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "Cost_Status INCOMPLETE, no fake 0đ"
    },
    {
      "Test_ID": "INV-15",
      "Requirement_Tested": "Kit count 5 -> 20",
      "Input_Scenario": "Kit count changed from 5 to 20",
      "Expected_Behavior": "Product choice same, total multiplied by 20",
      "Actual_Technical_Status": "VALID",
      "Actual_Cost_Status": "COMPLETE",
      "Actual_Purchase_Status": "READY",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "Multiplies total cost correctly"
    },
    {
      "Test_ID": "INV-16",
      "Requirement_Tested": "Candidate product excluded",
      "Input_Scenario": "Candidate product excluded from option",
      "Expected_Behavior": "Exclusion reason traceable in Sheet 18",
      "Actual_Technical_Status": "VALID",
      "Actual_Cost_Status": "COMPLETE",
      "Actual_Purchase_Status": "READY",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "Sheet 18 Disqualify_Reason recorded"
    },
    {
      "Test_ID": "INV-17",
      "Requirement_Tested": "70 candidate screening",
      "Input_Scenario": "81 products screened for candidate pool",
      "Expected_Behavior": "100% 81/81 products accounted for",
      "Actual_Technical_Status": "VALID",
      "Actual_Cost_Status": "COMPLETE",
      "Actual_Purchase_Status": "READY",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "All 81 products categorized in Sheet 18"
    },
    {
      "Test_ID": "INV-18",
      "Requirement_Tested": "Full kit compatibility fail",
      "Input_Scenario": "Incompatible combination in kit",
      "Expected_Behavior": "Technical Status == BLOCKED",
      "Actual_Technical_Status": "BLOCKED",
      "Actual_Cost_Status": "COMPLETE",
      "Actual_Purchase_Status": "BLOCKED",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "Full kit check blocks invalid combination"
    },
    {
      "Test_ID": "INV-19",
      "Requirement_Tested": "Delta calculation incomplete",
      "Input_Scenario": "Balanced vs Upgrade (Upgrade price missing)",
      "Expected_Behavior": "Delta_Status == UNAVAILABLE",
      "Actual_Technical_Status": "VALID",
      "Actual_Cost_Status": "INCOMPLETE",
      "Actual_Purchase_Status": "PARTIAL",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "Delta rendered as UNAVAILABLE"
    },
    {
      "Test_ID": "INV-20",
      "Requirement_Tested": "Recommended flag logic",
      "Input_Scenario": "Priority == BALANCED",
      "Expected_Behavior": "is_recommended independent of Option B label",
      "Actual_Technical_Status": "VALID",
      "Actual_Cost_Status": "COMPLETE",
      "Actual_Purchase_Status": "READY",
      "Test_Outcome": "PASS",
      "Evidence_Notes": "is_recommended assigned via R_REC_02"
    }
  ]
};
export const legacyTestCases = [
  {
    "Test_ID": "TEST 01",
    "Scenario": "Smartphone USB-C + PC + tripod; Live + Short Video + Product Photo; High; 1 PM; Compact; 5m",
    "Expected_Result": "SMARTPHONE; no camera/tripod purchase; audio+lighting+link",
    "Critical": "Yes"
  },
  {
    "Test_ID": "TEST 02",
    "Scenario": "Pocket 3 + PC + tripod; Video + Live; High; Balanced",
    "Expected_Result": "POCKET; do not repurchase Pocket",
    "Critical": "Yes"
  },
  {
    "Test_ID": "TEST 03",
    "Scenario": "PC; Live; OBS; Fixed",
    "Expected_Result": "WEBCAM_PC eligible and explained",
    "Critical": "Yes"
  },
  {
    "Test_ID": "TEST 04",
    "Scenario": "Smartphone; Live + Video; Budget 500k",
    "Expected_Result": "OVER_BUDGET without dropping mandatory",
    "Critical": "Yes"
  },
  {
    "Test_ID": "TEST 05",
    "Scenario": "Product Photo + Live",
    "Expected_Result": "Webcam not default primary",
    "Critical": "Yes"
  },
  {
    "Test_ID": "TEST 06",
    "Scenario": "Smartphone + compatible existing mic",
    "Expected_Result": "No mic purchase",
    "Critical": "Yes"
  },
  {
    "Test_ID": "TEST 07",
    "Scenario": "Primary DEAD; Backup ACTIVE",
    "Expected_Result": "Use backup",
    "Critical": "Yes"
  },
  {
    "Test_ID": "TEST 08",
    "Scenario": "Primary DEAD; Backup DEAD",
    "Expected_Result": "LINK_NEED_UPDATE",
    "Critical": "Yes"
  },
  {
    "Test_ID": "TEST 09",
    "Scenario": "Live; 2 Hosts",
    "Expected_Result": "Two-host audio solution",
    "Critical": "Yes"
  },
  {
    "Test_ID": "TEST 10",
    "Scenario": "Same input; Compact vs Professional",
    "Expected_Result": "Different sensible recommendations",
    "Critical": "Yes"
  },
  {
    "Test_ID": "TEST 11",
    "Scenario": "Unknown connector",
    "Expected_Result": "MISSING_DATA / warning",
    "Critical": "Yes"
  },
  {
    "Test_ID": "TEST 12",
    "Scenario": "Great but incompatible product",
    "Expected_Result": "Do not recommend",
    "Critical": "Yes"
  },
  {
    "Test_ID": "TEST 13",
    "Scenario": "Recommended product out of stock",
    "Expected_Result": "Use replacement",
    "Critical": "No"
  },
  {
    "Test_ID": "TEST 14",
    "Scenario": "User already owns most equipment",
    "Expected_Result": "Only missing products",
    "Critical": "No"
  },
  {
    "Test_ID": "TEST 15",
    "Scenario": "No valid solution",
    "Expected_Result": "NO_MATCH",
    "Critical": "No"
  }
];
export const legacyTestResults = [
  {
    "Test_ID": "TEST 01",
    "Actual_Result": "SMARTPHONE; AUD_DJI_MICMINI + LGT_GDX_C30BI; no camera/tripod; required total 2,560,000; links present",
    "Result": "PASS",
    "Evidence": "Core smartphone path",
    "Run_Date": "2026-08-10",
    "Formula_Error": "No",
    "Retest": "PASS"
  },
  {
    "Test_ID": "TEST 02",
    "Actual_Result": "POCKET selected; capture purchase blank when Has_Pocket=Yes",
    "Result": "PASS",
    "Evidence": "Existing-equipment rule",
    "Run_Date": "2026-08-10",
    "Formula_Error": "No",
    "Retest": "PASS"
  },
  {
    "Test_ID": "TEST 03",
    "Actual_Result": "WEBCAM_PC selected for PC+OBS+Fixed",
    "Result": "PASS",
    "Evidence": "Rule R04",
    "Run_Date": "2026-08-10",
    "Formula_Error": "No",
    "Retest": "PASS"
  },
  {
    "Test_ID": "TEST 04",
    "Actual_Result": "Required audio+light exceeds 500,000; OVER_BUDGET",
    "Result": "PASS",
    "Evidence": "No mandatory item removed",
    "Run_Date": "2026-08-10",
    "Formula_Error": "No",
    "Retest": "PASS"
  },
  {
    "Test_ID": "TEST 05",
    "Actual_Result": "Product photo prevents webcam from being default when smartphone is available",
    "Result": "PASS",
    "Evidence": "Rule R03",
    "Run_Date": "2026-08-10",
    "Formula_Error": "No",
    "Retest": "PASS"
  },
  {
    "Test_ID": "TEST 06",
    "Actual_Result": "Audio product ID blank when Has_Mic=Yes",
    "Result": "PASS",
    "Evidence": "Rule R05",
    "Run_Date": "2026-08-10",
    "Formula_Error": "No",
    "Retest": "PASS"
  },
  {
    "Test_ID": "TEST 07",
    "Actual_Result": "Backup-routing rule present in link table/action logic",
    "Result": "PASS",
    "Evidence": "Data fixture verified",
    "Run_Date": "2026-08-10",
    "Formula_Error": "No",
    "Retest": "PASS"
  },
  {
    "Test_ID": "TEST 08",
    "Actual_Result": "Both-dead state produces update warning in link policy",
    "Result": "PASS",
    "Evidence": "Data fixture verified",
    "Run_Date": "2026-08-10",
    "Formula_Error": "No",
    "Retest": "PASS"
  },
  {
    "Test_ID": "TEST 09",
    "Actual_Result": "Host_Count=2 selects AUD_DJI_MICMINI2",
    "Result": "PASS",
    "Evidence": "Two-host eligible model",
    "Run_Date": "2026-08-10",
    "Formula_Error": "No",
    "Retest": "PASS"
  },
  {
    "Test_ID": "TEST 10",
    "Actual_Result": "Compact selects compact rows; Professional selects Mic 3/RC60B/Tiny2 Lite by system",
    "Result": "PASS",
    "Evidence": "Not just price escalation",
    "Run_Date": "2026-08-10",
    "Formula_Error": "No",
    "Retest": "PASS"
  },
  {
    "Test_ID": "TEST 11",
    "Actual_Result": "Unknown connector returns MISSING_DATA",
    "Result": "PASS",
    "Evidence": "Input validation + status",
    "Run_Date": "2026-08-10",
    "Formula_Error": "No",
    "Retest": "PASS"
  },
  {
    "Test_ID": "TEST 12",
    "Actual_Result": "Compatibility status NOT_COMPATIBLE blocks RC60B + 65W charger chain",
    "Result": "PASS",
    "Evidence": "Compatibility record CMP011",
    "Run_Date": "2026-08-10",
    "Formula_Error": "No",
    "Retest": "PASS"
  },
  {
    "Test_ID": "TEST 13",
    "Actual_Result": "Anker sold-out warning maps UGREEN replacement",
    "Result": "PASS",
    "Evidence": "ALT006",
    "Run_Date": "2026-08-10",
    "Formula_Error": "No",
    "Retest": "PASS"
  },
  {
    "Test_ID": "TEST 14",
    "Actual_Result": "Has_Mic/Light/Tripod blanks those purchase rows",
    "Result": "PASS",
    "Evidence": "Existing-equipment logic",
    "Run_Date": "2026-08-10",
    "Formula_Error": "No",
    "Retest": "PASS"
  },
  {
    "Test_ID": "TEST 15",
    "Actual_Result": "No Smartphone/PC/Pocket returns NO_MATCH",
    "Result": "PASS",
    "Evidence": "System selector",
    "Run_Date": "2026-08-10",
    "Formula_Error": "No",
    "Retest": "PASS"
  }
];
export const investmentTestResults = [
  {
    "Test_ID": "INV-01",
    "Requirement_Tested": "Economy valid & complete price",
    "Input_Scenario": "10 kits, Live+Short Video, 1 Host, High Mobility, 5m",
    "Expected_Behavior": "Economy kit is Technical VALID and Cost COMPLETE",
    "Actual_Technical_Status": "VALID",
    "Actual_Cost_Status": "COMPLETE",
    "Actual_Purchase_Status": "READY",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "AUD_DJI_MICMINI + LGT_GDX_C30BI = 2,560,000đ/kit"
  },
  {
    "Test_ID": "INV-02",
    "Requirement_Tested": "Balanced same scenario",
    "Input_Scenario": "10 kits, Live+Short Video, 1 Host, High Mobility, 5m",
    "Expected_Behavior": "Balanced kit is Technical VALID and Cost COMPLETE",
    "Actual_Technical_Status": "VALID",
    "Actual_Cost_Status": "COMPLETE",
    "Actual_Purchase_Status": "READY",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "AUD_DJI_MICMINI + LGT_AMR_ACE25X = 2,760,000đ/kit"
  },
  {
    "Test_ID": "INV-03",
    "Requirement_Tested": "Upgrade meaningful improvement",
    "Input_Scenario": "10 kits, Live+Short Video, 1 Host, Pro style",
    "Expected_Behavior": "Upgrade provides factual gains (Internal Rec/COB)",
    "Actual_Technical_Status": "VALID",
    "Actual_Cost_Status": "INCOMPLETE",
    "Actual_Purchase_Status": "PARTIAL",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "Contains Mic 3 & RC 60B; Cost INCOMPLETE"
  },
  {
    "Test_ID": "INV-04",
    "Requirement_Tested": "Economy incompatible",
    "Input_Scenario": "10 kits, RC 60B + 65W PD Charger",
    "Expected_Behavior": "Technical Status == BLOCKED",
    "Actual_Technical_Status": "BLOCKED",
    "Actual_Cost_Status": "INCOMPLETE",
    "Actual_Purchase_Status": "BLOCKED",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "Requires 100W PD per Sheet 05 CMP011"
  },
  {
    "Test_ID": "INV-05",
    "Requirement_Tested": "Balanced missing price",
    "Input_Scenario": "Balanced kit with AUD_DJI_MIC3",
    "Expected_Behavior": "Technical VALID, Cost INCOMPLETE",
    "Actual_Technical_Status": "VALID",
    "Actual_Cost_Status": "INCOMPLETE",
    "Actual_Purchase_Status": "PARTIAL",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "AUD_DJI_MIC3 price NEED_VERIFY in Sheet 09"
  },
  {
    "Test_ID": "INV-06",
    "Requirement_Tested": "Upgrade no meaningful gain",
    "Input_Scenario": "Upgrade same specs as Balanced",
    "Expected_Behavior": "Do not duplicate Upgrade option",
    "Actual_Technical_Status": "VALID",
    "Actual_Cost_Status": "COMPLETE",
    "Actual_Purchase_Status": "READY",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "Upgrade omitted if no factual improvement"
  },
  {
    "Test_ID": "INV-07",
    "Requirement_Tested": "2 Hosts requirement",
    "Input_Scenario": "10 kits, Host_Count == 2",
    "Expected_Behavior": "Audio selects 2TX kit (AUD_DJI_MICMINI2)",
    "Actual_Technical_Status": "VALID",
    "Actual_Cost_Status": "COMPLETE",
    "Actual_Purchase_Status": "READY",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "Formula E6 returns AUD_DJI_MICMINI2"
  },
  {
    "Test_ID": "INV-08",
    "Requirement_Tested": "Mobility First priority",
    "Input_Scenario": "10 kits, Priority == MOBILITY_FIRST",
    "Expected_Behavior": "Flags compact integrated battery option",
    "Actual_Technical_Status": "VALID",
    "Actual_Cost_Status": "COMPLETE",
    "Actual_Purchase_Status": "READY",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "Selects Ace 25x over mains COB"
  },
  {
    "Test_ID": "INV-09",
    "Requirement_Tested": "Quality First priority",
    "Input_Scenario": "10 kits, Priority == QUALITY_FIRST",
    "Expected_Behavior": "Upgrade can be flagged as is_recommended",
    "Actual_Technical_Status": "VALID",
    "Actual_Cost_Status": "INCOMPLETE",
    "Actual_Purchase_Status": "PARTIAL",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "Upgrade flagged with Cost Warning"
  },
  {
    "Test_ID": "INV-10",
    "Requirement_Tested": "Cost Efficiency priority",
    "Input_Scenario": "10 kits, Priority == COST_EFFICIENCY",
    "Expected_Behavior": "Economy flagged as is_recommended if valid",
    "Actual_Technical_Status": "VALID",
    "Actual_Cost_Status": "COMPLETE",
    "Actual_Purchase_Status": "READY",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "Economy flagged as is_recommended"
  },
  {
    "Test_ID": "INV-11",
    "Requirement_Tested": "Missing mandatory adapter",
    "Input_Scenario": "Smartphone Lightning without adapter",
    "Expected_Behavior": "Technical Status == CONDITIONAL/BLOCKED",
    "Actual_Technical_Status": "CONDITIONAL",
    "Actual_Cost_Status": "COMPLETE",
    "Actual_Purchase_Status": "READY",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "Triggers Lightning adapter check"
  },
  {
    "Test_ID": "INV-12",
    "Requirement_Tested": "Dead direct purchase link",
    "Input_Scenario": "Selected product link DEAD",
    "Expected_Behavior": "Purchase Status == BLOCKED",
    "Actual_Technical_Status": "VALID",
    "Actual_Cost_Status": "COMPLETE",
    "Actual_Purchase_Status": "BLOCKED",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "R14 prevents surfacing dead purchase link"
  },
  {
    "Test_ID": "INV-13",
    "Requirement_Tested": "Official info link only",
    "Input_Scenario": "Selected candidate OFFICIAL link only",
    "Expected_Behavior": "Purchase Status == INFO_ONLY",
    "Actual_Technical_Status": "VALID",
    "Actual_Cost_Status": "INCOMPLETE",
    "Actual_Purchase_Status": "INFO_ONLY",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "Renders 'XEM THÔNG TIN HÃNG' CTA"
  },
  {
    "Test_ID": "INV-14",
    "Requirement_Tested": "Missing price handling",
    "Input_Scenario": "Selected candidate missing price",
    "Expected_Behavior": "Known subtotal shown; Price != 0",
    "Actual_Technical_Status": "VALID",
    "Actual_Cost_Status": "INCOMPLETE",
    "Actual_Purchase_Status": "PARTIAL",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "Cost_Status INCOMPLETE, no fake 0đ"
  },
  {
    "Test_ID": "INV-15",
    "Requirement_Tested": "Kit count 5 -> 20",
    "Input_Scenario": "Kit count changed from 5 to 20",
    "Expected_Behavior": "Product choice same, total multiplied by 20",
    "Actual_Technical_Status": "VALID",
    "Actual_Cost_Status": "COMPLETE",
    "Actual_Purchase_Status": "READY",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "Multiplies total cost correctly"
  },
  {
    "Test_ID": "INV-16",
    "Requirement_Tested": "Candidate product excluded",
    "Input_Scenario": "Candidate product excluded from option",
    "Expected_Behavior": "Exclusion reason traceable in Sheet 18",
    "Actual_Technical_Status": "VALID",
    "Actual_Cost_Status": "COMPLETE",
    "Actual_Purchase_Status": "READY",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "Sheet 18 Disqualify_Reason recorded"
  },
  {
    "Test_ID": "INV-17",
    "Requirement_Tested": "70 candidate screening",
    "Input_Scenario": "81 products screened for candidate pool",
    "Expected_Behavior": "100% 81/81 products accounted for",
    "Actual_Technical_Status": "VALID",
    "Actual_Cost_Status": "COMPLETE",
    "Actual_Purchase_Status": "READY",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "All 81 products categorized in Sheet 18"
  },
  {
    "Test_ID": "INV-18",
    "Requirement_Tested": "Full kit compatibility fail",
    "Input_Scenario": "Incompatible combination in kit",
    "Expected_Behavior": "Technical Status == BLOCKED",
    "Actual_Technical_Status": "BLOCKED",
    "Actual_Cost_Status": "COMPLETE",
    "Actual_Purchase_Status": "BLOCKED",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "Full kit check blocks invalid combination"
  },
  {
    "Test_ID": "INV-19",
    "Requirement_Tested": "Delta calculation incomplete",
    "Input_Scenario": "Balanced vs Upgrade (Upgrade price missing)",
    "Expected_Behavior": "Delta_Status == UNAVAILABLE",
    "Actual_Technical_Status": "VALID",
    "Actual_Cost_Status": "INCOMPLETE",
    "Actual_Purchase_Status": "PARTIAL",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "Delta rendered as UNAVAILABLE"
  },
  {
    "Test_ID": "INV-20",
    "Requirement_Tested": "Recommended flag logic",
    "Input_Scenario": "Priority == BALANCED",
    "Expected_Behavior": "is_recommended independent of Option B label",
    "Actual_Technical_Status": "VALID",
    "Actual_Cost_Status": "COMPLETE",
    "Actual_Purchase_Status": "READY",
    "Test_Outcome": "PASS",
    "Evidence_Notes": "is_recommended assigned via R_REC_02"
  }
];
