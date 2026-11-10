import { Widget } from "@typeform/embed-react";
import Head from "next/head";

import { track } from "../../lib/analytics";

const Feedback = () => {
  const formId = "Vp9MsWkJ";
  return (
    <>
      <Head>
        <title>Cubetimer.io | Feedback</title>
      </Head>
      <Widget
        id={formId}
        style={{ height: "80vh", marginTop: "20px" }}
        className="my-form"
        onSubmit={() => track("feedback_submitted", {})}
      />
    </>
  );
};

export default Feedback;
