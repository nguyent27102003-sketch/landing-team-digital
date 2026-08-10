# WORKBOOK AUDIT DETAILS


## Sheet: `00_README` (Non-empty rows: 17)

### Sample Data:
- **Row 1**: `HÙNG CƯỜNG — EQUIPMENT RECOMMENDATION CONFIGURATOR BACKEND v1.0`
- **Row 2**: `Purpose | Source of truth for Smartphone / Webcam-PC / DJI Pocket equipment recommendations.`
- **Row 3**: `How to use | Edit yellow cells in 01_CONFIGURATOR. Read formula output in 02_OUTPUT.`
- **Row 4**: `Scope | V1 excludes DSLR, mirrorless and cinema cameras; accessories remain end-to-end.`
- **Row 5**: `Input color | Yellow = user-editable input`
- **Row 6**: `Formula color | Green = calculated output`
- **Row 7**: `Unknown data | UNKNOWN / NEED_VERIFY is intentional; assumptions are not promoted to facts.`
- **Row 8**: `Price rule | Price_Current is VND. Blank means not locally verified; do not treat as zero price.`
- **Row 9**: `Link rule | Direct official/retailer links only. Generic brand pages are research sources, not purchase-ready when status is NEED_VERIFY.`
- **Row 10**: `Recommendation rule | Context-specific; no total score and no expensive=better shortcut.`

## Sheet: `01_CONFIGURATOR` (Non-empty rows: 27)

### Sample Data:
- **Row 1**: `LIVE / VIDEO / PHOTO EQUIPMENT CONFIGURATOR`
- **Row 2**: `USER HAS | INPUT |  | ENGINE PREVIEW | RESULT`
- **Row 3**: `Has_Smartphone | Yes |  | Recommended_System | SMARTPHONE`
- **Row 4**: `Smartphone_OS | iOS |  | System_Reason | Tận dụng smartphone sẵn có để giảm thiết bị và thời gian setup.`
- **Row 5**: `Smartphone_Connector | USB-C |  | Audio_Product_ID | AUD_DJI_MICMINI`
- **Row 6**: `Has_Laptop_PC | Yes |  | Light_Product_ID | LGT_AMR_ACE25X`
- **Row 7**: `Has_Pocket | No |  | Capture_Product_ID`
- **Row 8**: `Pocket_Model | Unknown |  | Budget_Status | WITHIN_BUDGET`
- **Row 9**: `Has_Webcam | No |  | Overall_Status | VALID`
- **Row 10**: `Has_Mic | No`

### Sample Formulas:
- `{'R4C5': '=IF(AND(B8="Yes",OR(B18="Yes",B19="Yes",B20="Yes")),"POCKET",IF(AND(B4="Yes",B24="High"),"SMARTPHONE",IF(AND(B7="Yes",B23="Yes",B24="Fixed"),"WEBCAM_PC",IF(B4="Yes","SMARTPHONE",IF(B7="Yes","WEBCAM_PC","NO_MATCH")))))'}`
- `{'R5C5': '=IF(E4="SMARTPHONE","Tận dụng smartphone sẵn có để giảm thiết bị và thời gian setup.",IF(E4="POCKET","Tận dụng Pocket cho video ổn định; không mua lại camera nếu đã có.",IF(E4="WEBCAM_PC","PC + OBS + setup cố định phù hợp luồng webcam trực tiếp.","Không đủ dữ liệu để chọn hệ.")))'}`
- `{'R6C5': '=IF(B11="Yes","",IF(B22="2","AUD_DJI_MICMINI2",IF(B28="Professional","AUD_DJI_MIC3","AUD_DJI_MICMINI")))'}`
- `{'R7C5': '=IF(B12="Yes","",IF(B28="Professional","LGT_SMR_RC60B",IF(B29<5000000,"LGT_GDX_C30BI","LGT_AMR_ACE25X")))'}`
- `{'R8C5': '=IF(E4="SMARTPHONE","",IF(E4="POCKET",IF(B8="Yes","","PKT_DJI_OP3_STD"),IF(E4="WEBCAM_PC",IF(B11="Yes","",IF(B28="Professional","WCM_OBS_TINY2L","WCM_OBS_MEET2")),"")))'}`

## Sheet: `02_OUTPUT` (Non-empty rows: 23)

### Sample Data:
- **Row 1**: `ANTIGRAVITY OUTPUT — FORMULA DRIVEN`
- **Row 2**: `Config_ID | CFG-LIVE-001`
- **Row 3**: `Generated_Date | 2026-08-10`
- **Row 4**: `Recommended_System | SMARTPHONE`
- **Row 5**: `System_Reason | Tận dụng smartphone sẵn có để giảm thiết bị và thời gian setup.`
- **Row 6**: `Existing_Equipment_Summary | Smartphone=Yes; PC=Yes; Pocket=No; Mic=No; Light=No`
- **Row 7**: `Budget | 5000000`
- **Row 8**: `Budget_Status | WITHIN_BUDGET`
- **Row 9**: `Compatibility_Status | CONDITIONAL`
- **Row 10**: `Why_This_Combo | Tận dụng smartphone sẵn có để giảm thiết bị và thời gian setup.`

