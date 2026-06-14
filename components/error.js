import Link from "next/link";

const ErrorScreen = ({ message, statusCode }) => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2>{message}</h2>
      <Link href="/">
        <h3 style={{ color: "#1985CD", cursor: 'pointer' }}>{"<- Go Home"}</h3>
      </Link>
    </div>
  );
};

export default ErrorScreen;
