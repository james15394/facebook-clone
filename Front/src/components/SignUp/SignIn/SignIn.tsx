import { yupResolver } from "@hookform/resolvers/yup";
import { Collapse, Grid, IconButton, RadioGroup } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { auth } from "../../../firebase";
import Input from "../../Fields/FieldInput";
import FieldRadio from "../../Fields/FieldRadio";
import FieldSelect from "../../Fields/FieldSelect";
import { Form } from "../../Fields/Form";
import CloseIcon from "@material-ui/icons/Close";
import { DialogContent, DialogTitle, useStyles } from "./SignIn.styles";

interface propsDetail {
  open: boolean;
  handleClose: () => void;
}
interface defaultProps {
  emailOrPhone: string;
  password: string;
  lastName: string;
  firstName: string;
}
const schema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .matches(
      /^(?=.{3,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i,
      "Must contain at least 3 characters, not numbers"
    ),
  lastName: Yup.string().required("Last name is required"),
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

const SignIn = ({ open, handleClose }: propsDetail) => {
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: defaultProps) => {
    const { emailOrPhone, password } = data;
    if (data) {
      auth
        .createUserWithEmailAndPassword(emailOrPhone, password)
        .then((user) => {
          history.push("/");
        })
        .catch((error: any) => {
          console.log(error.message);
          setError(error.message);
          setOpenError(true);
        });
    }
  };
  const years = Array.from(
    new Array(20),
    (val, index) => new Date().getFullYear() - index
  );
  const days = Array.from(new Array(31), (val, index) => index + 1);
  const months = Array.from(
    new Array(12),
    (val, index) => "Tháng " + (index + 1)
  );

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="title"
      open={open}
      className={classes.root}
    >
      <DialogTitle id="title" onClose={handleClose}>
        <Typography variant="h6">Đăng kí</Typography>
        <Typography variant="subtitle2" component="div">
          Nhanh chóng và dễ dàng
        </Typography>
      </DialogTitle>

      {error && (
        <Collapse in={openError}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="secondary"
                size="small"
                onClick={() => {
                  setOpenError(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {error}
          </Alert>
        </Collapse>
      )}

      <DialogContent dividers>
        <Form
          //@ts-expect-error
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Input
                ref={register}
                id="lastName"
                type="text"
                label="Last Name"
                name="lastName"
                error={!!errors.lastName}
                helperText={errors?.lastName?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                ref={register}
                id="firstName"
                type="text"
                label="First Name"
                name="firstName"
                error={!!errors.firstName}
                helperText={errors?.firstName?.message}
              />
            </Grid>
          </Grid>

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
          <div className="birth">
            <Typography variant="subtitle2" component="p">
              Ngày sinh
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <FieldSelect
                  options={days}
                  ref={register}
                  id="day"
                  type="day"
                  name="day"
                  error={!!errors.day}
                  helperText={errors?.day?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <FieldSelect
                  options={years}
                  ref={register}
                  id="year"
                  type="year"
                  name="year"
                  error={!!errors.year}
                  helperText={errors?.year?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <FieldSelect
                  options={months}
                  ref={register}
                  id="month"
                  type="month"
                  name="month"
                  error={!!errors.month}
                  helperText={errors?.month?.message}
                />
              </Grid>
            </Grid>
          </div>
          <div className="gender">
            <Typography variant="subtitle2" component="p">
              Giới tính
            </Typography>
            <Grid container spacing={1}>
              <RadioGroup
                defaultValue="female"
                aria-label="gender"
                name="gender"
              >
                <Grid item xs={4}>
                  <FieldRadio
                    ref={register}
                    label="Female"
                    value="female"
                    name="female"
                    error={!!errors.female}
                    helperText={errors?.female?.message}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FieldRadio
                    ref={register}
                    label="Male"
                    value="male"
                    name="male"
                    error={!!errors.male}
                    helperText={errors?.male?.message}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FieldRadio
                    ref={register}
                    label="Others"
                    value="others"
                    name="others"
                    error={!!errors.others}
                    helperText={errors?.others?.message}
                  />
                </Grid>
              </RadioGroup>
            </Grid>
          </div>
          <Typography
            variant="subtitle2"
            component="div"
            className="policy"
            gutterBottom
          >
            Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính sách dữ
            liệu và Chính sách cookie của chúng tôi. Bạn có thể nhận được thông
            báo của chúng tôi qua SMS và hủy nhận bất kỳ lúc nào.
          </Typography>
          <Button type="submit" variant="contained" className="signIn">
            Đăng kí
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignIn;
