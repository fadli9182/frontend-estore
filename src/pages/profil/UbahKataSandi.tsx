import { Eye, EyeOff } from "lucide-react";
import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Messages } from "primereact/messages";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { BASE_TITLE } from "@/config";
import { Button } from "@/components/ui/button";
import { getLocalStorage } from "@/services/localStorageService";
import { toast } from "@/components/ui/use-toast";
import { axiosServices } from "@/services/axios";

const UbahKataSandi = () => {
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const userData = getLocalStorage("userData");

  const toastRef = useRef(null);
  const msgs = useRef(null);

  const validationSchema = Yup.object().shape({
    confirm_password: Yup.string()
      .oneOf([Yup.ref("user_password"), undefined], "Kata sandi tidak sesuai")
      .required("Konfirmasi kata sandi harus diisi"),
  });

  const initialValues = {
    id: userData?.id,
    old_password: "",
    user_password: "",
    confirm_password: "",
  };
  const footerUserPassword = (
    <>
      <Divider />
      <ErrorMessage name="user_password" component="div" className="p-error" />
    </>
  );

  const footerConfirmPassword = (
    <>
      <Divider />
      <ErrorMessage
        name="confirm_password"
        component="div"
        className="p-error"
      />
    </>
  );

  const handleSubmit = async (values) => {
    try {
      const response = await axiosServices().put("/api/users/update-password", {
        id: values.id,
        current_password: values.old_password,
        password: values.user_password,
      });
      if (response.data.success) {
        toast({
          title: "Success",
          description: "Kata sandi berhasil diubah.",
        });
      } else {
        toast({
          title: "Error",
          description: response.data.error || "Gagal mengubah kata sandi.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Terjadi kesalahan.",
      });
    }
  };

  const handleToggleOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // useMountEffect(() => {
  //   if (msgs.current) {
  //     msgs.current.clear();
  //     msgs.current.show({
  //       id: "1",
  //       sticky: true,
  //       severity: "info",
  //       detail:
  //         "Kata Sandi minimal 8 karakter dengan kombinasi huruf kapital, angka dan simbol",
  //       closable: false,
  //     });
  //   }
  // });

  // const CekStatusPasswordUser = async () => {
  //   try {
  //     const response = await axiosServices().post(`/api/profile/cek_password`, {
  //       id: dataUser.value.id,
  //     });
  //     setUserDataCekPassword(response.data);
  //   } catch (err) {
  //     setError(err);
  //   }
  // };

  // useEffect(() => {
  //   CekStatusPasswordUser();
  // }, []);

  document.title = "Ubah Kata Sandi" + BASE_TITLE;

  return (
    <>
      <Toast ref={toastRef} />
      {/* {error.value && <div>{error.value.message}</div>} */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="container">
              <div className="row mt-5 mb-5 justify-content-center">
                <div className="xl:col-6 lg:col-6 md:col-6 sm:col-6">
                  <div className="base-card bg-background">
                    <div className="">
                      <span className="font-bold text-2xl">
                        Ganti Kata Sandi
                      </span>
                      <div className="row mt-3">
                        <div className="col-12 xl:col-12 lg:col-6 md:col-12 sm:col-12">
                          <label htmlFor="user_password">Kata Sandi Lama</label>
                          <div className="p-inputgroup p-1">
                            <Field
                              as={showOldPassword ? InputText : Password}
                              id="old_password"
                              name="old_password"
                              className={
                                errors.old_password && touched.old_password
                                  ? "p-invalid"
                                  : ""
                              }
                              footer={footerUserPassword}
                              placeholder="Masukan Kata Sandi Baru disini"
                            />
                            <span
                              className="p-inputgroup-addon"
                              onClick={handleToggleOldPassword}
                            >
                              {showOldPassword ? (
                                <Eye size={18} />
                              ) : (
                                <EyeOff size={18} />
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="col-12 xl:col-12 lg:col-6 md:col-12 sm:col-12">
                          <label htmlFor="user_password">Kata Sandi Baru</label>
                          <div className="p-inputgroup p-1">
                            <Field
                              as={showPassword ? InputText : Password}
                              id="user_password"
                              name="user_password"
                              className={
                                errors.user_password && touched.user_password
                                  ? "p-invalid"
                                  : ""
                              }
                              footer={footerUserPassword}
                              placeholder="Masukan Kata Sandi Baru disini"
                            />
                            <span
                              className="p-inputgroup-addon"
                              onClick={handleTogglePassword}
                            >
                              {showPassword ? (
                                <Eye size={18} />
                              ) : (
                                <EyeOff size={18} />
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="col-12 xl:col-12 lg:col-6 md:col-12 sm:col-12">
                          <label htmlFor="confirm_password">
                            Konfirmasi Kata Sandi Baru
                          </label>
                          <div className="p-inputgroup p-1">
                            <Field
                              as={showConfirmPassword ? InputText : Password}
                              id="confirm_password"
                              name="confirm_password"
                              className={
                                errors.confirm_password &&
                                touched.confirm_password
                                  ? "p-invalid"
                                  : ""
                              }
                              footer={footerConfirmPassword}
                              placeholder="Masukan Konfirmasi Kata Sandi Baru disini"
                            />
                            <span
                              className="p-inputgroup-addon"
                              onClick={handleToggleConfirmPassword}
                            >
                              {showConfirmPassword ? (
                                <Eye size={18} />
                              ) : (
                                <EyeOff size={18} />
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="col-12 xl:col-12 lg:col-12 md:col-12 sm:col-12">
                          <Messages ref={msgs} />
                        </div>
                        <div className="col-12 xl:col-12 lg:col-12 md:col-12 sm:col-12 mt-5">
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full"
                          >
                            Simpan
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UbahKataSandi;
