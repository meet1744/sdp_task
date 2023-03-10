import React from "react";
import {useEffect,useState } from "react";
import './form.css';
import baseurl from "../api/bootapi";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify';



const Displayform =()=>{

    useEffect(()=>{
        console.log("hello")
    }, []);

    const [student,setStudent] = useState({});

    const handleForm=(e)=>{
        console.log(student)
        studentRegistered(student);
        e.preventDefault();
    }

    const studentRegistered=(data)=>{
const resolveWithSomeData = axios.post(`${baseurl}/studentdetails`,data);
toast.promise(
    resolveWithSomeData,
    {
      pending: {
        render(){
          return "Please Wait!!"
        },
        icon: "✋",
      },
      success: {
        render({data}){
          return `Registered Successfully!!`
        },
        // other options
        icon: "🚀",
      },
      duplicateEmail: {
        render({data}) {
          if (data.message === "Email is already in use") {
            return `Error: Already registered with this email!`;
          }
        },
        icon: "💔",
      },
      error: {
        render({data}){
            console.log(data);
          // When the promise reject, data will contains the error
          if(data.message==="Request failed with status code 500" || data.message==="Request failed with status code 406")
            return `Email already exist!!`
          return `Registration Failed!!`
        },
        icon:"💥",
      }
    }
)
    }

        return(
            <div>
                <div class="box-1">
                    <div class="title_box">
                        <h2>Form</h2>
                        <p>Please fill all the texts!</p>
                    </div>
                    <div class="content_box">
                        <ToastContainer />
                        <form onSubmit={handleForm}>
                        <p>
                            Name: <br />
                            <input type="text" name="Name" id="Name" placeholder="Type your full name here" required onChange={(e)=>{
                                setStudent({...student,studentName:e.target.value})
                            }}/>
                        </p>
                        <p>
                            Contact No.: <br />
                            <input type="tel" name="mobile" id="mobile" placeholder="Contact No." required onChange={(e)=>{
                                setStudent({...student,studentContactNumber:e.target.value})
                            }}/>
                        </p>
                        <p>
                            Email: <br />
                            <input type="email" placeholder="Type your email here" required onChange={(e)=>{
                                setStudent({...student,studentEmail:e.target.value})
                            }}/>
                        </p>
                            <input type="submit" value="Register" />
                        </form>
                        
                    </div>
                </div>
            </div>
        )
}
export default Displayform