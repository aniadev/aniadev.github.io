// Single source of truth for identity, links, focus areas, and portfolio work.
// Bilingual fields carry { vi, en }; the UI reads the active locale.
// NOTE: experience entries + contact email are seeded from public info - edit to taste.

export type Locale = 'vi' | 'en'
export type LocaleText = Record<Locale, string>

export const author = {
  name: 'Hải Phạm',
  handle: 'aniadev',
  initials: 'PH',
  email: 'aniadev.99@gmail.com',
  location: { vi: 'Hà Nội, Việt Nam', en: 'Hà Nội, Vietnam' } as LocaleText,
  role: {
    vi: 'Software Engineer, Blockchain Engineer, AI Agent Researcher',
    en: 'Software Engineer, Blockchain Engineer, AI Agent Researcher',
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
      vi: 'Tăng thông lượng bằng Hydra Heads - sharding on-chain, bảng xếp hạng cho hàng vạn người chơi.',
      en: 'Scaling throughput through Hydra Heads - on-chain sharding, leaderboards for tens of thousands of players.',
    },
  },
  {
    id: 'evm',
    icon: 'simple-icons:ethereum',
    title: { vi: 'EVM · DeFi', en: 'EVM · DeFi' },
    body: {
      vi: 'DeFi trên Ethereum - sàn giao dịch, cầu nối, stake pool - và một chain riêng fork từ đó, vận hành từ đầu đến cuối.',
      en: 'DeFi on Ethereum - exchanges, bridges, staking pools - and a chain of its own forked from it, run end to end.',
    },
  },
  {
    id: 'frontend',
    icon: 'lucide:layout-panel-left',
    title: { vi: 'Frontend', en: 'Frontend' },
    body: {
      vi: 'Vue, Nuxt, TypeScript. Giao diện chính xác, dễ đọc, chịu được tải thật - cho ví, dashboard và công cụ nội bộ.',
      en: 'Vue, Nuxt, TypeScript. Precise, readable, load-bearing interfaces for wallets, dashboards, and internal tools.',
    },
  },
  {
    id: 'ai',
    icon: 'lucide:bot',
    title: { vi: 'AI Agent', en: 'AI agents' },
    body: {
      vi: 'Agent tự chủ - persona, bộ nhớ, guardrails - và những mô hình vận hành đưa chúng vào đội nhóm và doanh nghiệp nhỏ.',
      en: 'Autonomous agents - persona, memory, guardrails - and the operating models that put them to work inside small teams and businesses.',
    },
  },
  {
    id: 'security',
    icon: 'lucide:shield-alert',
    title: { vi: 'Bảo mật', en: 'Security forensics' },
    body: {
      vi: 'Mổ xẻ sự cố sau tấn công - dựng lại dòng tiền, tìm ra nguyên nhân gốc, rút ra bài học phòng thủ.',
      en: 'Post-exploit teardowns - reconstructing fund flow, isolating root cause, extracting defensive lessons.',
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
    repo: 'Vtechcom/hydra-sdk',
    href: 'https://github.com/Vtechcom/hydra-sdk',
    lang: 'TypeScript',
    stars: 6,
    tags: ['Cardano', 'Hydra', 'SDK', 'Turborepo'],
    summary: {
      vi: 'SDK toàn diện cho ứng dụng ví Cardano, tích hợp Hydra Layer 2, kiến trúc monorepo Turborepo.',
      en: 'Comprehensive SDK for Cardano wallet applications with Hydra Layer 2 integration, on a Turborepo monorepo.',
    },
  },
  {
    name: 'hydra-hexcore',
    repo: 'Vtechcom/hydra-hexcore',
    href: 'https://github.com/Vtechcom/hydra-hexcore',
    lang: 'TypeScript',
    tags: ['Cardano', 'Hydra', 'Orchestration', 'DevOps'],
    summary: {
      vi: 'Giải pháp tự động triển khai và quản lý nhiều Hydra Head multi-party, điều phối vòng đời node và head trên Cardano.',
      en: 'Automated deployment and management for multi-party Hydra Heads, orchestrating node and head lifecycles across Cardano.',
    },
  },
  {
    name: 'hexcore-cli',
    repo: 'Vtechcom/hexcore-cli',
    href: 'https://github.com/Vtechcom/hexcore-cli',
    lang: 'TypeScript',
    tags: ['Cardano', 'Hydra', 'CLI'],
    summary: {
      vi: 'Giao diện dòng lệnh để điều khiển Hexcore - lớp điều phối multi-Hydra.',
      en: 'Command-line interface for driving Hexcore, the multi-Hydra orchestration layer.',
    },
  },
  {
    name: 'hydra-benchmark',
    repo: 'Vtechcom/hydra-benchmark',
    href: 'https://github.com/Vtechcom/hydra-benchmark',
    lang: 'TypeScript',
    tags: ['Hydra', 'Benchmark', 'Performance'],
    summary: {
      vi: 'Bộ đo hiệu năng Hydra Head - đo throughput và độ trễ giao dịch khi tải cao.',
      en: 'Benchmark harness for Hydra Heads, measuring transaction throughput and latency under load.',
    },
  },
  {
    name: 'hydra-htlc-demo',
    repo: 'Vtechcom/hydra-htlc-demo',
    href: 'https://github.com/Vtechcom/hydra-htlc-demo',
    lang: 'Vue',
    tags: ['Hydra', 'HTLC', 'Aiken', 'Demo'],
    summary: {
      vi: 'Demo đầy đủ Hash Time-Locked Contract trên Hydra, gồm cả hạ tầng và giao diện client.',
      en: 'End-to-end Hash Time-Locked Contract demo on Hydra, bundling the infrastructure and a client UI.',
    },
  },
  {
    name: 'aiken-htlc-contract',
    repo: 'Vtechcom/aiken-htlc-contract',
    href: 'https://github.com/Vtechcom/aiken-htlc-contract',
    lang: 'Aiken',
    tags: ['Aiken', 'Cardano', 'HTLC', 'Smart Contract'],
    summary: {
      vi: 'Hợp đồng HTLC viết bằng Aiken cho Cardano - giao dịch có điều kiện với khóa thời gian và hash lock.',
      en: 'HTLC smart contract in Aiken for Cardano - conditional transfers guarded by a time lock and a hash lock.',
    },
  },
  {
    name: 'cardano-installer',
    repo: 'Vtechcom/cardano-installer',
    href: 'https://github.com/Vtechcom/cardano-installer',
    lang: 'Rust',
    tags: ['Rust', 'Cardano', 'Docker', 'Mithril'],
    summary: {
      vi: 'Tiện ích Rust để khởi tạo và chạy Cardano node bằng Docker, bootstrap từ snapshot Mithril.',
      en: 'Rust utility to initialize and run a Cardano node via Docker, bootstrapped from a Mithril snapshot.',
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
      vi: 'Macro pad tự host, chỉ chạy trong mạng LAN, biến điện thoại Android thành bàn phím lệnh.',
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
      vi: 'Plugin định dạng code cho ngôn ngữ smart contract Aiken.',
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
    role: { vi: 'Kỹ sư Blockchain & Frontend (Senior)', en: 'Senior Blockchain & Frontend Engineer' },
    period: '2023 - nay',
    detail: {
      vi: 'Phát triển hệ thống on-chain trên Cardano và frontend: hydra-sdk, tích hợp Hydra L2 & sharding, hexcore điều phối multi-Hydra, SDK ví và bộ công cụ nội bộ.',
      en: 'Leading on-chain systems on Cardano and their frontends: hydra-sdk, Hydra L2 integration & sharding, hexcore multi-Hydra orchestration, wallet SDKs, and internal tooling.',
    },
  },
  {
    org: 'DeFi · EVM',
    role: { vi: 'Kỹ sư Blockchain (EVM)', en: 'Blockchain Engineer (EVM)' },
    period: '2021 - 2023',
    detail: {
      vi: 'Xây dựng các sản phẩm DeFi trên Ethereum (sàn giao dịch, bridge, stake pool) cùng một network fork từ Ethereum, vận hành thực tế trên production.',
      en: 'DeFi primitives on Ethereum - exchanges, bridges, staking pools - plus a full network forked from Ethereum and taken to production.',
    },
  },
  {
    org: 'AI Agent R&D',
    role: { vi: 'Nghiên cứu & Phát triển AI Agent', en: 'AI Agent research & deployment' },
    period: '2024 - nay',
    detail: {
      vi: 'Nghiên cứu kiến trúc agent tự chủ (persona, bộ nhớ, guardrails) và các mô hình vận hành để đưa agent vào công việc thực tế của đội nhóm, doanh nghiệp.',
      en: 'Designing autonomous agents from persona to memory to guardrails, and the operating models that put them to work inside small teams and businesses.',
    },
  },
  {
    org: 'Open source',
    role: { vi: 'Tác giả & Duy trì dự án', en: 'Author & maintainer' },
    period: '2021 - nay',
    detail: {
      vi: 'Tác giả và người đóng góp cho hydra-sdk, hexcore, codesync, prettier-plugin-aiken cùng nhiều công cụ Rust/Vue trong hệ sinh thái Cardano.',
      en: 'hydra-sdk, hexcore, codesync, prettier-plugin-aiken, and other Rust/Vue tooling for the Cardano ecosystem.',
    },
  },
]

export const stack = [
  'TypeScript', 'Vue', 'Nuxt', 'Rust', 'Aiken', 'Cardano', 'Hydra',
  'Solidity', 'EVM', 'Ethereum', 'Node.js', 'PostgreSQL', 'MongoDB',
  'Docker', 'Tailwind CSS', 'LLM Agents', 'RAG', 'IoT',
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
    name: { vi: 'Kỹ sư Nhiệt - Lạnh', en: 'Engineer, Thermal & Refrigeration' },
    issuer: 'ĐH Bách Khoa Hà Nội',
    note: {
      vi: 'Viện Khoa học & Công nghệ Nhiệt Lạnh (nay là Khoa Năng lượng Nhiệt, Trường Cơ khí) - nền tảng về nhiệt động lực học, truyền nhiệt, hệ thống điều khiển và IoT.',
      en: 'Institute of Heat & Refrigeration Science and Technology (now the Faculty of Thermal Energy, School of Mechanical Engineering) - a grounding in thermodynamics, HVAC, thermal power plants, and IoT.',
    },
  },
  {
    name: { vi: 'Chứng chỉ Chuyên sâu AI & ML', en: 'AI Certificates - Google' },
    issuer: 'Google · Coursera',
    href: 'https://coursera.org/share/72ac2d4d6e3ada494cd0feb771a5f577',
    note: {
      vi: 'Chuỗi khóa học chuyên môn về AI/ML của Google trên Coursera.',
      en: 'Google AI/ML course series on Coursera.',
    },
  },
]
