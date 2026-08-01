# Sprint 13 Final Stabilized

Final stabilization based on Sprint 12.5.2.

## Finalized
- Guestbook/Supabase not used.
- `우주에게` section removed.
- Easy Edit (`content.js`) retained.
- BGM + Welcome retained.
- Single seamless growth movie retained.
- Seasonal photos retain the final chosen JPG/WebP mix.
- Video uses metadata preload.
- Lazy loading/async decoding added to non-critical images.
- Korean wrapping rules and reduced-motion accessibility hardened.
- Obsolete split movie files cleaned if present.

## Final mobile QA
1. Welcome → BGM starts
2. BGM toggle works
3. Growth movie pauses BGM and resumes after close/end
4. All seasonal/gallery images load
5. Map/address buttons work
6. KakaoTalk in-app browser layout is intact
7. iPhone Safari / Android Chrome have no clipped text
8. Kakao OG preview uses the intended thumbnail/title

## Editing later
For normal text/photo changes, edit `content.js`, preview with Live Server, then Commit → Push.
