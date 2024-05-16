import { Formik, Form, Field, ErrorMessage, readAsDataURL } from 'formik';
import './App.css';
import * as yup from "yup";
import React, { useState } from 'react';

const ValidationMessage = yup.object({
  Name: yup.string().required('Name is Required'),
  lastName: yup.string().required('Last Name is Required'),
  Email: yup.string().required('Email is Required')
    .email('Email is Required'),
  phone: yup
    .number()
    .min(1000000000, 'Enter 10 Number')
    .max(9999999999, "Not a valid Number It's sow long")
    .required('Phone number is compulsory'),
  gender:yup.string().required('Gender is Required')  

});


function App() {

  let [file_img, Setfileimg] = useState(null);
  let [img, setimg] = useState(null);
  let [form_data, setFormData] = useState('');


  let img_manege = () => {
    const reader = new FileReader();
    reader.readAsDataURL(file_img)
    reader.onload = () => {
      setimg(reader.result)
    }
  }


  return (
    <>

      <div className='d-flex justify-content-start mx-3 mt-3'>
        <div className='form mt-5 rounded mx-2'>
          <h2 className='text-center text-capitalize mt-3'> Create Your Profile  </h2>
          <Formik

            validationSchema={ValidationMessage}

            initialValues={{
              Name: "",
              lastName: "",
              Email: "",
              phone: "",
              file: "",
              gender:""
            }}


            onSubmit={(values, { resetForm }) => {
              resetForm({ values: '' })
              setFormData(values)
              img_manege()
              console.log(values);
            }}

          >
            {
              <Form className='px-5'>
                <div>
                  <label className='fs-5'>Name</label> <br />
                  <Field type='name' name="Name" className='w-100 rounded  p-2 my-2' />
                  <div className='text-danger '>
                    <ErrorMessage name='Name' />
                  </div>
                </div>
                <div>
                  <label className='fs-5'> Last Name</label> <br />
                  <Field type='text' name="lastName" className='w-100 rounded  p-2 my-2' />
                  <div className='text-danger '>
                    <ErrorMessage name='lastName' />
                  </div>
                </div>
                <div>
                  <label className='fs-5'>Email</label> <br />
                  <Field type='Email' name="Email" className='w-100 rounded  p-2 my-2' />
                  <div className='text-danger '>
                    <ErrorMessage name='Email' />
                  </div>
                </div>
                <div>
                  <Field className='w-100 rounded p-2 my-2' name="gender" as="select">
                    <option>Choose Gender</option>
                    <option>Male</option>
                    <option>FeMale</option>
                    <option>Other</option>
                  </Field>
                </div>
                <div>
                  <label className='fs-5'>Phone Number</label> <br />
                  <Field type='Number' name="phone" className='w-100 rounded  p-2 my-2' />
                  <div className='text-danger '>
                    <ErrorMessage name='phone' />
                  </div>
                </div>
                <div>
                  <label className='fs-5'> Your Photo</label> <br />
                  <input
                    type="file"
                    name="file"
                    className="w-100 rounded p-2 my-2"
                    required={true} // or simply required
                    onChange={(e) => {
                        Setfileimg(e.target.files[0]);
                      
                    }}
                  />

                  <div className=' text-danger '>
                    <ErrorMessage name='file' />
                  </div>
                </div>
                <div className='text-center my-3'>
                  <button type='submit' className='px-4 py-2 fw-bold btn bg-info mx-3 text-light' >
                    Submit
                  </button>
                  <button type='reset' className='px-4 py-2 fw-bold btn bg-info mx-3 text-light'>
                    Reset
                  </button>
                </div>
              </Form>
            }

          </Formik>
        </div>
        <div className='w-75 mt-5 py-3 shadow-lg profile px-3 rounded '>
          <h2 className='text-center text-capitalize '>
            this is your profile
          </h2>
          <div className='d-flex'>
            <div className='w-25 '>
              <img className=' rounded-circle ' height={'200px'} width={'200px'} src={img} />
            </div>
            <div className='py-5 row px-5'>
              <div className='my-3 col-6 ps-5'>
                <h4>Name</h4>
                <bold className='text-capitalize fs-5'>{form_data.Name}</bold>
              </div>
              <div className='my-3 col-6 ps-5'>
                <h4>Last Name</h4>
                <bold className='text-capitalize fs-5'>{form_data.lastName}</bold>
              </div>
              <div className='my-3 col-6 ps-5'>
                <h4>Email</h4>
                <bold className='text-capitalize fs-5'>{form_data.Email}</bold>
              </div>
              <div className='my-3 col-6 ps-5'>
                <h4>Gender</h4>
                <bold className='text-capitalize fs-5'>{form_data.gender}</bold>
              </div>
              <div className='my-3 col-6 ps-5'>
                <h4>Mobile Number</h4>
                <bold className='text-capitalize fs-5'>{form_data.phone}</bold>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
