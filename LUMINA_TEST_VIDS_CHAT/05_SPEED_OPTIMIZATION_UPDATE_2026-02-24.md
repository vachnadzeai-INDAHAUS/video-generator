# 2026-02-24 — Speed Optimization Update (Lumina Test)

## გაკეთებული ცვლილებები
ფაილი: `api/generator/generator.py`

1. 4-ფორმატიანი პარალელი default-ად დავაფიქსირე:
- `parallelWorkers` default: `4` (იყო `2`)

2. დავამატე render profile-ები:
- `fast_parallel` (default)
- `balanced`
- `final_quality`

3. Encoder fallback chain:
- პირველ რიგში: `h264_nvenc` (თუ ხელმისაწვდომია)
- შემდეგ: `h264_qsv`
- ბოლოს: `libx264` (fallback)

4. CPU overload-ის შესამცირებლად:
- `ffmpegThreadsPerProcess` კონტროლი (default დინამიკური, 4-პარალელზე ზომიერი)

## ტესტი
სკრიპტი: `tmp_speed_test.py`

ტესტ-პარამეტრები:
- 4 ფორმატი ერთდროულად
- fps=24
- renderProfile=fast_parallel
- parallelWorkers=4
- ffmpegThreadsPerProcess=2

შედეგი:
- 4 ფაილი გენერირდა წარმატებით
- elapsed: **~36.77 წამი** (4 format / 4 images ტესტზე)

## შენიშვნა გარემოზე
- `h264_nvenc` სცადა, მაგრამ ამ სისტემაში ჩავარდა (`Cannot load nvcuda.dll`) → ავტომატურად გადავიდა fallback-ზე.
- ანუ სისტემა სტაბილურად აგრძელებს მუშაობას GPU-ის გარეშეაც.

## რეკომენდებული default ახლა
- `renderProfile: fast_parallel`
- `parallelWorkers: 4`
- `ffmpegThreadsPerProcess: 2`
- `fps: 24` (თუ სიჩქარე პრიორიტეტია)
