import os, json, time, sys
sys.path.append(os.path.join(os.path.dirname(__file__), "api", "generator"))
from generator import generate_slideshow

settings = {
  "fps": 24,
  "secondsPerImage": 1.5,
  "transition": "fade",
  "transitionDuration": 0.5,
  "platforms": {"tiktok": True, "instagram": True, "facebook": True, "youtube": True},
  "formats": {"tiktok": "9x16", "instagram": "4x5", "facebook": "1x1", "youtube": "16x9"},
  "renderProfile": "fast_parallel",
  "preferHardwareEncode": True,
  "parallelWorkers": 4,
  "ffmpegThreadsPerProcess": 2,
  "textOverlay": {"enabled": False, "text": ""}
}

def run():
    sample_dir = os.path.join("uploads", "592d3ab6-d917-44b6-8778-2faaac63705c")
    images = [
        os.path.join(sample_dir, "1.PNG"),
        os.path.join(sample_dir, "2.PNG"),
        os.path.join(sample_dir, "3.PNG"),
        os.path.join(sample_dir, "4.PNG"),
    ]
    images = [p for p in images if os.path.exists(p)]

    out_dir = os.path.join("outputs", "speedtest_run")
    os.makedirs(out_dir, exist_ok=True)
    start = time.time()
    files = generate_slideshow(images, "speedtest", out_dir, settings)
    print(json.dumps({"files": files, "elapsed_sec": round(time.time()-start,2)}))

if __name__ == '__main__':
    run()
