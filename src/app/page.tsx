"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainContent from "../component/Home/MainContent";
import CardContainer from "../component/Home/CardContainer";
import About from "../component/Home/About";
import Footer from "@/component/footer/Footer";
import Spinner from "../component/spinner/Spinner";

const HomePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
          router.push("/login");
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        router.push("/login");
      }
    };

    checkLoginStatus();
  }, [router]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <main>
        <MainContent />
        <CardContainer />
        <About />
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
