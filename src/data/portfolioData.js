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
      vi: "Tôi là sinh viên năm 2 chuyên ngành Toán Ứng Dụng tại Đại học Tôn Đức Thắng (TDTU). Tôi tập trung phát triển Ứng dụng Web cấp tiến (PWA) thông qua phương pháp kỹ nghệ hỗ trợ bởi trí tuệ nhân tạo (AI-assisted engineering), kết hợp chặt chẽ với tư duy toán học logic.",
      en: "I am a sophomore studying Applied Mathematics at Ton Duc Thang University (TDTU). I specialize in building Progressive Web Apps (PWAs) using AI-assisted engineering methodologies, integrated with logical mathematical reasoning."
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
    tiktok: "",
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
      items: ["React & Vite", "TypeScript", "Tailwind CSS", "IndexedDB (Dexie.js)", "Supabase"] 
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
        vi: "Bắt đầu tiếp cận và làm chủ nền tảng Antigravity từ tháng 06/2026. Thông qua phương pháp kỹ nghệ hỗ trợ bởi trí tuệ nhân tạo (AI-assisted engineering), đã trực tiếp xây dựng và phát triển 4 sản phẩm ứng dụng (KAT Journey, StayPilot, 5TactiQ, Monat), làm chủ quy trình phát triển phần mềm và tối ưu hiệu suất.",
        en: "Began leveraging the Antigravity platform in June 2026. Through AI-assisted engineering methodologies, successfully architected and built 4 applications (KAT Journey, StayPilot, 5TactiQ, Monat), mastering full-stack software development workflows."
      }
    }
  ],
  projects: [
    {
      id: "kat-journey",
      title: "KAT Journey",
      category: { vi: "Quản lý Lịch trình / Thay thế Excel", en: "Itinerary Planner / Excel Alternative" },
      description: {
        vi: "Ứng dụng ghi chép nhật ký hành trình và quản lý kế hoạch du lịch cá nhân thông minh, giải pháp hoàn hảo thay thế các file Excel cồng kềnh. Giao diện di động tối giản, mượt mà, hỗ trợ sử dụng ngoại tuyến và bảo mật dữ liệu cá nhân.",
        en: "Smart travel itinerary & expense journaling application built to replace bulky Excel spreadsheets. Features a minimal mobile experience, smooth performance, offline access, and client-side data privacy."
      },
      tags: [
        { vi: "Lập Lịch Trình", en: "Itinerary Planner" },
        { vi: "Thay Thế Excel", en: "Excel Alternative" },
        { vi: "Dùng Ngoại Tuyến", en: "Offline Access" },
        { vi: "Bảo Mật Cá Nhân", en: "Data Privacy" },
        { vi: "Xuất PDF & Excel", en: "PDF & Excel Export" }
      ],
      links: { demo: "https://katjourney.vercel.app/", github: "https://github.com/trevorthanhtung/katjourney" },
      status: { vi: "Đang phát triển & cập nhật", en: "In Active Development" },
      isComingSoon: false,
      features: {
        vi: [
          "Ghi chép chi tiết lịch trình và quản lý chi tiêu cá nhân",
          "Tự động lưu trữ và truy cập nhanh ngay cả khi không có mạng Internet",
          "Mã hóa bảo mật thông tin nhật ký chuyến đi riêng tư",
          "Xuất báo cáo hành trình trực quan dưới dạng PDF và Excel"
        ],
        en: [
          "Detailed itinerary planning and personal expense tracking",
          "Automatic local storage accessible even without Internet connection",
          "Private travel entries protected with end-to-end data security",
          "Export travel reports directly into clean PDF and Excel formats"
        ]
      }
    },
    {
      id: "staypilot",
      title: "StayPilot",
      category: { vi: "Quản lý Lưu trú / Vận hành Thông minh", en: "Stay Management / Smart Operations" },
      description: {
        vi: "Nền tảng quản lý trải nghiệm lưu trú và tự động hóa vận hành du lịch lưu trú thông minh. Tối ưu hóa quy trình đặt phòng, quản lý tiện ích phòng và chăm sóc khách hàng chuyên nghiệp.",
        en: "Smart stay management & guest experience platform. Streamlines booking workflows, room amenities management, and guest communication."
      },
      tags: [
        { vi: "Quản Lý Đặt Phòng", en: "Booking Management" },
        { vi: "Vận Hành Lưu Trú", en: "Stay Operations" },
        { vi: "Trải Nghiệm Khách Hàng", en: "Guest Experience" },
        { vi: "Báo Cáo Hiệu Suất", en: "Analytics Dashboard" }
      ],
      links: { demo: "https://staypilothub.vercel.app/", github: "https://github.com/trevorthanhtung" },
      status: { vi: "Đang phát triển", en: "In Active Development" },
      isComingSoon: false,
      features: {
        vi: [
          "Quản lý sơ đồ phòng và lịch đặt phòng theo thời gian thực",
          "Tự động hóa quy trình phản hồi và hỗ trợ yêu cầu lưu trú của khách",
          "Thống kê báo cáo và phân tích doanh thu hiệu suất lưu trú"
        ],
        en: [
          "Real-time room occupancy and booking schedule management",
          "Automated guest inquiry and service request workflows",
          "Comprehensive hospitality revenue & performance analytics"
        ]
      }
    },
    {
      id: "5tactiq",
      title: "5TactiQ",
      category: { vi: "Quản lý Đội bóng / Chiến thuật Sân 5", en: "5-a-Side Football / Tactical Board" },
      description: {
        vi: "Nền tảng quản lý đội bóng và mô phỏng sơ đồ chiến thuật chuyên biệt cho bóng đá sân 5. Hỗ trợ sắp xếp đội hình, xây dựng bài đánh, phân tích kịch bản trận đấu trực quan và linh hoạt.",
        en: "Dedicated 5-a-side football team management and tactical simulation platform. Build custom formations, design playbooks, and analyze match scenarios with real-time visual feedback."
      },
      tags: [
        { vi: "Sơ Đồ Sân 5", en: "5-a-Side Formations" },
        { vi: "Quản Lý Đội Bóng", en: "Team Management" },
        { vi: "Bảng Chiến Thuật", en: "Tactical Board" },
        { vi: "Phân Tích Trận Đấu", en: "Match Analytics" }
      ],
      links: { demo: "https://5tactiq.vercel.app/", github: "https://github.com/trevorthanhtung" },
      status: { vi: "Đang phát triển", en: "In Active Development" },
      isComingSoon: false,
      features: {
        vi: [
          "Thiết kế và mô phỏng sơ đồ chiến thuật sân 5 tương tác kéo thả",
          "Quản lý danh sách cầu thủ, chỉ số thể lực và phong độ thi đấu",
          "Lưu trữ bộ bài đánh chiến thuật và phân tích kịch bản đối thủ"
        ],
        en: [
          "Interactive drag-and-drop 5-a-side tactical board simulation",
          "Player roster, fitness metrics, and performance management",
          "Custom playbook storage and opponent scenario analysis"
        ]
      }
    },
    {
      id: "monat",
      title: "Monat",
      category: { vi: "Quản lý Chi tiêu / Tài chính Cá nhân", en: "Expense Management / Personal Finance" },
      description: {
        vi: "Hệ sinh thái quản lý chi tiêu và hoạch định tài chính cá nhân tối giản. Giúp theo dõi dòng tiền hàng ngày, phân tích thói quen tiêu dùng và lập kế hoạch tiết kiệm thông minh.",
        en: "Minimalist expense tracking & personal finance management suite. Track daily cash flow, analyze spending habits, and plan smart savings goals."
      },
      tags: [
        { vi: "Quản Lý Chi Tiêu", en: "Expense Tracking" },
        { vi: "Tài Chính Cá Nhân", en: "Personal Finance" },
        { vi: "Lập Ngân Sách", en: "Budgeting" },
        { vi: "Sắp Ra Mắt", en: "Coming Soon" }
      ],
      links: { demo: "#", github: "#" },
      status: { vi: "Sắp ra mắt (Coming Soon)", en: "Coming Soon" },
      isComingSoon: true,
      features: {
        vi: [
          "Ghi chép và phân loại chi tiêu hàng ngày trực quan",
          "Phân tích biểu đồ dòng tiền và thói quen tiêu dùng",
          "Hoạch định hạn mức chi tiêu và mục tiêu tiết kiệm cá nhân"
        ],
        en: [
          "Daily expense logging and visual category tracking",
          "Cash flow chart analytics and spending habit insights",
          "Budget limit planning and personal savings goal tracking"
        ]
      }
    }
  ]
};
