import teacherimage from "../../../assets/images/teacherimage.jpeg";
import { useNavigate } from "react-router-dom";

const Teacher = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <>
      <div>
        <div className="flex justify-center items-center  flex-col">
          <h1 className="inline-block text-xl sm:text-2xl md:text-3xl font-semibold pt-1">
            Teacher
          </h1>
        </div>

        <div className="grid md:grid-cols-2  sm:grid-cols-2  p-4 gap-1">
          <div className="p-3">
            <div className="p-3">
              {" "}
              <img className="" src={teacherimage} alt="" />{" "}
            </div>
          </div>

          <div>
            <div className="p-3">
              <p className="text-base">
                Teachers are at the forefront of change. They are not only
                responsible for imparting knowledge but also for adapting to new
                technologies that enhance the teaching experience. One such tool
                that is revolutionizing the way educators manage their
                classrooms and students is the School Management System (SMS).
                In this article, we'll explore how teachers can harness the
                power of an SMS to transform their teaching methods and
                streamline their responsibilities.
              </p>

              <p className="text-base">
                It's time for educators to leverage the full potential of the
                SMS and unlock their capabilities as transformative educators.
                So, don't miss out on the benefits of your school's SMS—make it
                an integral part of your teaching journey.
              </p>
            </div>
          </div>
        </div>

        <div className="flex align-item justify-center py-5">
          <button
            onClick={goBack}
            className="text-[1.2rem] bg-blue-400 px-5 
  py-1 rounded-full hover:shadow-lg hover:shadow-sky-400 "
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default Teacher;
