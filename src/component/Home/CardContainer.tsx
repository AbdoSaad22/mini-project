import React from "react";
import Feature from "./Feature";
import styles from "./cardContainer.module.css";
import Image1 from "../../../public/images/news.jpg";
import Image2 from "../../../public/images/Schedules.jpg";
import Image3 from "../../../public/images/Professor.jpeg";
import Image4 from "../../../public/images/guidance.jpg";
import Image5 from "../../../public/images/Regulations.jpg";
import Image6 from "../../../public/images/chatbot.jpg";

const featureData = [
  {
    image: Image1,
    title: "News",
    text: "Stay updated with the latest news and events happening in the college. From announcements and notices to event highlights, get all the information you need to stay informed about the college community. Click to read more.",
    link: "/news",
  },
  {
    image: Image2,
    title: "Student Lecture Schedules",
    text: "Access and download the latest lecture schedules for all courses. Stay on top of your academic schedule with our up-to-date timetables and ensure you never miss a class or important academic event. Click to view the schedules.",
    link: "/Schedules",
  },
  {
    image: Image3,
    title: "Professor Availability",
    text: "Find out when professors are available for consultation and office hours. Whether you need academic advice or have questions about coursework, check the availability of your professors and plan your visits accordingly.",
    link: "/Availability",
  },
  {
    image: Image4,
    title: "Guidance for New Students",
    text: "Helpful resources and guidance for new students to navigate the college. From orientation information to tips on making the most of your college experience, we've got you covered. Click to access the guidance resources.",
    link: "/map",
  },
  {
    image: Image5,
    title: "Faculty Regulations",
    text: "Read the regulations and policies of the faculty to stay informed. Knowing the rules and guidelines is essential for maintaining academic integrity and understanding your responsibilities as a student. Click to read the regulations.",
    link: "/regulation",
  },
  {
    image: Image6,
    title: "Interactive Chat Bot",
    text: "Interact with our AI-powered chat bot for quick answers to your questions. Whether you need information about courses, schedules, or general inquiries, our chat bot is here to help 24/7. Click to start a conversation.",
    link: "/chatbot",
  },
];

const FeatureContainer = () => {
  return (
    <div className={styles.cardContainer}>
      {featureData.map((feature, index) => (
        <Feature
          key={index}
          image={feature.image}
          title={feature.title}
          text={feature.text}
          link={feature.link}
        />
      ))}
    </div>
  );
};

export default FeatureContainer;
