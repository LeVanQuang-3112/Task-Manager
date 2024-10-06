module.exports = {
  // Thiết lập môi trường test là jsdom (môi trường giả lập trình duyệt)
  testEnvironment: "jsdom",

  // Báo cho Jest biết về các phần mở rộng tệp
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  // Các mẫu tệp mà Jest sẽ thực hiện kiểm tra
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],

  // Báo cho Jest cách chuyển đổi TypeScript thành JavaScript
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest", // Nếu bạn sử dụng Babel
  },

  // Mock các tài nguyên như CSS, Less, và các file media khi chạy tests
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },

  // Báo cho Jest biết thư mục chứa các module và alias nếu có
  moduleDirectories: ["node_modules", "src"],

  // Thiết lập tự động thực hiện cleanup sau mỗi test case
  setupFilesAfterEnv: ["./jest.setup.js"],

  // Báo cho Jest bỏ qua một số thư mục nhất định
  testPathIgnorePatterns: ["/node_modules/", "/build/"],

  // Thu thập báo cáo coverage và lưu tại thư mục "coverage"
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}",
    "!src/**/*.d.ts",
    "!src/index.tsx", // Không cần thu thập coverage từ file entry chính
  ],

  // Báo cho Jest cách xử lý import các module
  transformIgnorePatterns: ["node_modules/(?!(antd|@babel)/)"],

  // Cho phép mô phỏng các module cần thiết cho testing
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