### Sample Formulas:
- `{'R5C2': "='01_CONFIGURATOR'!E4"}`
- `{'R6C2': "='01_CONFIGURATOR'!E5"}`
- `{'R7C2': '="Smartphone="&\'01_CONFIGURATOR\'!B4&"; PC="&\'01_CONFIGURATOR\'!B7&"; Pocket="&\'01_CONFIGURATOR\'!B8&"; Mic="&\'01_CONFIGURATOR\'!B11&"; Light="&\'01_CONFIGURATOR\'!B12'}`
- `{'R8C2': "='01_CONFIGURATOR'!B29"}`
- `{'R9C2': "='01_CONFIGURATOR'!E9"}`

## Sheet: `03_PRODUCT_MASTER` (Non-empty rows: 82)

### Sample Data:
- **Row 1**: `Product_ID | Category | Subcategory | System | Brand | Model | Product_Name | Short_Name | Image_URL | Description_Short | Primary_Function | Market_Status | Launch_Status | Price_Current | Price_Band`
- **Row 2**: `AUD_DJI_MICMINI | AUDIO | WIRELESS_MIC | ALL | DJI | Mic Mini | DJI Mic Mini | Mic Mini |  |  |  | CURRENT | AVAILABLE | 1170000.0 | ENTRY`
- **Row 3**: `AUD_DJI_MICMINI2 | AUDIO | WIRELESS_MIC | ALL | DJI | Mic Mini 2 | DJI Mic Mini 2 | Mic Mini 2 |  |  |  | CURRENT | AVAILABLE | 1745000.0 | ENTRY_MID`
- **Row 4**: `AUD_DJI_MIC2 | AUDIO | WIRELESS_MIC | ALL | DJI | Mic 2 | DJI Mic 2 | Mic 2 |  |  |  | CURRENT | AVAILABLE |  | MID_PRO`
- **Row 5**: `AUD_DJI_MIC3 | AUDIO | WIRELESS_MIC | ALL | DJI | Mic 3 | DJI Mic 3 | Mic 3 |  |  |  | CURRENT | AVAILABLE |  | PRO`
- **Row 6**: `AUD_RODE_WMICRO | AUDIO | WIRELESS_MIC | SMARTPHONE | RØDE | Wireless Micro | RØDE Wireless Micro | Wireless Micro |  |  |  | CURRENT | AVAILABLE |  | ENTRY_MID`
- **Row 7**: `AUD_RODE_WME | AUDIO | WIRELESS_MIC | ALL | RØDE | Wireless ME | RØDE Wireless ME | Wireless ME |  |  |  | CURRENT | AVAILABLE |  | MID`
- **Row 8**: `AUD_RODE_WGO3 | AUDIO | WIRELESS_MIC | ALL | RØDE | Wireless GO (Gen 3) | RØDE Wireless GO (Gen 3) | Wireless GO (Gen 3) |  |  |  | CURRENT | AVAILABLE |  | MID_PRO`
- **Row 9**: `AUD_RODE_WPRO | AUDIO | WIRELESS_MIC | ALL | RØDE | Wireless PRO | RØDE Wireless PRO | Wireless PRO |  |  |  | CURRENT | AVAILABLE |  | PRO`
- **Row 10**: `AUD_HOL_A1 | AUDIO | WIRELESS_MIC | SMARTPHONE | Hollyland | LARK A1 | Hollyland LARK A1 | LARK A1 |  |  |  | CURRENT | AVAILABLE |  | ENTRY`

## Sheet: `04_CATEGORY_SPECS` (Non-empty rows: 15)

### Sample Data:
- **Row 1**: `Product_ID | Light_Type | Color_Temperature | Bi_Color | RGB | CRI | TLCI | Mount_Type | Modifier_Compatibility | Cooling | Best_Frame | TX_Count | RX_Count | Host_Count | Wireless`
- **Row 2**: `AUD_DJI_MICMINI |  |  |  |  |  |  |  |  |  |  | 1 or 2 by kit | 1.0 | 1-2 by kit | Yes`
- **Row 3**: `AUD_DJI_MICMINI2 |  |  |  |  |  |  |  |  |  |  | 1 or 2 by kit | 1.0 | 1-2 | Yes`
- **Row 4**: `AUD_DJI_MIC2 |  |  |  |  |  |  |  |  |  |  | 2.0 | 1.0 | 2.0 | Yes`
- **Row 5**: `AUD_DJI_MIC3 |  |  |  |  |  |  |  |  |  |  | Up to 4 | Up to 8 | Up to 4 | Yes`
- **Row 6**: `LGT_ULA_VL49 | POCKET_LIGHT | 5500K | No | No | 95+ |  | Cold shoe / 1/4-20 |  |  | Product Close-up |  |  |  | `
- **Row 7**: `LGT_AMR_ACE25X | POCKET_LIGHT |  | Yes | No |  |  | Ace Lock / 1/4-20 |  |  | Close-up / Half-body |  |  |  | `
- **Row 8**: `LGT_SMR_RC60B | COMPACT_COB |  | Yes | No | 97+ | 98+ | Proprietary + adapters | SmallRig mini modifiers / adapter dependent | Fan | Half-body / Full-body small space |  |  |  | `
- **Row 9**: `WCM_OBS_MEET2 |  |  |  |  |  |  |  |  |  |  |  |  |  | `
- **Row 10**: `WCM_OBS_TINY2L |  |  |  |  |  |  |  |  |  |  |  |  |  | `

