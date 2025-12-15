import { useEffect, useState } from "react";

export function useFormState(action, successAction) {

  const [state, setState] = useState({ loading: false, error: null });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState({ loading: true, error: null });
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = await action(formData);
    if (result?.isError) {
      setState({ loading: false, error: result.message });
    } else {
      form.reset();
      setState({ loading: false, error: null });
      if(successAction)
        successAction();
    }
  };

  return [state, handleSubmit];
}

export function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  useEffect(()=>setIsClient(true),[]);
  return isClient;
}