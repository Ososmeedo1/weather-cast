import { useFormik } from "formik";
import * as Yup from "yup";

const SearchBar = ({ onSearch, disabled }) => {
  const formik = useFormik({
    initialValues: { city: "" },
    validationSchema: Yup.object({
      city: Yup.string().trim().min(2, "City is too short").required("City is required"),
    }),
    onSubmit: async (values, helpers) => {
      await onSearch(values.city.trim());
      helpers.setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex w-full gap-2 sm:max-w-md">
      <div className="w-full">
        <input
          id="city"
          name="city"
          type="text"
          placeholder="Search city"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none ring-0 transition focus:border-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          disabled={disabled || formik.isSubmitting}
        />
        {formik.touched.city && formik.errors.city ? (
          <p className="mt-1 text-xs text-red-500">{formik.errors.city}</p>
        ) : null}
      </div>
      <button
        type="submit"
        disabled={disabled || formik.isSubmitting}
        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