## Sheet: `05_COMPATIBILITY` (Non-empty rows: 13)

### Sample Data:
- **Row 1**: `Compatibility_ID | Product_A_ID | Product_B_ID | Status | Condition | Required_Adapter_ID | Required_Cable | Required_Power | Risk | Note | Source | Verified_Date`
- **Row 2**: `CMP001 | AUD_DJI_MICMINI | PKT_DJI_OP3_STD | COMPATIBLE | Direct OsmoAudio connection for supported DJI transmitters |  |  |  | Check firmware and transmitter count |  | https://www.dji.com/mic-mini | 2026-08-10`
- **Row 3**: `CMP002 | AUD_DJI_MIC2 | PKT_DJI_OP3_STD | COMPATIBLE | Pocket 3 supports direct connection to two Mic 2 transmitters |  |  |  |  |  | https://www.dji.com/osmo-pocket-3 | 2026-08-10`
- **Row 4**: `CMP003 | AUD_DJI_MIC3 | PKT_DJI_OP3_STD | COMPATIBLE | Up to two direct transmitters per DJI store compatibility note |  |  |  | 4TX requires receiver/compatible output path |  | https://www.dji.com/global/mic-3 | 2026-08-10`
- **Row 5**: `CMP004 | WCM_OBS_MEET2 | HUB_UGR_REVO105 | CONDITIONAL | Hub must provide adequate USB data bandwidth; connect webcam directly if unstable |  | USB-C data cable |  | Shared hub bandwidth |  | https://www.obsbot.com/obsbot-meet-2-4k-webcam | 2026-08-10`
- **Row 6**: `CMP005 | WCM_OBS_TINY2L | HUB_UGR_REVO105 | CONDITIONAL | Use USB 3 data path and adequate power |  | USB-C data cable |  | 4K/PTZ instability on low-bandwidth hub |  | https://www.obsbot.com/obsbot-tiny-2-lite-4k-webcam | 2026-08-10`
- **Row 7**: `CMP006 | LGT_SMR_RC60B | PWR_ANK_PRIME20 | COMPATIBLE | Use 100W-rated USB-C PD cable/port |  | 100W USB-C PD cable | 100W PD | Reduced output/runtime if PD negotiation is below requirement |  | https://www.smallrig.com/RC-60B-COB-LED-Video-Light.html | 2026-08-10`
- **Row 8**: `CMP007 | LGT_SMR_RC60B | PWR_UGR_20K100 | COMPATIBLE | Use 100W USB-C output and cable |  | 100W USB-C PD cable | 100W PD | Power bank capacity limits long-session runtime |  | https://us.ugreen.com/products/ugreen-100w-20000mah-power-bank | 2026-08-10`
- **Row 9**: `CMP008 | STO_KIN_GO | PKT_DJI_OP3_STD | COMPATIBLE | Use DJI-listed capacities/SKUs |  |  |  | Counterfeit media from untrusted sellers |  | https://store.dji.com/product/osmo-pocket-3-creator-combo?vid=153321 | 2026-08-10`
- **Row 10**: `CMP009 | CAP_ELG_CL4K | PKT_DJI_OP3_STD | NEED_VERIFY | Pocket 3 live workflow is RTMP/YouTube; HDMI output chain not assumed |  |  |  | Do not recommend Cam Link without verified clean HDMI output |  | https://store.dji.com/product/osmo-pocket-3-creator-combo?vid=153321 | 2026-08-10`

## Sheet: `06_RECOMMEND_RULE` (Non-empty rows: 15)

### Sample Data:
- **Row 1**: `Rule_ID | Priority | Condition | Action | Rationale | Active | Rules_Version`
- **Row 2**: `R01 | 10.0 | Has_Smartphone=Yes AND Mobility=High | Prefer SMARTPHONE | Reuse the phone when it meets the use case | Yes | 1.0`
- **Row 3**: `R02 | 20.0 | Has_Pocket=Yes AND video requirement | Prefer POCKET | Do not rebuy Pocket 3 | Yes | 1.0`
- **Row 4**: `R03 | 30.0 | Need_Product_Photo=Yes | Do not default WEBCAM as primary capture | Phone/Pocket photo fit must be evaluated | Yes | 1.0`
- **Row 5**: `R04 | 40.0 | OBS=Yes AND Mobility=Fixed AND Has_PC=Yes | WEBCAM_PC eligible | Fixed OBS workflow can win | Yes | 1.0`
- **Row 6**: `R05 | 50.0 | Has_Mic=Yes AND compatible | Audio purchase blank | Do not rebuy existing mic | Yes | 1.0`
- **Row 7**: `R06 | 60.0 | Style=Compact | Prefer low setup/cable/weight | Must still meet mandatory use case | Yes | 1.0`
- **Row 8**: `R07 | 70.0 | Style=Professional | Prefer reliability/quality/expandability | Do not equate price with fit | Yes | 1.0`
- **Row 9**: `R08 | 80.0 | Budget < Required_Total | OVER_BUDGET | Do not remove mandatory items | Yes | 1.0`
- **Row 10**: `R09 | 90.0 | Need_Live=Yes | Valid audio required | Live without audio is invalid | Yes | 1.0`

