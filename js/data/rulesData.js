// Auto-generated from 06_RECOMMEND_RULE and 07_EXPLANATION_RULE
export const recommendRules = [
  {
    "Rule_ID": "R01",
    "Priority": 10.0,
    "Condition": "Has_Smartphone=Yes AND Mobility=High",
    "Action": "Prefer SMARTPHONE",
    "Rationale": "Reuse the phone when it meets the use case",
    "Active": "Yes",
    "Rules_Version": "1.0"
  },
  {
    "Rule_ID": "R02",
    "Priority": 20.0,
    "Condition": "Has_Pocket=Yes AND video requirement",
    "Action": "Prefer POCKET",
    "Rationale": "Do not rebuy Pocket 3",
    "Active": "Yes",
    "Rules_Version": "1.0"
  },
  {
    "Rule_ID": "R03",
    "Priority": 30.0,
    "Condition": "Need_Product_Photo=Yes",
    "Action": "Do not default WEBCAM as primary capture",
    "Rationale": "Phone/Pocket photo fit must be evaluated",
    "Active": "Yes",
    "Rules_Version": "1.0"
  },
  {
    "Rule_ID": "R04",
    "Priority": 40.0,
    "Condition": "OBS=Yes AND Mobility=Fixed AND Has_PC=Yes",
    "Action": "WEBCAM_PC eligible",
    "Rationale": "Fixed OBS workflow can win",
    "Active": "Yes",
    "Rules_Version": "1.0"
  },
  {
    "Rule_ID": "R05",
    "Priority": 50.0,
    "Condition": "Has_Mic=Yes AND compatible",
    "Action": "Audio purchase blank",
    "Rationale": "Do not rebuy existing mic",
    "Active": "Yes",
    "Rules_Version": "1.0"
  },
  {
    "Rule_ID": "R06",
    "Priority": 60.0,
    "Condition": "Style=Compact",
    "Action": "Prefer low setup/cable/weight",
    "Rationale": "Must still meet mandatory use case",
    "Active": "Yes",
    "Rules_Version": "1.0"
  },
  {
    "Rule_ID": "R07",
    "Priority": 70.0,
    "Condition": "Style=Professional",
    "Action": "Prefer reliability/quality/expandability",
    "Rationale": "Do not equate price with fit",
    "Active": "Yes",
    "Rules_Version": "1.0"
  },
  {
    "Rule_ID": "R08",
    "Priority": 80.0,
    "Condition": "Budget < Required_Total",
    "Action": "OVER_BUDGET",
    "Rationale": "Do not remove mandatory items",
    "Active": "Yes",
    "Rules_Version": "1.0"
  },
  {
    "Rule_ID": "R09",
    "Priority": 90.0,
    "Condition": "Need_Live=Yes",
    "Action": "Valid audio required",
    "Rationale": "Live without audio is invalid",
    "Active": "Yes",
    "Rules_Version": "1.0"
  },
  {
    "Rule_ID": "R10",
    "Priority": 100.0,
    "Condition": "Any live/video/photo need",
    "Action": "Evaluate lighting",
    "Rationale": "Do not omit lighting silently",
    "Active": "Yes",
    "Rules_Version": "1.0"
  },
  {
    "Rule_ID": "R11",
    "Priority": 110.0,
    "Condition": "Host_Count=2",
    "Action": "Two-host audio required",
    "Rationale": "1TX kit is ineligible",
    "Active": "Yes",
    "Rules_Version": "1.0"
  },
  {
    "Rule_ID": "R12",
    "Priority": 120.0,
    "Condition": "Mobility=High AND Operator=1 PM",
    "Action": "Avoid bulky setup",
    "Rationale": "Favor integrated battery and low cable",
    "Active": "Yes",
    "Rules_Version": "1.0"
  },
  {
    "Rule_ID": "R13",
    "Priority": 130.0,
    "Condition": "Existing compatible equipment=Yes",
    "Action": "Cost=0 and not purchase-required",
    "Rationale": "Reuse owned gear",
    "Active": "Yes",
    "Rules_Version": "1.0"
  },
  {
    "Rule_ID": "R14",
    "Priority": 140.0,
    "Condition": "Primary link DEAD/OUT_OF_STOCK",
    "Action": "Use active backup or replacement",
    "Rationale": "Never surface a dead purchase link",
    "Active": "Yes",
    "Rules_Version": "1.0"
  }
];

export const explanationRules = [
  {
    "Explanation_ID": "E01",
    "Context": "System selection",
    "Fact": "Existing Smartphone + High mobility",
    "Impact": "Avoids buying another camera and reduces carried equipment",
    "User_Context": "One-person mobile setup",
    "Conclusion": "Ưu tiên hệ Smartphone vì tận dụng thiết bị sẵn có và giảm thời gian setup."
  },
  {
    "Explanation_ID": "E02",
    "Context": "System selection",
    "Fact": "Existing Pocket 3 + video need",
    "Impact": "Uses stabilized 1-inch-sensor capture already owned",
    "User_Context": "Mobile video/live",
    "Conclusion": "Ưu tiên Pocket 3 hiện có; không mua lại camera."
  },
  {
    "Explanation_ID": "E03",
    "Context": "System selection",
    "Fact": "PC + OBS + Fixed",
    "Impact": "Webcam integrates directly with the live software and fixed desk workflow",
    "User_Context": "Fixed live room",
    "Conclusion": "Webcam/PC phù hợp vì kết nối trực tiếp OBS và không cần tính cơ động cao."
  },
  {
    "Explanation_ID": "E04",
    "Context": "Lighting",
    "Fact": "RC 60B has an integrated battery and 100W USB-C PD path",
    "Impact": "Reduces dependency on wall power while retaining COB output",
    "User_Context": "High mobility",
    "Conclusion": "Ưu tiên RC 60B khi cần COB cơ động; cần kế hoạch nguồn cho phiên dài."
  },
  {
    "Explanation_ID": "E05",
    "Context": "Budget",
    "Fact": "Budget is below required mandatory total",
    "Impact": "A complete valid setup cannot fit the budget",
    "User_Context": "Any",
    "Conclusion": "OVER_BUDGET; không loại audio/lighting bắt buộc để ép ngân sách."
  }
];
