"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncfindcourse } from "@/store/Actions/studentActions";
import { asynccurrentstudent } from "@/store/Actions/studentActions";
import Loader from "@/components/loader/loader";
import React from "react";
import style from "./style.module.css";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";
import { useState } from "react";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { student, isAuthenticated } = useSelector(
    (state) => state.studentReducers
  );
  const { findcourse } = useSelector((state) => state.studentReducers);

  const [id, setId] = useState(null);

  useEffect(() => {
    // Check if window is defined (client-side) before accessing it
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      const parts = url.split("/");
      const id = parts[parts.length - 1];
      setId(id);
    }
    
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/course/enroll/${id}`);
    } else {
      router.push("/student/login");
    }
  }, [id,isAuthenticated]);

  useEffect(() => {
    if(id){
      dispatch(asynccurrentstudent());
      findcourseDetails();
    }
  
  }, [id,asynccurrentstudent]);

  const findcourseDetails = () => {
    dispatch(asyncfindcourse(id));
  };

  const handleGoBack = () => {
    window.history.back();
  };

  // razorpay <code></code>

  async function displayRazorpay() {
    
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay not defined !");
      return;
    }
   

    const response = await axios.post(`/razorpay/${findcourse._id}`);
    
    const data = response.data; // Extract response data

    console.log(data, "its datat");

    const options = {
      key: "rzp_test_e0p4ROsVzyQ7xL",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      // amount: "3000",
      // currency: "INR",
      name: "Talent Track",
      description: "Test Transaction",
      image: "https://ik.imagekit.io/sheryians/Sheryians_Logo_wFKd9VClG.png",
      // order_id: order.id, // Make sure you have 'order' defined somewhere
      handler: (res) => {
        console.log(res);
        alert(res.razorpay_payment_id);
        alert(res.razorpay_order_id);
        alert(res.razorpay_signature);
      },
      prefill: {
        name: "Arbaz khan",
        email: "ak1933929@gmail.com",
        contact: "8962834895",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  // Razorpay code end

  return (
    <>
      {findcourse ? (
        <div className={style.main}>
          <div className={style.card_container}>
            <div className={style.card}>
              <div className={style.card_header}>
                <img src={findcourse.cpic.url} alt="" />
              </div>
              <div className={style.card_body}>
                <h6>{findcourse.cname}</h6>
                <div className={style.card_plan_price}>
                  {findcourse.price} Rs.
                </div>
                <div className={style.card_text}>
                  {" "}
                  You are going to buy the one of the best course availabe in
                  the industry{" "}
                </div>
                <div className={style.card_payment_button}>
                  <button
                    onClick={displayRazorpay}
                    style={{ backgroundColor: "rgb(56, 41, 224)" }}
                  >
                    Continue
                  </button>
                </div>
                <div
                  onClick={handleGoBack}
                  className={style.card_cancel_button}
                >
                  <button>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default page;