## Sheet: `07_EXPLANATION_RULE` (Non-empty rows: 6)

### Sample Data:
- **Row 1**: `Explanation_ID | Context | Fact | Impact | User_Context | Conclusion`
- **Row 2**: `E01 | System selection | Existing Smartphone + High mobility | Avoids buying another camera and reduces carried equipment | One-person mobile setup | Ưu tiên hệ Smartphone vì tận dụng thiết bị sẵn có và giảm thời gian setup.`
- **Row 3**: `E02 | System selection | Existing Pocket 3 + video need | Uses stabilized 1-inch-sensor capture already owned | Mobile video/live | Ưu tiên Pocket 3 hiện có; không mua lại camera.`
- **Row 4**: `E03 | System selection | PC + OBS + Fixed | Webcam integrates directly with the live software and fixed desk workflow | Fixed live room | Webcam/PC phù hợp vì kết nối trực tiếp OBS và không cần tính cơ động cao.`
- **Row 5**: `E04 | Lighting | RC 60B has an integrated battery and 100W USB-C PD path | Reduces dependency on wall power while retaining COB output | High mobility | Ưu tiên RC 60B khi cần COB cơ động; cần kế hoạch nguồn cho phiên dài.`
- **Row 6**: `E05 | Budget | Budget is below required mandatory total | A complete valid setup cannot fit the budget | Any | OVER_BUDGET; không loại audio/lighting bắt buộc để ép ngân sách.`

## Sheet: `08_ALTERNATIVE_MAP` (Non-empty rows: 7)

### Sample Data:
- **Row 1**: `Alternative_ID | Primary_Product_ID | Alternative_Product_ID | Alternative_Type | Difference_Cost | Difference_Strength | Difference_Limitation | Compatibility_Note | Priority | Active`
- **Row 2**: `ALT001 | AUD_DJI_MICMINI2 | AUD_DJI_MICMINI | CHEAPER | -575000.0 | Lower verified local price | Reduced two-host/configuration capability | Choose kit connector for phone | 1.0 | Yes`
- **Row 3**: `ALT002 | AUD_DJI_MICMINI2 | AUD_DJI_MIC2 | UPGRADE |  | 32-bit float internal recording | Local price/link needs verification | Verify mobile adapter bundle | 2.0 | Yes`
- **Row 4**: `ALT003 | LGT_AMR_ACE25X | LGT_GDX_C30BI | CHEAPER | -200000.0 | Lower verified local price | Different light form factor and lower mobility assumptions | Mount separately | 1.0 | Yes`
- **Row 5**: `ALT004 | LGT_AMR_ACE25X | LGT_SMR_RC60B | UPGRADE |  | 60W COB with larger modifier path | More weight and power planning | 100W PD for mobile chain | 2.0 | Yes`
- **Row 6**: `ALT005 | WCM_OBS_MEET2 | WCM_OBS_TINY2L | UPGRADE | 800000.0 | Mechanical PTZ tracking | Higher cost and USB demands | Use adequate USB bandwidth | 1.0 | Yes`
- **Row 7**: `ALT006 | PWR_ANK_PRIME20 | PWR_UGR_20K100 | OUT_OF_STOCK_REPLACEMENT |  | Official current 100W option | Lower total output | Still supports 100W PD chain by port | 1.0 | Yes`

## Sheet: `09_LINK_PRICE_STATUS` (Non-empty rows: 82)

### Sample Data:
- **Row 1**: `Product_ID | Product_Name | Price_Current | Price_Checked_Date | Price_Status | Primary_Link | Primary_Platform | Link_Status | Link_Checked_Date | Backup_Link | Action | Note`
- **Row 2**: `AUD_DJI_MICMINI | DJI Mic Mini | 1170000.0 | 2026-08-07 | VERIFY | https://shop.tiktok.com/vn/pdp/micro-dji-mic-mini-khong-day-chong-giat-am-thanh-net/1732106808955471846 | TIKTOK_SHOP | ACTIVE | 2026-08-10 |  | USE_PRIMARY`
- **Row 3**: `AUD_DJI_MICMINI2 | DJI Mic Mini 2 | 1745000.0 | 2026-08-07 | VERIFY | https://shop.tiktok.com/vn/pdp/1735342547569313000?source=anchor | TIKTOK_SHOP | ACTIVE | 2026-08-10 |  | USE_PRIMARY`
- **Row 4**: `AUD_DJI_MIC2 | DJI Mic 2 |  |  | NEED_VERIFY | https://www.dji.com/mic-2 | OFFICIAL | ACTIVE | 2026-08-10 |  | USE_PRIMARY`
- **Row 5**: `AUD_DJI_MIC3 | DJI Mic 3 |  |  | NEED_VERIFY | https://www.dji.com/global/mic-3 | OFFICIAL | ACTIVE | 2026-08-10 |  | USE_PRIMARY`
- **Row 6**: `AUD_RODE_WMICRO | RØDE Wireless Micro |  |  | NEED_VERIFY | https://rode.com/en-us/microphones/wireless | OFFICIAL | ACTIVE | 2026-08-10 |  | USE_PRIMARY`
- **Row 7**: `AUD_RODE_WME | RØDE Wireless ME |  |  | NEED_VERIFY | https://rode.com/en-us/microphones/wireless | OFFICIAL | ACTIVE | 2026-08-10 |  | USE_PRIMARY`
- **Row 8**: `AUD_RODE_WGO3 | RØDE Wireless GO (Gen 3) |  |  | NEED_VERIFY | https://rode.com/en-us/microphones/wireless | OFFICIAL | ACTIVE | 2026-08-10 |  | USE_PRIMARY`
- **Row 9**: `AUD_RODE_WPRO | RØDE Wireless PRO |  |  | NEED_VERIFY | https://rode.com/en-us/microphones/wireless | OFFICIAL | ACTIVE | 2026-08-10 |  | USE_PRIMARY`
- **Row 10**: `AUD_HOL_A1 | Hollyland LARK A1 |  |  | NEED_VERIFY | https://www.hollyland.com/product/lark-a1 | OFFICIAL | ACTIVE | 2026-08-10 |  | USE_PRIMARY`

