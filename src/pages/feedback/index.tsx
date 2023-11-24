import { Widget } from "@typeform/embed-react";
import Head from "next/head";

const Feedback = () => {
  const formId = "Vp9MsWkJ";
  return (
    <>
      <Head>
        <title>Cubetimer.io | Contact</title>
      </Head>
      <Widget
        id={formId}
        style={{ height: "80vh", marginTop: "20px" }}
        className="my-form"
      />
    </>
  );
};

export default Feedback;
