function MyApp({ Component, pageProps }) {
  return (
    <>
      <link
        href='https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css'
        rel='stylesheet'
      ></link>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