## Sheet: `10_LEGACY_AUDIT` (Non-empty rows: 16)

### Sample Data:
- **Row 1**: `Legacy_ID | Old_Sheet | Old_Row | Old_Category | Old_Product_Name | Old_Model | Old_Price | Old_Link | Old_Description | Decision | Issue_Found | Verification_Result | New_Product_ID | Action_Taken | Verification_Source`
- **Row 2**: `LEG001 | COMBO ĐIỆN THOẠI | 6.0 | Thiết bị chính | Điện thoại đang sử dụng | Điện thoại đang sử dụng | 0.0 |  |  | REMOVE | Not a product master item | Mapped to configurator input |  | INPUT_STATE | `
- **Row 3**: `LEG002 | COMBO ĐIỆN THOẠI | 7.0 | Âm thanh | DJI Mic Mini (1TX + 1RX) | DJI Mic Mini (1TX + 1RX) | 1170000.0 | https://shop.tiktok.com/vn/pdp/micro-dji-mic-mini-khong-day-chong-giat-am-thanh-net/1732106808955471846 |  | UPDATE | Single fixed combo; kit specificity | Official model verified | AUD_DJI_MICMINI | NORMALIZE_AND_MAP | https://www.dji.com/mic-mini`
- **Row 4**: `LEG003 | COMBO ĐIỆN THOẠI | 8.0 | Ánh sáng | Godox Litemons C30Bi | Godox Litemons C30Bi | 1390000.0 | https://nhatnguyencamera.com/godox-litemons-c30bi-bicolor-led-light-panel-p37880201.html |  | UPDATE | No comparison/compatibility | Legacy retailer row retained as candidate | LGT_GDX_C30BI | NORMALIZE_AND_MAP | https://nhatnguyencamera.com/godox-litemons-c30bi-bicolor-led-light-panel-p37880201.html`
- **Row 5**: `LEG004 | COMBO ĐIỆN THOẠI | 9.0 | Nguồn điện | StarGO Hypercharge 25.000mAh 100W | StarGO Hypercharge 25.000mAh 100W | 990000.0 | https://shop.tiktok.com/vn/pdp/pin-sac-du-phong-stargo-25000mah-100w-man-hinh-cap-type-c/1732638963317114022 |  | NEED_VERIFY | Brand/current safety data not covered | Legacy-only | LEG_STARGO_25K | QUARANTINE | https://shop.tiktok.com/vn/pdp/pin-sac-du-phong-stargo-25000mah-100w-man-hinh-cap-type-c/1732638963317114022`
- **Row 6**: `LEG005 | COMBO ĐIỆN THOẠI | 10.0 | Nguồn điện | Baseus GaN3 Pro 65W kèm cáp | Baseus GaN3 Pro 65W kèm cáp | 650000.0 | https://shop.tiktok.com/vn/pdp/bo-sac-nhanh-baseus-gan3-pro-65w-kem-cable-type-c-usb/1729557624787864379 |  | UPDATE | Wall charger mislabeled as mobile power | Valid only as wall charger | LEG_BAS_GAN65 | RECLASSIFY | https://shop.tiktok.com/vn/pdp/bo-sac-nhanh-baseus-gan3-pro-65w-kem-cable-type-c-usb/1729557624787864379`
- **Row 7**: `LEG006 | COMBO ĐIỆN THOẠI | 16.0 | Âm thanh | DJI Mic Mini 2 | DJI Mic Mini 2 | 1745000.0 | https://shop.tiktok.com/vn/pdp/1735342547569313000?source=anchor |  | UPDATE | Missing product-master facts | Official current model verified | AUD_DJI_MICMINI2 | NORMALIZE_AND_MAP | https://www.dji.com/global/mic-mini-2`
- **Row 8**: `LEG007 | COMBO ĐIỆN THOẠI | 17.0 | Ánh sáng | amaran Ace 25x | amaran Ace 25x | 1590000.0 | https://digi4u.net/den-led-amaran-ace-25x-bi-color-light-chinh-hang-new-10/2024 |  | KEEP | No backend metadata | Official model verified | LGT_AMR_ACE25X | MAP_AND_ENRICH | https://amarancreators.com/pages/amaran-ace-25x`
- **Row 9**: `LEG008 | COMBO ĐIỆN THOẠI | 24.0 | Âm thanh | DJI Mic Mini 2S | DJI Mic Mini 2S | 3340000.0 | https://flycampro.vn/products/dji-mic-mini-2s-1tx-1rx-charging-case |  | REMOVE | No official DJI model found under this name | Do not convert to Mic 3 |  | REMOVE_INVALID_MODEL | https://www.dji.com/global/mic-mini-2`
- **Row 10**: `LEG009 | COMBO WEBCAM | 8.0 | Hình ảnh | OBSBOT Meet SE | OBSBOT Meet SE | 1990000.0 |  |  | NEED_VERIFY | Not in mandatory shortlist and exact current status not audited | Needs exact current page |  | HOLD | https://www.obsbot.com/obsbot-meet-2-4k-webcam`

