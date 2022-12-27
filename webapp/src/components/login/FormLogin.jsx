import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const registerSchema = yup.object().shape({
  firstName: yup.string().required("FirstName cannot be empty !!"),
  lastName: yup.string().required("LastName cannot be empty !!"),
  email: yup
    .string()
    .email("invalid email")
    .required("Email cannot be empty !!"),
  password: yup.string().required("Password cannot be empty !!"),
  location: yup.string().required("Location cannot be empty !!"),
  occupation: yup.string().required("Occupation cannot be empty !!"),
  picture: yup.string().required("picture cannot be empty !!"),
});
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email")
    .required("Email cannot be empty !!"),
  password: yup.string().required("Password cannot be empty !!"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};
function FormLogin() {
 

  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";


  const handleSubmit = (values) => {
    if(isLogin){
      values.preventDefault();
      let email = values.target[0].value;
      let pass = values.target[2].value;
      console.log(email, pass);
     const data = {
      id: null,
      username: null,
      Email: email,
      Password: pass,
      DOB: null,
      Gender: null,
      Avata: null,
      Level: null,
      referralCode: null,
      Status: null,
    };
    fetch("http://localhost:5000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "login success") {
          Swal.fire("Login Successful!", "Logged in successfully!", "success");
          window.location.href = "http://localhost:8800/home";
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Incorrect email or password!",
          });
        }
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    } else if(isRegister){
      values.preventDefault();
      console.log(values);
      let firstName = values.target[0].value;
      let lastName = values.target[2].value;
      let gender = values.target[4].value;
      let occupation = values.target[6].value;
      let picture = values.target[8].value;
      let email = values.target[9].value;
      let pass = values.target[11].value;
      const id = Math.floor(Math.random() * 100);


      console.log(firstName, lastName, occupation, picture, email, pass);
      const data = {
        id: id,
        username: firstName + lastName,
        Email: email,
        Password: pass,
        DOB: null,
        Gender: gender,
        Avata: picture,
        Level: null,
        referralCode: null,
        Status: null,
      };
      fetch("http://localhost:5000/user", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Success") {
          Swal.fire("Register Successful!", "Logged in successfully!", "success");
          window.location.href = "http://localhost:8800/login";
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Incorrect email or password!",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
    
  };

  return (
    <>
      <Formik
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          // handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Gender"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="gender"
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 4" }}
                  />
                  
                  <Box
                    gridColumn="span 4"
                    border={`1px solid `}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: "#00d5fa",
                  color: "white",
                  "&:hover": { backgroundColor: palette.error.main },
                }}
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.light,
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."}
              </Typography>
              <Link to="/resetpassword">
                <b className="title-forgot-password">Forgot Password</b>{" "}
              </Link>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default FormLogin;
