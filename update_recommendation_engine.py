import re

with open('js/engine/recommendationEngine.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace system selection logic to handle No-Capture case
old_system_logic = """    } else {
      recommendedSystem = "NO_MATCH";
      debug.appliedRules.push("R-NO-MATCH: No primary device available");
    }"""

new_system_logic = """    } else if (needVideoOrPhoto) {
      // FIX CRITICAL BUG: When user owns no capture device, CAPTURE is REQUIRED_PURCHASE
      recommendedSystem = "POCKET";
      debug.appliedRules.push("R-CAPTURE-REQUIRED: No capture device owned -> Infer POCKET system and require PKT_DJI_OP3_STD");
    } else {
      recommendedSystem = "NO_MATCH";
      debug.appliedRules.push("R-NO-MATCH: No primary device available");
    }"""

code = code.replace(old_system_logic, new_system_logic)

# Update captureProductId logic when recommendedSystem is POCKET and not owned
old_capture_logic = """    } else if (recommendedSystem === "POCKET") {
      captureProductId = inputs.hasPocket ? "" : "PKT_DJI_OP3_STD";
    }"""

new_capture_logic = """    } else if (recommendedSystem === "POCKET") {
      captureProductId = inputs.hasPocket ? "" : "PKT_DJI_OP3_STD";
      if (!inputs.hasPocket) {
        debug.appliedRules.push("R-CAPTURE-REQUIRED: Require PKT_DJI_OP3_STD purchase");
      }
    }"""

code = code.replace(old_capture_logic, new_capture_logic)

# Replace SmallRig RC60B light recommendation with amaran/godox
code = code.replace('lightProductId = "LGT_SMR_RC60B";', 'lightProductId = "LGT_AMR_ACE25X"; // Excluded SmallRig from new recs')
code = code.replace('productId: "RIG_SMR_UCAGE",', 'productId: "RIG_ULA_MA53", // Excluded SmallRig from new recs')

with open('js/engine/recommendationEngine.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated js/engine/recommendationEngine.js with No-Capture fix and SmallRig exclusion!")
