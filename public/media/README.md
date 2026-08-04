# Hero background video

The hero looks for these two files. Until they exist the hero falls back to the CSS
light field and blueprint grid, which is why the page never looks broken without them.

```
public/media/hero-loop.webm    preferred, VP9 or AV1
public/media/hero-loop.mp4     fallback, H.264 High profile
```

## Specs

| Property | Target |
| --- | --- |
| Resolution | 1920x1080, 16:9 |
| Duration | 8 to 14 seconds, seamless loop |
| Frame rate | 24 or 30 fps |
| File size | under 2.5 MB per file, this is above the fold |
| Audio | none, strip the track entirely |
| Content | slow, dark, low contrast. Abstract data or light motion reads best under the scrim |

The video is muted, looping, and `playsInline`. It does not render at all when the
visitor has `prefers-reduced-motion: reduce` set, so the loop must never be the only
place important information appears.

## Encoding

```bash
# webm
ffmpeg -i source.mov -an -c:v libvpx-vp9 -crf 36 -b:v 0 -vf scale=1920:-2 hero-loop.webm

# mp4
ffmpeg -i source.mov -an -c:v libx264 -profile:v high -crf 26 -pix_fmt yuv420p \
  -movflags +faststart -vf scale=1920:-2 hero-loop.mp4
```

## Optional poster

If you add a poster frame, drop it at `public/media/hero-poster.jpg` (1920x1080,
under 180 KB) and add `poster="/media/hero-poster.jpg"` to the `<video>` element in
`src/components/site/HeroMedia.tsx`.
