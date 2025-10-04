"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { ApiRequest } from "@/service/apiService";
import { login } from "@/redux/reducers/authSlice";
import { useRouter } from "next/navigation";
import { LoginFormValues, LoginResponse, UserData } from "@/types/auth";
import { decodeJwt } from "@/utils/helper";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Geçerli bir email adresi giriniz")
    .required("Email adresi zorunludur"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre zorunludur"),
});

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: LoginFormValues) => {
      setLoading(true);

      try {
        const response: LoginResponse = await ApiRequest.login({
          username: values.email,
          password: values.password,
        });

        if (response.status === 0 && response.data) {
          const {
            accessToken,
            expiresIn,
            refreshExpiresIn,
            refreshToken,
            tokenType,
          } = response.data;

          const decodedJwt = await decodeJwt(accessToken);

          const authData: UserData = {
            accessToken,
            refreshToken,
            expiresIn,
            refreshExpiresIn,
            tokenType,
            expiresAt: Date.now() + expiresIn * 1000,
            refreshExpiresAt: Date.now() + refreshExpiresIn * 1000,
            email: values.email,
            fullName: decodedJwt.name,
          };

          dispatch(login(authData));

          const result = await signIn("credentials", {
            redirect: false,
            email: values.email,
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
            expiresAt: authData.expiresAt,
            refreshExpiresAt: authData.refreshExpiresAt,
          });

          if (result?.error) {
            toast.error("Kimlik doğrulama başarısız!", {
              position: "top-right",
              autoClose: 3000,
            });
            return;
          }

          toast.success("Giriş başarılı! Yönlendiriliyorsunuz...", {
            position: "top-right",
            autoClose: 2000,
          });

          setTimeout(() => {
            router.push("/collections");
          }, 2000);
        } else {
          toast.error(
            response.message || "Bir hata oluştu. Lütfen tekrar deneyin.",
            {
              position: "top-right",
            }
          );
        }
      } catch (error: any) {
        console.error("Login error:", error);
        toast.error(
          error?.response?.data?.message || "Email veya şifre hatalı!",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Lock className="text-blue-600" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Hoş Geldiniz
            </h1>
            <p className="text-gray-600">Devam etmek için giriş yapın</p>
          </div>

          <div onSubmit={handleSubmit}>
            <Input
              label="Email Adresi"
              type="email"
              name="email"
              placeholder="ornek@email.com"
              icon={Mail}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
            />

            <PasswordInput
              label="Şifre"
              name="password"
              placeholder="••••••••"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
            />

            <button
              onClick={handleSubmit as any}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Giriş yapılıyor...
                </span>
              ) : (
                "Giriş Yap"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
