import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlineMailOutline,
  MdOutlinePhoneEnabled,
  TiHomeOutline,
} from "../icons/index";
import { createContact } from "../service/contactService";
import { useTheme } from "../context/ThemeContext";
import { Spinner } from "../components";

// eslint-disable-next-line react/prop-types
const ContactInputBox = ({ type, placeholder, name, value, onChange }) => {
  return (
    <div className="mb-6">
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className="border-[f0f0f0] w-full rounded border py-3 px-[14px] text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none text-black"
      />
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const ContactTextArea = ({ row, placeholder, name, value, onChange }) => {
  return (
    <div className="mb-6">
      <textarea
        rows={row}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className="border-[f0f0f0] w-full resize-none rounded border py-3 px-[14px] text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none text-black"
        value={value}
      />
    </div>
  );
};

const Contact = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();

  const { contactLoading } = useSelector((state) => state.contact);

  const initialFormData = {
    subject: "",
    email: "",
    message: "",
    phoneNumber: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const { subject, email, message, phoneNumber } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createContact({ formData }));
    setFormData(initialFormData);
  };

  useEffect(() => {
    document.title = 'ICMS Collage | Contact';
  }, []);


  return (
    <section
      className={`py-14 overflow-hidden relative z-10 flex flex-col items-center xs:px-6 sm:px-10 md:px-14 lg:px-20 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      } `}
    >
      {contactLoading && <Spinner />}
      <div className="container">
        <div className="flex flex-wrap -mx-2 md:-mx-4 lg:justify-between">
          <div className="w-full px-2 md:px-4 lg:w-1/2 xl:w-6/12">
            <div className="flex flex-col justify-center items-start">
              <span className="block mb-4 text-base font-semibold text-primary px-4 text-indigo-800 w-full">
                Contact Us
              </span>
              <h2 className="mb-6 text-3xl font-bold uppercase text-dark px-4 w-full text-start">
                GET IN TOUCH WITH US
              </h2>
              <p className="text-base leading-relaxed mb-6 md:mb-9 text-body-color px-4 text-justify">
                We truly value and appreciate your feedback, questions, and
                inquiries. Whether you're seeking information, have suggestions
                to share, or are interested in potential collaboration
                opportunities, we warmly invite you to reach out to us. Our
                dedicated and passionate team is here to assist you in any way
                we can, and we're excited to engage with you on your journey.
                Your thoughts and ideas contribute to the growth and improvement
                of our services, and we're committed to creating a positive and
                impactful experience for you. Thank you for considering us as
                your partner on this exciting endeavor.
              </p>
              <div className="py-2 flex flex-col gap-8 px-4">
                <div className="flex items-start bg-indigo-400 rounded-sm p-3">
                  <TiHomeOutline size={32} color="blue" />
                  <div className="ml-3">
                    <h4 className="mb-1 text-lg font-bold text-dark">
                      Our Location
                    </h4>
                    <p className="text-base text-body-color">
                      Balambat, Timergara, Khyber Pakhtunkhwa (KPK), Lower Dir,
                      Pakistan
                    </p>
                  </div>
                </div>
                <div className="flex items-start  bg-indigo-400 rounded-sm p-3">
                  <MdOutlinePhoneEnabled size={32} color="blue" />
                  <div className="ml-3">
                    <h4 className="text-lg font-bold text-dark">
                      Phone Number
                    </h4>
                    <p className="text-base text-body-color">
                      +1 (123) 4562-7890479
                    </p>
                  </div>
                </div>
                <div className="flex items-start bg-indigo-400 rounded-sm p-3">
                  <MdOutlineMailOutline size={32} color="blue" />
                  <div className="ml-3">
                    <h4 className="text-lg font-bold text-dark">
                      Email Address
                    </h4>
                    <p className="text-base text-body-color">info@icms.edu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:px-4 lg:w-1/2 xl:w-6/12 py-10">
            <div
              className={`relative p-6 rounded-lg shadow-lg md:p-16 hover:shadow-2xl ${
                isDarkMode ? "dark:bg-gray-800" : "bg-white"
              }`}
            >
              <form onSubmit={handleSubmit}>
                <ContactInputBox
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={subject}
                  onChange={handleChange}
                />
                <ContactInputBox
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={handleChange}
                />
                <ContactInputBox
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={handleChange}
                />
                <ContactTextArea
                  row="6"
                  placeholder="Your Message"
                  name="message"
                  value={message}
                  onChange={handleChange}
                />
                <div>
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full p-3 bg-indigo-600 hover:bg-indigo-800 text-white transition border rounded border-primary bg-primary hover:bg-opacity-90"
                  >
                    Send Message
                  </button>
                </div>
              </form>
              <div className="absolute -top-10 -right-9 z-[-1]">
                <svg
                  width={100}
                  height={100}
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: "scaleX(-1)" }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
                    fill="#3056D3"
                  />
                </svg>
              </div>
              <div className="absolute -left-7 -bottom-7 z-[-1]">
                <svg
                  width={100}
                  height={100}
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
                    fill="#3056D3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
