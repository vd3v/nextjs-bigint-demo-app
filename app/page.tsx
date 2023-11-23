"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";

type ExampleResponse = {
  title: string;
  numbers?: { plainNumber: number; string: string; differentIDs: string[] };
  loading?: true;
};

export default function Home() {
  const [state, setState] = useState<ExampleResponse>({
    title: "Loading...",
    loading: true,
  });

  const [stringified, setStringified] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/data.json");
      setStringified(await res.clone().text());
      setState(await res.json());
    }

    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      <h1>{state.title}</h1>
      {!state.loading && (
        <section>
          <h4>Original JSON string:</h4>
          <pre className={styles.stringigied}>{stringified}</pre>
          <hr></hr>
          <h4>How this JSON is parsed:</h4>
          <ul className={styles.list}>
            <li>
              <b>Plain number</b>:
              <span className={styles.value}>{state.numbers?.plainNumber}</span>
            </li>
            <li>
              <b>Stringified number</b>:
              <span className={styles.value}>{state.numbers?.string}</span>
            </li>
            <li>
              <b>Different IDs</b>:
              <span className={styles.value}>
                {state.numbers?.differentIDs.join(", ")}
              </span>
            </li>
          </ul>
        </section>
      )}
    </main>
  );
}
