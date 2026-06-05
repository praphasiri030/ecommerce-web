# E-Commerce Web Application (Frontend)

ส่วนติดต่อผู้ใช้งาน (Frontend) สำหรับแพลตฟอร์มร้านค้าออนไลน์ พัฒนาด้วย React.js และ Tailwind CSS ระบบคัดกรองสินค้าที่ใช้งานง่าย เชื่อมต่อกับระบบหลังบ้านผ่าน REST API

---

## ฟีเจอร์หลัก (Key Features)

* **Desktop Optimized**: ระบบถูกออกแบบและจัดวางเลย์เอาต์มาเพื่อรองรับการใช้งานและแสดงผลได้อย่างเต็มประสิทธิภาพ**เฉพาะบนขนาดจอคอมพิวเตอร์** (Desktop Only)
* **Interactive Cart**: ระบบตะกร้าสินค้าที่อัปเดตยอดรวม จำนวนเงิน และเก็บข้อมูลบน Local Storage ทำให้ข้อมูลไม่หายเมื่อรีเฟรชหน้าเว็บ
* **Advanced Product Filter**: ระบบค้นหาสินค้าละเอียดยิบ ค้นหาด้วยคีย์เวิร์ด, เลือกหมวดหมู่ (Checkbox) และสไลด์เลือกช่วงราคา
* **Route Guards**: ระบบป้องกันเส้นทางหน้าเว็บ (Protected Routes) แยกสิทธิ์ระหว่างผู้ใช้งานทั่วไป (User) และผู้ดูแลระบบ (Admin)
* **Order & Checkout**: หน้าสรุปรายการสั่งซื้อ กรอกข้อมูลจัดส่ง และส่งข้อมูลไปยังระบบหลังบ้านเพื่อรอการตรวจสอบ

---

## เทคโนโลยีที่ใช้ (Tech Stack)

* **Core Library**: React.js (Vite)
* **Styling**: Tailwind CSS
* **State Management**: Zustand (Global State)
* **Data Fetching**: Axios
* **Validation**: Zod (สำหรับตรวจสอบความถูกต้องของฟอร์มเข้าสู่ระบบ / สมัครสมาชิก)

---

## โครงสร้างโฟลเดอร์ (Project Structure)

```text
src/
├── api/          # ส่วนจัดการการดึงข้อมูลและเชื่อมต่อ API หลังบ้าน (Axios Services)
├── assets/       # ไฟล์ Static สำหรับหน้าเว็บ เช่น โลโก้, รูปภาพ และไอคอนต่างๆ
├── components/   # UI Components ที่ถูกนำกลับมาใช้ซ้ำ (เช่น Navbar, ProductCard)
├── layouts/      # เทมเพลตโครงสร้างหน้าเว็บหลัก (เช่น UserLayout, AdminLayout)
├── pages/        # หน้าหลักของเว็บไซต์แยกตามมุมมองผู้ใช้ (เช่น Home, Shop, Login, Admin)
├── routes/       # ไฟล์จัดการเส้นทางเว็บไซต์ (Routing) และระบบ Route Guards
├── store/        # Zustand สำหรับจัดการ Global State (Auth, Cart, ฯลฯ)
├── utils/        # ฟังก์ชันเสริมหรือเครื่องมือช่วยคำนวณที่ใช้บ่อยในโปรเจค
├── App.jsx       # คอมโพเนนต์หลักที่รวมโครงสร้างทั้งหมด
├── index.css     # ไฟล์สไตล์หลัก (Tailwind CSS Configuration)
└── main.jsx      # จุดเริ่มต้นการเรนเดอร์ React Application