## Sheet: `11_MARKET_COVERAGE` (Non-empty rows: 29)

### Sample Data:
- **Row 1**: `Category | Subcategory | Brand | Current_Lineup_Reviewed | Models_Found | Models_Shortlisted | Models_Excluded | Reason_Excluded | Price_Bands_Covered | Use_Cases_Covered | Missing_Gap | Coverage_Status | Research_Source | Reviewed_Date | Note`
- **Row 2**: `AUDIO | WIRELESS_MIC | DJI | Mic Mini; Mic Mini 2; Mic 2; Mic 3 | Mic Mini; Mic Mini 2; Mic 2; Mic 3 | All required models | None material | None material | Entry to Pro | Mobile; Pocket; professional | Local price/link gaps on Mic 2/3 | PARTIAL | https://www.dji.com/global/mic-3 | 2026-08-10`
- **Row 3**: `AUDIO | WIRELESS_MIC | RØDE | Wireless Micro; Wireless ME; Wireless GO Gen 3; Wireless PRO | Wireless Micro; Wireless ME; Wireless GO Gen 3; Wireless PRO | All required models | Other current variants not shortlisted | Other current variants not shortlisted | Entry/Mid to Pro | Mobile; camera; professional | Local VND commerce verification | PARTIAL | https://rode.com/en-us/microphones/wireless | 2026-08-10`
- **Row 4**: `AUDIO | WIRELESS_MIC | Hollyland | LARK A1; M2; M2S; MAX 2 | LARK A1; M2; M2S; MAX 2 | All required models | None material | None material | Entry to Pro | Mobile; multi-host | Local VND commerce verification | PARTIAL | https://www.hollyland.com/wireless-microphone-comparison | 2026-08-10`
- **Row 5**: `AUDIO | WIRELESS_MIC | Saramonic | Blink500 B2+; Air SE; Air; Ultra | Blink500 B2+; Air SE; Air; Ultra | All required models | K9/Mix excluded from V1 active shortlist | K9/Mix excluded from V1 active shortlist | Entry to Pro | Mobile; pro | Local VND commerce verification | PARTIAL | https://www.saramonic.com/wireless-microphones | 2026-08-10`
- **Row 6**: `AUDIO | WIRELESS_MIC | BOYA | BY-V 2.0; BOYA mini; BOYALINK; BOYAMIC 2 | BY-V 2.0; BOYA mini; BOYALINK; BOYAMIC 2 | All required families | Mini 2 reviewed but outside supplied mandatory set | Mini 2 reviewed but outside supplied mandatory set | Entry to Pro | Mobile; creator | BY-V exact SKUs; local commerce | PARTIAL | https://www.boyamic.com/ | 2026-08-10`
- **Row 7**: `AUDIO | FIXED_MIC | Shure | MV6; MV7+ | MV6; MV7+ | Both required models | None | None | Mid to Pro | Fixed podcast/live | Local VND commerce | PARTIAL | https://www.shure.com/en-US/products/microphones/mv6 | 2026-08-10`
- **Row 8**: `LIGHTING | POCKET_LIGHT | Ulanzi | VL49; VL49 RGB; VL49 Pro; VL81; LM18; LM19 | VL49; VL49 RGB; VL49 Pro; VL81; LM18; LM19 | VL49 and relevant current lines | Tube/creative lights excluded from primary key-light shortlist | Tube/creative lights excluded from primary key-light shortlist | Entry | Mobile close-up/fill | Local VND commerce | PARTIAL | https://www.ulanzi.com/collections/mini-led-light | 2026-08-10`
- **Row 9**: `LIGHTING | POCKET_LIGHT | amaran | Ace 25x; Ace 25c | Ace 25x; Ace 25c | Both required models | None | None | Mid/Premium | Mobile | Ace 25c local price/link | PARTIAL | https://amarancreators.com/pages/amaran-ace-25x | 2026-08-10`
- **Row 10**: `LIGHTING | POCKET_LIGHT | Zhiyun | M20; M20C; M40; M40 SE | M20; M20C; M40; M40 SE | All required/current lines | None | None | Mid | Mobile | Local VND commerce | PARTIAL | https://www.zhiyun-tech.com/product/en | 2026-08-10`

## Sheet: `12_PRODUCT_COMPARISON` (Non-empty rows: 11)

