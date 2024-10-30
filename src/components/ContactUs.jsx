import React from 'react'
import '../css/ContactUs.css'

const ContactUs = () => {
  return (
    <div className='container'>
        <div className='row vh-100 d-flex align-items-center justify-content-center outer-layer'>
      <div className='col-lg-2 col-sm-3 bg-success text-light py-4 ps-3 contact-info'>
      <h4 className='mb-3'>Contact Us</h4>
        <p><i class="fa-solid fa-location-dot"></i><span className='ms-2'>23 Lorem ipsum dolor sit.</span></p>
        <p><i class="fa-regular fa-envelope"></i><span className='ms-2'>hello@gmail.com</span></p>
        <p><i class="fa-solid fa-location-dot"></i><span  className='ms-2'>makeydguij</span></p>
        <p><i class="fa-solid fa-phone"></i><span  className='ms-2'>+33619530144</span></p>
        <div className='col-3 d-flex justify-content-between'>
            <div><i class="fa-brands fa-instagram"></i></div>
            <div><i class="fa-brands fa-twitter"></i></div>
            <div><i class="fa-brands fa-linkedin-in"></i></div>
        </div>
      </div>
      <div className='col-lg-5 col-md-8'>
        <div className='row contact-form bg-white'>
            <div className='col-lg-5 col-sm-4 blank'></div>
            <div className='col-lg-7 col-sm-8'>
               <form className='pb-3 pe-4'>
               <h4 className='pt-5'>Get in Touch</h4>
                <p className='text-secondary m-0'>Feel free to drop us line below!</p>
                <input type='text' placeholder='Your name'/>
                <input type='text' placeholder='Your email' />
                <textarea rows="3" cols="40" placeholder='write your message here.....'/>
                <button className='btn border-0'>SEND</button>
               </form>
            </div>
        </div>
      </div>
        </div>
    </div>
  )
}

export default ContactUs