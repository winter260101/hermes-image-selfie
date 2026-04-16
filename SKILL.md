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

## 사용 시점

사용자가 다음을 요청할 때 이 스킬을 사용한다:
- 셀피, 사진, 이미지 생성 요청
- 특정 장소나 상황에서의 사진 (beach, cafe, park 등)
- 옷차림, 패션, 코디 관련 사진

## 실행 방법

1. 사용자 프롬프트가 한국어(또는 비영어)인 경우 **영어로 번역**한다.
2. 아래 명령을 실행한다. `SKILL_DIR`은 이 SKILL.md 파일이 위치한 디렉토리의 절대 경로다.

```
node {SKILL_DIR}/scripts/image-gen.js "{영어로 번역된 prompt}"
```

## 반환 처리

스크립트는 JSON 문자열을 반환한다.

성공 시:
```json
{ "success": true, "mode": "direct", "markdown": "![generated image](https://...)", "url": "https://..." }
```

실패 시:
```json
{ "success": false, "error": "오류 메시지" }
```

- `success: true` → `markdown` 값을 그대로 응답으로 반환한다
- `success: false` → `error` 값을 텍스트로 안내한다

## 모드

| 모드 | 설명 | 트리거 키워드 |
|------|------|-------------|
| `mirror` | 전신 미러 셀피 | outfit, wearing, clothes, dress, suit, fashion, full-body, mirror |
| `direct` | 클로즈업 셀피 (기본값) | 그 외 모든 경우 |
