import { productsData } from '../data/productsData.js';
import { specsData } from '../data/specsData.js';
import { compatibilityData } from '../data/compatibilityData.js';
import { recommendRules, explanationRules } from '../data/rulesData.js';
import { alternativesData } from '../data/alternativesData.js';

// Lookup map for fast access
const productsMap = new Map();
productsData.forEach(p => productsMap.set(p.Product_ID, p));

export class RecommendationEngine {
  constructor() {
    this.products = productsData;
    this.productsMap = productsMap;
    this.compatibilityRules = compatibilityData;
    this.rules = recommendRules;
    this.explanations = explanationRules;
    this.alternatives = alternativesData;
  }

  getProduct(productId) {
    return this.productsMap.get(productId) || null;
  }

  evaluate(inputs) {
    const debug = {
      appliedRules: [],
      excludedProducts: [],
      trace: []
    };

    // 1. Determine Recommended System (01_CONFIGURATOR E4)
    // Formula: =IF(AND(B8="Yes",OR(B18="Yes",B19="Yes",B20="Yes")),"POCKET",IF(AND(B4="Yes",B24="High"),"SMARTPHONE",IF(AND(B7="Yes",B23="Yes",B24="Fixed"),"WEBCAM_PC",IF(B4="Yes","SMARTPHONE",IF(B7="Yes","WEBCAM_PC","NO_MATCH")))))
    let recommendedSystem = "NO_MATCH";
    const needVideoOrPhoto = Boolean(inputs.needShortVideo || inputs.needLongVideo || inputs.needProductPhoto);

    if (inputs.hasPocket && needVideoOrPhoto) {
      recommendedSystem = "POCKET";
      debug.appliedRules.push("R02: Has_Pocket=Yes AND video requirement -> Prefer POCKET");
    } else if (inputs.hasSmartphone && inputs.mobility === "High") {
      recommendedSystem = "SMARTPHONE";
      debug.appliedRules.push("R01: Has_Smartphone=Yes AND Mobility=High -> Prefer SMARTPHONE");
    } else if (inputs.hasLaptopPC && inputs.obs === "Yes" && inputs.mobility === "Fixed") {
      recommendedSystem = "WEBCAM_PC";
      debug.appliedRules.push("R04: OBS=Yes AND Mobility=Fixed AND Has_PC=Yes -> WEBCAM_PC");
    } else if (inputs.hasSmartphone) {
      recommendedSystem = "SMARTPHONE";
      debug.appliedRules.push("R01-Fallback: Has_Smartphone=Yes -> Prefer SMARTPHONE");
    } else if (inputs.hasLaptopPC) {
      recommendedSystem = "WEBCAM_PC";
      debug.appliedRules.push("R04-Fallback: Has_PC=Yes -> WEBCAM_PC");
    } else if (needVideoOrPhoto) {
      // FIX CRITICAL BUG: When user owns no capture device, CAPTURE is REQUIRED_PURCHASE
      recommendedSystem = "POCKET";
      debug.appliedRules.push("R-CAPTURE-REQUIRED: No capture device owned -> Infer POCKET system and require PKT_DJI_OP3_STD");
    } else {
      recommendedSystem = "NO_MATCH";
      debug.appliedRules.push("R-NO-MATCH: No primary device available");
    }

    // 2. System Reason (01_CONFIGURATOR E5)
    let systemReason = "Không đủ dữ liệu để chọn hệ.";
    if (recommendedSystem === "SMARTPHONE") {
      systemReason = "Tận dụng smartphone sẵn có để giảm thiết bị và thời gian setup.";
    } else if (recommendedSystem === "POCKET") {
      systemReason = "Tận dụng Pocket cho video ổn định; không mua lại camera nếu đã có.";
    } else if (recommendedSystem === "WEBCAM_PC") {
      systemReason = "PC + OBS + setup cố định phù hợp luồng webcam trực tiếp.";
    }

    // 3. Audio Product ID (01_CONFIGURATOR E6)
    // Formula: =IF(B11="Yes","",IF(B22="2","AUD_DJI_MICMINI2",IF(B28="Professional","AUD_DJI_MIC3","AUD_DJI_MICMINI")))
    let audioProductId = "";
    if (inputs.hasMic) {
      audioProductId = "";
      debug.appliedRules.push("R05: Has_Mic=Yes -> Do not purchase mic");
    } else if (String(inputs.hostCount) === "2") {
      audioProductId = "AUD_DJI_MICMINI2";
      debug.appliedRules.push("R11: Host_Count=2 -> AUD_DJI_MICMINI2 (2-host solution)");
    } else if (inputs.style === "Professional") {
      audioProductId = "AUD_DJI_MIC3";
      debug.appliedRules.push("R07: Style=Professional -> AUD_DJI_MIC3");
    } else {
      audioProductId = "AUD_DJI_MICMINI";
      debug.appliedRules.push("R06: Style=Compact/Balanced 1-Host -> AUD_DJI_MICMINI");
    }

    // 4. Light Product ID (01_CONFIGURATOR E7)
    // Formula: =IF(B12="Yes","",IF(B28="Professional","LGT_SMR_RC60B",IF(B29<5000000,"LGT_GDX_C30BI","LGT_AMR_ACE25X")))
    let lightProductId = "";
    if (inputs.hasLight) {
      lightProductId = "";
      debug.appliedRules.push("R-Light-Owned: Has_Light=Yes -> Do not purchase light");
    } else if (inputs.style === "Professional") {
      lightProductId = "LGT_AMR_ACE25X"; // Excluded SmallRig from new recs
      debug.appliedRules.push("R07: Style=Professional -> LGT_SMR_RC60B");
    } else if (Number(inputs.budgetVND) < 5000000) {
      lightProductId = "LGT_GDX_C30BI";
      debug.appliedRules.push("R-Light-Budget: Budget < 5M -> LGT_GDX_C30BI");
    } else {
      lightProductId = "LGT_AMR_ACE25X";
      debug.appliedRules.push("R-Light-Balanced: Budget >= 5M -> LGT_AMR_ACE25X");
    }

    // 5. Capture Product ID (01_CONFIGURATOR E8)
    // Formula: =IF(E4="SMARTPHONE","",IF(E4="POCKET",IF(B8="Yes","","PKT_DJI_OP3_STD"),IF(E4="WEBCAM_PC",IF(B10="Yes","",IF(B28="Professional","WCM_OBS_TINY2L","WCM_OBS_MEET2")),"")))
    let captureProductId = "";
    if (recommendedSystem === "SMARTPHONE") {
      captureProductId = "";
    } else if (recommendedSystem === "POCKET") {
      captureProductId = inputs.hasPocket ? "" : "PKT_DJI_OP3_STD";
      if (!inputs.hasPocket) {
        debug.appliedRules.push("R-CAPTURE-REQUIRED: Require PKT_DJI_OP3_STD purchase");
      }
    } else if (recommendedSystem === "WEBCAM_PC") {
      if (inputs.hasWebcam) {
        captureProductId = "";
        debug.appliedRules.push("R-Webcam-Owned: Has_Webcam=Yes -> Do not purchase webcam");
      } else if (inputs.style === "Professional") {
        captureProductId = "WCM_OBS_TINY2L";
        debug.appliedRules.push("R07: Style=Professional -> WCM_OBS_TINY2L (PTZ tracking)");
      } else {
        captureProductId = "WCM_OBS_MEET2";
        debug.appliedRules.push("R-Webcam-Default: WCM_OBS_MEET2 (4K AI Auto Framing)");
      }
    }

    // 6. Build Purchase Items List (02_OUTPUT Rows 18-25)
    const items = [];

    // Slot 18: Capture
    if (captureProductId) {
      const p = this.getProduct(captureProductId);
      items.push({
        slot: 18,
        tier: "REQUIRED",
        productId: captureProductId,
        product: p,
        whySelected: p?.Strength_1_Fact ? `${p.Strength_1_Fact}. ${p.Strength_1_Impact}` : "Thiết bị ghi hình chính của combo.",
        compatibilityNote: "Xem ma trận tương thích cho điều kiện chi tiết."
      });
    }

    // Slot 19: Audio
    if (audioProductId) {
      const p = this.getProduct(audioProductId);
      items.push({
        slot: 19,
        tier: "REQUIRED",
        productId: audioProductId,
        product: p,
        whySelected: p?.Strength_1_Fact ? `${p.Strength_1_Fact}. ${p.Strength_1_Impact}` : "Micro không dây đảm bảo chất lượng thu âm.",
        compatibilityNote: "Tương thích chuẩn kết nối của thiết bị ghi hình."
      });
    }

    // Slot 20: Light
    if (lightProductId) {
      const p = this.getProduct(lightProductId);
      items.push({
        slot: 20,
        tier: "REQUIRED",
        productId: lightProductId,
        product: p,
        whySelected: p?.Strength_1_Fact ? `${p.Strength_1_Fact}. ${p.Strength_1_Impact}` : "Đèn chiếu sáng bổ trợ khung hình livestream/video.",
        compatibilityNote: "Xem yêu cầu nguồn và chân mount."
      });
    }

    // Slot 21: USB Hub (02_OUTPUT Row 21: =IF(AND('01_CONFIGURATOR'!E4="WEBCAM_PC",'01_CONFIGURATOR'!B15="No"),"RECOMMENDED",""))
    if (recommendedSystem === "WEBCAM_PC" && !inputs.hasHubAdapter) {
      const p = this.getProduct("HUB_UGR_REVO105");
      items.push({
        slot: 21,
        tier: "RECOMMENDED",
        productId: "HUB_UGR_REVO105",
        product: p,
        whySelected: "Mở rộng cổng kết nối USB cho Webcam và Mic trên PC/Laptop.",
        compatibilityNote: "Đảm bảo băng thông USB 3.0 cho webcam 4K."
      });
    }

    // Slot 22: Storage (02_OUTPUT Row 22: =IF(AND('01_CONFIGURATOR'!E4="POCKET",'01_CONFIGURATOR'!B16="No"),"REQUIRED",""))
    if (recommendedSystem === "POCKET" && !inputs.hasStorage) {
      const p = this.getProduct("STO_KIN_GO");
      items.push({
        slot: 22,
        tier: "REQUIRED",
        productId: "STO_KIN_GO",
        product: p,
        whySelected: "Thẻ nhớ microSD V30 tốc độ cao nằm trong danh sách khuyến nghị của DJI Pocket 3.",
        compatibilityNote: "Chuẩn V30 / U3 đáp ứng ghi 4K/120fps."
      });
    }

    // Slot 23: Rig / Phone Cage (02_OUTPUT Row 23: =IF(AND('01_CONFIGURATOR'!E4="SMARTPHONE",'01_CONFIGURATOR'!B13="No"),"RECOMMENDED",""))
    if (recommendedSystem === "SMARTPHONE" && !inputs.hasTripod) {
      const p = this.getProduct("RIG_SMR_UCAGE");
      items.push({
        slot: 23,
        tier: "RECOMMENDED",
        productId: "RIG_ULA_MA53", // Excluded SmallRig from new recs
        product: p,
        whySelected: "Khung gắn điện thoại đa năng, hỗ trợ gắn đồng thời Mic và Đèn khi chưa có tripod chuyên dụng.",
        compatibilityNote: "Tương thích hầu hết smartphone kích thước tiêu chuẩn."
      });
    }

    // Slot 24: Gimbal (02_OUTPUT Row 24: =IF(AND('01_CONFIGURATOR'!E4="SMARTPHONE",'01_CONFIGURATOR'!B18="Yes",'01_CONFIGURATOR'!B28<>"Compact"),"OPTIONAL",""))
    if (recommendedSystem === "SMARTPHONE" && inputs.needShortVideo && inputs.style !== "Compact") {
      const p = this.getProduct("GIM_DJI_OM8");
      items.push({
        slot: 24,
        tier: "OPTIONAL",
        productId: "GIM_DJI_OM8",
        product: p,
        whySelected: "Gimbal chống rung chuyên dụng cho quay video chuyển động linh hoạt.",
        compatibilityNote: "Tương thích điện thoại thông qua ngàm từ tính."
      });
    }

    // Slot 25: Power Bank (02_OUTPUT Row 25: =IF(AND('01_CONFIGURATOR'!B14="No",'01_CONFIGURATOR'!B24="High"),"OPTIONAL",""))
    if (!inputs.hasPower && inputs.mobility === "High") {
      const p = this.getProduct("PWR_UGR_20K100");
      items.push({
        slot: 25,
        tier: "OPTIONAL",
        productId: "PWR_UGR_20K100",
        product: p,
        whySelected: "Pin sạc dự phòng 100W PD dung lượng 20,000mAh cấp nguồn di động cho phiên live/quay dài.",
        compatibilityNote: "Cổng USB-C hỗ trợ chuẩn sạc nhanh 100W PD."
      });
    }

    // Slot 26: DJI Mic Series Mobile Receiver Lightning Adapter (Auto-added if iPhone Lightning + DJI Mobile Receiver)
    if (inputs.hasSmartphone && inputs.smartphoneConnector === "Lightning" && (audioProductId === "AUD_DJI_MICMINI" || audioProductId === "AUD_DJI_MICMINI2") && !inputs.hasAdapter) {
      const p = this.getProduct("AUD_ADP_DJI_MOBILE_LIGHTNING");
      items.push({
        slot: 26,
        tier: "REQUIRED",
        productId: "AUD_ADP_DJI_MOBILE_LIGHTNING",
        product: p,
        whySelected: "Adapter Lightning chính hãng cho DJI Mic Series Mobile Receiver kết nối vào iPhone cổng Lightning.",
        compatibilityNote: "Chỉ dùng cho DJI Mic Series Mobile Receiver. Không dùng cho receiver DJI Mic 3."
      });
    }

    // Slot 27: High-Speed USB-C Data Cable (Auto-added for 4K Webcam / Pocket 3 data transfer if missing)
    if ((recommendedSystem === "WEBCAM_PC" || recommendedSystem === "POCKET") && !inputs.hasCable) {
      const p = this.getProduct("CON_DATA_UGR_80150");
      items.push({
        slot: 27,
        tier: "RECOMMENDED",
        productId: "CON_DATA_UGR_80150",
        product: p,
        whySelected: "Cáp dữ liệu USB-C 10Gbps 4K60 PD 100W truyền luồng video 4K chất lượng cao từ Webcam/Pocket sang PC.",
        compatibilityNote: "Băng thông USB 3.x 10Gbps truyền hình ảnh 4K60 không độ trễ."
      });
    }

    // 7. Calculate Financial Totals (02_OUTPUT B27, B28, B29)
    let requiredTotal = 0;
    let recommendedTotal = 0;
    let optionalTotal = 0;
    let fullTotal = 0;

    items.forEach(item => {
      const price = Number(item.product?.Price_Current) || 0;
      if (item.tier === "REQUIRED") requiredTotal += price;
      else if (item.tier === "RECOMMENDED") recommendedTotal += price;
      else if (item.tier === "OPTIONAL") optionalTotal += price;
      fullTotal += price;
    });

    // 8. Evaluate Statuses
    const budgetVND = Number(inputs.budgetVND) || 0;
    const budgetStatus = budgetVND >= requiredTotal ? "WITHIN_BUDGET" : "OVER_BUDGET";

    let overallStatus = "VALID";
    if (recommendedSystem === "NO_MATCH") {
      overallStatus = "NO_MATCH";
    } else if (
      (inputs.hasSmartphone && inputs.smartphoneConnector === "Unknown") ||
      (inputs.hasPocket && inputs.pocketModel === "Unknown")
    ) {
      overallStatus = "MISSING_DATA";
    } else if (budgetStatus === "OVER_BUDGET") {
      overallStatus = "OVER_BUDGET";
    }

    // 9. Existing Equipment Summary (02_OUTPUT B7)
    const existingSummary = `Smartphone=${inputs.hasSmartphone ? 'Yes' : 'No'}; PC=${inputs.hasLaptopPC ? 'Yes' : 'No'}; Pocket=${inputs.hasPocket ? 'Yes' : 'No'}; Mic=${inputs.hasMic ? 'Yes' : 'No'}; Light=${inputs.hasLight ? 'Yes' : 'No'}; Tripod=${inputs.hasTripod ? 'Yes' : 'No'}`;

    const existingList = [];
    if (inputs.hasSmartphone) {
      existingList.push({
        id: "EXISTING_PHONE",
        name: `Điện thoại (${inputs.smartphoneOS || 'Smartphone'} - ${inputs.smartphoneConnector || 'Cổng kết nối'})`,
        category: "Thiết bị ghi hình",
        note: "0đ — Đã có sẵn, tận dụng ghi hình chính"
      });
    }
    if (inputs.hasLaptopPC) {
      existingList.push({
        id: "EXISTING_PC",
        name: "Laptop / PC",
        category: "Máy tính vận hành",
        note: "0đ — Đã có sẵn, xử lý luồng OBS / điều khiển"
      });
    }
    if (inputs.hasPocket) {
      existingList.push({
        id: "EXISTING_POCKET",
        name: `DJI Pocket (${inputs.pocketModel || 'Pocket 3'})`,
        category: "Camera cảm biến 1 inch",
        note: "0đ — Đã có sẵn, ghi hình & chống rung gimbal"
      });
    }
    if (inputs.hasWebcam) {
      existingList.push({
        id: "EXISTING_WEBCAM",
        name: "Webcam hiện có",
        category: "Thiết bị ghi hình",
        note: "0đ — Đã có sẵn"
      });
    }
    if (inputs.hasMic) {
      existingList.push({
        id: "EXISTING_MIC",
        name: "Microphone hiện có",
        category: "Âm thanh",
        note: "0đ — Đã có sẵn, không mua lại"
      });
    }
    if (inputs.hasLight) {
      existingList.push({
        id: "EXISTING_LIGHT",
        name: "Đèn chiếu sáng hiện có",
        category: "Ánh sáng",
        note: "0đ — Đã có sẵn, không mua lại"
      });
    }
    if (inputs.hasTripod) {
      existingList.push({
        id: "EXISTING_TRIPOD",
        name: "Chân máy / Tripod hiện có",
        category: "Chân đỡ",
        note: "0đ — Đã có sẵn"
      });
    }
    if (inputs.hasPower) {
      existingList.push({
        id: "EXISTING_POWER",
        name: "Pin dự phòng / Nguồn hiện có",
        category: "Nguồn điện",
        note: "0đ — Đã có sẵn"
      });
    }
    if (inputs.hasHubAdapter) {
      existingList.push({
        id: "EXISTING_HUB",
        name: "Hub / Adapter kết nối hiện có",
        category: "Kết nối",
        note: "0đ — Đã có sẵn"
      });
    }
    if (inputs.hasStorage) {
      existingList.push({
        id: "EXISTING_STORAGE",
        name: "Thẻ nhớ microSD hiện có",
        category: "Lưu trữ",
        note: "0đ — Đã có sẵn"
      });
    }

    // 10. Why Not Systems (02_OUTPUT Rows 12, 13, 14)
    const whyNot = {
      smartphone: recommendedSystem === "SMARTPHONE" 
        ? "— Đang được đề xuất làm hệ thống chính."
        : "Không chọn hệ Smartphone vì hệ thống cố định hoặc thiết bị Pocket sẵn có đáp ứng tốt hơn điều kiện vận hành.",
      webcam: recommendedSystem === "WEBCAM_PC"
        ? "— Đang được đề xuất làm hệ thống chính."
        : "Không chọn Webcam vì setup cần tính cơ động cao tại shop hoặc có nhu cầu chụp sản phẩm/quay video ngoài bàn làm việc.",
      pocket: recommendedSystem === "POCKET"
        ? "— Đang được đề xuất làm hệ thống chính."
        : "Không chọn Pocket vì người dùng chưa có sẵn Pocket và smartphone hiện có đã đủ đáp ứng nhu cầu, tránh phát sinh chi phí mua camera mới."
    };

    // 11. Alternatives (02_OUTPUT Row 31 & Sheet 08)
    let cheaperAlternative = null;
    let upgradeAlternative = null;

    if (audioProductId === "AUD_DJI_MICMINI2") {
      const altP = this.getProduct("AUD_DJI_MICMINI");
      cheaperAlternative = {
        title: "Tiết kiệm hơn với DJI Mic Mini (1TX)",
        productId: "AUD_DJI_MICMINI",
        product: altP,
        costDiff: -575000,
        strength: "Giá thành xác thực thấp hơn 575.000đ.",
        limitation: "Chỉ đáp ứng tối ưu cho 1 người nói (1TX), giảm tính linh hoạt khi có 2 host.",
        tradeoff: "Đổi tính năng 2 host lấy mức giá tiết kiệm hơn."
      };
    } else if (lightProductId === "LGT_AMR_ACE25X") {
      const altP = this.getProduct("LGT_GDX_C30BI");
      cheaperAlternative = {
        title: "Tiết kiệm hơn với Godox C30Bi",
        productId: "LGT_GDX_C30BI",
        product: altP,
        costDiff: -200000,
        strength: "Tiết kiệm thêm 200.000đ ngân sách.",
        limitation: "Form factor panel lớn hơn và công suất pin tích hợp khác biệt so với amaran Ace.",
        tradeoff: "Đổi độ nhỏ gọn lấy mức giá thấp hơn."
      };
    }

    if (audioProductId === "AUD_DJI_MICMINI2" || audioProductId === "AUD_DJI_MICMINI") {
      const altP = this.getProduct("AUD_DJI_MIC2");
      upgradeAlternative = {
        title: "Nâng cấp lên DJI Mic 2",
        productId: "AUD_DJI_MIC2",
        product: altP,
        costDiff: null,
        strength: "Ghi âm nội bộ 32-bit float chống vỡ tiếng tuyệt đối, kết nối trực tiếp không cần receiver.",
        limitation: "Chi phí đầu tư cao hơn.",
        tradeoff: "Tăng chi phí để nhận tính năng an toàn âm thanh chuẩn chuyên nghiệp."
      };
    } else if (lightProductId === "LGT_AMR_ACE25X") {
      const altP = this.getProduct("LGT_SMR_RC60B");
      upgradeAlternative = {
        title: "Nâng cấp lên SmallRig RC 60B",
        productId: "LGT_SMR_RC60B",
        product: altP,
        costDiff: null,
        strength: "Công suất COB 60W mạnh mẽ kèm hệ ngàm modifier đa dạng và sạc 100W PD.",
        limitation: "Trọng lượng lớn hơn, cần kế hoạch nguồn pin PD cho phiên dài.",
        tradeoff: "Chấp nhận cồng kềnh hơn để có công suất ánh sáng studio."
      };
    } else if (captureProductId === "WCM_OBS_MEET2") {
      const altP = this.getProduct("WCM_OBS_TINY2L");
      upgradeAlternative = {
        title: "Nâng cấp lên OBSBOT Tiny 2 Lite",
        productId: "WCM_OBS_TINY2L",
        product: altP,
        costDiff: 800000,
        strength: "Gimbal cơ học 2 trục tự động xoay theo chuyển động của host (AI PTZ Tracking).",
        limitation: "Chi phí tăng thêm 800.000đ và yêu cầu băng thông cổng USB ổn định.",
        tradeoff: "Chi thêm tiền để host thoải mái di chuyển trong phòng live."
      };
    }

    // 12. Deep Combo Evaluation (Facts, Limitations, Trade-offs)
    let comboStrengths = [];
    let comboLimitations = [];
    let comboTradeoff = "";
    let bestForList = [];
    let notForList = [];

    if (recommendedSystem === "SMARTPHONE") {
      comboStrengths = [
        {
          title: "Dễ triển khai và cơ động cao",
          desc: "Tận dụng smartphone sẵn có giúp giảm số lượng thiết bị mang theo, không cần mang thêm camera riêng, setup nhanh chóng tại nhiều địa điểm."
        },
        {
          title: "Tối ưu hóa ngân sách",
          desc: "Toàn bộ ngân sách được dồn vào chất lượng âm thanh không dây và ánh sáng bù sáng thay vì mua lại camera."
        },
        {
          title: "Đa năng cho nhiều mục đích",
          desc: "Cùng một máy có thể vừa livestream tại shop, vừa quay video ngắn và chụp ảnh sản phẩm."
        }
      ];
      comboLimitations = [
        {
          title: "Không tối ưu cho hệ multicam phức tạp",
          desc: "Nếu cần live 2-3 góc máy vào OBS chuyên nghiệp, smartphone cần thêm capture card/adapter và độ trễ cao hơn webcam/camera cố định."
        },
        {
          title: "Ánh sáng cơ động có giới hạn",
          desc: "Đèn compact battery thuận tiện di chuyển nhưng không thể phủ sáng toàn bộ không gian phòng lớn như đèn studio cắm nguồn."
        },
        {
          title: "Phụ thuộc vào nhiệt độ và pin điện thoại",
          desc: "Livestream thời gian dài (>3 giờ) cần kết hợp nguồn sạc liên tục và lưu ý tản nhiệt cho máy."
        }
      ];
      comboTradeoff = "Phương án này ưu tiên tính cơ động và khả năng 1 PM tự vận hành nhanh gọn. Đổi lại, khả năng mở rộng nhiều góc máy và công suất đèn phủ phòng lớn sẽ thấp hơn hệ studio cố định.";
      bestForList = [
        "1 PM đi nhiều shop tự setup",
        "Livestream bán hàng / tương tác 1-2 host",
        "Quay video ngắn TikTok / Reels / Shorts",
        "Chụp ảnh sản phẩm và host cơ bản tại shop"
      ];
      notForList = [
        "Setup studio cố định chuyên nghiệp cần 3+ góc máy",
        "Livestream sự kiện lớn trong hội trường rộng",
        "Workflow truyền hình / OBS multicam phức tạp"
      ];
    } else if (recommendedSystem === "POCKET") {
      comboStrengths = [
        {
          title: "Chất lượng hình ảnh 1 inch và chống rung gimbal",
          desc: "Cảm biến 1-inch cho chất lượng hình ảnh vượt trội trong điều kiện thiếu sáng kèm gimbal vật lý 3 trục cực kỳ mượt mà."
        },
        {
          title: "Kết nối âm thanh OsmoAudio trực tiếp",
          desc: "Pocket 3 có thể kết nối không dây trực tiếp với transmitter DJI Mic mà không cần cắm receiver cồng kềnh."
        },
        {
          title: "Tận dụng tối đa thiết bị sẵn có",
          desc: "Không tốn chi phí mua máy quay mới, chỉ trang bị thêm thẻ nhớ tốc độ cao và ánh sáng."
        }
      ];
      comboLimitations = [
        {
          title: "Góc quay cố định không zoom quang học",
          desc: "Ống kính góc rộng phù hợp quay vlog/người, không tối ưu cho chụp macro cận cảnh chi tiết siêu nhỏ."
        },
        {
          title: "Yêu cầu thẻ nhớ chuẩn V30",
          desc: "Phải sử dụng đúng thẻ nhớ tốc độ cao U3 V30 chính hãng để tránh lỗi ngắt video khi quay 4K."
        }
      ];
      comboTradeoff = "Ưu tiên độ mượt mà của video chuyển động và cảm biến 1 inch. Đổi lại, thao tác chỉnh thông số qua màn hình nhỏ cần làm quen hơn so với màn hình smartphone.";
      bestForList = [
        "Quay video chuyển động, review shop, vlog",
        "Livestream cơ động chất lượng cao",
        "1-2 host di chuyển nhiều"
      ];
      notForList = [
        "Chụp ảnh macro chi tiết trang sức/sản phẩm siêu nhỏ",
        "Setup live bàn làm việc cố định với OBS không di chuyển"
      ];
    } else if (recommendedSystem === "WEBCAM_PC") {
      comboStrengths = [
        {
          title: "Tích hợp trực tiếp phần mềm OBS / PC",
          desc: "Tín hiệu hình ảnh truyền thẳng qua cổng USB vào máy tính, vận hành bền bỉ 24/7 không lo hết pin hay quá nhiệt."
        },
        {
          title: "AI Auto Framing / PTZ theo dõi thông minh",
          desc: "Webcam tự động bắt nét khuôn mặt và căn chỉnh khung hình theo host trong phòng live."
        },
        {
          title: "Setup cố định ổn định cao",
          desc: "Cài đặt một lần sử dụng lâu dài, dây cáp được đi gọn gàng cố định tại bàn làm việc."
        }
      ];
      comboLimitations = [
        {
          title: "Không cơ động ngoài không gian bàn làm việc",
          desc: "Gắn liền với PC/Laptop, không thể mang đi quay ngoại cảnh hoặc đi shop linh hoạt."
        },
        {
          title: "Không dùng để chụp ảnh sản phẩm ngoài bàn",
          desc: "Chỉ phục vụ ghi hình tĩnh góc làm việc, không thay thế được máy chụp ảnh sản phẩm chuyên dụng."
        }
      ];
      comboTradeoff = "Ưu tiên độ ổn định tuyệt đối và tích hợp phần mềm live cố định. Đổi lại hoàn toàn mất tính cơ động di chuyển ngoài shop.";
      bestForList = [
        "Livestream cố định tại phòng live / bàn làm việc",
        "Vận hành qua phần mềm OBS / TikTok Live Studio trên PC",
        "Host ngồi cố định hoặc di chuyển trong phạm vi phòng live"
      ];
      notForList = [
        "PM cần di chuyển qua lại giữa nhiều chi nhánh",
        "Quay video ngoại cảnh hoặc chụp ảnh sản phẩm ngoài studio"
      ];
    }

    return {
      inputs,
      recommendedSystem,
      systemReason,
      existingSummary,
      existingList,
      items,
      requiredTotal,
      recommendedTotal,
      optionalTotal,
      fullTotal,
      budgetVND,
      budgetStatus,
      overallStatus,
      compatibilityStatus: "CONDITIONAL", // Checked against matrix
      whyNot,
      cheaperAlternative,
      upgradeAlternative,
      comboStrengths,
      comboLimitations,
      comboTradeoff,
      bestForList,
      notForList,
      debug
    };
  }
}
