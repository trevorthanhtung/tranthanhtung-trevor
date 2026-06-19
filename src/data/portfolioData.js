export const portfolioData = {
  profile: {
    firstName: "thanhtungg.",
    lastName: "Trần Thanh Tùng",
    fullName: "Trần Thanh Tùng",
    title: {
      vi: "Lập trình viên Cộng tác AI & Sinh viên Toán Ứng Dụng",
      en: "AI-Augmented Developer & Applied Mathematics Student"
    },
    subtitle: {
      vi: "Toán Ứng Dụng tại TDTU và Tối ưu năng suất bằng AI",
      en: "Applied Mathematics @ TDTU & AI-Driven Productivity"
    },
    avatar: "/asset/me/TƯNG.jpg",
    bio: {
      vi: "Tôi là sinh viên năm 2 chuyên ngành Toán Ứng Dụng tại Đại học Tôn Đức Thắng (TDTU) kiêm Nhà sáng tạo nội dung công nghệ. Tôi tập trung phát triển ứng dụng Web (PWA) thông qua phương pháp kỹ nghệ hỗ trợ bởi AI, kết hợp tư duy toán học logic với niềm đam mê chia sẻ tri thức trên YouTube và TikTok (@kat.thanhtungg).",
      en: "I am a sophomore studying Applied Mathematics at Ton Duc Thang University (TDTU) and a Tech Content Creator. I specialize in building web applications (PWAs) using AI-assisted engineering, blending mathematical logic with a passion for sharing tech insights on YouTube and TikTok (@kat.thanhtungg)."
    },
    philosophy: {
      vi: "Sức mạnh thực sự của lập trình hiện đại không chỉ là ghi nhớ cú pháp, mà là khả năng làm chủ các mô hình ngôn ngữ lớn (LLM) để hiện thực hóa ý tưởng nhanh chóng, được dẫn dắt bởi tư duy logic toán học chặt chẽ.",
      en: "The true power of modern software engineering lies not in memorising syntax, but in mastering Large Language Models (LLMs) to build systems rapidly, guided by rigorous mathematical logic."
    },
    email: "trevorthanhtung@gmail.com",
    phone: "0816158215",
    github: "https://github.com/trevorthanhtung",
    linkedin: "https://www.linkedin.com/in/thanh-t%C3%B9ng-tr%E1%BA%A7n-9b35983a9/",
    facebook: "https://www.facebook.com/tthanhtung2306/",
    youtube: "https://www.youtube.com/@kat.thanhtungg",
    tiktok: "https://www.tiktok.com/@kat.thanhtungg",
    instagram: "https://www.instagram.com/_.thanhtungg._/",
  },
  skills: [
    { 
      name: { vi: "Phát triển Cộng tác AI", en: "AI-Augmented Engineering" }, 
      category: "AI", 
      items: ["Antigravity", "Codex", "Kiro AI", "ZCode", "Prompt Engineering"] 
    },
    { 
      name: { vi: "Lập trình Cốt lõi & Logic", en: "Core Programming & Logic" }, 
      category: "Logic", 
      items: ["Python", "Tư duy Thuật toán (Algorithmic Logic)", "Toán học tính toán (Computational Math)", "Git & GitHub"] 
    },
    { 
      name: { vi: "Công nghệ vận hành qua AI", en: "AI-Enabled Tech Stack" }, 
      category: "Stack", 
      items: ["React & Vite", "TypeScript", "Tailwind CSS", "IndexedDB (Dexie.js)", "Firebase Cloud"] 
    },
    { 
      name: { vi: "Năng lực Bổ trợ", en: "Supplemental Skills" }, 
      category: "Support", 
      items: ["Aptis General B1", "MOS Word & Excel"] 
    }
  ],
  experience: [
    {
      role: { vi: "Sinh viên Toán Ứng Dụng (Năm 2)", en: "Applied Mathematics Student (Sophomore)" },
      company: { vi: "Trường Đại học Tôn Đức Thắng (TDTU)", en: "Ton Duc Thang University (TDTU)" },
      duration: { vi: "2025 - Hiện tại", en: "2025 - Present" },
      description: {
        vi: "Theo học chuyên ngành Toán Ứng Dụng, tích lũy kiến thức cơ bản về toán học, rèn luyện tư duy logic và làm quen với các khái niệm lập trình nền tảng.",
        en: "Pursuing Applied Mathematics, acquiring foundational logic, and learning basic computational and programming concepts."
      }
    },
    {
      role: { vi: "Lập trình viên Phát triển bằng AI", en: "AI-Augmented Developer" },
      company: { vi: "Dự án cá nhân & Nguồn mở", en: "Personal & Open Source Projects" },
      duration: { vi: "06/2026 - Hiện tại", en: "Jun 2026 - Present" },
      description: {
        vi: "Bắt đầu phát triển Ứng dụng Web cấp tiến (PWA) KAT Journey từ đầu tháng 6/2026 thông qua phương pháp kỹ nghệ có sự hỗ trợ của trí tuệ nhân tạo (AI-assisted engineering). Trực tiếp thiết kế giao diện di động, tích hợp cơ chế lưu trữ ngoại tuyến bằng Dexie.js và đồng bộ cơ sở dữ liệu Firebase.",
        en: "Started developing the KAT Journey Progressive Web App (PWA) in early June 2026 using AI-assisted engineering. Designed mobile-first layouts, integrated offline-first local storage via Dexie.js, and implemented Firebase database synchronization."
      }
    }
  ],
  projects: [
    {
      id: "project-1",
      title: "KAT Journey",
      category: { vi: "PWA (Ứng dụng Web cấp tiến) / Kỹ nghệ cộng tác AI", en: "PWA (Progressive Web App) / AI-Assisted" },
      description: {
        vi: "Ứng dụng PWA ghi chép nhật ký hành trình và lập kế hoạch du lịch cá nhân. Thiết kế giao diện di động tối giản, tối ưu chuyển động 60fps trên di động, hỗ trợ hoạt động ngoại tuyến (offline-first) và mã hóa bảo mật dữ liệu cục bộ.",
        en: "Progressive Web App (PWA) for travel journaling and planning. Engineered with a minimal mobile-first UI, fluid 60fps animations, offline-first local storage, and client-side encryption."
      },
      tags: ["React & Vite", "TypeScript", "PWA", "Dexie.js (Offline-first)", "Firebase", "Tailwind CSS"],
      links: { demo: "https://katjourney.vercel.app/", github: "https://github.com/trevorthanhtung/katjourney" },
      colorClass: "from-accent-violet/20 to-accent-cyan/10",
      status: { vi: "Đang phát triển & cập nhật liên tục", en: "In Active Development & Continuous Updates" },
      features: {
        vi: [
          "Ghi chép lịch trình và chi tiêu ngoại tuyến (Offline-first với Dexie.js)",
          "Tự động đồng bộ hóa đám mây Firebase khi thiết bị kết nối mạng",
          "Bảo mật thông tin cá nhân qua cơ chế mã hóa dữ liệu cục bộ (Crypto-js)",
          "Xuất dữ liệu và báo cáo hành trình trực quan ra file Excel và PDF"
        ],
        en: [
          "Offline-first travel journaling & expense logging (Dexie.js / IndexedDB)",
          "Auto-sync to Firebase Cloud Storage once device is online",
          "Client-side local data encryption using Crypto-js",
          "Export journey reports and logs directly to Excel & PDF files"
        ]
      }
    }
  ]
};
