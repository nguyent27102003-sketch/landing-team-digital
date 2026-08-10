import shutil
import os
import glob

artifacts_dir = r"C:\Users\Administrator\.gemini\antigravity-ide\brain\0359e456-aadf-4b72-a6a2-75235d311807"
assets_dir = r"c:\Users\Administrator\Documents\LANDING TEAM DIGITAL ACTIVATION\assets\images"

mappings = {
    'aud_dji_micmini_real': ['aud_dji_micmini.png', 'aud_dji_micmini2.png'],
    'lgt_amr_ace25x_real': ['lgt_amr_ace25x.png'],
    'wcm_obs_meet2_real': ['wcm_obs_meet2.png', 'wcm_obs_tiny2l.png'],
    'pkt_dji_op3_std_real': ['pkt_dji_op3_std.png', 'pkt_dji_op3_cc.png'],
    'aud_dji_mic3_real': ['aud_dji_mic3.png'],
    'lgt_smr_rc60b_real': ['lgt_smr_rc60b.png'],
    'rig_smr_ucage_real': ['rig_smr_ucage.png'],
    'lgt_gdx_c30bi_real': ['lgt_gdx_c30bi.png']
}

for prefix, targets in mappings.items():
    matches = glob.glob(os.path.join(artifacts_dir, f"{prefix}_*.png"))
    if matches:
        src = matches[-1] # latest
        for target in targets:
            dest = os.path.join(assets_dir, target)
            shutil.copy(src, dest)
            print(f"[COPIED] {src} -> {dest}")

print("Successfully replaced studio photo assets in assets/images!")
