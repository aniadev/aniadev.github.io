// Single source of truth for identity, links, focus areas, and portfolio work.
// Bilingual fields carry { vi, en }; the UI reads the active locale.
// NOTE: experience entries + contact email are seeded from public info — edit to taste.

export type Locale = 'vi' | 'en'
export type LocaleText = Record<Locale, string>

export const author = {
  name: 'Phạm Hải',
  handle: 'aniadev',
  initials: 'PH',
  email: 'aniadev.99@gmail.com',
  location: { vi: 'Hà Nội, Việt Nam', en: 'Hà Nội, Vietnam' } as LocaleText,
  role: {
    vi: 'Kỹ sư Frontend & Blockchain',
    en: 'Frontend & Blockchain Engineer',
  } as LocaleText,
}

export type SiteLink = { key: string; label: string; href: string; icon: string; handle: string }

export const links: SiteLink[] = [
  { key: 'github', label: 'GitHub', href: 'https://github.com/aniadev', icon: 'simple-icons:github', handle: '@aniadev' },
  { key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/phamhai99/', icon: 'simple-icons:linkedin', handle: 'in/phamhai99' },
  { key: 'email', label: 'Email', href: 'mailto:aniadev.99@gmail.com', icon: 'lucide:mail', handle: 'aniadev.99@gmail.com' },
]

export type FocusArea = { id: string; icon: string; title: LocaleText; body: LocaleText }

export const focusAreas: FocusArea[] = [
  {
    id: 'cardano',
    icon: 'simple-icons:cardano',
    title: { vi: 'Cardano · eUTXO', en: 'Cardano · eUTXO' },
    body: {
      vi: 'Mô hình sổ cái eUTXO, thiết kế validator, và tư duy tất định về trạng thái on-chain.',
      en: 'The eUTXO ledger model, validator design, and reasoning about on-chain state deterministically.',
    },
  },
  {
    id: 'hydra',
    icon: 'lucide:layers',
    title: { vi: 'Hydra · Layer 2', en: 'Hydra · Layer 2' },
    body: {
      vi: 'Tăng thông lượng bằng Hydra Heads — sharding on-chain, bảng xếp hạng cho hàng vạn người chơi.',
      en: 'Scaling throughput through Hydra Heads — on-chain sharding, leaderboards for tens of thousands of players.',
    },
  },
  {
    id: 'frontend',
    icon: 'lucide:layout-panel-left',
    title: { vi: 'Frontend', en: 'Frontend' },
    body: {
      vi: 'Vue, Nuxt, TypeScript. Giao diện chính xác, dễ đọc, chịu được tải thật — cho ví, dashboard và công cụ nội bộ.',
      en: 'Vue, Nuxt, TypeScript. Precise, readable, load-bearing interfaces for wallets, dashboards, and internal tools.',
    },
  },
  {
    id: 'ai',
    icon: 'lucide:bot',
    title: { vi: 'AI Agent', en: 'AI agents' },
    body: {
      vi: 'Thiết kế agent tự chủ — persona, kiến trúc bộ nhớ, guardrails an toàn, và giữ cá tính ổn định qua thời gian.',
      en: 'Designing autonomous agents — persona, memory architecture, safety guardrails, and keeping identity stable over time.',
    },
  },
  {
    id: 'security',
    icon: 'lucide:shield-alert',
    title: { vi: 'Bảo mật', en: 'Security forensics' },
    body: {
      vi: 'Mổ xẻ sự cố sau tấn công — dựng lại dòng tiền, tìm ra nguyên nhân gốc, rút ra bài học phòng thủ.',
      en: 'Post-exploit teardowns — reconstructing fund flow, isolating root cause, extracting defensive lessons.',
    },
  },
]

export type Project = {
  name: string
  repo: string
  href: string
  lang: string
  stars?: number
  archived?: boolean
  summary: LocaleText
  tags: string[]
}

export const projects: Project[] = [
  {
    name: 'hydra-sdk',
    repo: 'aniadev/hydra-sdk',
    href: 'https://github.com/aniadev/hydra-sdk',
    lang: 'TypeScript',
    tags: ['Cardano', 'Hydra', 'SDK', 'Turborepo'],
    summary: {
      vi: 'SDK toàn diện cho ứng dụng ví Cardano, tích hợp Hydra Layer 2, kiến trúc monorepo Turborepo.',
      en: 'Comprehensive SDK for Cardano wallet applications with Hydra Layer 2 integration, on a Turborepo monorepo.',
    },
  },
  {
    name: 'android-stream-desk',
    repo: 'aniadev/android-stream-desk',
    href: 'https://github.com/aniadev/android-stream-desk',
    lang: 'Vue',
    stars: 96,
    tags: ['Vue', 'LAN', 'Tooling'],
    summary: {
      vi: 'Macro pad tự lưu trữ, chỉ chạy trong mạng LAN, biến điện thoại Android thành bàn phím lệnh.',
      en: 'Self-hosted, LAN-only macro pad that turns an Android phone into a programmable command deck.',
    },
  },
  {
    name: 'mdview',
    repo: 'aniadev/mdview',
    href: 'https://github.com/aniadev/mdview',
    lang: 'Vue',
    tags: ['Tauri', 'Vue 3', 'TypeScript'],
    summary: {
      vi: 'Trình soạn thảo Markdown trên desktop, dựng bằng Tauri, Vue 3 và TypeScript.',
      en: 'Desktop Markdown editor built with Tauri, Vue 3, and TypeScript.',
    },
  },
  {
    name: 'prettier-plugin-aiken',
    repo: 'aniadev/prettier-plugin-aiken',
    href: 'https://github.com/aniadev/prettier-plugin-aiken',
    lang: 'JavaScript',
    tags: ['Aiken', 'Prettier', 'DX'],
    summary: {
      vi: 'Plugin định dạng mã cho ngôn ngữ hợp đồng thông minh Aiken.',
      en: 'Code-formatter plugin for the Aiken smart-contract language.',
    },
  },
  {
    name: 'codesync',
    repo: 'aniadev/codesync',
    href: 'https://github.com/aniadev/codesync',
    lang: 'Rust',
    stars: 6,
    tags: ['Rust', 'CLI', 'Git'],
    summary: {
      vi: 'CLI gọn nhẹ để quét các kho Git cục bộ và đã clone, khai báo qua một tệp JSON.',
      en: 'Lightweight CLI for scanning local and cloned Git repositories from a JSON manifest.',
    },
  },
  {
    name: 'rust-copyfier-tool',
    repo: 'aniadev/rust-copyfier-tool',
    href: 'https://github.com/aniadev/rust-copyfier-tool',
    lang: 'Rust',
    tags: ['Rust', 'CLI'],
    summary: {
      vi: 'Tiện ích dòng lệnh viết bằng Rust để sao chép nội dung thư mục, có hỗ trợ loại trừ.',
      en: 'Rust CLI utility for copying directory contents with exclusion support.',
    },
  },
]

export type Experience = {
  org: string
  role: LocaleText
  period: string
  detail: LocaleText
}

// Seeded from public signals (GitHub org, repos). Replace periods/details with real CV data.
export const experience: Experience[] = [
  {
    org: 'VTechcom',
    role: { vi: 'Kỹ sư Frontend & Blockchain (Senior)', en: 'Senior Frontend & Blockchain Engineer' },
    period: '2023 — nay',
    detail: {
      vi: 'Dẫn dắt phát triển frontend và các hệ thống on-chain trên Cardano; SDK ví, tích hợp Hydra L2, công cụ nội bộ.',
      en: 'Leading frontend and on-chain systems on Cardano; wallet SDKs, Hydra L2 integration, internal tooling.',
    },
  },
  {
    org: 'Open source',
    role: { vi: 'Tác giả & người bảo trì', en: 'Author & maintainer' },
    period: '2021 — nay',
    detail: {
      vi: 'hydra-sdk, codesync, prettier-plugin-aiken và các công cụ Rust/Vue khác cho hệ sinh thái Cardano.',
      en: 'hydra-sdk, codesync, prettier-plugin-aiken, and other Rust/Vue tooling for the Cardano ecosystem.',
    },
  },
]

export const stack = [
  'TypeScript', 'Vue', 'Nuxt', 'Rust', 'Aiken', 'Cardano', 'Hydra', 'Node.js',
  'PostgreSQL', 'MongoDB', 'Docker', 'Tailwind CSS', 'LLM Agents', 'RAG',
]

export type Credential = {
  name: LocaleText
  issuer: string
  href?: string
  note?: LocaleText
}

// Verified certificates. The Coursera link is a public share URL.
export const credentials: Credential[] = [
  {
    name: { vi: 'Chứng chỉ AI — Google', en: 'AI Certificates — Google' },
    issuer: 'Google · Coursera',
    href: 'https://coursera.org/share/72ac2d4d6e3ada494cd0feb771a5f577',
    note: {
      vi: 'Chuỗi khoá học AI/ML của Google trên Coursera.',
      en: 'Google AI/ML course series on Coursera.',
    },
  },
]
