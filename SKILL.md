---
name: hermes-image-selfie
description: "Generates a personalized selfie image via Grok Imagine Edit (fal.ai). Auto-detects mirror (full-body) or direct (close-up) mode from prompt keywords and returns a Telegram-ready markdown image."
version: 1.0.0
prerequisites:
  env_vars: [FAL_KEY]
metadata:
  hermes:
    tags: [image-generation, selfie, telegram, fal-ai, grok]
---

# hermes-image-selfie

사용자 프롬프트를 기반으로 셀피 이미지를 생성하고 마크다운 이미지 구문으로 반환한다.
Hermes Gateway가 자동으로 Telegram `send_photo()`를 호출한다.

## When to Use

- User asks for a selfie, photo, or image
- User requests a photo at a specific location (beach, cafe, park, library, etc.)
- User requests an outfit, fashion, or full-body photo

## How to Run

1. If the user prompt is not in English, **translate it to English** first.
2. Run the following command:

```bash
node ~/.hermes/skills/media/hermes-image-selfie/scripts/image-gen.js "translated English prompt"
```

## Output Handling

The script returns a JSON string:

Success:
```json
{ "success": true, "mode": "direct", "markdown": "![generated image](https://...)", "url": "https://..." }
```

Failure:
```json
{ "success": false, "error": "error message" }
```

- `success: true` → return the `markdown` value as-is in your response
- `success: false` → report the `error` to the user

## Modes

| Mode | Description | Trigger Keywords |
|------|-------------|-----------------|
| `mirror` | Full-body mirror selfie | outfit, wearing, clothes, dress, suit, fashion, full-body, mirror |
| `direct` | Close-up selfie (default) | everything else |
