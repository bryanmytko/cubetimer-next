import { Widget } from "@typeform/embed-react";

const Feedback = () => {
  const formId = "Vp9MsWkJ";
  return (
    <Widget
      id={formId}
      style={{ height: "80vh", marginTop: "20px" }}
      className="my-form"
    />
  );
};

export default Feedback;
