import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const About = () => {
  const { isDarkMode } = useTheme();

  const containerClassName = `min-h-screen flex items-center justify-center px-4 py-4 pb-4 ${
    isDarkMode ? "bg-gray-900" : "bg-gray-50"
  }`;

  const textClassName = `text-gray-700 ${
    isDarkMode ? "text-white" : "text-black"
  }`;

  useEffect(() => {
    document.title = 'ICMS Collage | About';
  }, []);

  return (
    <div className={containerClassName}>
      <div
        className={`bg-white p-8 rounded-lg shadow-md max-w-6xl w-full ${
          isDarkMode ? "dark:bg-gray-800" : ""
        }`}
      >
        <h1 className={`${textClassName} text-4xl font-bold mb-4 text-center`}>
          Welcome to ICMS College
        </h1>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-8`}>
          <div className={`md:order-2`}>
            <img
              src="https://icms.edu.pk/assets/themes/default/images/about/about.jpg"
              alt="ICMS College Building"
              className={`w-full h-auto rounded-md`}
            />
          </div>
          <div className={textClassName}>
            <p className={`text-lg mb-4`}>
              ICMS College is a prestigious educational institution dedicated to
              empowering students with the knowledge and skills they need to
              excel in their academic and professional pursuits. Our commitment
              to excellence and innovation sets us apart as a leading provider
              of quality education.
            </p>
            <p className={`text-lg mb-4`}>
              Our Vision: To be a center of academic excellence, fostering a
              community of lifelong learners and responsible leaders who
              positively impact society.
            </p>
            <p className={`text-lg mb-4`}>
              Our Mission: To provide a nurturing learning environment,
              delivered by experienced educators and industry experts, that
              equips students with the expertise and values necessary to succeed
              in a competitive world.
            </p>
            {/* ... (additional paragraphs) ... */}
          </div>
        </div>
        <div className={textClassName}>
          <h2 className={`text-xl font-bold mb-2`}>Why Choose ICMS College?</h2>
          <ul className={`list-disc list-inside`}>
            <li>
              Comprehensive Curriculum: Our carefully crafted curriculum is
              designed to meet industry demands and ensure students are
              well-prepared for their careers.
            </li>
            <li>
              Inclusive Community: We believe in diversity and welcome students
              from all backgrounds, providing equal opportunities for everyone.
            </li>
            <li>
              Top-notch Faculty: Our faculty comprises experienced educators and
              industry experts who are passionate about teaching and mentorship.
            </li>
            <li>
              State-of-the-art Facilities: We offer modern facilities and a
              conducive learning environment for a seamless educational
              experience.
            </li>
            {/* ... (additional list items) ... */}
          </ul>
        </div>
        <p className={textClassName}>
          Whether you are a recent high school graduate, a working professional
          seeking further education, or an ambitious individual pursuing
          personal growth, ICMS College provides a platform for you to excel and
          achieve your goals.
        </p>
        <p className={textClassName}>
          Join ICMS College today and take the first step towards a brighter
          future for yourself and a positive impact on society.
        </p>
        <div className={`mt-4`}>
          <p className={textClassName}>
            For more information, please contact us at:
          </p>
          <ul className={`list-disc list-inside ${textClassName}`}>
            <li>Email: info@icms.edu</li>
            <li>Phone: +1 (123) 456-7890</li>
            <li>
              Address: Balambat Timergara, Khyber Pakhtunkhwa (KPK), Lower Dir,
              Pakistan
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