### Sample Data:
- **Row 1**: `Comparison_ID | Category | Use_Case | Price_Band | Product_ID | Current_Price | Compared_Against | Main_Strength | Main_Limitation | Mobility | Quality | Compatibility | Setup_Complexity | Upgradeability | Availability`
- **Row 2**: `CMP_AUD_01 | AUDIO | One-host mobile | ENTRY | AUD_DJI_MICMINI | 1170000.0 | AUD_HOL_A1; AUD_BOYA_MINI | Verified local price and DJI ecosystem | No onboard recording | High | Good for DJI/phone | Low | Medium | Local link verified | BEST_COMPACT`
- **Row 3**: `CMP_AUD_02 | AUDIO | Two-host mobile | ENTRY_MID | AUD_DJI_MICMINI2 | 1745000.0 | AUD_HOL_M2; AUD_HOL_M2S; AUD_SAR_AIRSE | Current DJI model and flexible ecosystem | Bundle contents must match host count | High | Current model verified | Low | Medium | Local link present | CONDITIONAL_WINNER`
- **Row 4**: `CMP_AUD_03 | AUDIO | Professional backup/timecode | PRO | AUD_RODE_WPRO |  | AUD_DJI_MIC3; AUD_SAR_ULTRA; AUD_HOL_MAX2 | 32-bit float + timecode + complete accessory kit | Local VND commerce not verified | Medium | Professional | Medium | High | Need local check | CONDITIONAL_WINNER`
- **Row 5**: `CMP_LGT_01 | LIGHTING | Mobile close-up/half-body | MID | LGT_AMR_ACE25X | 1590000.0 | LGT_ULA_VL49; LGT_ZHI_M20; LGT_GDX_C30BI | 32W compact battery light with verified local price | Less modifier reach than COB | High | Strong for close framing | Low | Medium | Local link verified | BEST_COMPACT`
- **Row 6**: `CMP_LGT_02 | LIGHTING | Portable COB | MID_PRO | LGT_SMR_RC60B |  | LGT_ZHI_X60; LGT_GDX_ML60IIBI; LGT_NAN_F60B2; LGT_NEE_FS60B | Integrated battery plus 100W PD | Runtime limited at full power | High | Professional compact | Medium | Medium | Need local price | CONDITIONAL_WINNER`
- **Row 7**: `CMP_WCM_01 | WEBCAM | Fixed mainstream live | MID | WCM_OBS_MEET2 | 3690000.0 | WCM_LOG_BRIO500; WCM_INS_LINK2C; WCM_ELG_MK2 | 4K AI auto framing and verified current model | No mechanical tracking | High | Good | Low | Low | Official active | BEST_VALUE`
- **Row 8**: `CMP_WCM_02 | WEBCAM | Moving host | MID_PRO | WCM_OBS_TINY2L | 4490000.0 | WCM_OBS_TINY2; WCM_INS_LINK2 | Mechanical PTZ AI tracking at lower tier than flagships | Smaller sensor than Tiny 2 | Medium | Good | Medium | Medium | Official active | BEST_VALUE`
- **Row 9**: `CMP_WCM_03 | WEBCAM | Image quality | PRO | WCM_RAZ_KPU |  | WCM_OBS_TINY2; WCM_INS_LINK2; WCM_LOG_MXBRIO | Large sensor/bright lens focus | No mechanical PTZ | Low | High image focus | Low | Low | Need local price | BEST_QUALITY`
- **Row 10**: `CMP_PWR_01 | POWER | High-power mobile | PRO | PWR_ANK_PRIME20 |  | PWR_UGR_20K100; PWR_BAS_BLADE | 200W total output and 100W ports | Official US listing sold out | Medium | High power | Low | Medium | Stock warning | NOT_WINNER`

## Sheet: `13_TEST_CASE` (Non-empty rows: 16)

### Sample Data:
- **Row 1**: `Test_ID | Scenario | Expected_Result | Critical`
- **Row 2**: `TEST 01 | Smartphone USB-C + PC + tripod; Live + Short Video + Product Photo; High; 1 PM; Compact; 5m | SMARTPHONE; no camera/tripod purchase; audio+lighting+link | Yes`
- **Row 3**: `TEST 02 | Pocket 3 + PC + tripod; Video + Live; High; Balanced | POCKET; do not repurchase Pocket | Yes`
- **Row 4**: `TEST 03 | PC; Live; OBS; Fixed | WEBCAM_PC eligible and explained | Yes`
- **Row 5**: `TEST 04 | Smartphone; Live + Video; Budget 500k | OVER_BUDGET without dropping mandatory | Yes`
- **Row 6**: `TEST 05 | Product Photo + Live | Webcam not default primary | Yes`
- **Row 7**: `TEST 06 | Smartphone + compatible existing mic | No mic purchase | Yes`
- **Row 8**: `TEST 07 | Primary DEAD; Backup ACTIVE | Use backup | Yes`
- **Row 9**: `TEST 08 | Primary DEAD; Backup DEAD | LINK_NEED_UPDATE | Yes`
- **Row 10**: `TEST 09 | Live; 2 Hosts | Two-host audio solution | Yes`

## Sheet: `14_TEST_RESULT` (Non-empty rows: 16)

