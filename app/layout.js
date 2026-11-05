export const metadata = {
  title: 'Shop Clone Tự Động',
  description: 'Hệ thống bán clone tự động uy tín',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#f4f6f8', color: '#333' }}>
        {children}
      </body>
    </html>
  );
}
