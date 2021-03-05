import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { auth } from "../../firebase";
import Input from "../Fields/FieldInput";
import { Form } from "../Fields/Form";
import SignIn from "./SignIn/SignIn";
import { useStyles } from "./SignUp.styles";

interface defaultProps {
  emailOrPhone: string;
  password: string;
}

const schema = Yup.object().shape({
  emailOrPhone: Yup.mixed()
    .required("Email/Phone Number is required")
    .test("test-name", "Enter Valid Phone/Email", function (value: string) {
      // eslint-disable-next-line
      const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      const phoneRegex = /^(\+91-|\+91|0)?\d{10}$/;
      let isValidEmail = emailRegex.test(value);
      let isValidPhone = phoneRegex.test(value);
      if (!isValidEmail && !isValidPhone) {
        return false;
      }
      return true;
    }),
  password: Yup.string()
    .required("Password is required")
    .matches(
      // eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: defaultProps) => {
    const { emailOrPhone, password } = data;
    if (data) {
      auth
        .signInWithEmailAndPassword(emailOrPhone, password)
        .then((user) => {
          history.push("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.signUp}>
      <div className="container">
        <div className="left">
          <Typography variant="h6">facebook</Typography>
          <Typography variant="subtitle1" component="div">
            Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
            của bạn.
          </Typography>
        </div>
        <div>
          <Paper className="right">
            <Form
              //@ts-expect-error
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                ref={register}
                id="emailOrPhone"
                type="text"
                label="Email or Phone number"
                name="emailOrPhone"
                error={!!errors.emailOrPhone}
                helperText={errors?.emailOrPhone?.message}
              />
              <Input
                ref={register}
                id="password"
                type="password"
                label="Password"
                name="password"
                error={!!errors.password}
                helperText={errors?.password?.message}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="submitBtn"
              >
                Đăng nhập
              </Button>
              <Typography variant="subtitle2" component="div">
                Quen mat khau ?
              </Typography>
              <Divider />
              <Button className="toSignIn" onClick={handleClickOpen}>
                Tao tai khoan moi
              </Button>
              <SignIn open={open} handleClose={handleClose} />
            </Form>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
