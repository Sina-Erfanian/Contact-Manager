import * as Yup from "yup";

export const contactSchema = Yup.object().shape({
  fullname: Yup.string().required("نام و نام خانوادگی الزامی است"),
  photo: Yup.string()
    .url("ادرس معتبر نیست")
    .required("تصویر مخاطب الزامی می باشد"),
  mobile: Yup.number().required("شماره موبایل الزامی می باشد"),
  email: Yup.string()
    .email("آدرس ایمیل معتبر نمی باشد")
    .required("ادرس ایمیل الزامی می باشد"),
  job: Yup.string().nullable(),
  group: Yup.string().required("انتخاب گروه الزامی می باشد"),
});
