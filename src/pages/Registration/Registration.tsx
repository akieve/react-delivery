import { DEVELOPMENT_URL } from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import { useFormik, FormikProps } from "formik";
import useRequest from "../../utils/useRequest";
import Input from "../../components/common/Input/Input";
import Form from "../../components/common/Form/Form";
import * as Yup from "yup";
import Button from "../../components/common/Button/Button";
import { useEffect, useRef } from "react";
import RadioInputsGroupe from "../../components/common/RadioInputsGroupe/RadioInputsGroupe";

interface MyFormValues {
  email: string;
  password: string;
  role: string;
}

export const Registration: React.FC = () => {
  const navg = useNavigate();
  const { fetchData } = useRequest();
  const emailInput = useRef(null);

  // useEffect(() => {
  //   emailInput.current.focus();
  // }, []);

  const submitHandler = async (values: MyFormValues) => {
    await fetchData({
      method: "post",
      url: `${DEVELOPMENT_URL}/api/auth/register`,
      data: values,
      headers: { "Content-type": "application/json" },
    });

    navg("/signin");
  };
  const initialValues = {
    email: "",
    password: "",
    role: "SHIPPER",
  };

  const formik: FormikProps<MyFormValues> = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("invalid email")
        .max(19, "email must be not more than 19 characters")
        .required("enter email"),
      password: Yup.string()
        .min(2, "password must be more than 2 characters")
        .required("enter password"),
      role: Yup.string().required(),
    }),
    onSubmit: submitHandler,
  });

  return (
    <section>
      <PageTitle title="Register" />
      <Form submitHandler={formik.handleSubmit}>
        <Input
          value={formik.values.email}
          onChange={formik.handleChange}
          type="email"
          name="email"
          placeholder="Email"
          error={formik.errors.email}
        />

        <Input
          value={formik.values.password}
          onChange={formik.handleChange}
          type="password"
          name="password"
          placeholder="password"
          error={formik.errors.password}
        />

        <RadioInputsGroupe
          name="role"
          onChange={formik.handleChange}
          value={formik.values.role}
          choices={[
            { label: "Shipper", value: "SHIPPER" },
            { label: "Driver", value: "DRIVER" },
          ]}
        />
        <Button type="submit" text="register" />
      </Form>
    </section>
  );
};
