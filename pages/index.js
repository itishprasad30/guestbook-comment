import Head from "next/head";
import { useState, useEffect } from "react";
import cn from "classnames";
import formatDate from "date-fns/format";
import useSWR, { mutate } from "swr";
import "tailwindcss/tailwind.css";
import { listGuestbookEntries } from "@/lib/fauna";
import SuccessMessage from "@/components/SuccessMessage";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import FlipCountdown from "@rumess/react-flip-countdown";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";
const ENTRIES_PATH = "/api/entries";

const putEntry = (payload) =>
  fetch(ENTRIES_PATH, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));

const useEntriesFlow = ({ initialEntries }) => {
  const { data: entries } = useSWR(ENTRIES_PATH, {
    initialData: initialEntries,
  });

  const onSubmit = async (payload) => {
    await putEntry(payload);
    await mutate(ENTRIES_PATH);
  };

  return {
    entries,
    onSubmit,
  };
};

const AppHead = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <title>GuestBook Features</title>
    <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
  </Head>
);

const EntryItem = ({ entry }) => (
  <div className="flex flex-col space-y-2">
    <div className="prose dark:prose-dark w-full">{entry.message}</div>
    <div className="flex items-center space-x-3">
      <p className="text-sm text-gray-500">{entry.name}</p>
      <span className="text-gray-200 dark:text-gray-800">/</span>
      <p className="text-sm text-gray-400 dark:text-gray-600">
        {formatDate(new Date(entry.createdAt), "d MMM yyyy 'at' h:mm bb")}
      </p>
    </div>
  </div>
);

const EntryForm = ({ onSubmit: onSubmitProp }) => {
  const initial = {
    name: "",
    message: "",
  };
  const [values, setValues] = useState(initial);
  const [formState, setFormState] = useState("initial");
  const isSubmitting = formState === "submitting";

  const onSubmit = (ev) => {
    ev.preventDefault();

    setFormState("submitting");
    onSubmitProp(values)
      .then(() => {
        setValues(initial);
        setFormState("submitted");
      })
      .catch(() => {
        setFormState("failed");
      });
  };

  const makeOnChange =
    (fieldName) =>
    ({ target: { value } }) =>
      setValues({
        ...values,
        [fieldName]: value,
      });

  const inputClasses = cn(
    "block py-2 bg-white dark:bg-gray-800",
    "rounded-md border-gray-300 focus:ring-blue-500",
    "focus:border-blue-500 text-gray-900 dark:text-gray-100"
  );

  return (
    <>
      <form
        className="flex flex-col md:flex-row  gap-2 relative my-4"
        onSubmit={onSubmit}
      >
        <input
          required
          className={cn(inputClasses, "md:w-1/3 w-full mr-2 px-4")}
          aria-label="Your name"
          placeholder="Your name..."
          value={values.name}
          onChange={makeOnChange("name")}
        />
        <input
          required
          className={cn(inputClasses, "pl-4 pr-32 flex-grow")}
          aria-label="Your message"
          placeholder="Your message..."
          value={values.message}
          onChange={makeOnChange("message")}
        />
        <button
          className={cn(
            "flex  items-center justify-center",
            "relative md:absolute right-1 top-1 px-4 font-bold h-8",
            "bg-yellow-600 dark:bg-gray-700 text-gray-100",
            "dark:text-gray-100 rounded w-28"
          )}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoadingSpinner /> : "Sign"}
        </button>
      </form>
      {{
        failed: () => <ErrorMessage>Something went wrong. :(</ErrorMessage>,

        submitted: () => (
          <SuccessMessage>Thanks for signing the guestbook.</SuccessMessage>
        ),
      }[formState]?.()}
    </>
  );
};

const Guestbook = ({ initialEntries }) => {
  const { entries, onSubmit } = useEntriesFlow({
    initialEntries,
  });
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, parseInt(day) + 1].join("-");
  }

  return (
    <main className="max-w-4xl min-h-screen  mx-auto p-4">
      <AppHead />
      <FlipCountdown
        hideYear
        hideMonth
        hideDay
        endAtZero
        endAt={formatDate(new Date())}
      />
      <h2 className="text-2xl font-serif flex justify-center">
        Until Next Day
      </h2>
      <div className="flex justify-end">
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="w-9 h-9  bg-gray-100 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5 text-gray-800 dark:text-gray-200"
            >
              {theme === "dark" ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              )}
            </svg>
          )}
        </button>
      </div>
      <div className="flex flex-col justify-center items-start max-w-4xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 ">
          Guestbook
        </h1>
        <p className="text-gray-600 dark:text-gray-50 mb-4">
          Leave a comment below. It could be anything – appreciation,
          information, wisdom, or even humor. Surprise me!
        </p>
      </div>
      <div
        className={cn(
          "border border-yellow-200 rounded p-6",
          "my-4 w-full dark:border-gray-800 bg-yellow-50",
          "dark:bg-blue-500"
        )}
      >
        <h5
          className={cn(
            "text-lg md:text-xl font-bold",
            "text-gray-900 dark:text-gray-100"
          )}
        >
          Sign the Guestbook and Leave a Message 💭
        </h5>
        <p className="my-1 text-gray-800 dark:text-gray-200">
          Share a message for a future visitor.
        </p>
        <EntryForm onSubmit={onSubmit} />
      </div>
      <div className="mt-4 space-y-8 px-2">
        {entries?.map((entry) => (
          <EntryItem key={entry._id} entry={entry} />
        ))}
      </div>
    </main>
  );
};

export const getStaticProps = async () => ({
  props: {
    initialEntries: await listGuestbookEntries(),
  },
  revalidate: 1,
});

export default Guestbook;
