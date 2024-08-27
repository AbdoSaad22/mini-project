"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./Chatbot.module.css";
import { useRouter } from "next/navigation";
import Spinner from "../../component/spinner/Spinner";
import Link from "next/link";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "I am a chatbot here to help you.", sender: "bot" },
  ]);
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availabilityData, setAvailabilityData] = useState(null);
  const [noDataFound, setNoDataFound] = useState(false);
  const router = useRouter();
  const chatWindowRef = useRef(null);

  const faq = {
    "What are the professor appointment hours?": {
      "Computer Science": {
        "Dr. Ahmed Hosny": "Not Found",
        "Dr. Khaled Fathy": "Not Found",
      },
      "Information System": {
        "Dr. Ibrahim Al-Awadhi": "Not Found",
        "Dr. Suha": "Not Found",
      },
      "Information Technology": {
        "Dr. Nagwa": "Not Found",
      },
    },
    "What is the lecture schedule?": {
      "First Year": "Details about the first year schedule",
      "Second Year": "Details about the second year schedule",
      "Third Year": "Details about the third year schedule",
      "Fourth Year": "Details about the fourth year schedule",
    },
    "Where can I find places in the college?": {
      Library: "Location of the library",
      Laboratories: {
        A0: "Location of Laboratory A0",
      },
      Cafetaria: "Location of the cafeteria",
    },
    "What are the Faculty Regulations?": "pdf", // Ensure this key triggers PDF display
  };

  const handleClick = (question) => {
    console.log(`Question: ${question}`);

    const ans = options ? options[question] : faq[question];

    console.log("Options:", options);
    console.log("Answer:", ans);

    if (ans === "pdf") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: question, sender: "user" },
        { type: "pdf", src: "/regulation/Regulation.pdf" },
      ]);
      setOptions(null);
    } else if (typeof ans === "object") {
      setOptions(ans);
    } else if (
      question === "First Year" ||
      question === "Second Year" ||
      question === "Third Year" ||
      question === "Fourth Year"
    ) {
      fetchScheduleData(question);
    } else if (
      faq["What are the professor appointment hours?"]["Computer Science"][
        question
      ] ||
      faq["What are the professor appointment hours?"]["Information System"][
        question
      ] ||
      faq["What are the professor appointment hours?"][
        "Information Technology"
      ][question]
    ) {
      fetchAvailabilityData(question);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: question, sender: "user" },
        {
          text: ans || "Sorry, I don't have information on that.",
          sender: "bot",
        },
      ]);
      setOptions(null);
    }
  };

  const fetchAvailabilityData = async (professor) => {
    setAvailabilityData(null);
    setNoDataFound(false);
    try {
      const response = await fetch(
        `http://localhost:5000/professorAvailability/getAvailability?professor=${encodeURIComponent(
          professor
        )}`
      );

      if (response.ok) {
        const data = await response.json();
        const jsondata =
          typeof data.jsondata === "string"
            ? data.jsondata
            : JSON.stringify(data.jsondata);
        const parsedData = JSON.parse(jsondata);

        if (parsedData && parsedData.length > 0) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: `Availability for ${professor}:`, sender: "bot" },
            { type: "table", data: parsedData },
          ]);
        } else {
          setNoDataFound(true);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: `No availability data found for ${professor}.`,
              sender: "bot",
            },
          ]);
        }
      } else {
        console.error(
          "Failed to fetch availability data",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error fetching availability data:", error);
    }
  };

  const fetchScheduleData = async (year) => {
    console.log(`Fetching schedule data for: ${year}`);
    setAvailabilityData(null);
    setNoDataFound(false);
    try {
      const response = await fetch(
        `http://localhost:5000/schedule/getSchedule?year=${encodeURIComponent(
          year
        )}`
      );

      if (response.ok) {
        const data = await response.json();
        const parsedData = JSON.parse(data.jsondata);

        if (parsedData && parsedData.length > 0) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: `Lecture schedule for ${year}:`, sender: "bot" },
            { type: "table", data: parsedData },
          ]);
        } else {
          setNoDataFound(true);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: `No lecture schedule data found for ${year}.`,
              sender: "bot",
            },
          ]);
        }
      } else {
        console.error("Failed to fetch schedule data", await response.text());
      }
    } catch (error) {
      console.error("Error fetching schedule data:", error);
    }
  };

  const getOptions = () => (options ? Object.keys(options) : Object.keys(faq));

  const renderTableAsText = (jsonData) => {
    const numberOfColumns = Math.max(...jsonData.map((row) => row.length));

    return (
      <div className={styles.tableTextContainer}>
        {jsonData.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.tableTextRow}>
            {row.map((cell, cellIndex) => (
              <span key={cellIndex} className={styles.tableTextCell}>
                {cell}
              </span>
            ))}
            {Array.from({ length: numberOfColumns - row.length }).map(
              (_, emptyCellIndex) => (
                <span
                  key={`empty-${emptyCellIndex}`}
                  className={styles.tableTextCell}
                ></span>
              )
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderMessageContent = (msg) => {
    if (msg.type === "table") {
      return renderTableAsText(msg.data);
    } else if (msg.type === "pdf") {
      return (
        <div>
          <iframe
            src={msg.src}
            className={styles.pdfViewer}
            title="Faculty Regulations"
          ></iframe>
          <Link
            className={styles.pdfButton}
            href="./regulation"
          >
           See in detail
          </Link>
        </div>
      );
    } else {
      return msg.text;
    }
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
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.chatbotContainer}>
        <h1 className={styles.text}>College Chatbot</h1>
        <div className={styles.chatWindow} ref={chatWindowRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === "user" ? styles.userMessage : styles.botMessage
              }
            >
              {msg.sender && msg.sender !== "user" && (
                <img
                  src={`/images/${msg.sender}-icon.png`}
                  alt={`${msg.sender} icon`}
                  className={
                    msg.sender === "user" ? styles.userIcon : styles.botIcon
                  }
                />
              )}
              {renderMessageContent(msg)}
            </div>
          ))}
          {noDataFound && (
            <p className={styles.noDataMessage}>
              No availability data found for this professor.
            </p>
          )}
        </div>
        <div className={styles.questionsContainer}>
          {getOptions().map((option, index) => (
            <button
              key={index}
              className={styles.questionButton}
              onClick={() => {
                if (options) {
                  setOptions(null);
                }
                handleClick(option);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