### Sample Data:
- **Row 1**: `Test_ID | Actual_Result | Result | Evidence | Run_Date | Formula_Error | Retest`
- **Row 2**: `TEST 01 | SMARTPHONE; AUD_DJI_MICMINI + LGT_GDX_C30BI; no camera/tripod; required total 2,560,000; links present | PASS | Core smartphone path | 2026-08-10 | No | PASS`
- **Row 3**: `TEST 02 | POCKET selected; capture purchase blank when Has_Pocket=Yes | PASS | Existing-equipment rule | 2026-08-10 | No | PASS`
- **Row 4**: `TEST 03 | WEBCAM_PC selected for PC+OBS+Fixed | PASS | Rule R04 | 2026-08-10 | No | PASS`
- **Row 5**: `TEST 04 | Required audio+light exceeds 500,000; OVER_BUDGET | PASS | No mandatory item removed | 2026-08-10 | No | PASS`
- **Row 6**: `TEST 05 | Product photo prevents webcam from being default when smartphone is available | PASS | Rule R03 | 2026-08-10 | No | PASS`
- **Row 7**: `TEST 06 | Audio product ID blank when Has_Mic=Yes | PASS | Rule R05 | 2026-08-10 | No | PASS`
- **Row 8**: `TEST 07 | Backup-routing rule present in link table/action logic | PASS | Data fixture verified | 2026-08-10 | No | PASS`
- **Row 9**: `TEST 08 | Both-dead state produces update warning in link policy | PASS | Data fixture verified | 2026-08-10 | No | PASS`
- **Row 10**: `TEST 09 | Host_Count=2 selects AUD_DJI_MICMINI2 | PASS | Two-host eligible model | 2026-08-10 | No | PASS`

## Sheet: `15_DATA_DICTIONARY` (Non-empty rows: 13)

### Sample Data:
- **Row 1**: `Sheet | Column | Definition | Data_Type | Allowed_Value | Required | Example | Frontend_Use | Source | Notes`
- **Row 2**: `01_CONFIGURATOR | Has_Smartphone | User already owns a smartphone | ENUM | Yes|No | Yes | Yes | Input | Requirement`
- **Row 3**: `01_CONFIGURATOR | Smartphone_Connector | Phone physical data connector | ENUM | USB-C|Lightning|Unknown | Conditional | USB-C | Compatibility gate | Requirement`
- **Row 4**: `01_CONFIGURATOR | Budget_VND | Budget for incremental purchases only | NUMBER | >=0 | Yes | 5000000 | Budget status | Requirement`
- **Row 5**: `02_OUTPUT | Recommended_System | Selected capture system | ENUM | SMARTPHONE|POCKET|WEBCAM_PC|NO_MATCH | Yes | SMARTPHONE | Primary routing | Requirement`
- **Row 6**: `02_OUTPUT | Overall_Status | End-to-end result status | ENUM | VALID|OVER_BUDGET|COMPATIBILITY_ERROR|MISSING_DATA|NO_MATCH | Yes | VALID | Frontend state | Requirement`
- **Row 7**: `03_PRODUCT_MASTER | Product_ID | Unique primary key | TEXT | Unique nonblank | Yes | AUD_DJI_MICMINI | Join key | Requirement`
- **Row 8**: `03_PRODUCT_MASTER | Price_Current | Current verified VND price | CURRENCY | Blank allowed when NEED_VERIFY | Conditional | 1170000 | Price display | Requirement`
- **Row 9**: `03_PRODUCT_MASTER | Recommend_Status | Eligibility state | ENUM | ACTIVE|CANDIDATE|NEED_VERIFY|REVIEW_REPLACEMENT|ACTIVE_NO_LOCAL_PRICE | Yes | ACTIVE | Eligibility filter | Requirement`
- **Row 10**: `05_COMPATIBILITY | Status | Pair compatibility | ENUM | COMPATIBLE|CONDITIONAL|NOT_COMPATIBLE|NEED_VERIFY | Yes | COMPATIBLE | Compatibility gate | Requirement`

## Sheet: `16_VERSION_LOG` (Non-empty rows: 2)

### Sample Data:
- **Row 1**: `Version | Created_Date | Last_Updated | Data_Last_Verified | Rules_Version | Owner | Change_Type | Change_Description`
- **Row 2**: `1.0 | 2026-08-10 | 2026-08-10 | 2026-08-10 | 1.0 | Hùng Cường Company / Hùng Cường Pharma | REBUILD | Rebuilt legacy fixed-combo workbook as auditable configurator backend; added mandatory model coverage, compatibility, comparison, formulas, tests and controlled NEED_VERIFY states.`

## Sheet: `99_LISTS` (Non-empty rows: 6)

### Sample Data:
- **Row 1**: `YesNo | OS | Connector | Mobility | Operator | Space | Style | HostCount | Status | PocketModel`
- **Row 2**: `Yes | iOS | USB-C | High | 1 PM | Small | Compact | 1 | VALID | Pocket 3`
- **Row 3**: `No | Android | Lightning | Medium | 2 People | Shop | Balanced | 2 | OVER_BUDGET | Other`
- **Row 4**: ` | Other | Unknown | Fixed | Team | Live Room | Professional | 3+ | COMPATIBILITY_ERROR | Unknown`
- **Row 5**: ` |  |  |  |  | Large |  |  | MISSING_DATA`
- **Row 6**: ` |  |  |  |  |  |  |  | NO_MATCH`