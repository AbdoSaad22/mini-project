"use client";
import { useEffect, useState } from "react";
import Footer from "../../../component/footer/Footer";
import styles from "./newsPage.module.css";
import Card from "../../../component/newsCard/Card";
import { useRouter } from "next/navigation";
import Spinner from "../../../component/spinner/Spinner";
interface CardData {
  title: string;
  description: string;
  image: string;
  link: string;
  date: string;
}

interface Data {
  cards: CardData[];
}

export default function NewsPage() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/news/get");
        if (!res.ok) {
          throw new Error(`Fetch Failed, status: ${res.status}`);
        }
        const result: Data = await res.json();
        setData(result);
      } catch (error) {
        console.error("Fetch Failed : ", error);
      }
    };

    if (!loading) {
      fetchData();
    }
  }, [loading]);

  if (loading) {
    return <Spinner />;
  }

  if (!data) {
    return <Spinner />;
  }

  const recentNews = data.cards
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <>
      <div>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.cards}>
              {data.cards.map((card, index) => (
                <Card key={index} {...card} />
              ))}
            </div>
          </div>
          <aside className={styles.recentNews}>
            <h3>Recent News</h3>
            <ul>
              {recentNews.map((newsItem, index) => (
                <li key={index}>
                  <a href={`#news${index + 1}`}>{newsItem.title}</a>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <Footer />
      </div>
    </>
  );
}
