interface LoginButtonProps {
  action: () => {}
}

const LoginButton = (props: LoginButtonProps) => {
  const { action } = props;

  return (
    <button onClick={action}>
      Login
    </button>
  );
};

export default LoginButton;

     // color="error"
      // css={{
      //   background: "rgb(250 202 21 / var(--tw-bg-opacity))",
      //   color: "black",
      // }}