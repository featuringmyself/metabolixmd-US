import React from 'react';
import Error from 'next/error';

function CustomError({ statusCode, hasGetInitialPropsRun, err }) {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    console.error('ErrorPage getInitialProps missing data at build time');
    return <Error statusCode={500} />;
  }

  return (
    <div className="error-container">
      <h1>Oops! Something went wrong</h1>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
      <style jsx>{`
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
          padding: 0 20px;
        }
        h1 {
          margin-bottom: 24px;
          font-size: 24px;
          font-weight: 500;
        }
        p {
          color: #666;
        }
      `}</style>
    </div>
  );
}

CustomError.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const hasGetInitialPropsRun = true;
  return { statusCode, hasGetInitialPropsRun };
};

export default CustomError;