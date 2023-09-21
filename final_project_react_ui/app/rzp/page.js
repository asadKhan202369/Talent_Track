"use client"
import React, { useEffect } from "react";

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

const Page = () => {

  // useEffect(() => {
  //   // Load Razorpay script when the component mounts
  //   loadScript("https://checkout.razorpay.com/v1/checkout.js").catch((error) => {
  //     alert("Razorpay is not applied!");
  //     console.error(error);
  //   });
  // }, []);

  async function displayRazorpay() {

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if(!res){
       alert('Razorpay not defined !')
       return
    }


    const data = await fetch('http://localhost:8080/razorpay', {method: 'POST'}).then((t)=>
     t.json() 
    
    )

    console.log(data,"its datat");

    const options = {
      key: "rzp_test_e0p4ROsVzyQ7xL",
      currency: data.currency,
      amount: data.amount.toString(),
       order_id: data.id,
      // amount: "3000",
      // currency: "INR",
      name: "Acme Corp",
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

  return (
    <div>
      <div>
        <button onClick={displayRazorpay}>React-razorpay</button>
      </div>
    </div>
  );
};

export default Page;
