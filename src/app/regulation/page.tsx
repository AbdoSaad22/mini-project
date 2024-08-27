"use client";
import { useState, useEffect } from "react";
import ContentsList from "./ContentsList";
import PdfViewer from "../../component/pdfView";
import Spinner from "../../component/spinner/Spinner";

const Regulation = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/login/check-login",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!data.loggedIn) {
          window.location.href = "/login";
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ display: "flex", direction: "rtl" }}>
      <ContentsList onItemClick={handleItemClick} />
      <div style={{ flex: 1, padding: "20px" }}>
        {!selectedItem && <PdfViewer pdfUrl="/regulation/Basic.pdf" />}
        {selectedItem === "الرؤيه والرساله" && (
          <PdfViewer pdfUrl="/regulation/vision.pdf" />
        )}
        {selectedItem === "أهداف الكلية" && (
          <PdfViewer pdfUrl="/regulation/1.pdf" />
        )}
        {selectedItem === "أقسام الكلية" && (
          <PdfViewer pdfUrl="/regulation/2.pdf" />
        )}
        {selectedItem === "الدرجات العلمية" && (
          <PdfViewer pdfUrl="/regulation/3.pdf" />
        )}
        {selectedItem === "شروط القبول بالكلية" && (
          <PdfViewer pdfUrl="/regulation/4.pdf" />
        )}
        {selectedItem === "نظام الدراسة" && (
          <PdfViewer pdfUrl="/regulation/5.pdf" />
        )}
        {selectedItem === "لغة التدريس" && (
          <PdfViewer pdfUrl="/regulation/6.pdf" />
        )}
        {selectedItem === "مواعيد الدراسة والتخرج" && (
          <PdfViewer pdfUrl="/regulation/7.pdf" />
        )}
        {selectedItem === "التسجيل والحذف والإضافة" && (
          <PdfViewer pdfUrl="/regulation/8.pdf" />
        )}
        {selectedItem === "الانسحاب من المقرر" && (
          <PdfViewer pdfUrl="/regulation/9.pdf" />
        )}
        {selectedItem === "الإرشاد الأكاديمي" && (
          <PdfViewer pdfUrl="/regulation/10.pdf" />
        )}
        {selectedItem === "المواظبة والغياب" && (
          <PdfViewer pdfUrl="/regulation/11.pdf" />
        )}
        {selectedItem === "الانقطاع عن الدراسة" && (
          <PdfViewer pdfUrl="/regulation/12.pdf" />
        )}
        {selectedItem === "نظام الامتحانات" && (
          <PdfViewer pdfUrl="/regulation/13.pdf" />
        )}
        {selectedItem === "نظام التقييم" && (
          <PdfViewer pdfUrl="/regulation/14.pdf" />
        )}
        {selectedItem === "الرسوب والاعاده" && (
          <PdfViewer pdfUrl="/regulation/15.pdf" />
        )}
        {selectedItem === "السجل الاكاديمي" && (
          <PdfViewer pdfUrl="/regulation/16.pdf" />
        )}
        {selectedItem ===
          "وضع الطالب تحت الملاحظه الاكاديميه وفصله من الكليه" && (
          <PdfViewer pdfUrl="/regulation/17.pdf" />
        )}
        {selectedItem === "الانذار" && (
          <PdfViewer pdfUrl="/regulation/18.pdf" />
        )}
        {selectedItem === "احكام تنظيميه" && (
          <PdfViewer pdfUrl="/regulation/19.pdf" />
        )}
        {selectedItem === "تطبيق قانون تنظيم الجامعات ولائحته التنفذيه" && (
          <PdfViewer pdfUrl="/regulation/20.pdf" />
        )}
        {selectedItem === "تطبيق اللائحه" && (
          <PdfViewer pdfUrl="/regulation/21.pdf" />
        )}
        {selectedItem === "المقررات الدراسيه" && (
          <PdfViewer pdfUrl="/regulation/22.pdf" />
        )}
        {selectedItem === "ساعات التمارين النظريه والعمليه" && (
          <PdfViewer pdfUrl="/regulation/23.pdf" />
        )}
        {selectedItem === "قواعد النظام الكودي للمقررات الدراسيه" && (
          <PdfViewer pdfUrl="/regulation/24.pdf" />
        )}
        {selectedItem === "المتطلبات العامه" && (
          <PdfViewer pdfUrl="/regulation/25.pdf" />
        )}
        {selectedItem === "متطلبات الكليه" && (
          <PdfViewer pdfUrl="/regulation/26.pdf" />
        )}
        {selectedItem === "متطلبات التخصص" && (
          <PdfViewer pdfUrl="/regulation/27.pdf" />
        )}
        {selectedItem === "متطلبات التدريب والتعلم الذاتي" && (
          <PdfViewer pdfUrl="/regulation/28.pdf" />
        )}
        {selectedItem === "مستويات ومتطلبات المقررات" && (
          <PdfViewer pdfUrl="/regulation/29.pdf" />
        )}
        {selectedItem === "ملحق المواد العلمية" && (
          <PdfViewer pdfUrl="/regulation/ref.pdf" />
        )}
      </div>
    </div>
  );
};

export default Regulation;
