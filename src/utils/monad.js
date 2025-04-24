export function fakeMonadSubmit(message) {
    return new Promise((resolve) => {
      console.log("⛓️ Pushing to Monad blockchain...", message);
      setTimeout(() => resolve({ txHash: "0x123abc", status: "Success" }), 2000);
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (transcript.trim() !== "") {
      const res = await fakeMonadSubmit(transcript);
      console.log(res);
      setSubmitted(true);
      resetTranscript();
    }
  };
    