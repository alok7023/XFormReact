import "./App.css";
import React, { useState } from "react";
import axios from "axios";
function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    doctor: "",
    meeting: "",
    date: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      let res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        formData
      );
      let data = res.data;
      console.log(data);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      console.log("some error occurred");
    }
  };

  function ApiSuccessfull() {
    return (
      <div>
        <h2>Appointment Booked Successfully</h2>
        <button onClick={cancelHandler}>Cancel Appointment</button>
      </div>
    );
  }

  function Scheduling() {
    return <h3>Scheduling the appointment...</h3>;
  }

  const cancelHandler = () => {
    setIsSuccess(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      {isSuccess ? (
        <ApiSuccessfull />
      ) : (
        <div>
          <h1>Book a session</h1>
          <p>
            Fill in the form below to book a virtual session with your doctor
          </p>

          <div>
            {isLoading ? (
              <Scheduling />
            ) : (
              <form onSubmit={submitHandler}>
                <h4>Basic Info</h4>
                <div>
                  <label>First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="lname">Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <h5>Doctor</h5>
                  <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                  >
                    <option value="john">Dr John Hopkins</option>
                    <option value="maria">Dr Maria Hill</option>
                    <option value="rajesh">Dr Rajesh Patel</option>
                  </select>
                </div>

                <div>
                  <h5>Where ?</h5>
                  <input
                    type="radio"
                    name="meeting"
                    value="meet"
                    onChange={handleChange}
                  />{" "}
                  Google Meet <br />
                  <input
                    type="radio"
                    name="meeting"
                    value="phone"
                    onChange={handleChange}
                  />{" "}
                  Phone
                </div>

                <div>
                  <h5>When ?</h5>
                  <input
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit">Confirm Booking</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
