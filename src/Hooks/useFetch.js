import React from 'react';

function useFetch() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;

    try {
      setLoading(true);
      setError(null);

      response = await fetch(url, options);
      json = await response.json();
    } catch (err) {
      json = null;
      setError(err);
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return { request, data, loading, error };
}

export default useFetch;
